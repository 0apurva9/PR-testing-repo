// Exchange Cashback Mode Selection Page
import React from "react";
import styles from "./ExchangeModeSelection.css";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import * as Cookie from "../../lib/Cookie";
import {
  LOGGED_IN_USER_DETAILS,
  MY_ACCOUNT,
  MY_ACCOUNT_ORDERS_PAGE,
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_STORE_BANK_FORM
} from "../../lib/constants";
import ProfileMenu from "./ProfileMenu";
import UserProfile from "./UserProfile";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import Instant from "../../general/components/img/pathCopy7.png";
import Icon from "../../xelpmoc-core/Icon";
import Button from "../../general/components/Button";
const Loader = () => {
  return (
    <div>
      <SecondaryLoader />
    </div>
  );
};
export default class ExchangeModeSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyPortion: false,
      showStickyPortion: 0,
      selectedOption: ""
    };
    this.radioChange = this.radioChange.bind(this);
  }

  componentDidMount() {
    document.title = "Exchange Cashback Mode Selection";
    if (this.props.shouldCallHeaderContainer) {
      this.props.setHeaderText("Exchange Cashback Mode Selection");
    }
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.ExchangeModeSelected &&
      this.props.location.state.ExchangeModeSelected === "BANK_ACCOUNT"
    ) {
      this.setState({ selectedOption: "BANK_ACCOUNT" });
    }
  }

  componentDidUpdate() {
    if (this.props.shouldCallHeaderContainer) {
      this.props.setHeaderText("Exchange Cashback Mode Selection");
    }
  }

  goToOrderHistory() {
    this.props.history.push(`${MY_ACCOUNT}${MY_ACCOUNT_ORDERS_PAGE}`);
  }

  async radioChange(e) {
    const target = e.currentTarget;
    console.log(target);
    this.setState({ selectedOption: target.value });
    //cliq cash
    if (target.value === "CLIQ_CASH") {
      let cliqCashCheck = await this.props.getCliqCashDetailsRefund();
      if (
        cliqCashCheck &&
        cliqCashCheck.status === "Success" &&
        (cliqCashCheck.isWalletCreated && cliqCashCheck.isWalletOtpVerified)
      ) {
        this.setState({ cliqCashCheckSuccess: true });
      } else {
        this.setState({ selectedOption: "" });
      }
    }
  }

  addBankDetails(data) {
    // url is used to redirect back after updating bank details
    let currentURL = this.props.location.pathname + this.props.location.search;
    if (data) {
      data.fromPageURL = currentURL;
      data.fromPage = "ExchangeModeSelection";
      data.ifscCode = data.IFSCCode;
    } else {
      let data = {};
      data.fromPageURL = currentURL;
      data.fromPage = "ExchangeModeSelection";
    }

    const urlParams = new URLSearchParams(this.props.location.search);
    let orderId = urlParams.get("parentOrderId");

    //go to add/update bank details screen with bank details
    this.props.history.push({
      pathname: `${RETURNS_PREFIX}/${orderId}${RETURN_LANDING}${RETURNS_STORE_BANK_FORM}`,
      state: {
        authorizedRequest: true,
        bankData: data,
        orderId: orderId,
        transactionId: orderId
      }
    });
  }

  submitDetails(data) {
    let selectedCashbackDetails = {};
    selectedCashbackDetails.data = data;
  }

  render() {
    // console.log(this.props.profile)
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (this.props.profile.reSendEmailLoader) {
      return Loader();
    }
    if (userDetails) {
      userData = JSON.parse(userDetails);
    }

    // const refundModesDetail = this.props.getRefundModesDetails;
    let exchangeDetails = {
      type: "exchangeModelListDTO",
      status: "SUCCESS",
      exchangePaymentDetails: [
        {
          exchangePaymentMode: "CLIQ_CASH",
          message: "Note: CLiQ Cash cannot be transferred to Bank Account"
        },
        {
          exchangePaymentMode: "BANK_ACCOUNT",
          message:
            "The Cashback will be credited in the bank account in 3-4 business days",
          IFSCCode: "HDFC0000794",
          accountHolderName: "Shayeri",
          accountNumber: "44456789045",
          bankName: "HDFC",
          customerName: "hati@tcs.com",
          title: "Mrs"
        }
      ],
      isIMEIVerified: false,
      isPickupAvailableForExchange: false,
      quoteExpired: false
    };
    let bankDetails = "";
    let cliqCashDetails = "";
    let disabled = true;
    if (this.state.selectedOption) {
      disabled = false;
    }
    return (
      <div className={styles.base}>
        <div className={MyAccountStyles.holder}>
          <div
            className={
              this.state.stickyPortion
                ? styles.stickyprofileMenuHolder
                : styles.profileMenuHolder
            }
          >
            <ProfileMenu {...this.props} />
          </div>

          <div className={styles.container}>
            <div className={styles.dataHolder}>
              <div className={styles.exchaneCashbackTitle}>
                Exchange Cashback Mode
              </div>
              <div
                className={styles.goBack}
                onClick={() => this.goToOrderHistory()}
              >
                Back to Order History
              </div>

              <React.Fragment>
                <div className={styles.refundModeContainer}>
                  <div className={styles.chooseMode}>
                    Choose mode to receive Exchange Cashback
                  </div>
                  <div className={styles.modeContent}>
                    <form>
                      {exchangeDetails &&
                        exchangeDetails.exchangePaymentDetails.map(
                          (value, index) => {
                            if (
                              value.exchangePaymentMode === "BANK_ACCOUNT" &&
                              value.accountNumber
                            ) {
                              bankDetails = value;
                            }
                            if (value.exchangePaymentMode === "CLIQ_CASH") {
                              cliqCashDetails = value;
                            }
                            if (
                              this.state.selectedOption === "BANK_ACCOUNT" &&
                              !bankDetails
                            ) {
                              disabled = true;
                            }
                            if (
                              this.state.selectedOption === "BANK_ACCOUNT" &&
                              bankDetails
                            ) {
                              disabled = false;
                            }
                            return (
                              <label key={index}>
                                <input
                                  className={styles.radioBtn}
                                  type="radio"
                                  value={value.exchangePaymentMode}
                                  checked={
                                    this.state.selectedOption ===
                                    value.exchangePaymentMode
                                  }
                                  onChange={this.radioChange}
                                />
                                {value.exchangePaymentMode === "CLIQ_CASH"
                                  ? "CLiQ Cash"
                                  : "Bank Account"}

                                {value.exchangePaymentMode === "CLIQ_CASH" ? (
                                  <React.Fragment>
                                    <div className={styles.InstantImage}>
                                      <Icon image={Instant} size={20} />
                                    </div>
                                    <div className={styles.cliqCashInstant}>
                                      Instant
                                    </div>
                                  </React.Fragment>
                                ) : null}

                                <div className={styles.radioBtnSubText}>
                                  <span className={styles.span}>
                                    {value.message}
                                  </span>
                                </div>
                              </label>
                            );
                          }
                        )}
                    </form>
                    {bankDetails &&
                      this.state.selectedOption === "BANK_ACCOUNT" && (
                        <React.Fragment>
                          <div className={styles.bankDetailsHeading}>
                            Your Account Details:
                          </div>
                          <div
                            className={styles.changeBankDetails}
                            onClick={() => this.addBankDetails(bankDetails)}
                          >
                            Change
                          </div>
                          <div className={styles.bankDetailsText}>Name:</div>
                          <div className={styles.bankDetailsText}>
                            {bankDetails.accountHolderName}
                          </div>
                          <div className={styles.bankDetailsText}>Bank:</div>
                          <div className={styles.bankDetailsText}>
                            {bankDetails.bankName}
                          </div>
                          <div className={styles.bankDetailsText}>
                            IFSC code:
                          </div>
                          <div className={styles.bankDetailsText}>
                            {bankDetails.IFSCCode}
                          </div>
                          <div className={styles.bankDetailsText}>
                            Account number:
                          </div>
                          <div className={styles.bankDetailsText}>
                            {bankDetails.accountNumber}
                          </div>
                        </React.Fragment>
                      )}
                  </div>
                </div>
                {!bankDetails &&
                  this.state.selectedOption === "BANK_ACCOUNT" && (
                    <div
                      className={styles.addBankDetailsButton}
                      onClick={() => this.addBankDetails()}
                    >
                      ADD BANK DETAILS
                    </div>
                  )}
              </React.Fragment>
            </div>
            <div className={styles.continueButtonHolder}>
              <Button
                label={"CONTINUE"}
                width={180}
                height={40}
                borderRadius={20}
                backgroundColor={"#ff1744"}
                onClick={() =>
                  this.submitDetails(
                    this.state.selectedOption === "BANK_ACCOUNT"
                      ? bankDetails
                      : cliqCashDetails
                  )
                }
                textStyle={{
                  color: "#FFF",
                  fontSize: 14,
                  fontFamily: "semibold"
                }}
                disabled={disabled}
              />
            </div>
          </div>

          <div
            className={
              this.state.stickyPortion
                ? styles.stickyuserProfile
                : styles.userProfile
            }
          >
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
              lastName={userData && userData.lastName && `${userData.lastName}`}
              userAddress={this.props.userAddress}
            />
          </div>
        </div>
      </div>
    );
  }
}
