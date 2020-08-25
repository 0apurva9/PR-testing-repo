import {
  SUCCESS,
  REQUESTING,
  ERROR,
  FAILURE,
  LOGGED_IN_USER_DETAILS,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  CUSTOMER_ACCESS_TOKEN,
  GLOBAL_ACCESS_TOKEN,
  ANONYMOUS_USER
} from "../../lib/constants";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import {
  setDataLayer,
  ADOBE_PLP_TYPE,
  ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT,
  ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT_SP,
  ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT_TRENDING,
  ADOBE_INTERNAL_SEARCH_CALL_ON_GET_NULL,
  getMcvId
} from "../../lib/adobeUtils";
import * as Cookie from "../../lib/Cookie";
import { checkUserAgentIsMobile } from "../../lib/UserAgent";
import { COMPONENT_BACK_UP_FAILURE } from "../../home/actions/home.actions";
import { isBrowser } from "browser-or-node";
import { displayToast } from "../../general/toast.actions.js";
import * as ErrorHandling from "../../general/ErrorHandling.js";
export const PRODUCT_DETAILS_PATH = "v2/mpl/users";
export const PRODUCT_LISTINGS_REQUEST = "PRODUCT_LISTINGS_REQUEST";
export const PRODUCT_LISTINGS_REQUEST_WITHOUT_CLEAR =
  "PRODUCT_LISTINGS_REQUEST_WITHOUT_CLEAR";
export const PRODUCT_LISTINGS_SUCCESS = "PRODUCT_LISTINGS_SUCCESS";
export const PRODUCT_LISTINGS_FAILURE = "PRODUCT_LISTINGS_FAILURE";
export const NULL_SEARCH_MSD_REQUEST = "NULL_SEARCH_MSD_REQUEST";
export const NULL_SEARCH_MSD_SUCCESS = "NULL_SEARCH_MSD_SUCCESS";
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
export const MSD_ROOT_PATH = "https://ap-southeast-1-api.madstreetden.com";
const EXCLUDE_OUT_OF_STOCK_FLAG = "%3AinStockFlag%3Atrue";
const api_key = "8783ef14595919d35b91cbc65b51b5b1da72a5c3";
const env = process.env;
export const VIEW_SIMILAR_PRODUCTS = "VIEW_SIMILAR_PRODUCTS";
export const GET_PLP_BANNERS_SUCCESS = "GET_PLP_BANNERS_SUCCESS";
export const GET_PLP_BANNERS_FAILURE = "GET_PLP_BANNERS_FAILURE";
export const GET_CHATBOT_DETAILS_REQUEST = "CHATBOT_DETAILS_REQUEST";
export const GET_CHATBOT_DETAILS_SUCCESS = "GET_CHATBOT_DETAILS_SUCCESS";
export const GET_CHATBOT_DETAILS_FAILURE = "GET_CHATBOT_DETAILS_FAILURE";
export const CHECK_PIN_CODE_FROM_PLP_REQUEST =
  "CHECK_PIN_CODE_FROM_PLP_REQUEST";
export const CHECK_PIN_CODE_FROM_PLP_SUCCESS =
  "CHECK_PIN_CODE_FROM_PLP_SUCCESS";
