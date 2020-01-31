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
import SelectBoxMobileExchange from "../../general/components/SelectBoxMobileExchange";
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
      IMEINumber: ""
    };
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
    let firstDeviceData = {
      exchangeBrandId: this.state.exchangeBrandId,
      exchangeBrandName: this.state.exchangeBrandName,
      model: JSON.parse(this.state.selectedModel),
      pickupCharge: this.props.exchangeDetails.pickupCharge,
      tulBump: this.props.exchangeDetails.TULBump
    };
    localStorage.setItem("MEFirstDeviceData", JSON.stringify(firstDeviceData));
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
  render() {
    let firstDeviceInfo = localStorage.getItem("MEFirstDeviceData");
    if (firstDeviceInfo) {
      firstDeviceInfo = JSON.parse(firstDeviceInfo);
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
          <div className={styles.howExchangeWorksContainer}>
            <div
              className={styles.modalBackArrow}
              onClick={() => this.closeHowExchangeWorksModal()}
            />
            <div className={styles.howExchangeWorksHeading}>
              How exchange works?
            </div>
            <div>
              <img src={hew1} alt="" className={styles.iconSize} />
              <div className={styles.contentContainer}>
                <div className={styles.contentHeading}>
                  1. Share your old product details!{" "}
                </div>
                <div className={styles.contentDescription}>
                  Once you have decided which phone to buy, we will either auto
                  detect your old phone or you can enter them manually. Offer
                  valid on select devices only.{" "}
                </div>
              </div>
              <img src={hew2} alt="" className={styles.iconSize} />
              <div className={styles.contentContainer}>
                <div className={styles.contentHeading}>
                  2. Check Exchange Cashback value{" "}
                </div>
                <div className={styles.contentDescription}>
                  Check the final Exchange Cashback applicable for your old
                  phone based on brand-model and detailed check{" "}
                </div>
              </div>
              <img src={hew3} alt="" className={styles.iconSize} />
              <div className={styles.contentContainer}>
                <div className={styles.contentHeading}>
                  3. Place order with Exchange{" "}
                </div>
                <div className={styles.contentDescription}>
                  Once you place order for your new phone, the exchange order
                  will also be confirmed. You will have to choose preferred mode
                  for receiving Exchange Cashback{" "}
                </div>
              </div>
              <img src={hew4} alt="" className={styles.iconSize} />
              <div className={styles.contentContainer}>
                <div className={styles.contentHeading}>
                  4. Lastly, select the Cashback mode{" "}
                </div>
                <div className={styles.contentDescription}>
                  Your new phone order will be delivered as per the scheduled
                  post which your exchange order will be processed{" "}
                </div>
              </div>
              <img src={hew5} alt="" className={styles.iconSize} />
              <div className={styles.contentContainer}>
                <div className={styles.contentHeading}>
                  5. Cashback credited{" "}
                </div>
                <div className={styles.contentDescription}>
                  Once your new phone is delivered, your exchange phone would be
                  picked up separately. At the time of pickup, issues with old
                  phone like Screen damage, body cracks or switch on will lead
                  to cancellation of exchange{" "}
                </div>
              </div>
              <img src={hew5} alt="" className={styles.iconSize} />
              <div className={styles.contentContainer}>
                <div className={styles.contentHeading}>
                  6. Cashback would be credited to the account{" "}
                </div>
                <div className={styles.contentDescription}>
                  Upon successful pickup of your old device, the cashback value
                  for exchange would be credited to the preferred mode provided
                  by you with in 48 hours{" "}
                </div>
              </div>
            </div>
            <div className={styles.contentHeading}>
              Points to be noted: Screen damage, body cracks or switch on issues
              will lead to cancellation of exchange
            </div>
          </div>
        ) : null}
        {/* Modal for terms and condiions */}
        {this.state.showTnCModal ? (
          <div className={styles.termsConditionsContainer}>
            <div
              className={styles.modalBackArrow}
              onClick={() => this.closeTnCModal()}
            />
            <div className={styles.howExchangeWorksHeading}>
              Terms &amp; Conditions
            </div>
            <div className={styles.contentHeading}>
              1) Mobile Exchange Policy{" "}
            </div>
            <ul className={styles.contentHeading}>
              <li>
                The exchange phone will be picked up within 2 days after the new
                phone is delivered to the customer{" "}
              </li>
              <li>
                Once the exchange phone pickup is scheduled, the exchange
                process cannot be cancelled by the customer. However customer
                can deny to provide the exchange phone to the logistic person
                when the pickup is attempted.{" "}
              </li>
              <li>
                Customer will ensure that the Brand and model of the old device
                matches the declaration provided by them while entering the
                exchange details.{" "}
              </li>
              <li>
                If the device is not working or the delivery executive is not
                able to do an iCloud unlock check or screen lock check / IMEI
                check due to a phone being 'factory reset or if there is any
                mismatch in the information provided by me regarding the device,
                then the exchange offer will be cancelled{" "}
              </li>
              <li>
                Customer must ensure that device being exchanged under the
                exchange program is genuine and is not counterfeit, free from
                any and all encumbrances, liens, attachments, disputes, legal
                flaws, exchange or any agreement of sale etc. and the customer
                has got the clear ownership of the said device
              </li>
            </ul>
            <div className={styles.contentHeading}>
              2) Cancellation, Return &amp; Refund
            </div>
            <ul className={styles.contentHeading}>
              <li>
                If in case the customer wishes to return the new mobile phone
                the amount refunded would be after deducting the additional
                cashback. For e.g.: If the price of the new phone is Rs. 10,000,
                Total Exchange Amount is Rs 3000 (Exchange Value Rs. 2000 &
                additional cashback is Rs. 1000) Customer will get only Rs 9000
                (=10,000-1,000) as Refund{" "}
              </li>
              <li>
                In case of cancellation of the order related to the new mobile,
                the exchange order will also be cancelled automatically. The
                exchange order will not be processed independently or without a
                new mobile order{" "}
              </li>
              <li>
                In relation to shipping charges of old device, the customer
                might have to pay pickup charges towards shipping charges of old
                device as mentioned in the checkout page. The pickup charges
                will be over and above the exchange value of the old device. In
                case the exchange offer is cancelled as a result of the old
                device failing any of the checks for the product exchange
                program - the refund of any payment made will be after deducting
                the pickup charges.
              </li>
            </ul>
          </div>
        ) : null}
        {/* Modal for Cashback details */}
        {this.state.showCashbackModal ? (
          <div className={styles.howExchangeWorksContainer}>
            <div
              className={styles.modalBackArrow}
              onClick={() => this.closeCashbackModal()}
            />
            <div className={styles.howExchangeWorksHeading}>
              Cashback Details
            </div>
            <ul className={styles.contentHeading}>
              <li>
                Cashback would be credited post-delivery of your new product and
                pickup of old product
              </li>
              <li>
                After placing your order, provide your preferred option to
                process Exchange Cashback for your old product
              </li>
              <li>
                In case of new phone being returned, the amount refunded would
                be after deducting the{" "}
                <span className={styles.fontRegular}>Additional Cashback</span>
              </li>
              <li>
                To know more, refer{" "}
                <span
                  className={styles.tncText}
                  onClick={() => this.openTnCModal()}
                >
                  T&amp;C
                </span>
              </li>
            </ul>
          </div>
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
              <div className={styles.smallHeading}>
                Select Device to Evaluate
              </div>

              <SelectBoxMobileExchange
                placeholder={"Select Brand"}
                customSelect="customSelect1"
                options={
                  this.state.makeModelDetails &&
                  this.state.makeModelDetails.map((val, i) => {
                    return {
                      value: val.exchangeBrandId,
                      label: val.exchangeBrandName,
                      modelList: val.exchangeModelList
                    };
                  })
                }
                isEnable={this.state.isEnableForBrand}
                onChange={val => this.onChange(val)}
              />

              <br />
              <SelectBoxMobileExchange
                placeholder={"Select Model"}
                customSelect="customSelect2"
                options={
                  this.state.currentModelList &&
                  this.state.currentModelList.map((val, i) => {
                    return {
                      value: val.exchangeModelName,
                      label: val.effectiveModelName,
                      modelList: val
                    };
                  })
                }
                isEnable={this.state.isEnableForModel}
                onChange={val => this.onChangeSecondary(val)}
              />
              <div
                className={styles.evaluateButton}
                onClick={() => this.saveDeviceDetails()}
              >
                Evaluate
              </div>
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
              <div className={styles.tabSlider}>
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
              </div>
              <div className={styles.tabSlider}>
                <div className={styles.addDevice}>
                  <span className={styles.plusSign} />
                  <br />
                  Add another mobile to Evaluate
                </div>
              </div>
            </div>
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
                    <img src={check} alt="check" className={styles.checkIcon} />{" "}
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
              <input type="checkbox" className={styles.tncCheckbox} />
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
              <div className={styles.exchangeButton}>Proceed with exchange</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
