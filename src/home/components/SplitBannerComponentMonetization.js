import React from "react";
import SplitBanner from "./SplitBanner";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import CommonCenter from "../../general/components/CommonCenter";
import { WEB_URL_REG_EX, HOME_ROUTER } from "../../lib/constants";
import styles from "./SplitBannerForDesktop.css";
import { getOnlineSalesAds } from "../../lib/apiRequest";

const SPLIT_BANNER_COMPONENT_MONETIZATION = "SplitBannerComponent_Monetization";

export default class SplitBannerComponentMonetization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerLoading: false,
      bannerComponent: null
    };
  }

  async componentDidMount() {
    const url = this.props.location.pathname;
    let pageType = "CATEGORY";
    this.setState({ bannerLoading: true });

    if (url === HOME_ROUTER) {
      pageType = "HOME";
    }
    let bannerComponent = await getOnlineSalesAds(
      SPLIT_BANNER_COMPONENT_MONETIZATION,
      pageType
    );
    if (bannerComponent) {
      this.setState({ bannerComponent, bannerLoading: false });
      if (
        window._osAdImpression &&
        bannerComponent.ads &&
        bannerComponent.ads[0] &&
        bannerComponent.ads[0].uclid
      ) {
        window._osAdImpression({ uclid: bannerComponent.ads[0].uclid });
      }
    }
  }
  handleClick(webURL) {
    if (webURL) {
      // Check if URL starts https://www.tatacliq.com or https://tatacliq.com
      const isMatch = WEB_URL_REG_EX.test(webURL);

      if (webURL.includes("/que") || !isMatch) {
        window.open(webURL, "_blank");
        window.focus();
      } else {
        const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
        this.props.history.push(urlSuffix);
      }
    }
  }
  renderCard = feedComponentDatum => {
    const { elements } = feedComponentDatum;
    return (
      <div
        className={styles.splitBannerHolder}
        onClick={() => this.handleClick(feedComponentDatum.click_tracking_url)}
      >
        <SplitBanner
          logo={elements.brandLogo}
          image={elements.image}
          subTitle={elements.Description}
          title={elements.headline}
          btnText={elements.CTA}
        />
      </div>
    );
  };

  render() {
    let { bannerComponent } = this.state;

    return (
      <CommonCenter>
        <div
          className={
            this.props.positionInFeed === 1 ? styles.firstItemBase : styles.base
          }
        >
          {bannerComponent && bannerComponent.title && (
            <div className={styles.shopeRangeHeader}>
              {bannerComponent.title}
            </div>
          )}
          {bannerComponent && bannerComponent.ads && (
            <div className={styles.splitColumn}>
              {bannerComponent.ads
                .filter((val, i) => {
                  return i % 2 === 0 && i < 4;
                })
                .map(feedComponentDatum => {
                  return this.renderCard(feedComponentDatum);
                })}
            </div>
          )}
          <div className={styles.splitColumn}>
            {bannerComponent.ads
              .filter((val, i) => {
                return i % 2 !== 0 && i < 4;
              })
              .map(feedComponentDatum => {
                return this.renderCard(feedComponentDatum);
              })}
          </div>
        </div>
      </CommonCenter>
    );
  }
}
