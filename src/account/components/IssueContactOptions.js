import React from "react";
import styles from "./IssueContactOptions.css";
import userOption from "../components/img/userOption.svg";
import Button from "../../general/components/Button.js";

const IssueContactOptions = props => {
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
        <div className={styles.actionButton}>
          <div className={styles.actionLiveChat}>
            <Button
              backgroundColor="#fff"
              height={48}
              label="Live Chat"
              width={276}
              borderColor="#da1c5c"
              borderRadius="6px"
              textStyle={{ color: "#da1c5c", fontSize: 14 }}
              // onClick={() => this.answerYes()}
            />
          </div>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueContactOptions;
