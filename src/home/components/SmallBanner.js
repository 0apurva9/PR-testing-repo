import React from "react";
import Image from "../../xelpmoc-core/Image";
import styles from "./SmallBanner.css";

export default class SmallBanner extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };
  render() {
    return (
      <div className={styles.base} onClick={this.handleClick}>
        <div className={styles.imageHolder}>
          <div className={styles.image}>
            <Image image={this.props.image} />
          </div>
        </div>
        <div className={styles.content}>
          {this.props.title && (
            <div className={styles.title}>{this.props.title}</div>
          )}
          {this.props.description && (
            <div className={styles.description}>{this.props.description}</div>
          )}
        </div>
      </div>
    );
  }
}
