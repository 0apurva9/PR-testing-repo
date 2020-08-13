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

export default class ProductBundling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstProductSelected: false,
      isSecondProductSelected: false,
      totalBundledPriceDetails: null,
      bundledProductDataForAddToCart: null,
      hideExtraProducts: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggleShowingProducts = this.toggleShowingProducts.bind(this);
  }

  componentWillReceiveProps(nextProps) {
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

    if (productIndex === 0 && checkboxChecked === false) {
      this.setState({ isFirstProductSelected: true });
    }
    if (productIndex === 0 && checkboxChecked === true) {
      this.setState({ isFirstProductSelected: false });
    }
    if (productIndex === 1 && checkboxChecked === false) {
      this.setState({ isSecondProductSelected: true });
    }
    if (productIndex === 1 && checkboxChecked === true) {
      this.setState({ isSecondProductSelected: false });
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
    let bundledPriceAPIStatus =
      this.state.totalBundledPriceDetails &&
      this.state.totalBundledPriceDetails.status;
    let productCount =
      this.props.bundledProductSuggestionDetails &&
      this.props.bundledProductSuggestionDetails.suggestionList &&
      this.props.bundledProductSuggestionDetails.suggestionList.length;
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
              {this.props.bundledProductSuggestionDetails.suggestionList &&
                this.props.bundledProductSuggestionDetails.suggestionList.map(
                  (data, index) => {
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
                {(this.state.isFirstProductSelected ||
                  this.state.isSecondProductSelected) &&
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
  bundledProductSuggestionDetails: PropTypes.objectOf(
    PropTypes.shape({
      suggestionList: PropTypes.array
    })
  )
};
