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
  SHORT_EXPRESS,
  COLLECT,
  SHORT_COLLECT,
  QUIQPIQ,
  SHORT_SAME_DAY_TEXT,
  SHORT_SAME_DAY_DELIVERY,
  EXPRESS_SHIPPING,
  SAME_DAY_DELIVERY,
  SAME_DAY_DELIVERY_SHIPPING,
  HOME_DELIVERY,
  SHORT_HOME_DELIVERY
} from "../../lib/constants";
import * as UserAgent from "../../lib/UserAgent.js";
import CountDownTimer from "../../pdp/components/CountDownTimer.js";
const EXPRESS_TEXT = "Delivery by";
const HOME_TEXT = "Delivery by";
const COLLECT_TEXT = "Pick from store";
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

  getDateMonthFormate(date, month) {
    let todayDate = new Date().getDate();
    let nextDayDate = todayDate + 1;
    let newExpressOrSddText;
    if (
      (date === todayDate && this.props.type === SHORT_EXPRESS) ||
      this.props.type === SHORT_SAME_DAY_DELIVERY
    ) {
      newExpressOrSddText = `Today, `;
    } else if (
      (date === nextDayDate && this.props.type === SHORT_EXPRESS) ||
      this.props.type === SHORT_SAME_DAY_DELIVERY
    ) {
      newExpressOrSddText = `Tomorrow, `;
    }
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    switch (date) {
      case 1:
      case 21:
      case 31:
        if (newExpressOrSddText) {
          return newExpressOrSddText + date + "st " + monthNames[month - 1];
        } else {
          return "" + date + "st " + monthNames[month - 1];
        }
      case 2:
      case 22:
        if (newExpressOrSddText) {
          return newExpressOrSddText + date + "nd " + monthNames[month - 1];
        } else {
          return "" + date + "nd " + monthNames[month - 1];
        }
      case 3:
      case 23:
        if (newExpressOrSddText) {
          return newExpressOrSddText + date + "rd " + monthNames[month - 1];
        } else {
          return "" + date + "rd " + monthNames[month - 1];
        }
      default:
        if (newExpressOrSddText) {
          return newExpressOrSddText + date + "th " + monthNames[month - 1];
        } else {
          return "" + date + "th " + monthNames[month - 1];
        }
    }
  }

  getDayNumberSuffix(d) {
    let date = "";
    let month = "";
    let splitDate = d.split(" ");
    let dateMonthsYears = splitDate[0].split("-");
    date = parseInt(dateMonthsYears[0]);
    month = parseInt(dateMonthsYears[1]);
    return this.getDateMonthFormate(date, month);
  }

  render() {
    console.log("props coming to deliveryInformation is : ", this.props);
    let iconImage = "";
    let typeName = "";
    let formattedPlacedTime;
    if (this.props.placedTime) {
      formattedPlacedTime = this.getDayNumberSuffix(this.props.placedTime);
    }
    let arrowStyle = styles.arrowLink1;
    let iconSize = null;
    let baseClass = styles.base;
    if (this.props.type === SHORT_EXPRESS) {
      iconImage = ExpressImage;
      typeName = !this.props.deliveryInformationByCart
        ? `${EXPRESS_TEXT} ${formattedPlacedTime}`
        : `${EXPRESS_SHIPPING} ${formattedPlacedTime}`;
      arrowStyle = styles.arrowLink;
      iconSize = this.props.inCartPageIcon ? 40 : 35;
    } else if (this.props.type === SHORT_HOME_DELIVERY) {
      iconImage = ExpressImage;
      typeName = `${HOME_TEXT} ${formattedPlacedTime}`;
      iconSize = 35;
    } else if (this.props.type === SHORT_COLLECT) {
      iconImage = CollectImage;
      typeName = !this.props.deliveryInformationByCart
        ? COLLECT_TEXT
        : COLLECT_TEXT_CART;
      iconSize = 35;
    } else if (this.props.type === SHORT_SAME_DAY_DELIVERY) {
      iconImage = ExpressImage;
      typeName = `${SHORT_SAME_DAY_TEXT} ${formattedPlacedTime}`;
      iconSize = 35;
    } else if (this.props.type === SAME_DAY_DELIVERY) {
      iconImage = clockImage;
      typeName = SAME_DAY_DELIVERY_SHIPPING;
      iconSize = 35;
    } else if (this.props.type === HOME_DELIVERY) {
      iconImage = HomeImage;
      typeName = HOME_TEXT;
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
            type={this.props.type === QUIQPIQ ? QUIQPIQ : null}
          >
            {this.props.type === SHORT_SAME_DAY_DELIVERY &&
              this.props.available && (
                <CountDownTimer cutOffSeconds={this.props.cutOffTime} />
              )}

            {this.props.available && this.props.placedTimeForCod && (
              <div className={styles.placeTime}>
                {this.props.placedTimeForCod}
              </div>
            )}

            {this.props.deliverText && (
              <div className={styles.placeTime}>
                ${formattedPlacedTime}
                {this.props.deliverText}
                <span className={styles.text}>{this.props.textHeading}</span>
              </div>
            )}
            {!this.props.available && (
              <div className={styles.placeTime}>{NOT_AVAILABLE}</div>
            )}
            {this.props.isClickable &&
              this.props.type === SHORT_COLLECT &&
              this.props.isShowCliqAndPiqUnderLineText &&
              this.props.available && (
                <div className={styles.underLineButtonHolder}>
                  <div className={styles.address}>
                    UG 89, R City Mall, LBS Road, Ghatkopar West, Mumbai 400070{" "}
                  </div>
                  <span className={styles.buttonHolderPiq}>
                    <UnderLinedButton
                      size={
                        UserAgent.checkUserAgentIsMobile() ? "14px" : "12px"
                      }
                      fontFamily="semibold"
                      color="#ff1744"
                      size="11px"
                      label={this.props.numberOfStore}
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

          {this.props.arrowClick && this.props.type === COLLECT && (
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
