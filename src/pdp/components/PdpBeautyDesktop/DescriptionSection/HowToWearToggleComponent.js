import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./HowToWearComponent.css";

const BASE_YOUTUBE = "https://www.youtube.com/embed/";

export default class HowToWearToggleComponent extends Component {
  render() {
    const htwData = this.props.howToWearResponse
      ? this.props.howToWearResponse.items
      : [];
    let videoURL;
    if (htwData && htwData.length > 0) {
      htwData.forEach(element => {
        if (element.componentName === "HTWPDPCarouselComponent") {
          let webURL = element.singleBannerComponent.items[0].webURL;
          webURL = webURL.split("/");
          const isYoutube = webURL.some(el => el === "youtu.be");
          if (isYoutube) {
            videoURL = BASE_YOUTUBE + webURL[webURL.length - 1];
          } else {
            videoURL = element.singleBannerComponent.items[0].webURL;
          }
        }
      });
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
