import React from "react";
import filter from "lodash.filter";
import find from "lodash.find";
import CliqCashToggle from "./CliqCashToggle";
import styles from "./PaymentCardWrapper.css";
import EmiPanel from "./EmiPanel.js";
import CheckoutCreditCard from "./CheckoutCreditCard.js";
import CheckoutDebitCard from "./CheckoutDebitCard.js";
import CheckoutNetbanking from "./CheckoutNetbanking.js";
import CheckoutSavedCard from "./CheckoutSavedCard.js";
import CheckoutCOD from "./CheckoutCOD.js";
import { PAYTM, OLD_CART_GU_ID, BANK_COUPON_COOKIE } from "../../lib/constants";
import PaytmOption from "./PaytmOption.js";
import BankOffer from "./BankOffer.js";
import BankOfferWrapper from "./BankOfferWrapper.js";
import GiftCardPopup from "./GiftCardPopup.js";
import GridSelect from "../../general/components/GridSelect";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import ManueDetails from "../../general/components/MenuDetails.js";
import CheckOutHeader from "./CheckOutHeader";
import { getCookie } from "../../lib/Cookie";
import giftCardIcon from "../../general/components/img/Gift.svg";
const SEE_ALL_BANK_OFFERS = "See All Bank Offers";
const keyForCreditCard = "Credit Card";
const keyForDebitCard = "Debit Card";
const keyForNetbanking = "Netbanking";
const keyForEMI = "EMI";
const keyForCOD = "COD";
const keyForPaytm = "PAYTM";
const GIFT_CARD = "Have a gift card?";
const sequanceOfPaymentMode = [
  keyForCreditCard,
  keyForDebitCard,
  keyForEMI,
  keyForNetbanking,
  keyForPaytm,
  keyForCOD
];
// prettier-ignore
const typeComponentMapping = {
  "Credit Card": props => <CheckoutCreditCard {...props} />,
    "Debit Card": props => <CheckoutDebitCard {...props} />,
    "Netbanking": props => <CheckoutNetbanking {...props} />,
     "COD": props => <CheckoutCOD {...props}/>,
    "EMI": props => <EmiPanel {...props} />,
    "PAYTM": props => <PaytmOption {...props} />,
};

export default class PaymentCardWrapper extends React.Component {
  componentDidMount = () => {
    if (
      this.props.getCODEligibility &&
      !this.props.cart.codEligibilityDetails
    ) {
      this.props.getCODEligibility();
    }
  };

  binValidationForPaytm(val) {
    if (this.props.binValidationForPaytm) {
      this.props.binValidationForPaytm(PAYTM, "", val);
    }
  }
  openBankOfferTncModal() {
    if (this.props.openBankOfferTncModal) {
      this.props.openBankOfferTncModal();
    }
  }
  renderPaymentCard = datumType => {
    return (
      <React.Fragment>
        {typeComponentMapping[datumType] &&
          typeComponentMapping[datumType]({ ...this.props })}
      </React.Fragment>
    );
  };

  renderPaymentCardsComponents() {
    let paymentModesToDisplay = sequanceOfPaymentMode.filter(mode => {
      return find(
        this.props.cart.paymentModes.paymentModes,
        availablePaymentMode => {
          return (
            availablePaymentMode.key === mode && availablePaymentMode.value
          );
        }
      );
    });
    return paymentModesToDisplay.map((feedDatum, i) => {
      return this.renderPaymentCard(feedDatum, i);
    });
  }

  binValidationForSavedCard = cardDetails => {
    if (this.props.binValidationForSavedCard) {
      this.props.binValidationForSavedCard(cardDetails);
    }
  };
  renderSavedCards = () => {
    return (
      <CheckoutSavedCard
        currentPaymentMode={this.props.currentPaymentMode}
        selectedSavedCardDetails={this.props.selectedSavedCardDetails}
        onSelectPaymentsMode={currentPaymentMode =>
          this.props.onChange({ currentPaymentMode })
        }
        validateSavedCard={this.props.validateSavedCard}
        binValidationForSavedCard={cardDetails =>
          this.binValidationForSavedCard(cardDetails)
        }
        onFocusInput={this.props.onFocusInput}
        saveCardDetails={
          this.props.cart.paymentModes.savedCardResponse.savedCardDetailsMap
        }
        onCheckout={this.props.onCheckout}
      />
    );
  };

