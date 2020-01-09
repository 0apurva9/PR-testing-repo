import {
  SUCCESS,
  REQUESTING,
  ERROR,
  GLOBAL_ACCESS_TOKEN,
  SUCCESS_UPPERCASE,
  SUCCESS_CAMEL_CASE,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  CART_BAG_DETAILS,
  PLAT_FORM_NUMBER,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CART_DETAILS_FOR_ANONYMOUS,
  FAILURE,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  ANONYMOUS_USER,
  TIME_OUT_FOR_APIS,
  LOW_INTERNET_CONNECTION_MESSAGE,
  CHANNEL
} from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";
import {
  getMcvId,
  setDataLayerForPdpDirectCalls,
  SET_DATA_LAYER_FOR_ADD_TO_BAG_EVENT,
  QA2_MCV_ID,
  SET_DATA_LAYER_FOR_SUBMIT_REVIEW
} from "../../lib/adobeUtils.js";
import each from "lodash.foreach";
import {
  showModal,
  GO_TO_CART_PAGE_POPUP
} from "../../general/modal.actions.js";
import { setBagCount } from "../../general/header.actions";
import { setDataLayer, ADOBE_PDP_TYPE } from "../../lib/adobeUtils.js";
import * as ErrorHandling from "../../general/ErrorHandling.js";
import { isBrowser } from "browser-or-node";

import { API_MSD_URL_ROOT } from "../../lib/apiRequest.js";
import { displayToast, showToast } from "../../general/toast.actions.js";
export const SUBMIT_REVIEW_TEXT =
  "Thanks for submitting the review. Your review will start appearing shortly";
export const PRODUCT_DESCRIPTION_REQUEST = "PRODUCT_DESCRIPTION_REQUEST";
export const PRODUCT_DESCRIPTION_SUCCESS = "PRODUCT_DESCRIPTION_SUCCESS";
export const PRODUCT_DESCRIPTION_FAILURE = "PRODUCT_DESCRIPTION_FAILURE";

export const CHECK_PRODUCT_PIN_CODE_REQUEST = "CHECK_PRODUCT_PIN_CODE_REQUEST";
export const CHECK_PRODUCT_PIN_CODE_SUCCESS = "CHECK_PRODUCT_PIN_CODE_SUCCESS";
export const CHECK_PRODUCT_PIN_CODE_FAILURE = "CHECK_PRODUCT_PIN_CODE_FAILURE";

export const ADD_PRODUCT_TO_CART_REQUEST = "ADD_PRODUCT_TO_CART_REQUEST";
export const ADD_PRODUCT_TO_CART_SUCCESS = "ADD_PRODUCT_TO_CART_SUCCESS";
export const ADD_PRODUCT_TO_CART_FAILURE = "ADD_PRODUCT_TO_CART_FAILURE";

export const PRODUCT_SIZE_GUIDE_REQUEST = "PRODUCT_SIZE_GUIDE_REQUEST";
export const PRODUCT_SIZE_GUIDE_SUCCESS = "PRODUCT_SIZE_GUIDE_SUCCESS";
export const PRODUCT_SIZE_GUIDE_FAILURE = "PRODUCT_SIZE_GUIDE_FAILURE";

export const PRODUCT_SIZE_CHART_REQUEST = "PRODUCT_SIZE_CHART_REQUEST";
export const PRODUCT_SIZE_CHART_SUCCESS = "PRODUCT_SIZE_CHART_SUCCESS";
export const PRODUCT_SIZE_CHART_FAILURE = "PRODUCT_SIZE_CHART_FAILURE";

export const PRODUCT_PDP_EMI_REQUEST = "PRODUCT_PDP_EMI_REQUEST";
export const PRODUCT_PDP_EMI_SUCCESS = "PRODUCT_PDP_EMI_SUCCESS";
export const PRODUCT_PDP_EMI_FAILURE = "PRODUCT_PDP_EMI_FAILURE";

export const GET_EMI_TERMS_AND_CONDITIONS_SUCCESS =
  "GET_EMI_TERMS_AND_CONDITIONS_SUCCESS";
export const GET_EMI_TERMS_AND_CONDITIONS_FAILURE =
  "GET_EMI_TERMS_AND_CONDITIONS_FAILURE";
export const GET_EMI_TERMS_AND_CONDITIONS_REQUEST =
  "GET_EMI_TERMS_AND_CONDITIONS_REQUEST";

export const PRODUCT_SPECIFICATION_REQUEST = "PRODUCT_SPECIFICATION_REQUEST";
export const PRODUCT_SPECIFICATION_SUCCESS = "PRODUCT_SPECIFICATION_SUCCESS";
export const PRODUCT_SPECIFICATION_FAILURE = "PRODUCT_SPECIFICATION_FAILURE";

export const ADD_PRODUCT_REVIEW_REQUEST = "ADD_PRODUCT_REVIEW_REQUEST";
export const ADD_PRODUCT_REVIEW_SUCCESS = "ADD_PRODUCT_REVIEW_SUCCESS";
export const ADD_PRODUCT_REVIEW_FAILURE = "ADD_PRODUCT_REVIEW_FAILURE";

export const EDIT_PRODUCT_REVIEW_REQUEST = "EDIT_PRODUCT_REVIEW_REQUEST";
export const EDIT_PRODUCT_REVIEW_SUCCESS = "EDIT_PRODUCT_REVIEW_SUCCESS";
export const EDIT_PRODUCT_REVIEW_FAILURE = "EDIT_PRODUCT_REVIEW_FAILURE";

export const GET_PRODUCT_REVIEW_REQUEST = "GET_PRODUCT_REVIEW_REQUEST";
export const GET_PRODUCT_REVIEW_SUCCESS = "GET_PRODUCT_REVIEW_SUCCESS";
export const GET_PRODUCT_REVIEW_FAILURE = "GET_PRODUCT_REVIEW_FAILURE";

export const FOLLOW_UN_FOLLOW_BRAND_REQUEST = "FOLLOW_UN_FOLLOW_BRAND_REQUEST";
export const FOLLOW_UN_FOLLOW_BRAND_SUCCESS = "FOLLOW_UN_FOLLOW_BRAND_SUCCESS";
export const FOLLOW_UN_FOLLOW_BRAND_FAILURE = "FOLLOW_UN_FOLLOW_BRAND_FAILURE";

export const DELETE_PRODUCT_REVIEW_REQUEST = "DELETE_PRODUCT_REVIEW_REQUEST";
export const DELETE_PRODUCT_REVIEW_SUCCESS = "DELETE_PRODUCT_REVIEW_SUCCESS";
export const DELETE_PRODUCT_REVIEW_FAILURE = "DELETE_PRODUCT_REVIEW_FAILURE";

export const PRODUCT_MSD_REQUEST = "PRODUCT_MSD_REQUEST";
export const PRODUCT_MSD_SUCCESS = "PRODUCT_MSD_SUCCESS";
export const PRODUCT_MSD_FAILURE = "PRODUCT_MSD_FAILURE";

export const GET_PDP_ITEMS_REQUEST = "GET_PDP_ITEMS_REQUEST";
export const GET_PDP_ITEMS_SUCCESS = "GET_PDP_ITEMS_SUCCESS";
export const GET_PDP_ITEMS_FAILURE = "GET_PDP_ITEMS_FAILURE";

export const PDP_ABOUT_BRAND_REQUEST = "PDP_ABOUT_BRAND_REQUEST";
export const PDP_ABOUT_BRAND_SUCCESS = "PDP_ABOUT_BRAND_SUCCESS";
export const PDP_ABOUT_BRAND_FAILURE = "PDP_ABOUT_BRAND_FAILURE";
//NU-385 for Desktop
export const PDP_OFFER_REQUEST = "PDP_OFFER_REQUEST";
export const PDP_OFFER_SUCCESS = "PDP_OFFER_SUCCESS";
export const PDP_OFFER_FAILURE = "PDP_OFFER_FAILURE";

//bundledProduct
export const BUNDLE_PRODUCT_REQUEST = "BUNDLE_PRODUCT_REQUEST";
export const BUNDLE_PRODUCT_SUCCESS = "BUNDLE_PRODUCT_SUCCESS";
export const BUNDLE_PRODUCT_FAILURE = "BUNDLE_PRODUCT_FAILURE";

export const CHECK_BUNDLE_PRODUCT_PIN_CODE_REQUEST =
  "CHECK_BUNDLE_PRODUCT_PIN_CODE_REQUEST";
export const CHECK_BUNDLE_PRODUCT_PIN_CODE_FAILURE =
  "CHECK_BUNDLE_PRODUCT_PIN_CODE_FAILURE";
export const CHECK_BUNDLE_PRODUCT_PIN_CODE_SUCCESS =
  "CHECK_BUNDLE_PRODUCT_PIN_CODE_SUCCESS";

export const PRODUCT_DETAILS_PATH = "v2/mpl/users";
export const PIN_CODE_AVAILABILITY_PATH = "pincodeserviceability";
export const PRODUCT_PDP_EMI_PATH = `v2/mpl/getEMIDetails`;
export const EMI_TERMS_PATH = "/v2/mpl/cms/products/getEmiTermsAndConditions";
export const FOLLOW_UN_FOLLOW_PATH = "v2/mpl/products";

export const ABOUT_THE_BRAND_WIDGET_KEY = "aboutTheBrand";
export const RECOMMENDED_PRODUCTS_WIDGET_KEY = "recommendedProducts";
export const SIMILAR_PRODUCTS_WIDGET_KEY = "similarProducts";

export const OPEN_IN_APP_REQUEST = "OPEN_IN_APP_REQUEST";
export const OPEN_IN_APP_SUCCESS = "OPEN_IN_APP_SUCCESS";
export const OPEN_IN_APP_FAILURE = "OPEN_IN_APP_FAILURE";

export const RELEVANT_BUNDLE_PRODUCT_REQUEST =
  "RELEVANT_BUNDLE_PRODUCT_REQUEST";
export const RELEVANT_BUNDLE_PRODUCT_SUCCESS =
  "RELEVANT_BUNDLE_PRODUCT_SUCCESS";
export const RELEVANT_BUNDLE_PRODUCT_FAILURE =
  "RELEVANT_BUNDLE_PRODUCT_SUCCESS";

export const CHECK_RELEVANT_PRODUCT_PIN_CODE_REQUEST =
  "CHECK_RELEVANT_PRODUCT_PIN_CODE_REQUEST";
export const CHECK_RELEVANT_PRODUCT_PIN_CODE_SUCCESS =
  "CHECK_RELEVANT_PRODUCT_PIN_CODE_SUCCESS";
export const CHECK_RELEVANT_PRODUCT_PIN_CODE_FAILURE =
  "CHECK_RELEVANT_PRODUCT_PIN_CODE_FAILURE";

export const RELAVANT_PRODUCT_DETAILS_REQUEST =
  "RELAVANT_PRODUCT_DETAILS_REQUEST";
export const RELAVANT_PRODUCT_DETAILS_SUCCESS =
  "RELAVANT_PRODUCT_DETAILS_SUCCESS";
export const RELAVANT_PRODUCT_DETAILS_FAILURE =
  "RELAVANT_PRODUCT_DETAILS_FAILURE";

export const SECONDARY_BUNDLE_PRODUCT_REQUEST =
  "SECONDARY_BUNDLE_PRODUCT_REQUEST";
export const SECONDARY_BUNDLE_PRODUCT_SUCCESS =
  "SECONDARY_BUNDLE_PRODUCT_SUCCESS";
export const SECONDARY_BUNDLE_PRODUCT_FAILURE =
  "SECONDARY_BUNDLE_PRODUCT_FAILURE";

export const RELEVANT_BUNDLE_PRODUCT_CODE_REQUEST =
  "RELEVANT_BUNDLE_PRODUCT_CODE_REQUEST";
export const RELEVANT_BUNDLE_PRODUCT_CODE_SUCCESS =
  "RELEVANT_BUNDLE_PRODUCT_CODE_SUCCESS";
