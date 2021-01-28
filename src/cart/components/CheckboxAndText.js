import React from "react";
import CheckBox from "../../general/components/CheckBox.js";
import styles from "./CheckboxAndText.css";
import PropTypes from "prop-types";
export default class CheckboxAndText extends React.Component {
    handleClick() {
        if (this.props.selectItem) {
            this.props.selectItem();
        }
    }

    render() {
        return (
            <div className={styles.base} onClick={() => this.handleClick()} style={{ fontSize: this.props.fontSize }}>
                <div className={styles.checkboxHolder}>
                    <CheckBox selected={this.props.selected} size={this.props.size ? this.props.size : "20px"} />
                </div>
                {this.props.label}
            </div>
        );
    }
}
CheckboxAndText.propTypes = {
    selectItem: PropTypes.func,
    label: PropTypes.string,
    fontSize: PropTypes.string,
    size: PropTypes.string,
    selected: PropTypes.bool,
};
