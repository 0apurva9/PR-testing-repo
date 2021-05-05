import React from "react";
import SlideModal from "../../general/components/SlideModal";
import styles from "./CommonTncModal.css";
const TERMS_AND_CONDITION_TEXT = "Tata Loyalty Programme";
export default class CommonTncModal extends React.Component {
    render() {
        return (
            <SlideModal closeModal={this.props.closeModal} isCancelWhite={true}>
                <div className={styles.base}>
                    <div className={styles.header}>{TERMS_AND_CONDITION_TEXT}</div>
                    <div className={styles.content}>
                        {this.props.termsAndConditions && this.props.termsAndConditions.termsAndCondition && (
                            <div
                                className={styles.termsAndConditions}
                                dangerouslySetInnerHTML={{
                                    __html: this.props.termsAndConditions.termsAndCondition,
                                }}
                            />
                        )}
                    </div>
                </div>
            </SlideModal>
        );
    }
}
