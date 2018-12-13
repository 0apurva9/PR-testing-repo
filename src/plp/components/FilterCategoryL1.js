import React from "react";
import styles from "./FilterCategoryL1.css";
export default class FilterCategoryL1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  onClick = () => {
    if (this.props.onL1Click) {
      this.props.onL1Click(
        this.props.value,
        "Category",
        this.props.name,
        this.props.name
      );
    }
  };

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header} onClick={this.onClick}>
          {this.props.name}
          <div className={styles.count}>{this.props.count}</div>
        </div>
        {this.props.children && (
          <div className={styles.content}>{this.props.children}</div>
        )}
      </div>
    );
  }
}
