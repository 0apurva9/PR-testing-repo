import React from "react";
import ReactDOM from "react-dom";
import ModalPanel from "./ModalPanel";
import Loadable from "react-loadable";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import PriceBreakupModal from "../../pdp/components/PriceBreakupModal";
import BankOfferTNCModal from "../../cart/components/BankOfferTNCModal";
import OrderModal from "../../account/components/OrderModal";
import * as Cookie from "../../lib/Cookie.js";
import CliqCashModuleContainer from "../../account/containers/CliqCashModuleContainer";
import DatePickerModule from "../../account/components/DatePickerModule";
import CliqCashKnowMore from "../../account/components/CliqCashKnowMore";
import {
  LOGGED_IN_USER_DETAILS,
  SUCCESS,
  BANK_COUPON_COOKIE,
  COUPON_COOKIE,
  NO_COST_EMI_COUPON,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  PRODUCT_CART_ROUTER,
  DEFAULT_PIN_CODE_LOCAL_STORAGE
} from "../../lib/constants.js";
import ItemLevelPopup from "../../cart/components/ItemLevelPopup.js";
import TermsAndConditionsModal from "../../cart/components/TermsAndConditionsModal.js";
import GoToCartPopUp from "../../pdp/components/GoToCartPopUp";
import { LOGIN_PATH } from "../../lib/constants";
import * as UserAgent from "../../lib/UserAgent.js";
import DesktopAuth from "../../auth/components/DesktopAuth.js";
import CashBackDetailsPopupContainer from "../containers/CashBackDetailsPopupContainer";
// import Cliq2CallPopUp from "../../account/components/Cliq2CallPopUp";
import CustomerQueryErrorModal from "../../account/components/CustomerQueryErrorModal";
import TimeSlotPopUp from "../../account/components/TimeSlotPopUp";
const modalRoot = document.getElementById("modal-root");
const GenerateOtp = "GenerateOtpForEgv";
const RestorePasswords = "RestorePassword";
const DesktopLogin = "DesktopAuth";
const MINIMUM_PASSWORD_LENGTH = 8;
const OLD_PASSWORD_TEXT = "Please enter old password";
const NEW_PASSWORD_TEXT = "Please enter new password";
const PASSWORD_LENGTH_TEXT = "Password length should be minimum 8 character";
const CONFIRM_PASSWORD_TEXT = "Please confirm your passowrd";
const PASSWORD_MATCH_TEXT = "Password did not match";
const OLD_NEW_PASSWORD_MATCH_TEXT = "Current and New password cannot be same";
const OfferModal = "OfferDetailsModal";
const Loader = () => {
  return (
    <div>
      <SecondaryLoader />
    </div>
  );
};

const NewPassword = Loadable({
  loader: () => import("../../auth/components/NewPassword"),
  loading() {
    return <Loader />;
  }
});
const CustomerQueryPopUp = Loadable({
  loader: () => import("../../account/components/CustomerQueryPopUp"),
  loading() {
    return <Loader />;
  }
});
const RestorePassword = Loadable({
  loader: () => import("../../auth/components/RestorePassword"),
  loading() {
    return <Loader />;
  }
});

const OtpVerification = Loadable({
  loader: () => import("../../auth/components/OtpVerification"),
  loading() {
    return <Loader />;
  }
});

const ConnectDetailsWithModal = Loadable({
  loader: () => import("../../home/components/ConnectDetailsWithModal"),
  loading() {
    return <Loader />;
  }
});

const Sort = Loadable({
  loader: () => import("../../plp/components/SortModal"),
  loading() {
    return <Loader />;
  }
});

const SizeGuideModal = Loadable({
  loader: () => import("../../pdp/components/SizeGuideModal"),
  loading() {
    return <Loader />;
  }
});

const SizeSelectorForEyeWear = Loadable({
  loader: () => import("../../pdp/components/SizeSelectorForEyeWear"),
  loading() {
    return <Loader />;
  }
});

const StoryWidgetContainer = Loadable({
  loader: () => import("../../home/containers/StoryWidgetContainer"),
  loading() {
    return <Loader />;
  }
});
const AddressModalContainer = Loadable({
  loader: () => import("../../plp/containers/AddressModalContainer"),
  loading() {
    return <Loader />;
  }
});

const EmiModal = Loadable({
  loader: () => import("../../pdp/containers/EmiListContainer"),
  loading() {
    return <Loader />;
  }
});

const BundledProductModal = Loadable({
  loader: () => import("../../pdp/containers/BundledProductContainer"),
  loading() {
    return <Loader />;
  }
});

const OfferDetailsModal = Loadable({
  loader: () => import("../../pdp/components/OfferDetailsModal"),
  loading() {
    return <Loader />;
  }
});

const BeautyOfferDetailsModal = Loadable({
  loader: () =>
    import(
      "../../pdp/components/PdpBeautyDesktop/ImageGalleryContentComponents/ProductDetailsSection/BeautyOfferDetailsModal"
    ),
  loading() {
    return <Loader />;
  }
});

const BeautyPdpImageZoomIn = Loadable({
  loader: () =>
    import(
      "../../pdp/components/PdpBeautyDesktop/ImageGalleryContentComponents/ProductDetailsSection/BeautyPdpImageZoomIn"
    ),
  loading() {
    return <Loader />;
  }
});

