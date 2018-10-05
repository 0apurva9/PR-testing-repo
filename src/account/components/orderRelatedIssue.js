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
const SELECT_ISSUE_FOR_ORDER_TEXT = "Please select issue ";
const SELECT_SUB_ISSUE_FOR_ORDER_TEXT = "Please select sub issue ";
const NAME_TEXT = "Please enter name";
const MOBILE_TEXT = "Please enter mobile number";
const MOBILE_VALID_TEXT = "Please enter valid mobile number";
const EMAIL_TEXT = "Please enter emailId";
const EMAIL_VALID_TEXT = "Please enter  valid emailId";
const OFFSET_BOTTOM = 800;
export default class OrderRelatedIssue extends React.Component {
  constructor(props) {
    super(props);
    const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const getUserDetails = JSON.parse(userDetailsCookie);
    this.state = {
      showOrder: false,
      isSelected: 0,
      isSelectedOrder: false,
      name: "",
      mobile: "",
      email: "",
      comment: "",
      file: "",
      l2SelectedOption: null,
      l3SelectedOption: null,

      isEnableForOrderRelated: false,
      isEnableForSubOrderRelated: false,
      isEnableForAnotherOrderRelated: false,
      orderCode: "",
      transactionId: "",
      sellerOrderNumber: "",
      productImageURL: "",
      orderDate: "",
      productName: "",
      productPrice: "",
      productStatus: "",
      l2SelectedReason: null,
      l3SelectedReason: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.userDetails) {
      this.setState({
        email: nextProps.userDetails.emailID
          ? nextProps.userDetails.emailID
          : "",
        name: nextProps.userDetails.firstName
          ? nextProps.userDetails.firstName
          : "",
        mobile: nextProps.userDetails.mobileNumber
          ? nextProps.userDetails.mobileNumber
          : ""
      });
    }
  }
  componentDidMount() {
    this.props.getUserDetails();
    this.props.getCustomerQueriesData();
    this.props.getOrdersTransactionData(false);
    this.props.setHeaderText(CUSTOMER_CARE);
  }
  componentDidUpdate() {
    this.props.setHeaderText(CUSTOMER_CARE);
  }
  componentWillUnmount() {
    this.props.clearOrderTransactionDetails();
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
    if (this.state.isSelected !== val) {
      this.setState({
        isSelected: val,
        name: this.state.name ? this.state.name : "",
        mobile: this.state.mobile ? this.state.mobile : "",
        email: this.state.email ? this.state.email : "",
        comment: "",
        file: "",
        l2SelectedOption: null,
        l3SelectedOption: null,

        isEnableForOrderRelated: false,
        isEnableForSubOrderRelated: false,
        isEnableForAnotherOrderRelated: false,
        orderCode: "",
        transactionId: "",
        sellerOrderNumber: "",
        productImageURL: "",
        orderDate: "",
        productName: "",
        productPrice: "",
        productStatus: "",
        l2SelectedReason: null,
        l3SelectedReason: null
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
      l2SelectedOption: code,
      l2SelectedReason: label,
      l3SelectedReason: null,
      l3SelectedOption: null,

      isEnableForOrderRelated: true,
      isEnableForSubOrderRelated: false,
      isEnableForAnotherOrderRelated: false
    });
  }
  onChangeSubReasonForOrderRelated(val) {
    const code = val.value;
    const label = val.label;

    this.setState({
      l3SelectedOption: code,
      l3SelectedReason: label,

      isEnableForSubOrderRelated: true,
      isEnableForAnotherOrderRelated: false
    });
  }
  onChange(val) {
    this.setState(val);
  }
  async submitCustomerForm() {
    let l1OptionsArray, l2OptionsArray, l3OptionsArray;
    if (this.state.isSelected === 0) {
      l1OptionsArray =
        this.props.customerQueriesData &&
        this.props.customerQueriesData.nodes &&
        this.props.customerQueriesData.nodes.find(orderRelated => {
          return orderRelated.nodeDesc === "Order Related Query";
        });
    } else {
      l1OptionsArray =
        this.props.customerQueriesData &&
        this.props.customerQueriesData.nodes &&
        this.props.customerQueriesData.nodes.find(otherIssue => {
          return otherIssue.nodeDesc === "Any Other Query";
        });
    }
    l2OptionsArray = this.getOrderRelatedL2Issue(l1OptionsArray);
    l3OptionsArray = this.getOrderRelatedL3Issue(l2OptionsArray);

    if (this.state.isSelected === 0 && !this.state.orderCode) {
      this.props.displayToast(SELECT_ORDER_TEXT);
      return false;
    }
    if (!this.state.l2SelectedOption) {
      this.props.displayToast(SELECT_ISSUE_FOR_ORDER_TEXT);
      return false;
    }
    if (l2OptionsArray && !this.state.l3SelectedOption) {
      this.props.displayToast(SELECT_SUB_ISSUE_FOR_ORDER_TEXT);
      return false;
    }
    if (!this.state.name) {
      this.props.displayToast(NAME_TEXT);
      return false;
    }
    if (!this.state.email) {
      this.props.displayToast(EMAIL_TEXT);
      return false;
    }
    if (this.state.email && !EMAIL_REGULAR_EXPRESSION.test(this.state.email)) {
      this.props.displayToast(EMAIL_VALID_TEXT);
      return false;
    }
    if (!this.state.mobile) {
      this.props.displayToast(MOBILE_TEXT);
      return false;
    }
    if (this.state.mobile && !MOBILE_PATTERN.test(this.state.mobile)) {
      this.props.displayToast(MOBILE_VALID_TEXT);
      return false;
    } else {
      let orderRelatedIssue =
        this.props.customerQueriesData &&
        this.props.customerQueriesData.nodes &&
        this.props.customerQueriesData.nodes.find(orderRelated => {
          return orderRelated.nodeDesc === "Order Related Query";
        });
      let submitDetailsObject = Object.assign(
        {},
        {
          nodeL0: orderRelatedIssue.nodeL0,
          nodeL1: orderRelatedIssue.nodeCode,
          nodeL2: this.state.l2SelectedOption,
          nodeL3: this.state.l3SelectedOption,
          contactEmail: this.state.email,
          contactMobile: this.state.mobile,
          contactName: this.state.name,
          comment: this.state.comment ? this.state.comment : "",
          nodeL4:
            l3OptionsArray &&
            l3OptionsArray.children &&
            l3OptionsArray.children.length > 0
              ? l3OptionsArray.children[0].nodeCode
              : undefined,
          transactionId: this.state.transactionId,
          orderCode: this.state.orderCode,
          subOrderCode: this.state.sellerOrderNumber
        }
      );
      let getCustomerQueryDetailsObject = Object.assign(
        {},
        {
          name: this.state.name,
          emailId: this.state.email,
          mobileNumber: this.state.mobile,
          comment: this.state.comment,
          issue: this.state.l2SelectedReason,
          subIssue: this.state.l3SelectedReason
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
              this.props.showCustomerQueryModal(getCustomerQueryDetailsObject);
            }
          }
        }
      } else {
        if (this.props.submitOrderDetails) {
          const submitOrderDetailsResponse = await this.props.submitOrderDetails(
            submitDetailsObject
          );
          if (submitOrderDetailsResponse.status === SUCCESS) {
            this.props.showCustomerQueryModal(getCustomerQueryDetailsObject);
          }
        }
      }
    }
  }

  navigateToLogin() {
    return <Redirect to={LOGIN_PATH} />;
  }

  onUploadFile(file) {
    if (file) {
      if (file.size <= 5000000) {
        this.setState({ file });
      } else {
        this.props.displayToast("File size should be less then 5 Mb");
      }
    }
  }
  goToOrderPage() {
    if (
      this.props.ordersTransactionData &&
      this.props.ordersTransactionData.orderData &&
      this.props.ordersTransactionData.orderData.length > 0
    ) {
      this.setState({ showOrder: true });
    } else {
      this.props.displayToast("No Orders");
    }
  }
  getOrderRelatedL2Issue(orderRelatedIssue) {
    const subTab =
      this.state.l2SelectedOption &&
      orderRelatedIssue &&
      orderRelatedIssue.children &&
      orderRelatedIssue.children.find(l2Object => {
        return l2Object.nodeCode === this.state.l2SelectedOption;
      });
    if (subTab && subTab.children && subTab.children.length > 0) {
      return subTab;
    } else {
      return null;
    }
  }
  getOrderRelatedL3Issue(l2OptionsArray) {
    return (
      this.state.l3SelectedOption &&
      l2OptionsArray &&
      l2OptionsArray.children &&
      l2OptionsArray.children.find(l3Object => {
        return l3Object.nodeCode === this.state.l3SelectedOption;
      })
    );
  }
  render() {
    const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

    if (!userDetailsCookie || !customerCookie) {
      return this.navigateToLogin();
    }
    let l1OptionsArray, l2OptionsArray, l3OptionsArray;
    if (this.state.isSelected === 0) {
      l1OptionsArray =
        this.props.customerQueriesData &&
        this.props.customerQueriesData.nodes &&
        this.props.customerQueriesData.nodes.find(orderRelated => {
          return orderRelated.nodeDesc === "Order Related Query";
        });
    }
    if (this.state.isSelected === 1) {
      l1OptionsArray =
        this.props.customerQueriesData &&
        this.props.customerQueriesData.nodes &&
        this.props.customerQueriesData.nodes.find(otherIssue => {
          return otherIssue.nodeDesc === "Any Other Query";
        });
    }
    l2OptionsArray = this.getOrderRelatedL2Issue(l1OptionsArray);
    l3OptionsArray = this.getOrderRelatedL3Issue(l2OptionsArray);
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

        {!this.state.showOrder && (
          <div className={styles.orderHolder}>
            {this.state.isSelected === 0 && (
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
                    onClick={() => this.goToOrderPage()}
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
            )}
            <div className={styles.selectIssueHolder}>
              <div className={styles.secondOrder}>
                <CheckOutHeader
                  indexNumber={this.state.isSelected === 0 ? "2" : "1"}
                  confirmTitle="Select issue"
                />
              </div>
              <div className={styles.selectIssue}>
                <SelectBoxMobile2
                  placeholder="Select issue"
                  arrowColour="black"
                  height={33}
                  options={
                    l1OptionsArray &&
                    l1OptionsArray.children &&
                    l1OptionsArray.children.map((val, i) => {
                      return {
                        value: val.nodeCode,
                        label: val.nodeDesc
                      };
                    })
                  }
                  isEnable={this.state.isEnableForOrderRelated}
                  onChange={val => this.onChangeReasonForOrderRelated(val)}
                />
              </div>
              {l2OptionsArray &&
                l2OptionsArray.children &&
                l2OptionsArray.children.length > 0 && (
                  <div className={styles.selectIssue}>
                    <SelectBoxMobile2
                      placeholder="Select sub-issue"
                      arrowColour="black"
                      height={33}
                      options={
                        l2OptionsArray &&
                        l2OptionsArray.children &&
                        l2OptionsArray.children.map((val, i) => {
                          return {
                            value: val.nodeCode,
                            label: val.nodeDesc
                          };
                        })
                      }
                      isEnable={this.state.isEnableForSubOrderRelated}
                      onChange={val =>
                        this.onChangeSubReasonForOrderRelated(val)
                      }
                    />
                  </div>
                )}
              <div className={styles.selectIssue}>
                {l3OptionsArray && l3OptionsArray.ticketAnswer ? (
                  <div
                    className={styles.ticketAnswer}
                    dangerouslySetInnerHTML={{
                      __html: l3OptionsArray.ticketAnswer
                    }}
                  />
                ) : (
                  <TextArea
                    placeholder={"Comments(Optional)"}
                    value={this.state.comment}
                    onChange={comment => this.onChange({ comment })}
                  />
                )}
              </div>
            </div>
            {(!l3OptionsArray ||
              (l3OptionsArray && !l3OptionsArray.ticketAnswer)) && (
              <div className={styles.selectIssueHolder}>
                <div className={styles.secondOrder}>
                  <CheckOutHeader
                    indexNumber={this.state.isSelected === 0 ? "3" : "2"}
                    confirmTitle="Personal Details"
                  />
                </div>

                <div className={styles.textInformationHolder}>
                  <FloatingLabelInput
                    label="Name"
                    value={this.state.name}
                    onChange={name => this.onChange({ name })}
                    onlyAlphabet={true}
                    disabled={this.state.name ? true : false}
                  />
                </div>
                <div className={styles.textInformationHolder}>
                  <FloatingLabelInput
                    label="Email"
                    disabled={this.state.email ? true : false}
                    value={this.state.email}
                    onChange={email => this.onChange({ email })}
                  />
                </div>
                <div className={styles.textInformationHolder}>
                  <FloatingLabelInput
                    label="Phone*"
                    maxLength={"10"}
                    value={this.state.mobile}
                    onChange={mobile => this.onChange({ mobile })}
                    disabled={this.state.mobile ? true : false}
                    onlyNumber={true}
                  />
                </div>
              </div>
            )}
            {this.state.isSelected === 0 &&
              (!l3OptionsArray ||
                (l3OptionsArray && !l3OptionsArray.ticketAnswer)) && (
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
                      value={
                        this.state.file
                          ? this.state.file.name
                          : "Upload attachment"
                      }
                      onChange={file => this.onUploadFile(file)}
                    />
                  </div>
                </div>
              )}
            {(!l3OptionsArray ||
              (l3OptionsArray && !l3OptionsArray.ticketAnswer)) && (
              <div className={styles.buttonHolder}>
                <div className={styles.button}>
                  <Button
                    type="primary"
                    height={38}
                    label={"Submit"}
                    width={166}
                    textStyle={{ color: "#fff", fontSize: 14 }}
                    onClick={() => this.submitCustomerForm()}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {this.state.showOrder && (
          <div className={styles.selectOrderHolder}>
            {this.props.ordersTransactionData &&
              this.props.ordersTransactionData.orderData &&
              this.props.ordersTransactionData.orderData.map(
                (orderDetails, index) => {
                  return (
                    <div className={styles.orderCard} key={index}>
                      {orderDetails.products &&
                        orderDetails.products.map((productsDetails, id) => {
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
                              key={id}
                            >
                              <div className={styles.imageHolder}>
                                <ProductImage
                                  image={productsDetails.imageURL}
                                />
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
                }
              )}
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
