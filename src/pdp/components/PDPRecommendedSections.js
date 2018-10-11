import React from "react";
import CarouselWithControls from "../../general/components/CarouselWithControls.js";
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
import { setDataLayerForVisitBrand } from "../../lib/adobeUtils.js";

// only want to kick off a request for the MSD stuff if they are visible.

class PDPRecommendedSections extends React.Component {
  goToProductDescription = url => {
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
        <div className={styles.brandSection}>
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
                    backgroundImage: `url(${
                      this.props.aboutTheBrand.brandLogo
                    })`
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
                  33.33,
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

  renderCarousel(items, elementWidthDesktop, widgetName) {
    return (
      <div className={styles.brandProductCarousel}>
        <CarouselWithControls elementWidth={45} elementWidthDesktop={25}>
          {items.map((val, i) => {
            const transformedDatum = transformData(val);
            const productImage = transformedDatum.image;
            const discountedPrice = transformedDatum.discountPrice;
            const mrpInteger = parseInt(
              transformedDatum.price.replace(RUPEE_SYMBOL, ""),
              10
            );
            const discount = Math.floor(
              (mrpInteger -
                parseInt(discountedPrice.replace(RUPEE_SYMBOL, ""), 10)) /
                mrpInteger *
                100
            );
            return (
              <ProductModule
                key={i}
                {...transformedDatum}
                {...this.props}
                productImage={productImage}
                productId={val.productListingId}
                isShowAddToWishlistIcon={false}
                discountPercent={discount}
                onClick={url => this.goToProductDescription(url)}
                widgetName={widgetName}
                sourceOfWidget="msd"
              />
            );
          })}
        </CarouselWithControls>
      </div>
    );
  }

  renderProductModuleSection(title, key) {
    if (this.props.msdItems) {
      return this.props.msdItems[key] ? (
        <div className={styles.brandSection}>
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
      if (this.props.visitedNewProduct) {
        if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
          this.props.setToOld();
          this.props.getMsdRequest(this.props.match.params[0]);
          this.props.pdpAboutBrand(this.props.match.params[0]);
        } else if (
          this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE
        ) {
          this.props.setToOld();
          this.props.getMsdRequest(this.props.match.params[1]);
          this.props.pdpAboutBrand(this.props.match.params[1]);
        }
      }
    }
  };

  render() {
    const options = {
      onChange: this.handleIntersection
    };
    return (
      <React.Fragment>
        <Observer {...options}>
          <div className={styles.observer} />
        </Observer>
        {this.renderAboutTheBrand()}
        {this.renderProductModuleSection(
          "Similar Products",
          "recommendedProducts"
        )}
        {this.renderProductModuleSection(
          "Frequently Bought Together",
          SIMILAR_PRODUCTS_WIDGET_KEY
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(PDPRecommendedSections);
