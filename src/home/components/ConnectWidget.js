import React from "react";
import styles from "./ConnectWidget.css";
import Icon from "../../xelpmoc-core/Icon";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import ConnectKnowMore from "./ConnectKnowMore";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import ConnectBaseWidget from "./ConnectBaseWidget";
import CommonCenter from "../../general/components/CommonCenter.js";
import { WEB_URL_REG_EX } from "../../lib/constants";

export default class ConnectWidget extends React.Component {
  handleClick(webURL) {
    if (webURL) {
      // Check if URL starts https://www.tatacliq.com or https://tatacliq.com
      const isMatch = WEB_URL_REG_EX.test(webURL);
      if (webURL.includes("/que") || !isMatch) {
        window.open(webURL, "_blank");
        window.focus();
      } else {
        const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1").trim();
        this.props.history.push(urlSuffix);
        if (this.props.setClickedElementId) {
          this.props.setClickedElementId();
        }
      }
    }
  }

  render() {
    let className = styles.base;
    if (this.props.feedComponentData["sub-type"] === "bannerInCard") {
      className = styles.inCard;
    }

    return (
      <div
        className={
          this.props.positionInFeed === 1
            ? styles.firstPositionHolder
            : styles.holder
        }
        onClick={() => {
          this.handleClick(this.props.feedComponentData.webURL);
        }}
        style={{
          backgroundImage: `linear-gradient(165deg, ${this.props.feedComponentData.startHexCode} ,${this.props.feedComponentData.endHexCode})`
        }}
      >
        <MediaQuery query="(min-device-width: 1025px)">
          <CommonCenter>
            <ConnectBaseWidget
              {...this.props.feedComponentData}
              heading={this.props.feedComponentData.title}
            />
          </CommonCenter>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1024px)">
          <div className={className}>
            <div
              className={styles.buffer}
              style={{
                backgroundImage: `url(${this.props.feedComponentData.backgroundImageURL}`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundPosition: "center"
              }}
            >
              <div className={styles.content}>
                {this.props.feedComponentData.iconImageURL && (
                  <div className={styles.icon}>
                    <Icon
                      image={this.props.feedComponentData.iconImageURL}
                      size={40}
                    />
                  </div>
                )}
                <div className={styles.dataHolder}>
                  <div className={styles.connectBox}>
                    {this.props.feedComponentData.title}
                  </div>
                  <div className={styles.label}>
                    {this.props.feedComponentData.description}
                  </div>
                  {this.props.feedComponentData.btnText && (
                    <div className={styles.buttonBox}>
                      <ConnectKnowMore
                        url={this.props.feedComponentData.webURL}
                        btnText={this.props.feedComponentData.btnText}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }
}
ConnectWidget.propTypes = {
  knowMore: PropTypes.string,
  onClick: PropTypes.func
};
ConnectWidget.defaultProps = {
  header: "Faster Delivery, Easier Returns.",
  text: "Introducing Connect Service"
};
