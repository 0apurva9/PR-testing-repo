import React from "react";
import PropTypes from "prop-types";
import styles from "./TransactionHistoryDesktop.css";
import {
  LOGGED_IN_USER_DETAILS,
  RECEIVED,
  PAID,
  EXPIRED,
  TRANSACTION_DETAIL_PAGE
} from "../../lib/constants.js";
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
      transactionDetails:
        ((this.props || {}).transactionDetails || {}).transactions || []
    };
  }

  componentDidMount() {
    this.props.getUserAddress();
    if (this.props.getTransactionDetails) {
      this.props.getTransactionDetails();
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
  filteredTransactionDetails = type => {
    this.setState({ checked: type });
    if (
      this.props &&
      this.props.transactionDetails &&
      this.props.transactionDetails.transactions
    ) {
      let originalData = JSON.parse(
        JSON.stringify(this.props.transactionDetails.transactions)
      );
      let status = null;
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
    const transactionDetails = this.state.transactionDetails;
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
                          onClick={() => this.filteredTransactionDetails(i)}
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
                            <div className={styles.dateTime}>{val.date}</div>
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
                                    </div>

                                    <div className={styles.orderNumber}>
                                      Order No:{value.transactionId}
                                    </div>
                                  </div>

                                  <div className={styles.orderDetails}>
                                    <div
                                      className={
                                        value.transactionType.toLowerCase() ===
                                        data[1].data.toLowerCase()
                                          ? styles.orderAmountGreen
                                          : styles.orderAmount
                                      }
                                    >
                                      {value.transactionType.toLowerCase() ===
                                      data[1].data.toLowerCase()
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
