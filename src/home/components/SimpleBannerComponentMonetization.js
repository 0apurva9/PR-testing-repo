import React from "react";
import styles from "../../staticpage/components/SimpleBannerComponent.css";
import PropTypes from "prop-types";
import Image from "../../xelpmoc-core/Image";
import { HOME_ROUTER, WEB_URL_REG_EX } from "../../lib/constants";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";

export default class SimpleBannerComponentMonetization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerLoading: false,
      simpleBanner: null
    };
  }
  componentDidMount() {
    if (window._osFetchBrandAds) {
      const url = this.props.location.pathname;
      let pageType = "CATEGORY";
      this.setState({ bannerLoading: true });

      if (url === HOME_ROUTER) {
        pageType = "HOME";
      }

      window
        ._osFetchBrandAds({
          au: "SimpleBannerComponent_Monetization",
          pt: pageType
        })
        .then(response => {
          this.setState({ simpleBanner: response, bannerLoading: false });
        })
        .catch(err => {
          this.setState({ bannerLoading: false });
          console.error(err);
        });
    }
  }
  handleClick(urlLink) {
    if (urlLink) {
      const isMatch = WEB_URL_REG_EX.test(urlLink);
      if (!isMatch) {
        window.open(urlLink, "_blank");
        window.focus();
      } else {
        const urlSuffix = urlLink.replace(TATA_CLIQ_ROOT, "$1");
        this.props.history.push(urlSuffix);
      }
    }
  }
  render() {
    const { simpleBanner } = this.state;
    if (simpleBanner && simpleBanner.ads) {
      return simpleBanner.ads.map((datum, i) => {
        const { elements } = datum;
        return (
          <div
            className={styles.base}
            onClick={() => this.handleClick(datum.click_tracking_url)}
          >
            <div className={styles.imageHolder}>
              <Image image={elements.image} fit="cover" />
              {elements.headline && (
                <div className={styles.displayTitle}>{elements.headline}</div>
              )}
            </div>
          </div>
        );
      });
    } else {
      return null;
    }
  }
}
