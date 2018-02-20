import React from "react";
import styles from "./CheckOutHeader.css";
export default class CheckOutHeader extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.confirm}>
          {this.props.confirmTitle}
          <div className={styles.circle}>{this.props.orderNumber}</div>
        </div>
      </div>
    );
  }
}

CheckOutHeader.defaultProps = {
  orderNumber: "1"
};
