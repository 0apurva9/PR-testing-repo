import React from "react";
import styles from "./Input.css";
import CoreInput1 from "../../xelpmoc-core/CoreInput1";

export default class Input4 extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <CoreInput1 {...this.props} styles={styles} />
      </div>
    );
  }
}