const TermsNConditionsWrapperModal = Loadable({
  loader: () => import("../../pdp/components/TermsNConditionsWrapperModal"),
  loading() {
    return <Loader />;
  }
});

const ExchangeModal = Loadable({
  loader: () => import("../../pdp/components/ExchangeModal"),
  loading() {
    return <Loader />;
  }
});

const ExchangeTnCModal = Loadable({
  loader: () => import("../../pdp/components/ExchangeTnCModal"),
  loading() {
    return <Loader />;
  }
});

const ProductCouponDetails = Loadable({
  loader: () => import("../../pdp/components/ProductCouponDetails.js"),
  loading() {
    return <Loader />;
  }
});

const SizeSelectModal = Loadable({
  loader: () => import("../../pdp/containers/SizeSelectModalContainer.js"),
  loading() {
    return <Loader />;
  }
});

const ManufacturerDetailsModal = Loadable({
  loader: () => import("../../pdp/components/ManufacturerDetailsModal.js"),
  loading() {
    return <Loader />;
  }
});
const ReviewGuidelineWrapperModal = Loadable({
  loader: () => import("../../pdp/components/ReviewGuidelineWrapperModal.js"),
  loading() {
    return <Loader />;
  }
});
const RatingAndReviewWrapperModal = Loadable({
  loader: () => import("../../pdp/components/RatingAndReviewWrapperModal.js"),
  loading() {
    return <Loader />;
  }
});
const BankOffersDetails = Loadable({
  loader: () => import("../../cart/components/BankOffersDetails.js"),
  loading() {
    return <Loader />;
  }
});

const GiftCardModal = Loadable({
  loader: () => import("../../cart/components/GiftCardModal"),
  loading() {
    return <Loader />;
  }
});

const UpdateRefundDetailsPopup = Loadable({
  loader: () => import("../../account/components/UpdateRefundDetailsPopup.js"),
  loading() {
    return <Loader />;
  }
});

const ShowReturnConfirmPopup = Loadable({
  loader: () => import("../../account/components/ShowReturnConfirmPopup.js"),
  loading() {
    return <Loader />;
  }
});

const ShowDeliveryConfirmPopup = Loadable({
  loader: () => import("../../account/components/ShowDeliveryConfirmPopup.js"),
  loading() {
    return <Loader />;
  }
});

const KycApplicationFormWithBottomSlideModal = Loadable({
  loader: () =>
    import("../../account/components/KycApplicationFormWithBottomSlideModal"),
  loading() {
    return <Loader />;
  }
});

const KycDetailPopUpWithBottomSlideModal = Loadable({
  loader: () =>
    import("../../account/components/KycDetailPopUpWithBottomSlideModal"),
  loading() {
    return <Loader />;
  }
});

const InvalidCouponPopupContainer = Loadable({
  loader: () => import("../../cart/containers/InvalidCouponPopUpContainer"),
  loading() {
    return <Loader />;
  }
});
const ValidateOffersPopUpContainer = Loadable({
  loader: () => import("../../cart/containers/ValidateOffersPopUpContainer"),
  loading() {
    return <Loader />;
  }
});

const CancelOrderPopUp = Loadable({
  loader: () => import("../../account/components/CancelOrderPopUp.js"),
  loading() {
    return <Loader />;
  }
});
const CliqCashAndNoCostEmiPopup = Loadable({
  loader: () => import("../../cart/components/CliqCashAndNoCostEmiPopup.js"),
  loading() {
    return <Loader />;
  }
});
const ChangePasswordForDesktop = Loadable({
  loader: () => import("../../general/components/ChangePasswordForDesktop"),
  loading() {
    return <Loader />;
  }
});
const CliqAndPiq = Loadable({
  loader: () => import("../../pdp/containers/CliqAndPiqModalContainer.js"),
  loading() {
    return <Loader />;
  }
});

const SimilarProductsModal = Loadable({
  loader: () => import("../containers/SimilarProductsModalContainer.js"),
  loading() {
    return <Loader />;
  }
});

const SimilarProductsOOSModal = Loadable({
  loader: () => import("../containers/SimilarProductsOOSModalContainer.js"),
  loading() {
    return <Loader />;
  }
});

const SizeSelectorOOSModal = Loadable({
  loader: () => import("./SizeSelectorOOSModalWrapper.js"),
  loading() {
    return <Loader />;
  }
});
const NotificationConfirmation = Loadable({
  loader: () => import("../../general/components/NotificationConfirmation.js"),
  loading() {
    return <Loader />;
  }
});

const CancelReturnRequestPopUp = Loadable({
  loader: () => import("../../account/components/CancelReturnRequestPopUp.js"),
  loading() {
    return <Loader />;
  }
});
/**
 * @comment Added below code for showing popup on the UPI section on the checkout page.
 */
const UpiTermsAndCondition = Loadable({
  loader: () => import("../../cart/components/UpiTermsAndCondition.js"),
  loading() {
    return <Loader />;
  }
});
const UpiHowToPay = Loadable({
  loader: () => import("../../cart/components/UpiHowToPay.js"),
  loading() {
    return <Loader />;
  }
});
/**
 * EOD
 */

