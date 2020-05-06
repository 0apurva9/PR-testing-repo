import React from "react";
import styles from "./ExchangeModal.css";
import hew1 from "../../pdp/components/img/hew1.svg";
import hew2 from "../../pdp/components/img/hew2.svg";
import hew3 from "../../pdp/components/img/hew3.svg";
import hew4 from "../../pdp/components/img/hew4.svg";
import hew5 from "../../pdp/components/img/hew5.svg";

export default class HowExchangeModalWorksLessDetails extends React.Component {
  render() {
    return (
      <div>
        <img src={hew1} alt="" className={styles.iconSize} />
        <div className={styles.contentContainer}>
          <div className={styles.contentHeading}>
            1. Share your old product details{" "}
          </div>
          <div className={styles.contentDescription}>
            Allow access to auto-detect your old product details or enter them
            manually
          </div>
        </div>
        <img src={hew2} alt="" className={styles.iconSize} />
        <div className={styles.contentContainer}>
          <div className={styles.contentHeading}>
            2. Check applicable Exchange Cashback value{" "}
          </div>
          <div className={styles.contentDescription}>
            Cashback value is proposed based on the old product details
          </div>
        </div>
        <img src={hew3} alt="" className={styles.iconSize} />
        <div className={styles.contentContainer}>
          <div className={styles.contentHeading}>
            3. Place your order with exchange{" "}
          </div>
          <div className={styles.contentDescription}>
            Complete your product purchase along with exchange offer
          </div>
        </div>
        <img src={hew4} alt="" className={styles.iconSize} />
        <div className={styles.contentContainer}>
          <div className={styles.contentHeading}>
            4. Select Exchange Cashback mode{" "}
          </div>
          <div className={styles.contentDescription}>
            Choose your preferred option to process Exchange Cashback for your
            old product
          </div>
        </div>
        <img src={hew5} alt="" className={styles.iconSize} />
        <div className={styles.contentContainer}>
          <div className={styles.contentHeading}>
            5. Receive Exchange Cashback{" "}
          </div>
          <div className={styles.contentDescription}>
            Exchange Cashback would be credited to your preferred mode within 2
            business days after delivery of your new product and pickup of the
            old product
          </div>
        </div>
      </div>
    );
  }
}
