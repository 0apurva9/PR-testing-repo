import * as React from "react";
import { IProps } from "./interface/MyAccountWithLeftAndRightSection";

import ProfileMenu from "../../account/components/ProfileMenu.js";
import UserProfile from "../../account/components/UserProfile.js";
import OrderCard from "../../account/components/OrderCard";
import { default as MyAccountStyles } from "../../account/components/MyAccountDesktop.css";
import * as styles from "./ReturnFlowDesktop.css";
import * as Cookie from "../../lib/Cookie";

import {
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN
} from "../../lib/constants";

export default class MyAccountWithLeftAndRightSection extends React.Component<
  IProps,
  any
> {
  constructor(props: IProps) {
    super(props);
  }
  componentDidMount() {
    if (this.props.getUserAddress) {
      this.props.getUserAddress();
    }
  }
  private navigateToLogin() {
    return <div />;
  }
  private renderToAccountSetting() {}
  public renderComponentWithLeftAndRightCard(component: any) {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const userData = JSON.parse(userDetails);
    const data = this.props.orderDetails;

    return (
      <div className={styles.base}>
        <div className={MyAccountStyles.holder}>
          <div className={MyAccountStyles.profileMenu}>
            <ProfileMenu {...this.props} />
          </div>
          <div className={styles.returnReasonDetail}>
            <div className={styles.returnReasonDetailHolder}>
              <div className={styles.orderCardWrapper}>
                <OrderCard
                  imageUrl={
                    data &&
                    data.orderProductWsDTO &&
                    data.orderProductWsDTO[0] &&
                    data.orderProductWsDTO[0].imageURL
                  }
                  productName={`${data &&
                    data.orderProductWsDTO &&
                    data.orderProductWsDTO[0] &&
                    data.orderProductWsDTO[0].productBrand} ${data &&
                    data.orderProductWsDTO &&
                    data.orderProductWsDTO[0] &&
                    data.orderProductWsDTO[0].productName}`}
                  price={
                    data &&
                    data.orderProductWsDTO &&
                    data.orderProductWsDTO[0] &&
                    data.orderProductWsDTO[0].price
                  }
                  isSelect={true}
                  quantity={true}
                  orderPlace={"this.props.orderDate"}
                  orderId={this.props.orderId}
                  productBrand={"this.props.productBrand"}
                >
                  {data &&
                    data.orderProductWsDTO &&
                    data.orderProductWsDTO[0] &&
                    data.orderProductWsDTO[0].quantity && (
                      <div className={styles.quantity}>
                        Qty {data.orderProductWsDTO[0].quantity}
                      </div>
                    )}
                </OrderCard>
              </div>
              {component}
            </div>
          </div>

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
              lastName={userData && userData.lastName && `${userData.lastName}`}
              userAddress={this.props.userAddress}
            />
          </div>
        </div>
      </div>
    );
  }

  public render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    return this.renderComponentWithLeftAndRightCard(<div />);
  }
}
