import React from "react";
import styles from "./DeliveryAddressCart.css";
import CheckBox from "../../general/components/CheckBox.js";
import CheckBoxSquare from "../../general/components/CheckBoxSquare.js";
import Whatsapp from "../../general/components/img/whatsapp.svg";
import PropTypes from "prop-types";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
export default class DeliveryAddressCopy extends React.Component {
  constructor() {
    super();
    this.state = {
      whatsAppActive: false
    };
  }
  handleClick() {
    if (this.props.selectItem) {
      this.props.selectItem();
    }
  }
  handleWhatsAppClick() {
    this.setState({ whatsAppActive: !this.state.whatsAppActive });
  }
  render() {
    return (
      <React.Fragment>
        <div
          className={this.props.isReturn ? styles.baseForReturn : styles.base}
          onClick={() => this.handleClick()}
        >
          <div
            className={
              this.props.isReturn
                ? styles.titleAddressForReturn
                : styles.titleAddress
            }
          >
            {this.props.addressTitle}
          </div>
          <div
            className={
              this.props.isReturn
                ? styles.titleDescriptionForReturn
                : styles.titleDescription
            }
          >
            {this.props.addressDescription}
            <MobileOnly>
              {!this.props.isReturn && (
                <div className={styles.checkCircle}>
                  <CheckBox selected={this.props.selected} />
                </div>
              )}
            </MobileOnly>
            {this.props.isReturn && (
              <div className={styles.checkCircleForReturn}>
                <CheckBox selected={this.props.selected} />
              </div>
            )}
          </div>
          {this.props.contact && (
            <div
              className={
                this.props.isReturn
                  ? styles.titleContactForReturn
                  : styles.titleContact
              }
            >
              Ph. {this.props.phone}
            </div>
          )}
          <DesktopOnly>
            {!this.props.isReturn && (
              <div className={styles.checkCircle}>
                <CheckBox selected={this.props.selected} />
              </div>
            )}
          </DesktopOnly>

          {this.props.selected && (
            <div
              className={styles.baseWhatsapp}
              onClick={() => this.handleWhatsAppClick()}
            >
              <div className={styles.whatsAppTick}>
                <CheckBoxSquare
                  selected={this.state.whatsAppActive}
                  size="16px"
                />
              </div>
              <div className={styles.orderUpdateText}>
                Get order updates on Whatsapp
                <div className={styles.whatsappImage}>
                  <img src={Whatsapp} alt="" width="18px" height="18px" />
                </div>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

DeliveryAddressCopy.propTypes = {
  addressTitle: PropTypes.string,
  addressDescription: PropTypes.string,
  selected: PropTypes.bool,
  selectItem: PropTypes.func,
  isReturn: PropTypes.bool
};
DeliveryAddressCopy.defaultProps = {
  isReturn: false
};
