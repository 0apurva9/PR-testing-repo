import {
  SUCCESS,
  REQUESTING,
  ERROR,
  FAILURE,
  SECONDARY_FEED_TYPE,
  HOME_FEED_TYPE,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  QUICK_LINK_PERSONALISED_COMPONENT,
  BANK_OFFER_PERSONALISED_COMPONENT,
  MULTI_PURPOSE_BANNER_PERSONALISED_COMPONENT,
  LUXE_EDITORIAL_PERSONALISED_CAROUSEL,
  LUXE_SHOP_BY_SHOP_PERSONALISED_COMPONENT,
  MULTI_BANNER_PERSONALISED_COMPONENT,
  HERO_BANNER_PERSONALISED_COMPONENT,
  TWO_BY_TWO_PERSONALISED_COMPONENT
} from "../../lib/constants";
import each from "lodash.foreach";
import delay from "lodash.delay";
import { MSD_WIDGET_PLATFORM } from "../../lib/config.js";
import {
  setDataLayer,
  setPageNameAndPageType,
  ADOBE_HOME_TYPE,
  ADOBE_BLP_PAGE_LOAD,
  ADOBE_CLP_PAGE_LOAD,
  ADOBE_STATIC_PAGE
} from "../../lib/adobeUtils.js";
import { setHeaderText } from "../../general/header.actions.js";
import * as Cookie from "../../lib/Cookie";
import * as ErrorHandling from "../../general/ErrorHandling.js";

import { getMcvId } from "../../lib/adobeUtils.js";
import { getMsdFormData } from "../../lib/msdUtils.js";
import { checkUserAgentIsMobile } from "../../lib/UserAgent";

export const FEED_REQUEST = "FEED_REQUEST";
export const HOME_FEED_SUCCESS = "HOME_FEED_SUCCESS";
export const HOME_FEED_FAILURE = "HOME_FEED_FAILURE";

export const SET_CLICKED_ELEMENT_ID = "SET_CLICKED_ELEMENT_ID";

export const SECONDARY_FEED_SUCCESS = "SECONDARY_FEED_SUCCESS";
export const SECONDARY_FEED_FAILURE = "SECONDARY_FEED_FAILURE";

export const SECONDARY_FEED_COMPONENT_DATA_SUCCESS =
  "SECONDARY_FEED_COMPONENT_DATA_SUCCESS";
export const SECONDARY_FEED_COMPONENT_DATA_FAILURE =
  "SECONDARY_FEED_COMPONENT_DATA_FAILURE";
export const SECONDARY_FEED_COMPONENT_DATA_REQUEST =
  "SECONDARY_FEED_COMPONENT_DATA_REQUEST";

export const SECONDARY_FEED_GET_ITEMS_REQUEST =
  "SECONDARY_FEED_GET_ITEMS_REQUEST";
export const SECONDARY_FEED_GET_ITEMS_FAILURE =
  "SECONDARY_FEED_GET_ITEMS_FAILURE";
export const SECONDARY_FEED_GET_ITEMS_SUCCESS =
  "SECONDARY_FEED_GET_ITEMS_SUCCESS";

export const HOME_FEED_BACK_UP_FAILURE = "HOME_FEED_BACK_UP_FAILURE";
export const HOME_FEED_BACK_UP_REQUEST = "HOME_FEED_BACK_UP_REQUEST";
export const HOME_FEED_BACK_UP_SUCCESS = "HOME_FEED_BACK_UP_SUCCESS";
export const HOME_FEED_NULL_DATA_SUCCESS = "HOME_FEED_NULL_DATA_SUCCESS";
export const COMPONENT_DATA_REQUEST = "COMPONENT_DATA_REQUEST";
export const COMPONENT_DATA_SUCCESS = "COMPONENT_DATA_SUCCESS";
export const COMPONENT_DATA_FAILURE = "COMPONENT_DATA_FAILURE";
export const COMPONENT_BACK_UP_REQUEST = "COMPONENT_BACK_UP_REQUEST";
export const COMPONENT_BACK_UP_SUCCESS = "COMPONENT_BACK_UP_SUCCESS";
export const COMPONENT_BACK_UP_FAILURE = "COMPONENT_BACK_UP_FAILURE";
export const TARGET_MBOX_SUCCESS = "TARGET_MBOX_SUCCESS";
export const TARGET_MBOX_FAILURE = "TARGET_MBOX_FAILURE";
export const HOME_FEED_PATH = "homepage";
export const GET_ITEMS_REQUEST = "GET_SALE_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_SALE_ITEMS_SUCCESS";
export const GET_ITEMS_FAILURE = "GET_SALE_ITEMS_FAILURE";
export const CLEAR_ITEMS = "CLEAR_ITEMS";

export const GET_PRODUCT_CAPSULES_REQUEST = "GET_PRODUCT_CAPSULES_REQUEST";
export const GET_PRODUCT_CAPSULES_SUCCESS = "GET_PRODUCT_CAPSULES_SUCCESS";
export const GET_PRODUCT_CAPSULES_FAILURE = "GET_PRODUCT_CAPSULES_FAILURE";

export const MSD_HOME_COMPONENT_REQUEST = "MSD_HOME_COMPONENT_REQUEST";
export const MSD_HOME_COMPONENT_SUCCESS = "MSD_HOME_COMPONENT_SUCCESS";
export const MSD_HOME_ABC_COMPONENT_REQUEST = "MSD_HOME_ABC_COMPONENT_REQUEST";
export const MSD_HOME_ABC_COMPONENT_SUCCESS = "MSD_HOME_ABC_COMPONENT_SUCCESS";

