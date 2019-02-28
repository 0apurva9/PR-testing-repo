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
        <div className={styles.base} />
      </React.Fragment>
    );
  }
}
