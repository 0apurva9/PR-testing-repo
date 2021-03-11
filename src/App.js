import React, { Component } from "react";

import { Switch } from "react-router-dom";
import Route from "./general/Route";
import { default as AppStyles } from "./App.css";
// import HomeContainer from "./home/containers/HomeContainer.js";
import ErrorContainer from "./general/containers/ErrorContainer.js";
// importing All container for my Accounts

import * as Cookie from "./lib/Cookie";
import SecondaryLoader from "./general/components/SecondaryLoader";
import HeaderContainer from "./general/containers/HeaderContainer.js";
import SecondaryLoaderContainer from "./general/containers/SecondaryLoaderContainer.js";

import {
    HOME_ROUTER,
    PRODUCT_LISTINGS,
    MAIN_ROUTER,
    LOGIN_PATH,
    SIGN_UP_PATH,
    PRODUCT_DELIVERY_ADDRESSES,
    PRODUCT_CART_ROUTER,
    GLOBAL_ACCESS_TOKEN,
    CUSTOMER_ACCESS_TOKEN,
    REFRESH_TOKEN,
    CART_DETAILS_FOR_LOGGED_IN_USER,
    CART_DETAILS_FOR_ANONYMOUS,
    LOGGED_IN_USER_DETAILS,
    PRODUCT_CART_DELIVERY_MODES,
    ORDER_SUMMARY_ROUTER,
    CHECKOUT_ROUTER,
    PRODUCT_DESCRIPTION_PRODUCT_CODE,
    BRAND_LANDING_PAGE,
    PRODUCT_DESCRIPTION_REVIEWS,
    PRODUCT_OTHER_SELLER_ROUTER,
    DEFAULT_BRANDS_LANDING_PAGE,
    CATEGORIES_LANDING_PAGE,
    BRAND_PAGE,
    CATEGORY_PAGE,
    BRAND_PAGE_WITH_SLUG,
    BRAND_PAGE_WITH_FILTER_SLUG,
    CATEGORY_PAGE_WITH_SLUG,
    CATEGORY_PAGE_WITH_FILTER_SLUG,
    RETURNS,
    SHORT_URL_ORDER_DETAIL,
    CATEGORY_PAGE_WITH_QUERY_PARAMS,
    CATEGORY_PAGE_WITH_SLUG_WITH_QUERY_PARAMS,
    BRAND_PAGE_WITH_QUERY_PARAMS,
    BRAND_PAGE_WITH_SLUG_WITH_QUERY_PARAMS,
    CATEGORY_PRODUCT_LISTINGS_WITH_PAGE,
    BRAND_PRODUCT_LISTINGS_WITH_PAGE,
    SKU_PAGE,
    BRAND_AND_CATEGORY_PAGE,
    CANCEL_PREFIX,
    PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE,
    PRODUCT_DESCRIPTION_REVIEWS_WITH_SLUG,
    MY_ACCOUNT,
    STATIC_PAGE,
    SKU_PAGE_FILTER,
    PRODUCT_LISTINGS_WITHOUT_SLASH,
    HELP_URL,
    NOT_FOUND,
    WRITE_REVIEWS_WITH_SLUG,
    WRITE_REVIEWS,
    DEFAULT_PIN_CODE_LOCAL_STORAGE,
    REDMI_WALLET_FROM_EMAIL,
    FEEDBACK_PAGE,
    RETURN_FEEDBACK_PAGE,
    FEEDBACK_INTERMITTENT_PAGE,
    FEEDBACK_RETURN_INTERMITTENT_PAGE,
    RETRY_FAILED_ORDER,
    PANCARD_PAGE,
    CART_BAG_DETAILS,
    CANCEL_RETURN_PREFIX,
    DEFAULT_PINCODE,
    UNSUBSCRIBE_CLEVER_TAP_EMAILS,
    CAPTURE_ATTACHMENTS,
} from "../src/lib/constants";
import Loadable from "react-loadable";

// import PlpBrandCategoryWrapperContainer from "./plp/containers/PlpBrandCategoryWrapperContainer";
// import ProductDescriptionPageWrapperContainer from "./pdp/containers/ProductDescriptionPageWrapperContainer";

import DesktopOnly from "./general/components/DesktopOnly";
import { setDataLayer, ADOBE_VIRTUAL_PAGELOAD } from "../src/lib/adobeUtils";

