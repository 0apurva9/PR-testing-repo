import React from "react";
import PropTypes from "prop-types";
import styles from "./SearchResultItem.css";
export default class SearchResultItem extends React.Component {
  handleClick(val) {
    if (this.props.onClick && val) {
      this.props.onClick(val);
    }
  }

  render() {
    let suggestedText = this.props.suggestedText;
    return this.props.storeBrandMer ? (
      <div
        className={styles.base}
        onClick={val => {
          this.handleClick(val);
        }}
      >
        {this.props.merchandise ? (
          <div className={styles.suggestedText}>
            {suggestedText}
            <span className={styles.bolder}>{this.props.merchandise}</span>
          </div>
        ) : (
          <div className={styles.suggestedText}>{suggestedText}</div>
        )}
        {this.props.imageUrl ? (
          <div
            className={styles.imageStoreOrBrand}
            style={{ backgroundImage: `url(${this.props.imageUrl})` }}
          />
        ) : null}
      </div>
    ) : (
      <div
        className={styles.base}
        onClick={val => {
          this.handleClick(val);
        }}
      >
        {suggestedText}
        {this.props.categoryOrBrandText && (
          <React.Fragment>
            {" "}
            in{" "}
            <span className={styles.bolder}>
              {this.props.categoryOrBrandText}
            </span>
          </React.Fragment>
        )}
      </div>
    );
  }
}
SearchResultItem.PropTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string
};
