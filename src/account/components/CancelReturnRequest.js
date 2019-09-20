import React from "react";
import OrderCard from "./OrderCard";
import ProfileMenu from "../../account/components/ProfileMenu.js";
import UserProfile from "../../account/components/UserProfile.js";
import styles from "./CancelReasonForm.css";
import CancelReturnReasonForm from "./CancelReturnReasonForm";
import PropTypes from "prop-types";
import Loader from "../../general/components/Loader";
import * as Cookie from "../../lib/Cookie";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  GLOBAL_ACCESS_TOKEN,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CART_DETAILS_FOR_ANONYMOUS,
  ANONYMOUS_USER,
  LOGIN_PATH,
  SAVED_LIST,
  PRODUCT_CANCEL
} from "../../lib/constants";
import format from "date-fns/format";
const dateFormat = "DD MMM YYYY";

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

    const { pathname } = this.props.location;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    const userData = JSON.parse(userDetails);
    const userAccountDetails = JSON.parse(userDetails);
    const returnProductDetails = this.props.returnProductDetails;
    const orderDetails = this.props.orderDetails;
    let returnFlow = this.props.returnFlow;
    // let returnAddress =
    // 	this.props.returnRequest && this.props.returnRequest.deliveryAddressesList
    // 		? this.props.returnRequest.deliveryAddressesList
    // 		: this.props.userAddress.addresses;

    return (
      <div>
        {/* <React.Fragment>
					<div className={styles.base}>
						<div className={styles.holder}> */}
        {/* {disableHeader && ( */}
        {/* <div className={styles.profileMenu}>
								<ProfileMenu {...this.props} />
							</div> */}
        {/* <div className={styles.returnReasonDetail}>
					<div className={styles.returnReasonDetailHolder}> */}
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
        {/* </div>
				</div> */}
        {/* <div className={styles.userProfile}>
								<UserProfile
									image={userAccountDetails.imageUrl}
									userLogin={userAccountDetails.userName}
									loginType={userAccountDetails.loginType}
									firstName={
										userAccountDetails &&
										userAccountDetails.firstName &&
										userAccountDetails.firstName.trim().charAt(0)
									}
									heading={
										userAccountDetails &&
										userAccountDetails.firstName &&
										`${userAccountDetails.firstName} `
									}
									lastName={
										userAccountDetails &&
										userAccountDetails.lastName &&
										`${userAccountDetails.lastName}`
									}
									userAddress={this.props.userAddress}
								/>
							</div> */}
        {/* </div>
					</div>
				</React.Fragment> */}
      </div>
    );
  }
}
CancelReturnRequest.propTypes = {
  cancelProduct: PropTypes.func,
  cancelReturn: PropTypes.func,
  cancelProductDetails: PropTypes.object
};
