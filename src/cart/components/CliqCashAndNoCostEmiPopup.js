import React from "react";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import styles from "./CliqCashAndNoCostEmiPopup.css";
import { NO_COST_EMI_COUPON, SUCCESS } from "../../lib/constants";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
export default class CliqCashAndNoCostEmiPopup extends React.Component {
    continueWithNoCostEmi() {
        if (this.props.continueWithNoCostEmi) {
            this.props.continueWithNoCostEmi();
        }
    }

    async useCliqCash() {
        const releaseNoCostEmi = await this.props.removeNoCostEmi(localStorage.getItem(NO_COST_EMI_COUPON));

        if (releaseNoCostEmi.status === SUCCESS) {
            this.props.doCallForApplyCliqCash();
            this.props.handleClose();
        }
    }

    render() {
        return (
            <React.Fragment>
                <MobileOnly>
                    <div className={styles.base}>
                        <div className={styles.paymentMethodDescription}>
                            <div className={styles.heading}>Cliq Cash and No Cost Emi can not use together</div>
                            <div className={styles.subHeading}>
                                Please choose to use your CliQ Cash balance or continue with No Cost EMI
                            </div>
                        </div>
                        <div className={styles.buttonHolderForPaymentMode}>
                            <div className={styles.button}>
                                <Button
                                    type="primary"
                                    backgroundColor="#ff1744"
                                    height={36}
                                    label="Continue with No Cost Emi"
                                    width={211}
                                    textStyle={{ color: "#FFF", fontSize: 14 }}
                                    onClick={() => this.continueWithNoCostEmi()}
                                />
                            </div>
                        </div>
                        <div className={styles.buttonHolderForContinueCoupon}>
                            <div className={styles.button}>
                                <Button
                                    type="secondary"
                                    height={36}
                                    label="Use Cliq Cash"
                                    width={211}
                                    onClick={() => this.useCliqCash()}
                                />
                            </div>
                        </div>
                    </div>
                </MobileOnly>
                <DesktopOnly>
                    <BottomSlideModal>
                        <div className={styles.base}>
                            <div className={styles.paymentMethodDescription}>
                                <div className={styles.heading}>Cliq Cash and No Cost Emi can not use together</div>
                                <div className={styles.subHeading}>
                                    Please choose to use your CliQ Cash balance or continue with No Cost EMI
                                </div>
                            </div>
                            <div className={styles.buttonHolderForPaymentMode}>
                                <div className={styles.button}>
                                    <Button
                                        type="primary"
                                        backgroundColor="#ff1744"
                                        height={36}
                                        label="Continue with No Cost Emi"
                                        width={211}
                                        textStyle={{ color: "#FFF", fontSize: 14 }}
                                        onClick={() => this.continueWithNoCostEmi()}
                                    />
                                </div>
                            </div>
                            <div className={styles.buttonHolderForContinueCoupon}>
                                <div className={styles.button}>
                                    <Button
                                        type="secondary"
                                        height={36}
                                        label="Use Cliq Cash"
                                        width={211}
                                        onClick={() => this.useCliqCash()}
                                    />
                                </div>
                            </div>
                        </div>
                    </BottomSlideModal>
                </DesktopOnly>
            </React.Fragment>
        );
    }
}
CliqCashAndNoCostEmiPopup.propTypes = {
    cardLogo: PropTypes.string,
    continueWithNoCostEmi: PropTypes.func,
    useCliqCash: PropTypes.func,
    couponCode: PropTypes.string,
    removeNoCostEmi: PropTypes.func,
    doCallForApplyCliqCash: PropTypes.func,
    handleClose: PropTypes.func,
};
