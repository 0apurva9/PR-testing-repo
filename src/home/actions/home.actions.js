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
                    "//assets.tatacliq.com/medias/sys_master/images/28287587778590.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/smartphones/c-msh1210100/?q=smartphones:relevance:category:MSH1210100&icid2=hero:hbr:main:hmp:m1210100:mulb:best:01:R4:blp:bx:010"
                },
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287587844126.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/mens-clothing/c-msh11/page-1?q=%3Arelevance%3Acategory%3AMSH11%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00100%3Abrand%3AMBH11A00168%3Abrand%3AMBH11A00332%3Abrand%3AMBH11F00009%3Abrand%3AMBH11W00213%3Abrand%3AMBH11B11389%3Abrand%3AMBH11A00077%3Abrand%3AMBH11A00099%3Abrand%3AMBH11A00374%3Abrand%3AMBH11A00078%3Abrand%3AMBH11F00070%3Abrand%3AMBH11A00024%3Abrand%3AMBH11A00208%3Abrand%3AMBH11A00327%3Abrand%3AMBH11A00074%3Abrand%3AMBH11A00023%3AdiscountFlag%3A50%2525%2B-%2B70%2525%3AdiscountFlag%3A70%2525%2Band%2Bmore&icid2=hero:hbr:main:hmp:m11:mulb:best:02:R4:clp:bx:010"
                },
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287587909662.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-laptop/c-msh1223?&icid2=hero:hbr:main:hmp:m1223:mulb:best:03:R4:clp:bx:010"
                },
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287587975198.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/kids/c-msh21?q=:relevance:inStockFlag:true:isLuxuryProduct:false:Occasion:occasionkidswearethnic:brand:MBH11B10162:brand:MBH11B10587:brand:MBH11B10458:brand:MBH11B10522:brand:MBH11B10591:brand:MBH11A00611:brand:MBH11A00608:brand:MBH11B10543:brand:MBH11A00655:brand:MBH11B10161:brand:MBH11B11922:brand:MBH11B10521:brand:MBH11B10970:brand:MBH11B10309:brand:MBH11B10355:brand:MBH11B10727:brand:MBH11B10162:brand:MBH11B10587:brand:MBH11B10458:brand:MBH11B10522:brand:MBH11B10591:brand:MBH11A00611:brand:MBH11A00608:brand:MBH11B10543:brand:MBH11A00655:brand:MBH11B10161:brand:MBH11B11922:brand:MBH11B10521:brand:MBH11B10970:brand:MBH11B10309:brand:MBH11B10355:brand:MBH11B10727:brand:MBH11A00009&icid2=hero:hbr:main:hmp:m21:mulb:best:04:R4:clp:bx:010"
                },
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287588040734.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-wearable-devices/c-msh1219?&icid2=hero:hbr:main:hmp:m1219:mulb:best:05:R4:clp:bx:010"
                }
              ],
              type: "Hero Banner Component"
            }
          },
          {
            componentName: "AutoWishlist",
            singleBannerComponent: {
              componentId: "cmsitem_00283034",
              items: [
                {
                  btnText: "10",
                  description: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28164412997662.jpg",
                  title: "",
                  webURL: ""
                }
              ],
              title: "",
              type: "AutoWishlist"
            }
          },
          {
            componentName: "heroBannerComponent",
            heroBannerComponent: {
              componentId: "cmsitem_00382090",
              dimension: "",
              interval: "",
              items: [
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28281507512350.jpg",
                  subTitle: "",
                  title: "",
                  webURL: "https://www.tatacliq.com/ten-ten-sale-hdfc-tnc"
                }
              ],
              type: "Hero Banner Component"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/28287581749278.jpg",
              btnText: "",
              componentId: "cmsitem_00391016",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL:
                "https://www.tatacliq.com/ten-ten-offers?&icid2=quic:cbc:main:hmp:m00:mulb:best:01:R1:clp:Bx:010"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/28290552299550.jpg",
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
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/28287571197982.jpg",
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
                "https://www.tatacliq.com/nike-brand-store?&icid2=fres:cbc:main:hmp:m13:a00092:01:R13:blp:Bx:001"
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "comp_0000IHW9",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287578701854.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/smartphones/c-msh1210100/?q=oneplus%208t:relevance:inStockFlag:true:isLuxuryProduct:false:processor-classification:Qualcomm+Snapdragon+865:category:MSH1210100&icid2=fres:tsb:main:hmp:m1210100:e00279:best:15:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287568511006.jpg",
                  logoImageURL: "",
                  webURL:
                    "http://tatacliq.com/custom/newecho-fourth-gen?&icid2=fres:tsb:main:hmp:m12:e01517:best:01:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287568642078.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/ucb-fragrance-brand-store?&icid2=fres:tsb:main:hmp:m25:a00238:best:11:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287568576542.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/custom/apple-watch-6-and-se-series?&icid2=fres:tsb:main:hmp:m12:e00008:best:02:R14:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287568707614.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing/c-msh10?q=%3Arelevance%3Acategory%3AMSH10%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11B12042&icid2=new:tsb:clp:wom:m10:b12042:best:12:R5:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287568773150.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/marshall-brand-store?&icid2=fres:tsb:main:hmp:m12:e00511:best:06:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287568838686.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/forever-21-brand-store?&icid2=fres:tsb:main:hmp:m10:a00021:best:03:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287568969758.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/schneider-electric-brand-store?&icid2=fres:tsb:main:hmp:m1247:b11672:best:08:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287569035294.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/vans-brand-store?&icid2=fres:tsb:main:hmp:m13:f00083:best:05:R13:blp:Bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287569100830.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/dune-london-brand-store?&icid2=new:tsb:clp:wom:m11:b11672:best:09:R5:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287569166366.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/stryder-brand-store?&icid2=fres:tsb:main:hmp:m1318100:b11747:best:07:R11:blp:Bx:001"
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
                "//assets.tatacliq.com/medias/sys_master/images/28287581683742.jpg",
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
              componentId: "comp_0000JQCQ",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287588466718.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/smartphones/c-msh1210100?&icid2=cate:tsb:main:hmp:m1210100:mulb:best:08:R25:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287588532254.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-laptop/c-msh1223?&icid2=cate:tsb:main:hmp:m1223:mulb:best:01:R25:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287588728862.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-speakers-bluetooth/c-msh1235100?&icid2=cate:tsb:main:hmp:m1235100:mulb:best:07:R25:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287588663326.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-camera/c-msh1220?q=:relevance:category:MSH1220&icid2=cate:tsb:main:hmp:m1220:mulb:best:04:R25:clp:bx:001"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "comp_0000IHY4",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287570509854.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-large-appliances-washing-machine/c-msh1214103?&icid2=cate:tsb:main:hmp:m1214103:mulb:best:03:R25:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287570575390.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-large-appliances-refrigerators/c-msh1214100?q=:relevance:category:MSH1214100&icid2=cate:tsb:main:hmp:m1214100:mulb:best:02:R25:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287570640926.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-tv/c-msh1216/page-1?q=%3Arelevance%3Acategory%3AMSH1216%3Acategory%3AMSH1216%3AisLuxuryProduct%3Afalse%3AinStockFlag%3Atrue&icid2=cate:tsb:main:hmp:m1216:mulb:best:06:R25:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287570706462.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/kitchen-appliances/c-msh1229?&icid2=cate:tsb:main:hmp:m1229:mulb:best:05:R25:clp:bx:001"
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
                "//assets.tatacliq.com/medias/sys_master/images/28290548170782.jpg",
              btnText: "",
              componentId: "cmsitem_00296093",
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
                    "//assets.tatacliq.com/medias/sys_master/images/28287588106270.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing-western-wear/c-msh1016/page-1?q=%3Arelevance%3Acategory%3AMSH1016%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Apattern-classification%3AAnimal%2BPrint%3Apattern-classification%3AFloral%3Apattern-classification%3APaisley%3Apattern-classification%3APrint%3Abrand%3AMBH11A00015%3Abrand%3AMBH11B10071%3Abrand%3AMBH11A00021%3Abrand%3AMBH11B10350%3Abrand%3AMBH11A00024%3Abrand%3AMBH11B10305%3Abrand%3AMBH11A00050%3Abrand%3AMBH11B10366&icid2=catl:tsb:main:hmp:m1016:mulb:best:01:R19:clp:Bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287588171806.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing-ethnic-wear-kurtis-kurtas/c-msh1012100?q=%3Arelevance%3Acategory%3AMSH1012100%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00006%3Abrand%3AMBH11A00438%3Abrand%3AMBH11A00041%3Abrand%3AMBH11B11942%3Abrand%3AMBH11B10519%3Abrand%3AMBH11B11108%3Abrand%3AMBH11A00313%3Abrand%3AMBH11B10876%3Abrand%3AMBH11B10309%3Abrand%3AMBH11A00371%3Abrand%3AMBH11A00550%3Abrand%3AMBH11B10372%3Abrand%3AMBH11B10176%3Abrand%3AMBH11A00001%3Abrand%3AMBH11A00348%3Abrand%3AMBH11A00002%3Abrand%3AMBH11A00005%3Abrand%3AMBH11A00009%3Abrand%3AMBH11B12042&icid2=catl:tsb:main:hmp:m1012100:mulb:best:02:R19:clp:Bx:01"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287588335646.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/search/?q=%3Arelevance%3Acategory%3AMSHhttps://www.tatacliq.com/search/?q=%3Arelevance%3Acategory%3AMSH2012104%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH19J00001%3Abrand%3AMBH19B10364%3Abrand%3AMBH19B10110%3Abrand%3AMBH19B10182%3Abrand%3AMBH19B11151%3Abrand%3AMBH19B10147%3Abrand%3AMBH19B10320%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH19J00001%3Abrand%3AMBH19B10364%3Abrand%3AMBH19B10110%3Abrand%3AMBH19B10182%3Abrand%3AMBH19B11151%3Abrand%3AMBH19B10147%3Abrand%3AMBH19B10320&icid2=catl:tsb:main:hmp:m2012:mulb:best:03:R19:clp:Bx:01"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287588401182.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/casual/c-msh1310113/?q=:relevance:category:MSH1310113:inStockFlag:true:isLuxuryProduct:false:heeltype-classification:Flat:discountFlag:50%25%2B-+70%25:discountFlag:70%25+and+more&icid2=catl:tsb:main:hmp:m1310113:mulb:best:04:R19:clp:Bx:010"
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
                    "//assets.tatacliq.com/medias/sys_master/images/28287569985566.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/footwear-men/c-msh1311?q=%3Arelevance%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3Acategory%3AMSH1311%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH13F00009%3Abrand%3AMBH13F00013%3Abrand%3AMBH13B11043%3Abrand%3AMBH13B10665%3Abrand%3AMBH13A00168%3Abrand%3AMBH13A00099%3Abrand%3AMBH13F00039%3Abrand%3AMBH13F00073%3Abrand%3AMBH13F00008%3Abrand%3AMBH13A00092%3Abrand%3AMBH13B10597%3Afastening-classification%3ALace%3AdiscountAll%3ADiscounted%2BItems&icid2=catl:tsb:main:hmp:m1311:mulb:best:05:R19:clp:Bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287570051102.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/mens-clothing-casual-wear-t-shirts-polos/c-msh1116100/page-1?q=%3Arelevance%3Acategory%3AMSH1116100%3Acategory%3AMSH1116100%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3AdiscountFlag%3A50%2525%2B-%2B70%2525%3AdiscountFlag%3A70%2525%2Band%2Bmore&icid2=catl:tsb:main:hmp:m1116100:mulb:best:06:R19:clp:Bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287570116638.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/watches/c-msh15/page-1?q=%3Arelevance%3Acategory%3AMSH15%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Afunctionality%3ASmart%2Bwatch&icid2=catl:tsb:main:hmp:m15:mulb:best:07:R19:clp:Bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287570182174.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/sunglasses/c-msh2416100/?q=%3Arelevance%3Acategory%3AMSH2416100%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3AdiscountAll%3ADiscounted%2BItems%3Aprice%3A%E2%82%B9600-%E2%82%B960%2C000&icid2=catl:tsb:main:hmp:m2416100:mulb:best:08:R19:clp:Bx:010"
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
                "//assets.tatacliq.com/medias/sys_master/images/28290552234014.jpg",
              btnText: "",
              componentId: "cmsitem_00382104",
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
                "//assets.tatacliq.com/medias/sys_master/images/28290552365086.jpg",
              btnText: "",
              componentId: "cmsitem_00382110",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL:
                "https://www.tatacliq.com/beauty-fragrance?&icid2=scnt:cbc:main:hmp:m25:mulb:best:01:R36:clp:Bx:001"
            }
          },
          {
            componentName: "offersComponent",
            offersComponent: {
              componentId: "comp_00382111",
              items: [
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290554396702.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/beauty-&-grooming/c-msh25?q=%3Arelevance%3Acategory%3AMSH25%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Agenderbeauty-classification%3AMen&icid2=scnt:ofc:main:hmp:m25:mulb:best:02:R36:clp:Bx:001"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290554462238.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/beauty-&-grooming/c-msh25?q=%3Arelevance%3Acategory%3AMSH25%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Agenderbeauty-classification%3AWomen&icid2=scnt:ofc:main:hmp:m25:mulb:best:03:R36:clp:Bx:001"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290554527774.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/beauty-&-grooming/c-msh25?q=%3Arelevance%3Acategory%3AMSH25%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Agenderbeauty-classification%3AUnisex&icid2=scnt:ofc:main:hmp:m25:mulb:best:04:R36:clp:Bx:001"
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
                "//assets.tatacliq.com/medias/sys_master/images/28220578758686.jpg",
              btnText: "",
              componentId: "cmsitem_00362103",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL:
                "https://www.tatacliq.com/festive-treats?&icid2=fest:cbc:main:hmp:m00:mulb:best:01:R17:tnc:Bx:010"
            }
          },
          {
            componentName: "multiPurposeBanner",
            multiPurposeBanner: {
              backgroundImageURL:
                "//assets.tatacliq.com/medias/sys_master/images/28290548563998.jpg",
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
                    "//assets.tatacliq.com/medias/sys_master/images/28260035919902.jpg",
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
                    "//assets.tatacliq.com/medias/sys_master/images/28260035985438.jpg",
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
                    "//assets.tatacliq.com/medias/sys_master/images/28260036050974.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/head-phones/c-msh1234?q=%3Arelevance%3Acategory%3AMSH1234%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Atype-classification%3ATrue%2BWireless&icid2=ent:tsb:main:hmp:m1234:mulb:best:04:R34:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260036116510.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-head-phones/c-msh1234?q=%3Arelevance%3Acategory%3AMSH1234%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Atype-classification%3ANeckband&icid2=ent:tsb:main:hmp:m1234:mulb:best:03:R34:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260036182046.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-home-theater/c-msh1233?&icid2=ent:tsb:main:hmp:m1233:mulb:best:07:R34:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260036247582.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-speakers-sound-bar/c-msh1235104?&icid2=catd:nav:regu:anav:m1235104:mulb:best:04:R6&icid2=ent:tsb:main:hmp:m1235104:mulb:best:05:R34:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260036313118.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics/c-msh12/page-1?q=:relevance:category:MSH12:inStockFlag:true:isLuxuryProduct:false:brand:MBH12E00878:brand:MBH12E01517:brand:MBH12B11207:category:MSH12:brand:MBH12E00878:brand:MBH12E01517:brand:MBH12B11207:category:MSH12:brand:MBH12E00878:brand:MBH12E01517:brand:MBH12B11207:category:MSH12:brand:MBH12E00878:brand:MBH12E01517:category:MSH12:brand:MBH12E00878:brand:MBH12E01517:brand:MBH12B11207:category:MSH12:brand:MBH12E00878:brand:MBH12E01517:brand:MBH12B11207:category:MSH12:brand:MBH12E00878:brand:MBH12E01517:brand:MBH12B11207:category:MSH12:brand:MBH12E00878:brand:MBH12E01517:brand:MBH12B11207&icid2=ent:tsb:main:hmp:m12:mulb:best:06:R34:clp:bx:010"
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
                "//assets.tatacliq.com/medias/sys_master/images/28290548432926.jpg",
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
                    "//assets.tatacliq.com/medias/sys_master/images/28290546139166.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-large-appliances-refrigerators/c-msh1214100?q=:relevance:category:MSH1214100&icid2=kit:ofc:main:hmp:m1214100:mulb:srt6990:01:R23:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290552168478.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-large-appliances-washing-machine/c-msh1214103?&icid2=kit:ofc:main:hmp:m1214103:mulb:srt999:05:R23:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290546270238.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-small-appliances-vacuum-cleaner/c-msh1231101?&icid2=kit:ofc:main:hmp:m1231101:mulb:best:08:R23:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290546401310.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-kitchen-appliances-kettle/c-msh1229109?&icid2=kit:ofc:main:hmp:m1229109:mulb:best:06:R23:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290546532382.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-small-appliances-air-purifier/c-msh1231100?q=%3Arelevance%3Acategory%3AMSH1231100%3Acategory%3AMSH1231100%3Acategory%3AMSH1231100%3Acategory%3AMSH1231100%3Acategory%3AMSH1231100%3Acategory%3AMSH1231100%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Acategory%3AMSH1231100%3Acategory%3AMSH1231100&icid2=kit:ofc:main:hmp:m1231100:mulb:best:01:R23:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290546597918.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-kitchen-appliances-microwave-oven/c-msh1229100?&icid2=kit:ofc:main:hmp:m1229100:mulb:best:07:R23:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290546728990.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-small-appliances-irons/c-msh1231106?&icid2=kit:ofc:main:hmp:m1231106:mulb:best:03:R23:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290546860062.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/water-heaters/c-msh1231115?&icid2=kit:ofc:main:hmp:m1231115:mulb:best:02:R23:clp:bx:010"
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
                "//assets.tatacliq.com/medias/sys_master/images/28282361020446.jpg",
              btnText: "",
              componentId: "cmsitem_00390065",
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
                "//assets.tatacliq.com/medias/sys_master/images/28287571263518.jpg",
              btnText: "",
              componentId: "cmsitem_00386972",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL:
                "https://www.tatacliq.com/nike-brand-store?&icid2=nike:cbc:main:hmp:m13:a00092:best:01:R29:blp:bx:010"
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "cmsitem_00386980",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287571492894.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/search/?searchCategory=all&text=nike%20running%20shoes&icid2=nike:tsb:main:hmp:m13:a00092:best:02:R29:blp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287571558430.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/search/?searchCategory=all&text=nike%20sneakers&icid2=nike:tsb:main:hmp:m13:a00092:best:03:R29:blp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287571623966.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/custom/nike-tops-t-shirts?&icid2=nike:tsb:main:hmp:m01:a00092:best:04:R29:blp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287571689502.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/search/?searchCategory=all&text=nike%20pants&icid2=nike:tsb:main:hmp:m01:a00092:best:05:R29:blp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28287571755038.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/search/?searchCategory=all&text=nike%20pants&icid2=nike:tsb:main:hmp:m01:a00092:best:05:R29:blp:bx:010"
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
                "//assets.tatacliq.com/medias/sys_master/images/28287571820574.jpg",
              btnText: "",
              componentId: "cmsitem_00251028",
              description: "",
              dimension: "",
              endHexCode: "",
              iconImageURL: "",
              startHexCode: "",
              subType: "",
              title: "",
              type: "Multipurpose Banner Component",
              webURL:
                "https://www.tatacliq.com/apple-days?&icid2=apl:hbr:main:hmp:m1210:e00008:best:01:R35:blp:bx:010"
            }
          },
          {
            componentName: "offersComponent",
            offersComponent: {
              componentId: "cmsitem_00308000",
              items: [
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28111916531742.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics/c-msh12/page-1?q=%3Arelevance%3Acategory%3AMSH12%3AisLuxuryProduct%3Afalse%3AinStockFlag%3Atrue%3Abrand%3AMBH12E00008&icid2=apl:ofc:main:hmp:m12:e00008:best:01:R35:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28065335803934.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/mobile-phones/c-msh1210?q=%3Arelevance%3Acategory%3AMSH1210%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00008&icid2=apl:ofc:main:hmp:m1210:e00008:best:02:R35:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28097924956190.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/fitness-tracker/c-msh1219105/?q=:relevance:inStockFlag:true:isLuxuryProduct:false:category:MSH1219105:brand:MBH12E00008&icid2=apl:ofc:main:hmp:m1219105:e00008:best:03:R35:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28065334591518.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/ipad/c-msh1211101/?q=:relevance:inStockFlag:true:isLuxuryProduct:false:category:MSH1211101:brand:MBH12E00008&icid2=apl:ofc:main:hmp:m1211101:e00008:best:04:R35:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28065334657054.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/head-phones/c-msh1234/?q=:relevance:inStockFlag:true:isLuxuryProduct:false:category:MSH1234:brand:MBH12E00008&icid2=apl:ofc:main:hmp:m1234:e00008:best:05:R35:blp:bx:010"
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
                "//assets.tatacliq.com/medias/sys_master/images/28290548236318.jpg",
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
                    "//assets.tatacliq.com/medias/sys_master/images/28264018378782.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/westside/c-mbh11a00004?&icid2=west:tsb:main:hmp:m10:a00004:best:01:R22:blp:Bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28264029192222.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing/c-msh10?q=%3Arelevance%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3Acategory%3AMSH10%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00269%3Abrand%3AMBH11A00189%3Abrand%3AMBH11B10140%3Abrand%3AMBH11A00191&icid2=west:tsb:main:hmp:m10:mulb:best:02:R22:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28264018509854.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/western-wear/c-msh1016/page-1?q=%3Arelevance%3Acategory%3AMSH1016%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00179%3Abrand%3AMBH11A00181%3Abrand%3AMBH11A00187%3Abrand%3AMBH11A00177%3Abrand%3AMBH11A00179%3Abrand%3AMBH11A00181%3Abrand%3AMBH11A00187%3Abrand%3AMBH11A00177%3Abrand%3AMBH11A00254%3Abrand%3AMBH11A00174%3Acategory%3AMSH1016%3Abrand%3AMBH11A00179%3Abrand%3AMBH11A00181%3Abrand%3AMBH11A00187%3Abrand%3AMBH11A00177%3Acategory%3AMSH1016%3Abrand%3AMBH11A00179%3Abrand%3AMBH11A00181%3Abrand%3AMBH11A00187%3Abrand%3AMBH11A00177%3Abrand%3AMBH11A00254%3Abrand%3AMBH11A00174%3Abrand%3AMBH11A00472%3Abrand%3AMBH11B11602&icid2=west:tsb:main:hmp:m1016:mulb:best:03:R22:blp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28264018575390.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/mens-clothing/c-msh11?q=%3Arelevance%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3Acategory%3AMSH11%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00248%3Abrand%3AMBH11B10259%3Abrand%3AMBH11B10748%3Abrand%3AMBH11B10749%3Abrand%3AMBH11B10750%3Abrand%3AMBH11A00192%3Abrand%3AMBH11A00178%3Acategory%3AMSH11%3Abrand%3AMBH11A00248%3Abrand%3AMBH11B10259%3Abrand%3AMBH11B10748%3Abrand%3AMBH11B10749%3Abrand%3AMBH11B10750%3Abrand%3AMBH11A00192%3Abrand%3AMBH11A00178%3Abrand%3AMBH11A00472%3Abrand%3AMBH11A00175%3Abrand%3AMBH11A00273&icid2=west:tsb:main:hmp:m11:mulb:best:04:R22:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28264018640926.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/kids/c-msh21?q=:relevance:category:MSH21:category:MSH21:inStockFlag:true:isLuxuryProduct:false:brand:MBH11A00271:brand:MBH11A00255:brand:MBH11A00256:category:MSH21:brand:MBH11A00271:brand:MBH11A00255:brand:MBH11A00256:category:MSH21:brand:MBH11A00271:brand:MBH11A00255:brand:MBH11A00256:category:MSH21:brand:MBH11A00271:brand:MBH11A00255:brand:MBH11A00256:brand:MBH11A00611&icid2=west:tsb:main:hmp:m21:mulb:best:05:R22:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28264018706462.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/footwear-women/c-msh1310?q=%3Arelevance%3Acategory%3AMSH1310%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH13F00266&icid2=west:edit:main:hmp:m1310:mulb:best:06:R22:blp:Bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28264018771998.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/westside-home/c-mbh21b10083/page-1?q=:relevance:brand:MBH21B10083:brand:MBH21B10083:brand:MBH21B10083:brand:MBH21B10083:brand:MBH21B10083:inStockFlag:true:isLuxuryProduct:false&icid2=west:edit:main:hmp:m21:b10083:best:07:R22:blp:Bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28264018837534.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/footwear-men/c-msh1311?q=%3Arelevance%3Acategory%3AMSH1311%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH13F00265&icid2=west:edit:main:hmp:m1311:a00004:best:08:R22:blp:Bx:010"
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
                "//assets.tatacliq.com/medias/sys_master/images/28290548301854.jpg",
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
                "//assets.tatacliq.com/medias/sys_master/images/28260037034014.jpg",
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
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "cmsitem_00270029",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260036378654.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/bed-linen/c-msh2213/?q=:relevance:category:MSH2213:inStockFlag:true&icid2=home:tsb:main:hmp:m2213:mulb:best:01:R35:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260036444190.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/kitchen/c-msh2230?&icid2=home:tsb:main:hmp:m2230:mulb:best:04:R35:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260036509726.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/tea-&-coffee/c-msh2231?&icid2=home:tsb:main:hmp:m2231:mulb:best:02:R35:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260036575262.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/bed-linen/c-msh2213/?q=:relevance:category:MSH2213:inStockFlag:true&icid2=home:tsb:main:hmp:m2213:mulb:best:06:R35:clp:bx:010"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260036640798.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/dinnerware/c-msh2223?&icid2=home:tsb:main:hmp:m2223:mulb:best:05:R35:clp:bx:010"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
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
                    "//assets.tatacliq.com/medias/sys_master/images/28260036706334.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/home/c-msh22/page-1?q=%3Arelevance%3Acategory%3AMSH22%3Acategory%3AMSH22%3Acategory%3AMSH22%3Acategory%3AMSH22%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Acategory%3AMSH22%3Acategory%3AMSH22%3Abrand%3AMBH21H00002&icid2=home:ofc:main:hmp:m22:h00002:best:10:R35:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260036771870.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/kitchen/c-msh2230?q=%3Arelevance%3Acategory%3AMSH2230%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH21B11208&icid2=home:ofc:main:hmp:m2230:b11208:best:08:R35:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260036837406.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/home/c-msh22?q=%3Arelevance%3Acategory%3AMSH22%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH21B11641&icid2=home:ofc:main:hmp:m22:b11641:best:09:R35:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260036902942.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/tupperware-brand-store?&icid2=home:ofc:main:hmp:m22:b11528:best:16:R35:clp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260036968478.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/home/c-msh22?q=%3Arelevance%3Acategory%3AMSH22%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH21B11917&icid2=home:ofc:main:hmp:m22:b11917:best:07:R35:clp:bx:010"
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
                "//assets.tatacliq.com/medias/sys_master/images/28290548367390.jpg",
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
                    "//assets.tatacliq.com/medias/sys_master/images/28290545483806.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/jewellery/c-msh20?q=%3Arelevance%3Acategory%3AMSH20%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Agendertrlg%3AWomen%3Agendertrlg%3AUnisex%3Agendertrlg%3AMen%3Agendertrlg%3AKids%3Agendertrlg%3AGirls%3Agendertrlg%3ABoys%3AMetal-Jewellery-classification%3ASterling%2BSilver%3AMetal-Jewellery-classification%3ASilver%3AMetal-Jewellery-classification%3APlatinum%3AMetal-Jewellery-classification%3AOthers%3AMetal-Jewellery-classification%3AGold%3Abrand%3AMBH19J00001&icid2=mdo:tsb:main:hmp:m20:j00001:best:01:R8:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290545549342.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/head-phones/c-msh1234/?q=hammer:relevance:category:MSH1234&icid2=bouq:tsb:main:hmp:m1234:b10508:best:02:R31:blp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290545614878.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/watches/c-msh15/page-1?q=:isDiscountedPrice:inStockFlag:true:isLuxuryProduct:false:brand:MBH15W00077:gender:Women:gender:Men:gender:Couples:gender:Unisex:category:MSH15:brand:MBH15W00077:gender:Women:gender:Men:gender:Couples:gender:Unisex&icid2=mdo:tsb:main:hmp:m15:w00077:best:03:R8:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290545680414.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/large-appliances/c-msh1214/?q=:relevance:inStockFlag:true:isLuxuryProduct:false:category:MSH1214:brand:MBH12B10397&icid2=mdo:tsb:main:hmp:m12:b10397:best:04:R8:clp:bx:001"
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
                    "//assets.tatacliq.com/medias/sys_master/images/28290545745950.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/eyewear-sunglasses/c-msh2416?q=%3Arelevance%3Acategory%3AMSH2416%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH16B11153%3AdiscountAll%3ADiscounted%2BItems&icid2=bouq:tsb:main:hmp:m2416:b11153:best:05:R31:blp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290545877022.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/blaupunkt/c-mbh12e01477?&icid2=bouq:tsb:main:hmp:m12:e01477:best:06:R8:blp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290545942558.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/kids/c-msh21/page-1?q=%3Arelevance%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Acategory%3AMSH21%3Abrand%3AMBH11A00158&icid2=bouq:tsb:main:hmp:m21:a00158:best:07:R31:blp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290546008094.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/sandisk/c-mbh12e00029?&icid2=bouq:tsb:main:hmp:m12:e00029:best:08:R31:blp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290546073630.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/footwear/c-msh13/?q=:relevance:inStockFlag:true:isLuxuryProduct:false:brand:MBH13A00168:discountFlag:50%25+-+70%25:discountFlag:70%25+and+more:category:MSH13:brand:MBH13A00168:discountFlag:50%25+-+70%25:discountFlag:70%25+and+more&icid2=bouq:tsb:main:hmp:m13:a00168:best:09:R31:blp:bx:001"
                }
              ],
              title: "",
              type: "Desktop Top Selling Brands Component"
            }
          },
          {
            componentName: "heroBannerComponent",
            heroBannerComponent: {
              componentId: "cmsitem_00362143",
              dimension: "",
              interval: "",
              items: [
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290548498462.jpg",
                  subTitle: "",
                  title: "",
                  webURL: ""
                }
              ],
              type: "Hero Banner Component"
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "comp_00382049",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260027301918.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/beauty-&-grooming/c-msh25?q=%3Arelevance%3Acategory%3AMSH25%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Afragrancetypebeauty-classification%3AEau%2Bde%2BParfum&icid2=scnt:tsb:main:hmp:m2511:mulb:best:01:R38:clp:bx:100"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260027367454.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/beauty-&-grooming/c-msh25?q=%3Arelevance%3Acategory%3AMSH25%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Afragrancetypebeauty-classification%3AEau%2Bde%2BToilette&icid2=scnt:tsb:main:hmp:m2511:mulb:best:02:R38:clp:bx:100"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260027432990.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/beauty-&-grooming/c-msh25?q=%3Arelevance%3Acategory%3AMSH25%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Afragrancetypebeauty-classification%3AEau%2Bde%2BCologne&icid2=scnt:tsb:main:hmp:m25:mulb:best:03:R38:clp:bx:100"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260027498526.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/fragrances-and-perfumes/c-msh2511?q=%3Arelevance%3Acategory%3AMSH2511%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Afragrancetypebeauty-classification%3ADeodorants&icid2=scnt:tsb:main:hmp:m2511:mulb:best:04:R38:clp:bx:100"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260027564062.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/beauty-&-grooming/c-msh25?q=%3Arelevance%3Acategory%3AMSH25%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Afragrancetypebeauty-classification%3ABody%2BMists&icid2=scnt:tsb:main:hmp:m2511:mulb:best:05:R38:clp:bx:100"
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
                "//assets.tatacliq.com/medias/sys_master/images/28290548629534.jpg",
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
              componentId: "cmsitem_00386666",
              items: [
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290544959518.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/womens-clothing/c-msh10?q=%3Arelevance%3Acategory%3AMSH10%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00006%3AdiscountFlag%3A50%2525%2B-%2B70%2525&icid2=lft:ofc:main:hmp:m10:a00006:best:01:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290545025054.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/accessories/c-msh16?q=%3Arelevance%3Acategory%3AMSH16%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH16W00122%3Abrand%3AMBH16B10847%3AdiscountFlag%3A70%2525%2Band%2Bmore&icid2=lft:ofc:main:hmp:m16:w00122:best:02:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290545090590.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/jewellery/c-msh20/page-1?q=:relevance:inStockFlag:true:Metal-Jewellery-classification:Gold:isLuxuryProduct:false:Metal-Jewellery-classification:Platinum:gendertrlg:Women:gendertrlg:Unisex:gendertrlg:Men:gendertrlg:Kids:gendertrlg:Girls:category:MSH20:brand:MBH19B10182&icid2=lft:ofc:main:hmp:m20:b10182:best:03:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290545156126.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/watches/c-msh15/page-1?q=%3Arelevance%3Acategory%3AMSH15%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH15A00052&icid2=lft:ofc:main:hmp:m15:a00052:best:04:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290545221662.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/footwear-men/c-msh1311?q=%3Arelevance%3Acategory%3AMSH1311%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH13F00086%3Abrand%3AMBH13F00255%3AdiscountFlag%3A50%2525%2B-%2B70%2525&icid2=lft:ofc:main:hmp:m1311:f00255:best:05:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290545287198.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/footwear-women/c-msh1310?q=%3Arelevance%3Acategory%3AMSH1310%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH13F00024%3AdiscountFlag%3A50%2525%2B-%2B70%2525%3AdiscountFlag%3A70%2525%2Band%2Bmore&icid2=lft:ofc:main:hmp:m1310:f00024:best:06:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290545352734.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/kids/c-msh21/page-1?q=:relevance:inStockFlag:true:isLuxuryProduct:false:category:MSH21:brand:MBH11W00213&icid2=lft:ofc:main:hmp:m16:w00213:best:07:R24:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290545418270.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/mens-clothing/c-msh11?q=%3Arelevance%3Acategory%3AMSH11%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH11A00332%3AdiscountFlag%3A50%2525%2B-%2B70%2525%3AdiscountFlag%3A70%2525%2Band%2Bmore&icid2=lft:ofc:main:hmp:m11:a00332:best:08:R24:blp:bx:010"
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
                "//assets.tatacliq.com/medias/sys_master/images/28290548695070.jpg",
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
              componentId: "cmsitem_00386667",
              items: [
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28290544893982.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-large-appliances-refrigerators/c-msh1214100?q=%3Arelevance%3Acategory%3AMSH1214100%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00043&icid2=estrp:ofc:main:hmp:m1214100:e00043:best:01:R28:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260037820446.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-large-appliances-washing-machine/c-msh1214103?q=%3Arelevance%3Acategory%3AMSH1214103%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00039&icid2=estrp:ofc:main:hmp:m1214103:e00039:best:02:R28:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260037754910.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/air-conditioner/c-msh1230/?q=:relevance:inStockFlag:true:isLuxuryProduct:false:category:MSH1230:brand:MBH12E00263&icid2=estrp:ofc:main:hmp:m1230:e00263:best:03:R28:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260037689374.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-large-appliances-washing-machine/c-msh1214103/page-1?q=:relevance:inStockFlag:true:isLuxuryProduct:false:category:MSH1214103:brand:MBH12E00047&icid2=estrp:ofc:main:hmp:m1214103:e00047:best:04:R28:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260037558302.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/mobile-phones/c-msh1210?q=%3Arelevance%3Acategory%3AMSH1210%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00181&icid2=estrp:ofc:main:hmp:m1210:e00181:best:05:R28:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260037492766.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/kitchen-appliances/c-msh1229?q=%3Arelevance%3Acategory%3AMSH1229%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Abrand%3AMBH12E00006&icid2=estrp:ofc:main:hmp:m1229:e00006:best:06:R28:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260037427230.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/search/?searchCategory=all&text=Crucial&icid2=estrp:ofc:main:hmp:m12:b10701:best:08:R28:blp:bx:010"
                },
                {
                  btnText: "",
                  discountText: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28260037361694.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/electronics/c-msh12/page-1?q=%3Arelevance%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Acategory%3AMSH12%3Abrand%3AMBH12E00147&icid2=estrp:ofc:main:hmp:m1234:e00147:best:07:R28:blp:bx:010"
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
                "//assets.tatacliq.com/medias/sys_master/images/28290548760606.jpg",
              btnText: "",
              componentId: "cmsitem_00293120",
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
            componentName: "heroBannerComponent",
            heroBannerComponent: {
              componentId: "cmsitem_00295010",
              dimension: "",
              interval: "",
              items: [
                {
                  brandLogo: "",
                  buttonLabel: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28076119261214.jpg",
                  subTitle: "",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/the-training-club?&icid2=ede:hbr:main:hmp:m1318:mulb:best:01:R5:clp:bx:001"
                }
              ],
              type: "Hero Banner Component"
            }
          },
          {
            componentName: "desktopTopSellingBrandsComponent",
            desktopTopSellingBrandsComponent: {
              componentId: "cmsitem_00295013",
              items: [
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28239367471134.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/the-essentials-store?&icid2=ede:tsb:main:hmp:m2228104:mulb:best:02:R5:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28076119392286.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/stryder-brand-store?icid2=ede:tsb:main:hmp:m1318:b11747:best:05:R5:blp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28076119457822.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/gourmet-delights?icid2=ede:tsb:main:hmp:m2228106:mulb:best:03:R5:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28076119588894.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/tata-q?icid2=ede:tsb:main:hmp:m2228105:b11214:best:04:R5:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28084762574878.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/electronics-wearable-devices/c-msh1219?icid2=ede:tsb:main:hmp:m1219:mulb:best:06:R5:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28076119719966.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/sports-&-fitness-equipment/c-msh1318?icid2=ede:tsb:main:hmp:m1318:mulb:best:07:R5:clp:bx:001"
                },
                {
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28019377930270.jpg",
                  logoImageURL: "",
                  webURL:
                    "https://www.tatacliq.com/safety-glasses/c-msh2415100?&icid2=ede:tsb:main:hmp:m2415100:mulb:best:07:R5:clp:bx:001"
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
                "//assets.tatacliq.com/medias/sys_master/images/28290548826142.jpg",
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
                "//assets.tatacliq.com/medias/sys_master/images/28110454980638.jpg",
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
                    "//assets.tatacliq.com/medias/sys_master/images/28110454915102.jpg",
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
                    "//assets.tatacliq.com/medias/sys_master/images/28103845347358.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/it-accessories?&icid2=week:spb:main:hmp:m12:mulb:best:06:R10:clp:bx:100"
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
                "//assets.tatacliq.com/medias/sys_master/images/28104250064926.jpg",
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
                "https://www.tatacliq.com/kids-store?&icid2=week:cbc:main:hmp:m21:mulb:best:04:R10:clp:bx:100"
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
                    "//assets.tatacliq.com/medias/sys_master/images/28264029487134.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/watch-store?&icid2=week:spb:main:hmp:m15:mulb:best:03:R10:clp:bx:100"
                },
                {
                  brandLogo: "",
                  btnText: "",
                  description: "",
                  dimension: "",
                  hexCode: "",
                  imageURL:
                    "//assets.tatacliq.com/medias/sys_master/images/28264029257758.jpg",
                  title: "",
                  webURL:
                    "https://www.tatacliq.com/autumn-winter?&icid2=week:spb:main:hmp:m01:mulb:best:05:R10:clp:bx:100"
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
      postData.append("fields", JSON.stringify(["mop"]));
      postData.append("details", true);

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
  productCode,
  filterData
) {
  return {
    type: AUTOMATED_WIDGET_HOME_SUCCESS,
    status: SUCCESS,
    homeAutoWidgetData,
    widgetKey,
    productCode,
    filterData
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
      // if (widgetData && widgetData.webURL && widgetData.webURL === "114") {
      //   msdWidgetData.append("details", false);
      // } else {
      msdWidgetData.append("details", true);
      msdWidgetData.append("fields", JSON.stringify(["mop"]));
      if (widgetData && widgetData.description) {
        let filterValue =
          widgetData &&
          widgetData.description &&
          widgetData.description.split(";");
        let filterParsedData;
        if (
          filterValue &&
          Array.isArray(filterValue) &&
          filterValue[1] === "range"
        ) {
          let rangeValue =
            filterValue && filterValue[2] && filterValue[2].split(",");
          filterParsedData = [
            {
              field: `${filterValue[0]}`,
              type: `${filterValue[1]}`,
              value: [rangeValue[0], rangeValue[1]]
            }
          ];
        } else {
          filterParsedData = [
            {
              field: `${filterValue[0]}`,
              type: `${filterValue[1]}`,
              value: `${filterValue[2]}`
            }
          ];
        }
        msdWidgetData.append("filters", JSON.stringify(filterParsedData));
      }
      //}
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
        // if (widgetData.webURL === "114") {
        //   dispatch(
        //     getAutomatedWidgetsItems(
        //       data,
        //       widgetData.webURL,
        //       widgetData.hexCode
        //     )
        //   );
        // } else {
        dispatch(
          automatedWidgetsForHomeSuccess(
            data,
            widgetData.webURL,
            widgetData.hexCode,
            widgetData.description
          )
        );
        //}
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
      let productListWithStatus = await Promise.all(
        successfulPromises
      ).then(response =>
        Promise.all(response.map(r => r && r.value && r.value.json()))
      );
      productListWithStatus &&
        productListWithStatus.map(product => {
          if (product.status === "Success" && product.results) {
            productList.push(product.results[0]);
          }
        });
      if (Array.isArray(productList) && productList.length > 0) {
        const viewMore = {
          productName: "View More"
        };
        productList.push(viewMore);
        dispatch(autoWishListSuccess(productList));
      }
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  };
}
