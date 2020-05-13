import React from "react";
import styles from "./IssueContactOptions.css";
import userOption from "../components/img/userOption.svg";
import Button from "../../general/components/Button.js";
import Icon from "../../xelpmoc-core/Icon";
import editIcon from "../components/img/edit.svg";
import chatIcon from "../components/img/chatIcon.svg";
import callMeBack from "../components/img/callMeBack.svg";
import call from "../components/img/call.svg";

const YES = "Yes";
const MoreHelps = props => {
  return (
    <div className={styles.baseWrapper}>
      <div className={styles.issueOptionsBox}>
        <div className={styles.icon}>
          <img src={userOption} alt="User image" />
        </div>
        <div className={styles.header}>
          Sorry to know it did not work for you.
        </div>
        <div className={styles.content}>
          Lets try to fix the issue for you, if you need instant support then
          use live chat option to reach us quickly. Our support will reply as
          soon as possible.
        </div>

        {props.selectedOrder.webform == YES && (
          <div className={styles.actionButton}>
            <div className={styles.actionWCMS}>
              <Button
                backgroundColor="#da1c5c"
                height={48}
                label="Write to us / Raise a Complain"
                width={276}
                // color="#da1c5c"
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
          {props.selectedOrder.chat == YES && (
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
          {props.selectedOrder.click2Call == YES &&
            props.selectedOrder.chat == YES && (
              <div className={styles.lineSeperator}></div>
            )}

          {props.selectedOrder.click2Call == YES && (
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
        {props.selectedOrder.call == YES && (
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
      </div>
    </div>
  );
};

export default MoreHelps;
