import React from "react";
import styles from "./ConnectWidget.css";
import Icon from "../../xelpmoc-core/Icon";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import ConnectKnowMore from "./ConnectKnowMore";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import ConnectBaseWidget from "./ConnectBaseWidget";
import CommonCenter from "../../general/components/CommonCenter.js";
import { getLoggedInUserDetails } from "../../common/services/common.services";
import {
  WEB_URL_REG_EX,
  SBA_VENDOR_URL,
  APP_ID_FOR_SBA,
  PRIVATE_KEY_FOR_AES
} from "../../lib/constants";
const crypto = require("crypto");

export default class ConnectWidget extends React.Component {
  getEncryptedValue(userType) {
    //AES 256 encryption
    const secretKeyinBase64 = Buffer.from(PRIVATE_KEY_FOR_AES).toString(
      "base64"
    );
    const binaryEncryptionKey = Buffer.from(secretKeyinBase64, "base64");
    const binaryIV = Buffer.from([]);
    const cipher = crypto.createCipheriv(
      "AES-256-ECB",
      binaryEncryptionKey,
      binaryIV
    );

    let levelOneEncryption = cipher.update(userType, "utf8", "base64");
    levelOneEncryption += cipher.final("base64");

    //base64 encryption
    const levelTwoEncryption = Buffer.from(levelOneEncryption).toString(
      "base64"
    );

    return levelTwoEncryption;
  }

  handleClick(webUrl) {
    if (
      (webUrl === "#" || !webUrl) &&
      this.props.history.location &&
      this.props.history.location.pathname &&
      this.props.history.location.pathname.includes("/cliq-book")
    ) {
      const loggedInUserDetails = getLoggedInUserDetails(),
        userType = loggedInUserDetails
          ? loggedInUserDetails.customerId
          : "anonlogin";

      const encryptedUserType = this.getEncryptedValue(userType);
      const sbaUrlPath = `${SBA_VENDOR_URL}/login/${APP_ID_FOR_SBA}/${encryptedUserType}/mp/default`;

      window.open(sbaUrlPath, "_blank");
      window.focus();
    } else if (webUrl) {
      // Check if URL starts https://www.tatacliq.com or https://tatacliq.com
      const isMatch = WEB_URL_REG_EX.test(webUrl);
      const urlPath = new URL(webUrl).pathname;
      if (urlPath.indexOf("/que") > -1 || !isMatch) {
        window.open(webUrl, "_blank");
        window.focus();
      } else {
        const urlSuffix = webUrl.replace(TATA_CLIQ_ROOT, "$1").trim();
        this.props.history.push(urlSuffix);
      }
    }
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  }

  render() {
    let className = styles.base;
    if (this.props.feedComponentData["sub-type"] === "bannerInCard") {
      className = styles.inCard;
    }

    return (
      <div
        data-test="connect-to-widget-test"
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
  onClick: PropTypes.func,
  feedComponentData: PropTypes.object,
  getTargetMboxData: PropTypes.func,
  history: PropTypes.object,
  setClickedElementId: PropTypes.func,
  positionInFeed: PropTypes.bool
};
ConnectWidget.defaultProps = {
  header: "Faster Delivery, Easier Returns.",
  text: "Introducing Connect Service"
};
