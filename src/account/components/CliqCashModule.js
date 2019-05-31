import React, { Component } from "react";
import styles from "./CliqCashModule.css";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import Input2 from "../../general/components/Input2";
import Button from "../../general/components/Button";
import PropTypes from "prop-types";
export default class CliqCashModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: this.props.cardNumber ? this.props.cardNumber : "",
      pinNumber: this.props.pinNumber ? this.props.cardNumber : ""
    };
  }
  redeemCliqVoucher() {
    if (this.state.cardNumber && this.state.pinNumber) {
      this.setState({ cliqCashUpdate: true });
      if (this.props.redeemCliqVoucher) {
        this.props.redeemCliqVoucher(this.state);
      }
    } else {
      this.props.displayToast("Please enter all details");
    }
  }
  onCancel() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }
  displayToast = message => {
    if (this.props.displayToast) {
      this.props.displayToast(message);
    }
  };
  showCliqCashSucessModule = () => {
    if (this.props.showCliqCashSucessModule) {
      this.props.showCliqCashSucessModule(this.props);
    }
  };
  render() {
    return (
      <BottomSlideModal crossIconHide="true">
        <div className={styles.base}>
          <div
            className={styles.header}
            onClick={() => this.props.closeModal()}
          >
            Gift Card Details
          </div>
          <div className={styles.subText}>
            Your Gift Card Amount will be added to your CLiQ Cash. You can claim
            it at the time of checkout.
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.cardNumber}>
              <Input2
                placeholder={"Gift Card Number"}
                hollow={true}
                border={"none"}
                borderBottom="1px solid #4a4a4a"
                textStyle={{ fontSize: 14, letterSpacing: "0.03px" }}
                height={33}
                value={
                  this.props.cardNumber
                    ? this.props.cardNumber
                    : this.state.cardNumber
                }
                onChange={cardNumber => this.setState({ cardNumber })}
                onlyNumber={true}
              />
            </div>
            <div className={styles.pinNumber}>
              <Input2
                hollow={true}
                border={"none"}
                borderBottom="1px solid #4a4a4a"
                onlyNumber={true}
                placeholder="Gift Card Pin"
                value={
                  this.props.pinNumber
                    ? this.props.pinNumber
                    : this.state.pinNumber
                }
                onChange={pinNumber => this.setState({ pinNumber })}
                textStyle={{ fontSize: 14 }}
                height={33}
              />
            </div>
          </div>

          <div className={styles.buttonHolder}>
            <div
              className={styles.button}
              onClick={() => this.showCliqCashSucessModule()}
            >
              <div className={styles.buttonText}>Add Gift Card</div>
            </div>
          </div>
        </div>
      </BottomSlideModal>
    );
  }
}
CliqCashModule.propTypes = {
  cardNumber: PropTypes.number,
  pinNumber: PropTypes.number,
  redeemCliqVoucher: PropTypes.func,
  showCliqCashSucessModule: PropTypes.func,
  closeModal: PropTypes.func
};
