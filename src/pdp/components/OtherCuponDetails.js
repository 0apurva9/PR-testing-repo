import React from "react";
import styles from "./OtherCuponDetails.css";
import PropTypes from "prop-types";
import { RUPEE_SYMBOL } from "../../lib/constants.js";
import { Link } from "react-router-dom";

export default class OtherCuponDetails extends React.Component {
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
      <div className={styles.base}>
        <div className={styles.cuponCard}>
          {
            <div className={styles.headerText}>
              <span className={styles.cuponCodeColor}>
                {this.props.promotionTitle}
              </span>
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
              <div className={styles.amountExpireHolder}>
                <div className={styles.dataHeader}>
                  Valid till:{" "}
                  <span className={styles.dataInformation}>{date}</span>
                </div>
              </div>
            )}
            {this.props.amount && (
              <div className={styles.amountExpireHolder}>
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
OtherCuponDetails.propTypes = {
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
    dateTime: PropTypes.string,
    promotionTitle: PropTypes.string,
    promotionDetail: PropTypes.object,
    tnc: PropTypes.string,
    amount: PropTypes.string
};
