import React from "react";
import cloneDeep from "lodash.clonedeep";
import FilterSelect from "./FilterSelect";
/* import FilterCategory from "./FilterCategory";
import FilterCategoryL1 from "./FilterCategoryL1"; */
import styles from "./FilterDesktop.css";
import queryString from "query-string";
import { createUrlFromQueryAndCategory } from "./FilterUtils.js";
import ColourSelect from "../../pdp/components/ColourSelect";
import Accordion from "../../general/components/Accordion";
import { CATEGORY_CAPTURE_REGEX, CATEGORY_REGEX } from "../../plp/components/PlpBrandCategoryWrapper";
import BrandFilterTabDesktop from "./BrandFilterTabDesktop";
import PriceFilterTabDesktop from "./PriceFilterTabDesktop";
import DesktopOnly from "../../general/components/DesktopOnly";
import ShowBrandModal from "./ShowBrandModal";
import {
    setDataLayer,
    setDataLayerForSelectedFilterDirectCalls,
    ADOBE_DIRECT_CALL_FOR_FILTER_OPTION,
    ADOBE_MDE_CLICK_ON_EXCHANGE_AVAILABLE_FILTER,
} from "../../lib/adobeUtils";
import * as Cookie from "../../lib/Cookie";
import L1CategoryFilter from "./L1CategoryFilter";
import SelectedCategoryLevel from "./SelectedCategoryLevel";
import L2CategoryFilter from "./L2CategoryFilter";
import L3CategoryFilter from "./L3CategoryFilter";
import L4CategoryFilter from "./L4CategoryFilter";
const BRAND = "Brand";
const COLOUR = "Colour";
const PRICE = "Price";
const RESTRICTED_FILTERS = "restrictedFilters";
const LAST_PLP_URL = "lastPlpUrl";
export default class FilterDesktop extends React.Component {
    constructor() {
        super();
        this.state = {
            openedFilters: [],
            openBrandPopUp: false,
            showAllColor: false,
            restrictedFilterData: [],
        };
    }

    onClear = () => {
        const searchQuery = this.props.location.search;
        const parsedQueryString = queryString.parse(this.props.location.search);
        const query = parsedQueryString.q;

        const EOOF_Flag = "%3AinStockFlag%3Atrue";
        if (query) {
            const firstChar = query.charAt(0);
            if (firstChar !== ":") {
                const splitQuery = query.split(":");
                const searchText = splitQuery[0];
                let url = "";

                if (searchText != null || searchText != undefined) {
                    url = `${this.props.location.pathname}?q=${searchText}`;
                    if (searchQuery.match(/inStockFlag%3Atrue/i)) {
                        url = `${this.props.location.pathname}?q=${searchText}${EOOF_Flag}`;
                    }
                } else {
                    let queryparam = this.props.location.search.split("%3");
                    url = `${this.props.location.pathname}${queryparam[0]}`;
                }

                this.props.history.push(url, {
                    isFilter: false,
                });
            } else {
                let brandOrCategoryId = null;
                brandOrCategoryId = /category:([a-zA-Z0-9]+)/.exec(query);
                if (!brandOrCategoryId) {
                    brandOrCategoryId = /brand:([a-zA-Z0-9]+)/.exec(query);
                }

                if (brandOrCategoryId) {
                    const brandOrCategoryIdIndex = brandOrCategoryId.index;
                    const clearedQuery = query.substring(0, brandOrCategoryIdIndex + brandOrCategoryId[0].length);

                    let url = `${this.props.location.pathname}?q=${clearedQuery}`;
                    if (searchQuery.match(/inStockFlag%3Atrue/i)) {
                        url = `${this.props.location.pathname}?q=${clearedQuery}${EOOF_Flag}`;
                    }
                    this.props.history.push(url, {
                        isFilter: false,
                    });
                }
            }
        }
        if (this.props.onClear) {
            this.props.onClear();
        }
    };

    onApply = () => {
        this.props.onApply();
    };

