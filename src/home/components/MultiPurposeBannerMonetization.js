import React from "react";
import styles from "./ConnectWidget.css";
import Icon from "../../xelpmoc-core/Icon";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import ConnectKnowMore from "./ConnectKnowMore";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import ConnectBaseWidget from "./ConnectBaseWidget";
import CommonCenter from "../../general/components/CommonCenter.js";
import { WEB_URL_REG_EX, HOME_ROUTER } from "../../lib/constants";
import { getOnlineSalesAds } from "../../lib/apiRequest";

const MULTIPURPOSE_BANNER_MONETIZATION = "MultiPurposeBanner_Monetization";

export default class MultiPurposeBanner_Monetization extends React.Component {
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
      MULTIPURPOSE_BANNER_MONETIZATION,
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
        const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1").trim();
        this.props.history.push(urlSuffix);
      }
    }
  }

  render() {
    let className = styles.base;
    const { bannerComponent } = this.state;
    if (!bannerComponent) {
      return null;
    }
    {
      bannerComponent.ads &&
        bannerComponent.ads.map &&
        bannerComponent.ads.map((datum, i) => {
          const { elements } = datum;
          if (datum["sub-type"] === "bannerInCard") {
            className = styles.inCard;
          }
          return (
            <div
              className={
                this.props.positionInFeed === 1
                  ? styles.firstPositionHolder
                  : styles.holder
              }
              onClick={() => {
                this.handleClick(elements.click_tracking_url);
              }}
              style={{
                backgroundImage: `linear-gradient(165deg, ${elements.startHexCode} ,${elements.endHexCode})`
              }}
            >
              <MediaQuery query="(min-device-width: 1025px)">
                <CommonCenter>
                  <ConnectBaseWidget
                    {...elements}
                    heading={elements.headline}
                  />
                </CommonCenter>
              </MediaQuery>
              <MediaQuery query="(max-device-width: 1024px)">
                <div className={className}>
                  <div
                    className={styles.buffer}
                    style={{
                      backgroundImage: `url(${elements.image}`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center"
                    }}
                  >
                    <div className={styles.content}>
                      {elements.brandLogo && (
                        <div className={styles.icon}>
                          <Icon image={elements.brandLogo} size={40} />
                        </div>
                      )}
                      <div className={styles.dataHolder}>
                        <div className={styles.connectBox}>
                          {elements.headline}
                        </div>
                        <div className={styles.label}>
                          {elements.Description}
                        </div>
                        {elements.CTA && (
                          <div className={styles.buttonBox}>
                            <ConnectKnowMore
                              url={datum.click_tracking_url}
                              btnText={elements.CTA}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </MediaQuery>
            </div>
          );
        });
    }
  }
}
MultiPurposeBanner_Monetization.propTypes = {
  knowMore: PropTypes.string,
  onClick: PropTypes.func
};
