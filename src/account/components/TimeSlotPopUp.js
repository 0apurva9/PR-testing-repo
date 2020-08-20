import React, { Component } from "react";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import TabHolder from "../../account/components/TabHolder";
import TabData from "../../account/components/TabData";
import styles from "./TimeSlotPopUp.css";

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

          <div>
            {this.state.isSelected === 0 && <h1>selected 0</h1>}
            {this.state.isSelected === 1 && <h1>selected 1</h1>}
          </div>
        </div>
      </BottomSlideModal>
    );
  }
}
