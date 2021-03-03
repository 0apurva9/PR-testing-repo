import React from "react";
import PropTypes from "prop-types";
import styles from "./SearchResult.css";
export default class SearchResult extends React.Component {
  render() {
    return (
      <div className={styles.base}>
      &apos;{this.props.resultCount}&apos; results found for{" "}
        <span className={styles.bold}>&quot;{this.props.searchString}&quot;</span>.
        Showing results for{" "}
        <span className={styles.bold}>&quot;{this.props.resultDefault}&quot;</span>
      </div>
    );
  }
}
SearchResult.propTypes = {
  resultCount: PropTypes.string,
  searchString: PropTypes.string,
  resultDefault: PropTypes.string
};
