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
    transactionDetails: state.profile.transactionDetails,
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
