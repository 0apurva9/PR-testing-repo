import React from "react";
import find from "lodash.find";
import CliqCashToggle from "./CliqCashToggle";
import styles from "./PaymentCardWrapper.css";
import EmiPanel from "./EmiPanel.js";
import CheckoutCreditCard from "./CheckoutCreditCard.js";
import CheckoutDebitCard from "./CheckoutDebitCard.js";
import CheckoutNetbanking from "./CheckoutNetbanking.js";
import CheckoutSavedCard from "./CheckoutSavedCard.js";
import CheckoutCOD from "./CheckoutCOD.js";
import { PAYTM, PAYMENT_FAILURE_CART_PRODUCT } from "../../lib/constants";
import PaytmOption from "./PaytmOption.js";
import PayPalOptions from "./PayPalOptions";
import PropTypes from "prop-types";
import BankOfferWrapper from "./BankOfferWrapper.js";
import GiftCardPopup from "./GiftCardPopup.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import ManueDetails from "../../general/components/MenuDetails.js";
import CheckOutHeader from "./CheckOutHeader";
import giftCardIcon from "../../general/components/img/Gift.svg";
import CheckoutUpi from "./CheckoutUpi";
import { setDataLayer, ADOBE_MDE_CLICK_ON_CLIQCASH_CHECKOUT_WITH_EXCHANGE } from "../../lib/adobeUtils";
const GIFT_CARD = "Have a gift card?";
/**
 * @comment Added condition for showing UPI section of the checkout page in the below const.
 */
// prettier-ignore
const typeComponentMapping = {
  UPI: props => <CheckoutUpi {...props} />,
  "Credit Card": props => <CheckoutCreditCard {...props} />,
    "Debit Card": props => <CheckoutDebitCard {...props} />,
    Netbanking: props => <CheckoutNetbanking {...props} />,
    EMI: props => <EmiPanel {...props} />,
     COD: props => <CheckoutCOD {...props}/>,
    PAYTM: props => <PaytmOption {...props} />,
    PayPal : props => <PayPalOptions {...props} />
};

