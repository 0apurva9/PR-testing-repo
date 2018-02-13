import React, { Component } from "react";
import ModalContainer from "./general/containers/ModalContainer";
import { Route, Switch, Redirect } from "react-router-dom";
import { default as AppStyles } from "./App.css";
import Auth from "./auth/components/MobileAuth.js";
import HomeContainer from "./home/containers/HomeContainer.js";
import ProductListingsContainer from "./plp/containers/ProductListingsContainer";
import ProductDescriptionContainer from "./pdp/containers/ProductDescriptionContainer";
import ProductReviewContainer from "./pdp/containers/ProductReviewContainer";
import LoginContainer from "./auth/containers/LoginContainer";
import SignUpContainer from "./auth/containers/SignUpContainer.js";
import FilterContainer from "./plp/containers/FilterContainer";
import ProductSellerContainer from "./pdp/containers/ProductSellerContainer";
import * as Cookie from "./lib/Cookie";
import MDSpinner from "react-md-spinner";
import {
  HOME_ROUTER,
  PRODUCT_LISTINGS,
  PRODUCT_DESCRIPTION_ROUTER,
  MAIN_ROUTER,
  PRODUCT_REVIEW_ROUTER,
  LOGIN_PATH,
  SIGN_UP_PATH,
  PRODUCT_FILTER_ROUTER,
  PRODUCT_SELLER_ROUTER
} from "../src/lib/constants";
import {
  GLOBAL_ACCESS_TOKEN,
  CUSTOMER_ACCESS_TOKEN,
  REFRESH_TOKEN
} from "./lib/constants.js";
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
  componentWillMount() {
    this.getAccessToken();
  }

  getAccessToken = () => {
    let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    if (!globalCookie) {
      this.props.getGlobalAccessToken();
    }
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!customerCookie && localStorage.getItem(REFRESH_TOKEN)) {
      this.props.refreshToken(localStorage.getItem(REFRESH_TOKEN));
    }
    if (customerCookie) {
      auth.isAuthenticated = true;
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

    if (this.props.user.loading) {
      return (
        <div className={AppStyles.loadingIndicator}>
          <MDSpinner />
        </div>
      );
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
            path={PRODUCT_DESCRIPTION_ROUTER}
            component={ProductDescriptionContainer}
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
        </Switch>
        <ModalContainer />
      </div>
    );
  }
}

export default App;
