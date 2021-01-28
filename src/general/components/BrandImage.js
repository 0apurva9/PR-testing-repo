import React from "react";
import styles from "./BrandImage.css";
import Image from "../../xelpmoc-core/Image";
import PropTypes from "prop-types";
export default class BrandImage extends React.Component {
  handleClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.value);
    }
  }

  render() {
    let iconClass = styles.checkIcon;
    if (this.props.selected) {
      iconClass = styles.checkIconActive;
    }
    return (
      <div className={styles.base} onClick={() => this.handleClick()}>
        <div className={iconClass} />
        <div className={styles.imageHolder}>
          {this.props.image && (
            <Image
              image={this.props.image}
              color="transparent"
              fit={this.props.fit === "1" ? "auto 25px" : "contain"}
            />
          )}
          {this.props.text && (
            <div className={styles.seeAllDetailsText}>{this.props.text}</div>
          )}
        </div>
      </div>
    );
  }
}

BrandImage.propTypes = {
  image: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string,
  fit: PropTypes.string,
  text: PropTypes.string
};
BrandImage.defaultProps = {
  image: "",
  selected: false,
  fit: "contain"
};
