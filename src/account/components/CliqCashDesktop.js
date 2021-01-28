import React from "react";
import PropTypes, { arrayOf, string, shape, number } from "prop-types";
import { RouterPropTypes } from "../../general/router-prop-types";
import styles from "./CliqCashDesktop.css";
import walletBg from "./img/cliqCashWalletBg.svg";
import Button from "../../general/components/Button";
import CliqCashExpiring from "./CliqCashExpiring";
import {
  MY_ACCOUNT_PAGE,
  CLIQ_CASH,
  SUCCESS,
  SUCCESS_CAMEL_CASE,
  SUCCESS_UPPERCASE,
  LOGGED_IN_USER_DETAILS,
  TRANSACTION_DETAIL_PAGE,
  TRANSACTION_HISTORY,
  MY_ACCOUNT_CLIQ_CASH_PAGE,
  EXPIRED_REJECTED_FORMAT,
  MY_ACCOUNT_PROMOS_PAGE,
  MY_ACCOUNT_GIFT_CARD_PAGE,
  MY_ACCOUNT_CLIQ_CASH_PURCHASE_PAGE
} from "../../lib/constants.js";
import Arrow from "./img/arrow-copy.svg";

import {
  setDataLayerForGiftCard,
  SET_DATA_LAYER_ADD_GIFT_CARD,
  SET_DATA_LAYER_BUY_GIFT_CARD,
  SET_DATA_LAYER_CLIQ_CASH_LAST_FIVE_TRANSACTION,
  SET_DATA_LAYER_CLIQ_CASH_VIEW_ALL_TRANSACTION
} from "../../lib/adobeUtils";

import {
  getWholeDayTimeFormat,
  getUTCDateMonthFormat
} from "../../lib/dateTimeFunction";
import * as Cookie from "../../lib/Cookie";
import DesktopOnly from "../../general/components/DesktopOnly";
import ProfileMenu from "./ProfileMenu";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";
import FaqAndTcBase from "./FaqAndTcBase";
import AvailableOffersMyAcc from "./AvailableOffersMyAcc";
const currentDate = new Date();

