import React from "react";
import emiIcon from "./img/emi.svg";
import PropTypes from "prop-types";
import EmiAccordion from "./EmiAccordion";
import MenuDetails from "../../general/components/MenuDetails.js";
import { SUCCESS, ERROR } from "../../lib/constants";
import styles from "./CheckoutEmi.css";
const EMI_ERROR_TEXT =
  "This order amount doesn't meet the EMI eligibility criterion.";

export default class CheckoutEmi extends React.Component {
  binValidation = (paymentMode, binNo) => {
    if (this.props.binValidation) {
      this.props.binValidation(paymentMode, binNo);
    }
  };

  getEmiBankDetails = () => {
    if (this.props.getEmiBankDetails) {
      this.props.getEmiBankDetails();
    }
  };
  onChangeCardDetail = val => {
    if (this.props.onChangeCardDetail) {
      this.props.onChangeCardDetail(val);
    }
  };
  changeEmiPlan = () => {
    if (this.props.changeEmiPlan) {
      this.props.changeEmiPlan();
    }
  };
  render() {
    return (
      <div>
        {this.props.cart.emiBankDetails &&
          this.props.cart.emiBankDetails.bankList && (
            <EmiAccordion
              onFocusInput={this.props.onFocusInput}
              selectedEMIType={this.props.selectedEMIType}
              emiList={this.props.cart.emiBankDetails.bankList}
              cardDetails={this.props.cardDetails}
              onChangeCvv={i => this.onChangeCvv(i)}
              binValidation={(paymentMode, binNo) =>
                this.binValidation(paymentMode, binNo)
              }
              onChangeCardDetail={val => this.onChangeCardDetail(val)}
              changeEmiPlan={() => this.changeEmiPlan()}
            />
          )}
        {!this.props.cart.emiBankDetails &&
          this.props.cart.emiBankStatus === ERROR && (
            <div className={styles.errorText}>{EMI_ERROR_TEXT}</div>
          )}
      </div>
    );
  }
}

CheckoutEmi.propTypes = {
  cart: PropTypes.arrayOf(
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
  onSelect: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.string)
};