export const RELEVANT_BUNDLE_PRODUCT_CODE_FAILURE =
  "RELEVANT_BUNDLE_PRODUCT_CODE_FAILURE";

export const GET_ALL_STORES_FOR_CLIQ_AND_PIQ_REQUEST =
  "GET_ALL_STORES_FOR_CLIQ_AND_PIQ_REQUEST";
export const GET_ALL_STORES_FOR_CLIQ_AND_PIQ_SUCCESS =
  "GET_ALL_STORES_FOR_CLIQ_AND_PIQ_SUCCESS";
export const GET_ALL_STORES_FOR_CLIQ_AND_PIQ_FAILURE =
  "GET_ALL_STORES_FOR_CLIQ_AND_PIQ_FAILURE";
export const SHOW_PDP_PIQ_PAGE = "showPdpPiqPage";
export const HIDE_PDP_PIQ_PAGE = "hidePdpPiqPage";
const ALL_STORES_FOR_CLIQ_AND_PIQ_PATH = "v2/mpl/allStores";
export const SET_TO_OLD = "SET_TO_OLD";
const MY_WISH_LIST = "MyWishList";
const PRODUCT_SPECIFICATION_PATH = "/v2/mpl/products/productDetails";
const PRODUCT_DESCRIPTION_PATH = "v2/mpl/products/productDetails";
const PRODUCT_SIZE_GUIDE_PATH = "v2/mpl/products/";
const ORDER_BY = "desc";
const SORT = "byDate";
const PAGE_VALUE = "0";
const PAGE_NUMBER = "25";
const MSD_REQUEST_PATH = "widgets";
const API_KEY = "8783ef14595919d35b91cbc65b51b5b1da72a5c3";
const WIDGET_LIST = [0, 4];
const WIDGET_LIST_FOR_ABOUT_BRAND = [114];
const NUMBER_RESULTS = [5, 5];
//TPR-9957 for Desktop
export const PDP_MANUFACTURER_REQUEST = "PDP_MANUFACTURER_REQUEST";
export const PDP_MANUFACTURER_SUCCESS = "PDP_MANUFACTURER_SUCCESS";
export const PDP_MANUFACTURER_FAILURE = "PDP_MANUFACTURER_FAILURE";

export function getProductDescriptionRequest() {
  return {
    type: PRODUCT_DESCRIPTION_REQUEST,
    status: REQUESTING
  };
}
export function getProductDescriptionSuccess(productDescription) {
  return {
    type: PRODUCT_DESCRIPTION_SUCCESS,
    status: SUCCESS,
    productDescription
  };
}

export function getProductDescriptionFailure(error) {
  return {
    type: PRODUCT_DESCRIPTION_FAILURE,
    status: ERROR,
    error
  };
}
export function getProductDescription(
  productCode,
  behaviorOfPage,
  isApiCall: 0,
  componentName
) {
  return async (dispatch, getState, { api }) => {
    dispatch(getProductDescriptionRequest());
    try {
      let behaviorOfPageTheCurrent = behaviorOfPage ? behaviorOfPage : null;
      setTimeout(() => {
        if (getState().productDescription.getProductDetailsLoading) {
          dispatch(displayToast(LOW_INTERNET_CONNECTION_MESSAGE));
        }
      }, TIME_OUT_FOR_APIS);
      const result = await api.getMiddlewareUrl(
        `${PRODUCT_DESCRIPTION_PATH}/${productCode}?isPwa=true`
      );

      let resultJson = await result.json();

      //resultJson = {"type":"mplNewProductDetailMobileWsData","status":"SUCCESS","allOOStock":false,"brandInfo":"Sonata is a brand that is synonymous with trust. Take a look at these amazing analogue and digital watches from Sonata on Tata CliQ.","brandName":"Sonata","brandURL":"/sonata/c-mbh15w00181","categoryHierarchy":[{"category_id":"MSH15","category_name":"Watches"},{"category_id":"MSH1501","category_name":"Women"},{"category_id":"MSH1501000","category_name":"Analog"}],"classifications":[{"groupName":"watch_group_008","specifications":[{"key":"Care Instructions","value":"Please refer instruction manual"}]},{"groupName":"watch_group_002","specifications":[{"key":"Collection Name","value":"Play"},{"key":"Water Resistance","value":"30 m"},{"key":"Functionality","value":"Plain 3-Hand"},{"key":"Occasion","value":"Casual"},{"key":"Dial Color Brand","value":"Rose Gold"},{"key":"Gender","value":"Women"},{"key":"Unisex","value":"No"}]},{"groupName":"watch_group_003","specifications":[{"key":"Dial Type","value":"Stick"},{"key":"Movement","value":"Quartz"},{"key":"Watch Glass/Crystal","value":"Mineral Glass"},{"key":"Dial Color","value":"Gold"},{"key":"Special Features","value":"Water Resistant"}]},{"groupName":"watch_group_004","specifications":[{"key":"Dial Diameter","value":"32 mm"},{"key":"Dial Shape","value":"Round"},{"key":"Dial Size","value":"Medium"},{"key":"Case Material","value":"Brass"}]},{"groupName":"watch_group_010","specifications":[{"key":"Strap Color","value":"Rose Gold"},{"key":"Strap Type","value":"Metal"}]},{"groupName":"watch_group_011","specifications":[{"key":"Strap Color Brand","value":"Rose Gold"},{"key":"Band Style","value":"Bracelet"},{"key":"Clasp Type","value":"Hook Buckle"},{"key":"Strap Width","value":"20 mm"}]},{"groupName":"watch_group_001","specifications":[{"key":"Style Code","value":"8141WM01"},{"key":"Warranty Details","value":"12 months manufacturer warranty"},{"key":"Model Number","value":"8141WM01"}]}],"deliveryModesATP":[{"key":"home-delivery","value":"Delivered in 3-6 days."},{"key":"express-delivery","value":"Delivered in 1-2 days."}],"details":[{"key":"Care Instructions","value":"Please refer instruction manual"},{"key":"Case Material","value":"Brass"},{"key":"Collection Name","value":"Play"},{"key":"Dial Color","value":"Gold"},{"key":"Dial Diameter","value":"32mm"},{"key":"Dial Shape","value":"Round"},{"key":"Dial Type","value":"Stick"},{"key":"Functionality","value":"Plain 3-Hand"},{"key":"Model Number","value":"8141WM01"},{"key":"Movement","value":"Quartz"},{"key":"Special Features","value":"Water Resistant"},{"key":"Strap Color","value":"Rose Gold"},{"key":"Strap Type","value":"Metal"},{"key":"Strap Width","value":"20mm"},{"key":"Warranty Details","value":"12 months manufacturer warranty"},{"key":"Watch Glass/Crystal","value":"Mineral Glass"},{"key":"Water Resistance","value":"30 m"}],"discount":"0","eligibleDeliveryModes":[{"code":"click-and-collect","displayCost":"₹0.00","name":"Click and Collect"},{"code":"home-delivery","displayCost":"₹0.00","name":"Home Delivery"},{"code":"express-delivery","displayCost":"₹0.00","name":"Express Delivery"},{"code":"home-delivery","displayCost":"₹0.00","name":"Home Delivery"}],"fulfillmentType":"tship","galleryImagesList":[{"galleryImages":[{"key":"product","value":"//img.tatacliq.com/images/i4/437Wx649H/MP000000005291532_437Wx649H_20190823173405.jpeg"},{"key":"thumbnail","value":"//img.tatacliq.com/images/i4/97Wx144H/MP000000005291532_97Wx144H_20190823173405.jpeg"},{"key":"searchPage","value":"//img.tatacliq.com/images/i4/252Wx374H/MP000000005291532_252Wx374H_20190823173405.jpeg"},{"key":"mobilePdpView","value":"//img.tatacliq.com/images/i4/450Wx545H/MP000000005291532_450Wx545H_20190823173405.jpeg"},{"key":"superZoom","value":"//img.tatacliq.com/images/i4/1348Wx2000H/MP000000005291532_1348Wx2000H_20190823173405.jpeg"},{"key":"cartIcon","value":"//img.tatacliq.com/images/i4/97Wx144H/MP000000005291532_97Wx144H_20190823173405.jpeg"},{"key":"zoom","value":"//img.tatacliq.com/images/i4/437Wx649H/MP000000005291532_437Wx649H_20190823173405.jpeg"},{"key":"cartPage","value":"//img.tatacliq.com/images/i4/113Wx168H/MP000000005291532_113Wx168H_20190823173405.jpeg"}],"mediaType":"Image"},{"galleryImages":[{"key":"product","value":"//img.tatacliq.com/images/i4/437Wx649H/MP000000005291532_437Wx649H_20190823173409.jpeg"},{"key":"thumbnail","value":"//img.tatacliq.com/images/i4/97Wx144H/MP000000005291532_97Wx144H_20190823173409.jpeg"},{"key":"searchPage","value":"//img.tatacliq.com/images/i4/252Wx374H/MP000000005291532_252Wx374H_20190823173409.jpeg"},{"key":"mobilePdpView","value":"//img.tatacliq.com/images/i4/450Wx545H/MP000000005291532_450Wx545H_20190823173409.jpeg"},{"key":"superZoom","value":"//img.tatacliq.com/images/i4/1348Wx2000H/MP000000005291532_1348Wx2000H_20190823173409.jpeg"},{"key":"cartIcon","value":"//img.tatacliq.com/images/i4/97Wx144H/MP000000005291532_97Wx144H_20190823173409.jpeg"},{"key":"zoom","value":"//img.tatacliq.com/images/i4/437Wx649H/MP000000005291532_437Wx649H_20190823173409.jpeg"},{"key":"cartPage","value":"//img.tatacliq.com/images/i4/113Wx168H/MP000000005291532_113Wx168H_20190823173409.jpeg"}],"mediaType":"Image"},{"galleryImages":[{"key":"product","value":"//img.tatacliq.com/images/i4/437Wx649H/MP000000005291532_437Wx649H_20190823173402.jpeg"},{"key":"thumbnail","value":"//img.tatacliq.com/images/i4/97Wx144H/MP000000005291532_97Wx144H_20190823173402.jpeg"},{"key":"searchPage","value":"//img.tatacliq.com/images/i4/252Wx374H/MP000000005291532_252Wx374H_20190823173402.jpeg"},{"key":"mobilePdpView","value":"//img.tatacliq.com/images/i4/450Wx545H/MP000000005291532_450Wx545H_20190823173402.jpeg"},{"key":"superZoom","value":"//img.tatacliq.com/images/i4/1348Wx2000H/MP000000005291532_1348Wx2000H_20190823173402.jpeg"},{"key":"cartIcon","value":"//img.tatacliq.com/images/i4/97Wx144H/MP000000005291532_97Wx144H_20190823173402.jpeg"},{"key":"zoom","value":"//img.tatacliq.com/images/i4/437Wx649H/MP000000005291532_437Wx649H_20190823173402.jpeg"},{"key":"cartPage","value":"//img.tatacliq.com/images/i4/113Wx168H/MP000000005291532_113Wx168H_20190823173402.jpeg"}],"mediaType":"Image"},{"galleryImages":[{"key":"product","value":"//img.tatacliq.com/images/i4/437Wx649H/MP000000005291532_437Wx649H_20190823173416.jpeg"},{"key":"thumbnail","value":"//img.tatacliq.com/images/i4/97Wx144H/MP000000005291532_97Wx144H_20190823173416.jpeg"},{"key":"searchPage","value":"//img.tatacliq.com/images/i4/252Wx374H/MP000000005291532_252Wx374H_20190823173416.jpeg"},{"key":"mobilePdpView","value":"//img.tatacliq.com/images/i4/450Wx545H/MP000000005291532_450Wx545H_20190823173416.jpeg"},{"key":"superZoom","value":"//img.tatacliq.com/images/i4/1348Wx2000H/MP000000005291532_1348Wx2000H_20190823173416.jpeg"},{"key":"cartIcon","value":"//img.tatacliq.com/images/i4/97Wx144H/MP000000005291532_97Wx144H_20190823173416.jpeg"},{"key":"zoom","value":"//img.tatacliq.com/images/i4/437Wx649H/MP000000005291532_437Wx649H_20190823173416.jpeg"},{"key":"cartPage","value":"//img.tatacliq.com/images/i4/113Wx168H/MP000000005291532_113Wx168H_20190823173416.jpeg"}],"mediaType":"Image"},{"galleryImages":[{"key":"product","value":"//img.tatacliq.com/images/i4/437Wx649H/MP000000005291532_437Wx649H_20190823173413.jpeg"},{"key":"thumbnail","value":"//img.tatacliq.com/images/i4/97Wx144H/MP000000005291532_97Wx144H_20190823173413.jpeg"},{"key":"searchPage","value":"//img.tatacliq.com/images/i4/252Wx374H/MP000000005291532_252Wx374H_20190823173413.jpeg"},{"key":"mobilePdpView","value":"//img.tatacliq.com/images/i4/450Wx545H/MP000000005291532_450Wx545H_20190823173413.jpeg"},{"key":"superZoom","value":"//img.tatacliq.com/images/i4/1348Wx2000H/MP000000005291532_1348Wx2000H_20190823173413.jpeg"},{"key":"cartIcon","value":"//img.tatacliq.com/images/i4/97Wx144H/MP000000005291532_97Wx144H_20190823173413.jpeg"},{"key":"zoom","value":"//img.tatacliq.com/images/i4/437Wx649H/MP000000005291532_437Wx649H_20190823173413.jpeg"},{"key":"cartPage","value":"//img.tatacliq.com/images/i4/113Wx168H/MP000000005291532_113Wx168H_20190823173413.jpeg"}],"mediaType":"Image"}],"isCOD":"Y","isEMIEligible":"N","isExchangeAvailable":false,"isOfferExisting":"N","isOnlineExclusive":"N","isProductNew":"N","knowMore":[{"knowMoreItem":"An order, once placed, can be cancelled until the seller processes it."},{"knowMoreItem":"This product can be returned within 15 day(s) of delivery,subject to the Return Policy."},{"knowMoreItem":"For any other queries, do reach out to CliQ Care at 90291 08282."}],"knowMoreEmail":"hello@tatacliq.com","knowMorePhoneNo":"90291 08282","knowMoreV2":[{"knowMoreItemV2":"15 Days Easy Return"},{"knowMoreItemV2":"An order, once placed, can be cancelled until the seller processes it."}],"maxQuantityAllowed":"5","mrpPrice":{"currencyIso":"INR","doubleValue":1825,"formattedValue":"₹1825.00","formattedValueNoDecimal":"₹1825","priceType":"BUY","value":1825},"nceAvailable":false,"numberOfReviews":0,"productDescription":"Set your fashion parameters high with this women's analog watch from the Play collection by Sonata. Protected by a mineral glass, the rose gold round dial is housed in a 32 mm case. It exudes plain three hands, bold stick hour markings and a crown for time adjustment. The metal strap vaunts a rose gold hue that enhances the look of the watch. Moreover, it is fitted with a hook buckle clasp that ensures a secure fit on the wrist.","productListingId":"MP000000005291532","productName":"Sonata 8141WM01 Play Analog Watch for Women","rootCategory":"Watches","sellerAssociationstatus":"Y","seo":{"alternateURL":"/sonata-8141wm01-play-analog-watch-for-women/p-mp000000005291532","breadcrumbs":[{"name":"Sonata 8141WM01 Play Analog Watch for Women","url":"/sonata-8141wm01-play-analog-watch-for-women/p-mp000000005291532"},{"name":"Analog","url":"/watches-women-analog/c-msh1501000"},{"name":"Women","url":"/watches-women/c-msh1501"},{"name":"Watches","url":"/watches/c-msh15"}],"canonicalURL":"/sonata-8141wm01-play-analog-watch-for-women/p-mp000000005291532","description":"Sonata 8141WM01 Play Analog Watch for Women in India - Shop for Sonata 8141WM01 Play Analog Watch for Women online at best price on Tata CLiQ.","imageURL":"//img.tatacliq.com/images/i4/97Wx144H/MP000000005291532_97Wx144H_20190823173405.jpeg","keywords":"Sonata 8141WM01 Play Analog Watch for Women, buy, online, Tata CLiQ","title":"Buy Sonata 8141WM01 Play Analog Watch for Women at Best Price @ Tata CLiQ"},"sharedText":"Wow!Check out this amazing find http://www.tatacliq.com/sonata-8141wm01-play-analog-watch-for-women/p-mp000000005291532 . Like or  comment to tell me what you think, or share for warm fuzzies.","showSizeGuide":false,"styleNote":"Set your fashion parameters high with this women's analog watch from the Play collection by Sonata. Protected by a mineral glass, the rose gold round dial is housed in a 32 mm case. It exudes plain three hands, bold stick hour markings and a crown for time adjustment. The metal strap vaunts a rose gold hue that enhances the look of the watch. Moreover, it is fitted with a hook buckle clasp that ensures a secure fit on the wrist.","warranty":["12 months manufacturer warranty"],"winningSellerAvailableStock":"0","winningSellerID":"123762","winningSellerName":"Titan Company Ltd","winningSellerPrice":{"currencyIso":"INR","doubleValue":1825,"formattedValue":"₹1825.00","formattedValueNoDecimal":"₹1825","priceType":"BUY","value":1825},"winningUssID":"1237628141WM01"}

      if (
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === SUCCESS_CAMEL_CASE
      ) {
        let urlLength = window.location.pathname.split("/");
        if (
          resultJson.seo &&
          resultJson.seo.alternateURL &&
          urlLength.length === 2
        ) {
          window.location.pathname = resultJson.seo.alternateURL;
        }
        if (
          isBrowser &&
          (!window.digitalData ||
            !window.digitalData.cpj ||
            !window.digitalData.cpj.product ||
            window.digitalData.cpj.product.id !== resultJson.productListingId)
        ) {
          if (componentName === "Theme offers component") {
            setDataLayer(
              ADOBE_PDP_TYPE,
              resultJson,
              null,
              null,
              behaviorOfPageTheCurrent
            );
          } else {
            setDataLayer(
              ADOBE_PDP_TYPE,
              resultJson,
              getState().icid.value,
              getState().icid.icidType,
              behaviorOfPageTheCurrent
            );
          }
        }
        return dispatch(getProductDescriptionSuccess(resultJson));
      } else {
        if (resultJson.status === 404 && isApiCall === 0) {
          isApiCall = isApiCall + 1;
          dispatch(getProductDescription(productCode, isApiCall));
        } else {
          throw new Error(`${resultJson.error}`);
        }
      }
    } catch (e) {
      return dispatch(getProductDescriptionFailure(e.message));
    }
  };
}
export function setToOld() {
  return {
    type: SET_TO_OLD
  };
}
export function getProductPinCodeRequest() {
  return {
    type: CHECK_PRODUCT_PIN_CODE_REQUEST,
    status: REQUESTING
  };
}
export function getProductPinCodeSuccess(productPinCode) {
  return {
    type: CHECK_PRODUCT_PIN_CODE_SUCCESS,
    status: SUCCESS,
    productPinCode
  };
}

