import React from "react";
import OrderCard from "./OrderCard";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import TextArea from "../../general/components/TextArea";
import CancelAndContinueButton from "./CancelAndContinueButton";
import styles from "./ReturnReasonForm.css";
import stylesCommon from "./ReturnReasonAndModes.css";
import ReverseSealYesNo from "./ReverseSealYesNo.js";
import DeskTopOnly from "../../general/components/DesktopOnly.js";
import DummyTab from "../../cart/components/DummyTab.js";
import { COMMENTS_PLACEHOLDER } from "../../lib/constants";
import ProfileMenu from "../../account/components/ProfileMenu.js";
import UserProfile from "../../account/components/UserProfile.js";
import format from "date-fns/format";
import * as Cookie from "../../lib/Cookie";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  PRODUCT_CANCEL
} from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_RETURN_REASON_BUTTON_CLICKED
} from "../../lib/adobeUtils";
const MODE_OF_RETURN = "Select mode of return";
const REFUND_DETAILS = "Refund Details";
const dateFormat = "DD MMM YYYY";
export default class ReturnReasonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySecondary: false,
      secondaryReasons: null,
      comment: null,
      reverseSeal: null,
      returnReasonCode: null,
      subReasonCode: null,
      subReason: null,
      isEnable: false,
      uploadedImageFiles: "",
      validImgFiles: "",
      showImageUpload: false
    };
  }
  handleContinue() {
    if (this.props.onContinue) {
      let reasonAndCommentObj = Object.assign(
        {},
        {
          returnReasonCode: this.state.returnReasonCode,
          subReasonCode: this.state.subReasonCode,
          subReason: this.state.subReason,
          comment: this.state.comment,
          reason: this.state.reason,
          reverseSeal: this.state.reverseSeal,
          sellerorderno: this.props.returnProductDetails.orderProductWsDTO[0]
            .sellerorderno,
          transactionId: this.props.returnProductDetails.orderProductWsDTO[0]
            .transactionId,
          showImageUpload:
            localStorage.getItem("showImageUpload") ||
            this.state.showImageUpload,
          validImgFiles: this.state.validImgFiles
        }
      );
      setDataLayer(ADOBE_RETURN_REASON_BUTTON_CLICKED);
      this.props.onContinue(reasonAndCommentObj);
    }
    // if (this.state.comment) {
    //   localStorage.setItem("comment", this.state.comment);
    // }
  }
  onChangePrimary(val) {
    const code = val.value;
    const label = val.label;
    const data = this.props.returnProductDetails;
    this.setState({
      subReasonCode: null,
      subReason: null,
      returnReasonCode: code,
      reason: label,
      isEnable: false,
      secondaryReasons: data.returnReasonMap
        .filter(val => {
          return val.parentReasonCode === code;
        })
        .map(val => {
          if (val.subReasons) {
            return val.subReasons.map(value => {
              return {
                value: value.subReasonCode,
                label: value.subReturnReason,
                isImageApplicable: value.isImageApplicable
              };
            });
          }
        })[0]
    });
    //getting value from html converts its to string so checking in below way,
    //not using === as it is not working
    if (val.isImageApplicable === "true") {
      this.setState({ showImageUpload: true });
    } else {
      this.setState({ showImageUpload: false });
    }
    localStorage.setItem("showImageUpload", val.isImageApplicable);
    // localStorage.setItem("primaryLabel", label);
    // localStorage.setItem("primaryCode", code);
    // localStorage.removeItem("secondaryLabel");
    // localStorage.removeItem("secondaryCode");
  }
  handleChange(val) {
    this.setState({ comment: val });
    //  localStorage.setItem("comment", val);
  }
  selectReverseSeal(val) {
    this.setState({ reverseSeal: val });
  }
  onChangeSecondary(val) {
    const code = val.value;
    const label = val.label;
    this.setState({ subReasonCode: code, subReason: label, isEnable: true });
    // localStorage.setItem("secondaryLabel", label);
    // localStorage.setItem("secondaryCode", code);
    localStorage.setItem("showImageUpload", val.isImageApplicable);
    //getting value from html converts its to string so checking in below way,
    //not using === as it is not working
    if (val.isImageApplicable === "true") {
      this.setState({ showImageUpload: true });
    } else {
      this.setState({ showImageUpload: false });
    }
  }
  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    let disabledContinueButton = true;
    if (this.state.reason) {
      let secondaryReasons = this.state.secondaryReasons;
      if (secondaryReasons && secondaryReasons != undefined) {
        if (this.state.subReason) {
          disabledContinueButton = false;
        } else {
          disabledContinueButton = true;
        }
      } else {
        disabledContinueButton = false;
      }
    } else {
      disabledContinueButton = true;
    }

    //let disabledContinue = this.state.reason ? this.state.secondaryReasons & this.state.subReason ? false: true;
    //const userData = JSON.parse(userDetails);
    const userAccountDetails = JSON.parse(userDetails);
    const orderDetails = this.props.orderDetails;
    let returnFlow = this.props.returnFlow;
    const returnProductDetails = this.props.returnProductDetails;
    const data = this.props.returnProductDetails;
    //let imageCallOut = data && data.attachmentImageCallout;
    //let imageCallOutArr = imageCallOut && imageCallOut.split("|");

    // let primaryLabel = localStorage.getItem("primaryLabel");
    // let secondaryLabel = localStorage.getItem("secondaryLabel");
    // let c = null;
    // let d = null;

    // if (primaryLabel != null) {
    //   c = primaryLabel;
    // } else {
    //   c = this.props.returnFlow ? "Select issue" : "Select a reason";
    // }
    // if (secondaryLabel != null) {
    //   d = secondaryLabel;
    // } else {
    //   d = "Select a reason";
    // }
    return (
      <React.Fragment>
        <div className={stylesCommon.base}>
          <div className={stylesCommon.holder}>
            <div className={stylesCommon.profileMenu}>
              <ProfileMenu {...this.props} />
            </div>

            <div className={stylesCommon.returnReasonDetail}>
              <div className={stylesCommon.returnReasonDetailHolder}>
                <React.Fragment>
                  <div>
                    <div className={stylesCommon.orderCardWrapper}>
                      <OrderCard
                        imageUrl={
                          returnProductDetails &&
                          returnProductDetails.orderProductWsDTO &&
                          returnProductDetails.orderProductWsDTO[0] &&
                          returnProductDetails.orderProductWsDTO[0].imageURL
                        }
                        productName={`${returnProductDetails &&
                          returnProductDetails.orderProductWsDTO &&
                          returnProductDetails.orderProductWsDTO[0] &&
                          returnProductDetails.orderProductWsDTO[0]
                            .productBrand} ${returnProductDetails &&
                          returnProductDetails.orderProductWsDTO &&
                          returnProductDetails.orderProductWsDTO[0] &&
                          returnProductDetails.orderProductWsDTO[0]
                            .productName}`}
                        price={
                          returnProductDetails &&
                          returnProductDetails.orderProductWsDTO &&
                          returnProductDetails.orderProductWsDTO[0] &&
                          returnProductDetails.orderProductWsDTO[0].price
                        }
                        isSelect={false}
                        quantity={true}
                        orderPlace={
                          orderDetails && orderDetails.orderDate
                            ? orderDetails &&
                              format(orderDetails.orderDate, dateFormat)
                            : this.props.orderPlace
                        }
                        orderId={this.props.orderId}
                        productSize={
                          this.props.orderDetails &&
                          this.props.orderDetails.products[0].productSize
                        }
                        productColourName={
                          this.props.orderDetails &&
                          this.props.orderDetails.products[0].productColourName
                        }
                        productBrand={
                          orderDetails && orderDetails.productBrand
                            ? orderDetails.productBrand
                            : returnProductDetails &&
                              returnProductDetails.orderProductWsDTO &&
                              returnProductDetails.orderProductWsDTO[0] &&
                              returnProductDetails.orderProductWsDTO[0]
                                .productBrand
                        }
                        onHollow={true}
                        returnFlow={returnFlow}
                        title={PRODUCT_CANCEL}
                        onClick={() =>
                          this.onClickImage(
                            orderDetails &&
                              orderDetails.orderProductWsDTO &&
                              orderDetails.orderProductWsDTO[0] &&
                              orderDetails.orderProductWsDTO[0].productcode
                          )
                        }
                        exchangeDetails={
                          returnProductDetails &&
                          returnProductDetails.orderProductWsDTO &&
                          returnProductDetails.orderProductWsDTO[0] &&
                          returnProductDetails.orderProductWsDTO[0]
                            .exchangeDetails
                        }
                        bundledAssociatedItems={
                          this.props.returnRequest &&
                          this.props.returnRequest.bundledAssociatedItems
                        }
                      >
                        {returnProductDetails &&
                          returnProductDetails.orderProductWsDTO &&
                          returnProductDetails.orderProductWsDTO[0] &&
                          returnProductDetails.orderProductWsDTO[0]
                            .quantity && (
                            <div className={styles.quantity}>
                              Qty{" "}
                              {
                                returnProductDetails.orderProductWsDTO[0]
                                  .quantity
                              }
                            </div>
                          )}
                      </OrderCard>
                    </div>
                  </div>
                </React.Fragment>

                <div className={styles.base}>
                  <div className={styles.content}>
                    <div className={styles.selectReasonWithText}>
                      {this.props.returnFlow === false ? (
                        <div className={styles.header}>
                          <div className={styles.circleHolder}>
                            <div className={styles.circle}>1</div>
                          </div>
                          Select reason for your return
                        </div>
                      ) : (
                        <div className={styles.header}>
                          Please select return reason
                        </div>
                      )}
                      <div className={styles.select}>
                        <SelectBoxMobile2
                          placeholder={
                            this.props.returnFlow
                              ? "Select issue"
                              : "Select a reason"
                          }
                          options={
                            data &&
                            data.returnReasonMap &&
                            data.returnReasonMap.map((val, i) => {
                              return {
                                value: val.parentReasonCode,
                                label: val.parentReturnReason,
                                isImageApplicable: val.isImageApplicable
                              };
                            })
                          }
                          onChange={val => this.onChangePrimary(val)}
                        />
                      </div>

                      {this.state.secondaryReasons && (
                        <div className={styles.select}>
                          <SelectBoxMobile2
                            placeholder={"Select a reason"}
                            options={this.state.secondaryReasons}
                            onChange={val => this.onChangeSecondary(val)}
                            isEnable={this.state.isEnable}
                          />
                        </div>
                      )}
                      <div className={styles.textArea}>
                        <TextArea
                          value={this.state.comment}
                          onChange={val => this.handleChange(val)}
                          placeholder={COMMENTS_PLACEHOLDER}
                        />
                      </div>
                      <DeskTopOnly>
                        <div className={styles.buttonHolder}>
                          <CancelAndContinueButton
                            handleCancel={() => this.handleCancel()}
                            handleContinue={() => this.handleContinue()}
                            disabled={disabledContinueButton}
                          />
                        </div>
                      </DeskTopOnly>
                    </div>
                  </div>
                  {data && data.showReverseSealFrJwlry === "yes" && (
                    <div className={styles.reverseSealHolder}>
                      <ReverseSealYesNo
                        selectReverseSeal={val => this.selectReverseSeal(val)}
                      />
                    </div>
                  )}

                  {this.props.returnFlow ? (
                    ""
                  ) : (
                    <DummyTab title={MODE_OF_RETURN} number={2} />
                  )}
                  {this.props.returnFlow ? (
                    ""
                  ) : (
                    <DummyTab title={REFUND_DETAILS} number={3} />
                  )}
                </div>
              </div>
            </div>

            <div className={stylesCommon.userProfile}>
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
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
