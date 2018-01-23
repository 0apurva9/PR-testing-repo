import React from "react";
import styles from "./ThemeProductWidget.css";
import CircleProductImage from "./CircleProductImage";
import PropTypes from "prop-types";

export default class ThemeProductWidget extends React.Component {
  render() {
    console.log(this.props.isWhite);
    let className = styles.base;
    if (this.props.isWhite) {
      className = styles.colorWhite;
    }
    return (
      <div className={className}>
        <CircleProductImage image={this.props.image} />
        {this.props.label && (
          <div className={styles.label}>{this.props.label}</div>
        )}
        {this.props.price && (
          <div className={styles.price}>Rs.{this.props.price}</div>
        )}
      </div>
    );
  }
}
ThemeProductWidget.propTypes = {
  label: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string
};