export function getProductPinCodeFailure(error) {
  return {
    type: CHECK_PRODUCT_PIN_CODE_FAILURE,
    status: ERROR,
    error
  };
}

export function getProductPinCode(
  pinCode: null,
  productCode,
  winningUssID,
  isComingFromPiqPage,
  isFirstTimeRender = false
) {
  let validProductCode = productCode.toUpperCase();
  if (pinCode) {
    localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, pinCode);
  }
  return async (dispatch, getState, { api }) => {
    dispatch(getProductPinCodeRequest());
    try {
      let url;
      let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
      let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      if (userDetails) {
        let userName = JSON.parse(userDetails).userName;
        let accessToken = JSON.parse(customerCookie).access_token;
        url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}`;
      } else {
        let userName = ANONYMOUS_USER;
        let accessToken = JSON.parse(globalCookie).access_token;
        url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}`;
      }
      let result = await api.post(url);
      let resultJson = await result.json();

      //old production response :
      //resultJson = {"type":"pinWsDto","listOfDataList":[{"key":"MP000000004040451","value":{"pincodeListResponse":[{"cod":"Y","exchangeServiceable":false,"isCODLimitFailed":"N","isPrepaidEligible":"Y","isServicable":"Y","stockCount":301,"ussid":"123762SWD90064PP01","validDeliveryModes":[{"CNCServiceableSlavesData":[{"fulfillmentType":"TSHIP","qty":4,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TCPS"}],"storeId":"123762-TCPS"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HCPD"}],"storeId":"123762-HCPD"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HKBD"}],"storeId":"123762-HKBD"},{"fulfillmentType":"TSHIP","qty":2,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TKBN"}],"storeId":"123762-TKBN"},{"fulfillmentType":"TSHIP","qty":8,"serviceableSlaves":[{"priority":"1","slaveId":"123762-FKND"}],"storeId":"123762-FKND"},{"fulfillmentType":"TSHIP","qty":5,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TKND"}],"storeId":"123762-TKND"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HSTE"}],"storeId":"123762-HSTE"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HLND"}],"storeId":"123762-HLND"},{"fulfillmentType":"TSHIP","qty":2,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TLND"}],"storeId":"123762-TLND"},{"fulfillmentType":"TSHIP","qty":1,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TTDI"}],"storeId":"123762-TTDI"},{"fulfillmentType":"TSHIP","qty":2,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HRGD"}],"storeId":"123762-HRGD"},{"fulfillmentType":"TSHIP","qty":2,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TMVG"}],"storeId":"123762-TMVG"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HAMN"}],"storeId":"123762-HAMN"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HGMN"}],"storeId":"123762-HGMN"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TUGN"}],"storeId":"123762-TUGN"},{"fulfillmentType":"TSHIP","qty":2,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HSMG"}],"storeId":"123762-HSMG"},{"fulfillmentType":"TSHIP","qty":29,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TMAN"}],"storeId":"123762-TMAN"},{"fulfillmentType":"TSHIP","qty":2,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TAGH"}],"storeId":"123762-TAGH"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HGHN"}],"storeId":"123762-HGHN"},{"fulfillmentType":"TSHIP","qty":6,"serviceableSlaves":[{"priority":"1","slaveId":"123762-FMMG"}],"storeId":"123762-FMMG"}],"inventory":"29","isCOD":false,"type":"CNC"},{"fulfilmentType":"TSHIP","inventory":"301","isCOD":true,"serviceableSlaves":[{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P001","slaveId":"123762-HLND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P002","slaveId":"123762-TMAN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P003","slaveId":"123762-TKND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P004","slaveId":"123762-FKND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P005","slaveId":"123762-TTDI"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P006","slaveId":"123762-HRGD"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P007","slaveId":"123762-TKBN"},{"codEligible":"Y","logisticsID":"EKART","priority":"P008","slaveId":"123762-HSTE"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P009","slaveId":"123762-TLND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P010","slaveId":"123762-HAMN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P011","slaveId":"123762-TCPS"},{"codEligible":"Y","logisticsID":"EKART","priority":"P012","slaveId":"123762-TLDN"},{"codEligible":"Y","logisticsID":"EKART","priority":"P013","slaveId":"123762-TSES"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P014","slaveId":"123762-HCPD"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P015","slaveId":"123762-HKBD"},{"codEligible":"Y","logisticsID":"EKART","priority":"P017","slaveId":"123762-CFANDLH"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P019","slaveId":"123762-HARD"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P020","slaveId":"123762-HGHW"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P021","slaveId":"123762-HJJN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P022","slaveId":"123762-TPSS"},{"codEligible":"Y","logisticsID":"EKART","priority":"P023","slaveId":"123762-HSRB"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P024","slaveId":"123762-TUGN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P025","slaveId":"123762-HANA"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P026","slaveId":"123762-TMVG"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P027","slaveId":"123762-TLRM"},{"codEligible":"Y","logisticsID":"EKART","priority":"P028","slaveId":"123762-FFBK"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P029","slaveId":"123762-TACS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P030","slaveId":"123762-HJAY"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P031","slaveId":"123762-TCSS"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P032","slaveId":"123762-HNMW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P033","slaveId":"123762-HCEN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P034","slaveId":"123762-HLPM"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P035","slaveId":"123762-SHSR"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P036","slaveId":"123762-TWEA"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P037","slaveId":"123762-FCMH"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P038","slaveId":"123762-TEKS"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P039","slaveId":"123762-THHS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P040","slaveId":"123762-HGMN"},{"codEligible":"Y","logisticsID":"FEDEX","priority":"P041","slaveId":"123762-FMMG"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P042","slaveId":"123762-TLSS"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P043","slaveId":"123762-HDUW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P044","slaveId":"123762-FCBM"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P045","slaveId":"123762-TLKN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P046","slaveId":"123762-TSPS"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P047","slaveId":"123762-TMPN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P048","slaveId":"123762-TGJB"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P049","slaveId":"123762-TLPM"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P050","slaveId":"123762-TGHS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P051","slaveId":"123762-HBUB"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P052","slaveId":"123762-HEMC"},{"codEligible":"Y","logisticsID":"EKART","priority":"P053","slaveId":"123762-HSMG"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P054","slaveId":"123762-FFCR"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P055","slaveId":"123762-THYJ"},{"codEligible":"Y","logisticsID":"EKART","priority":"P056","slaveId":"123762-HJMI"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P057","slaveId":"123762-HPHM"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P058","slaveId":"123762-TMRB"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P059","slaveId":"123762-HSMW"},{"codEligible":"Y","logisticsID":"EKART","priority":"P060","slaveId":"123762-TJRN"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P061","slaveId":"123762-HAVA"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P062","slaveId":"123762-HKMS"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P063","slaveId":"123762-WBHI"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P064","slaveId":"123762-HKMM"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P065","slaveId":"123762-TAGH"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P066","slaveId":"123762-FPMW"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P068","slaveId":"123762-TGRT"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P069","slaveId":"123762-THZL"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P070","slaveId":"123762-HOMM"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P071","slaveId":"123762-HRBP"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P072","slaveId":"123762-HLTW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P073","slaveId":"123762-HHVN"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P074","slaveId":"123762-THRB"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P075","slaveId":"123762-TKPM"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P076","slaveId":"123762-FKKS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P077","slaveId":"123762-TINB"},{"codEligible":"Y","logisticsID":"EKART","priority":"P078","slaveId":"123762-HMTB"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P079","slaveId":"123762-TDHN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P080","slaveId":"123762-HWHT"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P081","slaveId":"123762-TAPW"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P082","slaveId":"123762-HGNL"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P083","slaveId":"123762-HLPN"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P084","slaveId":"123762-HKHB"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P085","slaveId":"123762-TRMW"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P087","slaveId":"123762-TVMW"},{"codEligible":"Y","logisticsID":"EKART","priority":"P088","slaveId":"123762-HJUP"},{"codEligible":"Y","logisticsID":"EKART","priority":"P089","slaveId":"123762-HVIS"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P090","slaveId":"123762-HGHN"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P091","slaveId":"123762-HMAW"},{"codEligible":"Y","logisticsID":"EKART","priority":"P092","slaveId":"123762-HASW"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P093","slaveId":"123762-TTMW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P094","slaveId":"123762-HMBW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P095","slaveId":"123762-HTBR"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P096","slaveId":"123762-HMPB"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P097","slaveId":"123762-HVTM"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P098","slaveId":"123762-HTMW"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P099","slaveId":"123762-HBAW"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P100","slaveId":"123762-TDBB"}],"type":"HD"},{"fulfilmentType":"TSHIP","inventory":"53","isCOD":true,"serviceableSlaves":[{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P001","slaveId":"123762-TSES"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P003","slaveId":"123762-TLND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P004","slaveId":"123762-TMAN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P005","slaveId":"123762-TKBN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P008","slaveId":"123762-FKND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P009","slaveId":"123762-TCPS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P010","slaveId":"123762-TKND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P012","slaveId":"123762-TLDN"}],"type":"ED"},{"fulfilmentType":"TSHIP","inventory":"1963","isCOD":false,"serviceableSlaves":[{"codEligible":"Y","logisticsID":"GATI","priority":"P001","slaveId":"777777-1122334455"},{"codEligible":"Y","logisticsID":"GATI","priority":"P002","slaveId":"777777-7788994455"},{"codEligible":"Y","logisticsID":"GATI","priority":"P003","slaveId":"777777-CNCBKC"}],"type":"SDD"}]}]}}]}

      //valid one with all delivery modes
      //resultJson = {}

      //Product not serviceable
      /*              resultJson =   {
              "type" : "pinWsDto",
              "productNotServiceabilityMessage": "* This item is non serviceable at your PIN code",
             "city": "New Delhi",
              "listOfDataList" : [ {
                 "key" : "MP000000005291532",
                 "value" : {
                    "pincodeListResponse" : [
                      {
                        
                      } 
                      ]
                 }
              } ]
           }
   */

      //Product out of stock
      /*         resultJson =  {
            "type" : "pinWsDto",
            "productOutOfStockMessage": "* This item is currently out of stock",
           "city": "New Delhi",
            "listOfDataList" : [ {
               "key" : "MP000000005291532",
               "value" : {
                  "pincodeListResponse" : [
                    {
                      
                    } 
                    ]
               }
            } ]
         } */

      //SDD, CNC, HD
      //resultJson = {"type":"pinWsDto","city":"New Delhi","listOfDataList":[{"key":"MP000000005291532","value":{"pincodeListResponse":[{"cod":"Y","exchangeServiceable":false,"isCODLimitFailed":"N","isPrepaidEligible":"Y","isServicable":"Y","stockCount":28,"ussid":"1237628141WM01","quickDeliveryMode":"Y","validDeliveryModes":[{"deliveryDate":"01-07-2020 19:00:00","CNCServiceableSlavesData":[{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TCPS"}],"storeId":"123762-TCPS"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HCPD"}],"storeId":"123762-HCPD"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HKBD"}],"storeId":"123762-HKBD"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TKBN"}],"storeId":"123762-TKBN"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-FKND"}],"storeId":"123762-FKND"},{"fulfillmentType":"TSHIP","qty":2,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TKND"}],"storeId":"123762-TKND"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HSTE"}],"storeId":"123762-HSTE"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HLND"}],"storeId":"123762-HLND"},{"fulfillmentType":"TSHIP","qty":1,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TLND"}],"storeId":"123762-TLND"},{"fulfillmentType":"TSHIP","qty":1,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TTDI"}],"storeId":"123762-TTDI"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HRGD"}],"storeId":"123762-HRGD"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TMVG"}],"storeId":"123762-TMVG"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HAMN"}],"storeId":"123762-HAMN"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HGMN"}],"storeId":"123762-HGMN"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TUGN"}],"storeId":"123762-TUGN"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HSMG"}],"storeId":"123762-HSMG"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TMAN"}],"storeId":"123762-TMAN"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TAGH"}],"storeId":"123762-TAGH"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HGHN"}],"storeId":"123762-HGHN"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-FMMG"}],"storeId":"123762-FMMG"}],"inventory":"2","isCOD":false,"type":"CNC"},{"deliveryDate":"01-11-2020 19:00:00","fulfilmentType":"TSHIP","inventory":"28","isCOD":true,"serviceableSlaves":[{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P001","slaveId":"123762-HLND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P002","slaveId":"123762-TMAN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P003","slaveId":"123762-TKND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P004","slaveId":"123762-FKND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P005","slaveId":"123762-TTDI"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P006","slaveId":"123762-HRGD"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P007","slaveId":"123762-TKBN"},{"codEligible":"Y","logisticsID":"EKART","priority":"P008","slaveId":"123762-HSTE"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P009","slaveId":"123762-TLND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P010","slaveId":"123762-HAMN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P011","slaveId":"123762-TCPS"},{"codEligible":"Y","logisticsID":"EKART","priority":"P012","slaveId":"123762-TLDN"},{"codEligible":"Y","logisticsID":"EKART","priority":"P013","slaveId":"123762-TSES"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P014","slaveId":"123762-HCPD"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P015","slaveId":"123762-HKBD"},{"codEligible":"Y","logisticsID":"EKART","priority":"P017","slaveId":"123762-CFANDLH"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P019","slaveId":"123762-HARD"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P020","slaveId":"123762-HGHW"},{"codEligible":"Y","logisticsID":"EKART","priority":"P021","slaveId":"123762-HJJN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P022","slaveId":"123762-TPSS"},{"codEligible":"Y","logisticsID":"EKART","priority":"P023","slaveId":"123762-HSRB"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P024","slaveId":"123762-TUGN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P025","slaveId":"123762-HANA"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P026","slaveId":"123762-TMVG"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P027","slaveId":"123762-TLRM"},{"codEligible":"Y","logisticsID":"EKART","priority":"P028","slaveId":"123762-FFBK"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P029","slaveId":"123762-TACS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P030","slaveId":"123762-HJAY"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P031","slaveId":"123762-TCSS"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P032","slaveId":"123762-HNMW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P033","slaveId":"123762-HCEN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P034","slaveId":"123762-HLPM"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P035","slaveId":"123762-SHSR"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P036","slaveId":"123762-TWEA"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P037","slaveId":"123762-FCMH"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P038","slaveId":"123762-TEKS"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P039","slaveId":"123762-THHS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P040","slaveId":"123762-HGMN"},{"codEligible":"Y","logisticsID":"FEDEX","priority":"P041","slaveId":"123762-FMMG"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P042","slaveId":"123762-TLSS"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P043","slaveId":"123762-HDUW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P044","slaveId":"123762-FCBM"},{"codEligible":"Y","logisticsID":"EKART","priority":"P045","slaveId":"123762-TLKN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P046","slaveId":"123762-TSPS"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P047","slaveId":"123762-TMPN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P048","slaveId":"123762-TGJB"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P049","slaveId":"123762-TLPM"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P050","slaveId":"123762-TGHS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P051","slaveId":"123762-HBUB"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P052","slaveId":"123762-HEMC"},{"codEligible":"Y","logisticsID":"EKART","priority":"P053","slaveId":"123762-HSMG"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P054","slaveId":"123762-FFCR"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P055","slaveId":"123762-THYJ"},{"codEligible":"Y","logisticsID":"EKART","priority":"P056","slaveId":"123762-HJMI"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P057","slaveId":"123762-HPHM"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P058","slaveId":"123762-TMRB"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P059","slaveId":"123762-HSMW"},{"codEligible":"Y","logisticsID":"EKART","priority":"P060","slaveId":"123762-TJRN"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P061","slaveId":"123762-HAVA"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P062","slaveId":"123762-HKMS"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P063","slaveId":"123762-WBHI"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P064","slaveId":"123762-HKMM"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P065","slaveId":"123762-TAGH"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P066","slaveId":"123762-FPMW"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P068","slaveId":"123762-TGRT"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P069","slaveId":"123762-THZL"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P070","slaveId":"123762-HOMM"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P071","slaveId":"123762-HRBP"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P072","slaveId":"123762-HLTW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P073","slaveId":"123762-HHVN"},{"codEligible":"Y","logisticsID":"EKART","priority":"P074","slaveId":"123762-THRB"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P075","slaveId":"123762-TKPM"},{"codEligible":"Y","logisticsID":"EKART","priority":"P076","slaveId":"123762-FKKS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P077","slaveId":"123762-TINB"},{"codEligible":"Y","logisticsID":"EKART","priority":"P078","slaveId":"123762-HMTB"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P079","slaveId":"123762-TDHN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P080","slaveId":"123762-HWHT"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P081","slaveId":"123762-TAPW"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P082","slaveId":"123762-HGNL"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P083","slaveId":"123762-HLPN"},{"codEligible":"Y","logisticsID":"EKART","priority":"P084","slaveId":"123762-HKHB"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P085","slaveId":"123762-TRMW"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P087","slaveId":"123762-TVMW"},{"codEligible":"Y","logisticsID":"EKART","priority":"P088","slaveId":"123762-HJUP"},{"codEligible":"Y","logisticsID":"EKART","priority":"P089","slaveId":"123762-HVIS"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P090","slaveId":"123762-HGHN"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P091","slaveId":"123762-HMAW"},{"codEligible":"Y","logisticsID":"EKART","priority":"P092","slaveId":"123762-HASW"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P093","slaveId":"123762-TTMW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P094","slaveId":"123762-HMBW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P095","slaveId":"123762-HTBR"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P096","slaveId":"123762-HMPB"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P097","slaveId":"123762-HVTM"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P098","slaveId":"123762-HTMW"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P099","slaveId":"123762-HBAW"},{"codEligible":"Y","logisticsID":"FEDEX","priority":"P100","slaveId":"123762-TDBB"}],"type":"HD"},{"deliveryDate":"01-07-2020 19:00:00","cutoffTime":4800,"fulfilmentType":"TSHIP","inventory":"3","isCOD":true,"serviceableSlaves":[{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P001","slaveId":"123762-TSES"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P003","slaveId":"123762-TLND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P004","slaveId":"123762-TMAN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P005","slaveId":"123762-TKBN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P008","slaveId":"123762-FKND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P009","slaveId":"123762-TCPS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P010","slaveId":"123762-TKND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P012","slaveId":"123762-TLDN"}],"type":"SDD"}]}]}}]}

      //ED, CNC, HD
      //resultJson = {"type":"pinWsDto","city":"New Delhi","listOfDataList":[{"key":"MP000000005291532","value":{"pincodeListResponse":[{"cod":"Y","exchangeServiceable":false,"isCODLimitFailed":"N","isPrepaidEligible":"Y","isServicable":"Y","stockCount":28,"ussid":"1237628141WM01","quickDeliveryMode":"Y","validDeliveryModes":[{"deliveryDate":"01-07-2020 19:00:00","CNCServiceableSlavesData":[{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TCPS"}],"storeId":"123762-TCPS"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HCPD"}],"storeId":"123762-HCPD"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HKBD"}],"storeId":"123762-HKBD"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TKBN"}],"storeId":"123762-TKBN"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-FKND"}],"storeId":"123762-FKND"},{"fulfillmentType":"TSHIP","qty":2,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TKND"}],"storeId":"123762-TKND"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HSTE"}],"storeId":"123762-HSTE"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HLND"}],"storeId":"123762-HLND"},{"fulfillmentType":"TSHIP","qty":1,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TLND"}],"storeId":"123762-TLND"},{"fulfillmentType":"TSHIP","qty":1,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TTDI"}],"storeId":"123762-TTDI"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HRGD"}],"storeId":"123762-HRGD"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TMVG"}],"storeId":"123762-TMVG"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HAMN"}],"storeId":"123762-HAMN"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HGMN"}],"storeId":"123762-HGMN"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TUGN"}],"storeId":"123762-TUGN"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HSMG"}],"storeId":"123762-HSMG"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TMAN"}],"storeId":"123762-TMAN"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-TAGH"}],"storeId":"123762-TAGH"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-HGHN"}],"storeId":"123762-HGHN"},{"fulfillmentType":"TSHIP","qty":0,"serviceableSlaves":[{"priority":"1","slaveId":"123762-FMMG"}],"storeId":"123762-FMMG"}],"inventory":"2","isCOD":false,"type":"CNC"},{"deliveryDate":"01-11-2020 19:00:00","fulfilmentType":"TSHIP","inventory":"28","isCOD":true,"serviceableSlaves":[{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P001","slaveId":"123762-HLND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P002","slaveId":"123762-TMAN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P003","slaveId":"123762-TKND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P004","slaveId":"123762-FKND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P005","slaveId":"123762-TTDI"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P006","slaveId":"123762-HRGD"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P007","slaveId":"123762-TKBN"},{"codEligible":"Y","logisticsID":"EKART","priority":"P008","slaveId":"123762-HSTE"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P009","slaveId":"123762-TLND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P010","slaveId":"123762-HAMN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P011","slaveId":"123762-TCPS"},{"codEligible":"Y","logisticsID":"EKART","priority":"P012","slaveId":"123762-TLDN"},{"codEligible":"Y","logisticsID":"EKART","priority":"P013","slaveId":"123762-TSES"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P014","slaveId":"123762-HCPD"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P015","slaveId":"123762-HKBD"},{"codEligible":"Y","logisticsID":"EKART","priority":"P017","slaveId":"123762-CFANDLH"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P019","slaveId":"123762-HARD"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P020","slaveId":"123762-HGHW"},{"codEligible":"Y","logisticsID":"EKART","priority":"P021","slaveId":"123762-HJJN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P022","slaveId":"123762-TPSS"},{"codEligible":"Y","logisticsID":"EKART","priority":"P023","slaveId":"123762-HSRB"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P024","slaveId":"123762-TUGN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P025","slaveId":"123762-HANA"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P026","slaveId":"123762-TMVG"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P027","slaveId":"123762-TLRM"},{"codEligible":"Y","logisticsID":"EKART","priority":"P028","slaveId":"123762-FFBK"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P029","slaveId":"123762-TACS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P030","slaveId":"123762-HJAY"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P031","slaveId":"123762-TCSS"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P032","slaveId":"123762-HNMW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P033","slaveId":"123762-HCEN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P034","slaveId":"123762-HLPM"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P035","slaveId":"123762-SHSR"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P036","slaveId":"123762-TWEA"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P037","slaveId":"123762-FCMH"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P038","slaveId":"123762-TEKS"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P039","slaveId":"123762-THHS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P040","slaveId":"123762-HGMN"},{"codEligible":"Y","logisticsID":"FEDEX","priority":"P041","slaveId":"123762-FMMG"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P042","slaveId":"123762-TLSS"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P043","slaveId":"123762-HDUW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P044","slaveId":"123762-FCBM"},{"codEligible":"Y","logisticsID":"EKART","priority":"P045","slaveId":"123762-TLKN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P046","slaveId":"123762-TSPS"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P047","slaveId":"123762-TMPN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P048","slaveId":"123762-TGJB"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P049","slaveId":"123762-TLPM"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P050","slaveId":"123762-TGHS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P051","slaveId":"123762-HBUB"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P052","slaveId":"123762-HEMC"},{"codEligible":"Y","logisticsID":"EKART","priority":"P053","slaveId":"123762-HSMG"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P054","slaveId":"123762-FFCR"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P055","slaveId":"123762-THYJ"},{"codEligible":"Y","logisticsID":"EKART","priority":"P056","slaveId":"123762-HJMI"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P057","slaveId":"123762-HPHM"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P058","slaveId":"123762-TMRB"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P059","slaveId":"123762-HSMW"},{"codEligible":"Y","logisticsID":"EKART","priority":"P060","slaveId":"123762-TJRN"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P061","slaveId":"123762-HAVA"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P062","slaveId":"123762-HKMS"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P063","slaveId":"123762-WBHI"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P064","slaveId":"123762-HKMM"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P065","slaveId":"123762-TAGH"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P066","slaveId":"123762-FPMW"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P068","slaveId":"123762-TGRT"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P069","slaveId":"123762-THZL"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P070","slaveId":"123762-HOMM"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P071","slaveId":"123762-HRBP"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P072","slaveId":"123762-HLTW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P073","slaveId":"123762-HHVN"},{"codEligible":"Y","logisticsID":"EKART","priority":"P074","slaveId":"123762-THRB"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P075","slaveId":"123762-TKPM"},{"codEligible":"Y","logisticsID":"EKART","priority":"P076","slaveId":"123762-FKKS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P077","slaveId":"123762-TINB"},{"codEligible":"Y","logisticsID":"EKART","priority":"P078","slaveId":"123762-HMTB"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P079","slaveId":"123762-TDHN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P080","slaveId":"123762-HWHT"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P081","slaveId":"123762-TAPW"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P082","slaveId":"123762-HGNL"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P083","slaveId":"123762-HLPN"},{"codEligible":"Y","logisticsID":"EKART","priority":"P084","slaveId":"123762-HKHB"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P085","slaveId":"123762-TRMW"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P087","slaveId":"123762-TVMW"},{"codEligible":"Y","logisticsID":"EKART","priority":"P088","slaveId":"123762-HJUP"},{"codEligible":"Y","logisticsID":"EKART","priority":"P089","slaveId":"123762-HVIS"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P090","slaveId":"123762-HGHN"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P091","slaveId":"123762-HMAW"},{"codEligible":"Y","logisticsID":"EKART","priority":"P092","slaveId":"123762-HASW"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P093","slaveId":"123762-TTMW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P094","slaveId":"123762-HMBW"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P095","slaveId":"123762-HTBR"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P096","slaveId":"123762-HMPB"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P097","slaveId":"123762-HVTM"},{"codEligible":"Y","logisticsID":"BLUEDART","priority":"P098","slaveId":"123762-HTMW"},{"codEligible":"Y","logisticsID":"XPRESSC","priority":"P099","slaveId":"123762-HBAW"},{"codEligible":"Y","logisticsID":"FEDEX","priority":"P100","slaveId":"123762-TDBB"}],"type":"HD"},{"deliveryDate":"01-07-2020 19:00:00","fulfilmentType":"TSHIP","inventory":"3","isCOD":true,"serviceableSlaves":[{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P001","slaveId":"123762-TSES"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P003","slaveId":"123762-TLND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P004","slaveId":"123762-TMAN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P005","slaveId":"123762-TKBN"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P008","slaveId":"123762-FKND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P009","slaveId":"123762-TCPS"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P010","slaveId":"123762-TKND"},{"codEligible":"Y","logisticsID":"DELHIVERY","priority":"P012","slaveId":"123762-TLDN"}],"type":"ED"}]}]}}]}
      /*
      //SDD, CNC

      //HD, CNC
      resultJson =

      //SDD, HD

      //ED, HD

      //ED(tomorrow), CNC
      resultJson =

      //ED(!tomorrow), CNC
      resultJson =

      //HD
      resultJson =

      //ED(tomorrow)
      resultJson =

      //ED(!tomorrow)
      resultJson =

      //SDD
      resultJson =

      //CNC
      resultJson =

      */

      let cncDeliveryModes = "";
      let getDeliveryModesByWinningUssid = "";
      if (
        isComingFromPiqPage &&
        resultJson &&
        resultJson.listOfDataList &&
        resultJson.listOfDataList[0] &&
        resultJson.listOfDataList[0].value &&
        resultJson.listOfDataList[0].value.pincodeListResponse
      ) {
        getDeliveryModesByWinningUssid = resultJson.listOfDataList[0].value.pincodeListResponse.find(
          val => {
            return val.ussid === winningUssID;
          }
        );
      }
      if (
        isComingFromPiqPage &&
        getDeliveryModesByWinningUssid &&
        getDeliveryModesByWinningUssid.validDeliveryModes
      ) {
        cncDeliveryModes = getDeliveryModesByWinningUssid.validDeliveryModes.find(
          val => {
            return val.type === "CNC";
          }
        );
      }
      /*       if (
        (resultJson && resultJson.productOutOfStockMessage) ||
        (resultJson && resultJson.productNotServiceabilityMessage) 
      ) {
        dispatch('an action to update productDetails to have this message under isServiceable message');
      } */
      if (
        resultJson &&
        resultJson.listOfDataList &&
        resultJson.listOfDataList[0] &&
        resultJson.listOfDataList[0].value &&
        Object.keys(resultJson.listOfDataList[0].value).length === 0
      ) {
        dispatch(displayToast("please enter a valid pincode"));
      } else if (
        isComingFromPiqPage &&
        getDeliveryModesByWinningUssid &&
        (!getDeliveryModesByWinningUssid.validDeliveryModes ||
          !cncDeliveryModes ||
          !cncDeliveryModes.CNCServiceableSlavesData)
      ) {
        dispatch(
          displayToast(
            "Unfortunately, we're currently unable to ship this item to your PIN code. Can we ship it to another address?"
          )
        );
        dispatch(hidePdpPiqPage());
        window.scroll({
          top: 230,
          behavior: "smooth"
        });
      }
      return dispatch(
        getProductPinCodeSuccess({
          pinCode,
          deliveryOptions: resultJson.listOfDataList[0].value,
          city: resultJson.city
        })
      );
      if (isComingFromPiqPage) {
        dispatch(getAllStoresForCliqAndPiq());
      }
    } catch (e) {
      return dispatch(getProductPinCodeFailure(e.message));
    }
  };
}

