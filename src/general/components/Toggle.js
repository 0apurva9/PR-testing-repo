import React from "react";
import PropTypes from "prop-types";
import styles from "./Toggle.css";
export default class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.active,
            activeDisable: this.props.activeDisable,
        };
    }

    handleToggle() {
        if (!this.props.disabled && !this.props.activeDisable) {
            this.setState({ active: !this.state.active }, () => {
                if (this.props.onToggle) {
                    this.props.onToggle(this.state.active);
                }
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active !== this.state.active) {
            this.setState({ active: nextProps.active });
        }
    }

    render() {
        let base = styles.base;
        let className = styles.toggleInActive;
        /**
         * State "activeDisable" means the toggle btn is active but cant be clicked(i.e. disabled).
         */
        if (this.state.activeDisable) {
            className = styles.toggleActive;
            base = styles.baseActiveDisable;
        } else if (this.state.active) {
            className = styles.toggleActive;
            base = styles.baseActive;
        }
        if (this.props.disabled) {
            base = styles.toggleDisabled;
        }
        return (
            <div className={base} onClick={() => this.handleToggle()}>
                <div className={className} />
            </div>
        );
    }
}
Toggle.propTypes = {
    onToggle: PropTypes.func,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    activeDisable: PropTypes.bool,
};

Toggle.defaultProps = {
    disabled: false,
    activeDisable: false,
};