export default class CliqCashDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: this.props.cardNumber ? this.props.cardNumber : "",
      pinNumber: this.props.pinNumber ? this.props.pinNumber : "",
      cliqCashUpdate: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.cliqCashVoucherDetailsStatus === SUCCESS ||
      nextProps.cliqCashVoucherDetailsStatus === SUCCESS_CAMEL_CASE ||
      nextProps.cliqCashVoucherDetailsStatus === SUCCESS_UPPERCASE
    ) {
      this.setState({ cardNumber: "", pinNumber: "", cliqCashUpdate: "" });
    }
  }

  componentDidUpdate() {
    this.props.setHeaderText(CLIQ_CASH);
  }

  componentWillUnmount() {
    this.props.clearTransaction();
  }

  componentDidMount() {
    this.props.setHeaderText(CLIQ_CASH);
    if (this.props.getCliqCashDetails) {
      this.props.getCliqCashDetails();
    }
    if (this.props.getTransactionDetails) {
      this.props.getTransactionDetails();
    }
    if (this.props.getCliqCashPageConfiguration) {
      this.props.getCliqCashPageConfiguration();
    }
    if (this.props.getCliqCashExpiring) {
      this.props.getCliqCashExpiring();
    }
    if (this.props.getCliqCashbackDetails) {
      const cashbackmode = "EGV|TOPUP";
      this.props.getCliqCashbackDetails(cashbackmode);
    }
  }

  redirectToPromoCliqCash = () => {
    if (
      this.props.cliqCashUserDetails &&
      !this.props.cliqCashUserDetails.isWalletOtpVerified
    ) {
      this.kycVerification();
    } else {
      this.props.history.push(
        `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}${MY_ACCOUNT_PROMOS_PAGE}`
      );
    }
  };

  redeemCliqVoucher() {
    if (this.state.cardNumber && this.state.pinNumber) {
      this.setState({ cliqCashUpdate: true });
      if (this.props.redeemCliqVoucher) {
        this.props.redeemCliqVoucher(this.state);
      }
    }
  }

  // redeemCliqVoucher() {
  //   if (this.state.cardNumber && this.state.pinNumber) {
  //     this.setState({ cliqCashUpdate: true });
  //     if (this.props.redeemCliqVoucher) {
  //       this.props.redeemCliqVoucher(this.state);
  //     }
  //   }
  // }
  transactiondetailPage(data) {
    setDataLayerForGiftCard(SET_DATA_LAYER_CLIQ_CASH_LAST_FIVE_TRANSACTION);

    this.props.history.push({
      pathname: `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}${TRANSACTION_DETAIL_PAGE}`,
      state: {
        transactonDetails: data,
        userAddress: this.props.userAddress
      }
    });
  }

  showTransactioDetails = () => {
    setDataLayerForGiftCard(SET_DATA_LAYER_CLIQ_CASH_VIEW_ALL_TRANSACTION);
    this.props.history.push(
      `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}${TRANSACTION_HISTORY}`
    );
  };

  buyNewGiftCard = () => {
    setDataLayerForGiftCard(SET_DATA_LAYER_BUY_GIFT_CARD);
    this.props.history.push(`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_GIFT_CARD_PAGE}`);
  };

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

  navigateTopUp = () => {
    if (window._satellite) {
      window._satellite.track("cliqCash_Add_Top_Up");
    }
    if (
      this.props.cliqCashbackDetailsStatus &&
      this.props.cliqCashbackDetailsStatus === SUCCESS &&
      this.props.cliqCashbackDetails &&
      this.props.cliqCashbackDetails.cashbackOffers &&
      this.props.cliqCashbackDetails.cashbackOffers.length > 0
    ) {
      this.props.history.push({
        pathname: `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PURCHASE_PAGE}`,
        state: {
          offerDetails: this.props.cliqCashbackDetails.cashbackOffers[0]
        }
      });
    } else {
      this.props.history.push(
        `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PURCHASE_PAGE}`
      );
    }
  };

  checkDateExpired = date => {
    let expiredDate = new Date(date);
    let dayDifference = Math.floor(
      (Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ) -
        Date.UTC(
          expiredDate.getFullYear(),
          expiredDate.getMonth(),
          expiredDate.getDate()
        )) /
      (1000 * 60 * 60 * 24)
    );
    if (dayDifference < 1) {
      return false;
    } else {
      return true;
    }
  };

  getCliqCashKnowMore = () => {
    if (this.props.cliqCashKnowMore) {
      this.props.cliqCashKnowMore(this.props);
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
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let transactions = [];
    this.props.transactionDetails &&
      Array.isArray(this.props.transactionDetails) &&
      this.props.transactionDetails.forEach(data => {
        if (data.items) {
          return transactions.push(...data.items);
        }
      });
    if (userDetails) {
      userData = JSON.parse(userDetails);
    }
    if (this.props.loading) {
      this.props.showSecondaryLoader();
    } else {
      this.props.hideSecondaryLoader();
    }
    if (this.props.cliqCashUserDetails) {
      return (
        <div className={styles.base}>
          <div className={MyAccountStyles.holder}>
            <DesktopOnly>
              <div className={MyAccountStyles.profileMenu}>
                <ProfileMenu {...this.props} />
              </div>
              <div className={styles.cliqCashDetail}>
                <div>
                  <div className={styles.cliqCashBalanceHolder}>
                    <div
                      style={{
                        backgroundImage: `url(${walletBg})`
                      }}
                      className={styles.cliqCashBalanceContainer}
                    >
                      <div className={styles.cliqCashBalanceHeader}>
                        CLiQ Cash Wallet
                      </div>
                      <div className={styles.totalBalanceHolder}>
                        <div className={styles.totalBalance}>
                          <div className={styles.balanceHeader}>
                            Total Available Balance
                          </div>
                          <div className={styles.balance}>
                            <span className={styles.rupee}>₹</span>
                            {this.props &&
                              this.props.cliqCashUserDetails &&
                              this.props.cliqCashUserDetails
                                .totalCliqCashBalance &&
                              this.props.cliqCashUserDetails.totalCliqCashBalance
                                .value &&
                              this.props.cliqCashUserDetails.totalCliqCashBalance
                                .value > 0
                              ? parseFloat(
                                Math.floor(
                                  this.props.cliqCashUserDetails
                                    .totalCliqCashBalance.value
                                )
                              ).toLocaleString("hi-IN")
                              : "0"}
                            <span className={styles.floatingNumber}>.00</span>
                          </div>
                        </div>

                        {this.props.cliqCashConfig &&
                          this.props.cliqCashConfig.topUp ? (
                            <div className={styles.infoBase}>
                              <React.Fragment>
                                <div className={styles.info}>
                                  For faster checkout
                              </div>
                                <div className={styles.btnCenter}>
                                  <Button
                                    type="lipstick"
                                    margin="auto"
                                    height={32}
                                    width={132}
                                    label="Add top up"
                                    color="#da1c5c"
                                    backgroundColor="#da1c5c"
                                    borderRadius={20}
                                    textStyle={{ color: "#fff", fontSize: 12 }}
                                    onClick={() =>
                                      this.props.cliqCashUserDetails &&
                                        !this.props.cliqCashUserDetails
                                          .isWalletOtpVerified
                                        ? this.kycVerification()
                                        : this.navigateTopUp()
                                    }
                                  />
                                </div>
                              </React.Fragment>
                            </div>
                          ) : (
                            <div className={styles.infoBaseKnowMore}>
                              <div className={styles.spacing} />
                              <div className={styles.infoKnowMore}>
                                A quick and convenient way for faster checkout and
                                refund.
                              <div
                                  className={styles.knowMore}
                                  onClick={this.getCliqCashKnowMore}
                                >
                                  Know More.
                              </div>
                              </div>
                            </div>
                          )}
                      </div>
                      {this.props.cliqCashExpiringDetails &&
                        this.props.cliqCashExpiringDetails.isExpiring ? (
                          <CliqCashExpiring
                            cliqCashExpiringDetails={
                              this.props.cliqCashExpiringDetails
                            }
                          />
                        ) : null}
                    </div>
                  </div>
                  {this.props.cliqCashbackDetailsStatus &&
                    this.props.cliqCashbackDetailsStatus === SUCCESS &&
                    this.props.cliqCashbackDetails &&
                    this.props.cliqCashbackDetails.cashbackOffers &&
                    this.props.cliqCashbackDetails.cashbackOffers.length >
                    0 && (
                      <AvailableOffersMyAcc
                        cliqCashbackDetails={this.props.cliqCashbackDetails}
                        history={this.props.history}
                        showCashBackDetailsPopup={data =>
                          this.props.showCashBackDetailsPopup(data)
                        }
                      />
                    )}
                  <div className={styles.giftCardBase}>
                    <div className={styles.giftCardContainer}>
                      <div className={styles.flexJustify}>
                        <div className={styles.giftCardHeading}>Gift Cards</div>
                        {this.props.cliqCashConfig &&
                          this.props.cliqCashConfig.checkBalance && (
                            <button
                              type="button"
                              onClick={() =>
                                this.props.cliqCashUserDetails &&
                                  !this.props.cliqCashUserDetails
                                    .isWalletOtpVerified
                                  ? this.kycVerification()
                                  : this.navigateCheckBalance()
                              }
                              className={styles.buttonSimple}
                            >
                              Check Balance
                            </button>
                          )}
                      </div>
                      <div className={styles.addGiftCardContainer}>
                        <div className={styles.addGiftCardIconHolder}>
                          <div className={styles.addGiftCardIcon} />
                        </div>
                        <div className={styles.addGiftCard}>
                          <div
                            className={styles.addGiftCardHeaderAndSubHeading}
                          >
                            <div className={styles.addGiftCardHeading}>
                              Add Gift Card Balance
                            </div>
                            <div className={styles.addGiftCardSubHeading}>
                              Received Gift Card from someone
                            </div>
                          </div>
                          <div
                            className={styles.addGiftCardButtonHolder}
                            onClick={() =>
                              this.props &&
                                this.props.cliqCashUserDetails &&
                                !this.props.cliqCashUserDetails
                                  .isWalletOtpVerified
                                ? this.kycVerification()
                                : this.showCliqCashModulePopUp()
                            }
                          >
                            <div className={styles.addGiftCardButtonCliq}>
                              <div className={styles.addGiftCardButtonTextCliq}>
                                Add It Here
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.buyGiftCardContainer}>
                        <div className={styles.buyGiftCardIconHolder}>
                          <div className={styles.buyGiftCardIcon} />
                        </div>
                        <div className={styles.buyGiftCard}>
                          <div
                            className={styles.buyGiftCardHeaderAndSubHeading}
                          >
                            <div className={styles.buyGiftCardHeading}>
                              Send Gift Card
                            </div>
                            <div className={styles.buyGiftCardSubHeading}>
                              Send Gift Card to someone.
                            </div>
                          </div>
                          <div
                            className={styles.buyGiftCardButtonHolder}
                            onClick={() => {
                              this.buyNewGiftCard();
                            }}
                          >
                            <div className={styles.buyGiftCardButton}>
                              <div className={styles.buyGiftCardButtonText}>
                                Buy gift card
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.props.cliqCashConfig &&
                    this.props.cliqCashConfig.promoCliqCash && (
                      <div className={styles.promoBase}>
                        <div
                          className={styles.giftCardPromoContainer}
                          onClick={() => this.redirectToPromoCliqCash()}
                        >
                          <div className={styles.arrowDiv}>
                            <img src={Arrow} className={styles.arrow} />
                          </div>
                          <div className={styles.promoCliqCashText}>
                            <div>PROMO CLiQ Cash</div>

                            <div className={styles.viewRewards}>
                              View Rewards
                            </div>
                            <span className={styles.fwd_logo} />
                          </div>
                        </div>
                      </div>
                    )}

                  {Array.isArray(transactions) &&
                    transactions.length > 0 && (
                      <div className={styles.cliqCashTransactionBase}>
                        <div className={styles.cliqCashTransactionContainer}>
                          <div className={styles.cliqCashTransactionHeading}>
                            Your Recent Transactions
                          </div>
                          {transactions.splice(0, 5).map((value, i) => {
                            return (
                              <div
                                className={
                                  styles.cliqCashTransactionDetailsBase
                                }
                                onClick={() =>
                                  this.transactiondetailPage(value)
                                }
                                key={i}
                              >
                                <div
                                  className={
                                    styles.cliqCashTransactionDetailsContainer
                                  }
                                >
                                  <div
                                    className={
                                      styles.cliqCashTransactionDetails
                                    }
                                  >
                                    <div
                                      className={styles.cliqCashTransactionInfo}
                                    >
                                      {value.transactionName}
                                      {value &&
                                        value.orderInfo &&
                                        value.orderInfo[0] && (
                                          <span
                                            className={
                                              styles.cliqCashTransactionInfo
                                            }
                                          >
                                            {" "}
                                            for {value.orderInfo[0].productName}
                                          </span>
                                        )}
                                    </div>
                                    {value.transactionId &&
                                      !value.transactionType
                                        .toUpperCase()
                                        .match(/\bPAID|RECEIVED REFUND/g) && (
                                        <div className={styles.cliqCashOrderNo}>
                                          Transaction ID: {value.transactionId}
                                        </div>
                                      )}

                                    {value.orderNo &&
                                      value.transactionType
                                        .toUpperCase()
                                        .match(/\bPAID|RECEIVED REFUND/g) && (
                                        <div className={styles.cliqCashOrderNo}>
                                          Order No:{value.orderNo}
                                        </div>
                                      )}
                                    {value.expiryDate &&
                                      value.expiryDate !=
                                      EXPIRED_REJECTED_FORMAT &&
                                      value.transactionType &&
                                      value.transactionType
                                        .toUpperCase()
                                        .match(/\bEXPIRED/g) && (
                                        <div className={styles.expireDate}>
                                          {getUTCDateMonthFormat(
                                            value.expiryDate,
                                            true,
                                            true
                                          ).match(/\bToday|Yesterday/g)
                                            ? "Expired"
                                            : "Expired on"}{" "}
                                          {getUTCDateMonthFormat(
                                            value.expiryDate,
                                            true,
                                            true
                                          )}
                                        </div>
                                      )}
                                    {value.expiryDate &&
                                      value.expiryDate !=
                                      EXPIRED_REJECTED_FORMAT &&
                                      value.transactionType &&
                                      !value.transactionType
                                        .toUpperCase()
                                        .match(
                                          /\bEXPIRED|PAID|RECEIVED REFUND/g
                                        ) &&
                                      !this.checkDateExpired(
                                        value.expiryDate
                                      ) && (
                                        <div className={styles.expireDate}>
                                          {getUTCDateMonthFormat(
                                            value.expiryDate,
                                            true,
                                            true,
                                            true,
                                            true
                                          ).match(/\bToday|Tomorrow/g)
                                            ? "Expiring"
                                            : "Expiring on"}{" "}
                                          {getUTCDateMonthFormat(
                                            value.expiryDate,
                                            true,
                                            true,
                                            true,
                                            true
                                          )}
                                        </div>
                                      )}
                                  </div>
                                  <div className={styles.priceAndTime}>
                                    <div
                                      className={
                                        value.transactionType &&
                                          !value.transactionType
                                            .toUpperCase()
                                            .match(/EXPIRED|PAID|CANCELLED/g)
                                          ? styles.amountAdded
                                          : styles.price
                                      }
                                    >
                                      {value.transactionType &&
                                        !value.transactionType
                                          .toUpperCase()
                                          .match(/EXPIRED|PAID|CANCELLED/g)
                                        ? "+ "
                                        : "- "}
                                      {value &&
                                        value.amount &&
                                        value.amount.formattedValue}
                                    </div>
                                    <div className={styles.dateAndTime}>
                                      {getWholeDayTimeFormat(
                                        value.transactionDate,
                                        value.transactionTime
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          {transactions.length >= 5 && (
                            <div
                              className={styles.viewMore}
                              onClick={() => this.showTransactioDetails()}
                            >
                              View More
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  <div className={styles.aboutCliqCashBase}>
                    <div className={styles.aboutCliqCashContainer}>
                      <div className={styles.aboutCliqCashHeaderText}>
                        The CLiQ Cash Advantage
                      </div>
                      <div className={styles.aboutCliqCash}>
                        <div className={styles.aboutCliqCashIconAndText}>
                          <div className={styles.aboutCliqCashIconHolder}>
                            <div className={styles.checkoutIcon} />
                          </div>
                          <div className={styles.aboutCliqCashInfoHeading}>
                            FASTER CHECKOUT
                          </div>
                          <div className={styles.aboutCliqCashInfoSubHeading}>
                            Instant Checkout
                          </div>
                        </div>
                        <div className={styles.aboutCliqCashIconAndText}>
                          <div className={styles.aboutCliqCashIconHolder}>
                            <div className={styles.refundIcon} />
                          </div>
                          <div className={styles.aboutCliqCashInfoHeading}>
                            FASTER REFUNDS
                          </div>
                          <div className={styles.aboutCliqCashInfoSubHeading}>
                            Get Refunds instantly post successful pick up
                          </div>
                        </div>
                        <div className={styles.aboutCliqCashIconAndText}>
                          <div className={styles.aboutCliqCashIconHolder}>
                            <div className={styles.walletIcon} />
                          </div>
                          <div className={styles.aboutCliqCashInfoHeading}>
                            CONSOLIDATED WALLET
                          </div>
                          <div className={styles.aboutCliqCashInfoSubHeading}>
                            All balances at one place
                          </div>
                        </div>
                        <div
                          className={
                            styles.aboutCliqCashIconAndTextWithoutBorder
                          }
                        >
                          <div className={styles.aboutCliqCashIconHolder}>
                            <div className={styles.secureIcon} />
                          </div>
                          <div className={styles.aboutCliqCashInfoHeading}>
                            Safe & Secure
                          </div>
                          <div className={styles.aboutCliqCashInfoSubHeading}>
                            Your trusted place to keep money
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
                  onClick={() => this.renderToAccountSetting()}
                  firstName={
                    userData &&
                    userData.firstName &&
                    userData.firstName.trim().charAt(0)
                  }
                  heading={
                    userData && userData.firstName && `${userData.firstName} `
                  }
                  lastName={
                    userData && userData.lastName && `${userData.lastName}`
                  }
                  userAddress={this.props.userAddress}
                />
              </div>
            </DesktopOnly>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
CliqCashDesktop.propTypes = {
  balance: PropTypes.string,
  cardNumber: PropTypes.number,
  pinNumber: PropTypes.number,
  showCliqCashModule: PropTypes.func,
  showKycVerification: PropTypes.func,
  setHeaderText: PropTypes.func,
  clearTransaction: PropTypes.func,
  getCliqCashDetails: PropTypes.func,
  getTransactionDetails: PropTypes.func,
  getCliqCashPageConfiguration: PropTypes.func,
  cliqCashKnowMore: PropTypes.func,
  cliqCashUserDetails: PropTypes.object,
  hideSecondaryLoader: PropTypes.func,
  showSecondaryLoader: PropTypes.func,
  cliqCashConfig: PropTypes.object,
  cliqCashExpiringDetails: PropTypes.object,
  getCliqCashExpiring: PropTypes.func,
  cliqCashbackDetailsStatus: PropTypes.string,
  getCliqCashbackDetails: PropTypes.func,
  redeemCliqVoucher: PropTypes.func,
  transactionDetails: PropTypes.array,
  showCashBackDetailsPopup: PropTypes.func,
  userAddress: PropTypes.object,
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
  ...RouterPropTypes
};
