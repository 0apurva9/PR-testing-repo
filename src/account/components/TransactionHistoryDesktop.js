import React from "react";
import PropTypes from "prop-types";
import styles from "./TransactionHistoryDesktop.css";
import {
  LOGGED_IN_USER_DETAILS,
  RECEIVED,
  PAID,
  EXPIRED,
  TRANSACTION_DETAIL_PAGE,
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_CLIQ_CASH_PAGE,
  EXPIRED_REJECTED_FORMAT
} from "../../lib/constants.js";
import * as Cookie from "../../lib/Cookie";
import {
  getWholeDayTimeFormat,
  getMonthString,
  getUTCDateMonthFormat
} from "../../lib/dateTimeFunction";
import DesktopOnly from "../../general/components/DesktopOnly";
import ProfileMenu from "./ProfileMenu";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";
import FaqAndTcBase from "./FaqAndTcBase";

export default class TransactionHistoryDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 0,
      selectedDate: null,
      transactionDetails: null
    };
  }
  componentDidMount() {
    if (this.props.getTransactionDetails) {
      this.props.getTransactionDetails();
    }
  }
  setDate = date => {
    this.filteredTransactionDetails(this.state.checked, date);
  };
  getMonth = day => {
    let date = day.split("-");
    var monthString = getMonthString(date[0]);
    return monthString;
  };
  transactiondetailPage(data) {
    this.props.history.push({
      pathname: `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}${TRANSACTION_DETAIL_PAGE}`,
      state: {
        transactonDetails: data
      }
    });
  }
  showDatePickerModule = type => {
    this.setState({ checked: type, transactionDetails: null });
    let data = {
      ...this.props,
      setDate: date => this.setDate(date)
    };
    if (this.props.showDatePickerModule) {
      this.props.showDatePickerModule(data);
    }
  };
  filteredTransactionDetails = (type, filterDate) => {
    this.setState({ checked: type });
    let filteredData = "";
    let originalData = JSON.parse(
      JSON.stringify(this.props.transactionDetails)
    );
    var status = null;
    switch (type) {
      case 1:
        status = "Received";
        break;
      case 2:
        status = "Paid";
        break;
      case 3:
        status = "Expired";
        break;
      case 4:
        status = "ByDate";
        break;
      default:
        status = null;
    }

    if (status) {
      var transactionStatus = "\\b" + status.toUpperCase();
      var statusRegEx = new RegExp(transactionStatus, "g");
      if (type !== 4) {
        filteredData =
          originalData &&
          originalData.reduce((result, val) => {
            val.items =
              val.items &&
              val.items.filter((transaction, j) => {
                if (
                  transaction &&
                  transaction.transactionType &&
                  transaction.transactionType.toUpperCase().match(statusRegEx)
                ) {
                  return true;
                } else return false;
              });
            val.items && val.items.length && result.push(val);
            return result;
          }, []);
      } else {
        if (filterDate) {
          let fromDate = filterDate.fromDate;
          let fromYear = fromDate.getFullYear();
          let fromMonth = fromDate.getMonth();
          let fromDay = fromDate.getDate();
          let toDate = filterDate.toDate;
          let toYear = toDate.getFullYear();
          let toMonth = toDate.getMonth();
          let toDay = toDate.getDate();
          let fromDateMilliSeconds = new Date(
            fromYear,
            fromMonth,
            fromDay
          ).getTime();
          let toDateMilliSeconds = new Date(toYear, toMonth, toDay).getTime();
          let fromDateMiliSecNoDay = new Date(fromYear, fromMonth, 1).getTime();
          let toDateMiliSecNoDay = new Date(toYear, toMonth, 1).getTime();
          filteredData =
            originalData &&
            originalData.reduce((result, val) => {
              let indexedMonthYr =
                val && val.date ? val && val.date && val.date.split("-") : 0;
              indexedMonthYr[0] = parseInt(indexedMonthYr[0] - 1);
              indexedMonthYr[1] = parseInt(indexedMonthYr[1]);
              let actualIndexDate = new Date(
                indexedMonthYr[1],
                indexedMonthYr[0],
                1
              ).getTime();
              if (
                fromDateMiliSecNoDay <= actualIndexDate &&
                actualIndexDate <= toDateMiliSecNoDay
              ) {
                val.items =
                  val &&
                  val.items &&
                  val.items.filter((transaction, j) => {
                    let dates =
                      transaction &&
                      transaction.transactionDate &&
                      transaction.transactionDate.split("-");
                    let sentDate = new Date(dates[0], dates[1] - 1, dates[2]);
                    if (
                      fromDateMilliSeconds <= sentDate.getTime() &&
                      sentDate.getTime() <= toDateMilliSeconds
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  });

                if (val.items && val.items.length) result.push(val);
              }
              return result;
            }, []);
        }
      }

      this.setState({ transactionDetails: filteredData });
    } else {
      this.setState({ transactionDetails: originalData });
    }
  };

  render() {
    const data = [
      { data: "All" },
      { data: "Received" },
      { data: "Paid" },
      { data: "Expired" },
      { data: "By date" }
    ];
    const transactionDetails =
      this.state.checked === 4
        ? this.state.transactionDetails
        : this.state.transactionDetails
          ? this.state.transactionDetails
          : this.props.transactionDetails;
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      userData = JSON.parse(userDetails);
    }
    if (this.props.loading) this.props.showSecondaryLoader();
    else this.props.hideSecondaryLoader();

    return (
      <div className={styles.base}>
        <DesktopOnly>
          <div className={MyAccountStyles.holder}>
            <div className={MyAccountStyles.profileMenu}>
              <ProfileMenu {...this.props} />
            </div>

            <div className={styles.transDetail}>
              <div className={styles.transDetailHolder}>
                <div className={styles.dataHolder}>
                  <div className={styles.labelHeader}>
                    View all your transactions
                  </div>
                  <div className={styles.scrollDetaHolder}>
                    {data.map((val, i) => {
                      return (
                        <div
                          className={
                            this.state.checked === i
                              ? styles.checkedTab
                              : styles.tabData
                          }
                          onClick={
                            val.data.toUpperCase() ===
                            data[4].data.toUpperCase()
                              ? () => this.showDatePickerModule(i)
                              : () => this.filteredTransactionDetails(i)
                          }
                          key={i}
                        >
                          {val.data}
                        </div>
                      );
                    })}
                  </div>

                  {transactionDetails &&
                    transactionDetails.map((val, i) => {
                      return (
                        <div className={styles.transactionBase}>
                          <div className={styles.dateSection}>
                            <div className={styles.dateTime}>
                              {this.getMonth(val.date)}
                            </div>
                            <div className={styles.borderSection} />
                          </div>

                          {val &&
                            val.items &&
                            val.items.map((value, i) => {
                              return (
                                <div
                                  className={styles.orderSection}
                                  onClick={() =>
                                    this.transactiondetailPage(value)
                                  }
                                >
                                  <div className={styles.orderSummary}>
                                    <div className={styles.orderText}>
                                      {value.transactionName}
                                      {value &&
                                        value.orderInfo &&
                                        value.orderInfo[0] && (
                                          <span className={styles.orderText}>
                                            {" "}
                                            for {value.orderInfo[0].productName}
                                          </span>
                                        )}
                                    </div>
                                    {value.transactionId &&
                                      value.transactionType
                                        .toUpperCase()
                                        .match(/\bADDED|EXPIRED|RECEIVED/g) && (
                                        <div className={styles.orderNumber}>
                                          Transaction ID: {value.transactionId}
                                        </div>
                                      )}
                                    {value.orderNo &&
                                      !value.transactionType
                                        .toUpperCase()
                                        .match(/\bADDED/g) && (
                                        <div className={styles.orderNumber}>
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

                                  <div className={styles.orderDetails}>
                                    <div
                                      className={
                                        value.transactionType
                                          .toUpperCase()
                                          .match(/\bRECEIVED|\bADDED/g)
                                          ? styles.orderAmountGreen
                                          : styles.orderAmount
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

                                    <div className={styles.orderTime}>
                                      {getWholeDayTimeFormat(
                                        value.transactionDate,
                                        value.transactionTime
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      );
                    })}
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
          </div>
        </DesktopOnly>
      </div>
    );
  }
}

TransactionHistoryDesktop.propTypes = {
  transactionDetails: PropTypes.array
};
