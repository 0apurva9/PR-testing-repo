import React, { Component } from "react";
import styles from "./ProductSellerPage.css";
import ProductDetailsCard from "./ProductDetailsCard";
import SellerWithMultiSelect from "./SellerWithMultiSelect";
import SellerCard from "./SellerCard";
import HollowHeader from "./HollowHeader.js";
class ProductSellerPage extends Component {
  render() {
    return (
      <div className={styles.base}>
        <HollowHeader {...this.props} />
        <ProductDetailsCard
          productImage={this.props.productDetails.galleryImagesList}
          productName={this.props.productDetails.productName}
          productMaterial={
            this.props.productDetails.classificationList[0].value
              .classificationListJwlry[5].value.classificationListValueJwlry[0]
          }
          price={this.props.productDetails.mrpPrice.formattedValue}
          discountPrice={
            this.props.productDetails.discountedPrice.formattedValue
          }
          averageRating={this.props.productDetails.averageRating}
          totalNoOfReviews={this.props.productDetails.productReviewsCount}
        />
        <div>
          <SellerWithMultiSelect>
            {this.props.productDetails.otherChildProducts &&
              this.props.productDetails.otherChildProducts.map(
                (value, index) => {
                  return (
                    <SellerCard
                      heading={value[0].productListingId}
                      key={index}
                      value={value}
                    />
                  );
                }
              )}
          </SellerWithMultiSelect>
        </div>
      </div>
    );
  }
}

export default ProductSellerPage;
