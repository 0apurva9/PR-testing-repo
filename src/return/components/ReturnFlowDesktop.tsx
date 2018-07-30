import * as React from "react";
import {
  IProps,
  IProductDetailsObj,
  ReturnStatus,
  IState,
  IReturnSelectedReason
} from "./interface/ReturnFlowDesktop";
import { IStateForBank } from "./interface/ReturnBankFormForDesktop";
import ProfileMenu from "../../account/components/ProfileMenu.js";
import UserProfile from "../../account/components/UserProfile.js";
import OrderCard from "../../account/components/OrderCard";
import { default as MyAccountStyles } from "../../account/components/MyAccountDesktop.css";
import * as styles from "./ReturnFlowDesktop.css";
import * as Cookie from "../../lib/Cookie";
import ReturnReasonFormForDesktop from "./ReturnReasonFormForDesktop";
import ReturnModesForDesktop from "./ReturnModesForDesktop";
import {
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN
} from "../../lib/constants";
import ReturnBankFormForDesktop from "./ReturnBankFormForDesktop";
import * as format from "date-fns/format";
const RETURN_FLAG: string = "R";
const dateFormat = "DD MMM YYYY";

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
      returnProgressStatus: ReturnStatus.SHOW_SELECT_REASON_AND_COMMENT_SECTION,
      selectedReasonAndCommentObj: null
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

  handleContinueForReason = (returnSelectedReason: IReturnSelectedReason) => {
    if (returnSelectedReason.reason) {
      this.setState({
        returnProgressStatus: this.state.isCOD
          ? ReturnStatus.SHOW_BANK_DETAIL_SECTION
          : ReturnStatus.SHOW_SELECT_MODE_SECTION,
        selectedReasonAndCommentObj: returnSelectedReason
      });
    } else {
      this.props.displayToast("Please select reason ");
    }
  };
  handleCancelForReason = () => {
    this.props.history.goBack();
  };
  handleContinueForBankForm = (BankDetails: IStateForBank) => {
    if (BankDetails) {
      this.setState({
        returnProgressStatus: ReturnStatus.SHOW_SELECT_MODE_SECTION
      });
    }
  };
  handleCancelForBankForm = () => {
    this.setState({
      returnProgressStatus: ReturnStatus.SHOW_SELECT_REASON_AND_COMMENT_SECTION
    });
  };
  changeReturnReason = () => {
    this.setState({
      returnProgressStatus: ReturnStatus.SHOW_SELECT_REASON_AND_COMMENT_SECTION,
      selectedReasonAndCommentObj: null
    });
  };
  private renderReturnForms = () => {
    switch (this.state.returnProgressStatus) {
      case ReturnStatus.SHOW_SELECT_REASON_AND_COMMENT_SECTION: {
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
            onContinue={(returnSelectedReason: IReturnSelectedReason) =>
              this.handleContinueForReason(returnSelectedReason)
            }
            onCancel={() => this.handleCancelForReason()}
            onHollow={true}
          />
        );
      }
      case ReturnStatus.SHOW_BANK_DETAIL_SECTION: {
        return (
          <ReturnBankFormForDesktop
            onContinue={(BankDetails: IStateForBank) =>
              this.handleContinueForBankForm(BankDetails)
            }
            onCancel={() => this.handleCancelForBankForm()}
            displayToast={(val: string) => this.props.displayToast(val)}
            history={this.props.history}
            orderCode={this.orderCode}
            selectedReasonAndCommentObj={this.state.selectedReasonAndCommentObj}
            changeReturnReason={() => this.changeReturnReason()}
          />
        );
      }
      case ReturnStatus.SHOW_SELECT_MODE_SECTION: {
        return (
          <ReturnModesForDesktop
            changeReturnReason={() => this.changeReturnReason()}
            orderCode={this.orderCode}
            selectedReasonAndCommentObj={this.state.selectedReasonAndCommentObj}
            returnRequest={this.props.returnProductDetails}
          />
        );
      }
      default: {
        //statements;
        break;
      }
    }
  };
  public render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    return this.renderComponentWithLeftAndRightCard(this.renderReturnForms());
  }
}
