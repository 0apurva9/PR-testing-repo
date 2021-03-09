import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Loadable from "react-loadable";
import styles from "./HowToWearComponent.css";

const BASE_YOUTUBE = "https://www.youtube.com/embed/";
const ReactPlayer = Loadable({
    loader: () => import("react-player"),
    loading() {
        return <div />;
    },
});
export default class HowToWearToggleComponent extends Component {
    render() {
        const htwData = this.props.howToWearResponse ? this.props.howToWearResponse.items : [];
        let videoURL = "";
        let imageURL = "";
        if (htwData && htwData.length > 0) {
            htwData.forEach(element => {
                if (element.componentName === "HTWPDPCarouselComponent") {
                    let webURL = element.singleBannerComponent.items[0].webURL;
                    imageURL = element.singleBannerComponent.items[0].imageURL;
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
                    <ReactPlayer
                        url={videoURL}
                        playing={true}
                        width="100%"
                        height="100%"
                        controls={this.props.controls}
                        onEnded={this.props.onEnded}
                        onPlay={this.props.onPlay}
                        className="embed-video"
                        light={imageURL}
                        playIcon={<div></div>}
                    />
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
                        title: PropTypes.string,
                    })
                ),
            })
        ),
    }),
};