export const AUTOMATED_WIDGET_HOME_REQUEST = "AUTOMATED_WIDGET_HOME_REQUEST";
export const AUTOMATED_WIDGET_HOME_SUCCESS = "AUTOMATED_WIDGET_HOME_SUCCESS";
export const AUTOMATED_WIDGET_ITEM_REQUEST = "AUTOMATED_WIDGET_ITEM_REQUEST";
export const AUTOMATED_MSD_WIDGET_ITEM_DATA = "AUTOMATED_MSD_WIDGET_ITEM_DATA";
export const ABOUT_THE_BRAND_WIDGET_KEY = "aboutTheBrand";
export const FREQUENTLY_BOUGHT_TOGETHER_WIDGET_KEY = "FrequentlyBoughtTogether";
export const SIMILAR_PRODUCTS_WIDGET_KEY = "similarProducts";
export const TOP_PICKS_FOR_YOU = "TopPicksForYou";
export const RECENTLY_VIEWED = "RecentlyViewed";
export const TRENDING_PRODUCTS = "TrendingProducts";

export const MSD_PRODUCT_ABC_DATA_REQUEST = "MSD_PRODUCT_ABC_DATA_REQUEST";
export const MSD_PRODUCT_ABC_DATA_SUCCESS = "MSD_PRODUCT_ABC_DATA_SUCCESS";

export const CLEAR_ITEMS_FOR_PARTICULAR_POSITION =
  "CLEAR_ITEMS_FOR_PARTICULAR_POSITION";
const ADOBE_TARGET_DELAY = 2500;
const MSD_NUM_PRODUCTS = 5;
const MSD_NUM_RESULTS = 5;
const MSD_NUM_RESULTS_FOR_AUTOMATED_BRAND_COMPONENT = 5;
const MSD_NUM_BRANDS = 1;
const DISCOVER_MORE_NUM_RESULTS = 10;
const FOLLOWED_WIDGET_WIDGET_LIST = [112]; // weirdly it's not done.
const FRESH_FROM_BRANDS_WIDGET_LIST = [111];

let DISCOVER_MORE_WIDGET_LIST;
if (!checkUserAgentIsMobile()) {
  DISCOVER_MORE_WIDGET_LIST = [109];
} else {
  DISCOVER_MORE_WIDGET_LIST = [110];
}

const AUTOMATED_BRAND_CAROUSEL_WIDGET_LIST = [113];
const MULTI_CLICK_COMPONENT_WIDGET_LIST = [115];
const AUTO_PRODUCT_RECOMMENDATION_COMPONENT_WIDGET_LIST = [11];

const AUTO_FRESH_FROM_BRANDS = "Auto Fresh From Brands Component";
const MSD_AUTOMATED_BRAND_CAROUSEL =
  "msdAutomatedBannerProductCarouselComponent";
const DISCOVER_MORE = "Auto Discover More Component";
const MSD_DISCOVER_MORE = "msdAutoDiscoverMoreComponent";
const AUTOMATED_BRAND_CAROUSEL = "Automated Banner Product Carousel Component";
const FOLLOW_WIDGET = "Auto Following Brands Component";
const MULTI_CLICK_COMPONENT = "Multi Click Component";
const AUTO_PRODUCT_RECOMMENDATION_COMPONENT =
  "Auto Product Recommendation Component";
const PRODUCT_DESCRIPTION_PATH = "v2/mpl/products/productDetails";
// TODO Followed Widget
let ADOBE_TARGET_HOME_FEED_MBOX_NAME, // for local/devxelp/uat2tmpprod
  ADOBE_TARGET_PRODUCTION_HOME_FEED_MBOX_NAME,
  ADOBE_TARGET_P2_HOME_FEED_MBOX_NAME,
  WCMS_PLATFORM;

if (!checkUserAgentIsMobile()) {
  ADOBE_TARGET_HOME_FEED_MBOX_NAME = "POC_Desktop_Tmpprod"; // for local/devxelp/uat2tmpprod
  ADOBE_TARGET_PRODUCTION_HOME_FEED_MBOX_NAME = "dev_POC_New_UIUX_Desktop";
  ADOBE_TARGET_P2_HOME_FEED_MBOX_NAME = "dev_POC_New_UIUX_Desktop";
  WCMS_PLATFORM = "desktop";
} else {
  ADOBE_TARGET_HOME_FEED_MBOX_NAME = "mboxPOCTest1"; // for local/devxelp/uat2tmpprod
  ADOBE_TARGET_PRODUCTION_HOME_FEED_MBOX_NAME = "UAT_Mobile_Homepage_Mbox";
  ADOBE_TARGET_P2_HOME_FEED_MBOX_NAME = "UAT_Mobile_Homepage_Mbox";
  WCMS_PLATFORM = "mobile";
}
export const CATEGORY_REGEX = /msh[a-zA-Z0-9]+/;
export const BRAND_REGEX = /mbh[a-zA-Z0-9]+/;
export const SET_PAGE_FEED_SIZE = "SET_PAGE_FEED_SIZE";
export const MSD_ROOT_PATH = "https://ap-southeast-1-api.madstreetden.com";
const api_key = "8783ef14595919d35b91cbc65b51b5b1da72a5c3";

