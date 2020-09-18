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
  SET_DATA_LAYER_FOR_SUBMIT_REVIEW,
  setDataLayerForCartDirectCalls,
  ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE,
  ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS,
  setDataLayer,
  ADOBE_PDP_TYPE
} from "../../lib/adobeUtils.js";
// import each from "lodash.foreach";
import {
  showModal,
  PRODUCT_IN_BAG_MODAL
} from "../../general/modal.actions.js";
import { setBagCount } from "../../general/header.actions";
import * as ErrorHandling from "../../general/ErrorHandling.js";
import { isBrowser } from "browser-or-node";
import { getCartCountForLoggedInUser } from "../../cart/actions/cart.actions.js";
import { API_MSD_URL_ROOT } from "../../lib/apiRequest.js";
import { displayToast } from "../../general/toast.actions.js";
export const SUBMIT_REVIEW_TEXT = "Thanks! Review submitted successfully";
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

export const GET_MASTER_TEMPLATE_REQUEST = "GET_MASTER_TEMPLATE_REQUEST";
export const GET_MASTER_TEMPLATE_SUCCESS = "GET_MASTER_TEMPLATE_SUCCESS";
export const GET_MASTER_TEMPLATE_FAILURE = "GET_MASTER_TEMPLATE_FAILURE";

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

export const EXCHANGE_DETAILS_REQUEST = "EXCHANGE_DETAILS_REQUEST";
export const EXCHANGE_DETAILS_SUCCESS = "EXCHANGE_DETAILS_SUCCESS";
export const EXCHANGE_DETAILS_FAILURE = "EXCHANGE_DETAILS_FAILURE";

export const UPDATE_DETAILS_SUCCESS = "UPDATE_DETAILS_SUCCESS";

