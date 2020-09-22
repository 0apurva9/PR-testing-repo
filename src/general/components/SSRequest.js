import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./SSRequest.css";
import ssloader from "../components/img/ssloader.svg";
import ssloaders from "../components/img/ssloaders.svg";
export default class SSRquest extends Component {
  render() {
    return (
      <div className={styles.base}>
        {this.props.raiseTiketRequest && (
          <div className={styles.requestBox}>
            <div className={styles.requestImg}>
              <img src={ssloader} alt="Loader..." />
            </div>
            <div className={styles.requestHeading}>
              {this.props.isCallMeBackForm
                ? "Hold on, we're placing your callback request"
                : "We will get our best minds on this issue to resolve it"}
            </div>
            <div className={styles.requestContetn}>
              {this.props.isCallMeBackForm
                ? "It’ll only take a moment"
                : `Give us a chance to make it work and you won’t be disappointed.
                We’ll be on this problem around the clock and get back to you with
                a solution at the earliest.`}
            </div>
          </div>
        )}
        {this.props.raiseTiketSucess && (
          <div className={styles.requestBox}>
            <div className={styles.requestImg}>
              <img src={ssloaders} alt="Loader..." />
            </div>
            <div className={styles.requestHeading}>
              {this.props.isCallMeBackForm
                ? `We have successfully placed your callback request`
                : `We have successfully registered your issue`}
            </div>
            <div className={styles.requestContetn}>
              {this.props.isCallMeBackForm
                ? `You will receive a callback soon`
                : `Thanks for your patience. We are almost done.`}
            </div>
          </div>
        )}
      </div>
    );
  }
}

SSRquest.propTypes = {
  raiseTiketRequest: PropTypes.bool,
  isCallMeBackForm: PropTypes.bool,
  raiseTiketSucess: PropTypes.boo
};
