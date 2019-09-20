import * as pdpActions from "../actions/pdp.actions";
import { FOLLOW_AND_UN_FOLLOW_BRANDS_IN_PDP_SUCCESS } from "../../account/actions/account.actions";
import {
  YES,
  NO,
  CART_DETAILS_FOR_ANONYMOUS,
  LOGGED_IN_USER_DETAILS,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CUSTOMER_ACCESS_TOKEN
} from "../../lib/constants";
import { transferPincodeToPdpPincode } from "./utils";
import { CLEAR_ERROR } from "../../general/error.actions.js";
import * as Cookies from "../../lib/Cookie";

import concat from "lodash.concat";
import cloneDeep from "lodash.clonedeep";
const productDescription = (
  state = {
    status: null,
    error: null,
    loading: false,
    aboutTheBrand: null,
    productDetails: null,
    isServiceableToPincode: null,
    sizeGuide: {
      loading: false,
      sizeGuideList: []
    },
    emiResult: null,
    loadingForEmiResult: false,
    reviews: {},
    reviewsStatus: null,
    loadingForAddProduct: false,
    addReviewStatus: false,
    reviewsError: null,
    msdItems: {},
    emiTerms: null,
    storeDetails: null,
    storeStatus: null,
    storeError: null,
    showPiqPage: false,
    loadingForCliqAndPiq: false,
    visitedNewProduct: false,
    getProductDetailsLoading: false,
    serviceableSellerMessage: null,
    serviceablePincodeListResponse: null,

    manufacturerStatus: null,
    manufacturerError: null,
    manufacturerLoading: null,
    manufacturerDetails: {},
    bundleProductData: null,

    openInAppStatus: null,
    openInAppDetails: [],
    openInAppLoading: false,
    openInAppError: null
  },
  action
) => {
  let sizeGuide, currentBrandDetails;
  switch (action.type) {
    case CLEAR_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        status: null,
        reviewsError: null,
        addReviewStatus: null
      });
    case pdpActions.GET_EMI_TERMS_AND_CONDITIONS_FAILURE:
      return Object.assign({}, state, {
        emiTerms: {
          loading: false,
          error: action.error,
          status: action.status
        }
      });
    case pdpActions.GET_EMI_TERMS_AND_CONDITIONS_REQUEST:
      return Object.assign({}, state, {
        emiTerms: null,
        loading: true,
        status: action.status
      });
    case pdpActions.GET_EMI_TERMS_AND_CONDITIONS_SUCCESS:
      return Object.assign({}, state, {
        emiTerms: {
          loading: false,
          status: action.status,
          data: action.emiTerms
        }
      });
    case pdpActions.PRODUCT_DESCRIPTION_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        getProductDetailsLoading: true,
        loading: true,
        productDetails: null
      });

    case pdpActions.PRODUCT_DESCRIPTION_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        productDetails: action.productDescription,
        loading: false,
        getProductDetailsLoading: false,
        visitedNewProduct: true
      });

    case pdpActions.PRODUCT_DESCRIPTION_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false,
        getProductDetailsLoading: false,
        visitedNewProduct: true
      });
    case pdpActions.SET_TO_OLD:
      return Object.assign({}, state, {
        visitedNewProduct: false
      });

    case pdpActions.CHECK_PRODUCT_PIN_CODE_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true,
        serviceablePincodeListResponse: null
      });

    case pdpActions.CHECK_PRODUCT_PIN_CODE_SUCCESS:
      const currentPdpDetail = cloneDeep(state.productDetails);
      let listOfAllServiceableUssid;
      let pincodeListResponse;
      if (
        action.productPinCode &&
        action.productPinCode.deliveryOptions &&
        action.productPinCode.deliveryOptions.pincodeListResponse
      ) {
        listOfAllServiceableUssid = action.productPinCode.deliveryOptions.pincodeListResponse.filter(
          delivery => {
            return delivery.isServicable === YES;
          }
        );
        pincodeListResponse =
          action.productPinCode.deliveryOptions.pincodeListResponse;
      }

      let eligibleDeliveryModes = [];
      /*
      check for if seller already serviceable for current pin code then
      just update eligibleValidDeliveryModes
      and pincodeResponse to reducer
      */
      let serviceableForExistingSeller = listOfAllServiceableUssid.find(
        seller => {
          return seller.ussid === currentPdpDetail.winningUssID;
        }
      );
      if (
        serviceableForExistingSeller &&
        !currentPdpDetail.isUpdatedOtherSellerList
      ) {
        eligibleDeliveryModes = transferPincodeToPdpPincode(
          serviceableForExistingSeller.validDeliveryModes
        );
        Object.assign(currentPdpDetail, {
          eligibleDeliveryModes,
          slaveData: serviceableForExistingSeller.validDeliveryModes,
          isServiceableToPincode: {
            status: YES,
            pinCode: action.productPinCode.pinCode
          }
        });
      } else if (
        listOfAllServiceableUssid.length &&
        currentPdpDetail.otherSellers
      ) {
        Object.assign(currentPdpDetail, {
          serviceableSellerMessage:
            "Finding a serviceable seller on the selected pincode, the price of the product may be different"
        });
        let otherSellersList = currentPdpDetail.otherSellers;
        let leastMrpSellerUssid = {
          specialPriceSeller: {
            value: 999999999
          }
        };
        let eligibleDeliveryModeForThisSeller;
        listOfAllServiceableUssid.forEach(seller => {
          let sellerObjInOtherSellers = currentPdpDetail.otherSellers.find(
            otherSeller => {
              return otherSeller.USSID === seller.ussid;
            }
          );
          if (
            sellerObjInOtherSellers &&
            sellerObjInOtherSellers.specialPriceSeller &&
            sellerObjInOtherSellers.specialPriceSeller.value <
              leastMrpSellerUssid.specialPriceSeller.value
          ) {
            leastMrpSellerUssid = sellerObjInOtherSellers;
            eligibleDeliveryModeForThisSeller = seller;
          }
        });
        eligibleDeliveryModes = transferPincodeToPdpPincode(
          eligibleDeliveryModeForThisSeller.validDeliveryModes
        );
        let isAlreadyExistSeller = otherSellersList.find(seller => {
          return seller.USSID === currentPdpDetail.winningUssID;
        });
        if (!isAlreadyExistSeller) {
          otherSellersList.push({
            USSID: currentPdpDetail.winningUssID,
            availableStock: "0",
            eligibleDeliveryModes: currentPdpDetail.eligibleDeliveryModes,
            fullfillmentType: currentPdpDetail.fulfillmentType,
            isCOD: currentPdpDetail.isCOD,
            isEMIEligible: currentPdpDetail.isEMIEligible,
            mrpSeller: currentPdpDetail.winningSellerPrice,
            sellerId: currentPdpDetail.winningSellerID,
            sellerName: currentPdpDetail.winningSellerName,
            specialPriceSeller: currentPdpDetail.winningSellerPrice
          });
        }
        Object.assign(currentPdpDetail, {
          availableStock: leastMrpSellerUssid.availableStock,
          isCOD: leastMrpSellerUssid.isCOD,
          isEMIEligible: leastMrpSellerUssid.isEMIEligible,
          winningSellerPrice: leastMrpSellerUssid.specialPriceSeller,
          sellerAssociationstatus: leastMrpSellerUssid.sellerAssociationstatus,
          winningSellerName: leastMrpSellerUssid.sellerName,
          eligibleDeliveryModes,
          slaveData: eligibleDeliveryModeForThisSeller.validDeliveryModes,
          winningUssID: leastMrpSellerUssid.USSID,
          otherSellers: otherSellersList,
          isUpdatedOtherSellerList: true,
          isServiceableToPincode: {
            status: YES,
            pinCode: action.productPinCode.pinCode
          }
        });
      } else {
        Object.assign(currentPdpDetail, {
          isServiceableToPincode: {
            status: NO,
            pinCode: action.productPinCode.pinCode
          }
        });
      }

      return Object.assign({}, state, {
        status: action.status,
        productDetails: currentPdpDetail,
        loading: false,
        serviceablePincodeListResponse: pincodeListResponse
      });

    case pdpActions.CHECK_PRODUCT_PIN_CODE_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false,
        serviceablePincodeListResponse: null
      });

    case pdpActions.ADD_PRODUCT_TO_CART_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.ADD_PRODUCT_TO_CART_SUCCESS:
      const userDetails = Cookies.getCookie(LOGGED_IN_USER_DETAILS);
      const customerCookie = Cookies.getCookie(CUSTOMER_ACCESS_TOKEN);
      if (!userDetails && !customerCookie) {
        Cookies.createCookie(
          CART_DETAILS_FOR_ANONYMOUS,
          JSON.stringify(action.newProduct)
        );
      } else if (userDetails && customerCookie) {
        Cookies.createCookie(
          CART_DETAILS_FOR_LOGGED_IN_USER,
          JSON.stringify(action.newProduct)
        );
      }

      return Object.assign({}, state, {
        status: action.status,
        loading: false
      });

    case pdpActions.ADD_PRODUCT_TO_CART_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case pdpActions.PRODUCT_SIZE_GUIDE_REQUEST:
      sizeGuide = {
        loading: true,
        data: null
      };
      return Object.assign({}, state, {
        status: action.status,
        sizeGuide
      });

    case pdpActions.PRODUCT_SIZE_GUIDE_SUCCESS:
      sizeGuide = {
        loading: false,
        data: action.sizeGuide
      };
      return Object.assign({}, state, {
        status: action.status,
        sizeGuide
      });

    case pdpActions.PRODUCT_SIZE_GUIDE_FAILURE:
      sizeGuide = {
        loading: false,
        error: action.error
      };
      return Object.assign({}, state, {
        status: action.status,
        sizeGuide
      });

    case pdpActions.PRODUCT_SIZE_CHART_REQUEST:
      sizeGuide = {
        loading: true,
        data: null
      };
      return Object.assign({}, state, {
        status: action.status,
        sizeGuide
      });

    case pdpActions.PRODUCT_SIZE_CHART_SUCCESS:
      sizeGuide = {
        loading: false,
        data: action.sizeChart
      };
      return Object.assign({}, state, {
        status: action.status,
        sizeGuide
      });

    case pdpActions.PRODUCT_SIZE_CHART_FAILURE:
      sizeGuide = {
        loading: false,
        error: action.error
      };
      return Object.assign({}, state, {
        status: action.status,
        sizeGuide
      });

    case pdpActions.PRODUCT_PDP_EMI_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loadingForEmiResult: true
      });

    case pdpActions.PRODUCT_PDP_EMI_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        emiResult: action.emiResult,
        loadingForEmiResult: false
      });

    case pdpActions.PRODUCT_PDP_EMI_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loadingForEmiResult: false
      });

    case pdpActions.PRODUCT_SPECIFICATION_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.PRODUCT_SPECIFICATION_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        productDetails: action.productDetails,
        loading: false
      });

    case pdpActions.PRODUCT_SPECIFICATION_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case pdpActions.ADD_PRODUCT_REVIEW_REQUEST:
      return Object.assign({}, state, {
        addReviewStatus: action.status,
        loadingForAddProduct: true
      });

    case pdpActions.ADD_PRODUCT_REVIEW_SUCCESS:
      return Object.assign({}, state, {
        addReviewStatus: action.status,
        loadingForAddProduct: false
      });

    case pdpActions.ADD_PRODUCT_REVIEW_FAILURE:
      return Object.assign({}, state, {
        addReviewStatus: action.status,
        reviewsError: action.error,
        loadingForAddProduct: false
      });

    case pdpActions.EDIT_PRODUCT_REVIEW_REQUEST:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        loading: true
      });

    case pdpActions.EDIT_PRODUCT_REVIEW_SUCCESS:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        loading: false
      });

    case pdpActions.EDIT_PRODUCT_REVIEW_FAILURE:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        reviewsError: action.error,
        loading: false
      });
    case pdpActions.DELETE_PRODUCT_REVIEW_REQUEST:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        loading: true
      });

    case pdpActions.DELETE_PRODUCT_REVIEW_SUCCESS:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        loading: false
      });

    case pdpActions.DELETE_PRODUCT_REVIEW_FAILURE:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        reviewsError: action.error,
        loading: false
      });

    case pdpActions.GET_PRODUCT_REVIEW_REQUEST:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        loading: true
      });

    case pdpActions.GET_PRODUCT_REVIEW_SUCCESS:
      const currentReviews = cloneDeep(state.reviews);
      let updatedReviewsObj;
      if (action.reviews.pageNumber === 0) {
        updatedReviewsObj = Object.assign({}, currentReviews, action.reviews);
      } else {
        let updatedReviews = concat(
          currentReviews.reviews,
          action.reviews.reviews
        );
        updatedReviewsObj = Object.assign({}, currentReviews, {
          reviews: updatedReviews,
          pageNumber: action.reviews.pageNumber
        });
      }

      return Object.assign({}, state, {
        reviewsStatus: action.status,
        reviews: updatedReviewsObj,
        loading: false
      });

    case pdpActions.GET_PRODUCT_REVIEW_FAILURE:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        reviewsError: action.error,
        loading: false
      });

    case pdpActions.PRODUCT_MSD_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.PRODUCT_MSD_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        msdItems: action.msdItems,
        loading: false
      });

    case pdpActions.PRODUCT_MSD_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        msdItems: {},
        error: action.error,
        loading: false
      });

    case pdpActions.GET_PDP_ITEMS_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.GET_PDP_ITEMS_SUCCESS:
      const newMsdItems = cloneDeep(state.msdItems);
      newMsdItems[action.widgetKey] = action.items;
      return Object.assign({}, state, {
        status: action.status,
        msdItems: newMsdItems,
        loading: false
      });
    case pdpActions.GET_PDP_ITEMS_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        msdItems: {},
        loading: false
      });
    case pdpActions.PDP_ABOUT_BRAND_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        aboutTheBrand: action.brandDetails,
        loading: false
      });
    case pdpActions.PDP_ABOUT_BRAND_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        aboutTheBrand: null,
        loading: false
      });
    case pdpActions.FOLLOW_UN_FOLLOW_BRAND_REQUEST:
      return Object.assign({}, state, {
        status: action.status
      });

    case FOLLOW_AND_UN_FOLLOW_BRANDS_IN_PDP_SUCCESS:
      currentBrandDetails = cloneDeep(state.aboutTheBrand);
      currentBrandDetails.isFollowing = action.followStatus;
      return Object.assign({}, state, {
        status: action.status,
        aboutTheBrand: currentBrandDetails
      });
    case pdpActions.FOLLOW_UN_FOLLOW_BRAND_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error
      });
    case pdpActions.GET_ALL_STORES_FOR_CLIQ_AND_PIQ_REQUEST:
      return Object.assign({}, state, {
        storeStatus: action.status,
        loadingForCliqAndPiq: true
      });

    case pdpActions.GET_ALL_STORES_FOR_CLIQ_AND_PIQ_SUCCESS:
      return Object.assign({}, state, {
        storeStatus: action.status,
        storeDetails: action.storeDetails,
        loadingForCliqAndPiq: false
      });

    case pdpActions.GET_ALL_STORES_FOR_CLIQ_AND_PIQ_FAILURE:
      return Object.assign({}, state, {
        storeDetails: null,
        storeStatus: action.status,
        storeError: action.error,
        loadingForCliqAndPiq: false
      });
    case pdpActions.SHOW_PDP_PIQ_PAGE:
      return Object.assign({}, state, {
        showPiqPage: true
      });
    case pdpActions.HIDE_PDP_PIQ_PAGE:
      return Object.assign({}, state, {
        showPiqPage: false
      });

    case pdpActions.PDP_OFFER_REQUEST:
      return Object.assign({}, state, {
        offerStatus: action.status,
        offerLoading: true,
        offerDetails: [],
        impulseOfferCalloutList: [],
        productDescription: null
      });
    case pdpActions.PDP_OFFER_SUCCESS:
      return Object.assign({}, state, {
        offerStatus: action.status,
        offerDetails: action.offers,
        impulseOfferCalloutList: action.impulseOfferCalloutList,
        offerLoading: false
      });
    case pdpActions.PDP_OFFER_FAILURE:
      return Object.assign({}, state, {
        offerStatus: action.status,
        offerError: action.error,
        offerLoading: false
      });

    case pdpActions.PDP_MANUFACTURER_REQUEST:
      return Object.assign({}, state, {
        manufacturerStatus: action.status,
        manufacturerLoading: true
      });

    case pdpActions.PDP_MANUFACTURER_SUCCESS:
      return Object.assign({}, state, {
        manufacturerStatus: action.status,
        manufacturerDetails: action.manufacturers,
        manufacturerLoading: false
      });

    case pdpActions.PDP_MANUFACTURER_FAILURE:
      return Object.assign({}, state, {
        manufacturerStatus: action.status,
        manufacturerError: action.error,
        manufacturerLoading: false
      });
    // case pdpActions.GET_PDP_ITEMS_FAILURE:
    //   return Object.assign({}, state, {
    //     status: action.status,
    //     bundledProductData: {},
    //     loading: false
    //   });
    case pdpActions.BUNDLE_PRODUCT_FAILURE:
      return Object.assign({}, state, {
        bundleProducStatus: action.status
      });
    case pdpActions.BUNDLE_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        bundleProducStatus: action.status,
        bundleProductData: action.data
      });
    case pdpActions.BUNDLE_PRODUCT_REQUEST:
      return Object.assign({}, state, {
        bundleProducStatus: action.status
      });
    case pdpActions.CHECK_BUNDLE_PRODUCT_PIN_CODE_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.CHECK_BUNDLE_PRODUCT_PIN_CODE_SUCCESS:
      const currentBndlePdpDetail = cloneDeep(state.bundleProductData);
      const bundleProductussId = action.productPinCode.ussId;

      let listOfAllBundleServiceableUssid;
      if (
        action.productPinCode &&
        action.productPinCode.deliveryOptions &&
        action.productPinCode.deliveryOptions.pincodeListResponse
      ) {
        listOfAllBundleServiceableUssid = action.productPinCode.deliveryOptions.pincodeListResponse.filter(
          delivery => {
            return delivery.isServicable === YES;
          }
        );
      }
      let eligibleBundleProductDeliveryModes = [];
      let serviceableForExistingBundleProductSeller = listOfAllBundleServiceableUssid.find(
        seller => {
          return bundleProductussId === currentBndlePdpDetail.winningUssID;
        }
      );
      if (
        serviceableForExistingBundleProductSeller &&
        !currentBndlePdpDetail.isUpdatedOtherSellerList
      ) {
        eligibleBundleProductDeliveryModes = transferPincodeToPdpPincode(
          serviceableForExistingBundleProductSeller.validDeliveryModes
        );

        if (
          serviceableForExistingBundleProductSeller.stockCount > 0 ||
          serviceableForExistingBundleProductSeller.isServicable === "Y"
        ) {
          Object.assign(currentBndlePdpDetail, {
            eligibleBundleProductDeliveryModes,
            slaveData:
              serviceableForExistingBundleProductSeller.validDeliveryModes,
            isServiceableForBundleProductPincode: {
              status: YES,
              pinCode: action.productPinCode.pinCode,
              stockCount: serviceableForExistingBundleProductSeller.stockCount,
              isServicable:
                serviceableForExistingBundleProductSeller.isServicable
            }
          });
        } else {
          Object.assign(currentBndlePdpDetail, {
            eligibleBundleProductDeliveryModes,
            slaveData:
              serviceableForExistingBundleProductSeller.validDeliveryModes,
            isServiceableForBundleProductPincode: {
              status: NO,
              pinCode: action.productPinCode.pinCode,
              stockCount: serviceableForExistingBundleProductSeller.stockCount,
              isServicable:
                serviceableForExistingBundleProductSeller.isServicable
            }
          });
        }
      } else if (
        listOfAllBundleServiceableUssid.length &&
        currentBndlePdpDetail.otherSellers
      ) {
        let otherSellersList = currentBndlePdpDetail.otherSellers;
        let leastMrpSellerUssid = { specialPriceSeller: { value: 999999999 } };
        let eligibleDeliveryModeForBundleThisSeller;
        listOfAllBundleServiceableUssid.forEach(seller => {
          let sellerObjInOtherSellers = currentBndlePdpDetail.otherSellers.find(
            otherSeller => {
              return otherSeller.USSID === seller.ussid;
            }
          );
          if (
            sellerObjInOtherSellers &&
            sellerObjInOtherSellers.specialPriceSeller &&
            sellerObjInOtherSellers.specialPriceSeller.value <
              leastMrpSellerUssid.specialPriceSeller.value
          ) {
            leastMrpSellerUssid = sellerObjInOtherSellers;
            eligibleDeliveryModeForBundleThisSeller = seller;
          }
        });
        eligibleDeliveryModes = transferPincodeToPdpPincode(
          eligibleDeliveryModeForBundleThisSeller.validDeliveryModes
        );
        let isAlreadyExistSeller = otherSellersList.find(seller => {
          return seller.USSID === currentBndlePdpDetail.winningUssID;
        });
        if (!isAlreadyExistSeller) {
          otherSellersList.push({
            USSID: currentBndlePdpDetail.winningUssID,
            availableStock: "0",
            eligibleDeliveryModes: currentBndlePdpDetail.eligibleDeliveryModes,
            fullfillmentType: currentBndlePdpDetail.fulfillmentType,
            isCOD: currentBndlePdpDetail.isCOD,
            isEMIEligible: currentBndlePdpDetail.isEMIEligible,
            mrpSeller: currentBndlePdpDetail.winningSellerPrice,
            sellerId: currentBndlePdpDetail.winningSellerID,
            sellerName: currentBndlePdpDetail.winningSellerName,
            specialPriceSeller: currentBndlePdpDetail.winningSellerPrice,
            stockCount: serviceableForExistingBundleProductSeller.stockCount,
            isServicable: serviceableForExistingBundleProductSeller.isServicable
          });
        }
        Object.assign(currentBndlePdpDetail, {
          availableStock: leastMrpSellerUssid.availableStock,
          isCOD: leastMrpSellerUssid.isCOD,
          isEMIEligible: leastMrpSellerUssid.isEMIEligible,
          winningSellerPrice: leastMrpSellerUssid.specialPriceSeller,
          sellerAssociationstatus: leastMrpSellerUssid.sellerAssociationstatus,
          winningSellerName: leastMrpSellerUssid.sellerName,
          eligibleDeliveryModes,
          slaveData: eligibleDeliveryModeForBundleThisSeller.validDeliveryModes,
          winningUssID: leastMrpSellerUssid.USSID,
          otherSellers: otherSellersList,
          isUpdatedOtherSellerList: true,
          isServiceableForBundleProductPincode: {
            status: YES,
            BundlePinCode: action.productPinCode.pinCode,
            stockCount: serviceableForExistingBundleProductSeller.stockCount,
            isServicable: serviceableForExistingBundleProductSeller.isServicable
          }
        });
      } else {
        Object.assign(currentBndlePdpDetail, {
          isServiceableForBundleProductPincode: {
            status: NO,
            BundlePinCode: action.productPinCode.pinCode,
            stockCount: serviceableForExistingBundleProductSeller.stockCount,
            isServicable: serviceableForExistingBundleProductSeller.isServicable
          }
        });
      }

      return Object.assign({}, state, {
        status: action.status,
        bundleProductData: currentBndlePdpDetail,
        loading: false
      });

    case pdpActions.CHECK_BUNDLE_PRODUCT_PIN_CODE_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case pdpActions.OPEN_IN_APP_REQUEST:
      return Object.assign({}, state, {
        openInAppStatus: action.status,
        openInAppLoading: true
      });

    case pdpActions.OPEN_IN_APP_SUCCESS:
      return Object.assign({}, state, {
        openInAppStatus: action.status,
        openInAppDetails: action.openInAppDetails,
        openInAppLoading: false
      });

    case pdpActions.OPEN_IN_APP_FAILURE:
      return Object.assign({}, state, {
        openInAppStatus: action.status,
        openInAppError: action.error,
        openInAppLoading: false
      });

    default:
      return state;
  }
};

export default productDescription;
