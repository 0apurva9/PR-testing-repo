import React from "react";
import { Redirect } from "react-router-dom";
import OrderCard from "./OrderCard";
import SelectReturnDate from "./SelectReturnDate";
import ReturnsFrame from "./ReturnsFrame";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import styles from "./ReplaceRefundSelection.css";
import BankDetailsV2 from "../../account/components/BankDetailsV2";
import {
  QUICK_DROP,
  SCHEDULED_PICKUP,
  SELF_COURIER,
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_REASON,
  RETURNS_MODES,
  RETURNS_STORE_BANK_FORM
} from "../../lib/constants";

export default class ReplaceRefundSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRefundOptions: false,
      selectedOption: "",
      agreeToReturn: false,
      showBankDetails: false,
      customerBankDetails: "",
      addBankDetailsPage: false
    };
    this.radioChange = this.radioChange.bind(this);
    this.agreeToReturnDetails = this.agreeToReturnDetails.bind(this);
  }

  componentDidMount() {
    let orderId = this.props.selectedReasonAndCommentObj.sellerorderno;
    let transactionId = this.props.selectedReasonAndCommentObj.transactionId;
    let returnReasonCode = this.props.selectedReasonAndCommentObj
      .returnReasonCode;
    let returnSubReasonCode = this.props.selectedReasonAndCommentObj
      .subReasonCode;
    let comments = this.props.selectedReasonAndCommentObj.comment;
    let uploadedImageURLs = this.props.selectedReasonAndCommentObj
      .validImgFiles;
    let reverseSealAvailability = this.props.selectedReasonAndCommentObj
      .reverseSeal;
    this.props.getRefundOptionsData(
      orderId,
      transactionId,
      returnReasonCode,
      returnSubReasonCode,
      comments,
      uploadedImageURLs,
      reverseSealAvailability
    );
  }

  async radioChange(e) {
    this.setState({ selectedOption: e.currentTarget.value });
    //cliq cash
    if (e.currentTarget.value === "CLIQ_CASH") {
      const test = await this.props.getCliqCashDetails();
      console.log(test);
    }
    //bank account
    if (e.currentTarget.value === "BANK_ACCOUNT") {
      let getCustomerBankDetailsResponse = await this.props.getCustomerBankDetails();
      if (
        getCustomerBankDetailsResponse &&
        getCustomerBankDetailsResponse.error === "Failure"
      ) {
        //add details
        this.setState({ showBankDetails: false });
      } else {
        //show details
        this.setState({
          showBankDetails: true,
          customerBankDetails: getCustomerBankDetailsResponse
        });
      }
    }
  }

  addBankDetails(data) {
    // console.log("bankDetails:", this.props.getRefundOptionsDetails);
    this.setState({ addBankDetailsPage: true });
    this.props.history.push({
      pathname: `${RETURNS_PREFIX}/${
        this.props.selectedReasonAndCommentObj.sellerorderno
      }${RETURN_LANDING}${RETURNS_STORE_BANK_FORM}`,
      state: {
        authorizedRequest: true,
        bankData: this.props.selectedReasonAndCommentObj,
        orderId: this.props.selectedReasonAndCommentObj.sellerorderno
      }
    });
  }

  navigateToReturnLanding() {
    return (
      <Redirect
        to={`${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_LANDING}${RETURNS_REASON}`}
      />
    );
  }
  showRefund() {
    if (!this.state.showRefundOptions) {
      //get details
      let orderId = this.props.selectedReasonAndCommentObj.sellerorderno;
      let transactionId = this.props.selectedReasonAndCommentObj.transactionId;
      let returnId = this.props.getRefundOptionsDetails.returnId;
      let typeOfReturn = this.props.getRefundOptionsDetails.typeOfReturn[0]
        .typeOfReturnCode;
      this.props.getRefundModes(orderId, transactionId, returnId, typeOfReturn);
      //show hide
      this.setState({ showRefundOptions: true });
    } else {
      this.setState({ showRefundOptions: false });
    }
  }

  agreeToReturnDetails(e) {
    if (e.target.checked) {
      this.setState({ agreeToReturn: true });
    } else {
      this.setState({ agreeToReturn: false });
    }
  }

  async onSubmit() {
    // console.log(
    //   "selected One:",
    //   this.state.selectedOption,
    //   this.state.agreeToReturn
    // );
    if (!this.state.selectedOption) {
      return this.props.displayToast("Please select refund mode");
    }
    if (!this.state.agreeToReturn) {
      return this.props.displayToast("Please check the agreement to proceed");
    }
    //back to source
    if (this.state.selectedOption === "BACK_TO_SOURCE") {
      this.goToRefundModesPage();
    }
    //cliq cash
    // if (this.state.selectedOption === "CLIQ_CASH") {
    //   const test = await this.props.getCliqCashDetails();
    //   console.log(test);
    // }
    //bank account
    if (this.state.selectedOption === "BANK_ACCOUNT") {
      this.goToRefundModesPage();
    }
  }

  async goToRefundModesPage() {
    if (this.state.selectedOption && this.state.agreeToReturn) {
      let orderId = this.props.selectedReasonAndCommentObj.sellerorderno;
      let transactionId = this.props.selectedReasonAndCommentObj.transactionId;
      let returnId = this.props.getRefundOptionsDetails.returnId;
      let refundMode = this.state.selectedOption;
      const updateRefundModeResponse = await this.props.updateRefundMode(
        orderId,
        transactionId,
        returnId,
        refundMode
      );
      //console.log(updateRefundModeResponse);
      //move to next screen on success
      if (
        updateRefundModeResponse &&
        updateRefundModeResponse.status === "success"
      ) {
        this.props.history.push({
          pathname: `${RETURNS_PREFIX}/${
            this.orderCode
          }${RETURN_LANDING}${RETURNS_MODES}`,
          state: {
            authorizedRequest: true
          }
        });
      }
    }
  }

  render() {
    //console.log("propsin RefundReplaceSelection:", this.props);
    // Preventing user to open this page direct by hitting URL
    if (
      !this.props.location.state ||
      !this.props.location.state.authorizedRequest
    ) {
      return this.navigateToReturnLanding();
    }

    let userBankDetails = "";
    if (this.state.customerBankDetails) {
      userBankDetails = this.state.customerBankDetails.getCustomerBankDetails;
    }
    const data = this.props.getRefundOptionsDetails;
    const refundModesDetail = this.props.getRefundModesDetails;
    return (
      <ReturnsFrame>
        {/* <div className={styles.content}>
					<div className={styles.card}>
						<OrderCard
							imageUrl={data && data.products[0].imageURL}
							imageHolderWidth="50px"
							productName={data && data.products[0].productName}
							returnReason={this.props.selectedReasonAndCommentObj.reason}
							returnSubReason={this.props.selectedReasonAndCommentObj.subReason}
							returnComments={this.props.selectedReasonAndCommentObj.comment}
						>
							{data && (
								<span className={styles.productSizeColor}>{data.products[0].productSize} |&nbsp;</span>
							)}
							{data && <span className={styles.productSizeColor}>{data.products[0].productColour}</span>}
						</OrderCard>
					</div>
				</div> */}
        {/* <div className={styles.content}>
					<div className={styles.card}>
						<div className={styles.customerCareCall}>
							<span className={styles.infoIcon} />
							<span className={styles.infoText}>{data && data.mediationCallout}</span>
						</div>
					</div>
				</div> */}
        <div className={styles.content}>
          {!this.state.showRefundOptions &&
            !this.state.addBankDetailsPage && (
              <React.Fragment>
                <div className={styles.returnMode}>Select mode of return</div>
                <div className={styles.card}>
                  <div
                    className={styles.replaceRefundHeading}
                    onClick={() => this.showRefund()}
                  >
                    {data && data.typeOfReturn[0].typeOfReturn}
                    {!this.state.showRefundOptions && (
                      <span className={styles.rightArrow} />
                    )}
                  </div>
                  {!this.state.showRefundOptions && (
                    <div className={styles.replaceRefundText}>
                      {data && data.typeOfReturn[0].callout}
                    </div>
                  )}
                </div>
              </React.Fragment>
            )}
          {this.state.showRefundOptions &&
            !this.state.addBankDetailsPage && (
              <React.Fragment>
                <div className={styles.bankDetailsSection}>
                  <div className={styles.replaceRefundModeSelctnHeading}>
                    {data && data.typeOfReturn[0].typeOfReturn}
                  </div>
                  <div className={styles.refundModeContainer}>
                    <div className={styles.chooseMode}>
                      Choose mode of refund
                    </div>
                    <div className={styles.modeContent}>
                      <form>
                        {refundModesDetail &&
                          refundModesDetail.refundMode.map((value, index) => {
                            return (
                              <label>
                                <input
                                  className={styles.radioBtn}
                                  type="radio"
                                  value={value.refundModeCode}
                                  checked={
                                    this.state.selectedOption ===
                                    value.refundModeCode
                                  }
                                  onChange={this.radioChange}
                                />
                                {value.refundMode}
                                <span className={styles.cliqCashInstant}>
                                  {value.refundModeCode === "CLIQ_CASH"
                                    ? "Instant"
                                    : null}
                                </span>
                                <span className={styles.radioBtnSubText}>
                                  {value.callout}
                                </span>
                              </label>
                            );
                          })}
                      </form>
                      {this.state.showBankDetails &&
                        this.state.selectedOption === "BANK_ACCOUNT" &&
                        userBankDetails && (
                          <React.Fragment>
                            <div className={styles.bankDetailsHeading}>
                              Your Account Details:
                            </div>
                            <div
                              className={styles.changeBankDetails}
                              onClick={() =>
                                this.addBankDetails(userBankDetails)
                              }
                            >
                              Change
                            </div>
                            <div className={styles.bankDetailsText}>Name:</div>
                            <div className={styles.bankDetailsText}>
                              {userBankDetails.accountHolderName}
                            </div>
                            <div className={styles.bankDetailsText}>Bank:</div>
                            <div className={styles.bankDetailsText}>
                              {userBankDetails.bankName}
                            </div>
                            <div className={styles.bankDetailsText}>
                              IFSC code:
                            </div>
                            <div className={styles.bankDetailsText}>
                              {userBankDetails.IFSCCode}
                            </div>
                            <div className={styles.bankDetailsText}>
                              Account number:
                            </div>
                            <div className={styles.bankDetailsText}>
                              {userBankDetails.accountNumber}
                            </div>
                          </React.Fragment>
                        )}
                    </div>
                  </div>
                  {!this.state.showBankDetails &&
                    this.state.selectedOption === "BANK_ACCOUNT" && (
                      <div
                        className={styles.addBankDetailsButton}
                        onClick={() => this.addBankDetails()}
                      >
                        ADD BANK DETAILS
                      </div>
                    )}
                </div>
              </React.Fragment>
            )}
        </div>
        {this.state.addBankDetailsPage ? (
          // <ReturnsFrame onContinue={this.props.onContinue}>
          <BankDetailsV2
            onChange={this.props.onChangeBankingDetail}
            clearForm={this.props.clearForm}
            history={this.props.history}
            updateStateForBankDetails={this.props.updateStateForBankDetails}
            bankDetail={this.props.bankDetail}
          />
        ) : (
          // </ReturnsFrame>
          ""
        )}
        {/* {this.state.showRefundOptions && <div className={styles.payments} />} */}
        <div className={styles.content}>
          {this.state.showRefundOptions &&
            !this.state.addBankDetailsPage && (
              <React.Fragment>
                <div className={styles.cardCondition}>
                  <div className={styles.checkRefundTermsContainer}>
                    <input
                      className={styles.checkRefundTerms}
                      type="checkbox"
                      onChange={this.agreeToReturnDetails}
                    />
                  </div>
                  <div className={styles.checkRefundTermsText}>
                    {refundModesDetail && refundModesDetail.disclaimer}
                  </div>
                </div>
                {/* {this.state.selectedOption &&
								this.state.agreeToReturn && ( */}

                {/* )} */}
              </React.Fragment>
            )}
        </div>
        {this.state.showRefundOptions && (
          <div className={styles.buttonHolder}>
            <div className={styles.button}>
              <Button
                width={175}
                type="primary"
                label="Continue"
                //disabled={this.state.selectedOption && this.state.agreeToReturn ? false : true}
                onClick={() => this.onSubmit()}
              />
            </div>
          </div>
        )}
      </ReturnsFrame>
    );
  }
}
ReplaceRefundSelection.propTypes = {
  selectedMode: PropTypes.oneOf([QUICK_DROP, SCHEDULED_PICKUP, SELF_COURIER]),
  selectMode: PropTypes.func
};
