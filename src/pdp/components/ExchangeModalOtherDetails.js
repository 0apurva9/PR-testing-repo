import React from "react";
import styles from "./ExchangeModal.css";
import check from "../../pdp/components/img/verifyCheck.svg";

export default class ExchangeModalOtherDetails extends React.Component {
  verifyIMEI(e, deviceNo) {
    this.props.verifyIMEI(e, deviceNo);
  }

  checkIMEI(deviceNo) {
    this.props.checkIMEI(deviceNo);
  }

  agreedTnC(e, deviceNo) {
    this.props.agreedTnC(e, deviceNo);
  }

  openTnCModal() {
    this.props.openTnCModal();
  }

  async saveExchangeDetails(IMEINumber) {
    await this.props.saveExchangeDetails(IMEINumber);
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.imeiCheckForm}>
          <input
            type="number"
            className={styles.imeiInput}
            onChange={(e) => this.verifyIMEI(e, this.props.deviceNo)}
            value={this.props.currentIMEI}
            required
          />
          <label className={styles.imeiPlaceholder}>
            Enter IMEI Number<span className={styles.asterik}>*</span>
          </label>
          <div
            className={
              this.props.enableVerifyButton
                ? styles.enableVerifyButton
                : styles.disableVerifyButton
            }
            onClick={() => this.checkIMEI(this.props.deviceNo)}
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
                  Effective Price after Exchange
                </td>
                <td className={styles.effectivePriceTrTwo}>
                  {this.props.deviceInfo &&
                    this.props.deviceInfo.model &&
                    this.props.deviceInfo.model.effectiveAmount &&
                    this.props.deviceInfo.model.effectiveAmount
                      .formattedValueNoDecimal}
                </td>
              </tr>
              <tr>
                <td className={styles.productNameTruncated}>
                  for {this.props.productName}
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tncContainer}>
          <input
            type="checkbox"
            className={styles.tncCheckbox}
            onChange={(e) => this.agreedTnC(e, this.props.deviceNo)}
            checked={this.props.agreedTnCState}
          />
          <div className={styles.tnc}>
            I understand the{" "}
            <span
              className={styles.tncText}
              onClick={() => this.openTnCModal()}
            >
              Terms & Conditions
            </span>{" "}
            of Exchange.
          </div>
        </div>
        <div className={styles.exchangeButtonContainer}>
          {this.props.IMEIVerified && this.props.agreedTnCState ? (
            <div
              className={styles.exchangeButtonEnabled}
              onClick={() => this.saveExchangeDetails(this.props.IMEINumber)}
            >
              Proceed with Exchange
            </div>
          ) : (
            <div className={styles.exchangeButton}>Proceed with Exchange</div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
