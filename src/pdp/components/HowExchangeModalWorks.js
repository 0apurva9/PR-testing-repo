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
              1. Share your old phone details{" "}
            </div>
            <div className={styles.contentDescription}>
              Once you have decided which phone to buy, to view the exchange
              offer, allow access to auto-detect your old phone details or enter
              them manually.{" "}
            </div>
          </div>
          <img src={hew2} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>
              2. Check applicable Exchange Cashback value{" "}
            </div>
            <div className={styles.contentDescription}>
              Cashback value is proposed based on the old product details.
              Additionally, you may choose to run a full diagnostic check
              (available on App) to get additional cashback{" "}
            </div>
          </div>
          <img src={hew3} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>
              3. Place the order for your new phone and select preferred mode to
              get Exchange Cashback{" "}
            </div>
            <div className={styles.contentDescription}>
              Place the order for your new phone along with exchange offer.
              Remember to select your preferred payment mode for receiving
              Exchange Cashback{" "}
            </div>
          </div>
          <img src={hew4} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>
              4. Your new phone would be delivered{" "}
            </div>
            <div className={styles.contentDescription}>
              Your new phone order will be delivered as per the scheduled post
              which your exchange order will be processed{" "}
            </div>
          </div>
          <img src={hew5} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>
              5. Hand over your old/exchange product{" "}
            </div>
            <div className={styles.contentDescription}>
              Your old phone will be picked up separately after successful
              delivery of your new phone. Please note that the physical
              condition of the old product such as major screen damage, severe
              cracks on body and/or power on issues will lead to cancellation of
              exchange{" "}
            </div>
          </div>
          <img src={hew5} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>
              6. Receive Exchange Cashback{" "}
            </div>
            <div className={styles.contentDescription}>
              Upon successful pick-up of your old phone, the Exchange Cashback
              value will be credited to your preferred payment mode within 2
              business days{" "}
            </div>
          </div>
        </div>
        <div className={styles.contentHeading}>
          The exchange product will be rejected if,
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.contentDescription}>
            a) the phone does not power on{" "}
          </div>
          <div className={styles.contentDescription}>
            b) the brand or model is different from what was mentioned by you on
            Tata CLiQ at the time of purchase of your new phone
          </div>
          <div className={styles.contentDescription}>
            c) screen lock (all forms of screen lock viz. pattern, pin,
            password, fingerprint, face recognition, smart lock, etc. need to be
            deactivated) or iCloud lock (Apple) is not removed{" "}
          </div>
          <div className={styles.contentDescription}>
            d) IMEI No., on dialing *#06#, does not match with that provided by
            you on Tata CLiQ at the time of purchase of your new phone
          </div>
        </div>
      </div>
    );
  }
}
