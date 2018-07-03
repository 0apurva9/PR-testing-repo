import React from "react";
import Carousel from "../../general/components/Carousel";
import BannerLink from "./BannerLink.js";
import styles from "./ShopByPriceDesktop.css";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import PropTypes from "prop-types";
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
      <div className={styles.base}>
        <Carousel header="Shope By Price" elementWidthDesktop={50}>
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
