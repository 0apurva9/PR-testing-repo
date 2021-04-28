import { connect } from "react-redux";
import {
    getProductDescription,
    addProductToCart,
    getProductSizeGuide,
    getMsdRequest,
    getPdpEmi,
    getEmiTerms,
    pdpAboutBrand,
    getProductPinCode,
    getAllStoresForCliqAndPiq,
    showPdpPiqPage,
    hidePdpPiqPage,
    getPdpOffers,
    getManufacturerDetails,
    getBundleproduct,
    getBundleProductPinCode,
    openInApp,
    getRelevantBundleProduct,
    relevantProductServibilty,
    relevantBundleProductCode,
    getExchangeDetails,
    getBundledProductSuggestion,
    getTotalBundledPrice,
    addBundledProductsToCart,
    getMasterTemplate,
    getHowToWear,
    getMoreFromBrand,
    getAboutTheBrand,
    getSimilarProduct,
    openBeautyPopup,
    getAppliancesExchangeDetails,
    appliancesExchangeCheckPincode,
    getProductReviews,
} from "../actions/pdp.actions";
import { displayToast } from "../../general/toast.actions.js";
import { showSecondaryLoader, hideSecondaryLoader } from "../../general/secondaryLoader.actions";
import { setHeaderText } from "../../general/header.actions";
import { getUserAddress, getMinicartProducts, getCartCountForLoggedInUser } from "../../cart/actions/cart.actions";
import {
    showModal,
    EMI_MODAL,
    OFFER_MODAL,
    BEAUTY_OFFER_MODAL,
    BEAUTY_IMAGE_ZOOM_IN,
    ADDRESS,
    PRICE_BREAKUP,
    SIZE_SELECTOR,
    SIZE_SELECTOR_FOR_EYEWEAR,
    SIZE_GUIDE,
    CLIQ_PIQ_MODAL,
    MANUFACTURER_MODAL,
    TERMSNCONDITIONS_MODAL,
    BUNDLEDPRODUCT_MODAL,
    SIMILAR_PRODUCTS_MODAL,
    SIMILAR_PRODUCTS_OOS_MODAL,
    SIZE_SELECTOR_OOS_MODAL,
    EXCHANGE_MODAL,
    APPLIANCES_EXCHANGE_MODAL,
    showMobileNumberLoginModal,
} from "../../general/modal.actions.js";
import ProductDescriptionPageWrapper from "../components/ProductDescriptionPageWrapper";
import { withRouter } from "react-router-dom";
import { SUCCESS, DEFAULT_PIN_CODE_LOCAL_STORAGE, NO, SELECTED_STORE } from "../../lib/constants.js";
import { tempCartIdForLoggedInUser } from "../../cart/actions/cart.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions";
import {
    getCartDetails,
    addStoreCNC,
    addPickupPersonCNC,
    mergeTempCartWithOldCart,
} from "../../cart/actions/cart.actions";
import {
    setDataLayerForCartDirectCalls,
    ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS,
    ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE,
} from "../../lib/adobeUtils";
import { getUserDetails } from "../../account/actions/account.actions.js";
import { getChatbotDetails } from "../../plp/actions/plp.actions";

