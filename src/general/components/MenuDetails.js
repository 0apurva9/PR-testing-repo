import React from "react";
import styles from "./MenuDetails.css";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import Icon from "../../xelpmoc-core/Icon";
import couponIcon from "./img/credit-card.svg";
import { setDataLayerForCheckoutDirectCalls, ADOBE_CALL_FOR_SELECTING_PAYMENT_MODES } from "../../lib/adobeUtils";
import {
    EASY_MONTHLY_INSTALLMENTS,
    NET_BANKING_PAYMENT_MODE,
    CART_DETAILS_FOR_LOGGED_IN_USER,
    UPI,
    EMI,
    RETRY_PAYMENT_CART_ID,
    NO_COST_EMI_COUPON,
} from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";

export default class MenuDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen,
        };
    }

    checkupi = async () => {
        if (this.state.isOpen) {
            this.openMenu();
        } else {
            let response;
            let cartGuidUPI = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
            let egvGuidUPI = Cookie.getCookie("egvCartGuid");

            if (cartGuidUPI) {
                cartGuidUPI = JSON.parse(cartGuidUPI).guid;
            }

            if (this.props.isFromGiftCard) {
                if (egvGuidUPI) {
                    response = await this.props.checkUPIEligibility(egvGuidUPI);
                }
            } else {
                if (cartGuidUPI) {
                    if (this.props.retryCartGuid) {
                        response = await this.props.checkUPIEligibility(this.props.retryCartGuid);
                    } else {
                        response = await this.props.checkUPIEligibility(cartGuidUPI);
                    }
                }
            }

            await this.props.binValidationForUPI(UPI);
            if (
                response.status &&
                response.status === "success" &&
                response.checkUPIEligibility &&
                response.checkUPIEligibility.isUpiPaymentEligible
            ) {
                this.openMenu();
            }
        }
    };

    checkEMI = async () => {
        if (this.props.retryFlagDCEmi === "true" || this.props.retryFlagEmiCoupon === "true") {
            return;
        }
        if (!this.state.isOpen && this.props.getEMIEligibilityDetails) {
            if (this.props.isFromRetryUrl) {
                await this.props.getEMIEligibilityDetails(JSON.parse(localStorage.getItem(RETRY_PAYMENT_CART_ID)));
            } else {
                await this.props.getEMIEligibilityDetails();
            }
            if (this.props.emiEligibiltyDetails && !this.props.emiEligibiltyDetails.error) {
                this.openMenu();
            }
            if (this.props.emiEligibiltyDetails && this.props.emiEligibiltyDetails.error) {
                this.props.onOpenMenu(null);
            }
        } else if (this.state.isOpen) {
            const emiCoupon = localStorage.getItem(NO_COST_EMI_COUPON);
            if (emiCoupon) {
                this.props.removeNoCostEmi(emiCoupon);
            }
            this.openMenu();
        }
    };

    openMenu() {
        // let cartGuidUPI = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
        let isOpen = !this.state.isOpen;
        if (isOpen) {
            setDataLayerForCheckoutDirectCalls(
                ADOBE_CALL_FOR_SELECTING_PAYMENT_MODES,
                this.props.textValue ? this.props.textValue : this.props.text
            );
        }
        this.setState({ isOpen });
        if (this.props.onOpenMenu) {
            if (isOpen) {
                this.props.onOpenMenu(this.props.textValue ? this.props.textValue : this.props.text);
            } else {
                this.props.onOpenMenu(null);
            }
        }
        if (isOpen) {
            if (this.props.text === NET_BANKING_PAYMENT_MODE && !this.props.bankList) {
                this.props.getNetBankDetails();
            } else if (this.props.text === EASY_MONTHLY_INSTALLMENTS && !this.props.emiList) {
                this.props.getEmiBankDetails();
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.state.isOpen) {
            this.setState({ isOpen: nextProps.isOpen });
        }
    }

    render() {
        let iconActive = styles.icon;
        if (this.state.isOpen) {
            iconActive = styles.iconup;
        }
        return (
            <div
                className={styles.base}
                style={{
                    borderTop: this.props.isNoBorderTop ? "none" : "1px solid #ececec",
                }}
            >
                {this.props.isCliqCashApplied || this.props.loyaltyPointsApplied ? (
                    <div className={styles.holder}>
                        <div className={[styles.holderDisabled, styles.debitCardIcon].join(" ")}>
                            <Icon image={this.props.icon} size={25} />
                        </div>
                        <div className={this.props.subText ? styles.subTextBox : styles.textBox}>
                            <span className={styles.holderDisabled}>
                                {this.props.text === UPI ? "UPI ID" : this.props.text}
                            </span>
                            {this.props.subText ? <span className={styles.subText}>{this.props.subText}</span> : null}
                            <span className={styles.tooltip}>
                                <span className={styles.infoIconPoiner}>&#9432;</span>
                                <div className={styles.tooltiptext}>
                                    <div className={styles.textBoxTooltip}>
                                        {this.props.popUpHeading1} <span>&#9432;</span>
                                    </div>
                                    <div>{this.props.popUpHeading2}</div>
                                </div>
                            </span>
                            {this.props.secondIcon && !this.state.isOpen && (
                                <div className={styles.secondIcon}>
                                    <Icon image={this.props.secondIcon} size={37} backgroundSize={`100%`} />
                                </div>
                            )}
                            <div className={iconActive} />
                        </div>
                    </div>
                ) : (
                    <div
                        className={styles.holder}
                        onClick={() =>
                            this.props.text === UPI
                                ? this.checkupi()
                                : this.props.text === EMI
                                ? this.checkEMI()
                                : this.openMenu()
                        }
                    >
                        <div className={styles.debitCardIcon}>
                            <Icon image={this.props.icon} size={25} />
                        </div>
                        <div className={this.props.subText ? styles.subTextBox : styles.textBox}>
                            <span>{this.props.text === UPI ? "UPI ID" : this.props.text}</span>
                            {this.props.subText ? <span className={styles.subText}>{this.props.subText}</span> : null}
                            {this.props.secondIcon && !this.state.isOpen && (
                                <div className={styles.secondIcon}>
                                    <Icon image={this.props.secondIcon} size={37} backgroundSize={`100%`} />
                                </div>
                            )}
                            <div className={iconActive} />
                        </div>
                    </div>
                )}

                <Collapse isOpened={this.state.isOpen}>{this.props.children}</Collapse>
            </div>
        );
    }
}
MenuDetails.propTypes = {
    subText: PropTypes.bool,
    isCliqCashApplied: PropTypes.bool,
    loyaltyPointsApplied: PropTypes.bool,
    popUpHeading1: PropTypes.string,
    popUpHeading2: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
    onOpenMenu: PropTypes.func,
    isNoBorderTop: PropTypes.bool,
    getEMIEligibilityDetails: PropTypes.func,
    emiEligibiltyDetails: PropTypes.shape({
        isCCEMIEligible: PropTypes.bool,
        isCCNoCostEMIEligible: PropTypes.bool,
        isDCEMIEligible: PropTypes.bool,
        isDCNoCostEMIEligible: PropTypes.bool,
        error: PropTypes.string,
        nonEmiProdList: PropTypes.array,
        type: PropTypes.string,
    }),
    retryFlagEmiCoupon: PropTypes.string,
    retryFlagDCEmi: PropTypes.string,
    isFromRetryUrl: PropTypes.bool,
    removeNoCostEmi: PropTypes.func,
    isOpen: PropTypes.bool,
    isFromGiftCard: PropTypes.bool,
    checkUPIEligibility: PropTypes.func,
    retryCartGuid: PropTypes.string,
    textValue: PropTypes.string,
    bankList: PropTypes.array,
    getEmiBankDetails: PropTypes.func,
    emiList: PropTypes.array,
    secondIcon: PropTypes.string,
    children: PropTypes.node,
    getNetBankDetails: PropTypes.func,
    binValidationForUPI: PropTypes.func,
};

MenuDetails.defaultProps = {
    icon: couponIcon,
    isNoBorderTop: false,
    emiEligibiltyDetails: {},
    retryFlagEmiCoupon: false,
    retryFlagDCEmi: false,
    isFromRetryUrl: false,
    removeNoCostEmi: () => {},
};
