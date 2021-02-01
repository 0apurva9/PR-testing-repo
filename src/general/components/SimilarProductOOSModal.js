import React from "react";
import BottomModal from "./BottomModal";
import Carousel from "./Carousel.js";
import ProductModule from "./ProductModule.js";
import { transformData } from "../../home/components/utils.js";
import styles from "./SimilarProductsModal.css";
import SecondaryLoader from "./SecondaryLoader";
export default class SimilarProductsOOSModal extends React.Component {
  state = {
    showLoader: true
  };

  goToProductDescription = url => {
    this.props.history.push(url);
  };

  renderData(key) {
    if (
      (this.showLoader === false || this.showLoader === undefined) &&
      this.props.msdItems[key] &&
      this.props.status &&
      this.props.status.toLowerCase() === "success"
    ) {
      return this.renderCarousel(this.props.msdItems[key]);
    } else if (
      this.showLoader === false &&
      !this.props.msdItems[key] &&
      this.props.status &&
      (this.props.status.toLowerCase() === "success" ||
        this.props.status.toLowerCase() === "failure" ||
        this.props.status.toLowerCase() === "error")
    ) {
      return (
        <div>
          <div className={styles.noProductsFound}>
            Sorry! We could not find any matching items
          </div>
          <div
            className={styles.retryButton}
            onClick={() => this.loadMsd(true)}
          >
            Retry
          </div>
          <div className={styles.blankHeight} />
        </div>
      );
    } else {
      return (
        <div className={styles.blankHeightForLoader}>
          <SecondaryLoader />
        </div>
      );
    }
  }

  renderCarousel(items) {
    return (
      <div className={styles.brandProductCarousel}>
        <Carousel
          elementWidth={120}
          header="Similar Products"
          isPaddingTop={true}
          elementWidthDesktop={20}
          buttonColor={true}
        >
          {items.map((val, i) => {
            const transformedDatum = transformData(val);
            let productImage = transformedDatum && transformedDatum.image_link;
            let mrpInteger = transformedDatum && transformedDatum.price;
            let seoDoublePrice = transformedDatum && transformedDatum.mop;
            let discount =
              mrpInteger && seoDoublePrice
                ? Math.floor(((mrpInteger - seoDoublePrice) / mrpInteger) * 100)
                : "";
            let imageURL =
              transformedDatum &&
              transformedDatum.link &&
              transformedDatum.link.replace(/^.*\/\/[^\\/]+/, "");
            // const productImage = transformedDatum.image;
            // const discountedPrice = transformedDatum.discountPrice;
            // const mrpInteger =
            //   transformedDatum.price &&
            //   parseInt(transformedDatum.price.replace(RUPEE_SYMBOL, ""), 10);
            // const discount =
            //   mrpInteger &&
            //   discountedPrice &&
            //   Math.floor(
            //     (mrpInteger -
            //       parseInt(discountedPrice.replace(RUPEE_SYMBOL, ""), 10)) /
            //       mrpInteger *
            //       100
            //   );
            return (
              <ProductModule
                key={i}
                {...transformedDatum}
                {...this.props}
                productImage={productImage}
                productId={val.productListingId}
                isShowAddToWishlistIcon={false}
                discountPercent={discount}
                onClick={() => this.goToProductDescription(imageURL)}
              />
            );
          })}
        </Carousel>
      </div>
    );
  }

  renderProductModuleSection(title, key) {
    return (
      <div
        className={
          this.state.showLoader === false ? styles.baseAfter : styles.baseBefore
        }
      >
        {this.renderData(key)}
      </div>
    );
  }

  loadMsd(retry) {
    if (retry) {
      this.setState({ showLoader: true });
    }
    this.props
      .getMsdRequest(
        this.props.viewSimilarProductOfId,
        "similarOutOfStockProducts",
        [
          {
            field: "size",
            type: "exact",
            value: `${this.props.product &&
              this.props.product.sizelink &&
              this.props.product.sizelink.size}`
          }
        ]
      )
      .then(() => {
        this.showLoader = false;
      });
  }

  componentDidMount() {
    this.loadMsd();
  }

  render() {
    return (
      <BottomModal>
        {this.renderProductModuleSection(
          "Similar Products",
          "similarOutOfStockProducts"
        )}
      </BottomModal>
    );
  }
}
