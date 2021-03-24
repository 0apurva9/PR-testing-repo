import React, { Component } from "react";
import styles from "./CustomButton.css";
import PropTypes from "prop-types";

export default class CustomButton extends Component {
    handleClick = () => {
        this.props.handleClick();
    };

    render() {
        return (
            <React.Fragment>
                {this.props.disabled ? (
                    <div
                        className={styles.baseDisabled}
                        style={{
                            width: this.props.width,
                            height: this.props.height,
                            fontSize: this.props.fontSize,
                            borderRadius: this.props.borderRadius,
                            fontFamily: this.props.fontFamily,
							margin: this.props.margin,
                        }}
                    >
                        {this.props.text}
                    </div>
                ) : (
                    <div
                        className={styles.base}
                        style={{
                            width: this.props.width,
                            height: this.props.height,
                            fontSize: this.props.fontSize,
                            color: this.props.color,
                            border: this.props.border,
                            borderRadius: this.props.borderRadius,
                            fontFamily: this.props.fontFamily,
							margin: this.props.margin,
                        }}
                        onClick={() => this.handleClick()}
                    >
                        {this.props.text}
                    </div>
                )}
            </React.Fragment>
        );
    }
}

CustomButton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    text: PropTypes.string,
    fontSize: PropTypes.string,
    color: PropTypes.string,
    border: PropTypes.string,
    borderRadius: PropTypes.string,
    fontFamily: PropTypes.string,
    handleClick: PropTypes.func,
    disabled: PropTypes.bool,
	margin: PropTypes.string,
};

CustomButton.defaultProps = {
    width: "auto",
    height: "auto",
    fontSize: "14px",
    color: "#da1c5c",
    border: "1px solid #da1c5c",
    borderRadius: "4px",
    fontFamily: "semibold",
};
