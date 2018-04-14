import React from "react";
import filter from "lodash/filter";
import CliqCashToggle from "./CliqCashToggle";
import styles from "./PaymentCardWrapper.css";
import CheckoutEmi from "./CheckoutEmi.js";
import CheckoutCreditCard from "./CheckoutCreditCard.js";
import CheckoutDebitCard from "./CheckoutDebitCard.js";
import CheckoutNetbanking from "./CheckoutNetbanking.js";
import CheckoutSavedCard from "./CheckoutSavedCard.js";
import CheckoutCOD from "./CheckoutCOD.js";
import { PAYTM } from "../../lib/constants";
import PaytmOption from "./PaytmOption.js";
import {
  setDataLayerForCheckoutDirectCalls,
  ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_ON,
  ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_OFF
} from "../../lib/adobeUtils";
let cliqCashToggleState = false;

// prettier-ignore
const typeComponentMapping = {
  "Credit Card": props => <CheckoutCreditCard {...props} />,
    "Debit Card": props => <CheckoutDebitCard {...props} />,
    "Netbanking": props => <CheckoutNetbanking {...props} />,
     "COD": props => <CheckoutCOD {...props}/>,
    "EMI": props => <CheckoutEmi {...props} />,
    "PAYTM": props => <PaytmOption {...props} />,
};

export default class PaymentCardWrapper extends React.Component {
  componentDidMount = () => {
    if (this.props.getPaymentModes && !this.props.cart.paymentModes) {
      this.props.getPaymentModes();
    }
    if (
      this.props.getCODEligibility &&
      !this.props.cart.codEligibilityDetails
    ) {
      this.props.getCODEligibility();
    }
  };
  binValidationForPaytm(val) {
    if (this.props.binValidationForPaytm) {
      this.props.binValidationForPaytm(PAYTM, "", val);
    }
  }
  renderPaymentCard = datumType => {
    return (
      <React.Fragment>
        {typeComponentMapping[datumType] &&
          typeComponentMapping[datumType]({ ...this.props })}
      </React.Fragment>
    );
  };

  renderPaymentCardsComponents() {
    let paymentModesToDisplay = filter(
      this.props.cart.paymentModes.paymentModes,
      modes => {
        return modes.value === true;
      }
    );
    return paymentModesToDisplay.map((feedDatum, i) => {
      return this.renderPaymentCard(feedDatum.key, i);
    });
  }

  binValidationForSavedCard = cardDetails => {
    if (this.props.binValidationForSavedCard) {
      this.props.binValidationForSavedCard(cardDetails);
    }
  };
  renderSavedCards = () => {
    return (
      <CheckoutSavedCard
        binValidationForSavedCard={cardDetails =>
          this.binValidationForSavedCard(cardDetails)
        }
        saveCardDetails={
          this.props.cart.paymentModes.savedCardResponse.savedCardDetailsMap
        }
      />
    );
  };

  handleClick = toggleState => {
    cliqCashToggleState = toggleState;
    if (toggleState) {
      setDataLayerForCheckoutDirectCalls(ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_ON);
      this.props.applyCliqCash();
    } else {
      setDataLayerForCheckoutDirectCalls(ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_OFF);
      this.props.removeCliqCash();
    }
  };

  addGiftCard = () => {
    if (this.props.addGiftCard) {
      this.props.addGiftCard();
    }
  };

  render() {
    if (this.props.cart.paymentModes) {
      return (
        <div className={styles.base}>
          {this.props.isRemainingBalance && this.renderSavedCards()}
          {!this.props.isFromGiftCard && (
            <div>
              {" "}
              <CliqCashToggle
                cashText="Use My CLiQ Cash Balance"
                price={this.props.cliqCashAmount}
                value={this.props.cliqCashAmount}
                active={cliqCashToggleState}
                onToggle={val => this.handleClick(val)}
                isFromGiftCard={this.props.isFromGiftCard}
                addGiftCard={() => this.addGiftCard()}
              />
            </div>
          )}
          {this.props.isRemainingBalance &&
            this.props.cart.paymentModes &&
            this.renderPaymentCardsComponents()}
        </div>
      );
    } else {
      return null;
    }
  }
}
