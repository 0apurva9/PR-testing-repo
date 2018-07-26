import React from "react";
import InformationHeader from "./InformationHeader.js";
import SearchContainer from "../../search/SearchContainer.js";
import HollowHeader from "./HollowHeader.js";
import StickyHeader from "./StickyHeader.js";
import DesktopHeader from "./DesktopHeader.js";
import * as Cookie from "../../lib/Cookie";
import styles from "./HeaderWrapper.css";
import queryString from "query-string";
import throttle from "lodash/throttle";
import {
  HOME_ROUTER,
  PRODUCT_CART_ROUTER,
  DEFAULT_BRANDS_LANDING_PAGE,
  CATEGORIES_LANDING_PAGE,
  LOGIN_PATH,
  SIGN_UP_PATH,
  PRODUCT_LISTINGS,
  SAVE_LIST_PAGE,
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN,
  MY_ACCOUNT_PAGE,
  CHECKOUT_ROUTER,
  CHECKOUT_ROUTER_THANKYOU,
  APP_VIEW,
  CART_BAG_DETAILS,
  MY_ACCOUNT_ORDERS_PAGE
} from "../../../src/lib/constants";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";

import * as UserAgent from "../../lib/UserAgent.js";
const PRODUCT_CODE_REGEX = /p-mp(.*)/i;

