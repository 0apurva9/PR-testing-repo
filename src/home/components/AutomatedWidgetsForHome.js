import React from "react";
import CarouselWithControls from "../../general/components/CarouselWithControls.js";
import ProductModule from "../../general/components/ProductModule.js";
import { transformData } from "../../home/components/utils.js";
import { withRouter } from "react-router-dom";
import CommonCenter from "../../general/components/CommonCenter";
import ImageFlexible from "../../general/components/ImageFlexible";
import styles from "./AutomatedWidgetsForHome.css";
import { ICIDTracking } from "../../lib/adobeUtils.js";

// only want to kick off a request for the MSD stuff if they are visible.

class AutomatedWidgetsForHome extends React.Component {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
  }

  goToProductDescription = (url, items, widgetName, index) => {
    let icidTracking = `"home":${widgetName}:"blank":${index +
      1}:"blank ":"blank":"blank":${
      widgetName === "About the Brand"
        ? items && items.productListingId
        : items.product_id
    }`;
    ICIDTracking(icidTracking);
    this.props.history.push(url);
  };

  renderCarousel(items, widgetId) {
    return (
      <div className={styles.brandProductCarousel}>
        <CarouselWithControls
          elementWidth={45}
          elementWidthDesktop={25}
          parentData={this.props}
        >
          {items.map((val, i) => {
            const transformedDatum = transformData(val);
            let productImage, mrpInteger, seoDoublePrice, discount, imageURL;
            productImage = transformedDatum && transformedDatum.image_link;
            mrpInteger = transformedDatum && transformedDatum.price;
            seoDoublePrice = transformedDatum && transformedDatum.mop;
            imageURL = val.link && val.link.replace(/^.*\/\/[^\\/]+/, "");
            discount =
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
                discountPrice={seoDoublePrice}
                discountPercent={discount}
                onClick={() =>
                  this.goToProductDescription(imageURL, val, widgetId, i)
                }
                autoWidget="true"
                sourceOfWidget="msd"
              />
            );
          })}
        </CarouselWithControls>
      </div>
    );
  }

  getProductTitle(WidgetTitle, imageUrl) {
    if (imageUrl) {
      return <ImageFlexible image={imageUrl} />;
    } else if (WidgetTitle) {
      return <div className={styles.heading}>{WidgetTitle}</div>;
    }
  }

  renderProductModuleSection(key, widgetId) {
    let WidgetTitle =
      this.props.feedComponentData &&
      this.props.feedComponentData.items[0] &&
      this.props.feedComponentData.items[0].title;
    let imageProductUrl =
      this.props.feedComponentData &&
      this.props.feedComponentData.items[0] &&
      this.props.feedComponentData.items[0].imageURL;
    if (key || WidgetTitle || imageProductUrl) {
      return (
        <div className={styles.brandSection}>
          {this.getProductTitle(WidgetTitle, imageProductUrl)}
          {key && this.renderCarousel(key, widgetId)}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    let component =
      this.props.feedComponentData &&
      this.props.feedComponentData.items[0] &&
      this.props.feedComponentData.items[0].webURL;
    let productCode;
    if (component === "114" || component === "0" || component === "4") {
      productCode =
        this.props.feedComponentData &&
        this.props.feedComponentData.items[0] &&
        this.props.feedComponentData.items[0].hexCode;
    } else {
      productCode =
        this.props.feedComponentData &&
        this.props.feedComponentData.items[0] &&
        this.props.feedComponentData.items[0].description;
    }

    let data =
      this.props.homeAutoWidget &&
      component &&
      this.props.homeAutoWidget[component];
    if (
      this.props.homeAutoWidget &&
      this.props.homeAutoWidget[component] &&
      data[productCode]
    ) {
      return (
        <React.Fragment>
          <CommonCenter>
            {this.renderProductModuleSection(data[productCode], component)}
          </CommonCenter>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(AutomatedWidgetsForHome);
