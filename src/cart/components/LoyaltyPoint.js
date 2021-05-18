import React from "react";
import PropTypes from "prop-types";
import Toggle from "../../general/components/Toggle";
import styles from "./LoyaltyPoint.css";
import DesktopOnly from "../../general/components/DesktopOnly";
import Button from "../../general/components/Button";
export default class LoyaltyPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loyaltyDetailsCalledTimes: 0,
        };
    }

    onToggle(val) {
        if (this.props.onToggle) {
            this.props.onToggle(val);
        }
    }

    onClick() {
        if (this.props.lpPartialRedemption) {
            this.props.lpPartialRedemption({
                totalLoyaltyAmount: this.props.totalLoyaltyAmount,
            });
        }
    }

    loyaltyDetails() {
        if (this.props.loyaltyDetails && this.props.customerLoyal) {
            this.setState({ loyaltyDetailsCalledTimes: this.state.loyaltyDetailsCalledTimes + 1 });
            this.props.loyaltyDetails();
        }
    }

    termsAndCondition() {
        if (this.props.getLoyaltyTncData) {
            this.props.getLoyaltyTncData();
        }
    }

    handleClick = () => {
        if (this.props.onCheckout) {
            this.props.onCheckout();
        }
    };

    render() {
        let toggleDisable = this.props.value === 0 ? true : false;
        return (
            // eslint-disable-next-line react/no-string-refs
            <div className={styles.base} ref="clikCashRef">
                <div
                    className={
                        this.props.thresholdEligibility
                            ? styles.cashBalanceTextHolder
                            : styles.cashBalanceTextHolderExtraWidth
                    }
                >
                    <div className={styles.casBalanceText}>
                        {this.props.lpText}{" "}
                        <span className={styles.infoIconPoiner} onClick={() => this.termsAndCondition()}>
                            &#9432;
                        </span>
                    </div>
                    {this.props.thresholdEligibility ? (
                        <React.Fragment>
                            <div className={styles.cashRupyText}>
                                {`Balance : ${this.props.loyaltyAmount && this.props.loyaltyAmount} Points`}
                            </div>
                            {this.props.usedPoints ? (
                                <div
                                    className={styles.usedAmtText}
                                >{`Using ${this.props.usedPoints} points for this purchase`}</div>
                            ) : null}
                        </React.Fragment>
                    ) : this.props.loyaltyDetailsDelayed ? (
                        <React.Fragment>
                            <div className={styles.unableToFetchText}>Unable to fetch the loyalty points balance</div>
                            <div className={styles.retryLink} onClick={() => this.loyaltyDetails()}>
                                Retry
                            </div>
                        </React.Fragment>
                    ) : (
                        <div className={styles.cashRupyTextBlack}>
                            Sorry! Loyalty points cannot be redeemed on this cart.
                        </div>
                    )}
                </div>
                {this.props.thresholdEligibility ? (
                    <div className={styles.toggleButtonHolder}>
                        <div className={styles.toggleButton}>
                            <Toggle
                                active={this.props.loyaltyPointsApplied}
                                onToggle={val => this.onToggle(val)}
                                disabled={
                                    this.props.loyaltyPointsApplied && this.props.isPaymentFailed
                                        ? false
                                        : this.props.isPaymentFailed
                                        ? true
                                        : toggleDisable
                                }
                                activeDisable={
                                    this.props.loyaltyPointsApplied && this.props.isPaymentFailed ? true : false
                                }
                            />
                        </div>
                    </div>
                ) : null}
                {this.props.thresholdEligibility && this.props.loyaltyPaidAmount ? (
                    <div className={styles.actionButtonHolder}>
                        <div className={styles.usingPointsText}>
                            Using {this.props.loyaltyPaidAmount} points for this purchase
                        </div>
                        {!this.props.isPaymentFailed ? (
                            <div className={styles.actionButton}>
                                <div className={styles.editButton} onClick={() => this.onClick()}>
                                    Change
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : null}
                <DesktopOnly>
                    {this.props.cart.cartDetailsCNC &&
                        this.props.cart.cartDetailsCNC.cartAmount &&
                        this.props.cart.cartDetailsCNC.cartAmount.paybleAmount.value == 0 &&
                        this.props.loyaltyPointsApplied && (
                            <div className={styles.buttonHolder}>
                                <Button
                                    type="primary"
                                    backgroundColor="#ff1744"
                                    height={40}
                                    label="Pay now"
                                    width={150}
                                    textStyle={{
                                        color: "#FFF",
                                        fontSize: 14,
                                    }}
                                    onClick={this.handleClick}
                                />
                            </div>
                        )}
                </DesktopOnly>
            </div>
        );
    }
}
LoyaltyPoint.propTypes = {
    loyaltyDetailsDelayed: PropTypes.bool,
    loyaltyDetails: PropTypes.func,
    getLoyaltyTncData: PropTypes.func,
    onToggle: PropTypes.func,
    cashText: PropTypes.string,
    price: PropTypes.string,
    active: PropTypes.bool,
    addGiftCard: PropTypes.func,
    value: PropTypes.number,
    availablePoints: PropTypes.number,
    usedPoints: PropTypes.number,
    isCliqCashApplied: PropTypes.bool,
    lpText: PropTypes.string,
    loyaltyAmount: PropTypes.number,
    loyaltyPointsApplied: PropTypes.bool,
    isRemainingBalance: PropTypes.bool,
    loyaltyPaidAmount: PropTypes.number,
    lpPartialRedemption: PropTypes.func,
    totalLoyaltyAmount: PropTypes.number,
    thresholdEligibility: PropTypes.bool,
    cart: PropTypes.object,
    onCheckout: PropTypes.func,
    isPaymentFailed: PropTypes.bool,
    customerLoyal: PropTypes.bool,
};
LoyaltyPoint.defaultProps = {
    active: false,
};