const mapDispatchToProps = dispatch => {
    return {
        getProductDescription: async (productCode, preventLoading = false) => {
            const productDetailsResponse = await dispatch(
                getProductDescription(productCode, null, null, true, preventLoading)
            );
            if (productDetailsResponse && productDetailsResponse.status === SUCCESS) {
                let categoryHierarchy = productDetailsResponse.productDescription.categoryHierarchy;
                let isACCategory =
                    categoryHierarchy &&
                    categoryHierarchy.find(category => {
                        return category.category_id === "MSH1230";
                    });
                let isExchangeAvailableForProduct = false;
                if (productDetailsResponse.productDescription.exchangeAvailable || isACCategory) {
                    isExchangeAvailableForProduct = true;
                }
                const pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
                if (pinCode) {
                    dispatch(
                        getProductPinCode(
                            pinCode,
                            productCode,
                            productDetailsResponse.productDescription.winningUssID,
                            false,
                            isExchangeAvailableForProduct,
                            false
                        )
                    );
                }
            }
        },
        addProductToCart: async productDetails => {
            return dispatch(addProductToCart(productDetails));
        },
        buyNow: async productDetails => {
            return dispatch(tempCartIdForLoggedInUser(productDetails));
        },
        showSizeSelector: data => {
            dispatch(showModal(SIZE_SELECTOR, data));
        },
        showPriceBreakup: data => {
            dispatch(showModal(PRICE_BREAKUP, data));
        },
        showOfferDetails: data => {
            dispatch(showModal(OFFER_MODAL, data));
        },
        showBeautyOfferDetails: data => {
            dispatch(showModal(BEAUTY_OFFER_MODAL, data));
        },
        showBeautyImageZoomIn: data => {
            dispatch(showModal(BEAUTY_IMAGE_ZOOM_IN, data));
        },
        showBundledProduct: data => {
            dispatch(showModal(BUNDLEDPRODUCT_MODAL, data));
        },
        showTermsNConditions: data => {
            dispatch(showModal(TERMSNCONDITIONS_MODAL, data));
        },
        showExchangeModal: data => {
            dispatch(showModal(EXCHANGE_MODAL, data));
        },
        showManufactureDetailsModal: data => {
            dispatch(showModal(MANUFACTURER_MODAL, data));
        },
        showSimilarProducts: () => {
            dispatch(showModal(SIMILAR_PRODUCTS_MODAL));
        },
        getProductSizeGuide: productCode => {
            dispatch(getProductSizeGuide(productCode));
        },
        getMsdRequest: productCode => {
            dispatch(getMsdRequest(productCode));
        },
        pdpAboutBrand: productCode => {
            dispatch(pdpAboutBrand(productCode));
        },
        showSizeGuide: () => {
            dispatch(showModal(SIZE_GUIDE));
        },
        showSizeSelectorForEyeWear: data => {
            dispatch(showModal(SIZE_SELECTOR_FOR_EYEWEAR, data));
        },
        getPdpEmi: (token, cartValue, productCode, ussId) => {
            dispatch(getPdpEmi(token, cartValue, productCode, ussId));
        },
        getEmiTerms: (token, productValue) => {
            dispatch(getEmiTerms(token, productValue));
        },
        showEmiModal: () => {
            dispatch(showModal(EMI_MODAL));
        },
        showPincodeModal: (productCode, winningUssID) => {
            dispatch(showModal(ADDRESS, { productCode }, { winningUssID }));
        },
        getProductPinCode: (
            pinCode,
            productCode,
            winningUssID,
            isComingFromPiqPage,
            isExchangeAvailable,
            isComingFromClickEvent,
            isComingFromHaptikChatbot
        ) => {
            localStorage.removeItem(SELECTED_STORE);
            return dispatch(
                getProductPinCode(
                    pinCode,
                    productCode,
                    winningUssID,
                    isComingFromPiqPage,
                    isExchangeAvailable,
                    isComingFromClickEvent,
                    isComingFromHaptikChatbot
                )
            );
        },
        hideSecondaryLoader: () => {
            dispatch(hideSecondaryLoader());
        },
        showSecondaryLoader: () => {
            dispatch(showSecondaryLoader());
        },
        setHeaderText: text => {
            dispatch(setHeaderText(text));
        },
        displayToast: val => {
            dispatch(displayToast(val));
        },
        getAllStoresForCliqAndPiq: pinCode => {
            dispatch(getAllStoresForCliqAndPiq(pinCode));
        },
        showPdpPiqPage: () => {
            dispatch(showPdpPiqPage());
        },
        hidePdpPiqPage: () => {
            dispatch(hidePdpPiqPage());
        },
        showPdpCliqAndPiqPage: storeDetails => {
            dispatch(showModal(CLIQ_PIQ_MODAL, storeDetails));
        },
        setUrlToRedirectToAfterAuth: url => {
            dispatch(setUrlToRedirectToAfterAuth(url));
        },
        getPdpOffers: async () => {
            await dispatch(getPdpOffers());
        },
        getManufacturerDetails: async () => {
            await dispatch(getManufacturerDetails());
        },
        getUserAddress: async () => {
            await dispatch(getUserAddress());
        },
        showSimilarSizeOOSModal: data => {
            dispatch(showModal(SIMILAR_PRODUCTS_OOS_MODAL, data));
        },
        showOOSSizeSelectorModal: data => {
            dispatch(showModal(SIZE_SELECTOR_OOS_MODAL, data));
        },
        getMinicartProducts: async () => {
            return dispatch(getMinicartProducts());
        },
        getBundleproduct: async data => {
            return dispatch(getBundleproduct(data));
        },
        getBundleProductPinCode: async (pinCode, productCode, ussId) => {
            return await dispatch(getBundleProductPinCode(pinCode, productCode, ussId));
        },
        openInApp: async () => {
            return await dispatch(openInApp());
        },
        getRelevantBundleProduct: async (productCode, temp, sequence) => {
            return await dispatch(getRelevantBundleProduct(productCode, temp, sequence));
        },
        relevantProductServibilty: async (pinCode, productCode, ussId) => {
            return await dispatch(relevantProductServibilty(pinCode, productCode, ussId));
        },
        relevantBundleProductCode: async () => {
            return await dispatch(relevantBundleProductCode());
        },
        // addProductToCart: (productDetails, callback) => {
        // 	return dispatch(addProductToCart(productDetails), callback());
        // },
        addProductToCart1: async productDetails => {
            return await dispatch(addProductToCart(productDetails));
        },
        getExchangeDetails: async (listingId, ussid, maxExchangeAmount, pickupCharge) => {
            return await dispatch(getExchangeDetails(listingId, ussid, maxExchangeAmount, pickupCharge));
        },
        /** */
        addressModal: pinCodeObj => {
            dispatch(showModal(ADDRESS, pinCodeObj));
        },
        getCartDetails: async (cartId, userId, accessToken, pinCode, setDataLayerForPincode) => {
            const cartDetailsObj = await dispatch(getCartDetails(cartId, userId, accessToken, pinCode, true));
            let productServiceAvailability =
                cartDetailsObj &&
                cartDetailsObj.cartDetails &&
                cartDetailsObj.cartDetails.products &&
                cartDetailsObj.cartDetails.products.filter(product => {
                    return (
                        product.isGiveAway === NO &&
                        (product.pinCodeResponse === undefined ||
                            (product.pinCodeResponse && product.pinCodeResponse.isServicable === "N") ||
                            product.isOutOfStock)
                    );
                });
            // here we are setting data layer for pincode change on cart page
            if (setDataLayerForPincode) {
                if (cartDetailsObj.status === SUCCESS && productServiceAvailability.length === 0) {
                    setDataLayerForCartDirectCalls(ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS, pinCode);
                } else {
                    setDataLayerForCartDirectCalls(ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE, pinCode);
                }
            }
        },
        /** */
        getUserDetails: () => {
            dispatch(getUserDetails());
        },
        addStoreCNC: (ussId, slaveId) => {
            return dispatch(addStoreCNC(ussId, slaveId));
        },
        addPickupPersonCNC: (personMobile, personName) => {
            return dispatch(addPickupPersonCNC(personMobile, personName));
        },
        mergeTempCartWithOldCart: () => {
            dispatch(mergeTempCartWithOldCart());
        },
        getChatbotDetails: async () => {
            await dispatch(getChatbotDetails());
        },
        getBundledProductSuggestion: (productId, ussId, categoryCode, brandCode, source, pincode) => {
            dispatch(getBundledProductSuggestion(productId, ussId, categoryCode, brandCode, source, pincode));
        },
        getTotalBundledPrice: data => {
            dispatch(getTotalBundledPrice(data));
        },
        addBundledProductsToCart: data => {
            dispatch(addBundledProductsToCart(data));
        },
        getCartCountForLoggedInUser: () => {
            dispatch(getCartCountForLoggedInUser());
        },
        getMasterTemplate: async categoryId => {
            return await dispatch(getMasterTemplate(categoryId));
        },
        getHowToWear: async categoryId => {
            return await dispatch(getHowToWear(categoryId));
        },
        getMoreFromBrand: async productId => {
            return await dispatch(getMoreFromBrand(productId));
        },
        getAboutTheBrand: async mshId => {
            return await dispatch(getAboutTheBrand(mshId));
        },
        getSimilarProduct: async productId => {
            return await dispatch(getSimilarProduct(productId));
        },
        openBeautyPopup: toggle => {
            return dispatch(openBeautyPopup(toggle));
        },
        showAppliancesExchangeModal: data => {
            dispatch(showModal(APPLIANCES_EXCHANGE_MODAL, data));
        },
        getAppliancesExchangeDetails: () => {
            dispatch(getAppliancesExchangeDetails());
        },
        appliancesExchangeCheckPincode: (productCode, pincode) => {
            dispatch(appliancesExchangeCheckPincode(productCode, pincode));
        },
        openMobileNumberLoginModal: () => {
            dispatch(showMobileNumberLoginModal());
        },
        getProductReviews: (productCode, pageIndex, orderBy, sortBy, filteredProducts, pageSize) => {
            dispatch(getProductReviews(productCode, pageIndex, orderBy, sortBy, filteredProducts, pageSize));
        },
    };
};

