import React, { Component } from "react";
import PropTypes from "prop-types";
import AddToWishListButtonContainer from "../../wishlist/containers/AddToWishListButtonContainer";
import styles from "./ProductDescription.css";
import { RUPEE_SYMBOL } from "../../lib/constants";
export default class ProductDescription extends Component {
  handleClick() {
    if (this.props.onDownload) {
      this.props.onDownload();
    }
  }

  renderTitle = headerText => {
    if (this.props.isPlp) {
      return (
        <div className={headerText}>
          <h3>{this.props.title}</h3>
        </div>
      );
    } else {
      return <h3 className={headerText}>{this.props.title}</h3>;
    }
  };

  render() {
    let headerClass = styles.header;
    let priceClass = styles.priceHolder;
    let headerText = styles.headerText;
    let contentClass = styles.content;
    if (this.props.onDownload) {
      headerClass = styles.hasDownload;
    }

    if (
      this.props.discountPrice &&
      this.props.price !== this.props.discountPrice
    ) {
      priceClass = styles.priceCancelled;
    }
    if (this.props.isWhite) {
      headerText = styles.headerWhite;
      contentClass = styles.contentWhite;
    }
    return (
      <div className={styles.base}>
        <div className={headerClass}>
          {this.renderTitle(headerText)}

          {this.props.showWishListButton &&
            this.props.productListingId &&
            this.props.winningUssID &&
            this.props.isShowAddToWishlistIcon && (
              <div className={styles.button}>
                <AddToWishListButtonContainer
                  productListingId={this.props.productListingId}
                  winningUssID={this.props.winningUssID}
                  productListings={this.props.productListings}
                  isWhite={this.props.isWhite}
                  size={17}
                />
              </div>
            )}
        </div>
        <div className={contentClass}>
          {this.props.description && (
            <h3 className={styles.description}>{this.props.description}</h3>
          )}

          {!this.props.isRange &&
            this.props.discountPrice &&
            this.props.discountPrice !== this.props.price && (
              <div className={styles.discount}>
                <h3>
                  {" "}
                  {this.props.discountPrice.toString().includes(RUPEE_SYMBOL)
                    ? this.props.discountPrice
                    : `${RUPEE_SYMBOL}${Math.floor(this.props.discountPrice)}`}
                </h3>
              </div>
            )}

          {!this.props.isRange &&
            this.props.price && (
              <div className={priceClass}>
                <h3>
                  {" "}
                  {this.props.price.toString().includes(RUPEE_SYMBOL)
                    ? this.props.price
                    : `${RUPEE_SYMBOL}${Math.floor(this.props.price)}`}
                </h3>
              </div>
            )}
          {!this.props.isRange &&
            this.props.mrpPrice &&
            typeof this.props.mrpPrice !== "object" && (
              <div className={priceClass}>
                <h3>
                  {" "}
                  {this.props.mrpPrice.toString().includes(RUPEE_SYMBOL)
                    ? this.props.mrpPrice
                    : `${RUPEE_SYMBOL}${Math.floor(this.props.mrpPrice)}`}
                </h3>
              </div>
            )}
          {this.props.isRange &&
            this.props.minPrice &&
            this.props.maxPrice && (
              <div className={styles.description}>
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
