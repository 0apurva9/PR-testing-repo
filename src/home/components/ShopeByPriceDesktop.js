import React from "react";
import Carousel from "../../general/components/Carousel";
import BannerLink from "./BannerLink.js";
import styles from "./ShopByPriceDesktop.css";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import PropTypes from "prop-types";
export default class ShopeByPriceDesktop extends React.Component {
  redirectToLink = url => {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };
  render() {
    return (
      <div className={styles.base}>
        <Carousel header="Shope By Price" elementWidthDesktop={50}>
          {this.props.items &&
            this.props.items.map((datum, i) => {
              return (
                <BannerLink
                  key={i}
                  image={datum.imageURL}
                  redirectToLink={() => this.redirectToLink(datum.webURL)}
                  linkHeader={datum.title}
                  subItems={datum.subItems}
                  history={this.props.history}
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
