import React from "react";
import PropTypes from "prop-types";
import styles from "./HollowHeader.css";
import orderIcon from "./img/order-history.svg";
import backArrow from "./img/arrowBack.svg";
import downloadIcon from "../../general/components/img/download.svg";
import { Icon } from "xelpmoc-core";
export default class HollowHeader extends React.Component {
  backPage() {
    if (this.props.backPage) {
      this.props.backPage();
    }
  }
  orderProduct() {
    if (this.props.orderProduct) {
      this.props.orderProduct();
    }
  }
  downloadProduct() {
    if (this.props.downloadProduct) {
      this.props.downloadProduct();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.backArrowHolder} onClick={() => this.backPage()}>
          <Icon image={backArrow} size={20} />
        </div>
        <div className={styles.historyDownloadIcon}>
          <div
            className={styles.orderIconHolder}
            onClick={() => this.orderProduct()}
          >
            <Icon image={orderIcon} size={20} />
          </div>
          <div
            className={styles.downloadIconHolder}
            onClick={() => this.downloadProduct()}
          >
            <Icon image={downloadIcon} size={20} />
          </div>
        </div>
      </div>
    );
  }
}
HollowHeader.propTypes = {
  backPage: PropTypes.func,
  orderProduct: PropTypes.func,
  downloadProduct: PropTypes.func
};