const GiftCardSucessBottomModel = Loadable({
  loader: () => import("../../account/components/GiftCardSucessBottomModel"),
  loading() {
    return <Loader />;
  }
});

const SellerReviewSubmitRemovalPopup = Loadable({
  loader: () =>
    import("../../account/components/SellerReviewSubmitRemovalPopup.js"),
  loading() {
    return <Loader />;
  }
});

const ExchangeRemoveModal = Loadable({
  loader: () => import("../../cart/components/ExchangeRemoveModal"),
  loading() {
    return <Loader />;
  }
});

const ProductInBagModal = Loadable({
  loader: () => import("../../pdp/components/ProductInBagModal"),
  loading() {
    return <Loader />;
  }
});

const ChangeExchangeCashabackModal = Loadable({
  loader: () => import("../../cart/components/ChangeExchangeCashabackModal"),
  loading() {
    return <Loader />;
  }
});

const Cliq2CallPopUp = Loadable({
  loader: () => import("../../account/components/Cliq2CallPopUp"),
  loading() {
    return <Loader />;
  }
});

const CustomerCallQuerySuccess = Loadable({
  loader: () => import("../../account/components/CustomerCallSuccessModal"),
  loading() {
    return <Loader />;
  }
});

const AppliancesExchangeModal = Loadable({
  loader: () => import("../../pdp/components/AppliancesExchangeModal"),
  loading() {
    return <Loader />;
  }
});

