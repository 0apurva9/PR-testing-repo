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
  CATEGORY_FINE_JEWELLERY,
  CATEGORY_FASHION_JEWELLERY,
  PAYMENT_FAILURE_CART_PRODUCT
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
    if (
      this.props.getEmiEligibility &&
      !this.props.cart.emiEligibilityDetails
    ) {
      this.props.getEmiEligibility();
    }
    if (this.props.isFromRetryUrl) {
      if (
        this.props.retryPaymentDetails &&
        this.props.retryPaymentDetails.orderRetry &&
        this.props.retryPaymentDetails.retryFlagEmiCoupon
      ) {
        this.props.onChange({ currentPaymentMode: PAYMENT_MODE });
        this.onSetEMIType(NO_COST_EMI);
        this.getBankAndTenureDetails();
      }
    }
    if (this.props.instaCredISEnableMidddleLayer) {
      this.props.instaCredISEnableMidddleLayer();
    }
    if (this.props.getDCEmiEligibility) {
      this.props.getDCEmiEligibility();
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
  getBankAndTenureDetails = () => {
    if (this.props.getBankAndTenureDetails) {
      this.props.getBankAndTenureDetails();
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

  binValidation = binNo => {
    if (this.props.binValidation) {
      this.props.binValidation(PAYMENT_MODE, binNo);
    }
  };

  changeNoCostEmiPlan = () => {
    this.props.changeNoCostEmiPlan();
  };

  onChangeCardDetail = val => {
    this.props.onChangeCardDetail(val);
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currentPaymentMode !== EMI &&
      nextProps.currentPaymentMode !== INSTACRED &&
      this.state.currentSelectedEMIType !== null
    ) {
      this.setState({ currentSelectedEMIType: null });
    }
  }
  onChangeEMIType(
    currentSelectedEMIType,
    isConfirmPop = false,
    subMenuSelected
  ) {
    this.props.onChange({ currentPaymentMode: EMI });
    this.props.changeSubEmiOption(currentSelectedEMIType);
    this.setState({ currentSelectedEMIType, subMenuSelected });

    if (subMenuSelected === CREDIT_CARD_EMI) {
      if (!this.props.emiList && this.props.getEmiBankDetails) {
        this.props.getEmiBankDetails();
      }
      if (this.props.getBankAndTenureDetails) {
        this.props.getBankAndTenureDetails(false);
      }
    } else if (subMenuSelected === DEBIT_CARD_EMI) {
      if (!this.props.emiList && this.props.getBankDetailsforDCEmi) {
        this.props.getBankDetailsforDCEmi();
      }
      if (this.props.getBankAndTenureDetails) {
        this.props.getBankAndTenureDetails(true);
      }
    }
    if (
      currentSelectedEMIType === STANDARD_EMI &&
      this.props.getEmiBankDetails
    ) {
      this.props.getEmiBankDetails();
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

    if (isConfirmPop) {
      this.props.hideModal();
    }
  }

  onSetEMIType(currentSelectedEMIType) {
    this.props.setSunEmiOption(currentSelectedEMIType);
    this.setState({ currentSelectedEMIType });
  }
  /**
   * Tab changes
   */
  toggleTab = tabName => {
    if (this.props.openPopUp) {
      this.props.openPopUp({
        heading: "Are you sure you want to discard your selection?",
        children: this.alertModalBody(tabName)
      });
    }
  };
  alertModalBody = tabName => {
    return (
      <div className={styles.buttonBox}>
        <button
          type="button"
          className={styles.btn}
          onClick={() =>
            this.onChangeEMIType(tabName, true, this.state.subMenuSelected)
          }
        >
          YES
        </button>
        <div className={styles.borderMiddle} />
        <button
          type="button"
          className={styles.btn}
          onClick={() => this.props.hideModal()}
        >
          NO
        </button>
      </div>
    );
  };
  /**
   * EOC
   */
  render() {
    if (this.props.isCliqCashApplied) {
      return null;
    }
    let isOpen =
      this.props.currentPaymentMode === EMI ||
      this.props.currentPaymentMode === INSTACRED;
    let isOpenSubEMI = this.state.currentSelectedEMIType === NO_COST_EMI;
    let isRetryPaymentFromURL = false;
    if (this.props.isFromRetryUrl) {
      if (
        this.props.retryPaymentDetails &&
        this.props.retryPaymentDetails.orderRetry &&
        this.props.retryPaymentDetails.retryFlagEmiCoupon
      ) {
        isOpen = true;
        isOpenSubEMI = true;
        isRetryPaymentFromURL = true;
      }
    }
    let { paymentMode, cart, isJewelleryItemAvailable } = this.props;
    var instacredMode =
      paymentMode &&
      paymentMode.filter(obj => {
        return obj.key === INSTACRED;
      });

    let isJewelleryProduct = false;
    let cartProductData = [];
    if (localStorage.getItem(PAYMENT_FAILURE_CART_PRODUCT)) {
      cartProductData = [
        ...JSON.parse(localStorage.getItem(PAYMENT_FAILURE_CART_PRODUCT))
      ];
    } else if (
      cart &&
      cart.orderSummary &&
      cart.orderSummary.products &&
      cart.orderSummary.products.length > 0
    ) {
      cartProductData = [...cart.orderSummary.products];
    }

    cartProductData.map(item => {
      if (
        item.rootCategory === CATEGORY_FINE_JEWELLERY ||
        item.rootCategory === CATEGORY_FASHION_JEWELLERY
      ) {
        isJewelleryProduct = true;
      }
    });

    if (isJewelleryItemAvailable) {
      isJewelleryProduct = isJewelleryItemAvailable;
    }

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

    /**
     * Tab changes
     */
    let clsNce = this.state.isNoCostSelected
      ? [styles.isSelectedTab, styles.tabNceStandard].join(" ")
      : styles.tabNceStandard;
    let clsStandard = this.state.isStandardSelected
      ? [styles.isSelectedTab, styles.tabNceStandard].join(" ")
      : styles.tabNceStandard;

    let isNoCostEmiEligibleFlag = false;
    let isStandardEmiEligibleFlag = false;
    isNoCostEmiEligibleFlag =
      !this.props.isCliqCashApplied &&
      this.props.cart &&
      this.props.cart.emiEligibilityDetails &&
      this.props.cart.emiEligibilityDetails.isNoCostEMIEligible
        ? this.props.cart.emiEligibilityDetails.isNoCostEMIEligible
        : false;

    isStandardEmiEligibleFlag = !isJewelleryProduct
      ? !isRetryPaymentFromURL
      : false;
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
        >
          <div className={styles.subListHolder}>
            <NoCostEmi
              EMIText={NO_COST_EMI}
              EMITabName={CREDIT_CARD_EMI}
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
              {isStandardEmiEligibleFlag &&
                isNoCostEmiEligibleFlag && (
                  <div className={styles.tabHeader}>
                    <div
                      onClick={() => this.toggleTab(NO_COST_EMI)}
                      className={clsNce}
                    >
                      No Cost EMI
                    </div>
                    <div
                      onClick={() => this.toggleTab(STANDARD_EMI)}
                      className={clsStandard}
                    >
                      Standard EMI
                    </div>
                  </div>
                )}
              {isNoCostEmiEligibleFlag &&
                this.state.isNoCostSelected && (
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
                    emiBinValidationErrorMessage={
                      this.props.emiBinValidationErrorMessage
                    }
                    isRetryPaymentFromURL={isRetryPaymentFromURL}
                    retryPaymentDetails={this.props.retryPaymentDetails}
                  />
                )}
              {isStandardEmiEligibleFlag &&
                this.state.isStandardSelected && (
                  <CheckoutEmi
                    {...this.props}
                    selectedEMIType={this.state.currentSelectedEMIType}
                    changeEmiPlan={() => this.changeEmiPlan()}
                  />
                )}
            </NoCostEmi>
          </div>

          <div className={styles.subListHolder}>
            <NoCostEmi
              EMIText={NO_COST_EMI}
              EMITabName={DEBIT_CARD_EMI}
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
              {isStandardEmiEligibleFlag &&
                isNoCostEmiEligibleFlag && (
                  <div className={styles.tabHeader}>
                    <div
                      onClick={() => this.toggleTab(NO_COST_EMI)}
                      className={clsNce}
                    >
                      No Cost EMI
                    </div>
                    <div
                      onClick={() => this.toggleTab(STANDARD_EMI)}
                      className={clsStandard}
                    >
                      Standard EMI
                    </div>
                  </div>
                )}
              {isNoCostEmiEligibleFlag &&
                this.state.isNoCostSelected && (
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
                    emiBinValidationErrorMessage={
                      this.props.emiBinValidationErrorMessage
                    }
                    isRetryPaymentFromURL={isRetryPaymentFromURL}
                    retryPaymentDetails={this.props.retryPaymentDetails}
                  />
                )}
              {isStandardEmiEligibleFlag &&
                this.state.isStandardSelected && (
                  <CheckoutEmi
                    {...this.props}
                    isDebitCard={true}
                    selectedEMIType={this.state.currentSelectedEMIType}
                    changeEmiPlan={() => this.changeEmiPlan()}
                  />
                )}
            </NoCostEmi>
          </div>
          {
            // !isJewelleryProduct
            // ? !isRetryPaymentFromURL && (
            //     <div className={styles.subListHolder}>
            //       <NoCostEmi
            //         isOpenSubEMI={
            //           this.state.currentSelectedEMIType === STANDARD_EMI
            //         }
            //         EMIText={STANDARD_EMI}
            //         onChangeEMIType={currentSelectedEMIType =>
            //           this.onChangeEMIType(currentSelectedEMIType)
            //         }
            //         getEmiBankDetails={() => this.getEmiBankDetails()}
            //         emiList={
            //           this.props.cart.emiBankDetails &&
            //           this.props.cart.emiBankDetails.bankList
            //         }
            //         onChangeCardDetail={val => this.onChangeCardDetail(val)}
            //         emiBinValidationErrorMessage={
            //           this.props.emiBinValidationErrorMessage
            //         }
            //       >
            //         <CheckoutEmi
            //           {...this.props}
            //           selectedEMIType={this.state.currentSelectedEMIType}
            //           changeEmiPlan={() => this.changeEmiPlan()}
            //         />
            //       </NoCostEmi>
            //     </div>
            //   )
            // : null
          }

          {instacredMiddleLayerISEnable && !isJewelleryProduct
            ? !isRetryPaymentFromURL && (
                <div className={styles.subListHolder}>
                  {this.props.paymentMode &&
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
  onSelectMonth: PropTypes.func
};
