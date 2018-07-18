import React from "react";
import PropTypes from "prop-types";
import VisibilityChild from "../../home/components/VisibilityChild.js";
import MediaQuery from "react-responsive";
import styles from "./Grid.css";

export default class Grid extends React.Component {
  checkUserAgentIsMobile() {
    return /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i.test(
      navigator.userAgent
    );
  }
  render() {
    return (
      <div
        className={styles.base}
        style={{
          padding: !this.checkUserAgentIsMobile()
            ? this.props.offsetDesktop
            : this.props.offsetMobile
        }}
      >
        <div
          className={styles.gridHolder}
          style={{
            padding: `${this.props.offset / 2}px`
          }}
        >
          {this.props.children &&
            this.props.children.map((child, i) => {
              return (
                <React.Fragment key={i}>
                  <MediaQuery query="(min-device-width: 1025px)">
                    <div
                      className={styles.element}
                      style={{
                        width:
                          child.props && child.props.gridWidthDesktop
                            ? `${child.props.gridWidthDesktop}%`
                            : `${this.props.elementWidthDesktop}%`,

                        padding: `${this.props.offset / 2}px`
                      }}
                    >
                      <VisibilityChild>{child}</VisibilityChild>
                    </div>
                  </MediaQuery>
                  <MediaQuery query="(max-device-width: 1024px)">
                    <div
                      className={styles.element}
                      style={{
                        width:
                          child.props && child.props.gridWidthMobile
                            ? `${child.props.gridWidthMobile}%`
                            : `${this.props.elementWidthMobile}%`,
                        padding: `${this.props.offset / 2}px`
                      }}
                    >
                      <VisibilityChild>{child}</VisibilityChild>
                    </div>
                  </MediaQuery>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    );
  }
}
Grid.propTypes = {
  elementWidthDesktop: PropTypes.number,
  elementWidthMobile: PropTypes.number,
  offset: PropTypes.number,
  offsetDesktop: PropTypes.string
};

Grid.defaultProps = {
  elementWidthDesktop: 25,
  elementWidthMobile: 50,
  offset: 10
};
