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
            backgroundColor={"#FF1744"}
            borderRadius={this.props.height / 2}
            textStyle={{
              color: "#FFF",
              fontSize: 14,
              fontFamily: "semibold"
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
            borderColor={this.props.color}
            textStyle={{
              color: this.props.color,
              fontSize: 14,
              fontFamily: "semibold"
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
            background={`linear-gradient(${this.props.linearColor.fromColor},${
              this.props.linearColor.toColor
            })`}
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
  ])
};

Button.defaultProps = {
  height: 36,
  color: "#212121",
  linearColor: {
    fromColor: "#ce5096",
    toColor: "#da6060"
  }
};
