import React from "react";
import OrderCard from "./OrderCard";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import TextArea from "../../general/components/TextArea";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import Button from "../../general/components/Button";
import styles from "./ReturnReasonForm.css";
import ReverseSealYesNo from "./ReverseSealYesNo.js";
export default class ReturnReasonForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySecondary: false,
      secondaryReasons: null,
      comment: null,
      isReverse: null
    };
  }
  handleContinue() {
    if (this.props.onContinue) {
      let reasonAndCommentObj = Object.assign(
        {},
        {
          subReasonCode: this.state.subReasonCode,
          comment: this.state.comment,
          reason: this.state.reason,
          isReverse: this.state.isReverse
        }
      );
      this.props.onContinue(reasonAndCommentObj);
    }
  }
  onChangePrimary(val) {
    const code = val.value;
    const label = val.label;
    const data = this.props.returnProductDetails;
    this.setState({
      parentReasonCode: code,
      reason: label,
      secondaryReasons: data.returnReasonMap

        .filter(val => {
          return val.parentReasonCode === code;
        })

        .map(val => {
          if (val.subReasons) {
            return val.subReasons.map(value => {
              return {
                value: value.subReasonCode,
                label: value.subReturnReason
              };
            });
          }
        })[0]
    });
  }
  handleChange(val) {
    this.setState({ comment: val });
  }
  selectReverseSeal(val) {
    this.setState({ isReverse: val });
    // if (this.props.selectReverseSeal) {
    //   this.props.selectReverseSeal(val);
    //}
  }
  onChangeSecondary(val) {
    const code = val.value;
    const label = val.label;
    this.setState({ subReasonCode: code, subReason: label });
  }
  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  render() {
    const data = this.props.returnProductDetails;

    return (
      <div className={styles.base}>
        <div className={styles.header}>
          Select reason for your return
          <div className={styles.cancelHolder}>
            <UnderLinedButton
              label="Cancel"
              color="#ff1744"
              onClick={() => this.handleCancel()}
            />
          </div>
        </div>
        <div className={styles.content}>
          <OrderCard
            imageUrl={
              data &&
              data.orderProductWsDTO[0] &&
              data.orderProductWsDTO[0].imageURL
            }
            productName={`${data.orderProductWsDTO[0].productBrand} ${
              data.orderProductWsDTO[0].productName
            }`}
            price={data.orderProductWsDTO[0].price}
          >
            {data.orderProductWsDTO[0].quantity && (
              <div className={styles.quantity}>
                Qty {data.orderProductWsDTO[0].quantity}
              </div>
            )}
          </OrderCard>
          <div className={styles.select}>
            <SelectBoxMobile2
              label={this.state.reason ? this.state.reason : "Select a reason"}
              options={data.returnReasonMap.map((val, i) => {
                return {
                  value: val.parentReasonCode,
                  label: val.parentReturnReason
                };
              })}
              onChange={val => this.onChangePrimary(val)}
            />
          </div>
          {this.state.secondaryReasons && (
            <div className={styles.select}>
              <SelectBoxMobile2
                label={
                  this.state.subReason
                    ? this.state.subReason
                    : "Select a reason"
                }
                options={this.state.secondaryReasons}
                onChange={val => this.onChangeSecondary(val)}
              />
            </div>
          )}
          <div className={styles.textArea}>
            <TextArea onChange={val => this.handleChange(val)} />
          </div>
        </div>
        {/* {data &&
          data.showReverseSealFrJwlry === "yes" && (
            <div className={styles.reverseSealHolder}>
              <ReverseSealYesNo />
            </div>
          )} */}
        <div className={styles.reverseSealHolder}>
          <ReverseSealYesNo
            selectReverseSeal={val => this.selectReverseSeal(val)}
          />
        </div>
        <div className={styles.buttonHolder}>
          <div className={styles.button}>
            <Button
              width={175}
              type="primary"
              label="Continue"
              onClick={() => this.handleContinue()}
            />
          </div>
        </div>
      </div>
    );
  }
}
