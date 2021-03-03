import React from "react";
import styles from "./TopSellingBrandSlider.css";
import Carousel from "../../general/components/Carousel";
import CommonCenter from "../../general/components/CommonCenter";
import TopSellingBrandComponent from "../../general/components/TopSellingBrandComponent";
import { HOME_ROUTER, WEB_URL_REG_EX } from "../../lib/constants";
import { getOnlineSalesAds, TATA_CLIQ_ROOT } from "../../lib/apiRequest";

const TOP_SELLING_BRAND_COMPONENT_MONETIZATION =
  "DesktopTopSellingBrandsComponent_Monetization";

export default class TopSellingBrandsMonetization extends React.Component {
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
      TOP_SELLING_BRAND_COMPONENT_MONETIZATION,
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

  handleClickOnLink = (event, webURL) => {
    event.preventDefault();
    if (webURL) {
      // Check if URL starts https://www.tatacliq.com or https://tatacliq.com
      const isMatch = WEB_URL_REG_EX.test(webURL);
      if (webURL.includes("/que") || !isMatch) {
        window.open(webURL, "_blank");
        window.focus();
      } else {
        const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1").trim();
        this.props.history.push(urlSuffix);
      }
    }
  };

  render() {
    let { bannerComponent } = this.state;
    return (
      <CommonCenter>
        <div className={styles.base}>
          <Carousel header={bannerComponent.headline} elementWidthDesktop={25}>
            {bannerComponent.ads &&
              bannerComponent.ads.map((datum, i) => {
                const { elements } = datum;
                return (
                  <a
                    href={datum.click_tracking_url}
                    target="_blank"
                    rel="noreferrer"
                    key={i}
                    onClick={event =>
                      this.handleClickOnLink(event, datum.click_tracking_url)
                    }
                  >
                    <TopSellingBrandComponent
                      imageURL={elements.image}
                      webURL={datum.click_tracking_url}
                      logoImageURL={elements.brandLogo}
                      history={this.props.history}
                      setClickedElementId={this.props.setClickedElementId}
                    />
                  </a>
                );
              })}
          </Carousel>
        </div>
      </CommonCenter>
    );
  }
}
