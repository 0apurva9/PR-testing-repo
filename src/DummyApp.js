import React from "react";
import HeaderContainer from "./general/containers/HeaderContainer";
import DesktopFooterContainer from "./general/containers/DesktopFooterContainer";
import ProductListingsContainer from "./plp/containers/ProductListingsContainer";
import { Switch } from "react-router-dom";
import Route from "./general/Route";
import { PRODUCT_LISTINGS } from "./lib/constants";
// import PropTypes from "prop-types";
export default class DummyApp extends React.Component {
  render() {
    return (
      <div
        className="ok"
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "green"
        }}
      >
        <Switch>
          <Route
            exact
            path={PRODUCT_LISTINGS}
            render={props => {
              return <ProductListingsContainer {...props} />;
            }}
          />
        </Switch>
        <DesktopFooterContainer />
      </div>
    );
  }
}
