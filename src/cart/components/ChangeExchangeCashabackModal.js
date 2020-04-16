import React from "react";
import styles from "./ChangeExchangeCashabackModal.css";
import Icon from "../../xelpmoc-core/Icon";
import exchangeCashbackIcon from "./img/exchangeCashback.svg";

export default class ChangeExchangeCashabackModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeHolder: "",
      orderId: ""
    };
  }
  componentDidMount() {
    if (this.props.exchangePaymentMode) {
      if (this.props.exchangePaymentMode === "CLIQ_CASH") {
        this.setState({ placeHolder: "CLiQ Cash wallet" });
      }
      if (this.props.exchangePaymentMode === "BANK_ACCOUNT") {
        this.setState({ placeHolder: "Bank Account" });
      }
    }
    if (this.props.orderId) {
      this.setState({ orderId: this.props.orderId });
    }
  }
  closeModal() {
    this.props.closeModal();
  }
  goToEchangeCashbackSelection(orderId) {
    let exchangeCashbackSelectionURL =
      "/my-account/getAccountInfoForExchange?parentOrderId=" + orderId;
    this.props.history.push(exchangeCashbackSelectionURL);
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.icon}>
          <img src={exchangeCashbackIcon} alt="exchangeCashbackIcon" />
        </div>
        <div className={styles.title}>Exchange Cashback Details</div>
        <div className={styles.subHeading}>
          Exchange Cashback will be credited in your{" "}
          <span className={styles.fontBold}>{this.state.placeHolder}</span>{" "}
          within 48hours, post old phone pick up.
        </div>
        <div className={styles.subHeading}>
          You can also change it later from Order Details Page
        </div>
        <div
          className={styles.okButton}
          onClick={() => this.goToEchangeCashbackSelection(this.state.orderId)}
        >
          Change the cashback mode now
        </div>
      </div>
    );
  }
}
