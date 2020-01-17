import React from "react";
import styles from "./UpiTermsAndCondition.css";
import BottomSlideModalUpi from "../../general/components/BottomSlideModalUpi";
export default class UpiTermsAndCondition extends React.Component {
  onCancel() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }

  render() {
    return (
      <BottomSlideModalUpi
        heading="Terms and Conditions"
        closeModal={value => this.onCancel()}
      >
        <div className={styles.base}>
          <div className={styles.bottomHolder}>
            <div className={styles.applicationForm}>
              <div className={styles.labelHedaer}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  cursus tellus rutrum risus tempus, non fermentum est accumsan.
                </p>
                <br />
                <p>
                  Vestibulum eu eros scelerisque, feugiat enim a, blandit
                  turpis. Donec cursus tellus rutrum risus tempus, non fermentum
                  est accumsan.
                </p>
                <br />
                <p>
                  Donec cursus tellus rutrum risus tempus, non fermentum est
                  accumsan.
                </p>
                <br />
                <p>
                  Quisque tempor sapien nec fermentum euismod. Donec cursus
                  tellus rutrum risus tempus, non fermentum est accumsan.
                </p>
                <br />
                <p>
                  Nam in justo nec ligula sodales vehicula ut pulvinar risus.
                </p>
                <br />
                <p>
                  Aenean rutrum nisl id dolor aliquam efficitur. Donec cursus
                  tellus rutrum risus tempus, non fermentum est accumsan.
                </p>
                <br />
              </div>
            </div>
          </div>
        </div>
      </BottomSlideModalUpi>
    );
  }
}
