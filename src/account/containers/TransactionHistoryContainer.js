import { connect } from "react-redux";
import {} from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import TransactionHistoryDesktop from "../components/TransactionHistoryDesktop.js";
import { getTransactionDetails } from "../actions/account.actions";
import { getUserAddress } from "../../cart/actions/cart.actions";

import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
const mapDispatchToProps = dispatch => {
  return {
    getTransactionDetails: (startDate, endDate) => {
      dispatch(getTransactionDetails(startDate, endDate));
    },
    getUserAddress: () => {
      dispatch(getUserAddress());
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    }
  };
};

const mapStateToProps = state => {
  return {
    transactionDetails: transactonDetails,
    transactionDetailsStatus: state.profile.transactionDetailsStatus,
    transactionDetailsError: state.profile.transactionDetailsError,
    loading: state.profile.loading,
    userAddress: state.profile.userAddress
  };
};

const TransactionHistoryContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TransactionHistoryDesktop)
);

export default TransactionHistoryContainer;

const transactonDetails = {
  type: "cliqCashTransactionsDto",
  status: "Success",
  transactions: [
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
          transactionDate: "2019-06-03",
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
          transactionDate: "2019-06-02",
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
          transactionDate: "2019-04-28",
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
          transactionDate: "2019-03-28",
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
          transactionDate: "2019-01-28",
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
          transactionDate: "2018-05-28",
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
          transactionDate: "",
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
