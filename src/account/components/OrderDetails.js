import React from "react";
import styles from "./OrderDetails.css";
import OrderPlacedAndId from "./OrderPlacedAndId.js";
import OrderCard from "./OrderCard.js";
import OrderDelivered from "./OrderDelivered.js";
import OrderViewPaymentDetails from "./OrderViewPaymentDetails";
import OrderPaymentMethod from "./OrderPaymentMethod";
import OrderStatusVertical from "./OrderStatusVerticalV2";
//import OrderStatusVertical from "./OrderStatusVertical";
import OrderStatusHorizontal from "./OrderStatusHorizontal";
import Button from "../../xelpmoc-core/Button";
import OrderReturn from "./OrderReturn.js";
import PropTypes from "prop-types";
import format from "date-fns/format";
import each from "lodash.foreach";
import queryString from "query-string";
import * as Cookie from "../../lib/Cookie";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import { SUCCESS, HELP_URL, HOME_ROUTER } from "../../lib/constants";
import ProfileMenu from "./ProfileMenu";
import UserProfile from "./UserProfile";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import { Redirect } from "react-router-dom";
import FillupRatingOrder from "../../pdp/components/FillupRatingOrder.js";
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
  SEARCH_RESULTS_PAGE,
  PRODUCT_REVIEWS_PATH_SUFFIX,
  MY_ACCOUNT_ORDERS_PAGE,
  MY_ACCOUNT_PAGE,
  CANCEL,
  WRITE_REVIEW
} from "../../lib/constants";
import {
  setDataLayerForMyAccountDirectCalls,
  ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL
} from "../../lib/adobeUtils";
import * as UserAgent from "../../lib/UserAgent.js";
const dateFormat = "DD MMM YYYY";
const PRODUCT_RETURN = "Return/Replace Order";
const RETURN = "RETURN";
const PRODUCT_CANCEL = "Cancel Order";
const PRODUCT_RETURN_WINDOW_CLOSED =
  "You cannot return this product as the window for returns has expired";
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
    setDataLayerForMyAccountDirectCalls(ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL);
    if (sellerorderno) {
      let isCOD = false;
      let isPaypal = false;
      if (paymentMethod === CASH_ON_DELIVERY) {
        isCOD = true;
      }
      if (paymentMethod === PAY_PAL) {
        isPaypal = true;
      }
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
  getDay(mplWorkingDays) {
    let mplWorkingDaysInArray = mplWorkingDays.split(",");
    let dayText = "";
    let dayTextArr = [];
    mplWorkingDaysInArray.map((day, index) => {
      switch (day) {
        case "1":
          dayText = "Mon";
          break;
        case "2":
          dayText = "Tue";
          break;
        case "3":
          dayText = "Wed";
          break;
        case "4":
          dayText = "Thu";
          break;
        case "5":
          dayText = "Fri";
          break;
        case "6":
          dayText = "Sat";
          break;
        case "0":
          dayText = "Sun";
          break;
        default:
          dayText = "";
          break;
      }
      dayTextArr.push(dayText);
    });
    let dayTextArrToString = dayTextArr.toString();
    return dayTextArrToString;
  }
  getStoreDateNTime(mplWorkingDays, mplOpeningTime, mplClosingTime) {
    let getDaysText = this.getDay(mplWorkingDays);
    let mplOpeningTimeText = "";
    let mplClosingTimeText = "";
    // let displayDateNTime = "";
    if (parseFloat(mplOpeningTime) < 12) {
      mplOpeningTimeText = mplOpeningTime + " AM";
    } else {
      let mplOpeningTimeInMinutes = parseFloat(mplOpeningTime) * 60;
      let mplOpeningTimeInTwelveHoursFormat = mplOpeningTimeInMinutes - 720; // 12 * 60
      let mplOpeningTimeConverted = mplOpeningTimeInTwelveHoursFormat / 60;
      mplOpeningTimeText = mplOpeningTimeConverted.toFixed(2) + " PM";
    }
    if (parseFloat(mplClosingTime) < 12) {
      mplClosingTimeText = mplClosingTime + " AM";
    } else {
      let mplClosingTimeInMinutes = parseFloat(mplClosingTime) * 60;
      let mplClosingTimeInTwelveHoursFormat = mplClosingTimeInMinutes - 720; // 12 * 60
      let mplClosingTimeConverted = mplClosingTimeInTwelveHoursFormat / 60;
      mplClosingTimeText = mplClosingTimeConverted.toFixed(2) + " PM";
    }
    let displayDateNTime =
      getDaysText + "<br />" + mplOpeningTimeText + " - " + mplClosingTimeText;
    return { __html: displayDateNTime };
  }
  redirectToHelpPage() {
    this.props.history.push(`${HELP_URL}`);
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
    if (
      userDetails &&
      customerCookie &&
      this.props.match.path === `${ORDER_PREFIX}`
    ) {
      const orderCode = queryString.parse(this.props.location.search).orderCode;
      const transactionId = queryString.parse(this.props.location.search)
        .transactionId;
      if (transactionId) {
        this.props.fetchOrderItemDetails(orderCode, transactionId);
        this.props.setHeaderText("Item Details");
      } else {
        this.props.fetchOrderDetails(orderCode);
        this.props.setHeaderText(`#${orderCode}`);
      }
    } else if (
      userDetails &&
      customerCookie &&
      this.props.match.path === `${SHORT_URL_ORDER_DETAIL}`
    ) {
      const orderCode = this.props.match.params.orderCode;
      this.props.fetchOrderDetails(orderCode);
      this.props.setHeaderText(`#${orderCode}`);
    }
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
    if (nextProps.sendInvoiceSatus === SUCCESS) {
      this.props.displayToast("Invoice has been sent");
    }
  }
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
            {/* {!this.state.itemDetails &&
          orderDetails && (
            <div className={styles.orderIdHolder}>
              <OrderPlacedAndId
                placedTime={orderPlacedDate}
                orderId={orderDetails.orderId}
              />
            </div>
          )} */}
            {orderDetails &&
              orderDetails.products.map((products, i) => {
                let isOrderReturnable = false;
                let isReturned = false;

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
                    }
                  );
                });
                return (
                  <React.Fragment key={i}>
                    <div className={styles.order} key={i}>
                      <MobileOnly>
                        {!this.state.itemDetails && (
                          <div className={styles.itemDetails}>Item Details</div>
                        )}
                        {this.state.itemDetails && (
                          <div className={styles.orderItemDateID}>
                            <div>Order placed on : {orderPlacedDate}</div>
                            <div>Order ID : {orderDetails.orderId}</div>
                            <div>Transaction ID : {products.transactionId}</div>
                          </div>
                        )}
                      </MobileOnly>
                      <DesktopOnly>
                        {this.state.itemDetails && (
                          <div className={styles.orderItemDateID}>
                            <div>Order placed on : {orderPlacedDate}</div>
                            <div>Order ID : {orderDetails.orderId}</div>
                            <div>Transaction ID : {products.transactionId}</div>
                          </div>
                        )}
                        <div className={styles.orderIdAndPlacedHolder}>
                          <div className={styles.orderIdHolder}>
                            <span className={styles.highlightedText}>
                              Order placed on:{" "}
                            </span>
                            <span>
                              {format(orderDetails.orderDate, dateFormat)}
                            </span>
                          </div>
                          <div className={styles.orderIdHolder}>
                            <span className={styles.highlightedText}>
                              Order ID:{" "}
                            </span>
                            <span>{orderDetails.orderId}</span>
                          </div>
                        </div>
                        <div>
                          {this.props.history && (
                            <div
                              className={styles.buttonGoToBack}
                              onClick={() => this.backToOrderHistory()}
                            >
                              Back to Order History
                              {/* <UnderLinedButton
                              size="14px"
                              fontFamily="light"
                              color="#000000"
                              label="Back to Order History"
                              onClick={() => this.backToOrderHistory()}
                            /> */}
                            </div>
                          )}
                        </div>
                        {!this.state.itemDetails && (
                          <div className={styles.itemDetails}>Item Details</div>
                        )}
                      </DesktopOnly>
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
                        onClick={() => this.onClickImage(products.productcode)}
                        quantity={true}
                        selectedDeliveryMode={products.selectedDeliveryMode}
                        sellerName={products.sellerName}
                        consignmentStatus={products.consignmentStatus}
                        deliveryDate={products.deliveryDate}
                        productSize={products.productSize}
                        productColourName={products.productColourName}
                        showEDD="Y"
                      />
                      {/* {orderDetails.deliveryAddress &&
                      Object.keys(orderDetails.deliveryAddress).length !==
                        0 && (
                        <OrderDelivered
                          deliveredAddress={`${
                            orderDetails.deliveryAddress.addressLine1
                              ? orderDetails.deliveryAddress.addressLine1
                              : ""
                          } ${
                            orderDetails.deliveryAddress.town
                              ? orderDetails.deliveryAddress.town
                              : ""
                          } ${
                            orderDetails.deliveryAddress.state
                              ? orderDetails.deliveryAddress.state
                              : ""
                          } ${
                            orderDetails.deliveryAddress.postalcode
                              ? orderDetails.deliveryAddress.postalcode
                              : ""
                          }`}
                          deliveredAddress1={`${
                            orderDetails.deliveryAddress.firstName
                              ? orderDetails.deliveryAddress.firstName
                              : ""
                          } ${
                            orderDetails.deliveryAddress.lastName
                              ? orderDetails.deliveryAddress.lastName
                              : ""
                          }`}
                          deliveredAddress2={`${
                            orderDetails.deliveryAddress.addressLine1
                              ? orderDetails.deliveryAddress.addressLine1
                              : ""
                          }`}
                          deliveredAddress3={`
                          ${
                            orderDetails.deliveryAddress.town
                              ? orderDetails.deliveryAddress.town
                              : ""
                          }, ${
                            orderDetails.deliveryAddress.state
                              ? orderDetails.deliveryAddress.state
                              : ""
                          } ${
                            orderDetails.deliveryAddress.postalcode
                              ? orderDetails.deliveryAddress.postalcode
                              : ""
                          }`}
                          orderDeliveryHeaderText={"Delivered to"}
                          deliveredDate={products.deliveryDate}
                          soldBy={products.sellerName}
                        />
                      )} */}
                      {products.statusDisplayMsg &&
                        products.consignmentStatus !== "DELIVERED" &&
                        (products.selectedDeliveryMode &&
                          products.selectedDeliveryMode.code !==
                            CLICK_COLLECT) && (
                          <div className={styles.orderStatusVertical}>
                            {/* This block of code needs to be duplicated below for CNC as well */}
                            {!products.statusDisplayMsg
                              .map(val => {
                                return val.key;
                              })
                              .includes(RETURN) && (
                              <OrderStatusVertical
                                isCNC={false}
                                statusMessageList={products.statusDisplayMsg}
                                logisticName={products.logisticName}
                                trackingAWB={products.trackingAWB}
                                showShippingDetails={
                                  this.props.showShippingDetails
                                }
                                orderCode={orderDetails.orderId}
                              />
                            )}
                            {products.statusDisplayMsg
                              .map(val => {
                                return val.key;
                              })
                              .includes(RETURN) && (
                              <OrderStatusHorizontal
                                trackingAWB={products.trackingAWB}
                                courier={products.reverseLogisticName}
                                statusMessageList={products.statusDisplayMsg.filter(
                                  val => {
                                    return val.key === RETURN;
                                  }
                                )}
                              />
                            )}
                            {/* Block of code ends here */}
                          </div>
                        )}
                      {products.selectedDeliveryMode &&
                        products.selectedDeliveryMode.code === CLICK_COLLECT &&
                        products.storeDetails && (
                          <React.Fragment>
                            {this.props.orderDetails.statusDisplay && (
                              <div className={styles.commonTitle}>
                                <span className={styles.width30}>
                                  <span className={styles.ffsemibold}>
                                    Status:{" "}
                                  </span>
                                </span>
                                <span className={styles.width70}>
                                  {/* {this.props.orderDetails.statusDisplay} */}
                                  {products.statusDisplay}
                                </span>
                              </div>
                            )}
                            <div className={styles.commonTitle}>
                              <span className={styles.width30}>
                                <span className={styles.ffsemibold}>
                                  Store Details:{" "}
                                </span>
                              </span>
                              <span className={styles.width70}>
                                {/* <div className={styles.orderStatusVertical}>
                          <div className={styles.header}>Store details:</div>
                        <div className={styles.row}>
                           */}
                                {products.storeDetails.displayName &&
                                  products.storeDetails.displayName !==
                                    undefined &&
                                  products.storeDetails.displayName !==
                                    "undefined" && (
                                    <span>
                                      {products.storeDetails.displayName} ,
                                    </span>
                                  )}{" "}
                                {products.storeDetails.returnAddress1 &&
                                  products.storeDetails.returnAddress1 !==
                                    undefined &&
                                  products.storeDetails.returnAddress1 !==
                                    "undefined" && (
                                    <span>
                                      {products.storeDetails.returnAddress1} ,
                                    </span>
                                  )}{" "}
                                {products.storeDetails.returnAddress2 &&
                                  products.storeDetails.returnAddress2 !==
                                    undefined &&
                                  products.storeDetails.returnAddress2 !==
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
                              <span className={styles.width30}>
                                <span className={styles.ffsemibold}>
                                  Open From :
                                </span>
                              </span>
                              <span className={styles.width70}>
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
                        (orderDetails.pickupPersonName ||
                          orderDetails.pickupPersonMobile) && (
                          // <div className={styles.orderStatusVertical}>
                          //   <div className={styles.header}>Pickup details:</div>
                          //   <div className={styles.row}>
                          //     {orderDetails.pickupPersonName}
                          //   </div>
                          //   <div className={styles.row}>
                          //     {orderDetails.pickupPersonMobile}
                          //   </div>
                          <React.Fragment>
                            <div className={styles.commonTitle}>
                              <span className={styles.width30}>
                                <span className={styles.ffsemibold}>
                                  Pickup Details:{" "}
                                </span>
                              </span>
                              <span className={styles.width70}>
                                <span>
                                  Ph. {orderDetails.pickupPersonMobile}
                                </span>
                                <br />
                                <span>{orderDetails.pickupPersonName}</span>
                              </span>
                            </div>
                            <div className={styles.divider} />
                            <div>
                              {/* This block of code needs to be duplicated above for non CNC as well */}
                              {!products.statusDisplayMsg
                                .map(val => {
                                  return val.key;
                                })
                                .includes(RETURN) && (
                                <OrderStatusVertical
                                  isCNC={true}
                                  statusMessageList={products.statusDisplayMsg}
                                  logisticName={products.logisticName}
                                  trackingAWB={products.trackingAWB}
                                  showShippingDetails={
                                    this.props.showShippingDetails
                                  }
                                  orderCode={orderDetails.orderId}
                                />
                              )}
                              {products.statusDisplayMsg
                                .map(val => {
                                  return val.key;
                                })
                                .includes(RETURN) && (
                                <OrderStatusHorizontal
                                  trackingAWB={products.trackingAWB}
                                  courier={products.reverseLogisticName}
                                  statusMessageList={products.statusDisplayMsg.filter(
                                    val => {
                                      return val.key === RETURN;
                                    }
                                  )}
                                />
                              )}
                              {/* Block of code ends here */}
                            </div>
                          </React.Fragment>
                        )}

                      {products.awbPopupLink === AWB_POPUP_FALSE && (
                        <div className={styles.buttonHolder}>
                          <div className={styles.buttonHolderForUpdate}>
                            {/* showing write a review and cancel or return only for mobile */}
                            <MobileOnly>
                              <div className={styles.replaceHolder}>
                                {products.isReturned &&
                                  isOrderReturnable && (
                                    <div
                                      className={styles.review}
                                      onClick={() =>
                                        this.replaceItem(
                                          products.sellerorderno,
                                          orderDetails.paymentMethod,
                                          products.transactionId
                                        )
                                      }
                                    >
                                      <UnderLinedButton
                                        label={PRODUCT_RETURN}
                                        color="#000"
                                      />
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
                                        format(
                                          orderDetails.orderDate,
                                          dateFormat
                                        )
                                      )
                                    }
                                  >
                                    <UnderLinedButton
                                      label={PRODUCT_CANCEL}
                                      color="#000"
                                    />
                                  </div>
                                )}
                              </div>
                            </MobileOnly>
                            {!isReturned && (
                              <React.Fragment>
                                <MobileOnly>
                                  <div className={styles.reviewHolder}>
                                    <div
                                      className={styles.replace}
                                      onClick={val =>
                                        this.writeReview(products.productcode)
                                      }
                                    >
                                      <UnderLinedButton
                                        label="Write a review"
                                        color="#ff1744"
                                      />
                                    </div>
                                  </div>
                                </MobileOnly>
                                {/* showing write a review only for desktop */}
                                <DesktopOnly>
                                  <div className={styles.writeReviedButton}>
                                    <Button
                                      label={"Write a review"}
                                      width={147}
                                      height={36}
                                      borderColor={"#000000"}
                                      borderRadius={20}
                                      backgroundColor={"#ffffff"}
                                      onClick={val =>
                                        this.writeReview(products.productcode)
                                      }
                                      textStyle={{
                                        color: "#000000",
                                        fontSize: 14,
                                        fontFamily: "regular"
                                      }}
                                    />
                                  </div>
                                </DesktopOnly>
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
                              {isOrderReturnable &&
                                products.isReturned === false && (
                                  <div className={styles.returnClosed}>
                                    {PRODUCT_RETURN_WINDOW_CLOSED}
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
                            </DesktopOnly>
                          </div>
                        </div>
                      )}
                      {products.awbPopupLink === AWB_POPUP_TRUE && (
                        <div className={styles.buttonHolder}>
                          <div className={styles.buttonHolderForUpdate}>
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
                                <UnderLinedButton
                                  label="Update Return Details"
                                  color="#000"
                                />
                              </div>
                            </div>
                            <div className={styles.reviewHolder}>
                              {products.isReturned &&
                                isOrderReturnable && (
                                  <div
                                    className={styles.review}
                                    onClick={() =>
                                      this.replaceItem(
                                        products.sellerorderno,
                                        orderDetails.paymentMethod,
                                        products.transactionId
                                      )
                                    }
                                  >
                                    <UnderLinedButton
                                      label={PRODUCT_RETURN}
                                      color="#ff1744"
                                    />
                                  </div>
                                )}
                              {!products.isReturned && (
                                <div className={styles.review}>
                                  Return window is Closed
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
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.itemDetails && (
                        <div
                          onClick={() => this.redirectToHelpPage()}
                          className={styles.helpSupport}
                        >
                          Help & Support
                          <span className={styles.rightArrow} />
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            {!this.state.itemDetails &&
              orderDetails && (
                <div className={styles.order}>
                  <div className={styles.payment}>
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
                              orderDetails.orderAmount.totalDiscountAmount
                                .value * 100
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
                  </div>
                  <OrderPaymentMethod
                    history={this.props.history}
                    deliveryAddress={orderDetails.deliveryAddress}
                    phoneNumber={
                      orderDetails.deliveryAddress &&
                      orderDetails.deliveryAddress.phone
                    }
                    paymentMethod={orderDetails.paymentMethod}
                    //isInvoiceAvailable={products.isInvoiceAvailable}
                    //statusDisplay={products.statusDisplayMsg}
                    // request={() =>
                    //   this.requestInvoice(
                    //     products.transactionId,
                    //     products.sellerorderno
                    //   )
                    // }
                  />
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
