import React from "react";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import styles from "./InvalidCouponPopUp.css";
import { getCookie } from "../../lib/Cookie";

export default class ValidateLoyaltyPointPopup extends React.Component {
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
            this.props.loyaltyDetails();
            this.props.resetAllPaymentModes();
        }
        this.props.closeModal();
    }

    continueWithoutCoupon() {
        if (this.props.releaseUserCoupon) {
            this.props.releaseUserCoupon(this.props.result.bankCoupontoRelease);
        }
        this.props.resetAllPaymentModes();
        this.props.closeModal();
    }

    componentWillUnmount() {
        document.body.style.pointerEvents = "auto";
    }

    render() {
        document.body.style.pointerEvents = "none";
        let labelForFirstButton = "Continue without Loyalty Point";
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
                                width={250}
                                textStyle={{ color: "#FFF", fontSize: 14 }}
                                onClick={() => this.removeLoyaltyPoint()}
                            />
                        </div>
                    </div>
                    <div className={styles.buttonHolderForContinueCoupon}>
                        <div className={styles.button}>
                            <Button
                                type="secondary"
                                height={36}
                                label={labelForSecondButton}
                                width={250}
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
    removeloyaltyPoints: PropTypes.func,
    closeModal: PropTypes.func,
    releaseUserCoupon: PropTypes.func,
    result: PropTypes.object,
};
