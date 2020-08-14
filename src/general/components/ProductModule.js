import React from "react";
import ProductImage from "./ProductImage";
import ProductDescription from "./ProductDescription";
import PropTypes from "prop-types";
import ConnectButton from "./ConnectButton.js";
import styles from "./ProductModule.css";
import ProductInfo from "./ProductInfo.js";
import ProductFlags from "./ProductFlags.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { Link } from "react-router-dom";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import {
  widgetsTracking,
  setDataLayer,
  ADOBE_SIMILAR_PRODUCTS_PLP,
  ADOBE_CLICK_ON_PRODUCTS_PLP_WITH_EXCHANGE,
  ADOBE_CLICK_ON_PRODUCTS_PLP_WITHOUT_EXCHANGE
} from "../../lib/adobeUtils";
import Icon from "../../xelpmoc-core/Icon";
import similarIcon from "../../general/components/img/similarIcon.svg";
import AddToWishListButtonContainer from "../../wishlist/containers/AddToWishListButtonContainer";
import { isBrowser } from "browser-or-node";
const ELECTRONICS = "Electronics";

export default class ProductModule extends React.Component {
  onDownload = () => {
    if (this.props.onDownload) {
      this.props.onDownload();
    }
  };
  getProductURL() {
    let urlSuffix;
    if (this.props.webURL) {
      urlSuffix = this.props.webURL.replace(TATA_CLIQ_ROOT, "$1");
    } else if (this.props.productId) {
      urlSuffix = `/p-${this.props.productId.toLowerCase()}`;
    } else if (this.props.productListingId) {
      urlSuffix = `/p-${this.props.productListingId.toLowerCase()}`;
    }
    return urlSuffix;
  }
  handleClickOnLink = (event, exchangeOfferAvailable) => {
    if (exchangeOfferAvailable) {
      setDataLayer(
        ADOBE_CLICK_ON_PRODUCTS_PLP_WITH_EXCHANGE,
        this.props.productId
      );
    } else {
      setDataLayer(
        ADOBE_CLICK_ON_PRODUCTS_PLP_WITHOUT_EXCHANGE,
        this.props.productId
      );
    }

    event.preventDefault();
  };
  onClick = val => {
    if (this.props.widgetName && this.props.productId) {
      widgetsTracking({
        widgetName: this.props.widgetName,
        productId: this.props.productId,
        sourceOfWidget: this.props.sourceOfWidget,
        PositionOfProduct: this.props.key + 1
      });
    }
    if (this.props.onClick) {
      this.props.onClick(
        this.getProductURL(),
        null,
        `ProductModule-${this.props.productId}`
      );
    }
  };
  handleConnect = () => {
    if (this.props.onConnect) {
      this.props.onConnect();
    }
  };

  onClickSimilar() {
    setDataLayer(ADOBE_SIMILAR_PRODUCTS_PLP, this.props.productListings);
    this.props.setviewSimilarProductsOfId(this.props.productId);
    this.props.showSimilarProducts();
  }
  showSimilarIcons = eview => {
    let similarButton =
      this.props.view === "grid" ? styles.display4by4 : styles.display3by3;
    if (this.props.productCategory === ELECTRONICS) {
      return null;
    } else {
      return (
        <div className={similarButton} onClick={e => this.onClickSimilar()}>
          <Icon image={similarIcon} size={17} backgroundSize="auto 16px" />
        </div>
      );
    }
  };