export const CHECK_IMEI_NUMBER_REQUEST = "CHECK_IMEI_NUMBER_REQUEST";
export const CHECK_IMEI_NUMBER_SUCCESS = "CHECK_IMEI_NUMBER_SUCCESS";
export const CHECK_IMEI_NUMBER_FAILURE = "CHECK_IMEI_NUMBER_FAILURE";

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
const NUMBER_RESULTS = [10, 10];
//TPR-9957 for Desktop
export const PDP_MANUFACTURER_REQUEST = "PDP_MANUFACTURER_REQUEST";
export const PDP_MANUFACTURER_SUCCESS = "PDP_MANUFACTURER_SUCCESS";
export const PDP_MANUFACTURER_FAILURE = "PDP_MANUFACTURER_FAILURE";
export const PDP_RECENTLY_VIEWED_REQUEST = "PDP_RECENTLY_VIEWED_REQUEST";
export const PDP_RECENTLY_VIEWED_SUCCESS = "PDP_RECENTLY_VIEWED_SUCCESS";
export const PDP_RECENTLY_VIEWED_FAILURE = "PDP_RECENTLY_VIEWED_FAILURE";

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
        `${PRODUCT_DESCRIPTION_PATH}/${productCode}?isPwa=true&isMDE=true`
      );
      let resultJson = await result.json();

      resultJson = {
        type: "mplNewProductDetailMobileWsData",
        status: "SUCCESS",
        APlusContent: {
          productContent: [
            {
              key: "Section1A",
              value: {
                imageList: [
                  "https://assets.tatacliq.com/medias/sys_master/images/MP000000001955258_1.jpeg"
                ]
              }
            },
            {
              key: "Section2B",
              value: {
                imageList: [
                  "https://assets.tatacliq.com/medias/sys_master/images/MP000000001955258_2.jpeg"
                ]
              }
            },
            {
              key: "Section3B",
              value: {
                textList: [
                  "<h3>Design and Display</h3><p>How do you create a deeply intelligent device whose enclosure and display are a single, uninterrupted element? That's the goal we first set for ourselves with the original iPhone. With iPhone X, we've achieved it. To create a continuous surface, with nothing to get in the way of your experience, we replaced the Home button with new yet familiar ways to navigate.</p>"
                ]
              }
            },
            {
              key: "Section2A",
              value: {
                textList: [
                  "<h3>The art of photography. Simplified.</h3><p>Can a camera capture more than meets the eye? To find out, we integrated faster, optically image-stabilised cameras with the advanced machine learning of the A11 Bionic chip. The result is a photography system that sees more, understands more and does more. The intelligent, Apple-designed image signal processor detects elements in the scene - like people, motion and lighting conditions - to optimise your photos even before you take them. It also delivers advanced pixel processing, wide colour capture, faster autofocus and better HDR photos.</p>"
                ]
              }
            },
            {
              key: "Section1B",
              value: {
                textList: [
                  "<h3>Your face is your secure password-Face ID</h3><p>What could be more natural than a touch? A look. That was the insight behind Face ID, a powerful and secure authentication system that's even more convenient than Touch ID. It makes unlocking your iPhone X fast, easy and intuitive. With Face ID, iPhone X unlocks only when you're looking at it. It's designed to prevent spoofing by photos or masks. Your facial map is encrypted and protected by the Secure Enclave. And authentication happens instantly on the device, not in the cloud.</p>"
                ]
              }
            },
            {
              key: "Section6B",
              value: {
                textList: [
                  "<h3>Resists water, splashes and dust.</h3><p>iPhone X is precision-engineered at the microscopic level to protect against water, splashes and dust. The all glass designs keeps the phone secure, come rain or shine.</p>"
                ]
              }
            },
            {
              key: "Section5A",
              value: {
                imageList: [
                  "https://assets.tatacliq.com/medias/sys_master/images/MP000000001955258_5.jpeg"
                ]
              }
            },
            {
              key: "Section8C",
              value: {
                videoList: ["https://www.youtube.com/embed/mW6hFttt_KE"]
              }
            },
            {
              key: "Section6A",
              value: {
                textList: [
                  "<h3>A11 Bionic</h3><p>Can you create a chip that's both powerful and intelligent? Meet A11 Bionic, the most powerful and smartest chip ever in a smartphone. With six cores and 4.3 billion transistors, A11 Bionic has four efficiency cores that are up to 70 per cent faster than the A10 fusion chip and two performance cores that are up to 25 per cent faster. The CPU cam harness all six comes simultaneously when you need a turbo boost.</p>"
                ]
              }
            },
            {
              key: "Section5C",
              value: {
                imageList: [
                  "https://assets.tatacliq.com/medias/sys_master/images/MP000000001955258_7.jpeg"
                ]
              }
            },
            {
              key: "Section3A",
              value: {
                imageList: [
                  "https://assets.tatacliq.com/medias/sys_master/images/MP000000001955258_3.jpeg"
                ]
              }
            },
            {
              key: "Section4A",
              value: {
                textList: ["<h2>Features</h2>"]
              }
            },
            {
              key: "Section6C",
              value: {
                textList: [
                  "<h3>Wireless Charging</h3><p>How do you make an iPhone designed for a wireless world? By building on wireless technology like headphones and advanced networking to introduce easy wireless charging. The glass back, together with an efficient charging system, allows you to simply set iPhone X down to charge it up. We wanted people to enjoy the convenience of wireless charging anywhere. So iPhone X works with Qi wireless chargers commonly found in hotels, cafes, airports and cars. Belkin and mophie have also developed two new wireless chargers designed for iPhone X.</p>"
                ]
              }
            },
            {
              key: "Section5B",
              value: {
                imageList: [
                  "https://assets.tatacliq.com/medias/sys_master/images/MP000000001955258_6.jpeg"
                ]
              }
            },
            {
              key: "Section9A",
              value: {
                textList: ["<h3>iPhone X - Apple</h3>"]
              }
            },
            {
              key: "Section9C",
              value: {
                textList: ["<h3>Meet iPhone X - Apple</h3>"]
              }
            },
            {
              key: "Section8B",
              value: {
                videoList: ["https://www.youtube.com/embed/K4wEI5zhHB0"]
              }
            },
            {
              key: "Section7A",
              value: {
                textList: ["<h3>Related Videos</h3>"]
              }
            },
            {
              key: "Section8A",
              value: {
                videoList: ["https://www.youtube.com/embed/wmEqgjT61FA"]
              }
            },
            {
              key: "Section9B",
              value: {
                textList: ["<h3>iPhone X - Introducing iPhone X - Apple</h3>"]
              }
            }
          ],
          temlateName: "MP000000001111132_AplusContent_1"
        },
        allOOStock: false,
        averageRating: 4.5,
        brandInfo: "Lifestyle brand",
        brandName: "Yardley",
        brandURL: "/yardley/c-mbh22a00123",
        categoryHierarchy: [
          {
            category_id: "MSH22",
            category_name: "Beauty & Grooming"
          },
          {
            category_id: "MSH2211",
            category_name: "Fragrances and Perfumes"
          },
          {
            category_id: "MSH2233100",
            category_name: "Fragrances"
          }
        ],
        deliveryModesATP: [
          {
            key: "home-delivery",
            value: "Delivered in 5-6 days."
          },
          {
            key: "express-delivery",
            value: "Delivered in 1-2 days."
          }
        ],
        discount: "20",
        detailsSection: [
          {
            key: "Additional Details 2",
            order: "1",
            value: "Additional Details 2"
          },
          {
            key: "Skin Type",
            order: "2",
            value: "Normal"
          },
          {
            key: "Top Note",
            order: "3",
            value: "Top Note"
          },
          {
            key: "Liquid",
            order: "4",
            value: "Yes"
          },
          {
            key: "Feature 3",
            order: "4",
            value: "Feature 3"
          },
          {
            key: "Number of Pieces",
            order: "5",
            value: "3"
          },
          {
            key: "SPF",
            order: "6",
            value: "Above 30"
          },
          {
            key: "Size",
            order: "7",
            value: "35 ml"
          },
          {
            key: "Additional Details 5",
            order: "8",
            value: "Additional Details 5"
          },
          {
            key: "Finish",
            order: "9",
            value: "Clear"
          },
          {
            key: "Fragrance Family",
            order: "10",
            value: "Fruity"
          },
          {
            key: "Best Within",
            order: "11",
            value: "Best Within1,Best Within2"
          },
          {
            key: "Formulation",
            order: "12",
            value: "Mist"
          },
          {
            key: "Special Features",
            order: "13",
            value: "Special Features"
          },
          {
            key: "Sillage",
            order: "14",
            value: "Soft"
          },
          {
            key: "Country of Origin",
            order: "15",
            value: "India"
          },
          {
            key: "Flammable",
            order: "16",
            value: "Yes"
          },
          {
            key: "Feature 2",
            order: "17",
            value: "Feature 2"
          },
          {
            key: "Additional Details 4",
            order: "18",
            value: "Additional Details 4"
          },
          {
            key: "Additional Details 1",
            order: "19",
            value: "Additional Details 1"
          },
          {
            key: "Perishable",
            order: "20",
            value: "Yes"
          },
          {
            key: "Hazardous Material",
            order: "21",
            value: "Yes"
          },
          {
            key: "Collection",
            order: "22",
            value: "Collection"
          },
          {
            key: "Benefits",
            order: "23",
            value: "Luminous"
          },
          {
            key: "Fragrance Type",
            order: "24",
            value: "Eau de Parfum"
          },
          {
            key: "Color",
            order: "25",
            value: "Orange"
          },
          {
            key: "Base Note",
            order: "26",
            value: "Base Note"
          },
          {
            key: "Feature 1",
            order: "27",
            value: "Feature 1"
          },
          {
            key: "Coverage",
            order: "28",
            value: "Full Coverage"
          },
          {
            key: "Combo",
            order: "29",
            value: "yes"
          },
          {
            key: "Occasion",
            order: "30",
            value: "Day"
          },
          {
            key: "Longevity",
            order: "31",
            value: "Moderate"
          },
          {
            key: "Middle Note",
            order: "32",
            value: "Middle Note"
          },
          {
            key: "Additional Details 3",
            order: "33",
            value: "Additional Details 3"
          },
          {
            key: "Age",
            order: "34",
            value: "Above 20"
          },
          {
            key: "Key Fragrance Notes",
            order: "35",
            value: "Key Fragrance Notes"
          },
          {
            key: "Preference",
            order: "36",
            value: "Oil-Free"
          },
          {
            key: "Concerns",
            order: "37",
            value: "Firmness"
          },
          {
            key: "Hair Type",
            order: "38",
            value: "Normal Hair"
          }
        ],
        exchangeAvailable: false,
        exchangeOfferAvailable: false,
        fulfillmentType: "tship",
        galleryImagesList: [
          {
            galleryImages: [
              {
                key: "product",
                value:
                  "//img.tatacliq.com/images/i4/437Wx649H/MP000000006401418_437Wx649H_20200317101317.jpeg"
              },
              {
                key: "thumbnail",
                value:
                  "//img.tatacliq.com/images/i4/97Wx144H/MP000000006401418_97Wx144H_20200317101317.jpeg"
              },
              {
                key: "searchPage",
                value:
                  "//img.tatacliq.com/images/i4/252Wx374H/MP000000006401418_252Wx374H_20200317101317.jpeg"
              },
              {
                key: "mobilePdpView",
                value:
                  "//img.tatacliq.com/images/i4/450Wx545H/MP000000006401418_450Wx545H_20200317101317.jpeg"
              },
              {
                key: "superZoom",
                value:
                  "//img.tatacliq.com/images/i4/1348Wx2000H/MP000000006401418_1348Wx2000H_20200317101317.jpeg"
              },
              {
                key: "cartIcon",
                value:
                  "//img.tatacliq.com/images/i4/97Wx144H/MP000000006401418_97Wx144H_20200317101317.jpeg"
              },
              {
                key: "zoom",
                value:
                  "//img.tatacliq.com/images/i4/437Wx649H/MP000000006401418_437Wx649H_20200317101317.jpeg"
              },
              {
                key: "cartPage",
                value:
                  "//img.tatacliq.com/images/i4/113Wx168H/MP000000006401418_113Wx168H_20200317101317.jpeg"
              }
            ],
            mediaType: "Image"
          },
          {
            galleryImages: [
              {
                key: "product",
                value:
                  "//img.tatacliq.com/images/i4/437Wx649H/MP000000006401418_437Wx649H_20200317101320.jpeg"
              },
              {
                key: "thumbnail",
                value:
                  "//img.tatacliq.com/images/i4/97Wx144H/MP000000006401418_97Wx144H_20200317101320.jpeg"
              },
              {
                key: "searchPage",
                value:
                  "//img.tatacliq.com/images/i4/252Wx374H/MP000000006401418_252Wx374H_20200317101320.jpeg"
              },
              {
                key: "mobilePdpView",
                value:
                  "//img.tatacliq.com/images/i4/450Wx545H/MP000000006401418_450Wx545H_20200317101320.jpeg"
              },
              {
                key: "superZoom",
                value:
                  "//img.tatacliq.com/images/i4/1348Wx2000H/MP000000006401418_1348Wx2000H_20200317101320.jpeg"
              },
              {
                key: "cartIcon",
                value:
                  "//img.tatacliq.com/images/i4/97Wx144H/MP000000006401418_97Wx144H_20200317101320.jpeg"
              },
              {
                key: "zoom",
                value:
                  "//img.tatacliq.com/images/i4/437Wx649H/MP000000006401418_437Wx649H_20200317101320.jpeg"
              },
              {
                key: "cartPage",
                value:
                  "//img.tatacliq.com/images/i4/113Wx168H/MP000000006401418_113Wx168H_20200317101320.jpeg"
              }
            ],
            mediaType: "Image"
          },
          {
            galleryImages: [
              {
                key: "product",
                value:
                  "//img.tatacliq.com/images/i4/437Wx649H/MP000000006401418_437Wx649H_20200317101318.jpeg"
              },
              {
                key: "thumbnail",
                value:
                  "//img.tatacliq.com/images/i4/97Wx144H/MP000000006401418_97Wx144H_20200317101318.jpeg"
              },
              {
                key: "searchPage",
                value:
                  "//img.tatacliq.com/images/i4/252Wx374H/MP000000006401418_252Wx374H_20200317101318.jpeg"
              },
              {
                key: "mobilePdpView",
                value:
                  "//img.tatacliq.com/images/i4/450Wx545H/MP000000006401418_450Wx545H_20200317101318.jpeg"
              },
              {
                key: "superZoom",
                value:
                  "//img.tatacliq.com/images/i4/1348Wx2000H/MP000000006401418_1348Wx2000H_20200317101318.jpeg"
              },
              {
                key: "cartIcon",
                value:
                  "//img.tatacliq.com/images/i4/97Wx144H/MP000000006401418_97Wx144H_20200317101318.jpeg"
              },
              {
                key: "zoom",
                value:
                  "//img.tatacliq.com/images/i4/437Wx649H/MP000000006401418_437Wx649H_20200317101318.jpeg"
              },
              {
                key: "cartPage",
                value:
                  "//img.tatacliq.com/images/i4/113Wx168H/MP000000006401418_113Wx168H_20200317101318.jpeg"
              }
            ],
            mediaType: "Image"
          },
          {
            galleryImages: [
              {
                key: "product",
                value:
                  "//img.tatacliq.com/images/i4/437Wx649H/MP000000006401418_437Wx649H_20200317101321.jpeg"
              },
              {
                key: "thumbnail",
                value:
                  "//img.tatacliq.com/images/i4/97Wx144H/MP000000006401418_97Wx144H_20200317101321.jpeg"
              },
              {
                key: "searchPage",
                value:
                  "//img.tatacliq.com/images/i4/252Wx374H/MP000000006401418_252Wx374H_20200317101321.jpeg"
              },
              {
                key: "mobilePdpView",
                value:
                  "//img.tatacliq.com/images/i4/450Wx545H/MP000000006401418_450Wx545H_20200317101321.jpeg"
              },
              {
                key: "superZoom",
                value:
                  "//img.tatacliq.com/images/i4/1348Wx2000H/MP000000006401418_1348Wx2000H_20200317101321.jpeg"
              },
              {
                key: "cartIcon",
                value:
                  "//img.tatacliq.com/images/i4/97Wx144H/MP000000006401418_97Wx144H_20200317101321.jpeg"
              },
              {
                key: "zoom",
                value:
                  "//img.tatacliq.com/images/i4/437Wx649H/MP000000006401418_437Wx649H_20200317101321.jpeg"
              },
              {
                key: "cartPage",
                value:
                  "//img.tatacliq.com/images/i4/113Wx168H/MP000000006401418_113Wx168H_20200317101321.jpeg"
              }
            ],
            mediaType: "Image"
          }
        ],
        isCOD: "N",
        isEMIEligible: "N",
        isExchangeAvailable: false,
        isOfferExisting: "N",
        isOnlineExclusive: "N",
        isProductNew: "Y",
        ingredientsNotContained: [
          {
            key: " This may change later What it doesn’t have",
            value: "This product is not vegan, cruelty-free, and gluten-free"
          }
        ],
        ingredientDetails: [
          {
            key: "Things it has that may cause allergies",
            order: "2",
            values: [
              {
                description: "Not tested for animal",
                imageURL:
                  "//img.tatacliq.com/images/i4/113Wx168H/MP000000006401418_113Wx168H_20200317101321.jpeg",
                key: "Cruelty Free"
              },
              {
                description: "Anti-inflamatory",
                imageURL:
                  "//img.tatacliq.com/images/i4/113Wx168H/MP000000006401418_113Wx168H_20200317101321.jpeg",
                key: "Linalool"
              }
            ]
          },
          {
            key: "What it has that really matters",
            order: "1",
            values: [
              {
                description: "Irritates Sensetive Skin",
                imageURL:
                  "//img.tatacliq.com/images/i4/113Wx168H/MP000000006401418_113Wx168H_20200317101321.jpeg",
                key: "Benzyl Benzonate"
              },
              {
                description: "Could Cause hives",
                imageURL:
                  "//img.tatacliq.com/images/i4/113Wx168H/MP000000006401418_113Wx168H_20200317101321.jpeg",
                key: "Benzyl Alcohol"
              }
            ]
          }
        ],
        knowMore: [
          {
            knowMoreItem:
              "An order, once placed, can be cancelled until the seller processes it."
          },
          {
            knowMoreItem: "This product is non-returnable."
          },
          {
            knowMoreItem:
              "For any other queries, do reach out to CliQ Care at 1800-208-8282."
          }
        ],
        knowMoreEmail: "hello@tatacliq.com",
        knowMorePhoneNo: "1800-208-8282",
        knowMoreV2: [
          {
            knowMoreItemV2: "0 Days Easy Return"
          },
          {
            knowMoreItemV2:
              "An order, once placed, can be cancelled until the seller processes it."
          }
        ],
        maxQuantityAllowed: "10",
        mrpPrice: {
          commaFormattedValue: "₹11500.00",
          commaFormattedValueNoDecimal: "₹11,500",
          currencyIso: "INR",
          currencySymbol: "₹",
          doubleValue: 11500,
          formattedValue: "₹11500.00",
          formattedValueNoDecimal: "₹11500",
          priceType: "BUY",
          value: 11500
        },
        nceAvailable: false,
        numberOfReviews: 0,
        otherIngredients: [
          {
            key: "Ingredients",
            value: "Ingredients,Ingredients,Ingredients"
          }
        ],
        productDescription:
          "Estēe Lauder Women Beautiful Belle Love Eau de Parfum, 35ml",
        productListingId: "MP000000001111112",
        productName:
          "Estēe Lauder Women Beautiful Belle Love Eau de Parfum, 35ml",
        productTitle: "Women Beautiful Belle Love Eau de Parfum, 35ml",
        primaryIngredients: [
          {
            key: "Ingredient - This may change later",
            value: "Primary Ingredient,Primary Ingredient,Primary Ingredient"
          }
        ],
        ratingCount: 0,
        rootCategory: "Beauty&Grooming",
        sellerAssociationstatus: "Y",
        seo: {
          alternateURL:
            "/yardley-london-gentleman-urbane-deo-body-spray-for-men/p-mp000000001111112",
          breadcrumbs: [
            {
              name:
                "Now try the exciting combo of Yardley gentleman urbane, a fragrance for a man with vigour and flamboyance.",
              url:
                "/yardley-london-gentleman-urbane-deo-body-spray-for-men/p-mp000000001111112"
            },
            {
              name: "Fragrances",
              url:
                "/beauty-grooming-fragrances-and-perfumes-fragrances/c-msh2233100"
            },
            {
              name: "Fragrances and Perfumes",
              url: "/beauty-grooming-fragrances-and-perfumes/c-msh2211"
            },
            {
              name: "Beauty & Grooming",
              url: "/beauty-grooming/c-msh22"
            }
          ],
          canonicalURL:
            "/yardley-london-gentleman-urbane-deo-body-spray-for-men/p-mp000000001111112",
          description: "Yardley London Gentleman Urbane Deo Body Spray for Men",
          title:
            "Now try the exciting combo of Yardley gentleman urbane, a fragrance for a man with vigour and flamb"
        },
        setInformation: {
          key: "This set contains",
          values: [
            {
              key: "Product 2",
              order: "2",
              value: "Product 2"
            },
            {
              key: "Product 1",
              order: "1",
              value: "Product 1, abcd,Product 11,Product 2"
            },
            {
              key: "Product 10",
              order: "10",
              value: "Product 10"
            },
            {
              key: "Product 9",
              order: "9",
              value: "Product 9"
            },
            {
              key: "Product 8",
              order: "8",
              value: "Product 8"
            },
            {
              key: "Product 7",
              order: "7",
              value: "Product 7"
            },
            {
              key: "Product 6",
              order: "6",
              value: "Product 6"
            },
            {
              key: "Product 5",
              order: "5",
              value: "Product 5"
            },
            {
              key: "Product 4",
              order: "4",
              value: "Product 4"
            },
            {
              key: "Product 3",
              order: "3",
              value: "Product 3"
            }
          ]
        },
        sharedText:
          "Wow!Check out this amazing find http://localhost:9001/yardley-london-gentleman-urbane-deo-body-spray-for-men/p-mp000000001111112 . Like or  comment to tell me what you think, or share for warm fuzzies.",
        shortStoryLarge: [
          {
            description: "Lychee, Rose, Petals, Mimosa",
            imageURL:
              "https://assets.tatacliq.com/medias/sys_master/images/TopNote_1.jpeg",
            key: "Top Note",
            order: "1"
          },
          {
            description: "Orris Root",
            imageURL:
              "https://assets.tatacliq.com/medias/sys_master/images/BaseNote_1.jpeg",
            key: "Base Note",
            order: "3"
          },
          {
            description: "Orange Flower",
            imageURL:
              "https://assets.tatacliq.com/medias/sys_master/images/HeartNote_1.jpeg",
            key: "Middle Note",
            order: "2"
          }
        ],
        shortStorySmall: [
          {
            imageURL:
              "https://assets.tatacliq.com/medias/sys_master/images/Longlasting_1.jpeg",
            key: "Long Lasting"
          },
          {
            imageURL:
              "https://assets.tatacliq.com/medias/sys_master/images/moon_1.jpeg",
            key: "Evening Wear"
          },
          {
            imageURL:
              "https://assets.tatacliq.com/medias/sys_master/images/gender_1.jpeg",
            key: "Feminine"
          },
          {
            imageURL:
              "https://assets.tatacliq.com/medias/sys_master/images/FloralOriantal_1.jpeg",
            key: "Floral Original Fragrance"
          },
          {
            imageURL:
              "https://assets.tatacliq.com/medias/sys_master/images/Winter_1.jpeg",
            key: "Beast Worn in Winter"
          },
          {
            imageURL:
              "https://assets.tatacliq.com/medias/sys_master/images/Sensual_1.jpeg",
            key: "Romantic Sensual Mood"
          }
        ],
        showSizeGuide: false,
        styleNote: "Yardley London Gentleman Urbane Deo Body Spray for Men",
        variantOptions: [
          {
            colorlink: {
              colorurl:
                "/yardley-london-gentleman-urbane-deo-body-spray-for-men/p-mp000000001111112",
              selected: true
            },
            sizelink: {
              imageUrl:
                "https://assets.tatacliq.com/medias/sys_master/images/Sdefault_1.jpeg",
              isAvailable: true,
              productCode: "MP000000001111112",
              size: "35 ml",
              url:
                "/yardley-london-gentleman-urbane-deo-body-spray-for-men/p-mp000000001111112"
            }
          },
          {
            colorlink: {
              colorurl:
                "/yardley-london-gentleman-urbane-deo-body-spray-for-men/p-mp000000001111113",
              selected: false
            },
            sizelink: {
              imageUrl:
                "https://assets.tatacliq.com/medias/sys_master/images/Mdefault_1.jpeg",
              isAvailable: true,
              productCode: "MP000000001111113",
              size: "50 ml",
              url:
                "/yardley-london-gentleman-urbane-deo-body-spray-for-men/p-mp000000001111113"
            }
          },
          {
            colorlink: {
              colorurl:
                "/yardley-london-gentleman-urbane-deo-body-spray-for-men/p-mp000000001111114",
              selected: false
            },
            sizelink: {
              imageUrl:
                "https://assets.tatacliq.com/medias/sys_master/images/Ldefault_1.jpeg",
              isAvailable: true,
              productCode: "MP000000001111114",
              size: "100 ml",
              url:
                "/yardley-london-gentleman-urbane-deo-body-spray-for-men/p-mp000000001111114"
            }
          }
        ],
        whatElseYouNeedtoKnow: [
          {
            key: "What Else You Need to Know:",
            value: "What Else You Need to Know"
          }
        ],
        winningSellerAvailableStock: "500",
        winningSellerID: "500001",
        winningSellerName: "Yardley Store",
        winningSellerPrice: {
          commaFormattedValue: "₹11400.00",
          commaFormattedValueNoDecimal: "₹11,400",
          currencyIso: "INR",
          currencySymbol: "₹",
          doubleValue: 11400,
          formattedValue: "₹11400.00",
          formattedValueNoDecimal: "₹11400",
          priceType: "BUY",
          value: 11400
        },
        winningUssID: "50000110000001111"
      };

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
        setDataLayer(
          ADOBE_PDP_TYPE,
          resultJson,
          null,
          null,
          behaviorOfPageTheCurrent
        );
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

