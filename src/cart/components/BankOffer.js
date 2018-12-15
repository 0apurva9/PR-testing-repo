import React from "react";
import styles from "./BankOffer.css";
import CheckBox from "../../general/components/CheckBox.js";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
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
        <MobileOnly>
          <React.Fragment>
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

              <div className={styles.termsAndConditionButton}>
                <UnderLinedButton
                  label="T&C"
                  onClick={() => {
                    this.openBankOfferTncModal();
                  }}
                />
              </div>
            </div>
          </React.Fragment>
        </MobileOnly>
        <DesktopOnly>
          <div className={styles.dataHolderForOffer}>
            <div className={styles.headersForBankOffer}>
              {this.props.showBankOffer && (
                <div className={styles.labelText}>Bank Offers</div>
              )}
              {this.props.showTermAndCondition && (
                <div className={styles.buttonHolder}>
                  <div className={styles.termsAndConditionButton}>
                    <UnderLinedButton
                      label="T&C"
                      onClick={() => {
                        this.openBankOfferTncModal();
                      }}
                    />
                  </div>
                  <div className={styles.button}>
                    <UnderLinedButton
                      label="View all offers"
                      onClick={() => {
                        this.handleClick();
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className={styles.offerShowHolder}>
              <div className={styles.offerCard}>
                <div
                  className={styles.checkBoxHolder}
                  onClick={val => this.applyCoupons(val)}
                >
                  <CheckBox selected={this.props.selected} />
                </div>
                <div className={styles.dataShow}>
                  <span className={styles.bankName}>{this.props.bankName}</span>
                  <span className={styles.offerText1}>
                    {this.props.offerText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DesktopOnly>
      </div>
    );
  }
}

BankOffer.propTypes = {
  bankName: PropTypes.string,
  offerText: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  labelText: PropTypes.bool
};
BankOffer.defaultProps = {
  showBankOffer: true,
  showTermAndCondition: true
};
