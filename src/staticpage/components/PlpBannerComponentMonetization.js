import React from "react";
import styles from "./PlpBannerComponentMonetization.css";
import PropTypes from "prop-types";
import ImageFlexible from "../../general/components/ImageFlexible";
import { TATA_CLIQ_ROOT, getOnlineSalesAds } from "../../lib/apiRequest.js";
import { WEB_URL_REG_EX, HOME_ROUTER } from "../../lib/constants";

const PLP_BANNER_COMPONENT_MONETIZATION = "PlpBannerComponent_Monetization";

export default class PlpBannerComponentMonetization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerLoading: false,
      plpBanner: null
    };
  }

  async componentDidMount() {
    const url = this.props.location.pathname;
    let pageType = "CATEGORY";
    this.setState({ bannerLoading: true });

    if (url === HOME_ROUTER) {
      pageType = "HOME";
    }
    let plpBanner = await getOnlineSalesAds(
      PLP_BANNER_COMPONENT_MONETIZATION,
      pageType
    );
    if (plpBanner) {
      this.setState({ plpBanner, bannerLoading: false });
      if (
        window._osAdImpression &&
        plpBanner.ads &&
        plpBanner.ads[0] &&
        plpBanner.ads[0].uclid
      ) {
        window._osAdImpression({ uclid: plpBanner.ads[0].uclid });
      }
    }
  }

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
    const { firstBanner } = this.props;
    const { plpBanner } = this.state;
    if (plpBanner && plpBanner.ads) {
      plpBanner.ads.map &&
        plpBanner.ads.map((datum, i) => {
          const { elements } = datum;
          let baseClass = datum.click_tracking_url
            ? styles.baseWithCursor
            : styles.base;
          if (!firstBanner) {
            baseClass = datum.click_tracking_url
              ? styles.bannerInMiddleWithCursor
              : styles.bannerInMiddle;
          }
          return (
            <div
            key={i}
              className={baseClass}
              onClick={event =>
                this.handleClick(event, datum.click_tracking_url)
              }
            >
              <ImageFlexible image={elements.image} />
            </div>
          );
        });
    } else {
      return null;
    }
  }
}

PlpBannerComponentMonetization.propTypes = {
  firstBanner: PropTypes.bool,
  location: PropTypes.object,
  pathname: PropTypes.string,
  history: PropTypes.object,
};
