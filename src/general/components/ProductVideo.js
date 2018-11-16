import React from "react";
import Image from "../../xelpmoc-core/Image";
import Logo from "./Logo";
import PropTypes from "prop-types";
import Loadable from "react-loadable";
import styles from "./ProductVideo.css";
import { widgetsTracking } from "../../lib/adobeUtils.js";
const Video = Loadable({
  loader: () => import("./Video"),
  loading() {
    return <div />;
  }
});
export default class ProductVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      played: false
    };
  }
  onEnded = () => {
    this.setState({ played: false });
  };

  onPlay = () => {
    widgetsTracking({
      widgetName: "Video Product Carousel",
      sourceOfWidget: this.props.postData && this.props.postData.widgetPlatform
    });
    this.setState({ played: true });
  };
  render() {
    let overlayClass = styles.overlay;
    if (this.state.played) {
      overlayClass = styles.overlayHidden;
    }
    return (
      <div className={styles.base}>
        <div className={styles.video} style={{ backgroundColor: "#212121" }}>
          <Video
            url={this.props.url}
            playing={this.state.played}
            controls
            onEnded={() => this.onEnded()}
            onPlay={() => {
              this.onPlay();
            }}
          />
        </div>
        {!this.state.played && (
          <div
            className={overlayClass}
            onClick={() => {
              this.setState({ played: !this.state.played });
            }}
          >
            <div className={styles.video}>
              <Image image={this.props.image} color="transparent" />
            </div>
            <div className={styles.logoHolder}>
              <div className={styles.logo}>
                <Logo image={this.props.logo} />
              </div>
            </div>
            <div className={styles.play} />
            <div className={styles.description}>{this.props.description}</div>
          </div>
        )}
      </div>
    );
  }
}
ProductVideo.propTypes = {
  url: PropTypes.string,
  logo: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string
};
