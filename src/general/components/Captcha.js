import React, { Component } from "react";
import Recaptcha from "react-grecaptcha";
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
                sitekey={process.env.RECAPTCHA_SITE_KEY}
                callback={this.verifyCallback}
                locale={LOCALE_ENGLISH}
                data-theme={THEME}
                className="customClassName"
            />
        );
    }
}

Captcha.propTypes = {
    getCaptcha: PropTypes.func,
    binValidationForCOD: PropTypes.func,
    verifyCallback: PropTypes.func,
};

export default Captcha;
