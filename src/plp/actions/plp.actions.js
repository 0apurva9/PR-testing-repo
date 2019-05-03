import {
  SUCCESS,
  REQUESTING,
  ERROR,
  USER_SEARCH_LOCAL_STORAGE
} from "../../lib/constants";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import {
  setDataLayer,
  ADOBE_PLP_TYPE,
  ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT,
  ADOBE_INTERNAL_SEARCH_CALL_ON_GET_NULL
} from "../../lib/adobeUtils";
import { checkUserAgentIsMobile } from "../../lib/UserAgent";
export const PRODUCT_LISTINGS_REQUEST = "PRODUCT_LISTINGS_REQUEST";
export const PRODUCT_LISTINGS_REQUEST_WITHOUT_CLEAR =
  "PRODUCT_LISTINGS_REQUEST_WITHOUT_CLEAR";
export const PRODUCT_LISTINGS_SUCCESS = "PRODUCT_LISTINGS_SUCCESS";
export const PRODUCT_LISTINGS_FAILURE = "PRODUCT_LISTINGS_FAILURE";
export const PLP_HAS_BEEN_VISITED = "PLP_HAS_BEEN_VISITED";
export const PLP_HAS_NOT_BEEN_VISITED = "PLP_HAS_NOT_BEEN_VISITED";
export const PRODUCT_LISTINGS_PATH = "v2/mpl/products/searchProducts";
let NO_OF_PRODUCT = 20;
if (!checkUserAgentIsMobile()) {
  NO_OF_PRODUCT = 40;
}
export const PRODUCT_LISTINGS_SUFFIX = `&isPwa=true&pageSize=${NO_OF_PRODUCT}&typeID=all`;
export const SORT_PRODUCT_LISTINGS_PATH = "searchProducts";
export const FILTER_PRODUCT_LISTINGS_PATH = "searchProducts";
export const GET_PRODUCT_LISTINGS_PAGINATED_SUCCESS =
  "GET_PRODUCT_LISTINGS_PAGINATED_SUCCESS";
export const SEARCH_URL_REDIRECT = "SEARCH_URL_REDIRECT";
export const SHOW_FILTER = "SHOW_FILTER";
export const HIDE_FILTER = "HIDE_FILTER";

export const SET_FILTER_SELECTED_DATA = "SET_FILTER_SELECTED_DATA";
export const RESET_FILTER_SELECTED_DATA = "RESET_FILTER_SELECTED_DATA";

export const UPDATE_FACETS = "UPDATE_FACETS";

export const SET_PAGE = "SET_PAGE";

export const FILTER_HAS_BEEN_CLICKED = "FILTER_HAS_BEEN_CLICKED";
export const SORT_HAS_BEEN_CLICKED = "SORT_HAS_BEEN_CLICKED";

export const SET_PRODUCT_MODULE_REF = "SET_PRODUCT_MODULE_REF";
export const CLEAR_PRODUCT_MODULE_REF = "CLEAR_PRODUCT_MODULE_REF";
export const SET_PLP_PATH = "SET_PLP_PATH";
export const USER_SELECTED_OUT_OF_STOCK = "USER_SELECTED_OUT_OF_STOCK";
const EXCLUDE_OUT_OF_STOCK_FLAG = "%3AinStockFlag%3Atrue";
export const VIEW_SIMILAR_PRODUCTS = "VIEW_SIMILAR_PRODUCTS";

export function setProductModuleRef(ref) {
  return {
    type: SET_PRODUCT_MODULE_REF,
    ref
  };
}

export function clearProductModuleRef() {
  return {
    type: CLEAR_PRODUCT_MODULE_REF
  };
}

export function setIfSortHasBeenClicked() {
  return {
    type: SORT_HAS_BEEN_CLICKED
  };
}

export function setIfFilterHasBeenClicked() {
  return {
    type: FILTER_HAS_BEEN_CLICKED
  };
}

export function setLastPlpPath(url) {
  return {
    type: SET_PLP_PATH,
    url: url
  };
}

export function setFilterSelectedData(isCategorySelected, filterTabIndex) {
  return {
    type: SET_FILTER_SELECTED_DATA,
    isCategorySelected,
    filterTabIndex
  };
}

export function resetFilterSelectedData() {
  return {
    type: RESET_FILTER_SELECTED_DATA
  };
}

export function showFilter() {
  return {
    type: SHOW_FILTER
  };
}
export function userSelectedOutOfStock(deselectedOutOfStock) {
  return {
    type: USER_SELECTED_OUT_OF_STOCK,
    deselectedOutOfStock
  };
}

export function hideFilter() {
  return {
    type: HIDE_FILTER
  };
}

export function setPage(pageNumber) {
  return {
    type: SET_PAGE,
    pageNumber
  };
}

export function updateFacets(productListings) {
  return {
    type: UPDATE_FACETS,
    status: SUCCESS,
    productListings
  };
}

export function getProductListingsPaginatedSuccess(productListings) {
  return {
    type: GET_PRODUCT_LISTINGS_PAGINATED_SUCCESS,
    status: SUCCESS,
    productListings
  };
}
export function getProductListingsRequest(paginated: false, isFilter: false) {
  return {
    type: PRODUCT_LISTINGS_REQUEST,
    status: REQUESTING,
    isFilter,
    isPaginated: paginated
  };
}
export function getProductListingsRequestWithoutClear(
  paginated: false,
  isFilter: false
) {
  return {
    type: PRODUCT_LISTINGS_REQUEST_WITHOUT_CLEAR,
    status: REQUESTING,
    isFilter,
    isPaginated: paginated
  };
}
export function getProductListingsSuccess(productListings, isPaginated: false) {
  return {
    type: PRODUCT_LISTINGS_SUCCESS,
    status: SUCCESS,
    productListings,
    isPaginated
  };
}