export default class ModalRoot extends React.Component {
  constructor(props) {
    super(props);

    this.el = document.createElement("div");
    this.state = {
      loggedIn: false,
      customerDetails: null
    };
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  UNSAFE_componentWillMount() {
    if (this.props.history) {
      this.unlisten = this.props.history.listen((location, action) => {
        this.handleClose();
      });
    }
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    this.unlisten();
  }

  handleClose() {
    if (this.props.hidePdpPiqPage) {
      this.props.hidePdpPiqPage();
    }
    if (this.props.hideModal) {
      this.props.hideModal();
    }
  }
  handleOfferModalClose(data) {
    if (data.showVoucherModal && this.props.hideModal) {
      this.props.hideModal();
      // ValidityState;
      this.props.showModal(OfferModal, { ...data });
    } else if (this.props.hideModal) {
      this.props.hideModal();
    }
  }
  onUpdate(val) {
    if (this.props.submitSelfCourierReturnInfo) {
      const returnDetails = {};
      returnDetails.awbNumber = val.awbNumber;
      returnDetails.lpname = val.logisticsPartner;
      returnDetails.amount = val.courierCharge;
      returnDetails.orderId = this.props.ownProps.orderId;
      returnDetails.transactionId = this.props.ownProps.transactionId;
      returnDetails.file = val.file;
      this.props.submitSelfCourierReturnInfo(returnDetails);
    }
  }
  onConfirmReturn(val) {
    this.props.updateReturnForHOTC(val);
  }
  submitOtp(otpDetails) {
    this.props.otpVerification(otpDetails, this.props.ownProps);
  }
  resendOTP(userObj) {
    this.props.hideModal();
    this.props.resendOTP(userObj);
  }
  resetPassword(userDetails) {
    this.props.resetPassword(userDetails);
  }

  handleRestoreClick(userDetails) {
    if (userDetails === "") {
      this.props.displayToast("Please Enter Valid Email Id");
    } else {
      if (userDetails !== "") {
        this.props.forgotPassword(userDetails);
      } else {
        this.props.hideModal();
      }
    }
  }
  submitOtpForgotPassword(otpDetails) {
    this.props.forgotPasswordOtpVerification(otpDetails, this.props.ownProps);
  }
  applyBankOffer = couponCode => {
    this.props.hideModal();
    return this.props.applyBankOffer(couponCode);
  };
  releaseBankOffer = (previousCouponCode, newCouponCode) => {
    this.props.hideModal();
    return this.props.releaseBankOffer(previousCouponCode, newCouponCode);
  };

  resendOtpForLogin = userDetails => {
    if (this.props.loginUser) {
      this.props.loginUser(userDetails);
    }
  };
  releasePreviousAndApplyNewBankOffer = (
    previousCouponCode,
    newSelectedCouponCode
  ) => {
    this.props.releasePreviousAndApplyNewBankOffer(
      previousCouponCode,
      newSelectedCouponCode
    );
  };
  applyUserCoupon = couponCode => {
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    this.props.hideModal();
    if (userDetails) {
      return this.props.applyUserCouponForLoggedInUsers(couponCode);
    } else {
      return this.props.applyUserCouponForAnonymous(couponCode);
    }
  };
  releaseUserCoupon = (oldCouponCode, newCouponCode) => {
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    this.props.hideModal();
    if (userDetails) {
      return this.props.releaseUserCoupon(oldCouponCode, newCouponCode);
    } else {
      return this.props.releaseCouponForAnonymous(oldCouponCode, newCouponCode);
    }
  };

  getUserAddress = () => {
    this.props.getUserAddress();
  };

  submitOtpForUpdateProfile(otpDetails) {
    this.props.updateProfile(this.props.ownProps, otpDetails);
    this.props.hideModal();
  }

  generateOtpForCliqCash = kycDetails => {
    this.setState(kycDetails);
    if (this.props.getOtpToActivateWallet) {
      return this.props.getOtpToActivateWallet(kycDetails, true);
    }
  };
  verifyOtpForCliqCash = otpDetails => {
    let customerDetailsWithOtp = {};
    customerDetailsWithOtp.firstName = this.state.firstName;
    customerDetailsWithOtp.mobileNumber = this.state.mobileNumber;
    customerDetailsWithOtp.lastName = this.state.lastName;
    customerDetailsWithOtp.otp = otpDetails;
    if (this.props.verifyWallet) {
      this.props.verifyWallet(customerDetailsWithOtp, true);
    }
  };

  resendOtp = () => {
    if (this.props.getOtpToActivateWallet) {
      this.props.hideModal();
      let kycDetails = {};
      kycDetails.firstName = this.state.firstName;
      kycDetails.lastName = this.state.lastName;
      kycDetails.mobileNumber = this.state.mobileNumber;
      this.props.getOtpToActivateWallet(kycDetails);
    }
  };

  generateOtpForEgv = () => {
    this.props.generateOtpForEgv();
  };
  verifyOtp(val) {
    let customerDetailsWithOtp = {};
    customerDetailsWithOtp.firstName = this.state.firstName;
    customerDetailsWithOtp.mobileNumber = this.state.mobileNumber;
    customerDetailsWithOtp.lastName = this.state.lastName;
    customerDetailsWithOtp.otp = val;
    this.props.verifyWallet(customerDetailsWithOtp);
  }
  wrongNumber() {
    this.props.hideModal();
    this.props.showModal(GenerateOtp);
  }
  generateOtp(val) {
    let customerDetails = {};
    customerDetails.firstName = val.firstName;
    customerDetails.mobileNumber = val.mobileNumber;
    customerDetails.lastName = val.lastName;
    this.setState(customerDetails);
    return this.props.getOtpToActivateWallet(customerDetails);
  }
  resendOtp() {
    let customerDetails = {};
    customerDetails.firstName = this.state.firstName;
    customerDetails.mobileNumber = this.state.mobileNumber;
    customerDetails.lastName = this.state.lastName;
    this.props.getOtpToActivateWallet(customerDetails);
  }
  resendOtpForUpdateProfile = () => {
    this.handleClose();
    this.props.updateProfile(this.props.ownProps);
  };

  addGiftCard = val => {
    if (this.props.redeemCliqVoucher) {
      this.props.redeemCliqVoucher(val, true);
    }
  };
  onClickWrongNumber() {
    this.props.showModal(RestorePasswords);
  }

  navigateToLogin = url => {
    this.handleClose();
    this.props.setUrlToRedirectToAfterAuth(url);
    if (UserAgent.checkUserAgentIsMobile()) {
      this.props.history.push(LOGIN_PATH);
    } else {
      this.props.showModal(DesktopLogin);
    }
  };
  updateProfile(passwordDetails) {
    const oldPassword = passwordDetails.oldPassword;
    const newPassword = passwordDetails.newPassword;
    const confirmedPassword = passwordDetails.confirmPassword;
    if (!oldPassword) {
      this.props.displayToast(OLD_PASSWORD_TEXT);
      return false;
    }
    if (!newPassword) {
      this.props.displayToast(NEW_PASSWORD_TEXT);
      return false;
    }
    if (newPassword.length < MINIMUM_PASSWORD_LENGTH) {
      this.props.displayToast(PASSWORD_LENGTH_TEXT);
      return false;
    }
    if (!confirmedPassword) {
      this.props.displayToast(CONFIRM_PASSWORD_TEXT);
      return false;
    }
    if (newPassword !== confirmedPassword) {
      this.props.displayToast(PASSWORD_MATCH_TEXT);
    }
    if (oldPassword === newPassword) {
      this.props.displayToast(OLD_NEW_PASSWORD_MATCH_TEXT);
      return false;
    } else {
      this.props.changePassword(passwordDetails);
    }
  }
  cancelOrderProduct = (cancelProductDetails, productDetails) => {
    this.props.cancelProduct(cancelProductDetails, productDetails);
  };
  updateReturnCancellation = data => {
    this.props.updateReturnCancellation(data);
  };
  goToCartPage(productCode) {
    const defaultPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
    this.props.history.push({
      pathname: PRODUCT_CART_ROUTER,
      state: {
        ProductCode: productCode,
        pinCode: defaultPinCode
      }
    });
  }

  goToHomePage() {
    this.handleClose();
  }
  continueWithoutBankCoupon = async () => {
    const bankCouponCode = localStorage.getItem(BANK_COUPON_COOKIE);
    const userCouponCode = localStorage.getItem(COUPON_COOKIE);
    const noCostEmiCoupon = localStorage.getItem(NO_COST_EMI_COUPON);
    let cartDetailsLoggedInUser = Cookie.getCookie(
      CART_DETAILS_FOR_LOGGED_IN_USER
    );

    if (this.props.ownProps && this.props.ownProps.couponCode) {
      if (this.props.ownProps.couponCode === bankCouponCode) {
        const releaseCouponCode = await this.props.releaseBankOffer(
          bankCouponCode
        );
        if (releaseCouponCode.status === SUCCESS) {
          localStorage.removeItem(BANK_COUPON_COOKIE);
          this.props.ownProps.redoCreateJusPayApi();
          this.props.hideModal();
        }
      } else if (this.props.ownProps.couponCode === userCouponCode) {
        const releaseCouponCode = await this.props.releaseUserCoupon(
          userCouponCode
        );
        if (releaseCouponCode.status === SUCCESS) {
          localStorage.removeItem(COUPON_COOKIE);
          this.props.ownProps.redoCreateJusPayApi();
          this.props.hideModal();
        }
      } else if (this.props.ownProps.couponCode === noCostEmiCoupon) {
        let carGuId = JSON.parse(cartDetailsLoggedInUser).guid;
        let cartId = JSON.parse(cartDetailsLoggedInUser).code;

        const releaseCouponCode = await this.props.removeNoCostEmi(
          noCostEmiCoupon,
          carGuId,
          cartId
        );
        if (releaseCouponCode.status === SUCCESS) {
          this.props.ownProps.redoCreateJusPayApi();
          this.props.hideModal();
        }
      }
    } else {
      let carGuId = JSON.parse(cartDetailsLoggedInUser).guid;
      let cartId = JSON.parse(cartDetailsLoggedInUser).code;

      Promise.all([
        bankCouponCode && this.props.releaseBankOffer(bankCouponCode),
        userCouponCode && this.props.releaseUserCoupon(userCouponCode),
        noCostEmiCoupon &&
          this.props.removeNoCostEmi(noCostEmiCoupon, carGuId, cartId)
      ]).then(res => {
        localStorage.removeItem(BANK_COUPON_COOKIE);
        localStorage.removeItem(COUPON_COOKIE);
        this.props.ownProps.redoCreateJusPayApi();
        this.props.hideModal();
      });
    }
  };

  subscribeWhatsapp = () => {
    if (this.props.subscribeWhatsapp) {
      this.props.subscribeWhatsapp();
    }
  };

  updateProductState(data) {
    this.props.updateProductState(data);
  }

  verifyIMEINumber(
    IMEINumber,
    exchangeProductId,
    exchangeAmountCashify,
    tulBump,
    pickUpCharge,
    listingId,
    ussId
  ) {
    return this.props.verifyIMEINumber(
      IMEINumber,
      exchangeProductId,
      exchangeAmountCashify,
      tulBump,
      pickUpCharge,
      listingId,
      ussId
    );
  }

  addProductToCart(productDetails) {
    return this.props.addProductToCart(productDetails);
  }

  async removeExchange(data) {
    return await this.props.removeExchange(data);
  }

  render() {
    //  const couponCode = localStorage.getItem(BANK_COUPON_COOKIE);
    const MODAL_COMPONENTS = {
      RestorePassword: (
        <RestorePassword
          handleCancel={() => this.handleClose()}
          handleRestoreClick={userId => this.handleRestoreClick(userId)}
          displayToast={message => this.props.displayToast(message)}
        />
      ),
      NewPassword: (
        <NewPassword
          userObj={this.props.ownProps}
          displayToast={message => this.props.displayToast(message)}
          handleCancel={() => this.handleClose()}
          onContinue={userDetails => this.resetPassword(userDetails)}
        />
      ),
      SignUpOtpVerification: (
        <OtpVerification
          userObj={this.props.ownProps}
          closeModal={() => this.handleClose()}
          resendOtp={userObj => this.resendOTP(userObj)}
          submitOtp={otpDetails => this.submitOtp(otpDetails)}
          onClickWrongNumber={() => this.handleClose()}
        />
      ),
      UpdateProfileOtpVerification: (
        <OtpVerification
          userObj={this.props.ownProps}
          closeModal={() => this.handleClose()}
          submitOtp={otpDetails => this.submitOtpForUpdateProfile(otpDetails)}
          resendOtp={userName =>
            this.resendOtpForUpdateProfile(this.props.ownProps)
          }
          onClickWrongNumber={() => this.handleClose()}
        />
      ),
      ShowReturnConfirmPopup: (
        <ShowReturnConfirmPopup
          closeModal={() => this.handleClose()}
          onConfirmReturn={val => this.onConfirmReturn(val)}
          {...this.props.ownProps}
        />
      ),
      ShowDeliveryConfirmPopup: (
        <ShowDeliveryConfirmPopup closeModal={() => this.handleClose()} />
      ),
      ForgotPasswordOtpVerification: (
        <OtpVerification
          closeModal={() => this.handleClose()}
          submitOtp={otpDetails => this.submitOtpForgotPassword(otpDetails)}
          userObj={this.props.ownProps}
          resendOtp={userName => this.handleRestoreClick(userName)}
          onClickWrongNumber={() => this.onClickWrongNumber()}
        />
      ),
      UpdateRefundDetailsPopup: (
        <UpdateRefundDetailsPopup
          closeModal={() => this.handleClose()}
          onUpdate={val => this.onUpdate(val)}
          {...this.props.ownProps}
          displayToast={this.props.displayToast}
        />
      ),
      Sort: <Sort />,
      Address: (
        <AddressModalContainer
          closeModal={() => this.handleClose()}
          {...this.props.ownProps}
        />
      ),
      ConnectDetails: (
        <ConnectDetailsWithModal
          closeModal={() => this.handleClose()}
          {...this.props.ownProps}
        />
      ),
      Coupons: (
        <ProductCouponDetails
          closeModal={() => this.handleClose()}
          applyUserCoupon={couponCode => this.applyUserCoupon(couponCode)}
          releaseUserCoupon={(couponCode, newCouponCode) =>
            this.releaseUserCoupon(couponCode, newCouponCode)
          }
          {...this.props.ownProps}
          navigateToLogin={url =>
            this.navigateToLogin(url, { ...this.props.ownProps })
          }
        />
      ),
      GoToCartPagePopUp: (
        <GoToCartPopUp
          {...this.props.ownProps}
          goToCartPage={productCode => this.goToCartPage(productCode)}
          goToHomePage={() => this.goToHomePage()}
        />
      ),

      Cliq2CallPopUp: (
        <Cliq2CallPopUp
          {...this.props.ownProps}
          genesysCallConfigData={this.props.genesysCallConfigData}
          genesysDataLoader={this.props.genesysCallConfigDataLoading}
          closeModal={() => this.handleClose()}
          showModal={this.props.showModal}
          getGenesysCallConfigData={() => this.props.getGenesysCallConfigData()}
          showSecondaryLoader={this.props.showSecondaryLoader}
        />
      ),

      CustomerQueryErrorModal: (
        <CustomerQueryErrorModal
          {...this.props.ownProps}
          closeModal={() => this.handleClose()}
          goToHomePage={() => this.goToHomePage()}
        />
      ),

      CustomerCallQuerySuccess: (
        <CustomerCallQuerySuccess
          callSuccessData={this.props.ownProps}
          closeModal={() => this.handleClose()}
          goToHomePage={() => this.goToHomePage()}
        />
      ),

      TimeSlotPopUp: (
        <TimeSlotPopUp
          {...this.props.ownProps}
          genesysCallConfigData={this.props.genesysCallConfigData}
          closeModal={() => this.handleClose()}
          goToHomePage={() => this.goToHomePage()}
        />
      ),

      BankOffers: (
        <BankOffersDetails
          closeModal={() => this.handleClose()}
          applyBankOffer={couponCode => this.applyBankOffer(couponCode)}
          releaseBankOffer={(couponCode, newCouponCode) =>
            this.releaseBankOffer(couponCode, newCouponCode)
          }
          {...this.props.ownProps}
          resetAllPaymentModes={this.props.resetAllPaymentModes}
          displayToast={message => this.props.displayToast(message)}
        />
      ),
      generateOtpForCliqCash: (
        <KycApplicationFormWithBottomSlideModal
          closeModal={() => this.handleClose()}
          generateOtp={KycDetails => this.generateOtpForCliqCash(KycDetails)}
          {...this.props.ownProps}
          loadingForGetOtpToActivateWallet={
            this.props.loadingForGetOtpToActivateWallet
          }
          displayToast={message => this.props.displayToast(message)}
        />
      ),
      verifyOtpForCliqCash: (
        <KycDetailPopUpWithBottomSlideModal
          closeModal={() => this.handleClose()}
          mobileNumber={this.state.mobileNumber}
          submitOtp={otpDetails =>
            this.verifyOtpForCliqCash(otpDetails, this.props.ownProps)
          }
          {...this.props.ownProps}
          resendOtp={val => this.resendOtp(val, this.props.ownProps)}
          loadingForVerifyWallet={this.props.loadingForVerifyWallet}
          wrongNumber={() => this.wrongNumber()}
        />
      ),
      SizeGuide: <SizeGuideModal closeModal={() => this.handleClose()} />,
      SizeSelectorForEyeWear: (
        <SizeSelectorForEyeWear closeModal={() => this.handleClose()} />
      ),

      StoryModal: (
        <StoryWidgetContainer
          closeModal={() => this.handleClose()}
          {...this.props.ownProps}
        />
      ),
      GenerateOtpForEgv: (
        <KycApplicationFormWithBottomSlideModal
          closeModal={() => this.handleClose()}
          generateOtp={val => this.generateOtp(val, this.props.ownProps)}
          {...this.props.ownProps}
          loadingForGetOtpToActivateWallet={
            this.props.loadingForGetOtpToActivateWallet
          }
          displayToast={message => this.props.displayToast(message)}
        />
      ),
      verifyOtp: (
        <KycDetailPopUpWithBottomSlideModal
          closeModal={() => this.handleClose()}
          mobileNumber={this.state.mobileNumber}
          submitOtp={val => this.verifyOtp(val, this.props.ownProps)}
          resendOtp={val => this.resendOtp(val, this.props.ownProps)}
          wrongNumber={() => this.wrongNumber()}
          {...this.props.ownProps}
          loadingForVerifyWallet={this.props.loadingForVerifyWallet}
        />
      ),
      cliqCashModule: (
        <CliqCashModuleContainer
          {...this.props.ownProps}
          closeModal={() => this.handleClose()}
          displayToast={message => this.props.displayToast(message)}
        />
      ),
      cashBackDetailsPopup: (
        <CashBackDetailsPopupContainer
          data={this.props.ownProps}
          closeModal={() => this.handleClose()}
        />
      ),
      cliqcashknowmore: (
        <CliqCashKnowMore
          {...this.props.ownProps}
          closeModal={() => this.handleClose()}
        />
      ),
      datePickerModule: (
        <DatePickerModule
          {...this.props.ownProps}
          closeModal={() => this.handleClose()}
          displayToast={message => this.props.displayToast(message)}
        />
      ),
      cliqCashSucessModule: (
        <GiftCardSucessBottomModel
          {...this.props.ownProps}
          closeModal={() => this.handleClose()}
          history={this.props.history}
          displayToast={message => this.props.displayToast(message)}
        />
      ),
      TermsAndConditionForBankOffer: (
        <BankOfferTNCModal
          bankOfferTncDetails={this.props.bankOfferTncDetails}
          getTNCForBankOffer={() => this.props.getTNCForBankOffer()}
          closeModal={() => this.handleClose()}
        />
      ),
      EmiModal: <EmiModal />,
      OtpLoginModal: (
        <OtpVerification
          submitOtp={val => this.props.loginUser(val)}
          {...this.props.ownProps}
          userObj={this.props.ownProps}
          closeModal={() => this.handleClose()}
          resendOtp={userDetails => this.resendOtpForLogin(userDetails)}
          onClickWrongNumber={() => this.handleClose()}
        />
      ),
      SizeSelector: (
        <SizeSelectModal
          {...this.props.ownProps}
          history={this.props.history}
          closeModal={() => this.handleClose()}
        />
      ),
      GiftCardModal: (
        <GiftCardModal
          closeModal={() => this.handleClose()}
          addGiftCard={val => this.addGiftCard(val)}
          loading={this.props.loading}
        />
      ),
      ManufacturerModal: (
        <ManufacturerDetailsModal
          closeModal={() => this.handleClose()}
          {...this.props.ownProps}
        />
      ),
      ReviewGuidelineWrapperModal: (
        <ReviewGuidelineWrapperModal
          {...this.props.ownProps}
          closeModal={() => this.handleClose()}
        />
      ),
      RatingAndReviewWrapperModal: (
        <RatingAndReviewWrapperModal
          closeModal={() => this.handleClose()}
          {...this.props.ownProps}
          userRating={this.props.userRating}
        />
      ),
      OfferDetailsModal: (
        <OfferDetailsModal
          closeModal={() => this.handleClose()}
          {...this.props.ownProps}
        />
      ),
      BeautyOfferDetailsModal: (
        <BeautyOfferDetailsModal
          closeModal={() => this.handleClose()}
          {...this.props.ownProps}
        />
      ),
      BeautyPdpImageZoomIn: (
        <BeautyPdpImageZoomIn
          closeModal={() => this.handleClose()}
          zoomImgList={this.props.ownProps && this.props.ownProps.zoomImgList}
          position={this.props.ownProps && this.props.ownProps.position}
        />
      ),
      BundledProductModal: (
        <BundledProductModal
          closeModal={() => this.handleClose()}
          {...this.props.ownProps}
        />
      ),
      TermsNConditionsWrapperModal: (
        <TermsNConditionsWrapperModal
          closeModal={data => this.handleOfferModalClose(data)}
          {...this.props.ownProps}
        />
      ),
      ExchangeModal: (
        <ExchangeModal
          closeModal={() => this.handleClose()}
          updateProductState={data => this.updateProductState(data)}
          verifyIMEINumber={(
            IMEINumber,
            exchangeProductId,
            exchangeAmountCashify,
            tulBump,
            pickUpCharge,
            listingId,
            ussId
          ) =>
            this.verifyIMEINumber(
              IMEINumber,
              exchangeProductId,
              exchangeAmountCashify,
              tulBump,
              pickUpCharge,
              listingId,
              ussId
            )
          }
          addProductToCart={productDetails =>
            this.props.addProductToCart(productDetails)
          }
          {...this.props.ownProps}
          history={this.props.history}
          displayToast={this.props.displayToast}
        />
      ),
      ExchangeTnCModal: (
        <ExchangeTnCModal
          history={this.props.history}
          closeTnCModal={() => this.handleClose()}
        />
      ),
      NoCostEmiItemBreakUp: (
        <ItemLevelPopup
          emiItemDetails={this.props.ownProps}
          closeModal={() => this.handleClose()}
        />
      ),
      EmiTermsAndConditions: (
        <TermsAndConditionsModal
          emiTermsAndConditions={this.props.ownProps}
          closeModal={() => this.handleClose()}
        />
      ),
      INVALID_BANK_COUPON_POPUP: (
        <InvalidCouponPopupContainer
          {...this.props.ownProps}
          closeModal={() => this.handleClose()}
          changePaymentMethod={() => this.handleClose()}
          // continueWithoutCoupon={() => this.continueWithoutBankCoupon()}
        />
      ),
      PriceBreakup: (
        <PriceBreakupModal
          data={this.props.ownProps}
          closeModal={() => this.handleClose()}
        />
      ),
      OrderModal: (
        <OrderModal
          data={this.props.ownProps}
          closeModal={() => this.handleClose()}
        />
      ),
      CancelOrderPopUp: (
        <CancelOrderPopUp
          data={this.props.ownProps}
          loadingForCancelProduct={this.props.loadingForCancelProduct}
          cancelModal={() => this.handleClose()}
          cancelProduct={(cancelProductDetails, productDetails) =>
            this.cancelOrderProduct(cancelProductDetails, productDetails)
          }
        />
      ),
      CliqCashAndNoCostEmiPopup: (
        <CliqCashAndNoCostEmiPopup
          {...this.props.ownProps}
          handleClose={() => this.handleClose()}
          removeNoCostEmi={couponCode => this.props.removeNoCostEmi(couponCode)}
          continueWithNoCostEmi={() => this.handleClose()}
        />
      ),
      DesktopAuth: (
        <DesktopAuth
          closeModal={() => this.handleClose()}
          redirectToAfterAuthUrl={this.props.redirectToAfterAuthUrl}
        />
      ),
      ChangePasswordForDesktop: (
        <ChangePasswordForDesktop
          closeModal={() => this.handleClose()}
          updateProfile={passwordDetails => this.updateProfile(passwordDetails)}
        />
      ),
      CliqAndPiqModal: (
        <CliqAndPiq
          CloseCliqAndPiqModal={() => this.handleClose()}
          getAllStoresForCliqAndPiq={this.props.getAllStoresForCliqAndPiq}
          getProductPinCode={this.props.getProductPinCode}
          {...this.props.ownProps}
        />
      ),
      CustomerQueryPopUp: (
        <CustomerQueryPopUp
          closeModal={() => this.handleClose()}
          {...this.props.ownProps}
          history={this.props.history}
        />
      ),
      ValidateOffersPopUp: (
        <ValidateOffersPopUpContainer
          {...this.props.ownProps}
          closeModal={() => this.handleClose()}
          changePaymentMethod={() => this.handleClose()}
        />
      ),

      SimilarProductsModal: (
        <SimilarProductsModal
          {...this.props.ownProps}
          history={this.props.history}
          closeModal={() => this.handleClose()}
        />
      ),

      SimilarProductsOOSModal: (
        <SimilarProductsOOSModal
          {...this.props.ownProps}
          history={this.props.history}
          closeModal={() => this.handleClose()}
        />
      ),

      SizeSelectorOOSModal: (
        <SizeSelectorOOSModal
          {...this.props}
          history={this.props.history}
          closeModal={() => this.handleClose()}
        />
      ),
      /**
       * @comment Added below code for showing popup on the UPI section on the checkout page.
       */
      UpiTermsAndCondition: (
        <UpiTermsAndCondition
          {...this.props}
          history={this.props.history}
          closeModal={() => this.handleClose()}
        />
      ),
      UpiHowToPay: (
        <UpiHowToPay
          {...this.props}
          history={this.props.history}
          closeModal={() => this.handleClose()}
        />
      ),
      /**
       * EOD
       */

      NotificationConfirmation: (
        <NotificationConfirmation
          closeModal={() => this.handleClose()}
          handleWhatsappSubscribe={() => this.subscribeWhatsapp()}
        />
      ),
      CancelReturnRequestPopUp: (
        <CancelReturnRequestPopUp
          data={this.props.ownProps}
          loadingForUpdateReturnCancellation={
            this.props.loadingForUpdateReturnCancellation
          }
          cancelModal={() => this.handleClose()}
          updateReturnCancellation={data => this.updateReturnCancellation(data)}
        />
      ),
      SellerReviewSubmitRemovalPopup: (
        <SellerReviewSubmitRemovalPopup
          rating={this.props.rating}
          closeModal={() => this.handleClose()}
        />
      ),
      ExchangeRemoveModal: (
        <ExchangeRemoveModal
          {...this.props.ownProps}
          closeModal={() => this.handleClose()}
          removeExchange={data => this.removeExchange(data)}
        />
      ),
      ProductInBagModal: (
        <ProductInBagModal
          {...this.props.ownProps}
          closeModal={() => this.handleClose()}
          history={this.props.history}
        />
      ),
      ChangeExchangeCashabackModal: (
        <ChangeExchangeCashabackModal
          {...this.props.ownProps}
          closeModal={() => this.handleClose()}
          history={this.props.history}
        />
      ),
      AppliancesExchangeModal: (
        <AppliancesExchangeModal
          {...this.props.ownProps}
          history={this.props.history}
          closeAppliancesExchangeModal={() => this.handleClose()}
          appliancesExchangeDetails={this.props.appliancesExchangeDetails}
          updateAppliancesExchangeDetails={exchangeData =>
            this.props.updateAppliancesExchangeDetails(exchangeData)
          }
        />
      )
    };

    let SelectedModal = MODAL_COMPONENTS[this.props.modalType];
    //let SelectedModal = MODAL_COMPONENTS["NewPassword"];
    const Modal = this.props.modalStatus ? (
      <ModalPanel
        closeModal={() => {
          this.handleClose();
        }}
      >
        {SelectedModal}
      </ModalPanel>
    ) : null;

    return ReactDOM.createPortal(Modal, this.el);
  }
}
