import React from "react";
import styles from "./ProductImage.css";
import Image from "../../xelpmoc-core/Image";
import PropTypes from "prop-types";
import VisibilityChild from "../../home/components/VisibilityChild.js";

export default class ProductImage extends React.Component {
  onClickImage() {
    if (this.props.onClickImage) {
      this.props.onClickImage();
    }
  }
  render() {
    // let electronicView = this.props.electronicView === "Electronics";
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
        {/* <div className={styles.imageHolder} onClick={() => this.onClickImage()}> */}
        <div
          className={
            this.props.electronicView
              ? styles.electronicImageHolder
              : styles.imageHolder
          }
          onClick={() => this.onClickImage()}
        >
          <VisibilityChild>
            <Image image={this.props.image} alt={this.props.alt} />
          </VisibilityChild>
        </div>
      </div>
    );
  }
}
ProductImage.propTypes = {
  image: PropTypes.string,
  flatImage: false
};
