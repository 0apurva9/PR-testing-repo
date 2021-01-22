import React from "react";
import styles from "./DigitalBundledProductSuggestion.css";
import PropTypes from "prop-types";
import ProductImage from "../../general/components/ProductImage";
import {
  SUCCESS,
  ADD_TO_BAG_TEXT,
  FAILURE_LOWERCASE,
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
import {
  setDataLayer,
  ADOBE_PB_ADD_BUNDLED_PRODUCTS_TO_CART_FROM_CART
} from "../../lib/adobeUtils";
import SectionLoaderDesktop from "../../general/components/SectionLoaderDesktop";
import { trimProductName } from "../../lib/commonFunctionsUtils.js";
import ComboOfferStrip from "../../pdp/components/ComboOfferStrip";
export default class DigitalBundledProductSuggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addToCartAnalyticsData: null,
      showLoader: false
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.addBundledProductsToCartDetails !==
      prevProps.addBundledProductsToCartDetails
    ) {
      if (
        this.props.addBundledProductsToCartDetails.status.toLowerCase() ===
        SUCCESS
      ) {
        this.setState({ showLoader: false });
        let loggedInUserDetails = getLoggedInUserDetails();
        let cartDetails = getCartDetailsForAnonymousInUser();
        let cartId = cartDetails && cartDetails.guid;
        let user = ANONYMOUS_USER;
        let accessToken = getGlobalAccessToken();
        if (loggedInUserDetails) {
          user = loggedInUserDetails.userName;
          cartDetails = getCartDetailsForLoggedInUser();
          cartId = cartDetails && cartDetails.code;
          accessToken = getCustomerAccessToken();
        }
        let defaultPinCode = localStorage.getItem(
          DEFAULT_PIN_CODE_LOCAL_STORAGE
        );
        setDataLayer(
          ADOBE_PB_ADD_BUNDLED_PRODUCTS_TO_CART_FROM_CART,
          this.state.addToCartAnalyticsData
        );
        this.props.displayToast(ADD_TO_BAG_TEXT);
        this.props.getCartDetails(user, accessToken, cartId, defaultPinCode);
      }

      if (
        this.props.addBundledProductsToCartDetails.status.toLowerCase() ===
        FAILURE_LOWERCASE
      ) {
        this.setState({ showLoader: false });
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
    this.setState({ showLoader: true });
    let bundledProductDataForAddToCart = {};
    let addToCartAnalyticsData = {};
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
    // for analytics
    let productPrice =
      digitalProduct.winningSellerPrice &&
      digitalProduct.winningSellerPrice.value;
    if (!digitalProduct.winningSellerPrice) {
      productPrice = digitalProduct.mrpPrice && digitalProduct.mrpPrice.value;
    }
    addToCartAnalyticsData.productId = digitalProduct.productListingId;
    addToCartAnalyticsData.productCategory = digitalProduct.rootCategory;
    addToCartAnalyticsData.productPrice = productPrice;
    this.setState({ addToCartAnalyticsData });
    this.props.addBundledProductsToCart(bundledProductDataForAddToCart, "CART");
  }

  render() {
    let productName = trimProductName(
      this.props.digitalProduct.productName,
      40
    );
    let productDescription = trimProductName(
      this.props.digitalProduct.productDescription,
      55
    );
    return (
      <React.Fragment>
        {this.props.digitalProduct && (
          <div className={styles.base}>
            {this.props.digitalProduct.bundlingDiscount &&
              parseFloat(this.props.digitalProduct.bundlingDiscount) !== 0 && (
                <ComboOfferStrip
                  bundlingDiscount={this.props.digitalProduct.bundlingDiscount}
                  productName={this.props.digitalProduct.productName}
                  isFromCartPage={true}
                />
              )}
            <div className={styles.digitalBundledProductDetails}>
              {this.state.showLoader && <SectionLoaderDesktop />}
              <div className={styles.digitalBundledProductImage}>
                <ProductImage
                  image={this.props.digitalProduct.imageURL}
                  onClickImage={() =>
                    this.handleImageClick(
                      this.props.digitalProduct.productListingId
                    )
                  }
                  isClickable={this.props.digitalProduct.clickable}
                />
              </div>
              <div className={styles.digitalProductDetails}>
                <div className={styles.digitalProductName}>{productName}</div>
                <div className={styles.digitalProductDescription}>
                  {productDescription}
                </div>
                {this.props.digitalProduct.winningSellerPrice &&
                  this.props.digitalProduct.winningSellerPrice
                    .formattedValueNoDecimal && (
                    <div className={styles.digitalProductOfferPrice}>
                      {
                        this.props.digitalProduct.winningSellerPrice
                          .formattedValueNoDecimal
                      }
                    </div>
                  )}
                {this.props.digitalProduct.mrpPrice &&
                  this.props.digitalProduct.mrpPrice
                    .formattedValueNoDecimal && (
                    <div className={styles.digitalProductPrice}>
                      {
                        this.props.digitalProduct.mrpPrice
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
          </div>
        )}
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
