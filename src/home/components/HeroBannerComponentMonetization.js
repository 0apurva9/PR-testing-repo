import React from "react";
import BannerImage from "../../general/components/BannerImage";
import Banner from "../../general/components/Banner";
import PropTypes from "prop-types";
import HomeSkeleton from "../../general/components/HomeSkeleton.js";
import styles from "./HeroBannerComponentMonetization.css";
import { getOnlineSalesAds } from "../../lib/apiRequest";

import { HOME_ROUTER } from "../../lib/constants";

const HERO_BANNER_COMPONENT_MONETIZATION = "HeroBannerComponent_Monetization";

export default class HeroBannerComponentMonetization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerLoading: false,
      heroBanner: null
    };
  }
  async componentDidMount() {
    const url = this.props.location.pathname;
    let pageType = "CATEGORY";
    this.setState({ bannerLoading: true });

    if (url === HOME_ROUTER) {
      pageType = "HOME";
    }

    let heroBanner = await getOnlineSalesAds(
      HERO_BANNER_COMPONENT_MONETIZATION,
      pageType
    );
    if (heroBanner) {
      this.setState({ bannerLoading: false });
      if (
        window._osAdImpression &&
        heroBanner.ads &&
        heroBanner.ads[0] &&
        heroBanner.ads[0].uclid
      ) {
        window._osAdImpression({ uclid: heroBanner.ads[0].uclid });
      }
      this.setState({ heroBanner });
    }
  }
  renderBanner = () => {
    const { heroBanner } = this.state;
    if (heroBanner.ads && heroBanner.ads.length > 1) {
      return (
        <Banner {...heroBanner}>
          {heroBanner.ads &&
            heroBanner.ads.map &&
            heroBanner.ads.map((datum, i) => {
              const { elements } = datum;
              return (
                <BannerImage
                  logo={elements.brandLogo}
                  title={elements.headline}
                  // ratio={feedComponentData.dimension}
                  subTitle={elements.Description}
                  buttonLabel={elements.CTA}
                  image={elements.image}
                  key={i}
                  url={datum.click_tracking_url}
                />
              );
            })}
        </Banner>
      );
    } else {
      return (
        <div className={styles.monoBanner}>
          {heroBanner.ads &&
            heroBanner.ads.map &&
            heroBanner.ads.map((datum, i) => {
              const { elements } = datum;
              return (
                <BannerImage
                  logo={elements.brandLogo}
                  title={elements.headline}
                  image={elements.image}
                  subTitle={elements.Description}
                  buttonLabel={elements.CTA}
                  // ratio={feedComponentData.dimension}
                  key={i}
                  url={datum.click_tracking_url}
                />
              );
            })}
        </div>
      );
    }
  };
  render() {
    if (this.state.bannerLoading) {
      return <HomeSkeleton />;
    }
    if (this.state.heroBanner) {
      return (
        <div
          className={
            this.props.positionInFeed === 0
              ? styles.base
              : styles.marginTopWithBase
          }
        >
          {this.renderBanner()}
        </div>
      );
    } else {
      return null;
    }
  }
}
