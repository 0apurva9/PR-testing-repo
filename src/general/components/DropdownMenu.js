import React from "react";
import styles from "./DropdownMenu.css";
import { LOGGED_IN_USER_DETAILS } from "../../../src/lib/constants";
import LogoutButtonContainer from "../../account/containers/LogoutButtonContainer";
import * as Cookie from "../../lib/Cookie";
import Button from "../../xelpmoc-core/Button";
import {
  setDataLayerForHeaderAndFooterDirectCalls,
  ADOBE_DIRECT_CALL_FOR_HEADER_CLICK
} from "../../lib/adobeUtils";
export default class DropdownMenu extends React.Component {
  goToMyAccount = value => {
    if (this.props.goToMyAccount) {
      this.props.goToMyAccount();
    }
    setDataLayerForHeaderAndFooterDirectCalls(
      ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
      value
    );
  };

  goToOrdersPage = value => {
    setDataLayerForHeaderAndFooterDirectCalls(
      ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
      value
    );
    if (this.props.goToOrdersPage) {
      this.props.goToOrdersPage();
    }
  };

  goToDefaultWishList = value => {
    setDataLayerForHeaderAndFooterDirectCalls(
      ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
      value
    );
    if (this.props.goToDefaultWishList) {
      this.props.goToDefaultWishList();
    }
  };

  goToAlertsAndCoupon = value => {
    setDataLayerForHeaderAndFooterDirectCalls(
      ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
      value
    );
    if (this.props.goToAlertsAndCoupon) {
      this.props.goToAlertsAndCoupon();
    }
  };

  goToGiftCard = value => {
    setDataLayerForHeaderAndFooterDirectCalls(
      ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
      value
    );
    if (this.props.goToGiftCard) {
      this.props.goToGiftCard();
    }
  };

  goToCliqCash = value => {
    setDataLayerForHeaderAndFooterDirectCalls(
      ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
      value
    );
    if (this.props.goToCliqCash) {
      this.props.goToCliqCash();
    }
  };

  openSignUpPopUp(value) {
    setDataLayerForHeaderAndFooterDirectCalls(
      ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
      value
    );
    if (this.props.openSignUp) {
      this.props.openSignUp();
    }
  }

  render() {
    let userCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userCookie) {
      userCookie = JSON.parse(userCookie);
    }
    return (
      <div className={styles.base}>
        {!userCookie &&
          !userCookie && (
            <div className={styles.loginAndRegisterButtonHolder}>
              <div className={styles.loginAndRegisterButton}>
                <Button
                  label={"Login/ Register"}
                  width={135}
                  height={35}
                  borderRadius={18}
                  backgroundColor={"#ff1744"}
                  onClick={() => this.openSignUpPopUp("Login/ Register")}
                  textStyle={{ color: "#FFF", fontSize: 14 }}
                />
              </div>
            </div>
          )}
        <div className={styles.accountHolder}>
          <div
            className={styles.menuHolder}
            onClick={() => this.goToMyAccount("My account")}
          >
            <div className={styles.menuIconProfile} />
            My account
          </div>
          <div
            className={styles.menuHolder}
            onClick={() => this.goToOrdersPage("Order History")}
          >
            <div className={styles.menuIconOrder} />
            Order History
          </div>
          <div
            className={styles.menuHolder}
            onClick={() => this.goToDefaultWishList("Wishlist")}
          >
            <div className={styles.menuIconWishList} />
            Saved List
          </div>
          <div
            className={styles.menuHolder}
            onClick={() => this.goToAlertsAndCoupon("Alerts & Coupon")}
          >
            <div className={styles.menuIconWishLisAlerts} />
            Alerts & Coupon
          </div>
          <div
            className={styles.menuHolder}
            onClick={() => this.goToGiftCard("Gift Card")}
          >
            <div className={styles.menuIconGiftCard} />
            Gift Card
          </div>
          <div
            className={styles.menuHolder}
            onClick={() => this.goToCliqCash("CLiQ Cash")}
          >
            <div className={styles.menuIconCliqCash} />
            CLiQ Cash
          </div>
          {userCookie &&
            userCookie && (
              <div className={styles.menuHolder}>
                <LogoutButtonContainer />
              </div>
            )}
        </div>
      </div>
    );
  }
}
