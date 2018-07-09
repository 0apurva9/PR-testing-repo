import React from "react";
import Loader from "../../general/components/Loader";
import ReturnReasonForm from "./ReturnReasonForm.js";
import ReturnModes from "./ReturnModes.js";
import {
  CASH_ON_DELIVERY,
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_MODES,
  RETURNS_REASON,
  QUICK_DROP,
  RETURN_TO_STORE,
  RETURNS_STORE_MAP,
  RETURN_CLIQ_PIQ,
  SCHEDULED_PICKUP,
  RETURN_CLIQ_PIQ_ADDRESS,
  RETURNS_STORE_BANK_FORM,
  SELF_COURIER,
  RETURNS_SELF_COURIER
} from "../../lib/constants";
import {
  setDataLayerForMyAccountDirectCalls,
  ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL
} from "../../lib/adobeUtils";

import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  GLOBAL_ACCESS_TOKEN,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CART_DETAILS_FOR_ANONYMOUS,
  ANONYMOUS_USER,
  LOGIN_PATH,
  SAVED_LIST
} from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";
import ProfileMenu from "./ProfileMenu";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import styles from "./ReturnReasonAndModes.css";
import UserProfile from "./UserProfile";
import DeskTopOnly from "../../general/components/DesktopOnly.js";
import MobileOnly from "../../general/components/MobileOnly.js";
import OrderCard from "./OrderCard";
const REG_X_FOR_REASON = /reason/i;
const REG_X_FOR_MODES = /modes/i;

export default class ReturnReasonAndModes extends React.Component {
  constructor(props) {
    super();
    this.orderCode = props.location.pathname.split("/")[2];
    this.state = {
      isReasonSelected: false
    };
  }
  renderLoader() {
    return <Loader />;
  }

  onCancel() {
    this.setState({ isReasonSelected: false });
    setDataLayerForMyAccountDirectCalls(ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL);
    this.props.history.goBack();
  }
  onChange(val) {
    if (this.props.onChange) {
      this.props.onChange(val);
    }
  }
  renderToModes(data) {
    if (!data.reason) {
      this.props.displayToast("Please select reason ");
      return false;
    }
    if (
      this.props.returnProductDetails &&
      this.props.returnProductDetails.showReverseSealFrJwlry === "yes" &&
      !data.reverseSeal
    ) {
      this.props.displayToast("Please Select Reverse Seal ");
      return false;
    } else {
      this.setState({ isReasonSelected: true });
      this.props.onChange({ data });
      if (this.props.isCOD) {
        this.props.history.push({
          pathname: `${RETURNS_PREFIX}/${
            this.orderCode
          }${RETURNS_STORE_BANK_FORM}`,
          state: {
            authorizedRequest: true
          }
        });
      } else {
        this.props.history.push({
          pathname: `${RETURNS_PREFIX}/${
            this.orderCode
          }${RETURN_LANDING}${RETURNS_MODES}`,
          state: {
            authorizedRequest: true
          }
        });
      }
    }
  }
  onSelectMode(mode) {
    if (mode === QUICK_DROP) {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_TO_STORE}${RETURNS_STORE_MAP}`,
        state: {
          authorizedRequest: true
        }
      });
    } else if (mode === SCHEDULED_PICKUP) {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_CLIQ_PIQ}${RETURN_CLIQ_PIQ_ADDRESS}`,
        state: {
          authorizedRequest: true
        }
      });
    } else if (mode === SELF_COURIER) {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${this.orderCode}${RETURNS_SELF_COURIER}`,
        state: {
          authorizedRequest: true
        }
      });
    }
  }
  render() {
    const { pathname } = this.props.location;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    const userData = JSON.parse(userDetails);
    const renderReasonForm = (
      <ReturnReasonForm
        returnProductDetails={this.props.returnProductDetails}
        onChange={comment => this.onChange({ comment })}
        onChangePrimary={reason => this.onChange({ reason })}
        onContinue={data => this.renderToModes(data)}
        onCancel={() => this.onCancel()}
      />
    );
    const renderReturnMode = (
      <ReturnModes
        {...this.props}
        productInfo={
          this.props.returnRequest &&
          this.props.returnRequest.returnEntry &&
          this.props.returnRequest.returnEntry.orderEntries[0]
        }
        selectMode={mode => this.onSelectMode(mode)}
        onCancel={() => this.onCancel()}
      />
    );

    let data = this.props.returnProductDetails;
    return (
      <React.Fragment>
        <DeskTopOnly>
          <div className={styles.base}>
            <div className={MyAccountStyles.holder}>
              <div className={MyAccountStyles.profileMenu}>
                <ProfileMenu {...this.props} />
              </div>
              <div className={styles.saveListDetail}>
                <div className={styles.saveListDetailsWithHolder}>
                  <div className={styles.ordercard}>
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
                  {!this.state.isReasonSelected && renderReasonForm}
                  {this.state.isReasonSelected && renderReturnMode}
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
                  lastName={
                    userData && userData.lastName && `${userData.lastName}`
                  }
                />
              </div>
            </div>
          </div>
        </DeskTopOnly>
        <MobileOnly>
          {pathname.match(REG_X_FOR_REASON) && renderReasonForm}
          {pathname.match(REG_X_FOR_MODES) && renderReturnMode}
        </MobileOnly>
      </React.Fragment>
    );
  }
}
