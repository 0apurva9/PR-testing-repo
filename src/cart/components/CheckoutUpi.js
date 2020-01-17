import React from "react";
import creditCardIcon from "./img/credit-card.svg";
// import PropTypes from "prop-types";
import ManueDetails from "../../general/components/MenuDetails.js";
import {
  UPI,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS
} from "../../lib/constants";
import UpiForm from "./UpiForm";
import * as Cookie from "../../lib/Cookie";

export default class CheckoutUpi extends React.Component {
  componentDidMount() {
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (customerCookie && userDetails) {
      if (this.props.getSavedCardDetails) {
        this.props.getSavedCardDetails(
          JSON.parse(userDetails).userName,
          JSON.parse(customerCookie).access_token
        );
      }
    }
  }

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
          savedUpi={
            this.props.savedCards
              ? this.props.savedCards.savedUpiDetailsMap
              : []
          }
          onCheckout={this.props.onCheckout}
          showTermsNConditions={() => this.props.showTermsNConditions()}
          showHowToPay={() => this.props.showHowToPay()}
        />
      </ManueDetails>
    );
  }
}

// CheckoutUpi.propTypes = {
//   onChangeCvv: PropTypes.func
// };
