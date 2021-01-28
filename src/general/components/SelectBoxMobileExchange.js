import React from "react";
import PropTypes from "prop-types";
import Icon from "../../xelpmoc-core/Icon";
import styles from "./SelectBoxMobileExchange.css";
import GreyArrow from "./img/down-arrow-grey.svg";
const GREY = "grey";
export default class SelectBoxMobileExchange extends React.Component {
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
      const modelList = event.nativeEvent.target[index].getAttribute(
        "data-modellist"
      );
      this.setState(
        { value: selectedValue, label: selectedLabel, touched: true },
        () => {
          if (this.props.onChange) {
            details.label = selectedLabel;
            details.value = selectedValue;
            details.modelList = modelList;
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
    let themeClass = styles.base;
    if (this.props.disabled) {
      themeClass = styles.disabled;
    } else {
      themeClass = styles.base;
    }
    return (
      <div
        className={themeClass}
        id={this.props.customSelect}
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
                    className={styles.selectOptions}
                    key={i}
                    value={item.value}
                    label={item.label}
                    data-isimageapplicable={item.isImageApplicable}
                    data-modellist={JSON.stringify(item.modelList)}
                  >
                    {item.label}
                  </option>
                );
              })}
          </React.Fragment>
        </select>
        <div
          className={
            this.state.label === "Select Brand" ||
            this.state.label === "Select Model"
              ? styles.visibleBoxLight
              : styles.visibleBox
          }
        >
          {this.state.label}
        </div>
        <div className={styles.arrow}>
          <Icon image={arrow} size={12} />
        </div>
      </div>
    );
  }
}
SelectBoxMobileExchange.propTypes = {
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ),
  disabled: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isEnable: PropTypes.bool,
  customSelect: PropTypes.string,
  name: PropTypes.string
};
SelectBoxMobileExchange.defaultProps = {
  height: 35,
  arrowColour: GREY,
  disabled: false
};
