import React from "react";
import styles from "./ExchangeModal.css";
import check from "../../pdp/components/img/verifyCheck.svg";

export default class ExchangeModalOtherDetails extends React.Component {
  verifyIMEI(e) {
    this.props.verifyIMEI(e);
  }
  checkIMEI() {
    this.props.checkIMEI();
  }
  agreedTnC(e) {
    this.props.agreedTnC(e);
  }
  openTnCModal() {
    this.props.openTnCModal();
  }
  saveExchangeDetails(IMEINumber) {
    this.props.saveExchangeDetails(IMEINumber);
  }
  render() {
    return (
      <React.Fragment>
        <div className={styles.imeiCheckForm}>
          <input
            type="text"
            placeholder="Enter IMEI Number"
            className={styles.imeiInput}
            onChange={e => this.verifyIMEI(e)}
          />
          <div
            className={
              this.props.enableVerifyButton
                ? styles.enableVerifyButton
                : styles.disableVerifyButton
            }
            onClick={() => this.checkIMEI()}
          >
            {this.props.IMEIVerified ? (
              <span className={styles.verifySuccessButton}>
                <img src={check} alt="check" className={styles.checkIcon} />{" "}
                Verified
              </span>
            ) : (
              "Verify"
            )}
          </div>
          <div
            className={styles.imeiInputInfo}
            dangerouslySetInnerHTML={{
              __html: this.props.checkIMEIMessage
            }}
          />
        </div>
        <div className={styles.effectivePrice}>
          <table cellPadding="0" cellSpacing="0" width="100%">
            <tbody>
              <tr>
                <td className={styles.effectivePriceTrOne}>
                  Effective Price after exchange
                </td>
                <td className={styles.effectivePriceTrTwo}>
                  {this.props.deviceInfo &&
                    this.props.deviceInfo.model.effectiveAmount
                      .formattedValueNoDecimal}
                </td>
              </tr>
              <tr>
                <td>for {this.props.productName}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tncContainer}>
          <input
            type="checkbox"
            className={styles.tncCheckbox}
            onChange={e => this.agreedTnC(e)}
          />
          <div className={styles.tnc}>
            I understand the{" "}
            <span
              className={styles.tncText}
              onClick={() => this.openTnCModal()}
            >
              Terms & Conditions
            </span>{" "}
            of exchange.
          </div>
        </div>
        <div className={styles.exchangeButtonContainer}>
          {this.props.IMEIVerified && this.props.agreedTnCState ? (
            <div
              className={styles.exchangeButtonEnabled}
              onClick={() => this.saveExchangeDetails(this.props.IMEINumber)}
            >
              Proceed with exchange
            </div>
          ) : (
            <div className={styles.exchangeButton}>Proceed with exchange</div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