export function addProductToCartRequest() {
  return {
    type: ADD_PRODUCT_TO_CART_REQUEST,
    status: REQUESTING
  };
}
export function addProductToCartSuccess(newProduct) {
  return {
    type: ADD_PRODUCT_TO_CART_SUCCESS,
    status: SUCCESS,
    newProduct
  };
}

export function addProductToCartFailure(error) {
  return {
    type: ADD_PRODUCT_TO_CART_FAILURE,
    status: ERROR,
    error
  };
}

export function addProductToCart(productDetails) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  let accessToken = globalCookie ? JSON.parse(globalCookie).access_token : null;
  let userId = ANONYMOUS_USER;
  let cartDetails;
  if (userDetails && customerCookie) {
    userId = JSON.parse(userDetails).userName;
    accessToken = JSON.parse(customerCookie).access_token;
    cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  } else {
    cartDetails = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
  }
  let cartId = cartDetails ? JSON.parse(cartDetails).code : null;

  return async (dispatch, getState, { api }) => {
    dispatch(addProductToCartRequest());
    try {
      const result = await api.post(
        `${PRODUCT_DETAILS_PATH}/${userId}/carts/${
          cartId ? cartId + "/" : ""
        }productAdditionToCart?access_token=${accessToken}&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&productCode=${
          productDetails.code
        }&USSID=${productDetails.ussId}&quantity=${
          productDetails.quantity
        }&addedToCartWl=false&channel=${CHANNEL}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      //set local storage
      let bagItem = localStorage.getItem(CART_BAG_DETAILS);
      let bagItemsInJsonFormat = bagItem ? JSON.parse(bagItem) : [];
      if (!bagItemsInJsonFormat.includes(productDetails.ussId)) {
        bagItemsInJsonFormat.push(productDetails.ussId);
      }
      localStorage.setItem(
        CART_BAG_DETAILS,
        JSON.stringify(bagItemsInJsonFormat)
      );

      // here we dispatch a modal to show something was added to the bag
      dispatch(setBagCount(bagItemsInJsonFormat.length));
      setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_ADD_TO_BAG_EVENT);

      return dispatch(addProductToCartSuccess(resultJson));
      // ADOBE_ADD_TO_CART
    } catch (e) {
      return dispatch(addProductToCartFailure(e.message));
    }
  };
}

export function getProductSizeGuideRequest() {
  return {
    type: PRODUCT_SIZE_GUIDE_REQUEST,
    status: REQUESTING
  };
}
export function getProductSizeGuideSuccess(sizeGuide) {
  return {
    type: PRODUCT_SIZE_GUIDE_SUCCESS,
    status: SUCCESS,
    sizeGuide
  };
}

export function getProductSizeGuideFailure(error) {
  return {
    type: PRODUCT_SIZE_GUIDE_FAILURE,
    status: ERROR,
    error
  };
}

export function getProductSizeChartRequest() {
  return {
    type: PRODUCT_SIZE_CHART_REQUEST,
    status: REQUESTING
  };
}
export function getProductSizeChartSuccess(sizeChart) {
  return {
    type: PRODUCT_SIZE_CHART_SUCCESS,
    status: SUCCESS,
    sizeChart
  };
}

export function getProductSizeChartFailure(error) {
  return {
    type: PRODUCT_SIZE_CHART_FAILURE,
    status: ERROR,
    error
  };
}

export function getProductSizeGuide(productCode) {
  return async (dispatch, getState, { api }) => {
    dispatch(getProductSizeGuideRequest());
    try {
      const result = await api.getMiddlewareUrl(
        `${PRODUCT_SIZE_GUIDE_PATH}${productCode}/sizeGuide?isPwa=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(getProductSizeGuideSuccess(resultJson));
    } catch (e) {
      dispatch(getProductSizeGuideFailure(e.message));
    }
  };
}

