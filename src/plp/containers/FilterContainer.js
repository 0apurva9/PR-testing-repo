import { connect } from "react-redux";
import FilterWrapper from "../components/FilterWrapper.js";
import { withRouter } from "react-router-dom";
import {
    setFilterSelectedData,
    resetFilterSelectedData,
    userSelectedOutOfStock,
    getRestrictedFilters,
} from "../actions/plp.actions.js";
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onApply: () => {
            ownProps.onApply();
        },
        setFilterSelectedData: (isCategorySelected, filterTabIndex) => {
            dispatch(setFilterSelectedData(isCategorySelected, filterTabIndex));
        },
        resetFilterSelectedData: () => {
            dispatch(resetFilterSelectedData());
        },
        onL3CategorySelect: () => {
            ownProps.onL3CategorySelect();
        },
        userSelectedOutOfStock: flag => {
            dispatch(userSelectedOutOfStock(flag));
        },
        getRestrictedFilters: flag => {
            dispatch(getRestrictedFilters(flag));
        },
    };
};

const mapStateToProps = (state, ownProps) => {
    let isCategorySelected;
    if (!state.productListings.productListings.facetdatacategory) {
        isCategorySelected = false;
    } else {
        isCategorySelected = state.productListings.isCategorySelected;
    }
    const selectedFacetKey = state.productListings.selectedFacetKey;
    // cases

    // The key is there and it's position has changed
    // Key is there and it's position has not changed
    // key is no longer there.

    const facetData = state.productListings.productListings.facetdata;
    let filterSelectedIndex = state.productListings.filterTabIndex;
    if (facetData) {
        let indexOfKey = facetData.findIndex(datum => {
            return datum.key === selectedFacetKey;
        });
        if (indexOfKey === -1) {
            indexOfKey = 0;
        }
        filterSelectedIndex = indexOfKey;
    }
    return {
        ...ownProps,
        facetData: state.productListings.productListings.facetdata,
        facetdatacategory: state.productListings.productListings.facetdatacategory,
        filterSelectedIndex,
        isCategorySelected,
        query:
            state.productListings &&
            state.productListings.productListings &&
            state.productListings.productListings.currentQuery &&
            state.productListings.productListings.currentQuery.query
                ? state.productListings.productListings.currentQuery.query.value
                : null,
        getRestrictedFilterStatus: state.productListings.getRestrictedFilterStatus,
    };
};

const FilterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterWrapper));

export default FilterContainer;
