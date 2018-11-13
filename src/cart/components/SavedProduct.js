import React from "react";
import PropTypes from "prop-types";
import styles from "./SavedProduct.css";
import Button from "../../general/components/Button.js";
import Coupon from "../../general/components/Coupon.js";
import * as Cookie from "../../lib/Cookie.js";
import { COUPON_COOKIE } from "../../lib/constants.js";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
const COUPON_SUBTEXT =
  "Additional Bank offers, if applicable, can be applied during payment";
export default class SavedProduct extends React.Component {
  handleClick() {
    if (this.props.saveProduct) {
      this.props.saveProduct();
    }
  }
  onApplyCoupon() {
    if (this.props.onApplyCoupon) {
      this.props.onApplyCoupon();
    }
  }
  render() {
    let couponText = this.props.couponHeading;

    if (this.props.appliedCouponCode) {
      couponText = `Coupon: ${this.props.appliedCouponCode}`;
    }
    return (
      <div className={styles.base}>
        <div className={styles.applyCoupon}>
          <MobileOnly>
            <Coupon
              heading={couponText}
              onClick={() => this.onApplyCoupon()}
              subText={COUPON_SUBTEXT}
            />
          </MobileOnly>
          <DesktopOnly>
            <Coupon
              heading={
                this.props.appliedCouponCode
                  ? couponText
                  : this.props.desktopCouponHeading
              }
              onClick={() => this.onApplyCoupon()}
              backgroundColor={"#f9f9f9"}
              showApplyButton={this.props.appliedCouponCode ? false : true}
              color={this.props.appliedCouponCode ? "#6f6f6f" : "#000"}
            />
          </DesktopOnly>
        </div>
        {this.props.isViewWishList && (
          <div className={styles.buttonHolder}>
            <div className={styles.button}>
              <Button
                type="hollow"
                height={40}
                label="View My Wish List"
                width={200}
                textStyle={{ color: "#212121", fontSize: 14 }}
                onClick={() => this.handleClick()}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

SavedProduct.propTypes = {
  saveProduct: PropTypes.func,
  onApplyCoupon: PropTypes.func,
  cuponHeading: PropTypes.string,
  giftCardHeading: PropTypes.string,
  giftCardLabel: PropTypes.string,
  isViewWishList: PropTypes.bool
};
SavedProduct.defaultProps = {
  couponHeading: "Check for Coupon",
  desktopCouponHeading: "Have a Coupon ?",
  giftCardHeading: "Surprise for a special one ?",
  giftCardLabel: "Gift wrap for free",
  isViewWishList: false
};
