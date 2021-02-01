import React from "react";
import CarouselWithControls from "../../general/components/CarouselWithControls.js";
import ProductModule from "../../general/components/ProductModule.js";
import { transformData } from "../../home/components/utils.js";
import { withRouter } from "react-router-dom";
import CommonCenter from "../../general/components/CommonCenter";
import styles from "./AutomatedWidgetsForHome.css";

// only want to kick off a request for the MSD stuff if they are visible.

class HomeAutoWishlistComponent extends React.Component {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
  }

  goToProductDescription = url => {
    this.props.history.push(url);
  };

  renderCarousel(items) {
    return (
      <div className={styles.brandProductCarousel}>
        <CarouselWithControls
          elementWidth={45}
          elementWidthDesktop={25}
          parentData={this.props}
        >
          {items.map((val, i) => {
            const transformedDatum = transformData(val);
            const productImage = transformedDatum && transformedDatum.imageUrl;
            const mrpInteger = transformedDatum && transformedDatum.mrp;
            let seoDoublePrice =
              transformedDatum && transformedDatum.winningSellerMOP;
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
                onClick={url => this.goToProductDescription(url, val, "", i)}
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
    // let WidgetTitle =
    //   this.props.feedComponentData &&
    //   this.props.feedComponentData.items[0] &&
    //   this.props.feedComponentData.items[0].title;
    if (key) {
      return (
        <div className={styles.brandSection}>
          {/* {WidgetTitle && <div className={styles.heading}>{WidgetTitle}</div>} */}
          {key && this.renderCarousel(key)}
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
