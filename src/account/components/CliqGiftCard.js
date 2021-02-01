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
  RUPEE_SYMBOL,
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_CLIQ_GIFT_CARD_PURCHASE_PAGE,
  SUCCESS
} from "../../lib/constants";
import PropTypes, {
  array,
  arrayOf,
  string,
  object,
  bool,
  shape,
  number
} from "prop-types";
import { Redirect } from "react-router-dom";
import headerBg from "./img/headerBg.svg";
import { getCustomerAccessToken } from "../../common/services/common.services";
import { numberWithCommas } from "../../lib/dateTimeFunction";
import Button from "../../general/components/Button";
import giftcardAddAccount from "./img/giftcardAddAccount.svg";
import giftcardCheckBalance from "./img/giftcardCheckBalance.svg";
import {
  setDataLayerForGiftCard,
  SET_DATA_LAYER_ADD_GIFT_CARD
} from "../../lib/adobeUtils";
import AvailableOffersMyAcc from "./AvailableOffersMyAcc";

export default class CliqGiftCard extends Component {
  componentDidMount() {
    this.props.setHeaderText(GIFT_CARD);
    if (this.props.getGiftCardDetails) {
      this.props.getGiftCardDetails();
    }
    if (this.props.getCliqCashbackDetails) {
      const cashbackmode = "EGV";
      this.props.getCliqCashbackDetails(cashbackmode);
    }
  }