/*
    Setting default pin code
    for user if user dont have pin code in
    local storage already
*/
if (!localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)) {
    localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, DEFAULT_PINCODE);
}
const Loader = () => {
    return (
        <div className={AppStyles.loadingIndicator}>
            <SecondaryLoader />
        </div>
    );
};

const HomeContainer = Loadable({
    loader: () => import(/* webpackChunkName: "home-container"  */ "./home/containers/HomeContainer.js"),
    loading() {
        return <Loader />;
    },
});

const ProductDescriptionPageWrapperContainer = Loadable({
    loader: () =>
        import(
            /* webpackChunkName: "product-description-page-wrapper-container"  */ "./pdp/containers/ProductDescriptionPageWrapperContainer"
        ),
    loading() {
        return <Loader />;
    },
});

const PlpBrandCategoryWrapperContainer = Loadable({
    loader: () =>
        import(
            /* webpackChunkName: "plp-brand-category-wrapper-container"  */ "./plp/containers/PlpBrandCategoryWrapperContainer"
        ),
    loading() {
        return <Loader />;
    },
});

const MyAccountWrapper = Loadable({
    loader: () =>
        import(
            /* webpackChunkName: "my-account-wrapper-container" */ "./account/containers/MyAccountWrapperContainer.js"
        ),
    loading() {
        return <Loader />;
    },
});
const FeedBackContainer = Loadable({
    loader: () => import(/* webpackChunkName: "feedback-container" */ "./cart/containers/FeedBackContainer"),
    loading() {
        return <Loader />;
    },
});
const IntermittentFeedbackContainer = Loadable({
    loader: () =>
        import(
            /* webpackChunkName: "intermittent-feedback-container" */ "./cart/containers/IntermittentFeedbackContainer"
        ),
    loading() {
        return <Loader />;
    },
});
const BrandLandingPageContainer = Loadable({
    loader: () =>
        import(/* webpackChunkName: "brand-landing-page-container" */ "./blp/containers/BrandLandingPageContainer"),
    loading() {
        return <Loader />;
    },
});

const BrandsLandingPageDefaultContainer = Loadable({
    loader: () =>
        import(
            /* webpackChunkName: "brand-landing-page-default-container" */ "./blp/containers/BrandsLandingPageDefaultContainer"
        ),
    loading() {
        return <Loader />;
    },
});
const PanCardFormContainer = Loadable({
    loader: () => import(/* webpackChunkName: "pancard-form-container" */ "./general/containers/PanCardFormContainer"),
    loading() {
        return <Loader />;
    },
});
const ProductListingsContainer = Loadable({
    loader: () =>
        import(/* webpackChunkName: "product-listings-container" */ "./plp/containers/ProductListingsContainer"),
    loading() {
        return <Loader />;
    },
});
const ModalContainer = Loadable({
    loader: () => import(/* webpackChunkName: "modal-container" */ "./general/containers/ModalContainer"),
    loading() {
        return <div />;
    },
});
const HelpDetailsContainer = Loadable({
    loader: () =>
        import(/* webpackChunkName: "help-details-container" */ "./account/containers/HelpDetailsContainer.js"),
    loading() {
        return <div />;
    },
});
const ToastContainer = Loadable({
    loader: () => import(/* webpackChunkName: "toast-container" */ "./general/containers/ToastContainer"),
    loading() {
        return <div />;
    },
});
const StaticPageContainer = Loadable({
    loader: () =>
        import(/* webpackChunkName: "static-page-container" */ "./staticpage/containers/StaticPageContainer.js"),
    loading() {
        return <Loader />;
    },
});

const Auth = Loadable({
    loader: () => import(/* webpackChunkName: "mobile-auth" */ "./auth/components/MobileAuth.js"),
    loading() {
        return <Loader />;
    },
});

const CancelOrderContainer = Loadable({
    loader: () =>
        import(
            /* webpackChunkName: "cancel-order-for-desktop-container" */ "./cancel/container/cancelOrderForDesktopContainer.js"
        ),
    loading() {
        return <Loader />;
    },
});

const CancelReturnRequestContainer = Loadable({
    loader: () =>
        import(
            /* webpackChunkName: "cancel-return-request-container" */ "./account/containers/CancelReturnRequestContainer"
        ),
    loading() {
        return <Loader />;
    },
});

