import React from "react";
import BeautyIconWithHeader from "./BeautyIconWithHeader";
import styles from "./BeautyDeliveryInformations.css";
import UnderLinedButton from "../../../../../general/components/UnderLinedButton";
import CheckBox from "../../../../../general/components/CheckBox";
import PropTypes from "prop-types";
import Icon from "../../../../../xelpmoc-core/Icon";
import arrowIcon from "../../../../../general/components/img/arrowBackblack.svg";
import greyArrow from "../../../../../general/components/img/greyArrow.svg";
import quiqpiqImage from "../../../../../general/components/img/quiqlogo.png";
import codImage from "../../../../../general/components/img/beauty-COD.svg";
import quiqIcon from "../../../../../general/components/img/beautyPick.svg";
import deliveryIcon from "../../../../../general/components/img/expressDeliveryBeauty.svg";
import {
  SHORT_EXPRESS,
  COLLECT,
  SHORT_COLLECT,
  QUIQPIQ,
  SHORT_SAME_DAY_TEXT,
  SHORT_SAME_DAY_DELIVERY,
  SAME_DAY_DELIVERY,
  HOME_DELIVERY,
  SHORT_HOME_DELIVERY,
} from "../../../../../lib/constants";
import CountDownTimer from "../../../../components/CountDownTimer.js";
const EXPRESS_TEXT = "Delivery by";
const HOME_TEXT = "Delivery by";
const COLLECT_TEXT = "Pick from Store";
const COLLECT_TEXT_CART = "Pick from Store";
const COD_TEXT = "Cash on Delivery";
const NOT_AVAILABLE = "Not Available";
const SAME_DAY_DELIVERY_SHIPPING_TEXT = "Delivery by";

