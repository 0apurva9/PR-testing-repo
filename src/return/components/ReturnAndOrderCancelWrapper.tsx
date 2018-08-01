import * as React from "react";
import { IProps } from "./interface/ReturnAndOrderCancelWrapper";

import ProfileMenu from "../../account/components/ProfileMenu.js";
import UserProfile from "../../account/components/UserProfile.js";
import * as styles from "./ReturnAndOrderCancelWrapper.css";
import * as Cookie from "../../lib/Cookie";
import OrderCard from "../../account/components/OrderCard";
import { LOGGED_IN_USER_DETAILS } from "../../lib/constants";
import * as format from "date-fns/format";
const dateFormat = "DD MMM YYYY";
export default class ReturnAndOrderCancelWrapper extends React.Component<
  IProps,
  any
> {
  componentDidMount() {
    if (!this.props.userDetails) {
      if (this.props.getUserAddress) {
        this.props.getUserAddress();
      }
    }
  }
  onClickImage(productCode: string) {
    if (productCode) {
      this.props.history.push(`/p-${productCode.toLowerCase()}`);
    }
  }
  public render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const userAccountDetails = JSON.parse(userDetails);
    const returnProductDetails = this.props.returnProductDetails;
    const orderDetails = this.props.orderDetails;
    return (
      <div className={styles.base}>
        <div className={styles.holder}>
          <div className={styles.profileMenu}>
            <ProfileMenu {...this.props} />
          </div>
          <div className={styles.returnReasonDetail}>
            <div className={styles.returnReasonDetailHolder}>
              {returnProductDetails && (
                <div className={styles.orderCardWrapper}>
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
                      returnProductDetails.orderProductWsDTO[0].productName}`}
                    price={
                      returnProductDetails &&
                      returnProductDetails.orderProductWsDTO &&
                      returnProductDetails.orderProductWsDTO[0] &&
                      returnProductDetails.orderProductWsDTO[0].price
                    }
                    isSelect={true}
                    quantity={true}
                    orderPlace={
                      orderDetails && orderDetails.orderDate
                        ? orderDetails &&
                          format(orderDetails.orderDate, dateFormat)
                        : this.props.orderPlace
                    }
                    orderId={this.props.orderId}
                    productBrand={
                      orderDetails && orderDetails.productBrand
                        ? orderDetails.productBrand
                        : returnProductDetails &&
                          returnProductDetails.orderProductWsDTO &&
                          returnProductDetails.orderProductWsDTO[0] &&
                          returnProductDetails.orderProductWsDTO[0].productBrand
                    }
                    onHollow={true}
                    onClick={() =>
                      this.onClickImage(
                        orderDetails &&
                          orderDetails.orderProductWsDTO &&
                          orderDetails.orderProductWsDTO[0] &&
                          orderDetails.orderProductWsDTO[0].productcode
                      )
                    }
                  >
                    {returnProductDetails &&
                      returnProductDetails.orderProductWsDTO &&
                      returnProductDetails.orderProductWsDTO[0] &&
                      returnProductDetails.orderProductWsDTO[0].quantity && (
                        <div className={styles.quantity}>
                          Qty{" "}
                          {returnProductDetails.orderProductWsDTO[0].quantity}
                        </div>
                      )}
                  </OrderCard>
                </div>
              )}
              {this.props.children}
            </div>
          </div>

          <div className={styles.userProfile}>
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
    );
  }
}
