import React, { Component } from "react";
import styles from "./CliqCashDesktop.css";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import ProfileMenu from "./ProfileMenu";
import * as Cookie from "../../lib/Cookie";
import FaqAndTcBase from "./FaqAndTcBase";
import UserProfile from "./UserProfile";
import {
  LOGGED_IN_USER_DETAILS,
  LOGIN_PATH,
  GIFT_CARD,
  RUPEE_SYMBOL,
  SUCCESS,
  CHECKOUT_ROUTER
} from "../../lib/constants";

import PropTypes, {
  array,
  arrayOf,
  string,
  object,
  bool,
  number
} from "prop-types";
import { Redirect } from "react-router-dom";
import { getCustomerAccessToken } from "../../common/services/common.services";
import { numberWithCommas } from "../../lib/dateTimeFunction";
import {
  setDataLayerForGiftCard,
  SET_DATA_LAYER_ADD_GIFT_CARD
} from "../../lib/adobeUtils";
import BackToCliqCashSection from "./BackToCliqCashSection";
import Input2 from "../../general/components/Input2";
import Button from "../../general/components/Button";

import { Link } from "react-router-dom";
import { getItemBreakUpDetails } from "../../cart/actions/cart.actions";
import greenLightBulb from "../components/img/greenLightBulb.svg";
const MINIMUM_PRICE = 10;
const MAXIMUM_PRICE = 10000;
const PRODUCT_ID = "MP000000000127263";
const QUANTITY = "1";
const MOBILE_NUMBER = "999999999";
export const EGV_GIFT_CART_ID = "giftCartId";

