import React from "react";
import styles from "./ExchangeModal.css";

export default class ExchangeTnCModal extends React.Component {
  closeTnCModal() {
    this.props.closeTnCModal();
  }
  render() {
    return (
      <div className={styles.termsConditionsContainer}>
        <div
          className={styles.modalBackArrow}
          onClick={() => this.closeTnCModal()}
        />
        <div className={styles.howExchangeWorksHeading}>
          Terms &amp; Conditions
        </div>
        <div className={styles.contentHeading}>1) Mobile Exchange Policy </div>
        <ul className={styles.contentHeading}>
          <li>
            The exchange phone will be picked up within 2 days after the new
            phone is delivered to the customer{" "}
          </li>
          <li>
            Once the exchange phone pickup is scheduled, the exchange process
            cannot be cancelled by the customer. However customer can deny to
            provide the exchange phone to the logistic person when the pickup is
            attempted.{" "}
          </li>
          <li>
            Customer will ensure that the Brand and model of the old device
            matches the declaration provided by them while entering the exchange
            details.{" "}
          </li>
          <li>
            If the device is not working or the delivery executive is not able
            to do an iCloud unlock check or screen lock check / IMEI check due
            to a phone being 'factory reset or if there is any mismatch in the
            information provided by me regarding the device, then the exchange
            offer will be cancelled{" "}
          </li>
          <li>
            Customer must ensure that device being exchanged under the exchange
            program is genuine and is not counterfeit, free from any and all
            encumbrances, liens, attachments, disputes, legal flaws, exchange or
            any agreement of sale etc. and the customer has got the clear
            ownership of the said device
          </li>
        </ul>
        <div className={styles.contentHeading}>
          2) Cancellation, Return &amp; Refund
        </div>
        <ul className={styles.contentHeading}>
          <li>
            If in case the customer wishes to return the new mobile phone the
            amount refunded would be after deducting the additional cashback.
            For e.g.: If the price of the new phone is Rs. 10,000, Total
            Exchange Amount is Rs 3000 (Exchange Value Rs. 2000 & additional
            cashback is Rs. 1000) Customer will get only Rs 9000 (=10,000-1,000)
            as Refund{" "}
          </li>
          <li>
            In case of cancellation of the order related to the new mobile, the
            exchange order will also be cancelled automatically. The exchange
            order will not be processed independently or without a new mobile
            order{" "}
          </li>
          <li>
            In relation to shipping charges of old device, the customer might
            have to pay pickup charges towards shipping charges of old device as
            mentioned in the checkout page. The pickup charges will be over and
            above the exchange value of the old device. In case the exchange
            offer is cancelled as a result of the old device failing any of the
            checks for the product exchange program - the refund of any payment
            made will be after deducting the pickup charges.
          </li>
        </ul>
      </div>
    );
  }
}
