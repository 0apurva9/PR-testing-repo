import React from "react";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import styles from "./InvalidCouponPopUp.css";
import queryString from "query-string";

import {
  FAILURE_LOWERCASE,
  SUCCESS,
  INVALID_NO_COST_EMI_TYPE,
  NO_COST_EMI_COUPON,
  BANK_COUPON_COOKIE,
  COUPON_COOKIE,
  SUCCESS_CAMEL_CASE,
  SUCCESS_UPPERCASE,
  BANK_OFFER_TYPE,
  NCE_OFFER_TYPE
} from "../../lib/constants";
import { BANK_OFFERS } from "../../general/modal.actions.js";

export default class ValidateOffersPopUp extends React.Component {
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

  getValidBankOfferTemplate() {
    let couponCodeObj =
      this.props.bankOffers && this.props.bankOffers.coupons
        ? this.props.bankOffers.coupons.find(coupon => {
            return coupon.offerCode === this.props.couponCode;
          })
        : {};
    return `The ${
      this.props.couponCode ? this.props.couponCode : ""
    } is valid only on ${this.getBanksList(
      couponCodeObj.bankDetails
    )} ${this.getPaymentModesList(couponCodeObj.paymentModes)} transactions`;
  }
  getValidNCEOfferTemplate() {
    let couponCodeObj =
      this.props.nceOffers && this.props.nceOffers.bankList
        ? this.props.nceOffers.bankList.find(coupon => {
            return (
              coupon.noCostEMICouponList &&
              coupon.noCostEMICouponList.find(nce => {
                return nce.emicouponCode === this.props.couponCode;
              })
            );
          })
        : {};
    return `The No Cost EMI offer is valid only on ${
      couponCodeObj && couponCodeObj.bankName ? couponCodeObj.bankName : ""
    }.`;
  }
  changePaymentMethod() {
    if (this.props.offerType === BANK_OFFER_TYPE) {
      this.props.showModal(BANK_OFFERS, { coupons: this.props.bankOffers });
    } else if (this.props.offerType === NCE_OFFER_TYPE) {
      this.props.changePaymentMethod();
    }
  }
  async continueWithoutCoupon() {
    let releaseStatus = {};
    const bankCouponCode = localStorage.getItem(BANK_COUPON_COOKIE);
    const userCouponCode = localStorage.getItem(COUPON_COOKIE);
    const noCostEmiCoupon = localStorage.getItem(NO_COST_EMI_COUPON);
    const parsedQueryString = queryString.parse(this.props.location.search);
    const isPaymentFailureCase = parsedQueryString.status;
    if (this.props.result && this.props.result.userCoupon) {
      if (noCostEmiCoupon) {
        releaseStatus = await this.props.releaseNoCostEmiCoupon(
          noCostEmiCoupon
        );
      }
      if (!releaseStatus.status || releaseStatus.status === SUCCESS) {
        if (bankCouponCode) {
          releaseStatus = await this.props.releaseBankOffer(bankCouponCode);
        }
      }
      if (!releaseStatus.status || releaseStatus.status === SUCCESS) {
        if (
          this.props.result.userCoupon &&
          this.props.result.userCoupon.couponCode &&
          !isPaymentFailureCase
        ) {
          releaseStatus = await this.props.releaseUserCoupon(
            this.props.result.userCoupon.couponCode
          );
        }
      }
    } else if (this.props.result && this.props.result.bankOffer) {
      if (noCostEmiCoupon) {
        releaseStatus = await this.props.releaseNoCostEmiCoupon(
          noCostEmiCoupon
        );
      }
      if (!releaseStatus.status || releaseStatus.status === SUCCESS) {
        if (bankCouponCode) {
          releaseStatus = await this.props.releaseBankOffer(bankCouponCode);
        }
      }
    } else if (this.props.result && this.props.result.noCostEmiCoupon) {
      if (
        this.props.result.noCostEmiCoupon.couponType ===
        INVALID_NO_COST_EMI_TYPE
      ) {
        releaseStatus = await this.props.releaseNoCostEmiCoupon(
          noCostEmiCoupon
        );
      }
    }
    if (
      this.props.result &&
      !this.props.result.userCoupon &&
      !this.props.result.bankOffer &&
      !this.props.result.noCostEmiCoupon
    ) {
      if (noCostEmiCoupon) {
        releaseStatus = await this.props.releaseNoCostEmiCoupon(
          noCostEmiCoupon
        );
      }
      if (!releaseStatus.status || releaseStatus.status === SUCCESS) {
        if (bankCouponCode) {
          releaseStatus = await this.props.releaseBankOffer(bankCouponCode);
        }
      }
      if (!releaseStatus.status || releaseStatus.status === SUCCESS) {
        if (userCouponCode && !isPaymentFailureCase) {
          releaseStatus = await this.props.releaseUserCoupon(userCouponCode);
        }
      }
      if (!releaseStatus.status || releaseStatus.status === SUCCESS) {
        localStorage.removeItem(BANK_COUPON_COOKIE);
        localStorage.removeItem(COUPON_COOKIE);
        if (this.props.redoCall) {
          this.props.redoCall();
        }
        this.props.closeModal();
      }
    }
    if (releaseStatus.status === SUCCESS) {
      if (this.props.redoCall) {
        this.props.redoCall();
      }
      this.props.closeModal();
    }
  }
  render() {
    console.log(this.props);
    const parsedQueryString = queryString.parse(this.props.location.search);
    const isPaymentFailureCase = parsedQueryString.status;

    const data = this.props.result;
    let labelForFirstButton = "Change Payment Mode";
    let labelForSecondButton = "Continue without offers";
    let popUpHeading = "Different Payment Method";
    if (this.props.offerType === BANK_OFFER_TYPE) {
      labelForFirstButton = "Choose another bank offer";
      labelForSecondButton = "Continue without offer";
      popUpHeading = "Unable to apply bank offer";
    } else if (this.props.offerType === NCE_OFFER_TYPE) {
      labelForFirstButton = "Choose another No Cost EMI";
      labelForSecondButton = "Continue without offers";
      popUpHeading = "Unable to apply No Cost EMI";
    }
    return (
      <div className={styles.base}>
        <div className={styles.paymentMethodDescription}>
          <div className={styles.headingText}>{popUpHeading}</div>
          <div className={styles.descriptionText}>
            <div className={styles.invalidCouponHeading}>
              {this.props.result.couponMessage}
            </div>
            {this.props.offerType === BANK_OFFER_TYPE && (
              <div className={styles.invalidCouponHeading}>
                {this.getValidBankOfferTemplate()}
              </div>
            )}
            {this.props.offerType === NCE_OFFER_TYPE && (
              <div className={styles.invalidCouponHeading}>
                {this.getValidNCEOfferTemplate()}
              </div>
            )}
            {data &&
              data.userCoupon &&
              data.userCoupon && (
                <div className={styles.invalidCouponHeading}>
                  {this.getInvalidUserCouponTemplate(data.userCoupon)}
                </div>
              )}
            {data &&
              data.bankOffer &&
              data.bankOffer && (
                <div className={styles.invalidCouponHeading}>
                  {this.getInvalidBankOfferTemplate(data.bankOffer)}
                </div>
              )}
            {data &&
              data.noCostEmiCoupon &&
              data.noCostEmiCoupon && (
                <div className={styles.invalidCouponHeading}>
                  {this.getInvalidNCEOfferTemplate(data.noCostEmiCoupon)}
                </div>
              )}
            {/* {data &&
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
                      <div>You may have to select a bank offer again.</div>
                    )}
                  {data.noCostEmiCoupon &&
                    data.noCostEmiCoupon.status &&
                    data.noCostEmiCoupon.status.toLowerCase() === SUCCESS && (
                      <div>
                        You may have to select a No Cost EMI plan again.
                      </div>
                    )}
                </div>
              )} */}
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
              label={labelForFirstButton}
              width={211}
              textStyle={{ color: "#FFF", fontSize: 14 }}
              onClick={() => this.changePaymentMethod()}
            />
          </div>
        </div>
        {(!isPaymentFailureCase ||
          (isPaymentFailureCase &&
            (!data ||
              !data.userCoupon ||
              !data.userCoupon.status ||
              data.userCoupon.status.toLowerCase() !== FAILURE_LOWERCASE))) && (
          <div className={styles.buttonHolderForContinueCoupon}>
            <div className={styles.button}>
              <Button
                type="secondary"
                height={36}
                label={labelForSecondButton}
                width={211}
                onClick={() => this.continueWithoutCoupon()}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
ValidateOffersPopUp.propTypes = {
  cardLogo: PropTypes.string,
  changePaymentMethod: PropTypes.func,
  continueWithoutCoupon: PropTypes.func,
  couponCode: PropTypes.string
};
