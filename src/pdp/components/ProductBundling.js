import React from "react";
import SingleBundledProduct from "./SingleBundledProduct";
import Button from "../../general/components/Button";
import SectionLoaderDesktop from "../../general/components/SectionLoaderDesktop";
import styles from "./ProductBundling.css";
import {
  SUCCESS,
  PRODUCT_CART_ROUTER,
  FAILURE_LOWERCASE,
  ADD_TO_BAG_TEXT
} from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_PB_ADD_BUNDLED_PRODUCTS_TO_CART_FROM_PDP
} from "../../lib/adobeUtils";
import PropTypes from "prop-types";
let allBundledProductData = [];
let allBundledProductDataForAddToCart = [];
let isBundledProductSelected = [];
let productIds = [];
let productCategories = [];
let productPrices = [];

export default class ProductBundling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBundledPriceDetails: null,
      bundledProductDataForAddToCart: null,
      hideExtraProducts: true,
      enableAddToCartButton: false,
      cartProducts: null,
      addToCartAnalyticsData: null,
      disableButton: false,
      userLoggedOut: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggleShowingProducts = this.toggleShowingProducts.bind(this);
  }

  async componentDidMount() {
    // call bagCount API to show check icon against bundled product which are in cart
    if (
      this.props.bundledProductSuggestionDetails &&
      this.props.bundledProductSuggestionDetails.slots
    ) {
      await this.props.getCartCountForLoggedInUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.logoutUserStatus !== this.props.logoutUserStatus &&
      nextProps.logoutUserStatus === SUCCESS
    ) {
      this.setState({ userLoggedOut: true });
    }
    if (
      nextProps.cartCountDetails &&
      nextProps.cartCountDetails !== this.state.cartCountDetails
    ) {
      this.setState({ cartProducts: nextProps.cartCountDetails.products });
    }

    if (
      nextProps.totalBundledPriceDetails !== this.state.totalBundledPriceDetails
    ) {
      this.setState({
        totalBundledPriceDetails: nextProps.totalBundledPriceDetails
      });
      if (
        nextProps.totalBundledPriceDetails.status.toLowerCase() ===
        FAILURE_LOWERCASE
      ) {
        this.props.displayToast("Please try again");
      }
    }
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
        // for analytics
        let categoryHierarchy = this.props.productData.categoryHierarchy;
        let categoryName =
          categoryHierarchy &&
          categoryHierarchy[categoryHierarchy.length - 1].category_name;
        let data = this.state.addToCartAnalyticsData;
        data.productIds.unshift(this.props.productData.productListingId);
        data.productCategories.unshift(categoryName);
        data.productPrices.unshift(
          this.props.productData.winningSellerPrice.value
        );
        setDataLayer(ADOBE_PB_ADD_BUNDLED_PRODUCTS_TO_CART_FROM_PDP, data);

        this.props.displayToast(ADD_TO_BAG_TEXT);
        this.props.history.push(PRODUCT_CART_ROUTER);
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

  componentWillUnmount() {
    allBundledProductData = [];
    allBundledProductDataForAddToCart = [];
    isBundledProductSelected = [];
    productIds = [];
    productCategories = [];
    productPrices = [];
  }

  handleClick(
    productIndex,
    checkboxChecked,
    productId,
    ussId,
    recommendationType,
    productCategory,
    productPrice
  ) {
    let bundledProductData = {};
    let bundledProductDataForAddToCart = {};
    bundledProductData.baseItem = {
      ussID: this.props.productData.winningUssID,
      productCode: this.props.productData.productListingId,
      quantity: 1
    };
    bundledProductDataForAddToCart.baseItem = {
      ussID: this.props.productData.winningUssID,
      productCode: this.props.productData.productListingId,
      quantity: 1
    };
    let singleBundledProductData = {
      ussID: ussId,
      productCode: productId,
      quantity: 1
    };
    let singleBundledProductDataForAddToCart = {
      ussID: ussId,
      productCode: productId,
      quantity: 1,
      recommendationType: recommendationType
    };
    let bundledProductIndex = allBundledProductData.findIndex(value => {
      return value.productCode === productId;
    });
    if (bundledProductIndex === -1) {
      allBundledProductData.push(singleBundledProductData);
      allBundledProductDataForAddToCart.push(
        singleBundledProductDataForAddToCart
      );
      productIds.push(productId);
      productCategories.push(productCategory);
      productPrices.push(productPrice);
    }
    if (bundledProductIndex > -1) {
      allBundledProductData.splice(bundledProductIndex, 1);
      allBundledProductDataForAddToCart.splice(bundledProductIndex, 1);
      productIds.splice(bundledProductIndex, 1);
      productCategories.splice(bundledProductIndex, 1);
      productPrices.splice(bundledProductIndex, 1);
    }
    bundledProductData.associatedItems = allBundledProductData;
    bundledProductDataForAddToCart.associatedItems = allBundledProductDataForAddToCart;

    let addToCartAnalyticsData = {
      productIds: productIds,
      productCategories: productCategories,
      productPrices: productPrices
    };

    if (allBundledProductData.length !== 0) {
      this.setState({ bundledProductDataForAddToCart });
      this.setState({ addToCartAnalyticsData });
      this.props.getTotalBundledPrice(bundledProductData);
    }

    isBundledProductSelected[productIndex] = checkboxChecked;
    if (isBundledProductSelected.includes(false)) {
      this.setState({ enableAddToCartButton: true });
    }
    if (!isBundledProductSelected.includes(false)) {
      this.setState({ enableAddToCartButton: false });
    }
  }

  addBundledProductToCart() {
    this.setState({ disableButton: true });
    this.props.addBundledProductsToCart(
      this.state.bundledProductDataForAddToCart,
      "PDP_WIDGET"
    );
    setTimeout(() => {
      this.setState({ disableButton: false });
    }, 1000);
  }

  toggleShowingProducts() {
    this.setState({ hideExtraProducts: !this.state.hideExtraProducts });
  }

  render() {
    // get bundled products and its ussids
    let productWithBundledProducts =
      !this.state.userLoggedOut &&
      this.state.cartProducts &&
      this.state.cartProducts.find(product => {
        return product.USSID === this.props.productData.winningUssID;
      });
    let bundledProducts =
      productWithBundledProducts &&
      productWithBundledProducts.bundledAssociatedItems;
    let bundledProductsUssIds =
      bundledProducts &&
      bundledProducts.map(bundledProduct => {
        return bundledProduct.ussID;
      });

    let bundledPriceAPIStatus =
      this.state.totalBundledPriceDetails &&
      this.state.totalBundledPriceDetails.status;
    let productCount =
      this.props.bundledProductSuggestionDetails &&
      this.props.bundledProductSuggestionDetails.slots &&
      this.props.bundledProductSuggestionDetails.slots.length;
    let remainingProducts = productCount - 2;

    return (
      <React.Fragment>
        {this.props.bundledProductSuggestionDetails ? (
          <div className={styles.bundlingMainContainer}>
            <div className={styles.bundlingHeadingContainer}>
              Customer buy these together
            </div>
            <div className={styles.details}>
              {(this.props.getTotalBundledPriceLoading ||
                this.props.addBundledProductsToCartLoading) && (
                <SectionLoaderDesktop />
              )}
              <SingleBundledProduct
                productData={this.props.productData}
                isMainProduct={true}
                isBundledProductInCart={false}
                isBundledProductSelected={isBundledProductSelected}
              />
              {this.props.bundledProductSuggestionDetails &&
                this.props.bundledProductSuggestionDetails.slots &&
                this.props.bundledProductSuggestionDetails.slots.map(
                  (data, index) => {
                    // check for current product is in cart or not
                    let isCurrentUssidInCart =
                      bundledProductsUssIds &&
                      bundledProductsUssIds.includes(data.winningUssID);
                    let isBundledProductInCart = false;
                    if (isCurrentUssidInCart) {
                      isBundledProductInCart = true;
                    }

                    return (
                      <SingleBundledProduct
                        key={index}
                        productData={data}
                        handleClick={(
                          productIndex,
                          checkboxChecked,
                          productId,
                          ussId,
                          recommendationType,
                          productCategory,
                          productPrice
                        ) =>
                          this.handleClick(
                            productIndex,
                            checkboxChecked,
                            productId,
                            ussId,
                            recommendationType,
                            productCategory,
                            productPrice
                          )
                        }
                        productIndex={index}
                        bundledPriceAPIStatus={bundledPriceAPIStatus}
                        hideExtraProducts={this.state.hideExtraProducts}
                        isBundledProductInCart={isBundledProductInCart}
                        history={this.props.history}
                        isMainProduct={false}
                      />
                    );
                  }
                )}

              {productCount > 2 && (
                <React.Fragment>
                  {this.state.hideExtraProducts ? (
                    <div
                      className={styles.showMoreProducts}
                      onClick={() => this.toggleShowingProducts()}
                    >{`Show ${remainingProducts} more products`}</div>
                  ) : (
                    <div
                      className={styles.showLessProducts}
                      onClick={() => this.toggleShowingProducts()}
                    >
                      Show less products
                    </div>
                  )}
                </React.Fragment>
              )}

              <div className={styles.totalDetailsContainer}>
                {this.state.enableAddToCartButton &&
                bundledPriceAPIStatus === SUCCESS ? (
                  <React.Fragment>
                    <div className={styles.totalDetailsText}>
                      Total Payable:{" "}
                    </div>
                    {this.state.totalBundledPriceDetails &&
                      this.state.totalBundledPriceDetails.payableAmount && (
                        <div className={styles.totalPrice}>
                          {
                            this.state.totalBundledPriceDetails.payableAmount
                              .formattedValueNoDecimal
                          }
                        </div>
                      )}
                    <div className={styles.buttonContainer}>
                      <Button
                        type="primary"
                        width={220}
                        height={42}
                        label={`ADD ${this.state.totalBundledPriceDetails &&
                          this.state.totalBundledPriceDetails
                            .bundlingItemcount} ITEMS TO BAG`}
                        textStyle={{ fontFamily: "regular" }}
                        onClick={() => this.addBundledProductToCart()}
                        disabled={this.state.disableButton}
                      />
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className={styles.productSelectionText}>
                      Please add at least one item to proceed.
                    </div>
                    <div className={styles.buttonContainer}>
                      <Button
                        type="primary"
                        width={220}
                        height={42}
                        label="ADD ITEMS TO BAG"
                        disabledBgGrey={true}
                        disabled={true}
                        textStyle={{ fontFamily: "regular" }}
                      />
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

ProductBundling.propTypes = {
  displayToast: PropTypes.func,
  getTotalBundledPrice: PropTypes.func,
  getTotalBundledPriceLoading: PropTypes.bool,
  productData: PropTypes.objectOf(
    PropTypes.shape({
      winningUssID: PropTypes.string,
      productListingId: PropTypes.string
    })
  ),
  bundledProductSuggestionDetails: PropTypes.array
};
