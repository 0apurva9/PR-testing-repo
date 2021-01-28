import React from "react";
import styles from "./BrandsItem.css";
export default class BrandsItem extends React.Component {
  onSelect() {
    if (this.props.selectItem) {
      this.props.selectItem();
    }
  }

  render() {
    let className = styles.base;
    if (this.props.selected) {
      className = styles.active;
    }
    return (
      <div className={className} onClick={() => this.onSelect()}>
        <h2> {this.props.label}</h2>
      </div>
    );
  }
}
