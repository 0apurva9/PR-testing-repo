import React from "react";
import styles from "./ExchangeModal.css";

export default class AppliancesExchangeTnCModal extends React.Component {
  closeTnCModal() {
    this.props.closeTnCModal();
  }

  goToWebForm() {
    this.props.history.push(`/my-account/cliq-care`);
  }

  render() {
    return (
      <div className={styles.termsConditionsContainer}>
        <div className={styles.topContainer}>
          <div
            className={styles.modalBackArrow}
            onClick={() => this.closeTnCModal()}
          />
          <div className={styles.howExchangeWorksHeading}>
            Terms &amp; Conditions
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.contentHeadingTnC}>
            1) Appliance Exchange Policy{" "}
          </div>
          <ul className={styles.listDetailsTnC}>
            <li>
              When customer chooses a new appliance to purchase, he would see
              all the brand-model combination that can be exchanged against it
            </li>
            <li>
              When customer enters old appliance details for exchange, he would
              see Total Exchange cashback broken up into Base value (as per the
              old appliance details) and Additional value (extra cashback
              exclusive on the platform)
            </li>
            <li>
              Once the customer places an order, the exchange appliance will be
              picked up within around 3 days after the new appliance is
              delivered to the customer
            </li>
            <li>
              Customer will ensure that the Brand and model of the old appliance
              matches the details provided by them while entering the exchange
              details
            </li>
            <li>
              If the old appliance is not working if declared or if there is any
              mismatch in the information provided by customer regarding the
              appliance, then the Exchange offer will be cancelled
            </li>
            <li>
              Customer must ensure that appliance being exchanged under the
              Exchange program is genuine and is not counterfeit, free from any
              and all encumbrances, liens, attachments, disputes, legal flaws,
              exchange or any agreement of sale etc. and the customer has got
              the clear ownership of the said appliance
            </li>
          </ul>
          <div className={styles.contentHeadingTnC}>
            2) Cancellation, Return &amp; Refund
          </div>
          <ul className={styles.listDetailsTnC}>
            <li>
              Once the Exchange process is initiated and the old appliance is
              scheduled, the Exchange process cannot be cancelled by the
              customer. However, customer can deny providing the exchange
              appliance to the pick-up executive when the pickup is attempted
            </li>
            <li>
              In case of order cancellation before delivery of new appliance,
              the Exchange order will also be cancelled automatically. The
              Exchange order will not be processed independently or without a
              new appliance order
            </li>
            <li>
              The customer may have to pay pickup charges towards shipping of
              old appliance if mentioned in the checkout page. The pickup
              charges will be over and above the Exchange value of the old
              appliance
            </li>
            <li>
              In case of the customer raising a return request and the refund
              for the same is processed before exchange process completion. The
              customer has received full refund since the exchange is in
              process. In this case if the customer proceeds with exchange, the
              Exchange Cashback credited would be without the &quot;Additional Value&quot;
            </li>
          </ul>
          <div className={styles.contentHeadingTnC}>3) Payments</div>
          <ul className={styles.listDetailsTnC}>
            <li>
              The Exchange amount of customer old appliance will be credited to
              customer’s preferred mode via paylink post door-step quality check
              and pick up
            </li>
            <li>
              If the Exchange appliance doesn’t qualify the Quality check
              performed by the pick-up executive at the time of the pickup and
              the Exchange appliance gets rejected, it will be termed as a
              failed Exchange transaction and will lead to no payout
            </li>
            <li>
              In case of account transfers, the customer will receive cashback
              in their bank accounts within 5 business days post pick up of old
              appliance
            </li>
          </ul>
          <div className={styles.contentHeadingTnC}>
            4) Complaints &amp; Redressal
          </div>
          <ul className={styles.listDetailsTnC}>
            <li>
              For payment failure or any other payment related queries please{" "}
              <span
                className={styles.clickLink}
                onClick={() => this.goToWebForm()}
              >
                Click Here
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
