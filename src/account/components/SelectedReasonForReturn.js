import React from "react";
import styles from "./SelectedReasonForReturn.css";
import checkIcon from "../../general/components/img/check.svg";
import Icon from "../../xelpmoc-core/Icon";
export default class SelectedReasonForReturn extends React.Component {
  handleCancel() {
    if (this.props.handleCancel) {
      this.props.handleCancel();
    }
  }
  render() {
    console.log("products props:", this.props);
    return (
      <div className={styles.base}>
        <div className={styles.headerRefundReason}>
          {this.props.header && (
            <div className={styles.headerForDefectiveReason}>
              <div className={styles.headerForDefectiveReasonFirst}>
                {this.props.returnFlow
                  ? "Reason for return:"
                  : this.props.header}{" "}
                {this.props.titleDescription && (
                  <span className={styles.titleDescription}>
                    {this.props.titleDescription}
                  </span>
                )}
              </div>
            </div>
          )}
          <div
            className={styles.cancelButtonHolder}
            onClick={() => this.handleCancel()}
          >
            Change
          </div>
        </div>
        {this.props.subDescription && (
          <div className={styles.subDescription}>
            Issue Detail:{" "}
            <span className={styles.subTitleDescription}>
              {this.props.subDescription}
            </span>
          </div>
        )}
        {this.props.commentsInReturn && (
          <div className={styles.commentTitle}>
            Comments:{" "}
            <span className={styles.comment}>
              {this.props.commentsInReturn}
            </span>
          </div>
        )}
        {this.props.returnFlow ? (
          ""
        ) : (
          <div className={styles.checkIcon}>
            <Icon image={checkIcon} size={40} />
          </div>
        )}
        {/* <div className={styles.defectiveProductData}>
					{this.props.title && <div className={styles.titleAddress}>{this.props.title}</div>}
					{this.props.titleDescription && (
						<div className={styles.titleDescription}>{this.props.titleDescription}</div>
					)}
					{this.props.subTitleDescription && (
						<div className={styles.subTitleDescription}>{this.props.subTitleDescription}</div>
					)}
				</div> */}
        {(this.props.date || this.props.time) && (
          <div className={styles.dateAndTimeHolder} style={{ display: "none" }}>
            {this.props.date && (
              <div className={styles.date}>
                <div className={styles.dateHeader}>
                  {this.props.idReturnToStore ? "Open On:" : "Date:"}
                </div>
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
