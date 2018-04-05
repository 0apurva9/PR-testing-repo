import React from "react";
import styles from "./AllOrderDetails.css";
import OrderPlacedAndId from "./OrderPlacedAndId.js";
import OrderCard from "./OrderCard.js";
import PriceAndLink from "./PriceAndLink.js";
import OrderDelivered from "./OrderDelivered.js";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import moment from "moment";
import { Redirect } from "react-router-dom";
import * as Cookie from "../../lib/Cookie";
import {
  MY_ACCOUNT,
  ORDER,
  ORDER_CODE,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  LOGIN_PATH,
  ORDER_HISTORY
} from "../../lib/constants";

import { HOME_ROUTER } from "../../lib/constants";
const dateFormat = "DD MMM YYYY";
export default class AllOrderDetails extends React.Component {
  onClickImage(productCode) {
    if (productCode) {
      this.props.history.push(`/p-${productCode.toLowerCase()}`);
    }
  }
  onViewDetails(orderId) {
    this.props.history.push(`${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${orderId}`);
  }
  componentDidMount() {
    if (this.props.shouldCallHeaderContainer) {
      this.props.setHeaderText(ORDER_HISTORY);
    }
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (userDetails && customerCookie) {
      this.props.getAllOrdersDetails();
    }
  }
  componentDidUpdate() {
    if (this.props.shouldCallHeaderContainer) {
      this.props.setHeaderText(ORDER_HISTORY);
    }
  }
  renderToContinueShopping() {
    this.props.history.push(HOME_ROUTER);
  }
  renderNoOrder() {
    return (
      <div className={styles.noOrder}>
        <div className={styles.noOderText}>
          You have not made any purchase yet
        </div>
        <div className={styles.continueShoppingButton}>
          <Button
            label="Continue Shopping"
            type="primary"
            width={170}
            height={40}
            onClick={() => this.renderToContinueShopping()}
          />
        </div>
      </div>
    );
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
    const orderDetails = this.props.profile.orderDetails;
    return (
      <div className={styles.base}>
        {orderDetails && orderDetails.orderData
          ? orderDetails.orderData.map((orderDetails, i) => {
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
                    imageUrl={
                      orderDetails.products && orderDetails.products[0].imageURL
                    }
                    price={orderDetails.totalOrderAmount}
                    discountPrice={""}
                    productName={
                      orderDetails.products &&
                      orderDetails.products[0].productName
                    }
                    onClick={() =>
                      this.onClickImage(
                        orderDetails.products &&
                          orderDetails.products[0] &&
                          orderDetails.products.length &&
                          orderDetails.products[0].productcode
                      )
                    }
                  />
                  <PriceAndLink
                    onViewDetails={() =>
                      this.onViewDetails(orderDetails.orderId)
                    }
                    price={orderDetails.totalOrderAmount}
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
                </div>
              );
            })
          : this.renderNoOrder()}
      </div>
    );
  }
}
AllOrderDetails.propTypes = {
  shouldCallHeaderContainer: PropTypes.bool,
  orderDetails: PropTypes.arrayOf(
    PropTypes.shape({
      orderDate: PropTypes.string,
      orderId: PropTypes.string,
      totalOrderAmount: PropTypes.string,
      billingAddress: PropTypes.arrayOf(
        PropTypes.shape({
          addressLine1: PropTypes.string,
          town: PropTypes.string,
          state: PropTypes.string,
          postalcode: PropTypes.string
        })
      )
    })
  )
};
AllOrderDetails.defaultProps = {
  shouldCallHeaderContainer: true
};