  render() {
    // let electronicView =
    //   this.props.productListings &&
    //   this.props.productListings.facetdatacategory &&
    //   this.props.productListings.facetdatacategory.filters &&
    //   this.props.productListings.facetdatacategory.filters[0] &&
    //   this.props.productListings.facetdatacategory.filters[0].categoryName ===
    //     "Electronics";
    let electronicView = false;

    //  let downloadImage = downloadIcon;
    // if (this.props.isWhite) {
    //   downloadImage = downloadIconWhite;
    // }
    let href = this.getProductURL();
    if (isBrowser) {
      href = `${window.location.origin}${href}`;
    }

    return (
      <React.Fragment>
        {!electronicView &&
          this.props.shouldShowSimilarIcon &&
          this.showSimilarIcons(electronicView)}

        <div
          className={electronicView ? styles.electronicsBase : styles.base}
          onClick={this.onClick}
          id={`ProductModule-${this.props.productId}`}
        >
          {/* Need this atag for SEO stuff.The click event for this exists at the component level.The click on the atag is halted using pointer events  */}
          {electronicView && (
            <div className={styles.electronicViewButton}>
              <AddToWishListButtonContainer
                productListingId={this.props.productId}
                winningUssID={this.props.winningUssID}
                productListings={this.props.productListings}
                isWhite={this.props.isWhite}
                size={17}
                ussid={this.props.ussid}
              />
            </div>
          )}
          {/* Need this atag for SEO stuff.The click event for this exists at the component level.The click on the atag is halted using pointer events  */}
          <div
            className={
              electronicView
                ? styles.electronicImageAndDescriptionWrapper
                : styles.imageAndDescriptionWrapper
            }
          >
            <a
              href={href}
              className={styles.aTag}
              style={{ pointerEvents: "none" }}
              title={this.props.alt}
            >
              <a
                href={`${window.location.origin}${this.getProductURL()}`}
                className={styles.aTag}
                style={{ pointerEvents: "none" }}
                title={this.props.alt}
              >
                <div
                  className={
                    electronicView
                      ? styles.ElectronicListimageHolder
                      : this.props.view === "grid"
                        ? styles.imageHolder
                        : styles.ListimageHolder
                  }
                >
                  <ProductImage
                    alt={this.props.alt}
                    image={this.props.productImage}
                    electronicView={electronicView}
                  />

                  {this.props.onConnect && (
                    <ConnectButton onClick={this.handleConnect} />
                  )}

                  <div className={styles.flagHolder}>
                    <ProductFlags
                      discountPercent={this.props.discountPercent}
                      isOfferExisting={this.props.isOfferExisting}
                      onlineExclusive={this.props.onlineExclusive}
                      seasonTag={this.props.seasonTag}
                      outOfStock={this.props.outOfStock}
                      newProduct={this.props.newProduct}
                      showExchangeTag={this.props.showExchangeTag}
                      exchangeOfferAvailable={this.props.exchangeOfferAvailable}
                    />
                  </div>
                </div>
              </a>
            </a>
            <div
              className={
                electronicView
                  ? styles.electronicViewContent
                  : this.props.autoWidget
                    ? styles.contentAutoWidget
                    : this.props.view === "grid"
                      ? styles.content
                      : styles.Listcontent
              }
            >
              <ProductDescription
                {...this.props}
                electronicView={electronicView}
                autoWidget={this.props.autoWidget}
              />
              {this.props &&
                !this.props.widgetName &&
                this.props.widgetName === undefined && (
                  <ProductInfo
                    isPlp={this.props.isPlp}
                    electronicView={electronicView}
                    averageRating={this.props.averageRating}
                    ratingCount={this.props.ratingCount}
                    offerText={this.props.offerText}
                    bestDeliveryInfo={this.props.bestDeliveryInfo}
                    maxExchangePrice={this.props.maxExchangePrice}
                  />
                )}
            </div>
          </div>
          <React.Fragment>
            <MobileOnly>
              {this.props.view === "list" && (
                <div>
                  {this.props.plpAttrMap && (
                    <div className={styles.productFeatureHolder}>
                      {this.props.plpAttrMap.map((val, i) => {
                        return (
                          <div className={styles.productFeature}>
                            {val.value}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </MobileOnly>
            <DesktopOnly>
              <Link
                to={{
                  pathname: `${this.getProductURL()}`
                }}
                target="_blank"
                title={this.props.alt}
                onClick={event =>
                  this.handleClickOnLink(
                    event,
                    this.props.exchangeOfferAvailable
                  )
                }
              >
                <div className={styles.dummyDiv} />
              </Link>
            </DesktopOnly>
          </React.Fragment>
        </div>
      </React.Fragment>
    );
  }
}
ProductModule.propTypes = {
  productImage: PropTypes.string,
  onClick: PropTypes.func,
  onDownload: PropTypes.func,
  isWhite: PropTypes.bool,
  onConnect: PropTypes.func,
  averageRating: PropTypes.number,
  totalNoOfReviews: PropTypes.number,
  offerText: PropTypes.string,
  bestDeliveryInfo: PropTypes.string,
  onOffer: PropTypes.bool,
  isPlp: PropTypes.bool
};
ProductModule.defaultProps = {
  view: "grid",
  showWishListButton: true,
  isPlp: false
};
