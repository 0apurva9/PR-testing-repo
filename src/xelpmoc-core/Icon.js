import React from "react";
import PropTypes from "prop-types";
import styles from "./Icon.css";
import VisibilityChild from "../home/components/VisibilityChild.js";

export default class Icon extends React.Component {
  handleClick() {
    if (this.props.selectItem) {
      this.props.selectItem();
    }
  }
  render() {
    return (
      <div
        className={styles.base}
        style={{
          width: this.props.size,
          height: this.props.size,
          display: `${this.props.display}`
        }}
        onClick={() => {
          this.handleClick();
        }}
      >
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${this.props.image})`,
            backgroundSize: `${this.props.backgroundSize}`
          }}
        />
      </div>
    );
  }
}

Icon.propTypes = {
  size: PropTypes.number.isRequired,
  backgroundSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string.isRequired,
  display: PropTypes.string
};

Icon.defaultProps = {
  size: 30,
  backgroundSize: "contain",
  display: "inline-block"
};
