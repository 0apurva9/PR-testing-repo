import React from "react";
import styles from "./EmiPanel.css";
import PropTypes from "prop-types";
import MenuDetails from "../../general/components/MenuDetails.js";
import emiIcon from "./img/emi.svg";
import NoCostEmi from "./NoCostEmi.js";
import CheckoutEmi from "./CheckoutEmi.js";
import CheckoutCardless from "./CheckoutCardless.js";
import NoCostEmiBankDetails from "./NoCostEmiBankDetails.js";
import {
  EMI,
  NO_COST_EMI,
  STANDARD_EMI,
  CARDLESS_EMI,
  INSTACRED,
  DEBIT_CARD_EMI,
  CREDIT_CARD_EMI,
  IS_DC_EMI_SELECTED,
  PAYMENT_MODE_TYPE,
  NO_COST_EMI_COUPON
} from "../../lib/constants";
const PAYMENT_MODE = "EMI";

export default class EmiPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedEMIType: this.props.subEmiOption
        ? this.props.subEmiOption
        : "",
      isNoCostSelected: true,
      isStandardSelected: false,
      subMenuSelected: null
    };
  }
  changeEmiPlan = () => {
    if (this.props.changeEmiPlan) {
      this.props.changeEmiPlan();
    }
  };

  componentDidMount = () => {
    if (this.props.isFromRetryUrl) {
      if (
        this.props.retryPaymentDetails &&
        this.props.retryPaymentDetails.orderRetry &&
        this.props.retryPaymentDetails.retryFlagEmiCoupon === "true"
      ) {
        this.props.onChange({ currentPaymentMode: PAYMENT_MODE });
        this.onSetEMIType(NO_COST_EMI);
        this.getBankAndTenureDetails();
      } else if (
        this.props.retryPaymentDetails &&
        this.props.retryPaymentDetails.orderRetry &&
        this.props.retryPaymentDetails.retryFlagDCEmi === "true"
      ) {
        this.props.onChange({ currentPaymentMode: PAYMENT_MODE });
        this.onSetEMIType(NO_COST_EMI);
        this.getBankAndTenureDetails(true);
      }
    } else if (this.props.isPaymentFailed) {
      const emiCoupon = localStorage.getItem(NO_COST_EMI_COUPON);
      if (emiCoupon) {
        this.removeNoCostEmi(emiCoupon);
      }
    }
    if (this.props.instaCredISEnableMidddleLayer) {
      this.props.instaCredISEnableMidddleLayer();
    }
  };

  onBankSelect(val) {
    if (this.props.onBankSelect) {
      this.props.onBankSelect(val);
    }
  }
  onSelectMonth(val) {
    if (this.props.onSelectMonth) {
      this.props.onSelectMonth(val);
    }
  }
  getEmiBankDetails = () => {
    if (this.props.getEmiBankDetails) {
      this.props.getEmiBankDetails();
    }
  };
  getBankAndTenureDetails = (isFromDebitCard = false) => {
    if (this.props.getBankAndTenureDetails) {
      this.props.getBankAndTenureDetails(isFromDebitCard);
    }
  };
  getEmiTermsAndConditionsForBank = (code, bankName) => {
    if (this.props.getEmiTermsAndConditionsForBank) {
      this.props.getEmiTermsAndConditionsForBank(code, bankName);
    }
  };
  applyNoCostEmi = (couponCode, bankName) => {
    if (this.props.applyNoCostEmi) {
      return this.props.applyNoCostEmi(couponCode, bankName);
    }
  };

  removeNoCostEmi = couponCode => {
    if (this.props.removeNoCostEmi) {
      return this.props.removeNoCostEmi(couponCode);
    }
  };
  getItemBreakUpDetails = (
    couponCode,
    noCostEmiText,
    noCostProductCount,
    emiInfo
  ) => {
    if (this.props.getItemBreakUpDetails) {
      this.props.getItemBreakUpDetails(
        couponCode,
        noCostEmiText,
        noCostProductCount,
        emiInfo
      );
    }
  };

  binValidation = (binNo, isDebitCard = false) => {
    if (this.props.binValidation) {
      this.props.binValidation(PAYMENT_MODE, binNo, isDebitCard);
    }
  };

  changeNoCostEmiPlan = () => {
    this.props.changeNoCostEmiPlan();
  };

  onChangeCardDetail = val => {
    this.props.onChangeCardDetail(val);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.currentPaymentMode !== EMI &&
      nextProps.currentPaymentMode !== INSTACRED &&
      this.state.currentSelectedEMIType !== null
    ) {
      this.setState({ currentSelectedEMIType: null, subMenuSelected: null });
    }
    if (this.props.isFromRetryUrl) {
      if (
        this.props.retryPaymentDetails &&
        this.props.retryPaymentDetails.orderRetry &&
        this.props.retryPaymentDetails.retryFlagEmiCoupon === "true"
      ) {
        this.setState({ subMenuSelected: CREDIT_CARD_EMI });
      } else if (
        this.props.retryPaymentDetails &&
        this.props.retryPaymentDetails.orderRetry &&
        this.props.retryPaymentDetails.retryFlagDCEmi === "true"
      ) {
        this.setState({ subMenuSelected: DEBIT_CARD_EMI });
        if (
          this.props.cart &&
          this.props.cart.bankAndTenureDetails &&
          this.props.cart.bankAndTenureDetails.bankList &&
          this.props.cart.bankAndTenureDetails.bankList[0] &&
          this.props.cart.bankAndTenureDetails.bankList[0]
            .noCostEMICouponList &&
          this.props.cart.bankAndTenureDetails.bankList[0]
            .noCostEMICouponList[0]
        ) {
          localStorage.setItem(
            NO_COST_EMI_COUPON,
            this.props.cart.bankAndTenureDetails.bankList[0]
              .noCostEMICouponList[0].emicouponName
          );
        }
      }
    }
  }
  onChangeEMIType(
    currentSelectedEMIType,
    isConfirmPop = false,
    subMenuSelected,
    fromToggleTab = false
  ) {
    if (window && window.digitalData) {
      Object.assign(window.digitalData, {
        checkout: {
          option: {
            name: currentSelectedEMIType
          }
        }
      });
    }

    if (
      (this.props.retryPaymentDetails &&
        this.props.retryPaymentDetails.orderRetry &&
        this.props.retryPaymentDetails.retryFlagDCEmi === "true") ||
      (this.props.retryPaymentDetails &&
        this.props.retryPaymentDetails.orderRetry &&
        this.props.retryPaymentDetails.retryFlagEmiCoupon === "true")
    ) {
      return;
    }
    let paymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
    if (paymentMode !== EMI) {
      localStorage.setItem(PAYMENT_MODE_TYPE, EMI);
    }
    localStorage.setItem(IS_DC_EMI_SELECTED, false);
    this.props.onChange({ currentPaymentMode: EMI });
    this.props.changeSubEmiOption(currentSelectedEMIType);
    this.setState({ currentSelectedEMIType, subMenuSelected });
    if (
      subMenuSelected === CREDIT_CARD_EMI &&
      currentSelectedEMIType === NO_COST_EMI &&
      this.props.getBankAndTenureDetails
    ) {
      this.props.getBankAndTenureDetails(false);
    } else if (
      subMenuSelected === CREDIT_CARD_EMI &&
      currentSelectedEMIType === STANDARD_EMI &&
      this.props.getEmiBankDetails
    ) {
      this.props.getEmiBankDetails();
    } else if (
      subMenuSelected === DEBIT_CARD_EMI &&
      currentSelectedEMIType === NO_COST_EMI &&
      this.props.getBankAndTenureDetails
    ) {
      localStorage.setItem(IS_DC_EMI_SELECTED, true);
      this.props.getBankAndTenureDetails(true);
    } else if (
      subMenuSelected === DEBIT_CARD_EMI &&
      currentSelectedEMIType === STANDARD_EMI &&
      this.props.getBankDetailsforDCEmi
    ) {
      localStorage.setItem(IS_DC_EMI_SELECTED, true);
      this.props.getBankDetailsforDCEmi();
    }

    if (currentSelectedEMIType === NO_COST_EMI) {
      this.setState({
        isNoCostSelected: true,
        isStandardSelected: false
      });
    } else if (currentSelectedEMIType === STANDARD_EMI) {
      this.setState({
        isNoCostSelected: false,
        isStandardSelected: true
      });
    }

    if (isConfirmPop && this.props.hideModal) {
      this.props.hideModal();
    }
  }

  onSetEMIType(currentSelectedEMIType) {
    this.props.setSunEmiOption(currentSelectedEMIType);
    this.setState({ currentSelectedEMIType });
  }

  render() {
    if (this.props.isCliqCashApplied) {
      return null;
    }
    let isOpen =
      this.props.currentPaymentMode === EMI ||
      this.props.currentPaymentMode === INSTACRED;
    let isOpenSubEMI = this.state.currentSelectedEMIType === NO_COST_EMI;
    let isRetryPaymentFromURL = false;

    let paymentMode =
      this.props.cart &&
      this.props.cart.paymentModes &&
      this.props.cart.paymentModes.paymentModes;
    var instacredMode =
      paymentMode &&
      paymentMode.filter(obj => {
        return obj.key === INSTACRED;
      });

    let instacredMiddleLayerISEnable = false;
    if (
      this.props.cart &&
      this.props.cart.instacredMiddleLayerISEnableStatus &&
      this.props.cart.instacredMiddleLayerISEnableStatus === "success"
    ) {
      instacredMiddleLayerISEnable =
        this.props.cart.instacredMiddleLayerISEnable &&
        this.props.cart.instacredMiddleLayerISEnable.applicationProperties &&
        this.props.cart.instacredMiddleLayerISEnable.applicationProperties[0]
          .value
          ? this.props.cart.instacredMiddleLayerISEnable
              .applicationProperties[0].value
          : false;
    }

    let clsNce = this.state.isNoCostSelected
      ? [styles.isSelectedTab, styles.tabNceStandard].join(" ")
      : styles.tabNceStandard;
    let clsStandard = this.state.isStandardSelected
      ? [styles.isSelectedTab, styles.tabNceStandard].join(" ")
      : styles.tabNceStandard;

    const emiEligibiltyDetails = this.props.emiEligibiltyDetails;
    let isDCEMIEligible = false;
    let isDCNoCostEMIEligible = false;
    let isCCEMIEligible = false;
    let isCCNoCostEMIEligible = false;

    if (!this.props.isFromRetryUrl) {
      isDCEMIEligible =
        emiEligibiltyDetails && emiEligibiltyDetails.isDCEMIEligible
          ? emiEligibiltyDetails.isDCEMIEligible
          : false;
      isDCNoCostEMIEligible =
        emiEligibiltyDetails && emiEligibiltyDetails.isDCNoCostEMIEligible
          ? emiEligibiltyDetails.isDCNoCostEMIEligible
          : false;
      isCCEMIEligible =
        emiEligibiltyDetails && emiEligibiltyDetails.isCCEMIEligible
          ? emiEligibiltyDetails.isCCEMIEligible
          : false;
      isCCNoCostEMIEligible =
        emiEligibiltyDetails && emiEligibiltyDetails.isCCNoCostEMIEligible
          ? emiEligibiltyDetails.isCCNoCostEMIEligible
          : false;
    }
    const dcwPageId =
      emiEligibiltyDetails && emiEligibiltyDetails.dcwPageId
        ? emiEligibiltyDetails.dcwPageId
        : "";
    let retryFlagEmiCoupon = false;
    let retryFlagDCEmi = false;

    if (this.props.isFromRetryUrl) {
      retryFlagEmiCoupon =
        this.props.retryPaymentDetails &&
        this.props.retryPaymentDetails.orderRetry &&
        this.props.retryPaymentDetails.retryFlagEmiCoupon;
      retryFlagDCEmi =
        this.props.retryPaymentDetails &&
        this.props.retryPaymentDetails.orderRetry &&
        this.props.retryPaymentDetails.retryFlagDCEmi;

      if (retryFlagEmiCoupon === "true") {
        isOpen = true;
        isOpenSubEMI = true;
        isRetryPaymentFromURL = true;
        isCCNoCostEMIEligible = true;
      } else if (retryFlagDCEmi === "true") {
        isOpen = true;
        isOpenSubEMI = true;
        isRetryPaymentFromURL = true;
        isDCNoCostEMIEligible = true;
      } else {
        isDCEMIEligible =
          emiEligibiltyDetails && emiEligibiltyDetails.isDCEMIEligible
            ? emiEligibiltyDetails.isDCEMIEligible
            : false;
        isDCNoCostEMIEligible =
          emiEligibiltyDetails && emiEligibiltyDetails.isDCNoCostEMIEligible
            ? emiEligibiltyDetails.isDCNoCostEMIEligible
            : false;
        isCCEMIEligible =
          emiEligibiltyDetails && emiEligibiltyDetails.isCCEMIEligible
            ? emiEligibiltyDetails.isCCEMIEligible
            : false;
        isCCNoCostEMIEligible =
          emiEligibiltyDetails && emiEligibiltyDetails.isCCNoCostEMIEligible
            ? emiEligibiltyDetails.isCCNoCostEMIEligible
            : false;
      }
    }

    let creditCardTabNameExtension = "";
    let debitCardTabNameExtension = "";
    if (isCCEMIEligible && isCCNoCostEMIEligible) {
      creditCardTabNameExtension = "No Cost/Standard";
    } else if (isCCEMIEligible) {
      creditCardTabNameExtension = "Standard";
    } else if (isCCNoCostEMIEligible) {
      creditCardTabNameExtension = "No Cost";
    }
    if (isDCEMIEligible && isDCNoCostEMIEligible) {
      debitCardTabNameExtension = "No Cost/Standard";
    } else if (isDCEMIEligible) {
      debitCardTabNameExtension = "Standard";
    } else if (isDCNoCostEMIEligible) {
      debitCardTabNameExtension = "No Cost";
    }

    let ccEmiText = isCCNoCostEMIEligible
      ? NO_COST_EMI
      : isCCEMIEligible
      ? STANDARD_EMI
      : "";
    let dcEmiText = isDCNoCostEMIEligible
      ? NO_COST_EMI
      : isDCEMIEligible
      ? STANDARD_EMI
      : "";

    return (
      <div className={styles.base}>
        {isRetryPaymentFromURL && (
          <span className={styles.noCostRetryPayment}>
            * Please note that the payment can be completed using the previously
            selected No Cost EMI option only – this is to ensure that the
            original discount(s) can be entirely redeemed.
          </span>
        )}
        <MenuDetails
          text={EMI}
          icon={emiIcon}
          isOpen={isOpen}
          onOpenMenu={currentPaymentMode =>
            this.props.onChange({ currentPaymentMode })
          }
          getEMIEligibilityDetails={cartGuId =>
            this.props.getEMIEligibilityDetails(cartGuId)
          }
          displayToast={this.props.displayToast}
          emiEligibiltyDetails={this.props.emiEligibiltyDetails}
          retryFlagDCEmi={retryFlagDCEmi}
          retryFlagEmiCoupon={retryFlagEmiCoupon}
          isFromRetryUrl={this.props.isFromRetryUrl}
          removeNoCostEmi={couponCode => this.removeNoCostEmi(couponCode)}
        >
          {(isCCNoCostEMIEligible || isCCEMIEligible) && (
            <div className={styles.subListHolder}>
              <NoCostEmi
                EMIText={ccEmiText}
                EMITabName={CREDIT_CARD_EMI}
                creditCardTabNameExtension={creditCardTabNameExtension}
                isOpenSubEMI={this.state.subMenuSelected === CREDIT_CARD_EMI}
                onChangeEMIType={(
                  currentSelectedEMIType,
                  isConfirmPop,
                  subMenuSelected
                ) =>
                  this.onChangeEMIType(
                    currentSelectedEMIType,
                    isConfirmPop,
                    subMenuSelected
                  )
                }
                getBankAndTenureDetails={() => this.getBankAndTenureDetails()}
                onChangeCardDetail={val => this.onChangeCardDetail(val)}
                isRetryPaymentFromURL={isRetryPaymentFromURL}
                getEmiBankDetails={() => this.getEmiBankDetails()}
                emiList={
                  this.props.cart.emiBankDetails &&
                  this.props.cart.emiBankDetails.bankList
                }
                emiBinValidationErrorMessage={
                  this.props.emiBinValidationErrorMessage
                }
              >
                {isCCNoCostEMIEligible && isCCEMIEligible && (
                  <div className={styles.tabHeader}>
                    <div
                      onClick={() =>
                        this.onChangeEMIType(
                          NO_COST_EMI,
                          false,
                          this.state.subMenuSelected,
                          true
                        )
                      }
                      className={clsNce}
                    >
                      No Cost EMI
                    </div>
                    <div
                      onClick={() =>
                        this.onChangeEMIType(
                          STANDARD_EMI,
                          false,
                          this.state.subMenuSelected,
                          true
                        )
                      }
                      className={clsStandard}
                    >
                      Standard EMI
                    </div>
                  </div>
                )}
                {isCCNoCostEMIEligible && this.state.isNoCostSelected && (
                  <NoCostEmiBankDetails
                    isNoCostEmiApplied={this.props.isNoCostEmiApplied}
                    selectedEMIType={this.state.currentSelectedEMIType}
                    onBankSelect={val => this.onBankSelect(val)}
                    onSelectMonth={val => this.onSelectMonth(val)}
                    onFocusInput={this.props.onFocusInput}
                    bankList={
                      this.props.cart &&
                      this.props.cart.bankAndTenureDetails &&
                      this.props.cart.bankAndTenureDetails.bankList
                    }
                    noCostEmiProductCount={
                      this.props.cart &&
                      this.props.cart.bankAndTenureDetails &&
                      this.props.cart.bankAndTenureDetails.numEligibleProducts
                    }
                    totalProductCount={this.props.totalProductCount}
                    getEmiTermsAndConditionsForBank={(code, bankName) =>
                      this.getEmiTermsAndConditionsForBank(code, bankName)
                    }
                    applyNoCostEmi={(couponCode, bankName) =>
                      this.applyNoCostEmi(couponCode, bankName)
                    }
                    removeNoCostEmi={couponCode =>
                      this.removeNoCostEmi(couponCode)
                    }
                    noCostEmiDetails={this.props.cart.noCostEmiDetails}
                    getItemBreakUpDetails={(
                      couponCode,
                      noCostEmiText,
                      noCostProductCount,
                      emiInfo
                    ) =>
                      this.getItemBreakUpDetails(
                        couponCode,
                        noCostEmiText,
                        noCostProductCount,
                        emiInfo
                      )
                    }
                    isNoCostEmiProceeded={this.props.isNoCostEmiProceeded}
                    binValidation={binNo => this.binValidation(binNo)}
                    softReservationForPayment={cardDetails =>
                      this.softReservationForPayment(cardDetails)
                    }
                    displayToast={this.props.displayToast}
                    changeNoCostEmiPlan={() => this.changeNoCostEmiPlan()}
                    onChangeCardDetail={val => this.onChangeCardDetail(val)}
                    cardDetails={this.props.cardDetails}
                    changeEmiPlan={() => this.changeEmiPlan()}
                    onCheckout={this.props.onCheckout}
                    creditCardValid={this.props.creditCardValid}
                    emiBinValidationErrorMessage={
                      this.props.emiBinValidationErrorMessage
                    }
                    isRetryPaymentFromURL={isRetryPaymentFromURL}
                    retryPaymentDetails={this.props.retryPaymentDetails}
                  />
                )}
                {isCCEMIEligible && this.state.isStandardSelected && (
                  <CheckoutEmi
                    {...this.props}
                    selectedEMIType={this.state.currentSelectedEMIType}
                    changeEmiPlan={() => this.changeEmiPlan()}
                  />
                )}
              </NoCostEmi>
            </div>
          )}
          {(isDCEMIEligible || isDCNoCostEMIEligible) && (
            <div className={styles.subListHolder}>
              <NoCostEmi
                EMIText={dcEmiText}
                EMITabName={DEBIT_CARD_EMI}
                debitCardTabNameExtension={debitCardTabNameExtension}
                isOpenSubEMI={this.state.subMenuSelected === DEBIT_CARD_EMI}
                onChangeEMIType={(
                  currentSelectedEMIType,
                  isConfirmPop,
                  subMenuSelected
                ) =>
                  this.onChangeEMIType(
                    currentSelectedEMIType,
                    isConfirmPop,
                    subMenuSelected
                  )
                }
                getBankAndTenureDetails={() => this.getBankAndTenureDetails()}
                onChangeCardDetail={val => this.onChangeCardDetail(val)}
                isRetryPaymentFromURL={isRetryPaymentFromURL}
                getEmiBankDetails={() => this.getEmiBankDetails()}
                emiList={
                  this.props.cart.emiBankDetails &&
                  this.props.cart.emiBankDetails.bankList
                }
                emiBinValidationErrorMessage={
                  this.props.emiBinValidationErrorMessage
                }
              >
                {isDCNoCostEMIEligible && isDCEMIEligible && (
                  <div className={styles.tabHeader}>
                    <div
                      onClick={() =>
                        this.onChangeEMIType(
                          NO_COST_EMI,
                          false,
                          this.state.subMenuSelected,
                          true
                        )
                      }
                      className={clsNce}
                    >
                      No Cost EMI
                    </div>
                    <div
                      onClick={() =>
                        this.onChangeEMIType(
                          STANDARD_EMI,
                          false,
                          this.state.subMenuSelected,
                          true
                        )
                      }
                      className={clsStandard}
                    >
                      Standard EMI
                    </div>
                  </div>
                )}
                {isDCNoCostEMIEligible && this.state.isNoCostSelected && (
                  <NoCostEmiBankDetails
                    isNoCostEmiApplied={this.props.isNoCostEmiApplied}
                    selectedEMIType={this.state.currentSelectedEMIType}
                    onBankSelect={val => this.onBankSelect(val)}
                    onSelectMonth={val => this.onSelectMonth(val)}
                    onFocusInput={this.props.onFocusInput}
                    bankList={
                      this.props.cart &&
                      this.props.cart.bankAndTenureDetails &&
                      this.props.cart.bankAndTenureDetails.bankList
                    }
                    noCostEmiProductCount={
                      this.props.cart &&
                      this.props.cart.bankAndTenureDetails &&
                      this.props.cart.bankAndTenureDetails.numEligibleProducts
                    }
                    totalProductCount={this.props.totalProductCount}
                    getEmiTermsAndConditionsForBank={(code, bankName) =>
                      this.getEmiTermsAndConditionsForBank(code, bankName)
                    }
                    applyNoCostEmi={(couponCode, bankName) =>
                      this.applyNoCostEmi(couponCode, bankName)
                    }
                    removeNoCostEmi={couponCode =>
                      this.removeNoCostEmi(couponCode)
                    }
                    noCostEmiDetails={this.props.cart.noCostEmiDetails}
                    getItemBreakUpDetails={(
                      couponCode,
                      noCostEmiText,
                      noCostProductCount,
                      emiInfo
                    ) =>
                      this.getItemBreakUpDetails(
                        couponCode,
                        noCostEmiText,
                        noCostProductCount,
                        emiInfo
                      )
                    }
                    isNoCostEmiProceeded={this.props.isNoCostEmiProceeded}
                    binValidation={(binNo, isDebitCard) =>
                      this.binValidation(binNo, isDebitCard)
                    }
                    softReservationForPayment={cardDetails =>
                      this.softReservationForPayment(cardDetails)
                    }
                    displayToast={this.props.displayToast}
                    changeNoCostEmiPlan={() => this.changeNoCostEmiPlan()}
                    onChangeCardDetail={val => this.onChangeCardDetail(val)}
                    cardDetails={this.props.cardDetails}
                    changeEmiPlan={() => this.changeEmiPlan()}
                    onCheckout={this.props.onCheckout}
                    creditCardValid={this.props.creditCardValid}
                    emiBinValidationErrorMessage={
                      this.props.emiBinValidationErrorMessage
                    }
                    isRetryPaymentFromURL={isRetryPaymentFromURL}
                    retryPaymentDetails={this.props.retryPaymentDetails}
                    isDebitCard={true}
                    emiEligibiltyDetails={this.props.emiEligibiltyDetails}
                    dcwPageId={dcwPageId}
                  />
                )}
                {isDCEMIEligible && this.state.isStandardSelected && (
                  <CheckoutEmi
                    {...this.props}
                    isDebitCard={true}
                    selectedEMIType={this.state.currentSelectedEMIType}
                    changeEmiPlan={() => this.changeEmiPlan()}
                  />
                )}
              </NoCostEmi>
            </div>
          )}
          {instacredMiddleLayerISEnable
            ? !isRetryPaymentFromURL && (
                <div className={styles.subListHolder}>
                  {paymentMode &&
                    instacredMode.length > 0 &&
                    instacredMode[0].value === true && (
                      <NoCostEmi
                        isOpenSubEMI={
                          this.state.currentSelectedEMIType === CARDLESS_EMI
                        }
                        onChangeEMIType={(
                          currentSelectedEMIType,
                          isConfirmPop,
                          subMenuSelected
                        ) =>
                          this.onChangeEMIType(
                            currentSelectedEMIType,
                            isConfirmPop,
                            subMenuSelected
                          )
                        }
                        {...this.props}
                        EMIText={CARDLESS_EMI}
                        EMITabName={CARDLESS_EMI}
                      >
                        <CheckoutCardless
                          {...this.props}
                          selectedEMIType={this.state.currentSelectedEMIType}
                        />
                      </NoCostEmi>
                    )}
                </div>
              )
            : null}
        </MenuDetails>
      </div>
    );
  }
}
EmiPanel.propTypes = {
  onBankSelect: PropTypes.func,
  onSelectMonth: PropTypes.func,
  getEMIEligibilityDetails: PropTypes.func,
  changeEmiPlan: PropTypes.func,
  subEmiOption: PropTypes.string,
  getEmiEligibility: PropTypes.func,
  isFromRetryUrl: PropTypes.bool,
  onChange: PropTypes.func,
  instaCredISEnableMidddleLayer: PropTypes.func,
  getEmiBankDetails: PropTypes.func,
  getBankAndTenureDetails: PropTypes.func,
  getEmiTermsAndConditionsForBank: PropTypes.func,
  applyNoCostEmi: PropTypes.func,
  removeNoCostEmi: PropTypes.func,
  getItemBreakUpDetails: PropTypes.func,
  binValidation: PropTypes.func,
  onChangeCardDetail: PropTypes.func,
  hideModal: PropTypes.func,
  changeSubEmiOption: PropTypes.func,
  setSunEmiOption: PropTypes.func,
  currentPaymentMode: PropTypes.string,
  emiEligibiltyDetails: PropTypes.shape({
    isCCEMIEligible: PropTypes.bool,
    isCCNoCostEMIEligible: PropTypes.bool,
    isDCEMIEligible: PropTypes.bool,
    isDCNoCostEMIEligible: PropTypes.bool,
    error: PropTypes.string,
    nonEmiProdList: PropTypes.array,
    type: PropTypes.string
  }),
  cart: PropTypes.shape({
    emiBankDetails: PropTypes.shape({
      bankList: PropTypes.arrayOf(
        PropTypes.shape({
          code: PropTypes.string,
          emiBank: PropTypes.string,
          emitermsrate: PropTypes.arrayOf(
            PropTypes.shape({
              interestPayable: PropTypes.string,
              interestRate: PropTypes.string,
              monthlyInstallment: PropTypes.string,
              overallCost: PropTypes.string,
              term: PropTypes.string
            })
          )
        })
      )
    }),
    bankAndTenureDetails: PropTypes.shape({
      bankList: PropTypes.arrayOf(
        PropTypes.shape({
          bankCode: PropTypes.string,
          bankName: PropTypes.string,
          code: PropTypes.string,
          emiInfo: PropTypes.string,
          logoUrl: PropTypes.string,
          noCostEMICouponList: PropTypes.arrayOf(
            PropTypes.shape({
              description: PropTypes.string,
              emicouponCode: PropTypes.string,
              emicouponName: PropTypes.string,
              isPercentage: PropTypes.string,
              tenure: PropTypes.string,
              value: PropTypes.string
            })
          )
        })
      )
    }),
    instacredMiddleLayerISEnable: PropTypes.shape({
      applicationProperties: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.bool
        })
      )
    })
  })
};
