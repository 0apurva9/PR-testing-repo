import React from "react";
import netBankingIcon from "./img/netBanking.svg";
import PropTypes from "prop-types";
import NetBanking from "./NetBanking.js";
import ManueDetails from "../../general/components/MenuDetails.js";
import filter from "lodash/filter";
const PAYMENT_MODE = "Netbanking";
export default class CheckoutNetBanking extends React.Component {
  binValidationForNetBank = bankName => {
    if (this.props.binValidationForNetBank) {
      this.props.binValidationForNetBank(PAYMENT_MODE, bankName);
    }
  };

  softReservationPaymentForNetBanking = cardDetails => {
    if (this.props.softReservationPaymentForNetBanking) {
      this.props.softReservationPaymentForNetBanking(cardDetails);
    }
  };
  createJusPayOrderForGiftCardNetBanking = cardDetails => {
    if (this.props.createJusPayOrderForGiftCardNetBanking) {
      this.props.createJusPayOrderForGiftCardNetBanking(cardDetails);
    }
  };

  render() {
    let validNetBankingDetails;
    if (
      this.props.cart.netBankDetails &&
      this.props.cart.netBankDetails.bankList
    ) {
      validNetBankingDetails = filter(
        this.props.cart.netBankDetails.bankList,
        bank => {
          return bank.isAvailable === "true";
        }
      );
    }

    return (
      <ManueDetails text="Net banking" icon={netBankingIcon}>
        <NetBanking
          onSelect={val => console.log(val)}
          selected={["1"]}
          bankList={validNetBankingDetails}
          binValidationForNetBank={bankName =>
            this.binValidationForNetBank(bankName)
          }
          softReservationPaymentForNetBanking={cardDetails =>
            this.softReservationPaymentForNetBanking(cardDetails)
          }
          isFromGiftCard={this.props.isFromGiftCard}
          createJusPayOrderForGiftCardNetBanking={cardDetails =>
            this.createJusPayOrderForGiftCardNetBanking(cardDetails)
          }
        />
      </ManueDetails>
    );
  }
}
