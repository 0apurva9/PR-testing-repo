import React from "react";
import HomeSkeleton from "./general/components/HomeSkeleton";
import InformationHeader from "./general/components/InformationHeader";
// import PropTypes from "prop-types";
export default class DummyApp extends React.Component {
  render() {
    // let classActive = styles.textHolder;
    // if (this.props.selected) {
    //   classActive = styles.textHolderActive;
    // }
    return (
      <div
        className="ok"
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "green"
        }}
      >
        <InformationHeader />
        <HomeSkeleton />
      </div>
    );
  }
}
