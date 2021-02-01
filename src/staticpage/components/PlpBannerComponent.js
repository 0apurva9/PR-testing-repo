import React from "react";
import styles from "./PlpBannerComponent.css";
import PropTypes from "prop-types";
import ImageFlexible from "../../general/components/ImageFlexible";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { WEB_URL_REG_EX } from "../../lib/constants";

export default class PlpBannerComponent extends React.Component {
  handleClick(event, urlLink) {
    event.preventDefault();
    if (urlLink) {
      const isMatch = WEB_URL_REG_EX.test(urlLink);
      const urlPath = new URL(urlLink).pathname;

      if (urlPath.indexOf("/que") > -1 || !isMatch) {
        window.open(urlLink, "_blank");
        window.focus();
      } else {
        const urlSuffix = urlLink.replace(TATA_CLIQ_ROOT, "$1");
        this.props.history.push(urlSuffix);
      }
    }
  }

  render() {
    const { feedComponentData, firstBanner } = this.props;

    if (feedComponentData && feedComponentData.items) {
      return feedComponentData.items.map((data, i) => {
        let baseClass = data.webURL ? styles.baseWithCursor : styles.base;
        if (!firstBanner) {
          baseClass = data.webURL
            ? styles.bannerInMiddleWithCursor
            : styles.bannerInMiddle;
        }
        return (
          <div
          key={i}
            className={baseClass}
            onClick={event => this.handleClick(event, data.webURL)}
          >
            <ImageFlexible image={data.imageURL} />
          </div>
        );
      });
    } else {
      return null;
    }
  }
}

PlpBannerComponent.propTypes = {
  feedComponentData: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        imageURL: PropTypes.string,
        webURL: PropTypes.string
      })
    )
  }),
  firstBanner: PropTypes.bool,
  history: PropTypes.object,

};