export function setPageFeedSize(pageSize) {
  return {
    type: SET_PAGE_FEED_SIZE,
    pageSize
  };
}

export function setClickedElementId(id) {
  return {
    type: SET_CLICKED_ELEMENT_ID,
    id
  };
}

export function getProductCapsulesRequest() {
  return {
    type: GET_PRODUCT_CAPSULES_REQUEST,
    status: REQUESTING
  };
}

export function getProductCapsulesSuccess(productCapsules, positionInFeed) {
  return {
    type: GET_PRODUCT_CAPSULES_SUCCESS,
    status: SUCCESS,
    productCapsules,
    positionInFeed
  };
}

export function getProductCapsulesFailure(error) {
  return {
    type: GET_PRODUCT_CAPSULES_FAILURE,
    error,
    status: FAILURE
  };
}

// {{root_url}}/marketplacewebservices/v2/mpl/users/{{username}}/getProductCapsules?access_token={{customer_access_token}}

export function getProductCapsules(positionInFeed) {
  return async (dispatch, getState, { api }) => {
    dispatch(getProductCapsulesRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.post(
        `v2/mpl/users/${
          JSON.parse(userDetails).userName
        }/getProductCapsules?access_token=${
          JSON.parse(customerCookie).access_token
        }`
      );
      const resultJson = await result.json();
      if (resultJson.errors) {
        throw new Error(`${resultJson.errors[0].message}`);
      }
      dispatch(getProductCapsulesSuccess(resultJson, positionInFeed));
    } catch (e) {
      dispatch(getProductCapsulesFailure(e.message));
    }
  };
}

export function secondaryFeedGetItemsFailure(positionInFeed, error) {
  return {
    type: SECONDARY_FEED_GET_ITEMS_FAILURE,
    error,
    status: FAILURE
  };
}

export function secondaryFeedGetItemsSuccess(positionInFeed, items, itemIds) {
  return {
    type: SECONDARY_FEED_GET_ITEMS_SUCCESS,
    status: SUCCESS,
    items,
    positionInFeed,
    itemIds
  };
}

export function getItemsRequest(positionInFeed) {
  return {
    type: GET_ITEMS_REQUEST,
    positionInFeed,
    status: REQUESTING
  };
}
export function getItemsSuccess(positionInFeed, items, itemIds) {
  return {
    type: GET_ITEMS_SUCCESS,
    status: SUCCESS,
    items,
    positionInFeed,
    itemIds
  };
}
export function clearItemsSuccess(positionInFeed) {
  return {
    type: CLEAR_ITEMS_FOR_PARTICULAR_POSITION,
    status: SUCCESS,
    positionInFeed
  };
}

export function getItemsFailure(positionInFeed, errorMsg) {
  return {
    type: GET_ITEMS_FAILURE,
    errorMsg,
    status: FAILURE
  };
}
export function getItems(positionInFeed, itemIds, feedType) {
  return async (dispatch, getState, { api }) => {
    dispatch(getItemsRequest(positionInFeed));
    try {
      //let productCodes = itemIds && itemIds.toString();
      // const url = `v2/mpl/cms/page/getProductInfo?isPwa=true&productCodes=${productCodes}`;
      // const result = await api.getMiddlewareUrl(url);
      // const resultJson = await result.json();
      let requests =
        itemIds &&
        itemIds.map(id =>
          api.getMiddlewareUrl(
            `v2/mpl/cms/page/getProductInfo?isPwa=true&productCodes=${id}`
          )
        );
      //requests for individual calls
      const results = await Promise.allSettled(requests);
      const successfulPromises = results.filter(
        request => request.status === "fulfilled"
      );
      const productList = await Promise.all(successfulPromises)
        .then(response => Promise.all(response.map(r => r.value.json())))
        .then(respon => respon && respon.results && respon.results[0]);
      // if (resultJson && resultJson.status === "FAILURE") {
      //   throw new Error(`${resultJson.message}`);
      // }

      if (feedType === SECONDARY_FEED_TYPE) {
        dispatch(
          secondaryFeedGetItemsSuccess(positionInFeed, productList, itemIds)
        );
      } else {
        dispatch(getItemsSuccess(positionInFeed, productList, itemIds));
      }
    } catch (e) {
      if (feedType === SECONDARY_FEED_TYPE) {
        dispatch(secondaryFeedGetItemsFailure(positionInFeed, e.message));
      } else {
        dispatch(getItemsFailure(positionInFeed, e.message));
      }
    }
  };
}

export function homeFeedBackUpRequest() {
  return {
    type: HOME_FEED_BACK_UP_REQUEST,
    status: REQUESTING
  };
}

