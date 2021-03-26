import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./CheckboxMultiSelect.css";

class CheckboxMultiSelect extends Component {
    render() {
        return (
            <label className={styles.checkboxContainer}>
                <input
                    type="checkbox"
                    name={this.props.name}
                    checked={this.props.checked}
                    onChange={e => this.props.onChange(e)}
                />
                <span className={styles.checkmark}></span>
            </label>
        );
    }
}

CheckboxMultiSelect.propTypes = {
    name: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

export default CheckboxMultiSelect;
