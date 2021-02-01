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
import { ADD_TO_BAG_TEXT, PRODUCT_CART_ROUTER } from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_MDE_CLICK_ON_CHANGE_DEVICE,
  ADOBE_MDE_CLICK_ON_HOW_EXCHANGE_WORKS,
  ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_KNOW_MORE,
  ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_TNC,
  ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_ADD_ANOTHER_DEVICE,
  ADOBE_MDE_CLICK_ON_PROCEED_WITH_EXCHANGE,
  ADOBE_MDE_CLICK_ON_CASHBACK_DETAILS,
  ADOBE_MDE_CLICK_ON_VERIFY_IMEI
} from "../../lib/adobeUtils";
import PropTypes from "prop-types";
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
      currentIMEISecondDevice: "",
      changeDeviceNumber: "",
      verifyIMEINumberAPIResponse: ""
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
    if (this.state.firstDeviceInfo || this.state.secondDeviceInfo) {
      this.setState({ isExchangeDeviceAdded: true });
    }
  }

  componentWillUnmount() {
    // as the modal closed , remove the values to update UI in PDP
    this.props.updateProductState({
      selectedProductCashback: null,
      selectedProductName: null
    });
  }

  handleClose() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }

  openHowExchangeWorksModal() {
    this.setState({ showHowExchangeWorks: true });
    setDataLayer(ADOBE_MDE_CLICK_ON_HOW_EXCHANGE_WORKS);
  }

  knowMore() {
    this.setState({ showHowExchangeWorks: true });
    setDataLayer(ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_KNOW_MORE);
  }

  closeHowExchangeWorksModal() {
    this.setState({ showHowExchangeWorks: false });
    if (this.state.howExchangeWorksModalOpenedFromPDP) {
      this.handleClose();
    }
  }

  openTnCModal() {
    this.setState({ showTnCModal: true });
    setDataLayer(ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_TNC);
  }

  closeTnCModal() {
    this.setState({ showTnCModal: false });
  }

  openCashbackModal() {
    this.setState({ showCashbackModal: true });
    setDataLayer(ADOBE_MDE_CLICK_ON_CASHBACK_DETAILS);
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
  }

  onChangeSecondary(val) {
    this.setState({
      isEnableForModel: true,
      selectedModel: JSON.parse(val.modelList)
    });
  }

  saveDeviceDetails(deviceNo) {
    if (deviceNo === 1) {
      //no device added - add first device OR change first device
      let firstDeviceData = {
        exchangeBrandId: this.state.exchangeBrandId,
        exchangeBrandName: this.state.exchangeBrandName,
        model: this.state.selectedModel,
        pickupCharge: this.props.exchangeDetails.pickupCharge,
        tulBump: this.props.exchangeDetails.TULBump
      };
      this.setState({ firstDeviceInfo: firstDeviceData });
      //update product details state
      if (this.state.selectedModel) {
        this.props.updateProductState({
          selectedProductCashback: this.state.selectedModel
            .totalExchangeCashback,
          selectedProductName: this.state.selectedModel.effectiveModelName
        });
      }
    } else {
      //one device added previously - add second device OR change second device
      let secondDeviceData = {
        exchangeBrandId: this.state.exchangeBrandId,
        exchangeBrandName: this.state.exchangeBrandName,
        model: this.state.selectedModel,
        pickupCharge: this.props.exchangeDetails.pickupCharge,
        tulBump: this.props.exchangeDetails.TULBump
      };
      this.setState({ secondDeviceInfo: secondDeviceData });
      //update product details state
      if (this.state.selectedModel) {
        this.props.updateProductState({
          selectedProductCashback: this.state.selectedModel
            .totalExchangeCashback,
          selectedProductName: this.state.selectedModel.effectiveModelName
        });
      }
    }
    this.setState({ isExchangeDeviceAdded: true });
  }

  verifyIMEI(e, deviceNo) {
    //on change keep imei verified false
    if (deviceNo === 1) {
      this.setState({
        IMEIVerifiedFirstDevice: false,
        checkIMEIMessageFirstDevice: this.state.initialIMEIMessage
      });
    }
    if (deviceNo === 2) {
      this.setState({
        IMEIVerifiedSecondDevice: false,
        checkIMEIMessageSecondDevice: this.state.initialIMEIMessage
      });
    }

    if (e.target.value.length >= 13 && e.target.value.length <= 16) {
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
    // call check IMEI API
    let IMEINumber = this.state.IMEINumberFirstDevice;
    let exchangeProductId =
      this.state.firstDeviceInfo &&
      this.state.firstDeviceInfo.model &&
      this.state.firstDeviceInfo.model.exchangeProductId;
    let exchangeAmountCashify =
      this.state.firstDeviceInfo &&
      this.state.firstDeviceInfo.model &&
      this.state.firstDeviceInfo.model.exchangeAmountCashify &&
      this.state.firstDeviceInfo.model.exchangeAmountCashify.value;
    let tulBump =
      this.state.firstDeviceInfo &&
      this.state.firstDeviceInfo.tulBump &&
      this.state.firstDeviceInfo.tulBump.doubleValue;
    let pickUpCharge =
      this.state.firstDeviceInfo &&
      this.state.firstDeviceInfo.pickupCharge &&
      this.state.firstDeviceInfo.pickupCharge.value;

    if (deviceNo === 2) {
      IMEINumber = this.state.IMEINumberSecondDevice;
      exchangeProductId =
        this.state.secondDeviceInfo &&
        this.state.secondDeviceInfo.model &&
        this.state.secondDeviceInfo.model.exchangeProductId;
      exchangeAmountCashify =
        this.state.secondDeviceInfo &&
        this.state.secondDeviceInfo.model &&
        this.state.secondDeviceInfo.model.exchangeAmountCashify &&
        this.state.secondDeviceInfo.model.exchangeAmountCashify.value;
      tulBump =
        this.state.secondDeviceInfo &&
        this.state.secondDeviceInfo.tulBump &&
        this.state.secondDeviceInfo.tulBump.doubleValue;
      pickUpCharge =
        this.state.secondDeviceInfo &&
        this.state.secondDeviceInfo.pickupCharge &&
        this.state.secondDeviceInfo.pickupCharge.value;
    }

    // check for same device details - remove one device if both have same details
    if (this.state.firstDeviceInfo && this.state.secondDeviceInfo) {
      if (
        this.state.firstDeviceInfo.exchangeBrandId ===
          this.state.secondDeviceInfo.exchangeBrandId &&
        this.state.firstDeviceInfo.model.exchangeProductId ===
          this.state.secondDeviceInfo.model.exchangeProductId &&
        this.state.IMEINumberFirstDevice === this.state.IMEINumberSecondDevice
      ) {
        if (deviceNo === 1) {
          this.changeDevice(2);
        }
        if (deviceNo === 2) {
          this.changeDevice(1);
        }
      }
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
    if (
      data.status &&
      data.status.toLowerCase() === "success" &&
      data.isIMEIVerified
    ) {
      let deviceDetails = {
        exchangeBrandId: data.exchangeBrandId,
        exchangeBrandName: data.exchangeBrandName
      };
      let modelDetails = {
        detailCheckNotAllowed: data.detailCheckNotAllowed,
        effectiveAmount: data.effectiveAmount,
        effectiveModelName: data.effectiveModelName,
        exchangeAmountCashify: data.exchangeAmountCashify,
        exchangeModelName: data.exchangeModelName,
        exchangeProductId: data.exchangeProductId,
        isIMEIVerified: data.isIMEIVerified,
        isPickupAvailableForExchange: data.isPickupAvailableForExchange,
        quoteExpired: data.quoteExpired,
        totalExchangeCashback: data.totalExchangeCashback
      };
      deviceDetails.model = modelDetails;
      if (data.pickupCharge) {
        deviceDetails.pickupCharge = data.pickupCharge;
      }
      if (data.TULBump) {
        deviceDetails.tulBump = data.TULBump;
      }

      if (deviceNo === 1) {
        this.setState({
          checkIMEIMessageFirstDevice: this.state.IMEISuccessMessage,
          IMEIVerifiedFirstDevice: true,
          firstDeviceInfo: deviceDetails
        });
      } else {
        this.setState({
          checkIMEIMessageSecondDevice: this.state.IMEISuccessMessage,
          IMEIVerifiedSecondDevice: true,
          secondDeviceInfo: deviceDetails
        });
      }
      // this state is used in add to cart api call
      this.setState({ verifyIMEINumberAPIResponse: data });
    }
    if (
      data.status &&
      data.status.toLowerCase() === "failure" &&
      !data.isIMEIVerified
    ) {
      if (deviceNo === 1) {
        this.setState({
          checkIMEIMessageFirstDevice: data.error
            ? `<span style='color:#c47403;'>${data.error}</span>`
            : this.state.IMEIFailureMessage
        });
      } else {
        this.setState({
          checkIMEIMessageSecondDevice: data.error
            ? `<span style='color:#c47403;'>${data.error}</span>`
            : this.state.IMEIFailureMessage
        });
      }
    }
    setDataLayer(ADOBE_MDE_CLICK_ON_VERIFY_IMEI, data.status);
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

  async saveExchangeDetails(IMEINumber, deviceNo) {
    if (deviceNo === 1) {
      //update first device details with imei
      let FDData = this.state.firstDeviceInfo;
      Object.assign(FDData, {
        IMEINo: IMEINumber
      });
      this.setState({ firstDeviceInfo: FDData });
    } else {
      //update second device details with imei
      let SDData = this.state.secondDeviceInfo;
      Object.assign(SDData, {
        IMEINo: IMEINumber
      });
      this.setState({ secondDeviceInfo: SDData });
    }
    setDataLayer(ADOBE_MDE_CLICK_ON_PROCEED_WITH_EXCHANGE);
    let listingId = this.props.listingId;
    let ussId = this.props.ussId;
    let data = {
      code: listingId,
      ussId: ussId,
      quantity: 1,
      isFromMobileExchange: true,
      verifyIMEINumberAPIResponse: this.state.verifyIMEINumberAPIResponse
    };
    let addProductToCartResponse = await this.props.addProductToCart(data);
    if (addProductToCartResponse.status === "success") {
      this.props.displayToast(ADD_TO_BAG_TEXT);
      this.props.history.push(PRODUCT_CART_ROUTER);
    }
  }

  switchTabs(deviceNo, deviceInfo) {
    //switch tabs
    if (deviceNo === 2) {
      this.setState({ activateSecondTab: true });
    } else {
      this.setState({ activateSecondTab: false });
    }
    //and update data
    if (deviceInfo) {
      this.props.updateProductState({
        selectedProductCashback: deviceInfo.model.totalExchangeCashback,
        selectedProductName: deviceInfo.model.effectiveModelName
      });
    } else {
      setDataLayer(ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_ADD_ANOTHER_DEVICE);
    }
  }

  changeDevice(deviceNo) {
    this.setState({ changeDeviceNumber: deviceNo });
    if (deviceNo === 2) {
      this.setState({
        secondDeviceInfo: "",
        enableVerifyButtonSecondDevice: false,
        IMEIVerifiedSecondDevice: false,
        checkIMEIMessageSecondDevice: this.state.initialIMEIMessage,
        agreedTnCSecondDevice: false,
        currentIMEISecondDevice: "",
        IMEINumberSecondDevice: ""
      });
      //to show remaining products name & cashback on pdp
      let deviceInfo = this.state.firstDeviceInfo;
      if (deviceInfo) {
        this.props.updateProductState({
          selectedProductCashback: deviceInfo.model.totalExchangeCashback,
          selectedProductName: deviceInfo.model.effectiveModelName
        });
      }
    } else {
      this.setState({
        firstDeviceInfo: "",
        enableVerifyButtonFirstDevice: false,
        IMEIVerifiedFirstDevice: false,
        checkIMEIMessageFirstDevice: this.state.initialIMEIMessage,
        agreedTnCFirstDevice: false,
        currentIMEIFirstDevice: "",
        IMEINumberFirstDevice: ""
      });
      //to show remaining products name & cashback on pdp
      let deviceInfo = this.state.secondDeviceInfo;
      if (deviceInfo) {
        this.props.updateProductState({
          selectedProductCashback: deviceInfo.model.totalExchangeCashback,
          selectedProductName: deviceInfo.model.effectiveModelName
        });
      }
    }
    setDataLayer(ADOBE_MDE_CLICK_ON_CHANGE_DEVICE);
  }

  trimProductname(productName) {
    if (productName.length > 15) {
      return productName.substring(0, 14) + "...";
    } else {
      return productName;
    }
  }

  render() {
    let firstDeviceInfo = "";
    if (this.state.firstDeviceInfo) {
      firstDeviceInfo = this.state.firstDeviceInfo;
    }
    let secondDeviceInfo = "";
    if (this.state.secondDeviceInfo) {
      secondDeviceInfo = this.state.secondDeviceInfo;
    }
    //to show change device link
    let bothDeviceAdded = false;
    if (firstDeviceInfo && secondDeviceInfo) {
      bothDeviceAdded = true;
    }
    //onclick change link - remove first device
    if (
      bothDeviceAdded &&
      this.state.changeDeviceNumber &&
      this.state.changeDeviceNumber === 1 &&
      !this.state.firstDeviceInfo
    ) {
      this.setState({ firstDeviceInfo: "" });
      firstDeviceInfo = "";
    }
    //onclick change link - remove second device
    if (
      bothDeviceAdded &&
      this.state.changeDeviceNumber &&
      this.state.changeDeviceNumber === 2 &&
      !this.state.secondDeviceInfo
    ) {
      this.setState({ secondDeviceInfo: "" });
      secondDeviceInfo = "";
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
          <ExchangeTnCModal
            history={this.props.history}
            closeTnCModal={() => this.closeTnCModal()}
          />
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
          {(this.state.firstDeviceInfo || this.state.secondDeviceInfo) && (
            <div
              className={styles.exchangeInfoLinks}
              onClick={() => this.openHowExchangeWorksModal()}
            >
              How Exchange works?
            </div>
          )}
        </div>
        {!this.state.isExchangeDeviceAdded ? (
          <div className={styles.firstScreen}>
            <div className={styles.evaluateContainer}>
              <SelectDevice
                heading="Please Select Brand and Model"
                makeModelDetails={this.state.makeModelDetails}
                isEnableForBrand={this.state.isEnableForBrand}
                onChange={val => this.onChange(val)}
                currentModelList={this.state.currentModelList}
                isEnableForModel={this.state.isEnableForModel}
                onChangeSecondary={val => this.onChangeSecondary(val)}
                saveDeviceDetails={() => this.saveDeviceDetails(1)}
              />
            </div>
            <div className={styles.smallHeading}>
              How Exchange works?
              <span className={styles.knowMore} onClick={() => this.knowMore()}>
                Know more
              </span>
            </div>
            <HowExchangeModalWorksLessDetails />
          </div>
        ) : (
          <div className={styles.secondScreen}>
            <div className={styles.sliderContainer}>
              {/* first device screen */}
              <div
                className={
                  this.state.activateSecondTab
                    ? styles.tabSliderTwo
                    : styles.tabSlider
                }
              >
                {!this.state.activateSecondTab ? (
                  <React.Fragment>
                    {firstDeviceInfo ? (
                      <ExchangeProductDetailsTab
                        deviceInfo={firstDeviceInfo}
                        openCashbackModal={() => this.openCashbackModal()}
                        bothDeviceAdded={bothDeviceAdded}
                        changeDevice={() => this.changeDevice(1)}
                      />
                    ) : (
                      <div className={styles.evaluateContainerTwo}>
                        <SelectDevice
                          heading="Please Select Brand and Model"
                          makeModelDetails={this.state.makeModelDetails}
                          isEnableForBrand={this.state.isEnableForBrand}
                          onChange={val => this.onChange(val)}
                          currentModelList={this.state.currentModelList}
                          isEnableForModel={this.state.isEnableForModel}
                          onChangeSecondary={val => this.onChangeSecondary(val)}
                          saveDeviceDetails={() =>
                            this.saveDeviceDetails(1)
                          }
                        />
                      </div>
                    )}
                  </React.Fragment>
                ) : (
                  <div
                    className={styles.addDevice}
                    onClick={() => this.switchTabs(1, firstDeviceInfo)}
                  >
                    {firstDeviceInfo ? (
                      <div className={styles.firstDeviceNameContainer}>
                        <span className={styles.firstDeviceName}>
                          {firstDeviceInfo &&
                            this.trimProductname(
                              firstDeviceInfo.model.exchangeModelName
                            )}
                        </span>
                        {" - "}
                        {firstDeviceInfo &&
                          firstDeviceInfo.model.totalExchangeCashback
                            .formattedValueNoDecimal}
                      </div>
                    ) : (
                      <React.Fragment>
                        Evaluate another Phone
                        <span className={styles.arrowRight} />
                      </React.Fragment>
                    )}
                  </div>
                )}
              </div>
              {/* second device screen */}
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
                      <div className={styles.secondDeviceNameContainer}>
                        <span className={styles.secondDeviceName}>
                          {secondDeviceInfo &&
                            this.trimProductname(
                              secondDeviceInfo.model.exchangeModelName
                            )}
                        </span>
                        {" - "}
                        {secondDeviceInfo &&
                          secondDeviceInfo.model.totalExchangeCashback
                            .formattedValueNoDecimal}
                      </div>
                    ) : (
                      <React.Fragment>
                        Evaluate another Phone
                        <span className={styles.arrowRight} />
                      </React.Fragment>
                    )}
                  </div>
                ) : (
                  <React.Fragment>
                    {secondDeviceInfo ? (
                      <ExchangeProductDetailsTab
                        deviceInfo={secondDeviceInfo}
                        openCashbackModal={() => this.openCashbackModal()}
                        bothDeviceAdded={bothDeviceAdded}
                        changeDevice={() => this.changeDevice(2)}
                      />
                    ) : (
                      <div className={styles.evaluateContainerTwo}>
                        <SelectDevice
                          heading="Please Select Brand and Model"
                          makeModelDetails={this.state.makeModelDetails}
                          isEnableForBrand={this.state.isEnableForBrand}
                          onChange={val => this.onChange(val)}
                          currentModelList={this.state.currentModelList}
                          isEnableForModel={this.state.isEnableForModel}
                          onChangeSecondary={val => this.onChangeSecondary(val)}
                          saveDeviceDetails={() =>
                            this.saveDeviceDetails(2)
                          }
                        />
                      </div>
                    )}
                  </React.Fragment>
                )}
              </div>
            </div>
            {!this.state.activateSecondTab
              ? this.state.firstDeviceInfo && (
                  <ExchangeModalOtherDetails
                    verifyIMEI={(e) => this.verifyIMEI(e, 1)}
                    enableVerifyButton={
                      this.state.enableVerifyButtonFirstDevice
                    }
                    checkIMEI={() => this.checkIMEI(1)}
                    IMEIVerified={this.state.IMEIVerifiedFirstDevice}
                    checkIMEIMessage={this.state.checkIMEIMessageFirstDevice}
                    deviceInfo={firstDeviceInfo}
                    productName={this.props.productName}
                    agreedTnC={(e) => this.agreedTnC(e, 1)}
                    openTnCModal={() => this.openTnCModal()}
                    agreedTnCState={this.state.agreedTnCFirstDevice}
                    currentIMEI={this.state.currentIMEIFirstDevice}
                    IMEINumber={this.state.IMEINumberFirstDevice}
                    saveExchangeDetails={(IMEINumber) =>
                      this.saveExchangeDetails(IMEINumber, 1)
                    }
                  />
                )
              : this.state.secondDeviceInfo && (
                  <ExchangeModalOtherDetails
                    verifyIMEI={(e) => this.verifyIMEI(e, 2)}
                    enableVerifyButton={
                      this.state.enableVerifyButtonSecondDevice
                    }
                    checkIMEI={() => this.checkIMEI(2)}
                    IMEIVerified={this.state.IMEIVerifiedSecondDevice}
                    checkIMEIMessage={this.state.checkIMEIMessageSecondDevice}
                    deviceInfo={secondDeviceInfo}
                    productName={this.props.productName}
                    agreedTnC={(e) => this.agreedTnC(e, 2)}
                    openTnCModal={() => this.openTnCModal()}
                    agreedTnCState={this.state.agreedTnCSecondDevice}
                    currentIMEI={this.state.currentIMEISecondDevice}
                    IMEINumber={this.state.IMEINumberSecondDevice}
                    saveExchangeDetails={(IMEINumber) =>
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

ExchangeModal.propTypes = {
  openHowExchangeWorksModal: PropTypes.func,
  exchangeDetails: PropTypes.objectOf(
    PropTypes.shape({
      makeModelDetails: PropTypes.object,
      pickupCharge: PropTypes.object,
      TULBump: PropTypes.object
    })
  ),
  updateProductState: PropTypes.func,
  closeModal: PropTypes.func,
  listingId: PropTypes.string,
  ussId: PropTypes.string,
  verifyIMEINumber: PropTypes.func,
  addProductToCart: PropTypes.func,
  displayToast: PropTypes.func,
  history: PropTypes.object,
  productName: PropTypes.string
};