    onCategorySelect = (val, filterType, filterValue, filterName, isFilter) => {
        setDataLayerForSelectedFilterDirectCalls(ADOBE_DIRECT_CALL_FOR_FILTER_OPTION, filterType, filterValue);
        const parsedQueryString = queryString.parse(this.props.location.search);
        // special case the search category case
        let url;
        let query = parsedQueryString.q;
        let pathName = this.props.location.pathname;
        filterValue = filterValue.replace("&", "and");
        if (parsedQueryString.searchCategory) {
            const searchValue = this.props.location.search;
            url = `${pathName}${searchValue}`;
            url = createUrlFromQueryAndCategory(searchValue, url, val, filterName);
        } else {
            url = createUrlFromQueryAndCategory(query, pathName, val, filterName);
        }

        if (url.includes("capacityCC-classification")) {
            let attributeCapacity = url.match(new RegExp("capacityCC-classification:" + "(.*)" + ":"));
            attributeCapacity = attributeCapacity
                ? attributeCapacity
                : url.match(new RegExp("capacityCC-classification:" + "(.*)"));
            if (attributeCapacity && attributeCapacity[1]) {
                let attributeCapacityMatched = attributeCapacity[1].replace("+", "%2B");
                url = url.replace(attributeCapacity[1], attributeCapacityMatched);
            }
        }

        if (url.includes("internalStorage-classification")) {
            let attributeStorage = url.match(new RegExp("internalStorage-classification:" + "(.*)" + ":"));
            attributeStorage = attributeStorage
                ? attributeStorage
                : url.match(new RegExp("internalStorage-classification:" + "(.*)"));
            if (attributeStorage && attributeStorage[1]) {
                let attributeStorageMatched = attributeStorage[1].replace("+", "%2B");
                url = url.replace(attributeStorage[1], attributeStorageMatched);
            }
        }

        if (url.includes("type-classification")) {
            let attributeType = url.match(new RegExp("type-classification:" + "(.*)" + ":"));
            attributeType = attributeType ? attributeType : url.match(new RegExp("type-classification:" + "(.*)"));
            if (attributeType && attributeType[1]) {
                let attributeTypeMatched = attributeType[1].replace("+", "%2B");
                url = url.replace(attributeType[1], attributeTypeMatched);
            }
        }

        if (url.endsWith(":relevance")) {
            url = url.replace(":relevance", "");
            url = url.replace("MSH", "c-msh");
            url = url.replace("MBH", "c-mbh");
        }

        this.props.history.push(url, {
            isFilter,
            componentName: "isFilterTrue",
        });
        if (isFilter === false) {
            this.props.onL3CategorySelect();
        }
    };

    onL1Click = (val, filterType, filterValue, filterName, i) => {
        const storedPlpUrl = localStorage.getItem(LAST_PLP_URL);
        const currentUrl = `${this.props.location.pathname}${this.props.location.search}`;
        if (storedPlpUrl) {
            localStorage.removeItem(LAST_PLP_URL);
            localStorage.setItem(LAST_PLP_URL, currentUrl);
            this.onCategorySelect(val, filterType, filterValue, filterName, false, i);
        } else {
            localStorage.setItem(LAST_PLP_URL, currentUrl);
            this.onCategorySelect(val, filterType, filterValue, filterName, false, i);
        }
    };

    onL2Click = (val, filterType, filterValue, filterName, i) => {
        this.onCategorySelect(val, filterType, filterValue, filterName, false, i);
    };

    onL3Click = (val, filterType, filterValue, filterName, i) => {
        this.onCategorySelect(val, filterType, filterValue, filterName, false, i);
    };

    resetL1Category = (isFilter = false) => {
        const storedPlpUrl = localStorage.getItem(LAST_PLP_URL);
        if (storedPlpUrl && storedPlpUrl.includes("/search/?searchCategory")) {
            localStorage.removeItem(LAST_PLP_URL);
            this.props.history.push(storedPlpUrl, {
                isFilter,
                componentName: "isFilterTrue",
            });
        }
    };

