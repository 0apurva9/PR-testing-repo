import React from "react";
import MobileOnly from "./MobileOnly";
import DesktopOnly from "./DesktopOnly";
import PropTypes from "prop-types";
import styles from "./DumbCarousel.css";

export default class DumbCarousel extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        {this.props.headerComponent && this.props.headerComponent}
        <MobileOnly>
          <div className={styles.slider}>
            {this.props.children &&
              this.props.children.map((child, i) => {
                return (
                  <div
                    className={styles.element}
                    style={{
                      width:
                        this.props.elementWidth === "auto"
                          ? "auto"
                          : `${this.props.elementWidth}%`
                    }}
                  >
                    {child}
                  </div>
                );
              })}
          </div>
        </MobileOnly>
        <DesktopOnly>
          <div
            className={styles.slider}
            style={{
              transform: `translateX(${this.props.position *
                -this.props.elementWidthDesktop}%)`
            }}
          >
            {this.props.children &&
              this.props.children.map((child, i) => {
                return (
                  <div
                    className={styles.element}
                    style={{
                      width:
                        this.props.elementWidthDesktop === "auto"
                          ? "auto"
                          : `${this.props.elementWidthDesktop}%`
                    }}
                  >
                    {child}
                  </div>
                );
              })}
          </div>
        </DesktopOnly>
      </div>
    );
  }
}
DumbCarousel.propTypes = {
  elementWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  elementWidthDesktop: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  position: PropTypes.number
};

DumbCarousel.defaultProps = {
  position: 0
};
