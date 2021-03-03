import React, { Component } from "react";
import styles from "./CliqGiftCardBuySend.css";
import { RouterPropTypes } from "../../general/router-prop-types";
import PropTypes from "prop-types";
import xCross from "./img/x-circle.svg";
import Input2 from "../../general/components/Input2";
import Button from "../../general/components/Button";
import { CHECKOUT_ROUTER, SUCCESS } from "../../lib/constants";
const PRODUCT_ID = "MP000000000127263";
const QUANTITY = "1";
const MOBILE_NUMBER = "999999999";

export const EGV_GIFT_CART_ID = "giftCartId";

export default class CliqGiftCardBuySend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAmount: this.props.selectedAmount
        ? this.props.selectedAmount
        : "",
      email: this.props.email ? this.props.email : "",
      senderName: this.props.senderName ? this.props.senderName : "",
      buyForYourself: true,
      sendGiftCard: false,
      emailValidate: false,
      starEmail: "",
      showStar: "",
      showUpdateSenderField: this.props.senderName !== "" ? false : true
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedAmount !== this.state.selectedAmount) {
      this.setState({ selectedAmount: nextProps.selectedAmount });
    }
    if (nextProps.giftCardDetailsStatus === SUCCESS) {
      let giftCardDetails = {};
      giftCardDetails.isFromGiftCard = true;
      giftCardDetails.egvCartGuid = nextProps.giftCardDetails.egvCartGuid;
      giftCardDetails.amount = this.state.selectedAmount;
      localStorage.setItem(EGV_GIFT_CART_ID, JSON.stringify(giftCardDetails));
      localStorage.setItem("GiftCardAmount", this.state.selectedAmount);
      localStorage.setItem("productType", "eGiftCard");
      this.props.history.push({
        pathname: CHECKOUT_ROUTER,
        state: {
          isFromGiftCard: true,
          egvCartGuid: nextProps.giftCardDetails.egvCartGuid,
          amount: this.state.selectedAmount
        }
      });
    }
  }

  componentWillMount() {
    if (this.props.clearGiftCardStatus) {
      this.props.clearGiftCardStatus();
    }
  }

  onSubmitDetails() {
    let minValue = this.props.minPrice;
    let maxValue = this.props.maxPrice;
    if (this.props.createGiftCardDetails) {
      const EMAIL_REGULAR_EXPRESSION = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if (this.props.createGiftCardDetails) {
        if (this.state.buyForYourself) {
          const giftCardDetails = {};
          giftCardDetails.from = this.state.senderName;
          giftCardDetails.quantity = QUANTITY;
          giftCardDetails.messageOnCard = "";
          giftCardDetails.productID = PRODUCT_ID;
          giftCardDetails.priceSelectedByUserPerQuantity = this.state.selectedAmount;
          giftCardDetails.receiverEmailID = this.state.email;
          giftCardDetails.receiverName = this.state.senderName;
          giftCardDetails.mobileNumber = MOBILE_NUMBER;
          giftCardDetails.productType = "eGiftCard";

          if (!this.state.selectedAmount) {
            this.props.displayToast("Please select the amount");
            return false;
          }
          if (
            !(
              this.state.selectedAmount <= maxValue &&
              this.state.selectedAmount >= minValue
            )
          ) {
            this.props.displayToast(
              `Amount should be greater than ₹${minValue}  and less than ₹${maxValue}.`
            );
            return false;
          }
          if (!this.state.email) {
            this.props.displayToast("Please fill e-mail address");
            return false;
          }
          if (!EMAIL_REGULAR_EXPRESSION.test(this.state.email)) {
            this.props.displayToast(
              "Please enter valid Receiver's email address"
            );
            return false;
          }
          if (!this.state.senderName) {
            this.props.displayToast("Please enter sender name");
            return false;
          } else {
            if (window._satellite) {
              window._satellite.track("cliqCash_Proceed_Click");
            }
            if (window && window.digitalData) {
              Object.assign(window.digitalData, {
                cliqcash: {
                  price: {
                    value: this.state.selectedAmount
                  }
                }
              });
            }
            if (window && window.digitalData) {
              Object.assign(window.digitalData, {
                cliqcash: {
                  checkbox: {
                    name: "Buy for yourself"
                  }
                }
              });
            }
            this.props.createGiftCardDetails(giftCardDetails);
          }
        } else {
          const giftCardDetails = {};
          giftCardDetails.from = this.state.senderName;
          giftCardDetails.quantity = QUANTITY;
          giftCardDetails.messageOnCard = this.state.message;
          giftCardDetails.productID = PRODUCT_ID;
          giftCardDetails.priceSelectedByUserPerQuantity = this.state.selectedAmount;
          giftCardDetails.receiverEmailID = this.state.email;
          giftCardDetails.receiverName = this.state.receiverName;
          giftCardDetails.mobileNumber = MOBILE_NUMBER;
          giftCardDetails.productType = "eGiftCard";
          if (!this.state.selectedAmount) {
            this.props.displayToast("Please select the amount");
            return false;
          }
          if (
            !(
              this.state.selectedAmount <= maxValue &&
              this.state.selectedAmount >= minValue
            )
          ) {
            this.props.displayToast(
              `Amount should be greater than ₹${minValue}  and less than ₹${maxValue}.`
            );
            return false;
          }
          if (!this.state.receiverName) {
            this.props.displayToast("Please fill receiver's name");
            return false;
          }
          if (this.state.starEmail !== this.state.email) {
            this.props.displayToast(
              "Receiver's e-mail and confirm e-mail do not match"
            );
            return false;
          }
          if (!this.state.email) {
            this.props.displayToast("Please fill recipient e-mail address");
            return false;
          }
          if (!EMAIL_REGULAR_EXPRESSION.test(this.state.email)) {
            this.props.displayToast(
              "Please enter valid Receiver's email address"
            );
            return false;
          }
          if (!this.state.senderName) {
            this.props.displayToast("Please enter sender name");
            return false;
          } else {
            if (window._satellite) {
              window._satellite.track("cliqCash_Proceed_Click");
            }
            if (window && window.digitalData) {
              Object.assign(window.digitalData, {
                cliqcash: {
                  price: {
                    value: this.state.selectedAmount
                  }
                }
              });
            }
            if (window && window.digitalData) {
              Object.assign(window.digitalData, {
                cliqcash: {
                  checkbox: {
                    name: "Send as Gift card"
                  }
                }
              });
            }
            this.props.createGiftCardDetails(giftCardDetails);
          }
        }
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.receivedGiftCardBox}>
          <div className={styles.receivedGiftCardHeading}>
            Send a CLiQ Gift Card
          </div>
          <div className={styles.cliqGiftCardPdp}>
            <span
              onClick={() =>
                this.setState({
                  buyForYourself: true,
                  sendGiftCard: false,
                  email: this.props.email ? this.props.email : "",
                  showUpdateSenderField: this.state.senderName ? false : true,
                  senderName: this.props.senderName ? this.props.senderName : ""
                })
              }
              className={
                this.state.buyForYourself ? styles.activeTab : styles.nonActive
              }
            >
              Buy for yourself
            </span>
            <span className={styles.tabSeparator}>|</span>
            <span
              onClick={() =>
                this.setState({
                  buyForYourself: false,
                  sendGiftCard: true,
                  email: "",
                  showUpdateSenderField: this.state.senderName ? false : true,
                  senderName: this.props.senderName ? this.props.senderName : ""
                })
              }
              className={
                this.state.sendGiftCard ? styles.activeTab : styles.nonActive
              }
            >
              Send as Gift card
            </span>
          </div>
          {this.state.buyForYourself ? (
            <div className={styles.buyForYourself}>
              <div className={styles.buyForYourselfsubHeading}>
                Your details
              </div>
              <div className={styles.buyGiftCardEmailField}>
                <Input2
                  hollow={true}
                  borderBottom={`2px solid ${
                    this.state.emailValidate ? "#d88600" : "#ececec"
                    }`}
                  textStyle={{ fontSize: 14, letterSpacing: "0.03px" }}
                  height={33}
                  noPadding={true}
                  placeholderMoving={true}
                  placeholderText={"Enter email ID of the receiver*"}
                  value={this.state.email}
                  onChange={email => this.setState({ email })}
                  type="text"
                  required={true}
                />
                {this.state.emailValidate ? (
                  <div className={styles.inputError}>
                    Enter A Valid Email ID*
                  </div>
                ) : null}
                {this.state.email ? (
                  <div
                    className={styles.crossSign}
                    onClick={() => this.setState({ email: "" })}
                  >
                    <img src={xCross} alt="cross sign" />
                  </div>
                ) : (
                    ""
                  )}
              </div>
              {this.state.showUpdateSenderField ? (
                <div className={styles.buyGiftCardEmailField}>
                  <Input2
                    hollow={true}
                    textStyle={{ fontSize: 14, letterSpacing: "0.03px" }}
                    height={33}
                    noPadding={true}
                    placeholderMoving={true}
                    placeholderText={"Enter name of the sender*"}
                    value={this.state.senderName}
                    onChange={senderName => this.setState({ senderName })}
                    type="text"
                    onlyAlphabet={true}
                    required={true}
                  />
                  {this.state.senderName ? (
                    <div
                      className={styles.crossSign}
                      onClick={() => this.setState({ senderName: "" })}
                    >
                      <img src={xCross} alt="cross sign" />
                    </div>
                  ) : (
                      ""
                    )}
                </div>
              ) : (
                  ""
                )}
              {!this.state.showUpdateSenderField &&
                this.state.senderName !== "" ? (
                  <div className={styles.changeNameDiv}>
                    <span className={styles.changeNameSpan}>
                      {this.state.senderName}
                    </span>
                    <span className={styles.changeNameFrom}> (from) </span>
                    <span
                      onClick={() =>
                        this.setState({ showUpdateSenderField: true })
                      }
                      className={styles.changeLink}
                    >
                      Change
                  </span>
                  </div>
                ) : (
                  ""
                )}
              <div className={styles.sendGiftCardBtn}>
                <Button
                  type="primary"
                  disabled={
                    this.state.email === "" || this.state.senderName === ""
                      ? true
                      : false
                  }
                  margin="auto"
                  height={36}
                  width={312}
                  label="Send a Gift Card"
                  color="#da1c5c"
                  backgroundColor={"#da1c5c"}
                  textStyle={{ color: "#da1c5c", fontSize: 14 }}
                  onClick={() => this.onSubmitDetails()}
                />
              </div>
            </div>
          ) : (
              ""
            )}
          {this.state.sendGiftCard ? (
            <div className={styles.buyForYourself}>
              <div className={styles.buyGiftCardEmailField}>
                <Input2
                  hollow={true}
                  borderBottom={`2px solid "#ececec" `}
                  textStyle={{ fontSize: 14, letterSpacing: "0.03px" }}
                  height={33}
                  noPadding={true}
                  placeholderMoving={true}
                  placeholderText={"Name of the Receiver*"}
                  value={this.state.receiverName}
                  onChange={receiverName => this.setState({ receiverName })}
                  type="text"
                  onlyAlphabet={true}
                  required={true}
                />
              </div>
              <div className={styles.buyGiftCardEmailField}>
                <Input2
                  hollow={true}
                  borderBottom={`2px solid ${
                    this.state.emailValidate ? "#d88600" : "#ececec"
                    }`}
                  textStyle={{ fontSize: 14, letterSpacing: "0.03px" }}
                  height={33}
                  noPadding={true}
                  placeholderMoving={true}
                  placeholderText={"Receiver's Email ID*"}
                  value={this.state.starEmail}
                  onChange={email => this.setState({ starEmail: email })}
                  type="password"
                  required={true}
                />
              </div>
              <div className={styles.buyGiftCardEmailField}>
                <Input2
                  hollow={true}
                  borderBottom={`2px solid ${
                    this.state.emailValidate ? "#d88600" : "#ececec"
                    }`}
                  textStyle={{ fontSize: 14, letterSpacing: "0.03px" }}
                  height={33}
                  noPadding={true}
                  placeholderMoving={true}
                  placeholderText={"Confirm Email ID Entered Above*"}
                  value={this.state.email}
                  onChange={email => this.setState({ email })}
                  type="text"
                  required={true}
                />
              </div>
              <div className={styles.buyGiftCardEmailField}>
                Send a message{" "}
                <span className={styles.optionalText}>(optional)</span>
              </div>
              <div className={styles.buyGiftCardEmailField}>
                <Input2
                  hollow={true}
                  borderBottom={`2px solid #ececec"`}
                  textStyle={{ fontSize: 14, letterSpacing: "0.03px" }}
                  height={33}
                  noPadding={true}
                  placeholderMoving={true}
                  placeholderText={"Write your message here"}
                  value={this.state.message}
                  onChange={message => this.setState({ message })}
                  type="text"
                  required={true}
                />
              </div>
              {this.state.showUpdateSenderField ? (
                <div className={styles.buyGiftCardEmailField}>
                  <Input2
                    hollow={true}
                    textStyle={{ fontSize: 14, letterSpacing: "0.03px" }}
                    height={33}
                    noPadding={true}
                    placeholderMoving={true}
                    placeholderText={"Enter name of the sender*"}
                    value={this.state.senderName}
                    onChange={senderName => this.setState({ senderName })}
                    type="text"
                    onlyAlphabet={true}
                    required={true}
                  />
                  {this.state.senderName ? (
                    <div
                      className={styles.crossSign}
                      onClick={() => this.setState({ senderName: "" })}
                    >
                      <img src={xCross} alt="cross sign" />
                    </div>
                  ) : (
                      ""
                    )}
                </div>
              ) : (
                  ""
                )}
              {!this.state.showUpdateSenderField &&
                this.state.senderName !== "" ? (
                  <div className={styles.changeNameDiv}>
                    <span className={styles.changeNameSpan}>
                      {this.state.senderName}
                    </span>
                    <span className={styles.changeNameFrom}> (from) </span>
                    <span
                      onClick={() =>
                        this.setState({ showUpdateSenderField: true })
                      }
                      className={styles.changeLink}
                    >
                      Change
                  </span>
                  </div>
                ) : (
                  ""
                )}
              <div className={styles.sendGiftCardBtn}>
                <Button
                  type="primary"
                  disabled={
                    this.state.email &&
                      this.state.receiverName &&
                      this.state.senderName
                      ? false
                      : true
                  }
                  margin="auto"
                  height={36}
                  width={312}
                  label="Send a Gift Card"
                  color="#da1c5c"
                  backgroundColor={"#da1c5c"}
                  textStyle={{ color: "#da1c5c", fontSize: 14 }}
                  onClick={() => this.onSubmitDetails()}
                />
              </div>
            </div>
          ) : (
              ""
            )}
        </div>
      </React.Fragment>
    );
  }
}
CliqGiftCardBuySend.propTypes = {
  selectedAmount: PropTypes.string,
  senderName: PropTypes.string,
  email: PropTypes.string,
  maxPrice: PropTypes.number,
  minPrice: PropTypes.number,
  displayToast: PropTypes.func,
  createGiftCardDetails: PropTypes.func,
  clearGiftCardStatus: PropTypes.func,
  ...RouterPropTypes
};
