import React from "react";
import styles from "./ComboOfferStrip.css";
import Icon from "../../xelpmoc-core/Icon";
import discountIcon from "./img/discountIcon.svg";
import { trimProductName } from "../../lib/commonFunctionsUtils.js";

export default class ComboOfferStrip extends React.Component {
  render() {
    let bundlingDiscount =
      this.props.bundlingDiscount && parseFloat(this.props.bundlingDiscount);
    let productName =
      this.props.productName && trimProductName(this.props.productName, 35);

    return (
      <div className={!this.props.isUIChange ? styles.discountDetails : null}>
        <div className={styles.discountIconContainer}>
          <Icon image={discountIcon} size={24} />
        </div>
        <div className={styles.bundlingDiscountTextContainer}>
          <span className={styles.bundlingDiscountText}>
            Save additional ₹{bundlingDiscount}
          </span>
          <span className={styles.fontFamilyLight}>
            {" "}
            when buy below item with {productName}
          </span>
        </div>
      </div>
    );
  }
}
