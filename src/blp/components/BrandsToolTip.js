import React from "react";
import PropTypes from "prop-types";
import Icon from "../../xelpmoc-core/Icon";
import styles from "./BrandsToolTip.css";
import deleteIcon from "../../general/components/img/delete.svg";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
export default class BrandsToolTip extends React.Component {
  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    let className = styles.delete;
    return (
      <div className={styles.base}>
        <div className={styles.iconAndToolTip}>
          <DesktopOnly>
            <div className={styles.onDelete}>
              <Icon image={deleteIcon} size={20} />
            </div>
          </DesktopOnly>
          <MobileOnly>
            <div className={this.props.onDelete ? styles.onDelete : className}>
              <Icon image={deleteIcon} size={18} />
            </div>
          </MobileOnly>
          <div className={styles.brandsIconHolder}>
            <div
              className={styles.logoHolder}
              onClick={() => this.handleClick()}
              style={{
                backgroundImage: `url(${this.props.logo})`,
                backgroundSize: "60%",
                backgroundPosition: "center"
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
BrandsToolTip.propTypes = {
  onClick: PropTypes.func,
  logo: PropTypes.string
};
