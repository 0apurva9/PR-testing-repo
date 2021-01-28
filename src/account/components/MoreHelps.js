import React, { Component } from "react";
import styles from "./MoreHelps.css";
import userOption from "../components/img/userOption.svg";
import {
  setDataLayerForCLiQCarePage,
  ADOBE_SELF_SERVE_MORE_HELP_PAGE_BUTTON_CLICK
} from "../../lib/adobeUtils";
import Button from "../../general/components/Button.js";
import Icon from "../../xelpmoc-core/Icon";
import editIcon from "../components/img/edit.svg";
import chatIcon from "../components/img/chatIcon.svg";
import callMeBack from "../components/img/callMeBack.svg";
import call from "../components/img/call.svg";
const WRITE_TO_US = "Write to us/ Raise a complaint";
const CHAT_WITH_US = "Chat with us";
const CALL_ME_BACK = "Call me back";

const YES = "Yes";
class MoreHelps extends Component {
  getCustomerQueriesFields = btnText => {
    if (this.props.getCustomerQueriesFields) {
      setDataLayerForCLiQCarePage(
        ADOBE_SELF_SERVE_MORE_HELP_PAGE_BUTTON_CLICK,
        btnText
      );
      this.props.getCustomerQueriesFields();
    }
  };

  render() {
    return (
      <div className={styles.baseWrapper}>
        <div className={styles.issueOptionsBox}>
          <div className={styles.icon}>
            <img src={userOption} alt="User image" />
          </div>
          <div className={styles.header}>
            We’re sorry to know that it wasn’t helpful.
          </div>
          <div className={styles.content}>
            Let us help you out on this issue. Please select a convenient mode
            to reach us.
            <br />
            Pro tip: Raise a complaint for faster resolution.
          </div>

          {this.props.selectedOrder && this.props.selectedOrder.webform == YES && (
            <div className={styles.actionButton}>
              <div className={styles.actionWCMS}>
                <Button
                  backgroundColor="#da1c5c"
                  height={48}
                  label={WRITE_TO_US}
                  width={276}
                  // color="#da1c5c"
                  boxShadow="0 0 6px 2px rgba(0, 0, 0, 0.11)"
                  borderRadius="6px"
                  textStyle={{ color: "#fff", fontSize: 14 }}
                  onClick={() => this.getCustomerQueriesFields(WRITE_TO_US)}
                  icon={{
                    element: <Icon image={editIcon} size={20} />,
                    size: 20,
                    width: 20,
                    offset: 10
                  }}
                />
              </div>
            </div>
          )}

          <div className={styles.callChatBox}>
            {this.props.selectedOrder && this.props.selectedOrder.chat == YES && (
              <Button
                type="hollow"
                label={CHAT_WITH_US}
                borderColor={""}
                width={154}
                height={30}
                color={"#da1c5c"}
                padding="0px 5px"
                icon={{
                  element: <Icon image={chatIcon} size={20} />,
                  size: 20,
                  width: 20,
                  offset: 10
                }}
                // onClick={() => this.props.showAllQuestion(CHAT_WITH_US)}
              />
            )}
            {this.props.selectedOrder &&
              this.props.selectedOrder.click2Call == YES &&
              this.props.selectedOrder &&
              this.props.selectedOrder.chat == YES && (
                <div className={styles.lineSeperator} />
              )}

            {this.props.selectedOrder &&
              this.props.selectedOrder.click2Call == YES && (
                <Button
                  type="hollow"
                  label={CALL_ME_BACK}
                  borderColor={""}
                  width={154}
                  height={30}
                  color={"#da1c5c"}
                  padding="0px 5px"
                  icon={{
                    element: <Icon image={callMeBack} size={20} />,
                    size: 20,
                    width: 20,
                    offset: 10
                  }}
                  onClick={() => this.props.CLiQ2CallClick()}
                />
              )}
          </div>
          {this.props.selectedOrder && this.props.selectedOrder.call == YES && (
            <div className={styles.callBox}>
              <div className={styles.contatUs}>
                Or, alternatively contact us at
              </div>
              <div className={styles.callIconNumber}>
                <Icon image={call} size={20} />
                <div className={styles.number}>90291 08282</div>
              </div>
            </div>
          )}
          <div className={styles.bottomButtonBox}>
            <div className={[styles.arrow, styles.leftArrow].join(" ")}> </div>
            <div
              className={styles.customButton}
              onClick={() => this.props.navigatePreviousPage()}
            >
              Go to Previous Page{" "}
            </div>
            <div className={styles.buttonSeperator} />
            <div
              className={styles.customButton}
              onClick={() => this.props.navigateHomePage()}
            >
              Continue Shopping
            </div>
            <div className={[styles.arrow, styles.rightArrow].join(" ")} />
          </div>
        </div>
      </div>
    );
  }
}

export default MoreHelps;
