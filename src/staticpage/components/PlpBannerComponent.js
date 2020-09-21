import React from "react";
import styles from "./PlpBannerComponent.css";
import PropTypes from "prop-types";
import Image from "../../xelpmoc-core/Image";
export default class PlpBannerComponent extends React.Component {
  handleClick(urlLink) {
    this.props.history.push(urlLink);
  }
  render() {
    return this.props.feedComponentData ? (
      <div
        className={styles.base}
        onClick={() => this.handleClick(this.props.urlLink)}
      >
        <div className={styles.imageHolder}>
          <Image image={this.props.feedComponentData.media} fit="cover" />
          {this.props.feedComponentData.title && (
            <div className={styles.displayTitle}>
              {this.props.feedComponentData.title}
            </div>
          )}
        </div>
      </div>
    ) : null;
  }
}
