import React from "react";
import styles from "./ProductImageHeaderDesktop.css";
import PropTypes from "prop-types";
export default class ProductImageHeaderDesktop extends React.Component {
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
          backgroundSize: "cover"
        }}
      />
    );
  }
}
ProductImageHeaderDesktop.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string
};
