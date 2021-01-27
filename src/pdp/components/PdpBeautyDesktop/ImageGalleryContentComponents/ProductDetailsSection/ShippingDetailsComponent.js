import React from "react";
import LoadableVisibility from "react-loadable-visibility/react-loadable";

import styles from "./ShippingDetailsComponent.css";
import BeautyOtherSellersLink from "./BeautyOtherSellersLink";
import BeautyPdpDeliveryModes from "./BeautyPdpDeliveryModes";
import {
  PRODUCT_DESCRIPTION_PRODUCT_CODE,
  PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE,
  PRODUCT_SELLER_ROUTER_SUFFIX,
  PRODUCT_CART_ROUTER,
  LOGIN_PATH,
  COLLECT,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  NO
} from "../../../../../lib/constants";

const NO_SIZE = "NO SIZE";
const FREE_SIZE = "Free Size";

const BeautyPdpPincode = LoadableVisibility({
  loader: () => import("./BeautyPdpPincode"),
  loading: () => <div />,
  delay: 1000
});

export default class ShippingDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeError: false,
      isLoader: false
    };
  }

  checkIfSizeSelected = () => {
    if (this.props.location.state && this.props.location.state.isSizeSelected) {
      return true;
    } else {
      return false;
    }
  };

  checkIfSizeDoesNotExist = () => {
    return this.props.productDetails.variantOptions
      ? this.props.productDetails.variantOptions.filter(val => {
          return val.sizelink.size && val.sizelink.isAvailable;
        }).length === 0
        ? true
        : false
      : true;
  };

  checkIfNoSize = () => {
    if (
      this.props.productDetails.variantOptions &&
      this.props.productDetails.variantOptions[0].sizelink &&
      this.props.productDetails.variantOptions[0].sizelink.size &&
      (this.props.productDetails.variantOptions[0].sizelink.size.toUpperCase() ===
        NO_SIZE ||
        this.props.productDetails.variantOptions[0].sizelink.size === "0")
    ) {
      return true;
    } else {
      return false;
    }
  };

  checkIfFreeSize = () => {
    if (
      this.props.productDetails.variantOptions &&
      this.props.productDetails.variantOptions[0].sizelink &&
      this.props.productDetails.variantOptions[0].sizelink.size === FREE_SIZE
    ) {
      return true;
    } else {
      return false;
    }
  };

  isSizeNotSelectedForAddToWishlist = () => {
    this.props.displayToast("Please select a size to continue");
    this.setState({
      sizeError: true,
      isLoader: false
    });
  };

  goToSellerPage = count => {
    if (count !== 0) {
      let expressionRuleFirst = "/p-(.*)/(.*)";
      let expressionRuleSecond = "/p-(.*)";
      let productId;

      if (this.props.location.pathname.match(expressionRuleFirst)) {
        productId = this.props.location.pathname.match(expressionRuleFirst)[1];
      } else {
        productId = this.props.location.pathname.match(expressionRuleSecond)[1];
      }
      this.props.history.push(`/p-${productId}${PRODUCT_SELLER_ROUTER_SUFFIX}`);
    }
  };

  showPincodeModal = () => {
    if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
      this.props.showPincodeModal(this.props.match.params[0]);
    } else if (
      this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE
    ) {
      this.props.showPincodeModal(this.props.match.params[1]);
    }
  };

  navigateToLogin(isBuyNow) {
    const url = this.props.location.pathname;
    if (isBuyNow) {
      this.props.setUrlToRedirectToAfterAuth(PRODUCT_CART_ROUTER);
    } else {
      this.props.setUrlToRedirectToAfterAuth(url);
    }
    this.props.history.push(LOGIN_PATH);
  }

  handleShowPiqPage = () => {
    if (
      this.checkIfSizeSelected() ||
      this.checkIfSizeDoesNotExist() ||
      this.checkIfFreeSize() ||
      this.checkIfNoSize()
    ) {
      const eligibleForCNC =
        this.props.productDetails &&
        this.props.productDetails.eligibleDeliveryModes.find(deliveryMode => {
          return deliveryMode.code === COLLECT;
        });
      if (eligibleForCNC && this.props.getAllStoresForCliqAndPiq) {
        this.props.showPdpPiqPage();
        this.props.getAllStoresForCliqAndPiq();
      }
    } else {
      this.isSizeNotSelectedForAddToWishlist();
    }
  };

  render() {
    const productData = this.props && this.props.productDetails;
    const address =
      this.props && this.props.userAddress && this.props.userAddress.addresses;
    let getDeliveryModesByWinningUssid = "";
    if (
      this.props.productDetails &&
      this.props.productDetails.pincodeResponseList &&
      this.props.productDetails.pincodeResponseList.deliveryOptions &&
      this.props.productDetails.pincodeResponseList.deliveryOptions
        .pincodeListResponse &&
      this.props.productDetails.pincodeResponseList.deliveryOptions
        .pincodeListResponse
    ) {
      getDeliveryModesByWinningUssid = this.props.productDetails.pincodeResponseList.deliveryOptions.pincodeListResponse.find(
        val => {
          return val.ussid === productData.winningUssID;
        }
      );
    }

    const firstSlaveData =
      getDeliveryModesByWinningUssid &&
      getDeliveryModesByWinningUssid.validDeliveryModes &&
      getDeliveryModesByWinningUssid.validDeliveryModes.find(val => {
        return val.type === "CNC";
      });
    const availableStores =
      firstSlaveData && firstSlaveData.CNCServiceableSlavesData;
    return (
      <React.Fragment>
        <div className={styles["pin-code-component"]} id="CPIN">
          <div className={styles["pin-code-block"]}>
            {this.props.productDetails &&
            this.props.productDetails.isServiceableToPincode &&
            this.props.productDetails.isServiceableToPincode.pinCode ? (
              <BeautyPdpPincode
                city={
                  this.props.productDetails.isServiceableToPincode &&
                  this.props.productDetails.isServiceableToPincode.city
                }
                hasPincode={true}
                displayToast={val => this.props.displayToast(val)}
                onCheckPinCode={pincode =>
                  this.props.getProductPinCode(
                    pincode,
                    productData.productListingId,
                    productData.winningUssID,
                    false,
                    productData.exchangeAvailable,
                    true
                  )
                }
                pincode={
                  this.props.productDetails.isServiceableToPincode.pinCode
                }
                status={
                  this.props.productDetails &&
                  this.props.productDetails.isServiceableToPincode &&
                  this.props.productDetails.isServiceableToPincode.status
                }
                onClick={() => this.showPincodeModal()}
                listOfAllPinCode={address}
                redirectToLoginPage={() => this.navigateToLogin()}
              />
            ) : (
              <BeautyPdpPincode
                city={
                  this.props.productDetails &&
                  this.props.productDetails.isServiceableToPincode &&
                  this.props.productDetails.isServiceableToPincode.city &&
                  this.props.productDetails.isServiceableToPincode.city
                }
                pdpApparel={true}
                displayToast={val => this.props.displayToast(val)}
                onCheckPinCode={pincode =>
                  this.props.getProductPinCode(
                    pincode,
                    productData.productListingId,
                    productData.winningUssID,
                    false,
                    productData.exchangeAvailable,
                    true
                  )
                }
                pincode={localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)}
                listOfAllPinCode={address}
                onClick={() => this.showPincodeModal()}
                redirectToLoginPage={() => this.navigateToLogin()}
              />
            )}
          </div>

          {this.props.productDetails &&
          this.props.productDetails.isServiceableToPincode &&
          this.props.productDetails.isServiceableToPincode.status === NO ? (
            this.props.productDetails.isServiceableToPincode
              .productOutOfStockMessage ? (
              <div className={styles["pin-code-error"]}>
                *{" "}
                {
                  this.props.productDetails.isServiceableToPincode
                    .productOutOfStockMessage
                }
              </div>
            ) : this.props.productDetails.isServiceableToPincode
                .productNotServiceableMessage ? (
              <div className={styles["pin-code-error"]}>
                *{" "}
                {
                  this.props.productDetails.isServiceableToPincode
                    .productNotServiceableMessage
                }
              </div>
            ) : this.props.pincodeError ? (
              <div className={styles["pin-code-error"]}>
                * {this.props.pincodeError}
              </div>
            ) : null
          ) : this.props.productDetails &&
            this.props.productDetails.isServiceableToPincode &&
            this.props.productDetails.isServiceableToPincode.pinCode ? (
            <div className={styles["ship-deli-pick-block"]}>
              <BeautyPdpDeliveryModes
                onPiq={() => this.handleShowPiqPage()}
                eligibleDeliveryModes={productData.eligibleDeliveryModes}
                deliveryModesATP={productData.deliveryModesATP}
                pdpApparel={true}
                pincodeDetails={productData.pincodeResponseList}
                isCod={productData.isCOD}
                availableStores={availableStores && availableStores.length}
                winningUssID={productData.winningUssID}
                productCode={productData.productListingId}
              />
            </div>
          ) : (
            <React.Fragment>
              {this.props && this.props.pincodeError ? (
                <div className={styles["pin-code-error"]}>
                  {this.props.pincodeError}
                </div>
              ) : (
                <div className={styles["pin-code-error"]}>
                  To check for delivery options please enter your pincode above{" "}
                </div>
              )}
            </React.Fragment>
          )}
        </div>
        <div className={styles.horizontalOffset} id="DWSN">
          <div className={styles.separator}>
            <BeautyOtherSellersLink
              serviceableOtherSellersUssid={
                this.props.serviceableOtherSellersUssid
              }
              onClick={this.goToSellerPage}
              winningSeller={productData.winningSellerName}
              winnningSellerUssId={productData.winningUssID}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
