import { getCookieValue, getCookie } from "./Cookie.js";
import { setInterval, clearInterval } from "timers";
import * as constants from "../lib/constants.js";
import { userAddressFailure } from "../cart/actions/cart.actions";
import {
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_MOBILE,
  FACEBOOK_PLATFORM,
  GOOGLE_PLUS_PLATFORM
} from "../auth/actions/user.actions";

export const ADOBE_TARGET_COOKIE_NAME =
  "AMCV_E9174ABF55BA76BA7F000101%40AdobeOrg";
export const ADOBE_TARGET_SPLIT_VALUE = "%7C";
export const ADOBE_TARGET_MCMID = "MCMID";
export const ADOBE_TARGET_WAIT_TIME = 2000;
const ADOBE_SATELLITE_CODE = "virtual_page_load";
const ADOBE_PDP_CPJ = "cpj_pdp";
const ADOBE_ADD_TO_CART = "cpj_add_to_cart";
const ADOBE_SAVE_PRODUCT = "cpj_button_save";
const ADOBE_EMI_BANK_SELECT_ON_PDP = "'cpj_pdp_emi";
const ADOBE_SATELLITE_CODE_FOR_PRODUCT_REMOVE_ON_CART = "'cpj_cart_removal'";

export const ADOBE_ORDER_CONFIRMATION = "orderConfirmation";
export const ADOBE_HOME_TYPE = "home";
export const ADOBE_PDP_TYPE = "pdp";
export const ADOBE_CART_TYPE = "cart";
export const ADOBE_CHECKOUT_TYPE = "checkout";
export const ICID2 = "ICID2";
export const CID = "CID";
export const SET_DATA_LAYER_FOR_ADD_TO_BAG_EVENT =
  "SET_DATA_LAYER_FOR_ADD_TO_BAG_EVENT";
export const SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT =
  "SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT";
export const SET_DATA_LAYER_FOR_EMI_BANK_EVENT =
  "SET_DATA_LAYER_FOR_EMI_BANK_EVENT";
export const ADOBE_DIRECT_CALLS_FOR_REMOVE_PRODUCT_ON_CART =
  "ADOBE_DIRECT_CALLS_FOR_REMOVE_PRODUCT_ON_CART";
const GOOGLE = "google";
const FACEBOOK = "facebook";
const MOBILE = "mobile";
const EMAIL = "email";
const INTERNAL_CAMPAIGN = "internal_campaign";
const EXTERNAM_CAMPAIGN = "external_campaign";
export function setDataLayer(type, response, icid, icidType) {
  let userDetails = getCookie(constants.LOGGED_IN_USER_DETAILS);
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
  }

  if (type === ADOBE_HOME_TYPE) {
    window.digitalData = getDigitalDataForHome();
  }

  if (type === ADOBE_PDP_TYPE) {
    window.digitalData = getDigitalDataForPdp(type, response);
    window._satellite.track(ADOBE_PDP_CPJ);
  }
  if (type === ADOBE_CHECKOUT_TYPE) {
    window.digitalData = getDigitalDataForCheckout(type, response);
  }
  if (type === ADOBE_CART_TYPE) {
    window.digitalData = getDigitalDataForCart(type, response);
  }
  if (type === ADOBE_ORDER_CONFIRMATION) {
    window.digitalData = getDigitalDataForOrderConfirmation(type, response);
  }
  if (icid) {
    window.digitalData.internal = {
      campaign: {
        id: icid
      }
    };
  }
  if (icidType === ICID2) {
    window.digitalData.flag = INTERNAL_CAMPAIGN;
  } else if (icidType === CID) {
    window.digitalData.flag = EXTERNAM_CAMPAIGN;
  }

  if (userDetails) {
    if (userDetails.loginType === LOGIN_WITH_EMAIL) {
      window.digitalData.account = {
        login: {
          customerID: userDetails.customerId,
          type: EMAIL
        }
      };
    } else if (userDetails.loginType === LOGIN_WITH_MOBILE) {
      window.digitalData.account = {
        login: {
          customerID: userDetails.customerId,
          type: MOBILE
        }
      };
    } else if (userDetails.loginType === FACEBOOK_PLATFORM) {
      window.digitalData.account = {
        login: {
          customerID: userDetails.customerId,
          type: FACEBOOK
        }
      };
    } else if (userDetails.loginType === GOOGLE_PLUS_PLATFORM) {
      window.digitalData.account = {
        login: {
          customerID: userDetails.customerId,
          type: GOOGLE
        }
      };
    }
  }

  const defaultPinCode = localStorage.getItem(
    constants.DEFAULT_PIN_CODE_LOCAL_STORAGE
  );

  if (defaultPinCode) {
    window.digitalData.geolocation = {
      pin: {
        code: defaultPinCode
      }
    };
  }
  window._satellite.track(ADOBE_SATELLITE_CODE);
}

