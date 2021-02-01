import React from "react";
import styles from "./ProductImage.css";
import Image from "../../xelpmoc-core/Image";

import PropTypes from "prop-types";
import VisibilityChild from "../../home/components/VisibilityChild.js";
import { isBrowser } from "browser-or-node";

export default class ProductImage extends React.Component {
  onClickImage() {
    if (this.props.onClickImage) {
      this.props.onClickImage();
    }
  }

  render() {
    return (
      <div
        className={
          this.props.electronicView
            ? styles.electronicImageBase
            : this.props.flatImage
              ? styles.flatImage
              : styles.base
        }
      >
        <div
          className={
            this.props.isClickable
              ? styles.imageHolder
              : styles.imageHolderDisabled
          }
          onClick={() => this.onClickImage()}
        >
          {isBrowser ? (
            <VisibilityChild>
              <Image image={this.props.image} alt={this.props.alt} />
            </VisibilityChild>
          ) : (
            <Image image={this.props.image} alt={this.props.alt} />
          )}
        </div>
      </div>
    );
  }
}
ProductImage.propTypes = {
  image: PropTypes.string,
  flatImage: false,
  onClickImage: PropTypes.func,
  electronicView: PropTypes.bool,
  alt: PropTypes.string,
};
ProductImage.defaultProps = {
  isClickable: true
};
