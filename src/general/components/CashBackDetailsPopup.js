import React, { Component } from "react";
import styles from "./CashBackDetailsPopup.css";
import BottomSlideModal from "./BottomSlideModal";

export default class CashBackDetailsPopup extends Component {
  render() {
    return (
      <BottomSlideModal>
        <div className={styles.base}>
          <div
            className={styles.header}
            onClick={() => this.props.closeModal()}
          >
            <div className={styles.hideModal} />
          </div>
          <div className={styles.box}>
            {this.props.data.heading && (
              <div className={styles.contentHeader}>
                {this.props.data && this.props.data.heading}
              </div>
            )}
            <div className={styles.content}>{this.props.data.children}</div>
          </div>
        </div>
      </BottomSlideModal>
    );
  }
}
