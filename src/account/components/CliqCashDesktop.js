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
  TRANSACTION_DETAIL_PAGE
} from "../../lib/constants.js";
import * as UserAgent from "../../lib/UserAgent.js";
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
  }
  gitCard() {
    if (this.props.gitCard) {
      this.props.gitCard();
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
      pathname: `${TRANSACTION_DETAIL_PAGE}`,
      state: {
        transactonDetails: data,
        userAddress: this.props.userAddress
      }
    });
  }

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
            </DesktopOnly>
            <DesktopOnly>
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
                            <div className={styles.knowMore}>KNOW MORE.</div>
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
                        <div className={styles.aboutCliqCashIconAndText}>
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

                  <div className={styles.cliqCashTransactionBase}>
                    <div className={styles.cliqCashTransactionContainer}>
                      <div className={styles.cliqCashTransactionHeading}>
                        Your recent transactions
                      </div>
                      {transactonDetails &&
                        transactonDetails.transactions &&
                        transactonDetails.transactions.map((value, i) => {
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
                                      className={styles.cliqCashTransactionInfo}
                                    >
                                      {value.transactionName}
                                    </div>
                                    <div className={styles.cliqCashOrderNo}>
                                      Order No: {value.orderNo}
                                    </div>
                                  </div>
                                  <div className={styles.priceAndTime}>
                                    <div className={styles.price}>
                                      {" "}
                                      -{" "}
                                      {value &&
                                        value.amount &&
                                        value.amount.formattedValue}
                                    </div>
                                    <div className={styles.dateAndTime}>
                                      {value.transactionTime}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          );
                        })}
                      <div className={styles.viewMore}>View More</div>
                    </div>
                  </div>
                </div>

                <div className={styles.faqAndTcHolder}>
                  <FaqAndTcBase history={this.props.history} />
                </div>
              </div>
            </DesktopOnly>
            <DesktopOnly>
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
  date: PropTypes.string,
  time: PropTypes.string,
  cardNumber: PropTypes.number,
  pinNumber: PropTypes.number,
  isGiftCard: PropTypes.bool,
  gitCard: PropTypes.func,
  showCliqCashModule: PropTypes.func,
  addBalance: PropTypes.func
};
CliqCashDesktop.defaultProps = {
  isGiftCard: true
};
const transactonDetails = {
  type: "cliqCashTransactionsDto",
  status: "Success",
  transactions: [
    {
      amount: {
        currencyIso: "INR",
        doubleValue: 15,
        formattedValue: "₹15.00",
        formattedValueNoDecimal: "₹15",
        priceType: "BUY",
        value: 15
      },
      cardNumber: "3000162053600148",
      cardProgramGroup: "TUL Wallet-PROMOTION",
      closingBalance: {
        currencyIso: "INR",
        doubleValue: 750,
        formattedValue: "₹750.00",
        formattedValueNoDecimal: "₹750",
        priceType: "BUY",
        value: 750
      },
      expiryDate: "2019-05-29T00:00:00",
      orderNo: "108537870616095941301",
      transactionDate: "2019-05-28",
      transactionId: "826629117",
      transactionName: "Received Promotional Credit",
      transactionStatus: "SUCCESS",
      transactionTime: "20:03:16",
      transactionType: "Received"
    },
    {
      amount: {
        currencyIso: "INR",
        doubleValue: 15,
        formattedValue: "₹15.00",
        formattedValueNoDecimal: "₹15",
        priceType: "BUY",
        value: 15
      },
      cardNumber: "3000162059965529",
      cardProgramGroup: "TUL Wallet-PROMOTION",
      closingBalance: {
        currencyIso: "INR",
        doubleValue: 735,
        formattedValue: "₹735.00",
        formattedValueNoDecimal: "₹735",
        priceType: "BUY",
        value: 735
      },
      expiryDate: "2019-05-30T00:00:00",
      orderNo: "108537870616095941301",
      transactionDate: "2019-05-28",
      transactionId: "826629102",
      transactionName: "Paid Promotional Credit",
      transactionStatus: "SUCCESS",
      transactionTime: "15:34:12",
      transactionType: "Paid"
    },
    {
      amount: {
        currencyIso: "INR",
        doubleValue: 15,
        formattedValue: "₹15.00",
        formattedValueNoDecimal: "₹15",
        priceType: "BUY",
        value: 15
      },
      cardNumber: "3000162053016152",
      cardProgramGroup: "TUL Wallet-PROMOTION",
      closingBalance: {
        currencyIso: "INR",
        doubleValue: 720,
        formattedValue: "₹720.00",
        formattedValueNoDecimal: "₹720",
        priceType: "BUY",
        value: 720
      },
      expiryDate: "2019-05-30T00:00:00",
      orderNo: "108537870616095941301",
      transactionDate: "2019-05-28",
      transactionId: "826629098",
      transactionName: " Expired Promotional Credit",
      transactionStatus: "SUCCESS",
      transactionTime: "15:10:29",
      transactionType: "Expired"
    },
    {
      amount: {
        currencyIso: "INR",
        doubleValue: 15,
        formattedValue: "₹15.00",
        formattedValueNoDecimal: "₹15",
        priceType: "BUY",
        value: 15
      },
      cardNumber: "3000162053148976",
      cardProgramGroup: "TUL Wallet-PROMOTION",
      closingBalance: {
        currencyIso: "INR",
        doubleValue: 705,
        formattedValue: "₹705.00",
        formattedValueNoDecimal: "₹705",
        priceType: "BUY",
        value: 705
      },
      expiryDate: "2019-05-30T00:00:00",
      orderNo: "108537870616095941301",
      transactionDate: "2019-05-28",
      transactionId: "826629094",
      transactionName: "Received Promotional Credit",
      transactionStatus: "SUCCESS",
      transactionTime: "14:10:10",
      transactionType: "Received"
    },
    {
      amount: {
        currencyIso: "INR",
        doubleValue: 200,
        formattedValue: "₹200.00",
        formattedValueNoDecimal: "₹200",
        priceType: "BUY",
        value: 200
      },
      cardNumber: "3000162086107343",
      cardProgramGroup: "TUL CLP CS Goodwill eGift Cards",
      closingBalance: {
        currencyIso: "INR",
        doubleValue: 690,
        formattedValue: "₹690.00",
        formattedValueNoDecimal: "₹690",
        priceType: "BUY",
        value: 690
      },
      expiryDate: "2019-05-30T00:00:00",
      orderNo: "108537870616095941301",
      transactionDate: "2019-05-28",
      transactionId: "826629086",
      transactionName: " Paid Goodwill Credit",
      transactionStatus: "SUCCESS",
      transactionTime: "11:08:50",
      transactionType: "Paid"
    },
    {
      amount: {
        currencyIso: "INR",
        doubleValue: 200,
        formattedValue: "₹200.00",
        formattedValueNoDecimal: "₹200",
        priceType: "BUY",
        value: 200
      },
      cardNumber: "3000162072921333",
      cardProgramGroup: "TUL CLP CS Consumer Research eGift Cards",
      closingBalance: {
        currencyIso: "INR",
        doubleValue: 490,
        formattedValue: "₹490.00",
        formattedValueNoDecimal: "₹490",
        priceType: "BUY",
        value: 490
      },
      expiryDate: "2019-05-30T00:00:00",
      orderNo: "108537870616095941301",
      transactionDate: "2019-05-28",
      transactionId: "826629085",
      transactionName: "Received Credit",
      transactionStatus: "SUCCESS",
      transactionTime: "11:08:28",
      transactionType: "Received"
    },
    {
      amount: {
        currencyIso: "INR",
        doubleValue: 200,
        formattedValue: "₹200.00",
        formattedValueNoDecimal: "₹200",
        priceType: "BUY",
        value: 200
      },
      cardNumber: "3000162052706089",
      cardProgramGroup: "TUL Wallet-PROMOTION",
      closingBalance: {
        currencyIso: "INR",
        doubleValue: 290,
        formattedValue: "₹290.00",
        formattedValueNoDecimal: "₹290",
        priceType: "BUY",
        value: 290
      },
      expiryDate: "2019-05-30T00:00:00",
      orderNo: "108537870616095941301",
      transactionDate: "2019-05-28",
      transactionId: "826629084",
      transactionName: " Expired Promotional Credit",
      transactionStatus: "SUCCESS",
      transactionTime: "11:07:37",
      transactionType: "Expired"
    },

    {
      amount: {
        currencyIso: "INR",
        doubleValue: 15,
        formattedValue: "₹15.00",
        formattedValueNoDecimal: "₹15",
        priceType: "BUY",
        value: 15
      },
      cardNumber: "3000162053600148",
      cardProgramGroup: "TUL Wallet-PROMOTION",
      closingBalance: {
        currencyIso: "INR",
        doubleValue: 750,
        formattedValue: "₹750.00",
        formattedValueNoDecimal: "₹750",
        priceType: "BUY",
        value: 750
      },
      expiryDate: "2019-04-29T00:00:00",
      orderNo: "108537870616095941301",
      transactionDate: "2019-05-28",
      transactionId: "826629117",
      transactionName: "Received Promotional Credit",
      transactionStatus: "SUCCESS",
      transactionTime: "20:03:16",
      transactionType: "Received"
    },
    {
      amount: {
        currencyIso: "INR",
        doubleValue: 15,
        formattedValue: "₹15.00",
        formattedValueNoDecimal: "₹15",
        priceType: "BUY",
        value: 15
      },
      cardNumber: "3000162059965529",
      cardProgramGroup: "TUL Wallet-PROMOTION",
      closingBalance: {
        currencyIso: "INR",
        doubleValue: 735,
        formattedValue: "₹735.00",
        formattedValueNoDecimal: "₹735",
        priceType: "BUY",
        value: 735
      },
      expiryDate: "2019-04-30T00:00:00",
      orderNo: "108537870616095941301",
      transactionDate: "2019-05-28",
      transactionId: "826629102",
      transactionName: "Paid Promotional Credit",
      transactionStatus: "SUCCESS",
      transactionTime: "15:34:12",
      transactionType: "Paid"
    },
    {
      amount: {
        currencyIso: "INR",
        doubleValue: 15,
        formattedValue: "₹15.00",
        formattedValueNoDecimal: "₹15",
        priceType: "BUY",
        value: 15
      },
      cardNumber: "3000162053016152",
      cardProgramGroup: "TUL Wallet-PROMOTION",
      closingBalance: {
        currencyIso: "INR",
        doubleValue: 720,
        formattedValue: "₹720.00",
        formattedValueNoDecimal: "₹720",
        priceType: "BUY",
        value: 720
      },
      expiryDate: "2019-04-30T00:00:00",
      orderNo: "108537870616095941301",
      transactionDate: "2019-05-28",
      transactionId: "826629098",
      transactionName: " Expired Promotional Credit",
      transactionStatus: "SUCCESS",
      transactionTime: "15:10:29",
      transactionType: "Expired"
    },

    {
      amount: {
        currencyIso: "INR",
        doubleValue: 15,
        formattedValue: "₹15.00",
        formattedValueNoDecimal: "₹15",
        priceType: "BUY",
        value: 15
      },
      cardNumber: "3000162053600148",
      cardProgramGroup: "TUL Wallet-PROMOTION",
      closingBalance: {
        currencyIso: "INR",
        doubleValue: 750,
        formattedValue: "₹750.00",
        formattedValueNoDecimal: "₹750",
        priceType: "BUY",
        value: 750
      },
      expiryDate: "2019-03-29T00:00:00",
      orderNo: "108537870616095941301",
      transactionDate: "2019-05-28",
      transactionId: "826629117",
      transactionName: "Received Promotional Credit",
      transactionStatus: "SUCCESS",
      transactionTime: "20:03:16",
      transactionType: "Received"
    },
    {
      amount: {
        currencyIso: "INR",
        doubleValue: 15,
        formattedValue: "₹15.00",
        formattedValueNoDecimal: "₹15",
        priceType: "BUY",
        value: 15
      },
      cardNumber: "3000162059965529",
      cardProgramGroup: "TUL Wallet-PROMOTION",
      closingBalance: {
        currencyIso: "INR",
        doubleValue: 735,
        formattedValue: "₹735.00",
        formattedValueNoDecimal: "₹735",
        priceType: "BUY",
        value: 735
      },
      expiryDate: "2019-03-30T00:00:00",
      orderNo: "108537870616095941301",
      transactionDate: "2019-05-28",
      transactionId: "826629102",
      transactionName: "Paid Promotional Credit",
      transactionStatus: "SUCCESS",
      transactionTime: "15:34:12",
      transactionType: "Paid"
    },
    {
      amount: {
        currencyIso: "INR",
        doubleValue: 15,
        formattedValue: "₹15.00",
        formattedValueNoDecimal: "₹15",
        priceType: "BUY",
        value: 15
      },
      cardNumber: "3000162053016152",
      cardProgramGroup: "TUL Wallet-PROMOTION",
      closingBalance: {
        currencyIso: "INR",
        doubleValue: 720,
        formattedValue: "₹720.00",
        formattedValueNoDecimal: "₹720",
        priceType: "BUY",
        value: 720
      },
      expiryDate: "2019-03-30T00:00:00",
      orderNo: "108537870616095941301",
      transactionDate: "2019-05-28",
      transactionId: "826629098",
      transactionName: " Expired Promotional Credit",
      transactionStatus: "SUCCESS",
      transactionTime: "15:10:29",
      transactionType: "Expired"
    }
  ]
};
