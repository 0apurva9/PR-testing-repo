import React from "react";
import SplitBanner from "./SplitBanner";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import CommonCenter from "../../general/components/CommonCenter";
import styles from "./SplitBannerForDesktop.css";
export default class SplitBannerForDesktop extends React.Component {
  handleClick(webURL) {
    if (webURL) {
      const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
      if (webURL.includes("/que")) {
        window.open(urlSuffix, "_blank");
        window.focus();
      }
      if (webURL.includes("/luxury.tatacliq.com")) {
        window.open(webURL, "_blank");
        window.focus();
      } else {
        this.props.history.push(urlSuffix);
        if (this.props.setClickedElementId) {
          this.props.setClickedElementId();
        }
      }
    }
  }

  render() {
    let { feedComponentData } = this.props;
    return (
      <CommonCenter>
        <div
          className={
            this.props.positionInFeed === 1 ? styles.firstItemBase : styles.base
          }
        >
          {feedComponentData &&
            feedComponentData.title && (
              <div className={styles.shopeRangeHeader}>
                {feedComponentData.title}
              </div>
            )}
          {feedComponentData.items &&
            feedComponentData.items.map((datum, i) => {
              return (
                <div
                  className={styles.splitBannerHolder}
                  onClick={() => this.handleClick(datum.webURL)}
                >
                  <SplitBanner
                    logo={datum.brandLogo}
                    image={datum.imageURL}
                    subTitle={datum.description}
                    title={datum.title}
                    btnText={datum.btnText}
                    onClick={() => this.handleClick(datum.webURL)}
                  />
                </div>
              );
            })}
        </div>
      </CommonCenter>
    );
  }
}
