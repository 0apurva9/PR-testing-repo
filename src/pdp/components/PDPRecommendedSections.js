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
import {
  ABOUT_THE_BRAND_WIDGET_KEY,
  SIMILAR_PRODUCTS_WIDGET_KEY
} from "../actions/pdp.actions.js";
import { FollowUnFollowButtonContainer } from "../containers/FollowUnFollowButtonContainer";
import styles from "./PDPRecommendedSections.css";
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
  widgetsTrackingForRecommendation,
  ICIDTracking
} from "../../lib/adobeUtils.js";

// only want to kick off a request for the MSD stuff if they are visible.

class PDPRecommendedSections extends React.Component {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
  }
  componentDidMount = () => {
    if (this.props.visitedNewProduct) {
      if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
        this.props.setToOld();
        this.props.getMsdRequest(this.props.match.params[0]);
        this.props.pdpAboutBrand(this.props.match.params[0]);
      } else if (
        this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE
      ) {
        this.props.setToOld();
        this.props.getMsdRequest(this.props.match.params[1], "SimilarProduct");
        this.props.getMsdRequest(
          this.props.match.params[1],
          "FrequentlyBroughtTogether"
        );
        this.props.pdpAboutBrand(this.props.match.params[1]);
      }
      if (this.props.getRecentlyViewedProduct) {
        this.props.getRecentlyViewedProduct();
      }
    }
  };
  goToProductDescription = (url, items, widgetName, index) => {
    let similarWidgetData = {
      widgetName: widgetName,
      items: items
    };
    let selectedWidgetID =
      widgetName === "About the Brand"
        ? 114
        : widgetName === "Similar Products"
        ? 0
        : widgetName === "Frequently Bought Together"
        ? 4
        : 7;
    // getDigitalDataForPdp(SIMILAR_PRODUCTS_PDP_WIDGET, similarWidgetData);
    let mainProduct =
      this.props.productData && this.props.productData.productDetails;
    let categoryHierarchy =
      this.props.productData &&
      this.props.productData.productDetails &&
      this.props.productData.productDetails.categoryHierarchy &&
      this.props.productData.productDetails.categoryHierarchy;
    let jsonDetailsForWidgets = {
      sourceProdID: mainProduct && mainProduct.productListingId,
      sourceCatgID:
        categoryHierarchy &&
        Array.isArray(categoryHierarchy) &&
        categoryHierarchy[categoryHierarchy.length - 1] &&
        categoryHierarchy[categoryHierarchy.length - 1].category_id,
      prodPrice:
        mainProduct &&
        mainProduct.winningSellerPrice &&
        mainProduct.winningSellerPrice.doubleValue
          ? mainProduct.winningSellerPrice.doubleValue
          : mainProduct && mainProduct.mrpPrice && mainProduct.mrpPrice.value,
      destProdID:
        widgetName === "About the Brand"
          ? items && items.productListingId
          : items.product_id,
      prodPrice:
        widgetName === "About the Brand" ? items && items.mrp : items.price,
      posOfReco: index,
      widgetID: selectedWidgetID
    };
    setDataLayerForMsdItemWidgets(jsonDetailsForWidgets, ADOBE_CAROUSEL_CLICK);
    //"screentype":"widgtetname":"widget position on screen":"position of item clicked with widget":"blank ":"blank":"brand name":"product listing id"
    let icidTracking = `"pdp":${widgetName}:"blank":${index +
      1}:"blank ":"blank":${
      widgetName == "About the Brand"
        ? mainProduct && mainProduct.brandName
        : "blank"
    }:${
      widgetName === "About the Brand"
        ? items && items.productListingId
        : items.product_id
    }`;
    ICIDTracking(icidTracking);
    widgetsTrackingForRecommendation({
      widgetName: widgetName ? widgetName : "",
      pageName: "pdp",
      brandName:
        widgetName == "About the Brand"
          ? mainProduct && mainProduct.brandName
          : "",
      category:
        widgetName == "About the Brand"
          ? categoryHierarchy &&
            Array.isArray(categoryHierarchy) &&
            categoryHierarchy[categoryHierarchy.length - 1].category_name
          : widgetName == "Similar Products"
          ? this.props.recommendedItems.recommendedProducts[index + 1].ontology
          : widgetName == "Frequently Bought Together"
          ? this.props.recommendedItems.similarProducts[index + 1].ontology
          : "",
      PositionOfProduct: index + 1,
      productId:
        widgetName === "About the Brand"
          ? items && items.productListingId
          : items.product_id,
      widgetID: selectedWidgetID
    });
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

    if (this.props.aboutTheBrand) {
      brandId = this.props.aboutTheBrand.id;
    }

    return (
      this.props.aboutTheBrand && (
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
          <MobileOnly>
            <div className={styles.brandLogoSection}>
              {this.props.aboutTheBrand.brandLogo && (
                <div
                  className={styles.brandLogoHolder}
                  style={{
                    backgroundImage: `url(${this.props.aboutTheBrand.brandLogo})`
                  }}
                />
              )}
              {brandId && (
                <div className={styles.followButton}>
                  <FollowUnFollowButtonContainer
                    color="#212121"
                    brandId={brandId}
                    isFollowing={this.props.aboutTheBrand.isFollowing}
                    pageType={PDP_FOLLOW_AND_UN_FOLLOW}
                  />
                </div>
              )}
            </div>
            {this.props.aboutTheBrand.description && (
              <h3 className={styles.brandDescription}>
                {this.props.aboutTheBrand.description}
              </h3>
            )}
          </MobileOnly>
          <div>
            <DesktopOnly>
              <div className={styles.banner}>
                <ProductImageHeader
                  image={this.props.aboutTheBrand.imageURL}
                  hasDescription={false}
                  logo={
                    <Logo
                      height={40}
                      image={this.props.aboutTheBrand.brandLogo}
                    />
                  }
                  description={this.props.aboutTheBrand.description}
                  bottomContent={
                    <div className={styles.followButton}>
                      <FollowUnFollowButtonContainer
                        color="#fff"
                        brandId={brandId}
                        isFollowing={this.props.aboutTheBrand.isFollowing}
                        pageType={PDP_FOLLOW_AND_UN_FOLLOW}
                      />
                    </div>
                  }
                />
              </div>
            </DesktopOnly>
            <div className={styles.sliderHolder}>
              {this.props.msdItems[ABOUT_THE_BRAND_WIDGET_KEY] &&
                this.props.msdItems[ABOUT_THE_BRAND_WIDGET_KEY].length > 0 &&
                this.renderCarousel(
                  this.props.msdItems[ABOUT_THE_BRAND_WIDGET_KEY],
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
            let productImage, mrpInteger, seoDoublePrice, imageURL;
            // if (widgetName === "About the Brand") {
            //   productImage = transformedDatum && transformedDatum.imageUrl;
            //   mrpInteger = transformedDatum && transformedDatum.mrp;
            //   seoDoublePrice =
            //     transformedDatum && transformedDatum.winningSellerMOP;
            //   imageURL = val.webURL;
            // } else {
            productImage = transformedDatum && transformedDatum.image_link;
            mrpInteger = transformedDatum && transformedDatum.price;
            seoDoublePrice = transformedDatum && transformedDatum.mop;
            imageURL = val.link && val.link.replace(/^.*\/\/[^\/]+/, "");
            //}
            let discount =
              mrpInteger && seoDoublePrice
                ? Math.floor(((mrpInteger - seoDoublePrice) / mrpInteger) * 100)
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
                  this.goToProductDescription(imageURL, val, widgetName, i)
                }
                widgetName={widgetName}
                sourceOfWidget="msd"
                discountPrice={seoDoublePrice}
              />
            );
          })}
        </CarouselWithControls>
      </div>
    );
  }

  renderProductModuleSection(title, key) {
    if (this.props.msdItems) {
      return this.props.msdItems[key] && this.props.msdItems[key].length > 0 ? (
        <div
          className={styles.brandSection}
          id={title === "Similar Products" ? "HSPW" : "IFBT"}
        >
          <h3 className={styles.brandHeader}>{title}</h3>
          {this.props.msdItems[key] &&
            this.renderCarousel(this.props.msdItems[key], title)}
        </div>
      ) : null;
    } else {
      return null;
    }
  }
  renderRecentlyBoughtTogetherModuleSection(title, key) {
    if (
      this.props.msdItems &&
      this.props.msdItems[key] &&
      this.props.msdItems[key].length > 0
    ) {
      return this.props.msdItems[key] ? (
        <div className={styles.brandSectionForRecentlyViewed} id="JRVP">
          <h3 className={styles.brandHeader}>{title}</h3>
          {this.props.msdItems[key] &&
            this.renderCarousel(this.props.msdItems[key], title)}
        </div>
      ) : null;
    } else {
      return null;
    }
  }

  handleIntersection = event => {
    if (event.isIntersecting) {
      let mainProduct =
        this.props.productData && this.props.productData.productDetails;
      let categoryHierarchy =
        this.props.productData &&
        this.props.productData.productDetails &&
        this.props.productData.productDetails.categoryHierarchy;
      let widgetSelectedID =
        this.props.msdItems && this.props.msdItems[ABOUT_THE_BRAND_WIDGET_KEY]
          ? "About the Brand"
          : "Similar Products";
      let widgetShowObj = {
        sourceProdID: mainProduct && mainProduct.productListingId,
        sourceCatgID:
          categoryHierarchy &&
          Array.isArray(categoryHierarchy) &&
          categoryHierarchy[categoryHierarchy.length - 1].category_id,
        prodPrice:
          mainProduct &&
          mainProduct.winningSellerPrice &&
          mainProduct.winningSellerPrice.doubleValue
            ? mainProduct.winningSellerPrice.doubleValue
            : mainProduct && mainProduct.mrpPrice && mainProduct.mrpPrice.value,
        widgetID: widgetSelectedID
      };
      setDataLayerForMsdItemWidgets(widgetShowObj, ADOBE_CAROUSEL_SHOW);
    }
  };

  render() {
    const options = {
      onChange: this.handleIntersection
    };
    return (
      <React.Fragment>
        {/* <div
          className={
            window.targetVisible === "false" ||
            window.targetVisible === undefined
              ? styles.hideblock
              : ""
          }
        > */}
        <Observer {...options}>
          <div className={styles.observer} />
        </Observer>
        <div ref={this.selector}>
          {this.renderAboutTheBrand()}
          {this.renderProductModuleSection(
            "Similar Products",
            SIMILAR_PRODUCTS_WIDGET_KEY
          )}
          {this.renderProductModuleSection(
            "Frequently Bought Together",
            "recommendedProducts"
          )}
          {this.renderRecentlyBoughtTogetherModuleSection(
            "Recently Viewed Products",
            "RecentlyViewed"
          )}
        </div>
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default withRouter(PDPRecommendedSections);
