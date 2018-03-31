import React from "react";
import IconWithHeader from "./IconWithHeader";
import styles from "./DeliveryInformations.css";
import UnderLinedButton from "./UnderLinedButton";
import CheckBox from "./CheckBox";
import PropTypes from "prop-types";
import { Icon } from "xelpmoc-core";
import ExpressImage from "./img/expressDelivery.svg";
import HomeImage from "./img/homeDelivery.svg";
import arrowIcon from "./img/arrowBackblack.svg";
import CollectImage from "./img/collect.svg";
import { EXPRESS, COLLECT } from "../../lib/constants";
const EXPRESS_TEXT = "Express delivery";
const HOME_TEXT = "Home delivery";
const COLLECT_TEXT = "CliQ & PiQ";
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
    let iconImage = HomeImage;
    let typeName = HOME_TEXT;
    if (this.props.type === EXPRESS) {
      iconImage = ExpressImage;
      typeName = EXPRESS_TEXT;
    } else if (this.props.type === COLLECT) {
      iconImage = CollectImage;
      typeName = COLLECT_TEXT;
    }
    if (!this.props.available) {
      typeName = `${typeName} - Unavailable`;
    }
    return (
      <div className={styles.base}>
        {this.props.onSelect &&
          this.props.type !== COLLECT && (
            <div
              className={styles.checkboxHolder}
              onClick={() => {
                this.handleSelect();
              }}
            >
              <CheckBox selected={this.props.selected} />
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
        <IconWithHeader image={iconImage} header={typeName}>
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

          {this.props.type === COLLECT &&
            this.props.showCliqAndPiqButton && (
              <div className={styles.underLineButtonHolder}>
                <span className={styles.buttonHolderPiq}>
                  <UnderLinedButton
                    size="14px"
                    fontFamily="regular"
                    color="#ff1744"
                    label="Check for pick up options"
                    onClick={() => this.onPiq()}
                  />
                </span>
              </div>
            )}
        </IconWithHeader>
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
  available: PropTypes.bool
};

DeliveryInformations.propTypes = {
  showCliqAndPiqButton: true
};
