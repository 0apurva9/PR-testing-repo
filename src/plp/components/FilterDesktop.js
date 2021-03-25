import React from "react";
import cloneDeep from "lodash.clonedeep";
import FilterSelect from "./FilterSelect";
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
const LANDING_SEARCH_URL = "landingSearchUrl";
const CATEGORY_BRAND_LANDING_URL = "categoryBrandLandingUrl";
export default class FilterDesktop extends React.Component {
    constructor() {
        super();
        this.state = {
            openedFilters: [],
            openBrandPopUp: false,
            showAllColor: false,
            restrictedFilterData: [],
            l1Accordion: false,
            l2Accordion: false,
            l3Accordion: false,
            l4Accordion: false,
            otherfacetUpdated: false,
        };
    }

    onClear = () => {
        const url = localStorage.getItem(LANDING_SEARCH_URL);
        const url2 = localStorage.getItem(CATEGORY_BRAND_LANDING_URL);
        if (url) {
            this.props.history.push(url, {
                isFilter: false,
            });
        } else if (url2) {
            this.props.history.push(url2, {
                isFilter: false,
            });
        } else {
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

    onL1Click = (val, filterType, filterValue, filterName, i, l2Deselect = false) => {
        const storedPlpUrl = localStorage.getItem(LAST_PLP_URL);
        const currentUrl = `${this.props.location.pathname}${this.props.location.search}`;
        if (storedPlpUrl && !l2Deselect) {
            localStorage.removeItem(LAST_PLP_URL);
            localStorage.setItem(LAST_PLP_URL, currentUrl);
            this.onCategorySelect(val, filterType, filterValue, filterName, false, i);
        } else {
            if (!l2Deselect) {
                localStorage.setItem(LAST_PLP_URL, currentUrl);
                this.onCategorySelect(val, filterType, filterValue, filterName, false, i);
            } else {
                this.onCategorySelect(val, filterType, filterValue, filterName, false, i);
            }
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
        if ((storedPlpUrl && storedPlpUrl.includes("/search/?searchCategory")) || storedPlpUrl.includes("/search/")) {
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
        const openedFilters = [];
        const indexOfFilter = this.state.openedFilters.indexOf(filterName);
        if (indexOfFilter >= 0) {
            this.setState({ openedFilters: [], otherfacetUpdated: true });
        } else {
            openedFilters.push(filterName);
            this.setState({ openedFilters: openedFilters, otherfacetUpdated: true });
        }
    };

    handleCategoryAccordion = accordionName => {
        this.setState(prevState => ({
            [accordionName]: !prevState[accordionName],
        }));
    };

    viewMore() {
        this.setState({ openBrandPopUp: true });
    }

    viewMoreColor() {
        this.setState({ showAllColor: !this.state.showAllColor });
    }

    setCategoryLevelAccordion(incomingProps) {
        if (
            incomingProps.productListings &&
            incomingProps.productListings.facetdatacategory &&
            incomingProps.productListings.facetdatacategory.filters &&
            incomingProps.productListings.facetdatacategory.filters.length > 1
        ) {
            if (!this.state.l1Accordion) {
                this.setState({ l1Accordion: true });
            }
        }
        if (
            incomingProps.productListings &&
            incomingProps.productListings.facetdatacategory &&
            incomingProps.productListings.facetdatacategory.filters &&
            incomingProps.productListings.facetdatacategory.filters.length === 1
        ) {
            if (
                incomingProps.productListings.facetdatacategory.filters[0].childFilters &&
                incomingProps.productListings.facetdatacategory.filters[0].childFilters.length > 1
            ) {
                if (!this.state.l2Accordion) {
                    this.setState({ l2Accordion: true });
                }
            } else if (
                incomingProps.productListings.facetdatacategory.filters[0].childFilters.length === 1 &&
                incomingProps.productListings.facetdatacategory.filters[0].childFilters[0].childFilters &&
                incomingProps.productListings.facetdatacategory.filters[0].childFilters[0].childFilters.length > 1
            ) {
                if (!this.state.l3Accordion) {
                    this.setState({ l3Accordion: true });
                }
            } else if (
                incomingProps.productListings.facetdatacategory.filters[0].childFilters.length === 1 &&
                incomingProps.productListings.facetdatacategory.filters[0].childFilters[0].childFilters &&
                incomingProps.productListings.facetdatacategory.filters[0].childFilters[0].childFilters.length === 1 &&
                incomingProps.productListings.facetdatacategory.filters[0].childFilters[0].childFilters[0] &&
                incomingProps.productListings.facetdatacategory.filters[0].childFilters[0].childFilters[0]
                    .childFilters &&
                incomingProps.productListings.facetdatacategory.filters[0].childFilters[0].childFilters[0].childFilters
                    .length > 1
            ) {
                if (!this.state.l4Accordion) {
                    this.setState({ l4Accordion: true });
                }
            }
        }
    }

    conditionToOpenCatLevelAccordion = (propsPrevious, statePrevious) => {
        if (
            statePrevious.l1Accordion === this.state.l1Accordion &&
            statePrevious.l1Accordion === false &&
            this.state.l1Accordion === false &&
            statePrevious.l2Accordion === this.state.l2Accordion &&
            statePrevious.l2Accordion === false &&
            this.state.l2Accordion === false &&
            statePrevious.l3Accordion === this.state.l3Accordion &&
            statePrevious.l3Accordion === false &&
            this.state.l3Accordion === false &&
            statePrevious.l4Accordion === this.state.l4Accordion &&
            statePrevious.l4Accordion === false &&
            this.state.l4Accordion === false &&
            this.state.otherfacetUpdated === false
        ) {
            return true;
        }
    };

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

    componentDidUpdate(prevProps, prevState) {
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
        if (this.conditionToOpenCatLevelAccordion(prevProps, prevState)) {
            this.setCategoryLevelAccordion(this.props);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setCategoryLevelAccordion(nextProps);
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
        if (
            storedPlpUrl &&
            (storedPlpUrl.includes("/search/?searchCategory") || storedPlpUrl.includes("/search/")) &&
            this.props.location &&
            this.props.location.state &&
            !this.props.location.state.categoryOrBrand
        ) {
            showCloseIcon = true;
        }

        const filterContainer = document.getElementById("filter-container");
        if (filterContainer && this.state.openBrandPopUp) {
            filterContainer.classList.add(styles.brandModalFix);
        }

        if (!this.state.openBrandPopUp) {
            if (filterContainer) {
                filterContainer.classList.remove(styles.brandModalFix);
            }
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
                <div className={styles.filterScrollnew}>
                    <div className={styles.filterDetails}>
                        <div className={styles.filterClearBlock}>
                            <div className={styles.filterClearTxt1}>Filters</div>
                            <div className={styles.filterClearBtn}>
                                <div onClick={() => this.onClear()}>
                                    <span className={styles.pointer}>Clear All</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.subFilterDetails}>
                            <div className={styles.newFilterHolder}>
                                {/* Conditions for handling L1 filters */}
                                {this.props.isCategorySelected &&
                                facetdatacategory &&
                                facetdatacategory.filters &&
                                facetdatacategory.filters.length > 1 ? (
                                    <div className={styles.newFilterBlock}>
                                        <Accordion
                                            text1={"Department"}
                                            filterAccHolder={true}
                                            isOpen={this.state.l1Accordion}
                                            onOpen={() => this.handleCategoryAccordion("l1Accordion")}
                                            iconPlus={true}
                                            text3Color={"#212121"}
                                            text3FontFamily={"semibold"}
                                            iconMinus={true}
                                            headText={true}
                                            filtHeadLine={true}
                                        >
                                            <L1CategoryFilter
                                                l1filters={facetdatacategory.filters}
                                                onL1Click={this.onL1Click}
                                            />
                                        </Accordion>
                                    </div>
                                ) : null}
                                {this.props.isCategorySelected &&
                                    facetdatacategory &&
                                    facetdatacategory.filters &&
                                    facetdatacategory.filters.length === 1 &&
                                    facetdatacategory.filters.map((val, i) => {
                                        if (val.quantity > 0) {
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
                                                    <Accordion
                                                        text1={"Category"}
                                                        filterAccHolder={true}
                                                        isOpen={this.state.l2Accordion}
                                                        onOpen={() => this.handleCategoryAccordion("l2Accordion")}
                                                        iconPlus={true}
                                                        text3Color={"#212121"}
                                                        text3FontFamily={"semibold"}
                                                        iconMinus={true}
                                                        headText={true}
                                                        filtHeadLine={true}
                                                    >
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
                                                            l2Deselect={true}
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
                                                    <Accordion
                                                        text1={"Product Type"}
                                                        filterAccHolder={true}
                                                        isOpen={this.state.l3Accordion}
                                                        onOpen={() => this.handleCategoryAccordion("l3Accordion")}
                                                        iconPlus={true}
                                                        text3Color={"#212121"}
                                                        text3FontFamily={"semibold"}
                                                        iconMinus={true}
                                                        headText={true}
                                                        filtHeadLine={true}
                                                    >
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
                                                    <Accordion
                                                        text1={"Subcategory"}
                                                        filterAccHolder={true}
                                                        isOpen={this.state.l4Accordion}
                                                        onOpen={() => this.handleCategoryAccordion("l4Accordion")}
                                                        iconPlus={true}
                                                        text3Color={"#212121"}
                                                        text3FontFamily={"semibold"}
                                                        iconMinus={true}
                                                        headText={true}
                                                        filtHeadLine={true}
                                                    >
                                                        <L4CategoryFilter
                                                            l4filters={val.childFilters[0].childFilters[0].childFilters}
                                                            onL4Click={this.onL3Click}
                                                        />
                                                    </Accordion>
                                                </div>
                                            );
                                        } else if (
                                            val.childFilters &&
                                            val.childFilters.length === 1 &&
                                            /* !val.selected && */
                                            val.childFilters[0] &&
                                            /*  !val.childFilters[0].selected && */
                                            val.childFilters[0].childFilters &&
                                            val.childFilters[0].childFilters.length === 1 &&
                                            val.childFilters[0].childFilters[0].childFilters &&
                                            val.childFilters[0].childFilters[0].childFilters.length ===
                                                1 /*  &&
                                                val.childFilters[0].childFilters[0].childFilters[0].selected */
                                        ) {
                                            return (
                                                <div className={styles.newFilSelcted} key={i}>
                                                    <div className={styles.newFilterBlock}>
                                                        <div className={styles.newFilHeader}>Subcategory</div>
                                                        <SelectedCategoryLevel
                                                            name={
                                                                val.childFilters[0].childFilters[0].childFilters[0]
                                                                    .categoryName
                                                            }
                                                            onL4Click={this.onL3Click}
                                                            l3Name={val.childFilters[0].childFilters[0].categoryName}
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
                                {autoShowFilters.map((facetDataValues, i) => {
                                    const isOpen = this.state.openedFilters.includes(facetDataValues.name);
                                    return (
                                        facetDataValues && (
                                            <div className={styles.newFilterBlock}>
                                                <Accordion
                                                    key={i}
                                                    text1={facetDataValues.name}
                                                    filterAccHolder={true}
                                                    iconPlus={true}
                                                    text3Color={"#212121"}
                                                    text3FontFamily={"semibold"}
                                                    iconMinus={true}
                                                    headText={true}
                                                    filtHeadLine={true}
                                                    isOpen={isOpen}
                                                    onOpen={() => this.onOpenAccordion(facetDataValues.name)}
                                                >
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
                                                                                    isBrand={
                                                                                        facetDataValues.name === BRAND
                                                                                    }
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
                                                </Accordion>
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                        </div>
                        <div className={styles.subFilterDetails}>
                            <div className={styles.AvailnewFilterHolder}>
                                {filterWithCollapse.map((facetDataValues, i) => {
                                    const isOpen =
                                        /*    (facetDataValues.values &&
                                            facetDataValues.values.filter(filter => {
                                                return filter.selected;
                                            }).length > 0) || */
                                        this.state.openedFilters.includes(
                                            facetDataValues.name
                                        ); /* ||
                                        facetDataValues.customeRange; */
                                    return (
                                        facetDataValues && (
                                            <div className={styles.facetData}>
                                                <Accordion
                                                    key={i}
                                                    isOpen={isOpen}
                                                    onOpen={() => this.onOpenAccordion(facetDataValues.name)}
                                                    text1={facetDataValues.name}
                                                    filterAccHolder={true}
                                                    iconPlus={true}
                                                    text3Color={"#212121"}
                                                    text3FontFamily={"semibold"}
                                                    iconMinus={true}
                                                    headText={true}
                                                    filtHeadLine={true}
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
                </div>
            </React.Fragment>
        );
    }
}
