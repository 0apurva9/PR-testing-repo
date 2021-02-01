import React, { Component } from "react";
import { RouterPropTypes } from "../../general/router-prop-types";
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
  RUPEE_SYMBOL
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
import CliqGiftCardBuySend from "./CliqGiftCardBuySend";
import greenLightBulb from "../components/img/greenLightBulb.svg";
import { Link } from "react-router-dom";
const MINIMUM_PRICE = 15;
const MAXIMUM_PRICE = 10000;

export default class CliqGiftCardPurchase extends Component {
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
          this.props.giftCardsDetails.amountOptions &&
          this.props.giftCardsDetails.amountOptions.maxPrice &&
          this.props.giftCardsDetails.amountOptions.maxPrice &&
          this.props.giftCardsDetails.amountOptions.maxPrice.value
          ? this.props.giftCardsDetails.amountOptions.maxPrice.value
          : MAXIMUM_PRICE,
      minPrice:
        this.props.giftCardsDetails &&
          this.props.giftCardsDetails.amountOptions &&
          this.props.giftCardsDetails.amountOptions.minPrice &&
          this.props.giftCardsDetails.amountOptions.minPrice &&
          this.props.giftCardsDetails.amountOptions.minPrice.value
          ? this.props.giftCardsDetails.amountOptions.minPrice.value
          : MINIMUM_PRICE
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
      const cashbackmode = "EGV";
      this.props.getCliqCashbackDetails(cashbackmode);
    }
  }

  selectAmount(amount) {
    if (amount < this.state.minPrice || amount > this.state.maxPrice) {
      this.setState({ selectedAmount: amount, isValidAmount: false });
    } else {
      this.setState({ selectedAmount: amount, isValidAmount: true });
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

  navigateCheckBalance() {
    if (this.props.showCliqCashModule) {
      const obj = {};
      obj.isCheckBalance = true;
      obj.addCard = false;
      obj.btnLabel = "Check Card Value";
      obj.heading = "Enter your gift card details";
      obj.subheading =
        "The value of your Gift Card will be added to your CLiQ Cash balance. Use it for a seamless experience.";
      this.props.showCliqCashModule(obj);
    }
  }

  render() {
    let userData, fullName, email;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerAccessToken = getCustomerAccessToken();
    if (userDetails) {
      userData = JSON.parse(userDetails);
      if (
        userData.firstName === "" ||
        userData.firstName === undefined ||
        userData.lastName === "" ||
        userData.lastName === undefined
      ) {
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
            <div>
              <BackToCliqCashSection />
            </div>

            <div className={styles.popularCardBox}>
              <div className={styles.popularHeading}>Send a CLiQ Gift Card</div>
              {offerDetails && offerDetails.cashbackType === "Fixed" && (
                <div className={styles.cashBackOfferLong}>
                  Get ₹{offerDetails.offerValue} cashback up to{" "}
                  {offerDetails.maxCashback.formattedValueNoDecimal} on gift
                  voucher of{" "}
                  {offerDetails.offerThreshold.formattedValueNoDecimal} and
                  above*
                </div>
              )}
              {offerDetails && offerDetails.cashbackType !== "Fixed" && (
                <div className={styles.cashBackOfferSmall}>
                  Get {offerDetails.offerValue}% cashback on gift voucher of{" "}
                  {offerDetails.offerThreshold.formattedValueNoDecimal} and
                  above*
                </div>
              )}
              <div className={styles.popularCardPriceBox}>
                {this.props.giftCardsDetails &&
                  this.props.giftCardsDetails.amountOptions &&
                  this.props.giftCardsDetails.amountOptions.options &&
                  this.props.giftCardsDetails.amountOptions.options
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
              <div className={styles.cliqCardPurchaseButton}>
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
            </div>
            <CliqGiftCardBuySend
              selectedAmount={this.state.selectedAmount}
              senderName={fullName}
              email={email}
              minPrice={this.state.minPrice}
              maxPrice={this.state.maxPrice}
              displayToast={messageText => this.props.displayToast(messageText)}
              createGiftCardDetails={giftCardDetails =>
                this.props.createGiftCardDetails(giftCardDetails)
              }
              giftCardDetailsStatus={this.props.giftCardDetailsStatus}
              giftCardDetails={this.props.giftCardDetails}
              history={this.props.history}
              clearGiftCardStatus={() => this.props.clearGiftCardStatus()}
            />
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
CliqGiftCardPurchase.propTypes = {
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
  setUrlToRedirectToAfterAuth: PropTypes.func.isRequired,
  setHeaderText: PropTypes.func.isRequired,
  getGiftCardDetails: PropTypes.func.isRequired,
  giftCardsDetails: PropTypes.shape({
    amountOptions: PropTypes.shape({
      options: array,
      maxPrice: PropTypes.shape({
        value: number
      }),
      mixPrice: PropTypes.shape({
        value: number
      })
    })
  }),
  showCliqCashModule: PropTypes.func,
  showKycVerification: PropTypes.func,
  getCliqCashbackDetails: PropTypes.func,
  cliqCashbackDetails: PropTypes.shape({
    cashbackOffers: PropTypes.array
  }),
  createGiftCardDetails: PropTypes.func,
  displayToast: PropTypes.func,
  giftCardDetailsStatus: PropTypes.string,
  ...RouterPropTypes
};
