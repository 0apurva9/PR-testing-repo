import React, { Component } from "react";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import TabHolder from "../../account/components/TabHolder";
import TabData from "../../account/components/TabData";
import styles from "./TimeSlotPopUp.css";
const timeSlotArray = [
  { time: "7 AM - 8 AM" },
  { time: "8 AM - 9 AM" },
  { time: "9 AM - 10 AM" },
  { time: "10 AM - 11 AM" },
  { time: "11 AM - 12 PM" },
  { time: "12 PM - 1 PM" },
  { time: "3 PM - 4 PM" },
  { time: "4 PM - 5 PM" },
  { time: "5 PM - 6 PM" },
  { time: "6 PM - 7 PM" },
  { time: "7 PM - 8 PM" },
  { time: "8 PM - 9 PM" },
  { time: "9 PM - 10 PM" }
];
export default class TimeSlotPopUp extends Component {
  state = {
    isSelected: 0
  };

  tabSelect(val) {
    // if (this.state.isSelected !== val) {
    //   this.setState({ openIndex: null, showEmi: false, showBank: false });
    // }
    this.setState({ isSelected: val });
  }

  timeSlotArray = () => {
    return timeSlotArray.map(time => {
      return (
        <React.Fragment>
          {/* <div className={styles.txt}>Morning</div> */}
          <div className={styles.timeCard}>{time.time}</div>
        </React.Fragment>
      );
    });
  };

  render() {
    return (
      <BottomSlideModal>
        <div className={styles.timeslotBox}>
          <TabHolder>
            <TabData
              width="50%"
              label={"Today <br/> Monday, 3rd February"}
              subHeding={true}
              selected={this.state.isSelected === 0}
              selectItem={() => this.tabSelect(0)}
            />
            <TabData
              width="50%"
              label={"Tomorrow <br/> Monday, 3rd February"}
              subHeding={true}
              selected={this.state.isSelected === 1}
              selectItem={() => this.tabSelect(1)}
            />
          </TabHolder>

          <div className={styles.dateBox}>
            {this.state.isSelected === 0 && (
              <div className={styles.dateSection}>
                <div className={styles.timeSlotBox}>
                  {this.timeSlotArray()}
                  {/* <div className={styles.txt}>Morning</div>
                  <div className={styles.timeCard}>7 AM - 8 AM</div>
                  <div className={styles.timeCard}>8 AM - 9 AM</div>
                  <div className={styles.timeCard}>9 AM - 10 AM</div>
                  <div className={styles.timeCard}>10 AM - 11 AM</div>
                  <div className={styles.timeCard}>11 AM - 12 PM</div>
                </div>
                <div className={styles.timeSlotBox}>
                  <div className={styles.txt}>Afternoon</div>
                  <div className={styles.timeCard}>12 PM - 1 PM</div>
                  <div className={styles.timeCard}>1 PM - 2 PM</div>
                  <div className={styles.timeCard}>3 PM - 4 PM</div>
                </div>
                <div className={styles.timeSlotBox}>
                  <div className={styles.txt}>Evening</div>
                  <div className={styles.timeCard}>5 PM - 6 PM</div>
                  <div className={styles.timeCard}>6 PM - 7 PM</div>
                  <div className={styles.timeCard}>7 PM - 8 PM</div>
                  <div className={styles.timeCard}>8 PM - 9 PM</div>
                  <div className={styles.timeCard}>9 PM - 10 PM</div>
                </div> */}
                </div>
              </div>
            )}
            {this.state.isSelected === 1 && (
              <div className={styles.dateSection}>
                <div className={styles.timeSlotBox}>
                  <div className={styles.txt}>Morning</div>
                  <div className={styles.timeCard}>7 AM - 8 AM</div>
                  <div className={styles.timeCard}>8 AM - 9 AM</div>
                  <div className={styles.timeCard}>9 AM - 10 AM</div>
                  <div className={styles.timeCard}>10 AM - 11 AM</div>
                  <div className={styles.timeCard}>11 AM - 12 PM</div>
                </div>
                <div className={styles.timeSlotBox}>
                  <div className={styles.txt}>Afternoon</div>
                  <div className={styles.timeCard}>12 PM - 1 PM</div>
                  <div className={styles.timeCard}>1 PM - 2 PM</div>
                  <div className={styles.timeCard}>3 PM - 4 PM</div>
                </div>
                <div className={styles.timeSlotBox}>
                  <div className={styles.txt}>Evening</div>
                  <div className={styles.timeCard}>5 PM - 6 PM</div>
                  <div className={styles.timeCard}>6 PM - 7 PM</div>
                  <div className={styles.timeCard}>7 PM - 8 PM</div>
                  <div className={styles.timeCard}>8 PM - 9 PM</div>
                  <div className={styles.timeCard}>9 PM - 10 PM</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </BottomSlideModal>
    );
  }
}
