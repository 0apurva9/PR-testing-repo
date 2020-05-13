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
              We will get our BEST MINDS to resolve your issue
            </div>
            <div className={styles.requestContetn}>
              Lets try to fix the issue for you, we work round the clock to
              solve issue. Our support will reply as soon as possible.
            </div>
          </div>
        )}
        {this.state.success && (
          <div className={styles.requestBox}>
            <div className={styles.requestImg}>
              <img src={ssloaders} alt="Loader..."></img>
            </div>
            <div className={styles.requestHeading}>
              We have successfully registered your issue.
            </div>
            <div className={styles.requestContetn}>
              Thanks for your patience we are almost done
            </div>
          </div>
        )}
      </div>
    );
  }
}
