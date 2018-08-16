import TabHolder from "./TabHolder";
import TabData from "./TabData";
import React from "react";
import styles from "./OrderRelatedIssue.css";
import ProductImage from "../../general/components/ProductImage.js";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import TextArea from "../../general/components/TextArea.js";
import FloatingLabelInput from "../../general/components/FloatingLabelInput.js";
import Button from "../../general/components/Button.js";
import ImageUpload from "../../account/components/ImageUpload.js";
import CheckOutHeader from "../../cart/components/CheckOutHeader";
import {
  EMAIL_REGULAR_EXPRESSION,
  MOBILE_PATTERN
} from "../../auth/components/Login";
import { SUCCESS, MY_ACCOUNT_PAGE, CUSTOMER_CARE } from "../../lib/constants";
import format from "date-fns/format";
import * as Cookie from "../../lib/Cookie";
import {
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN,
  LOGIN_PATH
} from "../../lib/constants";
import { Redirect } from "react-router-dom";
const SELECT_ORDER_TEXT = "Please select order ";
const SELECT_ISSUE_FOR_ORDER_TEXT = "Please select issue for order related";
const SELECT_SUB_ISSUE_FOR_ORDER_TEXT =
  "Please select sub issue for order related";
const SELECT_ISSUE_FOR_OTHER_TEXT = "Please select other issue";
const SELECT_SUB_ISSUE_FOR_OTHER_TEXT = "Please select other sub issue";
const NAME_TEXT = "Please enter name";
const MOBILE_TEXT = "Please enter mobile number";
const MOBILE_VALID_TEXT = "Please eneter valid mobile number";
const OFFSET_BOTTOM = 800;
export default class OrderRelatedIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOrder: false,
      isSelected: 0,
      isSelectedOrder: false,
      nameForOrderRelated: "",
      phoneNumberForOrderRelated: "",
      emailForOrderRelated: "",
      commentForOrderRelated: "",
      nameForOtherIssue: "",
      phoneNumberForOtherIssue: "",
      emailForOtherIssue: "",
      commentForOtherIssue: "",
      file: "",
      secondaryReasonsForOrderRelated: null,
      reasonForOrderRelated: null,
      reasonCodeForOrderRelated: null,
      secondaryReasonsCodeForOrderRelated: null,
      isEnableForOrderRelated: false,
      secondaryReasonsForOtherIssue: null,
      reasonForOtherIssue: null,
      reasonCodeForOtherIssue: null,
      secondaryReasonsCodeForOtherIssue: null,
      isEnableForOtherIssue: false,
      orderCode: "",
      transactionId: "",
      sellerOrderNumber: "",
      productImageURL: "",
      orderDate: "",
      productName: "",
      productPrice: "",
      productStatus: ""
    };
  }

  componentDidMount() {
    this.props.getCustomerQueriesData();
    this.props.getOrdersTransactionData(false);
    this.props.setHeaderText(CUSTOMER_CARE);
  }
  componentDidUpdate() {
    this.props.setHeaderText(CUSTOMER_CARE);
  }
  getMoreOrder() {
    if (
      this.props.ordersTransactionData &&
      (this.props.ordersTransactionData.currentPage + 1) *
        this.props.ordersTransactionData.pageSize <
        this.props.ordersTransactionData.totalNoOfOrders
    ) {
      const windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (
        windowBottom >= docHeight - OFFSET_BOTTOM &&
        !this.props.ordersTransactionDataLoading
      ) {
        this.props.getOrdersTransactionData(true);
      }
    }
  }
  tabSelect(val) {
    this.setState({
      isSelected: val,
      nameForOtherIssue: "",
      phoneNumberForOtherIssue: "",
      emailForOtherIssue: "",
      commentForOtherIssue: "",
      secondaryReasonsForOtherIssue: null,
      reasonForOtherIssue: null,
      reasonCodeForOtherIssue: null,
      secondaryReasonsCodeForOtherIssue: null,
      isEnableForOtherIssue: false,
      showOrder: false
    });
    if (this.state.isSelected === 1) {
      this.setState({
        nameForOrderRelated: "",
        phoneNumberForOrderRelated: "",
        emailForOrderRelated: "",
        commentForOrderRelated: "",
        file: "",
        secondaryReasonsForOrderRelated: null,
        reasonForOrderRelated: null,
        reasonCodeForOrderRelated: null,
        secondaryReasonsCodeForOrderRelated: null,
        isEnableForOrderRelated: false,
        showOrder: false,
        isSelectedOrder: false,
        orderCode: "",
        transactionId: "",
        sellerOrderNumber: "",
        productImageURL: "",
        orderDate: "",
        productName: "",
        productPrice: "",
        productStatus: ""
      });
    }
  }
  setProductDetails(
    orderCode,
    transactionId,
    sellerOrderNumber,
    productImageURL,
    orderDate,
    productName,
    productPrice,
    productStatus
  ) {
    this.setState({
      orderCode: orderCode,
      transactionId: transactionId,
      sellerOrderNumber: sellerOrderNumber,
      showOrder: false,
      productImageURL: productImageURL,
      orderDate: orderDate,
      productName: productName,
      productPrice: productPrice,
      productStatus: productStatus
    });
  }
  onChangeReasonForOrderRelated(val) {
    const code = val.value;
    const label = val.label;
    this.setState({
      secondaryReasonsCodeForOrderRelated: null,
      secondaryReasonsForOrderRelated: null,
      reasonCodeForOrderRelated: code,
      reasonForOrderRelated: label,
      isEnableForOrderRelated: false
    });
  }
  onChangeSubReasonForOrderRelated(val) {
    const code = val.value;
    const label = val.label;
    this.setState({
      secondaryReasonsCodeForOrderRelated: code,
      secondaryReasonsForOrderRelated: label,
      isEnableForOrderRelated: true
    });
  }
  onChange(val) {
    this.setState(val);
  }
  async submitOrderRelatedIssue() {
    if (!this.state.orderCode) {
      this.props.displayToast(SELECT_ORDER_TEXT);
      return false;
    }
    if (!this.state.reasonForOrderRelated) {
      this.props.displayToast(SELECT_ISSUE_FOR_ORDER_TEXT);
      return false;
    }
    if (!this.state.secondaryReasonsForOrderRelated) {
      this.props.displayToast(SELECT_SUB_ISSUE_FOR_ORDER_TEXT);
      return false;
    }
    if (!this.state.nameForOrderRelated) {
      this.props.displayToast(NAME_TEXT);
      return false;
    }
    if (!this.state.phoneNumberForOrderRelated) {
      this.props.displayToast(MOBILE_TEXT);
      return false;
    }
    if (
      this.state.phoneNumberForOrderRelated &&
      !MOBILE_PATTERN.test(this.state.phoneNumberForOrderRelated)
    ) {
      this.props.displayToast(MOBILE_VALID_TEXT);
      return false;
    } else {
      let orderRelatedIssue =
        this.props.customerQueriesData &&
        this.props.customerQueriesData.nodes &&
        this.props.customerQueriesData.nodes.find(orderRelated => {
          return orderRelated.nodeDesc === "Order Related Query";
        });
      let orderRelatedSubIssue =
        this.state.reasonForOrderRelated &&
        orderRelatedIssue &&
        orderRelatedIssue.children &&
        orderRelatedIssue.children.find(orderRelatedSubIssue => {
          return (
            orderRelatedSubIssue.nodeDesc === this.state.reasonForOrderRelated
          );
        });
      let getL4 =
        this.state.secondaryReasonsForOrderRelated &&
        orderRelatedSubIssue &&
        orderRelatedSubIssue.children &&
        orderRelatedSubIssue.children.find(orderRelatedSubIssue => {
          return (
            orderRelatedSubIssue.nodeDesc ===
            this.state.secondaryReasonsForOrderRelated
          );
        });
      const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      let submitDetailsObject = Object.assign(
        {},
        {
          nodeL0: orderRelatedIssue.nodeL0,
          nodeL1: orderRelatedIssue.nodeCode,
          nodeL2: this.state.reasonCodeForOrderRelated,
          nodeL3: this.state.secondaryReasonsCodeForOrderRelated,
          contactEmail: JSON.parse(userDetailsCookie).userName,
          contactMobile: this.state.phoneNumberForOrderRelated,
          contactName: this.state.nameForOrderRelated,
          comment: this.state.commentForOrderRelated,
          nodeL4:
            getL4 &&
            getL4.children &&
            getL4.children[0] &&
            getL4.children[0].nodeCode
              ? getL4.children[0].nodeCode
              : undefined,
          transactionId: this.state.transactionId,
          orderCode: this.state.orderCode,
          subOrderCode: this.state.sellerOrderNumber
        }
      );
      if (this.state.file) {
        const uploadFileResponse = await this.props.uploadUserFile(
          this.state.file
        );
        if (uploadFileResponse && uploadFileResponse.status === SUCCESS) {
          if (this.props.submitOrderDetails) {
            const submitOrderDetailsResponse = await this.props.submitOrderDetails(
              submitDetailsObject
            );
            if (submitOrderDetailsResponse.status === SUCCESS) {
              this.props.history.push(MY_ACCOUNT_PAGE);
            }
          }
        }
      } else {
        if (this.props.submitOrderDetails) {
          const submitOrderDetailsResponse = await this.props.submitOrderDetails(
            submitDetailsObject
          );
          if (submitOrderDetailsResponse.status === SUCCESS) {
            this.props.history.push(MY_ACCOUNT_PAGE);
          }
        }
      }
    }
  }
  onChangeReasonForOtherIssue(val) {
    const code = val.value;
    const label = val.label;
    this.setState({
      secondaryReasonsCodeForOtherIssue: null,
      secondaryReasonsForOtherIssue: null,
      reasonCodeForOtherIssue: code,
      reasonForOtherIssue: label,
      isEnableForOtherIssue: false
    });
  }
  onChangeSubReasonForOtherIssue(val) {
    const code = val.value;
    const label = val.label;
    this.setState({
      secondaryReasonsCodeForOtherIssue: code,
      secondaryReasonsForOtherIssue: label,
      isEnableForOtherIssue: true
    });
  }
  async submitOtherIssue() {
    if (!this.state.reasonForOtherIssue) {
      this.props.displayToast(SELECT_ISSUE_FOR_OTHER_TEXT);
      return false;
    }
    if (!this.state.secondaryReasonsForOtherIssue) {
      this.props.displayToast(SELECT_SUB_ISSUE_FOR_OTHER_TEXT);
      return false;
    }
    if (!this.state.nameForOtherIssue) {
      this.props.displayToast(NAME_TEXT);
      return false;
    }
    if (!this.state.phoneNumberForOtherIssue) {
      this.props.displayToast(MOBILE_TEXT);
      return false;
    }
    if (
      this.state.phoneNumberForOtherIssue &&
      !MOBILE_PATTERN.test(this.state.phoneNumberForOtherIssue)
    ) {
      this.props.displayToast(MOBILE_VALID_TEXT);
      return false;
    } else {
      let otherIssue =
        this.props.customerQueriesData &&
        this.props.customerQueriesData.nodes &&
        this.props.customerQueriesData.nodes.find(otherIssue => {
          return otherIssue.nodeDesc === "Any Other Query";
        });
      let orderSubIssue =
        this.state.reasonForOtherIssue &&
        otherIssue &&
        otherIssue.children &&
        otherIssue.children.find(orderSubIssue => {
          return orderSubIssue.nodeDesc === this.state.reasonForOtherIssue;
        });
      let getL4 =
        this.state.secondaryReasonsForOtherIssue &&
        orderSubIssue &&
        orderSubIssue.children &&
        orderSubIssue.children.find(orderSubIssue => {
          return (
            orderSubIssue.nodeDesc === this.state.secondaryReasonsForOtherIssue
          );
        });
      const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      let submitDetailsObject = Object.assign(
        {},
        {
          nodeL0: otherIssue.nodeL0,
          nodeL1: otherIssue.nodeCode,
          nodeL2: this.state.reasonCodeForOtherIssue,
          nodeL3: this.state.secondaryReasonsCodeForOtherIssue,
          contactEmail: JSON.parse(userDetailsCookie).userName,
          contactMobile: this.state.phoneNumberForOtherIssue,
          contactName: this.state.nameForOtherIssue,
          comment: this.state.commentForOtherIssue,
          nodeL4:
            getL4 &&
            getL4.children &&
            getL4.children[0] &&
            getL4.children[0].nodeCode
              ? getL4.children[0].nodeCode
              : undefined,
          transactionId: "",
          orderCode: "",
          subOrderCode: ""
        }
      );
      if (this.props.submitOrderDetails) {
        const submitOrderDetailsResponse = await this.props.submitOrderDetails(
          submitDetailsObject
        );
        if (submitOrderDetailsResponse.status === SUCCESS) {
          this.props.history.push(MY_ACCOUNT_PAGE);
        }
      }
    }
  }

  navigateToLogin() {
    return <Redirect to={LOGIN_PATH} />;
  }

  render() {
    const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetailsCookie || !customerCookie) {
      return this.navigateToLogin();
    }
    let orderRelatedIssue =
      this.props.customerQueriesData &&
      this.props.customerQueriesData.nodes &&
      this.props.customerQueriesData.nodes.find(orderRelated => {
        return orderRelated.nodeDesc === "Order Related Query";
      });
    let orderRelatedSubIssue =
      this.state.reasonForOrderRelated &&
      orderRelatedIssue &&
      orderRelatedIssue.children &&
      orderRelatedIssue.children.find(orderRelatedSubIssue => {
        return (
          orderRelatedSubIssue.nodeDesc === this.state.reasonForOrderRelated
        );
      });
    let otherIssue =
      this.props.customerQueriesData &&
      this.props.customerQueriesData.nodes &&
      this.props.customerQueriesData.nodes.find(otherIssue => {
        return otherIssue.nodeDesc === "Any Other Query";
      });
    let otherSubIssue =
      this.state.reasonForOtherIssue &&
      otherIssue &&
      otherIssue.children &&
      otherIssue.children.find(otherSubIssue => {
        return otherSubIssue.nodeDesc === this.state.reasonForOtherIssue;
      });

    return (
      <div className={styles.base}>
        {!this.state.showOrder && (
          <div className={styles.header}>
            <TabHolder>
              <TabData
                width="50%"
                label="Order related "
                selected={this.state.isSelected === 0}
                selectItem={() => this.tabSelect(0)}
              />
              <TabData
                width="50%"
                label="Other issues "
                selected={this.state.isSelected === 1}
                selectItem={() => this.tabSelect(1)}
              />
            </TabHolder>
          </div>
        )}
        {this.state.isSelected === 0 &&
          !this.state.showOrder && (
            <div className={styles.orderHolder}>
              <div className={styles.selectedOrder}>
                <div className={styles.headingHolder}>
                  <CheckOutHeader
                    indexNumber="1"
                    confirmTitle="Select your order"
                  />
                </div>
                {!this.state.productImageURL &&
                !this.state.orderDate &&
                !this.state.productName &&
                !this.state.productPrice &&
                !this.state.productStatus ? (
                  <div
                    className={styles.dummySelectBoxWithIcon}
                    onClick={() => this.setState({ showOrder: true })}
                  >
                    <div className={styles.dummySelectBox}>Select order</div>
                    <div className={styles.iconHolder} />
                  </div>
                ) : (
                  <div
                    className={styles.productsDisplayHolder}
                    onClick={() =>
                      this.setState({
                        showOrder: true,
                        productImageURL: "",
                        orderDate: "",
                        productName: "",
                        productPrice: "",
                        productStatus: ""
                      })
                    }
                  >
                    <div className={styles.imageHolder}>
                      <ProductImage image={this.state.productImageURL} />
                    </div>
                    <div className={styles.dataHolder}>
                      {this.state.orderDate && (
                        <div className={styles.dataDescription}>
                          {`Order on: ${format(
                            this.state.orderDate,
                            "DD MMM,YYYY"
                          )}`}
                        </div>
                      )}
                      {this.state.productName && (
                        <div className={styles.dataDescription}>
                          {this.state.productName}
                        </div>
                      )}
                      {this.state.productPrice && (
                        <div className={styles.dataDescription}>
                          {this.state.productPrice}
                        </div>
                      )}
                      {this.state.productStatus && (
                        <div className={styles.dataDescription}>
                          {this.state.productStatus}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.selectIssueHolder}>
                <div className={styles.secondOrder}>
                  <CheckOutHeader indexNumber="2" confirmTitle="Select issue" />
                </div>
                <div className={styles.selectIssue}>
                  <SelectBoxMobile2
                    placeholder="Select issue"
                    arrowColour="black"
                    height={33}
                    options={
                      orderRelatedIssue &&
                      orderRelatedIssue.children &&
                      orderRelatedIssue.children.map((val, i) => {
                        return {
                          value: val.nodeCode,
                          label: val.nodeDesc
                        };
                      })
                    }
                    onChange={val => this.onChangeReasonForOrderRelated(val)}
                  />
                </div>
                <div className={styles.selectIssue}>
                  <SelectBoxMobile2
                    placeholder="Select sub-issue"
                    arrowColour="black"
                    height={33}
                    options={
                      orderRelatedSubIssue &&
                      orderRelatedSubIssue.children &&
                      orderRelatedSubIssue.children.map((val, i) => {
                        return {
                          value: val.nodeCode,
                          label: val.nodeDesc
                        };
                      })
                    }
                    isEnable={this.state.isEnableForOrderRelated}
                    onChange={val => this.onChangeSubReasonForOrderRelated(val)}
                  />
                </div>
                <div className={styles.selectIssue}>
                  <TextArea
                    placeholder={"Comments(Optional)"}
                    onChange={commentForOrderRelated =>
                      this.onChange({ commentForOrderRelated })
                    }
                  />
                </div>
              </div>
              <div className={styles.selectIssueHolder}>
                <div className={styles.secondOrder}>
                  <CheckOutHeader
                    indexNumber="3"
                    confirmTitle="Personal Details"
                  />
                </div>
                <div className={styles.textInformationHolder}>
                  <FloatingLabelInput
                    label="Name"
                    value={this.state.nameForOrderRelated}
                    onChange={nameForOrderRelated =>
                      this.onChange({ nameForOrderRelated })
                    }
                    onlyAlphabet={true}
                  />
                </div>
                <div className={styles.textInformationHolder}>
                  <FloatingLabelInput
                    label="Email"
                    disabled={true}
                    value={JSON.parse(userDetailsCookie).userName}
                    onChange={emailForOrderRelated =>
                      this.onChange({ emailForOrderRelated })
                    }
                  />
                </div>
                <div className={styles.textInformationHolder}>
                  <FloatingLabelInput
                    label="Phone*"
                    maxLength={"10"}
                    value={this.state.phoneNumberForOrderRelated}
                    onChange={phoneNumberForOrderRelated =>
                      this.onChange({ phoneNumberForOrderRelated })
                    }
                    onlyNumber={true}
                  />
                </div>
              </div>
              <div className={styles.selectImageHolder}>
                <div className={styles.secondOrder}>
                  <CheckOutHeader
                    indexNumber="4"
                    confirmTitle="Add attachment (Optional)"
                  />
                </div>
                <div className={styles.validImage}>
                  Upload JPEG, PNG (Maximum size 5 MB)
                </div>
                <div className={styles.imageInput}>
                  <ImageUpload
                    value={"Upload attachment"}
                    onChange={file => this.setState({ file })}
                  />
                </div>
              </div>
              <div className={styles.buttonHolder}>
                <div className={styles.button}>
                  <Button
                    type="primary"
                    height={38}
                    label={"Submit"}
                    width={166}
                    textStyle={{ color: "#fff", fontSize: 14 }}
                    onClick={() => this.submitOrderRelatedIssue()}
                  />
                </div>
              </div>
            </div>
          )}
        {this.state.isSelected === 1 &&
          !this.state.showOrder && (
            <div className={styles.otherIssueHolder}>
              <div className={styles.selectIssueHolder}>
                <div className={styles.secondOrder}>
                  <CheckOutHeader indexNumber="1" confirmTitle="Select issue" />
                </div>
                <div className={styles.selectIssue}>
                  <SelectBoxMobile2
                    placeholder="Select issue"
                    arrowColour="black"
                    height={33}
                    options={
                      otherIssue &&
                      otherIssue.children &&
                      otherIssue.children.map((val, i) => {
                        return {
                          value: val.nodeCode,
                          label: val.nodeDesc
                        };
                      })
                    }
                    onChange={val => this.onChangeReasonForOtherIssue(val)}
                  />
                </div>
                <div className={styles.selectIssue}>
                  <SelectBoxMobile2
                    placeholder="Select sub-issue"
                    arrowColour="black"
                    height={33}
                    options={
                      otherSubIssue &&
                      otherSubIssue.children &&
                      otherSubIssue.children.map((val, i) => {
                        return {
                          value: val.nodeCode,
                          label: val.nodeDesc
                        };
                      })
                    }
                    isEnable={this.state.isEnableForOtherIssue}
                    onChange={val => this.onChangeSubReasonForOtherIssue(val)}
                  />
                </div>
                <div className={styles.selectIssue}>
                  <TextArea
                    placeholder={"Comments(Optional)"}
                    onChange={commentForOtherIssue =>
                      this.onChange({ commentForOtherIssue })
                    }
                  />
                </div>
              </div>
              <div className={styles.selectIssueHolder}>
                <div className={styles.secondOrder}>
                  <CheckOutHeader
                    indexNumber="2"
                    confirmTitle="Personal Details"
                  />
                </div>
                <div className={styles.textInformationHolder}>
                  <FloatingLabelInput
                    label="Name"
                    value={this.state.nameForOtherIssue}
                    onChange={nameForOtherIssue =>
                      this.onChange({ nameForOtherIssue })
                    }
                    onlyAlphabet={true}
                  />
                </div>
                <div className={styles.textInformationHolder}>
                  <FloatingLabelInput
                    label="Email"
                    value={JSON.parse(userDetailsCookie).userName}
                    disabled={true}
                    onChange={emailForOtherIssue =>
                      this.onChange({ emailForOtherIssue })
                    }
                  />
                </div>
                <div className={styles.textInformationHolder}>
                  <FloatingLabelInput
                    label="Phone*"
                    maxLength={"10"}
                    value={this.state.phoneNumberForOtherIssue}
                    onChange={phoneNumberForOtherIssue =>
                      this.onChange({ phoneNumberForOtherIssue })
                    }
                    onlyNumber={true}
                  />
                </div>
              </div>
              <div className={styles.buttonHolder}>
                <div className={styles.button}>
                  <Button
                    type="primary"
                    height={38}
                    label={"Submit"}
                    width={166}
                    textStyle={{ color: "#fff", fontSize: 14 }}
                    onClick={() => this.submitOtherIssue()}
                  />
                </div>
              </div>
            </div>
          )}
        {this.state.showOrder && (
          <div className={styles.selectOrderHolder}>
            {this.props.ordersTransactionData &&
              this.props.ordersTransactionData.orderData &&
              this.props.ordersTransactionData.orderData.map(orderDetails => {
                return (
                  <div className={styles.orderCard}>
                    {orderDetails.products &&
                      orderDetails.products.map(productsDetails => {
                        return (
                          <div
                            className={styles.productsDetailsHolder}
                            onClick={() =>
                              this.setProductDetails(
                                orderDetails.orderId,
                                productsDetails.transactionId,
                                productsDetails.sellerorderno,
                                productsDetails.imageURL,
                                orderDetails.orderDate,
                                productsDetails.productName,
                                productsDetails.price,
                                productsDetails.statusDisplay
                              )
                            }
                          >
                            <div className={styles.imageHolder}>
                              <ProductImage image={productsDetails.imageURL} />
                            </div>
                            <div className={styles.dataHolder}>
                              {orderDetails.orderDate && (
                                <div className={styles.dataDescription}>
                                  {`Order on: ${format(
                                    orderDetails.orderDate,
                                    "DD MMM,YYYY"
                                  )}`}
                                </div>
                              )}
                              {productsDetails.productName && (
                                <div className={styles.dataDescription}>
                                  {productsDetails.productName}
                                </div>
                              )}
                              {productsDetails.price && (
                                <div className={styles.dataDescription}>
                                  {productsDetails.price}
                                </div>
                              )}
                              {productsDetails.statusDisplay && (
                                <div className={styles.dataDescription}>
                                  {productsDetails.statusDisplay}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            <div
              className={styles.loadData}
              onClick={() => this.getMoreOrder()}
            >
              Load More
            </div>
          </div>
        )}
      </div>
    );
  }
}
