import React from "react";
import styles from "./LoaderForComponent.css";
export default class LoaderForComponent extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.loader} />
      </div>
    );
  }
}
