import React, { Component } from "react";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import styles from "./timeSlotPopUp.css";

export default class TimeSlotPopUp extends Component {
  render() {
    return (
      <BottomSlideModal>
        <div className={styles.popUpBox}>hii this is time slot</div>
      </BottomSlideModal>
    );
  }
}
