import React from "react";
import styles from "./DigitalBundledProduct.css";
import PropTypes from "prop-types";
import closeIcon from "../../cart/components/img/exchangeCloseIcon.svg";
import ProductImage from "../../general/components/ProductImage";
import { RUPEE_SYMBOL, NOT_SERVICEABLE } from "../../lib/constants";

export default class DigitalBundledProduct extends React.Component {
  handleRemove(entryNumber, mainProductUssid) {
    let isForDigitalBundledProduct = true;
    this.props.onRemove(
      entryNumber,
      mainProductUssid,
      isForDigitalBundledProduct
    );
  }

  handleImageClick(productCode) {
    if (productCode) {
      this.props.history.push(`/p-${productCode.toLowerCase()}`);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.digitalBundledProductDetails}>
          <img
            src={closeIcon}
            alt="remove icon"
            className={styles.closeIcon}
            onClick={() =>
              this.handleRemove(
                this.props.digitalProduct.entryNumber,
                this.props.mainProductUssid
              )
            }
          />
          <div className={styles.digitalBundledProductImage}>
            <ProductImage
              image={this.props.digitalProduct.imageURL}
              onClickImage={() =>
                this.handleImageClick(this.props.digitalProduct.productcode)
              }
            />
          </div>
          <div className={styles.digitalProductDetails}>
            <div className={styles.digitalProductName}>
              {this.props.digitalProduct.productName}
            </div>
            {this.props.digitalProduct.offerPrice && (
              <div className={styles.digitalProductOfferPrice}>
                {RUPEE_SYMBOL}
                {this.props.digitalProduct.offerPrice}
              </div>
            )}
            <div className={styles.digitalProductPrice}>
              {RUPEE_SYMBOL}
              {this.props.digitalProduct.price}
            </div>
          </div>
        </div>
        {this.props.digitalProduct.pinCodeResponse &&
        (this.props.digitalProduct.pinCodeResponse.productOutOfStockMessage ||
          this.props.digitalProduct.pinCodeResponse
            .productNotServiceabilityMessage) ? (
          <div className={styles.productNotServiceable}>
            {this.props.digitalProduct.pinCodeResponse.productOutOfStockMessage
              ? this.props.digitalProduct.pinCodeResponse
                  .productOutOfStockMessage
              : this.props.digitalProduct.pinCodeResponse
                  .productNotServiceabilityMessage}
          </div>
        ) : !this.props.digitalProduct.pinCodeResponse ? (
          <div className={styles.productNotServiceable}>{NOT_SERVICEABLE}</div>
        ) : null}
      </React.Fragment>
    );
  }
}

DigitalBundledProduct.propTypes = {
  onRemove: PropTypes.func,
  history: PropTypes.object,
  mainProductUssid: PropTypes.string,
  digitalProduct: PropTypes.objectOf(
    PropTypes.shape({
      entryNumber: PropTypes.number,
      imageURL: PropTypes.string,
      productcode: PropTypes.string,
      productName: PropTypes.string,
      offerPrice: PropTypes.number,
      pinCodeResponse: PropTypes.objectOf(
        PropTypes.shape({
          productOutOfStockMessage: PropTypes.string,
          productNotServiceabilityMessage: PropTypes.string
        })
      )
    })
  )
};
