import React from "react";
import styles from "./ShowMoreButton.css";
import Button from "./Button";
export default class ShowMoreButton extends React.Component {
  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.button}>
          <Button
            type={this.props.type}
            width={this.props.width}
            height={this.props.height}
            label={this.props.label}
            color={this.props.color}
            onClick={() => this.onClick()}
          />
        </div>
      </div>
    );
  }
}
ShowMoreButton.defaultProps = {
  height: 36,
  color: "#212121",
  width: 180,
  label: "Show more products",
  type: "hollow"
};
