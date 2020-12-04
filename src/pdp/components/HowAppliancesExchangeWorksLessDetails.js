import React from "react";
import styles from "./ExchangeModal.css";
import hew1 from "../../pdp/components/img/aehew1.svg";
import hew2 from "../../pdp/components/img/aehew2.svg";
import hew3 from "../../pdp/components/img/aehew3.svg";
import hew4 from "../../pdp/components/img/aehew4.svg";
import hew5 from "../../pdp/components/img/aehew5.svg";

export default class HowAppliancesExchangeWorksLessDetails extends React.Component {
  render() {
    return (
      <div className={styles.aeWorksLessDetailsContainer}>
        <img src={hew1} alt="" className={styles.iconSize} />
        <div className={styles.contentContainer}>
          <div className={styles.contentHeading}>
            1. Share your old product details{" "}
          </div>
          <div className={styles.contentDescription}>
            Enter the Brand &amp; Capacity of your old product
          </div>
        </div>
        <img src={hew2} alt="" className={styles.iconSize} />
        <div className={styles.contentContainer}>
          <div className={styles.contentHeading}>
            2. Check applicable Exchange Cashback value{" "}
          </div>
          <div className={styles.contentDescription}>
            Cashback value is proposed based on the Old Product Details
          </div>
        </div>
        <img src={hew3} alt="" className={styles.iconSize} />
        <div className={styles.contentContainer}>
          <div className={styles.contentHeading}>
            3. Place order with exchange{" "}
          </div>
          <div className={styles.contentDescription}>
            Complete your Product purchase along with Exchange Offer
          </div>
        </div>
        <img src={hew4} alt="" className={styles.iconSize} />
        <div className={styles.contentContainer}>
          <div className={styles.contentHeading}>
            4. Hand over your old/exchange product{" "}
          </div>
          <div className={styles.contentDescription}>
            <ul>
              <li className={styles.mb5}>
                Exchange product will be picked up within 3 days of the delivery
                of the new product{" "}
              </li>
            </ul>
          </div>
        </div>
        <img src={hew5} alt="" className={styles.iconSize} />
        <div className={styles.contentContainer}>
          <div className={styles.contentHeading}>
            5. Receive Exchange Cashback{" "}
          </div>
          <div className={styles.contentDescription}>
            Exchange Cashback would be credited to your preferred mode within 5
            business days after pickup of the old product via paylink shared by
            Tata CLiQ Team
          </div>
        </div>
        <div className={styles.noteContentContainer}>
          <div className={styles.contentDescription}>
            Points to be Noted: Physical Condition of the appliance will be such
            as major damage, not switching on if declared and brand &amp;
            capacity mismatch will lead to exchange cancellation
          </div>
        </div>
      </div>
    );
  }
}
