import React from "react";
import InformationHeader from "./InformationHeader.js";
import HollowHeader from "./HollowHeader.js";
import { withRouter } from "react-router-dom";
import * as Cookie from "../../lib/Cookie";
import styles from "./HeaderWrapper.css";
import SearchContainer from "../../search/SearchContainer.js";

import {
  HOME_ROUTER,
  PRODUCT_CART_ROUTER,
  DEFAULT_BRANDS_LANDING_PAGE,
  CATEGORIES_LANDING_PAGE,
  PRODUCT_CART_DELIVERY_MODES,
  LOGIN_PATH,
  SIGN_UP_PATH,
  PRODUCT_LISTINGS,
  SAVE_LIST_PAGE,
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN,
  MY_ACCOUNT_PAGE
} from "../../../src/lib/constants";
import { SIGN_UP } from "../../auth/actions/user.actions";

const PRODUCT_CODE_REGEX = /p-(.*)/;
class HeaderWrapper extends React.Component {
  onBackClick = () => {
    this.props.history.goBack();
  };
  goToCart = () => {
    if (this.props.history) {
      this.props.history.push(PRODUCT_CART_ROUTER);
    }
  };

  goToWishList = () => {
    if (this.props.history) {
      const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      if (!userDetails || !customerCookie) {
        this.props.history.push(LOGIN_PATH);
      } else {
        this.props.history.push(`${MY_ACCOUNT_PAGE}${SAVE_LIST_PAGE}`);
      }
    }
  };

  render() {
    const url = this.props.location.pathname;
    let shouldRenderSearch = false;

    let productCode = null;
    if (PRODUCT_CODE_REGEX.test(url)) {
      productCode = PRODUCT_CODE_REGEX.exec(url);
      shouldRenderSearch = true;
    }

    let canGoBack = true;
    let shouldRenderHeader = true;
    // let headerText = this.props.headerText;
    if (
      url === HOME_ROUTER ||
      url === CATEGORIES_LANDING_PAGE ||
      url === DEFAULT_BRANDS_LANDING_PAGE ||
      url === PRODUCT_LISTINGS
    ) {
      canGoBack = false;
      shouldRenderSearch = true;
    }

    if (this.props.history.length === 0) {
      canGoBack = false;
    }

    if (url === LOGIN_PATH || url === SIGN_UP_PATH) {
      shouldRenderHeader = false;
    }

    // if we are on home, category landing, brand landing, we cannot go back.

    /*
    When can we not go back?
    If we are on home, category landing, brand landing, then we cannot go back.
    If we are not on any of those and we have history stack, then we can go back.

    What if we are on view sellers or view reviews?
      If there is no back and we are on a



*/

    let headerToRender = (
      <InformationHeader
        goBack={this.onBackClick}
        text={this.props.headerText}
        hasBackButton={canGoBack}
      />
    );
    if (productCode) {
      headerToRender = (
        <HollowHeader
          goBack={this.onBackClick}
          goToCart={this.goToCart}
          goToWishList={this.goToWishList}
        />
      );
    } else if (shouldRenderSearch) {
      headerToRender = (
        <SearchContainer text={this.props.headerText} canGoBack={canGoBack} />
      );
    }

    return (
      shouldRenderHeader && (
        <React.Fragment>
          {!productCode && <div className={styles.hiddenHeader} />}
          <div className={!productCode ? styles.base : styles.absoluteHeader}>
            {headerToRender}
          </div>
        </React.Fragment>
      )
    );
  }
}

export default withRouter(HeaderWrapper);
