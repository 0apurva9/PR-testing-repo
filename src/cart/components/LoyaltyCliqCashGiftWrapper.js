import React, { Component } from "react";
import styles from "./LoyaltyCliqCashGiftWrapper.css";
import CliqCashToggle from "./CliqCashToggle";
import LoyaltyPoint from "./LoyaltyPoint";

import { LOYALTY_PAYMENT_MODE, LOYALTY_POINT_BALANCE, SUCCESS, YES } from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";
import GiftCardPopup from "./GiftCardPopup";
import ManueDetails from "../../general/components/MenuDetails.js";
import giftCardIcon from "./img/giftbox.png";
import { isCustomerLoyal } from "../../common/services/common.services";
import PropTypes from "prop-types";
const GIFT_CARD = "Have a gift card?";

export default class LoyaltyCliqCashGiftWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loyaltyAmount: 0,
            loyaltyPaidAmount: 0,
            totalLoyaltyAmount: 0,
            loyaltyDetailsDelayed: false,
            customerLoyal: isCustomerLoyal() === YES,
        };
    }

    loyaltyAlert = async loyaltyPoints => {
        const cartDetails = Cookie.getCookie("cartDetails");

        let cartGuId = cartDetails && (JSON.parse(cartDetails).guid || Cookie.getCookie("oldCartGuId"));
        if (this.props.isCliqCashApplied === false) {
            if (this.state.totalLoyaltyAmount > 0 && this.props.loyaltyPointsApplied === false) {
                await this.props.applyLoyaltyPoints(cartGuId, "apply", this.state.totalLoyaltyAmount, loyaltyPoints);
            } else {
                await this.props.removeLoyaltyPoints(cartGuId, "remove", this.state.totalLoyaltyAmount, loyaltyPoints);
            }
            // this.closeModal();
        }
        if (this.props.cliqCashLoyaltyAlert && this.props.isCliqCashApplied) {
            this.props.cliqCashLoyaltyAlert({
                children: this.popBody(),
            });
        }
    };

    cliqCashAlert = toggleState => {
        if (!this.props.loyaltyPointsApplied && toggleState) {
            this.props.applyCliqCash();
        } else if (this.props.loyaltyPointsApplied) {
            this.props.cliqCashLoyaltyAlert({
                children: this.popBody(),
            });
        } else {
            this.props.removeCliqCash();
        }
    };

    onChange = async () => {
        const cartDetails = Cookie.getCookie("cartDetails");
        let cartGuId = cartDetails && (JSON.parse(cartDetails).guid || Cookie.getCookie("oldCartGuId"));
        if (this.props.isCliqCashApplied) {
            let cliqRequest = await this.props.removeCliqCash();
            if (cliqRequest.status === SUCCESS) {
                await this.props.applyLoyaltyPoints(
                    cartGuId,
                    "apply",
                    this.state.totalLoyaltyAmount,
                    this.state.loyaltyAmount
                );
            }
        } else {
            let loyaltyRequest = await this.props.removeLoyaltyPoints(
                cartGuId,
                "remove",
                this.state.totalLoyaltyAmount,
                this.state.loyaltyPaidAmount
            );
            if (loyaltyRequest.status === SUCCESS) {
                await this.props.applyCliqCash();
            }
        }
        this.closeModal();
    };

    closeModal = () => {
        if (this.props.hideModal) {
            this.props.hideModal();
        }
    };

    componentDidMount() {
        let isLoyaltyAvailable =
            this.props.cart &&
            this.props.cart.paymentModes &&
            this.props.cart.paymentModes.paymentModes &&
            this.props.cart.paymentModes.paymentModes.find(mode => {
                return mode.key === LOYALTY_PAYMENT_MODE;
            });
        if (
            isLoyaltyAvailable &&
            isLoyaltyAvailable.value &&
            this.props.loyaltyDetails &&
            !this.props.isPaymentFailed &&
            this.state.customerLoyal
        ) {
            this.props.loyaltyDetails();
        }
        if (this.props.cart.paymentFailureOrderDetails) {
            let loyaltyAmount = 0;
            if (
                Object.prototype.hasOwnProperty.call(this.props.cart.paymentFailureOrderDetails, "loyaltyPointsBalance")
            ) {
                loyaltyAmount = this.props.cart.paymentFailureOrderDetails.loyaltyPointsBalance.value;
            } else {
                loyaltyAmount = Math.trunc(
                    localStorage.getItem(LOYALTY_POINT_BALANCE) -
                        this.props.cart.paymentFailureOrderDetails.loyaltyPointsPaidAmount.value
                );
            }

            let loyaltyPaidAmount = this.props.cart.paymentFailureOrderDetails.loyaltyPointsPaidAmount.value;
            this.setState({
                loyaltyAmount,
                loyaltyPaidAmount,
                totalLoyaltyAmount: localStorage.getItem(LOYALTY_POINT_BALANCE),
            });
        }
        if (
            this.props.cart &&
            this.props.cart.loyaltyDetails &&
            this.props.cart.loyaltyDetails.groupLoyaltyProgramDetails &&
            this.props.cart.loyaltyDetails.groupLoyaltyProgramDetails[0]
        ) {
            let loyaltyPoints = this.props.cart.loyaltyDetails.groupLoyaltyProgramDetails[0].loyaltyPoints;
            if (loyaltyPoints === 0) {
                localStorage.setItem(LOYALTY_POINT_BALANCE, loyaltyPoints);
                this.setState({
                    loyaltyAmount: loyaltyPoints,
                    totalLoyaltyAmount: loyaltyPoints,
                    loyaltyDetailsDelayed: this.props.cart.loyaltyDetailsDelayed,
                });
            } else {
                localStorage.setItem(LOYALTY_POINT_BALANCE, loyaltyPoints);
                this.setState({
                    loyaltyAmount: loyaltyPoints,
                    totalLoyaltyAmount: loyaltyPoints,
                });
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.cart &&
            !prevProps.cart.loyaltyDetails &&
            this.props.cart &&
            this.props.cart.loyaltyDetails &&
            this.props.cart.loyaltyDetails.groupLoyaltyProgramDetails &&
            this.props.cart.loyaltyDetails.groupLoyaltyProgramDetails[0]
        ) {
            let loyaltyPoints = this.props.cart.loyaltyDetails.groupLoyaltyProgramDetails[0].loyaltyPoints;
            if (loyaltyPoints === 0) {
                localStorage.setItem(LOYALTY_POINT_BALANCE, loyaltyPoints);
                this.setState({
                    loyaltyAmount: loyaltyPoints,
                    totalLoyaltyAmount: loyaltyPoints,
                    loyaltyDetailsDelayed: this.props.cart.loyaltyDetailsDelayed,
                });
            } else {
                localStorage.setItem(LOYALTY_POINT_BALANCE, loyaltyPoints);
                this.setState({
                    loyaltyAmount: loyaltyPoints,
                    totalLoyaltyAmount: loyaltyPoints,
                });
            }
        }
        if (
            prevProps.cart &&
            !prevProps.cart.loyaltyDetailsDelayed &&
            this.props.cart &&
            this.props.cart.loyaltyDetailsDelayed
        ) {
            this.setState({
                loyaltyDetailsDelayed: this.props.cart.loyaltyDetailsDelayed,
            });
        }
        if (
            this.props.cart !== prevProps.cart &&
            this.props.cart.loyaltyPoints &&
            this.props.cart.loyaltyPoints.loyaltyPointsBalance
        ) {
            this.setState({
                loyaltyAmount: this.props.cart.loyaltyPoints.loyaltyPointsBalance.value,
                loyaltyPaidAmount: this.props.cart.loyaltyPoints.loyaltyPointsPaidAmount.value,
                // totalLoyaltyAmount: this.props.cart.loyaltyPoints.loyaltyPointsBalance.value
            });
        }
    }

    popBody = () => {
        return (
            <div>
                {this.props.loyaltyPointsApplied && (
                    <div className={styles.modalText}>
                        Selecting CLiQ Cash will remove your applied Tata Loyalty Points. Are you sure you want to
                        change your selection?
                    </div>
                )}
                {this.props.isCliqCashApplied && (
                    <div className={styles.modalText}>
                        Selecting Tata Loyalty Points will remove your applied CLiQ Cash. Are you sure you want to
                        change your selection?
                    </div>
                )}
                <div className={styles.btnCls}>
                    <span className={styles.alertBtn} onClick={() => this.closeModal()}>
                        CANCEL
                    </span>
                    <span className={styles.alertBtn} onClick={() => this.onChange()}>
                        CHANGE
                    </span>
                </div>
            </div>
        );
    };

    renderLoyaltyPoint = () => {
        let loyaltyPoints = this.state.loyaltyAmount;
        let isLoyaltyAvailable =
            this.props.cart &&
            this.props.cart.paymentModes &&
            this.props.cart.paymentModes.paymentModes &&
            this.props.cart.paymentModes.paymentModes.find(mode => {
                return mode.key === LOYALTY_PAYMENT_MODE;
            });
        let minimumLoyaltyThreshold =
            this.props.cart && this.props.cart.paymentModes && this.props.cart.paymentModes.minimumLoyaltyThreshold;
        const showLoyaltyPoint = isLoyaltyAvailable && isLoyaltyAvailable.value;
        let thresholdEligibility = this.state.totalLoyaltyAmount > minimumLoyaltyThreshold;
        let totalCartAmount =
            this.props.cart &&
            this.props.cart.cartDetailsCNC &&
            this.props.cart.cartDetailsCNC.cartAmount &&
            this.props.cart.cartDetailsCNC.cartAmount.paybleAmount.value;

        let appliedLp = totalCartAmount > loyaltyPoints ? loyaltyPoints : totalCartAmount;

        return showLoyaltyPoint &&
            !this.props.isFromGiftCard &&
            !this.props.isFromRetryUrl &&
            this.state.customerLoyal ? (
            <div className={styles.loyaltyBase}>
                <LoyaltyPoint
                    lpText="Use my Tata Loyalty Points"
                    totalLoyaltyAmount={this.state.totalLoyaltyAmount}
                    loyaltyAmount={this.state.loyaltyAmount}
                    loyaltyPaidAmount={this.state.loyaltyPaidAmount}
                    onToggle={() => this.loyaltyAlert(appliedLp)}
                    isFromGiftCard={this.props.isFromGiftCard}
                    addGiftCard={() => this.addGiftCard()}
                    getLoyaltyTncData={() => this.props.getLoyaltyTncData()}
                    loyaltyPointsApplied={this.props.loyaltyPointsApplied}
                    lpPartialRedemption={data => this.props.lpPartialRedemption(data)}
                    isRemainingBalance={this.props.isRemainingBalance}
                    cart={this.props.cart}
                    closeModal={() => this.closeModal()}
                    onCheckout={this.props.onCheckout}
                    thresholdEligibility={thresholdEligibility}
                    loyaltyDetailsDelayed={this.state.loyaltyDetailsDelayed}
                    loyaltyDetails={() => this.props.loyaltyDetails()}
                    isPaymentFailed={this.props.isPaymentFailed}
                    customerLoyal={this.state.customerLoyal}
                />
            </div>
        ) : null;
    };

    render() {
        let loyaltyPoints =
            this.props.cart &&
            this.props.cart.loyaltyDetails &&
            this.props.cart.loyaltyDetails.groupLoyaltyProgramDetails &&
            this.props.cart.loyaltyDetails.groupLoyaltyProgramDetails[0] &&
            this.props.cart.loyaltyDetails.groupLoyaltyProgramDetails[0].loyaltyPoints;
        let cliqCashAmount = isNaN(this.props.cliqCashAmount) ? 0 : this.props.cliqCashAmount;

        return (
            <div className={styles.lpWrapper}>
                {!this.props.isFromGiftCard && !this.props.isPaymentFailed && !this.props.isFromRetryUrl && (
                    <div className={styles.base}>
                        <div className={styles.giftCardAccrodian}>
                            <ManueDetails
                                text={GIFT_CARD}
                                subText="Redeem your gift card to pay using CLiQ Cash"
                                icon={giftCardIcon}
                                isNoBorderTop={true}
                            >
                                <GiftCardPopup
                                    isGiftCardHeader={false}
                                    heading="Have a gift card?"
                                    addGiftCard={val => this.props.redeemCliqVoucher(val)}
                                    voucherNumber={this.props.voucherNumber}
                                    voucherPin={this.props.voucherPin}
                                />
                            </ManueDetails>
                        </div>
                    </div>
                )}
                {loyaltyPoints && cliqCashAmount && !this.props.isPaymentFailed ? (
                    <div className={styles.ccLpInfoText}>
                        Please use either CLiQ Cash or Tata Loyalty points to complete the transaction.
                    </div>
                ) : null}
                {!this.props.isFromGiftCard &&
                !this.props.isFromRetryUrl &&
                (cliqCashAmount > 0 || this.props.isCliqCashApplied) ? (
                    <div className={styles.cliqCashBase}>
                        <CliqCashToggle
                            cashText="Use My CLiQ Cash Balance"
                            price={cliqCashAmount}
                            value={
                                (this.props.userCliqCashAmount && this.props.userCliqCashAmount !== "0.00") ||
                                this.props.isCliqCashApplied === true
                                    ? this.props.userCliqCashAmount
                                    : 0
                            }
                            // onToggle={val => this.props.handleClick(val)}
                            onToggle={val => this.cliqCashAlert(val)}
                            isFromGiftCard={this.props.isFromGiftCard}
                            addGiftCard={() => this.props.addGiftCard()}
                            isCliqCashApplied={this.props.isCliqCashApplied}
                            isRemainingBalance={this.props.isRemainingBalance}
                            onCheckout={this.props.onCheckout}
                            isPaymentFailed={this.props.isPaymentFailed}
                        />
                    </div>
                ) : null}
                {this.renderLoyaltyPoint()}
            </div>
        );
    }
}
LoyaltyCliqCashGiftWrapper.propTypes = {
    redeemCliqVoucher: PropTypes.func,
    onCheckout: PropTypes.func,
    addGiftCard: PropTypes.func,
    removeCliqCash: PropTypes.func,
    applyCliqCash: PropTypes.func,
    onChange: PropTypes.func,
    getLoyaltyTncData: PropTypes.func,
    loyaltyPointsApplied: PropTypes.func,
    cliqCashLoyaltyAlert: PropTypes.func,
    closeModal: PropTypes.func,
    removeLoyaltyPoints: PropTypes.func,
    hideModal: PropTypes.func,
    loyaltyDetails: PropTypes.func,
    applyLoyaltyPoints: PropTypes.func,
    voucherPin: PropTypes.number,
    voucherNumber: PropTypes.number,
    userCliqCashAmount: PropTypes.number,
    cliqCashAmount: PropTypes.number,
    isFromRetryUrl: PropTypes.bool,
    isPaymentFailed: PropTypes.bool,
    isFromGiftCard: PropTypes.bool,
    isRemainingBalance: PropTypes.bool,
    isCliqCashApplied: PropTypes.bool,
    lpPartialRedemption: PropTypes.func,
    cart: PropTypes.shape({
        loyaltyDetails: PropTypes.object,
        loyaltyPoints: PropTypes.object,
        loyaltyDetailsDelayed: PropTypes.bool,
        codEligibilityDetails: PropTypes.object,
        orderSummary: PropTypes.shape({
            products: PropTypes.array,
            totalPrice: PropTypes.string,
        }),
        cartDetailsCNC: PropTypes.object,
        paymentFailureOrderDetails: PropTypes.object,
        paymentModes: PropTypes.shape({
            minimumLoyaltyThreshold: PropTypes.string,
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
