import React from "react";
import ProductImage from "./ProductImage";
import ProductDescription from "./ProductDescription";
import PropTypes from "prop-types";
import ConnectButton from "./ConnectButton.js";
import styles from "./ProductModule.css";
import downloadIcon from "./img/download.svg";
import downloadIconWhite from "./img/downloadWhite.svg";
import ProductInfo from "./ProductInfo.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";

export default class ProductModule extends React.Component {
  onDownload = () => {
    if (this.props.onDownload) {
      this.props.onDownload();
    }
  };
  onClick = () => {
    console.log("ON CLICK");
    console.log(this.props.webURL);
    if (this.props.webURL) {
      const urlSuffix = this.props.webURL.replace(TATA_CLIQ_ROOT, "");
      this.props.history.push(urlSuffix);
    } else if (this.props.productListingId) {
      const urlSuffix = `p-${this.props.productListingId.toLowerCase()}`;
      this.props.history.push(urlSuffix);
    }
    if (this.props.onClick) {
      this.props.onClick();
    }
  };
  handleConnect = () => {
    if (this.props.onConnect) {
      this.props.onConnect();
    }
  };
  render() {
    let downloadImage = downloadIcon;
    if (this.props.isWhite) {
      downloadImage = downloadIconWhite;
    }
    return (
      <div className={styles.base} onClick={this.onClick}>
        <div
          className={
            this.props.view === "grid"
              ? styles.imageHolder
              : styles.ListimageHolder
          }
        >
          <ProductImage image={this.props.productImage} />
          {this.props.onConnect && (
            <ConnectButton onClick={this.handleConnect} />
          )}
        </div>
        <div
          className={
            this.props.view === "grid" ? styles.content : styles.Listcontent
          }
        >
          <ProductDescription
            {...this.props}
            icon={downloadImage}
            onDownload={this.onDownload}
          />
          {this.props.view === "list" && (
            <ProductInfo
              averageRating={4}
              totalNoOfReviews="65"
              offerText="25% offers from Rs. 35,000"
              bestDeliveryInfo="Tuesday, Sep 12"
            />
          )}
        </div>
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
  bestDeliveryInfo: PropTypes.string
};
ProductModule.defaultProps = {
  view: "grid"
};
