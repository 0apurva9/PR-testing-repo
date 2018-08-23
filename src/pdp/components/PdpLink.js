import React from "react";
import arrowIcon from "../../general/components/img/down-arrow.svg";
import arrowIconGrey from "../../general/components/img/down-arrow-grey.svg";
import Icon from "../../xelpmoc-core/Icon";
import PropTypes from "prop-types";
import styles from "./PdpLink.css";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
export default class PdpLink extends React.Component {
  onClick() {
    if (this.props.onClick) {
      if (!this.props.noLink) {
        this.props.onClick();
      }
    }
  }
  render() {
    return (
      <div className={styles.base} onClick={() => this.onClick()}>
        {this.props.children}
        {!this.props.noLink && (
          <div className={styles.linkArrow}>
            <MobileOnly>
              <Icon image={arrowIcon} size={10} />
            </MobileOnly>
            <DesktopOnly>
              <Icon image={arrowIconGrey} size={10} />
            </DesktopOnly>
          </div>
        )}
      </div>
    );
  }
}
PdpLink.propTypes = {
  onClick: PropTypes.func,
  noLink: PropTypes.bool
};
PdpLink.defaultProps = {
  noLink: false
};
