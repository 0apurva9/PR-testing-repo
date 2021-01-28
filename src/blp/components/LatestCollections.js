import React from "react";
import styles from "./LatestCollections.css";
import Icon from "../../xelpmoc-core/Icon";
import iconImageURL from "../../general/components/img/whiteArrow.svg";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { WEB_URL_REG_EX } from "../../lib/constants";

export default class LatestCollections extends React.Component {
  arrowNextClick() {
    const webURL = this.props.feedComponentData.webURL;
    if (webURL) {
      // Check if URL starts https://www.tatacliq.com or https://tatacliq.com
      const isMatch = WEB_URL_REG_EX.test(webURL);
      const urlPath = new URL(webURL).pathname;

      if (urlPath.indexOf("/que") > -1 || !isMatch) {
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
    let feedComponentData = this.props.feedComponentData;

    return (
      <div
        className={
          this.props.positionInFeed === 1 ? styles.firstItemBase : styles.base
        }
        style={{ backgroundColor: feedComponentData.startHexCode }}
      >
        <div
          className={styles.LatestCollectionsHolder}
          onClick={() => this.arrowNextClick()}
        >
          <div className={styles.textHolder}>
            {feedComponentData && feedComponentData.title}
          </div>
          <div className={styles.iconHolder}>
            <div className={styles.icon}>
              <Icon image={iconImageURL} size={25} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
