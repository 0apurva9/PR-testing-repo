import React from "react";
// import HeaderContainer from "./general/containers/HeaderContainer";
// import DesktopFooterContainer from "./general/containers/DesktopFooterContainer";
import Loader from "./general/components/Loader";
// import PropTypes from "prop-types";
export default class DummyApp extends React.Component {
  render() {
    return (
      <div
        className="ok"
        style={{
          width: "100%",
          height: "100vh"
        }}
      >
        <Loader />
      </div>
    );
  }
}