function getDigitalDataForPdp(type, pdpResponse) {
  const categoryHierarchy = pdpResponse.categoryHierarchy.map(val => {
    return val.category_name.toLowerCase().replace(/\s+/g, "_");
  });
  const data = {
    cpj: {
      product: {
        id: pdpResponse.productListingId
      },

      brand: {
        name: pdpResponse.brandName
      }
    },

    page: {
      category: {
        primaryCategory: "product",
        subCategory1: categoryHierarchy[0],
        subCategory2: categoryHierarchy[1],
        subCategory3: categoryHierarchy[2]
      },

      pageInfo: {
        pageName: "product details"
      }
    }
  };
  if (pdpResponse && pdpResponse.seo && pdpResponse.seo.breadcrumbs) {
    const seoBreadCrumbs = pdpResponse.seo.breadcrumbs
      .map(val => {
        return val.name.toLowerCase().replace(/\s+/g, "_");
      })
      .reverse();
    Object.assign(data.page, {
      display: {
        hierarchy: ["home", ...seoBreadCrumbs]
      }
    });
  } else {
    Object.assign(data, {
      display: {
        hierarchy: ["home"]
      }
    });
  }
  if (pdpResponse.mrpPrice && pdpResponse.mrpPrice.doubleValue) {
    Object.assign(data.cpj.product, {
      price: pdpResponse.mrpPrice.doubleValue
    });
    if (
      pdpResponse.winningSellerPrice &&
      pdpResponse.winningSellerPrice.doubleValue
    ) {
      Object.assign(data.cpj.product, {
        discount:
          pdpResponse.mrpPrice.doubleValue -
          pdpResponse.winningSellerPrice.doubleValue
      });
    }
  }

  if (pdpResponse && pdpResponse.seo && pdpResponse.seo.breadcrumbs) {
    let categoryName =
      pdpResponse.seo.breadcrumbs[pdpResponse.seo.breadcrumbs.length - 1].name;
    categoryName = categoryName.replace(/ /g, "_");
    Object.assign(data.cpj.product, {
      category: categoryName
    });
  }
  if (
    window.digitalData &&
    window.digitalData.page &&
    window.digitalData.page.pageInfo.pageName
  ) {
    Object.assign(data, {
      cpj: {
        pdp: {
          findingMethod:
            window.digitalData &&
            window.digitalData.page &&
            window.digitalData.page.pageInfo.pageName
        }
      }
    });
  }
  return data;
}

function getDigitalDataForHome() {
  const data = {
    page: {
      category: {
        primaryCategory: "home"
      },
      pageInfo: {
        pageName: "homepage"
      }
    }
  };
  if (
    window.digitalData &&
    window.digitalData.page &&
    window.digitalData.page.pageInfo.pageName
  ) {
    Object.assign(data, {
      cpj: {
        pdp: {
          findingMethod:
            window.digitalData &&
            window.digitalData.page &&
            window.digitalData.page.pageInfo.pageName
        }
      }
    });
  }
  return data;
}
function getDigitalDataForCart(type, cartResponse) {
  let data = {
    page: {
      category: {
        primaryCategory: "cart"
      },
      pageInfo: {
        pageName: "cart"
      }
    }
  };
  const productIds = getProductIdArray(cartResponse);
  if (productIds) {
    Object.assign(data, {
      cpj: { product: { id: JSON.stringify(productIds) } }
    });
  }
  return data;
}
function getDigitalDataForCheckout(type, CheckoutResponse) {
  let data = {
    page: {
      category: {
        primaryCategory: "multistepcheckoutsummary"
      },
      pageInfo: {
        pageName: "multi checkout summary page"
      }
    }
  };
  const productIds = getProductIdArray(CheckoutResponse);
  if (productIds) {
    Object.assign(data, {
      cpj: { product: { id: JSON.stringify(productIds) } }
    });
  }
  return data;
}

function getDigitalDataForOrderConfirmation(type, response) {
  let data = {
    page: {
      category: {
        primaryCategory: "orderconfirmation"
      },
      pageInfo: {
        pageName: "order confirmation page"
      }
    }
  };

  const productIds = getProductIdArray(response);
  if (productIds) {
    Object.assign(data, {
      cpj: { product: { id: JSON.stringify(productIds) } }
    });
  }
  return data;
}
// this function will update data with  cpj.proudct.id with
// reponse product's ids . this is using in many place thats why we
// need to make separate function for product ids
function getProductIdArray(response) {
  if (response && response.products && response.products.length > 0) {
    return response.products.map(product => {
      return product.productcode;
    });
  } else {
    return null;
  }
}
export async function getMcvId() {
  return new Promise((resolve, reject) => {
    let amcvCookieValue = getCookieValue(ADOBE_TARGET_COOKIE_NAME).split(
      ADOBE_TARGET_SPLIT_VALUE
    );
    let mcvId =
      amcvCookieValue[amcvCookieValue.indexOf(ADOBE_TARGET_MCMID) + 1];
    if (mcvId && mcvId.length > 0) {
      resolve(mcvId);
    } else {
      const intervalId = setInterval(() => {
        amcvCookieValue = getCookieValue(ADOBE_TARGET_COOKIE_NAME).split(
          ADOBE_TARGET_SPLIT_VALUE
        );
        mcvId =
          amcvCookieValue[amcvCookieValue.indexOf(ADOBE_TARGET_MCMID) + 1];
        if (mcvId) {
          clearInterval(intervalId);
          resolve(mcvId);
        }
      }, ADOBE_TARGET_WAIT_TIME);
    }
  });
}
export function setDataLayerForPdpDirectCalls(type, layerData: null) {
  let data = window.digitalData;

  if (type === SET_DATA_LAYER_FOR_ADD_TO_BAG_EVENT) {
    window._satellite.track(ADOBE_ADD_TO_CART);
  }
  if (type === SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT) {
    window._satellite.track(ADOBE_SAVE_PRODUCT);
  }
  if (type === SET_DATA_LAYER_FOR_EMI_BANK_EVENT) {
    Object.assign(data.cpj, {
      emi: { bank: layerData.replace(/ /g, "_").toLowerCase() }
    });
    window._satellite.track(ADOBE_EMI_BANK_SELECT_ON_PDP);
  }
  window.digitalData = data;
}

export function setDataLayerForDirectCallsOnCart(type, response) {
  console.log(response);
  let data = {};
  window._satellite.track(ADOBE_SATELLITE_CODE_FOR_PRODUCT_REMOVE_ON_CART);
}
