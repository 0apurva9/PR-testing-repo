import React from "react";
import styles from "./ExchangeModal.css";
import SelectBoxMobileExchange from "../../general/components/SelectBoxMobileExchange";
export default class SelectDevice extends React.Component {
  onChange(val) {
    this.props.onChange(val);
  }
  onChangeSecondary(val) {
    this.props.onChangeSecondary(val);
  }
  saveDeviceDetails(deviceNo) {
    this.props.saveDeviceDetails(deviceNo);
  }
  render() {
    return (
      <React.Fragment>
        <div className={styles.smallHeading}>{this.props.heading}</div>
        <SelectBoxMobileExchange
          placeholder={"Select Brand"}
          customSelect="customSelect1"
          options={
            this.props.makeModelDetails &&
            this.props.makeModelDetails.map((val, i) => {
              return {
                value: val.exchangeBrandId,
                label: val.exchangeBrandName,
                modelList: val.exchangeModelList
              };
            })
          }
          isEnable={this.props.isEnableForBrand}
          onChange={val => this.onChange(val)}
        />
        <br />
        <SelectBoxMobileExchange
          placeholder={"Select Model"}
          customSelect="customSelect2"
          options={
            this.props.currentModelList &&
            this.props.currentModelList.map((val, i) => {
              return {
                value: val.exchangeModelName,
                label: val.effectiveModelName,
                modelList: val
              };
            })
          }
          isEnable={this.props.isEnableForModel}
          onChange={val => this.onChangeSecondary(val)}
        />
        <div
          className={styles.evaluateButton}
          onClick={deviceNo => this.saveDeviceDetails(this.props.deviceNo)}
        >
          Evaluate
        </div>
      </React.Fragment>
    );
  }
}
