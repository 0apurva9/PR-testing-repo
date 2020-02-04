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
import quiqIcon from "./img/QuiQIcon.svg";
import deliveryIcon from "./img/deliveryIcon.svg";
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
  SHORT_HOME_DELIVERY,
  SELECTED_STORE
} from "../../lib/constants";
import * as UserAgent from "../../lib/UserAgent.js";
import CountDownTimer from "../../pdp/components/CountDownTimer.js";
const EXPRESS_TEXT = "Delivery by";
const HOME_TEXT = "Delivery by";
const COLLECT_TEXT = "Pick from store";
const COLLECT_TEXT_CART = "Pick from store";
const COD_TEXT = "Cash on Delivery";
const NOT_AVAILABLE = "Not Available";
const SAME_DAY_DELIVERY_SHIPPING_TEXT = "Delivery by";
export default class DeliveryInformations extends React.Component {
  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  async handleSelect(cliqPiq) {
    if (cliqPiq) {
      this.onPiq();
    } else {
      if (this.props.onSelect) {
        this.props.onSelect(this.props.code);
      }
    }
  }
  arrowClick() {
    if (this.props.arrowClick) {
      this.props.arrowClick();
    }
  }
  onPiq() {
    if (this.props.onPiq) {
      this.props.onPiq(this.props.fromSellerCard ? this.props.ussid : null);
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.type === COLLECT &&
      this.props.cliqPiqSelected !== prevProps.cliqPiqSelected
    ) {
      if (this.props.onSelect) {
        this.props.onSelect(this.props.code);
      }
    }
  }

