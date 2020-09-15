// Exchange Cashback Mode Selection Page
import React from "react";
import styles from "./ExchangeModeSelection.css";
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
import Button from "../../general/components/Button";
import {
  setDataLayer,
  ADOBE_MDE_CASHBACK_MODE_CLIQCASH_EXCHANGE,
  ADOBE_MDE_CASHBACK_MODE_BANK_ACCOUNT_EXCHANGE
} from "../../lib/adobeUtils";
import LoaderForComponent from "../../general/components/LoaderForComponent";
export default class ExchangeModeSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyPortion: false,
      showStickyPortion: 0,
      selectedOption: "",
      orderId: ""
    };
    this.radioChange = this.radioChange.bind(this);
  }

  componentDidMount() {
    document.title = "Exchange Cashback Mode Selection";
    if (this.props.shouldCallHeaderContainer) {
      this.props.setHeaderText("Exchange Cashback Mode Selection");
    }
    // show current cashback mode selected
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.currentCashbackMode &&
      this.props.location.state.currentCashbackMode === "BANK_ACCOUNT"
    ) {
      this.setState({ selectedOption: "BANK_ACCOUNT" });
    }
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.currentCashbackMode &&
      this.props.location.state.currentCashbackMode === "CLIQ_CASH"
    ) {
      this.setState({ selectedOption: "CLIQ_CASH" });
    }
    // after updating bank details show bank account option selected
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.ExchangeModeSelected &&
      this.props.location.state.ExchangeModeSelected === "BANK_ACCOUNT"
    ) {
      this.setState({ selectedOption: "BANK_ACCOUNT" });
    }
    const urlParams = new URLSearchParams(this.props.location.search);
    let orderId = urlParams.get("parentOrderId");
    if (!this.props.location.search) {
      if (
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.orderId
      ) {
        orderId = this.props.location.state.orderId;
      }
    }
    this.setState({ orderId: orderId });
    setTimeout(() => {
      this.props.getExchangeCashbackDetails(orderId);
    }, 500);
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
    this.setState({ selectedOption: target.value });
    //cliq cash
    if (target.value === "CLIQ_CASH") {
      // let cliqCashCheck = await this.props.getCliqCashDetailsRefund();
      // if (
      //   cliqCashCheck &&
      //   cliqCashCheck.status === "Success" &&
      //   (cliqCashCheck.isWalletCreated && cliqCashCheck.isWalletOtpVerified)
      // ) {
      //   this.setState({ cliqCashCheckSuccess: true });
      // } else {
      //   this.setState({ selectedOption: "" });
      // }
      setDataLayer(ADOBE_MDE_CASHBACK_MODE_CLIQCASH_EXCHANGE);
    }
    if (target.value === "BANK_ACCOUNT") {
      setDataLayer(ADOBE_MDE_CASHBACK_MODE_BANK_ACCOUNT_EXCHANGE);
    }
  }

  addBankDetails(data) {
    // url is used to redirect back after updating bank details
    let currentURL = this.props.location.pathname + this.props.location.search;
    let details = {};
    if (data) {
      details = data;
      details.fromPageURL = currentURL;
      details.fromPage = "ExchangeModeSelection";
      details.ifscCode = data.IFSCCode;
    } else {
      details.fromPageURL = currentURL;
      details.fromPage = "ExchangeModeSelection";
    }

    //go to add/update bank details screen with bank details
    this.props.history.push({
      pathname: `${RETURNS_PREFIX}/${this.state.orderId}${RETURN_LANDING}${RETURNS_STORE_BANK_FORM}`,
      state: {
        authorizedRequest: true,
        bankData: details,
        orderId: this.state.orderId,
        transactionId: this.state.orderId
      }
    });
  }

  async submitDetails(orderId, cashbackDetails) {
    let response = await this.props.submitExchangeCashbackDetails(
      orderId,
      cashbackDetails
    );
    let placeHolder = "";
    if (
      response &&
      response.status &&
      response.status.toLowerCase() === "success"
    ) {
      if (cashbackDetails.exchangePaymentMode === "CLIQ_CASH") {
        placeHolder = "CLiQ Cash wallet";
      }
      if (cashbackDetails.exchangePaymentMode === "BANK_ACCOUNT") {
        placeHolder = "Bank Account";
      }
      let message =
        "You will receive Exchange Cashback in your " +
        placeHolder +
        " within 48 hours, post old phone pickup.";
      this.props.displayToast(message);
      this.props.history.push(`/my-account/orders`);
    }
    if (
      response &&
      response.status &&
      response.status.toLowerCase() === "failure" &&
      response.error
    ) {
      this.props.displayToast(response.error);
    }
  }

  render() {
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      userData = JSON.parse(userDetails);
    }
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
              {this.props.exchangeCashbackDetails &&
              this.props.exchangeCashbackDetails.exchangePaymentDetails ? (
                <React.Fragment>
                  <div className={styles.refundModeContainer}>
                    <div className={styles.chooseMode}>
                      Choose mode to receive Exchange Cashback
                    </div>
                    <div className={styles.modeContent}>
                      <form>
                        {this.props.exchangeCashbackDetails.exchangePaymentDetails.map(
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

                                <div className={styles.radioBtnSubText}>
                                  <span className={styles.span}>
                                    {value.exchangePaymentMode === "CLIQ_CASH"
                                      ? "Note: CLiQ Cash cannot be transferred to Bank Account"
                                      : "The Cashback will be credited in the bank account in 3-4 business days"}
                                  </span>
                                </div>
                              </label>
                            );
                          }
                        )}
                        {!bankDetails && (
                          <label>
                            <input
                              className={styles.radioBtn}
                              type="radio"
                              value="BANK_ACCOUNT"
                              checked={
                                this.state.selectedOption === "BANK_ACCOUNT"
                              }
                              onChange={this.radioChange}
                            />
                            Bank Account
                            <div className={styles.radioBtnSubText}>
                              <span className={styles.span}>
                                The Cashback will be credited in the bank
                                account in 3-4 business days
                              </span>
                            </div>
                          </label>
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
                              {bankDetails.IFSCCode &&
                                bankDetails.IFSCCode.replace(
                                  /.(?=.{4,}$)/g,
                                  "*"
                                )}
                            </div>
                            <div className={styles.bankDetailsText}>
                              Account number:
                            </div>
                            <div className={styles.bankDetailsText}>
                              {bankDetails.accountNumber &&
                                bankDetails.accountNumber.replace(
                                  /.(?=.{4,}$)/g,
                                  "*"
                                )}
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
                  <div className={styles.detailsContainer}>
                    <ul>
                      <li>
                        You will receive Exchange Cashback in selected mode
                        within 48hours, post old phone pick up.
                      </li>
                      <li>
                        If you have selected a Bank Account, then this Bank
                        Account would be used for future cashback and refund
                        processing.
                      </li>
                      <li>
                        If you have selected CLiQ Cash, then this CLiQ Cash
                        wallet would be used for future Exchange Cashback.
                      </li>
                      <li>
                        You can also change Exchange Cashback mode later from
                        Order Details Page.
                      </li>
                    </ul>
                  </div>
                </React.Fragment>
              ) : (
                <LoaderForComponent />
              )}
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
                    this.state.orderId,
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