export function getProductSizeChart(productCode) {
  return async (dispatch, getState, { api }) => {
    dispatch(getProductSizeChartRequest());
    try {
      const result = await api.getMiddlewareUrl(
        `${PRODUCT_SIZE_GUIDE_PATH}${productCode}/sizeGuideChart?isPwa=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getProductSizeChartSuccess(resultJson));
    } catch (e) {
      dispatch(getProductSizeChartFailure(e));
    }
  };
}

export function getEmiTermsRequest() {
  return {
    type: GET_EMI_TERMS_AND_CONDITIONS_REQUEST,
    status: REQUESTING
  };
}

export function getEmiTermsSuccess(emiTerms) {
  return {
    type: GET_EMI_TERMS_AND_CONDITIONS_SUCCESS,
    status: SUCCESS,
    emiTerms
  };
}

export function getEmiTermsFailure(error) {
  return {
    type: GET_EMI_TERMS_AND_CONDITIONS_FAILURE,
    status: FAILURE,
    error
  };
}

export function getEmiTerms(accessToken, productValue) {
  return async (dispatch, getState, { api }) => {
    dispatch(getEmiTermsRequest());
    try {
      const url = `${EMI_TERMS_PATH}?access_token=${accessToken}&productValue=${productValue}`;
      const result = await api.get(url);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(getEmiTermsSuccess(resultJson));
    } catch (e) {
      dispatch(getEmiTermsFailure(e.message));
    }
  };
}

export function getPdpEmiRequest() {
  return {
    type: PRODUCT_PDP_EMI_REQUEST,
    status: REQUESTING
  };
}
export function getPdpEmiSuccess(emiResult) {
  return {
    type: PRODUCT_PDP_EMI_SUCCESS,
    status: SUCCESS,
    emiResult
  };
}

export function getPdpEmiFailure(error) {
  return {
    type: PRODUCT_PDP_EMI_FAILURE,
    status: ERROR,
    error
  };
}
export function getPdpEmi(token, cartValue, productCode, ussId) {
  return async (dispatch, getState, { api }) => {
    dispatch(getPdpEmiRequest());
    try {
      const url = `${PRODUCT_PDP_EMI_PATH}?isPwa=true&channel=mobile&productValue=${cartValue}&ussids=${ussId}&productCode=${productCode}&nceFlag=true&access_token=${token}`;
      const result = await api.get(url);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getPdpEmiSuccess(resultJson));
    } catch (e) {
      dispatch(getPdpEmiFailure(e.message));
    }
  };
}

export function ProductSpecificationRequest() {
  return {
    type: PRODUCT_SPECIFICATION_REQUEST,
    status: REQUESTING
  };
}
export function ProductSpecificationSuccess(productDetails) {
  return {
    type: PRODUCT_SPECIFICATION_SUCCESS,
    status: SUCCESS,
    productDetails
  };
}

export function ProductSpecificationFailure(error) {
  return {
    type: PRODUCT_SPECIFICATION_FAILURE,
    status: ERROR,
    error
  };
}
export function getProductSpecification(productId) {
  return async (dispatch, getState, { api }) => {
    dispatch(ProductSpecificationRequest());
    try {
      const result = await api.getMiddlewareUrl(
        `${PRODUCT_SPECIFICATION_PATH}/${productId}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(ProductSpecificationSuccess(resultJson));
    } catch (e) {
      dispatch(ProductSpecificationFailure(e.message));
    }
  };
}

export function addProductReviewRequest() {
  return {
    type: ADD_PRODUCT_REVIEW_REQUEST,
    status: REQUESTING
  };
}
export function addProductReviewSuccess(productReview) {
  return {
    type: ADD_PRODUCT_REVIEW_SUCCESS,
    status: SUCCESS,
    productReview
  };
}

export function addProductReviewFailure(error) {
  return {
    type: ADD_PRODUCT_REVIEW_FAILURE,
    status: ERROR,
    error
  };
}

export function addProductReview(productCode, productReview) {
  let reviewData = new FormData();
  reviewData.append("comment", productReview.comment);
  reviewData.append("rating", productReview.rating);
  reviewData.append("headline", productReview.headline);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(addProductReviewRequest());
    try {
      const result = await api.postFormData(
        `${PRODUCT_SIZE_GUIDE_PATH}${productCode}/reviews?access_token=${
          JSON.parse(customerCookie).access_token
        }`,
        reviewData
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(displayToast(SUBMIT_REVIEW_TEXT));
      setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_SUBMIT_REVIEW);
      return dispatch(addProductReviewSuccess(productReview));
    } catch (e) {
      return dispatch(addProductReviewFailure(e.message));
    }
  };
}

