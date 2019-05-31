import React from "react";
import PropTypes from "prop-types";
import Logo from "../../general/components/Logo";
import ControlInput from "../../general/components/ControlInput";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import Button from "../../general/components/Button.js";
import cliqCashIcon from "./img/cliqcash.png";
import styles from "./CliqCashDesktop.css";
import format from "date-fns/format";
import {
  MY_ACCOUNT_GIFT_CARD_PAGE,
  MY_ACCOUNT_PAGE,
  CLIQ_CASH,
  SUCCESS,
  SUCCESS_CAMEL_CASE,
  SUCCESS_UPPERCASE,
  FAILURE,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  LOGIN_PATH,
  HOME_ROUTER
} from "../../lib/constants.js";
import * as UserAgent from "../../lib/UserAgent.js";
import * as Cookie from "../../lib/Cookie";
import DesktopOnly from "../../general/components/DesktopOnly";
import ProfileMenu from "./ProfileMenu";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";
import FaqAndTcBase from "./FaqAndTcBase";
const DATE_FORMAT = "DD/MM/YYYY, hh:mm";
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
  onChangeCardNumber(cardNumber) {
    if (cardNumber === "" || /^[0-9]+$/.test(cardNumber))
      if (cardNumber.length <= 16) {
        this.setState({ cardNumber: cardNumber });
      }
  }
  onChangePinNumber(pinNumber) {
    if (pinNumber === "" || /^[0-9]+$/.test(pinNumber))
      if (pinNumber.length <= 6) {
        this.setState({ pinNumber: pinNumber });
      }
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
            <div className={styles.cliqCashDetail}>
              <div
                className={styles.cliqCashDetailWithHolder}
                onClick={() => this.showCliqCashModule()}
              >
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
                        this.props.cliqCashUserDetails.totalCliqCashBalance &&
                        this.props.cliqCashUserDetails.totalCliqCashBalance
                          .doubleValue
                          ? this.props &&
                            this.props.cliqCashUserDetails &&
                            this.props.cliqCashUserDetails
                              .totalCliqCashBalance &&
                            this.props.cliqCashUserDetails.totalCliqCashBalance
                              .doubleValue
                          : "0"}
                      </div>
                    </div>

                    <div className={styles.infoBase}>
                      <div className={styles.spacing} />
                      <div className={styles.info}>
                        A quick and convenient way to pay and refund. For faster
                        checkout
                        <div className={styles.knowMore}>KNOW MORE.</div>
                      </div>
                    </div>
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
