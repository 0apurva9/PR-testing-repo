import React from "react";
import styles from "./TransactionDetailDesktop.css";
import DesktopOnly from "../../general/components/DesktopOnly";
import ProfileMenu from "./ProfileMenu";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";
import * as Cookie from "../../lib/Cookie";
import { getDateMonthFormat, getTimeAmPm } from "../../lib/dateTimeFunction";
import FaqAndTcBase from "./FaqAndTcBase";
import {
  LOGGED_IN_USER_DETAILS,
  MY_ACCOUNT,
  MY_ACCOUNT_CLIQ_CASH_PAGE,
  MY_ACCOUNT_PAGE,
  TRANSACTION_HISTORY
} from "../../lib/constants.js";
export default class TransactionDetailDesktop extends React.Component {
  redirectPage = url => {
    if (this.props.history) {
      this.props.history.push(url);
    }
  };

  navigateToAllTransactions() {
    this.props.history.push({
      pathname: `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}${TRANSACTION_HISTORY}`
    });
  }

  render() {
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      userData = JSON.parse(userDetails);
    }
    if (this.props && this.props.location && !this.props.location.state) {
      this.redirectPage(`${MY_ACCOUNT}${MY_ACCOUNT_CLIQ_CASH_PAGE}`);
    }
    let transactionDetails =
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.transactonDetails;
    let userAddress =
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.userAddress;
    return (
      <DesktopOnly>
        <div className={styles.base}>
          <div className={MyAccountStyles.holder}>
            <div className={MyAccountStyles.profileMenu}>
              <ProfileMenu {...this.props} />
            </div>

            <div className={styles.transactionDetails}>
              <div className={styles.amountHolder}>
                <div className={styles.headerContainer}>
                  <div className={styles.moneyPaidText}>
                    {transactionDetails &&
                      !transactionDetails.transactionType
                        .toUpperCase()
                        .match(/\bRECEIVED REFUND/g) &&
                      "Amount "}
                    {transactionDetails && transactionDetails.transactionType}
                  </div>
                  <div
                    className={styles.backToAllTransaction}
                    onClick={() => this.navigateToAllTransactions()}
                  >
                    Back to All Transactions
                  </div>
                </div>
                <div className={styles.amount}>
                  <span className={styles.rupee}>₹</span>
                  {transactionDetails &&
                    transactionDetails.amount &&
                    transactionDetails.amount.value &&
                    parseFloat(
                      Math.round(transactionDetails.amount.value * 100) / 100
                    )
                      .toFixed(2)
                      .toLocaleString("hi-IN")}
                </div>
                <div className={styles.timeAndDate}>
                  {getDateMonthFormat(
                    transactionDetails && transactionDetails.transactionDate,
                    true,
                    true
                  )}{" "}
                  {getTimeAmPm(
                    transactionDetails && transactionDetails.transactionTime
                  )}{" "}
                  | Closing Balance : ₹
                  <span className={styles.totalAmount}>
                    {transactionDetails &&
                    transactionDetails.closingBalance &&
                    transactionDetails.closingBalance.value &&
                    transactionDetails.closingBalance.value > 0
                      ? parseFloat(
                          Math.round(
                            transactionDetails.closingBalance.value * 100
                          ) / 100
                        )
                          .toFixed(2)
                          .toLocaleString("hi-IN")
                      : "0.00"}
                  </span>
                </div>
              </div>
              {transactionDetails &&
                !transactionDetails.transactionType
                  .toUpperCase()
                  .match(/\bEXPIRED/g) && (
                  <div className={styles.transationDetailsHolder}>
                    <div className={styles.transactionDetailsHeader}>
                      Transaction Detail
                    </div>
                    {transactionDetails &&
                      transactionDetails.orderInfo &&
                      transactionDetails.orderInfo.map((data, index) => {
                        return (
                          <div className={styles.transactionName} key={`key${index}`} >
                            {data && data.productName} |{" "}
                            <span className={styles.quantity}>
                              Qty {data && data.quantity}
                            </span>
                          </div>
                        );
                      })}
                    {transactionDetails &&
                      transactionDetails.transactionId &&
                      !transactionDetails.transactionType
                        .toUpperCase()
                        .match(/\bPAID|RECEIVED REFUND/g) && (
                        <div className={styles.orderNo}>
                          Transaction ID: {transactionDetails.transactionId}
                        </div>
                      )}
                    {transactionDetails &&
                      transactionDetails.orderNo &&
                      transactionDetails.transactionType
                        .toUpperCase()
                        .match(/\bPAID|RECEIVED REFUND/g) && (
                        <div className={styles.orderNo}>
                          Order No: {transactionDetails.orderNo}
                        </div>
                      )}
                  </div>
                )}
              {/* <div className={styles.tcHolder}>
                <div
                  className={styles.tcOptionWrapper}
                  onClick={() => this.redirectPage(CONTACT_URL)}
                >
                  <div className={styles.tcOption}>Contact Us</div>
                  <div className={styles.tcOptionArrow}>
                    <div className={styles.arrowRight} />
                  </div>
                </div>
              </div> */}
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
                        Quick & Instant Checkout
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
                        Get Cashbacks, Refunds, Promos at one place
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
                        Get Refunds instantly
                      </div>
                    </div>
                    <div
                      className={styles.aboutCliqCashIconAndTextWithoutBorder}
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
                userAddress={userAddress}
              />
            </div>
          </div>
        </div>
      </DesktopOnly>
    );
  }
}
