import React from "react";
import styles from "./ExchangeModal.css";
import cashbackIcon from "../../general/components/img/infoCashback.svg";
import baseValueIcon from "./img/baseValue.svg";
import cliqBonusIcon from "./img/cliqBonus.svg";
import pickUpChargeIcon from "./img/pickUpCharge.svg";

export default class SlideModal extends React.Component {
  handleClose() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.content}>
          <div className={styles.heading}>Exchange Details</div>
          <div className={styles.exchangeInfoLinks}>How Exchange works?</div>
        </div>
        <div className={styles.sliderContainer}>
          <div className={styles.tabSlider}>
            <div className={styles.cashbackHeading}>
              <input type="radio" className={styles.tabOneRadio} />
              <span>Apple iPhone 6</span>
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
                  <td className={styles.fontSize12}>₹2,300</td>
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
                  <td>₹5,000</td>
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
                  <td className={styles.freePickUp}>FREE </td>
                </tr>
                <tr>
                  <td className={styles.cashbackHeading}>
                    Total Exchange Cashback
                  </td>
                  <td className={styles.cashbackHeading}>₹7,300</td>
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
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.tabSlider}>
            <div className={styles.addDevice}>
              <span className={styles.plusSign} />
              <br />
              Add another mobile to Evaluate
            </div>
          </div>
        </div>
        <div className={styles.imeiCheckForm}>
          <input
            type="text"
            placeholder="Enter IMEI Number"
            className={styles.imeiInput}
          />
          <div className={styles.verifyButton}>Verify</div>
          <div className={styles.imeiInputInfo}>
            Dial <span className={styles.howToImeiCheck}>*#06#</span> from your
            old device to know your IMEI number{" "}
          </div>
        </div>
        <div className={styles.effectivePrice}>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
              <tr>
                <td className={styles.effectivePriceTrOne}>
                  Effective Price after exchange
                </td>
                <td className={styles.effectivePriceTrTwo}>₹20,699</td>
              </tr>
              <tr>
                <td colSpan="2">for Realme 3i</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tncContainer}>
          <input type="checkbox" className={styles.tncCheckbox} />
          <div className={styles.tnc}>
            I understand the{" "}
            <span className={styles.tncText}>Terms & Conditions</span> of
            exchange.
          </div>
        </div>
        <div className={styles.exchangeButtonContainer}>
          <div className={styles.exchangeButton}>Proceed with exchange</div>
        </div>
      </div>
    );
  }
}
