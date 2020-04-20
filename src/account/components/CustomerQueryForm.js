import React, { Component } from "react";
import CheckBox from "../../general/components/CheckBox.js";
import styles from "./CustomerQueryForm.css";
import Button from "../../general/components/Button.js";
const BASIC_FORM = "bacisform";
const ATTACHEMENT = "attachment";
const COMMUNICATION = "communication";
const TICKET_TATACLIQ = "tataCliq";
const TICKET_OTHER_ECOMMERCE = "Other e-Commerce";

export default class CustomerQueryForm extends Component {
  state = {
    basicForm: true,
    attachment: false,
    communication: false,
    currentStep: BASIC_FORM,
    btnLabel: "NEXT",
    ticketType: TICKET_TATACLIQ
  };
  nextField(currentStep) {
    if (currentStep == BASIC_FORM) {
      this.setState({
        basicForm: false,
        attachment: true,
        currentStep: ATTACHEMENT
      });
    }
    if (currentStep == ATTACHEMENT) {
      this.setState({
        attachment: false,
        communication: true,
        currentStep: COMMUNICATION,
        btnLabel: "SUBMIT"
      });
    }
    // if(currentStep==COMMUNICATION){
    //     this.setState({})
    // }
  }

  render() {
    const {
      basicForm,
      attachment,
      communication,
      currentStep,
      btnLabel,
      ticketType
    } = this.state;
    console.log("ticketType", this.props);
    return (
      <div className={styles.base}>
        {basicForm && (
          <div className={styles.basicForm}>
            <div className={styles.header}>{"Create your ticket"}</div>
            <div className={styles.ticketType}>
              <div className={styles.selectTicketBox}>
                <div className={styles.radioBox}>
                  <input
                    type="radio"
                    id="tataCLiq"
                    value={TICKET_TATACLIQ}
                    checked={ticketType == TICKET_TATACLIQ ? true : false}
                    onChange={e =>
                      this.setState({ ticketType: e.target.value })
                    }
                  />
                  <label
                    for="tataCLiq"
                    className={
                      ticketType == TICKET_TATACLIQ ? styles.fontBold : null
                    }
                  >
                    TATA CLiQ
                  </label>
                </div>

                {/* <div className={[styles.ticketTypeTxt,ticketType == TICKET_TATACLIQ?styles.fontBold:null].join("")}>TATA CLiQ</div>
                <div className={styles.ticketTypeSelect}>
                  <input
                    type="radio"
                    value={TICKET_TATACLIQ}
                    checked={
                        ticketType == TICKET_TATACLIQ
                        ? true
                        : false
                    }
                    onChange={e => this.setState({ticketType:e.target.value})}
                  />
                </div> */}
              </div>
              <div className={styles.selectTicketBox}>
                <div className={styles.radioBox}>
                  <input
                    type="radio"
                    id="otherECommercer"
                    value={TICKET_OTHER_ECOMMERCE}
                    checked={
                      ticketType == TICKET_OTHER_ECOMMERCE ? true : false
                    }
                    onChange={e =>
                      this.setState({ ticketType: e.target.value })
                    }
                  />
                  <label
                    for="otherECommercer"
                    className={
                      ticketType == TICKET_OTHER_ECOMMERCE
                        ? styles.fontBold
                        : null
                    }
                  >
                    Other e-commerce platform
                  </label>
                </div>
                {/* <div className={[styles.ticketTypeTxt, ticketType == TICKET_OTHER_ECOMMERCE?styles.fontBold:null].join("")}>
                  Other e-commerce platform
                </div>
                <div className={styles.ticketTypeSelect}>
                  <input
                    type="radio"
                    value={TICKET_OTHER_ECOMMERCE}
                    checked={
                        ticketType == TICKET_OTHER_ECOMMERCE
                        ? true
                        : false
                    }
                    onChange={e => this.setState({ticketType:e.target.value})}
                  />
                </div> */}
              </div>
            </div>
          </div>
        )}
        {attachment && (
          <div className={styles.attachment}>
            <h1>THis is attachement</h1>
          </div>
        )}

        {communication && (
          <div className={styles.communication}>
            <h1>THis is communication</h1>
          </div>
        )}

        <div className={styles.formAction}>
          <div className={styles.stepIndicator}>
            <span
              className={[
                styles.steps,
                basicForm ? styles.currentStep : null
              ].join(" ")}
            ></span>
            <span
              className={[
                styles.steps,
                attachment ? styles.currentStep : null
              ].join(" ")}
            ></span>
            <span
              className={[
                styles.steps,
                communication ? styles.currentStep : null
              ].join(" ")}
            ></span>
          </div>
          <div className={styles.nextButton}>
            <Button
              type="primary"
              backgroundColor="#da1c5c"
              height={40}
              label={btnLabel}
              width={205}
              textStyle={{ color: "#FFF", fontSize: 14 }}
              // disabled={true}
              onClick={() => this.nextField(currentStep)}
            />
          </div>
        </div>
      </div>
    );
  }
}
