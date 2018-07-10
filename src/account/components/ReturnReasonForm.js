import React from "react";
import OrderCard from "./OrderCard";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import TextArea from "../../general/components/TextArea";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import Button from "../../general/components/Button";
import styles from "./ReturnReasonForm.css";
import ReverseSealYesNo from "./ReverseSealYesNo.js";
import DeskTopOnly from "../../general/components/DesktopOnly.js";
import MobileOnly from "../../general/components/MobileOnly.js";
import DummyTab from "../../cart/components/DummyTab.js";
const MODE_OF_RETURN = "Select mode of return";
const REFUND_DETAILS = "Refund Details";
export default class ReturnReasonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySecondary: false,
      secondaryReasons: null,
      comment: null,
      reverseSeal: null,
      returnReasonCode: null,
      subReasonCode: null,
      isEnable: false
    };
  }
  handleContinue() {
    if (this.props.onContinue) {
      let reasonAndCommentObj = Object.assign(
        {},
        {
          returnReasonCode: this.state.returnReasonCode,
          subReasonCode: this.state.subReasonCode,
          comment: this.state.comment,
          reason: this.state.reason,
          reverseSeal: this.state.reverseSeal
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
      subReasonCode: null,
      subReason: null,
      returnReasonCode: code,
      reason: label,
      isEnable: false,
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
    this.setState({ reverseSeal: val });
  }
  onChangeSecondary(val) {
    const code = val.value;
    const label = val.label;
    this.setState({ subReasonCode: code, subReason: label, isEnable: true });
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
        <MobileOnly>
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
        </MobileOnly>
        <div className={styles.content}>
          <OrderCard
            imageUrl={
              data &&
              data.orderProductWsDTO &&
              data.orderProductWsDTO[0] &&
              data.orderProductWsDTO[0].imageURL
            }
            productName={`${data &&
              data.orderProductWsDTO &&
              data.orderProductWsDTO[0] &&
              data.orderProductWsDTO[0].productBrand} ${data &&
              data.orderProductWsDTO &&
              data.orderProductWsDTO[0] &&
              data.orderProductWsDTO[0].productName}`}
            price={
              data &&
              data.orderProductWsDTO &&
              data.orderProductWsDTO[0] &&
              data.orderProductWsDTO[0].price
            }
            isSelect={true}
            quantity={true}
            onHollow={this.props.onHollow}
            orderPlace={"10 Sept 2017"}
            orderId={"#32u4902u093"}
            productBrand={"dfsdfsdf"}
          >
            {data &&
              data.orderProductWsDTO &&
              data.orderProductWsDTO[0] &&
              data.orderProductWsDTO[0].quantity && (
                <div className={styles.quantity}>
                  Qty {data.orderProductWsDTO[0].quantity}
                </div>
              )}
          </OrderCard>
          <div className={styles.selectReasonWithText}>
            <DeskTopOnly>
              <div className={styles.header}>
                <div className={styles.circleHolder}>
                  <div className={styles.circle}>1</div>
                </div>
                Select reason for your return
              </div>
            </DeskTopOnly>
            <div className={styles.select}>
              <SelectBoxMobile2
                placeholder={"Select a reason"}
                options={
                  data &&
                  data.returnReasonMap &&
                  data.returnReasonMap.map((val, i) => {
                    return {
                      value: val.parentReasonCode,
                      label: val.parentReturnReason
                    };
                  })
                }
                onChange={val => this.onChangePrimary(val)}
              />
            </div>
            {this.state.secondaryReasons && (
              <div className={styles.select}>
                <SelectBoxMobile2
                  placeholder={"Select a reason"}
                  options={this.state.secondaryReasons}
                  onChange={val => this.onChangeSecondary(val)}
                  isEnable={this.state.isEnable}
                />
              </div>
            )}
            <div className={styles.textArea}>
              <TextArea onChange={val => this.handleChange(val)} />
            </div>
            <DeskTopOnly>
              <div className={styles.buttonHolder}>
                <div className={styles.cancelButtonHolder}>
                  <UnderLinedButton
                    size="14px"
                    fontFamily="regular"
                    color="#000000"
                    label="Cancel"
                    onClick={() => this.handleCancel()}
                  />
                </div>

                <div className={styles.continueButtonHolder}>
                  <Button
                    type="primary"
                    backgroundColor="#ff1744"
                    height={40}
                    label="Continue"
                    width={120}
                    textStyle={{ color: "#FFF", fontSize: 14 }}
                    onClick={() => this.handleContinue()}
                  />
                </div>
              </div>
            </DeskTopOnly>
          </div>
        </div>
        {data &&
          data.showReverseSealFrJwlry === "yes" && (
            <div className={styles.reverseSealHolder}>
              <ReverseSealYesNo
                selectReverseSeal={val => this.selectReverseSeal(val)}
              />
            </div>
          )}

        <MobileOnly>
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
        </MobileOnly>

        <DeskTopOnly>
          <DummyTab title={MODE_OF_RETURN} number={2} />
          <DummyTab title={REFUND_DETAILS} number={3} />
        </DeskTopOnly>
      </div>
    );
  }
}
