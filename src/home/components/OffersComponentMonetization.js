import React from "react";
import styles from "./OfferWidget.css";
import Carousel from "../../general/components/Carousel";
import CommonCenter from "../../general/components/CommonCenter";
import PropTypes from "prop-types";
import OfferCard from "./OfferCard.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { WEB_URL_REG_EX, HOME_ROUTER } from "../../lib/constants";
import { getOnlineSalesAds } from "../../lib/apiRequest";

const OFFERS_COMPONENT_MONETIZATION = "OffersComponent_Monetization";

export default class OffersComponentMonetization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerLoading: false,
      offersComponent: null
    };
  }
  async componentDidMount() {
    const url = this.props.location.pathname;
    let pageType = "CATEGORY";
    this.setState({ bannerLoading: true });

    if (url === HOME_ROUTER) {
      pageType = "HOME";
    }
    let offersComponent = await getOnlineSalesAds(
      OFFERS_COMPONENT_MONETIZATION,
      pageType
    );
    if (offersComponent) {
      this.setState({ offersComponent, bannerLoading: false });
      if (
        window._osAdImpression &&
        offersComponent.ads &&
        offersComponent.ads[0] &&
        offersComponent.ads[0].uclid
      ) {
        window._osAdImpression({ uclid: offersComponent.ads[0].uclid });
      }
    }
  }
  handleClick = webUrl => {
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
  };
  render() {
    let { offersComponent } = this.state;
    const data =
      offersComponent && offersComponent.ads ? offersComponent.ads : false;
    if (!data) {
      return null;
    }
    return (
      <CommonCenter>
        <div
          className={
            this.props.positionInFeed === 1
              ? styles.firstItemHolder
              : styles.holder
          }
        >
          <Carousel
            elementWidthMobile={90}
            elementWidthDesktop={33.33}
            header={offersComponent.title}
          >
            {data &&
              data.map((datum, i) => {
                return (
                  <OfferCard onClick={this.handleClick} key={i} datum={datum} />
                );
              })}
          </Carousel>
        </div>
      </CommonCenter>
    );
  }
}
OffersComponentMonetization.propTypes = {
  onClick: PropTypes.func,
  textLine: PropTypes.string
};
