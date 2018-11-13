import React from "react";
import styles from "./DesktopFooter.css";
import { withRouter } from "react-router-dom";
import Button from "../../general/components/Button.js";
import Input2 from "../../general/components/Input2.js";
import Icon from "../../xelpmoc-core/Icon";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import companyLogo from "../../general/components/img/companylogo.svg";
import TrustComponent from "../../general/components/TrustComponent";
import {
  setDataLayerForHeaderAndFooterDirectCalls,
  ADOBE_DIRECT_CALL_FOR_FOOTER_CLICK,
  ADOBE_DIRECT_CALL_FOR_SOCIALMEDIA_CLICK,
  ADOBE_DIRECT_CALL_FOR_FOOTER_SUBSCRIBE
} from "../../lib/adobeUtils";
const TEXT = "© 2017 Tata CLiQ | All rights reserved";
class DesktopFooter extends React.Component {
  componentDidMount() {
    if (this.props.getDesktopFooter) {
      this.props.getDesktopFooter();
    }
  }
  onClick = (url, value) => {
    setDataLayerForHeaderAndFooterDirectCalls(
      ADOBE_DIRECT_CALL_FOR_FOOTER_CLICK,
      value
    );
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };
  onClickSocialMedia = webUrl => {
    let currentSocialMedia;
    if (webUrl.indexOf("facebook") !== -1) {
      currentSocialMedia = "facebook";
    }
    if (webUrl.indexOf("plus") !== -1) {
      currentSocialMedia = "googlePlus";
    }
    if (webUrl.indexOf("twitter") !== -1) {
      currentSocialMedia = "twitter";
    }
    if (webUrl.indexOf("youtube") !== -1) {
      currentSocialMedia = "youtube";
    }
    if (webUrl.indexOf("instagram") !== -1) {
      currentSocialMedia = "instagram";
    }
    setDataLayerForHeaderAndFooterDirectCalls(
      ADOBE_DIRECT_CALL_FOR_SOCIALMEDIA_CLICK,
      currentSocialMedia
    );
  };
  render() {
    let footerData = this.props && this.props.DesktopFooterDetails;
    return (
      <div className={styles.contentHolder}>
        <TrustComponent />
        <div className={styles.linkAndSuscribeHolder}>
          <div className={styles.linkHolder}>
            {footerData &&
              footerData.items &&
              footerData.items[0] &&
              footerData.items[0].pageLinks &&
              footerData.items[0].pageLinks.map((val, i) => {
                return (
                  <div className={styles.linkSection}>
                    <div className={styles.linkHeader}>
                      {val && val.heading}
                    </div>
                    {val &&
                      val.list.map((data, i) => {
                        return (
                          <div
                            className={styles.link}
                            onClick={() => this.onClick(data.webUrl, data.text)}
                          >
                            {data.text}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
          <div className={styles.newsLetterSection}>
            {footerData &&
              footerData.items &&
              footerData.items[0] &&
              footerData.items[0].newsLetter &&
              footerData.items[0].newsLetter.heading && (
                <div className={styles.newsLetterHeading}>
                  {footerData.items[0].newsLetter.heading}
                </div>
              )}

            <div className={styles.buttonAndTextBoxHolder}>
              {footerData &&
                footerData.items &&
                footerData.items[0] &&
                footerData.items[0].newsLetter &&
                footerData.items[0].newsLetter.placeholderText && (
                  <div className={styles.textBoxHolder}>
                    <Input2
                      boxy={true}
                      placeholder={
                        footerData.items[0].newsLetter.placeholderText
                      }
                      textStyle={{ fontSize: 14 }}
                      height={33}
                      type="text"
                    />
                  </div>
                )}
              <div className={styles.buttonHolder}>
                {footerData &&
                  footerData.items &&
                  footerData.items[0] &&
                  footerData.items[0].newsLetter &&
                  footerData.items[0].newsLetter.btnText && (
                    <div className={styles.button}>
                      <Button
                        type="hollow"
                        label={footerData.items[0].newsLetter.btnText}
                        height={36}
                        width={180}
                        textStyle={{ color: "#212121", fontSize: 14 }}
                        onClick={() => this.onSuscribe()}
                      />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerBottomHolder}>
          <div className={styles.socialLinkAndLogoHolder}>
            <div className={styles.companyLogo}>
              <Icon image={companyLogo} size={80} />
            </div>
            <div className={styles.socialIconHolder}>
              {footerData &&
                footerData.items &&
                footerData.items[0] &&
                footerData.items[0].socialLinks &&
                footerData.items[0].socialLinks[0] &&
                footerData.items[0].socialLinks[0].list.map((val, i) => {
                  return (
                    <a href={val.webUrl} target="_blank">
                      <div
                        className={styles.socialIcon}
                        onClick={() => this.onClickSocialMedia(val.webUrl)}
                      >
                        <Icon image={val.imageURL} size={20} />
                      </div>
                    </a>
                  );
                })}
            </div>
            <div className={styles.copyRightText}>{TEXT}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DesktopFooter);
