import React from "react";
import styles from "./ProductFlags.css";
import newFlag from "./img/new.svg";
import offerFlag from "./img/offer.svg";
import offerplpFlag from "./img/offerplp.svg";
import exchangeOfferFlag from "./img/exchangeOffer.svg";
import exclusiveFlag from "./img/exclusive.svg";
export default class ProductFlags extends React.Component {
  renderFlag = () => {
    if (this.props.outOfStock) {
      return (
        <div className={styles.overlay}>
          <div
            className={styles.base}
            style={{ backgroundImage: `url(${newFlag})` }}
          >
            Out of Stock
          </div>
        </div>
      );
    } else if (
      this.props.showExchangeTag &&
      this.props.exchangeOfferAvailable &&
      this.props.maxExchangeBumpUp &&
      this.props.maxExchangeBumpUp.doubleValue &&
      this.props.maxExchangeBumpUp.doubleValue !== 0 &&
      this.props.maxExchangeBumpUp.formattedValueNoDecimal
    ) {
      return (
        <div
          className={styles.base}
          style={{ backgroundImage: `url(${exchangeOfferFlag})` }}
        >
          Extra {this.props.maxExchangeBumpUp.formattedValueNoDecimal} on
          Exchange
        </div>
      );
    } else if (this.props.newProduct) {
      return (
        <div
          className={styles.base}
          style={{ backgroundImage: `url(${newFlag})` }}
        >
          New
        </div>
      );
    } else if (
      (this.props.seasonSale && this.props.seasonSale.key === "Season") ||
      this.props.seasonTag
    ) {
      return (
        <div
          className={styles.basePdp}
          style={{ backgroundImage: `url(${offerFlag})` }}
        >
          {this.props.seasonSale
            ? this.props.seasonSale.value
            : this.props.seasonTag}
        </div>
      );
    } else if (this.props.onlineExclusive) {
      return (
        <div
          className={styles.base}
          style={{ backgroundImage: `url(${exclusiveFlag})` }}
        >
          New
        </div>
      );
    } else if (
      this.props.discountPercent &&
      this.props.discountPercent !== "0"
    ) {
      return (
        <div
          className={styles.base}
          style={{ backgroundImage: `url(${offerFlag})` }}
        >
          {parseInt(this.props.discountPercent, 10)}% off{" "}
        </div>
      );
    } else if (this.props.isOfferExisting) {
      return (
        <div
          className={styles.base}
          style={{ backgroundImage: `url(${offerplpFlag})` }}
        >
          On offer
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    return <React.Fragment>{this.renderFlag()}</React.Fragment>;
  }
}
