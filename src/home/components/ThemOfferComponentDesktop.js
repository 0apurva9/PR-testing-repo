import React from "react";
import Carousel from "../../general/components/Carousel";
import styles from "./ThemOfferComponentDesktop.css";
import ProductModule from "../../general/components/ProductModule";
import PropTypes from "prop-types";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
export default class ThemOfferComponentDesktop extends React.Component {
  handleClick() {
    const urlSuffix = this.props.feedComponentData.webURL.replace(
      TATA_CLIQ_ROOT,
      "$1"
    );
    this.props.history.push(urlSuffix);
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  }
  onClick = val => {
    this.props.history.push(val);
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  };
  render() {
    return (
      <div
        className={
          this.props.positionInFeed === 1 ? styles.firstItemBase : styles.base
        }
      >
        <Carousel
          buttonText={this.props.buttonText}
          header={this.props.header}
          seeAll={() => this.handleClick()}
          banner={this.props.banner}
          bannerWidth="23.33%"
          elementWidthDesktop={25}
        >
          {this.props.data &&
            this.props.data.map((datum, i) => {
              return (
                <ProductModule
                  key={i}
                  productImage={datum.imageURL}
                  title={datum.title}
                  price={datum.price}
                  discountPrice={datum.discountPrice}
                  description={datum.description}
                  onDownload={datum.onDownload}
                  webURL={datum.webURL}
                  productCode={datum.productListingId}
                  showWishListButton={false}
                  ussId={datum.winningUssID}
                  onClick={this.onClick}
                  {...datum}
                />
              );
            })}
        </Carousel>
      </div>
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