const mapStateToProps = state => {
    return {
        productDetails: state.productDescription.productDetails,
        loading: state.productDescription.loading,
        stores: state.productDescription.storeDetails,
        showPiqPage: state.productDescription.showPiqPage,
        slaveData: state.productDescription.slaveData,
        loadingForCliqAndPiq: state.productDescription.loadingForCliqAndPiq,
        userAddress: state.profile.userAddress,
        offers: state.productDescription.offerDetails,
        impulseOfferCalloutList: state.productDescription.impulseOfferCalloutList,
        manufacturerDetails: state.productDescription.manufacturerDetails,
        bundleProductData: state.productDescription.bundleProductData,
        relevantBundleProductData: state.productDescription.relevantBundleProductData,
        relevantProductPinCodeStatus: state.productDescription.relevantProductPinCodeStatus,
        secondaryBundleProductData: state.productDescription.secondaryBundleProductData,
        relevantBundleProductCodeData: state.productDescription.relevantBundleProductCodeData,
        exchangeDetails: state.productDescription.exchangeDetails,
        userDetails: state.profile.userDetails,
        loadingOfBuyNowSuccess: state.cart.tempCartIdForLoggedInUserStatus,
        loadingForAddStoreToCnc: state.cart.loadingForAddStore,
        loadingForCartDetail: state.cart.loadingForCartDetail,
        pincodeError: state.productDescription.pincodeError,
        serviceableOtherSellersUssid: state.productDescription.serviceableOtherSellersUssid,
        chatbotDetailsData: state.productListings.getChatbotDetailsData,
        addToCartResponseDetails: state.productDescription.addToCartResponseDetails,
        addToCartResponseLoading: state.productDescription.addToCartResponseLoading,
        cartCountDetails: state.cart.cartCountDetails,
        checkPincodeDetailsLoading: state.productDescription.checkPincodeDetailsLoading,
        checkPincodeFromHaptikChatbot: state.productDescription.checkPincodeFromHaptikChatbot,
        cartCountDetailsLoading: state.cart.cartCountDetailsLoading,
        bundledProductSuggestionDetails: state.productDescription.getBundledProductSuggestionDetails,
        totalBundledPriceDetails: state.productDescription.getTotalBundledPriceDetails,
        getTotalBundledPriceLoading: state.productDescription.getTotalBundledPriceLoading,
        addBundledProductsToCartLoading: state.productDescription.addBundledProductsToCartLoading,
        addBundledProductsToCartDetails: state.productDescription.addBundledProductsToCartDetails,
        bundledProductSuggestionStatus: state.productDescription.getBundledProductSuggestionStatus,
        logoutUserStatus: state.profile.logoutUserStatus,
        masterTemplateResponse: state.productDescription.masterTemplateDetails,
        masterTemplateError: state.productDescription.masterTemplateError,
        masterTemplateLoading: state.productDescription.masterTemplateLoading,
        howToWearResponse: state.productDescription.howToWearDetails,
        howToWearError: state.productDescription.howToWearError,
        howToWearLoading: state.productDescription.howToWearLoading,
        moreFromBrandResponse: state.productDescription.moreFromBrandDetails,
        moreFromBrandError: state.productDescription.moreFromBrandError,
        moreFromBrandLoading: state.productDescription.moreFromBrandLoading,
        aboutTheBrandResponse: state.productDescription.aboutTheBrandDetails,
        aboutTheBrandError: state.productDescription.aboutTheBrandError,
        aboutTheBrandLoading: state.productDescription.aboutTheBrandLoading,
        similarProductResponse: state.productDescription.similarProductDetails,
        similarProductError: state.productDescription.similarProductError,
        similarProductLoading: state.productDescription.similarProductLoading,
        appliancesExchangeDetails: state.productDescription.getAppliancesExchangeDetails,
        updatedAppliancesExchangeDetails: state.productDescription.updatedAppliancesExchangeDetails,
        appliancesExchangePincodeDetails: state.productDescription.appliancesExchangeCheckPincodeDetails,
        reviews: state.productDescription.reviews,
        isMNLLogin: state.mobileNumberLogin.isMNLLogin,
        isMobileNumberLoginModalActive: state.modal.isMobileNumberLoginModalActive,
        tempCartIdForLoggedInUserLoading: state.cart.tempCartIdForLoggedInUserLoading,
    };
};

const ProductDescriptionPageWrapperContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ProductDescriptionPageWrapper)
);

export default ProductDescriptionPageWrapperContainer;
