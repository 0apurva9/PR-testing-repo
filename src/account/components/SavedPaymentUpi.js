import React from "react";
import PropTypes from "prop-types";
import styles from "./SavedPaymentCard.css";
export default class SavedPaymentUpi extends React.Component {
  removeSavedUpiDetails = () => {
    if (this.props.removeSavedUpiDetails) {
      this.props.removeSavedUpiDetails();
    }
  };

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.paymentDetailsHolder}>
          <div className={styles.cardNameNumberAndValidityHolder}>
            <div className={styles.cardNumberHolder}>
              <div className={styles.cardDataHolder}>
                <div className={styles.dataHolder}>{this.props.upiId}</div>
              </div>
            </div>
            <div
              className={styles.removeUpi}
              onClick={() => this.removeSavedUpiDetails()}
            >
              Remove
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SavedPaymentUpi.propTypes = {
  upiId: PropTypes.string
};
