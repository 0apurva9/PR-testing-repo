import React from "react";
import styles from "./BagPageItem.css";
import ProductImage from "../../general/components/ProductImage.js";
import PropTypes from "prop-types";
import {
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  RUPEE_SYMBOL,
  NO,
  YES
} from "../../lib/constants";

const NOT_SERVICEABLE = "Not available at your PIN code";
const OUT_OF_STOCK = "Product is out of stock";
const NO_SIZE = "NO SIZE";
export default class BagPageItem extends React.Component {
  onClick() {
    if (this.props.onClickImage) {
      this.props.onClickImage();
    }
  }
  render() {
    let SizeType = this.props.sizeType ? this.props.sizeType : "Size";
    return (
      <div className={styles.base}>
        <div
          className={styles.productDescription}
          style={{ width: this.props.dataWith }}
        >
          {this.props.isGiveAway === NO &&
            (!this.props.isServiceAvailable
              ? localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE) && (
                  <div className={styles.serviceAvailabilityText}>
                    {NOT_SERVICEABLE}
                  </div>
                )
              : this.props.isOutOfStock && (
                  <div className={styles.serviceAvailabilityText}>
                    {OUT_OF_STOCK}
                  </div>
                ))}
          {this.props.productName && (
            <div className={styles.informationText}>
              {this.props.productName}
            </div>
          )}
          {this.props.productDetails && (
            <div className={styles.informationText}>
              {this.props.productDetails}
            </div>
          )}
          {this.props.isGiveAway === NO &&
            this.props.price && (
              <div className={styles.informationText}>
                {!this.props.offerPrice && (
                  <React.Fragment>
                    {` ${RUPEE_SYMBOL}${this.props.price}`}
                  </React.Fragment>
                )}
                {this.props.offerPrice && (
                  <React.Fragment>
                    {` ${RUPEE_SYMBOL}${this.props.offerPrice}`}{" "}
                    {this.props.offerPrice !== this.props.price && (
                      <span className={styles.offerPrice}>
                        {" "}
                        {` ${RUPEE_SYMBOL}${this.props.price}`}
                      </span>
                    )}
                  </React.Fragment>
                )}
              </div>
            )}
          {this.props.isGiveAway === YES && (
            <div className={styles.informationText}>Free</div>
          )}
          {this.props.size &&
            this.props.size.toUpperCase() !== NO_SIZE && (
              <div className={styles.informationText}>
                {`${SizeType}: ${this.props.size}`}
              </div>
            )}
          {this.props.color && (
            <div className={styles.informationText}>
              {`Color: ${this.props.color}`}
            </div>
          )}
          {this.props.quantity && (
            <div className={styles.informationText}>
              {`Quantity: ${this.props.quantity}`}
            </div>
          )}
          {this.props.exchangeDetails && (
            <div>
              <div className={styles.exchangeProductName}>
                <span>Exchange Product: </span>
                <span>{this.props.exchangeDetails.exchangeModelName}</span>
              </div>
              <div className={styles.exchangeCashback}>
                <span>Total Exchange Cashback: </span>
                <span>
                  {this.props.exchangeDetails.exchangePriceDetail &&
                    this.props.exchangeDetails.exchangePriceDetail
                      .totalExchangeCashback &&
                    this.props.exchangeDetails.exchangePriceDetail
                      .totalExchangeCashback.formattedValueNoDecimal}
                </span>
              </div>
              {this.props.pinCodeResponse &&
                this.props.pinCodeResponse.isPickupAvailableForExchange && (
                  <div className={styles.exchangePickup}>
                    <span>Pick up: Within 3 days of product delivery</span>
                    <span className={styles.spacer}>|</span>
                    {this.props.pinCodeResponse.pickupCharge &&
                    this.props.pinCodeResponse.pickupCharge.doubleValue ===
                      0 ? (
                      <span className={styles.freePickup}>FREE</span>
                    ) : (
                      <span>
                        {
                          this.props.pinCodeResponse.pickupCharge
                            .formattedValueNoDecimal
                        }
                      </span>
                    )}
                  </div>
                )}
            </div>
          )}
        </div>
        <div
          className={styles.productImage}
          style={{ width: this.props.width }}
        >
          <ProductImage
            image={this.props.productImage}
            onClickImage={() => this.onClick()}
          />
        </div>
      </div>
    );
  }
}
BagPageItem.propTypes = {
  productImage: PropTypes.string,
  productName: PropTypes.string,
  price: PropTypes.string,
  width: PropTypes.string,
  dataWith: PropTypes.string,
  productDetails: PropTypes.string
};
