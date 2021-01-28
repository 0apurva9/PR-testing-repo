import React, { Component } from "react";
import styles from "./ProductFeatureDetails.css";
import DesktopOnly from "../../general/components/DesktopOnly";
import { RUPEE_SYMBOL } from "../../lib/constants";
import EMITag from "./img/emi-tag.svg";
import Icon from "../../xelpmoc-core/Icon";
export default class ProductFeatureDetails extends Component {
  voucherList() {
    if (this.props.offerData && this.props.offerData.voucherList) {
      return (
        <div>
          {this.props.offerData.voucherList &&
            this.props.offerData.voucherList.map((val, i) => {
              return (
                <div key={i}>
                  <div className={styles.offerIconHolder}>
                    {" "}
                    <Icon image={EMITag} size={20} />
                  </div>{" "}
                  <div className={styles.plpOfferTitle}>{val.name}</div>
                </div>
              );
            })}
        </div>
      );
    }
  }

  renderOfferData() {
    if (this.props.offerData && this.props.electronicView) {
      if (
        this.props.offerData.ncEmi &&
        this.props.offerData.ncEmi.isNoCostEmi
      ) {
        return (
          <div className={styles.nceHolder}>
            <div className={styles.offerIconHolder}>
              {" "}
              <Icon image={EMITag} size={20} />{" "}
            </div>
            <div className={styles.plpEMITitle}>
              No Cost EMI{" "}
              <span className={styles.plpEMItext}>starting from</span>{" "}
              {RUPEE_SYMBOL}{" "}
              {this.props.offerData.ncEmi.nceStartingPrice &&
                this.props.offerData.ncEmi.nceStartingPrice}/month
            </div>
            <div className={styles.offerData}>{this.voucherList()}</div>
          </div>
        );
      }
      if (
        (this.props.offerData.ncEmi &&
          !this.props.offerData.ncEmi.isNoCostEmi) ||
        !this.props.offerData.ncEmi
      ) {
        if (this.props.offerData.sdEmi && this.props.offerData.sdEmi.isSdEmi) {
          return (
            <div className={styles.offerData}>
              <div className={styles.offerIconHolder}>
                <Icon image={EMITag} size={20} />
              </div>
              <div className={styles.plpEMITitle}>
                Standard EMI{" "}
                <span className={styles.plpEMItext}>starting from</span>{" "}
                {RUPEE_SYMBOL}{" "}
                {this.props.offerData.sdEmi.seStartingPrice &&
                  this.props.offerData.sdEmi.seStartingPrice}/month
              </div>
              <div className={styles.offerData}>{this.voucherList()}</div>
            </div>
          );
        } else {
          return <div className={styles.offerData}>{this.voucherList()}</div>;
        }
      }
    }
  }

  render() {
    let priceClass = styles.discount;
    if (
      this.props.discountPrice &&
      this.props.price !== this.props.discountPrice
    ) {
      priceClass = styles.electronicPriceCancelled;
    }

    return (
      <DesktopOnly>
        <div className={styles.base}>
          <div className={styles.offerContainer}>
            <React.Fragment>
              <div className={styles.elctronicPrize}>
                {!this.props.isRange &&
                  this.props.discountPrice &&
                  this.props.discountPrice !== this.props.price && (
                    <div className={styles.discount}>
                      <h3>
                        {" "}
                        {this.props.discountPrice
                          .toString()
                          .includes(RUPEE_SYMBOL)
                          ? this.props.discountPrice
                          : `${RUPEE_SYMBOL}${Math.floor(
                              this.props.discountPrice
                            )}`}
                      </h3>
                    </div>
                  )}

                {!this.props.isRange &&
                  this.props.price && (
                    <div className={priceClass}>
                      <h3>
                        {" "}
                        {this.props.price.toString().includes(RUPEE_SYMBOL)
                          ? this.props.price
                          : `${RUPEE_SYMBOL}${Math.floor(this.props.price)}`}
                      </h3>
                    </div>
                  )}
                {!this.props.isRange &&
                  this.props.mrpPrice &&
                  typeof this.props.mrpPrice !== "object" && (
                    <div className={this.props.priceClass}>
                      <h3>
                        {" "}
                        {this.props.mrpPrice.toString().includes(RUPEE_SYMBOL)
                          ? this.props.mrpPrice
                          : `${RUPEE_SYMBOL}${Math.floor(this.props.mrpPrice)}`}
                      </h3>
                    </div>
                  )}
                {this.props.discountPercent &&
                this.props.price !== this.props.discountPrice &&
                this.props.discountPercent !== "0" ? (
                  <div
                    className={
                      this.props.electronicView
                        ? styles.discountPLPElectronicsClass
                        : styles.discountClass
                    }
                  >
                    {!this.props.noBrace && `${"("}`}
                    {parseInt(this.props.discountPercent) + `${"% OFF"}`}
                    {!this.props.noBrace && `${")"}`}
                  </div>
                ) : null}
              </div>
            </React.Fragment>
            <div className={styles.offerList}>{this.renderOfferData()}</div>
          </div>
          <div className={styles.featureContainer}>
            <div className={styles.featureList}>
              <div className={styles.featureHeader}>
                {this.props && this.props.plpAttrMap && <h3>Features</h3>}
              </div>
              {this.props &&
                this.props.plpAttrMap &&
                this.props.plpAttrMap.map((key, i) => {
                  return (
                    <div key={i}>
                      <li className={styles.elctronicList}>
                        {key.key} :
                        {key.value}
                      </li>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </DesktopOnly>
    );
  }
}
