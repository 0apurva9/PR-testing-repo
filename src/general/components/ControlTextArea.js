import React from "react";
import styles from "./TextArea.css";
import PropTypes from "prop-types";
export default class ControlTextArea extends React.Component {
    handleFocus(event) {
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    }

    handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }

    handleBlur(event) {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <textarea
                    className={styles.textAreaBox}
                    placeholder={this.props.placeholder}
                    value={this.props.value ? this.props.value : ""}
                    onChange={event => {
                        this.handleChange(event);
                    }}
                    style={{
                        height: `${this.props.height}px`,
                        borderColor: `${this.props.borderColor}`,
                    }}
                    onFocus={event => this.handleFocus(event)}
                    maxLength={this.props.maxLength}
                    onBlur={event => this.handleBlur(event)}
                />
            </div>
        );
    }
}
ControlTextArea.propTypes = {
    onChange: PropTypes.func,
    height: PropTypes.number,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    borderColor: PropTypes.string,
};
ControlTextArea.defaultProps = {
    height: 100,
    value: "",
    placeholder: "",
};
