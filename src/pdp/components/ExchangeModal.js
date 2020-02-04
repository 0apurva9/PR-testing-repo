import React from "react";
import styles from "./ExchangeModal.css";
import closeIcon from "../../general/components/img/closeIcon.svg";
import HowExchangeModalWorks from "./HowExchangeModalWorks";
import ExchangeTnCModal from "./ExchangeTnCModal";
import ExchangeCashbackModal from "./ExchangeCashbackModal";
import SelectDevice from "./SelectDevice";
import ExchangeModalOtherDetails from "./ExchangeModalOtherDetails";
import HowExchangeModalWorksLessDetails from "./HowExchangeModalWorksLessDetails";
import ExchangeProductDetailsTab from "./ExchangeProductDetailsTab";
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
            <HowExchangeModalWorksLessDetails />
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
                  <ExchangeProductDetailsTab
                    deviceInfo={firstDeviceInfo}
                    openCashbackModal={() => this.openCashbackModal()}
                  />
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
                    {secondDeviceInfo ? (
                      <div className={styles.secondDeviceName}>
                        {secondDeviceInfo &&
                          secondDeviceInfo.model.effectiveModelName}
                      </div>
                    ) : (
                      <React.Fragment>
                        <span className={styles.plusSign} />
                        Another Mobile to Evaluate
                      </React.Fragment>
                    )}
                  </div>
                ) : (
                  <React.Fragment>
                    {secondDeviceInfo ? (
                      <ExchangeProductDetailsTab
                        deviceInfo={secondDeviceInfo}
                        openCashbackModal={() => this.openCashbackModal()}
                      />
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
                  </React.Fragment>
                )}
              </div>
            </div>
            {!this.state.activateSecondTab ? (
              <ExchangeModalOtherDetails
                verifyIMEI={e => this.verifyIMEI(e)}
                enableVerifyButton={this.state.enableVerifyButton}
                checkIMEI={() => this.checkIMEI()}
                IMEIVerified={this.state.IMEIVerified}
                checkIMEIMessage={this.state.checkIMEIMessage}
                deviceInfo={firstDeviceInfo}
                productName={this.props.productName}
                agreedTnC={e => this.agreedTnC(e)}
                openTnCModal={() => this.openTnCModal()}
                agreedTnCState={this.state.agreedTnC}
                IMEINumber={this.state.IMEINumber}
                saveExchangeDetails={IMEINumber =>
                  this.saveExchangeDetails(IMEINumber)
                }
              />
            ) : (
              <ExchangeModalOtherDetails
                verifyIMEI={e => this.verifyIMEI(e)}
                enableVerifyButton={this.state.enableVerifyButton}
                checkIMEI={() => this.checkIMEI()}
                IMEIVerified={this.state.IMEIVerified}
                checkIMEIMessage={this.state.checkIMEIMessage}
                deviceInfo={secondDeviceInfo}
                productName={this.props.productName}
                agreedTnC={e => this.agreedTnC(e)}
                openTnCModal={() => this.openTnCModal()}
                agreedTnCState={this.state.agreedTnC}
                IMEINumber={this.state.IMEINumber}
                saveExchangeDetails={IMEINumber =>
                  this.saveExchangeDetails(IMEINumber)
                }
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
