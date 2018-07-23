import React, { Component } from "react";
import Accordion from "../../general/components/Accordion.js";
import styles from "./CMSTextComponent.css";
import * as UserAgent from "../../lib/UserAgent.js";
export default class CMSTextComponent extends Component {
  render() {
    return (
      <div className={styles.questionAnswerHolder}>
        <Accordion
          headerElement={true}
          faqQuestion={this.props.data.question_component}
          activeBackground={
            UserAgent.checkUserAgentIsMobile() ? "#f8f8f8" : "#fff"
          }
        >
          <div
            className={styles.answer}
            dangerouslySetInnerHTML={{
              __html: this.props.data.answer
            }}
          />
        </Accordion>
      </div>
    );
  }
}
