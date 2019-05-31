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
    return (
      <div className={styles.base}>
        <div className={MyAccountStyles.holder}>
          <DesktopOnly>
            <div className={MyAccountStyles.profileMenu}>
              <ProfileMenu {...this.props} />
            </div>
          </DesktopOnly>
          <div className={styles.transactionDetails}>
            <div className={styles.amountHolder}>
              <div className={styles.moneyPaidText}>Money paid</div>
              <div className={styles.amount}>
                {" "}
                <span className={styles.rupee}>₹</span>
                {this.props.amount}
              </div>
              <div className={styles.timeAndDate}>
                {this.props.timeAndDate} | Closing Balance : ₹
                <span className={styles.totalAmount}>
                  {this.props.totalAmount}
                </span>
              </div>
            </div>
            <div className={styles.transationDetailsHolder}>
              <div className={styles.transactionDetailsHeader}>
                Transaction Detail
              </div>
              <div className={styles.transactionName}>
                {this.props.transactionName}
              </div>
              <div className={styles.orderNo}>
                Order No: {this.props.orderNo}
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
            <div className={styles.faqAndTcHolder}>
              <FaqAndTcBase history={this.props.history} />
            </div>
          </div>
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
  }
}
TransactionDetailDesktop.propTypes = {
  amount: PropTypes.number,
  timeAndDate: PropTypes.string,
  totalAmount: PropTypes.number,
  transactionName: PropTypes.string,
  orderNo: PropTypes.number
};
TransactionDetailDesktop.defaultProps = {
  amount: 500,
  timeAndDate: "16 April, 2019 4:55 PM",
  totalAmount: 1500,
  orderNo: 108537870616095941301,
  transactionName: "Superdry White Men Fero Runner Running Sneakers"
};
