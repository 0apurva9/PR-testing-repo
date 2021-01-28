import React from "react";
import styles from "./UpiTermsAndCondition.css";
import BottomSlideModalUpi from "../../general/components/BottomSlideModalUpi";
export default class UpiHowToPay extends React.Component {
    onCancel() {
        if (this.props.closeModal) {
            this.props.closeModal();
        }
    }

    render() {
        return (
            <BottomSlideModalUpi heading="How to pay via UPI" closeModal={() => this.onCancel()}>
                <div className={styles.base}>
                    <div className={styles.bottomHolder}>
                        <div className={styles.applicationForm}>
                            <div className={styles.labelHedaer}>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus tellus rutrum
                                    risus tempus, non fermentum est accumsan.
                                </p>
                                <br />
                                <p>Open the UPI linked app on your phone.</p>
                                <br />
                                <p>
                                    Check the collect request from Tata CLiQ in pending transactions in linked UPI app.
                                </p>
                                <br />
                                <p>Complete the payment by accepting the request and entering the UPI pin.</p>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </BottomSlideModalUpi>
        );
    }
}
