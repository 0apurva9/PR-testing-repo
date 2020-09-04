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
import PropTypes from "prop-types";
const allBundledProductData = [];
const allBundledProductDataForAddToCart = [];
const isBundledProductSelected = [];

export default class ProductBundling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBundledPriceDetails: null,
      bundledProductDataForAddToCart: null,
      hideExtraProducts: true,
      enableAddToCartButton: false,
      cartProducts: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggleShowingProducts = this.toggleShowingProducts.bind(this);
    // call bagCount API to show check icon against bundled product which are in cart
    this.props.getCartCountForLoggedInUser();
  }

  componentWillReceiveProps(nextProps) {
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

  handleClick(
    productIndex,
    checkboxChecked,
    productId,
    ussId,
    recommendationType
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
    }
    if (bundledProductIndex !== -1) {
      allBundledProductData.splice(bundledProductIndex, 1);
      allBundledProductDataForAddToCart.splice(bundledProductIndex, 1);
    }
    bundledProductData.associatedItems = allBundledProductData;
    bundledProductDataForAddToCart.associatedItems = allBundledProductDataForAddToCart;
    if (allBundledProductData.length !== 0) {
      this.setState({ bundledProductDataForAddToCart });
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
    this.props.addBundledProductsToCart(
      this.state.bundledProductDataForAddToCart
    );
  }

  toggleShowingProducts() {
    this.setState({ hideExtraProducts: !this.state.hideExtraProducts });
  }

  render() {
    // get bundled products and its ussids
    let productWithBundledProducts =
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
              />
              {this.props.bundledProductSuggestionDetails &&
                this.props.bundledProductSuggestionDetails.slots &&
                this.props.bundledProductSuggestionDetails.slots.map(
                  (data, index) => {
                    // check for current product is in cart or not
                    let ussidIndex =
                      bundledProductsUssIds &&
                      bundledProductsUssIds.indexOf(data.winningUssID);
                    let isBundledProductInCart = false;
                    if (ussidIndex && ussidIndex !== -1) {
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
                          recommendationType
                        ) =>
                          this.handleClick(
                            productIndex,
                            checkboxChecked,
                            productId,
                            ussId,
                            recommendationType
                          )
                        }
                        productIndex={index}
                        bundledPriceAPIStatus={bundledPriceAPIStatus}
                        hideExtraProducts={this.state.hideExtraProducts}
                        isBundledProductInCart={isBundledProductInCart}
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
                            .bundlingItemcount} ITEMS TO CART`}
                        textStyle={{ fontFamily: "regular" }}
                        onClick={() => this.addBundledProductToCart()}
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
                        label="ADD ITEMS TO CART"
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
