import React from "react";
import styles from "./TopSellingBrandSlider.css";
import PropTypes from "prop-types";
import Carousel from "../../general/components/Carousel";
import CommonCenter from "../../general/components/CommonCenter";
import TopSellingBrandComponent from "../../general/components/TopSellingBrandComponent";
import { HOME_ROUTER } from "../../lib/constants";
import { getOnlineSalesAds } from "../../lib/apiRequest";

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
    }
  }
  handleClickOnLink = event => {
    event.preventDefault();
  };
  render() {
    let { bannerComponent } = this.state;
    return (
      <CommonCenter>
        <div className={styles.base}>
          <Carousel header={bannerComponent.headline} elementWidthDesktop={25}>
            {bannerComponent.ads &&
              bannerComponent.ads.map((datum, i) => {
                return (
                  <a
                    href={datum.destination_url}
                    target="_blank"
                    onClick={event => this.handleClickOnLink(event)}
                  >
                    <TopSellingBrandComponent
                      imageURL={datum.image}
                      webURL={datum.destination_url}
                      logoImageURL={datum.brandLogo}
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
