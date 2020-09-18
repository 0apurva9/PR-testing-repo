import React from "react";
import PropTypes from "prop-types";
import { DEFAULT_PIN_CODE_LOCAL_STORAGE } from "../../lib/constants";
import DigitalBundledProductSuggestion from "./DigitalBundledProductSuggestion";

export default class RecommendedBundledProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bundledProductDetails: null
    };
  }

  async componentDidMount() {
    let categoryHierarchyCheck = this.props.product.categoryHierarchy;
    let categoryId =
      categoryHierarchyCheck &&
      categoryHierarchyCheck[categoryHierarchyCheck.length - 1].category_id;
    let pincode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
    if (this.props.product.bundlingSuggestionAvailable) {
      await this.props.getBundledProductSuggestion(
        this.props.product.productcode,
        this.props.product.USSID,
        categoryId,
        this.props.product.productBrandCode,
        "CART",
        pincode
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.bundledProductSuggestionDetails !==
      this.state.bundledProductSuggestionDetails
    ) {
      this.setState({
        bundledProductDetails: nextProps.bundledProductSuggestionDetails
      });
    }
  }

  render() {
    return (
      this.state.bundledProductDetails &&
      this.state.bundledProductDetails.slots &&
      this.state.bundledProductDetails.slots.map((product, index) => {
        return (
          <React.Fragment>
            {product.isdigitalProduct && (
              <DigitalBundledProductSuggestion
                key={index}
                digitalProduct={product}
                mainProduct={this.props.product}
                addBundledProductsToCart={this.props.addBundledProductsToCart}
                addBundledProductsToCartDetails={
                  this.props.addBundledProductsToCartDetails
                }
                getCartDetails={this.props.getCartDetails}
                displayToast={this.props.displayToast}
                history={this.props.history}
              />
            )}
          </React.Fragment>
        );
      })
    );
  }
}

RecommendedBundledProduct.propTypes = {
  getBundledProductSuggestion: PropTypes.func,
  product: PropTypes.objectOf(
    PropTypes.shape({
      categoryHierarchy: PropTypes.array,
      productcode: PropTypes.string,
      USSID: PropTypes.string,
      productBrandCode: PropTypes.string
    })
  ),
  history: PropTypes.object,
  bundledProductSuggestionDetails: PropTypes.object,
  addBundledProductsToCartDetails: PropTypes.object,
  addBundledProductsToCart: PropTypes.func,
  getCartDetails: PropTypes.func,
  displayToast: PropTypes.func
};
