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

export const AUTO_WISHLIST_COMPONENT_SUCCESS =
  "AUTO_WISHLIST_COMPONENT_SUCCESS";
export const AUTO_WISHLIST_COMPONENT_REQUEST =
  "AUTO_WISHLIST_COMPONENT_REQUEST";
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
      // const resultJson = await result.json();
      const resultJson = {
        items: [
          {
            componentName: "heroBannerComponent",
            heroBannerComponent: {
              componentId: "comp_0000CLTF",
              dimension: "",
              interval: "5",
              items: [
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976420818974.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/footwear-women/c-msh13/page-1?q=%3AisProductNew%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Acategory%3AMSH13%3Aprice%3A%25E2%2582%25B9899-%25E2%2582%25B99%252C999%3AdiscountAll%3ANon%2B-%2BDiscounted%2BItems%3Abrand%3AMBH13F00004%3Abrand%3AMBH13F00091%3Abrand%3AMBH13F00068%3Abrand%3AMBH13B10721&icid2=hero:hbr:main:hmp:m13:mulb:best:01:R4:clp:bx:010"
                },
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976615002142.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/head-phones/c-msh1234?&icid2=hero:hbr:main:hmp:m1234:mulb:best:02:R4:clp:bx:010"
                },
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976615067678.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/home/c-msh22/page-1?q=%3AisDiscountedPrice%3Acategory%3AMSH22%3Acategory%3AMSH22%3Acategory%3AMSH22%3Acategory%3AMSH22%3Acategory%3AMSH22%3Acategory%3AMSH22%3Acategory%3AMSH22%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH21B11637%3Abrand%3AMBH21B11526%3Acategory%3AMSH22%3Abrand%3AMBH21B11637%3Abrand%3AMBH21B11526%3Acategory%3AMSH22%3Abrand%3AMBH21B11637%3Abrand%3AMBH21B11526%3Acategory%3AMSH22%3Abrand%3AMBH21B11637%3Abrand%3AMBH21B11526%3Abrand%3AMBH21B11630%3Abrand%3AMBH21W00143%3Abrand%3AMBH21B11631%3Acategory%3AMSH22%3Abrand%3AMBH21B11637%3Abrand%3AMBH21B11526%3Acategory%3AMSH22%3Abrand%3AMBH21B11637%3Abrand%3AMBH21B11526%3Acategory%3AMSH22%3Abrand%3AMBH21B11637%3Abrand%3AMBH21B11526%3Acategory%3AMSH22%3Abrand%3AMBH21B11637%3Abrand%3AMBH21B11526%3Abrand%3AMBH21B11630%3Abrand%3AMBH21W00143%3Abrand%3AMBH21B11631%3Abrand%3AMBH21B11641%3Abrand%3AMBH21B11874Occasion%20-&icid2=hero:hbr:main:hmp:m22:mulb:best:03:R4:clp:bx:010"
                },
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976615133214.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/mobile-phones/c-msh1210?&icid2=hero:hbr:main:hmp:m1210:mulb:best:04:R4:clp:bx:010"
                },
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976615198750.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/accessories-women-bags/c-msh1600/page-1?q=%3Arelevance%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3Acategory%3AMSH1600%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3AbagType%3ABowlers%3AbagType%3ABucket%3AbagType%3AHandbags%3AbagType%3AHobos%3AbagType%3ATrapeze%3AbagType%3ATotes%3AbagType%3ASlings%3AbagType%3AShoulder%3AbagType%3ASatchels%3AbagType%3ASatchel%3AbagType%3ASaddle%3Acolour%3APink_FFC0CB%3Acolour%3APeach_ffcba4%3Acolour%3AKhaki_F0E68C%3Acolour%3ABeige_F5F5DC%3Acolour%3ACoral_FF7F50%3Acolour%3ATurquoise_40E0D0%3Acolour%3AWhite_FFFFFF&icid2=hero:hbr:main:hmp:m1600:mulb:best:05:R4:clp:bx:010"
                }
              ],
              type: "Hero Banner Component"
            }
          },
          {
            componentName: "heroBannerComponent",
            heroBannerComponent: {
              componentId: "cmsitem_00215894",
              dimension: "",
              interval: "",
              items: [
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27903091769374.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/bank-offers?&icid2=strip:hbr:main:hmp:m00:mulb:best:01:R2:tnc:bx:010"
                }
              ],
              type: "Hero Banner Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27773873913886.jpg",
              btnText: "",
              componentId: "comp_00240913",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL: ""
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27976615264286.jpg",
              btnText: "",
              componentId: "comp_00272071",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL:
                "https://www.tatacliq.com/vans-brand-store?&icid2=fres:cbc:main:hmp:m13:f00083:best:01:R13:blp:Bx:001"
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "comp_0000IHW9",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27940290494494.jpg",
                  logoImageURL: "",
                  webURL:
                    "http://tatacliq.com/akg-brand-store?&icid2=fres:tsb:main:hmp:m12:b11672:best:01:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976406728734.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/forever-21-brand-store?&icid2=fres:tsb:main:hmp:m10:a00021:best:03:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27902960730142.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/custom/boat-rockerz-335?&icid2=fres:tsb:main:hmp:m1234:e00147:best:04:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27923570458654.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/dune-london-brand-store?&icid2=new:tsb:clp:wom:m11:b11672:best:05:R5:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27960717082654.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/schneider-electric-brand-store?&icid2=fres:tsb:main:hmp:m12:b11672:best:02:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27923570655262.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/being-human-brand-store?&icid2=fres:tsb:main:hmp:m11:a00086:best:07:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27923570589726.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/marshall-brand-store?&icid2=fres:tsb:main:hmp:m12:e00511:best:08:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27923570720798.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/tupperware-brand-store?&icid2=fres:tsb:main:hmp:m01:b11528:best:09:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27923572719646.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/samsung-galaxy-note20-page?&icid2=fres:tsb:main:hmp:m1210:e00016:best:10:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27903091638302.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/custom/oppo-f17-pro-range?&icid2=fres:tsb:main:hmp:m1210100:e00256:best:06:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27827768754206.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/stryder-brand-store?&icid2=fres:tsb:main:hmp:m1318100:b11747:best:09:R11:blp:Bx:001"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27773874241566.jpg",
              btnText: "",
              componentId: "comp_00240912",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL: ""
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "comp_0000IHY4",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976615919646.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/mobile-phones/c-msh1210?&icid2=cate:tsb:main:hmp:m1210:mulb:best:01:R25:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976615985182.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-laptop/c-msh1223?&icid2=cate:tsb:main:hmp:m1223:mulb:best:02:R25:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976616050718.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/storage-devices/c-msh1228?&icid2=cate:tsb:main:hmp:m1228:mulb:best:03:R25:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976616116254.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-wearable-devices/c-msh1219?&icid2=cate:tsb:main:hmp:m1219:mulb:best:04:R25:clp:bx:001"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "comp_0000JQCQ",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27903094587422.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/personal-care/c-msh1236?&icid2=cate:tsb:main:hmp:m1236:mulb:best:05:R25:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27924925382686.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/air-conditioner/c-msh1230?&icid2=cate:tsb:main:hmp:m1230:mulb:best:06:R25:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27903094784030.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/kitchen-appliances/c-msh1229/?q=:relevance:category:MSH1229&icid2=cate:tsb:main:hmp:m1229:mulb:best:07:R25:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27903094652958.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-large-appliances-washing-machine/c-msh1214103?&icid2=cate:tsb:main:hmp:m1214103:mulb:best:08:R25:clp:bx:001"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27773874176030.jpg",
              btnText: "",
              componentId: "comp_00240911",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL: ""
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "comp_0000JQCN",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976615723038.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing-western-wear/c-msh1016/page-1?q=%3Arelevance%3Acategory%3AMSH1016%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3AdiscountAll%3ANon%2B-%2BDiscounted%2BItems%3Abrand%3AMBH11A00348%3Abrand%3AMBH11A00015%3Abrand%3AMBH11B10240%3Abrand%3AMBH11A00001%3Abrand%3AMBH11A00021%3Abrand%3AMBH11A00050%3Abrand%3AMBH11B11389%3Abrand%3AMBH11B10692%3Abrand%3AMBH11B10350%3Abrand%3AMBH11A00174%3Apattern-classification%3AStripes%3Abrand%3AMBH11B11390%3Apattern-classification%3ASelf%3Apattern-classification%3AQuilted%3Abrand%3AMBH11A00254%3Abrand%3AMBH11W00040&icid2=catl:tsb:main:hmp:m1016:mulb:best:01:R19:clp:Bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27924925055006.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing-ethnic-wear-suits/c-msh1012101?q=%3Arelevance%3Acategory%3AMSH1012101%3Acategory%3AMSH1012101%3Acategory%3AMSH1012101%3Acategory%3AMSH1012101%3Acategory%3AMSH1012101%3Acategory%3AMSH1012101%3Acategory%3AMSH1012101%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00006%3Abrand%3AMBH11A00438%3Abrand%3AMBH11A00041%3Abrand%3AMBH11B11108%3Abrand%3AMBH11B10519%3Abrand%3AMBH11A00313%3Abrand%3AMBH11B11555%3Abrand%3AMBH11A00367%3Abrand%3AMBH11A00371%3Abrand%3AMBH11A00550%3Abrand%3AMBH11B10372%3Abrand%3AMBH11A00001%3Abrand%3AMBH11B10176%3Abrand%3AMBH11A00348%3Abrand%3AMBH11A00009%3Abrand%3AMBH11B10962%3Abrand%3AMBH11A00002%3Abrand%3AMBH11A00005%3Abrand%3AMBH11B10726&icid2=catl:tsb:main:hmp:m1012101:mulb:best:02:R19:clp:Bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976615788574.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/accessories-women-bags-sling-bags/c-msh1600000?q=%3Arelevance%3Acategory%3AMSH1600000%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3AOccasion%3Acasual%3AOccasion%3Aparty%3AOccasion%3Aevening&icid2=catl:tsb:main:hmp:m1600000:mulb:best:07:R19:clp:Bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976615854110.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/footwear-women-casual/c-msh1310113?q=%3Arelevance%3Acategory%3AMSH1310113%3Aprice%3A%25E2%2582%25B9699-%25E2%2582%25B99%252C999%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Aheeltype-classification%3ABlock%3AdiscountFlag%3A50%2525%2B-%2B70%2525%3AdiscountFlag%3A70%2525%2Band%2Bmore%3AdiscountFlag%3A30%2525%2B-%2B50%2525&icid2=catl:tsb:main:hmp:m1310113:mulb:best:04:R19:clp:Bx:010"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "comp_0000IHWO",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27940315037726.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/footwear-men/c-msh1311?q=%3Arelevance%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH13F00009%3Abrand%3AMBH13F00013%3Abrand%3AMBH13B11043%3Abrand%3AMBH13B10665%3Abrand%3AMBH13A00168%3Abrand%3AMBH13A00099%3Abrand%3AMBH13F00039%3Abrand%3AMBH13F00073%3Abrand%3AMBH13F00008%3Abrand%3AMBH13A00092%3Abrand%3AMBH13B10597%3Afastening-classification%3ALace%3AdiscountAll%3ADiscounted%2BItems&icid2=catl:tsb:main:hmp:m1311:mulb:best:05:R19:clp:Bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27902962040862.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/mens-clothing-casual-wear-shirts/c-msh1116101?q=%3Arelevance%3Acategory%3AMSH1116101%3Acategory%3AMSH1116101%3Acategory%3AMSH1116101%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3AdiscountFlag%3A50%2525%2B-%2B70%2525%3Apattern-classification%3AStripes%3Apattern-classification%3AChecks&icid2=catl:tsb:main:hmp:m1116101:mulb:best:06:R19:clp:Bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27960717213726.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/watches/c-msh15/page-1?q=%3Arelevance%3Acategory%3AMSH15%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Afunctionality%3ASmart%2Bwatch&icid2=catl:tsb:main:hmp:m15:mulb:best:07:R19:clp:Bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27902961909790.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/sunglasses/c-msh2416100/?q=:relevance:category:MSH2416100:inStockFlag:true:isLuxuryProduct:false&icid2=catl:tsb:main:hmp:m2416100:mulb:best:08:R19:clp:Bx:010"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27918595948574.jpg",
              btnText: "",
              componentId: "cmsitem_00272075",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL: ""
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "cmsitem_00278011",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934294769694.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/custom/top-trending-acs?&icid2=clb:tsb:main:hmp:m1230:mulb:best:10:R20:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934294900766.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/custom/trending-smartphones?&icid2=clb:tsb:main:hmp:m1210:mulb:best:11:R20:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934295031838.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/custom/top-trending-tvs?&icid2=clb:tsb:main:hmp:m1216:mulb:best:12:R20:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27902958993438.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/custom/top-trending-headphones&icid2=clb:tsb:main:hmp:m1234:mulb:best:07:R20:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27902959124510.jpg",
                  logoImageURL: "",
                  webURL:
                    "http://tatacliq.com/custom/top-trending-wearables?&icid2=clb:tsb:main:hmp:m1219:mulb:best:08:R20:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934294507550.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/custom/trending-washing-machines?&icid2=clb:tsb:main:hmp:m1214:mulb:best:09:R20:clp:bx:010"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "cmsitem_00229350",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27902958927902.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/custom/mens-footwear-bestsellers?&icid2=clb:tsb:main:hmp:m13:mulb:best:01:R20:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934295228446.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/custom/home-bestsellers?&icid2=clb:tsb:main:hmp:m22:mulb:best:04:R20:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934295097374.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/custom/kids-apparel-bestsellers?&icid2=clb:tsb:main:hmp:m20:mulb:best:03:R20:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934295392286.jpg",
                  logoImageURL: "",
                  webURL:
                    "http://tatacliq.com/custom/mens-apparel-bestsellers?&icid2=clb:tsb:main:hmp:m11:mulb:best:05:R20:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934295457822.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/custom/womens-apparel-bestsellers?&icid2=clb:tsb:main:hmp:m10:mulb:best:06:R20:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27902959058974.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/custom/jewellery-bestsellers?&icid2=clb:tsb:main:hmp:m20:mulb:best:02:R20:clp:bx:010"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27773874307102.jpg",
              btnText: "",
              componentId: "comp_00240894",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL: ""
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "cmsitem_00265082",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934269669406.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/westside/c-mbh11a00004?&icid2=west:tsb:main:hmp:m10:a00004:best:01:R22:blp:Bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934269603870.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing-ethnic-wear-kurtis-kurtas/c-msh1012100/page-1?q=%3Arelevance%3Acategory%3AMSH1012100%3Acategory%3AMSH1012100%3Acategory%3AMSH1012100%3Acategory%3AMSH1012100%3Acategory%3AMSH1012100%3Acategory%3AMSH1012100%3Acategory%3AMSH1012100%3Abrand%3AMBH11A00191%3Abrand%3AMBH11A00189%3Abrand%3AMBH11B10140%3Acategory%3AMSH1012100%3Abrand%3AMBH11A00191%3Abrand%3AMBH11A00189%3Abrand%3AMBH11B10140%3AisLuxuryProduct%3Afalse%3AinStockFlag%3Atrue&icid2=west:tsb:main:hmp:m1012100:mulb:best:02:R22:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934269734942.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing-western-wear-tops-tunics/c-msh1016102/page-1?q=%3Arelevance%3Acategory%3AMSH1016102%3Acategory%3AMSH1016102%3Acategory%3AMSH1016102%3Acategory%3AMSH1016102%3Acategory%3AMSH1016102%3Acategory%3AMSH1016102%3Acategory%3AMSH1016102%3Acategory%3AMSH1016102%3Abrand%3AMBH11A00177%3Abrand%3AMBH11A00254%3Abrand%3AMBH11A00179%3Abrand%3AMBH11A00187%3Abrand%3AMBH11A00472%3Abrand%3AMBH11A00174%3Acategory%3AMSH1016102%3Abrand%3AMBH11A00177%3Abrand%3AMBH11A00254%3Abrand%3AMBH11A00179%3Abrand%3AMBH11A00187%3Abrand%3AMBH11A00472%3Abrand%3AMBH11A00174%3Abrand%3AMBH11A00181%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse&icid2=west:tsb:main:hmp:m1016102:mulb:best:04:R22:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934269800478.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/mens-clothing/c-msh11/page-1?q=%3Arelevance%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00248%3Abrand%3AMBH11B10748%3Abrand%3AMBH11B10750%3Abrand%3AMBH11A00192%3Abrand%3AMBH11A00178%3Acategory%3AMSH11%3Abrand%3AMBH11A00248%3Abrand%3AMBH11B10748%3Abrand%3AMBH11B10750%3Abrand%3AMBH11A00192%3Abrand%3AMBH11A00178%3Abrand%3AMBH11A00472%3Acategory%3AMSH11%3Abrand%3AMBH11A00248%3Abrand%3AMBH11B10748%3Abrand%3AMBH11B10750%3Abrand%3AMBH11A00192%3Abrand%3AMBH11A00178%3Acategory%3AMSH11%3Abrand%3AMBH11A00248%3Abrand%3AMBH11B10748%3Abrand%3AMBH11B10750%3Abrand%3AMBH11A00192%3Abrand%3AMBH11A00178%3Abrand%3AMBH11A00472%3Abrand%3AMBH11A00175%3Abrand%3AMBH11A00273&icid2=west:tsb:main:hmp:m11:mulb:best:03:R22:blp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934269866014.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/westside-home/c-mbh21b10083/page-1?q=:relevance:brand:MBH21B10083:brand:MBH21B10083:brand:MBH21B10083:brand:MBH21B10083:brand:MBH21B10083:inStockFlag:true:isLuxuryProduct:false&icid2=west:tsb:main:hmp:m22:b10083:best:05:R22:clp:bx:001"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27860596850718.jpg",
              btnText: "",
              componentId: "cmsitem_00267006",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL: ""
            }
          },
          {
            componentName: "offersComponent",
            offersComponent: {
              componentId: "cmsitem_00072010",
              items: [
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27860596457502.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/smartphones/c-msh1210100/?q=:relevance:inStockFlag:true:isLuxuryProduct:false:category:MSH1210100:brand:MBH12E00016&icid2=sam:tsb:main:hmp:m1210100:e00016:best:01:R14:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27860596785182.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/smartphones/c-msh1210100/?q=samsung%20a51:relevance:category:MSH1210100&icid2=sam:tsb:main:hmp:m1210100:e00016:best:06:R14:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27860596719646.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/smartphones/c-msh1210100/?q=samsung+a31%3Arelevance%3Acategory%3AMSH1210100%3Acategory%3AMSH1210100%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Aprice%3A%25E2%2582%25B920%252C001-%25E2%2582%25B930%252C000&icid2=sam:tsb:main:hmp:m1210100:e00016:best:05:R14:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27860596654110.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/smartphones/c-msh1210100/?q=a21s:relevance:category:MSH1210100&icid2=sam:tsb:main:hmp:m1210100:e00016:best:04:R14:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27860596588574.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/smartphones/c-msh1210100/?q=samsung%20galaxy%20m11:relevance:category:MSH1210100&icid2=sam:tsb:main:hmp:m1210100:e00016:best:03:R14:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27860596523038.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/search/?q=samsung+galaxy+m01%3Arelevance%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3AvideoRecording-classification%3A-&icid2=sam:tsb:main:hmp:m1210100:e00016:best:02:R14:blp:bx:010"
                }
              ],
              title: "",
              type: "Offers Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27960717344798.jpg",
              btnText: "",
              componentId: "cmsitem_00251118",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL:
                "https://www.tatacliq.com/vans-brand-store?&icid2=vans:cbc:main:hmp:m13:f00083:best:01:R30:blp:bx:010"
            }
          },
          {
            componentName: "offersComponent",
            offersComponent: {
              componentId: "cmsitem_00173022",
              items: [
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27960717410334.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/footwear/c-msh13/?q=:relevance:inStockFlag:true:isLuxuryProduct:false:category:MSH13:brand:MBH13F00083&icid2=vans:ofc:main:hmp:m13:f00083:best:01:R30:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27960717475870.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/custom/vans-classics?&icid2=vans:ofc:main:hmp:m13:f00083:best:02:R30:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27960717541406.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/custom/vans-classic-slip-on&icid2=vans:ofc:main:hmp:m13:f00083:best:03:R30:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27960717606942.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/custom/vans-active-fashion?&icid2=vans:ofc:main:hmp:m13:f00083:best:05:R30:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27960717672478.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/search/?searchCategory=all&text=Vans%20Casual%20Sandals&icid2=vans:ofc:main:hmp:m13:f00083:best:04:R30:blp:bx:010"
                }
              ],
              title: "",
              type: "Offers Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27900445687838.jpg",
              btnText: "",
              componentId: "cmsitem_00270000",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL: ""
            }
          },
          {
            componentName: "splitBannerComponent",
            splitBannerComponent: {
              componentId: "cmsitem_00270003",
              items: [
                {
                  brandLogo: "",
                  btnText: "",
                  description: "",
                  dimension: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27900445884446.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-tv-4k-ultra-hd-tv/c-msh1216107?&icid2=ent:sbc:main:hmp:m1216107:mulb:best:01:R34:clp:bx:010"
                },
                {
                  brandLogo: "",
                  btnText: "",
                  description: "",
                  dimension: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27920267345950.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/speakers/c-msh1235?&icid2=ent:sbc:main:hmp:m1235:mulb:best:02:R34:clp:bx:010"
                }
              ],
              title: "",
              type: "Split Banner Component"
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "cmsitem_00270009",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27900446507038.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/head-phones/c-msh1234?q=%3Arelevance%3Acategory%3AMSH1234%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Atype-classification%3ATrue%2BWireless&icid2=ent:tsb:main:hmp:m1234:mulb:best:04:R34:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27900446441502.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-home-theater/c-msh1233?&icid2=ent:tsb:main:hmp:m1233:mulb:best:03:R34:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27900446638110.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-speakers-sound-bar/c-msh1235104?&icid2=ent:tsb:main:hmp:m1235104:mulb:best:06:R34:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27900446572574.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics/c-msh12/page-1?q=:relevance:category:MSH12:inStockFlag:true:isLuxuryProduct:false:brand:MBH12E00878:brand:MBH12E01517:brand:MBH12B11207:category:MSH12:brand:MBH12E00878:brand:MBH12E01517:brand:MBH12B11207:category:MSH12:brand:MBH12E00878:brand:MBH12E01517:brand:MBH12B11207:category:MSH12:brand:MBH12E00878:brand:MBH12E01517:category:MSH12:brand:MBH12E00878:brand:MBH12E01517:brand:MBH12B11207:category:MSH12:brand:MBH12E00878:brand:MBH12E01517:brand:MBH12B11207:category:MSH12:brand:MBH12E00878:brand:MBH12E01517:brand:MBH12B11207:category:MSH12:brand:MBH12E00878:brand:MBH12E01517:brand:MBH12B11207&icid2=ent:tsb:main:hmp:m12:mulb:best:05:R34:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27900446703646.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/gaming/c-msh1221?&icid2=ent:tsb:main:hmp:m1221:mulb:best:07:R34:clp:bx:010"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27900447424542.jpg",
              btnText: "",
              componentId: "cmsitem_00270023",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL: ""
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27940302028830.jpg",
              btnText: "",
              componentId: "cmsitem_00270022",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL:
                "https://www.tatacliq.com/home-clp?&icid2=home:cbc:main:hmp:m22:mulb:best:01:R35:clp:bx:010"
            }
          },
          {
            componentName: "offersComponent",
            offersComponent: {
              componentId: "cmsitem_00270033",
              items: [
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27940290560030.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/home/c-msh22?q=%3Arelevance%3Acategory%3AMSH22%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH21B11874&icid2=home:ofc:main:hmp:m22:b11874:best:10:R35:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27900448440350.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/home/c-msh22?q=%3Arelevance%3Acategory%3AMSH22%3Acategory%3AMSH22%3Acategory%3AMSH22%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH21B11528&icid2=home:ofc:main:hmp:m22:b11528:best:08:R35:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27900448505886.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/home/c-msh22/page-1?q=%3Arelevance%3Acategory%3AMSH22%3Acategory%3AMSH22%3Acategory%3AMSH22%3Acategory%3AMSH22%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Acategory%3AMSH22%3Acategory%3AMSH22%3Abrand%3AMBH21H00002&icid2=home:ofc:main:hmp:m22:h00002:best:09:R35:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27940290625566.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/kitchen/c-msh2230?q=%3Arelevance%3Acategory%3AMSH2230%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH21B11208&icid2=home:ofc:main:hmp:m22:b11208:best:07:R35:clp:bx:010"
                }
              ],
              title: "",
              type: "Offers Component"
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "cmsitem_00270029",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27940290691102.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/dinnerware/c-msh2223?&icid2=home:tsb:main:hmp:m2223:mulb:best:05:R35:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27940290756638.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/trays/c-msh2226114?&icid2=home:tsb:main:hmp:m2226114:mulb:best:02:R35:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27940290822174.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/home-bed-linen-comforters/c-msh2213102?&icid2=home:tsb:main:hmp:m2213102:mulb:best:03:R35:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27940290887710.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/bath-linen/c-msh2212?&icid2=home:tsb:main:hmp:m2212:mulb:best:06:R35:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27940290953246.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/kitchen/c-msh2230?q=%3Arelevance%3Acategory%3AMSH2230%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH21B11208&icid2=home:tsb:main:hmp:m2230:mulb:best:04:R35:clp:bx:010"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27773874503710.jpg",
              btnText: "",
              componentId: "cmsitem_00240893",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL: ""
            }
          },
          {
            componentName: "offersComponent",
            offersComponent: {
              componentId: "comp_0000JQ7V",
              items: [
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976411447326.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/refrigerators/c-msh1214100/?q=%20%20%20:relevance:price:%E2%82%B930,000-%E2%82%B91,000,000:category:MSH1214100&icid2=kit:ofc:main:hmp:m1214100:mulb:best:01:R23:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976409677854.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-kitchen-appliances-mixer-grinder/c-msh1229112?&icid2=kit:ofc:main:hmp:m1229112:mulb:best:02:R23:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976411512862.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/water-purifier/c-msh1231103?&icid2=kit:ofc:main:hmp:m1231103:mulb:best:03:R23:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976411381790.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-kitchen-appliances-cooktop/c-msh1229103?&icid2=kit:ofc:main:hmp:m1229103:mulb:best:04:R23:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976409612318.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/kitchen-appliances-store?&icid2=kit:ofc:main:hmp:m1229:mulb:best:05:R23:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976411938846.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-small-appliances-vacuum-cleaner/c-msh1231101?&icid2=kit:ofc:main:hmp:m1231101:mulb:best:06:R23:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976411873310.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-small-appliances-air-purifier/c-msh1231100?q=%3Arelevance%3Acategory%3AMSH1231100%3Acategory%3AMSH1231100%3Acategory%3AMSH1231100%3Acategory%3AMSH1231100%3Acategory%3AMSH1231100%3Acategory%3AMSH1231100%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Acategory%3AMSH1231100%3Acategory%3AMSH1231100&icid2=kit:ofc:main:hmp:m1231100:mulb:best:07:R23:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976411578398.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-small-appliances-irons/c-msh1231106?&icid2=kit:ofc:main:hmp:m1231106:mulb:best:08:R23:clp:bx:010"
                }
              ],
              title: "",
              type: "Offers Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27773874634782.jpg",
              btnText: "",
              componentId: "comp_00240905",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL: ""
            }
          },
          {
            componentName: "offersComponent",
            offersComponent: {
              componentId: "comp_0000JQ7W",
              items: [
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934306697246.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/footwear-women/c-msh13?q=%3Arelevance%3Acategory%3AMSH1310%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH13B11608&icid2=lft:ofc:main:hmp:m13:b11608:best:05:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976616575006.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/jewellery/c-msh20/page-1?q=%3Arelevance%3Acategory%3AMSH20%3AinStockFlag%3Atrue%3AMetal-Jewellery-classification%3AGold%3AisLuxuryProduct%3Afalse%3AMetal-Jewellery-classification%3APlatinum%3Agendertrlg%3AWomen%3Agendertrlg%3AUnisex%3Agendertrlg%3AMen%3Agendertrlg%3AKids%3Agendertrlg%3AGirls%3Abrand%3AMBH19B10110%3ACollection-Jewellery-classification%3AMangalsutra%2BCollection%3ACollection-Jewellery-classification%3AMangalsutra%2BBracelets&icid2=lft:ofc:main:hmp:m19:b10110:best:05:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976616443934.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/sunglasses/c-msh2416/page-1?q=:relevance:inStockFlag:true:isLuxuryProduct:false:category:MSH2416:brand:MBH16W00072&icid2=lft:ofc:main:hmp:m2416:w00072:best:07:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976616640542.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/accessories/c-msh16?q=%3Arelevance%3Acategory%3AMSH16%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH16F00012&icid2=lft:ofc:main:hmp:m13:f00012:best:12:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976616509470.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/search/?q=612+league%3Arelevance%3AisLuxuryProduct%3Afalse%3AinStockFlag%3Atrue&icid2=lft:ofc:main:hmp:m11:b10162:best:08:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27923570851870.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing/c-msh10?q=%3Arelevance%3Acategory%3AMSH10%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00015&icid2=lft:ofc:main:hmp:m10:a00015:best:02:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27923570917406.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/mens-clothing/c-msh11?q=%3Arelevance%3Acategory%3AMSH11%3Acategory%3AMSH11%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00332%3AdiscountFlag%3A50%2525%2B-%2B70%2525&icid2=lft:ofc:main:hmp:m11:a00332:best:03:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27902962171934.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/footwear/c-msh13?q=%3Arelevance%3Acategory%3AMSH13%3Acategory%3AMSH13%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH13A00099%3AdiscountAll%3ADiscounted%2BItems&icid2=lft:ofc:main:hmp:m13:a00099:best:06:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27923570982942.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/accessories/c-msh16/page-1?q=%3Arelevance%3Acategory%3AMSH16%3Acategory%3AMSH16%3Acategory%3AMSH16%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH16W00101&icid2=lft:edit:main:hmp:m16:a00017:best:04:R24:blp:bx:010"
                }
              ],
              title: "",
              type: "Offers Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27773874700318.jpg",
              btnText: "",
              componentId: "comp_00240902",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL: ""
            }
          },
          {
            componentName: "offersComponent",
            offersComponent: {
              componentId: "comp_0000JMIB",
              items: [
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976616181790.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/large-appliances/c-msh1214?q=%3Arelevance%3Acategory%3AMSH1214%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00043&icid2=estrp:ofc:main:hmp:m1214:e00043:best:01:R28:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976616247326.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-head-phones-earphones/c-msh1234100?q=%3Arelevance%3Acategory%3AMSH1234100%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00147&icid2=estrp:ofc:main:hmp:m1234:e00147:best:02:R28:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976616312862.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/fitbit/c-mbh12e00009?&icid2=estrp:ofc:main:hmp:m12:e00009:best:07:R28:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976616378398.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-tv/c-msh1216/page-1?q=%3Arelevance%3Acategory%3AMSH1216%3Acategory%3AMSH1216%3AisLuxuryProduct%3Afalse%3AinStockFlag%3Atrue%3Abrand%3AMBH12E00007&icid2=estrp:ofc:main:hmp:m1216:e00007:best:06:R28:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976410890270.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/smartphones/c-msh1210100?q=%3Arelevance%3Acategory%3AMSH1210100%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00256&icid2=estrp:ofc:main:hmp:m12:e00256:best:04:R28:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976410955806.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/storage-devices/c-msh1228/page-1?q=%3Arelevance%3Acategory%3AMSH1228%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00035&icid2=estrp:ofc:main:hmp:m1228:e00035:best:08:R28:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976411021342.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/personal-care/c-msh1236?q=%3Arelevance%3Acategory%3AMSH1236%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00006&icid2=estrp:ofc:main:hmp:m1236:e00006:best:03:R28:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976411086878.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/kitchen-appliances/c-msh1229?q=%3Arelevance%3Acategory%3AMSH1229%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E01008&icid2=estrp:ofc:main:hmp:m12:e01008:best:05:R28:blp:bx:010"
                }
              ],
              title: "",
              type: "Offers Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27773874569246.jpg",
              btnText: "",
              componentId: "comp_00240915",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL: ""
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "cmsitem_00023107",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976418689054.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/smartphones/c-msh1210100?q=%3Arelevance%3Acategory%3AMSH1210100%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00181&icid2=bouq:tsb:main:hmp:m1210100:e00181:best:03:R8:blp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976418918430.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/footwear-men/c-msh1311?q=%3Arelevance%3Acategory%3AMSH1311%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH13F00086%3Abrand%3AMBH13F00255%3AdiscountFlag%3A30%2525%2B-%2B50%2525%3AdiscountFlag%3A50%2525%2B-%2B70%2525&icid2=mdo:ofc:main:hmp:m1311:f00255:min40off:02:R8:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27920285335582.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics/c-msh12?q=%3Arelevance%3Acategory%3AMSH12%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00055&icid2=bouq:tsb:main:hmp:m12:e00055:best:01:R31:blp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976418852894.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics/c-msh12?q=%3Arelevance%3Acategory%3AMSH12%3Acategory%3AMSH12%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00013%3Abrand%3AMBH12B10718&icid2=bouq:tsb:main:hmp:m12:b10718:best:04:R31:blp:bx:001"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "cmsitem_00023101",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976418983966.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/sunglasses/c-msh2416?q=:price-asc:inStockFlag:true:isLuxuryProduct:false:category:MSH2416:brand:MBH16B11153&icid2=mdo:ofc:main:hmp:m16:b11153:srt4999:08:R31:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27920284876830.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-speakers-bluetooth/c-msh1235100?q=%3Arelevance%3Acategory%3AMSH1235100%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00878&icid2=bouq:tsb:main:hmp:m1235100:e00878:srt3499:05:R31:blp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27934270062622.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing/c-msh10?q=%3Arelevance%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00179%3Abrand%3AMBH11A00269%3Abrand%3AMBH11A00189%3Abrand%3AMBH11A00191%3Abrand%3AMBH11B10140%3Abrand%3AMBH11A00174%3Abrand%3AMBH11A00254%3Abrand%3AMBH11A00472%3Abrand%3AMBH11A00187%3Abrand%3AMBH11A00177%3Abrand%3AMBH11A00245%3Abrand%3AMBH11A00181%3Abrand%3AMBH11B11602%3AdiscountAll%3ADiscounted%2BItems&icid2=mdo:ofc:main:hmp:m10:a00179:ut60off:06:R31:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27920284745758.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-wearable-devices/c-msh1219?q=%3Arelevance%3Acategory%3AMSH1219%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00042&icid2=bouq:tsb:main:hmp:m1219:E00042:ut30off:09:R31:blp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976419049502.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/jewellery/c-msh20/page-1?q=%3Arelevance%3Acategory%3AMSH20%3AinStockFlag%3Atrue%3AMetal-Jewellery-classification%3AGold%3AisLuxuryProduct%3Afalse%3AMetal-Jewellery-classification%3APlatinum%3Agendertrlg%3AWomen%3Agendertrlg%3AUnisex%3Agendertrlg%3AMen%3Agendertrlg%3AKids%3Agendertrlg%3AGirls%3Abrand%3AMBH19B10182&icid2=mdo:ofc:main:hmp:m19:b10182:ext5off:07:R31:clp:bx:001"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27773874765854.jpg",
              btnText: "",
              componentId: "comp_00240916",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL: ""
            }
          },
          {
            componentName: "splitBannerComponent",
            splitBannerComponent: {
              componentId: "cmsitem_00028013",
              items: [
                {
                  brandLogo: "",
                  btnText: "",
                  description: "",
                  dimension: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/26824777695262.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/trimmer-&-shaver/c-msh1236105?&icid2=ede:spb:main:hmp:m1236105:mulb:best:01:R5:clp:bx:001"
                },
                {
                  brandLogo: "",
                  btnText: "",
                  description: "",
                  dimension: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27034766213150.jpg",
                  title: "",
                  webURL:
                    "http://tatacliq.com/the-essentials-store?&icid2=ede:spb:main:hmp:m2228104:mulb:best:02:R5:clp:bx:001"
                }
              ],
              title: "",
              type: "Split Banner Component"
            }
          },
          {
            componentName: "offersComponent",
            offersComponent: {
              componentId: "cmsitem_00065004",
              items: [
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27007909691422.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-personal-care-health-care/c-msh1236106?q=:isProductNew:category:MSH1236106:category:MSH1236106:category:MSH1236106:category:MSH1236106:inStockFlag:true:isLuxuryProduct:false:type-classification:BP%2BMonitor:type-classification:Digital+Thermometer:type-classification:Infrared+Thermometer:type-classification:Thermometer&icid2=ede:ofc:main:hmp:m1236106:mulb:best:06:R5:clp:bx:001"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27007909756958.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/tata-q?&icid2=ede:ofc:main:hmp:m2228105:b11214:best:04:R5:clp:bx:001"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27007909822494.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/eyewear-eye-frames-frames/c-msh2412100?q=%3Arelevance%3Acategory%3AMSH2412100%3Acategory%3AMSH2412100%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3AmaterialType%3ACR-39%2Bwith%2BBlue%2BCut%2BCoating%3AmaterialType%3ACR-39%2Bwith%2BAnti-Reflective%2BCoating&icid2=ede:ofc:main:hmp:m2412100:mulb:best:07:R5:clp:bx:001"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27007909888030.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/gourmet-delights?&icid2=ede:ofc:main:hmp:m2228106:mulb:best:06:R5:clp:bx:001"
                }
              ],
              title: "",
              type: "Offers Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27773874831390.jpg",
              btnText: "",
              componentId: "comp_00240914",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL: ""
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27924924858398.jpg",
              btnText: "",
              componentId: "cmsitem_00075294",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL:
                "https://www.tatacliq.com/black-brown-store?&icid2=week:cbc:main:hmp:m13:mulb:best:04:R10:clp:bx:100"
            }
          },
          {
            componentName: "splitBannerComponent",
            splitBannerComponent: {
              componentId: "comp_0000JMA9",
              items: [
                {
                  brandLogo: "",
                  btnText: "",
                  description: "",
                  dimension: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27976418525214.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/7june-jewellery?&icid2=week:spb:main:hmp:m20:mulb:best:03:R10:clp:bx:100"
                },
                {
                  brandLogo: "",
                  btnText: "",
                  description: "",
                  dimension: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27920269115422.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/tshirts&icid2=week:spb:main:hmp:m1116100:mulb:best:05:R10:clp:bx:100"
                }
              ],
              title: "",
              type: "Split Banner Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/27976418361374.jpg",
              btnText: "",
              componentId: "cmsitem_00041101",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL:
                "https://www.tatacliq.com/photography-store?&icid2=week:cbc:main:hmp:m1220:mulb:best:01:R10:clp:bx:100"
            }
          },
          {
            componentName: "splitBannerComponent",
            splitBannerComponent: {
              componentId: "comp_0000JMA7",
              items: [
                {
                  brandLogo: "",
                  btnText: "",
                  description: "",
                  dimension: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27924924923934.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/personal-fitness-care?&icid2=week:spb:main:hmp:m12:mulb:best:05:R10:clp:bx:100"
                },
                {
                  brandLogo: "",
                  btnText: "",
                  description: "",
                  dimension: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/27920284680222.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/audio-store?&icid2=week:spb:main:hmp:m1234:mulb:best:06:R10:clp:bx:100"
                }
              ],
              title: "",
              type: "Split Banner Component"
            }
          },
          {
            componentName: "msdAutoDiscoverMoreComponent",
            singleBannerComponent: {
              componentId: "comp_0000JS7Q",
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
            componentName: "msdAutomatedBannerProductCarouselComponent",
            singleBannerComponent: {
              componentId: "comp_0000JS7P",
              items: [
                {
                  btnText: "View more",
                  description: "msdAutomatedBannerProductCarouselComponent",
                  hexCode: "10",
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
            componentName: "AutoWishlist",
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
              type: "AutoWishlist"
            }
          }
        ],
        message: "defaulthomepage",
        pageName: "sm:pwa:main:all:homepagenew:151119",
        pageType: "",
        seo: {
          alternateURL: "",
          canonicalURL: "",
          description:
            "Online Shopping Site in India - 10% Instant Cash back on HDFC credit and Debit Cards for Min order 3000* - Up to 60% Off On Mobiles, Electronics & Fashion at Tata CLiQ",
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

export function autoWishListSuccess(productList) {
  return {
    type: AUTO_WISHLIST_COMPONENT_SUCCESS,
    status: SUCCESS,
    productList
  };
}
export function autoWishListRequest() {
  return {
    type: AUTO_WISHLIST_COMPONENT_REQUEST,
    status: REQUESTING
  };
}
export function autoWishlistComponent(productId) {
  return async (dispatch, getState, { api }) => {
    try {
      dispatch(autoWishListRequest());
      let productCodes;
      productCodes = productId;

      let requests =
        productId &&
        productId.map(id =>
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
        dispatch(autoWishListSuccess(productList));
      }
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  };
}