export default class CliqCashTopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAmount:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.selectedAmount
          ? this.props.location.state.selectedAmount
          : "",
      isValidAmount: true,
      maxPrice:
        this.props.giftCardsDetails &&
        this.props.giftCardsDetails.topUpOptions &&
        this.props.giftCardsDetails.topUpOptions.maxPrice &&
        this.props.giftCardsDetails.topUpOptions.maxPrice &&
        this.props.giftCardsDetails.topUpOptions.maxPrice.value
          ? this.props.giftCardsDetails.topUpOptions.maxPrice.value
          : MAXIMUM_PRICE,
      minPrice:
        this.props.giftCardsDetails &&
        this.props.giftCardsDetails.topUpOptions &&
        this.props.giftCardsDetails.topUpOptions.minPrice &&
        this.props.giftCardsDetails.topUpOptions.minPrice &&
        this.props.giftCardsDetails.topUpOptions.minPrice.value
          ? this.props.giftCardsDetails.topUpOptions.minPrice.value
          : MINIMUM_PRICE,
      buyForYourself: true
    };
  }
  componentDidMount() {
    this.props.setHeaderText(GIFT_CARD);
    if (this.props.getGiftCardDetails) {
      this.props.getGiftCardDetails();
    }
    let offerDetails =
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.offerDetails;
    if (offerDetails === undefined && this.props.getCliqCashbackDetails) {
      const cashbackmode = "EGV|TOPUP";
      this.props.getCliqCashbackDetails(cashbackmode);
    }
  }
  selectAmount(amount) {
    if (amount < this.state.minPrice || amount > this.state.maxPrice) {
      this.setState({ selectedAmount: amount, isValidAmount: false });
    } else {
      this.setState({ selectedAmount: amount, isValidAmount: true });
    }
    if (window && window.digitalData) {
      Object.assign(window.digitalData, {
        cliqcash: {
          price: {
            value: amount
          }
        }
      });
    }
    if (window._satellite) {
      window._satellite.track("cliqCash_Price_card_Click");
    }
  }
  navigateToLogin() {
    const url = this.props.location.pathname;
    this.props.setUrlToRedirectToAfterAuth(url);
    return <Redirect to={LOGIN_PATH} />;
  }
  showCliqCashModulePopUp = () => {
    setDataLayerForGiftCard(SET_DATA_LAYER_ADD_GIFT_CARD);
    if (this.props.showCliqCashModule) {
      const obj = {};
      obj.addCard = true;
      obj.btnLabel = "Add Gift Card";
      obj.heading = "Gift Card Details";
      this.props.showCliqCashModule(obj);
    }
  };
  kycVerification = () => {
    if (this.props.showKycVerification) {
      this.props.showKycVerification(this.props);
    }
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.giftCardDetailsStatus === SUCCESS) {
      let giftCardDetails = {};
      giftCardDetails.isFromGiftCard = true;
      giftCardDetails.egvCartGuid = nextProps.giftCardDetails.egvCartGuid;
      giftCardDetails.amount = this.state.selectedAmount;
      localStorage.setItem(EGV_GIFT_CART_ID, JSON.stringify(giftCardDetails));
      localStorage.setItem("GiftCardAmount", this.state.selectedAmount);
      localStorage.setItem("productType", "topUp");
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

  onSubmitDetails() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const formatUserDetails = JSON.parse(userDetails);
    if (this.props.createGiftCardDetails) {
      const giftCardDetails = {};
      giftCardDetails.from = formatUserDetails.firstName || "CliqCash";
      giftCardDetails.quantity = QUANTITY;
      giftCardDetails.messageOnCard = "Message";
      giftCardDetails.productID = PRODUCT_ID;
      giftCardDetails.priceSelectedByUserPerQuantity = this.state.selectedAmount;
      giftCardDetails.receiverEmailID = formatUserDetails.userName;
      giftCardDetails.mobileNumber = MOBILE_NUMBER;
      giftCardDetails.productType = "topUp";
      giftCardDetails.receiverName = formatUserDetails.firstName || "CliqCash";
      if (!this.state.selectedAmount) {
        this.props.displayToast("Please select the amount");
        return false;
      }
      if (
        !(
          this.state.selectedAmount <= this.state.maxPrice &&
          this.state.selectedAmount >= this.state.minPrice
        )
      ) {
        this.props.displayToast(
          `Amount should be greater than ₹${this.state.minPrice}  and less than ₹${this.state.maxPrice}.`
        );
        return false;
      } else {
        if (window._satellite) {
          window._satellite.track("cliqCash_Add_Amount_Click");
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
        this.props.createGiftCardDetails(giftCardDetails);
      }
    }
  }

  render() {
    let userData, fullName, email;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerAccessToken = getCustomerAccessToken();
    if (userDetails) {
      userData = JSON.parse(userDetails);
      if (userData.firstName === undefined || userData.lastName === undefined) {
        fullName = "";
      } else {
        fullName = userData.firstName + " " + userData.lastName;
      }
      email = userData.userName;
    }

    if (!userDetails || !customerAccessToken) {
      return this.navigateToLogin();
    }

    let offerDetails =
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.offerDetails
        ? this.props.location.state.offerDetails
        : undefined;

    (offerDetails &&
      offerDetails.cashbackMode &&
      offerDetails.cashbackMode === "TOPUP") ||
    (offerDetails && offerDetails.cashbackMode && offerDetails.cashbackMode) ===
      "EGV"
      ? localStorage.setItem("cashback", "enabled")
      : localStorage.setItem("cashback", "disabled");
    if (offerDetails === undefined) {
      offerDetails =
        this.props.cliqCashbackDetails &&
        this.props.cliqCashbackDetails.cashbackOffers &&
        this.props.cliqCashbackDetails.cashbackOffers[0];
    }

    return (
      <div className={styles.base}>
        <div className={MyAccountStyles.holder}>
          <div className={MyAccountStyles.profileMenu}>
            <ProfileMenu {...this.props} />
          </div>
          <div className={styles.cliqCashDetail}>
            <div className={styles.popularCardBox}>
              <div className={styles.header}>
                <div className={styles.availableTop}>
                  Total Available Balance :
                  <div className={styles.balanceTopUp}>
                    {"  "}
                    <span className={styles.rupeeTopUp}>₹</span>
                    {this.props &&
                    this.props.cliqCashUserDetails &&
                    this.props.cliqCashUserDetails.totalCliqCashBalance &&
                    this.props.cliqCashUserDetails.totalCliqCashBalance.value &&
                    this.props.cliqCashUserDetails.totalCliqCashBalance.value >
                      0
                      ? parseFloat(
                          Math.round(
                            this.props.cliqCashUserDetails.totalCliqCashBalance
                              .value * 100
                          ) / 100
                        ).toLocaleString("hi-IN")
                      : "0"}
                    <span className={styles.floatingNumber}>.00</span>
                  </div>
                </div>
                <div className={styles.checkBalRightText}>
                  <Link
                    to={`/my-account/cliq-cash`}
                    className={styles.checkBalRightTextLink}
                  >
                    Back to CLiQ Cash
                  </Link>
                </div>
              </div>
              <div className={styles.popularHeading}>Popular Top-ups</div>
              {offerDetails && offerDetails.cashbackType === "Fixed" && (
                <div className={styles.cashBackOfferLong}>
                  Get ₹{offerDetails.offerValue} cashback up to{" "}
                  {offerDetails.maxCashback.formattedValueNoDecimal} on top-up
                  of {offerDetails.offerThreshold.formattedValueNoDecimal} and
                  above*
                </div>
              )}
              {offerDetails && offerDetails.cashbackType !== "Fixed" && (
                <div className={styles.cashBackOfferSmall}>
                  Get ₹{offerDetails.offerValue} cashback on top-up of{" "}
                  {offerDetails.offerThreshold.formattedValueNoDecimal} and
                  above*
                </div>
              )}
              <div className={styles.popularCardPriceBox}>
                {this.props.giftCardsDetails &&
                  this.props.giftCardsDetails.topUpOptions &&
                  this.props.giftCardsDetails.topUpOptions.options &&
                  this.props.giftCardsDetails.topUpOptions.options
                    .slice(0, 4)
                    .map((option, index) => {
                      return (
                        <div
                          className={
                            this.state.selectedAmount == option.value
                              ? styles.selectedCardPricePurchase
                              : styles.popularCardPricePurchase
                          }
                          onClick={() => this.selectAmount(option.value)}
                          key={index}
                        >
                          <span className={styles.popularCardPriceSymbol}>
                            {RUPEE_SYMBOL}
                          </span>{" "}
                          {numberWithCommas(option.value)}
                        </div>
                      );
                    })}
              </div>
              <div className={styles.cliqTopUpButton}>
                {this.state.selectedAmount ? (
                  <div className={styles.buySendPriceSymbol}>
                    {RUPEE_SYMBOL}
                  </div>
                ) : (
                  ""
                )}
                <Input2
                  hollow={true}
                  placeholder={`Or enter an amount between ${RUPEE_SYMBOL}${this.state.minPrice}-${RUPEE_SYMBOL}${this.state.maxPrice}`}
                  value={this.state.selectedAmount}
                  onChange={amount => this.selectAmount(amount)}
                  textStyle={{ fontSize: 14, letterSpacing: "0.03px" }}
                  type="number"
                  onlyNumber={true}
                  leftChildSize={this.state.selectedAmount !== "" ? 12 : 0}
                  autoFocus={true}
                />
                {!this.state.isValidAmount ? (
                  <div className={styles.topupInputError}>
                    Enter an amount between {RUPEE_SYMBOL}
                    {this.state.minPrice}-{RUPEE_SYMBOL}
                    {this.state.maxPrice}
                  </div>
                ) : null}
              </div>
              {offerDetails && (
                <div className={styles.cashBackOfferMsgDiv}>
                  <div className={styles.cashBackOfferImgDiv}>
                    <img src={greenLightBulb} alt={"Offer Text"} />
                  </div>
                  <div className={styles.cashBackOfferMsg}>
                    The cashback will be credited to your account as CLiQ Cash
                    within 24 hrs. Please read the offer
                    <Link
                      to={"/cliqcashback-offers-tnc"}
                      className={styles.knowMore}
                    >
                      {" "}
                      T&C{" "}
                    </Link>
                    carefully.
                  </div>
                </div>
              )}

              <div className={styles.sendGiftCardBtn}>
                <Button
                  type="primary"
                  disabled={
                    this.state.email === "" ||
                    this.state.senderName === "" ||
                    this.state.selectedAmount == "" ||
                    this.state.selectedAmount < this.state.minPrice ||
                    this.state.selectedAmount > this.state.maxPrice ||
                    this.state.isValidAmount === false
                      ? true
                      : false
                  }
                  margin="auto"
                  height={36}
                  width={312}
                  label="Add Amount"
                  color="#da1c5c"
                  backgroundColor={"#da1c5c"}
                  textStyle={{ color: "#da1c5c", fontSize: 14 }}
                  onClick={() => this.onSubmitDetails()}
                />
              </div>
            </div>

            <div className={styles.faqAndTcHolder}>
              <FaqAndTcBase history={this.props.history} />
            </div>
          </div>
          <div className={MyAccountStyles.userProfile}>
            <UserProfile
              image={userData && userData.imageUrl}
              userLogin={userData && userData.userName}
              loginType={userData && userData.loginType}
              firstName={
                userData &&
                userData.firstName &&
                userData.firstName.trim().charAt(0)
              }
              heading={
                userData && userData.firstName && `${userData.firstName} `
              }
              lastName={userData && userData.lastName && `${userData.lastName}`}
              userAddress={this.props.userAddress}
            />
          </div>
        </div>
      </div>
    );
  }
}
CliqCashTopUp.propTypes = {
  userAddress: PropTypes.shape({
    addresses: arrayOf(
      PropTypes.shape({
        addressType: string,
        city: string,
        country: object,
        defaultAddress: bool,
        firstName: string,
        id: string,
        lastName: string,
        line1: string,
        phone: string,
        postalCode: string,
        state: string,
        town: string
      })
    ),
    status: string
  }),
  history: PropTypes.object,
  setUrlToRedirectToAfterAuth: PropTypes.func.isRequired,
  location: PropTypes.object,
  setHeaderText: PropTypes.func.isRequired,
  getGiftCardDetails: PropTypes.func.isRequired,
  giftCardsDetails: PropTypes.shape({
    landingPageOptions: PropTypes.shape({
      option: array,
      maxPrice: PropTypes.shape({
        value: number
      }),
      mixPrice: PropTypes.shape({
        value: number
      })
    })
  }),
  showCliqCashModule: PropTypes.func,
  showKycVerification: PropTypes.func
};
