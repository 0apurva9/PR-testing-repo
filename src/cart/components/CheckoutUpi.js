import React from "react";
import upiIcon from "./img/upi-checkout-img.svg";
import upi_new_icon from "./img/upi_new_icon.svg";
// import PropTypes from "prop-types";
import MenuDetails from "../../general/components/MenuDetails.js";
import { UPI } from "../../lib/constants";
import UpiForm from "./UpiForm";
// const plzVerifyUPIMsg = "Please verify your UPI Address to proceed";

export default class CheckoutUpi extends React.Component {
  render() {
    return (
      <MenuDetails
        text={UPI}
        isOpen={this.props.currentPaymentMode === UPI}
        openMenuUPI={currentPaymentMode =>
          this.props.onChange({ currentPaymentMode })
        }
        icon={upiIcon}
        secondIcon={upi_new_icon}
        checkUPIEligibility={cartGuidUPI =>
          this.props.checkUPIEligibility(cartGuidUPI)
        }
        cart={this.props.cart}
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
          // showHowToPay={() => this.props.showHowToPay()}
          // displayToast={() => this.props.displayToast(plzVerifyUPIMsg)}
          addUPIDetails={val => this.props.addUPIDetails(val)}
          addUserUPIStatus={this.props.addUserUPIStatus}
          loading={this.props.loading}
        />
      </MenuDetails>
    );
  }
}

// CheckoutUpi.propTypes = {
//   onChangeCvv: PropTypes.func
// };
