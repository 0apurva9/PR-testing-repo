import React from "react";
import CoreButton from "../../xelpmoc-core/Button";
import PropTypes from "prop-types";

export default class Button extends React.Component {
  renderButton() {
    var { backgroundColor, borderRadius, textStyle, ...other } = this.props;
    switch (this.props.type) {
      case "primary":
        return (
          <CoreButton
            {...other}
            backgroundColor={
              this.props.backgroundColor
                ? this.props.backgroundColor
                : "#da1c5c"
            }
            borderRadius={
              this.props.borderRadius
                ? this.props.borderRadius
                : this.props.height / 2
            }
            textStyle={{
              color: "#FFF",
              fontSize: 14,
              fontFamily:
                this.props.textStyle && this.props.textStyle.fontFamily
                  ? this.props.textStyle.fontFamily
                  : "semibold"
            }}
          />
        );
      case "secondary":
        return (
          <CoreButton
            {...other}
            backgroundColor={"transparent"}
            borderRadius={this.props.height / 2}
            borderColor={"#212121"}
            textStyle={{
              color: "#212121",
              fontSize: 14,
              fontFamily: "semibold"
            }}
          />
        );
      case "tertiary":
        return (
          <CoreButton
            {...other}
            backgroundColor={"transparent"}
            borderRadius={this.props.height / 2}
            borderColor={"#8D8D8D"}
            textStyle={{
              color: "#8D8D8D",
              fontSize: 14,
              fontFamily: "semibold"
            }}
          />
        );
      case "hollow":
        return (
          <CoreButton
            {...other}
            backgroundColor={"transparent"}
            borderRadius={this.props.height / 2}
            borderColor={this.props.borderColor === "" ? "" : this.props.color}
            textStyle={{
              color: this.props.color,
              fontSize: 14,
              fontFamily:
                this.props.textStyle && this.props.textStyle.fontFamily
                  ? this.props.textStyle.fontFamily
                  : "semibold"
            }}
          />
        );

      case "linearGradient":
        return (
          <CoreButton
            {...other}
            borderRadius={this.props.height / 2}
            textStyle={{
              color: "#ffffff",
              fontSize: 14,
              fontFamily: "semibold"
            }}
            background={`linear-gradient(${this.props.linearColor.fromColor},${this.props.linearColor.toColor})`}
            dataTest={this.props.dataTest}
          />
        );
      default:
        return <CoreButton {...this.props} />;
    }
  }
  render() {
    return <React.Fragment>{this.renderButton()}</React.Fragment>;
  }
}

Button.propTypes = {
  type: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "hollow",
    "linearGradient"
  ]),
  dataTest: PropTypes.string,
  backgroundColor: PropTypes.string,
  textStyle: PropTypes.objectOf(
    PropTypes.shape({
      color: PropTypes.string,
      fontSize: PropTypes.number,
      fontFamily: PropTypes.string
    })
  )
};

Button.defaultProps = {
  height: 36,
  color: "#212121",
  linearColor: {
    fromColor: "#ce5096",
    toColor: "#da6060"
  },
  dataTest: "button"
};