const ReturnFlowContainer = Loadable({
    loader: () =>
        import(
            /* webpackChunkName: "return-flow-desktop-container" */ "./return/containers/ReturnFlowDesktopContainer.js"
        ),
    loading() {
        return <Loader />;
    },
});

const OrderDetailsContainer = Loadable({
    loader: () =>
        import(/* webpackChunkName: "order-details-container" */ "./account/containers/OrderDetailsContainer.js"),
    loading() {
        return <Loader />;
    },
});

const DisplayOrderSummaryContainer = Loadable({
    loader: () =>
        import(
            /* webpackChunkName: "display-order-summary-container" */ "./cart/containers/DisplayOrderSummaryContainer"
        ),
    loading() {
        return <Loader />;
    },
});

const CheckoutAddressContainer = Loadable({
    loader: () =>
        import(/* webpackChunkName: "checkout-address-container" */ "./cart/containers/CheckoutAddressContainer"),
    loading() {
        return <Loader />;
    },
});

const DeliveryModesContainer = Loadable({
    loader: () => import(/* webpackChunkName: "delivery-modes-container" */ "./cart/containers/DeliveryModesContainer"),
    loading() {
        return <Loader />;
    },
});

const DesktopFooterContainer = Loadable({
    loader: () =>
        import(/* webpackChunkName: "desktop-footer-container" */ "./general/containers/DesktopFooterContainer"),
    loading() {
        return <Loader />;
    },
});

const CategoriesPageContainer = Loadable({
    loader: () =>
        import(/* webpackChunkName: "categories-page-container" */ "./clp/containers/CategoriesPageContainer"),
    loading() {
        return <Loader />;
    },
});
const LoginContainer = Loadable({
    loader: () => import(/* webpackChunkName: "desktop-login" */ "./auth/components/DesktopLogin"),
    loading() {
        return <Loader />;
    },
});

const SignUpContainer = Loadable({
    loader: () => import(/* webpackChunkName: "desktop-login" */ "./auth/components/DesktopLogin"),
    loading() {
        return <Loader />;
    },
});

const CheckOutContainer = Loadable({
    loader: () => import(/* webpackChunkName: "check-out-container" */ "./cart/containers/CheckOutContainer"),
    loading() {
        return <Loader />;
    },
});

const CartContainer = Loadable({
    loader: () => import(/* webpackChunkName: "cart-container" */ "./cart/containers/CartContainer"),
    loading() {
        return <Loader />;
    },
});

const ProductReviewContainer = Loadable({
    loader: () => import(/* webpackChunkName: "product-review-container" */ "./pdp/containers/ProductReviewContainer"),
    loading() {
        return <Loader />;
    },
});

const ProductSellerContainer = Loadable({
    loader: () => import(/* webpackChunkName: "product-seller-container" */ "./pdp/containers/ProductSellerContainer"),
    loading() {
        return <Loader />;
    },
});

const NoResultPage = Loadable({
    loader: () => import(/* webpackChunkName: "no-result-page" */ "./errorsPage/components/NoResultPage"),
    loading() {
        return <Loader />;
    },
});

const AllSellerContainer = Loadable({
    loader: () => import(/* webpackChunkName: "all-seller-container" */ "./account/containers/AllSellerContainer"),
    loading() {
        return <Loader />;
    },
});

const AllSellerReviewContainer = Loadable({
    loader: () =>
        import(/* webpackChunkName: "all-seller-review-container" */ "./account/containers/AllSellerReviewContainer"),
    loading() {
        return <Loader />;
    },
});

const CleverTapUnsubscribeEmail = Loadable({
    loader: () =>
        import(/* webpackChunkName: "clever-tap-email-unsubscribe" */ "./general/components/CleverTapEmailUnsubscribe"),
    loading() {
        return <Loader />;
    },
});

const MobileNumberContainer = Loadable({
    loader: () =>
        import(/* webpackChunkName: "mobile-number-login" */ "./mobile-number-login/mobile-number-login.container"),
    loading() {
        return <Loader />;
    },
});

