import React from "react";
import styles from "./SectionLoaderDesktop.css";
export default class SectionLoaderDesktop extends React.Component {
  render() {
    if (this.props.display) {
      return (
        <div className={styles.base}>
          <div className={styles.loader} />
        </div>
      );
    } else {
      return null;
    }
  }
}

SectionLoaderDesktop.defaultProps = {
  display: true
};
