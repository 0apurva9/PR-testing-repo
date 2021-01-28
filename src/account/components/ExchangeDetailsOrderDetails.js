import React from "react";
import format from "date-fns/format";
import { RouterPropTypes } from "../../general/router-prop-types";
import styles from "./ExchangeDetailsOrderDetails.css";
import exchangeIconLight from "../../cart/components/img/exchangeIconLight.svg";
import ExchangeDetailsTrack from "./ExchangeDetailsTrack";
import PropTypes from "prop-types";
const dateFormat = "DD MMM YYYY";
export default class ExchangeDetailsOrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  goToEchangeCashbackSelection(orderId, currentCashbackMode) {
    let exchangeCashbackSelectionURL = `/my-account/getAccountInfoForExchange?parentOrderId=${orderId}`;
    this.props.history.push({
      pathname: exchangeCashbackSelectionURL,
      state: { currentCashbackMode: currentCashbackMode, orderId: orderId }
    });
  }

  render() {
    const cashbackCredited =
      this.props.products.exchangeDetails &&
      this.props.products.exchangeDetails.exchangeTrackDiagram &&
      this.props.products.exchangeDetails.exchangeTrackDiagram.find(val => {
        return val.displayMessage === "PAYMENT_COMPLETED";
      });
    const exchangeCanceled =
      this.props.products.exchangeDetails &&
      this.props.products.exchangeDetails.exchangeTrackDiagram &&
      this.props.products.exchangeDetails.exchangeTrackDiagram.find(val => {
        return val.displayMessage === "PICKUP_CANCEL";
      });
    let hideDetailsWhenCashbackCredited = false;
    let hideTrackDiagram = false;
    if (
      exchangeCanceled &&
      exchangeCanceled.status &&
      exchangeCanceled.status === "Complete"
    ) {
      // hideExchangeDetails = true;
    }
    if (
      cashbackCredited &&
      cashbackCredited.status &&
      cashbackCredited.status === "Complete"
    ) {
      // hideExchangeDetails = true;
      hideDetailsWhenCashbackCredited = true;
    }
    if (
      this.props.products.exchangeDetails.exchangeTrackDiagram &&
      this.props.products.exchangeDetails.exchangeTrackDiagram[0] &&
      Object.keys(this.props.products.exchangeDetails.exchangeTrackDiagram[0])
        .length === 0
    ) {
      hideTrackDiagram = true;
    }
    return (
      <div className={styles.exchangeDetailsContainer}>
        <img
          src={exchangeIconLight}
          alt="exchange icon"
          className={styles.exchangeIconLight}
        />
        <div className={styles.exchangeProductText}>
          <span className={styles.fontBold}>Exchange Product:</span>{" "}
          {this.props.products.exchangeDetails.exchangeModelName}
          <span
            className={
              !this.state.isToggleOn ? styles.downArrowRotate : styles.downArrow
            }
            onClick={() => this.toggle()}
          />
        </div>

        {!this.state.isToggleOn ? (
          <React.Fragment>
            {this.props.products.exchangeDetails.exchangePriceDetail && (
              <React.Fragment>
                <table
                  className={styles.exchangePricingDetails}
                  cellPadding={0}
                  cellSpacing={0}
                >
                  <tbody>
                    {this.props.products.exchangeDetails.exchangePriceDetail
                      .exchangeAmountCashify && (
                        <tr>
                          <td>Base Value</td>
                          <td>
                            {
                              this.props.products.exchangeDetails
                                .exchangePriceDetail.exchangeAmountCashify
                                .formattedValueNoDecimal
                            }
                          </td>
                        </tr>
                      )}
                    {this.props.products.exchangeDetails.exchangePriceDetail
                      .TULBump && (
                        <tr>
                          <td>CLiQ Exclusive Cashback</td>
                          <td>
                            {
                              this.props.products.exchangeDetails
                                .exchangePriceDetail.TULBump
                                .formattedValueNoDecimal
                            }
                          </td>
                        </tr>
                      )}
                    {this.props.products.exchangeDetails.exchangePriceDetail
                      .pickupCharge && (
                        <tr>
                          <td>Pick Up Charge </td>
                          {this.props.products.exchangeDetails.exchangePriceDetail
                            .pickupCharge.doubleValue === 0 && (
                              <td className={styles.pickupCharge}>FREE</td>
                            )}
                          {this.props.products.exchangeDetails.exchangePriceDetail
                            .pickupCharge.doubleValue !== 0 && (
                              <td>
                                {
                                  this.props.products.exchangeDetails
                                    .exchangePriceDetail.pickupCharge
                                    .formattedValueNoDecimal
                                }
                              </td>
                            )}
                        </tr>
                      )}
                    {this.props.products.exchangeDetails.exchangePriceDetail
                      .totalExchangeCashback && (
                        <tr>
                          <td className={styles.borderWithPaddingTop}>
                            Total Exchange Cashback{" "}
                          </td>
                          <td className={styles.borderWithPaddingTop}>
                            {
                              this.props.products.exchangeDetails
                                .exchangePriceDetail.totalExchangeCashback
                                .formattedValueNoDecimal
                            }
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
                {this.props.products.exchangeDetails.exchangePriceDetail
                  .effectiveAmount && (
                    <div className={styles.effectivePriceContainer}>
                      <div className={styles.effectivePriceText}>
                        <span className={styles.fontLight}>
                          Effective Price for
                      </span>{" "}
                        <span>{this.props.products.productName}</span>
                      </div>
                      <div className={styles.effectivePrice}>
                        {
                          this.props.products.exchangeDetails.exchangePriceDetail
                            .effectiveAmount.formattedValueNoDecimal
                        }
                      </div>
                    </div>
                  )}
              </React.Fragment>
            )}
          </React.Fragment>
        ) : null}
        <div className={styles.bbCustom} />
        {!this.props.products.consignmentStatus.includes("CANCEL") &&
          !this.props.products.consignmentStatus.includes("REFUND") &&
          !this.props.products.consignmentStatus.includes("RETURN") &&
          !this.props.products.consignmentStatus.includes("DELIVERED") && (
            <React.Fragment>
              {!this.props.products.exchangeDetails.exchangePickupPromiseDate &&
                !this.props.products.exchangeDetails.exchangePickedUpDate && (
                  <div className={styles.exchangeEDDContainer}>
                    <span className={styles.fontBold}>
                      Estimated Pick Up by:
                    </span>
                    <span className={styles.fontLight}>
                      {" "}
                      Within 3 days of Product Delivery
                    </span>
                  </div>
                )}

              {this.props.products.exchangeDetails.exchangePickupPromiseDate &&
                !this.props.products.exchangeDetails.exchangePickedUpDate && (
                  <div className={styles.exchangeEDDContainer}>
                    <span className={styles.fontBold}>
                      Estimated Exchange Pick up Date:
                    </span>
                    <span className={styles.fontLight}>
                      {" "}
                      {format(
                        this.props.products.exchangeDetails
                          .exchangePickupPromiseDate,
                        dateFormat
                      )}
                    </span>
                  </div>
                )}

              {this.props.products.exchangeDetails.exchangePickedUpDate && (
                <div className={styles.exchangeEDDContainer}>
                  <span className={styles.fontBold}>
                    Exchange Product Picked up on:
                  </span>
                  <span className={styles.fontLight}>
                    {" "}
                    {format(
                      this.props.products.exchangeDetails.exchangePickedUpDate,
                      dateFormat
                    )}
                  </span>
                </div>
              )}

              {!this.props.products.exchangeDetails.exchangeTrackDiagram &&
                this.props.products.exchangeDetails.exchangePaymentDetails &&
                this.props.products.exchangeDetails.exchangePaymentDetails[0] &&
                this.props.products.exchangeDetails.exchangePaymentDetails[0]
                  .exchangePaymentMode && (
                  <div className={styles.exchangeCashbackDetails}>
                    <div className={styles.exchangeCashbackTextContainer}>
                      <span className={styles.exchangeCashbackText}>
                        You will receive Exchange Cashback, post your old phone
                        pickup, in{" "}
                      </span>
                      {this.props.products.exchangeDetails
                        .exchangePaymentDetails[0].exchangePaymentMode ===
                        "CLIQ_CASH" ? (
                          <span className={styles.exchangeCashbackAccountText}>
                            CLiQ Cash wallet
                        </span>
                        ) : (
                          <span className={styles.exchangeCashbackAccountText}>
                            A/c{" "}
                            {this.props.products.exchangeDetails
                              .exchangePaymentDetails[0].accountNumber &&
                              this.props.products.exchangeDetails.exchangePaymentDetails[0].accountNumber.replace(
                                /.(?=.{4,}$)/g,
                                "x"
                              )}
                          </span>
                        )}
                    </div>
                    <div
                      className={styles.exchangeCashbackChangeMode}
                      onClick={() =>
                        this.goToEchangeCashbackSelection(
                          this.props.orderDetails.orderId,
                          this.props.products.exchangeDetails
                            .exchangePaymentDetails[0].exchangePaymentMode
                        )
                      }
                    >
                      Change Mode
                    </div>
                  </div>
                )}
            </React.Fragment>
          )}

        {(this.props.products.consignmentStatus.includes("CANCEL") ||
          this.props.products.consignmentStatus.includes("RETURN") ||
          this.props.products.consignmentStatus.includes("REFUND") ||
          hideTrackDiagram) &&
          this.props.products.exchangeDetails.exchangeCancelMessage && (
            <React.Fragment>
              <div className={styles.exchangeCancelledText}>
                {this.props.products.exchangeDetails.exchangeCancelMessage}
              </div>
            </React.Fragment>
          )}

        {cashbackCredited &&
          cashbackCredited.status &&
          cashbackCredited.status === "Complete" && (
            <React.Fragment>
              {this.props.products.exchangeDetails.exchangePaymentDetails &&
                this.props.products.exchangeDetails
                  .exchangePaymentDetails[0] && (
                  <div className={styles.cashbackCreditedText}>
                    <span className={styles.fontBold}>Cashback Credited: </span>
                    {this.props.products.exchangeDetails
                      .exchangePaymentDetails[0].exchangePaymentMode ===
                      "CLIQ_CASH" ? (
                        "Cliq Cash Wallet"
                      ) : (
                        <span>
                          Ac no.{" "}
                          {this.props.products.exchangeDetails
                            .exchangePaymentDetails[0].accountNumber &&
                            this.props.products.exchangeDetails.exchangePaymentDetails[0].accountNumber.replace(
                              /.(?=.{4,}$)/g,
                              "x"
                            )}
                        </span>
                      )}
                  </div>
                )}
              <div className={styles.bb} />
              <div className={styles.exchangeProcessedText}>
                Exchange has been processed sucessfully.
              </div>
            </React.Fragment>
          )}
        {!this.props.products.consignmentStatus.includes("CANCEL") &&
          !hideDetailsWhenCashbackCredited &&
          !hideTrackDiagram && (
            <ExchangeDetailsTrack
              exchangeTrackDiagram={
                this.props.products.exchangeDetails.exchangeTrackDiagram
              }
            />
          )}
      </div>
    );
  }
}

ExchangeDetailsOrderDetails.propTypes = {
  orderId: PropTypes.string,
  orderDetails: PropTypes.shape({
    orderId: PropTypes.number
  }),
  products: PropTypes.shape({
    productName: PropTypes.string,
    consignmentStatus: PropTypes.string,
    exchangeDetails: PropTypes.shape({
      exchangePickupPromiseDate: PropTypes.string,
      exchangePickedUpDate: PropTypes.string,
      exchangeCancelMessage: PropTypes.string,
      exchangeTrackDiagram: PropTypes.array,
      exchangeModelName: PropTypes.string,
      exchangePaymentDetails: PropTypes.array,
      exchangePriceDetail: PropTypes.shape({
        effectiveAmount: PropTypes.shape({
          formattedValueNoDecimal: PropTypes.string
        }),
        totalExchangeCashback: PropTypes.shape({
          formattedValueNoDecimal: PropTypes.string
        }),
        pickupCharge: PropTypes.shape({
          doubleValue: PropTypes.string,
          formattedValueNoDecimal: PropTypes.string,
        }),
        TULBump: PropTypes.shape({
          formattedValueNoDecimal: PropTypes.string
        }),
        exchangeAmountCashify: PropTypes.shape({
          formattedValueNoDecimal: PropTypes.string
        })
      })

    })
  }),
  ...RouterPropTypes
};
