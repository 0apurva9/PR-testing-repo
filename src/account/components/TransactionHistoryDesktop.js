import React from "react";
import PropTypes from "prop-types";
import styles from "./TransactionHistoryDesktop.css";
import {
  SUCCESS,
  SUCCESS_CAMEL_CASE,
  SUCCESS_UPPERCASE,
  LOGGED_IN_USER_DETAILS,
  RECEIVED,
  PAID,
  EXPIRED
} from "../../lib/constants.js";
import Button from "../../general/components/Button";
import * as UserAgent from "../../lib/UserAgent.js";
import * as Cookie from "../../lib/Cookie";
import { getWholeDayTimeFormat } from "../../lib/commonFunction";
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
      transactionDetails:
        ((this.props || {}).transactionDetails || {}).transactions || []

      //this.props.transactionDetails.transactions
    };
  }

  componentDidMount() {
    this.props.getUserAddress();
    if (this.props.getTransactionDetails) {
      this.props.getTransactionDetails();
    }
  }

  setDate = date => {
    this.setState({ selectedDate: date });
  };
  showDatePickerModule = type => {
    this.setState({ checked: type });
    let data = {
      ...this.props,
      setDate: date => this.setDate(date)
    };
    if (this.props.showDatePickerModule) {
      this.props.showDatePickerModule(data);
    }
  };

  filteredTransactionDetails = type => {
    this.setState({ checked: type });
    let transactDataCheck =
      ((this.props || false).transactionDetails || false).transactions || false;
    if (transactDataCheck) {
      let originalData = JSON.parse(
        JSON.stringify(this.props.transactionDetails.transactions)
      );
      var status = null;
      switch (type) {
        case 1:
          status = RECEIVED;
          break;
        case 2:
          status = PAID;
          break;
        case 3:
          status = EXPIRED;
          break;
        default:
          status = null;
      }

      if (status) {
        const filteredData =
          originalData &&
          originalData.reduce(function(result, val) {
            val.items = val.items.filter(function(vl, j) {
              if (vl.transactionType.toLowerCase() === status.toLowerCase()) {
                return true;
              } else return false;
            });
            if (val.items.length) result.push(val);
            return result;
          }, []);
        this.setState({ transactionDetails: filteredData });
      } else {
        this.setState({ transactionDetails: originalData });
      }
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
    const transactionDetails = (this.state || {}).transactionDetails || [];
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      userData = JSON.parse(userDetails);
    }
    if (this.props.loading) this.props.showSecondaryLoader();
    else this.props.hideSecondaryLoader();

    return (
      <div className={styles.base}>
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
                          val.data === "By date"
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

                {transactionDetails && transactionDetails.length ? (
                  transactionDetails.map((val, i) => {
                    return (
                      <div>
                        <div className={styles.dateSection}>
                          <div className={styles.dateTime}>{val.date}</div>
                          <div className={styles.borderSection} />
                        </div>

                        {val &&
                          val.items &&
                          val.items.map((value, i) => {
                            return (
                              <div className={styles.orderSection}>
                                <div className={styles.orderSummary}>
                                  <div className={styles.orderText}>
                                    {value.transactionName}
                                  </div>

                                  <div className={styles.orderNumber}>
                                    Order No:{value.transactionId}
                                  </div>
                                </div>

                                <div className={styles.orderDetails}>
                                  <div
                                    className={
                                      value.transactionType.toLowerCase() ===
                                      data[2].data.toLowerCase()
                                        ? styles.orderAmountGreen
                                        : styles.orderAmount
                                    }
                                  >
                                    {value.transactionType.toLowerCase() ===
                                    data[2].data.toLowerCase()
                                      ? "+ "
                                      : "- "}
                                    {value &&
                                      value.closingBalance &&
                                      value.closingBalance.formattedValue}
                                  </div>

                                  <div className={styles.orderTime}>
                                    {getWholeDayTimeFormat({
                                      date: value.transactionDate,
                                      time: value.transactionTime
                                    })}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    );
                  })
                ) : (
                  <div className={styles.emptyTransactionData}>Empty Data</div>
                )}
              </div>
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
              lastName={userData && userData.lastName && `${userData.lastName}`}
              userAddress={this.props.userAddress}
            />
          </div>
        </div>
      </div>
    );
  }
}

TransactionHistoryDesktop.propTypes = {
  transactionDetails: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string,
      details: PropTypes.arrayOf(
        PropTypes.shape({
          orderName: PropTypes.string,
          orderNumber: PropTypes.string,
          status: PropTypes.string,
          orderTime: PropTypes.string
        })
      )
    })
  )
};

TransactionHistoryDesktop.defaultProps = {
  color: "#fff",
  backgroundColor: "#ff1744",
  btnText: "Continue Shopping"
};
