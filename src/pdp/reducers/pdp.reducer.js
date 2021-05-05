import * as pdpActions from "../actions/pdp.actions";
import { FOLLOW_AND_UN_FOLLOW_BRANDS_IN_PDP_SUCCESS } from "../../account/actions/account.actions";
import {
    YES,
    NO,
    CART_DETAILS_FOR_ANONYMOUS,
    LOGGED_IN_USER_DETAILS,
    CART_DETAILS_FOR_LOGGED_IN_USER,
    CUSTOMER_ACCESS_TOKEN,
} from "../../lib/constants";
import { transferPincodeToPdpPincode } from "./utils";
import { CLEAR_ERROR } from "../../general/error.actions.js";
import * as Cookies from "../../lib/Cookie";
import concat from "lodash.concat";
import cloneDeep from "lodash.clonedeep";
import { getCustomerAccessToken, getLoggedInUserDetails } from "../../lib/getCookieDetails.js";

const productDescription = (
    state = {
        status: null,
        error: null,
        loading: false,
        aboutTheBrand: null,
        recentlyViewedProduct: {},
        productDetails: null,
        isServiceableToPincode: null,
        sizeGuide: {
            loading: false,
            sizeGuideList: [],
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
        recommendedItems: {},

        manufacturerStatus: null,
        manufacturerError: null,
        manufacturerLoading: null,
        manufacturerDetails: {},
        bundleProductData: null,
        openInAppStatus: null,
        openInAppDetails: [],
        openInAppLoading: false,
        openInAppError: null,
        bundleProducStatus: null,
        relevantBundleProductLoading: false,
        relevantBundleProductData: null,
        relevantBundleProductStatus: false,
        secondaryBundleProductStatus: false,
        secondaryBundleProductData: null,
        relevantProductPinCodeStatus: null,
        relevantBundleProductCodeStatus: false,
        relevantBundleProductCodeData: null,

        exchangeDetailsStatus: null,
        exchangeDetailsLoading: false,
        exchangeDetails: null,
        exchangeDetailsError: null,

        checkIMEINumberStatus: null,
        checkIMEINumberLoading: false,
        checkIMEINumberDetails: null,
        checkIMEINumberError: null,

        pincodeError: null,
        productOutOfStockMessage: null,
        productNotServiceableMessage: null,
        serviceableOtherSellersUssid: null,
        addToCartResponseLoading: false,
        addToCartResponseDetails: null,
        checkPincodeDetailsLoading: false,
        checkPincodeFromHaptikChatbot: false,

        getBundledProductSuggestionStatus: null,
        getBundledProductSuggestionLoading: false,
        getBundledProductSuggestionDetails: null,
        getBundledProductSuggestionError: null,

        getTotalBundledPriceStatus: null,
        getTotalBundledPriceLoading: false,
        getTotalBundledPriceDetails: null,
        getTotalBundledPriceError: null,

        addBundledProductsToCartStatus: null,
        addBundledProductsToCartLoading: false,
        addBundledProductsToCartDetails: null,
        addBundledProductsToCartError: null,
        masterTemplateStatus: null,
        masterTemplateLoading: false,
        masterTemplateDetails: null,
        masterTemplateError: null,
        howToWearStatus: null,
        howToWearLoading: false,
        howToWearDetails: null,
        howToWearError: null,
        moreFromBrandStatus: null,
        moreFromBrandLoading: false,
        moreFromBrandDetails: null,
        moreFromBrandError: null,
        aboutTheBrandStatus: null,
        aboutTheBrandLoading: false,
        aboutTheBrandDetails: null,
        aboutTheBrandError: null,
        similarProductStatus: null,
        similarProductLoading: false,
        similarProductDetails: null,
        similarProductError: null,
        beautyPopupModal: false,

        getAppliancesExchangeDetailsStatus: null,
        getAppliancesExchangeDetailsLoading: false,
        getAppliancesExchangeDetails: null,
        getAppliancesExchangeDetailsError: null,

        updatedAppliancesExchangeDetailsStatus: null,
        updatedAppliancesExchangeDetails: null,
        updatedAppliancesExchangeDetailsLoading: false,

        appliancesExchangeCheckPincodeStatus: null,
        appliancesExchangeCheckPincodeLoading: false,
        appliancesExchangeCheckPincodeError: null,
        appliancesExchangeCheckPincodeDetails: null,

        paramsEligibleToRateStatus: null,
        paramsEligibleToRateLoading: false,
        paramsEligibleToRateError: null,
        paramsEligibleToRateDetails: null,

        submitParameterRatingStatus: null,
        submitParameterRatingLoading: false,
        submitParameterRatingError: null,
        submitParameterRatingDetails: null,

        getTitleSuggestionsStatus: null,
        getTitleSuggestionsLoading: false,
        getTitleSuggestionsError: null,
        getTitleSuggestionsDetails: null,
        addReviewDetails: null,

        getReviewsOnProductPageStatus: null,
        getReviewsOnProductPageLoading: false,
        getReviewsOnProductPageError: null,
        getReviewsOnProductPageDetails: null,

        getRatingSummaryStatus: null,
        getRatingSummaryLoading: false,
        getRatingSummaryError: null,
        getRatingSummaryDetails: null,

        getPdpReviewsStatus: null,
        getPdpReviewsLoading: false,
        getPdpReviewsError: null,
        getPdpReviewsDetails: null,
    },
    action
) => {
    let sizeGuide, currentBrandDetails;
    const loggedInUserDetails = getLoggedInUserDetails();
    const customerAccessToken = getCustomerAccessToken();
    switch (action.type) {
        case CLEAR_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                status: null,
                reviewsError: null,
                addReviewStatus: null,
            });
        case pdpActions.GET_EMI_TERMS_AND_CONDITIONS_FAILURE:
            return Object.assign({}, state, {
                emiTerms: {
                    loading: false,
                    error: action.error,
                    status: action.status,
                },
            });
        case pdpActions.CLEAR_ALL_MSD_ITEMS:
            return {
                ...state,
                msdItems: {},
            };
        case pdpActions.GET_EMI_TERMS_AND_CONDITIONS_REQUEST:
            return Object.assign({}, state, {
                emiTerms: null,
                loading: true,
                status: action.status,
            });
        case pdpActions.GET_EMI_TERMS_AND_CONDITIONS_SUCCESS:
            return Object.assign({}, state, {
                emiTerms: {
                    loading: false,
                    status: action.status,
                    data: action.emiTerms,
                },
            });
        case pdpActions.PRODUCT_DESCRIPTION_REQUEST:
            return Object.assign({}, state, {
                status: action.status,
                getProductDetailsLoading: true,
                loading: true,
                productDetails: null,
            });

        case pdpActions.PRODUCT_DESCRIPTION_SUCCESS: {
            let productData = cloneDeep(action.productDescription);
            if (
                productData &&
                productData.categoryHierarchy &&
                productData.categoryHierarchy[0] &&
                productData.categoryHierarchy[0].category_name === "Eyewear" &&
                productData.isSizeOrLength === "Power"
            ) {
                productData.variantOptions = getSortedPowerList(productData.variantOptions);
            }
            return Object.assign({}, state, {
                status: action.status,
                productDetails: productData,
                loading: false,
                getProductDetailsLoading: false,
                visitedNewProduct: true,
            });
        }

        case pdpActions.PRODUCT_DESCRIPTION_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                error: action.error,
                loading: false,
                getProductDetailsLoading: false,
                visitedNewProduct: true,
            });
        case pdpActions.SET_TO_OLD:
            return Object.assign({}, state, {
                visitedNewProduct: false,
            });
        case pdpActions.CHECK_PRODUCT_PIN_CODE_REQUEST:
            return Object.assign({}, state, {
                status: action.status,
                loading: true,
                serviceablePincodeListResponse: null,
                pincodeError: null,
                checkPincodeDetailsLoading: true,
            });

        case pdpActions.CHECK_PRODUCT_PIN_CODE_SUCCESS:
            const currentPdpDetail = cloneDeep(state.productDetails);
            let listOfAllServiceableUssid = [];
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
                pincodeListResponse = action.productPinCode.deliveryOptions.pincodeListResponse;
            }

            //find all other sellers serviceable in a given pincode with stock count > 0
            let potentialAvailableOtherSellers = [];
            let actualServiceableOtherSellers = [];
            let pinCodeResponse = pincodeListResponse;
            let serviceableOtherSellersUssid = null;
            potentialAvailableOtherSellers = currentPdpDetail.otherSellers;
            actualServiceableOtherSellers =
                potentialAvailableOtherSellers &&
                potentialAvailableOtherSellers.filter(otherSeller => {
                    return (
                        pinCodeResponse &&
                        pinCodeResponse.find(pincodeSeller => {
                            return (
                                otherSeller.USSID === pincodeSeller.ussid &&
                                otherSeller.availableStock > 0 &&
                                pincodeSeller.stockCount > 0 &&
                                pincodeSeller.isServicable === "Y"
                            );
                        })
                    );
                });

            if (actualServiceableOtherSellers && actualServiceableOtherSellers.length > 0) {
                serviceableOtherSellersUssid = actualServiceableOtherSellers;
            }

            let eligibleDeliveryModes = [];
            /*
      check for if seller already serviceable for current pin code then
      just update eligibleValidDeliveryModes
      and pincodeResponse to reducer
      */
            let serviceableForExistingSeller = listOfAllServiceableUssid.find(seller => {
                return seller.ussid === currentPdpDetail.winningUssID;
            });
            if (serviceableForExistingSeller && !currentPdpDetail.isUpdatedOtherSellerList) {
                eligibleDeliveryModes = transferPincodeToPdpPincode(serviceableForExistingSeller.validDeliveryModes);
                Object.assign(currentPdpDetail, {
                    eligibleDeliveryModes,
                    pincodeResponseList: action.productPinCode,
                    slaveData: serviceableForExistingSeller.validDeliveryModes,
                    isServiceableToPincode: {
                        city: action.productPinCode.city,
                        status: YES,
                        pinCode: action.productPinCode.pinCode,
                    },
                    isPickupAvailableForExchange: action.productPinCode.isPickupAvailableForExchange,
                    cashifyPickupCharge: action.productPinCode.cashifyPickupCharge,
                });
            } else if (listOfAllServiceableUssid.length && currentPdpDetail.otherSellers) {
                Object.assign(currentPdpDetail, {
                    serviceableSellerMessage:
                        "Finding a serviceable seller on the selected pincode, the price of the product may be different",
                });
                let otherSellersList = currentPdpDetail.otherSellers;
                let leastMrpSellerUssid = {
                    specialPriceSeller: {
                        value: 999999999,
                    },
                };
                let eligibleDeliveryModeForThisSeller;
                listOfAllServiceableUssid.forEach(seller => {
                    let sellerObjInOtherSellers = currentPdpDetail.otherSellers.find(otherSeller => {
                        return otherSeller.USSID === seller.ussid;
                    });
                    if (
                        sellerObjInOtherSellers &&
                        sellerObjInOtherSellers.specialPriceSeller &&
                        sellerObjInOtherSellers.specialPriceSeller.value < leastMrpSellerUssid.specialPriceSeller.value
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
                        specialPriceSeller: currentPdpDetail.winningSellerPrice,
                        showExchangeTag: currentPdpDetail.showExchangeTag,
                        exchangeAvailable: currentPdpDetail.exchangeAvailable,
                        exchangeOfferAvailable: currentPdpDetail.exchangeOfferAvailable,
                        maxExchangeAmount: currentPdpDetail.maxExchangeAmount,
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
                    pincodeResponseList: action.productPinCode,
                    isServiceableToPincode: {
                        city: action.productPinCode.city,
                        status: YES,
                        pinCode: action.productPinCode.pinCode,
                    },
                    showExchangeTag: leastMrpSellerUssid.showExchangeTag,
                    exchangeAvailable: leastMrpSellerUssid.exchangeAvailable,
                    exchangeOfferAvailable: leastMrpSellerUssid.exchangeOfferAvailable,
                    maxExchangeAmount: leastMrpSellerUssid.maxExchangeAmount,
                    isPickupAvailableForExchange: action.productPinCode.isPickupAvailableForExchange,
                    cashifyPickupCharge: action.productPinCode.cashifyPickupCharge,
                });
            } else {
                Object.assign(currentPdpDetail, {
                    pincodeResponseList: action.productPinCode,
                    isServiceableToPincode: {
                        city: action.productPinCode.city,
                        productOutOfStockMessage: action.productPinCode.productOutOfStockMessage,
                        productNotServiceableMessage: action.productPinCode.productNotServiceableMessage,
                        status: NO,
                        pinCode: action.productPinCode.pinCode,
                    },
                    isPickupAvailableForExchange: action.productPinCode.isPickupAvailableForExchange,
                });
            }
            return Object.assign({}, state, {
                status: action.status,
                productDetails: currentPdpDetail,
                loading: false,
                serviceablePincodeListResponse: pincodeListResponse,
                pincodeError: action.productPinCode.pincodeError,
                serviceableOtherSellersUssid: serviceableOtherSellersUssid,
                checkPincodeDetailsLoading: false,
                checkPincodeFromHaptikChatbot: action.productPinCode.checkPincodeFromHaptikChatbot,
            });

        case pdpActions.CHECK_PRODUCT_PIN_CODE_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                error: action.error,
                loading: false,
                serviceablePincodeListResponse: null,
                pincodeError: action.error,
                checkPincodeDetailsLoading: false,
            });

        case pdpActions.ADD_PRODUCT_TO_CART_REQUEST:
            return Object.assign({}, state, {
                status: action.status,
                addToCartResponseLoading: true,
            });

        case pdpActions.ADD_PRODUCT_TO_CART_SUCCESS:
            const userDetails = Cookies.getCookie(LOGGED_IN_USER_DETAILS);
            const customerCookie = Cookies.getCookie(CUSTOMER_ACCESS_TOKEN);

            // below code added for safari browser fix - cart related details saved in cookie
            // as exchange introduced , cookie size gots increased after saving details , so removing exchange details
            let cartInfoJson = action.newProduct;
            let products = cartInfoJson.products.filter(function(item) {
                delete item.exchangeDetails;
                return item;
            });
            cartInfoJson.products = products;

            if (userDetails && customerCookie) {
                Cookies.createCookie(CART_DETAILS_FOR_LOGGED_IN_USER, JSON.stringify(cartInfoJson));
            } else {
                Cookies.createCookie(CART_DETAILS_FOR_ANONYMOUS, JSON.stringify(cartInfoJson));
            }

            return Object.assign({}, state, {
                status: action.status,
                addToCartResponseDetails: cartInfoJson,
                addToCartResponseLoading: false,
            });

        case pdpActions.ADD_PRODUCT_TO_CART_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                error: action.error,
                addToCartResponseLoading: false,
            });

        case pdpActions.PRODUCT_SIZE_GUIDE_REQUEST:
            sizeGuide = {
                loading: true,
                data: null,
            };
            return Object.assign({}, state, {
                status: action.status,
                sizeGuide,
            });

        case pdpActions.PRODUCT_SIZE_GUIDE_SUCCESS:
            sizeGuide = {
                loading: false,
                data: action.sizeGuide,
            };
            return Object.assign({}, state, {
                status: action.status,
                sizeGuide,
            });

        case pdpActions.PRODUCT_SIZE_GUIDE_FAILURE:
            sizeGuide = {
                loading: false,
                error: action.error,
            };
            return Object.assign({}, state, {
                status: action.status,
                sizeGuide,
            });

        case pdpActions.PRODUCT_SIZE_CHART_REQUEST:
            sizeGuide = {
                loading: true,
                data: null,
            };
            return Object.assign({}, state, {
                status: action.status,
                sizeGuide,
            });

        case pdpActions.PRODUCT_SIZE_CHART_SUCCESS:
            sizeGuide = {
                loading: false,
                data: action.sizeChart,
            };
            return Object.assign({}, state, {
                status: action.status,
                sizeGuide,
            });

        case pdpActions.PRODUCT_SIZE_CHART_FAILURE:
            sizeGuide = {
                loading: false,
                error: action.error,
            };
            return Object.assign({}, state, {
                status: action.status,
                sizeGuide,
            });

        case pdpActions.PRODUCT_PDP_EMI_REQUEST:
            return Object.assign({}, state, {
                status: action.status,
                loadingForEmiResult: true,
            });

        case pdpActions.PRODUCT_PDP_EMI_SUCCESS:
            return Object.assign({}, state, {
                status: action.status,
                emiResult: action.emiResult,
                loadingForEmiResult: false,
            });

        case pdpActions.PRODUCT_PDP_EMI_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                error: action.error,
                loadingForEmiResult: false,
            });

        case pdpActions.PRODUCT_SPECIFICATION_REQUEST:
            return Object.assign({}, state, {
                status: action.status,
                loading: true,
            });

        case pdpActions.PRODUCT_SPECIFICATION_SUCCESS: {
            let productData = cloneDeep(action.productDetails);
            if (
                productData &&
                productData.categoryHierarchy &&
                productData.categoryHierarchy[0] &&
                productData.categoryHierarchy[0].category_name === "Eyewear" &&
                productData.isSizeOrLength === "Power"
            ) {
                productData.variantOptions = getSortedPowerList(productData.variantOptions);
            }
            return Object.assign({}, state, {
                status: action.status,
                productDetails: productData,
                loading: false,
            });
        }

        case pdpActions.PRODUCT_SPECIFICATION_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                error: action.error,
                loading: false,
            });

        case pdpActions.ADD_PRODUCT_REVIEW_REQUEST:
            return Object.assign({}, state, {
                addReviewStatus: action.status,
                loadingForAddProduct: true,
            });

        case pdpActions.ADD_PRODUCT_REVIEW_SUCCESS:
            return Object.assign({}, state, {
                addReviewStatus: action.status,
                loadingForAddProduct: false,
                addReviewDetails: action.productReview,
            });

        case pdpActions.ADD_PRODUCT_REVIEW_FAILURE:
            return Object.assign({}, state, {
                addReviewStatus: action.status,
                reviewsError: action.error,
                loadingForAddProduct: false,
                addReviewDetails: null,
            });

        case pdpActions.EDIT_PRODUCT_REVIEW_REQUEST:
            return Object.assign({}, state, {
                reviewsStatus: action.status,
                loading: true,
            });

        case pdpActions.EDIT_PRODUCT_REVIEW_SUCCESS:
            return Object.assign({}, state, {
                reviewsStatus: action.status,
                loading: false,
            });

        case pdpActions.EDIT_PRODUCT_REVIEW_FAILURE:
            return Object.assign({}, state, {
                reviewsStatus: action.status,
                reviewsError: action.error,
                loading: false,
            });
        case pdpActions.DELETE_PRODUCT_REVIEW_REQUEST:
            return Object.assign({}, state, {
                reviewsStatus: action.status,
                loading: true,
            });

        case pdpActions.DELETE_PRODUCT_REVIEW_SUCCESS:
            return Object.assign({}, state, {
                reviewsStatus: action.status,
                loading: false,
            });

        case pdpActions.DELETE_PRODUCT_REVIEW_FAILURE:
            return Object.assign({}, state, {
                reviewsStatus: action.status,
                reviewsError: action.error,
                loading: false,
            });

        case pdpActions.GET_PRODUCT_REVIEW_REQUEST:
            return Object.assign({}, state, {
                reviewsStatus: action.status,
                loading: true,
            });

        case pdpActions.GET_PRODUCT_REVIEW_SUCCESS:
            const currentReviews = cloneDeep(state.reviews);
            let updatedReviewsObj;
            if (action.reviews.pageNumber === 0) {
                updatedReviewsObj = Object.assign({}, currentReviews, action.reviews);
            } else {
                let updatedReviews = concat(currentReviews.reviews, action.reviews.reviews);
                updatedReviewsObj = Object.assign({}, currentReviews, {
                    reviews: updatedReviews,
                    pageNumber: action.reviews.pageNumber,
                });
            }

            return Object.assign({}, state, {
                reviewsStatus: action.status,
                reviews: updatedReviewsObj,
                loading: false,
            });

        case pdpActions.GET_PRODUCT_REVIEW_FAILURE:
            return Object.assign({}, state, {
                reviewsStatus: action.status,
                reviewsError: action.error,
                loading: false,
                reviews: {},
            });

        case pdpActions.PRODUCT_MSD_REQUEST:
            return Object.assign({}, state, {
                status: action.status,
                loading: true,
            });

        case pdpActions.PRODUCT_MSD_SUCCESS:
            const newMsdRecommendedItems = cloneDeep(state.recommendedItems);
            newMsdRecommendedItems[action.widgetKey] = action.recommendedItems;
            return Object.assign({}, state, {
                status: action.status,
                recommendedItems: newMsdRecommendedItems,
                loading: false,
            });

        case pdpActions.PRODUCT_MSD_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                msdItems: {},
                error: action.error,
                loading: false,
            });

        case pdpActions.GET_PDP_ITEMS_REQUEST:
            return Object.assign({}, state, {
                status: action.status,
                loading: true,
            });

        case pdpActions.GET_PDP_ITEMS_SUCCESS:
            const newMsdItems = cloneDeep(state.msdItems);
            if (typeof newMsdItems === "object") {
                // eslint-disable-next-line no-prototype-builtins
                if (newMsdItems.hasOwnProperty(action.widgetKey)) {
                    newMsdItems[action.widgetKey] = [...newMsdItems[action.widgetKey], ...action.items];
                } else {
                    newMsdItems[action.widgetKey] = action.items;
                }
            }
            return Object.assign({}, state, {
                status: action.status,
                msdItems: newMsdItems,
                loading: false,
            });
        case pdpActions.GET_PDP_ITEMS_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                msdItems: {},
                loading: false,
            });
        case pdpActions.PDP_ABOUT_BRAND_SUCCESS:
            return Object.assign({}, state, {
                status: action.status,
                aboutTheBrand: action.brandDetails,
                loading: false,
            });
        case pdpActions.PDP_ABOUT_BRAND_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                aboutTheBrand: null,
                loading: false,
            });
        case pdpActions.FOLLOW_UN_FOLLOW_BRAND_REQUEST:
            return Object.assign({}, state, {
                status: action.status,
            });

        case FOLLOW_AND_UN_FOLLOW_BRANDS_IN_PDP_SUCCESS:
            currentBrandDetails = cloneDeep(state.aboutTheBrand);
            currentBrandDetails.isFollowing = action.followStatus;
            return Object.assign({}, state, {
                status: action.status,
                aboutTheBrand: currentBrandDetails,
            });
        case pdpActions.FOLLOW_UN_FOLLOW_BRAND_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                error: action.error,
            });
        case pdpActions.GET_ALL_STORES_FOR_CLIQ_AND_PIQ_REQUEST:
            return Object.assign({}, state, {
                storeStatus: action.status,
                loadingForCliqAndPiq: true,
            });

        case pdpActions.GET_ALL_STORES_FOR_CLIQ_AND_PIQ_SUCCESS:
            return Object.assign({}, state, {
                storeStatus: action.status,
                storeDetails: action.storeDetails,
                loadingForCliqAndPiq: false,
            });

        case pdpActions.GET_ALL_STORES_FOR_CLIQ_AND_PIQ_FAILURE:
            return Object.assign({}, state, {
                storeDetails: null,
                storeStatus: action.status,
                storeError: action.error,
                loadingForCliqAndPiq: false,
            });
        case pdpActions.SHOW_PDP_PIQ_PAGE:
            return Object.assign({}, state, {
                showPiqPage: true,
            });
        case pdpActions.HIDE_PDP_PIQ_PAGE:
            return Object.assign({}, state, {
                showPiqPage: false,
            });

        case pdpActions.PDP_OFFER_REQUEST:
            return Object.assign({}, state, {
                offerStatus: action.status,
                offerLoading: true,
                offerDetails: [],
                impulseOfferCalloutList: [],
                productDescription: null,
            });
        case pdpActions.PDP_OFFER_SUCCESS:
            return Object.assign({}, state, {
                offerStatus: action.status,
                offerDetails: action.offers,
                impulseOfferCalloutList: action.impulseOfferCalloutList,
                offerLoading: false,
            });
        case pdpActions.PDP_OFFER_FAILURE:
            return Object.assign({}, state, {
                offerStatus: action.status,
                offerError: action.error,
                offerLoading: false,
            });

        case pdpActions.PDP_MANUFACTURER_REQUEST:
            return Object.assign({}, state, {
                manufacturerStatus: action.status,
                manufacturerLoading: true,
            });

        case pdpActions.PDP_MANUFACTURER_SUCCESS:
            return Object.assign({}, state, {
                manufacturerStatus: action.status,
                manufacturerDetails: action.manufacturers,
                manufacturerLoading: false,
            });

        case pdpActions.PDP_MANUFACTURER_FAILURE:
            return Object.assign({}, state, {
                manufacturerStatus: action.status,
                manufacturerError: action.error,
                manufacturerLoading: false,
            });
        // case pdpActions.GET_PDP_ITEMS_FAILURE:
        //   return Object.assign({}, state, {
        //     status: action.status,
        //     bundledProductData: {},
        //     loading: false
        //   });
        case pdpActions.BUNDLE_PRODUCT_FAILURE:
            return Object.assign({}, state, {
                bundleProducStatus: action.status,
            });
        case pdpActions.BUNDLE_PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                bundleProducStatus: action.status,
                bundleProductData: action.data,
            });
        case pdpActions.BUNDLE_PRODUCT_REQUEST:
            return Object.assign({}, state, {
                bundleProducStatus: action.status,
            });
        case pdpActions.CHECK_BUNDLE_PRODUCT_PIN_CODE_REQUEST:
            return Object.assign({}, state, {
                status: action.status,
                loading: true,
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
            let serviceableForExistingBundleProductSeller = listOfAllBundleServiceableUssid.find(() => {
                return bundleProductussId === currentBndlePdpDetail.winningUssID;
            });
            if (serviceableForExistingBundleProductSeller && !currentBndlePdpDetail.isUpdatedOtherSellerList) {
                eligibleBundleProductDeliveryModes = transferPincodeToPdpPincode(
                    serviceableForExistingBundleProductSeller.validDeliveryModes
                );

                if (
                    serviceableForExistingBundleProductSeller.stockCount > 0 ||
                    serviceableForExistingBundleProductSeller.isServicable === "Y"
                ) {
                    Object.assign(currentBndlePdpDetail, {
                        eligibleBundleProductDeliveryModes,
                        slaveData: serviceableForExistingBundleProductSeller.validDeliveryModes,
                        isServiceableForBundleProductPincode: {
                            status: YES,
                            pinCode: action.productPinCode.pinCode,
                            stockCount: serviceableForExistingBundleProductSeller.stockCount,
                            isServicable: serviceableForExistingBundleProductSeller.isServicable,
                        },
                    });
                } else {
                    Object.assign(currentBndlePdpDetail, {
                        eligibleBundleProductDeliveryModes,
                        slaveData: serviceableForExistingBundleProductSeller.validDeliveryModes,
                        isServiceableForBundleProductPincode: {
                            status: NO,
                            pinCode: action.productPinCode.pinCode,
                            stockCount: serviceableForExistingBundleProductSeller.stockCount,
                            isServicable: serviceableForExistingBundleProductSeller.isServicable,
                        },
                    });
                }
            } else if (listOfAllBundleServiceableUssid.length && currentBndlePdpDetail.otherSellers) {
                let otherSellersList = currentBndlePdpDetail.otherSellers;
                let leastMrpSellerUssid = { specialPriceSeller: { value: 999999999 } };
                let eligibleDeliveryModeForBundleThisSeller;
                listOfAllBundleServiceableUssid.forEach(seller => {
                    let sellerObjInOtherSellers = currentBndlePdpDetail.otherSellers.find(otherSeller => {
                        return otherSeller.USSID === seller.ussid;
                    });
                    if (
                        sellerObjInOtherSellers &&
                        sellerObjInOtherSellers.specialPriceSeller &&
                        sellerObjInOtherSellers.specialPriceSeller.value < leastMrpSellerUssid.specialPriceSeller.value
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
                        isServicable: serviceableForExistingBundleProductSeller.isServicable,
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
                        isServicable: serviceableForExistingBundleProductSeller.isServicable,
                    },
                });
            } else {
                Object.assign(currentBndlePdpDetail, {
                    isServiceableForBundleProductPincode: {
                        status: NO,
                        BundlePinCode: action.productPinCode.pinCode,
                        stockCount: serviceableForExistingBundleProductSeller.stockCount,
                        isServicable: serviceableForExistingBundleProductSeller.isServicable,
                    },
                });
            }

            return Object.assign({}, state, {
                status: action.status,
                bundleProductData: currentBndlePdpDetail,
                loading: false,
            });

        case pdpActions.CHECK_BUNDLE_PRODUCT_PIN_CODE_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                error: action.error,
                loading: false,
            });

        case pdpActions.OPEN_IN_APP_REQUEST:
            return Object.assign({}, state, {
                openInAppStatus: action.status,
                openInAppLoading: true,
            });

        case pdpActions.OPEN_IN_APP_SUCCESS:
            return Object.assign({}, state, {
                openInAppStatus: action.status,
                openInAppDetails: action.openInAppDetails,
                openInAppLoading: false,
            });

        case pdpActions.OPEN_IN_APP_FAILURE:
            return Object.assign({}, state, {
                openInAppStatus: action.status,
                openInAppError: action.error,
                openInAppLoading: false,
            });

        case pdpActions.RELEVANT_BUNDLE_PRODUCT_REQUEST:
            return Object.assign({}, state, {
                relevantBundleProductLoading: true,
                relevantBundleProductStatus: action.status,
            });
        case pdpActions.RELEVANT_BUNDLE_PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                relevantBundleProductLoading: false,
                relevantBundleProductStatus: action.status,
                relevantBundleProductData: action.data,
            });
        case pdpActions.RELEVANT_BUNDLE_PRODUCT_FAILURE:
            return Object.assign({}, state, {
                relevantBundleProductLoading: false,
                relevantBundleProductStatus: action.status,
            });

        case pdpActions.SECONDARY_BUNDLE_PRODUCT_REQUEST:
            return Object.assign({}, state, {
                secondaryBundleProductStatus: action.status,
            });
        case pdpActions.SECONDARY_BUNDLE_PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                secondaryBundleProductStatus: action.status,
                secondaryBundleProductData: action.data,
            });
        case pdpActions.SECONDARY_BUNDLE_PRODUCT_FAILURE:
            return Object.assign({}, state, {
                secondaryBundleProductStatus: action.status,
            });
        case pdpActions.CHECK_RELEVANT_PRODUCT_PIN_CODE_REQUEST:
            return Object.assign({}, state, {
                relevantProductPinCodeStatus: action.status,
            });
        case pdpActions.CHECK_RELEVANT_PRODUCT_PIN_CODE_SUCCESS:
            return Object.assign({}, state, {
                relevantProductPinCodeStatus: action.status,
            });
        case pdpActions.CHECK_RELEVANT_PRODUCT_PIN_CODE_FAILURE:
            return Object.assign({}, state, {
                relevantProductPinCodeStatus: action.status,
            });
        case pdpActions.RELEVANT_BUNDLE_PRODUCT_CODE_REQUEST:
            return Object.assign({}, state, {
                relevantBundleProductCodeStatus: action.status,
            });

        case pdpActions.RELEVANT_BUNDLE_PRODUCT_CODE_SUCCESS:
            return Object.assign({}, state, {
                relevantBundleProductCodeStatus: action.status,
                relevantBundleProductCodeData: action.relevantBundleProductCodeData,
            });

        case pdpActions.RELEVANT_BUNDLE_PRODUCT_CODE_FAILURE:
            return Object.assign({}, state, {
                relevantBundleProductCodeStatus: action.status,
                relevantBundleProductCodeData: action.error,
            });

        case pdpActions.EXCHANGE_DETAILS_REQUEST:
            return Object.assign({}, state, {
                exchangeDetailsStatus: action.status,
                exchangeDetailsLoading: true,
            });

        case pdpActions.EXCHANGE_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                exchangeDetailsStatus: action.status,
                exchangeDetailsLoading: false,
                exchangeDetails: action.data,
            });

        case pdpActions.EXCHANGE_DETAILS_FAILURE:
            return Object.assign({}, state, {
                exchangeDetailsStatus: action.status,
                exchangeDetailsLoading: false,
                exchangeDetailsError: action.error,
            });

        case pdpActions.UPDATE_DETAILS_SUCCESS:
            const exchangePdpDetail = cloneDeep(state.productDetails);
            Object.assign(exchangePdpDetail, {
                selectedProductCashback: action.data.selectedProductCashback,
                selectedProductName: action.data.selectedProductName,
            });
            return Object.assign({}, state, {
                status: action.status,
                productDetails: exchangePdpDetail,
                loading: false,
            });

        case pdpActions.CHECK_IMEI_NUMBER_REQUEST:
            return Object.assign({}, state, {
                checkIMEINumberStatus: action.status,
                checkIMEINumberLoading: true,
            });

        case pdpActions.CHECK_IMEI_NUMBER_SUCCESS:
            return Object.assign({}, state, {
                checkIMEINumberStatus: action.status,
                checkIMEINumberLoading: false,
                checkIMEINumberDetails: action.data,
            });

        case pdpActions.CHECK_IMEI_NUMBER_FAILURE:
            return Object.assign({}, state, {
                checkIMEINumberStatus: action.status,
                checkIMEINumberLoading: false,
                checkIMEINumberError: action.error,
            });

        case pdpActions.PDP_RECENTLY_VIEWED_REQUEST:
            return Object.assign({}, state, {
                status: action.status,
            });
        case pdpActions.PDP_RECENTLY_VIEWED_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                recentlyViewedProduct: {},
                loading: false,
            });
        case pdpActions.PDP_RECENTLY_VIEWED_SUCCESS:
            const newMsdRecentlyViewedItems = cloneDeep(state.recentlyViewedProduct);
            if (typeof newMsdRecentlyViewedItems === "object") {
                // eslint-disable-next-line no-prototype-builtins
                if (newMsdRecentlyViewedItems.hasOwnProperty(action.widgetKey)) {
                    newMsdRecentlyViewedItems[action.widgetKey] = [
                        ...newMsdRecentlyViewedItems[action.widgetKey],
                        ...action.recentlyViewedProduct,
                    ];
                } else {
                    newMsdRecentlyViewedItems[action.widgetKey] = action.recentlyViewedProduct;
                }
            }
            return Object.assign({}, state, {
                status: action.status,
                recentlyViewedProduct: newMsdRecentlyViewedItems,
                loading: false,
            });

        case pdpActions.GET_BUNDLED_PRODUCT_SUGGESTION_REQUEST:
            return Object.assign({}, state, {
                getBundledProductSuggestionStatus: action.status,
                getBundledProductSuggestionLoading: true,
            });

        case pdpActions.GET_BUNDLED_PRODUCT_SUGGESTION_SUCCESS:
            return Object.assign({}, state, {
                getBundledProductSuggestionStatus: action.status,
                getBundledProductSuggestionLoading: false,
                getBundledProductSuggestionDetails: action.data,
            });

        case pdpActions.GET_BUNDLED_PRODUCT_SUGGESTION_FAILURE:
            return Object.assign({}, state, {
                getBundledProductSuggestionStatus: action.status,
                getBundledProductSuggestionLoading: false,
                getBundledProductSuggestionError: action.error,
                getBundledProductSuggestionDetails: null,
            });

        case pdpActions.GET_TOTAL_BUNDLED_PRICE_REQUEST:
            return Object.assign({}, state, {
                getTotalBundledPriceStatus: action.status,
                getTotalBundledPriceLoading: true,
            });

        case pdpActions.GET_TOTAL_BUNDLED_PRICE_SUCCESS:
            return Object.assign({}, state, {
                getTotalBundledPriceStatus: action.status,
                getTotalBundledPriceLoading: false,
                getTotalBundledPriceDetails: action.data,
            });

        case pdpActions.GET_TOTAL_BUNDLED_PRICE_FAILURE:
            return Object.assign({}, state, {
                getTotalBundledPriceStatus: action.status,
                getTotalBundledPriceLoading: false,
                getTotalBundledPriceError: action.error,
            });

        case pdpActions.ADD_BUNDLED_PRODUCTS_TO_CART_REQUEST:
            return Object.assign({}, state, {
                addBundledProductsToCartStatus: action.status,
                addBundledProductsToCartLoading: true,
            });

        case pdpActions.ADD_BUNDLED_PRODUCTS_TO_CART_SUCCESS:
            if (loggedInUserDetails && customerAccessToken) {
                Cookies.createCookie(CART_DETAILS_FOR_LOGGED_IN_USER, JSON.stringify(action.data));
            } else {
                Cookies.createCookie(CART_DETAILS_FOR_ANONYMOUS, JSON.stringify(action.data));
            }

            return Object.assign({}, state, {
                addBundledProductsToCartStatus: action.status,
                addBundledProductsToCartLoading: false,
                addBundledProductsToCartDetails: action.data,
            });

        case pdpActions.ADD_BUNDLED_PRODUCTS_TO_CART_FAILURE:
            return Object.assign({}, state, {
                addBundledProductsToCartStatus: action.status,
                addBundledProductsToCartLoading: false,
                addBundledProductsToCartError: action.error,
            });

        case pdpActions.GET_MASTER_TEMPLATE_REQUEST:
            return Object.assign({}, state, {
                masterTemplateStatus: action.status,
                masterTemplateLoading: true,
            });

        case pdpActions.GET_MASTER_TEMPLATE_SUCCESS:
            return Object.assign({}, state, {
                masterTemplateStatus: action.status,
                masterTemplateDetails: action.masterTemplateResult,
                masterTemplateLoading: false,
            });

        case pdpActions.GET_MASTER_TEMPLATE_FAILURE:
            return Object.assign({}, state, {
                masterTemplateStatus: action.status,
                masterTemplateError: action.error,
                masterTemplateLoading: false,
            });

        case pdpActions.GET_HOW_TO_WEAR_REQUEST:
            return Object.assign({}, state, {
                howToWearStatus: action.status,
                howToWearLoading: true,
            });
        case pdpActions.GET_HOW_TO_WEAR_SUCCESS:
            return Object.assign({}, state, {
                howToWearStatus: action.status,
                howToWearDetails: action.howToWearResult,
                howToWearLoading: false,
            });
        case pdpActions.GET_HOW_TO_WEAR_FAILURE:
            return Object.assign({}, state, {
                howToWearStatus: action.status,
                howToWearError: action.error,
                howToWearLoading: false,
            });

        case pdpActions.GET_MORE_FROM_BRAND_REQUEST:
            return Object.assign({}, state, {
                moreFromBrandStatus: action.status,
                moreFromBrandLoading: true,
            });
        case pdpActions.GET_MORE_FROM_BRAND_SUCCESS:
            return Object.assign({}, state, {
                moreFromBrandStatus: action.status,
                moreFromBrandDetails: action.moreFromBrandResult,
                moreFromBrandLoading: false,
            });
        case pdpActions.GET_MORE_FROM_BRAND_FAILURE:
            return Object.assign({}, state, {
                moreFromBrandStatus: action.status,
                moreFromBrandError: action.error,
                moreFromBrandLoading: false,
            });

        case pdpActions.GET_ABOUT_THE_BRAND_REQUEST:
            return Object.assign({}, state, {
                aboutTheBrandStatus: action.status,
                aboutTheBrandLoading: true,
            });
        case pdpActions.GET_ABOUT_THE_BRAND_SUCCESS:
            return Object.assign({}, state, {
                aboutTheBrandStatus: action.status,
                aboutTheBrandDetails: action.aboutTheBrandResult,
                aboutTheBrandLoading: false,
            });
        case pdpActions.GET_ABOUT_THE_BRAND_FAILURE:
            return Object.assign({}, state, {
                aboutTheBrandStatus: action.status,
                aboutTheBrandError: action.error,
                aboutTheBrandLoading: false,
            });

        case pdpActions.GET_SIMILAR_PRODUCT_REQUEST:
            return Object.assign({}, state, {
                similarProductStatus: action.status,
                similarProductLoading: true,
            });
        case pdpActions.GET_SIMILAR_PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                similarProductStatus: action.status,
                similarProductDetails: action.similarProductResult,
                similarProductLoading: false,
            });
        case pdpActions.GET_SIMILAR_PRODUCT_FAILURE:
            return Object.assign({}, state, {
                similarProductStatus: action.status,
                similarProductError: action.error,
                similarProductLoading: false,
            });
        case pdpActions.BEAUTY_POP_UP_TOGGLE:
            return Object.assign({}, state, {
                beautyPopupModal: action.status,
            });

        case pdpActions.GET_APPLIANCES_EXCHANGE_DETAILS_REQUEST:
            return Object.assign({}, state, {
                getAppliancesExchangeDetailsStatus: action.status,
                getAppliancesExchangeDetailsLoading: true,
            });

        case pdpActions.GET_APPLIANCES_EXCHANGE_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                getAppliancesExchangeDetailsStatus: action.status,
                getAppliancesExchangeDetailsLoading: false,
                getAppliancesExchangeDetails: action.data,
            });

        case pdpActions.GET_APPLIANCES_EXCHANGE_DETAILS_FAILURE:
            return Object.assign({}, state, {
                getAppliancesExchangeDetailsStatus: action.status,
                getAppliancesExchangeDetailsLoading: false,
                getAppliancesExchangeDetailsError: action.error,
                getAppliancesExchangeDetails: null,
            });

        case pdpActions.UPDATE_APPLIANCES_EXCHANGE_DETAILS:
            return Object.assign({}, state, {
                updatedAppliancesExchangeDetailsStatus: action.status,
                updatedAppliancesExchangeDetails: action.exchangeData,
                updatedAppliancesExchangeDetailsLoading: false,
            });

        case pdpActions.APPLIANCE_EXCHANGE_CHECK_PINCODE_REQUEST:
            return Object.assign({}, state, {
                appliancesExchangeCheckPincodeStatus: action.status,
                appliancesExchangeCheckPincodeLoading: true,
            });

        case pdpActions.APPLIANCE_EXCHANGE_CHECK_PINCODE_SUCCESS:
            return Object.assign({}, state, {
                appliancesExchangeCheckPincodeStatus: action.status,
                appliancesExchangeCheckPincodeLoading: false,
                appliancesExchangeCheckPincodeDetails: action.data,
            });

        case pdpActions.APPLIANCE_EXCHANGE_CHECK_PINCODE_FAILURE:
            return Object.assign({}, state, {
                appliancesExchangeCheckPincodeStatus: action.status,
                appliancesExchangeCheckPincodeLoading: false,
                appliancesExchangeCheckPincodeError: action.error,
                appliancesExchangeCheckPincodeDetails: null,
            });

        case pdpActions.PARAMS_ELIGIBLE_TO_RATE_REQUEST:
            return Object.assign({}, state, {
                paramsEligibleToRateStatus: action.status,
                paramsEligibleToRateLoading: true,
            });

        case pdpActions.PARAMS_ELIGIBLE_TO_RATE_SUCCESS:
            return Object.assign({}, state, {
                paramsEligibleToRateStatus: action.status,
                paramsEligibleToRateLoading: false,
                paramsEligibleToRateDetails: action.data,
            });

        case pdpActions.PARAMS_ELIGIBLE_TO_RATE_FAILURE:
            return Object.assign({}, state, {
                paramsEligibleToRateStatus: action.status,
                paramsEligibleToRateLoading: false,
                paramsEligibleToRateError: action.error,
                paramsEligibleToRateDetails: null,
            });

        case pdpActions.SUMBIT_PARAMETER_RATING_REQUEST:
            return Object.assign({}, state, {
                submitParameterRatingStatus: action.status,
                submitParameterRatingLoading: true,
            });

        case pdpActions.SUMBIT_PARAMETER_RATING_SUCCESS:
            return Object.assign({}, state, {
                submitParameterRatingStatus: action.status,
                submitParameterRatingLoading: false,
                submitParameterRatingDetails: action.data,
            });

        case pdpActions.SUMBIT_PARAMETER_RATING_FAILURE:
            return Object.assign({}, state, {
                submitParameterRatingStatus: action.status,
                submitParameterRatingLoading: false,
                submitParameterRatingError: action.error,
                submitParameterRatingDetails: null,
            });

        case pdpActions.GET_TITE_SUGGESTIONS_REQUEST:
            return Object.assign({}, state, {
                getTitleSuggestionsStatus: action.status,
                getTitleSuggestionsLoading: true,
            });

        case pdpActions.GET_TITE_SUGGESTIONS_SUCCESS:
            return Object.assign({}, state, {
                getTitleSuggestionsStatus: action.status,
                getTitleSuggestionsLoading: false,
                getTitleSuggestionsDetails: action.data,
            });

        case pdpActions.GET_TITE_SUGGESTIONS_FAILURE:
            return Object.assign({}, state, {
                getTitleSuggestionsStatus: action.status,
                getTitleSuggestionsLoading: false,
                getTitleSuggestionsError: action.error,
                getTitleSuggestionsDetails: null,
            });

        case pdpActions.GET_REVIEWS_ON_PRODUCT_PAGE_REQUEST:
            return Object.assign({}, state, {
                getReviewsOnProductPageStatus: action.status,
                getReviewsOnProductPageLoading: true,
            });

        case pdpActions.GET_REVIEWS_ON_PRODUCT_PAGE_SUCCESS:
            return Object.assign({}, state, {
                getReviewsOnProductPageStatus: action.status,
                getReviewsOnProductPageLoading: false,
                getReviewsOnProductPageDetails: action.data,
            });

        case pdpActions.GET_REVIEWS_ON_PRODUCT_PAGE_FAILURE:
            return Object.assign({}, state, {
                getReviewsOnProductPageStatus: action.status,
                getReviewsOnProductPageLoading: false,
                getReviewsOnProductPageError: action.error,
                getReviewsOnProductPageDetails: null,
            });

        case pdpActions.GET_RATING_SUMMARY_REQUEST:
            return Object.assign({}, state, {
                getRatingSummaryStatus: action.status,
                getRatingSummaryLoading: true,
            });

        case pdpActions.GET_RATING_SUMMARY_SUCCESS:
            return Object.assign({}, state, {
                getRatingSummaryStatus: action.status,
                getRatingSummaryLoading: false,
                getRatingSummaryDetails: action.data,
            });

        case pdpActions.GET_RATING_SUMMARY_FAILURE:
            return Object.assign({}, state, {
                getRatingSummaryStatus: action.status,
                getRatingSummaryLoading: false,
                getRatingSummaryError: action.error,
                getRatingSummaryDetails: null,
            });

        case pdpActions.GET_PDP_REVIEWS_REQUEST:
            return Object.assign({}, state, {
                getPdpReviewsStatus: action.status,
                getPdpReviewsLoading: true,
            });

        case pdpActions.GET_PDP_REVIEWS_SUCCESS:
            return Object.assign({}, state, {
                getPdpReviewsStatus: action.status,
                getPdpReviewsLoading: false,
                getPdpReviewsDetails: action.data,
            });

        case pdpActions.GET_PDP_REVIEWS_FAILURE:
            return Object.assign({}, state, {
                getPdpReviewsStatus: action.status,
                getPdpReviewsLoading: false,
                getPdpReviewsError: action.error,
                getPdpReviewsDetails: null,
            });

        default:
            return state;
    }
};

export default productDescription;

function getSortedPowerList(powerList) {
    let positivePowerList = [],
        negativePowerList = [],
        sortedPowerList = [];

    powerList.map(power => {
        if (power.sizelink && power.sizelink.size) {
            if (power.sizelink.size > 0) {
                positivePowerList.push(power);
            } else {
                negativePowerList.push(power);
            }
        }
    });
    negativePowerList = negativePowerList.reverse();
    sortedPowerList = [...negativePowerList, ...positivePowerList];
    return sortedPowerList;
}