  getDateMonthFormate(date, month) {
    let todayDate = new Date().getDate();
    let nextDayDate = todayDate + 1;
    let newExpressOrSddText;
    if (
      date === todayDate &&
      (this.props.type === SHORT_EXPRESS ||
        this.props.type === SHORT_SAME_DAY_DELIVERY ||
        this.props.type === SHORT_HOME_DELIVERY)
    ) {
      newExpressOrSddText = `Today, `;
    } else if (
      date === nextDayDate &&
      (this.props.type === SHORT_EXPRESS ||
        this.props.type === SHORT_SAME_DAY_DELIVERY ||
        this.props.type === SHORT_HOME_DELIVERY)
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
    let dateWithMonth = "";
    dateWithMonth = new Date(d);
    date = dateWithMonth.getDate();
    month = dateWithMonth.getMonth() + 1;
    if (date && month) {
      return this.getDateMonthFormate(date, month);
    } else return "";
  }

  render() {
    let iconImage = "";
    let typeDate = "";
    let typeText = "";
    let formattedPlacedTime = "";
    let selectedStore = localStorage.getItem(SELECTED_STORE);
    if (this.props.placedTime && this.props.placedTime !== undefined) {
      formattedPlacedTime = this.getDayNumberSuffix(this.props.placedTime);
    }
    if (!formattedPlacedTime && this.props.deliveryMessage) {
      formattedPlacedTime = this.props.deliveryMessage;
    }
    let arrowStyle = styles.arrowLink1;
    let iconSize = null;
    let baseClass = styles.base;
    let cncDeliveryAddressClass = styles.cncDeliveryAddress;
    if (this.props.type === SHORT_EXPRESS) {
      iconImage = deliveryIcon;
      if (this.props.inCartPage || this.props.inCheckOutPage) {
        typeDate = `${formattedPlacedTime}`;
        typeText = this.props.placedTime ? `${EXPRESS_TEXT}` : null;
      } else {
        typeDate = `${formattedPlacedTime}`;
        typeText =
          !this.props.deliveryInformationByCart && this.props.placedTime
            ? `${EXPRESS_TEXT}`
            : null;
      }
      arrowStyle = styles.arrowLink;
      iconSize = this.props.inCartPageIcon ? 40 : 38;
    } else if (this.props.type === SHORT_HOME_DELIVERY) {
      iconImage = deliveryIcon;
      typeDate = `${formattedPlacedTime}`;
      typeText = this.props.placedTime ? `${HOME_TEXT}` : null;
      iconSize = 34;
    } else if (this.props.type === SHORT_COLLECT) {
      iconImage = quiqIcon;
      typeText = !this.props.deliveryInformationByCart
        ? COLLECT_TEXT
        : COLLECT_TEXT_CART;
      iconSize = 34;
    } else if (this.props.type === SHORT_SAME_DAY_DELIVERY) {
      iconImage = deliveryIcon;
      if (this.props.inCartPage || this.props.inCheckOutPage) {
        typeDate = `${formattedPlacedTime}`;
        iconSize = 34;
      } else {
        typeDate = `${formattedPlacedTime}`;
        typeText = this.props.placedTime ? `${SHORT_SAME_DAY_TEXT}` : null;
        iconSize = 34;
      }
    } else if (this.props.type === SAME_DAY_DELIVERY) {
      iconImage = deliveryIcon;
      typeText = this.props.placedTime ? SAME_DAY_DELIVERY_SHIPPING_TEXT : null;
      iconSize = 34;
    } else if (this.props.type === HOME_DELIVERY) {
      iconImage = deliveryIcon;
      typeText = this.props.placedTime ? HOME_TEXT : null;
      iconSize = 34;
    } else if (this.props.isQuiqPiq) {
      iconImage = quiqIcon;
      typeText = QUIQPIQ;
      iconSize = 29;
    } else if (this.props.isCod == "Y") {
      iconImage = codImage;
      typeText = COD_TEXT;
      iconSize = 35;
    }
    if (!this.props.available) {
      typeText = `${typeText}`;
    }

    let deliveryCharge = "";
    if (this.props.deliveryCharge && this.props.type !== SHORT_COLLECT) {
      if (this.props.showDeliveryCharge) {
        deliveryCharge = "Free";
      }
      if (parseInt(this.props.deliveryCharge, 10) !== 0) {
        deliveryCharge = `₹${parseInt(this.props.deliveryCharge, 10)}`;
      }
    }
    if (this.props.pdpApparel) {
      baseClass = styles.basePdp;
    }
    if (this.props.isQuiqPiq === "Y") {
      baseClass = styles.basePdp;
    }
    if (this.props.inCartPage) {
      cncDeliveryAddressClass = styles.cncDeliveryAddressCartPage;
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
            iconSize={iconSize}
            header={`${deliveryCharge}`}
            dateFormatted={typeDate}
            dateFormattedText={typeText}
            inCheckOutPage={this.props.inCheckOutPage}
            type={this.props.type === QUIQPIQ ? QUIQPIQ : null}
          >
            {this.props.cutOffTime && (
              <CountDownTimer cutOffSeconds={this.props.cutOffTime} />
            )}

            {this.props.available &&
              this.props.placedTimeForCod && (
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
                  {selectedStore && (
                    <div className={cncDeliveryAddressClass}>
                      {selectedStore}
                    </div>
                  )}
                  <span className={styles.buttonHolderPiq}>
                    <UnderLinedButton
                      inCheckOutPage={this.props.inCheckOutPage}
                      inCartPage={this.props.inCartPage}
                      inPdpPage={this.props.inPdpPage}
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
                  className={[
                    styles.checkboxHolder,
                    this.props.type === SHORT_HOME_DELIVERY
                      ? styles.topspace0
                      : styles.topspace23
                  ].join(" ")}
                  onClick={() => {
                    this.handleSelect();
                  }}
                >
                  {this.props.isClickable && (
                    <CheckBox selected={this.props.selected} />
                  )}
                </div>
              )
            : this.props.onSelect &&
              this.props.isClickable &&
              this.props.inCartPage
              ? null
              : this.props.onSelect && (
                  <div
                    className={[
                      styles.checkboxHolder,
                      this.props.type === SHORT_HOME_DELIVERY
                        ? styles.topspace0
                        : styles.topspace23
                    ].join(" ")}
                    onClick={() => {
                      this.handleSelect(this.props.type === SHORT_COLLECT);
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
