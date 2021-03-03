import React from "react";
import styles from "./ExchangeDetailsPDPDesktop.css";
import exchangeLogoLoader from "./img/exchangeLogoLoader.svg";

export default class ExchangeDetailsPDPDesktop extends React.Component {
  openExchangeModal() {
    this.props.openExchangeModal();
  }

  openHowExchangeWorksModal(data) {
    this.props.openHowExchangeWorksModal(data);
  }

  trimProductName(productName) {
    if (productName.length > 22) {
      return productName.substring(0, 21) + ".. ";
    } else {
      return productName;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div
          className={
            this.props.productData.totalTulBump
              ? styles.exchangeMainContainer
              : styles.exchangeMainContainerLessPadding
          }
        >
          {this.props.productData.totalTulBump &&
            this.props.productData.totalTulBump.formattedValueNoDecimal && (
              <div className={styles.cliqExclusive}>
                <span className={styles.cliqExclusiveLogo} />
                CLiQ Exclusive{" "}
                {
                  this.props.productData.totalTulBump.formattedValueNoDecimal
                }{" "}
                included in Exchange Cashback
              </div>
            )}
          <div className={styles.exchangeLogoContainer}>
            <img
              src={exchangeLogoLoader}
              className={styles.exchangeLogoLoader}
              alt="exchangeLogoLoader"
            />
            <div className={styles.exchangeLogo} />
          </div>
          <div className={styles.exchangeContainer}>
            <React.Fragment>
              {!this.props.productData.selectedProductName ? (
                <div className={styles.exchangeLink}>
                  Get upto{" "}
                  <span className={styles.fontRegular}>
                    {this.props.productData.maxExchangeAmount &&
                      this.props.productData.maxExchangeAmount
                        .formattedValueNoDecimal}
                  </span>{" "}
                  cashback{" "}
                  {this.props.exchangeDisabled ? (
                    <span className={styles.withDisabledExchangeLink}>
                      with Exchange
                    </span>
                  ) : (
                    <span
                      className={styles.withExchangeLink}
                      onClick={() => this.openExchangeModal()}
                    >
                      with Exchange
                    </span>
                  )}
                </div>
              ) : (
                <div className={styles.exchangeLink}>
                  Get{" "}
                  <span className={styles.fontRegular}>
                    {this.props.productData.selectedProductCashback &&
                      this.props.productData.selectedProductCashback
                        .formattedValueNoDecimal}{" "}
                  </span>
                  cashback on your{" "}
                  {this.trimProductName(
                    this.props.productData.selectedProductName
                  )}{" "}
                  {this.props.exchangeDisabled ? (
                    <span className={styles.withDisabledExchangeLink}>
                      with Exchange
                    </span>
                  ) : (
                    <span
                      className={styles.withExchangeLink}
                      onClick={() => this.openExchangeModal()}
                    >
                      with Exchange
                    </span>
                  )}
                </div>
              )}
              <div
                className={styles.exchangeDetails}
                onClick={() =>
                  this.openHowExchangeWorksModal({
                    openHowExchangeWorksModal: true
                  })
                }
              >
                How Exchange works?
              </div>
            </React.Fragment>
          </div>
        </div>
        {this.props.exchangeDisabled && (
          <div className={styles.notServiciableTetx}>
            Exchange is non serviceable at your pincode
          </div>
        )}
      </React.Fragment>
    );
  }
}