export const CHECK_PIN_CODE_FROM_PLP_FAILURE =
  "CHECK_PIN_CODE_FROM_PLP_FAILURE";

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
  paginated = false,
  isFilter = false
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
  suffix = null,
  paginated = false,
  isFilter,
  searchHistory = false,
  searchTrending = false,
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
      const currentKeywordRedirect =
        getState().productListings && getState().productListings.productListings
          ? getState().productListings.productListings.currentQuery
              .isKeywordRedirect
          : null;

      const listingsPageNumber = getState().productListings.pageNumber;
      const pageNumber = listingsPageNumber ? listingsPageNumber : 0;
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
      if (isBrowser) {
        dispatch(setLastPlpPath(""));
      }
      let keyWordRedirect = currentKeywordRedirect
        ? currentKeywordRedirect
        : false;
      let queryString = `${PRODUCT_LISTINGS_PATH}/?searchText=${encodedString}&isKeywordRedirect=${keyWordRedirect}&isKeywordRedirectEnabled=true&channel=WEB&isMDE=true`;
      if (suffix) {
        queryString = `${queryString}${suffix}`;
      }
      queryString = `${queryString}&page=${pageNumber}`;
      queryString = `${queryString}${PRODUCT_LISTINGS_SUFFIX}`;
      const result = await api.getMiddlewareUrl(queryString);
      const resultJson = await result.json();
      if (resultJson && resultJson.currentQuery && isBrowser) {
        keyWordRedirect = resultJson.currentQuery.isKeywordRedirect;
        if (keyWordRedirect && resultJson.currentQuery.pageRedirectType) {
          dispatch(setSearchUrlWithKeywordRedirect(resultJson, encodedString));
        }
      }

      if (resultJson.error) {
        if (
          isBrowser &&
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
      setDataLayer(ADOBE_PLP_TYPE, resultJson);
      if (
        isBrowser &&
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
      } else if (
        resultJson &&
        resultJson.currentQuery &&
        resultJson.currentQuery.query &&
        resultJson.currentQuery.query.value.split(":")[0] !== "" &&
        !paginated &&
        searchHistory
      ) {
        setDataLayer(
          ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT_SP,
          resultJson,
          getState().icid.value,
          getState().icid.icidType
        );
      } else if (
        resultJson &&
        resultJson.currentQuery &&
        resultJson.currentQuery.query &&
        resultJson.currentQuery.query.value.split(":")[0] != "" &&
        !paginated &&
        searchTrending
      ) {
        setDataLayer(
          ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT_TRENDING,
          resultJson,
          getState().icid.value,
          getState().icid.icidType
        );
      }
      // } else {
      //   if (
      //     isBrowser &&
      //     window.digitalData &&
      //     window.digitalData.page &&
      //     window.digitalData.page.pageInfo &&
      //     window.digitalData.page.pageInfo.pageName !== "product grid"
      //   ) {
      //     if (
      //       componentName === "Flash Sale Component" ||
      //       componentName === "Theme offers component" ||
      //       componentName === "Curated products component"
      //     ) {
      //       setDataLayer(ADOBE_PLP_TYPE, resultJson);
      //     } else {
      //     }
      //   }
      // }
      if (paginated) {
        if (resultJson.searchresult) {
          dispatch(getProductListingsPaginatedSuccess(resultJson, true));
          dispatch(hideSecondaryLoader());
        }
      } else if (isFilter) {
        dispatch(updateFacets(resultJson));
        dispatch(hideSecondaryLoader());
      } else {
        if (isBrowser) {
          dispatch(setLastPlpPath(window.location.href));
        }
        dispatch(getProductListingsSuccess(resultJson, paginated));
        dispatch(hideSecondaryLoader());
      }
    } catch (e) {
      let status = dispatch(getProductListingsFailure(e.message, paginated));
      dispatch(hideSecondaryLoader());
      if (status.status === "error" || status.isPaginated) {
        dispatch(nullSearchMsd());
      }
    }
  };
}

export function nullSearchMsdSuccess(searchMsdData) {
  return {
    type: NULL_SEARCH_MSD_SUCCESS,
    status: SUCCESS,
    searchMsdData
  };
}

export function nullSearchMsdRequest() {
  return {
    type: NULL_SEARCH_MSD_REQUEST,
    status: REQUESTING
  };
}

export function nullSearchMsd() {
  return async (dispatch, getState, { api }) => {
    try {
      dispatch(showSecondaryLoader());
      let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      if (userDetails) {
        userDetails = JSON.parse(userDetails);
      }
      dispatch(nullSearchMsdRequest());
      let discoverMoreData = new FormData();
      if (userDetails && userDetails.customerId) {
        discoverMoreData.append("user_id", userDetails.customerId);
      }
      discoverMoreData.append("api_key", api_key);
      discoverMoreData.append("widget_list", [109]);
      discoverMoreData.append("num_results", [10]);
      discoverMoreData.append("mad_uuid", await getMcvId());
      discoverMoreData.append("details", false);
      const discoverMoreresult = await api.postMsd(
        `${MSD_ROOT_PATH}/widgets`,
        discoverMoreData
      );
      const discoverMoreresultJson = await discoverMoreresult.json();
      let trendingProducts = new FormData();
      if (userDetails && userDetails.customerId) {
        trendingProducts.append("user_id", userDetails.customerId);
      }
      trendingProducts.append("api_key", api_key);
      trendingProducts.append("mad_uuid", await getMcvId());
      trendingProducts.append("details", true);
      if (userDetails) {
        // trendingProducts.append("num_results", "[5, 5, 10]");
        trendingProducts.append("num_results", "[1, 1, 3]");
        trendingProducts.append("widget_list", "[7, 1, 3]");
      } else {
        // trendingProducts.append("num_results", "[10]");
        trendingProducts.append("num_results", "[5]");
        trendingProducts.append("widget_list", "[3]");
      }
      const trendingproductresult = await api.postMsd(
        `${MSD_ROOT_PATH}/widgets`,
        trendingProducts
      );
      const trendingproductresultJson = await trendingproductresult.json();
      var convertedTPArray =
        trendingproductresultJson &&
        trendingproductresultJson.data &&
        trendingproductresultJson.data.reduce((r, e) => (r.push(...e), r), []);

      let finalProductDetails = null;
      if (convertedTPArray && convertedTPArray.length > 0) {
        let productCode =
          convertedTPArray && convertedTPArray.map(value => value.product_id);
        productCode = productCode && productCode.toString();
        const getProductdetails = await api.getMiddlewareUrl(
          `v2/mpl/cms/page/getProductInfo?isPwa=true&productCodes=${productCode}`
        );
        finalProductDetails = await getProductdetails.json();
      }
      if (
        discoverMoreresultJson.status === FAILURE &&
        ((trendingproductresultJson &&
          trendingproductresultJson.status === FAILURE) ||
          (finalProductDetails && finalProductDetails.status === FAILURE))
      ) {
        throw new Error(`${discoverMoreresultJson.message}`);
      }
      const data = [
        {
          discoverMore: {
            data: discoverMoreresultJson && discoverMoreresultJson.data,
            message: discoverMoreresultJson && discoverMoreresultJson.message,
            status: discoverMoreresultJson && discoverMoreresultJson.status,
            title: discoverMoreresultJson && discoverMoreresultJson.title,
            type: discoverMoreresultJson && discoverMoreresultJson.type
          }
        },
        {
          trendingProducts: {
            data: finalProductDetails && finalProductDetails.results
          }
        }
      ];
      dispatch(nullSearchMsdSuccess(data));
      dispatch(hideSecondaryLoader());
    } catch (e) {
      throw new Error(`${e.message}`);
      dispatch(hideSecondaryLoader());
    }
  };
}

