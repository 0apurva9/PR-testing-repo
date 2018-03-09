import React, { Component } from "react";
import ModalContainer from "./general/containers/ModalContainer";
import { Route, Switch, Redirect } from "react-router-dom";
import { default as AppStyles } from "./App.css";
import Auth from "./auth/components/MobileAuth.js";
import HomeContainer from "./home/containers/HomeContainer.js";
import ProductListingsContainer from "./plp/containers/ProductListingsContainer";
import ProductDescriptionContainer from "./pdp/containers/ProductDescriptionContainer";
import ProductDescriptionPageWrapperContainer from "./pdp/containers/ProductDescriptionPageWrapperContainer";
import ProductReviewContainer from "./pdp/containers/ProductReviewContainer";
import LoginContainer from "./auth/containers/LoginContainer";
import SignUpContainer from "./auth/containers/SignUpContainer.js";
import FilterContainer from "./plp/containers/FilterContainer";
import ProductSellerContainer from "./pdp/containers/ProductSellerContainer";
import CheckoutAddressContainer from "./cart/containers/CheckoutAddressContainer";
import CartContainer from "./cart/containers/CartContainer";
import DeliveryModesContainer from "./cart/containers/DeliveryModesContainer";
import PlpBrandCategoryWrapperContainer from "./plp/containers/PlpBrandCategoryWrapperContainer";
import DisplayOrderSummaryContainer from "./cart/containers/DisplayOrderSummaryContainer";
import CheckOutContainer from "./cart/containers/CheckOutContainer";
import * as Cookie from "./lib/Cookie";
import MDSpinner from "react-md-spinner";
import {
  HOME_ROUTER,
  PRODUCT_LISTINGS,
  MAIN_ROUTER,
  PRODUCT_REVIEW_ROUTER,
  LOGIN_PATH,
  SIGN_UP_PATH,
  PRODUCT_DELIVERY_ADDRESSES,
  PRODUCT_FILTER_ROUTER,
  PRODUCT_SELLER_ROUTER,
  PRODUCT_CART_ROUTER,
  GLOBAL_ACCESS_TOKEN,
  CUSTOMER_ACCESS_TOKEN,
  REFRESH_TOKEN,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CART_DETAILS_FOR_ANONYMOUS,
  LOGGED_IN_USER_DETAILS,
  PRODUCT_CART_DELIVERY_MODES,
  SEARCH_RESULTS_PAGE,
  BRAND_OR_CATEGORY_LANDING_PAGE,
  ORDER_SUMMARY_ROUTER,
  CHECKOUT_ROUTER,
  PRODUCT_DESCRIPTION_PRODUCT_CODE,
  PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE,
  PLP_CATEGORY_SEARCH
} from "../src/lib/constants";
import PlpBrandCategoryWrapper from "./plp/components/PlpBrandCategoryWrapper";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: { MAIN_ROUTER }
          }}
        />
      )
    }
  />
);

const auth = {
  isAuthenticated: false
};
class App extends Component {
  componentDidUpdate() {
    this.getAccessToken();
  }

  componentDidMount() {
    this.getAccessToken();
  }
  getAccessToken = () => {
    let globalAccessToken = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    let customerAccessToken = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let cartIdForAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
    let loggedInUserDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let cartDetailsForLoggedInUser = Cookie.getCookie(
      CART_DETAILS_FOR_LOGGED_IN_USER
    );
    let cartDetailsForAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);

    if (!globalAccessToken) {
      this.props.getGlobalAccessToken();
      if (!cartIdForAnonymous) {
        this.props.generateCartIdForAnonymous();
      }
    }

    if (!customerAccessToken && localStorage.getItem(REFRESH_TOKEN)) {
      this.props.refreshToken(localStorage.getItem(REFRESH_TOKEN));
      if (!loggedInUserDetails) {
        this.props.generateCartIdForLoggedInUser();
      }
    }

    if (customerAccessToken) {
      auth.isAuthenticated = true;
      if (!cartDetailsForLoggedInUser) {
        this.props.generateCartIdForLoggedInUser();
      }
    } else {
      if (!cartDetailsForAnonymous && globalAccessToken) {
        this.props.generateCartIdForAnonymous();
      }
    }
  };

  renderLoader() {
    return (
      <div className={AppStyles.loadingIndicator}>
        <MDSpinner />
      </div>
    );
  }

  render() {
    let className = AppStyles.base;
    if (this.props.modalStatus) {
      className = AppStyles.blur;
    }
    return (
      <div className={className}>
        <Switch>
          <Route
            exact
            path={LOGIN_PATH}
            render={routeProps => (
              <LoginContainer {...routeProps} {...this.props} />
            )}
          />
          <Route
            exact
            path={SIGN_UP_PATH}
            render={routeProps => (
              <SignUpContainer {...routeProps} {...this.props} />
            )}
          />

          <Route
            exact
            path={SEARCH_RESULTS_PAGE}
            component={PlpBrandCategoryWrapperContainer}
          />
          <Route
            path={PRODUCT_DESCRIPTION_PRODUCT_CODE}
            component={ProductDescriptionPageWrapperContainer}
          />

          <Route
            path={PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE}
            component={ProductDescriptionPageWrapperContainer}
          />
          <Route
            exact
            path={BRAND_OR_CATEGORY_LANDING_PAGE}
            component={PlpBrandCategoryWrapperContainer}
          />

          <Route
            exact
            path={PRODUCT_LISTINGS}
            component={ProductListingsContainer}
          />

          <Route exact path={HOME_ROUTER} component={HomeContainer} />
          <Route
            exact
            path={MAIN_ROUTER}
            render={routeProps => <Auth {...routeProps} {...this.props} />}
          />

          <Route
            exact
            path={PRODUCT_REVIEW_ROUTER}
            component={ProductReviewContainer}
          />

          <Route
            exact
            path={PRODUCT_FILTER_ROUTER}
            component={FilterContainer}
          />
          <Route
            exact
            path={PRODUCT_SELLER_ROUTER}
            component={ProductSellerContainer}
          />
          <Route
            exact
            path={PRODUCT_DELIVERY_ADDRESSES}
            component={CheckoutAddressContainer}
          />
          <Route
            exact
            path={PRODUCT_CART_DELIVERY_MODES}
            component={DeliveryModesContainer}
          />
          <Route
            exact
            path={ORDER_SUMMARY_ROUTER}
            component={DisplayOrderSummaryContainer}
          />
          <Route exact path={CHECKOUT_ROUTER} component={CheckOutContainer} />
          <Route exact path={PRODUCT_CART_ROUTER} component={CartContainer} />
        </Switch>
        <ModalContainer />
      </div>
    );
  }
}

export default App;
