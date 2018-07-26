import * as React from "react";
import { IProps, IProductDetailsObj } from "./interface/ReturnFlowDesktop";
import ProfileMenu from "../../account/components/ProfileMenu";
import UserProfile from "../../account/components/UserProfile";
import { default as MyAccountStyles } from "../../account/components/MyAccountDesktop.css";
import * as styles from "./ReturnFlowDesktop.css";
import * as Cookie from "../../lib/Cookie";
import {
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN
} from "../../lib/constants";
const RETURN_FLAG: string = "R";

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
  private renderToAccountSetting() {
    console.log("go to my account setting");
  }
  public render() {
    const { pathname } = this.props.location;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    const userData = JSON.parse(userDetails);
    return (
      <div className={styles.base}>
        <div className={MyAccountStyles.holder}>
          <div className={MyAccountStyles.profileMenu}>
            <ProfileMenu {...this.props} />
          </div>
          <div className={styles.returnReasonDetail}>
            <div className={styles.returnReasonDetailHolder}>
              {!this.state.isReasonSelected ? (
                <div>solved</div>
              ) : (
                <div>solved</div>
              )}
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
}