export function setSearchUrlWithKeywordRedirect(resultJson, encodedString) {
  let stringVal = null;
  let completeUrl = "";
  if (
    resultJson &&
    resultJson.currentQuery &&
    resultJson.currentQuery.pageRedirectType &&
    resultJson.currentQuery.pageRedirectType === "SEARCH"
  ) {
    if (
      resultJson.currentQuery.query &&
      resultJson.currentQuery.query.value &&
      resultJson.currentQuery.query.value.split(":")[0] === ""
    ) {
      if (encodedString) {
        completeUrl = encodedString + resultJson.currentQuery.query.value;
      }
    } else {
      completeUrl = resultJson.currentQuery.query.value;
    }

    stringVal = "/search/?searchCategory=all&text=" + completeUrl;
  } else if (
    resultJson &&
    resultJson.currentQuery &&
    resultJson.currentQuery.pageRedirectType &&
    resultJson.currentQuery.pageRedirectType === "OTHERS"
  ) {
    stringVal = resultJson.currentQuery.redirectUrl;
  }
  return {
    type: SEARCH_URL_REDIRECT,
    value: stringVal
  };
}

export function getProductListingsFailure(error, isPaginated) {
  return {
    type: PRODUCT_LISTINGS_FAILURE,
    status: ERROR,
    error,
    isPaginated
  };
}

export function viewSimilarProducts(productListingId) {
  return {
    type: VIEW_SIMILAR_PRODUCTS,
    productListingId: productListingId
  };
}

export function getProductListings(
  suffix: null,
  paginated: false,
  isFilter: false,
  componentName
) {
  return async (dispatch, getState, { api }) => {
    dispatch(showSecondaryLoader());
    if (checkUserAgentIsMobile()) {
      dispatch(getProductListingsRequest(paginated, isFilter));
    } else {
      dispatch(getProductListingsRequestWithoutClear(paginated, isFilter));
    }
    try {
      const searchState = getState().search;
      const pageNumber = getState().productListings.pageNumber;
      let encodedString =
        searchState.string.includes("%3A") || searchState.string.includes("%20")
          ? searchState.string
          : encodeURI(searchState.string);
      if (
        !encodedString.includes(EXCLUDE_OUT_OF_STOCK_FLAG) &&
        !getState().productListings.deselectedOutOfStock
      ) {
        encodedString = `${encodedString}${EXCLUDE_OUT_OF_STOCK_FLAG}`;
      }
      let keyWordRedirect = false;
      let queryString = `${PRODUCT_LISTINGS_PATH}?searchText=${encodedString}&isKeywordRedirect=${keyWordRedirect}&isKeywordRedirectEnabled=true`;
      if (suffix) {
        queryString = `${queryString}${suffix}`;
      }
      queryString = `${queryString}&page=${pageNumber}`;
      queryString = `${queryString}${PRODUCT_LISTINGS_SUFFIX}`;
      const result = await api.getMiddlewareUrl(queryString);
      const resultJson = await result.json();

      if (resultJson && resultJson.currentQuery) {
        keyWordRedirect = resultJson.currentQuery.isKeywordRedirect;
        if (keyWordRedirect && resultJson.currentQuery.pageRedirectType) {
          dispatch(setSearchUrlWithKeywordRedirect(resultJson, encodedString));
        }
      }
      if (resultJson.error) {
        if (
          resultJson &&
          resultJson.currentQuery &&
          resultJson.currentQuery.searchQuery
        ) {
          setDataLayer(
            ADOBE_INTERNAL_SEARCH_CALL_ON_GET_NULL,
            resultJson,
            getState().icid.value,
            getState().icid.icidType
          );
        }
        throw new Error(`${resultJson.error}`);
      }
      if (
        resultJson &&
        resultJson.currentQuery &&
        resultJson.currentQuery.searchQuery &&
        !paginated
      ) {
        setDataLayer(
          ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT,
          resultJson,
          getState().icid.value,
          getState().icid.icidType,
          componentName
        );
      } else {
        if (
          window.digitalData &&
          window.digitalData.page &&
          window.digitalData.page.pageInfo &&
          window.digitalData.page.pageInfo.pageName !== "product grid"
        ) {
          if (
            componentName === "Flash Sale Component" ||
            componentName === "Theme offers component" ||
            componentName === "Curated products component"
          ) {
            setDataLayer(ADOBE_PLP_TYPE, resultJson);
          } else {
            setDataLayer(
              ADOBE_PLP_TYPE,
              resultJson,
              getState().icid.value,
              getState().icid.icidType
            );
          }
        }
      }
      if (paginated) {
        if (resultJson.searchresult) {
          dispatch(getProductListingsPaginatedSuccess(resultJson, true));
          dispatch(hideSecondaryLoader());
        }
      } else if (isFilter) {
        dispatch(updateFacets(resultJson));
        dispatch(hideSecondaryLoader());
      } else {
        dispatch(setLastPlpPath(window.location.href));
        dispatch(getProductListingsSuccess(resultJson, paginated));
        dispatch(hideSecondaryLoader());
      }
    } catch (e) {
      dispatch(getProductListingsFailure(e.message, paginated));
      dispatch(hideSecondaryLoader());
    }
  };
}
