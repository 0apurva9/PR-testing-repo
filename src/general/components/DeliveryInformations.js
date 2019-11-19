import React from "react";
import IconWithHeader from "./IconWithHeader";
import styles from "./DeliveryInformations.css";
import UnderLinedButton from "./UnderLinedButton";
import CheckBox from "./CheckBox";
import PropTypes from "prop-types";
import Icon from "../../xelpmoc-core/Icon";
import ExpressImage from "./img/expressDelivery.svg";
import HomeImage from "./img/homeDelivery.svg";
import arrowIcon from "./img/arrowBackblack.svg";
import greyArrow from "./img/greyArrow.svg";
import CollectImage from "./img/collect.svg";
import quiqpiqImage from "./img/quiqlogo.png";
import codImage from "./img/cod.svg";
import clockImage from "./img/clock.png";
import {
  EXPRESS,
  COLLECT,
  QUIQPIQ,
  SHORT_SAME_DAY_TEXT,
  SHORT_SAME_DAY_DELIVERY,
  EXPRESS_SHIPPING,
  SAME_DAY_DELIVERY,
  SAME_DAY_DELIVERY_SHIPPING,
  HOME_DELIVERY
} from "../../lib/constants";
import * as UserAgent from "../../lib/UserAgent.js";
const EXPRESS_TEXT = "Delivery By";
const HOME_TEXT = "Standard Delivery";
const COLLECT_TEXT = "QUiQ PiQ";
const COLLECT_TEXT_CART = "Pick from store";
const COD_TEXT = "Cash on Delivery";
const NOT_AVAILABLE = "Not Available";
export default class DeliveryInformations extends React.Component {
  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  handleSelect() {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.type);
    }
  }
  arrowClick() {
    if (this.props.arrowClick) {
      this.props.arrowClick();
    }
  }
  onPiq() {
    if (this.props.onPiq) {
      this.props.onPiq();
    }
  }
  render() {
    let iconImage = "";
    let typeName = "";
    let arrowStyle = styles.arrowLink1;
    let iconSize = null;
    let baseClass = styles.base;
    if (this.props.type === EXPRESS) {
      iconImage = ExpressImage;
      typeName = !this.props.deliveryInformationByCart
        ? EXPRESS_TEXT
        : EXPRESS_SHIPPING;
      arrowStyle = styles.arrowLink;
      iconSize = this.props.inCartPageIcon ? 40 : 35;
    } else if (this.props.type === HOME_DELIVERY) {
      iconImage = HomeImage;
      typeName = HOME_TEXT;
      iconSize = 35;
    } else if (this.props.type === COLLECT) {
      iconImage = CollectImage;
      typeName = !this.props.deliveryInformationByCart
        ? COLLECT_TEXT
        : COLLECT_TEXT_CART;
      iconSize = 35;
    } else if (this.props.type === SHORT_SAME_DAY_DELIVERY) {
      iconImage = clockImage;
      typeName = SHORT_SAME_DAY_TEXT;
      iconSize = 35;
    } else if (this.props.type === SAME_DAY_DELIVERY) {
      iconImage = clockImage;
      typeName = SAME_DAY_DELIVERY_SHIPPING;
      iconSize = 35;
    } else if (this.props.isQuiqPiq === "Y") {
      iconImage = quiqpiqImage;
      typeName = QUIQPIQ;
      iconSize = 40;
    } else if (this.props.isCod == "Y") {
      iconImage = codImage;
      typeName = COD_TEXT;
      iconSize = 35;
    }
    if (!this.props.available) {
      typeName = `${typeName}`;
    }

    let deliveryCharge = "";
    if (this.props.deliveryCharge) {
      if (this.props.showDeliveryCharge) {
        deliveryCharge = "(Free)";
      }
      if (parseInt(this.props.deliveryCharge, 10) !== 0) {
        deliveryCharge = `(₹${parseInt(this.props.deliveryCharge, 10)})`;
      }
    }
    if (this.props.pdpApparel) {
      baseClass = styles.basePdp;
    }
    if (this.props.isQuiqPiq === "Y") {
      baseClass = styles.basePdp;
    }
    return (
      <div className={baseClass}>
        <div
          className={
            this.props.available ? styles.dataHolder : styles.notAvailable
          }
        >
          <IconWithHeader
            image={iconImage}
            iconShow={this.props.iconShow}
            header={`${typeName} ${deliveryCharge}`}
          >
            {this.props.placedTime &&
              this.props.available && (
                <div className={styles.placeTime}>{this.props.placedTime}</div>
              )}
            {this.props.deliverText && (
              <div className={styles.placeTime}>
                {this.props.deliverText}
                <span className={styles.text}>{this.props.textHeading}</span>
              </div>
            )}
            {!this.props.available && (
              <div className={styles.placeTime}>{NOT_AVAILABLE}</div>
            )}
            {this.props.isClickable &&
              this.props.type === COLLECT &&
              this.props.isShowCliqAndPiqUnderLineText &&
              this.props.available && (
                <div className={styles.underLineButtonHolder}>
                  <span className={styles.buttonHolderPiq}>
                    <UnderLinedButton
                      size={
                        UserAgent.checkUserAgentIsMobile() ? "14px" : "12px"
                      }
                      fontFamily="light"
                      color="#ff1744"
                      size="11px"
                      label="Check for pick up options"
                      onClick={() => this.onPiq()}
                    />
                  </span>
                </div>
              )}
          </IconWithHeader>
          {this.props.type === COLLECT
            ? this.props.selected &&
              this.props.onSelect && (
                <div
                  className={styles.checkboxHolder}
                  onClick={() => {
                    this.handleSelect();
                  }}
                >
                  {this.props.isClickable && (
                    <CheckBox selected={this.props.selected} />
                  )}
                </div>
              )
            : this.props.onSelect && (
                <div
                  className={styles.checkboxHolder}
                  onClick={() => {
                    this.handleSelect();
                  }}
                >
                  {this.props.isClickable && (
                    <CheckBox selected={this.props.selected} />
                  )}
                </div>
              )}

          {this.props.arrowClick &&
            this.props.type === COLLECT && (
              <div
                className={styles.arrowHolder}
                onClick={() => this.arrowClick()}
              >
                <Icon image={arrowIcon} size={20} />
              </div>
            )}
          {this.props.showCliqAndPiqButton &&
            this.props.isClickable &&
            !this.props.selected &&
            this.props.type === COLLECT && (
              <div className={arrowStyle} onClick={() => this.onPiq()}>
                <Icon image={greyArrow} size={20} />
              </div>
            )}
        </div>
      </div>
    );
  }
}
DeliveryInformations.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  heading: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  deliveryOptions: PropTypes.string,
  onClick: PropTypes.func,
  arrowClick: PropTypes.func,
  onPiq: PropTypes.func,
  showCliqAndPiqButton: PropTypes.bool,
  available: PropTypes.bool,
  showDeliveryCharge: PropTypes.bool,
  isShowCliqAndPiqUnderLineText: PropTypes.bool,
  isArrowIcon: PropTypes.bool,
  isCartForMargin: PropTypes.bool,
  inCartPage: PropTypes.bool,
  inCartPageIcon: PropTypes.bool
};

DeliveryInformations.defaultProps = {
  showCliqAndPiqButton: true,
  showDeliveryCharge: false,
  isShowCliqAndPiqUnderLineText: true,
  isArrowIcon: true,
  deliveryInformationByCart: false,
  isCartForMargin: false,
  inCartPage: false,
  inCartPageIcon: false
};
