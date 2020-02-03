import React from "react";
import styles from "./ExchangeModal.css";
import cashbackIcon from "../../general/components/img/infoCashback.svg";
import closeIcon from "../../general/components/img/closeIcon.svg";
import check from "../../pdp/components/img/verifyCheck.svg";
import baseValueIcon from "./img/baseValue.svg";
import cliqBonusIcon from "./img/cliqBonus.svg";
import pickUpChargeIcon from "./img/pickUpCharge.svg";
import hew1 from "../../pdp/components/img/hew1.svg";
import hew2 from "../../pdp/components/img/hew2.svg";
import hew3 from "../../pdp/components/img/hew3.svg";
import hew4 from "../../pdp/components/img/hew4.svg";
import hew5 from "../../pdp/components/img/hew5.svg";
import HowExchangeModalWorks from "./HowExchangeModalWorks";
import ExchangeTnCModal from "./ExchangeTnCModal";
import ExchangeCashbackModal from "./ExchangeCashbackModal";
import SelectDevice from "./SelectDevice";
// import * as customSelectDropDown from "../../mock/customSelectDropdown.js";
export default class ExchangeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHowExchangeWorks: false,
      howExchangeWorksModalOpenedFromPDP: false,
      showTnCModal: false,
      showCashbackModal: false,
      makeModelDetails: "",
      currentModelList: "",
      isEnableForBrand: false,
      isEnableForModel: false,
      exchangeBrandId: "",
      exchangeBrandName: "",
      selectedModel: "",
      firstDeviceInfo: "",
      secondDeviceInfo: "",
      isExchangeDeviceAdded: false,
      isFirstDeviceSelected: false,
      isSecondDeviceSelected: false,
      enableVerifyButton: false,
      initialIMEIMessage:
        "Dial <span style='font-family:regular;'>*#06#</span> from your old device to know your IMEI number",
      checkIMEIMessage:
        "Dial <span style='font-family:regular;'>*#06#</span> from your old device to know your IMEI number",
      IMEISuccessMessage:
        "<span style='color:#67b70b;'>IMEI number will be matched against your mobile at pick-up</span>",
      IMEIFailureMessage:
        "<span style='color:#c47403;'>We are having problem detecting your phone’s IMEI number. Please enter valid IMEI no.</span>",
      IMEIVerified: false,
      IMEINumber: "",
      agreedTnC: false,
      activateSecondTab: false
    };
    this.agreedTnC = this.agreedTnC.bind(this);
  }
  componentWillMount() {
    //opened directly from PDP
    if (this.props.openHowExchangeWorksModal) {
      this.openHowExchangeWorksModal();
      this.setState({ howExchangeWorksModalOpenedFromPDP: true });
    }
    //get models list
    if (this.props.exchangeDetails) {
      this.setState({
        makeModelDetails: this.props.exchangeDetails.makeModelDetails
      });
    }
  }
  componentDidMount() {
    // customSelectDropDown.setCssBrand();
    let firstDeviceData = JSON.parse(localStorage.getItem("MEFirstDeviceData"));
    if (firstDeviceData) {
      this.setState({
        isExchangeDeviceAdded: true,
        firstDeviceInfo: firstDeviceData
      });
    }
    //show first device selected if second device not added
    if (firstDeviceData && !localStorage.getItem("MESecondDeviceData")) {
      this.setState({ isFirstDeviceSelected: true });
      localStorage.setItem("currentSelectedDevice", "MEFirstDeviceData");
    }
  }
  handleClose() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
    //need to update below code-once device added set state instead of this fn
    //set first device details
    let FDD = JSON.parse(localStorage.getItem("MEFirstDeviceData"));
    if (FDD) {
      this.props.updateProductState({
        selectedProductCashback: FDD.model.totalExchangeCashback,
        selectedProductName: FDD.model.effectiveModelName
      });
      localStorage.setItem(
        "selectedProductCashback",
        JSON.stringify(FDD.model.totalExchangeCashback)
      );
      localStorage.setItem("selectedProductName", FDD.model.effectiveModelName);
    }
  }
  openHowExchangeWorksModal() {
    this.setState({ showHowExchangeWorks: true });
  }
  closeHowExchangeWorksModal() {
    this.setState({ showHowExchangeWorks: false });
    if (this.state.howExchangeWorksModalOpenedFromPDP) {
      this.handleClose();
    }
  }
  openTnCModal() {
    this.setState({ showTnCModal: true });
  }
  closeTnCModal() {
    this.setState({ showTnCModal: false });
  }
  openCashbackModal() {
    this.setState({ showCashbackModal: true });
  }
  closeCashbackModal() {
    this.setState({ showCashbackModal: false });
  }
  onChange(val) {
    this.setState({
      currentModelList: JSON.parse(val.modelList),
      isEnableForBrand: true,
      isEnableForModel: false,
      exchangeBrandId: val.value,
      exchangeBrandName: val.label
    });
    // customSelectDropDown.setCssModel();
  }
  onChangeSecondary(val) {
    this.setState({ isEnableForModel: true, selectedModel: val.modelList });
  }
  saveDeviceDetails() {
    let MDEFirstDevice = localStorage.getItem("MEFirstDeviceData");
    let MDESecondDevice = localStorage.getItem("MESecondDeviceData");
    if (!MDEFirstDevice && !MDESecondDevice) {
      //no device added
      let firstDeviceData = {
        exchangeBrandId: this.state.exchangeBrandId,
        exchangeBrandName: this.state.exchangeBrandName,
        model: JSON.parse(this.state.selectedModel),
        pickupCharge: this.props.exchangeDetails.pickupCharge,
        tulBump: this.props.exchangeDetails.TULBump
      };
      localStorage.setItem(
        "MEFirstDeviceData",
        JSON.stringify(firstDeviceData)
      );
    } else {
      //one device added previously
      let secondDeviceData = {
        exchangeBrandId: this.state.exchangeBrandId,
        exchangeBrandName: this.state.exchangeBrandName,
        model: JSON.parse(this.state.selectedModel),
        pickupCharge: this.props.exchangeDetails.pickupCharge,
        tulBump: this.props.exchangeDetails.TULBump
      };
      localStorage.setItem(
        "MESecondDeviceData",
        JSON.stringify(secondDeviceData)
      );
    }

    this.setState({ isExchangeDeviceAdded: true });
  }
  verifyIMEI(e) {
    this.setState({
      IMEIVerified: false,
      checkIMEIMessage: this.state.initialIMEIMessage
    });
    if (e.target.value.length === 15 || e.target.value.length === 16) {
      this.setState({ enableVerifyButton: true, IMEINumber: e.target.value });
    } else {
      this.setState({ enableVerifyButton: false, IMEINumber: "" });
    }
  }
  async checkIMEI() {
    // IMEINumber,exchangeProductId,exchangeAmountCashify,tulBump,pickUpCharge,listingId,ussId
    // call check IMEI API
    let IMEINumber = this.state.IMEINumber;
    let exchangeProductId =
      this.state.firstDeviceInfo &&
      this.state.firstDeviceInfo.model.exchangeProductId;
    let exchangeAmountCashify =
      this.state.firstDeviceInfo &&
      this.state.firstDeviceInfo.model.exchangeAmountCashify.value;
    let tulBump =
      this.state.firstDeviceInfo &&
      this.state.firstDeviceInfo.tulBump.doubleValue;
    let pickUpCharge =
      this.state.firstDeviceInfo &&
      this.state.firstDeviceInfo.pickupCharge.value;
    let listingId = this.props.listingId;
    let ussId = this.props.ussId;
    let data = await this.props.verifyIMEINumber(
      IMEINumber,
      exchangeProductId,
      exchangeAmountCashify,
      tulBump,
      pickUpCharge,
      listingId,
      ussId
    );
    if (data.isIMEIVerified) {
      this.setState({
        checkIMEIMessage: this.state.IMEISuccessMessage,
        IMEIVerified: true
      });
    } else {
      this.setState({ checkIMEIMessage: this.state.IMEIFailureMessage });
    }
  }
  agreedTnC(e) {
    if (e.target.checked) {
      this.setState({ agreedTnC: true });
    } else {
      this.setState({ agreedTnC: false });
    }
  }
  saveExchangeDetails(IMEINumber) {
    let FDData = JSON.parse(localStorage.getItem("MEFirstDeviceData"));
    Object.assign(FDData, {
      IMEINo: IMEINumber
    });
    localStorage.setItem("MEFirstDeviceData", JSON.stringify(FDData));
    this.handleClose();
  }
  switchTabs(deviceNo) {
    if (deviceNo === 2) {
      this.setState({ activateSecondTab: true });
    } else {
      this.setState({ activateSecondTab: false });
    }
  }
  render() {
    let firstDeviceInfo = localStorage.getItem("MEFirstDeviceData");
    if (firstDeviceInfo) {
      firstDeviceInfo = JSON.parse(firstDeviceInfo);
    }
    let secondDeviceInfo = localStorage.getItem("MESecondDeviceData");
    if (secondDeviceInfo) {
      secondDeviceInfo = JSON.parse(secondDeviceInfo);
    }
    return (
      <div className={styles.base}>
        <img
          src={closeIcon}
          alt="closeIcon"
          className={styles.closeIcon}
          onClick={() => this.handleClose()}
        />
        {/* modal for how exchange works */}
        {this.state.showHowExchangeWorks ? (
          <HowExchangeModalWorks
            closeHowExchangeWorksModal={() => this.closeHowExchangeWorksModal()}
          />
        ) : null}
        {/* Modal for terms and condiions */}
        {this.state.showTnCModal ? (
          <ExchangeTnCModal closeTnCModal={() => this.closeTnCModal()} />
        ) : null}
        {/* Modal for Cashback details */}
        {this.state.showCashbackModal ? (
          <ExchangeCashbackModal
            closeCashbackModal={() => this.closeCashbackModal()}
            openTnCModal={() => this.openTnCModal()}
          />
        ) : null}
        {/* all modals ends here */}
        <div className={styles.content}>
          <div className={styles.heading}>Exchange Details</div>
          <div
            className={styles.exchangeInfoLinks}
            onClick={() => this.openHowExchangeWorksModal()}
          >
            How Exchange works?
          </div>
        </div>
        {!this.state.isExchangeDeviceAdded ? (
          <div className={styles.firstScreen}>
            <div className={styles.evaluateContainer}>
              <SelectDevice
                heading="Select Device to Evaluate"
                makeModelDetails={this.state.makeModelDetails}
                isEnableForBrand={this.state.isEnableForBrand}
                onChange={val => this.onChange(val)}
                currentModelList={this.state.currentModelList}
                isEnableForModel={this.state.isEnableForModel}
                onChangeSecondary={val => this.onChangeSecondary(val)}
                saveDeviceDetails={() => this.saveDeviceDetails()}
              />
            </div>
            <div className={styles.smallHeading}>
              How Exchange works?
              <span
                className={styles.knowMore}
                onClick={() => this.openHowExchangeWorksModal()}
              >
                Know more
              </span>
            </div>
            <div>
              <img src={hew1} alt="" className={styles.iconSize} />
              <div className={styles.contentContainer}>
                <div className={styles.contentHeading}>
                  1. Share your old product details!{" "}
                </div>
                <div className={styles.contentDescription}>
                  Either allow access to auto-detect or enter the product
                  details manually
                </div>
              </div>
              <img src={hew2} alt="" className={styles.iconSize} />
              <div className={styles.contentContainer}>
                <div className={styles.contentHeading}>
                  2. Check Exchange Cashback value{" "}
                </div>
                <div className={styles.contentDescription}>
                  Based on the old product details shared, check the cashback
                  applicable
                </div>
              </div>
              <img src={hew3} alt="" className={styles.iconSize} />
              <div className={styles.contentContainer}>
                <div className={styles.contentHeading}>
                  3. Place order with Exchange{" "}
                </div>
                <div className={styles.contentDescription}>
                  Complete your product purchase along with exchange
                </div>
              </div>
              <img src={hew4} alt="" className={styles.iconSize} />
              <div className={styles.contentContainer}>
                <div className={styles.contentHeading}>
                  4. Lastly, select the Cashback mode{" "}
                </div>
                <div className={styles.contentDescription}>
                  Choose your preferred option to process Exchange Cashback for
                  your old product
                </div>
              </div>
              <img src={hew5} alt="" className={styles.iconSize} />
              <div className={styles.contentContainer}>
                <div className={styles.contentHeading}>
                  5. Cashback credited{" "}
                </div>
                <div className={styles.contentDescription}>
                  Cashback would be credited post-delivery of your new product
                  and pickup of old product
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.secondScreen}>
            <div className={styles.sliderContainer}>
              <div
                className={
                  this.state.activateSecondTab
                    ? styles.tabSliderTwo
                    : styles.tabSlider
                }
              >
                {!this.state.activateSecondTab ? (
                  <React.Fragment>
                    <div className={styles.cashbackHeading}>
                      <input
                        type="radio"
                        className={styles.tabOneRadio}
                        // defaultChecked={this.state.isFirstDeviceSelected}
                        defaultChecked={firstDeviceInfo}
                      />
                      <span className={styles.textCaps}>
                        {firstDeviceInfo &&
                          firstDeviceInfo.model.effectiveModelName}
                      </span>
                    </div>
                    <table
                      border="0"
                      cellPadding="10"
                      cellSpacing="0"
                      className={styles.exchangeOfferTable}
                    >
                      <tbody>
                        <tr>
                          <td className={styles.fontSize12}>
                            <img
                              src={baseValueIcon}
                              alt="Base value"
                              className={styles.icons}
                            />
                            Base value
                          </td>
                          <td className={styles.fontSize12}>
                            {firstDeviceInfo &&
                              firstDeviceInfo.model.exchangeAmountCashify
                                .formattedValueNoDecimal}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src={cliqBonusIcon}
                              alt="CLiQ Bonus"
                              className={styles.icons}
                            />
                            CLiQ Bonus
                          </td>
                          <td>
                            {firstDeviceInfo &&
                              firstDeviceInfo.tulBump.formattedValueNoDecimal}
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.fontSize12}>
                            <img
                              src={pickUpChargeIcon}
                              alt="Pick up charge"
                              className={styles.icons}
                            />
                            Pick up charge
                          </td>
                          <td className={styles.freePickUp}>
                            {firstDeviceInfo &&
                            firstDeviceInfo.pickupCharge.value === 0
                              ? "FREE"
                              : firstDeviceInfo.pickupCharge
                                  .formattedValueNoDecimal}
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.cashbackHeading}>
                            Total Exchange Cashback
                          </td>
                          <td className={styles.cashbackHeading}>
                            {firstDeviceInfo &&
                              firstDeviceInfo.model.totalExchangeCashback
                                .formattedValueNoDecimal}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className={styles.cashbackSubtitle}>
                            <span className={styles.cashbackInfoSubtitle}>
                              Cashback will be credited to your account.
                            </span>
                            <img
                              src={cashbackIcon}
                              alt="info"
                              className={styles.cashbackInfoIcon}
                              onClick={() => this.openCashbackModal()}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </React.Fragment>
                ) : (
                  <div
                    className={styles.firstDeviceName}
                    onClick={() => this.switchTabs(1)}
                  >
                    {firstDeviceInfo &&
                      firstDeviceInfo.model.effectiveModelName}
                  </div>
                )}
              </div>
              <div
                className={
                  this.state.activateSecondTab
                    ? styles.tabSliderTwo
                    : styles.tabSlider
                }
              >
                {!this.state.activateSecondTab ? (
                  <div
                    className={styles.addDevice}
                    onClick={() => this.switchTabs(2)}
                  >
                    <span className={styles.plusSign} />
                    Another Mobile to Evaluate
                  </div>
                ) : (
                  <div className={styles.evaluateContainerTwo}>
                    <SelectDevice
                      heading="Select Device to Evaluate"
                      makeModelDetails={this.state.makeModelDetails}
                      isEnableForBrand={this.state.isEnableForBrand}
                      onChange={val => this.onChange(val)}
                      currentModelList={this.state.currentModelList}
                      isEnableForModel={this.state.isEnableForModel}
                      onChangeSecondary={val => this.onChangeSecondary(val)}
                      saveDeviceDetails={() => this.saveDeviceDetails()}
                    />
                  </div>
                )}
              </div>
            </div>
            {!this.state.activateSecondTab ? (
              <React.Fragment>
                <div className={styles.imeiCheckForm}>
                  <input
                    type="text"
                    placeholder="Enter IMEI Number"
                    className={styles.imeiInput}
                    onChange={e => this.verifyIMEI(e)}
                  />
                  <div
                    className={
                      this.state.enableVerifyButton
                        ? styles.enableVerifyButton
                        : styles.disableVerifyButton
                    }
                    onClick={() => this.checkIMEI()}
                  >
                    {this.state.IMEIVerified ? (
                      <span className={styles.verifySuccessButton}>
                        <img
                          src={check}
                          alt="check"
                          className={styles.checkIcon}
                        />{" "}
                        Verified
                      </span>
                    ) : (
                      "Verify"
                    )}
                  </div>
                  <div
                    className={styles.imeiInputInfo}
                    dangerouslySetInnerHTML={{
                      __html: this.state.checkIMEIMessage
                    }}
                  />
                </div>
                <div className={styles.effectivePrice}>
                  <table cellPadding="0" cellSpacing="0" width="100%">
                    <tbody>
                      <tr>
                        <td className={styles.effectivePriceTrOne}>
                          Effective Price after exchange
                        </td>
                        <td className={styles.effectivePriceTrTwo}>
                          {firstDeviceInfo &&
                            firstDeviceInfo.model.effectiveAmount
                              .formattedValueNoDecimal}
                        </td>
                      </tr>
                      <tr>
                        <td>for {this.props.productName}</td>
                        <td />
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={styles.tncContainer}>
                  <input
                    type="checkbox"
                    className={styles.tncCheckbox}
                    onChange={this.agreedTnC}
                  />
                  <div className={styles.tnc}>
                    I understand the{" "}
                    <span
                      className={styles.tncText}
                      onClick={() => this.openTnCModal()}
                    >
                      Terms & Conditions
                    </span>{" "}
                    of exchange.
                  </div>
                </div>
                <div className={styles.exchangeButtonContainer}>
                  {this.state.IMEIVerified && this.state.agreedTnC ? (
                    <div
                      className={styles.exchangeButtonEnabled}
                      onClick={() =>
                        this.saveExchangeDetails(this.state.IMEINumber)
                      }
                    >
                      Proceed with exchange
                    </div>
                  ) : (
                    <div className={styles.exchangeButton}>
                      Proceed with exchange
                    </div>
                  )}
                </div>
              </React.Fragment>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}
