import React from "react";
import styles from "./Coupon.css";
import Icon from "../../xelpmoc-core/Icon";
import PropTypes from "prop-types";
import couponIcon from "./img/coupon-1.svg";
import UnderLinedButton from "../../general/components/UnderLinedButton";

export default class Coupon extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    return (
      <div
        style={{ backgroundColor: this.props.backgroundColor }}
        className={styles.base}
        onClick={() => {
          this.handleClick();
        }}
      >
        <div className={styles.couponInnerBox}>
          <div className={styles.couponIcon}>
            <Icon image={couponIcon} size={25} />
          </div>
          <div
            className={styles.headingText}
            style={{ color: this.props.color }}
          >
            {this.props.heading}
          </div>
          {this.props.subText && (
            <div className={styles.subText}>{this.props.subText}</div>
          )}
          {this.props.showApplyButton && (
            <div className={styles.apply}>
              <UnderLinedButton label={this.props.buttonLabel} color={"#000"} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
Coupon.propTypes = {
  couponImage: PropTypes.string,
  heading: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  subText: PropTypes.string,
  buttonLabel: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  showApplyButton: PropTypes.bool,
};
Coupon.defaultProps = {
  backgroundColor: "#fff",
  showApplyButton: false,
  color: "#6f6f6f",
  buttonLabel: "Apply"
};
