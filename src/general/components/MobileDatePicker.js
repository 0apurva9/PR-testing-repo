import React from "react";
import PropTypes from "prop-types";
import styles from "./MobileDatePicker.css";
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}

today = yyyy + "-" + mm + "-" + dd;
var max = today;
var min = yyyy - 110 + "-" + mm + "-" + dd;
export default class MobileDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    });
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.hideInput}>
          <input
            type="date"
            className={styles.input}
            onChange={value => this.handleChange(value)}
            value={this.state.value}
            placeholder="Pick a date"
            min={min}
            max={max}
          />
          {!this.state.value && (
            <div className={styles.placeholder}>dd/mm/yy</div>
          )}
        </div>
        <div className={styles.displayValue}>
          <div className={styles.iconHolder} />
        </div>
      </div>
    );
  }
}
MobileDatePicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};
