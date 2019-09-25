import React from "react";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import RelevatProductList from "./RelevatProductList";
import styles from "./ProductDescriptionPage.css";
import Loader from "../../general/components/SecondaryLoader";
import { PRODUCT_CART_ROUTER } from "../../lib/constants";
import Image from "../../xelpmoc-core/Image";
import { RUPEE_SYMBOL } from "../../lib/constants";
const PRODUCT_QUANTITY = "1";
export default class RevelantBundling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSelectedProducts: []
    };
  }

  addToCart = async () => {
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
          //this.props.addProductToCart(productDetails);
          let self = this;
          let baseProduct = await this.props.addProductToCart(
            productDetails,
            val => {
              console.log("baseProductDetails==================>", val);
            }
          );

          if (baseProduct && baseProduct.status === "success") {
            Array.from(this.state.totalSelectedProducts).map((val, i) => {
              let bundledData = {
                code: val.productListingId,
                ussId: val.winningUssID,
                quantity: 1
              };
              self.props.addProductToCart1(bundledData, val => {
                console.log("============================>", val);
              });
            });
            this.props.history.push(PRODUCT_CART_ROUTER);
          }
        }
      }

      Array.from(this.state.totalSelectedProducts).map((val, i) => {
        bundleProductDetails[i] = {
          code: val.productListingId,
          ussId: val.winningUssID,
          quantity: 1
        };
      });
      for (var key in bundleProductDetails) {
        this.props.addProductToCart1(bundleProductDetails[key]);
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
          return this.props.addProductToCart(productDetails);
        }
      }
    }
  };
  getBundledPrice = () => {
    let arr = [];
    const relevantProduct =
      this.props.relevantBundleProductData &&
      this.props.relevantBundleProductData;
    const secondaryBundleProductData =
      this.props.secondaryBundleProductData &&
      this.props.secondaryBundleProductData;
    arr.push(relevantProduct);
    arr.push(secondaryBundleProductData);
    let tmp = this.state.totalSelectedProducts
      ? this.state.totalSelectedProducts
      : arr;
    tmp.forEach(product => {
      console.log("price Calculation", product);
    });
  };

  getDiscountedPrice = () => {
    let selectedOne = this.state.totalSelectedProducts;
    let total = 0;
    if (this.state.totalSelectedProducts.length > 0) {
      Array.from(this.state.totalSelectedProducts).map((data, key) => {
        let price =
          data && data.winningSellerPrice
            ? data.winningSellerPrice.doubleValue
            : data.mrpPrice.doubleValue;
        total = total + parseInt(price);
      });
      return total;
    } else {
      if (this.props.bundledItem.length > 0) {
        this.props.bundledItem.map((data, key) => {
          let price =
            data && data.winningSellerPrice
              ? data.winningSellerPrice.doubleValue
              : data.mrpPrice.doubleValue;

          total = total + parseInt(price);
        });
        return total;
      }
    }
  };

  totalPrice = () => {
    let discountedPrice = this.getDiscountedPrice();
    let totalPrice = 0;
    let price =
      this.props.productDetails && this.props.productDetails.winningSellerPrice
        ? this.props.productDetails.winningSellerPrice.doubleValue
        : this.props.productDetails.mrpPrice.doubleValue;
    totalPrice = discountedPrice + price;
    return totalPrice;
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
  render() {
    if (this.props.relevantBundleProductData === null) {
      return this.renderLoader();
    }
    let arr = [];
    const relevantProduct = this.props && this.props.relevantBundleProductData;
    const secondaryBundleProductData =
      this.props && this.props.secondaryBundleProductData;
    arr.push(relevantProduct);
    // arr.push(secondaryBundleProductData);
    let Bundledprice = "";
    let BundleddiscountPrice = "";
    let BundledseoDoublePrice = 0;
    let price = "";
    if (
      this.props.productDetails.winningSellerPrice &&
      this.props.productDetails.winningSellerPrice.doubleValue
    ) {
      BundledseoDoublePrice = this.props.productDetails.winningSellerPrice
        .doubleValue;
    } else if (
      this.props.productDetails.mrpPrice &&
      this.props.productDetails.mrpPrice.doubleValue
    ) {
      BundledseoDoublePrice = this.props.productDetails.mrpPrice.doubleValue;
    }
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
    let priceHeader, bagHeading;
    let totalLength =
      this.state.totalSelectedProducts &&
      this.state.totalSelectedProducts.length;
    let bundledItem = this.props.bundledItem && this.props.bundledItem.length;
    // let priceTotal =
    // ((this.props && this.props.relevantBundleProductData && this.props.relevantBundleProductData.winningSellerPrice && this.props.relevantBundleProductData.winningSellerPrice.formattedValueNoDecimal)+(this.props && this.props.secondaryBundleProductData && this.props.secondaryBundleProductData.winningSellerPrice && this.props.secondaryBundleProductData.winningSellerPrice.formattedValueNoDecimal))
    if (this.state.totalSelectedProducts.length > 0) {
      priceHeader = `${totalLength} Add-ons`;
      bagHeading = `ADD ${totalLength + 1} items in the Bag`;
    } else {
      if (bundledItem) {
        priceHeader = `${bundledItem} Add-ons`;
        bagHeading = `ADD ${bundledItem + 1} items in the Bag`;
      }
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
            <div className={styles.bundleContent}>
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
                    {this.props.productDetails.galleryImagesList[0]
                      .mediaType === "Image" && (
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
                          {BundleddiscountPrice.toString().includes(
                            RUPEE_SYMBOL
                          )
                            ? BundleddiscountPrice
                            : `${RUPEE_SYMBOL}${Math.floor(
                                BundleddiscountPrice
                              )}`}
                        </div>
                      )}
                    {!this.props.productDetails.isRange &&
                      Bundledprice && (
                        <div className={styles.priceCancelled}>
                          {Bundledprice.toString().includes(RUPEE_SYMBOL)
                            ? Bundledprice
                            : `${RUPEE_SYMBOL}${Math.floor(Bundledprice)}`}
                        </div>
                      )}
                    {this.props.productDetails.discount &&
                    this.props.productDetails.discount !== "0" &&
                    this.props.productDetails.productCategory !==
                      "FineJewellery" ? (
                      <div className={styles.discountClass}>
                        {!this.props.productDetails.noBrace && `${"("}`}
                        {parseInt(this.props.productDetails.discount, 10) +
                          `${"%"}`}
                        {!this.props.productDetails.noBrace && `${")"}`}
                      </div>
                    ) : null}
                  </div>
                )}
              {this.props.relevantBundleProductData !== null &&
                this.props.bundledItem.map((data, key) => {
                  return (
                    <RelevatProductList
                      bundleprdouct={data}
                      array={this.props.bundledItem}
                      key={key}
                      onClick={() => this.totalSelectedProducts(data)}
                    />
                  );
                })}
            </div>
            <div className={styles.priceTotal}>
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
              <div className={styles.widthPrice}>
                <span className={styles.headerPrice}>Total Price</span>
                <span className={styles.basePrice}>{this.totalPrice()}</span>
              </div>
            </div>
            <button className={styles.AddToCartButton} onClick={this.addToCart}>
              {bagHeading}
            </button>
          </div>
        </div>
        {/* )} */}
      </React.Fragment>
    );
  }
}