export default class PaymentCardWrapper extends React.Component {
    componentDidMount = () => {
        document.title = "Proceed with Payment";
        if (this.props.getCODEligibility && !this.props.cart.codEligibilityDetails) {
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

    renderPaymentCard = (datumType, i) => {
        if (
            this.props.retryPaymentDetails &&
            this.props.retryPaymentDetails.orderRetry &&
            this.props.retryPaymentDetails.retryFlagEmiCoupon
        ) {
            return (
                <React.Fragment key={i}>
                    {datumType === "EMI" &&
                        typeComponentMapping[datumType] &&
                        typeComponentMapping[datumType]({ ...this.props })}
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment key={i}>
                    {typeComponentMapping[datumType] && typeComponentMapping[datumType]({ ...this.props })}
                </React.Fragment>
            );
        }
    };

    renderPaymentCardsComponents() {
        let paymentModesToDisplay =
            this.props.cart &&
            this.props.cart.paymentModes &&
            this.props.cart.paymentModes.paymentModes &&
            this.props.cart.paymentModes.paymentModes.filter(mode => {
                return find(this.props.cart.paymentModes.paymentModes, availablePaymentMode => {
                    return availablePaymentMode.key === mode.key && availablePaymentMode.value;
                });
            });
        return (
            paymentModesToDisplay &&
            paymentModesToDisplay.map((feedDatum, i) => {
                return this.renderPaymentCard(feedDatum.key, i);
            })
        );
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
                onSelectPaymentsMode={currentPaymentMode => this.props.onChange({ currentPaymentMode })}
                validateSavedCard={this.props.validateSavedCard}
                binValidationForSavedCard={cardDetails => this.binValidationForSavedCard(cardDetails)}
                onFocusInput={this.props.onFocusInput}
                saveCardDetails={this.props.cart.paymentModes.savedCardResponse.savedCardDetailsMap}
                onCheckout={this.props.onCheckout}
            />
        );
    };

    handleClick = toggleState => {
        if (toggleState) {
            this.props.applyCliqCash();
            if (this.props.isExchangeServiceableArray && this.props.isExchangeServiceableArray.includes(true)) {
                setDataLayer(ADOBE_MDE_CLICK_ON_CLIQCASH_CHECKOUT_WITH_EXCHANGE);
            }
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
        if (
            this.props &&
            this.props.cart &&
            this.props.cart.orderSummary &&
            this.props.cart.orderSummary.products &&
            this.props.cart.orderSummary.products.length > 0
        ) {
            localStorage.setItem(PAYMENT_FAILURE_CART_PRODUCT, JSON.stringify(this.props.cart.orderSummary.products));
        }
        if (this.props.cart.paymentModes) {
            let retryNoCostEMI =
                this.props.retryPaymentDetails &&
                this.props.retryPaymentDetails.orderRetry &&
                this.props.retryPaymentDetails.retryFlagEmiCoupon;
            return (
                <div className={styles.base}>
                    <DesktopOnly>
                        <div className={styles.card}>
                            <CheckOutHeader
                                confirmTitle="Payment Method"
                                indexNumber={this.props.isFromCliqAndPiq ? "2" : "3"}
                            />
                        </div>
                    </DesktopOnly>
                    {!this.props.isFromGiftCard && !this.props.isPaymentFailed && !this.props.isFromRetryUrl && (
                        <div>
                            <CliqCashToggle
                                cashText="Use My CLiQ Cash Balance"
                                price={isNaN(this.props.cliqCashAmount) ? 0 : this.props.cliqCashAmount}
                                value={
                                    (this.props.userCliqCashAmount && this.props.userCliqCashAmount !== "0.00") ||
                                    this.props.isCliqCashApplied === true
                                        ? this.props.userCliqCashAmount
                                        : 0
                                }
                                onToggle={val => this.handleClick(val)}
                                isFromGiftCard={this.props.isFromGiftCard}
                                addGiftCard={() => this.addGiftCard()}
                                isCliqCashApplied={this.props.isCliqCashApplied}
                                isRemainingBalance={this.props.isRemainingBalance}
                                onCheckout={this.props.onCheckout}
                            />
                        </div>
                    )}
                    <MobileOnly>
                        {!this.props.isFromGiftCard &&
                            this.props.isRemainingBalance &&
                            !(this.props.isPaymentFailed && this.props.isCliqCashApplied) &&
                            this.props.cart.paymentModes &&
                            this.props.cart.paymentModes.paymentOffers &&
                            this.props.cart.paymentModes.paymentOffers.coupons && (
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
                                    <CheckOutHeader confirmTitle="Payment Method" indexNumber="3" />
                                </div>
                            </MobileOnly>
                            {!retryNoCostEMI &&
                                this.props.cart.paymentModes &&
                                this.props.cart.paymentModes.savedCardResponse &&
                                this.props.cart.paymentModes.savedCardResponse.savedCardDetailsMap &&
                                this.props.cart.paymentModes.savedCardResponse.savedCardDetailsMap.length > 0 &&
                                this.renderSavedCards()}
                            {this.props.cart.paymentModes && this.renderPaymentCardsComponents()}
                        </div>
                    )}
                    {!this.props.isFromGiftCard && !this.props.isPaymentFailed && !this.props.isFromRetryUrl && (
                        <DesktopOnly>
                            <div className={styles.giftCardAccrodian}>
                                <ManueDetails text={GIFT_CARD} icon={giftCardIcon} isNoBorderTop={true}>
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
PaymentCardWrapper.propTypes = {
    getCODEligibility: PropTypes.func,
    openBankOfferTncModal: PropTypes.func,
    binValidationForPaytm: PropTypes.func,
    redeemCliqVoucher: PropTypes.func,
    onCheckout: PropTypes.func,
    addGiftCard: PropTypes.func,
    applyBankCoupons: PropTypes.func,
    removeCliqCash: PropTypes.func,
    openBankOffers: PropTypes.func,
    applyCliqCash: PropTypes.func,
    onChange: PropTypes.func,
    onFocusInput: PropTypes.func,
    binValidationForSavedCard: PropTypes.func,
    voucherPin: PropTypes.number,
    voucherNumber: PropTypes.number,
    userCliqCashAmount: PropTypes.number,
    cliqCashAmount: PropTypes.number,
    isFromRetryUrl: PropTypes.bool,
    isPaymentFailed: PropTypes.bool,
    isFromGiftCard: PropTypes.bool,
    isFromCliqAndPiq: PropTypes.bool,
    isRemainingBalance: PropTypes.bool,
    isCliqCashApplied: PropTypes.bool,
    validateSavedCard: PropTypes.bool,
    isExchangeServiceableArray: PropTypes.array,
    currentPaymentMode: PropTypes.string,
    selectedSavedCardDetails: PropTypes.object,
    retryPaymentDetails: PropTypes.shape({
        orderRetry: PropTypes.bool,
        retryFlagEmiCoupon: PropTypes.string,
    }),
    cart: PropTypes.shape({
        codEligibilityDetails: PropTypes.object,
        orderSummary: PropTypes.shape({
            products: PropTypes.array,
        }),
        paymentModes: PropTypes.shape({
            paymentModes: PropTypes.array,
            paymentOffers: PropTypes.shape({
                coupons: PropTypes.string,
            }),
            savedCardResponse: PropTypes.shape({
                savedCardDetailsMap: PropTypes.array,
            }),
        }),
    }),
};
