import React from "react";
import moment from "moment";
import styles from "./OrderDetails.css";
import OrderPlacedAndId from "./OrderPlacedAndId.js";
import OrderCard from "./OrderCard.js";
import OrderViewPaymentDetails from "./OrderViewPaymentDetails";
import OrderPaymentMethod from "./OrderPaymentMethod";
import OrderStatusVertical from "./OrderStatusVerticalV2";
import InstallationExperience from "./InstallationExperience";
import PropTypes from "prop-types";
import format from "date-fns/format";
import each from "lodash.foreach";
import queryString from "query-string";
import * as Cookie from "../../lib/Cookie";
import DesktopOnly from "../../general/components/DesktopOnly";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import ProfileMenu from "./ProfileMenu";
import UserProfile from "./UserProfile";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import { Redirect } from "react-router-dom";
import Icon from "../../xelpmoc-core/Icon";
import Button from "../../general/components/Button";
import RetryPaymentIcon from "./img/payment_retry.svg";
import {
  CASH_ON_DELIVERY,
  ORDER_PREFIX,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  LOGIN_PATH,
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_REASON,
  SHORT_URL_ORDER_DETAIL,
  MY_ACCOUNT_ORDERS_PAGE,
  MY_ACCOUNT_PAGE,
  CANCEL,
  RETRY_PAYMENT_CART_ID,
  RETRY_PAYMENT_DETAILS,
  CHECKOUT_ROUTER,
  WRITE_REVIEW,
  PRODUCT_CANCEL,
  CANCEL_RETURN_REQUEST,
  SUCCESS,
  HELP_URL,
  COSTUMER_ORDER_RELATED_QUERY_ROUTE
} from "../../lib/constants";
import {
  setDataLayer,
  setDataLayerForMyAccountDirectCalls,
  ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL,
  ADOBE_RETURN_LINK_CLICKED,
  ADOBE_REQUEST_INVOICE_LINK_CLICKED,
  ADOBE_HELP_SUPPORT_LINK_CLICKED,
  ADOBE_RETURN_JOURNEY_INITIATED
} from "../../lib/adobeUtils";
const dateFormat = "DD MMM YYYY";
const PRODUCT_RETURN = "Return";
const RETURN = "RETURN";
// const PRODUCT_RETURN_WINDOW_CLOSED =
//   "You cannot return this product as the window for returns has expired";
const AWB_POPUP_TRUE = "Y";
const AWB_POPUP_FALSE = "N";
const CLICK_COLLECT = "click-and-collect";
const PAY_PAL = "PayPal";
export default class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDetails: false
    };
  }
  onClickImage(productCode) {
    if (productCode) {
      this.props.history.push(`/p-${productCode.toLowerCase()}`);
    }
  }
  requestInvoice(lineID, orderNumber) {
    setDataLayer(ADOBE_REQUEST_INVOICE_LINK_CLICKED);
    if (this.props.sendInvoice) {
      this.props.sendInvoice(lineID, orderNumber);
    }
  }
  handleshowShippingDetails(val) {
    if (this.props.showShippingDetails && val) {
      this.props.showShippingDetails(val);
    }
  }
  backToOrderHistory() {
    this.props.history.push(`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ORDERS_PAGE}`);
  }
  replaceItem(sellerorderno, paymentMethod, transactionId) {
    sessionStorage.setItem("returnTransactionId", transactionId);
    if (sellerorderno) {
      let isCOD = false;
      let isPaypal = false;
      if (paymentMethod === CASH_ON_DELIVERY) {
        isCOD = true;
      }
      if (paymentMethod === PAY_PAL) {
        isPaypal = true;
      }
      setDataLayer(ADOBE_RETURN_LINK_CLICKED);
      setDataLayer(ADOBE_RETURN_JOURNEY_INITIATED);
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${sellerorderno}${RETURN_LANDING}${RETURNS_REASON}`,
        state: {
          isCOD,
          isPaypal: isPaypal,
          authorizedRequest: true,
          transactionId: transactionId
        }
      });
    }
  }
  confirmReturn(sellerorderno, transactionId) {
    let data = {};
    data.orderId = sellerorderno;
    data.transactionId = transactionId;
    this.props.showReturnModal(data);
  }
  cancelItem(transactionId, ussid, orderCode, orderId, orderDate) {
    setDataLayerForMyAccountDirectCalls(ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL);
    this.props.history.push({
      pathname: `${CANCEL}/${orderCode}`,
      state: {
        transactionId: transactionId,
        ussid: ussid,
        orderId: orderId,
        orderDate: orderDate
      }
    });
  }

  writeReview(productCode) {
    this.props.history.push(`/p-${productCode.toLowerCase()}${WRITE_REVIEW}`);
  }
  getNonWorkingDays(mplWorkingDays) {
    const arr1 = [1, 2, 3, 4, 5, 6, 0];
    let dayText = "";
    let dayTextArr = [];
    var arr2 = mplWorkingDays.split(",").map(function (item) {
      return parseInt(item, 10);
    });
    const finalarr = [];
    for (var i = 0; i < arr1.length; i++) {
      if (arr2.indexOf(arr1[i]) === -1) {
        finalarr.push(arr1[i]);
      }
    }
    if (finalarr.length === 0) {
      return "";
    } else if (finalarr.length > 0) {
      finalarr.forEach(function (curr_val) {
        if (curr_val === 1) {
          dayText = "Mondays";
        } else if (curr_val === 2) {
          dayText = "Tuesdays";
        } else if (curr_val === 3) {
          dayText = "Wednesdays";
        } else if (curr_val === 4) {
          dayText = "Thursdays";
        } else if (curr_val === 5) {
          dayText = "Fridays";
        } else if (curr_val === 6) {
          dayText = "Saturdays";
        } else if (curr_val === 0) {
          dayText = "Sundays";
        }
        dayTextArr.push(dayText);
      });
      let dayTextArrToString = " | Closed on " + dayTextArr.toString();
      return dayTextArrToString;
    }
  }
  getStoreDateNTime(mplWorkingDays, mplOpeningTime, mplClosingTime) {
    let getDaysText = this.getNonWorkingDays(mplWorkingDays);
    let mplOpeningTimeText = "";
    let mplClosingTimeText = "";
    // let displayDateNTime = "";
    if (parseFloat(mplOpeningTime) < 12) {
      mplOpeningTimeText = mplOpeningTime + "AM";
    } else {
      let mplOpeningTimeInMinutes = parseFloat(mplOpeningTime) * 60;
      let mplOpeningTimeInTwelveHoursFormat = mplOpeningTimeInMinutes - 720; // 12 * 60
      let mplOpeningTimeConverted = mplOpeningTimeInTwelveHoursFormat / 60;
      mplOpeningTimeText = mplOpeningTimeConverted.toFixed(2) + "PM";
    }
    if (parseFloat(mplClosingTime) < 12) {
      mplClosingTimeText = mplClosingTime + "AM";
    } else {
      let mplClosingTimeInMinutes = parseFloat(mplClosingTime) * 60;
      let mplClosingTimeInTwelveHoursFormat = mplClosingTimeInMinutes - 720; // 12 * 60
      let mplClosingTimeConverted = mplClosingTimeInTwelveHoursFormat / 60;
      mplClosingTimeText = mplClosingTimeConverted.toFixed(2) + "PM";
    }
    let displayDateNTime =
      mplOpeningTimeText + " - " + mplClosingTimeText + getDaysText;
    return { __html: displayDateNTime };
  }
  redirectToHelpPage() {
    setDataLayer(ADOBE_HELP_SUPPORT_LINK_CLICKED);
    this.props.history.push(`${HELP_URL}`);
  }
  redirectToCustomHelpPage() {
    setDataLayer(ADOBE_HELP_SUPPORT_LINK_CLICKED);
    this.props.history.push(
      `${MY_ACCOUNT_PAGE}${COSTUMER_ORDER_RELATED_QUERY_ROUTE}`
    );
  }
  componentWillMount() {
    const transactionId = queryString.parse(this.props.location.search)
      .transactionId;
    if (transactionId) {
      this.setState({ itemDetails: true });
    }
  }
  componentDidMount() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let pageName = "orderDetails";
    if (
      userDetails &&
      customerCookie &&
      this.props.match.path === `${ORDER_PREFIX}`
    ) {
      let orderCode = queryString.parse(this.props.location.search).orderCode;
      if (!orderCode) {
        orderCode = sessionStorage.getItem("returnOrderId");
      }
      const transactionId = queryString.parse(this.props.location.search)
        .transactionId;
      //added to use order id in refund success page
      sessionStorage.setItem("returnOrderId", orderCode);

      if (transactionId) {
        sessionStorage.setItem("returnTransactionId", transactionId);
        this.props.fetchOrderItemDetails(orderCode, transactionId);
        this.props.setHeaderText("Item Details");
      } else {
        this.props.fetchOrderDetails(orderCode);
        this.props.setHeaderText("Order Details");
      }
    } else if (
      userDetails &&
      customerCookie &&
      this.props.match.path === `${SHORT_URL_ORDER_DETAIL}`
    ) {
      let orderCode = this.props.match.params.orderCode;
      if (!orderCode) {
        orderCode = sessionStorage.getItem("returnOrderId");
      }
      //added to use order id in refund success page
      sessionStorage.setItem("returnOrderId", orderCode);
      this.props.fetchOrderDetails(orderCode);
      this.props.setHeaderText("Order Details");
    }
    let returnForHOTC = sessionStorage.getItem("updateReturnForHOTC");
    if (returnForHOTC) {
      this.props.showDeliveryConfirmModal();
    }
    localStorage.removeItem("secondaryLabel");
    localStorage.removeItem("secondaryCode");
    localStorage.removeItem("primaryLabel");
    localStorage.removeItem("primaryCode");
    localStorage.removeItem("comment");
  }
  updateRefundDetailsPopUp(orderId, transactionId) {
    const orderDetails = {};
    orderDetails.orderId = orderId;
    orderDetails.transactionId = transactionId;
    if (this.props.showModal) {
      this.props.showModal(orderDetails);
    }
  }

  componentDidUpdate(prevProps) {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (
      userDetails &&
      customerCookie &&
      this.props.match.path === `${ORDER_PREFIX}`
    ) {
      const orderCode = queryString.parse(this.props.location.search).orderCode;
      const transactionId = queryString.parse(this.props.location.search)
        .transactionId;
      if (transactionId) {
        this.props.setHeaderText("Item Details");
      } else {
        this.props.setHeaderText(`#${orderCode}`);
      }
    } else if (
      userDetails &&
      customerCookie &&
      this.props.match.path === `${SHORT_URL_ORDER_DETAIL}`
    ) {
      const orderCode = this.props.match.params.orderCode;
      this.props.setHeaderText(`#${orderCode}`);
    }
  }

  navigateToLogin() {
    const url = this.props.location.pathname;
    this.props.setUrlToRedirectToAfterAuth(url);

    return <Redirect to={LOGIN_PATH} />;
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.sendInvoiceSatus === SUCCESS) {
    //   this.props.displayToast("Invoice has been sent");
    // }
  }
  getPickUpDate(orderdate, returnPolicy) {
    let pickupDate = "";
    let new_date = new Date(orderdate);
    pickupDate = moment(new_date)
      .add(returnPolicy, "days")
      .format(dateFormat);
    return pickupDate;
  }
  cancelReturnRequest(transactionId, orderCode) {
    this.props.history.push({
      pathname: `${CANCEL_RETURN_REQUEST}/${orderCode}/${transactionId}`
    });
  }
  onClickRetryPayment = async retryUrl => {
    let retryPaymentSplitUrl = retryUrl.split("?")[1].split("&");
    let guId = retryPaymentSplitUrl[0].split("value=")[1];
    let userId = retryPaymentSplitUrl[1].split("userId=")[1];
    if (this.props.retryPayment) {
      let retryPaymentResponse = await this.props.retryPayment(guId, userId);
      if (retryPaymentResponse && retryPaymentResponse.status === SUCCESS) {
        let retryPaymentDetailsObject = {};
        retryPaymentDetailsObject.retryPaymentDetails =
          retryPaymentResponse.retryPaymentDetails;
        localStorage.setItem(RETRY_PAYMENT_CART_ID, JSON.stringify(guId));
        localStorage.setItem(
          RETRY_PAYMENT_DETAILS,
          JSON.stringify(retryPaymentDetailsObject)
        );
        this.props.history.push({
          pathname: CHECKOUT_ROUTER,
          state: {
            isFromRetryUrl: true,
            retryPaymentGuid: guId
          }
        });
      }
    }
  };
  render() {
    if (this.props.loadingForFetchOrderDetails) {
      this.props.showSecondaryLoader();
    } else {
      this.props.hideSecondaryLoader();
    }
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    if (userDetails) {
      userData = JSON.parse(userDetails);
    }
    const orderDetails = this.props.orderDetails;
    let orderPlacedDate = "";

    if (orderDetails && orderDetails.orderDate) {
      orderPlacedDate = format(orderDetails.orderDate, dateFormat);
    }
    let storeNumber =
      orderDetails &&
      orderDetails.products &&
      orderDetails.products[0] &&
      orderDetails.products[0].storeDetails &&
      orderDetails.products[0].storeDetails.storeContactNumber;
    return (
      <div className={styles.base}>
        <div className={MyAccountStyles.holder}>
          {/* this is for profile menu show only desktop */}
          <DesktopOnly>
            <div className={MyAccountStyles.profileMenu}>
              <ProfileMenu {...this.props} />
            </div>
          </DesktopOnly>
          <div className={MyAccountStyles.orderDetail}>
            {!this.state.itemDetails &&
              orderDetails && (
                <div
                  className={
                    !this.state.itemDetails
                      ? styles.orderIdHolderItemDetails
                      : styles.orderIdHolder
                  }
                >
                  <OrderPlacedAndId
                    placedTime={orderPlacedDate}
                    orderId={orderDetails.orderId}
                    backHistory="true"
                    backToOrderHistory={this.props.history}
                  />
                </div>
              )}
            {orderDetails &&
              orderDetails.paymentRetryLink && (
                <div className={styles.retryPayment}>
                  <div className={styles.retryPaymentTitle}>
                    <Icon
                      image={RetryPaymentIcon}
                      size={42}
                      display={"inline-block"}
                    />
                    <div className={styles.retryCallOutMessage}>
                      {orderDetails.calloutMessage}
                    </div>
                  </div>
                  {/* <div className={styles.buttonHolderForRetryPayment}>
                    <Button
                      type="hollow"
                      height={36}
                      label="RETRY PAYMENT"
                      color="#ff1744"
                      textStyle={{ color: "#212121", fontSize: 14 }}
                      onClick={() =>
                        this.onClickRetryPayment(orderDetails.paymentRetryLink)
                      }
                    />
                  </div> */}
                  <div className={styles.buttonHolderForRetryPayment}>
                    <Button
                      type="hollow"
                      height={36}
                      label="RETRY PAYMENT"
                      color="#ff1744"
                      textStyle={{
                        color: "#212121",
                        fontSize: 14
                      }}
                      onClick={() =>
                        this.onClickRetryPayment(orderDetails.paymentRetryLink)
                      }
                    />
                  </div>
                </div>
              )}
            {orderDetails &&
              orderDetails.products.map((products, i) => {
                let isOrderReturnable = false;
                let isReturned = false;
                let isNotRefund = false;

                if (
                  products &&
                  products.statusDisplayMsg &&
                  products.statusDisplayMsg
                    .map(val => {
                      return val.key;
                    })
                    .includes(RETURN)
                ) {
                  isReturned = products.statusDisplayMsg
                    .map(val => {
                      return val.key;
                    })
                    .includes(RETURN);
                }

                each(products && products.statusDisplayMsg, orderStatus => {
                  each(
                    orderStatus &&
                    orderStatus.value &&
                    orderStatus.value.statusList,
                    status => {
                      if (
                        status.responseCode === "DELIVERED" ||
                        status.responseCode === "ORDER_COLLECTED"
                      ) {
                        isOrderReturnable = true;
                      }
                      if (
                        !status.responseCode.includes("REFUND") &&
                        !isNotRefund
                      ) {
                        isNotRefund = true;
                      }
                    }
                  );
                });
                const requestCancelled =
                  products.installationDisplayMsg &&
                  products.installationDisplayMsg.find(val => {
                    return val.key === "REQUEST_CANCELLED";
                  });
                const requestCompleted =
                  products.installationDisplayMsg &&
                  products.installationDisplayMsg.find(val => {
                    return val.key === "REQUEST_COMPLETED";
                  });
                const requestClosed =
                  products.installationDisplayMsg &&
                  products.installationDisplayMsg.find(val => {
                    return val.key === "REQUEST_CLOSED";
                  });
                let hideEIETrackDiagram = false;
                if (requestCancelled && requestCancelled.value.customerFacingName === "Request Cancelled" && requestCancelled.value.status === "Completed") {
                  hideEIETrackDiagram = true;
                }
                if (requestCompleted && (requestCompleted.value.customerFacingName === "Request Completed" || requestCompleted.value.customerFacingName === "Installation Rescheduled") && requestCompleted.value.status === "Completed") {
                  hideEIETrackDiagram = true;
                }
                if (requestClosed && requestClosed.value.customerFacingName === "Request Closed" && requestClosed.value.status === "Completed") {
                  hideEIETrackDiagram = true;
                }
                return (
                  <React.Fragment key={i}>
                    <div className={styles.order} key={i}>
                      {!this.state.itemDetails && (
                        <div className={styles.itemDetails}>Item Details</div>
                      )}
                      {this.state.itemDetails && (
                        <div className={styles.orderIdAndPlacedHolder}>
                          <div className={styles.orderIdHolder}>
                            <span className={styles.highlightedText}>
                              Order placed on :{" "}
                            </span>
                            <span>{orderPlacedDate}</span>
                          </div>
                          <div className={styles.orderIdHolder}>
                            <span className={styles.highlightedText}>
                              Order ID :{" "}
                            </span>
                            <span>{orderDetails.orderId}</span>
                          </div>
                          {products.transactionId && (
                            <div className={styles.orderIdHolder}>
                              <span className={styles.highlightedText}>
                                Transaction ID :{" "}
                              </span>
                              <span>{products.transactionId}</span>
                            </div>
                          )}
                        </div>
                      )}
                      {this.props.history &&
                        this.state.itemDetails && (
                          <div
                            className={styles.buttonGoToBack}
                            onClick={() => this.backToOrderHistory()}
                          >
                            Back to Order History
                          </div>
                        )}

                      <OrderCard
                        statusDisplayMsg={products.statusDisplayMsg}
                        estimatedDeliveryDate={products.estimateddeliverydate}
                        statusDisplay={products.statusDisplay}
                        imageUrl={products.imageURL}
                        productBrand={products.productBrand}
                        price={products.price}
                        discountPrice={""}
                        productName={products.productName}
                        isGiveAway={products.isGiveAway}
                        clickAndCollect={
                          products.selectedDeliveryMode.code === CLICK_COLLECT
                            ? true
                            : false
                        }
                        onClick={() => this.onClickImage(products.productcode)}
                        quantity={true}
                        selectedDeliveryMode={products.selectedDeliveryMode}
                        sellerName={products.sellerName}
                        consignmentStatus={products.consignmentStatus}
                        deliveryDate={products.deliveryDate}
                        productSize={products.productSize}
                        productColourName={products.productColourName}
                        calloutMessage={products.calloutMessage}
                        showEDD="Y"
                        isOrderReturnable={products.isReturned}
                        returnMode={products.returnMode}
                        returnPolicy={products.returnPolicy}
                        installationCompletedDate={
                          products.installationCompletedDate
                        }
                        installationRequestCancelled={requestCancelled}
                        estimatedCompletionDate={
                          products.estimatedCompletionDate
                        }
                      />

                      {products.awbPopupLink === AWB_POPUP_TRUE && (
                        <div className={styles.replaceHolder}>
                          <div
                            className={styles.replace}
                            onClick={() =>
                              this.updateRefundDetailsPopUp(
                                orderDetails.orderId,
                                products.transactionId
                              )
                            }
                          >
                            Update Return Details
                            {/* <UnderLinedButton
                                  label="Update Return Details"
                                  color="#000"
                                /> */}
                          </div>
                        </div>
                      )}
                      {products.consignmentStatus &&
                        products.consignmentStatus != "ORDER_ALLOCATED" &&
                        products.consignmentStatus != "PACKED" &&
                        products.consignmentStatus !=
                        "RETURNINITIATED_BY_RTO" &&
                        products.consignmentStatus != "OUT_FOR_DELIVERY" &&
                        products.consignmentStatus != "HOTC" &&
                        products.consignmentStatus != "UNDELIVERED" &&
                        products.consignmentStatus !=
                        "CANCELLATION_INITIATED" &&
                        products.consignmentStatus != "PAYMENT_TIMEOUT" &&
                        products.consignmentStatus != "PICK_CONFIRMED" &&
                        products.consignmentStatus != "ORDER_UNCOLLECTED" && (
                          <React.Fragment>
                            {/* <div className={styles.rateThisItem}>
                              Rate this item
                            </div> */}
                            {/* <div
                              className={styles.ratingReviewHolder}
                              onClick={val =>
                                this.writeReview(products.productcode)
                              }
                            >
                              <Icon image={rating} size={25} />
                              <div className={styles.marginIcon} />
                              <Icon image={rating} size={25} />
                              <div className={styles.marginIcon} />
                              <Icon image={rating} size={25} />
                              <div className={styles.marginIcon} />
                              <Icon image={rating} size={25} />
                              <div className={styles.marginIcon} />
                              <Icon image={rating} size={25} />
                            </div> */}
                            <div
                              className={
                                products.consignmentStatus === "DELIVERED"
                                  ? styles.boxReview
                                  : styles.boxReviewMargin
                              }
                            >
                              <div
                                className={styles.reviewText}
                                onClick={val =>
                                  this.writeReview(products.productcode)
                                }
                              >
                                WRITE A REVIEW
                              </div>
                            </div>
                          </React.Fragment>
                        )}

                      {products.consignmentStatus != "DELIVERED" &&
                        products.consignmentStatus != "ORDER_COLLECTED" &&
                        products.selectedDeliveryMode.code != CLICK_COLLECT &&
                        products.consignmentStatus != "PAYMENT_TIMEOUT" &&
                        products.consignmentStatus != "PAYMENT_PENDING" &&
                        products.consignmentStatus != "PAYMENT_SUCCESSFUL" &&
                        products.consignmentStatus != "PAYMENT_FAILED" &&
                        products.consignmentStatus !=
                        "RMS_VERIFICATION_PENDING" &&
                        products.price &&
                        products.price != 0.01 && (
                          <div className={styles.orderStatusVertical}>
                            {/* This block of code needs to be duplicated below for CNC as well */}

                            <OrderStatusVertical
                              isCNC={false}
                              statusMessageList={products.statusDisplayMsg}
                              logisticName={products.logisticName}
                              trackingAWB={products.trackingAWB}
                              showShippingDetails={
                                this.props.showShippingDetails
                              }
                              orderCode={orderDetails.orderId}
                              returnMode={products.returnMode}
                              returnType={products.returnType}
                              mediationRequired={products.mediationRequired}
                              paymentMethod={orderDetails.paymentMethod}
                              consignmentStatus={products.consignmentStatus}
                            />

                            {/* Block of code ends here */}
                          </div>
                        )}
                      {products.selectedDeliveryMode &&
                        products.selectedDeliveryMode.code === CLICK_COLLECT &&
                        products.storeDetails && (
                          <React.Fragment>
                            <div className={styles.greyishLine}>
                              {this.props.orderDetails.statusDisplay && (
                                <div className={styles.commonTitle}>
                                  <span className={styles.width20}>Status</span>
                                  <span className={styles.colon}>:</span>
                                  <span className={styles.width75}>
                                    {/* {this.props.orderDetails.statusDisplay} */}
                                    {products.statusDisplay}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className={styles.commonTitle}>
                              <span className={styles.width20}>
                                Store Details
                              </span>
                              <span className={styles.colon}>:</span>
                              <span className={styles.width75}>
                                {/* <div className={styles.orderStatusVertical}>
                          <div className={styles.header}>Store details:</div>
                        <div className={styles.row}>
                           */}
                                {products.storeDetails.displayName &&
                                  products.storeDetails.displayName !=
                                  undefined &&
                                  products.storeDetails.displayName !=
                                  "undefined" && (
                                    <span>
                                      {products.storeDetails.displayName} ,
                                    </span>
                                  )}{" "}
                                {products.storeDetails.returnAddress1 &&
                                  products.storeDetails.returnAddress1 !=
                                  undefined &&
                                  products.storeDetails.returnAddress1 !=
                                  "undefined" && (
                                    <span>
                                      {products.storeDetails.returnAddress1} ,
                                    </span>
                                  )}{" "}
                                {products.storeDetails.returnAddress2 &&
                                  products.storeDetails.returnAddress2 !=
                                  undefined &&
                                  products.storeDetails.returnAddress2 !=
                                  "undefined" && (
                                    <span>
                                      {products.storeDetails.returnAddress2}
                                    </span>
                                  )}{" "}
                                {/* </div>
                          <div className={styles.row}> */}
                                <span>
                                  {products.storeDetails.returnCity}{" "}
                                  {products.storeDetails.returnPin}
                                </span>
                              </span>
                            </div>
                            {/* </div> */}
                            <div className={styles.commonTitle}>
                              <span className={styles.width20}>
                                Store Timings
                              </span>
                              <span className={styles.colon}>:</span>
                              <span className={styles.width75}>
                                <div
                                  dangerouslySetInnerHTML={this.getStoreDateNTime(
                                    products.storeDetails.mplWorkingDays,
                                    products.storeDetails.mplOpeningTime,
                                    products.storeDetails.mplClosingTime
                                  )}
                                />
                              </span>
                            </div>
                          </React.Fragment>
                        )}
                      {products.selectedDeliveryMode &&
                        products.selectedDeliveryMode.code === CLICK_COLLECT &&
                        (orderDetails.orderDate && products.returnPolicy) && (
                          <React.Fragment>
                            <div className={styles.commonTitle}>
                              <span className={styles.width20}>Pickup</span>
                              <span className={styles.colon}>:</span>
                              <span className={styles.width75}>
                                <span>
                                  {this.getPickUpDate(
                                    orderDetails.orderDate,
                                    products.returnPolicy
                                  )}
                                </span>
                              </span>
                            </div>
                          </React.Fragment>
                        )}
                      {products.selectedDeliveryMode &&
                        products.selectedDeliveryMode.code === CLICK_COLLECT &&
                        (orderDetails.pickupPersonName ||
                          orderDetails.pickupPersonMobile) && (
                          <React.Fragment>
                            <div
                              className={
                                products.consignmentStatus == "ORDER_COLLECTED"
                                  ? styles.orderColleted
                                  : styles.storeDetails
                              }
                            >
                              <div className={styles.commonTitle}>
                                <span className={styles.width20}>
                                  Contact Details
                                </span>
                                <span className={styles.colon}>:</span>
                                <span className={styles.width75}>
                                  {/* <span>{orderDetails.pickupPersonName}</span> */}
                                  <span>{storeNumber}</span>
                                </span>
                              </div>
                            </div>

                            {/* <div className={styles.divider} /> */}

                            {products.price &&
                              products.price != 0.01 &&
                              products.consignmentStatus != "PAYMENT_TIMEOUT" &&
                              products.consignmentStatus != "PAYMENT_PENDING" &&
                              products.consignmentStatus !=
                              "PAYMENT_SUCCESSFUL" &&
                              products.consignmentStatus != "PAYMENT_FAILED" &&
                              products.consignmentStatus !=
                              "ORDER_COLLECTED" && (
                                <OrderStatusVertical
                                  trackingAWB={products.trackingAWB}
                                  courier={products.reverseLogisticName}
                                  logisticName={products.logisticName}
                                  isCNC={true}
                                  showShippingDetails={
                                    this.props.showShippingDetails
                                  }
                                  orderCode={orderDetails.orderId}
                                  returnMode={products.returnMode}
                                  returnType={products.returnType}
                                  statusMessageList={products.statusDisplayMsg}
                                  mediationRequired={products.mediationRequired}
                                  paymentMethod={orderDetails.paymentMethod}
                                  consignmentStatus={products.consignmentStatus}
                                />
                              )}
                          </React.Fragment>
                        )}
                      {products.installationDisplayMsg && !hideEIETrackDiagram && (
                        <React.Fragment>
                          <div className={styles.borderTop} />
                          <InstallationExperience
                            installationDisplayMsg={
                              products.installationDisplayMsg
                            }
                          />
                        </React.Fragment>
                      )}
                      {products.awbPopupLink === AWB_POPUP_FALSE && (
                        <div
                          className={
                            products.consignmentStatus != "PAYMENT_TIMEOUT" &&
                              products.consignmentStatus != "PAYMENT_PENDING" &&
                              products.consignmentStatus != "ORDER_COLLECTED"
                              ? styles.buttonHolder
                              : styles.buttonHolderForPaymentPending
                          }
                        >
                          <div className={styles.buttonHolderForUpdate}>
                            {/* showing write a review and cancel or return only for mobile */}
                            {!isReturned && (
                              <React.Fragment>
                                {/* showing write a review only for desktop */}
                              </React.Fragment>
                            )}
                            {/* showing cancel or return only for desktop */}
                            <DesktopOnly>
                              {products.cancel && (
                                <div
                                  className={styles.cancelProduct}
                                  onClick={() =>
                                    this.cancelItem(
                                      products.transactionId,
                                      products.USSID,
                                      products.sellerorderno,
                                      orderDetails.orderId,
                                      format(orderDetails.orderDate, dateFormat)
                                    )
                                  }
                                >
                                  {PRODUCT_CANCEL}
                                </div>
                              )}
                              {products.isReturned &&
                                isOrderReturnable && (
                                  <div
                                    className={styles.cancelProduct}
                                    onClick={() =>
                                      this.replaceItem(
                                        products.sellerorderno,
                                        orderDetails.paymentMethod,
                                        products.transactionId
                                      )
                                    }
                                  >
                                    {PRODUCT_RETURN}
                                  </div>
                                )}
                              {products.isReturnCancelable && (
                                <div
                                  className={styles.review}
                                  onClick={() =>
                                    this.cancelReturnRequest(
                                      products.transactionId,
                                      products.sellerorderno
                                    )
                                  }
                                >
                                  <div className={styles.CancelReturn}>
                                    Cancel Return Request
                                  </div>
                                </div>
                              )}
                              {/* in case of hotc show return option */}
                              {products.isReturned &&
                                products.isHOTCReturnable && (
                                  <div
                                    className={styles.productReturn}
                                    onClick={() =>
                                      this.confirmReturn(
                                        products.sellerorderno,
                                        products.transactionId
                                      )
                                    }
                                  >
                                    {PRODUCT_RETURN}
                                  </div>
                                )}
                              {products.isInvoiceAvailable &&
                                (products.consignmentStatus === "DELIVERED" ||
                                  products.consignmentStatus === "HOTC" ||
                                  products.consignmentStatus ===
                                  "ORDER_COLLECTED" ||
                                  products.consignmentStatus ===
                                  "RETURN_CANCELLED_CUS") && (
                                  <div
                                    className={styles.cancelProduct}
                                    onClick={() =>
                                      this.requestInvoice(
                                        products.transactionId,
                                        products.sellerorderno
                                      )
                                    }
                                  >
                                    {this.props.underlineButtonLabel}
                                  </div>
                                )}
                              {this.state.itemDetails && (
                                <div
                                  onClick={() =>
                                    this.redirectToCustomHelpPage()
                                  }
                                  className={styles.helpSupport}
                                >
                                  Help & Support
                                </div>
                              )}
                            </DesktopOnly>
                          </div>
                        </div>
                      )}

                      {products.awbPopupLink === AWB_POPUP_TRUE && (
                        <div
                          className={
                            products.consignmentStatus != "PAYMENT_TIMEOUT" &&
                              products.consignmentStatus != "PAYMENT_PENDING" &&
                              products.consignmentStatus != "ORDER_COLLECTED"
                              ? styles.buttonHolder
                              : styles.buttonHolderForPaymentPending
                          }
                        >
                          <div className={styles.buttonHolderForUpdate}>
                            <div className={styles.reviewHolder}>
                              {/* in case of hotc show return option */}
                              {products.isReturned &&
                                products.isHOTCReturnable && (
                                  <div
                                    className={styles.productReturn}
                                    onClick={() =>
                                      this.confirmReturn(
                                        products.sellerorderno,
                                        products.transactionId
                                      )
                                    }
                                  >
                                    {PRODUCT_RETURN}
                                  </div>
                                )}
                              {products.cancel && (
                                <div
                                  className={styles.review}
                                  onClick={() =>
                                    this.cancelItem(
                                      products.transactionId,
                                      products.USSID,
                                      products.sellerorderno,
                                      orderDetails.orderId,
                                      format(orderDetails.orderDate, dateFormat)
                                    )
                                  }
                                >
                                  <UnderLinedButton
                                    label={PRODUCT_CANCEL}
                                    color="#ff1744"
                                  />
                                </div>
                              )}
                              {products.isReturnCancelable && (
                                <div
                                  className={styles.review}
                                  onClick={() =>
                                    this.cancelReturnRequest(
                                      products.transactionId,
                                      products.sellerorderno
                                    )
                                  }
                                >
                                  <div className={styles.CancelReturn}>
                                    Cancel Return Request
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            {!this.state.itemDetails &&
              orderDetails && (
                <div className={styles.order}>
                  <OrderViewPaymentDetails
                    SubTotal={
                      orderDetails.orderAmount &&
                        orderDetails.orderAmount.bagTotal &&
                        orderDetails.orderAmount.bagTotal.value
                        ? Math.round(
                          orderDetails.orderAmount.bagTotal.value * 100
                        ) / 100
                        : "0.00"
                    }
                    DeliveryCharges={orderDetails.deliveryCharge}
                    Discount={
                      orderDetails.orderAmount &&
                        orderDetails.orderAmount.totalDiscountAmount &&
                        orderDetails.orderAmount.totalDiscountAmount.value
                        ? Math.round(
                          orderDetails.orderAmount.totalDiscountAmount.value *
                          100
                        ) / 100
                        : "0.00"
                    }
                    coupon={
                      orderDetails.orderAmount &&
                        orderDetails.orderAmount.couponDiscountAmount &&
                        orderDetails.orderAmount.couponDiscountAmount.value
                        ? Math.round(
                          orderDetails.orderAmount.couponDiscountAmount
                            .value * 100
                        ) / 100
                        : "0.00"
                    }
                    ConvenienceCharges={orderDetails.convenienceCharge}
                    Total={
                      orderDetails.orderAmount &&
                        orderDetails.orderAmount.paybleAmount &&
                        orderDetails.orderAmount.paybleAmount.value
                        ? Math.round(
                          orderDetails.orderAmount.paybleAmount.value * 100
                        ) / 100
                        : "0.00"
                    }
                    cliqCashAmountDeducted={
                      orderDetails && orderDetails.cliqCashAmountDeducted
                    }
                  />

                  <React.Fragment>
                    {this.state.itemDetails && (
                      <div
                        onClick={() => this.redirectToCustomHelpPage()}
                        className={styles.helpSupport}
                      >
                        Help & Support
                      </div>
                    )}

                    <OrderPaymentMethod
                      history={this.props.history}
                      deliveryAddress={orderDetails.deliveryAddress}
                      phoneNumber={
                        orderDetails.deliveryAddress &&
                        orderDetails.deliveryAddress.phone
                      }
                      paymentMethod={orderDetails.paymentMethod}
                      isCDA={orderDetails.isCDA}
                      orderId={orderDetails.orderId}
                      clickcollect={
                        orderDetails.products[0].selectedDeliveryMode.code ===
                          CLICK_COLLECT
                          ? true
                          : false
                      }
                      orderDetails={orderDetails}
                    //isInvoiceAvailable={products.isInvoiceAvailable}
                    //statusDisplay={products.statusDisplayMsg}
                    // request={() =>
                    //   this.requestInvoice(
                    //     products.transactionId,
                    //     products.sellerorderno
                    //   )
                    // }
                    />
                  </React.Fragment>
                </div>
              )}
          </div>
          {/* showing user details only for desktop */}
          <DesktopOnly>
            <div className={MyAccountStyles.userProfile}>
              <UserProfile
                image={userData && userData.imageUrl}
                userLogin={userData && userData.userName}
                loginType={userData && userData.loginType}
                onClick={() => this.renderToAccountSetting()}
                firstName={
                  userData &&
                  userData.firstName &&
                  userData.firstName.trim().charAt(0)
                }
                heading={
                  userData && userData.firstName && `${userData.firstName} `
                }
                lastName={
                  userData && userData.lastName && `${userData.lastName}`
                }
                userAddress={this.props.userAddress}
              />
            </div>
          </DesktopOnly>
        </div>
      </div>
    );
  }
}
OrderDetails.propTypes = {
  orderDetails: PropTypes.arrayOf(
    PropTypes.shape({
      orderDate: PropTypes.string,
      orderId: PropTypes.string,
      totalOrderAmount: PropTypes.string,
      subTotal: PropTypes.string,
      totalDiscounts: PropTypes.string,
      convenienceCharge: PropTypes.string,
      paymentMethod: PropTypes.string,
      billingAddress: PropTypes.arrayOf(
        PropTypes.shape({
          addressLine1: PropTypes.string,
          town: PropTypes.string,
          state: PropTypes.string,
          postalcode: PropTypes.string
        })
      )
    })
  ),
  requestInvoice: PropTypes.func,
  underlineButtonLabel: PropTypes.string,
  underlineButtonColour: PropTypes.string
};
OrderDetails.defaultProps = {
  underlineButtonLabel: "Request Invoice",
  underlineButtonColour: "#181818"
};
