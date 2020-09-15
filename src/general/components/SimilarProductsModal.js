import React from "react";
import BottomModal from "./BottomModal";
import Carousel from "./Carousel.js";
import ProductModule from "./ProductModule.js";
import { transformData } from "../../home/components/utils.js";
import styles from "./SimilarProductsModal.css";
import { RUPEE_SYMBOL } from "../../lib/constants.js";
import SecondaryLoader from "./SecondaryLoader";
const PRODUCT_CODE_REGEX = /p-mp(.*)/i;
export default class SimilarProductsModal extends React.Component {
  state = {
    showLoader: true
  };
  goToProductDescription = url => {
    this.props.history.push(url);
  };
  renderData(key) {
    let path =
      this.props && this.props.location && this.props.location.pathname;
    if (
      this.state.showLoader === false &&
      this.props.msdItems[key] &&
      !PRODUCT_CODE_REGEX.test(path) &&
      (this.props.status && this.props.status.toLowerCase() === "success")
    ) {
      return this.renderCarousel(this.props.msdItems[key]);
    } else if (
      this.state.showLoader === false &&
      !this.props.msdItems[key] &&
      (this.props.status &&
        (this.props.status.toLowerCase() === "failure" ||
          this.props.status.toLowerCase() === "error"))
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
    } else if (
      this.props.msdItems[key] &&
      PRODUCT_CODE_REGEX.test(path) &&
      this.props.msdItems.recommendedProducts.length > 0
    ) {
      return this.renderCarousel(this.props.msdItems[key]);
    } else if (
      (!this.props.msdItems ||
        (this.props.msdItems &&
          Array.isArray(this.props.msdItems.recommendedProducts) &&
          this.props.msdItems.recommendedProducts.length < 0)) &&
      PRODUCT_CODE_REGEX.test(path)
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
            const productImage = transformedDatum.image;
            const discountedPrice = transformedDatum.discountPrice;
            const mrpInteger =
              transformedDatum.price &&
              parseInt(transformedDatum.price.replace(RUPEE_SYMBOL, ""), 10);
            const discount =
              mrpInteger &&
              discountedPrice &&
              Math.floor(
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
    let path =
      this.props && this.props.location && this.props.location.pathname;
    if (retry) {
      this.setState({ showLoader: true });
      this.props
        .getMsdRequest(this.props.viewSimilarProductOfId, true)
        .then(done => {
          this.setState({ showLoader: false });
        });
    }
    if (!PRODUCT_CODE_REGEX.test(path)) {
      this.props
        .getMsdRequest(this.props.viewSimilarProductOfId, true)
        .then(done => {
          this.setState({ showLoader: false });
        });
    }
  }
  componentDidMount() {
    this.loadMsd();
  }
  componentWillUnmount() {
    let path =
      this.props && this.props.location && this.props.location.pathname;
    if (!PRODUCT_CODE_REGEX.test(path)) {
      this.props.clearAllMsdItems();
    }
  }
  render() {
    return (
      <BottomModal>
        {this.renderProductModuleSection(
          "Similar Products",
          "recommendedProducts"
        )}
      </BottomModal>
    );
  }
}