export default class HeaderWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyHeader: false
    };
  }
  onBackClick = () => {
    if (this.props.isPlpFilterOpen) {
      this.props.hideFilter();
      return;
    }
    const url = this.props.location.pathname;
    let productCode;

    if (PRODUCT_CODE_REGEX.test(url)) {
      productCode = PRODUCT_CODE_REGEX.exec(url);
    }

    // here in case of checkout page after payment  success or failure
    // if user click on back button then we have to take user on home page
    const parsedQueryString = queryString.parse(this.props.location.search);
    const paymentStatus = parsedQueryString.status;
    if (
      paymentStatus ||
      this.props.cliqCashJusPayDetails ||
      this.props.orderConfirmationDetails
    ) {
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
    return throttle(() => {
      if (window.pageYOffset < 30 && this.state.stickyHeader) {
        this.setState({ stickyHeader: false });
      } else if (window.pageYOffset > 30 && !this.state.stickyHeader) {
        this.setState({ stickyHeader: true });
      }
    }, 50);
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
  componentDidMount() {
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
    if (UserAgent.checkUserAgentIsMobile()) {
      this.props.history.push(LOGIN_PATH);
    } else {
      if (this.props.showAuthPopUp) {
        this.props.showAuthPopUp();
      }

      return null;
    }
  };

  render() {
    const searchQuery = queryString.parse(this.props.history.location.search);
    const hasAppView = searchQuery.appview;
    if (hasAppView && !Cookie.getCookie(APP_VIEW)) {
      Cookie.createCookie(APP_VIEW, true);
    }
    const url = this.props.location.pathname;

    let shouldRenderSearch = false;

    let productCode = null;
    if (PRODUCT_CODE_REGEX.test(url)) {
      productCode = PRODUCT_CODE_REGEX.exec(url);
      shouldRenderSearch = true;
    }

    let isGoBack = true;
    let isCross = false;
    let isLogo = false;
    let shouldRenderHeader = true;
    let companyLogoInPdp = true;
    let isSearch = true;
    let profileDetails = false;
    if (url === PRODUCT_CART_ROUTER) {
      shouldRenderSearch = false;
    }
    if (url === PRODUCT_CART_ROUTER) {
      isSearch = false;
    }
    if (url === CHECKOUT_ROUTER) {
      isSearch = false;
      profileDetails = true;
    }
    if (
      url === DEFAULT_BRANDS_LANDING_PAGE &&
      url === CATEGORIES_LANDING_PAGE &&
      url === MY_ACCOUNT_PAGE
    ) {
      isLogo = false;
    }

    if (
      this.props.match.path.includes("/") &&
      url !== PRODUCT_CART_ROUTER &&
      url !== DEFAULT_BRANDS_LANDING_PAGE &&
      url !== CATEGORIES_LANDING_PAGE &&
      url !== MY_ACCOUNT_PAGE
    ) {
      isGoBack = true;
      shouldRenderSearch = true;
      isLogo = true;
    }
    if (this.props.location.pathname.includes("/my-account/")) {
      isLogo = false;
      shouldRenderSearch = false;
    }

    if (
      url === HOME_ROUTER ||
      url === CATEGORIES_LANDING_PAGE ||
      url === DEFAULT_BRANDS_LANDING_PAGE ||
      url === PRODUCT_LISTINGS
    ) {
      isGoBack = false;
      shouldRenderSearch = true;
    }
    if (url === HOME_ROUTER) {
      isLogo = true;
    }
    if (this.props.history.length === 0) {
      isGoBack = false;
    }
    if (this.props.history.length <= 2) {
      companyLogoInPdp = true;
    }
    if (url === LOGIN_PATH || url === SIGN_UP_PATH) {
      shouldRenderHeader = false;
    }
    if (this.props.location.pathname.includes(CHECKOUT_ROUTER_THANKYOU)) {
      isGoBack = false;
      isCross = true;
      shouldRenderSearch = false;
    }
    if (url === CHECKOUT_ROUTER) {
      isGoBack = false;
      isCross = true;
      shouldRenderSearch = false;
    }

    if (hasAppView === "true" || Cookie.getCookie(APP_VIEW)) {
      shouldRenderHeader = false;
    }
    let headerToRender = (
      <InformationHeader
        goBack={this.onBackClick}
        text={this.props.headerText}
        hasBackButton={isGoBack}
        hasCrossButton={isCross}
      />
    );
    if (productCode) {
      headerToRender = this.state.stickyHeader ? (
        <StickyHeader
          goBack={this.onBackClick}
          redirectToHome={this.redirectToHome}
          goToCart={this.goToCart}
          goToWishList={this.goToWishList}
          text={this.props.headerText}
          isShowCompanyLogo={companyLogoInPdp}
          bagCount={this.props.bagCount}
        />
      ) : (
        <HollowHeader
          goBack={this.onBackClick}
          redirectToHome={this.redirectToHome}
          goToCart={this.goToCart}
          goToWishList={this.goToWishList}
          isShowCompanyLogo={companyLogoInPdp}
          bagCount={this.props.bagCount}
          history={this.props.history}
          location={this.props.location}
        />
      );
    } else if (shouldRenderSearch) {
      headerToRender = (
        <SearchContainer
          text={this.props.headerText}
          canGoBack={this.onBackClick}
          hasBackButton={isGoBack}
          isLogo={isLogo}
        />
      );
    }
    return (
      shouldRenderHeader && (
        <React.Fragment>
          <MobileOnly>
            <React.Fragment>
              {!productCode && <div className={styles.hiddenHeader} />}
              <div
                className={!productCode ? styles.base : styles.absoluteHeader}
              >
                {headerToRender}
              </div>
            </React.Fragment>
          </MobileOnly>
          <DesktopOnly>
            <div
              className={
                url === CHECKOUT_ROUTER
                  ? styles.hiddenHeaderCheckout
                  : styles.hiddenHeaderDesktop
              }
            />
            <DesktopHeader
              history={this.props.history}
              openSignUp={this.openSignUp}
              redirectToHome={this.redirectToHome}
              bagCount={
                localStorage.getItem(CART_BAG_DETAILS) &&
                JSON.parse(localStorage.getItem(CART_BAG_DETAILS)) &&
                JSON.parse(localStorage.getItem(CART_BAG_DETAILS)).length
              }
              onSelect={val => this.handleSelect(PRODUCT_CART_ROUTER)}
              goToTrackOrders={() => this.goToOrdersPage()}
              isSearch={isSearch}
              profileDetails={profileDetails}
              searchHolder={<SearchContainer />}
              headerBrandAndCategoryDetails={this.props.headerDetails}
              goToWishList={() => this.goToDefaultWishList()}
            />
          </DesktopOnly>
        </React.Fragment>
      )
    );
  }
}
