import React from "react";
import FilterMobile from "../components/FilterMobile";
import FilterDesktop from "../components/FilterDesktop";
import MediaQuery from "react-responsive";
import styles from "./FilterWrapper.css";
export default class FilterWrapper extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MediaQuery query="(max-device-width:1024px)">
          <FilterMobile {...this.props} />
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1025px)">
          <FilterDesktop {...this.props} />
        </MediaQuery>
      </React.Fragment>
    );
  }
}
