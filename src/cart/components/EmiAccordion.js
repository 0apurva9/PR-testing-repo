import React from "react";
import GridSelect from "../../general/components/GridSelect";
import EmiCartSelect from "./EmiCartSelect";
import EmiDisplay from "./EmiDisplay";
import CreditCardForm from "./CreditCardForm";
import PropTypes from "prop-types";
import { STANDARD_EMI, EMI_TYPE } from "../../lib/constants";
const PAYMENT_MODE = "EMI";

const IS_EMI = "1";
export default class EmiAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planSelected: false,
      selectedEmi: "",
      selectedBank: "",
      selectedEmiRate: "",
      selectedPrice: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEMIType !== STANDARD_EMI) {
      localStorage.removeItem(EMI_TYPE);
      this.setState({
        planSelected: false,
        selectedEmi: "",
        selectedBank: "",
        selectedEmiRate: "",
        selectedPrice: ""
      });
    }
  }

  handleSelectPlan(val) {
    console.log(val);
    if (val) {
      this.setState({
        selectedEmiRate: val.interestRate,
        selectedEmi: val.term,
        selectedPrice: val.monthlyInstallment
      });
      this.onChangeCardDetail({
        emi_bank: this.state.selectedBank,
        emi_tenure: val.term,
        is_emi: 2
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
        selectedPrice: ""
      });
      this.onChangeCardDetail({
        emi_bank: null,
        emi_tenure: null,
        is_emi: null
      });
    } else {
      this.setState({
        selectedBank: option.emiBank,
        selectedEmiRate: option.emitermsrate[0].interestRate,
        selectedEmi: option.emitermsrate[0].term,
        selectedPrice: option.emitermsrate[0].monthlyInstallment
      });
    }
  }
  handleConfirmPlan() {
    localStorage.setItem(EMI_TYPE, STANDARD_EMI);
    this.setState({ planSelected: true });
  }
  handleChangePlan() {
    this.setState({ planSelected: false });
  }

  binValidation = binNo => {
    if (this.props.binValidation) {
      this.props.binValidation(PAYMENT_MODE, binNo);
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
        )}
        {this.state.planSelected && (
          <React.Fragment>
            <EmiDisplay
              bankName={this.state.selectedBank}
              term={this.state.selectedEmi}
              emiRate={this.state.selectedEmiRate}
              price={this.state.selectedPrice}
              changePlan={() => this.handleChangePlan()}
            />
            <CreditCardForm
              onFocusInput={this.props.onFocusInput}
              cardDetails={this.props.cardDetails}
              onChangeCardDetail={val => this.onChangeCardDetail(val)}
              binValidation={binNo => this.binValidation(binNo)}
              displayToast={this.props.displayToast}
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
