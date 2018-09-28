import React from "react";
import PdpFooter from "./PdpFooter";
import styles from "./PdpFrame.css";
import PropTypes from "prop-types";
import { MetaTags } from "react-meta-tags";

export default class PdpFrame extends React.Component {
  onAddToBag(buyNowFlag) {
    if (this.props.addProductToBag) {
      return this.props.addProductToBag(buyNowFlag);
    }
  }

  goBack = () => {
    if (this.props.gotoPreviousPage) {
      this.props.gotoPreviousPage();
    }
  };

  goToCartPage = () => {
    if (this.props.goToCart) {
      this.props.goToCart();
    }
  };

  goToWishList = () => {
    if (this.props.goToWishList) {
      this.props.goToWishList();
    }
  };

  renderAvailabilityMetaTag = () => {
    return (
      <MetaTags>
        <meta itemProp="availability" content="http://schema.org/InStock" />
      </MetaTags>
    );
  };
  render() {
    return (
      <div className={styles.base}>
        <PdpFooter
          goToCartPageFlag={this.props.goToCartPageFlag}
          displayToast={message => this.props.displayToast(message)}
          onAddToBag={buyNowFlag => this.onAddToBag(buyNowFlag)}
          goToCartPage={() => this.goToCartPage()}
          productListingId={this.props.productListingId}
          outOfStock={this.props.outOfStock}
          winningUssID={
            this.props.ussId
              ? this.props.ussId
              : this.props.winningUssID
                ? this.props.winningUssID
                : this.props.USSID
          }
        />
        {this.props.children}
        {!this.props.outOfStock && this.renderAvailabilityMetaTag()}
      </div>
    );
  }
}
PdpFrame.propTypes = {
  onAddToBag: PropTypes.func
};
