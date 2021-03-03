import React from "react";
import PropTypes from "prop-types";
import Icon from "../../xelpmoc-core/Icon";
import styles from "./SelectBoxDesktop.css";
import GreyArrow from "./img/down-arrow-grey.svg";
import BlackArrow from "./img/down-arrow.svg";
import WhiteArrow from "./img/down-arrow-white.svg";
const BLACK = "black";
const WHITE = "white";
const GREY = "grey";
const HOLLOW_BOX = "hollowBox";
const BLACK_BOX = "blackBox";
const GREY_BOX = "greyBox";
export default class SelectBoxDesktop extends React.Component {
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
    // if (event && event.target && event.target.value) {
    //   if (this.props && this.props.location && this.props.location.pathname) {
    //     let path = this.props.location.pathname;
    //     if (!PRODUCT_REGEX_CART.test(path)) {
    //       setDataLayer(ADOBE_SORT_SELECT, event.target.value);
    //     }
    //   }
    // }
    //removed this block of code as it is common component
    if (!this.props.disabled) {
      const selectedValue = event.target.value;
      const index = event.nativeEvent.target.selectedIndex;
      const selectedLabel = event.nativeEvent.target[index].label;
      const details = {};
      this.setState(
        { value: selectedValue, label: selectedLabel, touched: true },
        () => {
          if (this.props.onChange) {
            details.label = selectedLabel;
            details.value = selectedValue;
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
          className={
            !this.props.hideArrow
              ? styles.hideSelect
              : styles.hideSelectDisabled
          }
          onChange={event => this.handleChange(event)}
          value={this.state.value}
          label={this.state.label}
        >
          <React.Fragment>
            {this.props.placeholder && !this.state.touched && (
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
                  >
                    {item.label}
                  </option>
                );
              })}
          </React.Fragment>
        </select>
        {!this.props.labelWithLeftChild && (
          <div className={styles.visibleBox}>{this.state.label}</div>
        )}
        {this.props.labelWithLeftChild && (
          <div
            className={styles.visibleBoxWithLeftChild}
            style={{
              paddingLeft: `${this.props.leftChildSize - 10}px`,
              paddingRight: `${this.props.rightChildSize - 10}px`
            }}
          >
            {this.state.label}
          </div>
        )}
        {!this.props.hideArrow && (
          <div
            className={styles.arrow}
            style={{
              height: `${this.props.size}px`,
              width: `${this.props.size}px`,
              right: `${this.props.rightArrow}px`
            }}
          >
            <Icon
              image={this.props.image ? this.props.image : arrow}
              size={this.props.size}
            />
          </div>
        )}
        {this.props.leftChild && (
          <div
            className={styles.boxIconLeft}
            style={{
              width: this.props.leftChildSize,
              paddingLeft: `${this.props.paddingLeft}px`,
              color: this.props.paddingLeftColour,
              fontFamily: this.props.paddingLeftFontFamily,
              fontSize: `${this.props.paddingLeftFontSize}px`
            }}
          >
            {this.props.leftChild}
          </div>
        )}
      </div>
    );
  }
}
SelectBoxDesktop.propTypes = {
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ),
  arrowColour: PropTypes.oneOf([BLACK, GREY, WHITE]),
  theme: PropTypes.oneOf([HOLLOW_BOX, BLACK_BOX, GREY_BOX]),
  disabled: PropTypes.bool,
  location: PropTypes.object,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isEnable: PropTypes.bool,
  customSelect: PropTypes.string,
  name: PropTypes.string,
  hideArrow: PropTypes.bool,
  labelWithLeftChild: PropTypes.bool,
  leftChildSize: PropTypes.number,
  rightChildSize: PropTypes.number,
  size: PropTypes.number,
  rightArrow: PropTypes.number,
  leftChild: PropTypes.bool,
  paddingLeft: PropTypes.number,
  paddingLeftColour: PropTypes.string,
  paddingLeftFontFamily: PropTypes.string,
  paddingLeftFontSize: PropTypes.number,
  image: PropTypes.string,
};
SelectBoxDesktop.defaultProps = {
  height: 35,
  arrowColour: GREY,
  disabled: false,
  size: 12,
  paddingLeft: 10,
  paddingLeftColour: "#8f8f8f",
  paddingLeftFontFamily: "regular",
  paddingLeftFontSize: 14,
  labelWithLeftChild: false,
  rightArrow: 10
};
