import React, { Component, Fragment } from "react";
import { Collapse } from "react-collapse";
import styles from "./HowToWearComponent.css";
import HowToWearToggleComponent from "./HowToWearToggleComponent";

export default class HowToWearComponent extends Component {
  //this may be used later if requested

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isOpen: true,
  //   };
  // }

  //this may be used later if requested

  // openMenu() {
  //   this.setState((prevState) => ({
  //     isOpen: !prevState.isOpen,
  //   }));
  // }

  render() {
    //this may be used later if requested

    // let iconActive = styles.iconup;
    // if (this.state.isOpen) {
    //   iconActive = styles.icon;
    // }

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
                <div className={styles["ingredents-heading"]}>
                  {this.props.heading}
                </div>

                {/* this may be used later if requested */}

                {/* <div className={iconActive} /> */}
              </div>

              <HowToWearToggleComponent {...this.props} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
