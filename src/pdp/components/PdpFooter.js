import React from "react";
import styles from "./PdpFooter.css";
import PropTypes from "prop-types";
import FooterButton from "../../general/components/FooterButton.js";
import addToBagIcon from "./img/order-historyWhite.svg";
import { WISHLIST_FOOTER_BUTTON_TYPE } from "../../wishlist/components/AddToWishListButton";
import AddToWishListButtonContainer from "../../wishlist/containers/AddToWishListButtonContainer";
import { SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP } from "../../lib/adobeUtils";
export default class PdfFooter extends React.Component {
  onAddToBag() {
    if (this.props.onAddToBag) {
      this.props.onAddToBag();
    }
  }
  buyNow() {
    if (this.props.buyNow) {
      this.props.buyNow();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.footerButtonHolder}>
          <FooterButton
            backgroundColor="#fff"
            boxShadow="0 -2px 8px 0px rgba(0, 0, 0, 0.2)"
            label="Buy Now"
            disabled={this.props.outOfStock}
            onClick={() => this.buyNow()}
            labelStyle={{
              color: "#ff1744",
              fontSize: 14,
              fontFamily: "semibold"
            }}
          />
        </div>
        <div className={styles.footerButtonHolder}>
          <FooterButton
            backgroundColor="#ff1744"
            boxShadow="0 -2px 8px 0px rgba(0, 0, 0, 0.2)"
            label="Add to bag"
            disabled={this.props.outOfStock}
            onClick={() => this.onAddToBag()}
            labelStyle={{
              color: "#fff",
              fontSize: 14,
              fontFamily: "semibold"
            }}
          />
        </div>
      </div>
    );
  }
}
PdfFooter.propTyes = {
  onSave: PropTypes.func,
  onAddToBag: PropTypes.func
};
