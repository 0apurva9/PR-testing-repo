import React from "react";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import styles from "./InvalidCouponPopUp.css";
import Logo from "../../general/components/Logo";
import {
  INVALID_USER_COUPON_TYPE,
  INVALID_BANK_OFFER_TYPE,
  FAILURE_LOWERCASE,
  WRONG_FAILURE,
  SUCCESS,
  INVALID_NO_COST_EMI_TYPE,
  NO_COST_EMI_COUPON,
  BANK_COUPON_COOKIE,
  COUPON_COOKIE
} from "../../lib/constants";

export default class InvalidCouponPopUp extends React.Component {
  getBanksList(bankDetail) {
    return (
      bankDetail &&
      bankDetail
        .map(bank => {
          return bank.bankName;
        })
        .join(",")
    );
  }
  getPaymentModesList(paymentModes) {
    return (
      paymentModes &&
      paymentModes
        .map(mode => {
          return mode.mode;
        })
        .join(",")
    );
  }
  getInvalidUserCouponTemplate(couponResponse) {
    return `Coupon code ${
      couponResponse.couponCode ? couponResponse.couponCode : ""
    } is valid for ${this.getBanksList(
      couponResponse.bankDetails
    )} ${this.getPaymentModesList(couponResponse.paymentModes)} transactions`;
  }
  getInvalidBankOfferTemplate(couponResponse) {
    return `The ${
      couponResponse.couponCode ? couponResponse.couponCode : ""
    } is valid for ${this.getBanksList(
      couponResponse.bankDetails
    )} ${this.getPaymentModesList(couponResponse.paymentModes)} transactions`;
  }
  getInvalidNCEOfferTemplate(couponResponse) {
    return `The No Cost Emi offer is valid only for ${
      couponResponse.bankDetails
        ? this.getBanksList(couponResponse.bankDetails)
        : ""
    }`;
  }