const AttachmentUploadContainer = Loadable({
    loader: () =>
        import(/* webpackChunkName: "attachment-container" */ "./account/containers/attachment-upload-container.js"),
    loading() {
        return <Loader />;
    },
});
class App extends Component {
    async componentWillMount() {
        let globalAccessToken = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
        if (!globalAccessToken && !this.props.cartLoading) {
            await this.props.getGlobalAccessToken();
            globalAccessToken = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
        }
        let loggedInUserDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        let customerAccessToken = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        if (customerAccessToken && !loggedInUserDetails) {
            Cookie.deleteCookie(CUSTOMER_ACCESS_TOKEN);
        }
    }

    async componentDidMount() {
        let customerAccessToken = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        let loggedInUserDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        let cartDetailsForLoggedInUser = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
        let guid;

        let cartDetailsForAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
        let loginType =
            localStorage.getItem("loginType") !== "undefined" && JSON.parse(localStorage.getItem("loginType"));
        if (loginType && window && window.digitalData) {
            Object.assign(window.digitalData, {
                account: loginType,
            });
        }
        // Case 1. THe user is not logged in.
        // if (!globalAccessToken && !this.props.cartLoading) {
        //   await this.props.getGlobalAccessToken();
        //   globalAccessToken = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
        // }

        if (!customerAccessToken && localStorage.getItem(REFRESH_TOKEN)) {
            await this.props.refreshToken(localStorage.getItem(REFRESH_TOKEN));
            customerAccessToken = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        }

        if (customerAccessToken && cartDetailsForLoggedInUser && loggedInUserDetails) {
            // Get Cart GUID for logged-in user
            guid = JSON.parse(cartDetailsForLoggedInUser).guid ? JSON.parse(cartDetailsForLoggedInUser).guid : null;
            if (
                this.props.location.pathname.indexOf(LOGIN_PATH) !== -1 ||
                this.props.location.pathname.indexOf(SIGN_UP_PATH) !== -1
            ) {
                if (this.props.redirectToAfterAuthUrl) {
                    this.props.history.push(this.props.redirectToAfterAuthUrl);
                    this.props.clearUrlToRedirectToAfterAuth();
                } else {
                    this.props.history.push(`${HOME_ROUTER}`);
                }
            }
        } else {
            if (cartDetailsForAnonymous) {
                // Get Cart GUID if user is Anonymous
                guid = JSON.parse(cartDetailsForAnonymous);
            }
        }
        this.renderMonetizationScript();
        // Check if GUID exists
        if (guid && !this.props.history.location.pathname.includes("/checkout")) {
            // Get the bagCount if Cart GUID exists for Logged-in user or Anonymous user
            await this.props.getCartCountForLoggedInUsers(typeof guid === "object" ? guid : null);
        } else {
            // Else remove cartDetails from Local storage
            localStorage.removeItem(CART_BAG_DETAILS);
        }

        if (!this.props.location.pathname.includes("/my-account")) {
            if (window.od && window.od.messenger && window.od.messenger("update")) {
                window.od.messenger("update");
            }
        }
    }

    componentDidUpdate(prevProps) {
        this.checkExistenceOfDefaultPincode();
        // Are we adding new items to the list?
        // Capture the scroll position so we can adjust scroll later.
        if (prevProps.location.pathname != this.props.location.pathname) {
            setTimeout(() => {
                setDataLayer(ADOBE_VIRTUAL_PAGELOAD);
            }, 300);
        }
    }

