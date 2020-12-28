import React from "react";
import styles from "./DigitalBundledProduct.css";
import PropTypes from "prop-types";
import closeIcon from "../../cart/components/img/exchangeCloseIcon.svg";
import ProductImage from "../../general/components/ProductImage";
import { RUPEE_SYMBOL, NOT_SERVICEABLE } from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_PB_REMOVE_BUNDLED_PRODUCT_FROM_CART
} from "../../lib/adobeUtils";
import { trimProductName } from "../../lib/commonFunctionsUtils.js";

export default class DigitalBundledProduct extends React.Component {
  handleRemove(entryNumber, mainProductUssid, productcode, categoryHierarchy) {
    // for analytics
    let addToCartAnalyticsData = {};
    let categoryName =
      categoryHierarchy &&
      categoryHierarchy[categoryHierarchy.length - 1].category_name;
    addToCartAnalyticsData.productId = productcode;
    addToCartAnalyticsData.productCategory = categoryName;
    setDataLayer(
      ADOBE_PB_REMOVE_BUNDLED_PRODUCT_FROM_CART,
      addToCartAnalyticsData
    );

    let isForDigitalBundledProduct = true;
    this.props.onRemove(
      entryNumber,
      mainProductUssid,
      isForDigitalBundledProduct
    );
  }

  handleImageClick(productCode) {
    if (productCode && this.props.pageType === "CART") {
      this.props.history.push(`/p-${productCode.toLowerCase()}`);
    }
  }

  render() {
    let mainContainerClass = styles.digitalBundledProductDetails;
    let digitalBundledProductImage = styles.digitalBundledProductImage;
    let digitalProductDetails = styles.digitalProductDetails;
    let digitalProductName = styles.digitalProductName;
    let digitalProductPrice = styles.digitalProductPrice;
    if (this.props.pageType === "CHECKOUT") {
      mainContainerClass = styles.digitalBundledProductDetailsCheckout;
      digitalBundledProductImage = styles.digitalBundledProductImageCheckout;
      digitalProductDetails = styles.digitalProductDetailsCheckout;
      digitalProductName = styles.digitalProductNameCheckout;
    }
    if (this.props.pageType === "CANCEL" || this.props.pageType === "RETURN") {
      mainContainerClass = styles.digitalBundledProductDetailsCancel;
      digitalBundledProductImage = styles.digitalBundledProductImageCancel;
      digitalProductDetails = styles.digitalProductDetailsCancel;
      digitalProductName = styles.digitalProductNameCancel;
      digitalProductPrice = styles.digitalProductPriceCancel;
    }
    let productName = trimProductName(
      this.props.digitalProduct.productName,
      40
    );
    return (
      <React.Fragment>
        <div className={mainContainerClass}>
          {this.props.showRemoveButton && (
            <img
              src={closeIcon}
              alt="remove icon"
              className={styles.closeIcon}
              onClick={() =>
                this.handleRemove(
                  this.props.digitalProduct.entryNumber,
                  this.props.mainProductUssid,
                  this.props.digitalProduct.productcode,
                  this.props.digitalProduct.categoryHierarchy
                )
              }
            />
          )}
          <div className={digitalBundledProductImage}>
            <ProductImage
              image={this.props.digitalProduct.imageURL}
              onClickImage={() =>
                this.handleImageClick(this.props.digitalProduct.productcode)
              }
            />
          </div>
          <div className={digitalProductDetails}>
            <div className={digitalProductName}>{productName}</div>
            {this.props.showPriceSection &&
              this.props.digitalProduct.offerPrice && (
                <div className={styles.digitalProductOfferPrice}>
                  {RUPEE_SYMBOL}
                  {this.props.digitalProduct.offerPrice}
                </div>
              )}
            {this.props.showPriceSection && (
              <div className={digitalProductPrice}>
                {RUPEE_SYMBOL}
                {this.props.digitalProduct.price}
              </div>
            )}
            {this.props.comboDiscount && (
              <div className={styles.bundlingComboDiscount}>
                Combo Discount Applied: {RUPEE_SYMBOL}
                {this.props.comboDiscount}
              </div>
            )}
          </div>
        </div>
        {this.props.pageType !== "CANCEL" &&
          this.props.pageType !== "RETURN" && (
            <React.Fragment>
              {this.props.digitalProduct.pinCodeResponse &&
              (this.props.digitalProduct.pinCodeResponse
                .productOutOfStockMessage ||
                this.props.digitalProduct.pinCodeResponse
                  .productNotServiceabilityMessage) ? (
                <div className={styles.productNotServiceable}>
                  {this.props.digitalProduct.pinCodeResponse
                    .productOutOfStockMessage
                    ? this.props.digitalProduct.pinCodeResponse
                        .productOutOfStockMessage
                    : this.props.digitalProduct.pinCodeResponse
                        .productNotServiceabilityMessage}
                </div>
              ) : !this.props.digitalProduct.pinCodeResponse ? (
                <div className={styles.productNotServiceable}>
                  {NOT_SERVICEABLE}
                </div>
              ) : null}
            </React.Fragment>
          )}
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
  ),
  showPriceSection: PropTypes.bool,
  showRemoveButton: PropTypes.bool,
  pageType: PropTypes.string
};

DigitalBundledProduct.defaultProps = {
  showPriceSection: true,
  showRemoveButton: true,
  pageType: "CART"
};
