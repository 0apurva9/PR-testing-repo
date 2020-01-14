import React from "react";
import creditCardIcon from "./img/credit-card.svg";
import PropTypes from "prop-types";
import ManueDetails from "../../general/components/MenuDetails.js";
import { UPI } from "../../lib/constants";
import UpiForm from "./UpiForm";
const PAYMENT_MODE = "Credit Card";

export default class CheckoutUpi extends React.Component {
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

  jusPayTokenizeForGiftCard = cardDetails => {
    if (this.props.jusPayTokenizeForGiftCard) {
      this.props.jusPayTokenizeForGiftCard(cardDetails);
    }
  };
  onChangeCardDetail = card => {
    if (this.props.onChangeCardDetail) {
      this.props.onChangeCardDetail(card);
    }
  };
  render() {
    return (
      <ManueDetails
        text={UPI}
        isOpen={this.props.currentPaymentMode === UPI}
        onOpenMenu={currentPaymentMode =>
          this.props.onChange({ currentPaymentMode })
        }
        icon={creditCardIcon}
      >
        <UpiForm
          buttonDisabled={this.props.creditCardValid()}
          onFocusInput={this.props.onFocusInput}
          onBlur={this.props.onBlur}
          cardDetails={this.props.cardDetails}
          onChangeCvv={i => this.onChangeCvv(i)}
          binValidation={binNo => this.binValidation(binNo)}
          onChangeCardDetail={card => this.onChangeCardDetail(card)}
          onCheckout={this.props.onCheckout}
          bankGatewayStatus={
            this.props.cart &&
            this.props.cart.binValidationDetails &&
            this.props.cart.binValidationDetails.bankGatewayStatus
          }
          bankError={
            this.props.cart &&
            this.props.cart.binValidationDetails &&
            this.props.cart.binValidationDetails.errorMsg
          }
        />
      </ManueDetails>
    );
  }
}

CheckoutUpi.propTypes = {
  onChangeCvv: PropTypes.func
};
