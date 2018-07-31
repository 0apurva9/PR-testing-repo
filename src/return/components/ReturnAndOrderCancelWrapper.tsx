import * as React from "react";
import { IProps } from "./interface/ReturnAndOrderCancelWrapper";

import ProfileMenu from "../../account/components/ProfileMenu.js";
import UserProfile from "../../account/components/UserProfile.js";
import * as styles from "./OrderCancelWrapperForDesktop.css";
import * as Cookie from "../../lib/Cookie";
import OrderCard from "../../account/components/OrderCard";
import { LOGGED_IN_USER_DETAILS } from "../../lib/constants";

export default class OrderCancelWrapper extends React.Component<IProps, any> {
  componentDidMount() {
    if (!this.props.userDetails) {
      if (this.props.getUserAddress) {
        this.props.getUserAddress();
      }
    }
  }

  public render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const userAccountDetails = JSON.parse(userDetails);
    const orderDetails = this.props.orderDetails;

    return (
      <div className={styles.base}>
        <div className={styles.holder}>
          <div className={styles.profileMenu}>
            <ProfileMenu {...this.props} />
          </div>
          <div className={styles.returnReasonDetail}>
            <div className={styles.returnReasonDetailHolder}>
              {orderDetails && (
                <div className={styles.orderCardWrapper}>
                  <OrderCard
                    imageUrl={
                      orderDetails &&
                      orderDetails.orderProductWsDTO &&
                      orderDetails.orderProductWsDTO[0] &&
                      orderDetails.orderProductWsDTO[0].imageURL
                    }
                    productName={`${orderDetails &&
                      orderDetails.orderProductWsDTO &&
                      orderDetails.orderProductWsDTO[0] &&
                      orderDetails.orderProductWsDTO[0]
                        .productBrand} ${orderDetails &&
                      orderDetails.orderProductWsDTO &&
                      orderDetails.orderProductWsDTO[0] &&
                      orderDetails.orderProductWsDTO[0].productName}`}
                    price={
                      orderDetails &&
                      orderDetails.orderProductWsDTO &&
                      orderDetails.orderProductWsDTO[0] &&
                      orderDetails.orderProductWsDTO[0].price
                    }
                    isSelect={true}
                    quantity={true}
                    orderPlace={"this.props.orderDate"}
                    orderId={this.props.orderId}
                    productBrand={"this.props.productBrand"}
                  >
                    {orderDetails &&
                      orderDetails.orderProductWsDTO &&
                      orderDetails.orderProductWsDTO[0] &&
                      orderDetails.orderProductWsDTO[0].quantity && (
                        <div className={styles.quantity}>
                          Qty {orderDetails.orderProductWsDTO[0].quantity}
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
