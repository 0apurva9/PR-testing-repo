import React from "react";
import styles from "./ExchangeModal.css";
import SelectBoxMobileExchange from "../../general/components/SelectBoxMobileExchange";
import PropTypes from "prop-types";
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

  render() {
    let brandNames = this.props.makeModelDetails;
    let sortedBrandNames =
      brandNames &&
      brandNames.sort((a, b) =>
        a.exchangeBrandName.localeCompare(b.exchangeBrandName)
      );
    let modelNames = this.props.currentModelList;
    let sortedModelNames =
      modelNames &&
      modelNames.sort((a, b) =>
        a.exchangeModelName.localeCompare(b.exchangeModelName)
      );
    return (
      <React.Fragment>
        <div className={styles.smallHeading}>{this.props.heading}</div>
        <SelectBoxMobileExchange
          placeholder={"Select Brand"}
          customSelect="customSelect1"
          options={
            sortedBrandNames &&
            sortedBrandNames.map((val) => {
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
            sortedModelNames.map((val) => {
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
            onClick={() => this.saveDeviceDetails(this.props.deviceNo)}
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

SelectDevice.propTypes = {
  makeModelDetails: PropTypes.object,
  currentModelList: PropTypes.object,
  heading: PropTypes.string,
  isEnableForBrand: PropTypes.bool,
  isEnableForModel: PropTypes.bool,
  deviceNo: PropTypes.number,
  onChange: PropTypes.func,
  onChangeSecondary: PropTypes.func,
  saveDeviceDetails: PropTypes.func
};
