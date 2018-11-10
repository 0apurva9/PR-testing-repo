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
            feedComponentData.items[0] && (
              <div
                className={styles.splitBannerHolder}
                onClick={() =>
                  this.handleClick(feedComponentData.items[0].webURL)
                }
              >
                <SplitBanner
                  logo={feedComponentData.items[0].brandLogo}
                  image={feedComponentData.items[0].imageURL}
                  subTitle={feedComponentData.items[0].description}
                  title={feedComponentData.items[0].title}
                  btnText={feedComponentData.items[0].btnText}
                  onClick={() =>
                    this.handleClick(feedComponentData.items[0].webURL)
                  }
                />
              </div>
            )}
          {feedComponentData.items &&
            feedComponentData.items[1] && (
              <div
                className={styles.splitBannerHolder}
                onClick={() =>
                  this.handleClick(feedComponentData.items[1].webURL)
                }
              >
                <SplitBanner
                  logo={feedComponentData.items[1].brandLogo}
                  image={feedComponentData.items[1].imageURL}
                  subTitle={feedComponentData.items[1].description}
                  title={feedComponentData.items[1].title}
                  btnText={feedComponentData.items[1].btnText}
                  onClick={() =>
                    this.handleClick(feedComponentData.items[1].webURL)
                  }
                />
              </div>
            )}
        </div>
      </CommonCenter>
    );
  }
}
