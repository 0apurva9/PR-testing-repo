import React from "react";
import { RouterPropTypes } from "../../general/router-prop-types";
import styles from "./CancelReasonForm.css";
import CancelReturnReasonForm from "./CancelReturnReasonForm";
import PropTypes from "prop-types";
import Loader from "../../general/components/Loader";
import * as Cookie from "../../lib/Cookie";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
} from "../../lib/constants";

const SELECT_REASON_MESSAGE = "Select the Reason";
export default class CancelReturnRequest extends React.Component {
  componentDidMount() {
    let orderCode = this.props.match.params[0];
    let transactionId = this.props.match.params[1];
    this.props.getReturnReasons(orderCode, transactionId);
  }

  finalSubmit(reason) {
    if (reason.cancelReasonCode) {
      this.cancelReturn(reason);
    } else {
      this.props.displayToast(SELECT_REASON_MESSAGE);
    }
  }

  cancelReturn = reason => {
    const data = {};
    data.returnCancelReasonCode = reason.cancelReasonCode;
    if (reason.comment) {
      data.returnCancelComments = reason.comment;
    }
    data.orderId = this.props.match.params[0];
    data.transactionId = this.props.match.params[1];
    if (this.props.showCancelReturnRequestModal) {
      this.props.showCancelReturnRequestModal(data);
    }
  };

  onClickImage(productCode) {
    if (productCode) {
      this.props.history.push(`/p-${productCode.toLowerCase()}`);
    }
  }

  renderLoader() {
    return <Loader />;
  }

  render() {
    let getReturnReasonsDetails = this.props.getReturnReasonsDetails;

    if (this.props.error) {
      this.props.history.goBack();
    }
    if (this.props.loadingForGetReturnReasons) {
      return this.renderLoader();
    }

    // const { pathname } = this.props.location;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    // const userData = JSON.parse(userDetails);
    // const userAccountDetails = JSON.parse(userDetails);
    // const returnProductDetails = this.props.returnProductDetails;
    // const orderDetails = this.props.orderDetails;
    // let returnFlow = this.props.returnFlow;
    // let returnAddress =
    // 	this.props.returnRequest && this.props.returnRequest.deliveryAddressesList
    // 		? this.props.returnRequest.deliveryAddressesList
    // 		: this.props.userAddress.addresses;

    return (
      <div>
        <div className={styles.base}>
          {getReturnReasonsDetails && (
            <CancelReturnReasonForm
              {...this.props}
              returnReasons={getReturnReasonsDetails}
              onContinue={reason => this.finalSubmit(reason)}
              onClickImage={productCode => this.onClickImage(productCode)}
            />
          )}
        </div>
      </div>
    );
  }
}
CancelReturnRequest.propTypes = {
  cancelProduct: PropTypes.func,
  cancelReturn: PropTypes.func,
  cancelProductDetails: PropTypes.object,
  displayToast: PropTypes.func,
  getReturnReasons: PropTypes.func,
  getReturnReasonsDetails: PropTypes.func,
  showCancelReturnRequestModal: PropTypes.func,
  loadingForGetReturnReasons: PropTypes.bool,
  error: PropTypes.string,
  ...RouterPropTypes
};