export function getPlpBanners(catergoryId) {
  try {
    if (!catergoryId) {
      throw new Error("CategoryId is required");
    }
  } catch (e) {}
  return async (dispatch, getState, { api }) => {
    try {
      const plpBannerApi = await api.getPlpBanners(catergoryId.toUpperCase());
      const plpBannerApiApiJson = await plpBannerApi.json();
      // if (pdpManufacturerApiJson.status == "Success") {
      if (plpBannerApiApiJson.errorCode) {
        dispatch(getPlpBannersFailure("error"));
      } else {
        dispatch(getPlpBannersSucess(plpBannerApiApiJson));
      }
      // } else {
    } catch (e) {
      dispatch(getPlpBannersFailure(e.message));
    }
  };
}

export function getPlpBannersSucess(banners = []) {
  return {
    type: GET_PLP_BANNERS_SUCCESS,
    status: SUCCESS,
    banners
  };
}
export function getPlpBannersFailure() {
  return {
    type: GET_PLP_BANNERS_FAILURE,
    status: SUCCESS,
    banners: []
  };
}

//get chatbot json data
export function getChatbotDetailsRequest() {
  return {
    type: GET_CHATBOT_DETAILS_REQUEST,
    status: REQUESTING
  };
}

export function getChatbotDetailsSuccess(data) {
  return {
    type: GET_CHATBOT_DETAILS_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function getChatbotDetailsFailure(error) {
  return {
    type: GET_CHATBOT_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function getChatbotDetails() {
  return async (dispatch, getState, { api }) => {
    dispatch(getChatbotDetailsRequest());
    try {
      const result = await api.customGetMiddlewareUrl(
        env.REACT_APP_HAPTIK_CHATBOT_API_URL
      );
      if (result.status === 200) {
        const resultJson = await result.json();
        return dispatch(getChatbotDetailsSuccess(resultJson));
      } else {
        dispatch(getChatbotDetailsFailure(result.statusText));
      }
    } catch (e) {
      dispatch(getChatbotDetailsFailure(e.message));
    }
  };
}

export function checkPincodeFromPLPRequest() {
  return {
    type: CHECK_PIN_CODE_FROM_PLP_REQUEST,
    status: REQUESTING
  };
}
export function checkPincodeFromPLPSuccess(data) {
  return {
    type: CHECK_PIN_CODE_FROM_PLP_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function checkPincodeFromPLPFailure(error) {
  return {
    type: CHECK_PIN_CODE_FROM_PLP_FAILURE,
    status: ERROR,
    error
  };
}

export function checkPincodeFromPLP(
  pinCode,
  productCode,
  ussId,
  isComingFromHaptikChatbot
) {
  let validProductCode = productCode.toUpperCase();
  if (pinCode) {
    localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, pinCode);
  }
  let checkPincodeFromHaptikChatbot = false;
  if (isComingFromHaptikChatbot) {
    checkPincodeFromHaptikChatbot = true;
  }
  return async (dispatch, getState, { api }) => {
    dispatch(checkPincodeFromPLPRequest());
    try {
      let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
      let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      let url;
      if (userDetails) {
        let userName = JSON.parse(userDetails).userName;
        let accessToken = JSON.parse(customerCookie).access_token;
        url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}&exchangeAvailable=false&isMDE=true`;
      } else {
        let userName = ANONYMOUS_USER;
        let accessToken = JSON.parse(globalCookie).access_token;
        url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}&exchangeAvailable=false&isMDE=true`;
      }
      const result = await api.post(url);
      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        return dispatch(checkPincodeFromPLPFailure(resultJsonStatus.message));
      }

      return dispatch(
        checkPincodeFromPLPSuccess({
          pinCode,
          deliveryOptions:
            resultJson &&
            resultJson.listOfDataList &&
            resultJson.listOfDataList[0] &&
            resultJson.listOfDataList[0].value,
          city: resultJson.city,
          productOutOfStockMessage: resultJson.productOutOfStockMessage,
          productNotServiceableMessage:
            resultJson.productNotServiceabilityMessage,
          checkPincodeFromHaptikChatbot: checkPincodeFromHaptikChatbot,
          ussId: ussId
        })
      );
    } catch (e) {
      return dispatch(checkPincodeFromPLPFailure(e.message));
    }
  };
}
