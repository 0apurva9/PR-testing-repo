import React, { Component } from "react";
import PropTypes from "prop-types";
import AddToWishListButtonContainer from "../../wishlist/containers/AddToWishListButtonContainer";
import ProductFeatureDetails from "./ProductFeatureDetails";
import styles from "./ProductDescription.css";
import FilledStarWhite from "./img/star-fill-white.svg";
import Icon from "../../xelpmoc-core/Icon";
import { RUPEE_SYMBOL } from "../../lib/constants";
export default class ProductDescription extends Component {
  handleClick() {
    if (this.props.onDownload) {
      this.props.onDownload();
    }
  }

  renderTitle = (headerText, electronicView) => {
    if (this.props.isPlp) {
      return (
        <div
          className={electronicView ? styles.electronicHeaderText : headerText}
        >
          <h3>{this.props.title}</h3>
        </div>
      );
    } else {
      return <h3 className={headerText}>{this.props.title}</h3>;
    }
  };

  render() {
    let { averageRating, totalNoOfReviews } = this.props;
    let electronicView = this.props.electronicView;
    let headerClass = styles.header;
    let priceClass = styles.priceHolder;
    let headerText = styles.headerText;
    let contentClass = styles.content;
    let reviews = this.props.totalNoOfReviews && this.props.totalNoOfReviews;
    if (this.props.onDownload) {
      headerClass = styles.hasDownload;
    }

    if (
      this.props.discountPrice &&
      this.props.price !== this.props.discountPrice
    ) {
      priceClass = styles.priceCancelled;
    }
    if (
      this.props.discountPrice &&
      this.props.price !== this.props.discountPrice &&
      this.props.autoWidget
    ) {
      priceClass = styles.priceCancelledForAutoWidget;
    }
    if (
      this.props.discountPrice &&
      this.props.price === this.props.discountPrice &&
      this.props.autoWidget
    ) {
      priceClass = styles.nodiscountForAutoWidget;
    }
    if (this.props.isWhite) {
      headerText = styles.headerWhite;
      contentClass = styles.contentWhite;
    }
    let discountAutoWidget = styles.discount;
    if (this.props.autoWidget) {
      headerText = styles.headerTextForAutoWidget;
      headerClass = styles.headerAutoWidget;
      discountAutoWidget = styles.discountAutoWidget;
    }
    return (
      <div
        className={
          electronicView ? styles.baseClassPLPElectronics : styles.base
        }
      >
        <div className={headerClass}>
          {this.renderTitle(headerText, electronicView)}

          {!electronicView &&
            this.props.showWishListButton &&
            this.props.productId &&
            this.props.winningUssID &&
            this.props.isShowAddToWishlistIcon && (
              <div className={styles.button}>
                <AddToWishListButtonContainer
                  productListingId={this.props.productId}
                  winningUssID={this.props.winningUssID}
                  productListings={this.props.productListings}
                  isWhite={this.props.isWhite}
                  size={17}
                  ussid={this.props.ussid}
                />
              </div>
            )}
        </div>

        <div className={contentClass}>
          {this.props.description && (
            <h2
              className={
                electronicView
                  ? styles.descriptionElectronics
                  : styles.description
              }
            >
              {this.props.description}
            </h2>
          )}

          {this.props.averageRating && electronicView
            ? this.props.averageRating &&
              this.props.totalNoOfReviews && (
                <div className={styles.ratingReviewElectronicsContainer}>
                  <div
                    className={
                      this.props.averageRating > 2.5
                        ? styles.reviewElectronicsContainer
                        : styles.lessReviewElectronicsContainer
                    }
                  >
                    <div className={styles.reviewElectronics}>
                      {Math.round(this.props.averageRating)}
                    </div>
                    <div className={styles.starPLPElectronics}>
                      <Icon image={FilledStarWhite} size={10} />
                    </div>
                  </div>
                  {/* <div className={styles.ratingElectronics}>
                    ({this.props.totalNoOfReviews})
                  </div> */}
                  <div className={styles.electronicRatingReviewDropDown}>
                    {this.props.totalNoOfReviews}{" "}
                    {reviews === 1 ? `Review` : `Reviews`}
                  </div>
                </div>
              )
            : ""}
          <React.Fragment>
            {!this.props.isRange &&
              !electronicView &&
              this.props.discountPrice &&
              this.props.discountPrice !== this.props.price && (
                <div className={discountAutoWidget}>
                  <h3>
                    {" "}
                    {this.props.discountPrice.toString().includes(RUPEE_SYMBOL)
                      ? this.props.discountPrice
                      : `${RUPEE_SYMBOL}${Math.floor(
                          this.props.discountPrice
                        )}`}
                  </h3>
                </div>
              )}

            {!this.props.maxPrice &&
              !this.props.minPrice &&
              (!this.props.isRange &&
              !electronicView &&
              this.props.discountPrice &&
              this.props.discountPrice !== this.props.price ? (
                <div className={priceClass}>
                  <span>
                    {" "}
                    {this.props.price &&
                    this.props.price.toString().includes(RUPEE_SYMBOL)
                      ? this.props.price
                      : `${RUPEE_SYMBOL}${Math.floor(this.props.price)}`}
                  </span>
                </div>
              ) : (
                <div className={priceClass}>
                  <h3>
                    {" "}
                    {this.props.price &&
                    this.props.price.toString().includes(RUPEE_SYMBOL)
                      ? this.props.price
                      : `${RUPEE_SYMBOL}${Math.floor(this.props.price)}`}
                  </h3>
                </div>
              ))}

            {!this.props.isRange &&
              !electronicView &&
              this.props.mrpPrice &&
              typeof this.props.mrpPrice !== "object" && (
                <div className={priceClass}>
                  <span>
                    {" "}
                    {this.props.mrpPrice.toString().includes(RUPEE_SYMBOL)
                      ? this.props.mrpPrice
                      : `${RUPEE_SYMBOL}${Math.floor(this.props.mrpPrice)}`}
                  </span>
                </div>
              )}
          </React.Fragment>

          <React.Fragment>
            {electronicView && (
              <div className={styles.electronicDesOfferContainer}>
                <ProductFeatureDetails
                  {...this.props}
                  electronicView={electronicView}
                  priceClass={priceClass}
                  plpAttrMap={this.props.plpAttrMap && this.props.plpAttrMap}
                />
              </div>
            )}
          </React.Fragment>

          {this.props.isRange && this.props.minPrice && this.props.maxPrice && (
            <div
              className={styles.description}
              style={{ display: "inline-flex" }}
            >
              {this.props.maxPrice !== this.props.minPrice && (
                <React.Fragment>
                  <h3>
                    {" "}
                    {this.props.minPrice.toString().includes(RUPEE_SYMBOL)
                      ? this.props.minPrice
                      : `${RUPEE_SYMBOL}${this.props.minPrice}`}{" "}
                    -{" "}
                  </h3>
                  <h3>
                    {" "}
                    {this.props.maxPrice.toString().includes(RUPEE_SYMBOL)
                      ? this.props.maxPrice
                      : `${RUPEE_SYMBOL}${this.props.maxPrice}`}
                  </h3>
                </React.Fragment>
              )}
              {this.props.maxPrice === this.props.minPrice && (
                <React.Fragment>
                  {" "}
                  {this.props.discountPrice &&
                    this.props.discountPrice !== this.props.price && (
                      <div className={styles.discount}>
                        <h3>
                          {" "}
                          {this.props.discountPrice
                            .toString()
                            .includes(RUPEE_SYMBOL)
                            ? this.props.discountPrice
                            : `${RUPEE_SYMBOL}${Math.floor(
                                this.props.discountPrice
                              )}`}
                        </h3>
                      </div>
                    )}
                  {this.props.price && (
                    <div className={priceClass}>
                      <h3>
                        {" "}
                        {this.props.price.toString().includes(RUPEE_SYMBOL)
                          ? this.props.price
                          : `${RUPEE_SYMBOL}${Math.floor(this.props.price)}`}
                      </h3>
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

ProductDescription.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  discountPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  onDownload: PropTypes.func,
  isWhite: PropTypes.bool
};

ProductDescription.defaultProps = {
  title: "",
  icon: "",
  description: "",
  price: "",
  isWhite: false,
  isRange: false,
  textColor: "#212121",
  showWishListButton: true,
  isShowAddToWishlistIcon: true,
  isPlp: PropTypes.bool
};
