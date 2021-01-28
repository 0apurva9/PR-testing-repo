import React from "react";
import Image from "../../xelpmoc-core/Image";
import Button from "../../general/components/Button";
import styles from "./StoryWidget.css";
import {
  setDataLayerForStoryModal,
  ADOBE_DIRECT_CALL_FOR_FRESH_FROM_BRANDS_PDP_VIEW
} from "../../lib/adobeUtils.js";
export default class StoryProduct extends React.Component {
  handleClick() {
    setDataLayerForStoryModal(ADOBE_DIRECT_CALL_FOR_FRESH_FROM_BRANDS_PDP_VIEW);
    this.props.history.push(`/p-${this.props.productListingId.toLowerCase()}`);
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.productImage}>
          <div className={styles.imageActual}>
            <Image image={this.props.imageUrl} />
          </div>
        </div>
        <div className={styles.productSection}>
          <div className={styles.row}>{this.props.productName}</div>
          {this.props &&
            this.props.winningSellerMOP && (
              <div className={styles.row}>
                <span>{this.props.winningSellerMOP}</span>
                <span className={styles.oldPrice}>{this.props.mrp}</span>
              </div>
            )}
          {!this.props.winningSellerMOP && (
            <div className={styles.row}>
              <span>{this.props.mrp}</span>
            </div>
          )}
          <div className={styles.button}>
            <Button
              label="View Product"
              type="secondary"
              onClick={() => this.handleClick()}
            />
          </div>
        </div>
      </div>
    );
  }
}
