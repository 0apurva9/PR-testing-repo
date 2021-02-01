import React from "react";
import creditCardIcon from "./img/cod.svg";
import PropTypes from "prop-types";
import CodForm from "./CodForm.js";
import CodUnavailable from "./CodUnavailable";
import Button from "../../general/components/Button";
import DesktopOnly from "../../general/components/DesktopOnly";
import MenuDetails from "../../general/components/MenuDetails.js";
import styles from "./NetBanking.css";
import { CASH_ON_DELIVERY_PAYMENT_MODE } from "../../lib/constants";
import {
    WHATSAPP_NOTIFICATION_CHECKED,
    WHATSAPP_NOTIFICATION_UNCHECKED,
    getWhatsAppNotification,
} from "../../lib/adobeUtils";

export default class CheckoutCOD extends React.Component {
    binValidationForCOD = paymentMode => {
        this.props.binValidationForCOD(paymentMode);
    };

    softReservationForCODPayment = () => {
        this.props.softReservationForCODPayment();
    };

    handleCheckout = () => {
        if (this.props.whatsappSelected) {
            getWhatsAppNotification(WHATSAPP_NOTIFICATION_CHECKED);
        } else if (!this.props.whatsappSelected) {
            getWhatsAppNotification(WHATSAPP_NOTIFICATION_UNCHECKED);
        }
        if (this.props.onCheckout) {
            this.props.onCheckout();
        }
    };

    render() {
        if (this.props.isCliqCashApplied) {
            return null;
        } else {
            return (
                <div>
                    {this.props.cart &&
                    this.props.cart.codEligibilityDetails &&
                    this.props.cart.codEligibilityDetails.status ? (
                        <MenuDetails
                            text={CASH_ON_DELIVERY_PAYMENT_MODE}
                            isOpen={this.props.currentPaymentMode === CASH_ON_DELIVERY_PAYMENT_MODE}
                            onOpenMenu={currentPaymentMode => this.props.onChange({ currentPaymentMode })}
                            icon={creditCardIcon}
                        >
                            <div className={styles.contentHolder}>
                                <CodForm
                                    cart={this.props.cart}
                                    binValidationForCOD={paymentMode => this.binValidationForCOD(paymentMode)}
                                    verifyCaptcha={this.props.verifyCaptcha}
                                />
                            </div>
                            <DesktopOnly>
                                <div className={styles.contentHolder}>
                                    <div className={styles.buttonHolder} style={{ top: 60, right: 20 }}>
                                        <Button
                                            disabled={this.props.validateCOD()}
                                            type="primary"
                                            backgroundColor="#ff1744"
                                            height={40}
                                            label="Place order"
                                            width={150}
                                            textStyle={{
                                                color: "#FFF",
                                                fontSize: 14,
                                            }}
                                            onClick={this.handleCheckout}
                                        />
                                    </div>
                                </div>
                            </DesktopOnly>
                        </MenuDetails>
                    ) : (
                        <CodUnavailable message="Cash on delivery not available " />
                    )}
                </div>
            );
        }
    }
}

CheckoutCOD.propTypes = {
    binValidationForCOD: PropTypes.func,
    softReservationForCODPayment: PropTypes.func,
    cart: PropTypes.object,
    whatsappSelected: PropTypes.bool,
    onChange: PropTypes.func,
    onCheckout: PropTypes.func,
    isCliqCashApplied: PropTypes.bool,
    currentPaymentMode: PropTypes.string,
    verifyCaptcha: PropTypes.func,
    validateCOD: PropTypes.func,
};
