import React from "react";
import Image from "../../xelpmoc-core/Image";
import StarRating from "../../general/components/StarRating";
import CheckBox from "../../general/components/CheckBox";
import Icon from "../../xelpmoc-core/Icon";
import tipIcon from "./img/tip.svg";
import styles from "./SingleBundledProduct.css";
import { SUCCESS } from "../../lib/constants";
import PropTypes from "prop-types";
import checkboxEnabled from "../../general/components/img/checkboxEnabledProductBundling.svg";

export default class SingleBundledProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckboxClicked: false,
      userClicked: false
    };
    this.selectBundledProduct = this.selectBundledProduct.bind(this);
  }

  componentDidMount() {
    if (!this.props.isMainProduct && this.props.productData.defaultSelected) {
      let productPrice =
        this.props.productData.winningSellerPrice &&
        this.props.productData.winningSellerPrice.value;

      if (!this.props.productData.winningSellerPrice) {
        productPrice =
          this.props.productData.mrpPrice &&
          this.props.productData.mrpPrice.value;
      }

      this.props.handleClick(
        this.props.productIndex,
        false,
        this.props.productData.productListingId,
        this.props.productData.winningUssID,
        this.props.productData.recommendationType,
        this.props.productData.rootCategory,
        productPrice
      );
    }
  }

  selectBundledProduct(
    productIndex,
    checkboxChecked,
    productId,
    ussId,
    recommendationType,
    productCategory,
    productPrice
  ) {
    this.setState({
      isCheckboxClicked: !this.state.isCheckboxClicked,
      userClicked: true
    });
    this.props.handleClick(
      productIndex,
      checkboxChecked,
      productId,
      ussId,
      recommendationType,
      productCategory,
      productPrice
    );
  }

  goToPDP(productId) {
    if (!this.props.isMainProduct && productId) {
      this.props.history.push(`/p-${productId.toLowerCase()}`);
    }
  }

  render() {
    let checked = false;
    if (
      (this.props.bundledPriceAPIStatus === SUCCESS &&
        this.state.isCheckboxClicked) ||
      this.props.productData.defaultSelected
    ) {
      checked = true;
    }
    if (
      this.props.productData.defaultSelected &&
      this.state.userClicked &&
      this.state.isCheckboxClicked
    ) {
      checked = false;
    }
    let highlightMainProductPrice = false;
    if (
      this.props.isBundledProductSelected &&
      this.props.isBundledProductSelected.includes(false)
    ) {
      highlightMainProductPrice = true;
    }
    let styleForExtraProducts = styles.hideProducts;
    if (this.props.productIndex <= 1) {
      styleForExtraProducts = styles.showProducts;
    }
    if (this.props.productIndex > 1 && this.props.hideExtraProducts) {
      styleForExtraProducts = styles.hideProducts;
    }
    if (this.props.productIndex > 1 && !this.props.hideExtraProducts) {
      styleForExtraProducts = styles.showProducts;
    }
    let mainProductImageUrl =
      this.props.productData &&
      this.props.productData.galleryImagesList &&
      this.props.productData.galleryImagesList[0] &&
      this.props.productData.galleryImagesList[0].galleryImages &&
      this.props.productData.galleryImagesList[0].galleryImages[1] &&
      this.props.productData.galleryImagesList[0].galleryImages[1].value;

    let productPrice =
      this.props.productData.winningSellerPrice &&
      this.props.productData.winningSellerPrice.value;
    if (!this.props.productData.winningSellerPrice) {
      productPrice =
        this.props.productData.mrpPrice &&
        this.props.productData.mrpPrice.value;
    }
    return (
      <div className={!this.props.isMainProduct ? styleForExtraProducts : null}>
        {!this.props.isMainProduct ? <div className={styles.divider} /> : null}
        <div className={styles.singleProductContainer}>
          {!this.props.isMainProduct ? (
            <div className={styles.checkboxContainer}>
              {this.props.isBundledProductInCart ? (
                <Icon image={checkboxEnabled} size={24} />
              ) : (
                <CheckBox
                  isCircle={false}
                  checked={checked}
                  size={"24px"}
                  isFromProductBundling={true}
                  onClick={() =>
                    this.selectBundledProduct(
                      this.props.productIndex,
                      this.state.isCheckboxClicked,
                      this.props.productData.productListingId,
                      this.props.productData.winningUssID,
                      this.props.productData.recommendationType,
                      this.props.productData.rootCategory,
                      productPrice
                    )
                  }
                />
              )}
            </div>
          ) : null}

          <div
            className={
              !this.props.isMainProduct
                ? styles.imageContainer
                : styles.imageContainerMainProduct
            }
          >
            <div
              className={
                !this.props.isMainProduct
                  ? !this.props.productData.clickable
                    ? styles.imageHolderDisabled
                    : styles.imageHolder
                  : !this.props.productData.clickable
                    ? styles.imageHolderMainProductDisabled
                    : styles.imageHolderMainProduct
              }
              onClick={() =>
                this.goToPDP(this.props.productData.productListingId)
              }
            >
              <Image
                image={
                  this.props.isMainProduct
                    ? mainProductImageUrl
                    : this.props.productData.imageURL
                }
                alt={this.props.productData.productName}
              />
            </div>
          </div>
          <div
            className={
              !this.props.isMainProduct
                ? styles.productDetailsContainer
                : styles.productDetailsContainerMainProduct
            }
          >
            <div className={styles.productNameContainer}>
              <span
                className={
                  !this.props.productData.clickable
                    ? styles.productNameDisabled
                    : styles.productName
                }
                onClick={() =>
                  this.goToPDP(this.props.productData.productListingId)
                }
              >
                {this.props.productData.productName}
              </span>
            </div>
            <div className={styles.ratingContainer}>
              {this.props.productData.averageRating !== 0
                ? this.props.productData.averageRating && (
                    <StarRating
                      averageRating={this.props.productData.averageRating}
                      isPlp={true}
                      isFromProductBundling={true}
                    >
                      {this.props.productData.ratingCount !== 0 &&
                        this.props.productData.ratingCount && (
                          <div className={styles.totalNoOfReviews}>{`(${
                            this.props.productData.ratingCount
                          })`}</div>
                        )}
                    </StarRating>
                  )
                : null}
            </div>
            <div className={styles.buyingTipsContainer}>
              {this.props.productData.isdigitalProduct &&
                this.props.productData.buyingTips && (
                  <React.Fragment>
                    <div className={styles.iconHolder}>
                      <Icon image={tipIcon} size={12} />
                    </div>
                    <div className={styles.buyingTips}>
                      {this.props.productData.buyingTips}
                    </div>
                  </React.Fragment>
                )}
            </div>
          </div>

          <div className={styles.productPriceContainer}>
            <div
              className={
                this.props.isMainProduct
                  ? highlightMainProductPrice
                    ? styles.productMop
                    : styles.productMopGrey
                  : checked
                    ? styles.productMop
                    : styles.productMopGrey
              }
            >
              {this.props.productData.winningSellerPrice &&
                this.props.productData.winningSellerPrice
                  .formattedValueNoDecimal}
            </div>
            <div
              className={checked ? styles.productMrp : styles.productMrpGrey}
            >
              {this.props.productData.mrpPrice &&
                this.props.productData.mrpPrice.formattedValueNoDecimal}
            </div>
            {this.props.productData.discount &&
              this.props.productData.discount != 0 && (
                <div className={styles.productDiscount}>
                  ({this.props.productData.discount}% OFF)
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

SingleBundledProduct.propTypes = {
  handleClick: PropTypes.func,
  bundledPriceAPIStatus: PropTypes.string,
  isMainProduct: PropTypes.bool,
  productIndex: PropTypes.number,
  productData: PropTypes.objectOf(
    PropTypes.shape({
      winningUssID: PropTypes.string,
      productListingId: PropTypes.string,
      discount: PropTypes.number,
      productName: PropTypes.string,
      ratingCount: PropTypes.number,
      productDescription: PropTypes.string,
      winningSellerPrice: PropTypes.objectOf(
        PropTypes.shape({
          formattedValueNoDecimal: PropTypes.string
        })
      ),
      mrpPrice: PropTypes.objectOf(
        PropTypes.shape({
          formattedValueNoDecimal: PropTypes.string
        })
      ),
      imageURL: PropTypes.string,
      averageRating: PropTypes.number,
      galleryImagesList: PropTypes.arrayOf(
        PropTypes.shape({
          galleryImages: PropTypes.arrayOf(
            PropTypes.shape({
              value: PropTypes.string
            })
          )
        })
      )
    })
  ),
  isBundledProductSelected: PropTypes.array
};
