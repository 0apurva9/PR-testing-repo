import React from "react";
import styles from "./PickUpLocation.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import MobileOnly from "../../general/components/MobileOnly";
import GridSelect from "../../general/components/GridSelect.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import CheckBox from "../../general/components/CheckBox.js";
const integerDayMapping = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thur", "Fri"];

export default class PickUpLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCheckBoxSelected: false
    };
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  handleClickForDesktop() {
    this.setState({ isCheckBoxSelected: !this.state.isCheckBoxSelected });
    if (this.state.isCheckBoxSelected) {
      if (this.props.handleClickForDesktop) {
        this.props.handleClickForDesktop();
      }
    } else {
      if (this.props.handleClickForDesktop) {
        this.props.handleClickForDesktop(this.props.slaveId);
      }
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.holder}>
          {this.props.headingText && (
            <div className={styles.headingText}>{this.props.headingText}</div>
          )}
          <DesktopOnly>
            <div
              className={styles.checkBoxHolder}
              onClick={() => this.handleClickForDesktop()}
            >
              <CheckBox
                selected={
                  this.props.selectedId === this.props.slaveId ? true : false
                }
              />
            </div>
          </DesktopOnly>
          {this.props.iconText && (
            <div className={styles.textIcon}>{this.props.iconText}</div>
          )}
          {this.props.address && (
            <div className={styles.addressText}>{this.props.address}</div>
          )}
          {this.props.address2 && (
            <div className={styles.addressText}>{this.props.address2}</div>
          )}
          {this.props.PickUpKey && (
            <div className={styles.pickUpBox}>
              <div className={styles.pickUpDay}>
                <span className={styles.pickUpText}>
                  {this.props.PickUpKey}
                </span>

                {this.props.workingDays === "7"
                  ? "all days"
                  : this.props.workingDays.split("").map(val => {
                      if (val !== ",") {
                        return integerDayMapping[parseInt(val)];
                      } else {
                        return ", ";
                      }
                    })}
              </div>
              <div className={styles.pickUpDay}>
                ({this.props.openingTime} - to {this.props.closingTime} Hrs)
              </div>
            </div>
          )}
        </div>
        {this.props.canSelectStore && (
          <MobileOnly>
            <div className={styles.buttonHolder}>
              <div
                className={styles.buttonContainer}
                onClick={() => this.handleClick()}
              >
                <Button
                  type="primary"
                  color="#fff"
                  label={this.props.buttonText}
                  width={121}
                />
              </div>
            </div>
          </MobileOnly>
        )}
      </div>
    );
  }
}
PickUpLocation.propTypes = {
  headingText: PropTypes.string,
  address: PropTypes.string,
  pickUpKey: PropTypes.string,
  closingTime: PropTypes.string,
  openingTime: PropTypes.string,
  workingDays: PropTypes.string,
  iconText: PropTypes.string,
  onClick: PropTypes.func,
  buttonText: PropTypes.string
};
PickUpLocation.defaultProps = {
  canSelectStore: true
};
