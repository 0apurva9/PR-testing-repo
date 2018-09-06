import React from "react";
import styles from "./ProductImageHeaderDesktop.css";
import PropTypes from "prop-types";
export default class ProductImageHeaderDesktop extends React.Component {
  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    const { backgroundColor, backgroundImage } = this.props;
    return (
      <div
        className={styles.base}
        style={{
          backgroundColor: backgroundColor,
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          cursor: "pointer"
        }}
        onClick={() => this.onClick()}
      />
    );
  }
}
ProductImageHeaderDesktop.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string
};
