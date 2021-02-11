import { connect } from "react-redux";
import { showModal, SORT } from "../../general/modal.actions";
import ProductListingsPage from "../components/ProductListingsPage";
import { withRouter } from "react-router-dom";
import { setSearchString } from "../../search/actions/search.actions.js";
import {
    getProductListings,
    setPage,
    clearProductModuleRef,
    getPlpBanners,
    getDefaultPlpView,
} from "../actions/plp.actions.js";
import queryString from "query-string";

const mapDispatchToProps = (dispatch, ownProps) => {
    let componentName =
        ownProps && ownProps.location && ownProps.location.state && ownProps.location.state.componentName
            ? ownProps.location.state.componentName
            : "";
    const parsedQueryString = queryString.parse(ownProps.location.search);
    return {
        showSort: () => {
            dispatch(showModal(SORT));
        },
        getProductListings: (search, suffix, page, isFilter) => {
            dispatch(setSearchString(search));
            dispatch(setPage(page));

            let searchSuffixes = suffix;
            const testVersion = sessionStorage.getItem("testVersion");
            const parsedTestVersion = parsedQueryString.test;

            if (parsedQueryString.qc && parsedQueryString.qc !== "false") {
                searchSuffixes = `${searchSuffixes}&qc=true`;
            } else {
                searchSuffixes = `${searchSuffixes}&qc=false`;
            }

            if (parsedTestVersion) {
                searchSuffixes = `${searchSuffixes}&test=${parsedTestVersion}`;
            } else if (testVersion) {
                searchSuffixes = `${searchSuffixes}&test=${testVersion}`;
            }

            dispatch(getProductListings(searchSuffixes, false, isFilter, componentName));
        },
        getPlpBanners: categoryId => dispatch(getPlpBanners(categoryId)),
        paginate: (page, suffix) => {
            dispatch(setPage(page));
            dispatch(getProductListings(suffix, true, false, componentName));
        },
        clearProductModuleRef: () => {
            dispatch(clearProductModuleRef());
        },
        getDefaultPlpView: () => {
            dispatch(getDefaultPlpView());
        },
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        searchText: ownProps.searchText ? ownProps.searchText : null,
        clickedProductModuleRef: state.productListings.clickedProductModuleRef,
        lastVisitedPlpUrl: state.productListings.lastVisitedPlpUrl,
        urlString: state.productListings.urlString,
        productListings: state.productListings.productListings,
    };
};

const ProductListingsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductListingsPage));

export default ProductListingsContainer;
