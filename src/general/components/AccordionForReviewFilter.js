import React from "react";
import styles from "./Accordion.css";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
export default class AccordionForReviewFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen ? this.props.isOpen : false,
        };
    }

    openMenu() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));

        this.props.handleClick();
    }

    clearFilters() {
        this.props.clearFilters();
    }

    componentWillReceiveProps(props) {
        if (this.state.isOpen !== props.isOpen) {
            this.setState({ isOpen: props.isOpen });
        }
    }

    render() {
        let iconActive = styles.iconup;
        let activeheader = styles.textBox;
        let background = "";
        if (this.state.isOpen) {
            iconActive = styles.icon;
            activeheader = styles.textBoxActive;
            background = this.props.activeBackground;
        }

        return (
            <div
                className={styles.base}
                style={{
                    padding: `0 ${this.props.offset}px`,
                    backgroundColor: `${background}`,
                }}
            >
                <div
                    style={{
                        backgroundColor: this.props.backgroundColor,
                        padding: this.props.padding,
                    }}
                    className={styles.holder}
                >
                    <div className={activeheader}>
                        {this.props.text1 && (
                            <div
                                style={{
                                    color: this.props.text1Color,
                                    fontSize: this.props.text1Size,
                                    fontFamily: this.props.text1FontFamily,
                                    width: this.props.widthForText1,
                                }}
                                className={styles.text1}
                            >
                                {this.props.text1}
                            </div>
                        )}
                        {this.props.text2 && (
                            <div
                                onClick={() => this.clearFilters()}
                                style={{
                                    color: this.props.text2Color,
                                    fontSize: this.props.text2Size,
                                    fontFamily: this.props.text2FontFamily,
                                    textAlign: this.props.textAlign,
                                    width: this.props.widthForText2,
                                }}
                                className={styles.text2}
                            >
                                {this.props.text2}
                            </div>
                        )}

                        <div
                            className={iconActive}
                            onClick={() => {
                                this.openMenu();
                            }}
                        />
                    </div>
                </div>
                <Collapse isOpened={this.state.isOpen}>{this.props.children}</Collapse>
            </div>
        );
    }
}
AccordionForReviewFilter.propTypes = {
    offset: PropTypes.number,
    activeBackground: PropTypes.string,
    isOpen: PropTypes.bool,
    handleClick: PropTypes.func,
    text1Color: PropTypes.string,
    text1Size: PropTypes.string,
    text1FontFamily: PropTypes.string,
    widthForText1: PropTypes.string,
    text2Color: PropTypes.string,
    text2Size: PropTypes.string,
    text2FontFamily: PropTypes.string,
    backgroundColor: PropTypes.string,
    padding: PropTypes.string,
    text1: PropTypes.string,
    text2: PropTypes.string,
    textAlign: PropTypes.string,
    widthForText2: PropTypes.string,
    children: PropTypes.node,
    clearFilters: PropTypes.func,
};

AccordionForReviewFilter.defaultProps = {
    offset: 0,
    text1Color: "#000",
    text1Size: "14",
    text1FontFamily: "light",
    text2Color: "#000",
    text2Size: "14",
    text2FontFamily: "regular",
    textAlign: "left",
    widthForText1: "50%",
    widthForText2: "50%",
};
