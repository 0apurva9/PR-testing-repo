import React from "react";
import GridSelect from "../../general/components/GridSelect";
import EmiCartSelect from "./EmiCartSelect";
import EmiDisplay from "./EmiDisplay";
import CreditCardForm from "./CreditCardForm";
import PropTypes from "prop-types";
import {
  STANDARD_EMI,
  EMI_TYPE,
  EMI_TENURE,
  SELECTED_BANK_NAME
} from "../../lib/constants";
import EmiSectionDesktop from "../../pdp/components/EmiSectionDesktop";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import sortBy from "lodash.sortby";
const PAYMENT_MODE = "EMI";

const IS_EMI = "1";
export default class EmiAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planSelected: false,
      selectedEmi: this.props.cardDetails.emi_tenure
        ? this.props.cardDetails.emi_tenure
        : "",
      selectedBank: this.props.cardDetails.emi_bank
        ? this.props.cardDetails.emi_bank
        : "",
      selectedEmiRate: this.props.cardDetails.selectedEmiRate
        ? this.props.cardDetails.selectedEmiRate
        : "",
      selectedPrice: this.props.cardDetails.selectedPrice
        ? this.props.cardDetails.selectedPrice
        : "",
      selectedBankName: ""
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEMIType !== STANDARD_EMI) {
      this.setState({
        planSelected: false,
        selectedEmi: "",
        selectedBank: "",
        selectedEmiRate: "",
        selectedPrice: "",
        selectedBankName: ""
      });
    }
  }

  handleSelectPlan(val) {
    // this.props.changeEmiPlan();
    if (val) {
      this.setState({
        selectedEmiRate: val.interestRate,
        selectedEmi: val.term,
        selectedPrice: val.monthlyInstallment
      });
      if (val.term) {
        localStorage.setItem(EMI_TENURE, val.term);
      }
      this.onChangeCardDetail({
        emi_bank: this.state.selectedBank,
        emi_tenure: val.term,
        is_emi: true,
        selectedEmiRate: val.interestRate,
        selectedPrice: val.monthlyInstallment,
        selectedBankName: this.state.selectedBankName
      });
    }
  }
  handleSelectBank(val) {
    const option = this.props.emiList.filter(data => {
      return data.code === val[0];
    })[0];

    if (val.length === 0) {
      this.setState({
        selectedBank: "",
        selectedEmiRate: "",
        selectedEmi: "",
        selectedPrice: "",
        selectedBankName: ""
      });
      this.onChangeCardDetail({
        emi_bank: null,
        emi_tenure: null,
        is_emi: null,
        selectedBankName: null
      });
    } else {
      option.emitermsrate = sortBy(option.emitermsrate, bank => {
        return parseInt(bank.term, 10);
      });
      localStorage.setItem(SELECTED_BANK_NAME, option.code);
      this.setState({
        selectedBank: option.code,
        selectedEmiRate: option.emitermsrate[0].interestRate,
        selectedEmi: option.emitermsrate[0].term,
        selectedPrice: option.emitermsrate[0].monthlyInstallment,
        selectedBankName: option.emiBank
      });
      this.onChangeCardDetail({
        emi_bank: option.code,
        emi_tenure: option.emitermsrate[0].term,
        is_emi: true,
        selectedEmiRate: option.emitermsrate[0].interestRate,
        selectedPrice: option.emitermsrate[0].monthlyInstallment,
        selectedBankName: option.emiBank
      });
    }
  }
  handleConfirmPlan() {
    localStorage.setItem(EMI_TYPE, STANDARD_EMI);
    this.setState({ planSelected: true });
  }
  handleChangePlan() {
    this.props.changeEmiPlan();
    this.setState({ planSelected: false });
  }

  binValidation = (binNo, isDebitCard = false) => {
    if (this.props.binValidation) {
      this.props.binValidation(PAYMENT_MODE, binNo, isDebitCard);
    }
  };

  softReservationForPayment = cardDetails => {
    let emiBank = this.state.selectedBank;
    let emiTenure = this.state.selectedEmi;
    cardDetails.emi_bank = emiBank;
    cardDetails.emi_tenure = emiTenure;
    cardDetails.is_emi = IS_EMI;
    if (this.props.softReservationForPayment) {
      this.props.softReservationForPayment(cardDetails);
    }
  };
  onChangeCardDetail = cardDetails => {
    if (this.props.onChangeCardDetail) {
      this.props.onChangeCardDetail(cardDetails);
    }
  };
  render() {
    return (
      <React.Fragment>
        {!this.state.planSelected && (
          <React.Fragment>
            <MobileOnly>
              <GridSelect
                elementWidthMobile={100}
                offset={0}
                limit={1}
                onSelect={val => {
                  this.handleSelectBank(val);
                }}
              >
                {this.props.emiList &&
                  this.props.emiList.map((val, i) => {
                    return (
                      <EmiCartSelect
                        key={i}
                        value={val.code}
                        title={val.emiBank}
                        options={val.emitermsrate}
                        selectPlan={val => this.handleSelectPlan(val)}
                        confirmPlan={() => this.handleConfirmPlan()}
                      />
                    );
                  })}
              </GridSelect>
            </MobileOnly>
            <DesktopOnly>
              {this.props.emiList && this.props.emiList.length > 0 && (
                <EmiSectionDesktop
                  emiData={this.props.emiList}
                  showHeader={false}
                  showButton={true}
                  selectPlan={val => this.handleSelectPlan(val)}
                  selectBank={val => this.handleSelectBank(val)}
                  confirmPlan={() => this.handleConfirmPlan()}
                />
              )}
            </DesktopOnly>
          </React.Fragment>
        )}
        {this.state.planSelected && (
          <React.Fragment>
            <EmiDisplay
              bankName={this.state.selectedBankName}
              term={this.state.selectedEmi}
              emiRate={this.state.selectedEmiRate}
              price={this.state.selectedPrice}
              changePlan={() => this.handleChangePlan()}
            />
            <CreditCardForm
              buttonDisabled={this.props.creditCardValid()}
              onFocusInput={this.props.onFocusInput}
              cardDetails={this.props.cardDetails}
              onChangeCardDetail={val => this.onChangeCardDetail(val)}
              binValidation={(binNo, isDebitCard) =>
                this.binValidation(binNo, isDebitCard)
              }
              displayToast={this.props.displayToast}
              onCheckout={this.props.onCheckout}
              emiBinValidationErrorMessage={
                this.props.emiBinValidationErrorMessage
              }
              isDebitCard={this.props.isDebitCard}
              emiEligibiltyDetails={this.props.emiEligibiltyDetails}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

EmiAccordion.propTypes = {
  emiList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      emiBank: PropTypes.string,
      emitermsrate: PropTypes.arrayOf(
        PropTypes.shape({
          interestPayable: PropTypes.string,
          interestRate: PropTypes.string,
          monthlyInstallment: PropTypes.string,
          term: PropTypes.string
        })
      )
    })
  ),
  onSelect: PropTypes.func
};
