import React from "react";
import styles from "./PaymentBanner.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import { HOME_ROUTER } from "../../lib/constants.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import Image from "../../xelpmoc-core/Image";
import paymentConfirmation from "./img/PaymentConfirmation.svg";
import { RouterPropTypes } from "../../general/router-prop-types";
export default class PaymentBanner extends React.Component {
    handleClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    onContinueShopping() {
        this.props.history.push(HOME_ROUTER);
    }

    render() {
        return (
            <div className={styles.base}>
                <div className={styles.orderInnerBox}>
                    <div className={styles.PaymentConfirmationImage}>
                        <Image image={paymentConfirmation} />
                    </div>

                    {!this.props.COD ? (
                        <div className={styles.orderHeading}>Thank you for shopping with us!</div>
                    ) : (
                        <div className={styles.orderHeading}>Thank you! We have received your order.</div>
                    )}

                    {!this.props.COD ? (
                        <div className={styles.orderSubText}>
                            Please check your email for order confirmation and order details.
                        </div>
                    ) : (
                        <div className={styles.orderLabel}>{`Order Id: ${this.props.label}`}</div>
                    )}

                    {this.props.isTrack && (
                        <div className={styles.buttonHolder}>
                            <Button
                                type="hollow"
                                color="#fff"
                                label={this.props.buttonText}
                                width={150}
                                onClick={() => this.handleClick()}
                            />
                        </div>
                    )}
                    <DesktopOnly>
                        {this.props.isContinueShopping && (
                            <div className={styles.buttonHolder}>
                                <div className={styles.button} onClick={() => this.onContinueShopping()}>
                                    {this.props.continueButton}
                                </div>
                            </div>
                        )}
                        {!this.props.isGiftCard && (
                            <div className={styles.buttonHolder} style={{ marginLeft: 10 }}>
                                <Button
                                    type="hollow"
                                    color="#212121"
                                    label="View Orders"
                                    height={37}
                                    width={175}
                                    onClick={() => this.handleClick()}
                                />
                            </div>
                        )}
                    </DesktopOnly>
                </div>
            </div>
        );
    }
}
PaymentBanner.propTypes = {
    headingText: PropTypes.string,
    label: PropTypes.string,
    buttonText: PropTypes.string,
    onClick: PropTypes.func,
    isTrack: PropTypes.bool,
    ...RouterPropTypes,
};

PaymentBanner.defaultProps = {
    buttonText: "Track Order",
    isTrack: false,
    isContinueShopping: false,
    continueButton: "Continue Shopping",
    COD: false,
};
