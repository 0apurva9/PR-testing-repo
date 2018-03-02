import React, { Component } from "react";
import MDSpinner from "react-md-spinner";
import Plp from "./Plp";
class ProductListingsPage extends Component {
  renderLoader() {
    return (
      <div>
        <MDSpinner />
      </div>
    );
  }
  render() {
    console.log("PRODUCT LISTINGS PAGE");
    console.log(this.props.pageNumber);
    if (this.props.loading && this.props.pageNumber === 0) {
      return this.renderLoader();
    } else if (this.props.productListings !== null) {
      return (
        <Plp
          history={this.props.history}
          searchresult={this.props.productListings.searchresult}
          facetData={this.props.productListings.facetdata}
          showSort={this.props.showSort}
          onApply={this.props.onApply}
        />
      );
    } else {
      return this.renderLoader();
    }
  }
}

export default ProductListingsPage;