    onFilterClick = (val, filterType, filterValue, filterSelected, webUrl, colourValue) => {
        if (filterType === "Colour" && webUrl) {
            let colourUrl = webUrl ? webUrl.split("/") : "";
            const colourStub = colourUrl[2];
            colourUrl = webUrl;
            if (this.props.location.pathname.includes(colourStub)) {
                if ((webUrl.match(/~/g) || []).length > 1) {
                    colourUrl = webUrl.replace(`${colourValue.toLowerCase()}~`, "");
                } else {
                    colourUrl = webUrl.replace(`${colourValue.toLowerCase()}~color/`, "");
                }
            }
            if (val.includes("/search")) {
                val = val.replace("/search/page-{pageNo}", colourUrl);
            } else {
                val = val.replace("/view-all-offers/page-{pageNo}", colourUrl);
            }
        } else if (val.includes("/view-all-offers")) {
            val = val.replace("/view-all-offers/page-{pageNo}", `${this.props.location.pathname}`);
        } else {
            val = val.replace("/search/page-{pageNo}", `${this.props.location.pathname}`);
        }

        let url = "";
        if (CATEGORY_REGEX.test(this.props.location.pathname)) {
            url = createUrlFromQueryAndCategory(filterValue, this.props.location.pathname, val);
            if (url.match("page-{pageNo}")) {
                url = url.replace("page-{pageNo}", "page-1");
            }
        } else {
            url = val.replace("{pageNo}", 1);
            if (filterType === "Capacity" || filterType === "Type") {
                url = url.replace(/[+]/g, "%20");
            }
        }
        setDataLayerForSelectedFilterDirectCalls(
            ADOBE_DIRECT_CALL_FOR_FILTER_OPTION,
            filterType,
            filterType === "Colour" ? colourValue : filterValue
        );
        if (filterType === "Availability") {
            this.props.userSelectedOutOfStock(filterSelected);
        }
        if (filterType === "Exchange Available") {
            setDataLayer(ADOBE_MDE_CLICK_ON_EXCHANGE_AVAILABLE_FILTER);
        }

        this.props.history.push(url, {
            isFilter: false,
            componentName: "isFilterTrue",
        });
    };

    onOpenAccordion = filterName => {
        const openedFilters = cloneDeep(this.state.openedFilters);
        const indexOfFilter = this.state.openedFilters.indexOf(filterName);
        if (indexOfFilter >= 0) {
            openedFilters.splice(indexOfFilter, 1);
            this.setState({ openedFilters });
        } else {
            openedFilters.push(filterName);
            this.setState({ openedFilters });
        }
    };

    viewMore() {
        this.setState({ openBrandPopUp: true });
    }

    viewMoreColor() {
        this.setState({ showAllColor: !this.state.showAllColor });
    }

    componentDidMount() {
        const restrictedFilterCookie = Cookie.getCookie(RESTRICTED_FILTERS);
        if (!restrictedFilterCookie) {
            if (this.props.getRestrictedFilters) {
                this.props.getRestrictedFilters();
            }
        } else {
            this.setState({ restrictedFilterData: JSON.parse(restrictedFilterCookie) });
        }
    }

    componentDidUpdate() {
        const restrictedFilterCookie = Cookie.getCookie(RESTRICTED_FILTERS);
        if (!restrictedFilterCookie) {
            if (this.props.getRestrictedFilters) {
                this.props.getRestrictedFilters();
            }
        } else {
            if (this.state.restrictedFilterData && this.state.restrictedFilterData.length < 1) {
                this.setState({ restrictedFilterData: JSON.parse(restrictedFilterCookie) });
            }
        }
    }

