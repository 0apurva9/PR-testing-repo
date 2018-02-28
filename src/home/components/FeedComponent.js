import React from "react";
import Carousel from "../../general/components/Carousel";
import MediaQuery from "react-responsive";
import ProductModule from "../../general/components/ProductModule";
import PropTypes from "prop-types";
import styles from "./FeedComponent.css";

export default class FeedComponent extends React.Component {
  render() {
    return (
      <div
        className={styles.base}
        style={{
          backgroundColor: this.props.backgroundColor,
          backgroundImage: `url(${this.props.backgroundImage})`
        }}
      >
        <MediaQuery query="(max-device-width: 1024px)">
          {this.props.banner && (
            <div className={styles.banner}>{this.props.banner}</div>
          )}
        </MediaQuery>
        <Carousel
          {...this.props.carouselOptions}
          banner={this.props.banner}
          bannerWidth="42%"
          elementWidthDesktop={33.333}
        >
          {this.props.data &&
            this.props.data.map((datum, i) => {
              return (
                <ProductModule
                  key={i}
                  isWhite={
                    this.props.carouselOptions
                      ? this.props.carouselOptions.isWhite
                        ? this.props.carouselOptions.isWhite
                        : false
                      : false
                  }
                  productImage={datum.image}
                  title={datum.title}
                  price={datum.price}
                  discountPrice={datum.discountPrice}
                  description={datum.description}
                  onDownload={datum.onDownload}
                  onClick={datum.onClick}
                />
              );
            })}
        </Carousel>
      </div>
    );
  }
}
FeedComponent.propTypes = {
  backgroundColor: PropTypes.string,
  banner: PropTypes.element,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.string,
      discountPrice: PropTypes.string,
      description: PropTypes.string,
      onDownload: PropTypes.func,
      onClick: PropTypes.func
    })
  ),
  carouselOptions: PropTypes.shape({
    elementWidthDesktop: PropTypes.number,
    elementWidthMobile: PropTypes.number,
    buttonText: PropTypes.string,
    header: PropTypes.string,
    isWhite: PropTypes.bool,
    seeAll: PropTypes.func
  })
};
