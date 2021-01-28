import React from "react";
import styles from "./OrderRelatedIssue.css";
import CheckOutHeader from "../../cart/components/CheckOutHeader";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import Icon from "../../xelpmoc-core/Icon";
import BlackArrow from "../../general/components/img/down-arrow.svg";
import TextArea from "../../general/components/TextArea";
import FloatingLabelInput from "../../general/components/FloatingLabelInput";
import Button from "../../general/components/Button.js";

export default class CustomerCareOtherIssues extends React.Component {
  onChangeReasonForNonOrderRelated(val, l1OptionsArray) {
    this.props.onChangeReasonForNonOrderRelated(val, l1OptionsArray);
  }

  render() {
    let {
      l1OptionsArray,
      getUserDetails,
      isSelected,
      showSubIssueField,
      l2SelectedOption,
      comment,
      email,
      name,
      mobile
    } = this.props;
    return (
      <div className={styles.formHolder}>
        <div className={styles.firstTab}>
          <div className={styles.formBox}>
            <div className={styles.formWidth}>
              <div className={styles.secondOrder}>
                <CheckOutHeader
                  indexNumber={isSelected === 0 ? "2" : "1"}
                  confirmTitle="Select issue4"
                  fontSize={"14px"}
                />
              </div>
              <div className={styles.selectIssue}>
                <SelectBoxMobile2
                  placeholder="Select issue"
                  arrowColour="black"
                  height={33}
                  options={
                    l1OptionsArray &&
                    l1OptionsArray.map((val) => {
                      return {
                        value: val.parentIssueType,
                        label: val.parentIssueType
                      };
                    })
                  }
                  onChange={val =>
                    this.onChangeReasonForNonOrderRelated(val, l1OptionsArray)
                  }
                />
              </div>
              {showSubIssueField &&
                l2SelectedOption &&
                l2SelectedOption.length > 0 && (
                  <div className={styles.selectIssue}>
                    <div style={{ position: "relative" }}>
                      <select className={styles.selectNonOrder}>
                        <option value="">Select Sub Issue</option>
                        {l2SelectedOption.map((val, i) => {
                          return (
                            <option key={i} value={val.UItemplateCode}>
                              {val.subIssueType}
                            </option>
                          );
                        })}
                      </select>
                      <div className={styles.arrowSelect}>
                        <Icon image={BlackArrow} size={12} />
                      </div>
                    </div>
                  </div>
                )}
              <div className={styles.selectIssue}>
                <div className={styles.secondOrder}>
                  <CheckOutHeader
                    indexNumber={"0"}
                    confirmTitle={``}
                    fontSize={"12px"}
                  />
                </div>
                <TextArea
                  placeholder="Comments(Optional)"
                  value={comment}
                  onChange={comment => this.onChange({ comment })}
                  maxLength={240}
                />
              </div>
            </div>
          </div>
          <div className={styles.formBox}>
            <div className={styles.formWidth}>
              <div className={styles.secondOrder}>
                <CheckOutHeader
                  indexNumber={`2`}
                  confirmTitle="Personal Details"
                  fontSize={"14px"}
                />
              </div>
              <div className={styles.conmmunicationalDetails}>
                <FloatingLabelInput
                  label="Name"
                  value={name}
                  onChange={name => this.onChange({ name })}
                  onlyAlphabet={true}
                  disabled={name ? true : false}
                />
              </div>

              <div className={styles.conmmunicationalDetails}>
                <FloatingLabelInput
                  label="Email"
                  disabled={
                    getUserDetails &&
                    getUserDetails.loginType === "email" &&
                    getUserDetails.userName
                      ? true
                      : false
                  }
                  value={email}
                  onChange={email => this.onChange({ email })}
                />
              </div>
              <div className={styles.conmmunicationalDetails}>
                <FloatingLabelInput
                  label="Phone*"
                  maxLength={"10"}
                  value={mobile}
                  onChange={mobile => this.onChange({ mobile })}
                  disabled={
                    getUserDetails &&
                    getUserDetails.loginType === "mobile" &&
                    getUserDetails.userName
                      ? true
                      : false
                  }
                  onlyNumber={true}
                />
              </div>
            </div>
          </div>

          <div className={styles.buttonHolder}>
            <div className={styles.button}>
              <Button
                type="primary"
                height={38}
                label={"SUBMIT NOW"}
                width={166}
                textStyle={{ color: "#fff", fontSize: 14 }}
                onClick={() => this.submitCustomerForm()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
