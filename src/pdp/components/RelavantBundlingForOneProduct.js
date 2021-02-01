import React from "react";
import MultiSelectCheckbox from "./MultiSelectCheckbox.js";
import styles from "./ProductDescriptionPage.css";
import Image from "../../xelpmoc-core/Image";
import Loader from "../../general/components/SecondaryLoader";
import { RUPEE_SYMBOL, PRODUCT_CART_ROUTER } from "../../lib/constants";

export default class RevelantProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  addToCart = () => {
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
        this.props.addProductToCart(baseProductDetails, () => {
          self.props.addProductToCart(bundleProductDetails, () => {
            this.props.history.push(PRODUCT_CART_ROUTER);
          });
        });
      }
    }
  };

  selectProduct() {
    this.setState({
      selected: !this.state.selected
    });
    this.props.onClick();
  }

  renderLoader() {
    return <Loader />;
  }

  render() {
    let bundleprdouct = this.props.bundleprdouct;
    let price = "";
    let discountPrice = "";
    if (
      bundleprdouct &&
      bundleprdouct.mrpPrice &&
      bundleprdouct.mrpPrice.formattedValueNoDecimal
    ) {
      price = bundleprdouct.mrpPrice.formattedValueNoDecimal;
    }

    if (
      bundleprdouct &&
      bundleprdouct.winningSellerPrice &&
      bundleprdouct.winningSellerPrice.formattedValueNoDecimal
    ) {
      discountPrice = bundleprdouct.winningSellerPrice.formattedValueNoDecimal;
    }

    const mobileGalleryImages =
      bundleprdouct && bundleprdouct.galleryImagesList
        ? bundleprdouct.galleryImagesList
            .filter(val => {
              return val.mediaType === "Image";
            })
            .map(galleryImageList => {
              return galleryImageList.galleryImages.filter(galleryImages => {
                return galleryImages.key === "cartPage";
              });
            })
            .map(image => {
              return image[0] && image[0].value;
            })[0]
        : [];

    return (
      <div>
        <div className={styles.iconAddBundledProduct} />
        <div
          className={styles.checkCircle}
          onClick={() => {
            this.selectProduct(this.props.key);
          }}
        >
          <MultiSelectCheckbox
            selected={this.state.selected}
            isCircle={false}
          />
        </div>
        {this.props.bundleprdouct && (
          <div className={styles.oneProductBundling}>
            <div>
              <React.Fragment>
                <div className={styles.bundledImageForOneProduct}>
                  <Image
                    image={mobileGalleryImages && mobileGalleryImages}
                    fit="contain"
                  />
                </div>
              </React.Fragment>
              <div className={styles.bundleContentForOneProduct}>
                <div className={styles.brandName}>
                  {bundleprdouct.brandName}
                </div>
                <div className={styles.productName}>
                  {bundleprdouct.productName}
                </div>
              </div>
              {!bundleprdouct.isRange &&
                discountPrice &&
                discountPrice !== price && (
                  <div className={styles.discountForOneProduct}>
                    {discountPrice.toString().includes(RUPEE_SYMBOL)
                      ? discountPrice
                      : `${RUPEE_SYMBOL}${Math.floor(discountPrice)}`}
                  </div>
                )}
              {!bundleprdouct.isRange &&
                price && (
                  <div
                    className={
                      discountPrice === price
                        ? styles.discountForOneProduct
                        : styles.priceCancelled
                    }
                  >
                    {price.toString().includes(RUPEE_SYMBOL)
                      ? price
                      : `${RUPEE_SYMBOL}${Math.floor(price)}`}
                  </div>
                )}
              {bundleprdouct.discount &&
              bundleprdouct.discount !== "0" &&
              bundleprdouct.productCategory !== "FineJewellery" ? (
                <div className={styles.discountClass}>
                  {!bundleprdouct.noBrace && `${"("}`}
                  {parseInt(bundleprdouct.discount, 10) + `${"%"}`}
                  {!bundleprdouct.noBrace && `${")"}`}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}
