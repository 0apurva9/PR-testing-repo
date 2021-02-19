import React from "react";
import SearchContainer from "../../search/SearchContainer.js";
import DesktopHeader from "./DesktopHeader.js";
import * as Cookie from "../../lib/Cookie";
import styles from "./HeaderWrapper.css";
import queryString from "query-string";
import {
    CNCTOHD,
    HOME_ROUTER,
    PRODUCT_CART_ROUTER,
    LOGIN_PATH,
    SAVE_LIST_PAGE,
    LOGGED_IN_USER_DETAILS,
    CUSTOMER_ACCESS_TOKEN,
    MY_ACCOUNT_PAGE,
    CHECKOUT_ROUTER,
    APP_VIEW,
    CART_BAG_DETAILS,
    MY_ACCOUNT_ORDERS_PAGE,
    MY_ACCOUNT_ALERTS_PAGE,
    MY_ACCOUNT_GIFT_CARD_PAGE,
    MY_ACCOUNT_CLIQ_CASH_PAGE,
    CHECKOUT_RETRY_PAYMENT_ROUTER,
} from "../../../src/lib/constants";
import DesktopOnly from "../../general/components/DesktopOnly";
import * as UserAgent from "../../lib/UserAgent.js";
export default class HeaderWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stickyHeader: false,
            showStickyHeader: 0,
        };
    }

    onBackClick = () => {
        if (this.props.isPlpFilterOpen) {
            this.props.hideFilter();
            return;
        }

        // here in case of checkout page after payment  success or failure
        // if user click on back button then we have to take user on home page
        const parsedQueryString = queryString.parse(this.props.location.search);
        const paymentStatus = parsedQueryString.status;
        if (paymentStatus || this.props.cliqCashJusPayDetails || this.props.orderConfirmationDetails) {
            this.props.history.push(HOME_ROUTER);
            return;
        } else {
            this.props.history.goBack();
        }
    };

    goToCart = () => {
        if (this.props.history) {
            this.props.history.push(PRODUCT_CART_ROUTER);
        }
    };

    redirectToHome = () => {
        if (this.props.history) {
            this.props.history.push(HOME_ROUTER);
        }
    };

    handleScroll = () => {
        let lastScrollTop = window.pageYOffset;
        document.addEventListener(
            "scroll",
            () => {
                let ScrollSticky = window.pageYOffset || document.documentElement.scrollTop - 1;
                if (ScrollSticky > lastScrollTop + 1) {
                    this.setState({ stickyHeader: true });
                } else if (ScrollSticky < lastScrollTop + 1) {
                    this.setState({ stickyHeader: false });
                }
                lastScrollTop = ScrollSticky <= 0 ? 0 : ScrollSticky; // For Mobile or negative scrolling
            },
            false
        );
        this.setState({ stickyHeader: false });
    };

    handleSelect(val) {
        if (this.props.history) {
            this.props.history.push(val);
        }
    }

    goToOrdersPage = () => {
        const url = `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ORDERS_PAGE}`;
        this.props.history.push(url);
    };

    goToDefaultWishList = () => {
        const url = `${MY_ACCOUNT_PAGE}${SAVE_LIST_PAGE}`;
        this.props.history.push(url);
    };

    goToMyAccount = () => {
        const url = `${MY_ACCOUNT_PAGE}`;
        this.props.history.push(url);
    };

    goToAlertsAndCoupon = () => {
        const url = `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ALERTS_PAGE}`;
        this.props.history.push(url);
    };

    goToGiftCard = () => {
        const url = `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_GIFT_CARD_PAGE}`;
        this.props.history.push(url);
    };

    goToCliqCash = () => {
        const url = `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}`;
        this.props.history.push(url);
    };

    componentDidMount() {
        // this.props.getWishListItems();
        if (this.props.location.pathname !== HOME_ROUTER && !this.props.location.pathname.includes(SAVE_LIST_PAGE)) {
            this.props.getWishlist();
        }
        window.scroll(0, 0);
        this.throttledScroll = this.handleScroll();
        window.addEventListener("scroll", this.throttledScroll);
        if (this.props.getHeader) {
            this.props.getHeader();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.throttledScroll);
    }

    goToWishList = () => {
        if (this.props.history) {
            const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
            const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
            if (!userDetails || !customerCookie) {
                const url = this.props.location.pathname;
                if (this.props.setUrlToRedirectToAfterAuth) {
                    this.props.setUrlToRedirectToAfterAuth(url);
                }

                if (UserAgent.checkUserAgentIsMobile()) {
                    this.props.history.push(LOGIN_PATH);
                } else {
                    if (this.props.showAuthPopUp) {
                        this.props.showAuthPopUp();
                    }

                    return null;
                }
            } else {
                this.props.history.push(`${MY_ACCOUNT_PAGE}${SAVE_LIST_PAGE}`);
            }
        }
    };

    openSignUp = () => {
        if (this.props.location.pathname !== "/checkout" && this.props.location.pathname !== "/cart") {
            this.props.setUrlToRedirectToAfterAuth(`${this.props.location.pathname}${this.props.location.search}`);
        }
        this.props.history.push(LOGIN_PATH);
        return null;
    };

    render() {
        const searchQuery = queryString.parse(this.props.history.location.search);
        let wishListCount = this.props.wishListCount;
        let lengthOfWishList = wishListCount.count;

        const hasAppView = searchQuery.appview;
        if (hasAppView && !Cookie.getCookie(APP_VIEW)) {
            Cookie.createCookie(APP_VIEW, true);
        }
        const url = this.props.location.pathname;
        const urlSearchString = this.props.location.search;
        let shouldRenderHeader = true;
        let isSearch = true;
        let isSticky = true;
        let profileDetails = false;

        if (url === PRODUCT_CART_ROUTER || url.includes(CNCTOHD)) {
            isSearch = false;
            profileDetails = true;
            isSticky = false;
        }
        if (
            url === CHECKOUT_ROUTER ||
            (url.includes(CHECKOUT_RETRY_PAYMENT_ROUTER) && !urlSearchString.includes("&status=CHARGED"))
        ) {
            isSearch = false;
            profileDetails = true;
            isSticky = false;
        }

        if (url.includes("how-upi-works") || url.includes("how-dcemi-works")) {
            shouldRenderHeader = false;
        }

        if (hasAppView === "true" || Cookie.getCookie(APP_VIEW)) {
            shouldRenderHeader = false;
        }
        return (
            shouldRenderHeader && (
                <React.Fragment>
                    <DesktopOnly>
                        <div
                            className={
                                url === CHECKOUT_ROUTER ||
                                (url.includes(CHECKOUT_RETRY_PAYMENT_ROUTER) &&
                                    !urlSearchString.includes("&status=CHARGED"))
                                    ? styles.hiddenHeaderCheckout
                                    : styles.hiddenHeaderDesktop
                            }
                        />
                        <DesktopHeader
                            history={this.props.history}
                            openSignUp={this.openSignUp}
                            redirectToHome={this.redirectToHome}
                            isSticky={isSticky ? this.state.stickyHeader : false}
                            bagCount={
                                typeof localStorage !== "undefined"
                                    ? localStorage.getItem(CART_BAG_DETAILS) &&
                                      JSON.parse(localStorage.getItem(CART_BAG_DETAILS)) &&
                                      JSON.parse(localStorage.getItem(CART_BAG_DETAILS)).length
                                    : 0
                            }
                            onSelect={() => this.handleSelect(PRODUCT_CART_ROUTER)}
                            goToTrackOrders={() => this.goToOrdersPage()}
                            isSearch={isSearch}
                            profileDetails={profileDetails}
                            searchHolder={<SearchContainer />}
                            headerBrandAndCategoryDetails={this.props.headerDetails}
                            goToWishList={() => this.goToDefaultWishList()}
                            wishListCount={lengthOfWishList}
                            minicart={this.props.minicart}
                            goToMyAccount={() => this.goToMyAccount()}
                            goToOrdersPage={() => this.goToOrdersPage()}
                            goToDefaultWishList={() => this.goToDefaultWishList()}
                            goToAlertsAndCoupon={() => this.goToAlertsAndCoupon()}
                            goToGiftCard={() => this.goToGiftCard()}
                            goToCliqCash={() => this.goToCliqCash()}
                            userSelectedOutOfStock={this.props.userSelectedOutOfStock}
                        />
                    </DesktopOnly>
                </React.Fragment>
            )
        );
    }
}