  selectAmount(amount) {
    if (
      this.props.cliqCashbackDetailsStatus &&
      this.props.cliqCashbackDetailsStatus === SUCCESS &&
      this.props.cliqCashbackDetails &&
      this.props.cliqCashbackDetails.cashbackOffers &&
      this.props.cliqCashbackDetails.cashbackOffers.length > 0
    ) {
      this.props.history.push({
        pathname: `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_GIFT_CARD_PURCHASE_PAGE}`,
        state: {
          offerDetails: this.props.cliqCashbackDetails.cashbackOffers[0],
          selectedAmount: amount
        }
      });
    } else {
      this.props.history.push({
        pathname: `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_GIFT_CARD_PURCHASE_PAGE}`,
        state: {
          selectedAmount: amount
        }
      });
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

  navigateSendGiftCard() {
    if (
      this.props.cliqCashbackDetailsStatus &&
      this.props.cliqCashbackDetailsStatus === SUCCESS &&
      this.props.cliqCashbackDetails &&
      this.props.cliqCashbackDetails.cashbackOffers &&
      this.props.cliqCashbackDetails.cashbackOffers.length > 0
    ) {
      this.props.history.push({
        pathname: `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_GIFT_CARD_PURCHASE_PAGE}`,
        state: {
          offerDetails: this.props.cliqCashbackDetails.cashbackOffers[0]
        }
      });
    } else {
      this.props.history.push(
        `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_GIFT_CARD_PURCHASE_PAGE}`
      );
    }
  }

  render() {
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerAccessToken = getCustomerAccessToken();

    if (userDetails) {
      userData = JSON.parse(userDetails);
    }

    if (!userDetails || !customerAccessToken) {
      return this.navigateToLogin();
    }

    return (
      <div className={styles.base}>
        <div className={MyAccountStyles.holder}>
          <div className={MyAccountStyles.profileMenu}>
            <ProfileMenu {...this.props} />
          </div>
          <div className={styles.cliqCashDetail}>
            <div>
              <div className={styles.cliqGiftCardWithHolderCheckBal}>
                <div className={styles.heading}>
                  <div className={styles.cliqGiftCardHeaderText}>
                    CLiQ Gift Card
                  </div>
                  <div className={styles.cliqGiftCardSubHeader}>
                    Experience the joy of <b>gifting</b>, delivered straight to
                    the <b>inbox</b>
                  </div>
                </div>
                <div className={styles.cliqGiftCardImage}>
                  <img
                    src={headerBg}
                    alt=""
                    className={styles.cliqGiftCardImageImg}
                  />
                </div>
                <div className={styles.popularCardButton}>
                  <Button
                    type="primary"
                    margin="auto"
                    height={36}
                    width={312}
                    label="Send a Gift Card "
                    color="#da1c5c"
                    backgroundColor={"#da1c5c"}
                    textStyle={{ color: "#da1c5c", fontSize: 14 }}
                    onClick={() => this.navigateSendGiftCard()}
                  />
                </div>
              </div>
            </div>

            {this.props.cliqCashbackDetailsStatus &&
              this.props.cliqCashbackDetailsStatus === SUCCESS &&
              this.props.cliqCashbackDetails &&
              this.props.cliqCashbackDetails.cashbackOffers &&
              this.props.cliqCashbackDetails.cashbackOffers.length > 0 && (
                <AvailableOffersMyAcc
                  cliqCashbackDetails={this.props.cliqCashbackDetails}
                  history={this.props.history}
                  showCashBackDetailsPopup={data =>
                    this.props.showCashBackDetailsPopup(data)
                  }
                />
              )}

            <div className={styles.popularCardBox}>
              <div className={styles.popularHeading}>
                Pick A Popular Card Value
              </div>
              <div className={styles.popularContent}>
                Choose from any of the value below to buy a quick Gift Card or
                choose another value.
              </div>
              <div className={styles.popularCardPriceBox}>
                {this.props.giftCardsDetails &&
                  this.props.giftCardsDetails.landingPageOptions &&
                  this.props.giftCardsDetails.landingPageOptions.options &&
                  this.props.giftCardsDetails.landingPageOptions.options
                    .slice(0, 4)
                    .map((option, index) => {
                      return (
                        <div
                          className={styles.popularCardPrice}
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
              <div className={styles.popularCardButton}>
                <Button
                  type="hollow"
                  margin="auto"
                  height={36}
                  width={312}
                  label="Choose Your Own Value"
                  color="#da1c5c"
                  bordercolor={"#da1c5c"}
                  textStyle={{ color: "#da1c5c", fontSize: 14 }}
                  onClick={() => this.navigateSendGiftCard()}
                />
              </div>
            </div>
            <div className={styles.receivedGiftCardBox}>
              <div className={styles.receivedGiftCardHeading}>
                Received a Gift Card ?
              </div>
              <div className={styles.receivedGiftLink}>
                <div className={styles.receivedGiftCardbtn}>
                  <div className={styles.receivedGiftCardDiv1}>
                    <img src={giftcardAddAccount} alt="Add account" />
                  </div>
                  <div className={styles.receivedGiftCardDiv2}>
                    <p className={styles.receivedGiftCardbtnHead}>
                      Add It To Your Account
                    </p>
                    <p className={styles.receivedGiftCardbtnTit}>
                      Amount will be added to the CLiQ Cash wallet.
                    </p>
                  </div>
                  <div
                    className={styles.addGiftCardButtonHolder}
                    onClick={() =>
                      this.props &&
                        this.props.cliqCashUserDetails &&
                        !this.props.cliqCashUserDetails.isWalletOtpVerified
                        ? this.kycVerification()
                        : this.showCliqCashModulePopUp()
                    }
                  >
                    <div className={styles.receivedGiftCardBtnFloatRight}>
                      <div className={styles.addGiftCardButtonText}>
                        Add It Here
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.receivedGiftCardbtn}>
                  <div className={styles.receivedGiftCardDiv1}>
                    <img
                      src={giftcardCheckBalance}
                      alt="Track Your Gift Balance"
                    />
                  </div>
                  <div className={styles.receivedGiftCardDiv2}>
                    <p className={styles.receivedGiftCardbtnHead}>
                      Track Your Gift Balance
                    </p>
                    <p className={styles.receivedGiftCardbtnTit}>
                      Stay updated about your gift card usage.
                    </p>
                  </div>
                  <div
                    className={styles.addGiftCardButtonHolder}
                    onClick={() =>
                      this.props.cliqCashUserDetails &&
                        !this.props.cliqCashUserDetails.isWalletOtpVerified
                        ? this.kycVerification()
                        : this.navigateCheckBalance()
                    }
                  >
                    <div className={styles.receivedGiftCardBtnFloatRight}>
                      <div className={styles.addGiftCardButtonText}>
                        Track Balance
                      </div>
                    </div>
                  </div>
                </div>
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
CliqGiftCard.defaultProps = {
  isModal: true
};
CliqGiftCard.propTypes = {
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
    landingPageOptions: PropTypes.shape({
      options: array
    })
  }),
  cliqCashUserDetails: PropTypes.shape({
    isWalletOtpVerified: bool
  }),
  showCliqCashModule: PropTypes.func,
  showKycVerification: PropTypes.func,
  cliqCashbackDetailsStatus: PropTypes.string,
  cliqCashbackDetails: PropTypes.shape({
    cashbackOffers: arrayOf(
      PropTypes.shape({
        cashbackMode: string,
        cashbackType: string,
        offerValue: string,
        offerThreshold: shape({
          currencyIso: string,
          doubleValue: number,
          formattedValue: string,
          formattedValueNoDecimal: string,
          value: number
        }),
        offerDesc: string,
        offerStatus: string,
        maxCashback: shape({
          currencyIso: string,
          doubleValue: number,
          formattedValue: string,
          formattedValueNoDecimal: string,
          value: number
        }),
        offerStartDate: string,
        offerEndDate: string
      })
    )
  }),
  getCliqCashbackDetails: PropTypes.func,
  showCashBackDetailsPopup: PropTypes.func,
  ...RouterPropTypes
};
