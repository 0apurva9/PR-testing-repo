import React from "react";
import AutoImageBanner from "./AutoImageBanner";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { WEB_URL_REG_EX } from "../../lib/constants";
import styles from "./BankOfferBanner.css";

export default class BankOfferBanner extends React.Component {
  handleClick(webUrl) {
    if (webUrl) {
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
    const data = this.props.feedComponentData;
    return (
      <div className={styles.base}>
        {data &&
          data.items &&
          data.items.map((val, i) => {
            return (
              <AutoImageBanner
                key={i}
                lazyLoad={true}
                image={val.imageURL}
                onClick={() => this.handleClick(val.webURL)}
              />
            );
          })}
      </div>
    );
  }
}
