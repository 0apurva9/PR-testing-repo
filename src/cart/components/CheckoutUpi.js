import React from "react";
import upiIcon from "./img/upi-checkout-img.svg";
import upi_new_icon from "./img/upi_new_icon.svg";
// import PropTypes from "prop-types";
import MenuDetails from "../../general/components/MenuDetails.js";
import { UPI } from "../../lib/constants";
import UpiForm from "./UpiForm";

export default class CheckoutUpi extends React.Component {
  componentDidMount() {
    if (this.props.upiPaymentIsNewMidddleLayer) {
      this.props.upiPaymentIsNewMidddleLayer();
    }
    if (this.props.upiPaymentISEnableMidddleLayer) {
      this.props.upiPaymentISEnableMidddleLayer();
    }
    if (this.props.upiPaymentHowItWorksMidddleLayer) {
      this.props.upiPaymentHowItWorksMidddleLayer();
    }
    if (this.props.upiPaymentCombinedLogoMidddleLayer) {
      this.props.upiPaymentCombinedLogoMidddleLayer();
    }
  }

  render() {
    let isNew = false;
    let isEnabled = false;
    let combinedLogoUrl = "";
    let howUpiWorksPageId = "";
    if (
      this.props.cart &&
      this.props.cart.upiMiddleLayerIsNewStatus &&
      this.props.cart.upiMiddleLayerIsNewStatus === "success"
    ) {
      isNew =
        this.props.cart.upiMiddleLayerIsNew &&
        this.props.cart.upiMiddleLayerIsNew.applicationProperties &&
        this.props.cart.upiMiddleLayerIsNew.applicationProperties[0].value
          ? this.props.cart.upiMiddleLayerIsNew.applicationProperties[0].value
          : false;
    }
    if (
      this.props.cart &&
      this.props.cart.upiMiddleLayerIsEnableStatus &&
      this.props.cart.upiMiddleLayerIsEnableStatus === "success"
    ) {
      isEnabled =
        this.props.cart.upiMiddleLayerIsEnable &&
        this.props.cart.upiMiddleLayerIsEnable.applicationProperties &&
        this.props.cart.upiMiddleLayerIsEnable.applicationProperties[0].value
          ? this.props.cart.upiMiddleLayerIsEnable.applicationProperties[0]
              .value
          : upi_new_icon;
    }
    if (
      this.props.cart &&
      this.props.cart.upiMiddleLayerCombinedLogoStatus &&
      this.props.cart.upiMiddleLayerCombinedLogoStatus === "success"
    ) {
      combinedLogoUrl =
        this.props.cart.upiMiddleLayerCombinedLogo &&
        this.props.cart.upiMiddleLayerCombinedLogo.applicationProperties &&
        this.props.cart.upiMiddleLayerCombinedLogo.applicationProperties[0]
          .value
          ? this.props.cart.upiMiddleLayerCombinedLogo.applicationProperties[0]
              .value
          : "";
    }
    if (
      this.props.cart &&
      this.props.cart.upiMiddleLayerHowItWorksStatus &&
      this.props.cart.upiMiddleLayerHowItWorksStatus === "success"
    ) {
      howUpiWorksPageId =
        this.props.cart.upiMiddleLayerHowItWorks &&
        this.props.cart.upiMiddleLayerHowItWorks.applicationProperties &&
        this.props.cart.upiMiddleLayerHowItWorks.applicationProperties[0].value
          ? this.props.cart.upiMiddleLayerHowItWorks.applicationProperties[0]
              .value
          : "";
    }
    if (!isEnabled) {
      return null;
    } else {
      return (
        <MenuDetails
          text={UPI}
          isOpen={this.props.currentPaymentMode === UPI}
          onOpenMenu={currentPaymentMode =>
            this.props.onChange({ currentPaymentMode })
          }
          icon={upiIcon}
          secondIcon={isNew ? upi_new_icon : ""}
          checkUPIEligibility={cartGuidUPI =>
            this.props.checkUPIEligibility(cartGuidUPI)
          }
          binValidationForUPI={paymentMode =>
            this.props.binValidationForUPI(paymentMode)
          }
          cart={this.props.cart}
          isFromGiftCard={
            this.props.isFromGiftCard ? this.props.isFromGiftCard : false
          }
          retryCartGuid={
            this.props.retryCartGuid ? this.props.retryCartGuid : null
          }
        >
          <UpiForm
            savedUPIidResponse={
              this.props.cart.paymentModes &&
              this.props.cart.paymentModes.savedUpiResponse &&
              this.props.cart.paymentModes.savedUpiResponse.savedUpiDetailsMap
                ? this.props.cart.paymentModes.savedUpiResponse
                    .savedUpiDetailsMap
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
            showTermsNConditions={val => this.props.showTermsNConditions(val)}
            addUPIDetails={(val, pageType, btnType) =>
              this.props.addUPIDetails(val, pageType, btnType)
            }
            addUPIDetailsNullState={() => this.props.addUPIDetailsNullState()}
            addUserUPIStatus={this.props.addUserUPIStatus}
            addUserUPIDetails={this.props.addUserUPIDetails}
            loading={this.props.loading}
            getPaymentModes={val => this.props.getPaymentModes(val)}
            displayToast={message => this.props.displayToast(message)}
            combinedLogoUrl={combinedLogoUrl}
            howUpiWorksPageId={howUpiWorksPageId}
            whatsappSelected={this.props.whatsappSelected}
          />
        </MenuDetails>
      );
    }
  }
}
