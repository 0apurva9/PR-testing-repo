import React from "react";
import creditCardIcon from "./img/credit-card.svg";
import PropTypes from "prop-types";
import CreditCardForm from "./CreditCardForm.js";
import ManueDetails from "../../general/components/MenuDetails.js";
const PAYMENT_MODE = "Credit Card";

export default class CheckoutCreditCard extends React.Component {
  onChangeCvv(i) {
    if (this.props.onChangeCvv) {
      this.props.onChangeCvv(i);
    }
  }

  binValidation = binNo => {
    if (this.props.binValidation) {
      this.props.binValidation(PAYMENT_MODE, binNo);
    }
  };

  softReservationForPayment = cardDetails => {
    if (this.props.softReservationForPayment) {
      this.props.softReservationForPayment(cardDetails);
    }
  };

  render() {
    return (
      <ManueDetails text="Credit Card" icon={creditCardIcon}>
        <CreditCardForm
          onChangeCvv={i => this.onChangeCvv(i)}
          binValidation={binNo => this.binValidation(binNo)}
          softReservationForPayment={cardDetails =>
            this.softReservationForPayment(cardDetails)
          }
        />
      </ManueDetails>
    );
  }
}

CheckoutCreditCard.propTypes = {
  onChangeCvv: PropTypes.func
};
