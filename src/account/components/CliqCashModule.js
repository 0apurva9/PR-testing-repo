import React, { Component } from "react";
import { RouterPropTypes } from "../../general/router-prop-types";
import styles from "./CliqCashModule.css";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import Input2 from "../../general/components/Input2";
import Button from "../../general/components/Button";
import PropTypes from "prop-types";
import {
  GIFT_CARD_HEADER_TEXT,
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_CHECK_BALANCE_PAGE,
  FAILURE_LOWERCASE,
  SUCCESS
} from "../../lib/constants";

const NUMBER_REGEX = /^[0-9]+$/;

export default class CliqCashModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: this.props.cardNumber ? this.props.cardNumber : "",
      cardPin: this.props.pinNumber ? this.props.pinNumber : "",
      cardError: false,
      sendRecentTransactions: true
    };
  }

  componentDidMount() {
    this.props.setHeaderText(GIFT_CARD_HEADER_TEXT);
  }

  getRedeemCliqVoucher = () => {
    if (this.state.cardNumber && this.state.cardPin) {
      this.setState({ cliqCashUpdate: true });
      if (this.props.redeemCliqVoucher && this.props.addCard) {
        this.props.redeemCliqVoucher(this.state);
      }
      if (this.props.checkBalance && this.props.isCheckBalance) {
        this.props.checkBalance(this.state);
      }
    } else {
      this.props.displayToast("Please enter all details");
    }
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (
      this.props.checkBalance &&
      this.props.isCheckBalance &&
      nextProps.checkBalanceStatus &&
      nextProps.checkBalanceStatus.toLowerCase() === FAILURE_LOWERCASE
    ) {
      this.setState({ cardError: true });
    } else if (
      this.props.checkBalance &&
      this.props.isCheckBalance &&
      nextProps.checkBalanceStatus &&
      nextProps.checkBalanceStatus.toLowerCase() === SUCCESS
    ) {
      this.props.history.push({
        pathname: `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CHECK_BALANCE_PAGE}`,
        state: {
          isModal: true
        }
      });
    }
  };

  onChangeCardNumber(cardNumber) {
    this.setState({ cardError: false });
    if (cardNumber === "" || NUMBER_REGEX.test(cardNumber))
      if (cardNumber.length <= 16) {
        this.setState({ cardNumber: cardNumber });
      }
  }

  onChangePinNumber(cardPin) {
    this.setState({ cardError: false });
    if (cardPin === "" || NUMBER_REGEX.test(cardPin))
      if (cardPin.length <= 6) {
        this.setState({ cardPin });
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

  render() {
    if (this.props.loading) {
      this.props.showSecondaryLoader();
    } else {
      this.props.hideSecondaryLoader();
    }
    return (
      <BottomSlideModal>
        <div className={styles.base}>
          <div className={styles.cliqCashHolder}>
            <div
              className={styles.header}
              onClick={() => this.props.closeModal()}
            >
              {this.props.heading ? this.props.heading : "Gift Card Details"}
              <div className={styles.hideModal} />
            </div>
            {this.props.checkBalance && this.props.isCheckBalance ? (
              <React.Fragment>
                <div className={styles.subText}>
                  The value of your Gift Card will be added to your CLiQ Cash
                  balance. Use it for a seamless experience.
                </div>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <div className={styles.subText}>
                    Your Gift Card Amount will be added to your CLiQ Cash.
                </div>
                  <div className={styles.subTextSpan}>
                    You can claim it at the time of checkout
                </div>
                </React.Fragment>
              )}

            <div className={styles.inputContainer}>
              <div className={styles.cardNumber}>
                <Input2
                  hollow={true}
                  noPadding={true}
                  placeholderMoving={true}
                  placeholder={"Gift Card Number"}
                  borderBottom="1px solid #4a4a4a"
                  textStyle={{ fontSize: 14, letterSpacing: "0.03px" }}
                  height={33}
                  value={
                    this.props.cardNumber
                      ? this.props.cardNumber
                      : this.state.cardNumber
                  }
                  onChange={cardNumber => this.onChangeCardNumber(cardNumber)}
                  onlyNumber={true}
                  required={true}
                />
              </div>
              <div className={styles.cardNumber}>
                <Input2
                  hollow={true}
                  borderBottom="1px solid #000000"
                  noPadding={true}
                  onlyNumber={true}
                  placeholderMoving={true}
                  placeholder={"Gift Card Pin"}
                  value={
                    this.props.pinNumber
                      ? this.props.pinNumber
                      : this.state.cardPin
                  }
                  onChange={cardPin => this.onChangePinNumber(cardPin)}
                  textStyle={{ fontSize: 14 }}
                  height={33}
                  required={true}
                />
                {this.state.cardError ? (
                  <span className={styles.cardNumberError}>
                    {this.props.checkBalanceDetailsError !== ""
                      ? this.props.checkBalanceDetailsError
                      : "Enter a valid gift card number"}
                  </span>
                ) : (
                    ""
                  )}
              </div>
            </div>

            <div className={styles.buttonHolder}>
              <Button
                label={this.props.btnLabel}
                type="linearGradient"
                width={178}
                height={36}
                linearColor={{
                  fromColor: "#da1c5c",
                  toColor: "#da1c5c"
                }}
                onClick={() => this.getRedeemCliqVoucher()}
              />
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
  closeModal: PropTypes.func,
  setHeaderText: PropTypes.func,
  addCard: PropTypes.bool,
  checkBalance: PropTypes.func,
  isCheckBalance: PropTypes.bool,
  displayToast: PropTypes.func,
  hideSecondaryLoader: PropTypes.func,
  showSecondaryLoader: PropTypes.func,
  checkBalanceDetailsError: PropTypes.string,
  btnLabel: PropTypes.string,
  loading: PropTypes.bool,
  heading: PropTypes.string,
  ...RouterPropTypes
};
