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
      //https://www.tatacliq.com/marketplacewebservices/v2/mpl/cms/defaultpage?pageId=hp-test
      // const result = await api.get(
      //   `v2/mpl/cms/defaultpage?pageId=defaulthomepage&channel=${WCMS_PLATFORM}`
      // );
      // const result = await api.get(
      //   `v2/mpl/cms/defaultpage?pageId=hp-test`
      // );
      //const resultJson = await result.json();
      const resultJson = {
        items: [
          {
            componentName: "landingPageTitleComponent",
            landingPageTitleComponent: {
              componentId: "comp_0000I1PG",
              title: "Welcome to Mock World!",
              type: "Landing Page Title Component"
            }
          },
          {
            componentName: "spaceItemComponent",
            singleBannerComponent: {
              componentId: "comp_0000I1Q0",
              title: "",
              type: "spaceItemComponent"
            }
          },
          {
            componentName: "01QLC-P",
            singleBannerComponent: {
              componentId: "comp_0000I1QC",
              items: [
                {
                  btnText: "",
                  description: "HP-1",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615316705310.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/westside/c-mbh11a00004?&icid2=quic:qul:main:hmp:m10:a00004:best:01:R1:blp:Bx:010"
                },
                {
                  btnText: "",
                  description: "HP-1",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27623946879006.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/smartphones/c-msh1210100?&icid2=quic:qul:main:hmp:m1210100:mulb:best:02:R1:clp:Bx:010"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615316836382.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/cliq-luxury?&icid2=quic:qul:main:hmp:m00:mulb:best:03:R1:clp:Bx:010"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27623946944542.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/appliances-store?&icid2=quic:qul:main:hmp:m12:mulb:best:04:R1:clp:Bx:010"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615316901918.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/watches/c-msh15?q=%3Arelevance%3Acategory%3AMSH15%3Acategory%3AMSH15%3Acategory%3AMSH15%3Acategory%3AMSH15%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3AdiscountFlag%3A10%2525%2B-%2B30%2525%3AdiscountFlag%3A30%2525%2B-%2B50%2525%3AdiscountFlag%3A50%2525%2B-%2B70%2525&icid2=quic:qul:main:hmp:m15:mulb:best:05:R1:clp:Bx:010"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615317229598.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-laptop/c-msh1223?&icid2=quic:qul:main:hmp:m1223:mulb:best:06:R1:clp:Bx:010"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615317032990.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing/c-msh10?q=%3Arelevance%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3AdiscountFlag%3A50%2525%2B-%2B70%2525%3AdiscountFlag%3A70%2525%2Band%2Bmore%3AdiscountFlag%3A30%2525%2B-%2B50%2525&icid2=quic:qul:main:hmp:m10:mulb:best:07:R1:clp:Bx:010"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27623947010078.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/accessories/c-msh1222/?q=:relevance:category:MSH1222&icid2=quic:qul:main:hmp:m1222:mulb:best:08:R1:clp:Bx:010"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615317164062.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/mens-clothing/c-msh11?&icid2=quic:qul:main:hmp:m11:mulb:best:09:R1:clp:Bx:010"
                }
              ],
              title: "",
              type: "01QLC-P"
            }
          },
          {
            componentName: "01HBC-P",
            heroBannerComponent: {
              componentId: "comp_0000JD94",
              dimension: "HP-1",
              interval: "5",
              items: [
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27591912783902.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/smartphones/c-msh1210100?&icid2=hero:hbr:main:hmp:m1210100:mulb:best:01:R4:clp:bx:010"
                },
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615299371038.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing/c-msh10?q=%3Arelevance%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00179%3Abrand%3AMBH11A00269%3Abrand%3AMBH11A00189%3Abrand%3AMBH11A00191%3Abrand%3AMBH11B10140%3Abrand%3AMBH11A00174%3Abrand%3AMBH11A00254%3Abrand%3AMBH11A00472%3Abrand%3AMBH11A00187%3Abrand%3AMBH11A00177%3Abrand%3AMBH11A00245%3Abrand%3AMBH11A00181%3Abrand%3AMBH11B11602&icid2=hero:hbr:main:hmp:m10:mulb:best:02:R4:clp:bx:010"
                },
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27591912914974.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-wearable-devices-fitness-tracker/c-msh1219105?&icid2=hero:hbr:main:hmp:m1219105:mulb:best:03:R4:clp:bx:010"
                },
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27591912980510.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/footwear-men/c-msh1311?q=%3Arelevance%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH13F00069%3Abrand%3AMBH13F00273&icid2=hero:hbr:main:hmp:m1311:f00273:best:04:R4:blp:bx:010"
                },
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27591913046046.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-personal-care/c-msh1236?&icid2=hero:hbr:main:hmp:m1236:mulb:best:05:R4:clp:bx:010"
                }
              ],
              type: "01HBC-P"
            }
          },
          {
            componentName: "spaceItemComponent",
            singleBannerComponent: {
              componentId: "comp_0000JM8I",
              title: "",
              type: "spaceItemComponent"
            }
          },
          {
            componentName: "01BOC-P",
            singleBannerComponent: {
              componentId: "comp_0000ICIQ",
              items: [
                {
                  btnText: "",
                  description: "HP-1",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727865708574.jpg",
                  title: "",
                  webURL: ""
                }
              ],
              title: "The Westside Store",
              type: "01BOC-P"
            }
          },
          {
            componentName: "spaceItemComponent",
            singleBannerComponent: {
              componentId: "comp_0000JMCE",
              title: "",
              type: "spaceItemComponent"
            }
          },
          {
            componentName: "01LEC-P",
            singleBannerComponent: {
              componentId: "comp_0000I4UJ",
              items: [
                {
                  btnText: "Shop now",
                  description: "The biggest fashion sale is here!",
                  hexCode: "HP-1",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727856861214.jpg",
                  title: "IT'S SALE TIME",
                  webURL:
                    "https://www.tatacliq.com/westside/c-mbh11a00004?&icid2=west:edit:main:hmp:m10:a00004:best:01:R22:blp:Bx:010"
                },
                {
                  btnText: "Shop now",
                  description: "Pretty ethnics at prices you'll love",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727856926750.jpg",
                  title: "FASHION FLAUNT",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing/c-msh10?q=%3Arelevance%3Acategory%3AMSH10%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00191&icid2=west:edit:main:hmp:m10:a00191:best:02:R22:blp:bx:001"
                },
                {
                  btnText: "Shop now",
                  description: "Save big on your everyday staples",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727856992286.jpg",
                  title: "SECOND SKIN",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing/c-msh10?q=:relevance:inStockFlag:true:isLuxuryProduct:false:category:MSH10:brand:MBH11A00245&icid2=west:edit:main:hmp:m10:a00245:best:03:R22:blp:bx:001"
                },
                {
                  btnText: "Shop now",
                  description: "Easy-on-the-pocket fusion trends",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727857057822.jpg",
                  title: "SPIRITED STYLES",
                  webURL:
                    "https://www.tatacliq.com/bombay-paisley/c-mbh11a00174/page-1?q=:relevance:brand:MBH11A00174:brand:MBH11A00174:inStockFlag:true:isLuxuryProduct:false&icid2=west:edit:main:hmp:m10:a00174:best:04:R22:blp:bx:001"
                },
                {
                  btnText: "Shop now",
                  description: "Save on a makeover for the li'l ones",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727857123358.jpg",
                  title: "KID'S CORNER",
                  webURL:
                    "https://www.tatacliq.com/kids/c-msh21?q=%3Arelevance%3Acategory%3AMSH21%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00256&icid2=west:edit:main:hmp:m21:a00256:best:05:R22:blp:bx:001"
                },
                {
                  btnText: "Shop now",
                  description: "Styles for every mood, now on sale",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727857188894.jpg",
                  title: "TREND FORWARD",
                  webURL:
                    "https://www.tatacliq.com/mens-clothing/c-msh11/page-1?q=%3Arelevance%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11B10748%3Abrand%3AMBH11B10259%3Abrand%3AMBH11B10749%3Abrand%3AMBH11B10750&icid2=west:edit:main:hmp:m11:b10748:best:06:R22:blp:bx:001"
                },
                {
                  btnText: "Shop now",
                  description: "Footwear at flattering prices",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727857582110.jpg",
                  title: "SOLE STORY",
                  webURL:
                    "https://www.tatacliq.com/footwear-women/c-msh1310?q=%3Arelevance%3Acategory%3AMSH1310%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH13F00266&icid2=west:edit:main:hmp:m1310:f00266:best:07:R22:blp:Bx:010"
                },
                {
                  btnText: "Shop now",
                  description: '"Get festive-ready with these offers',
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727857516574.jpg",
                  title: "FESTIVE READY",
                  webURL:
                    "https://www.tatacliq.com/vark/c-mbh11a00269/page-1?q=:relevance:brand:MBH11A00269:inStockFlag:true:isLuxuryProduct:false&icid2=west:edit:main:hmp:m10:a00269:best:08:R22:blp:bx:001"
                }
              ],
              title: "",
              type: "01LEC-P"
            }
          },
          {
            componentName: "spaceItemComponent",
            singleBannerComponent: {
              componentId: "comp_0000IZ0G",
              title: "",
              type: "spaceItemComponent"
            }
          },
          {
            componentName: "titleComponentH1",
            singleBannerComponent: {
              componentId: "comp_0000ICIR",
              title: "Best Of Tech",
              type: "titleComponentH1"
            }
          },
          {
            componentName: "spaceItemComponent",
            singleBannerComponent: {
              componentId: "comp_0000I39Y",
              title: "",
              type: "spaceItemComponent"
            }
          },
          {
            componentName: "01LEC-P",
            singleBannerComponent: {
              componentId: "comp_0000I4UI",
              items: [
                {
                  btnText: "Explore",
                  description: "Split and window ACs for comfort at home",
                  hexCode: "HP-2",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727858466846.jpg",
                  title: "THE COOL CORNER",
                  webURL:
                    "https://www.tatacliq.com/air-conditioner/c-msh1230?q=%3Arelevance%3Acategory%3AMSH1230%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12B10047&icid2=estrp:edit:main:hmp:m1230:b10047:best:01:R28:blp:bx:010"
                },
                {
                  btnText: "Explore",
                  description: "Headphones for an unforgettable experience",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727858532382.jpg",
                  title: "GREAT SOUND BECKONS",
                  webURL:
                    "https://www.tatacliq.com/head-phones/c-msh1234?q=%3Arelevance%3Acategory%3AMSH1234%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00013&icid2=estrp:edit:main:hmp:m1234:e00013:best:02:R28:blp:bx:010"
                },
                {
                  btnText: "Explore",
                  description:
                    "New-age smartphones known for speed & efficiency",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727858597918.jpg",
                  title: "THE SMART SWITCH",
                  webURL:
                    "https://www.tatacliq.com/mobile-phones/c-msh1210/?q=:relevance:inStockFlag:true:isLuxuryProduct:false:category:MSH1210:brand:MBH12E00256&icid2=estrp:edit:main:hmp:m1210:e00256:best:03:R28:blp:bx:010"
                },
                {
                  btnText: "Explore",
                  description:
                    "Refrigerators equipped with the latest features",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727858663454.jpg",
                  title: "THE FRESH CHOICE",
                  webURL:
                    "https://www.tatacliq.com/electronics-large-appliances-refrigerators/c-msh1214100?q=%3Arelevance%3Acategory%3AMSH1214100%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00047&icid2=estrp:edit:main:hmp:m1214100:e00047:best:04:R28:blp:bx:010"
                },
                {
                  btnText: "EXPLORE",
                  description: "Everyday storage devices you can trust",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727858728990.jpg",
                  title: "SAFE AND SECURE",
                  webURL:
                    "https://www.tatacliq.com/storage-devices/c-msh1228?q=%3Arelevance%3Acategory%3AMSH1228%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00080&icid2=estrp:edit:main:hmp:m1228:e00080:best:05:R28:blp:bx:010"
                },
                {
                  btnText: "Explore",
                  description: "Say goodbye to glitches with top smartphones",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727858794526.jpg",
                  title: "DAILY POWER PACKS",
                  webURL:
                    "https://www.tatacliq.com/mobile-phones/c-msh1210/page-1?q=%3Arelevance%3Acategory%3AMSH1210%3Acategory%3AMSH1210%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Acategory%3AMSH1210%3Abrand%3AMBH12E00181&icid2=estrp:edit:main:hmp:m1210:e00181:best:06:R28:blp:bx:010"
                },
                {
                  btnText: "Explore",
                  description: "Futuristic fitness trackers and smartwatches",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727858860062.jpg",
                  title: "TRACK EVERY MOVE",
                  webURL:
                    "https://www.tatacliq.com/electronics-wearable-devices/c-msh1219?q=%3Arelevance%3Acategory%3AMSH1219%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00042&icid2=estrp:edit:main:hmp:m1219:e00042:best:07:R28:blp:bx:010"
                },
                {
                  btnText: "EXPLORE",
                  description: "Appliances that prioritize your convenience",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727858925598.jpg",
                  title: "BRING HOME EASE",
                  webURL:
                    "https://www.tatacliq.com/electronics/c-msh12?q=%3Arelevance%3Acategory%3AMSH12%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00048&icid2=estrp:edit:main:hmp:m12:e00048:best:01:R28:blp:bx:010"
                }
              ],
              title: "",
              type: "01LEC-P"
            }
          },
          {
            componentName: "spaceItemComponent",
            singleBannerComponent: {
              componentId: "comp_0000JMI9",
              title: "",
              type: "spaceItemComponent"
            }
          },
          {
            componentName: "titleComponentH1",
            singleBannerComponent: {
              componentId: "comp_0000I39H",
              title: "Special Offers",
              type: "titleComponentH1"
            }
          },
          {
            componentName: "spaceItemComponent",
            singleBannerComponent: {
              componentId: "comp_0000I3A2",
              title: "",
              type: "spaceItemComponent"
            }
          },
          {
            componentName: "01MBC-P",
            singleBannerComponent: {
              componentId: "comp_0000I1PR",
              items: [
                {
                  btnText: "",
                  description: "HP-1",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727859515422.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/head-phones/c-msh1234?q=%3Arelevance%3Acategory%3AMSH1234%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12B10686&icid2=bouq:3by2:main:hmp:m1234:b10686:best:01:R31:blp:bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727859580958.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/footwear/c-msh13?q=%3Arelevance%3Acategory%3AMSH13%3Acategory%3AMSH13%3Acategory%3AMSH13%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH13A00168%3AdiscountFlag%3A50%2525%2B-%2B70%2525%3AdiscountFlag%3A70%2525%2Band%2Bmore&icid2=bouq:3by2:main:hmp:m13:a00168:best:02:R31:blp:bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727859646494.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/smartphones/c-msh1210100?q=:relevance:inStockFlag:true:isLuxuryProduct:false:category:MSH1210100:brand:MBH12B10285&icid2=bouq:3by2:main:hmp:m1210100:b10285:best:03:R8:blp:bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727859712030.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing/c-msh10?q=%3Arelevance%3Acategory%3AMSH10%3Acategory%3AMSH10%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00015%3AdiscountAll%3ADiscounted%2BItems&icid2=bouq:3by2:main:hmp:m10:a00015:ut75off:04:R8:blp:bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727859777566.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/storage-devices/c-msh1228?q=%3Arelevance%3Acategory%3AMSH1228%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00029&icid2=bouq:3by2:main:hmp:m1228:e00029:best:05:R31:blp:bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727859843102.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/mens-clothing/c-msh11?q=:relevance:category:MSH11:category:MSH11:category:MSH11:inStockFlag:true:isLuxuryProduct:false:brand:MBH11W00040:brand:MBH11B10464:brand:MBH11B10243:brand:MBH11B10242:category:MSH11:brand:MBH11W00040:brand:MBH11B10464:brand:MBH11B10243:brand:MBH11B10242:category:MSH11:brand:MBH11W00040:brand:MBH11B10464:brand:MBH11B10243:brand:MBH11B10242:category:MSH11:brand:MBH11W00040:brand:MBH11B10464:brand:MBH11B10243:brand:MBH11B10242:brand:MBH11B10241&icid2=bouq:3by2:main:hmp:m11:b10241:best:06:R31:blp:bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727859908638.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/large-appliances/c-msh1214?q=%3Arelevance%3Acategory%3AMSH1214%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12B10397&icid2=bouq:3by2:main:hmp:m1214:b10397:best:07:R31:blp:bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727859974174.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/eyewear-sunglasses/c-msh2416/page-1?q=%3Arelevance%3Acategory%3AMSH2416%3Acategory%3AMSH2416%3Acategory%3AMSH2416%3Acategory%3AMSH2416%3Acategory%3AMSH2416%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH16W00299&icid2=bouq:3by2:main:hmp:m2416:w00299:best:08:R31:blp:bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27727860039710.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-small-appliances-water-purifier/c-msh1231103?q=%3Arelevance%3Acategory%3AMSH1231103%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00134&icid2=bouq:3by2:main:hmp:m1231103:e00134:best:09:R31:blp:bx:001"
                }
              ],
              title: "",
              type: "01MBC-P"
            }
          },
          {
            componentName: "spaceItemComponent",
            singleBannerComponent: {
              componentId: "comp_0000JJRC",
              title: "",
              type: "spaceItemComponent"
            }
          },
          {
            componentName: "01BOC-P",
            singleBannerComponent: {
              componentId: "comp_0000FIRO",
              items: [
                {
                  btnText: "",
                  description: "HP-2",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/26972332982302.gif",
                  title: "",
                  webURL: ""
                }
              ],
              title: "",
              type: "01BOC-P"
            }
          },
          {
            componentName: "01LSSC-P",
            singleBannerComponent: {
              componentId: "comp_0000I8X5",
              items: [
                {
                  btnText: "",
                  description: "HP-1",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27616426754078.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/custom/oppo-reno4?&icid2=fres:spc:main:hmp:m1210:e00256:best:20:R13:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615317491742.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing/c-msh10?q=%3Arelevance%3Acategory%3AMSH10%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00002&icid2=fres:spc:main:hmp:m10:a00002:best:16:R13:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615317557278.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/haier-brand-store?&icid2=fres:spc:main:hmp:m12:e00263:best:04:R13:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615317688350.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/hisense?&icid2=fres:spc:main:hmp:m1216:mulb:best:17:R13:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615317622814.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/fila-brand-store?&icid2=fres:spc:main:hmp:m01:f00039:best:03:R13:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615317819422.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/infinity-brand-store?&icid2=fres:ssc:main:hmp:m12:e00998:best:06:R13:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615317753886.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/gant-brand-store?&icid2=fres:ssc:main:hmp:m11:a00117:best:05:R13:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615317950494.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/apple-days?&icid2=fres:spc:main:hmp:m12:e00008:best:08:R13:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615317884958.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/asics-brand-store?&icid2=fres:spc:main:hmp:m13:f00012:best:07:R13:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615318016030.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/search/?searchCategory=all&text=vivo%20x50&icid2=fres:ssc:main:hmp:m1210100:e00181:best:10:R13:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615318081566.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/adidas-brand-store?&icid2=fres:spc:main:hmp:m01:f00009:best:11:R11:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615318147102.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/sennheiser/c-mbh12e00030?&icid2=fres:ssc:main:hmp:m12:e00030:best:12:R13:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615318212638.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/gap-brand-store?&icid2=fres:spc:main:hmp:m01:b11389:best:09:R13:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615318278174.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/aldo-brand-store?&icid2=fres:ssc:main:hmp:m01:f00012:best:13:R13:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615318343710.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/reebok-brand-store?&icid2=fres:ssc:main:hmp:m13:a00099:best:14:R13:blp:Bx:001"
                },
                {
                  btnText: "",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27615318409246.jpg",
                  title: "Shop now",
                  webURL:
                    "https://www.tatacliq.com/birkenstock-brand-store?&icid2=fres:spc:main:hmp:m13:b11608:best:15:R13:blp:Bx:001"
                }
              ],
              title: "",
              type: "01LSSC-P"
            }
          },
          {
            componentName: "01TBT-P",
            twoByTwoBannerComponent: {
              componentId: "comp_0000I2HB",
              items: [
                {
                  description: "HP-1",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/17583744188446.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/footwear-women-casual/c-msh1310113?q=%20%20%20%3Arelevance%3Aprice%3A%E2%82%B9599-%E2%82%B9999&icid2=valu:22b:main:hmp:m1310113:mulb:blw999:01:R49:clp:Bx:001"
                },
                {
                  description: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/26395489107998.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-kitchen-appliances-cooktop/c-msh1229103?&icid2=valu:22b:main:hmp:m1229103:mulb:srt1399:02:R49:clp:Bx:001"
                },
                {
                  description: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/17583744319518.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/watches/c-msh15/page-1?q=%20%20%20%3Arelevance%3Aprice%3A%E2%82%B9400-%E2%82%B91%2C999&icid2=valu:22b:main:hmp:m15:mulb:blw1999:03:R49:clp:Bx:001"
                },
                {
                  description: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/26395491565598.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-personal-care-trimmer-shaver/c-msh1236105/page-1?q=%3Arelevance%3Acategory%3AMSH1236105%3Acategory%3AMSH1236105%3AisLuxuryProduct%3Afalse%3AinStockFlag%3Atrue&icid2=valu:22b:main:hmp:m1236105:mulb:srt599:04:R49:clp:Bx:001"
                }
              ],
              title: "",
              type: "01TBT-P"
            }
          },
          {
            componentName: "spaceItemComponent",
            singleBannerComponent: {
              componentId: "comp_0000I39Q",
              title: "",
              type: "spaceItemComponent"
            }
          },
          {
            componentName: "spaceItemComponent",
            singleBannerComponent: {
              componentId: "comp_0000IIZJ",
              title: "",
              type: "spaceItemComponent"
            }
          },
          {
            componentName: "msdAutomatedBannerProductCarouselComponent",
            singleBannerComponent: {
              componentId: "comp_0000JQ4A",
              items: [
                {
                  btnText: "View more",
                  description: "msdAutomatedBannerProductCarouselComponent",
                  hexCode: "15",
                  imageURL: "",
                  title: "msd",
                  webURL: "https://ap-southeast-1-api.madstreetden.com/widgets"
                }
              ],
              title: "",
              type: "msdAutomatedBannerProductCarouselComponent"
            }
          },
          {
            componentName: "msdAutoDiscoverMoreComponent",
            singleBannerComponent: {
              componentId: "comp_0000JQ4B",
              items: [
                {
                  btnText: "msd",
                  description: "msdAutoDiscoverMoreComponent",
                  hexCode: "msd",
                  imageURL: "",
                  title: "msd",
                  webURL: "https://ap-southeast-1-api.madstreetden.com/widgets"
                }
              ],
              title: "",
              type: "msdAutoDiscoverMoreComponent"
            }
          },
          {
            componentName: "awv",
            singleBannerComponent: {
              componentId: "cmsitem_00232487",
              items: [
                {
                  btnText: "Launch This!",
                  description: "http://interact.tatacliq.com/getsummerready/",
                  hexCode: "",
                  imageURL: "",
                  title: "",
                  webURL: "https://www.tatacliq.com/awv"
                }
              ],
              title: "",
              type: "awv"
            }
          },
          {
            componentName: "AutoWidget",
            singleBannerComponent: {
              componentId: "cmsitem_00232462",
              items: [
                {
                  btnText: "15",
                  description: "",
                  hexCode: "mp000000006735167",
                  imageURL: "",
                  title: "Similar Products",
                  webURL: "0"
                }
              ],
              title: "",
              type: "AutoWidget"
            }
          },
          {
            componentName: "AutoWidget",
            singleBannerComponent: {
              componentId: "cmsitem_00232462",
              items: [
                {
                  btnText: "15",
                  description: "",
                  hexCode: "",
                  imageURL: "",
                  title: "Recently Viewed",
                  webURL: "7"
                }
              ],
              title: "",
              type: "AutoWidget"
            }
          },
          {
            componentName: "AutoWidget",
            singleBannerComponent: {
              componentId: "cmsitem_00232462",
              items: [
                {
                  btnText: "15",
                  description: "",
                  hexCode: "",
                  imageURL: "",
                  title: "XYZZZ",
                  webURL: "3"
                }
              ],
              title: "",
              type: "AutoWidget"
            }
          },
          {
            componentName: "AutoWidget",
            singleBannerComponent: {
              componentId: "cmsitem_00232462",
              items: [
                {
                  btnText: "10",
                  description: "",
                  hexCode: "mp000000005753607",
                  imageURL: "",
                  title: "Frequently Bought Together",
                  webURL: "4"
                }
              ],
              title: "",
              type: "AutoWidget"
            }
          },
          {
            componentName: "AutoWidget",
            singleBannerComponent: {
              componentId: "cmsitem_00232462",
              items: [
                {
                  btnText: "10",
                  description: "",
                  hexCode: "",
                  imageURL: "",
                  title: "Top Picks",
                  webURL: "11"
                }
              ],
              title: "",
              type: "AutoWidget"
            }
          },
          {
            componentName: "AutoWidget",
            singleBannerComponent: {
              componentId: "cmsitem_00232462",
              items: [
                {
                  btnText: "15",
                  description: "",
                  hexCode: "mp000000005753607",
                  imageURL: "",
                  title: "About The Brand",
                  webURL: "114"
                }
              ],
              title: "",
              type: "AutoWidget"
            }
          }
        ],
        message: "msd-test-1",
        pageName: "homepage-msd-1:160420",
        pageType: "",
        seo: {
          alternateURL: "",
          canonicalURL: "",
          description: "",
          imageURL: "",
          keywords: "",
          title:
            "Online Shopping Site in India - Upto 60% Off On Mobiles, Electronics, Fashion & Jewellery at Tata CLiQ"
        },
        status: "SUCCESS"
      };
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

        let url = `http://tataunistore.tt.omtrdc.net/rest/v1/delivery?client=tataunistore&sessionId=${mboxSessionIdJson}&version=2.1.1`;
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
        let data = resultJson.execute.mboxes[0].options[0].content;
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
export function msdAbcComponents(fetchURL) {
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
      resultJson = (await result) && result.json();

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

      data = {
        data: discoverMoreresultJson && discoverMoreresultJson.data
      };
      dispatch(msdHomeComponentsSuccess(data.data));
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
      let productCodes;
      productCodes = itemIds;

      let requests =
        productCodes &&
        productCodes.map(id =>
          api.getMiddlewareUrl(
            `v2/mpl/cms/page/getProductInfo?isPwa=true&productCodes=${id}`
          )
        );
      //requests for individual calls
      let productList = [];
      const results = await Promise.allSettled(requests);
      const successfulPromises = results.filter(
        request => request.status === "fulfilled"
      );
      let productListWithStatus = await Promise.all(successfulPromises).then(
        response =>
          Promise.all(response.map(r => r && r.value && r.value.json()))
      );
      productListWithStatus &&
        productListWithStatus.map(product => {
          if (product.status === "Success" && product.results) {
            productList.push(product.results[0]);
          }
        });
      if (Array.isArray(productList) && productList.length > 0) {
        dispatch(
          automatedWidgetsForHomeSuccess(productList, widgetKey, productCode)
        );
      }
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

      let msdWidgetData = new FormData();
      msdWidgetData.append("api_key", api_key);
      msdWidgetData.append("widget_list", widgetData.webURL);
      msdWidgetData.append("num_results", widgetData.btnText);
      msdWidgetData.append("mad_uuid", await getMcvId());
      msdWidgetData.append("details", false);
      if (userDetails && userDetails.customerId) {
        msdWidgetData.append("user_id", userDetails.customerId);
      }
      msdWidgetData.append("product_id", widgetData.hexCode.toUpperCase());
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
        dispatch(
          getAutomatedWidgetsItems(data, widgetData.webURL, widgetData.hexCode)
        );
      }
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  };
}
