import React from "react";
import PropTypes from "prop-types";
import CheckBox from "../../general/components/CheckBox.js";
import Image from "../../xelpmoc-core/Image";

import styles from "./SellerCardReview.css";

export default class SellerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let {
      title,
      placedTime,
      orderNumber,
      orderFullfilledBy,
      productImage
    } = this.props;

    return (
      <div className={styles.base}>
        <div className={styles.orderDetails}>
          <div className={styles.productNameNMoreInfo}>
            <div className={styles.title}>{title}</div>
          </div>

          <div className={styles.placedTime}>
            Order Placed:{" "}
            <span className={styles.placedTimeText}>{placedTime}</span>
          </div>
          <div className={styles.orderNumber}>
            Order Number:{" "}
            <span className={styles.placedTimeText}>{orderNumber}</span>
          </div>
          <div className={styles.orderFullfilledBy}>
            Order Fulfilled by SELLER{" "}
            <span className={styles.placedTimeText}>{orderFullfilledBy}</span>
          </div>
        </div>
        <div className={styles.productImage}>
          <Image image={productImage} alt="" />
        </div>
      </div>
    );
  }
}

SellerCard.propTypes = {
  productImage: PropTypes.string,
  productName: PropTypes.string,
  additionalContent: PropTypes.element,
  price: PropTypes.number,
  discountPrice: PropTypes.string,
  isSelect: PropTypes.bool
};
SellerCard.defaultProps = {
  quantity: false,
  numberOfQuantity: 1
};
