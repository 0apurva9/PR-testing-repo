import React from "react";
import styles from "./SubBrandsBanner.css";
import ProductImageAndLogo from "./ProductImageAndLogo.js";
import Carousel from "../../general/components/Carousel";
import CommonCenter from "../../general/components/CommonCenter";
import PropTypes from "prop-types";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { RouterPropTypes } from "../../general/router-prop-types";
export default class SubBrandsBanner extends React.Component {
  handleClick(webURL) {
    let urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  }

  handleClickOnLink = event => {
    event.preventDefault();
  };

  render() {
    return (
      <CommonCenter>
        <div
          className={
            this.props.positionInFeed === 1 ? styles.firstItemBase : styles.base
          }
        >
          <Carousel
            header={
              this.props.feedComponentData && this.props.feedComponentData.title
            }
            elementWidthDesktop={20}
          >
            {this.props.feedComponentData &&
              this.props.feedComponentData.items &&
              this.props.feedComponentData.items.map((datum, i) => {
                return (
                  <a
                    href={datum.webURL}
                    key={i}
                    target="_blank"
                    rel="noreferrer"
                    onClick={event => this.handleClickOnLink(event)}
                  >
                    <ProductImageAndLogo
                      key={i}
                      imageUrl={datum.imageURL}
                      logo={datum.brandLogo}
                      onClick={() => this.handleClick(datum.webURL)}
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
SubBrandsBanner.propTypes = {
  positionInFeed: PropTypes.number,
  setClickedElementId: PropTypes.func,
  feedComponentData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          brandLogo: PropTypes.string,
          imageURL: PropTypes.string,
          webURL: PropTypes.string
        })
      )
    })
  ),
  ...RouterPropTypes,
};
