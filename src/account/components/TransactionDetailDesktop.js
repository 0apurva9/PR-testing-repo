import React from "react";
import styles from "./TransactionDetailDesktop.css";
import DesktopOnly from "../../general/components/DesktopOnly";
import ProfileMenu from "./ProfileMenu";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";
import * as Cookie from "../../lib/Cookie";
import FaqAndTcBase from "./FaqAndTcBase";
import PropTypes from "prop-types";
import {
  LOGGED_IN_USER_DETAILS,
  TERMS_AND_CONDITION_URL
} from "../../lib/constants.js";
export default class TransactionDetailDesktop extends React.Component {
  redirectPage = url => {
    if (this.props.history) {
      this.props.history.push(url);
    }
  };
  render() {
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      userData = JSON.parse(userDetails);
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
                <div className={styles.moneyPaidText}>Money paid</div>
                <div className={styles.amount}>
                  <span className={styles.rupee}>₹</span>
                  {transactionDetails &&
                    transactionDetails.amount &&
                    transactionDetails.amount.value}
                </div>
                <div className={styles.timeAndDate}>
                  {transactionDetails && transactionDetails.transactionDate}{" "}
                  {transactionDetails && transactionDetails.transactionTime} |
                  Closing Balance : ₹
                  <span className={styles.totalAmount}>
                    {transactionDetails &&
                      transactionDetails.closingBalance &&
                      transactionDetails.closingBalance.value}
                  </span>
                </div>
              </div>
              <div className={styles.transationDetailsHolder}>
                <div className={styles.transactionDetailsHeader}>
                  Transaction Detail
                </div>
                <div className={styles.transactionName}>
                  {transactionDetails && transactionDetails.transactionName}
                </div>
                <div className={styles.orderNo}>
                  Order No: {transactionDetails && transactionDetails.orderNo}
                </div>
              </div>
              <div className={styles.tcHolder}>
                <div
                  className={styles.tcOptionWrapper}
                  onClick={() => this.redirectPage(TERMS_AND_CONDITION_URL)}
                >
                  <div className={styles.tcOption}>T&C’s</div>
                  <div className={styles.tcOptionArrow}>
                    <div className={styles.arrowRight} />
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
