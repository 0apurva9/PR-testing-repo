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

class AutomatedWidgetsForHome extends React.Component {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
  }
  goToProductDescription = (url, items, widgetName, index) => {
    this.props.history.push(url);
  };
  visitBrand() {
    if (this.props.aboutTheBrand.webURL) {
      setDataLayerForVisitBrand();
      const url = this.props.aboutTheBrand.webURL.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(url);
    } else if (this.props.aboutTheBrand && this.props.aboutTheBrand.brandId) {
      this.props.history.push(`c-${this.props.aboutTheBrand.brandId}`);
    }
  }
  renderAboutTheBrand() {
    let brandId;

    if (
      this.props.automatedWidgetData &&
      this.props.automatedWidgetData.aboutTheBrand
    ) {
      brandId = this.props.automatedWidgetData.aboutTheBrand.id;
    }

    return (
      this.props.automatedWidgetData &&
      this.props.automatedWidgetData.aboutTheBrand && (
        <div className={styles.brandSection} id="GMFB">
          <h3 className={styles.brandHeader}>
            <span>About the Brand</span>
            <DesktopOnly>
              {brandId && (
                <div className={styles.headerButton}>
                  <UnderLinedButton
                    fontFamily="light"
                    label="Visit Brand Store"
                    onClick={() => this.visitBrand()}
                  />
                </div>
              )}
            </DesktopOnly>
          </h3>
          <div>
            <DesktopOnly>
              <div className={styles.banner}>
                <ProductImageHeader
                  image={this.props.automatedWidgetData.aboutTheBrand.imageURL}
                  hasDescription={false}
                  height={true}
                  logo={
                    <Logo
                      height={40}
                      image={
                        this.props.automatedWidgetData.aboutTheBrand.brandLogo
                      }
                    />
                  }
                  description={
                    this.props.automatedWidgetData.aboutTheBrand.description
                  }
                  bottomContent={
                    <div className={styles.followButton}>
                      <FollowUnFollowButtonContainer
                        color="#fff"
                        brandId={brandId}
                        isFollowing={
                          this.props.automatedWidgetData.aboutTheBrand
                            .isFollowing
                        }
                        pageType={PDP_FOLLOW_AND_UN_FOLLOW}
                      />
                    </div>
                  }
                />
              </div>
            </DesktopOnly>
            <div className={styles.sliderHolder}>
              {this.props.homeAutoWidget &&
                this.props.homeAutoWidget[ABOUT_THE_BRAND_WIDGET_KEY] &&
                this.props.homeAutoWidget[ABOUT_THE_BRAND_WIDGET_KEY].length >
                  0 &&
                this.renderCarousel(
                  this.props.homeAutoWidget[ABOUT_THE_BRAND_WIDGET_KEY],
                  "About the Brand"
                )}
              <MobileOnly>
                {brandId && (
                  <div className={styles.visitBrandButton}>
                    <Button
                      type="secondary"
                      label="Visit Brand Store"
                      onClick={() => this.visitBrand()}
                    />
                  </div>
                )}
              </MobileOnly>
            </div>
          </div>
        </div>
      )
    );
  }

  renderCarousel(items, widgetName) {
    return (
      <div className={styles.brandProductCarousel}>
        <CarouselWithControls
          elementWidth={45}
          elementWidthDesktop={25}
          parentData={this.props}
          widgetName={widgetName}
        >
          {items.map((val, i) => {
            const transformedDatum = transformData(val);
            const productImage =
              transformedDatum &&
              Array.isArray(transformedDatum.galleryImagesList) &&
              transformedDatum.galleryImagesList[0] &&
              Array.isArray(
                transformedDatum.galleryImagesList[0].galleryImages
              ) &&
              transformedDatum.galleryImagesList[0].galleryImages[0] &&
              transformedDatum.galleryImagesList[0].galleryImages[0].value;
            const mrpInteger =
              transformedDatum &&
              transformedDatum.mrpPrice &&
              transformedDatum.mrpPrice.doubleValue;
            let seoDoublePrice =
              transformedDatum.winningSellerPrice &&
              transformedDatum.winningSellerPrice.doubleValue
                ? transformedDatum.winningSellerPrice.doubleValue
                : mrpInteger;
            let discount =
              mrpInteger && seoDoublePrice
                ? Math.floor((mrpInteger - seoDoublePrice) / mrpInteger * 100)
                : "";
            return (
              <ProductModule
                key={i}
                {...transformedDatum}
                {...this.props}
                productImage={productImage}
                productId={val.productListingId}
                isShowAddToWishlistIcon={false}
                discountPercent={discount}
                onClick={url =>
                  this.goToProductDescription(url, val, widgetName, i)
                }
                widgetName={widgetName}
                autoWidget="true"
                sourceOfWidget="msd"
              />
            );
          })}
        </CarouselWithControls>
      </div>
    );
  }

  renderProductModuleSection(key) {
    let brandId;
    let titleHeader;
    if (key == "aboutTheBrand") {
      titleHeader = "About The Brand";
    } else if (key === "FrequentlyBoughtTogether") {
      titleHeader = "Frequently Bought Together";
    } else if (key === "similarProducts") {
      titleHeader = "Similar Products";
    } else if (key === "TopPicksForYou") {
      titleHeader = "Top Picks For You";
    } else if (key === "RecentlyViewed") {
      titleHeader = "Recently Viewed";
    } else if (key === "TrendingProducts") {
      titleHeader = "Trending Products";
    }
    if (
      this.props.automatedWidgetData &&
      this.props.automatedWidgetData.aboutTheBrand
    ) {
      brandId = this.props.automatedWidgetData.aboutTheBrand.id;
    }
    if (this.props.homeAutoWidget) {
      return this.props.homeAutoWidget[key] &&
        this.props.homeAutoWidget[key].length > 0 ? (
        <div
          className={styles.brandSection}
          id={titleHeader === "Similar Products" ? "HSPW" : "IFBT"}
        >
          {this.props.homeAutoWidget[key] &&
            this.renderCarousel(this.props.homeAutoWidget[key], titleHeader)}
        </div>
      ) : null;
    } else {
      return null;
    }
  }

  render() {
    console.log("===========> this.props", this.props);
    return (
      <React.Fragment>
        <CommonCenter>
          {/* <div className={styles.autoWidgetBase}> */}
          {this.props.homeAutoWidget &&
            Object.keys(this.props.homeAutoWidget).map(items => {
              return this.renderProductModuleSection(items);
            })}
          {/* </div> */}
        </CommonCenter>
      </React.Fragment>
    );
  }
}

export default withRouter(AutomatedWidgetsForHome);
