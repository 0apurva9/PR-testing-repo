import React from "react";
import styles from "./Input2.css";
import PropTypes from "prop-types";
export default class Input2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      value: props.value ? props.value : "",
      oldPosition: 0
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }
  handleFocus(event) {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    this.setState({ focused: true });
  }
  handleBlur(event) {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    this.setState({ focused: false });
  }
  handleChange(event) {
    const NUMBER_REGEX = /^[0-9]+$/;
    const CARD_REGEX = /^[0-9\s]+$/;
    const ALPHABET_REGEX = /^[a-zA-Z ]+$/;
    const element = event.target;
    const cursorPosition = event.target.selectionStart;
    let oldCursorPosition = this.state.oldPosition;
    if (oldCursorPosition > cursorPosition) {
      window.requestAnimationFrame(() => {
        element.selectionStart = cursorPosition;
        element.selectionEnd = cursorPosition;
      });
    }
    this.setState({ oldPosition: cursorPosition });
    if (this.props.isCard) {
      if (event.target.value === "" || CARD_REGEX.test(event.target.value)) {
        this.setState({ value: event.target.value }, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state.value);
          }
        });
      } else {
        event.preventDefault();
      }
    }
    if (this.props.onlyNumber) {
      if (event.target.value === "" || NUMBER_REGEX.test(event.target.value)) {
        this.setState({ value: event.target.value }, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state.value);
          }
        });
      } else {
        event.preventDefault();
      }
    }
    if (this.props.onlyAlphabet) {
      if (
        event.target.value === "" ||
        ALPHABET_REGEX.test(event.target.value)
      ) {
        this.setState({ value: event.target.value }, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state.value);
          }
        });
      } else {
        event.preventDefault();
      }
    }
    if (
      !this.props.onlyAlphabet &&
      !this.props.onlyNumber &&
      !this.props.isCard
    ) {
      this.setState({ value: event.target.value }, () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.value);
        }
      });
    }
  }
  handleKeyPress(event) {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(event);
    }
  }
  handleKeyUp = event => {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  };

  render() {
    let className = styles.base;
    if (this.props.isWhite) {
      className = styles.whiteHollow;
    }
    if (this.props.isWhite && this.props.boxy) {
      className = styles.whiteBox;
    }
    return (
      <div className={className}>
        <div className={this.state.focused ? styles.focused : styles.wrapper}>
          <div
            className={this.props.hollow ? styles.hollow : styles.box}
            style={{
              paddingLeft: `${this.props.leftChildSize - 10}px`,
              paddingRight: `${this.props.rightChildSize - 10}px`,
              height: `${this.props.height}px`,
              borderColor: `${this.props.borderColor}`,
              borderBottom: `${this.props.borderBottom}`,
              background: `${this.props.background}`
            }}
          >
            <input
              type={this.props.type}
              id={this.props.id}
              placeholder={this.props.placeholder}
              className={styles.inputBox}
              onFocus={event => this.handleFocus(event)}
              onBlur={event => this.handleBlur(event)}
              onChange={event => this.handleChange(event)}
              style={{ ...this.props.textStyle }}
              onKeyUp={event => this.handleKeyUp(event)}
              value={this.props.value ? this.props.value : this.state.value}
              maxLength={this.props.maxLength}
              disabled={this.props.disabled}
              autoFocus={this.props.autoFocus}
              onKeyPress={event => this.handleKeyPress(event)}
            />
          </div>
          {this.props.leftChild && (
            <div
              className={styles.boxIconLeft}
              style={{ width: this.props.leftChildSize }}
            >
              {this.props.leftChild}
            </div>
          )}
          {this.props.rightChild && (
            <div
              className={styles.boxIconRight}
              style={{ width: this.props.rightChildSize }}
            >
              {this.props.rightChild}
            </div>
          )}
        </div>
      </div>
    );
  }
}
Input2.propTypes = {
  id: PropTypes.string,
  hollow: PropTypes.bool,
  boxy: PropTypes.bool,
  type: PropTypes.string,
  leftChild: PropTypes.element,
  rightChild: PropTypes.element,
  isWhite: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  height: PropTypes.number,
  background: PropTypes.string,
  textStyle: PropTypes.shape({
    fontSize: PropTypes.number
  })
};

Input2.defaultProps = {
  id: null,
  height: 40,
  type: "text",
  textStyle: {
    fontSize: 14
  },
  disabled: false,
  borderBottom: "1px solid #d2d2d2",
  onlyAlphabet: false,
  onlyNumber: false
};
