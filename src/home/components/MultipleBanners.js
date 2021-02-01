import React from "react";
import Grid from "../../general/components/Grid";
import SmallBanner from "./SmallBanner";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { WEB_URL_REG_EX } from "../../lib/constants";
import styles from "./MultipleBanners.css";

export default class MultipleBanner extends React.Component {
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
        <div className={styles.heading}>{data.title}</div>
        <Grid elementWidthMobile={33.33}>
          {data &&
            data.items &&
            data.items.map((val, i) => {
              return (
                <SmallBanner
                  key={i}
                  image={val.imageURL}
                  title={val.title}
                  description={val.description}
                  onClick={() => this.handleClick(val.webURL)}
                />
              );
            })}
        </Grid>
      </div>
    );
  }
}
