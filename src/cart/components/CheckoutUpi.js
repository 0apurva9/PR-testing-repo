import React from "react";
import upiIcon from "./img/upi-checkout-img.svg";
import upi_new_icon from "./img/upi_new_icon.svg";
// import PropTypes from "prop-types";
import ManueDetails from "../../general/components/MenuDetails.js";
import { UPI } from "../../lib/constants";
import UpiForm from "./UpiForm";

export default class CheckoutUpi extends React.Component {
  render() {
    return (
      <ManueDetails
        text={UPI}
        isOpen={this.props.currentPaymentMode === UPI}
        onOpenMenu={currentPaymentMode =>
          this.props.onChange({ currentPaymentMode })
        }
        icon={upiIcon}
        secondIcon={upi_new_icon}
      >
        <UpiForm
          savedUPIidResponse={
            this.props.cart.paymentModes
              ? this.props.cart.paymentModes.savedUPIidResponse
                  .savedUPIidDetailsMap
              : []
          }
          UPIofferCalloutList={
            this.props.cart.paymentModes
              ? this.props.cart.paymentModes.UPIofferCalloutList
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
