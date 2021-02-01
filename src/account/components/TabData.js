import React from "react";
import PropTypes from "prop-types";
import styles from "./TabData.css";
export default class TabData extends React.Component {
  onSelect() {
    if (this.props.selectItem) {
      this.props.selectItem();
    }
  }

  render() {
    let className = styles.base;
    if (this.props.selected) {
      className = styles.active;
    }
    let heading = "";
    let subHeading = "";
    if (this.props.subHeding) {
      const head = this.props.label.split("<br/>");
      heading = head[0];
      subHeading = head[1];
    }
    return (
      <React.Fragment>
        <div
          className={className}
          onClick={() => this.onSelect()}
          style={{ width: `${this.props.width}` }}
        >
          {this.props.subHeding ? (
            <React.Fragment>
              {heading}
              <span className={styles.subHeding}>{subHeading}</span>
            </React.Fragment>
          ) : (
            this.props.label
          )}
          {/* {} */}
        </div>
      </React.Fragment>
    );
  }
}
TabData.propTypes = {
  width: PropTypes.string,
  label: PropTypes.string,
  selectItem: PropTypes.func,
  selected:PropTypes.bool,
  subHeding:PropTypes.string

};
TabData.defaultProps = {
  width: "auto"
};
