import React from "react";
import styles from "./ExchangeModal.css";
import hew1 from "../../pdp/components/img/aehew1.svg";
import hew2 from "../../pdp/components/img/aehew2.svg";
import hew3 from "../../pdp/components/img/aehew3.svg";
import hew4 from "../../pdp/components/img/aehew4.svg";

export default class HowAppliancesExchangeWorksLessDetails extends React.Component {
  render() {
    return (
      <div className={styles.aeWorksLessDetailsContainer}>
        <img src={hew1} alt="" className={styles.iconSize} />
        <div className={styles.contentContainer}>
          <div className={styles.aeContentDescription}>
            Exchange of your old device will be{" "}
            <span className={styles.aeItalicStyle}>processed separately</span>{" "}
            post delivery of your new product.
          </div>
        </div>
        <img src={hew2} alt="" className={styles.iconSize} />
        <div className={styles.contentContainer}>
          <div className={styles.aeContentDescription}>
            Our{" "}
            <span className={styles.aeItalicStyle}>
              CS agent will get in touch
            </span>{" "}
            with you for confirming the acceptance of exchange order post you
            place an order for new product.
          </div>
        </div>
        <img src={hew3} alt="" className={styles.iconSize} />
        <div className={styles.contentContainer}>
          <div className={styles.aeContentDescription}>
            Exchange request is serviceable only on selected pin codes of Delhi
            and Mumbai region. Pin code list here.
          </div>
        </div>
        <img src={hew4} alt="" className={styles.iconSize} />
        <div className={styles.contentContainer}>
          <div className={styles.aeContentDescription}>
            Cashback will be processed in your bank account, details of the same
            will be provided by our CS team.
          </div>
        </div>
      </div>
    );
  }
}