  handleClick = toggleState => {
    if (toggleState) {
      this.props.applyCliqCash();
    } else {
      this.props.removeCliqCash();
    }
  };

  addGiftCard = () => {
    if (this.props.addGiftCard) {
      this.props.addGiftCard();
    }
  };
  redeemCliqVoucher(val) {
    if (this.props.redeemCliqVoucher) {
      this.props.redeemCliqVoucher(val);
    }
  }

  render() {
    if (this.props.cart.paymentModes) {
      return (
        <div className={styles.base}>
          <DesktopOnly>
            <div className={styles.card}>
              <CheckOutHeader confirmTitle="Make Payment" indexNumber="3" />
            </div>
          </DesktopOnly>
          {!this.props.isFromGiftCard &&
            !this.props.isPaymentFailed && (
              <div>
                <CliqCashToggle
                  cashText="Use My CLiQ Cash Balance"
                  price={
                    isNaN(this.props.cliqCashAmount)
                      ? 0
                      : this.props.cliqCashAmount
                  }
                  value={
                    (this.props.userCliqCashAmount &&
                      this.props.userCliqCashAmount !== "0.00") ||
                    this.props.isCliqCashApplied === true
                      ? this.props.userCliqCashAmount
                      : 0
                  }
                  onToggle={val => this.handleClick(val)}
                  isFromGiftCard={this.props.isFromGiftCard}
                  addGiftCard={() => this.addGiftCard()}
                  isCliqCashApplied={this.props.isCliqCashApplied}
                  isRemainingBalance={this.props.isRemainingBalance}
                />
              </div>
            )}
          <MobileOnly>
            {!this.props.isFromGiftCard &&
              this.props.isRemainingBalance &&
              !(this.props.isPaymentFailed && this.props.isCliqCashApplied) &&
              (this.props.cart.paymentModes &&
                this.props.cart.paymentModes.paymentOffers &&
                this.props.cart.paymentModes.paymentOffers.coupons) && (
                <BankOfferWrapper
                  cart={this.props.cart}
                  applyBankCoupons={this.props.applyBankCoupons}
                  openBankOffers={this.props.openBankOffers}
                  openBankOfferTncModal={this.props.openBankOfferTncModal}
                />
              )}
          </MobileOnly>
          {this.props.isRemainingBalance && (
            <div className={styles.paymentModes}>
              <MobileOnly>
                <div className={styles.card}>
                  <CheckOutHeader confirmTitle="Make Payment" indexNumber="3" />
                </div>
              </MobileOnly>
              {this.props.cart.paymentModes &&
                this.props.cart.paymentModes.savedCardResponse &&
                this.props.cart.paymentModes.savedCardResponse
                  .savedCardDetailsMap &&
                this.props.cart.paymentModes.savedCardResponse
                  .savedCardDetailsMap.length > 0 &&
                this.renderSavedCards()}
              {this.props.cart.paymentModes &&
                this.renderPaymentCardsComponents()}
            </div>
          )}
          {!this.props.isFromGiftCard &&
            !this.props.isPaymentFailed && (
              <DesktopOnly>
                <div className={styles.giftCardAccrodian}>
                  <ManueDetails
                    text={GIFT_CARD}
                    icon={giftCardIcon}
                    isNoBorderTop={true}
                  >
                    <GiftCardPopup
                      isGiftCardHeader={false}
                      heading="Have a gift card?"
                      addGiftCard={val => this.redeemCliqVoucher(val)}
                      voucherNumber={this.props.voucherNumber}
                      voucherPin={this.props.voucherPin}
                    />
                  </ManueDetails>
                </div>
              </DesktopOnly>
            )}
        </div>
      );
    } else {
      return null;
    }
  }
}
