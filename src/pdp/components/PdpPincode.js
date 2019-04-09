import React from "react";
import Input2 from "../../general/components/Input2.js";
import styles from "./PdpPincode.css";
export default class PdpPincode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: this.props.pincode ? this.props.pincode : ""
    };
  }
  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  enterPassword(val) {
    if (val === "Enter") {
      this.onCheckPinCode(this.state.pincode);
    }
  }
  onChange(val) {
    this.setState({ pincode: val });
  }
  onCheckPinCode(val) {
    if (val.length < 6) {
      this.props.displayToast("Please enter valid pincode");
    } else {
      if (this.props.onCheckPinCode) {
        this.props.onCheckPinCode(val);
      }
    }
  }

  render() {
    let baseClass =
      this.props.pdpApparel ||
      this.props.pdpHome ||
      this.props.pdpJewellery ||
      this.props.pdpElectronics
        ? styles.basePdp
        : styles.base;
    let buttonHolderClass =
      this.props.pdpApparel ||
      this.props.pdpHome ||
      this.props.pdpJewellery ||
      this.props.pdpElectronics
        ? styles.buttonHolderPdp
        : styles.buttonHolder;
    let labelMessageClass = this.props.pdpApparel
      ? styles.labelMessagePdp
      : styles.labelMessage;
    return this.props.hasPincode ? (
      <div className={baseClass}>
        <div
          className={
            this.props.status === "N"
              ? styles.borderLeft
              : styles.pinCodeAndButtonHolder
          }
        >
          <div className={styles.label}>
            {this.props.status !== "N" &&
              this.props.city && <span>{this.props.city}, </span>}
            {this.props.pincode}
          </div>
          <div className={buttonHolderClass}>
            <div
              className={styles.button}
              id="change"
              onClick={() => this.onClick()}
            >
              Change
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className={baseClass}>
        <div className={styles.borderForNoPinCode}>
          <Input2
            placeholder={"Enter Pincode"}
            boxy={true}
            textStyle={{ fontSize: 14 }}
            height={25}
            maxLength={"6"}
            onChange={val => this.onChange(val)}
            onlyNumber={true}
            border={"none"}
            value={this.state.pincode}
            noPadding={true}
            onKeyUp={event => {
              this.enterPassword(event.key);
            }}
          />
          <div className={buttonHolderClass}>
            <div
              className={styles.button}
              onClick={() => this.onCheckPinCode(this.state.pincode)}
            >
              check
            </div>
          </div>
        </div>
      </div>
    );
  }
}
