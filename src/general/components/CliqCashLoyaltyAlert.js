import React, { Component } from "react";
import styles from "./CliqCashLoyaltyAlert.css";
import CenterSlideModal from "./CenterSlideModal";

export default class CliqCashLoyaltyAlert extends Component {
    render() {
        return (
            <CenterSlideModal crossIconHide={true}>
                <div className={styles.base}>
                    <div className={styles.header} onClick={() => this.props.closeModal()}>
                        <div className={styles.hideModal} />
                    </div>
                    <div className={styles.box}>
                        {this.props.data.heading && (
                            <div className={styles.contentHeader}>{this.props.data && this.props.data.heading}</div>
                        )}
                        <div className={styles.content}>{this.props.data.children}</div>
                    </div>
                </div>
            </CenterSlideModal>
        );
    }
}
