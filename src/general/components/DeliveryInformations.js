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
const EXPRESS_TEXT = "Delivery By";
const HOME_TEXT = "Standard Delivery";
const COLLECT_TEXT = "Pick from store:";
const COLLECT_TEXT_CART = "Pick from store";
const COD_TEXT = "Cash on Delivery";
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
    let iconSize = null;
    let baseClass = styles.base;
    if (this.props.type === EXPRESS) {
      iconImage = ExpressImage;
      typeName = !this.props.deliveryInformationByCart
        ? EXPRESS_TEXT
        : EXPRESS_SHIPPING;
      iconSize = 26;
    } else if (this.props.type === HOME_DELIVERY) {
      iconImage = HomeImage;
      typeName = HOME_TEXT;
      iconSize = 35;
    } else if (this.props.type === COLLECT) {
      iconImage = CollectImage;
      typeName = !this.props.deliveryInformationByCart
        ? COLLECT_TEXT
        : COLLECT_TEXT_CART;
      iconSize = 22;
    } else if (this.props.type === SHORT_SAME_DAY_DELIVERY) {
      iconImage = clockImage;
      typeName = SHORT_SAME_DAY_TEXT;
      iconSize = 24;
    } else if (this.props.type === SAME_DAY_DELIVERY) {
      iconImage = clockImage;
      typeName = SAME_DAY_DELIVERY_SHIPPING;
      iconSize = 24;
    } else if (this.props.isQuiqPiq === "Y") {
      iconImage = quiqpiqImage;
      typeName = QUIQPIQ;
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
    if (iconImage && typeName) {
      return (
        <div
          className={baseClass}
          style={{
            paddingTop: this.props.paddingTop,
            paddingBottom: this.props.paddingBottom,
            paddingRight: this.props.paddingRight,
            borderBottom: this.props.borderBottom,
            marginBottom: this.props.isCartForMargin ? "5px" : "0px"
          }}
        >
          <div
            className={
              this.props.available ? styles.dataHolder : styles.notAvailable
            }
          >
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
                  <CheckBox selected={this.props.selected} />
                </div>
              )}
            {this.props.showCliqAndPiqButton &&
              !this.props.selected &&
              this.props.type === COLLECT &&
              this.props.isArrowIcon && (
                <div
                  className={styles.checkboxHolder}
                  onClick={() => this.onPiq()}
                >
                  {/* <CheckBox selected={this.props.selected} /> */}
                  <Icon image={greyArrow} size={20} />
                </div>
              )}
            <IconWithHeader
              image={iconImage}
              header={typeName}
              deliveryModes={typeName}
              fontFamily={this.props.fontFamily}
              isTop={this.props.isTop}
              isNotUnderLineButton={this.props.isNotUnderLineButton}
              fontSize={this.props.fontSize}
              placedTime={this.props.placedTime}
              placedTimeForCod={this.props.placedTimeForCod}
              isShowCliqAndPiqUnderLineText={
                (this.props.type === COLLECT || this.props.type === COLLECT) &&
                this.props.isShowCliqAndPiqUnderLineText
              }
              iconSize={iconSize}
              onPiq={() => this.onPiq()}
              numberOfStore={this.props.numberOfStore}
              isHomeDelivery={this.props.isHomeDelivery}
              marginBottom={this.props.marginBottom}
              deliveryInformationWithDate={
                this.props.deliveryInformationWithDate
              }
              code={this.props.type}
              deliveryInformationByCart={this.props.deliveryInformationByCart}
              selectedStoreDetails={this.props.selectedStoreDetails}
              selectedDeliveryMode={this.props.selectedDeliveryMode}
              notShowDay={this.props.notShowDay}
            >
              {this.props.deliverText && (
                <div className={styles.placeTime}>
                  {this.props.deliverText}
                  <span className={styles.text}>{this.props.textHeading}</span>
                </div>
              )}
            </IconWithHeader>
          </div>
        </div>
      );
    } else {
      return null;
    }
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
  isCartForMargin: PropTypes.bool
};

DeliveryInformations.defaultProps = {
  showCliqAndPiqButton: true,
  showDeliveryCharge: false,
  isShowCliqAndPiqUnderLineText: true,
  isArrowIcon: true,
  deliveryInformationByCart: false,
  isCartForMargin: false
};
