import React from "react";
import styles from "./ChangeExchangeCashabackModal.css";
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

  goToEchangeCashbackSelection(orderId, currentCashbackMode) {
    let exchangeCashbackSelectionURL = `/my-account/getAccountInfoForExchange?parentOrderId=${orderId}`;
    this.props.history.push({
      pathname: exchangeCashbackSelectionURL,
      state: { currentCashbackMode: currentCashbackMode, orderId: orderId }
    });
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
          <span className={styles.fontBold}>
            {this.props.exchangePaymentMode === "BANK_ACCOUNT" ? (
              <React.Fragment>
                Ac{" "}
                {this.props.accountNumber &&
                  this.props.accountNumber.replace(/.(?=.{4,}$)/g, "x")}
              </React.Fragment>
            ) : (
              this.state.placeHolder
            )}
          </span>{" "}
          within 48 hours, post old phone pick up.
        </div>
        <div className={styles.subHeading}>
          You can also change it later from Order Details Page
        </div>
        <div
          className={styles.okButton}
          onClick={() =>
            this.goToEchangeCashbackSelection(
              this.state.orderId,
              this.props.exchangePaymentMode
            )
          }
        >
          Change the cashback mode now
        </div>
      </div>
    );
  }
}
