import React from "react";
import PropTypes from "prop-types";
import { RouterPropTypes } from "../../general/router-prop-types";
import Logo from "../../general/components/Logo";
import ControlInput from "../../general/components/ControlInput";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import Button from "../../general/components/Button.js";
import cliqCashIcon from "./img/cliqcash.png";
import styles from "./CliqAndCash.css";
import format from "date-fns/format";
import {
  MY_ACCOUNT_GIFT_CARD_PAGE,
  MY_ACCOUNT_PAGE,
  CLIQ_CASH,
  SUCCESS,
  SUCCESS_CAMEL_CASE,
  SUCCESS_UPPERCASE,
  LOGGED_IN_USER_DETAILS
} from "../../lib/constants.js";
import * as Cookie from "../../lib/Cookie";
import DesktopOnly from "../../general/components/DesktopOnly";
import ProfileMenu from "./ProfileMenu";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";
const DATE_FORMAT = "DD/MM/YYYY, hh:mm";

export default class CliqAndCash extends React.Component {
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
              <div className={styles.cliqCashDetailWithHolder}>
                <div className={styles.logoHolder}>
                  <Logo image={cliqCashIcon} />
                </div>
                <div className={styles.cliqCashBalanceHolder}>
                  {this.props.cliqCashUserDetails.totalCliqCashBalance && (
                    <div className={styles.balance}>{`₹ ${
                      this.props.cliqCashUserDetails.totalCliqCashBalance
                        .formattedValue
                      }`}</div>
                  )}
                  {this.props.cliqCashUserDetails.balanceClearedAsOf && (
                    <div className={styles.expiredBalanceText}>
                      {`Balance as of ${format(
                        this.props.cliqCashUserDetails.balanceClearedAsOf,
                        DATE_FORMAT
                      )} Hrs`}
                    </div>
                  )}
                  <div className={styles.informationText}>
                    Once you validate your gift card, the value will
                    automatically be added to your CLiQ Cash
                  </div>
                </div>
                <div className={styles.formHolder}>
                  <div className={styles.addBlanceHeader}>
                    Add Balance from Gift Card
                  </div>
                  <div className={styles.inputBoxHolder}>
                    <div className={styles.labelHeader}>Card Number</div>
                    <div className={styles.inputTextHolder}>
                      <ControlInput
                        boxy={true}
                        placeholder="Enter 16 digit card number"
                        value={
                          this.props.cardNumber
                            ? this.props.cardNumber
                            : this.state.cardNumber
                        }
                        onChange={cardNumber =>
                          this.onChangeCardNumber(cardNumber)
                        }
                        textStyle={{ fontSize: 14 }}
                        height={33}
                      />
                    </div>
                  </div>
                  <div className={styles.inputBoxHolder}>
                    <div className={styles.labelHeader}>Card Pin</div>
                    <div className={styles.inputTextHolder}>
                      <ControlInput
                        boxy={true}
                        placeholder="Enter 6 digit number"
                        value={
                          this.props.pinNumber
                            ? this.props.pinNumber
                            : this.state.pinNumber
                        }
                        onChange={pinNumber =>
                          this.onChangePinNumber(pinNumber)
                        }
                        textStyle={{ fontSize: 14 }}
                        height={33}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.buttonHolder}>
                  {this.props.isGiftCard && (
                    <div className={styles.giftCardButtonHolder}>
                      <UnderLinedButton
                        size="14px"
                        fontFamily="regular"
                        color="#000000"
                        label="Buy new Gift Card"
                        onClick={() => this.buyNewGiftCard()}
                      />
                    </div>
                  )}

                  <div className={styles.addBalanceHolder}>
                    <Button
                      type="primary"
                      backgroundColor="#ff1744"
                      height={40}
                      label="Add Balance"
                      width={120}
                      textStyle={{ color: "#FFF", fontSize: 14 }}
                      onClick={() => this.redeemCliqVoucher()}
                    />
                  </div>
                </div>
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
CliqAndCash.propTypes = {
  balance: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  cardNumber: PropTypes.number,
  pinNumber: PropTypes.number,
  isGiftCard: PropTypes.bool,
  gitCard: PropTypes.func,
  addBalance: PropTypes.func,
  cliqCashVoucherDetailsStatus: PropTypes.string,
  setHeaderText: PropTypes.func,
  getCliqCashDetails: PropTypes.func,
  redeemCliqVoucher: PropTypes.func,
  showSecondaryLoader: PropTypes.bool,
  hideSecondaryLoader: PropTypes.bool,
  userAddress: PropTypes.object,
  cliqCashUserDetails: PropTypes.shape({
    totalCliqCashBalance: PropTypes.number,
    balanceClearedAsOf: PropTypes.string,

  }),
  ...RouterPropTypes
};
CliqAndCash.defaultProps = {
  isGiftCard: true
};
