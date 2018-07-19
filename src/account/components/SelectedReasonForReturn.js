import React from "react";
import styles from "./SelectedReasonForReturn.css";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import checkIcon from "../../general/components/img/check.svg";
import Icon from "../../xelpmoc-core/Icon";
export default class SelectedReasonForReturn extends React.Component {
  handleCancel() {
    if (this.props.handleCancel) {
      this.props.handleCancel();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        {this.props.header && (
          <div className={styles.headerForDefectiveReason}>
            {this.props.header}
          </div>
        )}
        <div className={styles.cancelButtonHolder}>
          <UnderLinedButton
            size="14px"
            fontFamily="regular"
            color="#000000"
            label="Change"
            onClick={() => this.handleCancel()}
          />
        </div>
        <div className={styles.checkIcon}>
          <Icon image={checkIcon} size={40} />
        </div>
        <div className={styles.defectiveProductData}>
          {this.props.title && (
            <div className={styles.titleAddress}>{this.props.title}</div>
          )}
          {this.props.titleDescription && (
            <div className={styles.titleDescription}>
              {this.props.titleDescription}
            </div>
          )}
          {this.props.subTitleDescription && (
            <div className={styles.subTitleDescription}>
              {this.props.subTitleDescription}
            </div>
          )}
        </div>
        {(this.props.date || this.props.time) && (
          <div className={styles.dateAndTimeHolder}>
            {this.props.date && (
              <div className={styles.date}>
                <div className={styles.dateHeader}>Date:</div>
                <div className={styles.dateAndTimeDetail}>
                  {this.props.date}
                </div>
              </div>
            )}
            {this.props.time && (
              <div className={styles.time}>
                <div className={styles.TimeHeader}>Time:</div>
                <div className={styles.dateAndTimeDetail}>
                  {this.props.time}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