    checkExistenceOfDefaultPincode() {
        if (!localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)) {
            localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, DEFAULT_PINCODE);
        }
    }

    renderLoader() {
        return (
            <div className={AppStyles.loadingIndicator}>
                <SecondaryLoader />
            </div>
        );
    }

    renderMonetizationScript() {
        let tracker = document.createElement("script");
        tracker.type = "text/javascript";
        tracker.async = true;
        tracker.src = `https://c.o-s.io/${process.env.MONETIZATION_CLIENT_ID}/tracker.js`;
        var mainScript = document.getElementsByTagName("script")[0];
        mainScript.parentNode.insertBefore(tracker, mainScript);
    }

    render() {
        if (!this.props.location.pathname.includes("/my-account")) {
            if (window.od && window.od.messenger && window.od.messenger("update")) {
                window.od.messenger("update");
            }
        }
        let className = AppStyles.base;

        if (this.props.beautyPopupModal) {
            className = AppStyles.beauty_blur;
        } else if (this.props.modalStatus) {
            className = AppStyles.blur;
        }

        const appTransform = this.props.scrollPosition !== 0 ? `translateY(-${this.props.scrollPosition}px)` : null;

        return (
            <React.Fragment>
                <div className={className} style={{ transform: appTransform }}>
                    <HeaderContainer />
                    <Switch>
                        <Route path={MY_ACCOUNT} component={MyAccountWrapper} />{" "}
                        <Route exact path={PANCARD_PAGE} component={PanCardFormContainer} />
                        <Route exact path={CATEGORY_PRODUCT_LISTINGS_WITH_PAGE} component={ProductListingsContainer} />
                        <Route exact path={BRAND_PRODUCT_LISTINGS_WITH_PAGE} component={ProductListingsContainer} />
                        <Route
                            exact
                            path={LOGIN_PATH}
                            render={(routeProps) => <LoginContainer {...routeProps} {...this.props} />}
                        />
                        <Route
                            exact
                            path={SIGN_UP_PATH}
                            render={(routeProps) => <SignUpContainer {...routeProps} {...this.props} />}
                        />
                        <Route path={CANCEL_PREFIX} component={CancelOrderContainer} />
                        <Route path={CANCEL_RETURN_PREFIX} component={CancelReturnRequestContainer} />
                        <Route path={RETURNS} component={ReturnFlowContainer} />
                        <Route path={SHORT_URL_ORDER_DETAIL} component={OrderDetailsContainer} />
                        <Route exact path={BRAND_AND_CATEGORY_PAGE} component={ProductListingsContainer} />
                        <Route exact path={CATEGORY_PAGE} component={PlpBrandCategoryWrapperContainer} />
                        <Route exact path={BRAND_PAGE} component={PlpBrandCategoryWrapperContainer} />
                        <Route exact path={BRAND_PAGE_WITH_QUERY_PARAMS} component={PlpBrandCategoryWrapperContainer} />
                        <Route
                            exact
                            path={CATEGORY_PAGE_WITH_QUERY_PARAMS}
                            component={PlpBrandCategoryWrapperContainer}
                        />
                        <Route exact path={BRAND_PAGE_WITH_SLUG} component={PlpBrandCategoryWrapperContainer} />
                        <Route strict path={BRAND_PAGE_WITH_FILTER_SLUG} component={PlpBrandCategoryWrapperContainer} />
                        <Route
                            exact
                            path={BRAND_PAGE_WITH_SLUG_WITH_QUERY_PARAMS}
                            component={PlpBrandCategoryWrapperContainer}
                        />
                        <Route strict path={CATEGORY_PAGE_WITH_SLUG} component={PlpBrandCategoryWrapperContainer} />
                        <Route
                            strict
                            path={CATEGORY_PAGE_WITH_FILTER_SLUG}
                            component={PlpBrandCategoryWrapperContainer}
                        />
                        <Route
                            exact
                            path={CATEGORY_PAGE_WITH_SLUG_WITH_QUERY_PARAMS}
                            component={PlpBrandCategoryWrapperContainer}
                        />
                        <Route path={PRODUCT_DESCRIPTION_REVIEWS} component={ProductReviewContainer} />
                        <Route path={WRITE_REVIEWS_WITH_SLUG} component={ProductReviewContainer} />
                        <Route path={WRITE_REVIEWS} component={ProductReviewContainer} />
                        <Route path={PRODUCT_DESCRIPTION_REVIEWS_WITH_SLUG} component={ProductReviewContainer} />
                        <Route path={PRODUCT_OTHER_SELLER_ROUTER} component={ProductSellerContainer} />
                        <Route
                            exact
                            path={PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE}
                            component={ProductDescriptionPageWrapperContainer}
                        />
                        <Route
                            exact
                            path={PRODUCT_DESCRIPTION_PRODUCT_CODE}
                            component={ProductDescriptionPageWrapperContainer}
                        />
                        <Route exact path={PRODUCT_LISTINGS} component={ProductListingsContainer} />
                        <Route exact path={PRODUCT_LISTINGS_WITHOUT_SLASH} component={ProductListingsContainer} />
                        <Route exact path={HOME_ROUTER} component={HomeContainer} />
                        <Route
                            exact
                            path={MAIN_ROUTER}
                            render={(routeProps) => <Auth {...routeProps} {...this.props} />}
                        />
                        <Route exact path={BRAND_LANDING_PAGE} component={BrandLandingPageContainer} />
                        <Route exact path={PRODUCT_DELIVERY_ADDRESSES} component={CheckoutAddressContainer} />
                        <Route exact path={FEEDBACK_PAGE} component={FeedBackContainer} />
                        <Route exact path={RETURN_FEEDBACK_PAGE} component={FeedBackContainer} />
                        <Route exact path={FEEDBACK_INTERMITTENT_PAGE} component={IntermittentFeedbackContainer} />
                        <Route
                            exact
                            path={FEEDBACK_RETURN_INTERMITTENT_PAGE}
                            component={IntermittentFeedbackContainer}
                        />
                        <Route exact path={PRODUCT_CART_DELIVERY_MODES} component={DeliveryModesContainer} />
                        <Route exact path={ORDER_SUMMARY_ROUTER} component={DisplayOrderSummaryContainer} />
                        <Route path={CHECKOUT_ROUTER} component={CheckOutContainer} />
                        <Route exact path={PRODUCT_CART_ROUTER} component={CartContainer} />
                        <Route exact path={DEFAULT_BRANDS_LANDING_PAGE} component={BrandsLandingPageDefaultContainer} />
                        <Route exact path={CATEGORIES_LANDING_PAGE} component={CategoriesPageContainer} />
                        <Route exact path={UNSUBSCRIBE_CLEVER_TAP_EMAILS} component={CleverTapUnsubscribeEmail} />
                        {/* This *has* to be at the bottom */}
                        <Route exact path={SKU_PAGE_FILTER} component={ProductListingsContainer} />
                        <Route exact path={RETRY_FAILED_ORDER} component={CheckOutContainer} />
                        <Route exact path={HELP_URL} component={HelpDetailsContainer} />
                        <Route exact path={SKU_PAGE} component={ProductListingsContainer} />
                        <Route exact path={CAPTURE_ATTACHMENTS} component={AttachmentUploadContainer} />
                        <Route exact path={NOT_FOUND} render={() => <NoResultPage {...this.props} />} />
                        <Route exact path={REDMI_WALLET_FROM_EMAIL} component={MyAccountWrapper} />
                        <Route
                            path={`/store/transactionId=:id&customerId=:id1/seller-review`}
                            component={AllSellerContainer}
                        />
                        <Route
                            path={`/store/transactionId=:id&customerId=:id1/seller-reviewed`}
                            component={AllSellerReviewContainer}
                        />
                        <Route
                            path={`/transactionId=:id&customerId=:id1/seller-review`}
                            component={AllSellerContainer}
                        />
                        <Route
                            path={`/transactionId=:id&customerId=:id1/seller-reviewed`}
                            component={AllSellerReviewContainer}
                        />
                        <Route
                            exact
                            path="/Unsubscribe.html"
                            render={() => {
                                window.location.href = "Unsubscribe.html";
                            }}
                        />
                        <Route
                            path="/que"
                            component={() => {
                                window.location.replace("https://www.tatacliq.com/que/");
                                return (
                                    <div className={AppStyles.loadingIndicator}>
                                        <SecondaryLoader />
                                    </div>
                                );
                            }}
                        />
                        <Route
                            path="/care"
                            component={() => {
                                let currentLocation = window.location;
                                let redirectURL =
                                    currentLocation.protocol + "//" + currentLocation.host + "/my-account/cliq-care";
                                window.location.replace(redirectURL);
                                return (
                                    <div className={AppStyles.loadingIndicator}>
                                        <SecondaryLoader />
                                    </div>
                                );
                            }}
                        />
                        <Route exact path={STATIC_PAGE} component={StaticPageContainer} />
                        <Route render={() => <NoResultPage {...this.props} />} />
                    </Switch>
                    <SecondaryLoaderContainer />

                    <DesktopOnly>
                        {!this.props.location.pathname.includes(CHECKOUT_ROUTER) &&
                            !this.props.location.pathname.includes(PRODUCT_CART_ROUTER) &&
                            !this.props.location.pathname.includes(LOGIN_PATH) &&
                            !this.props.location.pathname.includes(SIGN_UP_PATH) && <DesktopFooterContainer />}
                    </DesktopOnly>
                    {this.props.isModalEnabled ? <ModalContainer /> : <React.Fragment /> }
                    <ErrorContainer />
                    <ToastContainer />
                    {this.props.isMobileNumberLoginModalActive && <MobileNumberContainer />}
                </div>
            </React.Fragment>
        );
    }
}

export default App;
