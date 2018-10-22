import React from "react";
import styles from "./DropdownMenu.css";
import { LOGGED_IN_USER_DETAILS } from "../../../src/lib/constants";
import LogoutButtonContainer from "../../account/containers/LogoutButtonContainer";
import * as Cookie from "../../lib/Cookie";
import Button from "../../xelpmoc-core/Button";
export default class DropdownMenu extends React.Component {
  goToMyAccount = () => {
    if (this.props.goToMyAccount) {
      this.props.goToMyAccount();
    }
  };
  goToOrdersPage = () => {
    if (this.props.goToOrdersPage) {
      this.props.goToOrdersPage();
    }
  };
  goToDefaultWishList = () => {
    if (this.props.goToDefaultWishList) {
      this.props.goToDefaultWishList();
    }
  };
  goToAlertsAndCoupon = () => {
    if (this.props.goToAlertsAndCoupon) {
      this.props.goToAlertsAndCoupon();
    }
  };
  goToGiftCard = () => {
    if (this.props.goToGiftCard) {
      this.props.goToGiftCard();
    }
  };
  goToCliqCash = () => {
    if (this.props.goToCliqCash) {
      this.props.goToCliqCash();
    }
  };
  openSignUpPopUp() {
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
                  onClick={() => this.openSignUpPopUp()}
                  textStyle={{ color: "#FFF", fontSize: 14 }}
                />
              </div>
            </div>
          )}
        <div className={styles.accountHolder}>
          <div
            className={styles.menuHolder}
            onClick={() => this.goToMyAccount()}
          >
            <div className={styles.menuIconProfile} />
            My account
          </div>
          <div
            className={styles.menuHolder}
            onClick={() => this.goToOrdersPage()}
          >
            <div className={styles.menuIconOrder} />
            Order History
          </div>
          <div
            className={styles.menuHolder}
            onClick={() => this.goToDefaultWishList()}
          >
            <div className={styles.menuIconWishList} />
            Saved List
          </div>
          <div
            className={styles.menuHolder}
            onClick={() => this.goToAlertsAndCoupon()}
          >
            <div className={styles.menuIconWishLisAlerts} />
            Alerts & Coupon
          </div>
          <div
            className={styles.menuHolder}
            onClick={() => this.goToGiftCard()}
          >
            <div className={styles.menuIconGiftCard} />
            Gift Card
          </div>
          <div
            className={styles.menuHolder}
            onClick={() => this.goToCliqCash()}
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
