import React from "react";
import styles from "./AccordionWithTooltip.css";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import { setDataLayer, ADOBE_PDP_KNOW_MORE_CLICK } from "../../lib/adobeUtils";
export default class AccordionWithTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }
  openMenu() {
    if (!this.props.controlled) {
      this.setState(prevState => ({
        isOpen: !prevState.isOpen
      }));
    }
    if (this.props.onOpen) {
      this.props.onOpen();
    }
    // if (this.props && this.props.text === "Know More") {
    //   setDataLayer(ADOBE_PDP_KNOW_MORE_CLICK);
    // }
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
          backgroundColor: `${background}`
        }}
      >
        <div
          style={{
            backgroundColor: this.props.backgroundColor,
            padding: this.props.padding
          }}
          className={styles.holder}
          onClick={() => {
            this.openMenu();
          }}
        >
          <div
            className={activeheader}
            style={{ fontSize: this.props.headerFontSize }}
          >
            {this.props.text2 && (
              <div
                onClick={evt => this.handleClick(evt)}
                style={{
                  color: this.props.text2Color,
                  fontSize: this.props.text2Size,
                  fontFamily: this.props.text2FontFamily,
                  textAlign: this.props.textAlign,
                  width: this.props.widthForText2,
                  marginLeft: this.props.marginLeft2,
                  fontWeight: this.props.fontWeight2
                }}
                className={styles.text2}
              >
                {this.props.text2}{" "}
                {this.props.tooltip && (
                  <span className={styles.tooltip}>
                    {" "}
                    <img src={this.props.tooltipSrc} className={styles.arrow} />
                    <span className={styles.tooltiptext}>
                      {this.props.tooltipText}
                    </span>
                  </span>
                )}
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
AccordionWithTooltip.propTypes = {
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
  fontWeight: PropTypes.string,
  marginLeft: PropTypes.string
};

AccordionWithTooltip.defaultProps = {
  headerFontSize: 14,
  controlled: false,
  offset: 0,
  headerElement: false,
  text1Color: "#000",
  text1Size: "14",
  text1FontFamily: "light",
  text2Color: "#000",
  text2Size: "14",
  text2FontFamily: "regular",
  textAlign: "left",
  widthForText1: "50%",
  widthForText2: "50%",
  fontWeight: "inherit",
  marginLeft: "0px"
};
