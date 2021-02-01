import React from "react";
import PropTypes from "prop-types";
import ControlInput from "../../general/components/ControlInput.js";
import UnderLinedButton from "../../general/components/UnderLinedButton.js";
import Button from "../../general/components/Button.js";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import styles from "./SearchCupon.css";
export default class SearchCupon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      couponCode: this.props.couponCode ? this.props.couponCode : ""
    };
  }

  getValue(val) {
    if (val.length <= 30) {
      this.setState({ couponCode: val });
      if (this.props.getValue) {
        this.props.getValue(val);
      }
    }
  }

  onApply() {
    if (this.props.applyUserCoupon && this.props.couponCode) {
      this.props.applyUserCoupon(this.props.couponCode);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.couponCode !== this.state.couponCode) {
      this.setState({ couponCode: nextProps.couponCode });
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.buttonHolder}>
          <div className={styles.buttonCover}>
            <MobileOnly>
              <UnderLinedButton
                size="14px"
                fontFamily="regular"
                color="#000"
                label={this.props.label}
                onClick={() => this.onApply()}
              />
            </MobileOnly>
            <DesktopOnly>
              <Button
                type="tertiary"
                width={120}
                label={this.props.label}
                onClick={() => this.onApply()}
                dataTest="apply-button"
              />
            </DesktopOnly>
          </div>
        </div>
        <div className={styles.inputHolder}>
          <ControlInput
            boxy={true}
            placeholder={this.props.placeholder}
            onChange={val => this.getValue(val.toUpperCase())}
            value={this.state.couponCode}
            textStyle={{ fontSize: 14 }}
            height={35}
            disabled={this.props.disableManualType}
            background="#fff"
            dataTest="coupon-input-field"
          />
        </div>
      </div>
    );
  }
}
SearchCupon.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  getValue: PropTypes.func,
  onApply: PropTypes.func,
  couponCode: PropTypes.string,
  applyUserCoupon: PropTypes.func,
  disableManualType: PropTypes.bool,
};
SearchCupon.defaultProps = {
  label: "Apply",
  placeholder: "Bank Offer Code"
};
