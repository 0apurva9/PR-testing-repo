import React from "react";
import PdpFooter from "./PdpFooter";
import styles from "./PdpFrame.css";
export default class PdpFrame extends React.Component {
  onSave() {
    if (this.props.addProductToWishList) {
      this.props.addProductToWishList();
    }
  }
  onAddToBag() {
    if (this.props.addProductToBag) {
      this.props.addProductToBag();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        {this.props.children}
        <PdpFooter
          onSave={() => this.onSave()}
          onAddToBag={() => this.onAddToBag()}
        />
      </div>
    );
  }
}
