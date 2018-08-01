import React from "react";
import styles from "./OrderDetails.css";
import OrderPlacedAndId from "./OrderPlacedAndId.js";
import OrderCard from "./OrderCard.js";
import OrderDelivered from "./OrderDelivered.js";
import OrderViewPaymentDetails from "./OrderViewPaymentDetails";
import OrderPaymentMethod from "./OrderPaymentMethod";
import OrderStatusVertical from "./OrderStatusVertical";
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
import { SUCCESS, HOME_ROUTER } from "../../lib/constants";
import ProfileMenu from "./ProfileMenu";
import UserProfile from "./UserProfile";
import * as UserAgent from "../../lib/UserAgent.js";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
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
  CANCEL
} from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_MY_ACCOUNT_ORDER_DETAILS
} from "../../lib/adobeUtils";
const dateFormat = "DD MMM YYYY";
const PRODUCT_RETURN = "Return";
const RETURN = "RETURN";
const PRODUCT_CANCEL = "Cancel";
const AWB_POPUP_TRUE = "Y";
const AWB_POPUP_FALSE = "N";
const CLICK_COLLECT = "click-and-collect";
export default class OrderDetails extends React.Component {
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
    if (sellerorderno) {
      let isCOD = false;
      if (paymentMethod === CASH_ON_DELIVERY) {
        isCOD = true;
      }
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${sellerorderno}${RETURN_LANDING}${RETURNS_REASON}`,
        state: {
          isCOD,
          authorizedRequest: true,
          transactionId: transactionId
        }
      });
    }
  }
  cancelItem(transactionId, ussid, orderCode, orderId, orderDate) {
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
    this.props.history.push(
      `${SEARCH_RESULTS_PAGE}p-${productCode.toLowerCase()}/${PRODUCT_REVIEWS_PATH_SUFFIX}`
    );
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
      this.props.fetchOrderDetails(orderCode);
      this.props.setHeaderText(`#${orderCode}`);
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
      this.props.setHeaderText(`#${orderCode}`);
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

    if (UserAgent.checkUserAgentIsMobile()) {
      this.props.history.push(LOGIN_PATH);
      return null;
    } else {
      if (this.props.showAuthPopUp) {
        this.props.history.push(HOME_ROUTER);
        this.props.showAuthPopUp();
        return null;
      }
    }
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
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    const userData = JSON.parse(userDetails);
    const orderDetails = this.props.orderDetails;
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
            {orderDetails &&
              orderDetails.products.map((products, i) => {
                let isOrderReturnable = false;
                let isReturned = false;

                if (
                  products.statusDisplayMsg
                    .map(val => {
                      return val.key;
                    })
                    .includes(RETURN)
                )
                  isReturned = products.statusDisplayMsg
                    .map(val => {
                      return val.key;
                    })
                    .includes(RETURN);

                each(products && products.statusDisplayMsg, orderStatus => {
                  each(
                    orderStatus &&
                      orderStatus.value &&
                      orderStatus.value.statusList,
                    status => {
                      if (status.responseCode === "DELIVERED") {
                        isOrderReturnable = true;
                      }
                    }
                  );
                });
                return (
                  <div className={styles.order} key={i}>
                    <MobileOnly>
                      <div className={styles.orderIdHolder}>
                        <OrderPlacedAndId
                          placedTime={format(
                            orderDetails.orderDate,
                            dateFormat
                          )}
                          orderId={orderDetails.orderId}
                        />
                      </div>
                    </MobileOnly>
                    <DesktopOnly>
                      <div className={styles.orderIdAndPlacedHolder}>
                        <div className={styles.orderIdHolder}>
                          <span className={styles.highlitedText}>
                            Order Placed:
                          </span>
                          <span>
                            {format(orderDetails.orderDate, dateFormat)}
                          </span>
                        </div>
                        <div className={styles.orderIdHolder}>
                          <span className={styles.highlitedText}>
                            Order ID:
                          </span>
                          <span>{orderDetails.orderId}</span>
                        </div>
                        {this.props.history && (
                          <div className={styles.buttonGoToBack}>
                            <UnderLinedButton
                              size="14px"
                              fontFamily="light"
                              color="#000000"
                              label="Back to Order History"
                              onClick={() => this.backToOrderHistory()}
                            />
                          </div>
                        )}
                      </div>
                    </DesktopOnly>
                    <OrderCard
                      imageUrl={products.imageURL}
                      productBrand={products.productBrand}
                      price={products.price}
                      discountPrice={""}
                      productName={products.productName}
                      isGiveAway={products.isGiveAway}
                      onClick={() => this.onClickImage(products.productcode)}
                    />
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
                                orderDetails.orderAmount.paybleAmount.value *
                                  100
                              ) / 100
                            : "0.00"
                        }
                        cliqCashAmountDeducted={
                          orderDetails && orderDetails.cliqCashAmountDeducted
                        }
                      />
                    </div>
                    <OrderPaymentMethod
                      phoneNumber={
                        orderDetails.deliveryAddress &&
                        orderDetails.deliveryAddress.phone
                      }
                      paymentMethod={orderDetails.paymentMethod}
                      isInvoiceAvailable={products.isInvoiceAvailable}
                      statusDisplay={products.statusDisplayMsg}
                      request={() =>
                        this.requestInvoice(
                          products.transactionId,
                          products.sellerorderno
                        )
                      }
                    />
                    {orderDetails.billingAddress &&
                      Object.keys(orderDetails.billingAddress).length !== 0 && (
                        <OrderDelivered
                          deliveredAddress={`${
                            orderDetails.billingAddress.addressLine1
                              ? orderDetails.billingAddress.addressLine1
                              : ""
                          } ${
                            orderDetails.billingAddress.town
                              ? orderDetails.billingAddress.town
                              : ""
                          } ${
                            orderDetails.billingAddress.state
                              ? orderDetails.billingAddress.state
                              : ""
                          } ${
                            orderDetails.billingAddress.postalcode
                              ? orderDetails.billingAddress.postalcode
                              : ""
                          }`}
                        />
                      )}
                    {products.statusDisplayMsg &&
                      products.selectedDeliveryMode.code !== CLICK_COLLECT && (
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
                    {products.selectedDeliveryMode.code === CLICK_COLLECT &&
                      products.storeDetails && (
                        <div className={styles.orderStatusVertical}>
                          <div className={styles.header}>Store details:</div>
                          <div className={styles.row}>
                            {products.storeDetails.displayName &&
                              products.storeDetails.displayName !== undefined &&
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
                          </div>
                          <div className={styles.row}>
                            {products.storeDetails.returnCity}{" "}
                            {products.storeDetails.returnPin}
                          </div>
                        </div>
                      )}
                    {products.selectedDeliveryMode.code === CLICK_COLLECT &&
                      (orderDetails.pickupPersonName ||
                        orderDetails.pickupPersonMobile) && (
                        <div className={styles.orderStatusVertical}>
                          <div className={styles.header}>Pickup details:</div>
                          <div className={styles.row}>
                            {orderDetails.pickupPersonName}
                          </div>
                          <div className={styles.row}>
                            {orderDetails.pickupPersonMobile}
                          </div>
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
                                      format(orderDetails.orderDate, dateFormat)
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
                            {products.isReturned && (
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
                  </div>
                );
              })}
          </div>
          {/* showing user details only for desktop */}
          <DesktopOnly>
            <div className={MyAccountStyles.userProfile}>
              <UserProfile
                image={userData.imageUrl}
                userLogin={userData.userName}
                loginType={userData.loginType}
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
  requestInvoice: PropTypes.func
};