export function homeFeedBackupSuccess(data) {
  return {
    type: HOME_FEED_BACK_UP_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function homeFeedBackUpFailure(error) {
  return {
    type: HOME_FEED_BACK_UP_FAILURE,
    status: ERROR,
    error
  };
}

export function secondaryFeedSuccess(data, seodata, message) {
  return {
    type: SECONDARY_FEED_SUCCESS,
    status: SUCCESS,
    data,
    seodata,
    message
  };
}

export function feedRequest(feedType) {
  return {
    type: FEED_REQUEST,
    status: REQUESTING,
    feedType
  };
}
export function homeFeedSuccess(data, feedType) {
  return {
    type: HOME_FEED_SUCCESS,
    status: SUCCESS,
    data,
    feedType
  };
}
export function homeFeedFailure(error) {
  return {
    type: HOME_FEED_FAILURE,
    status: ERROR,
    error
  };
}

export function homeFeedBackUp() {
  return async (dispatch, getState, { api }) => {
    dispatch(homeFeedBackUpRequest());
    try {
      // const result = await api.get(
      //   `v2/mpl/cms/defaultpage?pageId=defaulthomepage&channel=${WCMS_PLATFORM}`
      // );
      // const result = await api.get(
      //   `v2/mpl/cms/defaultpage?pageId=hp-test&channel=${WCMS_PLATFORM}`
      // );
      let apiUrl = "https://www.tatacliq.com";
      let url = `${apiUrl}/marketplacewebservices/v2/mpl/cms/defaultpage?pageId=hp-test&channel=desktop`;
      const result = await fetch(url);
      const resultJson = await result.json();
      // const resultJson = {
      //   items: [
      //     {
      //       componentName: "AutoWidget",
      //       singleBannerComponent: {
      //         componentId: "cmsitem_00287045",
      //         items: [
      //           {
      //             btnText: "10",
      //             description: "",
      //             hexCode: "",
      //             imageURL: "",
      //             title: "",
      //             webURL: "7"
      //           }
      //         ],
      //         title: "",
      //         type: "AutoWidget"
      //       }
      //     },
      //     {
      //       componentName: "AutoWidget",
      //       singleBannerComponent: {
      //         componentId: "cmsitem_00287047",
      //         items: [
      //           {
      //             btnText: "10",
      //             description: "category;contains;electronics",
      //             hexCode: "",
      //             imageURL:
      //               "//assets.tatacliq.com/medias/sys_master/images/28004370776094.jpg",
      //             title: "",
      //             webURL: "11"
      //           }
      //         ],
      //         title: "",
      //         type: "AutoWidget"
      //       }
      //     },
      //     {
      //       componentName: "AutoWidget",
      //       singleBannerComponent: {
      //         componentId: "cmsitem_00287049",
      //         items: [
      //           {
      //             btnText: "10",
      //             description: "brand;contains;samsung",
      //             hexCode: "",
      //             imageURL:
      //               "//assets.tatacliq.com/medias/sys_master/images/28004370841630.jpg",
      //             title: "",
      //             webURL: "11"
      //           }
      //         ],
      //         title: "",
      //         type: "AutoWidget"
      //       }
      //     },
      //     {
      //       componentName: "AutoWidget",
      //       singleBannerComponent: {
      //         componentId: "cmsitem_00293068",
      //         items: [
      //           {
      //             btnText: "10",
      //             description: "price;range;1000,2000",
      //             hexCode: "",
      //             imageURL: "",
      //             title: "",
      //             webURL: "11"
      //           }
      //         ],
      //         title: "",
      //         type: "AutoWidget"
      //       }
      //     }
      //   ],
      //   message: "cmsitem_00244236",
      //   pageName: "hp-test-180820",
      //   pageType: "",
      //   seo: {
      //     alternateURL: "",
      //     canonicalURL: "",
      //     description: "",
      //     imageURL: "",
      //     keywords: "",
      //     title: "hp-test"
      //   },
      //   status: "SUCCESS"
      // };
      if (resultJson && resultJson.pageName) {
        let pageData = {
          pageName: resultJson.pageName
        };
        setPageNameAndPageType(pageData);
      }
      const failureResponse = ErrorHandling.getFailureResponse(resultJson);
      if (failureResponse.status) {
        dispatch(new Error(failureResponse.message));
      }
      dispatch(homeFeedBackupSuccess(resultJson.items));
    } catch (e) {
      dispatch(homeFeedBackUpFailure(e.message));
    }
  };
}

export function getTargetMboxDataFailure(error) {
  return {
    type: TARGET_MBOX_FAILURE,
    error,
    status: ERROR
  };
}

export function getTargetMboxDataSuccess(dataMboxHome) {
  return {
    type: TARGET_MBOX_SUCCESS,
    status: SUCCESS,
    dataMboxHome
  };
}

export function getTargetMboxData(componentName, sequence, pageType) {
  return async (dispatch, getState, { api }) => {
    try {
      let tntId, mboxSessionIdJson, sessionId;
      let sessionMbox = Cookie.getCookie("mbox");
      let componentSequence = componentName;
      if (sessionMbox) {
        let splitData = sessionMbox.split("|");
        mboxSessionIdJson =
          splitData && splitData[1].includes("session")
            ? splitData[1].split("#")[1]
            : splitData[0].split("#")[1];
        tntId =
          splitData && splitData[1].includes("PC")
            ? splitData[1].split("#")[1]
            : splitData[0].split("#")[1];

        let url = `//tataunistore.tt.omtrdc.net/rest/v1/delivery?client=tataunistore&sessionId=${mboxSessionIdJson}&version=2.1.1`;
        let payloadData = {
          context: {
            channel: "web",
            screen: {
              width: window && window.innerWidth,
              height: window && window.innerHeight
            },
            browser: {
              host: document && document.location && document.location.origin
            },
            address: {
              url: document && document.location && document.location.origin
            }
          },
          id: {
            tntId: tntId
          },
          execute: {
            pageLoad: {},
            mboxes: [
              {
                index: 0,
                name: "HomeOOBTest",
                parameters: {
                  sequence: sequence,
                  pageType: pageType,
                  componentName: componentName
                }
              }
            ]
          },
          prefetch: {
            views: [{}]
          }
        };
        let result = await api.postMsd(url, JSON.stringify(payloadData));
        let resultJson = await result.json();
        if (resultJson.errors) {
          throw new Error(`${resultJson.errors[0].message}`);
        }
        let data =
          resultJson &&
          resultJson.execute &&
          resultJson.execute.mboxes &&
          resultJson.execute.mboxes[0] &&
          resultJson.execute.mboxes[0].options &&
          resultJson.execute.mboxes[0].options[0] &&
          resultJson.execute.mboxes[0].options[0].content;
        return dispatch(getTargetMboxDataSuccess(data));
        //}
      }
    } catch (e) {
      dispatch(getTargetMboxDataFailure(e.message));
    }
  };
}
// this is not simple home feed .it is a general feed like
// brand feed and category feed  . we need to rename this function name like feed
// this is also now used for static pages, so the name brandIdOrCategoryId makes less sense
// however there isn't a good name to replace it.
export function getFeed(pageId: null) {
  return async (dispatch, getState, { api }) => {
    if (pageId) {
      dispatch(feedRequest(SECONDARY_FEED_TYPE));
    } else {
      dispatch(feedRequest());
    }

    try {
      let url, result, feedTypeRequest, resultJson;

      if (pageId) {
        feedTypeRequest = SECONDARY_FEED_TYPE;
        try {
          result = await api.getMiddlewareUrl(
            `v2/mpl/cms/defaultpage?pageId=${pageId}&channel=${WCMS_PLATFORM}`
          );
        } catch (e) {
          dispatch(secondaryFeedSuccess([], feedTypeRequest));
        }

        resultJson = await result.json();
        if (resultJson && resultJson.pageName) {
          let pageData = {
            pageName: resultJson.pageName
          };
          setPageNameAndPageType(pageData);
        }
        if (resultJson.errors) {
          dispatch(secondaryFeedSuccess([], feedTypeRequest));
        } else {
          if (resultJson.pageName) {
            dispatch(setHeaderText(resultJson.pageName));
          }
          dispatch(
            secondaryFeedSuccess(
              resultJson.items,
              resultJson.seo,
              resultJson.message,
              feedTypeRequest
            )
          );
          if (CATEGORY_REGEX.test(pageId)) {
            setDataLayer(
              ADOBE_CLP_PAGE_LOAD,
              resultJson,
              getState().icid.value,
              getState().icid.icidType
            );
          } else if (BRAND_REGEX.test(pageId)) {
            setDataLayer(
              ADOBE_BLP_PAGE_LOAD,
              resultJson,
              getState().icid.value,
              getState().icid.icidType
            );
          } else if (pageId === window.location.pathname.replace("/", "")) {
            setDataLayer(
              ADOBE_STATIC_PAGE,
              resultJson,
              getState().icid.value,
              getState().icid.icidType
            );
          }
        }
      } else {
        // let mbox = ADOBE_TARGET_HOME_FEED_MBOX_NAME;

        // if (process.env.REACT_APP_STAGE === "production") {
        //   mbox = ADOBE_TARGET_PRODUCTION_HOME_FEED_MBOX_NAME;
        // } else if (process.env.REACT_APP_STAGE === "p2") {
        //   mbox = ADOBE_TARGET_P2_HOME_FEED_MBOX_NAME;
        // }
        delay(() => {
          const isHomeFeedLoading = getState().feed.loading;
          if (isHomeFeedLoading) {
            dispatch(homeFeedBackUp());
          }
        }, ADOBE_TARGET_DELAY);

        //   const mcvId = await getMcvId();
        //   resultJson = await api.postAdobeTargetUrl(
        //     null,
        //     mbox,
        //     mcvId,
        //     null,
        //     true
        //   );
        //   resultJson = resultJson[0];
        //   feedTypeRequest = HOME_FEED_TYPE;
        //   if (
        //     !window.digitalData ||
        //     !window.digitalData.page ||
        //     !window.digitalData.page.pageInfo ||
        //     window.digitalData.page.pageInfo.pageName !== "homepage"
        //   ) {
        //     setDataLayer(
        //       ADOBE_HOME_TYPE,
        //       null,
        //       getState().icid.value,
        //       getState().icid.icidType
        //     );
        //   }
      }

      if (
        !resultJson ||
        !resultJson.content ||
        resultJson.status === "FAILURE"
      ) {
        throw new Error("No Data");
      }

      let parsedResultJson = JSON.parse(resultJson.content);

      parsedResultJson = parsedResultJson.items;

      dispatch(homeFeedSuccess(parsedResultJson, feedTypeRequest));
    } catch (e) {
      dispatch(homeFeedFailure(e.message));
    }
  };
}

export function getComponentDataBackUpRequest(positionInFeed) {
  return {
    type: COMPONENT_BACK_UP_REQUEST,
    positionInFeed,
    status: REQUESTING
  };
}

export function getComponentDataBackUpFailure(positionInFeed, error) {
  return {
    type: COMPONENT_BACK_UP_FAILURE,
    positionInFeed,
    error,
    status: ERROR
  };
}

export function getComponentDataBackUpSuccess(positionInFeed, data) {
  return {
    type: COMPONENT_BACK_UP_SUCCESS,
    positionInFeed,
    status: SUCCESS,
    data
  };
}

export function getComponentDataBackUp(url, positionInFeed) {
  return async (dispatch, getState, { api }) => {
    dispatch(getComponentDataBackUpRequest(positionInFeed));
    try {
      const result = await api.getWithoutApiUrlRoot(url);
      const resultJson = await result.json();
      if (resultJson.errors) {
        throw new Error(`${resultJson.errors[0].message}`);
      }

      let parsedResultJson = resultJson;
      parsedResultJson = parsedResultJson.items[0];
      dispatch(getComponentDataBackUpSuccess(positionInFeed, parsedResultJson));
    } catch (e) {
      dispatch(getComponentDataBackUpFailure(positionInFeed, e.message));
    }
  };
}

export function secondaryFeedComponentDataRequest(positionInFeed) {
  return {
    type: SECONDARY_FEED_COMPONENT_DATA_REQUEST,
    status: REQUESTING,
    positionInFeed
  };
}

export function componentDataRequest(positionInFeed) {
  return {
    type: COMPONENT_DATA_REQUEST,
    status: REQUESTING,
    positionInFeed
  };
}

export function secondaryFeedComponentDataSuccess(
  data,
  positioninFeed,
  isMsd: false
) {
  return {
    type: SECONDARY_FEED_COMPONENT_DATA_SUCCESS,
    status: SUCCESS,
    data,
    positioninFeed,
    isMsd
  };
}

export function secondaryFeedComponentDataFailure(error, positioninFeed) {
  return {
    type: SECONDARY_FEED_COMPONENT_DATA_FAILURE,
    status: FAILURE,
    error,
    positioninFeed
  };
}

export function componentDataSuccess(data, positionInFeed, isMsd: false) {
  return {
    type: COMPONENT_DATA_SUCCESS,
    status: SUCCESS,
    data,
    positionInFeed,
    isMsd
  };
}
export function componentDataFailure(positionInFeed, error) {
  return {
    type: COMPONENT_DATA_FAILURE,
    status: ERROR,
    positionInFeed,
    error
  };
}

function getMsdPostData(type) {
  if (type === AUTO_FRESH_FROM_BRANDS) {
    return {
      widget_list: FRESH_FROM_BRANDS_WIDGET_LIST
    };
  } else if (type === DISCOVER_MORE || MSD_DISCOVER_MORE) {
    return {
      widget_list: DISCOVER_MORE_WIDGET_LIST
    };
  } else if (type === FOLLOW_WIDGET) {
    return {
      widget_list: FOLLOWED_WIDGET_WIDGET_LIST
    };
  } else if (type === MULTI_CLICK_COMPONENT) {
    return {
      widget_list: MULTI_CLICK_COMPONENT_WIDGET_LIST
    };
  } else if (type === AUTO_PRODUCT_RECOMMENDATION_COMPONENT) {
    return {
      widget_list: AUTO_PRODUCT_RECOMMENDATION_COMPONENT_WIDGET_LIST
    };
  } else {
    return {
      widget_list: AUTOMATED_BRAND_CAROUSEL_WIDGET_LIST
    };
  }
}
export function getComponentData(
  positionInFeed,
  fetchURL,
  postParams: null,
  backUpUrl,
  type,
  feedType,
  msdABPCBrandCount
) {
  return async (dispatch, getState, { api }) => {
    dispatch(componentDataRequest(positionInFeed));
    try {
      let postData;
      let result;
      let resultJson;

      if (postParams && postParams.widgetPlatform === MSD_WIDGET_PLATFORM) {
        const widgetSpecificPostData = getMsdPostData(type);
        let msdNumberOfResults = MSD_NUM_RESULTS;
        if (type === AUTOMATED_BRAND_CAROUSEL || MSD_AUTOMATED_BRAND_CAROUSEL) {
          msdNumberOfResults = MSD_NUM_RESULTS_FOR_AUTOMATED_BRAND_COMPONENT;
        }
        postData = await getMsdFormData(widgetSpecificPostData.widget_list, [
          msdNumberOfResults
        ]);

        if (type === AUTOMATED_BRAND_CAROUSEL || MSD_AUTOMATED_BRAND_CAROUSEL) {
          postData.append("num_brands", JSON.stringify(msdABPCBrandCount));
          postData.append("num_products", JSON.stringify(MSD_NUM_PRODUCTS));
          postData.append("channel", "pwa");
        }

        if (type === FOLLOW_WIDGET) {
          postData.append("num_brands", JSON.stringify(MSD_NUM_BRANDS));
        }

        if (type === MULTI_CLICK_COMPONENT) {
          postData.append("num_brands", JSON.stringify(MSD_NUM_BRANDS));
        }

        if (
          type === DISCOVER_MORE ||
          type === AUTO_PRODUCT_RECOMMENDATION_COMPONENT ||
          MSD_DISCOVER_MORE
        ) {
          postData.set(
            "num_results",
            JSON.stringify([DISCOVER_MORE_NUM_RESULTS])
          );
        }

        result = await api.postMsd(fetchURL, postData);
        resultJson = await result.json();
        if (resultJson.errors) {
          throw new Error(`${resultJson.errors[0].message}`);
        }

        resultJson.data = resultJson.data[0];

        if (feedType === SECONDARY_FEED_TYPE) {
          dispatch(
            secondaryFeedComponentDataSuccess(resultJson, positionInFeed, true)
          );
        } else {
          dispatch(componentDataSuccess(resultJson, positionInFeed, true));
        }
      } else {
        delay(() => {
          const isFetchUrlDataLoading = getState().feed.homeFeed[positionInFeed]
            ? getState().feed.homeFeed[positionInFeed].loading
            : null;
          if (isFetchUrlDataLoading && backUpUrl) {
            dispatch(getComponentDataBackUp(backUpUrl, positionInFeed));
          }
        }, ADOBE_TARGET_DELAY);
        const mcvId = await getMcvId();
        resultJson = await api.postAdobeTargetUrl(
          fetchURL,
          postParams && postParams.mbox ? postParams.mbox : null,
          mcvId,
          null,
          false
        );
        resultJson = resultJson[0];
        if (resultJson.errors) {
          throw new Error(`${resultJson.errors[0].message}`);
        }
        let parsedResultJson = JSON.parse(resultJson.content);

        parsedResultJson = parsedResultJson.items[0];
        if (feedType === SECONDARY_FEED_TYPE) {
          dispatch(
            secondaryFeedComponentDataSuccess(resultJson, positionInFeed, true)
          );
        } else {
          dispatch(componentDataSuccess(parsedResultJson, positionInFeed));
        }
      }
    } catch (e) {
      if (feedType === SECONDARY_FEED_TYPE) {
        dispatch(secondaryFeedComponentDataFailure(positionInFeed, e.message));
      } else {
        dispatch(componentDataFailure(positionInFeed, e.message));
      }
    }
  };
}
export function msdHomeComponentsSuccess(homeMsdData) {
  return {
    type: MSD_HOME_COMPONENT_SUCCESS,
    status: SUCCESS,
    homeMsdData
  };
}
export function msdHomeComponentsRequest() {
  return {
    type: MSD_HOME_COMPONENT_REQUEST,
    status: REQUESTING
  };
}
export function msdAbcComponentsSuccess(homeAbcMsdData) {
  return {
    type: MSD_HOME_ABC_COMPONENT_SUCCESS,
    status: SUCCESS,
    homeAbcMsdData
  };
}
export function msdAbcComponentsRequest() {
  return {
    type: MSD_HOME_ABC_COMPONENT_REQUEST,
    status: REQUESTING
  };
}
export function msdAbcComponents() {
  return async (dispatch, getState, { api }) => {
    try {
      dispatch(msdAbcComponentsRequest());
      let postData;
      let result;
      let resultJson;
      const widgetSpecificPostData = [113];
      const msdABPCBrandCount = [10];
      let msdNumberOfResults = 5;
      postData = await getMsdFormData(AUTOMATED_BRAND_CAROUSEL_WIDGET_LIST, [
        msdNumberOfResults
      ]);
      postData.append("widget_list", JSON.stringify(widgetSpecificPostData));
      postData.append("num_brands", JSON.stringify(msdABPCBrandCount));
      postData.append("num_products", JSON.stringify(MSD_NUM_PRODUCTS));
      postData.append("channel", "pwa");

      result = await api.postMsd(`${MSD_ROOT_PATH}/widgets`, postData);
      resultJson = await result.json();
      if (result && result.status && result.status === FAILURE) {
        throw new Error(`${result.message}`);
      }

      resultJson = resultJson && resultJson.data && resultJson.data[0];
      dispatch(msdAbcComponentsSuccess(resultJson));
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  };
}

export function msdDiscoverMoreHomeComponents(type) {
  return async (dispatch, getState, { api }) => {
    try {
      // const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      dispatch(msdHomeComponentsRequest());
      let data;
      let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      if (userDetails) {
        userDetails = JSON.parse(userDetails);
      }
      let discoverMoreData = new FormData();
      discoverMoreData.append("api_key", api_key);
      discoverMoreData.append("widget_list", [110]);
      discoverMoreData.append("num_results", [10]);
      discoverMoreData.append("mad_uuid", await getMcvId());
      discoverMoreData.append("details", false);
      if (userDetails && userDetails.customerId) {
        discoverMoreData.append("user_id", userDetails.customerId);
      }
      const discoverMoreresult = await api.postMsd(
        `${MSD_ROOT_PATH}/widgets`,
        discoverMoreData
      );
      const discoverMoreresultJson = await discoverMoreresult.json();
      if (discoverMoreresultJson.status === FAILURE) {
        throw new Error(`${discoverMoreresultJson.message}`);
      }
      if (discoverMoreresultJson.status === "success") {
        data = {
          data: discoverMoreresultJson && discoverMoreresultJson.data
        };
        dispatch(msdHomeComponentsSuccess(data.data));
      }
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  };
}
export function automatedWidgetsForHomeSuccess(
  homeAutoWidgetData,
  widgetKey,
  productCode
) {
  return {
    type: AUTOMATED_WIDGET_HOME_SUCCESS,
    status: SUCCESS,
    homeAutoWidgetData,
    widgetKey,
    productCode
  };
}
export function automatedWidgetsForHomeRequest() {
  return {
    type: AUTOMATED_WIDGET_HOME_REQUEST,
    status: REQUESTING
  };
}
export function getAutomatedWidgetsItemsRequest() {
  return {
    type: AUTOMATED_WIDGET_ITEM_REQUEST,
    status: REQUESTING
  };
}
export function getWidgetsData(automatedData, widgetName) {
  return {
    type: AUTOMATED_MSD_WIDGET_ITEM_DATA,
    status: SUCCESS,
    automatedData,
    widgetName
  };
}

export function getAutomatedWidgetsItems(itemIds, widgetKey, productCode) {
  return async (dispatch, getState, { api }) => {
    try {
      dispatch(getAutomatedWidgetsItemsRequest());
      // let requests =
      //   productCodes &&
      //   productCodes.map(id =>
      //     api.getMiddlewareUrl(
      //       `v2/mpl/cms/page/getProductInfo?isPwa=true&productCodes=${id}`
      //     )
      //   );
      let productCodes = itemIds && itemIds.toString();
      const url = `v2/mpl/cms/page/getProductInfo?isPwa=true&productCodes=${productCodes}`;
      const result = await api.getMiddlewareUrl(url);
      const resultJson = await result.json();
      if (resultJson && resultJson.status === "Success" && resultJson.results) {
        dispatch(
          automatedWidgetsForHomeSuccess(
            resultJson.results,
            widgetKey,
            productCode
          )
        );
      }
      // let requests =
      //   productCodes &&
      //   productCodes.map(id =>
      //     api.getMiddlewareUrl(
      //       `${PRODUCT_DESCRIPTION_PATH}/${id}?isPwa=true&isMDE=true`
      //     )
      //   );

      //requests for individual calls
      // let productList = [];
      // const results = await Promise.allSettled(requests);
      // const successfulPromises = results.filter(
      //   request => request.status === "fulfilled"
      // );
      // let productListWithStatus = await Promise.all(successfulPromises).then(
      //   response =>
      //     Promise.all(response.map(r => r && r.value && r.value.json()))
      // );
      // productListWithStatus &&
      //   productListWithStatus.map(product => {
      //     if (product.status === "Success" && product.results) {
      //       productList.push(product.results[0]);
      //     }
      //     //commented for productDetails
      //     // if(product.status === "SUCCESS") {
      //     //   productList.push(product);
      //     // }
      //   });
      // if (Array.isArray(productList) && productList.length > 0) {
      //   dispatch(
      //     automatedWidgetsForHomeSuccess(productList, widgetKey, productCode)
      //   );
      // }
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  };
}

export function automatedWidgetsForHome(widgetData) {
  return async (dispatch, getState, { api }) => {
    try {
      dispatch(automatedWidgetsForHomeRequest());
      let data;
      let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      if (userDetails) {
        userDetails = JSON.parse(userDetails);
      }
      let productId =
        widgetData && widgetData.hexCode && widgetData.hexCode.toUpperCase();
      let msdWidgetData = new FormData();
      if (userDetails && userDetails.customerId) {
        msdWidgetData.append("user_id", userDetails.customerId);
      }
      msdWidgetData.append("api_key", api_key);
      msdWidgetData.append("widget_list", widgetData.webURL);
      msdWidgetData.append("num_results", widgetData.btnText);
      msdWidgetData.append("mad_uuid", await getMcvId());
      msdWidgetData.append("product_id", productId);
      if (widgetData && widgetData.webURL && widgetData.webURL === "114") {
        msdWidgetData.append("details", false);
      } else {
        msdWidgetData.append("details", true);
        msdWidgetData.append("fields", JSON.stringify(["mop"]));
        if (widgetData && widgetData.description) {
          let filterValue =
            widgetData &&
            widgetData.description &&
            widgetData.description.split(";");
          let filterParsedData;
          if (filterValue[1] === "contains") {
            filterParsedData = [
              {
                field: `${filterValue[0]}`,
                type: `${filterValue[1]}`,
                value: `${filterValue[2]}`
              }
            ];
          } else {
            let value = [filterValue[2]];
            filterParsedData = [
              {
                field: `${filterValue[0]}`,
                type: `${filterValue[1]}`,
                value: `${value}`
              }
            ];
          }
          msdWidgetData.append("filters", JSON.stringify(filterParsedData));
        }
      }
      // msdWidgetData.append("filters", widgetData.description);
      // msdWidgetData.append("fields", widgetData.title);
      // msdWidgetData.append("channel", "pwa");
      const msdWidgetDataResult = await api.postMsd(
        `${MSD_ROOT_PATH}/widgets`,
        msdWidgetData
      );
      const msdWidgetDataJson = await msdWidgetDataResult.json();
      if (msdWidgetDataJson.status === FAILURE) {
        throw new Error(`${msdWidgetDataJson.message}`);
      }
      if (widgetData.webURL === "114") {
        data =
          msdWidgetDataJson &&
          msdWidgetDataJson.data[0] &&
          msdWidgetDataJson.data[0].itemIds;
      } else {
        data = msdWidgetDataJson && msdWidgetDataJson.data[0];
      }
      if (
        msdWidgetDataJson &&
        msdWidgetDataJson.data &&
        Array.isArray(msdWidgetDataJson.data) &&
        msdWidgetDataJson.status !== "failure"
      ) {
        dispatch(getWidgetsData(msdWidgetDataJson.data[0], widgetData.webURL));
        if (widgetData.webURL === "114") {
          dispatch(
            getAutomatedWidgetsItems(
              data,
              widgetData.webURL,
              widgetData.hexCode
            )
          );
        } else {
          dispatch(
            automatedWidgetsForHomeSuccess(
              data,
              widgetData.webURL,
              widgetData.hexCode
            )
          );
        }
      }
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  };
}
