import React from "react";
import BankOffer from "./BankOffer.js";
import GridSelect from "../../general/components/GridSelect";
import { BANK_COUPON_COOKIE } from "../../lib/constants";
import styles from "./BankOfferWrapper.css";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
const SEE_ALL_BANK_OFFERS = "See All Bank Offers";
export default class BankOfferWrapper extends React.Component {
  handleSelect(val) {
    if (this.props.applyBankCoupons) {
      this.props.applyBankCoupons(val);
    }
  }
  openBankOffers() {
    if (this.props.openBankOffers) {
      this.props.openBankOffers();
    }
  }
  openBankOfferTncModal() {
    if (this.props.openBankOfferTncModal) {
      this.props.openBankOfferTncModal();
    }
  }

  render() {
    let offerDescription, offerTitle, offerCode;
    let offerDescription1, offerTitle1, offerCode1;
    let selectedCoupon;
    if (
      this.props.cart.paymentModes &&
      this.props.cart.paymentModes.paymentOffers &&
      this.props.cart.paymentModes.paymentOffers.coupons
    ) {
      const selectedCoupon = this.props.cart.paymentModes.paymentOffers.coupons.find(
        coupon => {
          return coupon.offerCode === localStorage.getItem(BANK_COUPON_COOKIE);
        }
      );
      if (selectedCoupon) {
        offerDescription = selectedCoupon.offerDescription
          ? selectedCoupon.offerDescription
          : selectedCoupon.offerDescription1;
        offerTitle = selectedCoupon.offerTitle
          ? selectedCoupon.offerTitle
          : selectedCoupon.offerTitle;
        offerCode = selectedCoupon.offerCode
          ? selectedCoupon.offerCode
          : selectedCoupon.offerCode;
      } else if (localStorage.getItem(BANK_COUPON_COOKIE)) {
        offerCode = localStorage.getItem(BANK_COUPON_COOKIE);
        offerDescription = "";
        offerTitle = "";
      } else {
        offerDescription = this.props.cart.paymentModes.paymentOffers.coupons[0]
          .offerDescription;
        offerTitle = this.props.cart.paymentModes.paymentOffers.coupons[0]
          .offerTitle;
        offerCode = this.props.cart.paymentModes.paymentOffers.coupons[0]
          .offerCode;
        offerDescription1 = this.props.cart.paymentModes.paymentOffers
          .coupons[1].offerDescription;
        offerTitle1 = this.props.cart.paymentModes.paymentOffers.coupons[1]
          .offerTitle;
        offerCode1 = this.props.cart.paymentModes.paymentOffers.coupons[1]
          .offerCode;
      }
    }

    return (
      <div className={styles.base}>
        <MobileOnly>
          <GridSelect
            elementWidthMobile={100}
            elementWidthDesktop={100}
            offset={0}
            limit={1}
            onSelect={val => this.handleSelect(val)}
            selected={[localStorage.getItem(BANK_COUPON_COOKIE)]}
          >
            <BankOffer
              bankName={offerTitle}
              offerText={offerDescription}
              label={SEE_ALL_BANK_OFFERS}
              applyBankOffers={() => this.openBankOffers()}
              openBankOfferTncModal={() => this.openBankOfferTncModal()}
              value={offerCode}
            />
          </GridSelect>
        </MobileOnly>
        <DesktopOnly>
          {selectedCoupon || localStorage.getItem(BANK_COUPON_COOKIE) ? (
            <GridSelect
              elementWidthMobile={100}
              elementWidthDesktop={100}
              offset={0}
              limit={1}
              onSelect={val => this.handleSelect(val)}
              selected={[localStorage.getItem(BANK_COUPON_COOKIE)]}
            >
              <BankOffer
                bankName={offerTitle}
                offerText={offerDescription}
                label={SEE_ALL_BANK_OFFERS}
                applyBankOffers={() => this.openBankOffers()}
                openBankOfferTncModal={() => this.openBankOfferTncModal()}
                value={offerCode}
              />
            </GridSelect>
          ) : (
            <React.Fragment>
              <GridSelect
                elementWidthMobile={100}
                elementWidthDesktop={100}
                offset={0}
                limit={1}
                onSelect={val => this.handleSelect(val)}
                selected={[localStorage.getItem(BANK_COUPON_COOKIE)]}
              >
                <BankOffer
                  bankName={offerTitle}
                  offerText={offerDescription}
                  label={SEE_ALL_BANK_OFFERS}
                  applyBankOffers={() => this.openBankOffers()}
                  openBankOfferTncModal={() => this.openBankOfferTncModal()}
                  value={offerCode}
                />
              </GridSelect>
              <GridSelect
                elementWidthMobile={100}
                elementWidthDesktop={100}
                offset={0}
                limit={1}
                onSelect={val => this.handleSelect(val)}
                selected={[localStorage.getItem(BANK_COUPON_COOKIE)]}
              >
                <BankOffer
                  bankName={offerTitle1}
                  offerText={offerDescription1}
                  applyBankOffers={() => this.openBankOffers()}
                  openBankOfferTncModal={() => this.openBankOfferTncModal()}
                  value={offerCode1}
                  showBankOffer={false}
                  showTermAndCondition={false}
                />
              </GridSelect>
            </React.Fragment>
          )}
        </DesktopOnly>
      </div>
    );
  }
}
