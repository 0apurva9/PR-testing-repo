import React from "react";
import Carousel from "../../general/components/Carousel";
import BannerLink from "./BannerLink.js";
import CommonCenter from "../../general/components/CommonCenter";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import PropTypes from "prop-types";
import styles from "./ShopByPriceDesktop.css";
export default class ShopeByPriceDesktop extends React.Component {
  showSeeAll = url => {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  };
  render() {
    const { feedComponentData } = this.props;

    return (
      <DesktopOnly>
        <CommonCenter>
          <div className={styles.base}>
            <Carousel
              header={feedComponentData && feedComponentData.title}
              elementWidthDesktop={50}
            >
              {feedComponentData.items &&
                feedComponentData.items.map((datum, i) => {
                  return (
                    <BannerLink
                      key={i}
                      image={datum.imageURL}
                      showSeeAll={() => this.showSeeAll(datum.webURL)}
                      linkHeader={datum.title}
                      subItems={datum.subItems}
                      history={this.props.history}
                      setClickedElementId={this.props.setClickedElementId}
                    />
                  );
                })}
            </Carousel>
          </div>
        </CommonCenter>
      </DesktopOnly>
    );
  }
}
ShopeByPriceDesktop.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      imageURL: PropTypes.string,
      title: PropTypes.string,
      subItems: PropTypes.string
    })
  )
};
