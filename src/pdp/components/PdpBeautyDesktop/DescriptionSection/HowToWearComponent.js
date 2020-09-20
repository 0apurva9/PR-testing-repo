import React, { Component, Fragment } from "react";
import { Collapse } from "react-collapse";
import styles from "./HowToWearComponent.css";
import HowToWearToggleComponent from "./HowToWearToggleComponent";

export default class HowToWearComponent extends Component {
  render() {
    return (
      <Fragment>
        <div className={styles.container}>
          <div className={styles["htw-component"]}>
            <div className={styles.base}>
              <div
                className={styles.holder}
                onClick={() => {
                  this.openMenu();
                }}
              >
                <div className={styles["htw-heading"]}>
                  {this.props.heading}
                </div>
              </div>

              <HowToWearToggleComponent {...this.props} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
