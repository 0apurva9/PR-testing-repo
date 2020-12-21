import React from "react";
import SplitBanner from "./SplitBanner";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import CommonCenter from "../../general/components/CommonCenter";
import { WEB_URL_REG_EX } from "../../lib/constants";
import styles from "./SplitBannerForDesktop.css";
export default class SplitBannerForDesktop extends React.Component {
  handleClick(webURL) {
    if (webURL) {
      // Check if URL starts https://www.tatacliq.com or https://tatacliq.com
      const isMatch = WEB_URL_REG_EX.test(webURL);

      if (webURL.includes("/que") || !isMatch) {
        window.open(webURL, "_blank");
        window.focus();
      } else {
        const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
        this.props.history.push(urlSuffix);
        if (this.props.setClickedElementId) {
          this.props.setClickedElementId();
        }
      }
    }
  }
  renderCard = feedComponentDatum => {
    return (
      <div
        className={styles.splitBannerHolder}
        onClick={() => this.handleClick(feedComponentDatum.webURL)}
      >
        <SplitBanner
          logo={feedComponentDatum.brandLogo}
          image={feedComponentDatum.imageURL}
          subTitle={feedComponentDatum.description}
          title={feedComponentDatum.title}
          btnText={feedComponentDatum.btnText}
        />
      </div>
    );
  };

  render() {
    let { feedComponentData } = this.props;

    return (
      <CommonCenter>
        <div
          className={
            this.props.positionInFeed === 1 ? styles.firstItemBase : styles.base
          }
        >
          {feedComponentData && feedComponentData.title && (
            <div className={styles.shopeRangeHeader}>
              {feedComponentData.title}
            </div>
          )}
          {feedComponentData && feedComponentData.items && (
            <div className={styles.splitColumn}>
              {feedComponentData.items
                .filter((val, i) => {
                  return i % 2 === 0 && i < 4;
                })
                .map(feedComponentDatum => {
                  return this.renderCard(feedComponentDatum);
                })}
            </div>
          )}
          <div className={styles.splitColumn}>
            {feedComponentData.items
              .filter((val, i) => {
                return i % 2 !== 0 && i < 4;
              })
              .map(feedComponentDatum => {
                return this.renderCard(feedComponentDatum);
              })}
          </div>
        </div>
      </CommonCenter>
    );
  }
}
