import React from "react";
import styles from "./CuponDetails.css";
import CheckBox from "../../general/components/CheckBox.js";
import PropTypes from "prop-types";
import { RUPEE_SYMBOL } from "../../lib/constants.js";
import { Link } from "react-router-dom";

const COUPON_TYPE = "COUPON";
export default class CuponDetails extends React.Component {
  handleClick() {
    if (this.props.couponType === COUPON_TYPE) {
      if (this.props.selectItem) {
        this.props.selectItem();
      }
    }
  }

  render() {
    let date;
    let couponExpiryDate =
      this.props.dateTime && this.props.dateTime.split(" ");
    if (couponExpiryDate) {
      date =
        couponExpiryDate[2] +
        " " +
        couponExpiryDate[1] +
        " " +
        couponExpiryDate[5];
    }
    return (
      <div
        className={styles.base}
        data-test={`single-coupon-section-${this.props.promotionTitle}`}
      >
        <div className={styles.cuponCard}>
          {
            <div className={styles.headerText}>
              <span className={styles.cuponCodeColor}>
                {this.props.promotionTitle}
              </span>
              {this.props.couponType === COUPON_TYPE && this.props.selectItem && (
                <div
                  className={styles.checkBoxHolder}
                  onClick={val => this.handleClick(val)}
                  data-test={`coupon-radio-btn-${this.props.promotionTitle}`}
                >
                  <CheckBox selected={this.props.selected} />
                </div>
              )}
            </div>
          }
          <div className={styles.promotionDetailsText}>
            {this.props.promotionDetail}
            {this.props.tnc ? (
              <Link
                className={styles.viewtnc}
                to={this.props.tnc}
                target="_blank"
              >
                View T&C
              </Link>
            ) : null}
          </div>

          <div className={styles.dataHolder}>
            {this.props.dateTime && (
              <div
                className={styles.amountExpireHolder}
                data-test={`valid-till-date-${this.props.promotionTitle}`}
              >
                <div className={styles.dataHeader}>
                  Valid till:{" "}
                  <span className={styles.dataInformation}>{date}</span>
                </div>
              </div>
            )}
            {this.props.amount && (
              <div
                className={styles.amountExpireHolder}
                data-test={`max-discount-${this.props.promotionTitle}`}
              >
                <div className={styles.dataHeader}>
                  Max Discount:{" "}
                  <span className={styles.dataInformation}>
                    {RUPEE_SYMBOL}
                    {this.props.amount}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
CuponDetails.propTypes = {
  productOfferPromotion: PropTypes.arrayOf(
    PropTypes.shape({
      promotionTitle: PropTypes.string,
      promotionDetail: PropTypes.string,
      formattedDate: PropTypes.string,
      amount: PropTypes.string,
      selectItem: PropTypes.func,
      selected: PropTypes.bool
    })
  ),
  couponType: PropTypes.string,
  selectItem: PropTypes.func,
  dateTime: PropTypes.string,
  promotionTitle: PropTypes.string,
  selected: PropTypes.bool,
  promotionDetail: PropTypes.string,
  tnc: PropTypes.string,
  amount: PropTypes.string
};
