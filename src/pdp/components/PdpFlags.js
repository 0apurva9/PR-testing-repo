import React from "react";
import styles from "./PdpFlags.css";
export default class PdpFlags extends React.Component {
  renderFlag = () => {
    if (this.props.outOfStock) {
      return (
        <div className={styles.overlay}>
          <div className={styles.base}>Out of Stock</div>
        </div>
      );
    } else if (this.props.newProduct === "Y") {
      return <div className={styles.new}>New</div>;
    } else if (
      (this.props.seasonSale && this.props.seasonSale.key === "Season") ||
      this.props.seasonTag
    ) {
      return (
        <div className={styles.basePdp}>
          {this.props.seasonSale
            ? this.props.seasonSale.value
            : this.props.seasonTag}
        </div>
      );
    } else if (this.props.onlineExclusive === "Y") {
      return <div className={styles.new}>New</div>;
    } else if (
      this.props.discountPercent &&
      this.props.discountPercent !== "0"
    ) {
      return (
        <div className={styles.offer}>
          {parseInt(this.props.discountPercent, 10)}% off{" "}
        </div>
      );
    } else if (this.props.isOfferExisting === "Y") {
      return <div className={styles.offer}>On offer</div>;
    } else {
      return null;
    }
  };
  render() {
    return <React.Fragment>{this.renderFlag()}</React.Fragment>;
  }
}
