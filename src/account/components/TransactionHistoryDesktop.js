import React from "react";
import styles from "./TransactionHistoryDesktop.css";
import PropTypes from "prop-types";
import FaqAndTcBase from "./FaqAndTcBase";
export default class TransactionHistoryDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 0,
      selectedDate: null,
      transactionDetails: this.props.transactionDetails
    };
  }
  componentDidMount() {
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
      default:
        status = null;
    }

    if (status) {
      const filteredData =
        originalData &&
        originalData.reduce(function(result, val) {
          val.items = val.items.filter(function(vl, j) {
            console.log(vl.transactionType.toLowerCase());
            console.log("dd", status.toLowerCase());
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
    return (
      <div className={styles.base}>
        <div className={styles.dataHolder}>
          <div className={styles.labelHeader}>View all your transactions</div>
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

          {transactionDetails &&
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
                              {value.transactionTime}
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
  transactionDetails: [
    {
      date: "04-2019",
      items: [
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 15,
            formattedValue: "₹15.00",
            formattedValueNoDecimal: "₹15",
            priceType: "BUY",
            value: 15
          },
          cardNumber: "3000162053600148",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 750,
            formattedValue: "₹750.00",
            formattedValueNoDecimal: "₹750",
            priceType: "BUY",
            value: 750
          },
          expiryDate: "2019-05-29T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629117",
          transactionName: "Received Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "20:03:16",
          transactionType: "Received"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 15,
            formattedValue: "₹15.00",
            formattedValueNoDecimal: "₹15",
            priceType: "BUY",
            value: 15
          },
          cardNumber: "3000162059965529",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 735,
            formattedValue: "₹735.00",
            formattedValueNoDecimal: "₹735",
            priceType: "BUY",
            value: 735
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629102",
          transactionName: "Received Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "15:34:12",
          transactionType: "Received"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 15,
            formattedValue: "₹15.00",
            formattedValueNoDecimal: "₹15",
            priceType: "BUY",
            value: 15
          },
          cardNumber: "3000162053016152",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 720,
            formattedValue: "₹720.00",
            formattedValueNoDecimal: "₹720",
            priceType: "BUY",
            value: 720
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629098",
          transactionName: "Received Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "15:10:29",
          transactionType: "Received"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 15,
            formattedValue: "₹15.00",
            formattedValueNoDecimal: "₹15",
            priceType: "BUY",
            value: 15
          },
          cardNumber: "3000162053148976",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 705,
            formattedValue: "₹705.00",
            formattedValueNoDecimal: "₹705",
            priceType: "BUY",
            value: 705
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629094",
          transactionName: "Received Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "14:10:10",
          transactionType: "Received"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 200,
            formattedValue: "₹200.00",
            formattedValueNoDecimal: "₹200",
            priceType: "BUY",
            value: 200
          },
          cardNumber: "3000162086107343",
          cardProgramGroup: "TUL CLP CS Goodwill eGift Cards",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 690,
            formattedValue: "₹690.00",
            formattedValueNoDecimal: "₹690",
            priceType: "BUY",
            value: 690
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629086",
          transactionName: "Received Goodwill Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "11:08:50",
          transactionType: "Received"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 200,
            formattedValue: "₹200.00",
            formattedValueNoDecimal: "₹200",
            priceType: "BUY",
            value: 200
          },
          cardNumber: "3000162072921333",
          cardProgramGroup: "TUL CLP CS Consumer Research eGift Cards",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 490,
            formattedValue: "₹490.00",
            formattedValueNoDecimal: "₹490",
            priceType: "BUY",
            value: 490
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629085",
          transactionName: "Received Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "11:08:28",
          transactionType: "Received"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 200,
            formattedValue: "₹200.00",
            formattedValueNoDecimal: "₹200",
            priceType: "BUY",
            value: 200
          },
          cardNumber: "3000162052706089",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 290,
            formattedValue: "₹290.00",
            formattedValueNoDecimal: "₹290",
            priceType: "BUY",
            value: 290
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629084",
          transactionName: "Received Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "11:07:37",
          transactionType: "Received"
        }
      ]
    },
    {
      date: "05-2019",
      items: [
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 15,
            formattedValue: "₹15.00",
            formattedValueNoDecimal: "₹15",
            priceType: "BUY",
            value: 15
          },
          cardNumber: "3000162053600148",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 750,
            formattedValue: "₹750.00",
            formattedValueNoDecimal: "₹750",
            priceType: "BUY",
            value: 750
          },
          expiryDate: "2019-05-29T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629117",
          transactionName: "Received Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "20:03:16",
          transactionType: "Received"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 15,
            formattedValue: "₹15.00",
            formattedValueNoDecimal: "₹15",
            priceType: "BUY",
            value: 15
          },
          cardNumber: "3000162059965529",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 735,
            formattedValue: "₹735.00",
            formattedValueNoDecimal: "₹735",
            priceType: "BUY",
            value: 735
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629102",
          transactionName: "Received Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "15:34:12",
          transactionType: "Received"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 15,
            formattedValue: "₹15.00",
            formattedValueNoDecimal: "₹15",
            priceType: "BUY",
            value: 15
          },
          cardNumber: "3000162053016152",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 720,
            formattedValue: "₹720.00",
            formattedValueNoDecimal: "₹720",
            priceType: "BUY",
            value: 720
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629098",
          transactionName: "Received Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "15:10:29",
          transactionType: "Received"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 15,
            formattedValue: "₹15.00",
            formattedValueNoDecimal: "₹15",
            priceType: "BUY",
            value: 15
          },
          cardNumber: "3000162053148976",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 705,
            formattedValue: "₹705.00",
            formattedValueNoDecimal: "₹705",
            priceType: "BUY",
            value: 705
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629094",
          transactionName: "Expired Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "14:10:10",
          transactionType: "Expired"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 200,
            formattedValue: "₹200.00",
            formattedValueNoDecimal: "₹200",
            priceType: "BUY",
            value: 200
          },
          cardNumber: "3000162086107343",
          cardProgramGroup: "TUL CLP CS Goodwill eGift Cards",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 690,
            formattedValue: "₹690.00",
            formattedValueNoDecimal: "₹690",
            priceType: "BUY",
            value: 690
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629086",
          transactionName: "Paid Goodwill Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "11:08:50",
          transactionType: "Paid"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 200,
            formattedValue: "₹200.00",
            formattedValueNoDecimal: "₹200",
            priceType: "BUY",
            value: 200
          },
          cardNumber: "3000162072921333",
          cardProgramGroup: "TUL CLP CS Consumer Research eGift Cards",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 490,
            formattedValue: "₹490.00",
            formattedValueNoDecimal: "₹490",
            priceType: "BUY",
            value: 490
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629085",
          transactionName: "Expired Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "11:08:28",
          transactionType: "Expired"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 200,
            formattedValue: "₹200.00",
            formattedValueNoDecimal: "₹200",
            priceType: "BUY",
            value: 200
          },
          cardNumber: "3000162052706089",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 290,
            formattedValue: "₹290.00",
            formattedValueNoDecimal: "₹290",
            priceType: "BUY",
            value: 290
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629084",
          transactionName: "Expired Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "11:07:37",
          transactionType: "Expired"
        }
      ]
    },
    {
      date: "06-2019",
      items: [
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 15,
            formattedValue: "₹15.00",
            formattedValueNoDecimal: "₹15",
            priceType: "BUY",
            value: 15
          },
          cardNumber: "3000162053600148",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 750,
            formattedValue: "₹750.00",
            formattedValueNoDecimal: "₹750",
            priceType: "BUY",
            value: 750
          },
          expiryDate: "2019-05-29T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629117",
          transactionName: "Paid Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "20:03:16",
          transactionType: "Paid"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 15,
            formattedValue: "₹15.00",
            formattedValueNoDecimal: "₹15",
            priceType: "BUY",
            value: 15
          },
          cardNumber: "3000162059965529",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 735,
            formattedValue: "₹735.00",
            formattedValueNoDecimal: "₹735",
            priceType: "BUY",
            value: 735
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629102",
          transactionName: "Received Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "15:34:12",
          transactionType: "Received"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 15,
            formattedValue: "₹15.00",
            formattedValueNoDecimal: "₹15",
            priceType: "BUY",
            value: 15
          },
          cardNumber: "3000162053016152",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 720,
            formattedValue: "₹720.00",
            formattedValueNoDecimal: "₹720",
            priceType: "BUY",
            value: 720
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629098",
          transactionName: "Received Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "15:10:29",
          transactionType: "Received"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 15,
            formattedValue: "₹15.00",
            formattedValueNoDecimal: "₹15",
            priceType: "BUY",
            value: 15
          },
          cardNumber: "3000162053148976",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 705,
            formattedValue: "₹705.00",
            formattedValueNoDecimal: "₹705",
            priceType: "BUY",
            value: 705
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629094",
          transactionName: "Received Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "14:10:10",
          transactionType: "Received"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 200,
            formattedValue: "₹200.00",
            formattedValueNoDecimal: "₹200",
            priceType: "BUY",
            value: 200
          },
          cardNumber: "3000162086107343",
          cardProgramGroup: "TUL CLP CS Goodwill eGift Cards",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 690,
            formattedValue: "₹690.00",
            formattedValueNoDecimal: "₹690",
            priceType: "BUY",
            value: 690
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629086",
          transactionName: "Received Goodwill Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "11:08:50",
          transactionType: "Received"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 200,
            formattedValue: "₹200.00",
            formattedValueNoDecimal: "₹200",
            priceType: "BUY",
            value: 200
          },
          cardNumber: "3000162072921333",
          cardProgramGroup: "TUL CLP CS Consumer Research eGift Cards",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 490,
            formattedValue: "₹490.00",
            formattedValueNoDecimal: "₹490",
            priceType: "BUY",
            value: 490
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629085",
          transactionName: "Received Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "11:08:28",
          transactionType: "Received"
        },
        {
          amount: {
            currencyIso: "INR",
            doubleValue: 200,
            formattedValue: "₹200.00",
            formattedValueNoDecimal: "₹200",
            priceType: "BUY",
            value: 200
          },
          cardNumber: "3000162052706089",
          cardProgramGroup: "TUL Wallet-PROMOTION",
          closingBalance: {
            currencyIso: "INR",
            doubleValue: 290,
            formattedValue: "₹290.00",
            formattedValueNoDecimal: "₹290",
            priceType: "BUY",
            value: 290
          },
          expiryDate: "2019-05-30T00:00:00",
          orderNo: "",
          transactionDate: "2019-05-28",
          transactionId: "826629084",
          transactionName: "Received Promotional Credit",
          transactionStatus: "SUCCESS",
          transactionTime: "11:07:37",
          transactionType: "Received"
        }
      ]
    }
  ]
};
