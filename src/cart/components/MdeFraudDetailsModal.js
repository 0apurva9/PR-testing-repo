import React from "react";
import styles from "./MdeFraudDetailsModal.css";
import Icon from "../../xelpmoc-core/Icon";
import exchangeCheck from "./img/exchangeUserIcon.svg";
import PropTypes from "prop-types";
import { MDE_FRAUD_CHECK_ERROR } from "../../lib/constants";

export default class MdeFraudDetailsModal extends React.Component {
  closeModal() {
    this.props.closeMdeFraudDetailsModal();
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.iconContainer}>
          <Icon image={exchangeCheck} size={154} />
        </div>
        <div className={styles.heading}>${`Exchange can't be proceed`}</div>
        <div className={styles.description}>{this.props.errorMessage}</div>
        <div className={styles.okButton} onClick={() => this.closeModal()}>
          Okay
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    sessionStorage.removeItem(MDE_FRAUD_CHECK_ERROR);
  }
}

MdeFraudDetailsModal.propTypes = {
  closeMdeFraudDetailsModal: PropTypes.func,
  errorMessage: PropTypes.string,
};
