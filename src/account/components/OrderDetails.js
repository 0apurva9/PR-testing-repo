import React from "react";
import styles from "./OrderDetails.css";
import OrderPlacedAndId from "./OrderPlacedAndId.js";
import OrderCard from "./OrderCard.js";
import OrderDelivered from "./OrderDelivered.js";
import OrderViewPaymentDetails from "./OrderViewPaymentDetails";
import OrderPaymentMethod from "./OrderPaymentMethod";
import OrderStatusVertical from "./OrderStatusVertical";
import OrderReturn from "./OrderReturn.js";
import PropTypes from "prop-types";
import moment from "moment";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import * as Cookie from "../../lib/Cookie";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import { HOME_ROUTER } from "../../lib/constants";
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
  CANCEL
} from "../../lib/constants";
const dateFormat = "DD MMM YYYY";
const PRODUCT_Returned = "Return Product";
const PRODUCT_Cancel = "Cancel Product";
const AWB_POPUP_TRUE = "Y";
const AWB_POPUP_FALSE = "N";
export default class OrderDetails extends React.Component {
  requestInvoice(ussid, sellerOrderNo) {
    if (this.props.sendInvoice) {
      this.props.sendInvoice(ussid, sellerOrderNo);
    }
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
  canelItem(transactionId, ussid, orderCode) {
    this.props.history.push({
      pathname: `${CANCEL}/${orderCode}`,
      state: {
        transactionId: transactionId,
        ussid: ussid
      }
    });
  }
  writeReview(productCode) {
    this.props.history.push(
      `${SEARCH_RESULTS_PAGE}p-${productCode.toLowerCase()}${PRODUCT_REVIEWS_PATH_SUFFIX}`
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
    } else if (
      userDetails &&
      customerCookie &&
      this.props.match.path === `${SHORT_URL_ORDER_DETAIL}`
    ) {
      const orderCode = this.props.match.params.orderCode;
      this.props.fetchOrderDetails(orderCode);
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
  navigateToLogin() {
    return <Redirect to={LOGIN_PATH} />;
  }
  render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    const orderDetails = this.props.orderDetails;
    return (
      <div className={styles.base}>
        {orderDetails &&
          orderDetails.products.map((products, i) => {
            return (
              <div className={styles.order} key={i}>
                <div className={styles.orderIdHolder}>
                  <OrderPlacedAndId
                    placedTime={moment(orderDetails.orderDate).format(
                      dateFormat
                    )}
                    orderId={orderDetails.orderId}
                  />
                </div>

                <OrderCard
                  imageUrl={products.imageURL}
                  price={products.price}
                  discountPrice={""}
                  productName={products.productName}
                />

                <div className={styles.payment}>
                  <OrderViewPaymentDetails
                    SubTotal={orderDetails.subTotal}
                    DeliveryCharges={orderDetails.deliveryCharge}
                    Discount={orderDetails.totalDiscount}
                    ConvenienceCharges={orderDetails.convenienceCharge}
                    Total={orderDetails.totalOrderAmount}
                  />
                </div>

                <OrderPaymentMethod
                  phoneNumber={
                    orderDetails.billingAddress &&
                    orderDetails.billingAddress.phone
                  }
                  paymentMethod={orderDetails.paymentMethod}
                  isInvoiceAvailable={products.isInvoiceAvailable}
                  request={() =>
                    this.requestInvoice(products.USSID, products.sellerorderno)
                  }
                />
                {orderDetails.billingAddress && (
                  <OrderDelivered
                    deliveredAddress={`${
                      orderDetails.billingAddress.addressLine1
                    } ${orderDetails.billingAddress.town} ${
                      orderDetails.billingAddress.state
                    } ${orderDetails.billingAddress.postalcode}`}
                  />
                )}
                {products.statusDisplayMsg && (
                  <div className={styles.orderStatusVertical}>
                    <OrderStatusVertical
                      statusMessageList={
                        products.statusDisplayMsg[0].value.statusList[0]
                          .statusMessageList
                      }
                    />
                  </div>
                )}
                {products.awbPopupLink === AWB_POPUP_FALSE && (
                  <div className={styles.buttonHolder}>
                    {products.isReturned && (
                      <OrderReturn
                        buttonLabel={PRODUCT_Returned}
                        isEditable={true}
                        replaceItem={() =>
                          this.replaceItem(
                            products.sellerorderno,
                            orderDetails.paymentMethod,
                            products.transactionId
                          )
                        }
                        writeReview={val =>
                          this.writeReview(products.productcode)
                        }
                      />
                    )}
                    {products.cancel && (
                      <OrderReturn
                        buttonLabel={PRODUCT_Cancel}
                        isEditable={true}
                        replaceItem={() =>
                          this.canelItem(
                            products.transactionId,
                            products.USSID,
                            products.sellerorderno
                          )
                        }
                        writeReview={val =>
                          this.writeReview(products.productcode)
                        }
                      />
                    )}
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
                            replaceItem={() =>
                              this.replaceItem(
                                products.sellerorderno,
                                orderDetails.paymentMethod,
                                products.transactionId
                              )
                            }
                          >
                            <UnderLinedButton
                              label={PRODUCT_Returned}
                              color="#ff1744"
                            />
                          </div>
                        )}
                        {products.cancel && (
                          <div
                            className={styles.review}
                            replaceItem={() =>
                              this.canelItem(
                                products.transactionId,
                                products.USSID,
                                products.sellerorderno
                              )
                            }
                          >
                            <UnderLinedButton
                              label={PRODUCT_Cancel}
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
