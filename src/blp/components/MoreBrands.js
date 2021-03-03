import React from "react";
import PropTypes from "prop-types";
import styles from "./MoreBrands.css";
import Icon from "../../xelpmoc-core/Icon";
import plusIcon from "../../general/components/img/circle_plus_white.svg";
import ButtonWithIcon from "../../general/components/ButtonWithIcon.js";
import MobileOnly from "../../general/components/MobileOnly";

export default class MoreBrands extends React.Component {
  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.headerText}>
          See the latest products from your favorite Brand.
        </div>
        <MobileOnly>
          <div className={styles.buttonHolder}>
            <div className={styles.button}>
              <ButtonWithIcon
                backgroundColor="#ff1744"
                height={40}
                label={this.props.label}
                width={this.props.width}
                textStyle={{ color: "#FFF", fontSize: 14 }}
                onClick={() => this.handleClick()}
                icon={{
                  height: 20,
                  width: 20,
                  offset: 5,
                  element: <Icon image={plusIcon} size={20} />
                }}
              />
            </div>
          </div>
        </MobileOnly>
      </div>
    );
  }
}

MoreBrands.propTypes = {
  label: PropTypes.string,
  width: PropTypes.number,
  onClick: PropTypes.func
};

MoreBrands.defaultProps = {
  label: "Checkout",
  width: 150
};
