import React from "react";
import styles from "./MoreHelps.css";
import userOption from "../components/img/userOption.svg";
import Button from "../../general/components/Button.js";
import Icon from "../../xelpmoc-core/Icon";
import editIcon from "../components/img/edit.svg";
import chatIcon from "../components/img/chatIcon.svg";
import callMeBack from "../components/img/callMeBack.svg";
import call from "../components/img/call.svg";
import downArrow from "../../general/components/img/down-arrow-pink.png";

const YES = "Yes";
const MoreHelps = props => {
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
          Let us help you out on this issue. Please select a convenient mode to
          reach us.
          <br />
          Pro tip: Raise a complaint for faster resolution.
        </div>

        {props.selectedOrder && props.selectedOrder.webform == YES && (
          <div className={styles.actionButton}>
            <div className={styles.actionWCMS}>
              <Button
                backgroundColor="#da1c5c"
                height={48}
                label="Write to us/ Raise a complaint"
                width={276}
                // color="#da1c5c"
                boxShadow="0 0 6px 2px rgba(0, 0, 0, 0.11)"
                borderRadius="6px"
                textStyle={{ color: "#fff", fontSize: 14 }}
                onClick={() => props.getCustomerQueriesFields()}
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
          {props.selectedOrder && props.selectedOrder.chat == YES && (
            <Button
              type="hollow"
              label="Chat with us"
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
              // onClick={() => this.props.showAllQuestion()}
            />
          )}
          {props.selectedOrder &&
            props.selectedOrder.click2Call == YES &&
            props.selectedOrder &&
            props.selectedOrder.chat == YES && (
              <div className={styles.lineSeperator} />
            )}

          {props.selectedOrder && props.selectedOrder.click2Call == YES && (
            <Button
              type="hollow"
              label="Call me back"
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
              // onClick={() => this.props.showAllQuestion()}
            />
          )}
        </div>
        {props.selectedOrder && props.selectedOrder.call == YES && (
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
            onClick={() => props.navigatePreviousPage()}
          >
            Go to Previous Page{" "}
          </div>
          <div className={styles.buttonSeperator} />
          <div
            className={styles.customButton}
            onClick={() => props.navigateHomePage()}
          >
            Continue Shopping
          </div>
          <div className={[styles.arrow, styles.rightArrow].join(" ")} />
        </div>
      </div>
    </div>
  );
};

export default MoreHelps;
