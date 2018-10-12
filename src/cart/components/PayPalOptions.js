import React from "react";
import styles from "./PayPalOptions.css";
import PropTypes from "prop-types";
import MenuDetails from "../../general/components/MenuDetails.js";
import CheckBox from "../../general/components/CheckBox.js";
import eWalletIcon from "./img/paypalLogo.png";
import paypalLogo from "./img/paypal.png";
import Logo from "../../general/components/Logo";
import { E_WALLET_PAYPAL } from "../../lib/constants";
import DesktopOnly from "../../general/components/DesktopOnly";
import Button from "../../general/components/Button";
export default class PayPalOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.paymentModeSelected) {
      this.setState({ selected: false });
    }
  }
  handleOnSelect() {
    if (this.state.selected) {
      this.props.selectPayPal(false);
      this.setState({ selected: false });
    } else {
      this.setState({ selected: true });
      this.props.selectPayPal(true);
    }
  }
  handleCheckout = () => {
    if (this.props.onCheckout) {
      this.props.onCheckout();
    }
  };
  render() {
    return (
      <div className={styles.base}>
        <MenuDetails
          text={E_WALLET_PAYPAL}
          isOpen={this.props.currentPaymentMode === E_WALLET_PAYPAL}
          onOpenMenu={currentPaymentMode =>
            this.props.onChange({ currentPaymentMode })
          }
          icon={eWalletIcon}
        >
          <div className={styles.payPalHolder}>
            <div
              className={styles.paypalLogoHolder}
              onClick={() => this.handleOnSelect()}
            >
              <div className={styles.checkboxHolder}>
                <CheckBox selected={this.state.selected} />
              </div>
              <div className={styles.paypalIcon}>
                <div className={styles.paypalLogo}>
                  <Logo image={paypalLogo} />
                </div>
                <div className={styles.payPalTextHolder}>
                  <div className={styles.payPalHeading}>
                    The safer and easier way to pay
                  </div>
                  <div className={styles.payPalSubText}>
                    Note: Only credit and debit card transactions are supported
                    on PayPal
                  </div>
                </div>
              </div>
            </div>
            <DesktopOnly>
              <div className={styles.buttonHolder}>
                <Button
                  disabled={!this.state.selected}
                  type="primary"
                  backgroundColor="#ff1744"
                  height={40}
                  label="Pay Now"
                  width={150}
                  textStyle={{
                    color: "#FFF",
                    fontSize: 14
                  }}
                  onClick={this.handleCheckout}
                />
              </div>
            </DesktopOnly>
          </div>
        </MenuDetails>
      </div>
    );
  }
}
PayPalOptions.propTypes = {
  onSelect: PropTypes.func
};
