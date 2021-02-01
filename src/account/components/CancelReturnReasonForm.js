import React from "react";
import { RouterPropTypes } from "../../general/router-prop-types";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import * as Cookie from "../../lib/Cookie";
import TextArea from "../../general/components/TextArea";
import CancelAndContinueButton from "./CancelAndContinueButton";
import styles from "./CancelReasonForm.css";
import PropTypes from "prop-types";
import Loader from "../../general/components/Loader";
import {
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN
} from "../../lib/constants";
import ReturnAndOrderCancelWrapper from "../../return/components/ReturnAndOrderCancelWrapper";
export default class CancelReturnReasonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySecondary: false,
      secondaryReasons: null,
      comment: null,
      reason: "Select a reason",
      placeholder: "Add comments (optional)"
    };
  }

  onClickImage(productCode) {
    if (this.props.onClickImage) {
      this.props.onClickImage(productCode);
    }
  }

  handleContinue() {
    if (this.props.onContinue) {
      this.props.onContinue(this.state);
    }
  }

  handleCancel() {
    this.props.history.goBack();
  }

  onChangePrimary(val) {
    const code = val.value;
    const label = val.label;

    this.setState({ cancelReasonCode: code, reason: label });
  }

  handleChange(val) {
    this.setState({ comment: val });
  }

  renderCancel() {
    const data = this.props.returnReasons;
    return (
      <div className={styles.base}>
        <div className={styles.selectReasonHolder}>
          <div className={styles.header}>Please select cancel reason</div>
          <div className={styles.select}>
            <SelectBoxMobile2
              placeholder={"Select a reason"}
              options={
                data.returnReasonMap &&
                data.returnReasonMap.map((val) => {
                  return {
                    value: val.parentReasonCode,
                    label: val.parentReturnReason
                  };
                })
              }
              onChange={val => this.onChangePrimary(val)}
            />
          </div>

          <div className={styles.textArea}>
            <TextArea
              onChange={val => this.handleChange(val)}
              value={this.state.comment}
              placeholder={this.state.placeholder}
            />
          </div>
          <div className={styles.CancelAndContinueButton}>
            <CancelAndContinueButton
              handleCancel={() => this.handleCancel()}
              handleContinue={() => this.handleContinue()}
              disabled={this.state.cancelReasonCode ? false : true}
            />
          </div>
        </div>
      </div>
    );
  }

  renderLoader() {
    return <Loader />;
  }

  render() {
    const data = this.props.returnReasons;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (this.props.error) {
      this.props.history.goBack();
    }
    if (this.props.loadingForCancelProductDetails) {
      return this.renderLoader();
    }
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    let returnFlow = false;
    return (
      <ReturnAndOrderCancelWrapper
        userAddress={this.props.userAddress}
        returnProductDetails={data}
        userDetails={userDetails}
        history={this.props.history}
        orderDetails={""}
        returnFlow={returnFlow}
      >
        {this.renderCancel()}
      </ReturnAndOrderCancelWrapper>
    );
  }
}
CancelReturnReasonForm.propTypes = {
  onContinue: PropTypes.func,
  onCancel: PropTypes.func,
  cancelProductDetails: PropTypes.object,
  onClickImage: PropTypes.array,
  error: PropTypes.string,
  loadingForCancelProductDetails: PropTypes.bool,
  userAddress: PropTypes.object,
  returnReasons: PropTypes.shape({
    returnReasonMap: PropTypes.array
  }),
  ...RouterPropTypes
};
