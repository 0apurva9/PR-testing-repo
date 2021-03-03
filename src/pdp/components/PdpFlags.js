import React from "react";
import styles from "./PdpFlags.css";
import beautyFlag from "./img/beautyFlag.png";
export default class PdpFlags extends React.Component {
  renderBeautyPdpOffer(offerName) {
    return (
      <div className={styles["new-arrival-component"]}>
        <div
          className={styles["new-arrival-block"]}
          style={{ backgroundImage: `url(${beautyFlag})` }}
        >
          {offerName}
        </div>
      </div>
    );
  }

  renderFlag = () => {
    if (this.props.outOfStock) {
      if (this.props.isBeautyPdp) {
        return this.renderBeautyPdpOffer("Out of Stock");
      } else {
        return (
          <div className={styles.overlay}>
            <div className={styles.base}>Out of Stock</div>
          </div>
        );
      }
    } else if (
      this.props.showExchangeTag &&
      this.props.exchangeOfferAvailable
    ) {
      if (this.props.isBeautyPdp) {
        return this.renderBeautyPdpOffer("Offers on Exchange");
      } else {
        return <div className={styles.exchangeOffer}>Offers on Exchange</div>;
      }
    } else if (this.props.newProduct === "Y") {
      if (this.props.isBeautyPdp) {
        return this.renderBeautyPdpOffer("New Arrival");
      } else {
        return <div className={styles.new}>New</div>;
      }
    } else if (
      (this.props.seasonSale && this.props.seasonSale.key === "Season") ||
      this.props.seasonTag
    ) {
      if (
        this.props.isBeautyPdp &&
        this.props.seasonSale &&
        this.props.seasonSale.value
      ) {
        return this.renderBeautyPdpOffer(`${this.props.seasonSale.value}`);
      } else if (this.props.isBeautyPdp && this.props.seasonTag) {
        return this.renderBeautyPdpOffer(`${this.props.seasonTag}`);
      } else {
        return (
          <div className={styles.basePdp}>
            {this.props.seasonSale
              ? this.props.seasonSale.value
              : this.props.seasonTag}
          </div>
        );
      }
    } else if (this.props.onlineExclusive === "Y") {
      if (this.props.isBeautyPdp) {
        return this.renderBeautyPdpOffer("New Arrival");
      } else {
        return <div className={styles.new}>New</div>;
      }
    }
    //bundled offer tag
    else if (this.props.discountPercent && this.props.discountPercent !== "0") {
      if (this.props.isBeautyPdp) {
        const discountToShow = `${parseInt(
          this.props.discountPercent,
          10
        )}% off`;
        return this.renderBeautyPdpOffer(discountToShow);
      } else {
        return (
          <div className={styles.offer}>
            {parseInt(this.props.discountPercent, 10)}% off{" "}
          </div>
        );
      }
    } else if (this.props.isOfferExisting === "Y") {
      if (this.props.isBeautyPdp) {
        return this.renderBeautyPdpOffer("On Offer");
      } else {
        return <div className={styles.offer}>On offer</div>;
      }
    } else {
      return null;
    }
  };

  render() {
    return <React.Fragment>{this.renderFlag()}</React.Fragment>;
  }
}
