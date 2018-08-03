import React from "react";
import styles from "./FloatingLabelInput.css";
import PropTypes from "prop-types";
export default class FloatingLabelInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelUpper: this.props.value ? true : false,
      value: props.value ? props.value : ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }
  handleFocus(event) {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    this.setState({ labelUpper: true });
  }
  handleBlur(event) {
    if (event.target.value) {
      this.setState({ labelUpper: true });
      if (this.props.onBlur) {
        this.props.onBlur();
      }
    } else {
      this.setState({ labelUpper: false });
    }
  }
  handleKeyPress(event) {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(event);
    }
  }
  handleKeyUp = event => {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  };
  handleChange(event) {
    const NUMBER_REGEX = /^[0-9]+$/;
    const ALPHABET_REGEX = /^[a-zA-Z ]+$/;
    if (this.props.onlyAlphabet) {
      if (
        event.target.value === "" ||
        ALPHABET_REGEX.test(event.target.value)
      ) {
        this.setState({ value: event.target.value }, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state.value);
          }
        });
      } else {
        event.preventDefault();
      }
    }
    if (this.props.onlyNumber) {
      if (event.target.value === "" || NUMBER_REGEX.test(event.target.value)) {
        this.setState({ value: event.target.value }, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state.value);
          }
        });
      } else {
        event.preventDefault();
      }
    }
    if (!this.props.onlyAlphabet && !this.props.onlyNumber) {
      this.setState({ value: event.target.value }, () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.value);
        }
      });
    }
    if (!event.target.value) {
      this.setState({ labelUpper: false });
    } else {
      this.setState({ labelUpper: true });
    }
  }
  render() {
    return (
      <div className={styles.base} styles={{ height: this.props.height }}>
        <span
          className={
            this.state.labelUpper
              ? styles.activeFloatingLabel
              : styles.floatingLabel
          }
        >
          {this.props.label}
        </span>
        <input
          onKeyUp={event => this.handleKeyUp(event)}
          onKeyPress={event => this.handleKeyPress(event)}
          type={this.props.type}
          maxLength={this.props.maxLength}
          onFocus={event => this.handleFocus(event)}
          onBlur={event => this.handleBlur(event)}
          onChange={event => this.handleChange(event)}
          value={this.props.value ? this.props.value : this.state.value}
        />
      </div>
    );
  }
}
FloatingLabelInput.propTypes = {
  maxLength: PropTypes.string,
  type: PropTypes.string,
  onlyAlphabet: PropTypes.bool,
  onlyNumber: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  height: PropTypes.string
};
FloatingLabelInput.defaultProps = {
  type: "text",
  onlyAlphabet: false,
  onlyNumber: false
};
