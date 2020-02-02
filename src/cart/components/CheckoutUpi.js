import React from "react";
import upiIcon from "./img/upi-checkout-img.svg";
import upi_new_icon from "./img/upi_new_icon.svg";
// import PropTypes from "prop-types";
import MenuDetails from "../../general/components/MenuDetails.js";
import { UPI } from "../../lib/constants";
import UpiForm from "./UpiForm";

export default class CheckoutUpi extends React.Component {
  async componentDidMount() {
    if (this.props.upiPaymentIsNewMidddleLayer) {
      this.props.upiPaymentIsNewMidddleLayer();
    }
    if (this.props.upiPaymentISEnableMidddleLayerDetails) {
      this.props.upiPaymentISEnableMidddleLayerDetails();
    }
  }
  render() {
    return (
      <MenuDetails
        text={UPI}
        isOpen={this.props.currentPaymentMode === UPI}
        onOpenMenu={currentPaymentMode =>
          this.props.onChange({ currentPaymentMode })
        }
        icon={upiIcon}
        secondIcon={upi_new_icon}
        checkUPIEligibility={cartGuidUPI =>
          this.props.checkUPIEligibility(cartGuidUPI)
        }
        binValidationForUPI={paymentMode =>
          this.props.binValidationForUPI(paymentMode)
        }
        cart={this.props.cart}
      >
        <UpiForm
          savedUPIidResponse={
            this.props.cart.paymentModes &&
            this.props.cart.paymentModes.savedUpiResponse &&
            this.props.cart.paymentModes.savedUpiResponse.savedUpiDetailsMap
              ? this.props.cart.paymentModes.savedUpiResponse.savedUpiDetailsMap
              : []
          }
          UPIofferCalloutList={
            this.props.cart.paymentModes &&
            this.props.cart.paymentModes.upiOffers &&
            this.props.cart.paymentModes.upiOffers.upiOfferCalloutList
              ? this.props.cart.paymentModes.upiOffers.upiOfferCalloutList
              : []
          }
          onCheckout={this.props.onCheckout}
          showTermsNConditions={() => this.props.showTermsNConditions()}
          addUPIDetails={(val, pageType) =>
            this.props.addUPIDetails(val, pageType)
          }
          addUPIDetailsNullState={() => this.props.addUPIDetailsNullState()}
          addUserUPIStatus={this.props.addUserUPIStatus}
          addUserUPIDetails={this.props.addUserUPIDetails}
          loading={this.props.loading}
        />
      </MenuDetails>
    );
  }
}

// CheckoutUpi.propTypes = {
//   onChangeCvv: PropTypes.func
// };
