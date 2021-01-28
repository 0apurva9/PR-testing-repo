import React from "react";
import styles from "./BundledProduct.css";
import Image from "../../xelpmoc-core/Image";
import { RUPEE_SYMBOL, PRODUCT_CART_ROUTER } from "../../lib/constants";
import Loader from "../../general/components/SecondaryLoader";
import {
  setDataLayer,
  ADOBE_BUNDLED_ADD_BOTH_PRODUCT_TO_CART
} from "../../lib/adobeUtils.js";

export default class BundledProduct extends React.Component {
  handleClose() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }

  addToCart = async () => {
    let baseProductDetails = {};
    let bundleProductDetails = {};

    baseProductDetails.code = this.props.productDetails.productListingId;
    baseProductDetails.quantity = 1;
    baseProductDetails.ussId = this.props.productDetails.winningUssID;
    bundleProductDetails.code = this.props.bundleProductData.productListingId;
    bundleProductDetails.quantity = 1;
    bundleProductDetails.ussId = this.props.bundleProductData.winningUssID;

    if (!this.props.productDetails.winningSellerPrice) {
      this.props.displayToast("Product is not saleable");
    } else {
      if (
        this.props.productDetails.allOOStock ||
        this.props.productDetails.winningSellerAvailableStock === "0"
      ) {
        this.props.displayToast("Product is out of stock");
      } else {
        let self = this;
        let analyticsData = {};
        analyticsData.category = this.props.productDetails.rootCategory;
        analyticsData.id = this.props.productDetails.productListingId;
        analyticsData.price = this.props.productDetails.winningSellerPrice.value;
        setDataLayer(ADOBE_BUNDLED_ADD_BOTH_PRODUCT_TO_CART, analyticsData);
        let baseProduct = await this.props.addProductToCart(
          baseProductDetails
        );

        if (baseProduct && baseProduct.status === "success") {
          let analyticsBundleData = {};
          analyticsBundleData.category = this.props.bundleProductData.rootCategory;
          analyticsBundleData.id = this.props.bundleProductData.productListingId;
          analyticsBundleData.price = this.props.bundleProductData.winningSellerPrice.value;
          setDataLayer(
            ADOBE_BUNDLED_ADD_BOTH_PRODUCT_TO_CART,
            analyticsBundleData
          );
          let bundleProduct = await self.props.addProductToCart(
            bundleProductDetails
          );
          if (bundleProduct && bundleProduct.status === "success") {
            self.props.history.push(PRODUCT_CART_ROUTER);
          }
        }
      }
    }
  };

  bundledPromotionText = () => {
    let text = this.props.bundledPromotionText;
    var replaced = text.split("$").join(" ");
    return replaced;
  };

  renderLoader() {
    return <Loader />;
  }

  render() {
    if (this.props.bundleProductData === null) {
      return this.renderLoader();
    }
    const baseProduct = this.props.productDetails && this.props.productDetails;
    const bundleProduct = this.props && this.props.bundleProductData;
    let price = "";
    let discountPrice = "";
    if (baseProduct.mrpPrice && baseProduct.mrpPrice.formattedValueNoDecimal) {
      price = baseProduct.mrpPrice.formattedValueNoDecimal;
    }

    if (
      baseProduct.winningSellerPrice &&
      baseProduct.winningSellerPrice.formattedValueNoDecimal
    ) {
      discountPrice = baseProduct.winningSellerPrice.formattedValueNoDecimal;
    }

    return (
      <React.Fragment>
        <div className={styles.base}>
          <div className={styles.header}>
            <span>{this.bundledPromotionText()}</span>
            <span
              className={styles.cancel}
              onClick={() => {
                this.handleClose();
              }}
            />
          </div>
          <div className={styles.content}>
            {this.props &&
              this.props.productDetails &&
              this.props.productDetails.galleryImagesList[0] && (
                <div className={styles.columns}>
                  {this.props.productDetails.galleryImagesList[0].mediaType ===
                    "Image" && (
                    <React.Fragment>
                      <div className={styles.image}>
                        <Image
                          image={
                            this.props.productDetails.galleryImagesList[0]
                              .galleryImages[0].value
                          }
                          fit="contain"
                        />
                      </div>
                      <h2 className={styles.brandName}>
                        {this.props.productDetails.brandName}
                      </h2>
                      <h1 className={styles.productName}>
                        {this.props.productDetails.productName}
                      </h1>
                    </React.Fragment>
                  )}
                  {/* bundle Price */}
                  {!baseProduct.isRange &&
                    discountPrice &&
                    discountPrice !== price && (
                      <div className={styles.discount}>
                        {discountPrice.toString().includes(RUPEE_SYMBOL)
                          ? discountPrice
                          : `${RUPEE_SYMBOL}${Math.floor(discountPrice)}`}
                      </div>
                    )}
                  {!baseProduct.isRange &&
                    price && (
                      <div
                        className={
                          discountPrice === price
                            ? styles.discount
                            : styles.priceCancelled
                        }
                      >
                        {price.toString().includes(RUPEE_SYMBOL)
                          ? price
                          : `${RUPEE_SYMBOL}${Math.floor(price)}`}
                      </div>
                    )}
                  {baseProduct.discount &&
                  baseProduct.discount !== "0" &&
                  baseProduct.productCategory !== "FineJewellery" ? (
                    <div className={styles.discountClass}>
                      {!baseProduct.noBrace && `${"("}`}
                      {parseInt(baseProduct.discount, 10) + `${"% OFF"}`}
                      {!baseProduct.noBrace && `${")"}`}
                    </div>
                  ) : null}
                  {/* bundle Price */}
                </div>
              )}
            <div className={styles.iconAddBundledProduct} />
            {bundleProduct && (
              <div className={styles.columns}>
                {bundleProduct.galleryImagesList[0].mediaType === "Image" && (
                  <React.Fragment>
                    <div className={styles.image}>
                      <Image
                        image={
                          bundleProduct.galleryImagesList[0].galleryImages[0]
                            .value
                        }
                        fit="contain"
                      />
                    </div>
                    <h2 className={styles.brandName}>
                      {bundleProduct.brandName}
                    </h2>
                    <h1 className={styles.productName}>
                      {bundleProduct.productName}
                    </h1>
                  </React.Fragment>
                )}

                {bundleProduct.winningSellerPrice && (
                  <div className={styles.discount}>
                    {bundleProduct.winningSellerPrice.doubleValue
                      .toString()
                      .includes(RUPEE_SYMBOL)
                      ? bundleProduct.winningSellerMOP
                      : `${RUPEE_SYMBOL}${Math.floor(
                          bundleProduct.winningSellerPrice.doubleValue
                        )}`}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={styles.discountMessage}>
            You will see the final discounted price in your bag
          </div>
          <div className={styles.addToBagButton} onClick={this.addToCart}>
            ADD BOTH ITEMS TO YOUR BAG
          </div>
        </div>
      </React.Fragment>
    );
  }
}
