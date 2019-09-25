import React from "react";
import BundledProduct from "./BundledProduct";
import styles from "./BundledProductModal.css";

export default class BundledProductModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className={styles.base}>
          <BundledProduct {...this.props} />
        </div>
      </React.Fragment>
    );
  }
}
