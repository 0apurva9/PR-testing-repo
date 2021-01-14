import React from "react";
import CarouselWithControls from "../../general/components/CarouselWithControls.js";
import Carousel from "../../general/components/Carousel";
import ProductModule from "../../general/components/ProductModule.js";
import ProductImageHeader from "../../general/components/ProductImageHeader.js";
import MobileOnly from "../../general/components/MobileOnly.js";
import UnderLinedButton from "../../general/components/UnderLinedButton.js";
import Logo from "../../general/components/Logo";
import DesktopOnly from "../../general/components/DesktopOnly.js";
import { transformData } from "../../home/components/utils.js";
import Button from "../../general/components/Button.js";
import { withRouter } from "react-router-dom";
import Observer from "@researchgate/react-intersection-observer";
import CommonCenter from "../../general/components/CommonCenter";
import {
  ABOUT_THE_BRAND_WIDGET_KEY,
  SIMILAR_PRODUCTS_WIDGET_KEY
} from "../../pdp/actions/pdp.actions.js";
import { FollowUnFollowButtonContainer } from "../../pdp/containers/FollowUnFollowButtonContainer";
import styles from "./AutomatedWidgetsForHome.css";
import {
  PDP_FOLLOW_AND_UN_FOLLOW,
  PRODUCT_DESCRIPTION_PRODUCT_CODE,
  PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE,
  RUPEE_SYMBOL
} from "../../lib/constants.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import {
  setDataLayerForVisitBrand,
  getDigitalDataForPdp,
  SIMILAR_PRODUCTS_PDP_WIDGET,
  setDataLayerForMsdItemWidgets,
  ADOBE_CAROUSEL_CLICK,
  ADOBE_CAROUSEL_SHOW,
  widgetsTrackingForRecommendation
} from "../../lib/adobeUtils.js";
import { automatedWidgetsForHome } from "../actions/home.actions.js";

// only want to kick off a request for the MSD stuff if they are visible.

class HomeAutoWishlistComponent extends React.Component {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
  }

  goToProductDescription = (url, val, index) => {
    if (typeof window != "undefined" && window.digitalData) {
      const icidTracking = `"home":"AutoWishlist":"blank":${index + 1}:"blank ":"blank":"blank":${val.productListingId}`;
      Object.assign(window.digitalData, {
          icid2: icidTracking,
      });
  }
    this.props.history.push(url);
  };

  clickedViewMore() {
    this.props.history.push("/my-account/default/wishList");
  }

  renderCarousel(items, itemCount) {
    return (
      <div className={styles.brandProductCarousel}>
        <CarouselWithControls
          elementWidth={45}
          elementWidthDesktop={25}
          parentData={this.props}
        >
          {items.map((val, i) => {
            if (val.productName !== "View More") {
              const transformedDatum = transformData(val);
              const productImage =
                transformedDatum && transformedDatum.imageUrl;
              const mrpInteger = transformedDatum && transformedDatum.mrp;
              let seoDoublePrice =
                transformedDatum && transformedDatum.winningSellerMOP;
              let discount =
                mrpInteger && seoDoublePrice
                  ? Math.floor((mrpInteger - seoDoublePrice) / mrpInteger * 100)
                  : "";
              return (
                <React.Fragment>
                  <ProductModule
                    key={i}
                    {...transformedDatum}
                    {...this.props}
                    productImage={productImage}
                    productId={val.productListingId}
                    isShowAddToWishlistIcon={false}
                    discountPercent={discount}
                    onClick={url =>
                      this.goToProductDescription(url, val, i)
                    }
                    autoWidget="true"
                    sourceOfWidget="msd"
                  />
                </React.Fragment>
              );
            } else if (
              itemCount &&
              val.productName === "View More" &&
              parseInt(itemCount) >= items.length - 1
            ) {
              return (
                <div
                  className={styles.viewAllBlock}
                  onClick={() => this.clickedViewMore()}
                >
                  <div className={styles.backgroundImage}>
                    <span className={styles.viewMoreText}>View More</span>
                  </div>
                </div>
              );
            }
          })}
        </CarouselWithControls>
      </div>
    );
  }

  renderProductModuleSection(key) {
    let WishlistCount =
      this.props.feedComponentData &&
      this.props.feedComponentData.items[0] &&
      this.props.feedComponentData.items[0].btnText;
    if (key) {
      return (
        <div className={styles.brandSection}>
          {/* {WidgetTitle && <div className={styles.heading}>{WidgetTitle}</div>} */}
          {key && this.renderCarousel(key, WishlistCount)}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    let data = this.props.autoWishList;
    if (data) {
      return (
        <React.Fragment>
          <CommonCenter>{this.renderProductModuleSection(data)}</CommonCenter>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(HomeAutoWishlistComponent);
