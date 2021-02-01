import React from "react";
import styles from "./TextArea.css";
import PropTypes from "prop-types";
export default class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
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
    this.setState({ focused: true });
  }

  handleBlur() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className={styles.container}>
        <textarea
          className={styles.textAreaBox}
          placeholder={this.props.placeholder}
          value={this.props.value ? this.props.value : this.state.value}
          onChange={event => {
            this.handleChange(event);
          }}
          style={{ height: `${this.props.height}px` }}
          onFocus={event => this.handleFocus(event)}
          onBlur={event => this.handleBlur(event)}
          maxLength={this.props.maxLength}
        />
      </div>
    );
  }
}
TextArea.propTypes = {
  onChange: PropTypes.func,
  height: PropTypes.number,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
TextArea.defaultProps = {
  height: 100,
  value: "",
  placeholder: "Write your comment"
};
