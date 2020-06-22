import React from "react";
import styles from "./ExchangeModal.css";
import SelectBoxMobileExchange from "../../general/components/SelectBoxMobileExchange";
export default class SelectDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBrandSelected: false,
      isModelSelected: false
    };
  }
  onChange(val) {
    this.setState({ isBrandSelected: true });
    this.props.onChange(val);
  }
  onChangeSecondary(val) {
    this.setState({ isModelSelected: true });
    this.props.onChangeSecondary(val);
  }
  saveDeviceDetails(deviceNo) {
    this.props.saveDeviceDetails(deviceNo);
  }
  getComparedResult = (nameA, nameB) => {
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };
  compareBrandNames = (a, b) => {
    let nameA = a.exchangeBrandName.toUpperCase();
    let nameB = b.exchangeBrandName.toUpperCase();
    return this.getComparedResult(nameA, nameB);
  };
  compareModelNames = (a, b) => {
    let nameA = a.exchangeModelName.toUpperCase();
    let nameB = b.exchangeModelName.toUpperCase();
    return this.getComparedResult(nameA, nameB);
  };

  render() {
    let brandNames = this.props.makeModelDetails;
    let sortedBrandNames =
      brandNames && brandNames.sort(this.compareBrandNames);
    let modelNames = this.props.currentModelList;
    let sortedModelNames =
      modelNames && modelNames.sort(this.compareModelNames);
    return (
      <React.Fragment>
        <div className={styles.smallHeading}>{this.props.heading}</div>
        <SelectBoxMobileExchange
          placeholder={"Select Brand"}
          customSelect="customSelect1"
          options={
            sortedBrandNames &&
            sortedBrandNames.map((val, i) => {
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
            sortedModelNames &&
            sortedModelNames.map((val, i) => {
              return {
                value: val.exchangeModelName,
                label: val.exchangeModelName,
                modelList: val
              };
            })
          }
          isEnable={this.props.isEnableForModel}
          onChange={val => this.onChangeSecondary(val)}
        />
        {this.state.isBrandSelected && this.state.isModelSelected ? (
          <div
            className={styles.evaluateButton}
            onClick={deviceNo => this.saveDeviceDetails(this.props.deviceNo)}
          >
            Evaluate
          </div>
        ) : (
          <div className={styles.evaluateButtonDisabled}>Evaluate</div>
        )}
      </React.Fragment>
    );
  }
}
