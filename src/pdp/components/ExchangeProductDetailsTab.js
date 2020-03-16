import React from "react";
import styles from "./ExchangeModal.css";
import cashbackIcon from "../../general/components/img/infoCashback.svg";
import baseValueIcon from "./img/baseValue.svg";
import cliqBonusIcon from "./img/cliqBonus.svg";
import pickUpChargeIcon from "./img/pickUpCharge.svg";

export default class ExchangeProductDetailsTab extends React.Component {
  openCashbackModal() {
    this.props.openCashbackModal();
  }
  changeDevice(deviceNo) {
    this.props.changeDevice(deviceNo);
  }
  render() {
    return (
      <React.Fragment>
        <div className={styles.cashbackHeading}>
          {/* <input
            type="radio"
            className={styles.tabOneRadio}
            defaultChecked={this.props.deviceInfo}
          /> */}
          <span className={styles.textCaps}>
            {this.props.deviceInfo &&
              this.props.deviceInfo.model.effectiveModelName}
          </span>
          {this.props.bothDeviceAdded && (
            <span
              className={styles.changeDevice}
              onClick={deviceNo => this.changeDevice(this.props.deviceNo)}
            >
              Change
            </span>
          )}
        </div>
        <table
          border="0"
          cellPadding="10"
          cellSpacing="0"
          className={styles.exchangeOfferTable}
        >
          <tbody>
            <tr>
              <td className={styles.fontSize12}>
                <img
                  src={baseValueIcon}
                  alt="Base value"
                  className={styles.icons}
                />
                Base value
              </td>
              <td className={styles.fontSize12}>
                {this.props.deviceInfo &&
                  this.props.deviceInfo.model.exchangeAmountCashify
                    .formattedValueNoDecimal}
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src={cliqBonusIcon}
                  alt="CLiQ Bonus"
                  className={styles.icons}
                />
                CLiQ Bonus
              </td>
              <td>
                {this.props.deviceInfo &&
                  this.props.deviceInfo.tulBump.formattedValueNoDecimal}
              </td>
            </tr>
            <tr>
              <td className={styles.fontSize12}>
                <img
                  src={pickUpChargeIcon}
                  alt="Pick up charge"
                  className={styles.icons}
                />
                Pick up charge
              </td>
              <td className={styles.freePickUp}>
                {this.props.deviceInfo &&
                  this.props.deviceInfo.pickupCharge && (
                    <React.Fragment>
                      {this.props.deviceInfo.pickupCharge.value === 0
                        ? "FREE"
                        : this.props.deviceInfo.pickupCharge
                            .formattedValueNoDecimal}}
                    </React.Fragment>
                  )}
              </td>
            </tr>
            <tr>
              <td className={styles.cashbackHeading}>
                Total Exchange Cashback
              </td>
              <td className={styles.cashbackHeading}>
                {this.props.deviceInfo &&
                  this.props.deviceInfo.model.totalExchangeCashback
                    .formattedValueNoDecimal}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className={styles.cashbackSubtitle}>
                <span className={styles.cashbackInfoSubtitle}>
                  Cashback will be credited to your account.
                </span>
                <img
                  src={cashbackIcon}
                  alt="info"
                  className={styles.cashbackInfoIcon}
                  onClick={() => this.openCashbackModal()}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
