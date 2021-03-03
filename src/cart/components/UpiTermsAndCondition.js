import React from "react";
import styles from "./UpiTermsAndCondition.css";
import BottomSlideModalUpi from "../../general/components/BottomSlideModalUpi";
export default class UpiTermsAndCondition extends React.Component {
    onCancel() {
        if (this.props.closeModal) {
            this.props.closeModal();
        }
    }

    render() {
        return (
            <BottomSlideModalUpi heading="Terms and Conditions" closeModal={() => this.onCancel()}>
                <div className={styles.base}>
                    <div className={styles.bottomHolder}>
                        <div className={styles.applicationForm}>
                            <div
                                className={styles.labelHedaer}
                                dangerouslySetInnerHTML={{
                                    __html: this.props.ownProps ? this.props.ownProps : "",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </BottomSlideModalUpi>
        );
    }
}
