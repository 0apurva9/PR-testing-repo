import React from "react";
import PropTypes from "prop-types";
import styles from "./LatestCollections.css";
import { Icon } from "xelpmoc-core";
import iconImageURL from "../../general/components/img/whiteArrow.svg";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";

export default class LatestCollections extends React.Component {
  arrowNextClick() {
    const urlSuffix = this.props.feedComponentData.webURL.replace(
      TATA_CLIQ_ROOT,
      "$1"
    );
    this.props.history.push(urlSuffix);
  }
  render() {
    let feedComponentData = this.props.feedComponentData;
    return (
      <div className={styles.base}>
        <div
          className={styles.LatestCollectionsHolder}
          onClick={() => this.arrowNextClick()}
        >
          <div className={styles.textHolder}>
            {feedComponentData && feedComponentData.title}
          </div>
          <div className={styles.iconHolder}>
            <div className={styles.icon}>
              <Icon image={iconImageURL} size={25} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
LatestCollections.propTypes = {
  heading: PropTypes.string,
  arrowNextClick: PropTypes.func,
  iconImageURL: PropTypes.string
};
