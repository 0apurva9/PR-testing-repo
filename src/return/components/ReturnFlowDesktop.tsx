import * as React from "react";
import { IProps, IProductDetailsObj } from "./interface/ReturnFlowDesktop";
import ProfileMenu from "../../account/components/ProfileMenu.js";
import UserProfile from "../../account/components/UserProfile.js";
import OrderCard from "../../account/components/OrderCard";
import ReturnBankFormForDesktop from "./ReturnBankFormForDesktop";
import { default as MyAccountStyles } from "../../account/components/MyAccountDesktop.css";
import * as styles from "./ReturnFlowDesktop.css";
import * as Cookie from "../../lib/Cookie";
import ReturnReasonFormForDesktop from "./ReturnReasonFormForDesktop";
import {
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN
} from "../../lib/constants";
import * as format from "date-fns/format";
const RETURN_FLAG: string = "R";
const dateFormat = "DD MMM YYYY";
interface IState {
  orderCode?: string;
  isCOD?: boolean;
  isReasonSelected: boolean;
  bankDetail: any;
}
export default class ReturnFlowDesktop extends React.Component<IProps, IState> {
  orderCode: string;
  transactionId: string;
  isCOD: boolean;
  constructor(props: IProps) {
    super(props);
    this.orderCode = props.location.pathname.split("/")[2];
    this.transactionId = props.location.state
      ? props.location.state.transactionId
      : null;
    this.isCOD = props.location.state && props.location.state.isCOD;
    this.state = {
      bankDetail: {},
      isCOD: this.isCOD,
      isReasonSelected: false
    };
  }
  componentDidMount() {
    let orderCode = this.orderCode;
    let transactionId = this.transactionId;

    let productDetails: IProductDetailsObj = {
      transactionId: transactionId,
      returnCancelFlag: RETURN_FLAG,
      orderCode: orderCode
    };

    this.props.returnProductDetailsFunc(productDetails);
    this.props.getReturnRequest(orderCode, transactionId);
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
    const data = this.props.returnProductDetails;

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
                  orderId={this.orderCode}
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

  handleContinue = () => {
    this.setState({ isReasonSelected: true });
  };
  handleCancel = () => {
    this.props.history.goBack();
  };
  private renderReturnReasonFormForDesktop = () => {
    return (
      <ReturnReasonFormForDesktop
        returnProductDetails={this.props.returnProductDetails}
        orderDate={
          this.props.orderDetails &&
          format(this.props.orderDetails.orderDate, dateFormat)
        }
        orderId={this.props.orderDetails && this.props.orderDetails.orderId}
        productBrand={
          this.props.orderDetails &&
          this.props.orderDetails.products &&
          this.props.orderDetails.products[0] &&
          this.props.orderDetails.products[0].productBrand
        }
        onContinue={data => this.handleContinue()}
        onCancel={() => this.handleCancel()}
        onHollow={true}
      />
    );
  };
  public render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    return this.renderComponentWithLeftAndRightCard(
      <ReturnBankFormForDesktop
        onContinue={() => console.log("Comes in main")}
        onCancel={() => console.log("cancel me ")}
        displayToast={(val: string) => this.props.displayToast(val)}
        history={this.props.history}
        orderCode={this.orderCode}
      />

    );
  }
}
