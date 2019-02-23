import React from "react";
import styles from "./Maintenance.css";

export default class Maintenance extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className={styles.maintenanceHeader}>
          <div className={styles.headerHolder}>
            <div className={styles.logoHolder} />
          </div>
        </div>
        <div className={styles.base}>
          <div className={styles.headerWithTextHolder}>
            {/* <div className={styles.pageTitle}>502</div> */}
            <div className={styles.infoText}>
              Our site is going through an upgrade. Do visit us in a few hours.{" "}
            </div>
            <div className={styles.infoText}>
              In the meantime please call us at{" "}
              <a href="tel:+919029108282" className={styles.linkColor}>
                9029108282
              </a>{" "}
              or email us at{" "}
              <a href="mailto:hello@tatacliq.com" className={styles.linkColor}>
                hello@tatacliq.com
              </a>{" "}
              if you have any queries.
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
