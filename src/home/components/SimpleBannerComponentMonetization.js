import React from "react";
import styles from "./SimpleBannerComponentMonetization.css";
import PropTypes from "prop-types";
import Image from "../../xelpmoc-core/Image";
import { HOME_ROUTER, WEB_URL_REG_EX } from "../../lib/constants";
import { TATA_CLIQ_ROOT, getOnlineSalesAds } from "../../lib/apiRequest.js";

const SIMPLE_BANNER_COMPONENT_MONETIZATION =
  "SimpleBannerComponent_Monetization";

export default class SimpleBannerComponentMonetization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerLoading: false,
      simpleBanner: null
    };
  }
  async componentDidMount() {
    const url = this.props.location.pathname;
    let pageType = "CATEGORY";
    this.setState({ bannerLoading: true });

    if (url === HOME_ROUTER) {
      pageType = "HOME";
    }
    let simpleBanner = await getOnlineSalesAds(
      SIMPLE_BANNER_COMPONENT_MONETIZATION,
      pageType
    );
    if (simpleBanner) {
      this.setState({ simpleBanner, bannerLoading: false });
      if (
        window._osAdImpression &&
        simpleBanner.ads &&
        simpleBanner.ads[0] &&
        simpleBanner.ads[0].uclid
      ) {
        window._osAdImpression({ uclid: simpleBanner.ads[0].uclid });
      }
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
        let baseClass = datum.click_tracking_url
          ? styles.baseWithCursor
          : styles.base;
        let basClassMargin = datum.click_tracking_url
          ? styles.marginTopWithBaseCursor
          : styles.marginTopWithBase;
        return (
          <div
            className={
              this.props.positionInFeed === 0 ? baseClass : basClassMargin
            }
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
