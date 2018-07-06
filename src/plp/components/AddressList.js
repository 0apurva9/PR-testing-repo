import React from "react";
import styles from "./AddressList.css";

export default class AddressList extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div
          className={
            this.props.active ? styles.activeCheckBox : styles.checkBox
          }
        />
      </div>
    );
  }
}
