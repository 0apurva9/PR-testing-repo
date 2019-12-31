import React from "react";
import PropTypes from "prop-types";
import styles from "./Icon.css";

export default class Icon extends React.Component {
  handleClick() {
    if (this.props.selectItem) {
      this.props.selectItem();
    }
  }
  render() {
    let iconWidth = this.props.width ? this.props.width : this.props.size;
    let iconHeight = this.props.height ? this.props.height : this.props.size;
    return (
      <div
        className={styles.base}
        style={{
          width: iconWidth,
          height: iconHeight
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
  size: PropTypes.number,
  backgroundSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string.isRequired
};

Icon.defaultProps = {
  size: 30,
  backgroundSize: "contain"
};
