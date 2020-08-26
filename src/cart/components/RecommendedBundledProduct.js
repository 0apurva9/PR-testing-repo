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

  componentDidMount() {
    let categoryHierarchyCheck = this.props.product.categoryHierarchy;
    let categoryId =
      categoryHierarchyCheck &&
      categoryHierarchyCheck[categoryHierarchyCheck.length - 1].category_id;
    let brandCode =
      this.props.product.productBrand &&
      this.props.product.productBrand.toUpperCase();
    let pincode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
    if (this.props.product.bundlingSuggestionAvailable) {
      this.props.getBundledProductSuggestion(
        this.props.product.productcode,
        this.props.product.USSID,
        categoryId,
        brandCode,
        "CART",
        pincode
      );
    }
  }

  componentDidUpdate(prevPros, prevState) {
    if (
      this.props.bundledProductSuggestionDetails !==
      prevPros.bundledProductSuggestionDetails
    ) {
      this.setState({
        bundledProductDetails: this.props.bundledProductSuggestionDetails
      });
    }
  }

  render() {
    return (
      this.state.bundledProductDetails &&
      this.state.bundledProductDetails.map((product, index) => {
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
              />
            )}
          </React.Fragment>
        );
      })
    );
  }
}
