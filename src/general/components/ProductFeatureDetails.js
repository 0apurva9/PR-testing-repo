import React, { Component } from "react";
import styles from "./ProductFeatureDetails.css";
import DesktopOnly from "../../general/components/DesktopOnly";
import { RUPEE_SYMBOL } from "../../lib/constants";
export default class ProductFeatureDetails extends Component {
  render() {
    console.log("this.props", this.props);
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
                    <div className={this.props.priceClass}>
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
              </div>
            </React.Fragment>
            <div className={styles.offerList}>
              <li>No Cost EMI starting from ₹3,158/month</li>
              <li>No Cost EMI starting from ₹3,158/month</li>
              <li>No Cost EMI starting from ₹3,158/month</li>
              <li>No Cost EMI starting from ₹3,158/month</li>
            </div>
          </div>
          <div className={styles.featureContainer}>
            <div className={styles.featureHeader}>
              <h3>Features</h3>
            </div>
            <div className={styles.featureList}>
              {this.props &&
                this.props.plpAttrMap &&
                this.props.plpAttrMap.map(key => {
                  return (
                    <div>
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
