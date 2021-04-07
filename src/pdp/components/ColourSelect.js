import React from "react";
import styles from "./ColourSelect.css";
import PropTypes from "prop-types";
export default class ColourAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTooltip: false,
        };
    }

    handleClick = () => {
        if (this.props.selectItem) {
            this.props.selectItem();
        }
        if (this.props.onSelect) {
            this.props.onSelect(
                this.props.value,
                this.props.typeOfFilter,
                this.props.colour,
                null,
                this.props.webUrl,
                this.props.colourValue
            );
        }
    };

    onMouseEnter() {
        this.setState({ showTooltip: true });
    }

    onMouseLeave() {
        this.setState({ showTooltip: false });
    }

    render() {
        let classActive = styles.textHolder;
        if (this.props.selected) {
            classActive = styles.textHolderActive;
        }
        return (
            <div
                onMouseEnter={() => this.onMouseEnter()}
                onMouseLeave={() => this.onMouseLeave()}
                className={styles.base}
                onClick={() => this.handleClick()}
            >
                <div className={styles.content}>
                    <div className={styles.color} style={{ background: this.props.colour }} />

                    <div className={classActive} />
                </div>
                {this.state.showTooltip ? <div className={styles.shadeToolTip}>{this.props.colourValue}</div> : null}
            </div>
        );
    }
}

ColourAdd.propTypes = {
    onClick: PropTypes.func,
    colour: PropTypes.string,
    selected: PropTypes.bool,
    selectItem: PropTypes.func,
    onSelect: PropTypes.func,
    value: PropTypes.string,
    typeOfFilter: PropTypes.string,
    webUrl: PropTypes.string,
    colourValue: PropTypes.string,
    index: PropTypes.number,
};
