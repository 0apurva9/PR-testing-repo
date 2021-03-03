import React from "react";
import AwbForm from "./AwbForm.js";
import styles from "./UpdateRefundDetailsPopup.css";
import Icon from "../../xelpmoc-core/Icon";
import crossIcon from "../../general/components/img/cancelBlack.svg";
import BottomSlideModal from "../../general/components/BottomSlideModal.js";
export default class UpdateRefundDetailsPopup extends React.Component {
  onUpdate(val) {
    if (this.props.onUpdate) {
      this.props.onUpdate(val);
    }
  }

  handleClick() {
    this.props.closeModal();
  }

  render() {
    return (
      <BottomSlideModal crossIconHide="false">
        <div className={styles.base}>
          <div className={styles.header}>
            <div className={styles.headerText}>Update Refund Details</div>
            <div className={styles.close} onClick={() => this.handleClick()}>
              <Icon image={crossIcon} size={12} />
            </div>
          </div>
          <AwbForm
            onUpdate={val => this.onUpdate(val)}
            displayToast={this.props.displayToast}
          />
        </div>
      </BottomSlideModal>
    );
  }
}
