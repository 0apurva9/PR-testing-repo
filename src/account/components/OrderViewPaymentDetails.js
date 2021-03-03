import React from "react";
import styles from "./OrderViewPaymentDetails.css";
import PropTypes from "prop-types";
import { RUPEE_SYMBOL } from "../../lib/constants";
export default class OrderViewPaymentDetails extends React.Component {
    render() {
        return (
            <div className={styles.base}>
                <div className={styles.paymentDetails}>Payment Details</div>
                <div className={styles.subTotalsHolder}>
                    <div className={styles.labelText}>Sub total</div>
                    {this.props.SubTotal && (
                        <div className={styles.infoText}>{`${RUPEE_SYMBOL}${this.props.SubTotal}`}</div>
                    )}
                </div>
                <div className={styles.deliverDataHolder}>
                    <div className={styles.labelText}>Delivery & Shipping Charges</div>
                    {this.props.DeliveryCharges && (
                        <div className={styles.infoText}>{`${RUPEE_SYMBOL} ${this.props.DeliveryCharges}`}</div>
                    )}
                </div>
                <div className={styles.discountDataHolder}>
                    <div className={styles.labelText}>Discount</div>
                    <div className={styles.infoText}>
                        {`-${RUPEE_SYMBOL} ${this.props.Discount ? this.props.Discount : 0}`}
                    </div>
                </div>
                <div className={styles.discountDataHolder}>
                    <div className={styles.labelText}>Coupon</div>
                    <div className={styles.infoText}>{`-${RUPEE_SYMBOL} ${
                        this.props.coupon ? this.props.coupon : 0
                    }`}</div>
                </div>
                {this.props.noCostEmiDiscount && this.props.noCostEmiDiscount > 0 ? (
                    <div className={styles.discountDataHolder} data-test="nce-discount-section">
                        <div className={styles.labelText} data-test="nce-discount-text">
                            No Cost EMI Discount
                        </div>
                        <div
                            className={styles.infoText}
                            data-test="nce-discount-value"
                        >{`-${RUPEE_SYMBOL} ${this.props.noCostEmiDiscount}`}</div>
                    </div>
                ) : (
                    ""
                )}
                <div className={styles.chargeHolder}>
                    <div className={styles.labelText}>Convenience Charges</div>
                    {this.props.ConvenienceCharges && (
                        <div className={styles.infoText}>{`${RUPEE_SYMBOL} ${this.props.ConvenienceCharges}`}</div>
                    )}
                </div>

                <div className={styles.subTotalsHolder}>
                    <div className={styles.labelText}>Cliq Cash Applied</div>

                    <div className={styles.infoText}>
                        {`${RUPEE_SYMBOL}${
                            this.props.cliqCashAmountDeducted ? this.props.cliqCashAmountDeducted : "0.0"
                        }`}
                    </div>
                </div>

                <div className={styles.totalHolder}>
                    <div className={styles.labelTextTotal}>Total Amount</div>

                    <div className={styles.infoTextTotal}>{`${RUPEE_SYMBOL} ${
                        this.props.Total ? this.props.Total : 0
                    }`}</div>
                </div>
            </div>
        );
    }
}
OrderViewPaymentDetails.propTypes = {
    ConvenienceCharges: PropTypes.string,
    DeliveryCharges: PropTypes.string,
    Discount: PropTypes.string,
    SubTotal: PropTypes.string,
    Total: PropTypes.string,
    cliqCashAmountDeducted: PropTypes.number,
    coupon: PropTypes.number,
    noCostEmiDiscount: PropTypes.number,
};
