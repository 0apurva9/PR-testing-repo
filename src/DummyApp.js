import React from "react";
import HeaderContainer from "./general/containers/HeaderContainer";
import DesktopFooterContainer from "./general/containers/DesktopFooterContainer";
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
        <HeaderContainer />
        <DesktopFooterContainer />
      </div>
    );
  }
}
