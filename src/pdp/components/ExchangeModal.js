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
      // isFirstDeviceSelected: false,
      // isSecondDeviceSelected: false,
      enableVerifyButtonFirstDevice: false,
      enableVerifyButtonSecondDevice: false,
      initialIMEIMessage:
        "Dial <span style='font-family:regular;'>*#06#</span> from your old device to know your IMEI number",
      checkIMEIMessageFirstDevice:
        "Dial <span style='font-family:regular;'>*#06#</span> from your old device to know your IMEI number",
      checkIMEIMessageSecondDevice:
        "Dial <span style='font-family:regular;'>*#06#</span> from your old device to know your IMEI number",
      IMEISuccessMessage:
        "<span style='color:#67b70b;'>IMEI number will be matched against your mobile at pick-up</span>",
      IMEIFailureMessage:
        "<span style='color:#c47403;'>We are having problem detecting your phone’s IMEI number. Please enter valid IMEI no.</span>",
      IMEIVerifiedFirstDevice: false,
      IMEIVerifiedSecondDevice: false,
      IMEINumberFirstDevice: "",
      IMEINumberSecondDevice: "",
      agreedTnCFirstDevice: false,
      agreedTnCSecondDevice: false,
      activateSecondTab: false,
      currentIMEIFirstDevice: "",
      currentIMEISecondDevice: ""
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
      this.setState({ firstDeviceInfo: firstDeviceData });
    }
    let secondDeviceData = JSON.parse(
      localStorage.getItem("MESecondDeviceData")
    );
    if (secondDeviceData) {
      this.setState({ secondDeviceInfo: secondDeviceData });
    }
    if (firstDeviceData || secondDeviceData) {
      this.setState({ isExchangeDeviceAdded: true });
    }
    //show first device selected if second device not added
    // if (firstDeviceData && !localStorage.getItem("MESecondDeviceData")) {
    //   this.setState({ isFirstDeviceSelected: true });
    //   localStorage.setItem("currentSelectedDevice", "MEFirstDeviceData");
    // }
    //keep selected tab active - even if modal closed
    let currentSelectedDevice = localStorage.getItem("currentSelectedDevice");
    if (currentSelectedDevice === "2") {
      this.setState({ activateSecondTab: true });
    } else {
      this.setState({ activateSecondTab: false });
    }
  }

  handleClose() {
    if (this.props.closeModal) {
      this.props.closeModal();
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
    this.setState({
      isEnableForModel: true,
      selectedModel: JSON.parse(val.modelList)
    });
  }

  saveDeviceDetails() {
    let MDEFirstDevice = localStorage.getItem("MEFirstDeviceData");
    let MDESecondDevice = localStorage.getItem("MESecondDeviceData");
    if (!MDEFirstDevice && !MDESecondDevice) {
      //no device added
      let firstDeviceData = {
        exchangeBrandId: this.state.exchangeBrandId,
        exchangeBrandName: this.state.exchangeBrandName,
        model: this.state.selectedModel,
        pickupCharge: this.props.exchangeDetails.pickupCharge,
        tulBump: this.props.exchangeDetails.TULBump
      };
      localStorage.setItem(
        "MEFirstDeviceData",
        JSON.stringify(firstDeviceData)
      );
      //update product details state
      if (this.state.selectedModel) {
        this.props.updateProductState({
          selectedProductCashback: this.state.selectedModel
            .totalExchangeCashback,
          selectedProductName: this.state.selectedModel.effectiveModelName
        });
        localStorage.setItem(
          "selectedProductCashback",
          JSON.stringify(this.state.selectedModel.totalExchangeCashback)
        );
        localStorage.setItem(
          "selectedProductName",
          this.state.selectedModel.effectiveModelName
        );
      }
    } else {
      //one device added previously
      let secondDeviceData = {
        exchangeBrandId: this.state.exchangeBrandId,
        exchangeBrandName: this.state.exchangeBrandName,
        model: this.state.selectedModel,
        pickupCharge: this.props.exchangeDetails.pickupCharge,
        tulBump: this.props.exchangeDetails.TULBump
      };
      localStorage.setItem(
        "MESecondDeviceData",
        JSON.stringify(secondDeviceData)
      );
      //update product details state
      if (this.state.selectedModel) {
        this.props.updateProductState({
          selectedProductCashback: this.state.selectedModel
            .totalExchangeCashback,
          selectedProductName: this.state.selectedModel.effectiveModelName
        });
        localStorage.setItem(
          "selectedProductCashback",
          JSON.stringify(this.state.selectedModel.totalExchangeCashback)
        );
        localStorage.setItem(
          "selectedProductName",
          this.state.selectedModel.effectiveModelName
        );
      }
    }
    this.setState({ isExchangeDeviceAdded: true });
  }

  verifyIMEI(e, deviceNo) {
    this.setState({
      IMEIVerifiedFirstDevice: false,
      IMEIVerifiedSecondDevice: false,
      checkIMEIMessageFirstDevice: this.state.initialIMEIMessage,
      checkIMEIMessageSecondDevice: this.state.initialIMEIMessage
    });
    if (e.target.value.length === 15 || e.target.value.length === 16) {
      if (deviceNo === 1) {
        this.setState({
          enableVerifyButtonFirstDevice: true,
          IMEINumberFirstDevice: e.target.value
        });
      } else {
        this.setState({
          enableVerifyButtonSecondDevice: true,
          IMEINumberSecondDevice: e.target.value
        });
      }
    } else {
      if (deviceNo === 1) {
        this.setState({
          enableVerifyButtonFirstDevice: false,
          IMEINumberFirstDevice: ""
        });
      } else {
        this.setState({
          enableVerifyButtonSecondDevice: false,
          IMEINumberSecondDevice: ""
        });
      }
    }
    if (deviceNo === 1) {
      this.setState({ currentIMEIFirstDevice: e.target.value });
    } else {
      this.setState({ currentIMEISecondDevice: e.target.value });
    }
  }

  async checkIMEI(deviceNo) {
    // IMEINumber,exchangeProductId,exchangeAmountCashify,tulBump,pickUpCharge,listingId,ussId
    // call check IMEI API
    let IMEINumber = this.state.IMEINumberFirstDevice;
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

    if (deviceNo === 2) {
      IMEINumber = this.state.IMEINumberSecondDevice;
      exchangeProductId =
        this.state.secondDeviceInfo &&
        this.state.secondDeviceInfo.model.exchangeProductId;
      exchangeAmountCashify =
        this.state.secondDeviceInfo &&
        this.state.secondDeviceInfo.model.exchangeAmountCashify.value;
      tulBump =
        this.state.secondDeviceInfo &&
        this.state.secondDeviceInfo.tulBump.doubleValue;
      pickUpCharge =
        this.state.secondDeviceInfo &&
        this.state.secondDeviceInfo.pickupCharge.value;
    }

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
      if (deviceNo === 1) {
        this.setState({
          checkIMEIMessageFirstDevice: this.state.IMEISuccessMessage,
          IMEIVerifiedFirstDevice: true
        });
      } else {
        this.setState({
          checkIMEIMessageSecondDevice: this.state.IMEISuccessMessage,
          IMEIVerifiedSecondDevice: true
        });
      }
    } else {
      if (deviceNo === 1) {
        this.setState({
          checkIMEIMessageFirstDevice: this.state.IMEIFailureMessage
        });
      } else {
        this.setState({
          checkIMEIMessageSecondDevice: this.state.IMEIFailureMessage
        });
      }
    }
  }

  agreedTnC(e, deviceNo) {
    if (e.target.checked) {
      if (deviceNo === 1) {
        this.setState({ agreedTnCFirstDevice: true });
      } else {
        this.setState({ agreedTnCSecondDevice: true });
      }
    } else {
      if (deviceNo === 1) {
        this.setState({ agreedTnCFirstDevice: false });
      } else {
        this.setState({ agreedTnCSecondDevice: false });
      }
    }
  }

  saveExchangeDetails(IMEINumber, deviceNo) {
    if (deviceNo === 1) {
      //update first device details with imei
      let FDData = JSON.parse(localStorage.getItem("MEFirstDeviceData"));
      Object.assign(FDData, {
        IMEINo: IMEINumber
      });
      localStorage.setItem("MEFirstDeviceData", JSON.stringify(FDData));
    } else {
      //update second device details with imei
      let SDData = JSON.parse(localStorage.getItem("MESecondDeviceData"));
      Object.assign(SDData, {
        IMEINo: IMEINumber
      });
      localStorage.setItem("MESecondDeviceData", JSON.stringify(SDData));
    }
    this.handleClose();
  }

  switchTabs(deviceNo, deviceInfo) {
    //switch tabs
    if (deviceNo === 2) {
      this.setState({ activateSecondTab: true });
      //set storage for currently selected device
      localStorage.setItem("currentSelectedDevice", 2);
    } else {
      this.setState({ activateSecondTab: false });
      //set storage for currently selected device
      localStorage.setItem("currentSelectedDevice", 1);
    }
    //and update data
    this.props.updateProductState({
      selectedProductCashback: deviceInfo.model.totalExchangeCashback,
      selectedProductName: deviceInfo.model.effectiveModelName
    });
    localStorage.setItem(
      "selectedProductCashback",
      JSON.stringify(deviceInfo.model.totalExchangeCashback)
    );
    localStorage.setItem(
      "selectedProductName",
      deviceInfo.model.effectiveModelName
    );
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
                    onClick={() => this.switchTabs(1, firstDeviceInfo)}
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
                    onClick={() => this.switchTabs(2, secondDeviceInfo)}
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
                verifyIMEI={(e, deviceNo) => this.verifyIMEI(e, 1)}
                enableVerifyButton={this.state.enableVerifyButtonFirstDevice}
                checkIMEI={deviceNo => this.checkIMEI(1)}
                IMEIVerified={this.state.IMEIVerifiedFirstDevice}
                checkIMEIMessage={this.state.checkIMEIMessageFirstDevice}
                deviceInfo={firstDeviceInfo}
                productName={this.props.productName}
                agreedTnC={(e, deviceNo) => this.agreedTnC(e, 1)}
                openTnCModal={() => this.openTnCModal()}
                agreedTnCState={this.state.agreedTnCFirstDevice}
                currentIMEI={this.state.currentIMEIFirstDevice}
                IMEINumber={this.state.IMEINumberFirstDevice}
                saveExchangeDetails={(IMEINumber, deviceNo) =>
                  this.saveExchangeDetails(IMEINumber, 1)
                }
              />
            ) : (
              <ExchangeModalOtherDetails
                verifyIMEI={(e, deviceNo) => this.verifyIMEI(e, 2)}
                enableVerifyButton={this.state.enableVerifyButtonSecondDevice}
                checkIMEI={deviceNo => this.checkIMEI(2)}
                IMEIVerified={this.state.IMEIVerifiedSecondDevice}
                checkIMEIMessage={this.state.checkIMEIMessageSecondDevice}
                deviceInfo={secondDeviceInfo}
                productName={this.props.productName}
                agreedTnC={(e, deviceNo) => this.agreedTnC(e, 2)}
                openTnCModal={() => this.openTnCModal()}
                agreedTnCState={this.state.agreedTnCSecondDevice}
                currentIMEI={this.state.currentIMEISecondDevice}
                IMEINumber={this.state.IMEINumberSecondDevice}
                saveExchangeDetails={(IMEINumber, deviceNo) =>
                  this.saveExchangeDetails(IMEINumber, 2)
                }
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
