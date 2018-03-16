import React, { Component } from "react";
import Recaptcha from "react-grecaptcha";
import Config from "../../lib/config";
import PropTypes from "prop-types";
const LOCALE_ENGLISH = "en";
const THEME = "light";
const CASH_ON_DELIVERY = "COD";
class Captcha extends Component {
  verifyCallback = response => {
    if (response) {
      if (this.props.binValidationForCOD) {
        this.props.verifyCallback(response);
        this.props.binValidationForCOD(CASH_ON_DELIVERY);
      }
    }
  };
  render() {
    return (
      <Recaptcha
        sitekey={Config.reCaptChaSiteKey}
        callback={this.verifyCallback}
        locale={LOCALE_ENGLISH}
        data-theme={THEME}
      />
    );
  }
}

Captcha.propTypes = {
  getCaptcha: PropTypes.func
};

export default Captcha;
