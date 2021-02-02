import React from "react";
import styles from "./NoCostEmiBankDetails.css";
import CheckBox from "../../general/components/CheckBox.js";
import BankSelect from "./BankSelect";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import EmiDisplay from "./EmiDisplay";
import CreditCardForm from "./CreditCardForm";
import {
    NO_COST_EMI,
    RUPEE_SYMBOL,
    SUCCESS,
    NO_COST_EMI_COUPON,
    EMI_TENURE,
    SELECTED_BANK_NAME,
} from "../../lib/constants";
import DesktopOnly from "../../general/components/DesktopOnly";
import Button from "../../general/components/Button";
import { Link } from "react-router-dom";
export default class NoCostEmiBankDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBankIndex: null,
            selectedMonth: (this.props.cardDetails && this.props.cardDetails.selectedMonth) || "",
            showAll: false,
            selectedBankName:
                this.props.cardDetails && this.props.cardDetails.emi_bank ? this.props.cardDetails.emi_bank : "",
            selectedBankCode: (this.props.cardDetails && this.props.cardDetails.emi_bank) || "",
            selectedCouponCode: null,
            selectedTenure: (this.props.cardDetails && this.props.cardDetails.emi_tenure) || "",
            selectedFromDropDown: false,
            noCostEmiText: "",
            emiInfo: "",
        };
    }

    async componentDidUpdate(prevProps) {
        if (this.props.noCostEmiProductCount !== prevProps.noCostEmiProductCount) {
            if (this.props.noCostEmiProductCount > 0) {
                if (parseInt(this.props.noCostEmiProductCount, 10) === this.props.totalProductCount) {
                    this.setState({
                        noCostEmiText: ``,
                    });
                } else {
                    this.setState({
                        noCostEmiText: `*No Cost EMI available only on ${this.props.noCostEmiProductCount} product(s). Standard EMI will apply to products, if any, bought along with it.`,
                    });
                }
                this.getDataForRetryPage();
            }
        }

        if (this.props.noCostEmiProductCount === prevProps.noCostEmiProductCount && !this.state.selectedBankName) {
            this.getDataForRetryPage();
        }
    }

    getDataForRetryPage() {
        if (this.props.isRetryPaymentFromURL && this.props.bankList && this.props.bankList[0]) {
            let bankLists = this.props.bankList[0];
            this.retryBankSelectTenure(0, bankLists);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.selectedEMIType && nextProps.selectedEMIType !== NO_COST_EMI) {
            this.setState({
                selectedBankIndex: null,
                selectedMonth: null,
                showAll: false,
                selectedBankName: null,
                selectedCode: null,
                selectedCouponCode: null,
                selectedTenure: null,
                selectedFromDropDown: false,
                emiInfo: "",
            });
        }

        if (
            nextProps.isNoCostEmiApplied &&
            !this.state.selectedCouponCode &&
            this.props.noCostEmiProductCount !== nextProps.noCostEmiProductCount
        ) {
            let bankObject =
                this.props.bankList && this.props.bankList.find(bank => bank.bankCode === this.state.selectedBankCode);
            bankObject = bankObject ? bankObject : {};
            let selectedMonth;
            let emiTenureObj =
                bankObject.noCostEMICouponList &&
                bankObject.noCostEMICouponList.find((emi, i) => {
                    if (emi.emicouponCode === localStorage.getItem(NO_COST_EMI_COUPON)) {
                        selectedMonth = i;
                        return true;
                    }
                    return false;
                });
            emiTenureObj = emiTenureObj ? emiTenureObj : {};
            this.setState({
                selectedMonth,
                selectedCouponCode: emiTenureObj.emicouponCode,
                selectedTenure: emiTenureObj.tenure,
            });
            this.onChangeCardDetail({
                is_emi: true,
                emi_bank: this.state.selectedBankCode,
                emi_tenure: emiTenureObj.tenure,
                selectedMonth,
                selectedCouponCode: emiTenureObj.emicouponCode,
                selectedBankName: this.state.selectedBankName,
            });
        }
        if (nextProps.cardDetails !== this.props.cardDetails) {
            if (Object.keys(nextProps.cardDetails).length == 0) {
                this.setState({
                    selectedBankIndex: null,
                    selectedMonth: null,
                    showAll: false,
                    selectedBankName: null,
                    selectedCode: null,
                    selectedCouponCode: null,
                    selectedTenure: null,
                    selectedFromDropDown: false,
                });
            }
        }
    }

    selectOtherBank(val) {
        if (this.props.removeNoCostEmi && this.state.selectedCouponCode && this.state.selectedCouponCode !== "") {
            this.props.removeNoCostEmi(this.state.selectedCouponCode);
        }

        const selectedBankName = val.label;
        const selectedBankIndex = val.value;

        localStorage.setItem(SELECTED_BANK_NAME, selectedBankName);

        const selectedBankCodeObj = this.props.bankList.find(bank => bank.bankName === val.label);
        let selectedCode;
        if (selectedBankCodeObj) {
            selectedCode = selectedBankCodeObj.code;
        }
        this.setState({
            selectedBankIndex: selectedBankIndex,
            selectedBankName: selectedBankName,
            selectedBankCode: selectedBankCodeObj.bankCode,
            selectedCode,
            selectedFromDropDown: true,
            selectedMonth: null,
            emiInfo: selectedBankCodeObj.emiInfo ? selectedBankCodeObj.emiInfo : null,
        });
    }

    itemBreakup() {
        let emiInfo;
        if (this.props.cardDetails && this.props.cardDetails.emi_bank) {
            this.props.bankList &&
                this.props.bankList.map(bankSelected => {
                    if (bankSelected.bankCode === this.props.cardDetails.emi_bank) {
                        emiInfo =
                            this.props.noCostEmiDetails &&
                            this.props.noCostEmiDetails.cartAmount &&
                            this.props.noCostEmiDetails.cartAmount.emiInfo;
                    }
                });
        }
        if (this.props.retryPaymentDetails && this.props.bankList && this.props.bankList[0].emiInfo) {
            if (this.props.bankList[0].bankCode === this.props.cardDetails.emi_bank) {
                emiInfo = this.props.bankList[0].emiInfo;
            }
        }
        if (this.props.getItemBreakUpDetails) {
            this.props.getItemBreakUpDetails(
                this.state.selectedCouponCode,
                this.state.noCostEmiText,
                this.props.noCostEmiProductCount,
                emiInfo
            );
        }
    }

    handleSelect(index, code) {
        let selectedFromDropDown = false;
        if (this.props.isRetryPaymentFromURL) {
            selectedFromDropDown = true;
        }
        if (this.props.removeNoCostEmi && this.state.selectedCouponCode && this.state.selectedCouponCode !== "") {
            this.props.removeNoCostEmi(this.state.selectedCouponCode);
        }
        if (this.state.selectedFromDropDown === true) {
            this.setState({
                selectedBankIndex: null,
                selectedBankName: null,
                selectedCode: null,
                selectedFromDropDown: false,
                selectedTenure: null,
                emiInfo: null,
            });
        }
        let selectedBankCodeObj = this.props.bankList.find(bank => bank.code === code);
        if (selectedBankCodeObj) {
            localStorage.setItem(SELECTED_BANK_NAME, selectedBankCodeObj.bankName);
            this.setState({
                selectedBankIndex: index,
                selectedMonth: null,
                selectedBankName: selectedBankCodeObj.bankName,
                selectedCode: selectedBankCodeObj.code,
                selectedBankCode: selectedBankCodeObj.bankCode,
                bankName: null,
                selectedFromDropDown: selectedFromDropDown,
                emiInfo: selectedBankCodeObj.emiInfo ? selectedBankCodeObj.emiInfo : null,
            });
        }
        if (window && window.digitalData) {
            Object.assign(window.digitalData, {
                checkout: {
                    ...window.digitalData.checkout,
                    bank: {
                        name: selectedBankCodeObj.bankName,
                    },
                },
            });
        }
    }

    termsAndCondition() {
        if (this.props.getEmiTermsAndConditionsForBank) {
            this.props.getEmiTermsAndConditionsForBank(this.state.selectedCode, this.state.selectedBankName);
        }
    }

    binValidation = (paymentMode, binNo, isDebitCard = false) => {
        if (this.props.binValidation) {
            this.props.binValidation(paymentMode, binNo, isDebitCard);
        }
    };

    softReservationForPayment = cardDetails => {
        if (this.props.softReservationForPayment) {
            this.props.softReservationForPayment(cardDetails);
        }
    };

    onChangeCardDetail = card => {
        if (this.props.onChangeCardDetail) {
            this.props.onChangeCardDetail(card);
        }
    };

    noCostEMIClick() {
        localStorage.setItem("emiType", "No Cost EMI");
        this.props.onCheckout();
    }

    async applyNoCostEmi(index, val) {
        if (val && this.props.applyNoCostEmi) {
            const applyNoCostEmiReponse = await this.props.applyNoCostEmi(
                val.emicouponCode,
                this.state.selectedBankName
            );
            if (applyNoCostEmiReponse && applyNoCostEmiReponse.status && applyNoCostEmiReponse.status === SUCCESS) {
                this.setState({
                    selectedMonth: index,
                    selectedCouponCode: val.emicouponCode,
                    selectedTenure: val.tenure,
                });
                if (val.tenure) {
                    localStorage.setItem(EMI_TENURE, val.tenure);
                }
                this.onChangeCardDetail({
                    is_emi: true,
                    emi_bank: this.state.selectedBankCode,
                    emi_tenure: val.tenure,
                    selectedMonth: index,
                    selectedCouponCode: val.emicouponCode,
                    selectedBankName: this.state.selectedBankName,
                });
            } else {
                this.setState({
                    selectedMonth: null,
                    selectedCouponCode: null,
                    selectedTenure: null,
                });
            }
        }
    }

    async onSelectMonth(index, val, event, noCostEMICouponList) {
        if (this.props.isNoCostEmiApplied && noCostEMICouponList.length <= 1) {
            return;
        }
        if (this.state.selectedBankName !== "Other Bank") {
            if (this.props.removeNoCostEmi && this.state.selectedCouponCode && this.state.selectedMonth !== null) {
                const removeNoCostEmiResponce = await this.props.removeNoCostEmi(this.state.selectedCouponCode);
                if (removeNoCostEmiResponce.status === SUCCESS) {
                    if (this.state.selectedMonth !== index) {
                        this.applyNoCostEmi(index, val);
                    }
                    this.setState({
                        selectedMonth: null,
                        selectedCouponCode: null,
                        selectedTenure: null,
                    });
                }
            } else {
                if (this.props.isRetryPaymentFromURL) {
                    this.setState({
                        selectedMonth: index,
                        selectedCouponCode: val.emicouponCode,
                        selectedTenure: val.tenure,
                    });
                    if (val.tenure) {
                        localStorage.setItem(EMI_TENURE, val.tenure);
                    }
                    this.onChangeCardDetail({
                        is_emi: true,
                        emi_bank: this.state.selectedBankCode,
                        emi_tenure: val.tenure,
                        selectedMonth: index,
                        selectedCouponCode: val.emicouponCode,
                        selectedBankName: this.state.selectedBankName,
                    });
                } else {
                    this.applyNoCostEmi(index, val);
                }
            }
        }
        if (window && window.digitalData) {
            Object.assign(window.digitalData, {
                checkout: {
                    ...window.digitalData.checkout,
                    tenure: {
                        value: val.tenure,
                    },
                },
            });
        }
    }

    async retryBankSelectTenure(index, val) {
        if (this.state.selectedBankName !== "Other Bank") {
            let selectedFromDropDown = false;
            if (this.props.isRetryPaymentFromURL) {
                selectedFromDropDown = true;
            }
            let selectedBankCodeObj = this.props.bankList.find(bank => bank.code === val.code);

            await this.setState({
                selectedBankIndex: index,
                selectedMonth: null,
                selectedBankName: selectedBankCodeObj.bankName,
                selectedCode: selectedBankCodeObj.code,
                selectedBankCode: selectedBankCodeObj.bankCode,
                bankName: null,
                selectedCouponCode:
                    selectedBankCodeObj.noCostEMICouponList &&
                    selectedBankCodeObj.noCostEMICouponList[0] &&
                    selectedBankCodeObj.noCostEMICouponList[0].emicouponCode,
                selectedFromDropDown: selectedFromDropDown,
                emiInfo: selectedBankCodeObj.emiInfo ? selectedBankCodeObj.emiInfo : null,
            });

            if (val.noCostEMICouponList && val.noCostEMICouponList[0]) {
                let noCostEMICouponList = val.noCostEMICouponList[0];
                this.setState({
                    selectedMonth: index,
                    selectedTenure: noCostEMICouponList.tenure,
                });
                if (noCostEMICouponList.tenure) {
                    localStorage.setItem(EMI_TENURE, noCostEMICouponList.tenure);
                }
                this.onChangeCardDetail({
                    is_emi: true,
                    emi_bank: this.state.selectedBankCode,
                    emi_tenure: noCostEMICouponList.tenure,
                    selectedMonth: index,
                    selectedCouponCode: noCostEMICouponList.emicouponCode,
                    selectedBankName: this.state.selectedBankName,
                });
            }
        }
    }

    changeEmiPlan = () => {
        if (this.props.changeEmiPlan) {
            this.props.changeEmiPlan();
        }
    };

    renderMonthsPlan(noCostEmiDetails) {
        return (
            <div className={styles.monthsPlanDataHolder}>
                <div className={styles.amountPlaneForMonth}>
                    {noCostEmiDetails &&
                        noCostEmiDetails.noCostEMIOrderValue &&
                        noCostEmiDetails.noCostEMIOrderValue.value && (
                            <div className={styles.amountData}>
                                <div className={styles.amountLabel}>Order Value</div>
                                <div className={styles.amount}>{`â‚¹${Math.round(
                                    noCostEmiDetails.noCostEMIOrderValue.value * 100
                                ) / 100}`}</div>
                            </div>
                        )}
                    {noCostEmiDetails &&
                        noCostEmiDetails.noCostEMIInterestValue &&
                        noCostEmiDetails.noCostEMIInterestValue.value && (
                            <div className={styles.amountData}>
                                <div className={styles.amountLabel}>Interest (charged by bank)</div>
                                <div className={styles.amount}>{`â‚¹ ${Math.round(
                                    noCostEmiDetails.noCostEMIInterestValue.value * 100
                                ) / 100}`}</div>
                            </div>
                        )}

                    {noCostEmiDetails &&
                        noCostEmiDetails.noCostEMIDiscountValue &&
                        noCostEmiDetails.noCostEMIDiscountValue.value && (
                            <div className={styles.discount}>
                                <div className={styles.amountLabel}>No Cost EMI Discount</div>
                                <div className={styles.amountDiscount}>{`-â‚¹ ${Math.round(
                                    noCostEmiDetails.noCostEMIDiscountValue.value * 100
                                ) / 100}`}</div>
                            </div>
                        )}
                    {noCostEmiDetails &&
                        noCostEmiDetails.noCostEMIConvCharge &&
                        noCostEmiDetails.noCostEMIConvCharge.value > 0 &&
                        noCostEmiDetails.noCostEMIConvCharge.value && (
                            <div className={styles.amountData} data-test="bank-conv-fee-test">
                                <div className={styles.amountLabel}>Bank Convenience Fees</div>
                                <div className={styles.amount}>{`â‚¹ ${Math.round(
                                    noCostEmiDetails.noCostEMIConvCharge.value
                                )}`}</div>
                            </div>
                        )}
                </div>
                <div className={styles.totalAmountDisplay}>
                    {noCostEmiDetails &&
                        noCostEmiDetails.noCostEMITotalPayable &&
                        noCostEmiDetails.noCostEMITotalPayable.value && (
                            <div className={styles.totalAmountLabel}>
                                <div className={styles.amountPayble}>Total Amount Payable to Bank</div>
                                <div className={styles.amount}>{`â‚¹ ${Math.round(
                                    noCostEmiDetails.noCostEMITotalPayable.value * 100
                                ) / 100}`}</div>
                            </div>
                        )}
                    {noCostEmiDetails &&
                        noCostEmiDetails.noCostEMIPerMonthPayable &&
                        noCostEmiDetails.noCostEMIPerMonthPayable.value && (
                            <div className={styles.totalAmountLabel}>
                                <div className={styles.amountLabel}>EMI p.m</div>
                                <div className={styles.amountEmi}>{`â‚¹ ${Math.round(
                                    noCostEmiDetails.noCostEMIPerMonthPayable.value * 100
                                ) / 100}`}</div>
                            </div>
                        )}
                </div>
                <div className={styles.itemLevelButtonHolder}>
                    {noCostEmiDetails &&
                        noCostEmiDetails.noCostEMIPerMonthPayable &&
                        noCostEmiDetails.noCostEMIPerMonthPayable.value && (
                            <div className={styles.itemLevelButton}>
                                <UnderLinedButton
                                    size="14px"
                                    fontFamily="regular"
                                    color="#000"
                                    label="Item Level Breakup"
                                    onClick={() => this.itemBreakup()}
                                />
                            </div>
                        )}
                    <DesktopOnly>
                        {this.props.isNoCostEmiApplied && !this.props.isNoCostEmiProceeded && (
                            <div className={styles.buttonHolder}>
                                <div className={styles.button}>
                                    <Button
                                        type="primary"
                                        backgroundColor="#ff1744"
                                        height={40}
                                        label="Continue"
                                        width={150}
                                        textStyle={{
                                            color: "#FFF",
                                            fontSize: 14,
                                        }}
                                        onClick={() => this.noCostEMIClick()}
                                    />
                                </div>
                            </div>
                        )}
                    </DesktopOnly>
                </div>
            </div>
        );
    }

    changeNoCostEmiPlan() {
        this.setState({
            selectedBankIndex: null,
            selectedMonth: null,
            showAll: false,
            selectedBankName: null,
            selectedBankCode: null,
            selectedCouponCode: null,
            selectedTenure: null,
        });
        this.changeEmiPlan();
        this.props.changeNoCostEmiPlan();
    }

    render() {
        let modifiedBankList;
        let filteredBankListWithLogo =
            this.props.bankList &&
            this.props.bankList
                .filter(bank => {
                    return bank.logoUrl;
                })
                .slice(0, 4);
        let filteredBankListWithOutLogo =
            this.props.bankList && this.props.bankList.filter(val => !filteredBankListWithLogo.includes(val));

        if (this.state.selectedCode) {
            modifiedBankList = this.props.bankList.find(bank => bank.code === this.state.selectedCode);
        }

        let noCostEmiDetails = this.props.noCostEmiDetails && this.props.noCostEmiDetails.cartAmount;
        if (!noCostEmiDetails) {
            noCostEmiDetails = this.props.retryPaymentDetails && this.props.retryPaymentDetails.cartAmount;
        }

        return (
            <div className={styles.base}>
                <div className={styles.bankText}>
                    Tata CLiQ does not levy any charges on EMIs taken. Charges, if any, are levied by your bank
                </div>
                {!this.props.isNoCostEmiProceeded && (
                    <div>
                        <div className={styles.bankLogoHolder}>
                            {filteredBankListWithLogo &&
                                filteredBankListWithLogo
                                    .filter((val, i) => {
                                        return !this.state.showAll ? i < 4 : true;
                                    })
                                    .map((val, i) => {
                                        return (
                                            <div className={styles.bankLogo} key={i}>
                                                <BankSelect
                                                    image={val.logoUrl}
                                                    value={val.code}
                                                    name={val.bankName}
                                                    key={i}
                                                    selectItem={() => this.handleSelect(i, val.code)}
                                                    selected={this.state.selectedCode === val.code}
                                                    isRetryPaymentFromURL={this.props.isRetryPaymentFromURL}
                                                />
                                            </div>
                                        );
                                    })}
                        </div>
                        {filteredBankListWithOutLogo && filteredBankListWithOutLogo.length > 0 && (
                            <div className={styles.selectHolder}>
                                <SelectBoxMobile2
                                    height={33}
                                    placeholder={!this.props.isRetryPaymentFromURL ? "Other Bank" : ""}
                                    backgroundColor="#fff"
                                    isEnable={this.state.selectedFromDropDown}
                                    options={filteredBankListWithOutLogo.map((val, i) => {
                                        return {
                                            value: i,
                                            label: val.bankName,
                                        };
                                    })}
                                    onChange={val => this.selectOtherBank(val)}
                                />
                            </div>
                        )}

                        {this.state.selectedBankIndex !== null && (
                            <div className={styles.emiDetailsPlan}>
                                {this.state.noCostEmiText !== "" && (
                                    <div className={styles.labelHeader}>{this.state.noCostEmiText}</div>
                                )}
                                <div className={styles.monthsLabel}>Tenure (Months)</div>
                                <div className={styles.monthsHolder}>
                                    {modifiedBankList &&
                                        modifiedBankList.noCostEMICouponList &&
                                        modifiedBankList.noCostEMICouponList.map((val, i) => {
                                            return (
                                                <div
                                                    className={styles.monthWithCheckbox}
                                                    key={i}
                                                    value={val.emicouponCode}
                                                    onClick={event =>
                                                        this.onSelectMonth(
                                                            i,
                                                            val,
                                                            event,
                                                            modifiedBankList.noCostEMICouponList
                                                        )
                                                    }
                                                >
                                                    <div className={styles.checkbox}>
                                                        <CheckBox selected={this.state.selectedMonth === i} />
                                                    </div>
                                                    {`${val.tenure} Months`}
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        )}

                        <div>
                            {!this.props.isRetryPaymentFromURL &&
                                this.state.selectedBankName !== null &&
                                this.state.emiInfo && <div className={styles.charges}>{this.state.emiInfo}</div>}
                            {!this.props.isRetryPaymentFromURL &&
                                this.state.selectedMonth !== null &&
                                this.state.selectedMonth !== "" &&
                                this.props.noCostEmiDetails &&
                                this.renderMonthsPlan(this.props.noCostEmiDetails.cartAmount)}
                        </div>
                        {this.state.selectedMonth !== null &&
                            this.props.isRetryPaymentFromURL &&
                            this.props.retryPaymentDetails && (
                                <div>
                                    {this.props.retryPaymentDetails &&
                                        this.props.bankList &&
                                        this.props.bankList[0].emiInfo && (
                                            <div className={styles.charges}>{this.props.bankList[0].emiInfo}</div>
                                        )}
                                    {this.renderMonthsPlan(this.props.retryPaymentDetails.cartAmount)}
                                </div>
                            )}
                        {/* {this.state.selectedBankCode &&
                    this.state.selectedBankIndex !== null && ( */}
                        <div className={styles.itemLevelButtonHolder}>
                            {this.props.isDebitCard && this.props.dcwPageId && (
                                <React.Fragment>
                                    <Link
                                        to={{
                                            pathname: `https://www.tatacliq.com/` + this.props.dcwPageId,
                                        }}
                                        target="_blank"
                                    >
                                        <div className={styles.knowMoreText}>
                                            Know more about Debit Card EMI &#9432;
                                        </div>
                                    </Link>
                                </React.Fragment>
                            )}
                            {this.state.selectedBankCode &&
                                this.state.selectedBankIndex !== null &&
                                this.props.isDebitCard && (
                                    <div className={styles.tncText} onClick={() => this.termsAndCondition()}>
                                        View T&C
                                    </div>
                                )}
                            {this.state.selectedBankCode &&
                                this.state.selectedBankIndex !== null &&
                                !this.props.isDebitCard && (
                                    <React.Fragment>
                                        <div className={styles.itemLevelButton}>
                                            <UnderLinedButton
                                                size="14px"
                                                fontFamily="regular"
                                                color="#000"
                                                label="View T&C"
                                                onClick={() => this.termsAndCondition()}
                                            />
                                        </div>
                                    </React.Fragment>
                                )}
                        </div>
                        {/* )} */}
                    </div>
                )}

                {this.props.isNoCostEmiProceeded && (
                    <React.Fragment>
                        <EmiDisplay
                            bankName={this.state.selectedBankName}
                            term={this.state.selectedTenure}
                            emiRate="No Cost"
                            price={
                                noCostEmiDetails &&
                                noCostEmiDetails.noCostEMIPerMonthPayable &&
                                `${RUPEE_SYMBOL} ${Math.round(noCostEmiDetails.noCostEMIPerMonthPayable.value * 100) /
                                    100}`
                            }
                            isRetryPaymentFromURL={this.props.isRetryPaymentFromURL}
                            changePlan={() => this.changeNoCostEmiPlan()}
                        />
                        <CreditCardForm
                            emiBinValidationErrorMessage={this.props.emiBinValidationErrorMessage}
                            buttonDisabled={this.props.creditCardValid()}
                            onFocusInput={this.props.onFocusInput}
                            onChangeCvv={i => this.onChangeCvv(i)}
                            binValidation={(binNo, isDebitCard) => this.binValidation(binNo, isDebitCard)}
                            onChangeCardDetail={cardDetails => this.onChangeCardDetail(cardDetails)}
                            displayToast={this.props.displayToast}
                            cardDetails={this.props.cardDetails}
                            onCheckout={this.props.onCheckout}
                            isDebitCard={this.props.isDebitCard}
                            emiEligibiltyDetails={this.props.emiEligibiltyDetails}
                        />
                    </React.Fragment>
                )}
            </div>
        );
    }
}