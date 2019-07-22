import React from "react";
import styles from "./GiftCard.css";
import Image from "../../xelpmoc-core/Image.js";
import PropTypes from "prop-types";
import ControlInput from "../../general/components/ControlInput";
import TextArea from "../../general/components/TextArea";
import FooterButton from "../../general/components/FooterButton.js";
import MediaQuery from "react-responsive";
import Button from "../../xelpmoc-core/Button";
import { CHECKOUT_ROUTER, GIFT_CARD } from "../../lib/constants";

import { SUCCESS } from "../../lib/constants.js";
const PRODUCT_ID = "MP000000000127263";
const QUANTITY = "1";
const MOBILE_NUMBER = "999999999";
const MINIMUM_PRICE = 15;
const MAXIMUM_PRICE = 10000;
export default class GiftCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email ? this.props.email : "",
      senderName: this.props.senderName ? this.props.senderName : "",
      message: this.props.message ? this.props.message : "",
      amountText: this.props.amountText ? this.props.amountText : ""
    };
  }
  componentDidMount() {
    this.props.setHeaderText(GIFT_CARD);
    if (this.props.getGiftCardDetails) {
      this.props.getGiftCardDetails();
    }
  }
  componentDidUpdate() {
    this.props.setHeaderText(GIFT_CARD);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.giftCardDetailsStatus === SUCCESS) {
      this.props.history.push({
        pathname: CHECKOUT_ROUTER,
        state: {
          isFromGiftCard: true,
          egvCartGuid: nextProps.giftCardDetails.egvCartGuid,
          amount: this.state.amountText
        }
      });
    }
  }
  componentWillMount() {
    if (this.props.clearGiftCardStatus) {
      this.props.clearGiftCardStatus();
    }
  }
  onChangeSenderName(name) {
    if (name === "" || /^[a-zA-Z]+$/.test(name)) {
      this.setState({ senderName: name });
    }
  }
  onChangeAmount(amount) {
    if (amount === "" || /^[0-9]+$/.test(amount)) {
      this.setState({ amountText: amount });
    }
  }
  selectAmount(val, amount) {
    this.setState({ amountText: amount });
  }
  checkUserAgentIsMobile() {
    return /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i.test(
      navigator.userAgent
    );
  }
  onSubmitDetails() {
    if (this.props.createGiftCardDetails) {
      const EMAIL_REGULAR_EXPRESSION = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (this.props.createGiftCardDetails) {
        const giftCardDetails = {};
        giftCardDetails.from = this.state.senderName;
        giftCardDetails.quantity = QUANTITY;
        giftCardDetails.messageOnCard = this.state.message;
        giftCardDetails.productID = PRODUCT_ID;
        giftCardDetails.priceSelectedByUserPerQuantity = this.state.amountText;
        giftCardDetails.receiverEmailID = this.state.email;
        giftCardDetails.mobileNumber = MOBILE_NUMBER;
        if (!this.state.amountText) {
          this.props.displayToast("Please select the amount");
          return false;
        }
        if (
          !(
            this.state.amountText <= MAXIMUM_PRICE &&
            this.state.amountText >= MINIMUM_PRICE
          )
        ) {
          this.props.displayToast(
            `Amount Should be less then ${MAXIMUM_PRICE} and greater than ${MINIMUM_PRICE} `
          );
          return false;
        }

        if (!this.state.email) {
          this.props.displayToast("Please fill recipient e-mail address");
          return false;
        }
        if (!EMAIL_REGULAR_EXPRESSION.test(this.state.email)) {
          this.props.displayToast("Please fill valid  e-mail address");
          return false;
        }
        if (!this.state.senderName) {
          this.props.displayToast("Please enter sender name");
          return false;
        } else {
          this.props.createGiftCardDetails(giftCardDetails);
        }
      }
    }
  }

  render() {
    if (this.props.loadingForGiftCardDetails) {
      this.props.showSecondaryLoader();
    } else {
      this.props.hideSecondaryLoader();
    }

    const giftCards = this.props.giftCardsDetails;
    return (
      <div className={styles.base}>
        <div
          className={
            this.checkUserAgentIsMobile()
              ? styles.listMobile
              : styles.listDesktop
          }
        >
          <div className={styles.giftCardImageHolder}>
            {giftCards && (
              <div className={styles.giftCradImage}>
                <Image image={giftCards.giftCartImageUrl} fit="cover" />
              </div>
            )}
          </div>
          <div className={styles.giftCardDataHolder}>
            <MediaQuery query="(max-device-width: 1024px)">
              <div className={styles.displayMessageHolder}>
                {this.state.message === "" && (
                  <span>Your message appears here</span>
                )}
                <span>{this.state.message}</span>
              </div>
            </MediaQuery>
            <MediaQuery query="(min-device-width: 1025px)">
              <div className={styles.giftCardHeader}>TATA CliQ Gift Card</div>
            </MediaQuery>
            <MediaQuery query="(max-device-width: 1024px)">
              <div className={styles.displayAmountHolder}>
                {this.state.amountText === "" && (
                  <span>Rs. 0 (Please select the amount from below)</span>
                )}
                {this.state.amountText !== "" && (
                  <span className={styles.amountSign}>
                    {this.state.amountText}
                  </span>
                )}
              </div>
            </MediaQuery>
            <MediaQuery query="(min-device-width: 1025px)">
              <div className={styles.displayAmountHolder}>
                {this.state.amountText === "" && (
                  <span>
                    <span className={styles.amountHeading}>Rs. 0 </span>
                    <span className={styles.amountSubHeading}>
                      (Please select the amount from below)
                    </span>
                  </span>
                )}
                {this.state.amountText !== "" && (
                  <span className={styles.amountSign}>
                    {this.state.amountText}
                  </span>
                )}
              </div>
            </MediaQuery>

            <MediaQuery query="(max-device-width: 1024px)">
              <div className={styles.giftCardTextHolder}>
                <div className={styles.infoHeder}>Gift Card</div>
                <div className={styles.infoText}>
                  Enter details for your gift card
                </div>
              </div>
            </MediaQuery>
            <div className={styles.formCard}>
              <MediaQuery query="(max-device-width: 1024px)">
                <div className={styles.formHeader}>1. Amount</div>
              </MediaQuery>
              <MediaQuery query="(min-device-width: 1025px)">
                <div className={styles.formHeader}> Amount</div>
              </MediaQuery>
              <div className={styles.amountCardHolder}>
                <MediaQuery query="(max-device-width: 1024px)">
                  <div className={styles.labelHeader}>
                    Select Amount from below{" "}
                  </div>
                </MediaQuery>
                <div className={styles.amountHolder}>
                  {giftCards &&
                    giftCards.amountOptions &&
                    giftCards.amountOptions.options.map((val, i) => {
                      return (
                        <div
                          className={
                            this.state.amountText === val.value
                              ? styles.activeAmounSelect
                              : styles.amountSelect
                          }
                          key={i}
                          onClick={() =>
                            this.selectAmount(
                              val.formattedValueNoDecimal,
                              val.value
                            )
                          }
                        >
                          {val.formattedValueNoDecimal}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div
                className={
                  this.checkUserAgentIsMobile()
                    ? styles.inputHolder
                    : styles.amountHolder
                }
              >
                <div className={styles.labelHeader}>Or</div>
                <div className={styles.enterAmountHolder}>
                  {this.state.amountText !== "" && (
                    <div className={styles.rupyLabel} />
                  )}
                  <ControlInput
                    boxy={true}
                    placeholder="Enter custom amount"
                    value={
                      this.props.amountText
                        ? this.props.amountText
                        : this.state.amountText
                    }
                    onChange={amountText => this.onChangeAmount(amountText)}
                    textStyle={{ fontSize: 14 }}
                    height={33}
                    leftChildSize={this.state.amountText !== "" ? 33 : 10}
                  />
                </div>
              </div>
            </div>
            <div className={styles.formCard}>
              <MediaQuery query="(max-device-width: 1024px)">
                <div className={styles.formHeader}>
                  2. Sender/ Reciever details
                </div>
              </MediaQuery>
              <div className={styles.inputHolder}>
                <div className={styles.labelHeader}>To</div>
                <div className={styles.inputTextHolder}>
                  <ControlInput
                    boxy={true}
                    placeholder="Enter recipient e-mail address"
                    value={
                      this.props.email ? this.props.email : this.state.email
                    }
                    onChange={email => this.setState({ email })}
                    textStyle={{ fontSize: 14 }}
                    height={33}
                  />
                </div>
              </div>
              <div className={styles.amountHolder}>
                <div className={styles.labelHeader}>From</div>
                <div className={styles.inputTextHolder}>
                  <ControlInput
                    boxy={true}
                    placeholder="Sender Name"
                    value={
                      this.props.senderName
                        ? this.props.senderName
                        : this.state.senderName
                    }
                    onChange={senderName => this.onChangeSenderName(senderName)}
                    textStyle={{ fontSize: 14 }}
                    height={33}
                  />
                </div>
              </div>
            </div>
            <div className={styles.formCard}>
              <MediaQuery query="(max-device-width: 1024px)">
                <div className={styles.formHeader}>3. Message & Quantity</div>
              </MediaQuery>
              <MediaQuery query="(min-device-width: 1025px)">
                <div className={styles.formHeader}>Message</div>
              </MediaQuery>
              <div className={styles.inputHolder}>
                <MediaQuery query="(max-device-width: 1024px)">
                  <div className={styles.labelHeader}>Message</div>
                </MediaQuery>
                <TextArea
                  boxy={true}
                  value={
                    this.props.message ? this.props.message : this.state.message
                  }
                  placeholder="Type the message that you want to appear on the card"
                  onChange={message => this.setState({ message })}
                  height={121}
                />
              </div>
              <div className={styles.selectHolder}>
                <div className={styles.labelHeader}>Quantity</div>
                <div className={styles.quantityValue}>1</div>
              </div>
            </div>
            <MediaQuery query="(min-device-width: 1025px)">
              {giftCards &&
                giftCards.isWalletCreated &&
                giftCards.isWalletOtpVerified && (
                  <div className={styles.buttonBuyNow}>
                    <Button
                      backgroundColor={"#FF1744"}
                      label={"Buy Now"}
                      width={195}
                      height={46}
                      borderRadius={22.5}
                      onClick={() => this.onSubmitDetails()}
                      textStyle={{ color: "#FFF", fontSize: 14 }}
                    />
                  </div>
                )}
              <div className={styles.copyRightText}>
                <span>Sold by</span>{" "}
                <span className={styles.highlitedText}>
                  QwikCilver Solutions Pvt. Ltd
                </span>{" "}
                <span>and delivered by TATACliq.</span>
              </div>
              <div className={styles.note}>
                <span className={styles.highlitedText}>Note:</span> This email
                Gift Card cannot be cancelled, refunded or returned. To re-send
                email Gift Card to a recipient’s email ID, go to ‘Your Orders’,
                select your Gift Card order and enter the recipient's email ID.
                It is applicable only for email Gift Cards that have not been
                claimed / redeemed by the recipient.
              </div>
            </MediaQuery>
          </div>
          <MediaQuery query="(max-device-width: 1024px)">
            <div className={styles.textHolder}>
              <div className={styles.textHeader}>QwikCilver</div>
              <div className={styles.text}>
                Sold by QwikCilver Solutions pvt ltd
              </div>
            </div>
            {giftCards &&
              giftCards.isWalletCreated &&
              giftCards.isWalletOtpVerified && (
                <div className={styles.buttonHolder}>
                  <FooterButton
                    backgroundColor="#ff1744"
                    onClick={() => this.onSubmitDetails()}
                    label="Buy Now"
                    labelStyle={{
                      color: "#fff",
                      fontSize: 14,
                      fontFamily: "semibold"
                    }}
                  />
                </div>
              )}
          </MediaQuery>
        </div>
      </div>
    );
  }
}

GiftCard.propTypes = {
  giftCardImage: PropTypes.obj,
  email: PropTypes.string,
  senderName: PropTypes.string,
  message: PropTypes.string,
  amountText: PropTypes.string,
  quantity: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number
    })
  ),
  getGiftCardDetails: PropTypes.func,
  createGiftCardDetails: PropTypes.func
};
