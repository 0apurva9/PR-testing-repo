import React from "react";
import Button from "../../general/components/Button.js";
import feedbackYes from "../components/img/feedbackYes.png";
import likeIcon from "../components/img/likeIcon.png";
import styles from "./CustomerIssue.css";

const QuestionSetails = props => {
  return (
    <div className={styles.questionAnswer}>
      <div className={styles.question}>{props.question.issueType}</div>
      <div className={styles.propleLike}>
        <div className={styles.likeIcon}>
          <img src={likeIcon} alt="like" />
        </div>
        <span className={styles.poopleLIke}>{"342"}</span>
        <span>People found it useful</span>
      </div>
      <div className={styles.answer}>{props.question.solution}</div>
      <div className={styles.feedBack}>
        <div className={styles.feedBackBox}>
          <div className={styles.feedBackHeader}>{`${
            props.isAnswerHelpFull ? "Thank you" : "Was this helpful?"
          }`}</div>
          <div className={styles.feedBackContent}>
            {`${
              props.isAnswerHelpFull
                ? "Your feedback is valuable for us to make us get better in addressing you issue."
                : "Hi we hope that the above information answered your issue help us get better by letting us know"
            }`}
          </div>
        </div>
        {props.isAnswerHelpFull ? (
          <div className={styles.thankImg}>
            <img src={feedbackYes} alt="Thank you" />
          </div>
        ) : (
          <div className={styles.feedBackButton}>
            <Button
              backgroundColor="#fff"
              height={28}
              label="Yes"
              width={90}
              // color="#da1c5c"
              borderRadius="20px"
              textStyle={{ color: "#da1c5c", fontSize: 14 }}
              onClick={() => props.answerYes()}
            />
            <Button
              backgroundColor="#fff"
              height={28}
              label="No"
              width={90}
              // color="#da1c5c"
              borderRadius="20px"
              textStyle={{ color: "#da1c5c", fontSize: 14 }}
              onClick={() => props.issueOptions(props.question)}
            />
          </div>
        )}
      </div>
      <div className={styles.questionsAction}>
        <Button
          type="hollow"
          label="Back"
          borderColor={""}
          width={40}
          height={0}
          color={"#da1c5c"}
          padding="0px 5px"
          onClick={() => props.showAllQuestion()}
        />
        <Button
          type="hollow"
          label="Next Issue"
          width={110}
          height={0}
          borderColor={""}
          color={"#da1c5c"}
          padding="0"
          disabled={props.nextQuestions ? false : true}
          onClick={() => props.nextQuestion()}
        />
        <div className={styles.nextIssue}>
          {props.nextQuestions && props.nextQuestions.issueType
            ? `(${props.nextQuestions.issueType})`
            : null}
          {}
        </div>
      </div>
    </div>
  );
};

export default QuestionSetails;
