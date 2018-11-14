import React from "react";
import PropTypes from "prop-types";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import Image from "../../xelpmoc-core/Image";
import styles from "./CheckOutHeader.css";
import checkIcon from "./img/check.svg";

export default class CheckOutHeader extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.confirm}>
          <DesktopOnly>
            {this.props.indexNumber !== "0" &&
              !this.props.completed && (
                <div className={styles.circleHolder}>
                  <div className={styles.circle}>{this.props.indexNumber}</div>
                </div>
              )}
            {this.props.completed && (
              <div className={styles.checkIconHolder}>
                <Image image={checkIcon} fit="165%" />
              </div>
            )}
          </DesktopOnly>
          <MobileOnly>
            {this.props.indexNumber !== "0" && (
              <div className={styles.circleHolder}>
                <div className={styles.circle}>{this.props.indexNumber}</div>
              </div>
            )}
          </MobileOnly>
          {this.props.confirmTitle}
        </div>
      </div>
    );
  }
}

CheckOutHeader.propTypes = {
  indexNumber: PropTypes.string,
  confirmTitle: PropTypes.string,
  completed: PropTypes.bool
};

CheckOutHeader.defaultProps = {
  completed: false
};
