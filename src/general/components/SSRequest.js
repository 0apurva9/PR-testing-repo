import React, { Component } from "react";
import styles from "./SSRequest.css";
import Icon from "../../xelpmoc-core/Icon";
import ssloader from "../components/img/ssloader.svg";
import ssloaders from "../components/img/ssloaders.svg";
export default class SSRquest extends Component {
  state = {
    request: true,
    success: false
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ request: false, success: true });
      // this.props.hideLoader()
      this.setState({ request: false, success: true });
    }, 2000);
  }
  render() {
    return (
      <div className={styles.base}>
        {this.state.request && (
          <div className={styles.requestBox}>
            <div className={styles.requestImg}>
              <img src={ssloader} alt="Loader..."></img>
            </div>
            <div className={styles.requestHeading}>
              We will get our best minds on this issue to resolve it
            </div>
            <div className={styles.requestContetn}>
              Give us a chance to make it work and you won’t be disappointed.
              We’ll be on this problem around the clock and get back to you with
              a solution at the earliest.
            </div>
          </div>
        )}
        {this.state.success && (
          <div className={styles.requestBox}>
            <div className={styles.requestImg}>
              <img src={ssloaders} alt="Loader..."></img>
            </div>
            <div className={styles.requestHeading}>
              We have successfully registered your issue
            </div>
            <div className={styles.requestContetn}>
              Thanks for your patience. We are almost done.
            </div>
          </div>
        )}
      </div>
    );
  }
}