export function editProductReviewRequest() {
  return {
    type: EDIT_PRODUCT_REVIEW_REQUEST,
    status: REQUESTING
  };
}
export function editProductReviewSuccess() {
  return {
    type: EDIT_PRODUCT_REVIEW_SUCCESS,
    status: SUCCESS
  };
}

export function editProductReviewFailure(error) {
  return {
    type: EDIT_PRODUCT_REVIEW_FAILURE,
    status: ERROR,
    error
  };
}

export function editProductReview(productCode, productReviews) {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(editProductReviewRequest());
    try {
      const result = await api.post(
        `${PRODUCT_SPECIFICATION_PATH}/${productCode}/reviews?access_token=${
          JSON.parse(customerCookie).access_token
        }&id={productReviews.id}&comment=${productReviews.comment}&rating=${
          productReviews.rating
        }&headline=${productReviews.headLine}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(editProductReviewSuccess());
    } catch (e) {
      dispatch(editProductReviewFailure(e.message));
    }
  };
}

export function deleteProductReviewRequest() {
  return {
    type: DELETE_PRODUCT_REVIEW_REQUEST,
    status: REQUESTING
  };
}
export function deleteProductReviewSuccess() {
  return {
    type: DELETE_PRODUCT_REVIEW_SUCCESS,
    status: SUCCESS
  };
}

export function deleteProductReviewFailure(error) {
  return {
    type: DELETE_PRODUCT_REVIEW_FAILURE,
    status: ERROR,
    error
  };
}

export function deleteProductReview(productCode, reviewId) {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(deleteProductReviewRequest());
    try {
      const result = await api.get(
        `${PRODUCT_SPECIFICATION_PATH}/${productCode}/reviewId/deleteReview?access_token=${
          JSON.parse(customerCookie).access_token
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(deleteProductReviewSuccess());
    } catch (e) {
      dispatch(deleteProductReviewFailure(e.message));
    }
  };
}

export function getProductReviewsRequest() {
  return {
    type: GET_PRODUCT_REVIEW_REQUEST,
    status: REQUESTING
  };
}
export function getProductReviewsSuccess(reviews) {
  return {
    type: GET_PRODUCT_REVIEW_SUCCESS,
    status: SUCCESS,
    reviews
  };
}

export function getProductReviewsFailure(error) {
  return {
    type: GET_PRODUCT_REVIEW_FAILURE,
    status: ERROR,
    error
  };
}

export function getProductReviews(productCode, pageIndex, orderBy, sortBy) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  let accessToken, userName;
  if (userDetails && customerCookie) {
    userName = JSON.parse(userDetails).userName;
    accessToken = JSON.parse(customerCookie).access_token;
  } else {
    userName = ANONYMOUS_USER;
    accessToken = globalCookie && JSON.parse(globalCookie).access_token;
  }
  return async (dispatch, getState, { api }) => {
    dispatch(getProductReviewsRequest());
    try {
      const result = await api.get(
        `${PRODUCT_SIZE_GUIDE_PATH}${productCode.toUpperCase()}/users/${userName}/reviews?access_token=${accessToken}&page=${pageIndex}&pageSize=${PAGE_NUMBER}&orderBy=${orderBy}&sort=${sortBy}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(getProductReviewsSuccess(resultJson));
    } catch (e) {
      dispatch(getProductReviewsFailure(e.message));
    }
  };
}

export function followUnFollowBrandRequest() {
  return {
    type: FOLLOW_UN_FOLLOW_BRAND_REQUEST,
    status: REQUESTING
  };
}
export function followUnFollowBrandSuccess(brandDetails) {
  return {
    type: FOLLOW_UN_FOLLOW_BRAND_SUCCESS,
    status: SUCCESS,
    brandDetails
  };
}

export function followUnFollowBrandFailure(error) {
  return {
    type: FOLLOW_UN_FOLLOW_BRAND_FAILURE,
    status: ERROR,
    error
  };
}

export function followUnFollowBrand(brandCode) {
  return async (dispatch, getState, { api }) => {
    dispatch(followUnFollowBrandRequest());
    try {
      const currentFollowedStatus = getState().productDescription.aboutTheBrand
        .isFollowing;
      const isFollowing = !currentFollowedStatus;
      // getting market cloud id it is auto generated by use when use visti web MSSiteModeEvent
      // we just need to get it here
      const mcvId = await getMcvId();
      const result = await api.post(
        `${FOLLOW_UN_FOLLOW_PATH}/${mcvId}/updateFollowedBrands?brands=${brandCode}&follow=${isFollowing}&isPwa=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(followUnFollowBrandSuccess({ isFollowing }));
    } catch (e) {
      dispatch(followUnFollowBrandFailure(e.message));
    }
  };
}

export function productMsdRequest() {
  return {
    type: PRODUCT_MSD_REQUEST,
    status: REQUESTING
  };
}
export function productMsdSuccess(msdItems) {
  return {
    type: PRODUCT_MSD_SUCCESS,
    status: SUCCESS,
    msdItems
  };
}

export function productMsdFailure(error) {
  return {
    type: PRODUCT_MSD_FAILURE,
    status: ERROR,
    error
  };
}
export function getMsdRequest(
  productCode,
  similarProducts,
  filters,
  resultsRequired
) {
  return async (dispatch, getState, { api }) => {
    let msdRequestObject = new FormData();
    msdRequestObject.append("api_key", API_KEY);
    if (process.env.REACT_APP_STAGE === "qa2") {
      msdRequestObject.append("mad_uuid", QA2_MCV_ID);
    } else {
      const mcvId = await getMcvId();
      msdRequestObject.append("mad_uuid", mcvId);
    }
    if (similarProducts) {
      msdRequestObject.append("widget_list", JSON.stringify([0]));
    } else {
      msdRequestObject.append("widget_list", JSON.stringify(WIDGET_LIST));
    }
    if (resultsRequired !== undefined && resultsRequired.length) {
      msdRequestObject.append("num_results", JSON.stringify(resultsRequired));
    } else {
      msdRequestObject.append("num_results", JSON.stringify(NUMBER_RESULTS));
    }
    msdRequestObject.append("details", false);
    msdRequestObject.append("product_id", productCode.toUpperCase());
    if (filters) {
      msdRequestObject.append("filters", JSON.stringify(filters));
    }
    dispatch(productMsdRequest());
    try {
      const result = await api.postMsd(
        `${API_MSD_URL_ROOT}/${MSD_REQUEST_PATH}`,
        msdRequestObject
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      // if (process.env.REACT_APP_STAGE == "tmpprod") {
      //   resultJson.data[0] = SIMILAR_PRODUCTS_TMPPROD;
      // } else if (process.env.REACT_APP_STAGE === "qa2") {
      //   resultJson.data[0] = SIMILAR_PRODUCTS_QA2;
      // }

      if (resultJson.data[0] && resultJson.data[0].length > 0) {
        dispatch(
          getPdpItems(resultJson.data[0], RECOMMENDED_PRODUCTS_WIDGET_KEY)
        );
      } else {
        dispatch(getPdpItems([], RECOMMENDED_PRODUCTS_WIDGET_KEY));
      }
      if (resultJson.data[1] && resultJson.data[1].length > 0) {
        dispatch(getPdpItems(resultJson.data[1], SIMILAR_PRODUCTS_WIDGET_KEY));
      }
    } catch (e) {
      dispatch(productMsdFailure(e.message));
    }
  };
}
export function pdpAboutBrandRequest() {
  return {
    type: PDP_ABOUT_BRAND_REQUEST,
    status: REQUESTING
  };
}
export function pdpAboutBrandFailure(error) {
  return {
    type: PDP_ABOUT_BRAND_FAILURE,
    status: ERROR,
    error
  };
}
export function pdpAboutBrandSuccess(brandDetails) {
  return {
    type: PDP_ABOUT_BRAND_SUCCESS,
    status: SUCCESS,
    brandDetails
  };
}

export function pdpAboutBrand(productCode) {
  return async (dispatch, getState, { api }) => {
    let msdRequestObject = new FormData();
    msdRequestObject.append("api_key", API_KEY);
    msdRequestObject.append(
      "widget_list",
      JSON.stringify(WIDGET_LIST_FOR_ABOUT_BRAND)
    );
    msdRequestObject.append("num_results", JSON.stringify(NUMBER_RESULTS));
    const mcvId = await getMcvId();
    msdRequestObject.append("mad_uuid", mcvId);
    msdRequestObject.append("details", false);
    msdRequestObject.append("product_id", productCode.toUpperCase());

    dispatch(pdpAboutBrandRequest());
    try {
      // making call for fetch about brand and their items items
      // url may have to change as per api live get live
      const result = await api.postMsd(
        `${API_MSD_URL_ROOT}/${MSD_REQUEST_PATH}`,
        msdRequestObject
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      if (resultJson.data[0].itemIds.length > 0) {
        dispatch(
          getPdpItems(resultJson.data[0].itemIds, ABOUT_THE_BRAND_WIDGET_KEY)
        );
      }

      // updating reducer for follow brand  key
      dispatch(pdpAboutBrandSuccess(resultJson.data[0]));
    } catch (e) {
      dispatch(pdpAboutBrandFailure(e.message));
    }
  };
}
export function getPdpItemsPdpRequest() {
  return {
    type: GET_PDP_ITEMS_REQUEST,
    status: REQUESTING
  };
}
export function getPdpItemsPdpSuccess(items, widgetKey) {
  return {
    type: GET_PDP_ITEMS_SUCCESS,
    status: SUCCESS,
    items,
    widgetKey
  };
}
export function getPdpItemsFailure(errorMsg) {
  return {
    type: GET_PDP_ITEMS_FAILURE,
    error: errorMsg,
    status: FAILURE
  };
}

export function getPdpItems(itemIds, widgetKey) {
  return async (dispatch, getState, { api }) => {
    dispatch(getPdpItemsPdpRequest());
    try {
      // let productCodes;
      // each(itemIds, itemId => {
      //   productCodes = `${itemId},${productCodes}`;
      // });
      let productCodes = itemIds && itemIds.toString();
      const url = `v2/mpl/cms/page/getProductInfo?isPwa=true&productCodes=${productCodes}`;
      const result = await api.getMiddlewareUrl(url);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(getPdpItemsPdpSuccess(resultJson.results, widgetKey));
    } catch (e) {
      dispatch(getPdpItemsFailure(`MSD ${e.message}`));
    }
  };
}

//**Bundling product */
export function getbundleProductRequest() {
  return {
    type: BUNDLE_PRODUCT_REQUEST,
    status: REQUESTING
  };
}
export function getbundleProductSuccess(data) {
  return {
    type: BUNDLE_PRODUCT_SUCCESS,
    status: SUCCESS,
    data
  };
}
export function getbundleProductFailure() {
  return {
    type: BUNDLE_PRODUCT_FAILURE,
    status: FAILURE
  };
}
export function getBundleproduct(productCode, isApiCall = 0) {
  return async (dispatch, getState, { api }) => {
    dispatch(getbundleProductRequest());
    try {
      setTimeout(() => {
        if (getState().productDescription.getProductDetailsLoading) {
          dispatch(displayToast(LOW_INTERNET_CONNECTION_MESSAGE));
        }
      }, TIME_OUT_FOR_APIS);
      const result = await api.getMiddlewareUrl(
        `${PRODUCT_DESCRIPTION_PATH}/${productCode}?isPwa=true`
      );
      const resultJson = await result.json();
      if (
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === SUCCESS_CAMEL_CASE
      ) {
        return dispatch(getbundleProductSuccess(resultJson));
      } else {
        if (resultJson.status === 404 && isApiCall === 0) {
          isApiCall = isApiCall + 1;
          dispatch(getBundleproduct(productCode, isApiCall));
        } else {
          throw new Error(`${resultJson.error}`);
        }
      }
    } catch (e) {
      return dispatch(getbundleProductFailure(e.message));
    }
  };
}
//***Bundling end */

//NU-385 for Desktop
export function pdpOfferRequest() {
  return {
    type: PDP_OFFER_REQUEST,
    status: REQUESTING
  };
}

export function pdpOfferSuccess(offers, impulseOfferCalloutList) {
  return {
    type: PDP_OFFER_SUCCESS,
    status: SUCCESS,
    offers: offers,
    impulseOfferCalloutList: impulseOfferCalloutList
  };
}

export function pdpOfferFailure(error) {
  return {
    type: PDP_OFFER_FAILURE,
    status: ERROR,
    error: error
  };
}
export function getPdpOffers() {
  return async (dispatch, getState, { api }) => {
    dispatch(pdpOfferRequest());
    try {
      let productDetails = getState().productDescription.productDetails;
      let categoryCode =
        productDetails.categoryHierarchy[
          productDetails.categoryHierarchy.length - 1
        ].category_id;

      let brandCode = productDetails.brandURL.split("-");
      let brandCodeLength = brandCode.length;
      let brandCodeLast = brandCode[brandCodeLength - 1];
      const pdpOffersApi = await api.pdpOffersApi(
        productDetails.productListingId,
        productDetails.winningSellerID,
        categoryCode,
        brandCodeLast.toUpperCase()
      );
      const pdpOffersApiJson = await pdpOffersApi.json();

      if (pdpOffersApiJson.offerCalloutList) {
        dispatch(
          pdpOfferSuccess(
            pdpOffersApiJson.offerCalloutList,
            pdpOffersApiJson.impulseOfferCalloutList
              ? pdpOffersApiJson.impulseOfferCalloutList
              : []
          )
        );
      } else if (pdpOffersApiJson.impulseOfferCalloutList) {
        dispatch(pdpOfferSuccess([], pdpOffersApiJson.impulseOfferCalloutList));
      } else if (pdpOffersApiJson.status === "Success") {
        dispatch(pdpOfferSuccess([], []));
      } else {
        dispatch(pdpOfferFailure("error"));
      }
    } catch (e) {
      dispatch(pdpOfferFailure(e.message));
    }
  };
}
// Actions to get All Stores CNC
export function getAllStoresForCliqAndPiqRequest() {
  return {
    type: GET_ALL_STORES_FOR_CLIQ_AND_PIQ_REQUEST,
    status: REQUESTING
  };
}
export function getAllStoresForCliqAndPiqSuccess(storeDetails) {
  return {
    type: GET_ALL_STORES_FOR_CLIQ_AND_PIQ_SUCCESS,
    status: SUCCESS,
    storeDetails
  };
}

export function getAllStoresForCliqAndPiqFailure(error) {
  return {
    type: GET_ALL_STORES_FOR_CLIQ_AND_PIQ_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator for getting all stores CNC
export function getAllStoresForCliqAndPiq(
  newPinCode = null,
  isComingFromCliqAndPiq = false,
  isComingFromCheckoutPage = false
) {
  let pinCode;
  if (newPinCode && !isComingFromCliqAndPiq) {
    localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, newPinCode);
    pinCode = newPinCode;
  } else {
    pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
  }
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  let accessToken;
  if (customerCookie) {
    accessToken = JSON.parse(customerCookie).access_token;
  } else {
    accessToken = JSON.parse(globalCookie).access_token;
  }

  return async (dispatch, getState, { api }) => {
    dispatch(getAllStoresForCliqAndPiqRequest());
    try {
      const result = await api.get(
        `${ALL_STORES_FOR_CLIQ_AND_PIQ_PATH}/${pinCode}?access_token=${accessToken}`
      );

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getAllStoresForCliqAndPiqSuccess(resultJson.stores));
    } catch (e) {
      dispatch(getAllStoresForCliqAndPiqFailure(e.message));
    }
  };
}

export function showPdpPiqPage() {
  return {
    type: SHOW_PDP_PIQ_PAGE
  };
}
export function hidePdpPiqPage() {
  return {
    type: HIDE_PDP_PIQ_PAGE
  };
}

/******Bundled Product pincode issue */
export function getBundleProductPinCodeRequest() {
  return {
    type: CHECK_BUNDLE_PRODUCT_PIN_CODE_REQUEST,
    status: REQUESTING
  };
}
export function getBundleProductPinCodeSuccess(productPinCode) {
  return {
    type: CHECK_BUNDLE_PRODUCT_PIN_CODE_SUCCESS,
    status: SUCCESS,
    productPinCode,
    ussId: productPinCode.ussId
  };
}

export function getBundleProductPinCodeFailure(error) {
  return {
    type: CHECK_BUNDLE_PRODUCT_PIN_CODE_FAILURE,
    status: ERROR,
    error
  };
}

export function getBundleProductPinCode(pinCode = null, productCode, ussId) {
  let validProductCode = productCode.toUpperCase();

  if (pinCode) {
    localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, pinCode);
  }
  return async (dispatch, getState, { api }) => {
    dispatch(getBundleProductPinCodeRequest());
    try {
      let url;
      let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
      let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      if (userDetails) {
        let userName = JSON.parse(userDetails).userName;
        let accessToken = JSON.parse(customerCookie).access_token;
        url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}`;
      } else {
        let userName = ANONYMOUS_USER;
        let accessToken = JSON.parse(globalCookie).access_token;
        url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}`;
      }
      const result = await api.post(url);

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      // Checking listing Id
      let bundleProductResponse = resultJson.listOfDataList[0].value;
      let listOfAllBundleServiceableUssid;
      if (bundleProductResponse && bundleProductResponse.pincodeListResponse) {
        listOfAllBundleServiceableUssid = bundleProductResponse.pincodeListResponse.filter(
          delivery => {
            return delivery.isServicable === "Y";
          }
        );
      }
      let serviceableForExistingBundleProductSeller = listOfAllBundleServiceableUssid.find(
        seller => {
          return seller.ussid === ussId;
        }
      );
      if (serviceableForExistingBundleProductSeller.stockCount > 0) {
        return dispatch(
          getBundleProductPinCodeSuccess({
            pinCode,
            deliveryOptions: resultJson.listOfDataList[0].value,
            ussId
          })
        );
      } else {
        return dispatch(getBundleProductPinCodeFailure("stockCount:0"));
      }
    } catch (e) {
      return dispatch(getBundleProductPinCodeFailure(e.message));
    }
  };
}

export function pdpManufacturerRequest() {
  return {
    type: PDP_MANUFACTURER_REQUEST,
    status: REQUESTING
  };
}
export function pdpManufacturerSuccess(manufacturers) {
  return {
    type: PDP_MANUFACTURER_SUCCESS,
    status: SUCCESS,
    manufacturers: manufacturers
  };
}

export function pdpManufacturerFailure(error) {
  return {
    type: PDP_MANUFACTURER_FAILURE,
    status: ERROR,
    error: error
  };
}

export function getManufacturerDetails() {
  return async (dispatch, getState, { api }) => {
    dispatch(pdpManufacturerRequest());
    try {
      let productDetails = getState().productDescription.productDetails;
      let categoryCode =
        productDetails.categoryHierarchy[
          productDetails.categoryHierarchy.length - 1
        ].category_id;
      // let brandCode = productDetails.brandURL.length > 6 ? (productDetails.brandURL
      //   .substr(
      //     productDetails.brandURL.length - 6,
      //     productDetails.brandURL.length
      //   )
      //   .toUpperCase()) : (productDetails.brandURL.toUpperCase());
      let brandCode = productDetails.brandURL.split("-");
      let brandCodeLength = brandCode.length;
      let brandCodeLast = brandCode[brandCodeLength - 1];
      // let brandCodeLastLength = brandCodeLast.length;
      // let brandCodeFinal = "";
      // if(brandCodeLast.length > 6){
      //     brandCodeFinal = brandCodeLast.substr(brandCodeLastLength - 6,brandCodeLastLength)
      // }
      const pdpManufacturerApi = await api.pdpManufacturersApi(
        categoryCode.toUpperCase(),
        brandCodeLast.toUpperCase()
      );

      const pdpManufacturerApiJson = await pdpManufacturerApi.json();
      // if (pdpManufacturerApiJson.status == "Success") {

      // } else {
      if (pdpManufacturerApiJson.errorCode) {
        dispatch(pdpManufacturerFailure("error"));
      } else {
        dispatch(pdpManufacturerSuccess(pdpManufacturerApiJson));
      }
    } catch (e) {
      dispatch(pdpManufacturerFailure(e.message));
    }
  };
}

export function openInAppRequest() {
  return {
    type: OPEN_IN_APP_REQUEST,
    status: REQUESTING
  };
}
export function openInAppSuccess(openInAppDetails) {
  return {
    type: OPEN_IN_APP_SUCCESS,
    status: SUCCESS,
    openInAppDetails
  };
}
export function openInAppFailure(error) {
  return {
    type: OPEN_IN_APP_FAILURE,
    status: ERROR,
    error
  };
}

export function firstGetRelevantBundleProductRequest() {
  return {
    type: RELEVANT_BUNDLE_PRODUCT_REQUEST,
    status: REQUESTING
  };
}
export function firstGetRelevantBundleProductSuccess(data) {
  return {
    type: RELEVANT_BUNDLE_PRODUCT_SUCCESS,
    status: SUCCESS,
    data
  };
}
export function firstGetRelevantBundleProductFailure() {
  return {
    type: RELEVANT_BUNDLE_PRODUCT_FAILURE,
    status: FAILURE
  };
}
export function secondGetRelevantBundleProductRequest() {
  return {
    type: SECONDARY_BUNDLE_PRODUCT_REQUEST,
    status: REQUESTING
  };
}
export function secondGetRelevantBundleProductSuccess(data) {
  return {
    type: SECONDARY_BUNDLE_PRODUCT_SUCCESS,
    status: SUCCESS,
    data
  };
}
export function secondGetRelevantBundleProductFailure() {
  return {
    type: SECONDARY_BUNDLE_PRODUCT_FAILURE,
    status: FAILURE
  };
}
export function getRelevantBundleProduct(productCode, isApiCall = 0, sequence) {
  return async (dispatch, getState, { api }) => {
    sequence === 0
      ? dispatch(firstGetRelevantBundleProductRequest())
      : secondGetRelevantBundleProductRequest();
    try {
      setTimeout(() => {
        if (getState().productDescription.relevantBundleProductData) {
          dispatch(displayToast(LOW_INTERNET_CONNECTION_MESSAGE));
        }
      }, TIME_OUT_FOR_APIS);
      const result = await api.getMiddlewareUrl(
        `${PRODUCT_DESCRIPTION_PATH}/${productCode}?isPwa=true`
      );
      const resultJson = await result.json();

      if (
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === SUCCESS_CAMEL_CASE
      ) {
        if (sequence === 0) {
          return dispatch(firstGetRelevantBundleProductSuccess(resultJson));
        } else {
          return dispatch(secondGetRelevantBundleProductSuccess(resultJson));
        }
      } else {
        if (resultJson.status === 404 && isApiCall === 0) {
          isApiCall = isApiCall + 1;
          dispatch(getRelevantBundleProduct(productCode, isApiCall));
        } else {
          throw new Error(`${resultJson.error}`);
        }
      }
    } catch (e) {
      if (sequence === 0) {
        return dispatch(firstGetRelevantBundleProductFailure(e.message));
      } else {
        return dispatch(secondGetRelevantBundleProductFailure(e.message));
      }
    }
  };
}
export function getRelevantProductPinCodeRequest() {
  return {
    type: CHECK_RELEVANT_PRODUCT_PIN_CODE_REQUEST,
    status: REQUESTING
  };
}
export function getRelevantProductPinCodeSuccess(productPinCode) {
  return {
    type: CHECK_RELEVANT_PRODUCT_PIN_CODE_SUCCESS,
    status: SUCCESS,
    productPinCode,
    ussId: productPinCode.ussId
  };
}

export function getRelevantProductPinCodeFailure(error) {
  return {
    type: CHECK_RELEVANT_PRODUCT_PIN_CODE_FAILURE,
    status: ERROR,
    error
  };
}

export function openInApp() {
  return async (dispatch, getState, { api }) => {
    dispatch(openInAppRequest());
    try {
      const result = await api.customGetMiddlewareUrl(
        `/otatacliq/getApplicationProperties.json?propertyNames=isDesktopActive`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(openInAppSuccess(resultJson));
    } catch (e) {
      dispatch(openInAppFailure(e.message));
    }
  };
}

export function relevantProductServibilty(pinCode = null, productCode, ussId) {
  let validProductCode = productCode.toUpperCase();
  if (pinCode) {
    localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, pinCode);
  }
  return async (dispatch, getState, { api }) => {
    dispatch(getRelevantProductPinCodeRequest());
    try {
      let url;
      let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
      let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      if (userDetails) {
        let userName = JSON.parse(userDetails).userName;
        let accessToken = JSON.parse(customerCookie).access_token;
        url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}`;
      } else {
        let userName = ANONYMOUS_USER;
        let accessToken = JSON.parse(globalCookie).access_token;
        url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}`;
      }
      const result = await api.post(url);

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      // Checking listing Id
      let bundleProductResponse = resultJson.listOfDataList[0].value;
      let listOfAllBundleServiceableUssid;
      if (bundleProductResponse && bundleProductResponse.pincodeListResponse) {
        listOfAllBundleServiceableUssid = bundleProductResponse.pincodeListResponse.filter(
          delivery => {
            return delivery.isServicable === "Y";
          }
        );
      }

      let serviceableForExistingBundleProductSeller = listOfAllBundleServiceableUssid.find(
        seller => {
          return seller.ussid === ussId;
        }
      );

      if (serviceableForExistingBundleProductSeller.stockCount > 0) {
        return dispatch(
          getRelevantProductPinCodeSuccess({
            pinCode,
            deliveryOptions: resultJson.listOfDataList[0].value,
            ussId
          })
        );
      } else {
        return dispatch(getRelevantProductPinCodeFailure("stockCount:0"));
      }
    } catch (e) {
      return dispatch(getRelevantProductPinCodeFailure(e.message));
    }
  };
}
export function relevantBundleProductCodeRequest() {
  return {
    type: RELEVANT_BUNDLE_PRODUCT_CODE_REQUEST,
    status: REQUESTING
  };
}

export function relevantBundleProductCodeSuccess(
  relevantBundleProductCodeData
) {
  return {
    type: RELEVANT_BUNDLE_PRODUCT_CODE_SUCCESS,
    status: SUCCESS,
    relevantBundleProductCodeData
  };
}

export function relevantBundleProductCodeFailure(error) {
  return {
    type: RELEVANT_BUNDLE_PRODUCT_CODE_FAILURE,
    status: ERROR,
    error
  };
}

export function relevantBundleProductCode() {
  return async (dispatch, getState, { api }) => {
    dispatch(relevantBundleProductCodeRequest());
    try {
      const result = await api.customGetMiddlewareUrl(
        `/otatacliq/getApplicationProperties.json?propertyNames=PWA_PDP_BUNDLED_PRODUCT`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(relevantBundleProductCodeSuccess(resultJson));
    } catch (e) {
      dispatch(relevantBundleProductCodeFailure(e.message));
    }
  };
}
