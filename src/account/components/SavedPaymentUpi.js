import React from "react";
import PropTypes from "prop-types";
import styles from "./SavedPaymentCard.css";
import SavedCardItemFooter from "./SavedCardItemFooter.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
export default class SavedPaymentUpi extends React.Component {
  replaceItem() {
    if (this.props.replaceItem) {
      this.props.replaceItem();
    }
  }

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
          </div>
          <DesktopOnly>
            <React.Fragment>
              <SavedCardItemFooter
                buttonLabel="Remove"
                underlineButtonLabel="Edit"
                removeSavedUpiDetails={() => this.removeSavedUpiDetails()}
              />
            </React.Fragment>
          </DesktopOnly>
        </div>
        <MobileOnly>
          <div className={styles.actionHolder}>
            <SavedCardItemFooter
              buttonLabel="Remove"
              underlineButtonLabel="Edit"
              removeSavedUpiDetails={() => this.removeSavedUpiDetails()}
            />
          </div>
        </MobileOnly>
      </div>
    );
  }
}
SavedPaymentUpi.propTypes = {
  replaceItem: PropTypes.func,
  upiId: PropTypes.string
};
