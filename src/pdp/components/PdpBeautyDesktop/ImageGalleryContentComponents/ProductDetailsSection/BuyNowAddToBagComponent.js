import React from "react";

import styles from "./BuyNowAddToBagComponent.css";
import Button from "../../../../../general/components/Button";
import AddToWishListButtonContainer from "../../../../../wishlist/containers/AddToWishListButtonContainer";
import {
  BUYNOW_ADDTOBAG_COMPONENT,
  BUYNOW,
  ADDTOBAG,
  WISHLIST
} from "../../ComponentConstants";
import {
  LOGGED_IN_USER_DETAILS,
  GLOBAL_ACCESS_TOKEN,
  PRODUCT_SELLER_ROUTER_SUFFIX,
  PRODUCT_CART_ROUTER,
  PRODUCT_REVIEWS_PATH_SUFFIX,
  PRODUCT_DESCRIPTION_PRODUCT_CODE,
  PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE,
  NO,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  COLLECT,
  SUCCESS,
  ADD_TO_BAG_TEXT,
  HOME_ROUTER,
  BUY_NOW_PRODUCT_DETAIL,
  BUY_NOW_ERROR_MESSAGE,
  LOGIN_PATH
} from "../../../../../lib/constants";

import {
  ADOBE_SUMSUNG_CHAT_LINK_CLICK,
  setDataLayer,
  ADOBE_VIRTUAL_PAGELOAD,
  ADOBE_SUMSUNG_CHAT_ICON,
  setDataLayerForCartDirectCalls,
  setDataLayerForPdpDirectCalls,
  SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP,
  SET_DATA_LAYER_FOR_BUY_NOW_EVENT,
  SET_DATA_LAYER_FOR_VIEW_ALL_REVIEW_AND_RATING_EVENT,
  ADOBE_DIRECT_CALL_FOR_PDP_SPEC_VIEW_MORE,
  ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS,
  ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE,
  ADOBE_DIRECT_CALL_FOR_GO_TO_BAG,
  SET_DATA_LAYER_FOR_ADOBE_ADD_TO_CART_BUTTON,
  ADOBE_DIRECT_CALL_FOR_PICK_UP_OPTION,
  ADOBE_MDE_CLICK_ON_EXCHANGE_LINK
} from "../../../../../lib/adobeUtils";
import { checkUserLoggedIn } from "../../../../../lib/userUtils";

import { setTracker, ADD_TO_CART } from "../../../../../lib/onlinesalesUtils";

const NO_SIZE = "NO SIZE";
const FREE_SIZE = "Free Size";
const PRODUCT_QUANTITY = "1";
const BEAUTY_PDP_ICON = "beautyIconForPdp";

