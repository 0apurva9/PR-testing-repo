import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./HowToWearComponent.css";

export default class HowToWearToggleComponent extends Component {
  render() {
    const htwData = this.props.howToWearResponse
      ? this.props.howToWearResponse.luxeMonoBLPBannerComponent
      : [];
    let videoURL;
    if (htwData && htwData.length > 0) {
      videoURL = htwData[0].items[0].webURL;
    }
    return (
      <Fragment>
        <div className={styles["htw-sections"]}>
          <iframe className={styles["embed-video"]} src={videoURL}></iframe>
        </div>
      </Fragment>
    );
  }
}

HowToWearToggleComponent.propsTypes = {
  howToWearResponse: PropTypes.shape({
    luxeMonoBLPBannerComponent: PropTypes.arrayOf(
      PropTypes.shape({
        items: PropTypes.arrayOf(
          PropTypes.shape({
            btnText: PropTypes.string,
            imageURL: PropTypes.string,
            webURL: PropTypes.string,
            title: PropTypes.string
          })
        )
      })
    )
  })
};
