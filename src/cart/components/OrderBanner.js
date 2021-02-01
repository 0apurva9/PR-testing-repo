import React from "react";
import styles from "./OrderBanner.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import { HOME_ROUTER } from "../../lib/constants.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import Image from "../../xelpmoc-core/Image";
import paymentConfirmation from "./img/orderConfirmation.svg";
import { RouterPropTypes } from "../../general/router-prop-types";
import { setDataLayerForCartDirectCalls, ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING } from "../../lib/adobeUtils";
export default class OrderBanner extends React.Component {
    handleClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    onContinueShopping() {
        setDataLayerForCartDirectCalls(ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING);
        this.props.history.push(HOME_ROUTER);
    }

    render() {
        return (
            <div className={styles.base}>
                <div className={styles.orderInnerBox}>
                    <div className={styles.PaymentConfirmationImage}>
                        <Image image={paymentConfirmation} />
                    </div>
                    {this.props.pickUpPersonMobile ? (
                        <React.Fragment>
                            <div className={styles.orderHeading}>Thank You! Your payment is confirmed.</div>
                            <div className={styles.orderLabel}>
                                <span className={styles.boldText}>OTP</span> {` has been sent to `}{" "}
                                <span className={styles.boldText}>{`+91- ${this.props.pickUpPersonMobile}`}</span>
                            </div>
                            <div className={styles.pickStoreHeading}>
                                Please show OTP while picking up the order from the Store.
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div
                                className={styles.orderHeading}
                            >{`Thank You! We received your order Order Id: ${this.props.label}`}</div>
                        </React.Fragment>
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
                                    label="View order details"
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

OrderBanner.propTypes = {
    headingText: PropTypes.string,
    label: PropTypes.string,
    buttonText: PropTypes.string,
    onClick: PropTypes.func,
    isTrack: PropTypes.bool,
    ...RouterPropTypes,
};

OrderBanner.defaultProps = {
    buttonText: "Track Order",
    isTrack: false,
    isContinueShopping: false,
    continueButton: "Continue Shopping",
};
