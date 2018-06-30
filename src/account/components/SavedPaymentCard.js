import React from "react";
import PropTypes from "prop-types";
import Logo from "../../general/components/Logo";
import styles from "./SavedPaymentCard.css";
import SavedCardItemFooter from "./SavedCardItemFooter.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
export default class SavedPaymentCard extends React.Component {
  replaceItem() {
    if (this.props.replaceItem) {
      this.props.replaceItem();
    }
  }

  removeSavedCardDetails = () => {
    if (this.props.removeSavedCardDetails) {
      this.props.removeSavedCardDetails();
    }
  };

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.paymentDetailsHolder}>
          <div className={styles.bankAndCardHolder}>
            <div className={styles.bankLogoAndNameHolder}>
              <div className={styles.bankLogo}>
                <Logo image={this.props.bankLogo} />
              </div>
              <div
                className={
                  this.props.bankLogo ? styles.bankNameGap : styles.bankName
                }
              >
                {this.props.bankName}
              </div>
            </div>
            <div className={styles.cardAndTextHolder}>
              <div className={styles.cardLogoHolder}>
                <div className={styles.cardLogo}>
                  <Logo image={this.props.cardLogo} />
                </div>
              </div>
              <div className={styles.cardName}>{this.props.cardName}</div>
            </div>
          </div>
          <div className={styles.cardNameNumberAndValidityHolder}>
            <div className={styles.cardNumberHolder}>
              <div className={styles.cardDataHolder}>
                <div className={styles.dataHeader}>Card number</div>
                <div className={styles.dataHolder}>{this.props.cardNumber}</div>
              </div>
            </div>
            <div className={styles.cardNameAndValidityHolder}>
              <MobileOnly>
                <div className={styles.nameOfCardHolder}>
                  <div className={styles.dataHeader}>Name on card</div>
                  <div className={styles.dataHolder}>
                    {this.props.cardHolderName}
                  </div>
                </div>
              </MobileOnly>
              <div className={styles.validityHolder}>
                <div className={styles.dataHeader}>Validity</div>
                <div className={styles.dataHolder}>
                  {this.props.validityDate}
                </div>
              </div>
              <DesktopOnly>
                <div className={styles.nameOfCardHolder}>
                  <div className={styles.dataHeader}>Name on card</div>
                  <div className={styles.dataHolder}>
                    {this.props.cardHolderName}
                  </div>
                </div>
              </DesktopOnly>
            </div>
          </div>
        </div>
        <div className={styles.actionHolder}>
          <SavedCardItemFooter
            buttonLabel="Remove"
            underlineButtonLabel="Edit"
            removeSavedCardDetails={() => this.removeSavedCardDetails()}
          />
        </div>
      </div>
    );
  }
}
SavedPaymentCard.propTypes = {
  bankLogo: PropTypes.string,
  bankName: PropTypes.string,
  cardLogo: PropTypes.string,
  replaceItem: PropTypes.func,
  cardName: PropTypes.string,
  cardNumber: PropTypes.string,
  cardHolderName: PropTypes.string,
  validityDate: PropTypes.string
};
