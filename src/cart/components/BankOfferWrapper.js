import React from "react";
import BankOffer from "./BankOffer.js";
import GridSelect from "../../general/components/GridSelect";
import { BANK_COUPON_COOKIE } from "../../lib/constants";
import styles from "./BankOfferWrapper.css";
const SEE_ALL_BANK_OFFERS = "See All Bank Offers";
export default class BankOfferWrapper extends React.Component {
  render() {
    let offerDescription, offerTitle, offerCode;
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
        offerDescription = selectedCoupon.offerDescription;
        offerTitle = selectedCoupon.offerTitle;
        offerCode = selectedCoupon.offerCode;
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
      }
    }

    return (
      <div className={styles.base}>
        <GridSelect
          elementWidthMobile={100}
          elementWidthDesktop={100}
          offset={0}
          limit={1}
          onSelect={val => this.props.applyBankCoupons(val)}
          selected={[localStorage.getItem(BANK_COUPON_COOKIE)]}
        >
          <BankOffer
            bankName={offerTitle}
            offerText={offerDescription}
            label={SEE_ALL_BANK_OFFERS}
            applyBankOffers={() => this.props.openBankOffers()}
            openBankOfferTncModal={() => this.props.openBankOfferTncModal()}
            value={offerCode}
          />
        </GridSelect>
      </div>
    );
  }
}
