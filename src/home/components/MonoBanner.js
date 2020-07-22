import React from "react";
import styles from "./MonoBanner.css";
import ShopCollection from "../../pdp/components/ShopCollection";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import MobileOnly from "../../general/components/MobileOnly";
import { WEB_URL_REG_EX } from "../../lib/constants";

export default class MonoBanner extends React.Component {
  handleClick() {
    if (
      this.props.feedComponentData.items &&
      this.props.feedComponentData.items[0] &&
      this.props.feedComponentData.items[0].webURL
    ) {
      const webURL = this.props.feedComponentData.items[0].webURL;
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

  render() {
    let feedComponentData = this.props.feedComponentData;
    return (
      <MobileOnly>
        <div
          className={
            this.props.positionInFeed === 1 ? styles.firstItemBase : styles.base
          }
        >
          <div className={styles.shopeRangeHeader}>
            {feedComponentData.title}
          </div>
          <ShopCollection
            image={feedComponentData.items[0].imageURL}
            title={feedComponentData.items[0].title}
            btnText={feedComponentData.items[0].btnText}
            backgroundColor={feedComponentData.items[0].backgroundColor}
            onClick={() => this.handleClick()}
          />
        </div>
      </MobileOnly>
    );
  }
}
