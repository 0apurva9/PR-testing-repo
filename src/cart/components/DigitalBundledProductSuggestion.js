import React from "react";
import styles from "./DigitalBundledProductSuggestion.css";
import PropTypes from "prop-types";
import ProductImage from "../../general/components/ProductImage";
import {
  SUCCESS,
  ADD_TO_BAG_TEXT,
  FAILURE_LOWERCASE,
  PRODUCT_CART_ROUTER,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  ANONYMOUS_USER
} from "../../lib/constants";
import {
  getGlobalAccessToken,
  getCustomerAccessToken,
  getLoggedInUserDetails,
  getCartDetailsForLoggedInUser,
  getCartDetailsForAnonymousInUser
} from "../../lib/getCookieDetails.js";

export default class DigitalBundledProductSuggestion extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.addBundledProductsToCartDetails !==
      prevProps.addBundledProductsToCartDetails
    ) {
      if (
        this.props.addBundledProductsToCartDetails.status.toLowerCase() ===
        SUCCESS
      ) {
        let loggedInUserDetails = getLoggedInUserDetails();
        let cartDetails = getCartDetailsForAnonymousInUser();
        let cartId = cartDetails.guid;
        let user = ANONYMOUS_USER;
        let accessToken = getGlobalAccessToken();
        if (loggedInUserDetails) {
          user = loggedInUserDetails.userName;
          cartDetails = getCartDetailsForLoggedInUser();
          cartId = cartDetails.code;
          accessToken = getCustomerAccessToken();
        }
        let defaultPinCode = localStorage.getItem(
          DEFAULT_PIN_CODE_LOCAL_STORAGE
        );

        this.props.displayToast(ADD_TO_BAG_TEXT);
        this.props.getCartDetails(user, accessToken, cartId, defaultPinCode);
      }

      if (
        this.props.addBundledProductsToCartDetails.status.toLowerCase() ===
        FAILURE_LOWERCASE
      ) {
        this.props.displayToast(
          this.props.addBundledProductsToCartDetails.error
        );
      }
    }
  }

  handleImageClick(productCode) {
    if (productCode) {
      this.props.history.push(`/p-${productCode.toLowerCase()}`);
    }
  }

  addBundledProductToCart(mainProduct, digitalProduct) {
    let bundledProductDataForAddToCart = {};
    bundledProductDataForAddToCart.baseItem = {
      ussID: mainProduct.USSID,
      productCode: mainProduct.productcode,
      quantity: 1
    };
    bundledProductDataForAddToCart.associatedItems = [
      {
        ussID: digitalProduct.winningUssID,
        productCode: digitalProduct.productListingId,
        quantity: 1,
        recommendationType: digitalProduct.recommendationType
      }
    ];
    this.props.addBundledProductsToCart(bundledProductDataForAddToCart);
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.digitalBundledProductDetails}>
          <div className={styles.digitalBundledProductImage}>
            <ProductImage
              image={this.props.digitalProduct.imageURL}
              onClickImage={() =>
                this.handleImageClick(
                  this.props.digitalProduct.productListingId
                )
              }
            />
          </div>
          <div className={styles.digitalProductDetails}>
            <div className={styles.digitalProductName}>
              {this.props.digitalProduct.productName}
            </div>
            {this.props.digitalProduct.mrpPrice && (
              <div className={styles.digitalProductOfferPrice}>
                {this.props.digitalProduct.mrpPrice.formattedValueNoDecimal}
              </div>
            )}
            {this.props.digitalProduct.winningSellerPrice && (
              <div className={styles.digitalProductPrice}>
                {
                  this.props.digitalProduct.winningSellerPrice
                    .formattedValueNoDecimal
                }
              </div>
            )}
          </div>
          <div
            className={styles.addButton}
            onClick={() =>
              this.addBundledProductToCart(
                this.props.mainProduct,
                this.props.digitalProduct
              )
            }
          >
            &#x2B; Add
          </div>
        </div>
      </React.Fragment>
    );
  }
}

DigitalBundledProductSuggestion.propTypes = {
  mainProduct: PropTypes.object,
  digitalProduct: PropTypes.objectOf(
    PropTypes.shape({
      imageURL: PropTypes.string,
      productListingId: PropTypes.string,
      productName: PropTypes.string,
      mrpPrice: PropTypes.objectOf(
        PropTypes.shape({
          currencyIso: PropTypes.string,
          doubleValue: PropTypes.number,
          formattedValue: PropTypes.string,
          formattedValueNoDecimal: PropTypes.string,
          priceType: PropTypes.string,
          value: PropTypes.number,
          currencySymbol: PropTypes.string
        })
      ),
      winningSellerPrice: PropTypes.objectOf(
        PropTypes.shape({
          currencyIso: PropTypes.string,
          doubleValue: PropTypes.number,
          formattedValue: PropTypes.string,
          formattedValueNoDecimal: PropTypes.string,
          priceType: PropTypes.string,
          value: PropTypes.number,
          currencySymbol: PropTypes.string
        })
      )
    })
  ),
  history: PropTypes.object,
  addBundledProductsToCartDetails: PropTypes.objectOf(
    PropTypes.shape({
      status: PropTypes.string,
      error: PropTypes.string
    })
  ),
  addBundledProductsToCart: PropTypes.func,
  getCartDetails: PropTypes.func,
  displayToast: PropTypes.func
};
