import React from "react";
import Carousel from "../../general/components/Carousel";
import ProductModule from "../../general/components/ProductModule";
import CommonCenter from "../../general/components/CommonCenter";
import PropTypes from "prop-types";
import styles from "./ThemOfferComponentDesktop.css";
import { widgetsTracking } from "../../lib/adobeUtils.js";
export default class ThemOfferComponentDesktop extends React.Component {
  onClick = (val, brand) => {
    widgetsTracking({
      widgetName: "Theme offers component",
      sourceOfWidget: this.props.postData && this.props.postData.widgetPlatform,
      brandName: brand,
      type: "Brand"
    });
    if (this.props.location.pathname === "/") {
      window.open(val, "_blank");
    } else {
      this.props.history.push({
        pathname: val,
        state: {
          componentName: "Theme offers component"
        }
      });
    }
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  };
  render() {
    const carouselOptions = this.props.carouselOptions;
    return (
      <CommonCenter>
        <div
          className={
            this.props.positionInFeed === 1 ? styles.firstItemBase : styles.base
          }
        >
          <Carousel
            {...carouselOptions}
            banner={this.props.banner}
            bannerWidth="23.33%"
            elementWidthDesktop={25}
            offsetDesktop={10}
          >
            {this.props.data &&
              this.props.data.map((datum, i) => {
                return (
                  <ProductModule
                    key={i}
                    productImage={datum.imageURL}
                    title={datum.title ? datum.title : datum.brandName}
                    price={datum.price}
                    mrpPrice={datum.mrpPrice}
                    discountPrice={datum.discountPrice}
                    description={datum.productName}
                    onDownload={datum.onDownload}
                    webURL={datum.webURL}
                    productCode={datum.productListingId}
                    showWishListButton={false}
                    ussId={datum.winningUssID}
                    onClick={url => this.onClick(url, datum.brandName)}
                  />
                );
              })}
          </Carousel>
        </div>
      </CommonCenter>
    );
  }
}
ThemOfferComponentDesktop.propTypes = {
  header: PropTypes.string,
  onClick: PropTypes.func,
  setClickedElementId: PropTypes.func,
  buttonText: PropTypes.string,
  banner: PropTypes.element,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      imageURL: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.string,
      discountPrice: PropTypes.string,
      webURL: PropTypes.string
    })
  )
};
