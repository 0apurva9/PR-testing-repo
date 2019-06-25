import React from "react";
import PropTypes from "prop-types";
import styles from "./CliqCashDesktop.css";
import {
  MY_ACCOUNT_GIFT_CARD_PAGE,
  MY_ACCOUNT_PAGE,
  CLIQ_CASH,
  SUCCESS,
  SUCCESS_CAMEL_CASE,
  SUCCESS_UPPERCASE,
  LOGGED_IN_USER_DETAILS,
  TRANSACTION_DETAIL_PAGE,
  TRANSACTION_HISTORY,
  MY_ACCOUNT_CLIQ_CASH_PAGE,
  EXPIRED_REJECTED_FORMAT
} from "../../lib/constants.js";
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
export default class CliqCashDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: this.props.cardNumber ? this.props.cardNumber : "",
      pinNumber: this.props.pinNumber ? this.props.cardNumber : "",
      cliqCashUpdate: false
    };
  }

  componentWillReceiveProps(nextProps) {
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
  componentDidMount() {
    this.props.setHeaderText(CLIQ_CASH);
    if (this.props.getCliqCashDetails) {
      this.props.getCliqCashDetails();
    }
    if (this.props.getTransactionDetails) {
      this.props.getTransactionDetails();
    }
  }

  redeemCliqVoucher() {
    if (this.state.cardNumber && this.state.pinNumber) {
      this.setState({ cliqCashUpdate: true });
      if (this.props.redeemCliqVoucher) {
        this.props.redeemCliqVoucher(this.state);
      }
    }
  }
  transactiondetailPage(data) {
    this.props.history.push({
      pathname: `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}${TRANSACTION_DETAIL_PAGE}`,
      state: {
        transactonDetails: data,
        userAddress: this.props.userAddress
      }
    });
  }
  showTransactioDetails = () => {
    this.props.history.push(
      `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}${TRANSACTION_HISTORY}`
    );
  };

  buyNewGiftCard = () => {
    this.props.history.push(`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_GIFT_CARD_PAGE}`);
  };

  showCliqCashModule = () => {
    if (this.props.showCliqCashModule) {
      this.props.showCliqCashModule(this.props);
    }
  };

  render() {
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let transactions = [];
    this.props.transactionDetails &&
      this.props.transactionDetails.map(data => {
        return transactions.push(...data.items);
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
                  <div className={styles.cliqCashDetailWithHolder}>
                    <div className={styles.cliqCashBalanceContainer}>
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
                              .doubleValue
                              ? this.props &&
                                this.props.cliqCashUserDetails &&
                                this.props.cliqCashUserDetails
                                  .totalCliqCashBalance &&
                                this.props.cliqCashUserDetails
                                  .totalCliqCashBalance.doubleValue
                              : "0"}
                          </div>
                        </div>

                        <div className={styles.infoBase}>
                          <div className={styles.spacing} />
                          <div className={styles.info}>
                            A quick and convenient way to pay and refund. For
                            faster checkout
                            <div className={styles.knowMore}>know more.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.aboutCliqCashBase}>
                    <div className={styles.aboutCliqCashContainer}>
                      <div className={styles.aboutCliqCashHeaderText}>
                        Why use CLiQ Cash?
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
                            <div className={styles.walletIcon} />
                          </div>
                          <div className={styles.aboutCliqCashInfoHeading}>
                            CONSOLIDATED WALLET
                          </div>
                          <div className={styles.aboutCliqCashInfoSubHeading}>
                            All balances at one place
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
                  <div className={styles.giftCardBase}>
                    <div className={styles.giftCardContainer}>
                      <div className={styles.giftCardHeading}>Gift Cards</div>
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
                            onClick={() => {
                              this.showCliqCashModule();
                            }}
                          >
                            <div className={styles.addGiftCardButton}>
                              <div className={styles.addGiftCardButtonText}>
                                Add gift card
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
                              Received Gift Card from someone
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
                  {transactions &&
                    transactions.length > 0 && (
                      <div className={styles.cliqCashTransactionBase}>
                        <div className={styles.cliqCashTransactionContainer}>
                          <div className={styles.cliqCashTransactionHeading}>
                            Your recent transactions
                          </div>
                          {transactions &&
                            transactions.map((value, i) => {
                              return (
                                i < 5 && (
                                  <div
                                    className={
                                      styles.cliqCashTransactionDetailsBase
                                    }
                                    onClick={() =>
                                      this.transactiondetailPage(value)
                                    }
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
                                          className={
                                            styles.cliqCashTransactionInfo
                                          }
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
                                                for{" "}
                                                {value.orderInfo[0].productName}
                                              </span>
                                            )}
                                        </div>
                                        {value.transactionId &&
                                          value.transactionType
                                            .toUpperCase()
                                            .match(
                                              /\bADDED|EXPIRED|RECEIVED/g
                                            ) && (
                                            <div
                                              className={styles.cliqCashOrderNo}
                                            >
                                              Transaction ID:{" "}
                                              {value.transactionId}
                                            </div>
                                          )}

                                        {value.orderNo &&
                                          !value.transactionType
                                            .toUpperCase()
                                            .match(
                                              /\bADDED|RECEIVED REFUND/g
                                            ) && (
                                            <div
                                              className={styles.cliqCashOrderNo}
                                            >
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
                                              Expired on:{" "}
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
                                            .match(/\bEXPIRED|PAID/g) && (
                                            <div className={styles.expireDate}>
                                              Expiring on:{" "}
                                              {getUTCDateMonthFormat(
                                                value.expiryDate,
                                                true,
                                                true
                                              )}
                                            </div>
                                          )}
                                      </div>
                                      <div className={styles.priceAndTime}>
                                        <div
                                          className={
                                            value.transactionType
                                              .toUpperCase()
                                              .match(/\bRECEIVED|\bADDED/g)
                                              ? styles.amountAdded
                                              : styles.price
                                          }
                                        >
                                          {value.transactionType
                                            .toUpperCase()
                                            .match(/\bRECEIVED|\bADDED/g)
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
                                )
                              );
                            })}
                          {transactions &&
                            transactions.length >= 5 && (
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

  showCliqCashModule: PropTypes.func
};
