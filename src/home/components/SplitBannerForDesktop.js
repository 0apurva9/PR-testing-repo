import React from "react";
import styles from "./SplitBannerForDesktop.css";
import SplitBanner from "./SplitBanner";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";

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
    let feedComponentData = this.props.items;
    return (
      <div
        className={
          this.props.positionInFeed === 1 ? styles.firstItemBase : styles.base
        }
      >
        <div className={styles.shopeRangeHeader}>{this.props.title}</div>

        {feedComponentData &&
          feedComponentData.map((datum, i) => {
            return (
              <div className={styles.splitBannerHolder}>
                <SplitBanner
                  logo={datum.logo}
                  image={datum.imageURL}
                  subTitle={datum.subTitle}
                  title={datum.title}
                  btnText={datum.btnText}
                  onClick={() => this.handleClick(datum.webURL)}
                />
              </div>
            );
          })}
      </div>
    );
  }
}
