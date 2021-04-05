import React from "react";
import styles from "./Accordion.css";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import { setDataLayer, ADOBE_PDP_KNOW_MORE_CLICK } from "../../lib/adobeUtils";
export default class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen ? this.props.isOpen : false,
        };
    }

    openMenu() {
        if (!this.props.controlled) {
            this.setState(prevState => ({
                isOpen: !prevState.isOpen,
            }));
        }
        if (this.props.onOpen) {
            this.props.onOpen();
        }
        if (this.props && this.props.text === "Know More") {
            setDataLayer(ADOBE_PDP_KNOW_MORE_CLICK);
        }
    }

    handleClick(evt) {
        if (this.props.handleClick) {
            evt.stopPropagation();
            this.props.handleClick();
        }
        if (this.props && this.props.text === "Know More") {
            setDataLayer(ADOBE_PDP_KNOW_MORE_CLICK);
        }
    }

    componentWillReceiveProps(props) {
        if (this.state.isOpen !== props.isOpen) {
            this.setState({ isOpen: props.isOpen });
        }
    }

    render() {
        let iconActive = this.props.iconPlus ? styles.iconPlus : styles.iconup;
        let filterAccHolder = this.props.filterAccHolder ? styles.filterAccHolder : styles.holder;
        let headText = this.props.headText ? styles.headText : styles.text1;
        let activeheader = this.props.filtHeadLine ? styles.filtHeadLine : styles.textBox;
        let background = "";
        if (this.state.isOpen) {
            iconActive = this.props.iconMinus ? styles.iconMinus : styles.icon;
            activeheader = this.props.filtHeadLine ? styles.filtHeadLine : styles.textBoxActive;
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
                    className={filterAccHolder}
                    onClick={() => {
                        this.openMenu();
                    }}
                >
                    <div className={activeheader} style={{ fontSize: this.props.headerFontSize }}>
                        {this.props.text && <h2 className={styles.text}>{this.props.text}</h2>}
                        {this.props.text1 && (
                            <div
                                style={{
                                    color: this.props.text3Color ? this.props.text3Color : this.props.text1Color,
                                    fontSize: this.props.text1Size,
                                    fontFamily: this.props.text3FontFamily
                                        ? this.props.text3FontFamily
                                        : this.props.text1FontFamily,
                                    width:
                                        this.props.widthForText1 && this.props.otherFacet
                                            ? null
                                            : this.props.widthForText1,
                                }}
                                className={headText}
                            >
                                {this.props.text1}
                            </div>
                        )}
                        {this.props.text2 && (
                            <div
                                onClick={evt => this.handleClick(evt)}
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
                        {this.props.headerElement && (
                            <div
                                className={styles.faqQuestion}
                                dangerouslySetInnerHTML={{ __html: this.props.faqQuestion }}
                            />
                        )}
                        {!this.props.arrowHide && <div className={iconActive} />}
                    </div>
                </div>
                <Collapse isOpened={this.state.isOpen}>{this.props.children}</Collapse>
            </div>
        );
    }
}
Accordion.propTypes = {
    text: PropTypes.string,
    iconImageURL: PropTypes.string,
    headerFontSize: PropTypes.number,
    offset: PropTypes.number,
    searchImageURL: PropTypes.string,
    activeBackground: PropTypes.string,
    controlled: PropTypes.bool,
    onOpen: PropTypes.func,
    isOpen: PropTypes.bool,
    headerElement: PropTypes.bool,
    handleClick: PropTypes.func,
    text1Color: PropTypes.string,
    text1Size: PropTypes.string,
    text1FontFamily: PropTypes.string,
    widthForText1: PropTypes.string,
    text2Color: PropTypes.string,
    text3Color: PropTypes.string,
    text2Size: PropTypes.string,
    text2FontFamily: PropTypes.string,
    backgroundColor: PropTypes.string,
    padding: PropTypes.string,
    text1: PropTypes.string,
    text2: PropTypes.string,
    textAlign: PropTypes.string,
    widthForText2: PropTypes.string,
    faqQuestion: PropTypes.string,
    arrowHide: PropTypes.bool,
    children: PropTypes.node,
    filterAccHolder: PropTypes.string,
    headText: PropTypes.string,
    text3FontFamily: PropTypes.string,
    filtHeadLine: PropTypes.string,
    iconMinus: PropTypes.string,
    iconPlus: PropTypes.string,
    otherFacet: PropTypes.bool,
};

Accordion.defaultProps = {
    headerFontSize: 14,
    controlled: false,
    offset: 0,
    headerElement: false,
    text1Color: "#000",
    text1Size: "14",
    text1FontFamily: "light",
    text2FontFamily: "regular",
    text2Color: "#000",
    text2Size: "14",
    textAlign: "left",
    widthForText1: "50%",
    widthForText2: "50%",
};
