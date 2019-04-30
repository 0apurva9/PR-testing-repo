import React from "react";
import Carousel from "../../general/components/Carousel";
import MediaQuery from "react-responsive";
import ProductModule from "../../general/components/ProductModule";
import PropTypes from "prop-types";
import styles from "./FeedComponent.css";
import { withRouter } from "react-router";

class FeedComponentABPC extends React.Component {
  constructor() {
    super();
    this.state = {
      eachPrductData: ""
    };
  }
  onClick = val => {
    this.props.history.push(val);
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
    if (this.props.clickOnSearchPage) {
      this.props.clickOnSearchPage;
    }
  };

  componentDidMount() {
    let productDataArr = "";
    let currentComponent = this;
    this.props.data.then(function(res) {
      if (
        res.results &&
        (typeof res.results !== undefined || res.results !== null)
      ) {
        productDataArr = Array.from(res.results);
        currentComponent.setState({ eachPrductData: productDataArr });
      }
    });
  }

  render() {
    console.log(this.state.eachPrductData);
    const {
      data,
      carouselOptions,
      banner,
      backgroundColor,
      backgroundImage,
      ...rest
    } = this.props;

    if (!(data instanceof Array)) {
      // return null;
    }
    let baseClass = styles.base;
    let productHolder = styles.bannerProductHolder;
    if (backgroundColor) {
      productHolder = styles.productHolder;
    }
    if (this.props.positionInFeed === 1) {
      baseClass = styles.firstItemBase;
    }
    if (
      this.props.carouselOptions &&
      this.props.carouselOptions.header &&
      this.props.carouselOptions.header.toLowerCase() === "top picks for you"
    ) {
      baseClass = styles.baseSearchPage;
      productHolder = styles.productHolderSearchPage;
    }
    return (
      <div
        className={baseClass}
        style={{
          backgroundColor: backgroundColor,
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <MediaQuery query="(max-device-width: 1024px)">
          {banner && <div className={styles.banner}>{banner}</div>}
        </MediaQuery>
        <div className={productHolder}>
          <Carousel
            {...carouselOptions}
            banner={banner}
            bannerWidth="42%"
            elementWidthDesktop={33.333}
          >
            {this.state.eachPrductData &&
              this.state.eachPrductData.map((datum, i) => {
                return (
                  <ProductModule
                    key={i}
                    isWhite={
                      carouselOptions
                        ? carouselOptions.isWhite
                          ? carouselOptions.isWhite
                          : false
                        : false
                    }
                    recentlyViewed={
                      this.props.recentlyViewed
                        ? this.props.recentlyViewed
                        : null
                    }
                    productImage={datum.imageUrl}
                    title={datum.productName}
                    price={datum.mrp}
                    discountPrice={datum.winningSellerMOP}
                    description={datum.description}
                    onDownload={datum.onDownload}
                    webURL={datum.webURL}
                    productId={datum.productListingId}
                    showWishListButton={false}
                    ussId={datum.winningUssID}
                    onClick={this.onClick}
                    {...rest}
                    {...datum}
                    widgetName={
                      this.props.widgetName
                        ? this.props.widgetName
                        : this.props.carouselOptions &&
                          this.props.carouselOptions.header
                    }
                    sourceOfWidget={this.props.sourceOfWidget}
                  />
                );
              })}
          </Carousel>
        </div>
      </div>
    );
  }
}

export default withRouter(FeedComponentABPC);
FeedComponentABPC.propTypes = {
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
