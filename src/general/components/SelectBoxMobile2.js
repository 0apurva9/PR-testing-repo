import React from "react";
import PropTypes from "prop-types";
import Icon from "../../xelpmoc-core/Icon";
import styles from "./SelectBoxMobile.css";
import GreyArrow from "./img/down-arrow-grey.svg";
import BlackArrow from "./img/down-arrow.svg";
import WhiteArrow from "./img/down-arrow-white.svg";
const BLACK = "black";
const WHITE = "white";
const GREY = "grey";
const HOLLOW_BOX = "hollowBox";
const BLACK_BOX = "blackBox";
const GREY_BOX = "greyBox";
export default class SelectBoxMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
        ? this.props.value
        : this.props.placeholder
          ? this.props.placeholder
          : this.props.options
            ? this.props.options[0].value
            : "",
      label: this.props.label
        ? this.props.label
        : this.props.placeholder
          ? this.props.placeholder
          : this.props.options
            ? this.props.options[0].label
            : "",
      touched: false
    };
  }

  handleChange(event) {
    if (!this.props.disabled) {
      const selectedValue = event.target.value;
      const index = event.nativeEvent.target.selectedIndex;
      const selectedLabel = event.nativeEvent.target[index].label;
      const details = {};
      const isImageApplicable = event.nativeEvent.target[index].getAttribute(
        "data-isimageapplicable"
      );
      this.setState(
        { value: selectedValue, label: selectedLabel, touched: true },
        () => {
          if (this.props.onChange) {
            details.label = selectedLabel;
            details.value = selectedValue;
            details.isImageApplicable = isImageApplicable;
            this.props.onChange(details);
          }
        }
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
      this.setState({ touched: true });
    }
    if (nextProps.isEnable === false) {
      this.setState({
        touched: false,
        value: this.props.placeholder,
        label: this.props.placeholder
      });
    }
    if (nextProps.label && nextProps.label !== this.state.label) {
      this.setState({ label: nextProps.label });
    }
  }
  render() {
    let arrow = GreyArrow;
    if (this.props.arrowColour === BLACK) {
      arrow = BlackArrow;
    }
    if (this.props.arrowColour === GREY) {
      arrow = GreyArrow;
    }
    if (this.props.arrowColour === WHITE) {
      arrow = WhiteArrow;
    }
    let themeClass = styles.base;
    if (this.props.disabled) {
      themeClass = styles.disabled;
    } else {
      themeClass = styles.base;
    }
    if (this.props.theme === BLACK_BOX) {
      if (this.props.disabled) {
        themeClass = styles.disabledBlack;
      } else {
        themeClass = styles.blackBox;
      }
    }
    if (this.props.theme === HOLLOW_BOX) {
      if (this.props.disabled) {
        themeClass = styles.disabledHollow;
      } else {
        themeClass = styles.hollowBox;
      }
    }
    if (this.props.theme === GREY_BOX) {
      if (this.props.disabled) {
        themeClass = styles.disabled;
      } else {
        themeClass = styles.base;
      }
    }
    let visibleBoxClass = "";
    if (this.props.extraVisibleBoxCss) {
      visibleBoxClass = styles.visibleBox + " " + styles.extraVisibleBoxCss;
    } else {
      visibleBoxClass = styles.visibleBox;
    }
    return (
      <div
        className={themeClass}
        style={{
          height: this.props.height,
          lineHeight: `${this.props.height}px`,
          backgroundColor: this.props.backgroundColor
        }}
      >
        <select
          name={this.props.name}
          className={styles.hideSelect}
          onChange={event => this.handleChange(event)}
          value={this.state.value}
          label={this.state.label}
        >
          <React.Fragment>
            {this.props.placeholder &&
              !this.state.touched && (
                <option
                  value={this.props.placeholder}
                  label={this.props.placeholder}
                  disabled
                >
                  {this.props.placeholder}
                </option>
              )}
            {this.props.options &&
              this.props.options.map((item, i) => {
                return (
                  <option
                    styles={{ backgroundColor: "#000", color: "fff" }}
                    key={i}
                    value={item.value}
                    label={item.label}
                    data-isimageapplicable={item.isImageApplicable}
                  >
                    {item.label}
                  </option>
                );
              })}
          </React.Fragment>
        </select>
        <div className={visibleBoxClass}>{this.state.label}</div>
        <div className={styles.arrow}>
          <Icon image={arrow} size={12} />
        </div>
      </div>
    );
  }
}
SelectBoxMobile.propTypes = {
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ),
  arrowColour: PropTypes.oneOf([BLACK, GREY, WHITE]),
  theme: PropTypes.oneOf([HOLLOW_BOX, BLACK_BOX, GREY_BOX]),
  disabled: PropTypes.bool
};
SelectBoxMobile.defaultProps = {
  height: 35,
  arrowColour: GREY,
  disabled: false,
  extraVisibleBoxCss: false
};
