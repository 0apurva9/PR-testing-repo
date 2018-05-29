import React from "react";
import styles from "./BankOffer.css";
import CheckBox from "../../general/components/CheckBox.js";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import PropTypes from "prop-types";

export default class BankOffer extends React.Component {
  handleClick() {
    if (this.props.applyBankOffers) {
      this.props.applyBankOffers();
    }
  }
  applyCoupons(val) {
    if (this.props.selectItem) {
      this.props.selectItem();
    }
  }
  openBankOfferTncModal() {
    if (this.props.openBankOfferTncModal) {
      this.props.openBankOfferTncModal();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.container}>
          <span className={styles.bankName}>{this.props.bankName}</span>
          <span className={styles.offerText}>{this.props.offerText}</span>
          <div
            className={styles.checkBoxHolder}
            onClick={val => this.applyCoupons(val)}
          >
            <div>
              <CheckBox selected={this.props.selected} />
            </div>
          </div>
        </div>
        <div className={styles.buttonHolder}>
          <div className={styles.button}>
            <UnderLinedButton
              label={this.props.label}
              onClick={() => {
                this.handleClick();
              }}
            />
          </div>
          {this.props.labelTermsAndCondition && (
            <div className={styles.termsAndConditionButton}>
              <UnderLinedButton
                label={this.props.labelTermsAndCondition}
                onClick={() => {
                  this.props.openBankOfferTncModal();
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

BankOffer.propTypes = {
  bankName: PropTypes.string,
  offerText: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  labelTermsAndCondition: PropTypes.string
};
