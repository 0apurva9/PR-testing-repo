import React from "react";
import ProductImage from "./ProductImage";
import ProductDescription from "./ProductDescription";
import PropTypes from "prop-types";
import ConnectButton from "./ConnectButton.js";
import styles from "./ProductModule.css";
import downloadIcon from "./img/download.svg";
import downloadIconWhite from "./img/downloadWhite.svg";
import ProductInfo from "./ProductInfo.js";
import ProductFlags from "./ProductFlags.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { Link } from "react-router-dom";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import { widgetsTracking } from "../../lib/adobeUtils";

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
  handleClickOnLink = event => {
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
  render() {
    let electronicView =
      this.props.productCategory &&
      this.props.productCategory === "Electronics";
    let downloadImage = downloadIcon;
    if (this.props.isWhite) {
      downloadImage = downloadIconWhite;
    }
    return (
      <div
        className={electronicView ? styles.electronicsBase : styles.base}
        onClick={this.onClick}
        id={`ProductModule-${this.props.productId}`}
      >
        {/* Need this atag for SEO stuff.The click event for this exists at the component level.The click on the atag is halted using pointer events  */}

        <div
          className={
            electronicView
              ? styles.electronicImageAndDescriptionWrapper
              : styles.imageAndDescriptionWrapper
          }
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
                  outOfStock={this.props.outOfStock}
                  newProduct={this.props.newProduct}
                />
              </div>
            </div>
          </a>
          <div
            className={
              electronicView
                ? styles.electronicViewContent
                : this.props.view === "grid"
                  ? styles.content
                  : styles.Listcontent
            }
          >
            <ProductDescription
              {...this.props}
              electronicView={electronicView}
            />

            {this.props.view === "list" && (
              <ProductInfo
                electronicView={electronicView}
                averageRating={this.props.averageRating}
                totalNoOfReviews={this.props.totalNoOfReviews}
                offerText={this.props.offerText}
                bestDeliveryInfo={this.props.bestDeliveryInfo}
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
                        <div className={styles.productFeature}>{val.value}</div>
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
              onClick={event => this.handleClickOnLink(event)}
            >
              <div className={styles.dummyDiv} />
            </Link>
          </DesktopOnly>
        </React.Fragment>
      </div>
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