  changePaymentMethod() {
    if (this.props.changePaymentMethod) {
      this.props.changePaymentMethod();
    }
  }
  async continueWithoutCoupon() {
    let releaseStatus = {};
    if (this.props.result && this.props.result.userCoupon) {
      if (localStorage.getItem(NO_COST_EMI_COUPON)) {
        releaseStatus = await this.props.releaseNoCostEmiCoupon(
          localStorage.getItem(NO_COST_EMI_COUPON)
        );
      }
      if (!releaseStatus.status || releaseStatus.status === SUCCESS) {
        if (localStorage.getItem(BANK_COUPON_COOKIE)) {
          releaseStatus = await this.props.releaseBankOffer(
            localStorage.getItem(BANK_COUPON_COOKIE)
          );
        }
      }
      if (!releaseStatus.status || releaseStatus.status === SUCCESS) {
        if (
          this.props.result.userCoupon &&
          this.props.result.userCoupon.couponCode
        ) {
          releaseStatus = await this.props.releaseUserCoupon(
            this.props.result.userCoupon.couponCode
          );
        }
      }
    } else if (this.props.result && this.props.result.bankOffer) {
      if (localStorage.getItem(NO_COST_EMI_COUPON)) {
        releaseStatus = await this.props.releaseNoCostEmiCoupon(
          localStorage.getItem(NO_COST_EMI_COUPON)
        );
      }
      if (!releaseStatus.status || releaseStatus.status === SUCCESS) {
        if (localStorage.getItem(BANK_COUPON_COOKIE)) {
          releaseStatus = await this.props.releaseBankOffer(
            localStorage.getItem(BANK_COUPON_COOKIE)
          );
        }
      }
    } else if (this.props.result && this.props.result.noCostEmiCoupon) {
      if (
        this.props.result.noCostEmiCoupon.couponType ===
        INVALID_NO_COST_EMI_TYPE
      ) {
        releaseStatus = await this.props.releaseNoCostEmiCoupon(
          localStorage.getItem(NO_COST_EMI_COUPON)
        );
      }
    }
    if (
      localStorage.getItem(BANK_COUPON_COOKIE) ||
      localStorage.getItem(COUPON_COOKIE) ||
      localStorage.getItem(NO_COST_EMI_COUPON)
    ) {
      const bankCouponCode = localStorage.getItem(BANK_COUPON_COOKIE);
      const userCouponCode = localStorage.getItem(COUPON_COOKIE);
      const noCostEmiCoupon = localStorage.getItem(NO_COST_EMI_COUPON);

      Promise.all([
        bankCouponCode && this.props.releaseBankOffer(bankCouponCode),
        userCouponCode && this.props.releaseUserCoupon(userCouponCode),
        noCostEmiCoupon && this.props.removeNoCostEmi(noCostEmiCoupon)
      ]).then(res => {
        localStorage.removeItem(BANK_COUPON_COOKIE);
        localStorage.removeItem(COUPON_COOKIE);
        this.props.closeModal();
      });
    }
    if (releaseStatus.status === SUCCESS) {
      this.props.closeModal();
    }
  }
  render() {
    const data = this.props.result;
    return (
      <div className={styles.base}>
        <div className={styles.paymentMethodDescription}>
          <div className={styles.headingText}>Different Payment Method</div>
          <div className={styles.descriptionText}>
            <div className={styles.invalidCouponHeading}>
              The payment mode can not be used because :
            </div>

            {data &&
              data.userCoupon &&
              data.userCoupon.status &&
              data.userCoupon.status.toLowerCase() === FAILURE_LOWERCASE && (
                <div className={styles.invalidCouponHeading}>
                  {this.getInvalidUserCouponTemplate(data.userCoupon)}
                </div>
              )}
            {data &&
              data.bankOffer &&
              data.bankOffer.status &&
              data.bankOffer.status.toLowerCase() === FAILURE_LOWERCASE && (
                <div className={styles.invalidCouponHeading}>
                  {this.getInvalidBankOfferTemplate(data.bankOffer)}
                </div>
              )}
            {data &&
              data.noCostEmiCoupon &&
              data.noCostEmiCoupon.status &&
              data.noCostEmiCoupon.status.toLowerCase() ===
                FAILURE_LOWERCASE && (
                <div className={styles.invalidCouponHeading}>
                  {this.getInvalidNCEOfferTemplate(data.noCostEmiCoupon)}
                </div>
              )}
            {data &&
              ((data.noCostEmiCoupon &&
                data.noCostEmiCoupon.status &&
                data.noCostEmiCoupon.status.toLowerCase() === SUCCESS) ||
                (data.bankOffer &&
                  data.bankOffer.status &&
                  data.bankOffer.status.toLowerCase() === SUCCESS)) && (
                <div>
                  Note:
                  {data.bankOffer &&
                    data.bankOffer.status &&
                    data.bankOffer.status.toLowerCase() === SUCCESS && (
                      <div>You may have to select a bank offer again."</div>
                    )}
                  {data.noCostEmiCoupon &&
                    data.noCostEmiCoupon.status &&
                    data.noCostEmiCoupon.status.toLowerCase() === SUCCESS && (
                      <div>
                        You may have to select a No Cost EMI plan again."
                      </div>
                    )}
                </div>
              )}
            {data &&
              !data.noCostEmiCoupon &&
              !data.bankOffer &&
              !data.userCoupon && (
                <div className={styles.invalidCouponHeading}>
                  {data.errorMessage ? data.errorMessage : ""}
                </div>
              )}
          </div>
        </div>
        <div className={styles.buttonHolderForPaymentMode}>
          <div className={styles.button}>
            <Button
              type="primary"
              backgroundColor="#ff1744"
              height={36}
              label="Change Payment Mode"
              width={211}
              textStyle={{ color: "#FFF", fontSize: 14 }}
              onClick={() => this.changePaymentMethod()}
            />
          </div>
        </div>
        <div className={styles.buttonHolderForContinueCoupon}>
          <div className={styles.button}>
            <Button
              type="secondary"
              height={36}
              label="Continue without coupon"
              width={211}
              onClick={() => this.continueWithoutCoupon()}
            />
          </div>
        </div>
      </div>
    );
  }
}
InvalidCouponPopUp.propTypes = {
  cardLogo: PropTypes.string,
  changePaymentMethod: PropTypes.func,
  continueWithoutCoupon: PropTypes.func,
  couponCode: PropTypes.string
};
