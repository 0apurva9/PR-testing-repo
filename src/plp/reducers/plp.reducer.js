import * as plpActions from "../actions/plp.actions";
import concat from "lodash.concat";
import cloneDeep from "lodash.clonedeep";
import { CLEAR_ERROR } from "../../general/error.actions";
const productListings = (
  state = {
    status: null,
    error: null,
    loading: false,
    productListings: null,
    pageNumber: 0,
    paginatedLoading: false,
    isFilterOpen: false,
    filterTabIndex: 0,
    isCategorySelected: true,
    selectedFacetKey: null,
    filterHasBeenClicked: false,
    sortHasBeenClicked: false,
    clickedProductModuleRef: null,
    lastVisitedPlpUrl: null,
    deselectedOutOfStock: false,
    urlString: null,
    loadMsdSkeleton: null,
    searchMsdData: [],
    banners: []
  },
  action
) => {
  let existingProductListings;
  let toUpdate;
  switch (action.type) {
    case plpActions.SET_PRODUCT_MODULE_REF:
      return Object.assign({}, state, {
        clickedProductModuleRef: action.ref
      });
    case plpActions.CLEAR_PRODUCT_MODULE_REF:
      return Object.assign({}, state, {
        clickedProductModuleRef: null
      });
    case plpActions.NULL_SEARCH_MSD_SUCCESS:
      return Object.assign({}, state, {
        loadMsdSkeleton: false,
        searchMsdData: action.searchMsdData
      });
    case plpActions.NULL_SEARCH_MSD_REQUEST:
      return Object.assign({}, state, {
        loadMsdSkeleton: true,
        loading: false
      });
    case CLEAR_ERROR:
      return Object.assign({}, state, {
        error: null
      });
    case plpActions.SET_PLP_PATH:
      return Object.assign({}, state, {
        lastVisitedPlpUrl: action.url
      });
    case plpActions.SORT_HAS_BEEN_CLICKED:
      return Object.assign({}, state, {
        sortHasBeenClicked: true
      });
    case plpActions.FILTER_HAS_BEEN_CLICKED:
      return Object.assign({}, state, {
        filterHasBeenClicked: true
      });
    case plpActions.SET_FILTER_SELECTED_DATA:
      const selectedFacetKey =
        state.productListings.facetdata[action.filterTabIndex].key;
      return Object.assign({}, state, {
        filterTabIndex: action.filterTabIndex,
        isCategorySelected: action.isCategorySelected,
        selectedFacetKey
      });
    case plpActions.RESET_FILTER_SELECTED_DATA:
      return Object.assign({}, state, {
        filterTabIndex: 0,
        isCategorySelected: true,
        selectedFacetKey: null
      });
    case plpActions.SHOW_FILTER:
      return Object.assign({}, state, {
        isFilterOpen: true
      });
    case plpActions.HIDE_FILTER:
      return Object.assign({}, state, {
        isFilterOpen: false
      });
    case plpActions.UPDATE_FACETS:
      let productListings = cloneDeep(state.productListings);
      if (!productListings) {
        productListings = action.productListings;
      } else {
        productListings.facetdata = action.productListings.facetdata;
        productListings.facetdatacategory =
          action.productListings.facetdatacategory;
      }

      return Object.assign({}, state, {
        productListings,
        loading: false
      });
    case plpActions.PRODUCT_LISTINGS_REQUEST:
      toUpdate = {
        status: action.status
      };

      if (action.isPaginated) {
        toUpdate.paginatedLoading = true;
        toUpdate.loading = false;
      } else {
        toUpdate.paginatedLoading = false;
        toUpdate.loading = true;
      }

      if (!action.isPaginated && !action.isFilter) {
        toUpdate.productListings = null;
      }
      return Object.assign({}, state, toUpdate);
    case plpActions.PRODUCT_LISTINGS_REQUEST_WITHOUT_CLEAR:
      toUpdate = {
        status: action.status,
        urlString: null
      };

      if (action.isPaginated) {
        toUpdate.paginatedLoading = true;
        toUpdate.loading = false;
      } else {
        toUpdate.paginatedLoading = false;
        toUpdate.loading = true;
      }

      return Object.assign({}, state, toUpdate);
    case plpActions.PRODUCT_LISTINGS_SUCCESS:
      toUpdate = {
        status: action.status
      };

      if (action.isPaginated) {
        toUpdate.paginatedLoading = true;
        toUpdate.loading = false;
      } else {
        toUpdate.paginatedLoading = false;
        toUpdate.loading = true;
      }
      return Object.assign({}, state, {
        status: action.status,
        productListings: action.productListings,
        isGoBackFromPdpPage: false,
        clickedProductModuleRef: null,
        loading: false
      });

    case plpActions.PRODUCT_LISTINGS_FAILURE:
      toUpdate = {
        status: action.status
      };

      if (action.isPaginated) {
        toUpdate.paginatedLoading = true;
        toUpdate.loading = false;
      } else {
        toUpdate.paginatedLoading = false;
        toUpdate.loading = true;
      }
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        isFilterOpen: false,
        productListings: null,
        loading: false,
        selectedFacetKey: null,
        pageNumber: 0,
        filterTabIndex: 0,
        paginatedLoading: false
      });
    case plpActions.SET_PAGE:
      return Object.assign({}, state, {
        pageNumber: action.pageNumber
      });
    case plpActions.USER_SELECTED_OUT_OF_STOCK:
      return Object.assign({}, state, {
        deselectedOutOfStock: action.deselectedOutOfStock
      });
    case plpActions.GET_PRODUCT_LISTINGS_PAGINATED_SUCCESS:
      let searchResults = cloneDeep(state.productListings.searchresult);
      searchResults = concat(
        searchResults,
        action.productListings.searchresult
      );
      existingProductListings = cloneDeep(state.productListings);
      existingProductListings.searchresult = searchResults;
      existingProductListings.pagination = action.productListings.pagination;
      existingProductListings.seo = action.productListings.seo;
      return Object.assign({}, state, {
        productListings: existingProductListings,
        status: action.status
      });
    case plpActions.SEARCH_URL_REDIRECT:
      return Object.assign({}, state, {
        urlString: action.value
      });
    case plpActions.VIEW_SIMILAR_PRODUCTS:
      return Object.assign({}, state, {
        viewSimilarProductOfId: action.productListingId
      });
    case plpActions.GET_PLP_BANNERS_SUCCESS:
      return {
        ...state,
        banners: action.banners
      };
    case plpActions.GET_PLP_BANNERS_FAILURE:
      return {
        ...state,
        banners: []
      };
    default:
      return state;
  }
};

export default productListings;
