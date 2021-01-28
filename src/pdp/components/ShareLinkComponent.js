import React, { Component, Fragment } from "react";
import styles from "./ShareLinkComponent.css";
import {
  SHARE_FACEBOOK_URL,
  SHARE_TWITTER_URL,
  POP_UP_WINDOW_STYLE
} from "../../lib/constants";

export default class ShareLinkComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openShare: false
    };
  }

  handleShareClick(e = null, toggle) {
    if (e) {
      e.stopPropagation();
    }
    this.setState({ openShare: toggle });
    this.props.openBeautyPopup(toggle);
  }

  copyProductUrl() {
    const dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    this.handleShareClick(false);
    this.props.displayToast("Link copied successfully");
  }

  shareFB = () => {
    window.open(
      `${SHARE_FACEBOOK_URL}${window.location.href}`,
      "popUpWindow",
      POP_UP_WINDOW_STYLE
    );
    this.handleShareClick(false);
  };

  shareTwiter = () => {
    window.open(
      `${SHARE_TWITTER_URL}${window.location.href}`,
      "popUpWindow",
      POP_UP_WINDOW_STYLE
    );
    this.handleShareClick(false);
  };

  render() {
    return (
      <div className={styles["share-component"]}>
        {!this.state.openShare && (
          <div
            className={styles["share-btn"]}
            onClick={e => this.handleShareClick(e, true)}
          ></div>
        )}
        {this.state.openShare && (
          <Fragment>
            <div
              className={styles.background}
              onClick={e => this.handleShareClick(e, false)}
            />
            <div className={styles["share-modal-content"]}>
              <div className={styles["share-inner-content"]}>
                <div className={styles["modal-heading"]}>SHARE WITH</div>
                <div
                  className={styles["share-cls-icon"]}
                  onClick={e => this.handleShareClick(e, false)}
                ></div>
                <div className={styles["share-inner-content"]}>
                  <ul className={styles["share-block"]}>
                    <li>
                      <div
                        className={styles["share-fb-icon"]}
                        onClick={() => this.shareFB()}
                      >
                        Facebook
                      </div>
                    </li>
                    <li>
                      <div
                        className={styles["share-twt-icon"]}
                        onClick={() => this.shareTwiter()}
                      >
                        Twitter
                      </div>
                    </li>
                    <li>
                      <div
                        className={styles["share-copy-icon"]}
                        onClick={() => this.copyProductUrl()}
                      >
                        {" "}
                        Copy Link
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}
