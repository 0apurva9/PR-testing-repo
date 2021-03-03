import React from "react";
import Button from "../../general/components/Button.js";
import RelevatProductList from "./RelevatProductList";
import RelavantBundlingForOneProduct from "./RelavantBundlingForOneProduct";
import styles from "./ProductDescriptionPage.css";
import Loader from "../../general/components/SecondaryLoader";
import { PRODUCT_CART_ROUTER } from "../../lib/constants";
import Image from "../../xelpmoc-core/Image";
import { RUPEE_SYMBOL } from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_BUNDLED_ADD_TO_CONTINUE_CLICK
} from "../../lib/adobeUtils.js";
const PRODUCT_QUANTITY = "1";
export default class RevelantBundling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSelectedProducts: []
    };
  }

  addToCart = async () => {
    this.setState({
      loader: true
    });
    let bundleProductDetails = {};
    let productDetails = {};
    productDetails.code = this.props.productDetails.productListingId;
    productDetails.quantity = PRODUCT_QUANTITY;
    productDetails.ussId = this.props.productDetails.winningUssID;
    if (this.state.totalSelectedProducts.length > 0) {
      if (!this.props.productDetails.winningSellerPrice) {
        this.props.displayToast("Product is not saleable");
      } else {
        if (
          this.props.productDetails.allOOStock ||
          this.props.productDetails.winningSellerAvailableStock === "0"
        ) {
          this.props.displayToast("Product is out of stock");
        } else {
          let analyticsData = {};
          analyticsData.category = this.props.productDetails.rootCategory;
          analyticsData.id = this.props.productDetails.productListingId;
          analyticsData.price = this.props.productDetails.winningSellerPrice.value;
          setDataLayer(ADOBE_BUNDLED_ADD_TO_CONTINUE_CLICK, analyticsData);
          await this.props.addProductToCart(productDetails);
        }
      }
      let analyticsBundledProduct = {};
      this.state.totalSelectedProducts.map((val, i) => {
        bundleProductDetails[i] = {
          code: val.productListingId,
          ussId: val.winningUssID,
          quantity: 1
        };
        analyticsBundledProduct[i] = {
          category: val.rootCategory,
          id: val.productListingId,
          price: val.winningSellerPrice.value
        };
      });
      let response;
      for (var key in bundleProductDetails) {
        setDataLayer(
          ADOBE_BUNDLED_ADD_TO_CONTINUE_CLICK,
          analyticsBundledProduct[key]
        );
        response = await this.props.addProductToCart1(
          bundleProductDetails[key]
        );
      }
      if (response.status === "success") {
        this.props.history.push(PRODUCT_CART_ROUTER);
      }
    } else {
      if (!this.props.productDetails.winningSellerPrice) {
        this.props.displayToast("Product is not saleable");
      } else {
        if (
          this.props.productDetails.allOOStock ||
          this.props.productDetails.winningSellerAvailableStock === "0"
        ) {
          this.props.displayToast("Product is out of stock");
        } else {
          let response = await this.props.addProductToCart(productDetails);
          if (response.status === "success") {
            this.props.history.push(PRODUCT_CART_ROUTER);
          }
        }
      }
    }
    this.setState({
      loader: false
    });
  };

  getDiscountedPrice = () => {
    let total = 0;
    if (this.state.totalSelectedProducts.length > 0) {
      Array.from(this.state.totalSelectedProducts).map((data) => {
        let price =
          data && data.winningSellerPrice
            ? data.winningSellerPrice.doubleValue
            : data.mrpPrice.doubleValue;
        total = total + parseInt(price);
      });
      return `${RUPEE_SYMBOL}${total}`;
    } else {
      if (this.props.bundledItem.length > 0) {
        this.props.bundledItem.map((data) => {
          let price =
            data && data.winningSellerPrice
              ? data.winningSellerPrice.doubleValue
              : data.mrpPrice.doubleValue;

          total = total + parseInt(price);
        });
        return `${RUPEE_SYMBOL}${total}`;
      }
    }
  };

  totalPrice = () => {
    let total = 0;
    this.state.totalSelectedProducts.length;
    Array.from(this.state.totalSelectedProducts).map((data) => {
      let price =
        data && data.winningSellerPrice
          ? data.winningSellerPrice.doubleValue
          : data.mrpPrice.doubleValue;
      total = total + parseInt(price);
    });
    let totalPrice = 0;
    let price =
      this.props.productDetails && this.props.productDetails.winningSellerPrice
        ? this.props.productDetails.winningSellerPrice.doubleValue
        : this.props.productDetails.mrpPrice.doubleValue;
    totalPrice = total + price;

    return `${RUPEE_SYMBOL}${totalPrice}`;
  };

  totalSelectedProducts(e) {
    let tmp = this.state.totalSelectedProducts;
    if (tmp.indexOf(e) > -1 && tmp.length > 0) {
      tmp.splice(tmp.indexOf(e), 1);
    } else {
      tmp.push(e);
    }
    this.setState({
      totalSelectedProducts: tmp
    });
  }

  renderLoader() {
    return <Loader />;
  }

  baseProductWithOneBundledProduct() {
    let Bundledprice = "";
    let BundleddiscountPrice = "";
    let price = "";
    if (
      this.props.productDetails.mrpPrice &&
      this.props.productDetails.mrpPrice.formattedValueNoDecimal
    ) {
      Bundledprice = this.props.productDetails.mrpPrice.formattedValueNoDecimal;
    }
    if (
      this.props.productDetails.winningSellerPrice &&
      this.props.productDetails.winningSellerPrice.formattedValueNoDecimal
    ) {
      BundleddiscountPrice = this.props.productDetails.winningSellerPrice
        .formattedValueNoDecimal;
    }
    if (this.props.productDetails && this.props.productDetails.mrpPrice) {
      price = this.props.productDetails.mrpPrice.formattedValueNoDecimal;
    }
    return (
      <React.Fragment>
        {this.props &&
          this.props.productDetails &&
          this.props.productDetails.galleryImagesList[0] && (
            <div
              className={
                this.props.bundledItem.length > 1
                  ? styles.bundledColumns
                  : styles.oneProduct
              }
            >
              {this.props.productDetails.galleryImagesList[0].mediaType ===
                "Image" && (
                <React.Fragment>
                  <div className={styles.bundledImageForOneProduct}>
                    <Image
                      image={
                        this.props.productDetails.galleryImagesList[0]
                          .galleryImages[0].value
                      }
                      fit="contain"
                    />
                  </div>
                </React.Fragment>
              )}
              <div className={styles.productDetails}>
                <div className={styles.brandName}>
                  {this.props.productDetails.brandName}
                </div>
                <div className={styles.productName}>
                  {this.props.productDetails.productName}
                </div>
              </div>
              {!this.props.productDetails.isRange &&
                BundleddiscountPrice &&
                BundleddiscountPrice !== price && (
                  <div className={styles.discountForOneProduct}>
                    {BundleddiscountPrice.toString().includes(RUPEE_SYMBOL)
                      ? BundleddiscountPrice
                      : `${RUPEE_SYMBOL}${Math.floor(BundleddiscountPrice)}`}
                  </div>
                )}
              {!this.props.productDetails.isRange &&
                Bundledprice && (
                  <div
                    className={
                      BundleddiscountPrice === Bundledprice
                        ? styles.discountForOneProduct
                        : styles.priceCancelled
                    }
                  >
                    {Bundledprice.toString().includes(RUPEE_SYMBOL)
                      ? Bundledprice
                      : `${RUPEE_SYMBOL}${Math.floor(Bundledprice)}`}
                  </div>
                )}
              {this.props.productDetails.discount &&
              this.props.productDetails.discount !== "0" &&
              this.props.productDetails.productCategory !== "FineJewellery" ? (
                <div className={styles.discountClass}>
                  {!this.props.productDetails.noBrace && `${"("}`}
                  {parseInt(this.props.productDetails.discount, 10) + `${"%"}`}
                  {!this.props.productDetails.noBrace && `${")"}`}
                </div>
              ) : null}
            </div>
          )}
      </React.Fragment>
    );
  }

  baseProduct() {
    let Bundledprice = "";
    let BundleddiscountPrice = "";
    let price = "";
    if (
      this.props.productDetails.mrpPrice &&
      this.props.productDetails.mrpPrice.formattedValueNoDecimal
    ) {
      Bundledprice = this.props.productDetails.mrpPrice.formattedValueNoDecimal;
    }

    if (
      this.props.productDetails.winningSellerPrice &&
      this.props.productDetails.winningSellerPrice.formattedValueNoDecimal
    ) {
      BundleddiscountPrice = this.props.productDetails.winningSellerPrice
        .formattedValueNoDecimal;
    }
    if (this.props.productDetails && this.props.productDetails.mrpPrice) {
      price = this.props.productDetails.mrpPrice.formattedValueNoDecimal;
    }
    return (
      <React.Fragment>
        {this.props &&
          this.props.productDetails &&
          this.props.productDetails.galleryImagesList[0] && (
            <div
              className={
                this.props.bundledItem.length > 1
                  ? styles.bundledColumns
                  : styles.oneProduct
              }
            >
              {this.props.productDetails.galleryImagesList[0].mediaType ===
                "Image" && (
                <React.Fragment>
                  <div className={styles.bundledImage}>
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
              {!this.props.productDetails.isRange &&
                BundleddiscountPrice &&
                BundleddiscountPrice !== price && (
                  <div className={styles.discount}>
                    {BundleddiscountPrice.toString().includes(RUPEE_SYMBOL)
                      ? BundleddiscountPrice
                      : `${RUPEE_SYMBOL}${Math.floor(BundleddiscountPrice)}`}
                  </div>
                )}
              {!this.props.productDetails.isRange &&
                Bundledprice && (
                  <div
                    className={
                      BundleddiscountPrice === Bundledprice
                        ? styles.discount
                        : styles.priceCancelled
                    }
                  >
                    {Bundledprice.toString().includes(RUPEE_SYMBOL)
                      ? Bundledprice
                      : `${RUPEE_SYMBOL}${Math.floor(Bundledprice)}`}
                  </div>
                )}
              {this.props.productDetails.discount &&
              this.props.productDetails.discount !== "0" &&
              this.props.productDetails.productCategory !== "FineJewellery" ? (
                <div className={styles.discountClass}>
                  {!this.props.productDetails.noBrace && `${"("}`}
                  {parseInt(this.props.productDetails.discount, 10) + `${"%"}`}
                  {!this.props.productDetails.noBrace && `${")"}`}
                </div>
              ) : null}
            </div>
          )}
      </React.Fragment>
    );
  }

  bundledProduct() {}

  render() {
    if (this.props.relevantBundleProductData === null) {
      return this.renderLoader();
    }
    let arr = [];
    let BundleddiscountPrice = "";
    if (
      this.props.productDetails.winningSellerPrice &&
      this.props.productDetails.winningSellerPrice.formattedValueNoDecimal
    ) {
      BundleddiscountPrice = this.props.productDetails.winningSellerPrice
        .formattedValueNoDecimal;
    }
    let selectedOne = this.state.totalSelectedProducts.length;
    let disabled;
    let itemsSelected = selectedOne + 1;
    const relevantProduct = this.props && this.props.relevantBundleProductData;

    arr.push(relevantProduct);
    // arr.push(secondaryBundleProductData);

    let priceHeader, bagHeading;
    let totalLength =
      this.state.totalSelectedProducts &&
      this.state.totalSelectedProducts.length;
    let bundledItem = this.props.bundledItem && this.props.bundledItem.length;
    // let priceTotal =
    // ((this.props && this.props.relevantBundleProductData && this.props.relevantBundleProductData.winningSellerPrice && this.props.relevantBundleProductData.winningSellerPrice.formattedValueNoDecimal)+(this.props && this.props.secondaryBundleProductData && this.props.secondaryBundleProductData.winningSellerPrice && this.props.secondaryBundleProductData.winningSellerPrice.formattedValueNoDecimal))
    if (this.state.totalSelectedProducts.length > 0) {
      priceHeader = `${totalLength} Add-ons`;
      bagHeading = `ADD ${totalLength + 1} ITEMS IN THE BAG`;
      disabled = false;
    } else {
      if (bundledItem) {
        priceHeader = `${bundledItem} Add-ons`;
      }
      bagHeading = `ADD TO BAG`;
      disabled = true;
    }
    return (
      <React.Fragment>
        {/* {this.props.relevantBundleProductData !== null &&
          this.props.secondaryBundleProductData !== null && ( */}
        <div className={styles.pageCenter}>
          <div className={styles.productBundling}>
            <div className={styles.bundledHeader}>
              Customers buy these together
            </div>
            <div
              className={
                this.props.bundledItem.length > 1
                  ? styles.bundleContent
                  : styles.bundleContentOneProduct
              }
            >
              {this.props.bundledItem.length > 1
                ? this.baseProduct()
                : this.baseProductWithOneBundledProduct()}
              {this.props.bundledItem &&
                this.props.bundledItem.map((data, key) => {
                  if (this.props.bundledItem.length > 1) {
                    return (
                      <RelevatProductList
                        bundleprdouct={data}
                        array={this.props.bundledItem}
                        key={key}
                        onClick={() => this.totalSelectedProducts(data)}
                      />
                    );
                  } else {
                    return (
                      <RelavantBundlingForOneProduct
                        bundleprdouct={data}
                        array={this.props.bundledItem}
                        key={key}
                        onClick={() => this.totalSelectedProducts(data)}
                      />
                    );
                  }
                })}
            </div>
            <div
              className={
                this.props.bundledItem.length > 1
                  ? styles.priceTotal
                  : styles.priceTotalForOneProduct
              }
            >
              {selectedOne > 0 ? (
                <React.Fragment>
                  <div className={styles.widthPrice}>
                    <span className={styles.headerPrice}>1 Item</span>
                    <span className={styles.basePrice}>
                      {BundleddiscountPrice.toString().includes(RUPEE_SYMBOL)
                        ? BundleddiscountPrice
                        : `${RUPEE_SYMBOL}${Math.floor(BundleddiscountPrice)}`}
                    </span>
                  </div>
                  <div className={styles.iconAddProduct} />
                  <div className={styles.widthPrice}>
                    <span className={styles.headerPrice}>{priceHeader}</span>
                    <span className={styles.basePrice}>
                      {this.getDiscountedPrice()}
                    </span>
                  </div>
                  <div className={styles.iconEqual} />

                  <div className={styles.priceTotalText}>
                    <span className={styles.headerPrice}>Total Price</span>
                    <div className={styles.totalPrice}>
                      {this.totalPrice()}
                      <span
                        className={styles.selectedItem}
                      >{`(${itemsSelected} item)`}</span>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}
              <Button
                type="primary"
                disabled={disabled}
                backgroundColor="#ff1744"
                height={46}
                label={bagHeading}
                width={255}
                borderRadius={100}
                textStyle={{ color: "#FFF", fontSize: 14 }}
                onClick={this.addToCart}
                float="right"
              />
            </div>
          </div>
        </div>
        {/* )} */}
      </React.Fragment>
    );
  }
}
