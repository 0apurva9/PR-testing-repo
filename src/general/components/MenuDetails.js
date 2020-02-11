import React from "react";
import styles from "./MenuDetails.css";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import Icon from "../../xelpmoc-core/Icon";
import couponIcon from "./img/credit-card.svg";
import {
  setDataLayerForCheckoutDirectCalls,
  ADOBE_CALL_FOR_SELECTING_PAYMENT_MODES
} from "../../lib/adobeUtils";
import {
  EASY_MONTHLY_INSTALLMENTS,
  NET_BANKING_PAYMENT_MODE,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  UPI
} from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";

export default class MenuDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen
    };
  }
  checkupi = async () => {
    if (this.state.isOpen) {
      this.openMenu();
    } else {
      let response;
      let cartGuidUPI = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      let egvGuidUPI = Cookie.getCookie("egvCartGuid");

      if (cartGuidUPI) {
        cartGuidUPI = JSON.parse(cartGuidUPI).guid;
      }

      if (this.props.isFromGiftCard) {
        if (egvGuidUPI) {
          response = await this.props.checkUPIEligibility(egvGuidUPI);
        }
      } else {
        if (cartGuidUPI) {
          if (this.props.retryCartGuid) {
            response = await this.props.checkUPIEligibility(
              this.props.retryCartGuid
            );
          } else {
            response = await this.props.checkUPIEligibility(cartGuidUPI);
          }
        }
      }

      const binResponse = await this.props.binValidationForUPI(UPI);
      if (
        response.status &&
        response.status === "success" &&
        response.checkUPIEligibility &&
        response.checkUPIEligibility.isUpiPaymentEligible
      ) {
        this.openMenu();
      }
    }
  };
  openMenu() {
    let cartGuidUPI = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    console.log("CART_GUID", cartGuidUPI);
    let isOpen = !this.state.isOpen;
    if (isOpen) {
      setDataLayerForCheckoutDirectCalls(
        ADOBE_CALL_FOR_SELECTING_PAYMENT_MODES,
        this.props.textValue ? this.props.textValue : this.props.text
      );
    }
    this.setState({ isOpen });
    if (this.props.onOpenMenu) {
      if (isOpen) {
        this.props.onOpenMenu(
          this.props.textValue ? this.props.textValue : this.props.text
        );
      } else {
        this.props.onOpenMenu(null);
      }
    }
    if (isOpen) {
      if (
        this.props.text === NET_BANKING_PAYMENT_MODE &&
        !this.props.bankList
      ) {
        this.props.getNetBankDetails();
      } else if (
        this.props.text === EASY_MONTHLY_INSTALLMENTS &&
        !this.props.emiList
      ) {
        this.props.getEmiBankDetails();
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }
  }
  render() {
    let iconActive = styles.icon;
    if (this.state.isOpen) {
      iconActive = styles.iconup;
    }
    return (
      <div
        className={styles.base}
        style={{
          borderTop: this.props.isNoBorderTop ? "none" : "1px solid #ececec"
        }}
      >
        <div
          className={styles.holder}
          onClick={() =>
            this.props.text === UPI ? this.checkupi() : this.openMenu()
          }
        >
          <div className={styles.debitCardIcon}>
            <Icon image={this.props.icon} size={25} />
          </div>
          <div className={styles.textBox}>
            {this.props.text === UPI ? "UPI ID" : this.props.text}
            {this.props.secondIcon && !this.state.isOpen && (
              <div className={styles.secondIcon}>
                <Icon
                  image={this.props.secondIcon}
                  size={37}
                  backgroundSize={`100%`}
                />
              </div>
            )}
            <div className={iconActive} />
          </div>
        </div>
        <Collapse isOpened={this.state.isOpen}>{this.props.children}</Collapse>
      </div>
    );
  }
}
MenuDetails.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  onOpenMenu: PropTypes.func,
  isNoBorderTop: PropTypes.bool
};

MenuDetails.defaultProps = {
  icon: couponIcon,
  isNoBorderTop: false
};
