import React from "react";
import styles from "./FeedBackRate.css";
import PropTypes from "prop-types";
export default class FeedBackRate extends React.Component {
  onSelect() {
    if (this.props.selectItem) {
      this.props.selectItem();
    }
  }

  render() {
    let checkbox = styles.checkBox;
    if (this.props.selected) {
      checkbox = styles.activeCheckbox;
    }
    return (
      <div className={styles.base}>
        <div className={styles.checkAndText}>
          <div className={checkbox} onClick={() => this.onSelect()}>
            <div className={styles.activeMark} />
          </div>
          <div className={styles.ratingText}>{this.props.ratingText}</div>
        </div>
      </div>
    );
  }
}
FeedBackRate.propTypes = {
  ratingText: PropTypes.string,
  selected: PropTypes.bool,
  selectItem: PropTypes.func
};