export default class BuyNowAddToBagComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productQuantityOption: "Quantity",
      isLoader: false,
      goToCartPageFlag:
        this.props.location.state && this.props.location.state.goToCartPageFlag
          ? this.props.location.state.goToCartPageFlag
          : false,
      showGotoCartButton: false,
      sizeError: false
    };
  }

  onClickOfBuyNow = () => {
    if (this.state.goToCartPageFlag) {
      this.goToCart();
    } else {
      this.addToCart(true);
    }
  };

  goToCart = isClickOnGoToBag => {
    if (isClickOnGoToBag && isClickOnGoToBag.goToBag) {
      setDataLayerForPdpDirectCalls(ADOBE_DIRECT_CALL_FOR_GO_TO_BAG);
    }
    const defaultPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
    this.props.history.push({
      pathname: PRODUCT_CART_ROUTER,
      state: {
        productQuantityOption: "Quantity",
        ProductCode: this.props.productDetails.productListingId,
        pinCode: defaultPinCode
      }
    });
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

  checkIfSizeSelected = () => {
    let sizeOptions = [];
    let selectedSize = [];

    if (this.props.location.state && this.props.location.state.isSizeSelected) {
      return true;
    }

    if (
      this.props.productDetails.variantOptions &&
      this.props.productDetails.variantOptions.length > 0
    ) {
      const variantOptions =
        this.props &&
        this.props.productDetails &&
        this.props.productDetails.variantOptions;
      sizeOptions =
        variantOptions &&
        variantOptions.length > 0 &&
        variantOptions.map(el => el.sizelink);
      const productListingId =
        this.props &&
        this.props.productDetails &&
        this.props.productDetails.productListingId;
      selectedSize =
        sizeOptions &&
        sizeOptions.filter(
          (el, i) =>
            el.productCode === productListingId && el.isAvailable === true
        );
      if (selectedSize && selectedSize.length > 0) {
        return true;
      }
    }

    if (
      this.props.productDetails.variantTheme &&
      this.props.productDetails.variantTheme.length > 0
    ) {
      const variantOptions =
        this.props &&
        this.props.productDetails &&
        this.props.productDetails.variantTheme;
      sizeOptions =
        variantOptions &&
        variantOptions.length > 0 &&
        variantOptions.map(el => el.sizelink);
      const productListingId =
        this.props &&
        this.props.productDetails &&
        this.props.productDetails.productListingId;
      selectedSize =
        sizeOptions &&
        sizeOptions.filter(
          (el, i) =>
            el.productCode === productListingId &&
            el.isAvailable === true &&
            el.selected === true
        );
      if (selectedSize && selectedSize.length > 0) {
        return true;
      }
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

  checkIfOneSize = () => {
    if (
      this.props.productDetails.variantOptions.length === 1 &&
      this.props.productDetails.rootCategory !== "HomeFurnishing" &&
      this.props.productDetails.rootCategory !== "FineJewellery" &&
      this.props.productDetails.rootCategory !== "FashionJewellery" &&
      this.props.productDetails.categoryHierarchy.length &&
      this.props.productDetails.categoryHierarchy[0].category_name !== "Eyewear"
    ) {
      return true;
    } else {
      return false;
    }
  };

  checkIfQuantitySelected = () => {
    if (
      this.props.location.state &&
      this.props.location.state.isQuantitySelected
    ) {
      return true;
    } else {
      return false;
    }
  };

  isSizeSelectedForAddToWishlist = () => {
    if (
      this.checkIfSizeSelected() ||
      this.checkIfSizeDoesNotExist() ||
      this.checkIfFreeSize() ||
      this.checkIfNoSize() ||
      this.checkIfOneSize()
    ) {
      return false;
    } else {
      return true;
    }
  };

  isSizeNotSelectedForAddToWishlist = () => {
    this.props.displayToast("Please select a size to continue");
    this.setState({
      sizeError: true,
      isLoader: false
    });
  };

  addToCart = async buyNowFlag => {
    let productDetails = {};
    let productDetailsForAddToCart = (({
      productListingId,
      winningUssID,
      seo,
      mrpPrice,
      winningSellerPrice
    }) => ({
      productListingId,
      winningUssID,
      seo,
      mrpPrice,
      winningSellerPrice
    }))(this.props.productDetails);
    productDetails.code = this.props.productDetails.productListingId;
    //Updating Product quantity(selected by user) when user clicks on Add To Bag
    const quantitySelected = buyNowFlag
      ? PRODUCT_QUANTITY
      : this.state.productQuantityOption.value;
    productDetails.quantity = quantitySelected;
    productDetailsForAddToCart.quantity = quantitySelected;
    if (!productDetails.quantity) {
      productDetails.quantity = PRODUCT_QUANTITY;
    }
    productDetails.ussId = this.props.productDetails.winningUssID;
    let selectedSize =
      this.props.productDetails &&
      this.props.productDetails.variantOptions &&
      this.props.productDetails.variantOptions.filter(val => {
        return val.colorlink.selected;
      })[0].sizelink.size;
    let checkSizeSelected =
      this.props.location.state &&
      this.props.location.state.isSizeSelected &&
      selectedSize
        ? selectedSize
        : "";
    setDataLayerForPdpDirectCalls(
      SET_DATA_LAYER_FOR_ADOBE_ADD_TO_CART_BUTTON,
      checkSizeSelected
    );

    if (!this.props.productDetails.winningSellerPrice) {
      this.props.displayToast("Product is not saleable");
    } else {
      if (
        this.props.productDetails.allOOStock ||
        (this.props.productDetails.winningSellerAvailableStock === "0" &&
          this.checkIfSizeSelected())
      ) {
        this.props.displayToast("Product is out of stock");
      } else {
        if (
          this.checkIfSizeSelected() ||
          this.checkIfSizeDoesNotExist() ||
          this.checkIfFreeSize() ||
          this.checkIfNoSize() ||
          this.checkIfOneSize()
        ) {
          if (
            (!this.checkIfQuantitySelected() ||
              this.state.productQuantityOption === "Quantity") &&
            this.props.productDetails.rootCategory === "HomeFurnishing"
          ) {
            this.props.displayToast("Please select a quantity to continue");
            this.setState({ quantityError: true });
          } else {
            //localStorage.removeItem(SELECTED_STORE);
            this.setState({ isLoader: true });
            setTracker(ADD_TO_CART, productDetailsForAddToCart);
            if (buyNowFlag) {
              setDataLayerForPdpDirectCalls(
                SET_DATA_LAYER_FOR_BUY_NOW_EVENT,
                productDetails
              );
              if (!checkUserLoggedIn()) {
                localStorage.setItem(
                  BUY_NOW_PRODUCT_DETAIL,
                  JSON.stringify(productDetails)
                );
                this.navigateToLogin(buyNowFlag);
              } else {
                const buyNowResponse = await this.props.buyNow(productDetails);
                this.setState({ isLoader: false });
                if (buyNowResponse && buyNowResponse.status === SUCCESS) {
                  this.props.history.push(PRODUCT_CART_ROUTER);
                } else {
                  this.props.displayToast(BUY_NOW_ERROR_MESSAGE);
                }
              }
            } else {
              this.setState({ isLoader: false });
              const addProductToCartResponse = await this.props.addProductToCart(
                productDetails
              );
              if (addProductToCartResponse.status === SUCCESS) {
                this.props.displayToast(ADD_TO_BAG_TEXT);
                this.setState({
                  goToCartPageFlag: true
                });
                await this.props.getMinicartProducts();
                const defaultPinCode = localStorage.getItem(
                  DEFAULT_PIN_CODE_LOCAL_STORAGE
                );
                this.props.history.push({
                  pathname: PRODUCT_CART_ROUTER,
                  state: {
                    ProductCode: this.props.productDetails.productListingId,
                    pinCode: defaultPinCode,
                    isClickOnAddToBag: !buyNowFlag
                  }
                });
              }
            }
            this.setState({ sizeError: false });
          }
        } else {
          this.props.displayToast("Please select a size to continue");
          this.setState({
            sizeError: true,
            isLoader: false
          });
        }
      }
    }
  };

  render() {
    let disabledStatus = false;
    const productDetails = this.props && this.props.productDetails;
    const compDetails =
      this.props && this.props.compDetails ? this.props.compDetails : [];
    const addToBagBuyNowComp = compDetails.filter(
      el => el.componentId === BUYNOW_ADDTOBAG_COMPONENT
    );
    const buttonToShow =
      addToBagBuyNowComp &&
      addToBagBuyNowComp[0].componentProperties &&
      addToBagBuyNowComp[0].componentProperties.cta;
    disabledStatus =
      productDetails.allOOStock ||
      this.props.pincodeError ||
      !productDetails.winningSellerPrice ||
      (productDetails.winningSellerAvailableStock === "0" &&
        this.checkIfSizeSelected());
    if (productDetails.isServiceableToPincode) {
      if (
        "productNotServiceableMessage" in
          productDetails.isServiceableToPincode ||
        "productOutOfStockMessage" in productDetails.isServiceableToPincode
      ) {
        disabledStatus = true;
      }
    }
    return (
      <React.Fragment>
        {!this.state.showGotoCartButton && (
          <div className={styles.buttonWrapper}>
            {buttonToShow &&
              buttonToShow.filter(el => el.key === BUYNOW).length > 0 && (
                <div
                  className={
                    this.state.isLoader
                      ? styles.nonClickButton
                      : styles.buttonHolder
                  }
                >
                  {this.state.isLoader && (
                    <div className={styles.loaderHolder}>
                      <div className={styles.loader} />
                    </div>
                  )}
                  <div
                    className={[
                      styles.buttonAddToBag,
                      disabledStatus ? "" : "" /*styles.shadowBtn*/
                    ].join(" ")}
                  >
                    <Button
                      disabledBgGrey={true}
                      type="primary"
                      height={40}
                      width={180}
                      label="BUY NOW"
                      onClick={this.onClickOfBuyNow}
                      disabled={disabledStatus}
                      backgroundColor={"#ffffff"}
                      borderRadius={4}
                      borderColor={"#da1c5c"}
                      borderWidth={1}
                      fromBeautyPdp={true}
                      buyNowBeautyPdp={true}
                    />
                  </div>
                </div>
              )}
            {buttonToShow &&
              buttonToShow.filter(el => el.key === ADDTOBAG).length > 0 && (
                <div className={styles.buttonHolder}>
                  <div
                    className={[
                      styles.buttonAddToBag,
                      disabledStatus ? "" : "" /*styles.shadowBtn*/
                    ].join(" ")}
                  >
                    <Button
                      disabledBgGrey={true}
                      type="primary"
                      height={40}
                      width={180}
                      backgroundColor={"#da1c5c"}
                      borderRadius={4}
                      label={
                        this.state.goToCartPageFlag ? "GO TO BAG" : "ADD TO BAG"
                      }
                      onClick={
                        this.state.goToCartPageFlag
                          ? () => this.goToCart({ goToBag: true })
                          : () => this.addToCart(false)
                      }
                      disabled={disabledStatus}
                      addToBagBeauty={true}
                      fromBeautyPdp={true}
                    />
                  </div>
                </div>
              )}
            {buttonToShow &&
              buttonToShow.filter(el => el.key === WISHLIST).length > 0 && (
                <AddToWishListButtonContainer
                  type={BEAUTY_PDP_ICON}
                  productListingId={productDetails.productListingId}
                  winningUssID={productDetails.winningUssID}
                  setDataLayerType={
                    SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP
                  }
                  isSizeSelectedForAddToWishlist={this.isSizeSelectedForAddToWishlist()}
                  showSizeSelector={this.isSizeNotSelectedForAddToWishlist}
                  ussid={productDetails.winningUssID}
                />
              )}
          </div>
        )}
      </React.Fragment>
    );
  }
}