export default class BeautyDeliveryInformations extends React.Component {
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
    let currentMonth = new Date().getMonth() + 1;
    let nextDayDate = todayDate + 1;
    let newExpressOrSddText;
    let fromDateText = "";
    if (
      date === todayDate &&
      month === currentMonth &&
      (this.props.type === SHORT_EXPRESS ||
        this.props.type === SHORT_SAME_DAY_DELIVERY ||
        this.props.type === SHORT_HOME_DELIVERY)
    ) {
      newExpressOrSddText = `Today, `;
    } else if (
      date === nextDayDate &&
      month === currentMonth &&
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
          return fromDateText + "" + date + "st " + monthNames[month - 1];
        }
      case 2:
      case 22:
        if (newExpressOrSddText) {
          return newExpressOrSddText + date + "nd " + monthNames[month - 1];
        } else {
          return fromDateText + "" + date + "nd " + monthNames[month - 1];
        }
      case 3:
      case 23:
        if (newExpressOrSddText) {
          return newExpressOrSddText + date + "rd " + monthNames[month - 1];
        } else {
          return fromDateText + "" + date + "rd " + monthNames[month - 1];
        }
      default:
        if (newExpressOrSddText) {
          return newExpressOrSddText + date + "th " + monthNames[month - 1];
        } else {
          return fromDateText + "" + date + "th " + monthNames[month - 1];
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
      return this.getDateMonthFormate(date, month, dateWithMonth);
    } else return "";
  }

  render() {
    let iconImage = "";
    let typeDate = "";
    let typeText = "";
    let formattedPlacedTime = "";
    if (this.props.placedTime && this.props.placedTime !== undefined) {
      //converting "MM-DD-YYYY HH:MM:SS"(API value) to "MM/DD/YYYY" for cross browser support
      // JS date object does'nt support "MM-DD-YYYY HH:MM:SS" format in safari, mozilla and IE
      let dateArray = this.props.placedTime.split(" ")[0].split("-"),
        newFormattedDate = `${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`;
      formattedPlacedTime = this.getDayNumberSuffix(newFormattedDate);
    }
    if (!formattedPlacedTime && this.props.deliveryMessage) {
      formattedPlacedTime = this.props.deliveryMessage;
    }
    let arrowStyle = styles.arrowLink1;
    let iconSize = null;
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
      iconSize = this.props.inCartPageIcon ? 34 : 38;
    } else if (this.props.type === SHORT_HOME_DELIVERY) {
      iconImage = deliveryIcon;
      typeDate = `${formattedPlacedTime}`;
      typeText = this.props.placedTime ? `${HOME_TEXT}` : null;
      iconSize = 38;
    } else if (this.props.type === SHORT_COLLECT) {
      iconImage = quiqIcon;
      typeText = !this.props.deliveryInformationByCart
        ? COLLECT_TEXT
        : COLLECT_TEXT_CART;
      iconSize = 30;
    } else if (this.props.type === SHORT_SAME_DAY_DELIVERY) {
      iconImage = deliveryIcon;
      if (this.props.inCartPage || this.props.inCheckOutPage) {
        typeDate = `${formattedPlacedTime}`;
        iconSize = 34;
      } else {
        typeDate = `${formattedPlacedTime}`;
        typeText = this.props.placedTime ? `${SHORT_SAME_DAY_TEXT}` : null;
        iconSize = 38;
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
      iconImage = quiqpiqImage;
      typeText = QUIQPIQ;
      iconSize = 40;
    } else if (this.props.isCod == "Y") {
      iconImage = codImage;
      typeText = COD_TEXT;
      iconSize = 35;
    }
    if (!this.props.available) {
      typeText = `${typeText}`;
    }

    if (this.props.pdpApparel && typeDate.includes(" and ")) {
      typeText = "Delivery between";
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
    if (this.props.fromSellerCard) {
      cncDeliveryAddressClass = styles.cncDeliveryAddressFullWidth;
    }
    if (this.props.inCartPage || this.props.inCheckOutPage) {
      cncDeliveryAddressClass = styles.cncDeliveryAddressCartPage;
    }
    let storeDetails = this.props.storeDetails;
    return (
      <React.Fragment>
        <div
          className={[
            this.props.type === QUIQPIQ ? styles["quiq-piq"] : "",
            this.props.type === SHORT_COLLECT ? styles["pick-store-block"] : "",
            this.props.type === SHORT_SAME_DAY_DELIVERY ||
            this.props.type === SHORT_HOME_DELIVERY ||
            this.props.isCod === "Y"
              ? styles["ship-date-block"]
              : ""
          ].join(" ")}
        >
          <BeautyIconWithHeader
            image={iconImage}
            iconShow={this.props.iconShow}
            iconSize={iconSize}
            header={`${deliveryCharge}`}
            dateFormatted={typeDate}
            dateFormattedText={typeText}
            inCheckOutPage={this.props.inCheckOutPage}
            inPdpPage={this.props.pdpApparel}
            type={this.props.type}
            inCartPage={this.props.inCartPage}
            isCod={this.props.isCod}
          >
            {this.props.cutOffTime && (
              <CountDownTimer
                cutOffSeconds={this.props.cutOffTime}
                fromBeautyPdp={true}
              />
            )}

            {this.props.available && this.props.placedTimeForCod && (
              <span className={styles.placeTime}>
                {` ${this.props.placedTimeForCod}`}
              </span>
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
                  {storeDetails && storeDetails.address && (
                    <div className={cncDeliveryAddressClass}>
                      {storeDetails.address}
                    </div>
                  )}
                  <span className={styles.buttonHolderPiq}>
                    <UnderLinedButton
                      inCheckOutPage={this.props.inCheckOutPage}
                      inCartPage={this.props.inCartPage}
                      inPdpPage={this.props.inPdpPage}
                      /*    size={
                        UserAgent.checkUserAgentIsMobile() ? "14px" : "12px"
                      } */
                      color="#da1c5c"
                      size="14px"
                      fontWeight="300"
                      label={this.props.numberOfStore}
                      onClick={() => this.onPiq()}
                    />
                  </span>
                </div>
              )}
          </BeautyIconWithHeader>
          {this.props.type === COLLECT ? (
            this.props.selected &&
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
          ) : this.props.onSelect &&
            this.props.isClickable &&
            this.props.inCartPage ? null : this.props.onSelect &&
            !this.props.inCartPage ? (
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
          ) : null}
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
      </React.Fragment>
    );
  }
}
BeautyDeliveryInformations.propTypes = {
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
  inCartPageIcon: PropTypes.bool,
  onSelect: PropTypes.func,
  code: PropTypes.string,
  fromSellerCard: PropTypes.bool,
  ussid: PropTypes.string,
  cliqPiqSelected: PropTypes.bool,
  deliveryMessage: PropTypes.string,
  placedTime: PropTypes.string,
  deliveryInformationByCart: PropTypes.bool,
  inCheckOutPage: PropTypes.bool,
  isQuiqPiq: PropTypes.bool,
  isCod: PropTypes.string,
  pdpApparel: PropTypes.bool,
  deliveryCharge: PropTypes.string,
  storeDetails: PropTypes.object,
  iconShow: PropTypes.bool,
  cutOffTime: PropTypes.string,
  placedTimeForCod: PropTypes.string,
  deliverText: PropTypes.string,
  textHeading: PropTypes.string,
  isClickable: PropTypes.bool,
  inPdpPage: PropTypes.bool,
  numberOfStore: PropTypes.string,
  selected: PropTypes.bool
};

BeautyDeliveryInformations.defaultProps = {
  showCliqAndPiqButton: true,
  showDeliveryCharge: false,
  isShowCliqAndPiqUnderLineText: true,
  isArrowIcon: true,
  deliveryInformationByCart: false,
  isCartForMargin: false,
  inCartPage: false,
  inCartPageIcon: false
};
