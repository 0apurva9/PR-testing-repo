import React from "react";
import SingleBundledProduct from "./SingleBundledProduct";
import Button from "../../general/components/Button";
import SectionLoaderDesktop from "../../general/components/SectionLoaderDesktop";
import styles from "./ProductBundling.css";
import { SUCCESS } from "../../lib/constants";
import PropTypes from "prop-types";
const allBundledProductData = [];

export default class ProductBundling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstProductSelected: false,
      isSecondProductSelected: false,
      totalBundledPriceDetails: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.totalBundledPriceDetails !== this.state.totalBundledPriceDetails
    ) {
      this.setState({
        totalBundledPriceDetails: nextProps.totalBundledPriceDetails
      });
      if (nextProps.totalBundledPriceDetails.status !== SUCCESS) {
        this.props.displayToast("Please try again");
      }
    }
  }

  handleClick(productIndex, checkboxChecked, productId, ussId) {
    let bundledProductData = {};
    bundledProductData.baseItem = {
      ussID: this.props.productData.winningUssID,
      productCode: this.props.productData.productListingId,
      quantity: 1
    };
    let singleBundledProductData = {
      ussID: ussId,
      productCode: productId,
      quantity: 1
    };
    let bundledProductIndex = allBundledProductData.findIndex(value => {
      return value.productCode === productId;
    });
    if (bundledProductIndex === -1) {
      allBundledProductData.push(singleBundledProductData);
    }
    if (bundledProductIndex !== -1) {
      allBundledProductData.splice(bundledProductIndex, 1);
    }
    bundledProductData.associatedItems = allBundledProductData;
    if (allBundledProductData.length !== 0) {
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

  render() {
    let bundledPriceAPIStatus =
      this.state.totalBundledPriceDetails &&
      this.state.totalBundledPriceDetails.status;
    return (
      <React.Fragment>
        {this.props.bundledProductSuggestionDetails ? (
          <div className={styles.bundlingMainContainer}>
            <div className={styles.bundlingHeadingContainer}>
              Customer buy these together
            </div>
            <div className={styles.details}>
              {this.props.getTotalBundledPriceLoading && (
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
                          ussId
                        ) =>
                          this.handleClick(
                            productIndex,
                            checkboxChecked,
                            productId,
                            ussId
                          )
                        }
                        productIndex={index}
                        bundledPriceAPIStatus={bundledPriceAPIStatus}
                      />
                    );
                  }
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
