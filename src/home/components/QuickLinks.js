import React from "react";
import styles from "./QuickLinks.css";
import Image from "../../xelpmoc-core/Image";
export default class QuickLinks extends React.Component {
  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <div className={styles.base} onClick={() => this.onClick()}>
        <div className={styles.quickLinkImageHolder}>
          <div className={styles.imageHolder}>
            <Image image={this.props.imageURL} />
          </div>
        </div>
      </div>
    );
  }
}
