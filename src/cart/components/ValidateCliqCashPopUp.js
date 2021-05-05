import React from "react";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import styles from "./InvalidCouponPopUp.css";
import { getCookie } from "../../lib/Cookie";
import { ERROR_CODE_FOR_BANK_OFFER_INVALID_7 } from "../actions/cart.actions";

export default class ValidateCliqCashPopUp extends React.Component {
    removeCliqCash() {
        localStorage.setItem("cliqCashAppliedWithOffer", true);
        if (this.props.removeCliqCash) {
            this.props.removeCliqCash();
            this.props.resetAllPaymentModes();
        }
        this.props.closeModal();
    }

    continueWithoutCoupon() {
        if (this.props.result && this.props.result.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_7) {
            localStorage.setItem("removeCliqCash", true);
        }
        if (this.props.releaseUserCoupon) {
            this.props.releaseUserCoupon(this.props.result.bankCoupontoRelease);
        }
        // this.props.resetAllPaymentModes();
        this.props.closeModal();
    }

    removeLoyaltyPoint() {
        if (this.props.removeloyaltyPoints) {
            const cartDetails = getCookie("cartDetails");
            let cartGuId = cartDetails && (JSON.parse(cartDetails).guid || getCookie("oldCartGuId"));
            let totalLoyaltyPoints =
                this.props.cart &&
                this.props.cart.loyaltyDetails &&
                this.props.cart.loyaltyDetails.groupLoyaltyProgramDetails &&
                this.props.cart.loyaltyDetails.groupLoyaltyProgramDetails[0].loyaltyPoints;
            let appliedLoyaltyPoints =
                this.props.cart &&
                this.props.cart.loyaltyPoints &&
                this.props.cart.loyaltyPoints.loyaltyPointsPaidAmount &&
                this.props.cart.loyaltyPoints.loyaltyPointsPaidAmount.value;
            this.props.removeloyaltyPoints(cartGuId, "remove", totalLoyaltyPoints, appliedLoyaltyPoints);

            this.props.resetAllPaymentModes();
        }
        this.props.closeModal();
    }

    removeCliqCashLoyalty() {
        if (this.props.result && this.props.result.error.includes("CLiQ")) {
            this.removeCliqCash();
        } else {
            this.removeLoyaltyPoint();
        }
    }

    componentWillUnmount() {
        document.body.style.pointerEvents = "auto";
    }

    render() {
        document.body.style.pointerEvents = "none";
        let labelForFirstButton;
        if (this.props.result && this.props.result.error.includes("CLiQ")) {
            labelForFirstButton = "Continue without CliqCash";
        } else {
            labelForFirstButton = "Continue without Loyalty";
        }
        let labelForSecondButton = "Continue without Offer";

        return (
            <div className={styles.base}>
                <div className={styles.paymentMethodDescription}>
                    {this.props && this.props.result && (
                        <div className={styles.headingText}>{this.props.result.error}</div>
                    )}
                    <div className={styles.buttonHolderForPaymentMode}>
                        <div className={styles.button}>
                            <Button
                                type="primary"
                                backgroundColor="#da1c5c"
                                height={36}
                                label={labelForFirstButton}
                                width={211}
                                textStyle={{ color: "#FFF", fontSize: 14 }}
                                onClick={() => this.removeCliqCashLoyalty()}
                            />
                        </div>
                    </div>
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
                </div>
            </div>
        );
    }
}

PropTypes.PropTypes = {
    removeCliqCash: PropTypes.func,
    closeModal: PropTypes.func,
    releaseUserCoupon: PropTypes.func,
    result: PropTypes.object,
};
