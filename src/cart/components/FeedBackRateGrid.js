import React from "react";
import FeedBackRate from "./FeedBackRate";
import withMultiSelect from "../../higherOrderComponents/withMultiSelect";
import PropTypes from "prop-types";
import styles from "./ExperienceRateGrid.css";

const FeedBackRateGridSelect = class ExperienceRateGrid extends React.Component {
  render() {
    return <div className={styles.base}>{this.props.children}</div>;
  }
};
const FeedBackRateGridWithSelect = withMultiSelect(FeedBackRateGridSelect);

export default class FeedBackRateGrid extends React.Component {
  onSelect(val) {
    if (this.props.onSelect) {
      this.props.onSelect(val);
    }
  }
  render() {
    return (
      <FeedBackRateGridWithSelect
        limit={1}
        onSelect={value => this.onSelect(value)}
      >
        <FeedBackRate value="1" ratingText="1" />
        <FeedBackRate value="2" ratingText="2" />
        <FeedBackRate value="3" ratingText="3" />
        <FeedBackRate value="4" ratingText="4" />
        <FeedBackRate value="5" ratingText="5" />
      </FeedBackRateGridWithSelect>
    );
  }
}
FeedBackRateGrid.propTypes = {
  onSelect: PropTypes.func
};
