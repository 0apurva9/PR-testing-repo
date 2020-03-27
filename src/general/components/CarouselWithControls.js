import React from "react";
import DumbCarousel from "./DumbCarousel";
import DesktopOnly from "./DesktopOnly";
import styles from "./CarouselWithControls.css";
import {
  setDataLayerForMsdItemWidgets,
  ADOBE_CAROUSEL_SWIPE
} from "../../lib/adobeUtils.js";

export default class CarouselWithControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { position: 0 };
  }
  forward = () => {
    let mainProduct =
      this.props.parentData &&
      this.props.parentData.productData &&
      this.props.parentData.productData.productDetails;
    let categoryHierarchy =
      this.props.parentData &&
      this.props.parentData.productData &&
      this.props.parentData.productData.productDetails &&
      this.props.parentData.productData.productDetails.categoryHierarchy &&
      this.props.parentData.productData.productDetails.categoryHierarchy;
    let jsonDetailsForWidgets = {
      sourceProdID: mainProduct && mainProduct.productListingId,
      sourceCatgID:
        categoryHierarchy &&
        categoryHierarchy[categoryHierarchy.length - 1].category_id,
      currency:
        mainProduct && mainProduct.winningSellerPrice.doubleValue
          ? mainProduct.winningSellerPrice.doubleValue
          : mainProduct.mrpPrice.value
    };
    setDataLayerForMsdItemWidgets(jsonDetailsForWidgets, ADOBE_CAROUSEL_SWIPE);
    if (
      this.props.children.length -
        Math.floor(100 / this.props.elementWidthDesktop) >
      this.state.position
    ) {
      this.setState({ position: this.state.position + 1 });
    }
  };
  back = () => {
    let mainProduct =
      this.props.parentData &&
      this.props.parentData.productData &&
      this.props.parentData.productData.productDetails;
    let categoryHierarchy =
      this.props.parentData &&
      this.props.parentData.productData &&
      this.props.parentData.productData.productDetails &&
      this.props.parentData.productData.productDetails.categoryHierarchy &&
      this.props.parentData.productData.productDetails.categoryHierarchy;
    let jsonDetailsForWidgets = {
      sourceProdID: mainProduct && mainProduct.productListingId,
      sourceCatgID:
        categoryHierarchy &&
        categoryHierarchy[categoryHierarchy.length - 1].category_id,
      currency:
        mainProduct && mainProduct.winningSellerPrice.doubleValue
          ? mainProduct.winningSellerPrice.doubleValue
          : mainProduct.mrpPrice.value
    };
    setDataLayerForMsdItemWidgets(jsonDetailsForWidgets, ADOBE_CAROUSEL_SWIPE);
    if (this.state.position > 0) {
      this.setState({ position: this.state.position - 1 });
    }
  };
  render() {
    const childrenCount = React.Children.count(this.props.children);
    const visibleChildren = Math.floor(100 / this.props.elementWidthDesktop);
    let buttonArrowForward = styles.forwardButton;
    if (this.state.position === childrenCount - visibleChildren) {
      buttonArrowForward = styles.btnDisabledForward;
    }
    let buttonArrowBack = styles.backButton;
    if (this.state.position === 0) {
      buttonArrowBack = styles.btnDisabledBack;
    }

    return (
      <div className={styles.base}>
        <DesktopOnly>
          <div className={styles.buttons}>
            <div className={buttonArrowBack} onClick={this.back} />
            <div className={buttonArrowForward} onClick={this.forward} />
          </div>
        </DesktopOnly>
        <DumbCarousel
          position={this.state.position}
          elementWidthDesktop={this.props.elementWidthDesktop}
          elementWidth={this.props.elementWidth}
        >
          {this.props.children}
        </DumbCarousel>
      </div>
    );
  }
}