    render() {
        const { facetdatacategory } = this.props;
        let { facetData } = this.props;
        const restrictedFilterData = this.state.restrictedFilterData;

        const url = this.props.location.pathname;
        let categoryId = null;
        if (CATEGORY_REGEX.test(url)) {
            categoryId = url.match(CATEGORY_CAPTURE_REGEX)[0];
        }
        let autoShowFilters = [],
            filterWithCollapse = [],
            updatedFacetData = [];
        if (
            facetdatacategory &&
            facetdatacategory.filters &&
            facetdatacategory.filters.length > 1 &&
            facetData &&
            facetData.length > 0 &&
            restrictedFilterData.length > 0
        ) {
            updatedFacetData = facetData.filter(el1 => {
                return JSON.parse(restrictedFilterData).find(el2 => el1.key === el2);
            });
            facetData = updatedFacetData;
        }

        if (facetData) {
            let facetCount = facetData.length;
            autoShowFilters = cloneDeep(facetData).splice(0, 4);
            filterWithCollapse = cloneDeep(facetData).splice(4, facetCount);
        } else {
            return <div />;
        }
        let showCloseIcon = false;
        const storedPlpUrl = localStorage.getItem(LAST_PLP_URL);
        if (storedPlpUrl && storedPlpUrl.includes("/search/?searchCategory")) {
            showCloseIcon = true;
        }

        return (
            <React.Fragment>
                {this.state.openBrandPopUp &&
                    autoShowFilters.map(facetDataValues => {
                        return (
                            facetDataValues &&
                            facetDataValues.name === BRAND &&
                            facetDataValues.values && (
                                <ShowBrandModal
                                    typeOfFilter={facetDataValues.name}
                                    brandData={facetDataValues.values}
                                    closeModal={() => this.setState({ openBrandPopUp: false })}
                                    onSelect={(data, filterType, filterValue) =>
                                        this.onFilterClick(data, filterType, filterValue)
                                    }
                                />
                            )
                        );
                    })}
                <div className={styles.filterScroll} id="filterWrapper_desktop">
                    <div className={styles.filterDetails} id="filter_desktop">
                        <div className={styles.filtersOptionsList}>
                            {/*                             <Accordion
                                text1="Refine"
                                text2="Clear all"
                                isOpen={true}
                                headerFontSize={16}
                                text1Size={14}
                                text2Color={"#fe214c"}
                                text2FontFamily="light"
                                text2Size={14}
                                textAlign={"right"}
                                handleClick={() => this.onClear()}
                                padding="0px 40px 0px 20px"
                                backgroundColor="#f9f9f9"
                            > */}
                            <div className={styles.subFilterDetails}>
                                <div className={styles.newFilterHolder}>
                                    {/* Conditions for handling L1 filters */}
                                    {this.props.isCategorySelected &&
                                    facetdatacategory &&
                                    facetdatacategory.filters &&
                                    facetdatacategory.filters.length > 1 ? (
                                        <Accordion isOpen={true} padding="0px 40px 0px 20px">
                                            <div className={styles.newFilterBlock}>
                                                <div className={styles.newFilHeader}>Department</div>
                                                <L1CategoryFilter
                                                    l1filters={facetdatacategory.filters}
                                                    onL1Click={this.onL1Click}
                                                />
                                            </div>
                                        </Accordion>
                                    ) : null}
                                    {this.props.isCategorySelected &&
                                        facetdatacategory &&
                                        facetdatacategory.filters &&
                                        facetdatacategory.filters.length === 1 &&
                                        facetdatacategory.filters.map((val, i) => {
                                            if (val.quantity > 1) {
                                                return (
                                                    <div className={styles.newFilterBlock}>
                                                        <div className={styles.newFilHeader}>Department</div>
                                                        <div className={styles.newFilSelcted} key={i}>
                                                            <SelectedCategoryLevel
                                                                name={val.categoryName}
                                                                showCloseIcon={showCloseIcon}
                                                                onClickResetL1={this.resetL1Category}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            } else return null;
                                        })}
                                    {/* Conditions for handling L2 filters */}
                                    {this.props.isCategorySelected &&
                                        facetdatacategory &&
                                        facetdatacategory.filters &&
                                        facetdatacategory.filters.length === 1 &&
                                        facetdatacategory.filters.map((val, i) => {
                                            if (val.childFilters && val.childFilters.length > 1) {
                                                return (
                                                    <div className={styles.newFilterBlock} key={i}>
                                                        <div className={styles.newFilHeader}>Category</div>
                                                        <Accordion isOpen={true} padding="0px 40px 0px 20px">
                                                            <L2CategoryFilter
                                                                l2filters={val.childFilters}
                                                                onClick={this.onL2Click}
                                                            />
                                                        </Accordion>
                                                    </div>
                                                );
                                            } else if (val.childFilters && val.childFilters.length === 1) {
                                                return (
                                                    <div className={styles.newFilSelcted} key={i}>
                                                        <div className={styles.newFilterBlock}>
                                                            <div className={styles.newFilHeader}>Category</div>
                                                            <SelectedCategoryLevel
                                                                name={val.childFilters[0].categoryName}
                                                                onL1Click={this.onL1Click}
                                                                l1Name={val.categoryName}
                                                                l1CategoryCode={val.categoryCode}
                                                                showCloseIcon={true}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            } else return null;
                                        })}
                                    {/* Conditions for handling L3 filters */}
                                    {this.props.isCategorySelected &&
                                        facetdatacategory &&
                                        facetdatacategory.filters &&
                                        facetdatacategory.filters.length === 1 &&
                                        facetdatacategory.filters.map((val, i) => {
                                            if (
                                                val.childFilters &&
                                                val.childFilters.length === 1 &&
                                                /*  !val.selected && */
                                                val.childFilters[0] &&
                                                /* val.childFilters[0].selected && */
                                                val.childFilters[0].childFilters &&
                                                /* val.childFilters[0].childFilters.length > 0 */
                                                val.childFilters[0].childFilters.length > 1
                                            ) {
                                                return (
                                                    <div className={styles.newFilterBlock} key={i}>
                                                        <div className={styles.newFilHeader}>Product Type</div>
                                                        <Accordion isOpen={true} padding="0px 40px 0px 20px">
                                                            <L3CategoryFilter
                                                                l3filters={val.childFilters[0].childFilters}
                                                                onL3Click={this.onL3Click}
                                                            />
                                                        </Accordion>
                                                    </div>
                                                );
                                            } else if (
                                                val.childFilters &&
                                                val.childFilters.length === 1 &&
                                                /*  !val.selected && */
                                                val.childFilters[0] &&
                                                val.childFilters[0].childFilters &&
                                                val.childFilters[0].childFilters.length ===
                                                    1 /*&&
                                                     val.childFilters[0].childFilters[0].selected */
                                            ) {
                                                return (
                                                    <div className={styles.newFilSelcted} key={i}>
                                                        <div className={styles.newFilterBlock}>
                                                            <div className={styles.newFilHeader}>Product Type</div>
                                                            <SelectedCategoryLevel
                                                                name={val.childFilters[0].childFilters[0].categoryName}
                                                                onClick={this.onL2Click}
                                                                l2Name={val.childFilters[0].categoryName}
                                                                l2CategoryCode={val.childFilters[0].categoryCode}
                                                                showCloseIcon={true}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            } else if (
                                                // eslint-disable-next-line no-dupe-else-if
                                                val.childFilters &&
                                                val.childFilters.length === 1 &&
                                                /*  !val.selected && */
                                                val.childFilters[0] &&
                                                val.childFilters[0].childFilters &&
                                                val.childFilters[0].childFilters.length === 1 &&
                                                val.childFilters[0].childFilters[0].childFilters &&
                                                val.childFilters[0].childFilters[0].childFilters.length ===
                                                    1 /*&&
                                                     val.childFilters[0].childFilters[0].childFilters[0].selected */
                                            ) {
                                                return (
                                                    <div className={styles.newFilSelcted} key={i}>
                                                        <div className={styles.newFilterBlock}>
                                                            <div className={styles.newFilHeader}>Product Type</div>
                                                            <SelectedCategoryLevel
                                                                name={val.childFilters[0].childFilters[0].categoryName}
                                                                onClick={this.onL2Click}
                                                                l2Name={val.childFilters[0].categoryName}
                                                                l2CategoryCode={val.childFilters[0].categoryCode}
                                                                showCloseIcon={true}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            } else return null;
                                        })}
                                    {/* Conditions for handling L4 filters */}
                                    {this.props.isCategorySelected &&
                                        facetdatacategory &&
                                        facetdatacategory.filters &&
                                        facetdatacategory.filters.length === 1 &&
                                        facetdatacategory.filters.map((val, i) => {
                                            if (
                                                val.childFilters &&
                                                val.childFilters.length === 1 &&
                                                /*  !val.selected && */
                                                val.childFilters[0] &&
                                                /* !val.childFilters[0].selected && */
                                                val.childFilters[0].childFilters &&
                                                val.childFilters[0].childFilters.length === 1 &&
                                                val.childFilters[0].childFilters[0].childFilters &&
                                                val.childFilters[0].childFilters[0].childFilters.length >
                                                    1 /*&&
                                                     val.childFilters[0].childFilters[0].selected */
                                            ) {
                                                return (
                                                    <div className={styles.newFilterBlock} key={i}>
                                                        <div className={styles.newFilterBlock}>
                                                            <div className={styles.newFilHeader}>
                                                                Leaf Node Product Type
                                                            </div>
                                                            <Accordion isOpen={true} padding="0px 40px 0px 20px">
                                                                <L4CategoryFilter
                                                                    l4filters={
                                                                        val.childFilters[0].childFilters[0].childFilters
                                                                    }
                                                                    onL4Click={this.onL3Click}
                                                                />
                                                            </Accordion>
                                                        </div>
                                                    </div>
                                                );
                                            } else if (
                                                val.childFilters &&
                                                val.childFilters.length === 1 &&
                                                /* !val.selected && */
                                                val.childFilters[0] &&
                                                /*  !val.childFilters[0].selected && */
                                                val.childFilters[0].childFilters &&
                                                val.childFilters[0].childFilters.length > 0 &&
                                                val.childFilters[0].childFilters[0].childFilters &&
                                                val.childFilters[0].childFilters[0].childFilters.length ===
                                                    1 /*  &&
                                                    val.childFilters[0].childFilters[0].childFilters[0].selected */
                                            ) {
                                                return (
                                                    <div className={styles.newFilSelcted} key={i}>
                                                        <div className={styles.newFilterBlock}>
                                                            <div className={styles.newFilHeader}>
                                                                Leaf Node Product Type
                                                            </div>
                                                            <SelectedCategoryLevel
                                                                name={
                                                                    val.childFilters[0].childFilters[0].childFilters[0]
                                                                        .categoryName
                                                                }
                                                                onL4Click={this.onL3Click}
                                                                l3Name={
                                                                    val.childFilters[0].childFilters[0].categoryName
                                                                }
                                                                l3CategoryCode={
                                                                    val.childFilters[0].childFilters[0].categoryCode
                                                                }
                                                                showCloseIcon={true}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            } else return null;
                                        })}
                                </div>
                                {/*   <div className={styles.filterHeader}>Category</div>
                                    <div className={styles.catagoryHolder}>
                                        {this.props.isCategorySelected &&
                                            facetdatacategory &&
                                            facetdatacategory.filters &&
                                            facetdatacategory.filters.map((val, i) => {
                                                if (val.quantity > 0) {
                                                    return (
                                                        <FilterCategoryL1
                                                            name={val.categoryName}
                                                            count={val.quantity}
                                                            value={val.categoryCode}
                                                            onL1Click={this.onL1Click}
                                                            isOpen={val.selected}
                                                            key={i}
                                                        >
                                                            <FilterCategory
                                                                onClick={this.onL2Click}
                                                                onL3Click={this.onL3Click}
                                                                categoryTypeList={val.childFilters}
                                                                key={i}
                                                            />
                                                        </FilterCategoryL1>
                                                    );
                                                }
                                            })}
                                    </div> */}

                                {autoShowFilters.map((facetDataValues, i) => {
                                    return (
                                        facetDataValues && (
                                            <div className={styles.facetData} key={i}>
                                                <div className={styles.filterHeader}>{facetDataValues.name}</div>
                                                <div className={styles.allDataHolder}>
                                                    <div className={styles.colorHolder}>
                                                        {facetDataValues &&
                                                            facetDataValues.name === COLOUR &&
                                                            facetDataValues.values &&
                                                            this.state.showAllColor === false &&
                                                            facetDataValues.values.map((val, i) => {
                                                                if (i < 10) {
                                                                    return (
                                                                        <ColourSelect
                                                                            typeOfFilter={facetDataValues.name}
                                                                            colour={val.hexColor}
                                                                            webUrl={val.webURL}
                                                                            colourValue={val.name}
                                                                            onSelect={(
                                                                                data,
                                                                                filterType,
                                                                                filterValue,
                                                                                bla,
                                                                                webUrl,
                                                                                colourValue
                                                                            ) =>
                                                                                this.onFilterClick(
                                                                                    data,
                                                                                    filterType,
                                                                                    filterValue,
                                                                                    bla,
                                                                                    webUrl,
                                                                                    colourValue
                                                                                )
                                                                            }
                                                                            selected={val.selected}
                                                                            value={val.url}
                                                                            key={i}
                                                                            index={i}
                                                                        />
                                                                    );
                                                                }
                                                            })}
                                                        {facetDataValues &&
                                                            facetDataValues.name === COLOUR &&
                                                            facetDataValues.values &&
                                                            this.state.showAllColor === true &&
                                                            facetDataValues.values.map((val, i) => {
                                                                return (
                                                                    <ColourSelect
                                                                        key={i}
                                                                        typeOfFilter={facetDataValues.name}
                                                                        colour={val.hexColor}
                                                                        onSelect={(
                                                                            data,
                                                                            filterType,
                                                                            filterValue,
                                                                            bla,
                                                                            webUrl,
                                                                            colourValue
                                                                        ) =>
                                                                            this.onFilterClick(
                                                                                data,
                                                                                filterType,
                                                                                filterValue,
                                                                                bla,
                                                                                webUrl,
                                                                                colourValue
                                                                            )
                                                                        }
                                                                        colourValue={val.name}
                                                                        selected={val.selected}
                                                                        value={val.url}
                                                                    />
                                                                );
                                                            })}
                                                    </div>
                                                    <DesktopOnly>
                                                        {facetDataValues &&
                                                            facetDataValues.name === COLOUR &&
                                                            facetDataValues.values &&
                                                            facetDataValues.values.length > 10 && (
                                                                <div className={styles.expandButtonHolder}>
                                                                    <div
                                                                        className={styles.moreText}
                                                                        onClick={() => this.viewMoreColor()}
                                                                    >
                                                                        {this.state.showAllColor ? "Less" : "More"}
                                                                    </div>
                                                                </div>
                                                            )}
                                                    </DesktopOnly>
                                                </div>
                                                <div className={styles.filterBrandHolder}>
                                                    {facetDataValues &&
                                                        facetDataValues.name === BRAND &&
                                                        facetDataValues.values && (
                                                            <div>
                                                                <BrandFilterTabDesktop
                                                                    typeOfFilter={facetDataValues.name}
                                                                    onFilterClick={this.onFilterClick}
                                                                    brandsList={facetDataValues.values}
                                                                    onBrandSearch={this.onBrandSearch}
                                                                    history={this.props.history}
                                                                />
                                                            </div>
                                                        )}
                                                    <DesktopOnly>
                                                        {facetDataValues &&
                                                            facetDataValues.name === BRAND &&
                                                            facetDataValues.values.length > 5 && (
                                                                <div className={styles.expandButtonHolder}>
                                                                    <div
                                                                        className={styles.moreText}
                                                                        style={{
                                                                            marginRight: 0,
                                                                        }}
                                                                        onClick={() =>
                                                                            this.viewMore(facetDataValues.values)
                                                                        }
                                                                    >
                                                                        {`+ ${facetDataValues.values.length} more`}
                                                                    </div>
                                                                </div>
                                                            )}
                                                    </DesktopOnly>
                                                </div>
                                                {facetDataValues && facetDataValues.name === PRICE && (
                                                    <div className={styles.filterPriceHolder}>
                                                        {facetDataValues.values && (
                                                            <div>
                                                                <PriceFilterTabDesktop
                                                                    rangeApplied={facetDataValues.rangeApplied}
                                                                    typeOfFilter={facetDataValues.name}
                                                                    priceList={facetDataValues.values}
                                                                    customRange={facetDataValues.customeRange}
                                                                    history={this.props.history}
                                                                    onFilterClick={this.onFilterClick}
                                                                    query={this.props.query}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                {facetDataValues &&
                                                    facetDataValues.name !== COLOUR &&
                                                    facetDataValues.name !== BRAND &&
                                                    facetDataValues.name !== PRICE && (
                                                        <div className={styles.filterPriceHolder}>
                                                            {facetDataValues.values && (
                                                                <div>
                                                                    {facetDataValues.values.map((val, i) => {
                                                                        return (
                                                                            <FilterSelect
                                                                                onClick={this.onFilterClick}
                                                                                selected={val.selected}
                                                                                hexColor={val.hexColor}
                                                                                label={val.name}
                                                                                count={val.count}
                                                                                url={val.url}
                                                                                value={val.value}
                                                                                isBrand={facetDataValues.name === BRAND}
                                                                                categoryId={categoryId}
                                                                                history={this.props.history}
                                                                                typeOfFilter={facetDataValues.name}
                                                                                key={i}
                                                                            />
                                                                        );
                                                                    })}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                            {/*    </Accordion> */}
                        </div>
                        <div className={styles.filtersOptions}>
                            {filterWithCollapse.map((facetDataValues, i) => {
                                const isOpen =
                                    (facetDataValues.values &&
                                        facetDataValues.values.filter(filter => {
                                            return filter.selected;
                                        }).length > 0) ||
                                    this.state.openedFilters.includes(facetDataValues.name) ||
                                    facetDataValues.customeRange;
                                return (
                                    facetDataValues && (
                                        <div className={styles.facetData}>
                                            <Accordion
                                                key={i}
                                                text1={facetDataValues.name}
                                                widthForText1="100%"
                                                text1FontFamily={isOpen ? "semibold" : "light"}
                                                text1Color="#212121"
                                                text1Size="14px"
                                                headerFontSize={16}
                                                isOpen={isOpen}
                                                padding="0px 40px 0px 20px"
                                                onOpen={() => this.onOpenAccordion(facetDataValues.name)}
                                            >
                                                {facetDataValues &&
                                                    facetDataValues.name === COLOUR &&
                                                    facetDataValues.values && (
                                                        <div className={styles.allDataHolder}>
                                                            {facetDataValues.values.map((val, i) => {
                                                                return (
                                                                    <ColourSelect
                                                                        key={i}
                                                                        typeOfFilter={facetDataValues.name}
                                                                        colour={val.hexColor}
                                                                        onSelect={(data, filterType, filterValue) =>
                                                                            this.onFilterClick(
                                                                                data,
                                                                                filterType,
                                                                                filterValue
                                                                            )
                                                                        }
                                                                        selected={val.selected}
                                                                        value={val.url}
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                <div className={styles.filtersSubTab}>
                                                    {facetDataValues && facetDataValues.name === BRAND && (
                                                        <div className={styles.allDataHolder}>
                                                            {facetDataValues.values && (
                                                                <BrandFilterTabDesktop
                                                                    typeOfFilter={facetDataValues.name}
                                                                    brandsList={facetDataValues.values}
                                                                    onBrandSearch={this.onBrandSearch}
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                    {facetDataValues && facetDataValues.name === PRICE && (
                                                        <div className={styles.allDataHolder}>
                                                            {facetDataValues.values && (
                                                                <PriceFilterTabDesktop
                                                                    rangeApplied={facetDataValues.rangeApplied}
                                                                    typeOfFilter={facetDataValues.name}
                                                                    priceList={facetDataValues.values}
                                                                    customRange={facetDataValues.customeRange}
                                                                    history={this.props.history}
                                                                    onFilterClick={this.onFilterClick}
                                                                    query={this.props.query}
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                    {facetDataValues &&
                                                        facetDataValues.name !== COLOUR &&
                                                        facetDataValues.name !== BRAND &&
                                                        facetDataValues.name !== PRICE &&
                                                        facetDataValues.values && (
                                                            <div className={styles.allDataHolder}>
                                                                {facetDataValues.values.map((val, i) => {
                                                                    return (
                                                                        <FilterSelect
                                                                            onClick={this.onFilterClick}
                                                                            selected={val.selected}
                                                                            hexColor={val.hexColor}
                                                                            label={val.name}
                                                                            count={val.count}
                                                                            url={val.url}
                                                                            value={val.value}
                                                                            isBrand={facetDataValues.name === BRAND}
                                                                            categoryId={categoryId}
                                                                            history={this.props.history}
                                                                            typeOfFilter={facetDataValues.name}
                                                                            key={i}
                                                                        />
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                </div>
                                            </Accordion>
                                        </div>
                                    )
                                );
                            })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
