import React from "react";
import PropTypes from "prop-types";
import styles from "./SavedPaymentUpi.css";
import { setDataLayer, SET_DATA_LAYER_UID_REMOVE } from "../../lib/adobeUtils";
export default class SavedPaymentUpi extends React.Component {
  removeSavedUpiDetails = () => {
    if (this.props.removeSavedUpiDetails) {
      this.props.removeSavedUpiDetails();
      setDataLayer(SET_DATA_LAYER_UID_REMOVE);
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
  upiId: PropTypes.string,
  removeSavedUpiDetails: PropTypes.func.isRequired
};
