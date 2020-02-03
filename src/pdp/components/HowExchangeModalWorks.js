import React from "react";
import styles from "./ExchangeModal.css";
import hew1 from "../../pdp/components/img/hew1.svg";
import hew2 from "../../pdp/components/img/hew2.svg";
import hew3 from "../../pdp/components/img/hew3.svg";
import hew4 from "../../pdp/components/img/hew4.svg";
import hew5 from "../../pdp/components/img/hew5.svg";

export default class HowExchangeModalWorks extends React.Component {
  closeHowExchangeWorksModal() {
    this.props.closeHowExchangeWorksModal();
  }
  render() {
    return (
      <div className={styles.howExchangeWorksContainer}>
        <div
          className={styles.modalBackArrow}
          onClick={() => this.closeHowExchangeWorksModal()}
        />
        <div className={styles.howExchangeWorksHeading}>
          How exchange works?
        </div>
        <div>
          <img src={hew1} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>
              1. Share your old product details!{" "}
            </div>
            <div className={styles.contentDescription}>
              Once you have decided which phone to buy, we will either auto
              detect your old phone or you can enter them manually. Offer valid
              on select devices only.{" "}
            </div>
          </div>
          <img src={hew2} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>
              2. Check Exchange Cashback value{" "}
            </div>
            <div className={styles.contentDescription}>
              Check the final Exchange Cashback applicable for your old phone
              based on brand-model and detailed check{" "}
            </div>
          </div>
          <img src={hew3} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>
              3. Place order with Exchange{" "}
            </div>
            <div className={styles.contentDescription}>
              Once you place order for your new phone, the exchange order will
              also be confirmed. You will have to choose preferred mode for
              receiving Exchange Cashback{" "}
            </div>
          </div>
          <img src={hew4} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>
              4. Lastly, select the Cashback mode{" "}
            </div>
            <div className={styles.contentDescription}>
              Your new phone order will be delivered as per the scheduled post
              which your exchange order will be processed{" "}
            </div>
          </div>
          <img src={hew5} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>5. Cashback credited </div>
            <div className={styles.contentDescription}>
              Once your new phone is delivered, your exchange phone would be
              picked up separately. At the time of pickup, issues with old phone
              like Screen damage, body cracks or switch on will lead to
              cancellation of exchange{" "}
            </div>
          </div>
          <img src={hew5} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>
              6. Cashback would be credited to the account{" "}
            </div>
            <div className={styles.contentDescription}>
              Upon successful pickup of your old device, the cashback value for
              exchange would be credited to the preferred mode provided by you
              with in 48 hours{" "}
            </div>
          </div>
        </div>
        <div className={styles.contentHeading}>
          Points to be noted: Screen damage, body cracks or switch on issues
          will lead to cancellation of exchange
        </div>
      </div>
    );
  }
}
