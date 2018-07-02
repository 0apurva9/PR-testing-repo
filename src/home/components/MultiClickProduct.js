import React from "react";
import styles from "./MultiClickProduct.css";
import PropTypes from "prop-types";
export default class MultiClickProduct extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };
  render() {
    return (
      <div className={styles.base} onClick={this.handleClick}>
        <div className={styles.background} />
        <div className={styles.icon} />
        <div className={styles.content}>
          <div className={styles.bold}>{this.props.brandName}</div>
          <div className={styles.light}>{this.props.description}</div>
          <div className={styles.light}>{this.props.price}</div>
        </div>
      </div>
    );
  }
}

MultiClickProduct.propTypes = {
  brandName: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  onClick: PropTypes.func
};