export function getMasterTemplate() {
  return async (dispatch, getState, { api }) => {
    dispatch(getMasterTemplateRequest());
    try {
      const result = await api.customGetMiddlewareUrl(
        "/otatacliq/getApplicationProperties.json?propertyNames=MSH2233100"
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(
        getMasterTemplateSuccess(
          resultJson &&
            resultJson.applicationProperties &&
            resultJson.applicationProperties[0]
        )
      );
    } catch (error) {
      dispatch(getMasterTemplateFailure(error.message));
    }
  };
}

export function getMasterTemplateRequest() {
  return {
    type: GET_MASTER_TEMPLATE_REQUEST,
    status: REQUESTING
  };
}

export function getMasterTemplateSuccess(masterTemplateResult) {
  return {
    type: GET_MASTER_TEMPLATE_SUCCESS,
    status: SUCCESS,
    masterTemplateResult
  };
}

export function getMasterTemplateFailure(error) {
  return {
    error,
    type: GET_MASTER_TEMPLATE_FAILURE,
    status: ERROR
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
  isExchangeAvailable,
  isComingFromClickEvent = false
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
        if (isExchangeAvailable) {
          url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}&exchangeAvailable=true&isMDE=true`;
        } else {
          url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}&exchangeAvailable=false&isMDE=true`;
        }
      } else {
        let userName = ANONYMOUS_USER;
        let accessToken = JSON.parse(globalCookie).access_token;
        if (isExchangeAvailable) {
          url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}&exchangeAvailable=true&isMDE=true`;
        } else {
          url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}&exchangeAvailable=false&isMDE=true`;
        }
      }
      const result = await api.post(url);
      const resultJson = await result.json();
      // const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      let cncDeliveryModes = "";
      let getDeliveryModesByWinningUssid = "";
      let pincodeError;
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
      if (
        resultJson &&
        resultJson.listOfDataList &&
        resultJson.listOfDataList[0] &&
        resultJson.listOfDataList[0].value &&
        Object.keys(resultJson.listOfDataList[0].value).length === 0
      ) {
        if (
          !resultJson.productOutOfStockMessage ||
          !resultJson.productNotServiceableMessage
        ) {
          pincodeError = "Please enter a valid pincode";
          dispatch(displayToast("Please enter a valid pincode"));
        }
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
      if (
        !resultJson.productNotServiceabilityMessage ||
        !resultJson.productOutOfStockMessage
      ) {
        if (isComingFromClickEvent && resultJson.isPickupAvailableForExchange) {
          dispatch(displayToast("Exchange is serviceable at your pincode"));
        }
      }
      // if (pinCode) {
      //   localStorage.removeItem(SELECTED_STORE);
      // }
      if (
        resultJson &&
        resultJson.listOfDataList[0] &&
        resultJson.listOfDataList[0].value &&
        resultJson.listOfDataList[0].value.pincodeListResponse &&
        resultJson.listOfDataList[0].value.pincodeListResponse[0] &&
        resultJson.listOfDataList[0].value.pincodeListResponse[0]
          .isServicable != "N"
      ) {
        setDataLayerForCartDirectCalls(
          ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS,
          pinCode
        );
      } else {
        setDataLayerForCartDirectCalls(
          ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE,
          pinCode
        );
      }
      return dispatch(
        getProductPinCodeSuccess({
          pinCode,
          deliveryOptions:
            resultJson &&
            resultJson.listOfDataList &&
            resultJson.listOfDataList[0] &&
            resultJson.listOfDataList[0].value,
          isPickupAvailableForExchange: resultJson.isPickupAvailableForExchange,
          cashifyPickupCharge:
            resultJson.pickupCharge && resultJson.pickupCharge.value,
          city: resultJson.city,
          productOutOfStockMessage: resultJson.productOutOfStockMessage,
          productNotServiceableMessage:
            resultJson.productNotServiceabilityMessage,
          pincodeError
        })
      );
      // if (isComingFromPiqPage) {
      //   dispatch(getAllStoresForCliqAndPiq());
      // }
    } catch (e) {
      pinCode = "00000";
      setDataLayerForCartDirectCalls(
        ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE,
        pinCode
      );
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
    //get verify imei api response,check exchange avail or not,get product already in cart
    let IMEIApiResponse = productDetails.verifyIMEINumberAPIResponse;
    let disableNext = false;
    await dispatch(getCartCountForLoggedInUser()).then(data => {
      if (
        data &&
        data.status &&
        data.status.toLowerCase() === "success" &&
        data.cartDetails.products
      ) {
        let isProductInCart = data.cartDetails.products.find(val => {
          return val.USSID === productDetails.ussId;
        });
        if (
          isProductInCart &&
          isProductInCart.exchangeDetails &&
          productDetails.isFromMobileExchange
        ) {
          dispatch(
            showModal(PRODUCT_IN_BAG_MODAL, {
              isWithExchange: true
            })
          );
          disableNext = true;
        }
        if (
          isProductInCart &&
          !isProductInCart.exchangeDetails &&
          !productDetails.isFromMobileExchange
        ) {
          dispatch(showModal(PRODUCT_IN_BAG_MODAL));
          disableNext = true;
        }
      }
    });
    if (disableNext) {
      return false;
    }
    dispatch(addProductToCartRequest());
    try {
      let result;
      // Checked with string as local storage returns as string format
      // If exchange available and IMEI verified then only send exchange details
      if (IMEIApiResponse && productDetails.isFromMobileExchange) {
        let requestParams = {
          quoteId: IMEIApiResponse.quoteId,
          requestId: IMEIApiResponse.requestId,
          quoteExpiryDate: IMEIApiResponse.quoteExpiryDate,
          exchangeBrandId: IMEIApiResponse.exchangeBrandId,
          exchangeBrandName: IMEIApiResponse.exchangeBrandName,
          exchangeProductId: IMEIApiResponse.exchangeProductId,
          exchangeModelName: IMEIApiResponse.exchangeModelName,
          effectiveModelName: IMEIApiResponse.effectiveModelName,
          exchangeAmountCashify: IMEIApiResponse.exchangeAmountCashify.value,
          pickupCharge: IMEIApiResponse.pickupCharge.value,
          totalExchangeCashback: IMEIApiResponse.totalExchangeCashback.value,
          IMEINumber: IMEIApiResponse.IMEINumber
        };
        if (
          IMEIApiResponse.effectiveAmount &&
          IMEIApiResponse.effectiveAmount.value
        ) {
          requestParams.effectiveAmount = IMEIApiResponse.effectiveAmount.value;
        }
        if (IMEIApiResponse.TULBump && IMEIApiResponse.TULBump.value) {
          requestParams.TULBump = IMEIApiResponse.TULBump.value;
        }
        result = await api.post(
          `${PRODUCT_DETAILS_PATH}/${userId}/carts/${
            cartId ? cartId + "/" : ""
          }productAdditionToCart_V1?access_token=${accessToken}&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&productCode=${
            productDetails.code
          }&USSID=${productDetails.ussId}&quantity=${
            productDetails.quantity
          }&addedToCartWl=false&channel=${CHANNEL}&isMDE=true`,
          requestParams
        );
      } else {
        //normal add to cart
        result = await api.post(
          `${PRODUCT_DETAILS_PATH}/${userId}/carts/${
            cartId ? cartId + "/" : ""
          }productAdditionToCart_V1?access_token=${accessToken}&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&productCode=${
            productDetails.code
          }&USSID=${productDetails.ussId}&quantity=${
            productDetails.quantity
          }&addedToCartWl=false&channel=${CHANNEL}&isMDE=true`
        );
      }
      const resultJson = await result.json();
      // const resultJson = addToCartError;
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        if (
          resultJson.errorCode === "EX05" ||
          resultJson.errorCode === "NU011" ||
          resultJson.errorCode === "EX06" ||
          resultJson.errorCode === "B9069"
        ) {
          dispatch(displayToast(resultJson.error));
        }
        // throw new Error(resultJsonStatus.message);
        return dispatch(addProductToCartFailure(resultJson.error));
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
      const url = `${PRODUCT_PDP_EMI_PATH}?isPwa=true&channel=mobile&productValue=${cartValue}&ussids=${ussId}&productCode=${productCode}&nceFlag=true&access_token=${token}&emiConvChargeFlag=true`;
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
export function ProductSpecificationSuccess(productDetails, productCode) {
  return {
    type: PRODUCT_SPECIFICATION_SUCCESS,
    status: SUCCESS,
    productDetails,
    productCode
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

      dispatch(ProductSpecificationSuccess(resultJson, productId));
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
export function productMsdSuccess(recommendedItems, widgetKey) {
  return {
    type: PRODUCT_MSD_SUCCESS,
    status: SUCCESS,
    recommendedItems,
    widgetKey
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
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
    }
    if (userDetails && userDetails.customerId) {
      msdRequestObject.append("user_id", userDetails.customerId);
    }
    msdRequestObject.append("api_key", API_KEY);
    // if (process.env.REACT_APP_STAGE === "qa2") {
    //   msdRequestObject.append("mad_uuid", QA2_MCV_ID);
    // } else {
    const mcvId = await getMcvId();
    msdRequestObject.append("mad_uuid", mcvId);
    // }
    msdRequestObject.append("widget_list", JSON.stringify(WIDGET_LIST));
    if (resultsRequired !== undefined && resultsRequired.length) {
      msdRequestObject.append("num_results", JSON.stringify(resultsRequired));
    } else {
      msdRequestObject.append("num_results", JSON.stringify(NUMBER_RESULTS));
    }
    msdRequestObject.append("details", true);
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

      if (
        resultJson &&
        resultJson.data &&
        resultJson.data[0] &&
        resultJson.data[0].length > 0
      ) {
        dispatch(
          getPdpItems(resultJson.data[0], RECOMMENDED_PRODUCTS_WIDGET_KEY)
        );
        dispatch(
          productMsdSuccess(resultJson.data[0], RECOMMENDED_PRODUCTS_WIDGET_KEY)
        );
      } else {
        dispatch(getPdpItems([], RECOMMENDED_PRODUCTS_WIDGET_KEY));
      }
      if (
        resultJson &&
        resultJson.data &&
        resultJson.data[1] &&
        resultJson.data[1].length > 0
      ) {
        dispatch(getPdpItems(resultJson.data[1], SIMILAR_PRODUCTS_WIDGET_KEY));
        dispatch(
          productMsdSuccess(resultJson.data[1], SIMILAR_PRODUCTS_WIDGET_KEY)
        );
      }
    } catch (e) {
      dispatch(productMsdFailure(e.message));
    }
  };
}
export function productMsdRecentlyViewedRequest() {
  return {
    type: PDP_RECENTLY_VIEWED_REQUEST,
    status: REQUESTING
  };
}
export function productMsdRecentlyViewedFailure(error) {
  return {
    type: PDP_RECENTLY_VIEWED_FAILURE,
    status: ERROR,
    error
  };
}
export function productMsdRecentlyViewedSuccess(
  recentlyViewedProduct,
  widgetKey
) {
  return {
    type: PDP_RECENTLY_VIEWED_SUCCESS,
    status: SUCCESS,
    recentlyViewedProduct,
    widgetKey
  };
}
export function getRecentlyViewedProduct(productCode) {
  return async (dispatch, getState, { api }) => {
    let msdRequestObject = new FormData();
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
    }
    if (userDetails && userDetails.customerId) {
      msdRequestObject.append("user_id", userDetails.customerId);
    }
    msdRequestObject.append("api_key", API_KEY);
    if (process.env.REACT_APP_STAGE === "qa2") {
      msdRequestObject.append("mad_uuid", QA2_MCV_ID);
    } else {
      const mcvId = await getMcvId();
      msdRequestObject.append("mad_uuid", mcvId);
    }
    msdRequestObject.append("widget_list", [7]);
    msdRequestObject.append("num_results", [10]);
    msdRequestObject.append("details", false);
    dispatch(productMsdRecentlyViewedRequest());
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

      if (
        resultJson &&
        resultJson.data &&
        resultJson.data[0] &&
        resultJson.data[0].length > 0
      ) {
        const removedDuplicate = [...new Set(resultJson.data[0])];
        let requests =
          removedDuplicate &&
          removedDuplicate.map(id =>
            api.getMiddlewareUrl(
              `${PRODUCT_DESCRIPTION_PATH}/${id}?isPwa=true&isMDE=true`
            )
          );
        //seprating each requests call
        let productList = [];
        await Promise.all(requests)
          .then(responses => Promise.all(responses.map(r => r.json())))
          .then(results =>
            results.forEach(res => {
              // if (res && res.results && res.results.length && res.results[0]) {
              //   productList.push(res.results[0]);
              // }
              if (res && res.status === "SUCCESS") {
                productList.push(res);
              }
            })
          );
        dispatch(
          productMsdRecentlyViewedSuccess(productList, "RecentlyViewed")
        );
      }
    } catch (e) {
      dispatch(productMsdRecentlyViewedFailure(e.message));
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
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
    }
    if (userDetails && userDetails.customerId) {
      msdRequestObject.append("user_id", userDetails.customerId);
    }
    msdRequestObject.append("api_key", API_KEY);
    msdRequestObject.append(
      "widget_list",
      JSON.stringify(WIDGET_LIST_FOR_ABOUT_BRAND)
    );
    msdRequestObject.append("num_results", JSON.stringify(NUMBER_RESULTS));
    const mcvId = await getMcvId();
    msdRequestObject.append("mad_uuid", mcvId);
    msdRequestObject.append("details", true);
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

      if (
        resultJson &&
        resultJson.data[0] &&
        resultJson.data[0].itemIds &&
        resultJson.data[0].itemIds.length > 0
      ) {
        dispatch(
          getPdpItems(resultJson.data[0].itemIds, ABOUT_THE_BRAND_WIDGET_KEY)
        );
        // updating reducer for follow brand  key
        dispatch(pdpAboutBrandSuccess(resultJson.data[0]));
      }
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
      let productCodes;
      if (widgetKey === "aboutTheBrand") {
        productCodes = itemIds;
      } else {
        productCodes = itemIds.map(obj => {
          return obj.product_id;
        });
        productCodes = productCodes;
      }
      let requests =
        productCodes &&
        productCodes.map(id =>
          api.getMiddlewareUrl(
            `${PRODUCT_DESCRIPTION_PATH}/${id}?isPwa=true&isMDE=true`
          )
        );
      // seperating individual calls
      let productList = [];
      await Promise.all(requests)
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(results =>
          results.forEach(res => {
            // const resultJsonStatus = ErrorHandling.getFailureResponse(res);
            // if (resultJsonStatus.status) {
            //   throw new Error(resultJsonStatus.message);
            // }
            //changes done for handling error if product is not available
            if (res && res.status === "SUCCESS") {
              productList.push(res);
            }
          })
        );
      dispatch(getPdpItemsPdpSuccess(productList, widgetKey));
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
      let pdpOffersApiJson = await pdpOffersApi.json();
      pdpOffersApiJson = {
        type: "voucherSequenceListDTO",

        status: "Success",

        offerCalloutList: [
          {
            channel: "ALL",

            couponType: "TERTIARY_OFFER",

            endDateAndTime: "2020-07-21 23:59:59",

            imageUrl:
              "https://assets.tatacliq.com/medias/sys_master/14766233681950.png",

            name:
              "Apply Coupon GOKOTAK and get 10% instant discount with Kotak Credit/Debit Cards* Min Purchase : Rs. 5000 | Max Discount: Rs. 1000.",

            offerEndDate: "2020-07-21 23:59:59",

            offerStartDate: "2020-07-21 00:00:00",

            offerType: "Tertiary Offer",

            priority: 1000,

            promotionDisplayText:
              'The offer is valid on select products. View All Kotak Bank offer <a href="https://www.tatacliq.com/bank-offers" target="_blank">T&Cs</a>',

            sequence: 2,

            startDateAndTime: "2020-07-21 00:00:00",

            voucherIdentifier: "MARTLSKOTAK"
          },

          {
            channel: "ALL",

            couponType: "TERTIARY_OFFER",

            endDateAndTime: "2021-07-31 23:59:00",

            name: "Free Shipping on cart value of Rs. 1499 & more",

            offerEndDate: "2021-07-31 23:59:00",

            offerStartDate: "2020-06-11 00:00:00",

            offerType: "Tertiary Offer",

            priority: 993,

            sequence: 3,

            startDateAndTime: "2020-06-11 00:00:00",

            voucherIdentifier: "LIFESTYLESHIP"
          },

          {
            channel: "ALL",

            couponType: "TERTIARY_OFFER",

            endDateAndTime: "2020-07-24 23:59:59",

            name:
              "1) Apply Coupon HDFC2000 and get Rs. 2,000 off on HDFC Bank Credit Card and Credit Card EMI on min. purchase of Rs. 25,000. Offer on select products only. Limited Period Offer.<br>2) Apply Coupon AMEXTECH and get 10% Instant Discount on American Express Credit Card and EMI Transaction on Min Purchase: Rs. 10000 | Max Discount: Rs.1500",

            offerEndDate: "2020-07-24 23:59:59",

            offerStartDate: "2020-07-24 00:00:00",

            offerType: "Tertiary Offer",

            priority: 1000,

            promotionDisplayText:
              'T&C\'s<br> 1) The offer is valid on Electronics & Lifestyle<br> 2) The Offer not valid on Gold Coins<br> View All Bank offer <a href="https://www.tatacliq.com/hdfc-credit-card-offer-tnc" target="_blank">T&Cs</a>',

            sequence: 1,

            startDateAndTime: "2020-07-24 00:00:00",

            voucherIdentifier: "HDFC2000T"
          }
        ]
      };

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
        `${ALL_STORES_FOR_CLIQ_AND_PIQ_PATH}/${pinCode}?access_token=${accessToken}&isMDE=true`
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
      let bundleProductResponse =
        resultJson &&
        resultJson.listOfDataList &&
        resultJson.listOfDataList[0] &&
        resultJson.listOfDataList[0].value;
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
            deliveryOptions:
              resultJson &&
              resultJson.listOfDataList &&
              resultJson.listOfDataList[0] &&
              resultJson.listOfDataList[0].value,
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
        if (getState().productDescription.relevantBundleProductLoading) {
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
            deliveryOptions:
              resultJson &&
              resultJson.listOfDataList &&
              resultJson.listOfDataList[0] &&
              resultJson.listOfDataList[0].value,
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

export function getExchangeDetailsRequest() {
  return {
    type: EXCHANGE_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function getExchangeDetailsSuccess(data) {
  return {
    type: EXCHANGE_DETAILS_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function getExchangeDetailsFailure(error) {
  return {
    type: EXCHANGE_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function getExchangeDetails(
  listingId,
  ussid,
  maxExchangeAmount,
  pickupCharge
) {
  return async (dispatch, getState, { api }) => {
    dispatch(getExchangeDetailsRequest());
    try {
      const result = await api.getMiddlewareUrl(
        `v2/mpl/products/exchangeDetails?listingId=${listingId}&ussid=${ussid}&maxExchangeAmount=${maxExchangeAmount}&pickUpCharge=${pickupCharge}`
      );
      const resultJson = await result.json();
      if (resultJson.status && resultJson.status.toLowerCase() === "success") {
        return dispatch(getExchangeDetailsSuccess(resultJson));
      } else {
        throw new Error(`${resultJson.error}`);
      }
    } catch (e) {
      return dispatch(getExchangeDetailsFailure(e.message));
    }
  };
}

export function updateProductState(data) {
  return {
    type: UPDATE_DETAILS_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function verifyIMEINumberRequest() {
  return {
    type: CHECK_IMEI_NUMBER_REQUEST,
    status: REQUESTING
  };
}
export function verifyIMEINumberSuccess(data) {
  return {
    type: CHECK_IMEI_NUMBER_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function verifyIMEINumberFailure(error) {
  return {
    type: CHECK_IMEI_NUMBER_FAILURE,
    status: ERROR,
    error
  };
}
export function verifyIMEINumber(
  IMEINumber,
  exchangeProductId,
  exchangeAmountCashify,
  tulBump: null,
  pickUpCharge,
  listingId,
  ussId,
  guid: null,
  entry: null,
  wishlistName: null
) {
  return async (dispatch, getState, { api }) => {
    dispatch(verifyIMEINumberRequest());
    try {
      let bodyParams = {
        IMEINumber: IMEINumber,
        exchangeProductId: exchangeProductId,
        exchangeAmountCashify: exchangeAmountCashify,
        pickUpCharge: pickUpCharge,
        listingId: listingId,
        ussid: ussId
      };
      if (tulBump) {
        bodyParams.tulBump = tulBump;
      }
      if (guid && entry) {
        bodyParams.guid = guid;
        bodyParams.entry = entry;
      }
      if (wishlistName) {
        bodyParams.wishlistName = wishlistName;
      }
      const result = await api.post(`v2/mpl/verifyIMEINumber`, bodyParams);
      const resultJson = await result.json();
      return resultJson;
    } catch (e) {
      return dispatch(verifyIMEINumberFailure(e.message));
    }
  };
}
