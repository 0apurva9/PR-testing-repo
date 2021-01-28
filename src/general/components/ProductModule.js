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
const VARIANT_REGEX = /^\d+\s[A-Za-z]+$/;
const TEST_FOR_NUMBER_REGEX = /(\d+)/;
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

  onClick = () => {
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

  showSimilarIcons = () => {
    let similarButton =
      this.props.view === "grid" ? styles.display4by4 : styles.display3by3;
    if (this.props.productCategory === ELECTRONICS) {
      return null;
    } else {
      return (
        <div className={similarButton} onClick={() => this.onClickSimilar()}>
          <Icon image={similarIcon} size={17} backgroundSize="auto 16px" />
        </div>
      );
    }
  };

  sanitizeVariantString = (el, multiVariant = false) => {
    let variantCount = 0;
    if (el && el.length > 0) {
      if (TEST_FOR_NUMBER_REGEX.test(el)) {
        let match = el.trim().match(VARIANT_REGEX);
        if (match && match.length > 0) {
          variantCount = match[0].match(TEST_FOR_NUMBER_REGEX);
          // check if the count of variant is > 1
          if (variantCount[0] > 1) {
            if (multiVariant) {
              return match[0].toString();
            } else {
              return [match[0]];
            }
          } else {
            return [];
          }
        } else {
          return [];
        }
      } else {
        return [];
      }
    } else return [];
  };

  render() {
    let numberOfVariants = [];
    let rawVariantCount = this.props.variantCount
      ? this.props.variantCount
      : "";
    // check if rawVariantCount has something in it
    if (rawVariantCount && rawVariantCount.length > 0) {
      // multivariant case
      if (rawVariantCount.includes("|")) {
        numberOfVariants = rawVariantCount.split("|").map(el => {
          return this.sanitizeVariantString(el, true);
        });
      }
      // non-multivariant case
      else {
        numberOfVariants = this.sanitizeVariantString(rawVariantCount);
      }
    }
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

        {numberOfVariants && numberOfVariants.length > 0 && (
          <div
            className={[
              styles.sizesBlock,
              this.props.view === "grid" ? styles.topGrid : styles.topList
            ].join(" ")}
          >
            <div className={styles.sizesBlockContent}>
              {numberOfVariants.map(el => {
                if (el && el.length > 0) {
                  return <div className={styles.variantString}>{el}</div>;
                } else return null;
              })}
            </div>
          </div>
        )}

        <div
          className={
            electronicView
              ? styles.electronicsBase
              : this.props.autoWidget
              ? styles.whiteBase
              : styles.base
          }
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
                      maxExchangeBumpUp={this.props.maxExchangeBumpUp}
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
              {this.props.price && (
                <ProductDescription
                  {...this.props}
                  electronicView={electronicView}
                  autoWidget={this.props.autoWidget}
                />
              )}
              {this.props &&
                !this.props.widgetName &&
                !this.props.autoWidget &&
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
                          <div className={styles.productFeature} key = {i}>
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
  isPlp: PropTypes.bool,
  webURL: PropTypes.string,
  productId: PropTypes.string,
  productListingId: PropTypes.string,
  widgetName: PropTypes.string,
  sourceOfWidget: PropTypes.string,
  key: PropTypes.number,
  productListings: PropTypes.array,
  setviewSimilarProductsOfId: PropTypes.func,
  showSimilarProducts: PropTypes.func,
  view: PropTypes.string,
  productCategory: PropTypes.string,
  variantCount: PropTypes.number,
  shouldShowSimilarIcon: PropTypes.bool,
  autoWidget: PropTypes.bool,
  winningUssID: PropTypes.string,
  ussid: PropTypes.string,
  alt: PropTypes.string,
  discountPercent: PropTypes.string,
  isOfferExisting: PropTypes.bool,
  onlineExclusive: PropTypes.string,
  seasonTag: PropTypes.string,
  outOfStock: PropTypes.bool,
  newProduct: PropTypes.bool,
  exchangeOfferAvailable: PropTypes.bool,
  showExchangeTag: PropTypes.bool,
  maxExchangeBumpUp: PropTypes.object,
  ratingCount: PropTypes.number,
  maxExchangePrice: PropTypes.object,
  plpAttrMap: PropTypes.array,
  price: PropTypes.string
};
ProductModule.defaultProps = {
  view: "grid",
  showWishListButton: true,
  isPlp: false
};
