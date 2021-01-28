import React, { Component } from "react";
import styles from "./ProductSellerPage.css";
import ProductDetailsCard from "./ProductDetailsCard";
import SellerWithMultiSelect from "./SellerWithMultiSelect";
import SellerCard from "./SellerCard";
import PdpFrame from "./PdpFrame";
import * as Cookie from "../../lib/Cookie";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  GLOBAL_ACCESS_TOKEN,
  BUY_NOW_PRODUCT_DETAIL,
  LOGIN_PATH,
  SUCCESS,
  BUY_NOW_ERROR_MESSAGE
} from "../../lib/constants";
import {
  PRICE_TEXT,
  OFFER_AVAILABLE,
  DELIVERY_INFORMATION_TEXT,
  DELIVERY_RATES,
  CASH_TEXT,
  CART_DETAILS_FOR_ANONYMOUS,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  ANONYMOUS_USER,
  PRODUCT_SELLER_ROUTER_SUFFIX,
  PRODUCT_OTHER_SELLER_ROUTER,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  PRODUCT_CART_ROUTER
} from "../../lib/constants";
import {
  renderMetaTags,
  renderMetaTagsWithoutSeoObject
} from "../../lib/seoUtils";
import { checkUserLoggedIn } from "../../lib/userUtils";
import {
  setDataLayer,
  ADOBE_MDE_CLICK_ON_EXCHANGE_LINK_THROUGH_SELLER
} from "../../lib/adobeUtils";
const PRODUCT_QUANTITY = "1";
const PRICE_LOW_TO_HIGH = "Price Low - High";
const PRICE_HIGH_TO_LOW = "Price High - Low";
class ProductSellerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winningUssID: this.props.productDetails
        ? this.props.productDetails.winningUssID
        : null,
      sortOption: PRICE_LOW_TO_HIGH,
      selectedSellerUssID: null
    };
  }

  priceValue;

  navigateToLogin() {
    const url = this.props.location.pathname;
    this.props.setUrlToRedirectToAfterAuth(url);
    this.props.history.push(LOGIN_PATH);
  }

  gotoPreviousPage = () => {
    const url = this.props.location.pathname.replace(
      PRODUCT_SELLER_ROUTER_SUFFIX,
      ""
    );
    this.props.history.replace(url);
  };

  addToCart = async buyNowFlag => {
    let productDetails = {};
    productDetails.code = this.props.productDetails.productListingId;
    productDetails.quantity = PRODUCT_QUANTITY;
    productDetails.ussId = this.state.winningUssID
      ? this.state.winningUssID
      : this.props.productDetails.winningUssID;
    if (buyNowFlag) {
      if (!checkUserLoggedIn()) {
        localStorage.setItem(
          BUY_NOW_PRODUCT_DETAIL,
          JSON.stringify(productDetails)
        );
        this.navigateToLogin();
      } else {
        const buyNowResponse = await this.props.buyNow(productDetails);
        if (buyNowResponse && buyNowResponse.status === SUCCESS) {
          this.props.history.push(PRODUCT_CART_ROUTER);
        } else {
          this.props.displayToast(BUY_NOW_ERROR_MESSAGE);
        }
      }
    } else {
      return this.props.addProductToCart(productDetails);
    }
  };

  addToCartAccordingToTheUssid(USSID) {
    let productDetails = {};
    productDetails.code = this.props.productDetails.productListingId;
    productDetails.quantity = PRODUCT_QUANTITY;
    productDetails.ussId = USSID;
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let cartDetailsLoggedInUser = Cookie.getCookie(
      CART_DETAILS_FOR_LOGGED_IN_USER
    );
    let cartDetailsAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
    if (userDetails) {
      return this.props.addProductToCart(
        productDetails,
        JSON.parse(userDetails).userName,
        cartDetailsLoggedInUser && JSON.parse(cartDetailsLoggedInUser).code,
        customerCookie && JSON.parse(customerCookie).access_token
      );
    } else {
      return this.props.addProductToCart(
        productDetails,
        ANONYMOUS_USER,
        cartDetailsAnonymous && JSON.parse(cartDetailsAnonymous).guid,
        globalCookie && JSON.parse(globalCookie).access_token
      );
    }
  }

  goToCart = () => {
    const defaultPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
    this.props.history.push({
      pathname: PRODUCT_CART_ROUTER,
      state: {
        ProductCode: this.props.productDetails.productListingId,
        pinCode: defaultPinCode
      }
    });
  };

  addToWishList = () => {
    let productDetails = {};
    productDetails.code = this.props.productDetails.productListingId;
    productDetails.ussId = this.state.winningUssID
      ? this.state.winningUssID
      : this.props.productDetails.winningUssID;
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

    if (userDetails) {
      this.props.addProductToWishList(
        JSON.parse(userDetails).userName,
        JSON.parse(customerCookie).access_token,
        productDetails
      );
    } else {
      this.props.addProductToWishList(
        ANONYMOUS_USER,
        JSON.parse(globalCookie).access_token,
        productDetails
      );
    }
  };

  async componentDidMount() {
    if (this.props.match.path === PRODUCT_OTHER_SELLER_ROUTER) {
      const productCode = this.props.match.params[0];
      const productDetailsResponse = await this.props.getProductDescription(
        productCode
      );
      // on page reload required exchange related details so updated below condition
      if (productDetailsResponse && productDetailsResponse.status === SUCCESS) {
        const pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
        const exchangeAvailable =
          productDetailsResponse.productDescription &&
          productDetailsResponse.productDescription.exchangeAvailable;
        if (pinCode) {
          this.props.getProductPinCode(
            pinCode,
            productCode,
            null,
            false,
            exchangeAvailable,
            false
          );
        }
      }
    }
  }

  onSortByPrice(val) {
    this.setState({ sortOption: val.value });
  }

  selectSeller(val) {
    if (val && val[0]) {
      this.setState({ winningUssID: val[0].USSID });
    }
  }

  renderMetaTags = () => {
    const productDetails = this.props.productDetails;
    return productDetails && productDetails.seo
      ? renderMetaTags(productDetails)
      : renderMetaTagsWithoutSeoObject(productDetails);
  };

  onClickImage(productCode) {
    if (productCode) {
      this.props.history.push(`/p-${productCode.toLowerCase()}`);
    }
  }

  showLoader = () => {
    this.props.showSecondaryLoader();
  };

  hideLoader = () => {
    this.props.hideSecondaryLoader();
  };

  updateOtherSellerUssID = selectedSellerUssID => {
    if (this.state.selectedSellerUssID !== selectedSellerUssID) {
      this.setState({ selectedSellerUssID });
    }
  };

  showQuiqPage(ussId) {
    if (this.props.showPdpPiqPage) {
      this.setState({ winningUssID: ussId });
      this.props.showPdpPiqPage();
    }
  }

  async openExchangeModal(data) {
    let listingId = this.props.productDetails.productListingId;
    let ussId = data && data.USSID;
    let maxExchangeAmount =
      data && data.maxExchangeAmount && data.maxExchangeAmount.value;
    let pickupCharge = this.props.productDetails.cashifyPickupCharge;
    let productName = this.props.productDetails.productName;
    //call exchange details API
    let response = await this.props.getExchangeDetails(
      listingId,
      ussId,
      maxExchangeAmount,
      pickupCharge
    );
    // if brand n model details are present then only show exchange modal
    if (
      response &&
      response.status &&
      response.status.toLowerCase() === "success" &&
      response.data &&
      response.data.makeModelDetails
    ) {
      this.props.showExchangeModal({
        exchangeDetails: this.props.exchangeDetails,
        productName: productName,
        listingId: listingId,
        ussId: ussId
      });
      setDataLayer(ADOBE_MDE_CLICK_ON_EXCHANGE_LINK_THROUGH_SELLER);
    }
    // if brand n model details are not avail show toast
    if (
      response &&
      response.status &&
      response.status.toLowerCase() === "success" &&
      response.data &&
      !response.data.makeModelDetails
    ) {
      this.props.displayToast(
        "Exchange cannot be processed right now. Please try again after sometime"
      );
    }
  }

  render() {
    if (this.props.loading) {
      this.showLoader();
    } else {
      this.hideLoader();
    }

    if (
      this.props.showPiqPage &&
      this.props.stores &&
      this.props.stores.length > 0
    ) {
      let cliqAndPiqDetails = {};
      let availableDeliveryMode = [];
      cliqAndPiqDetails.stores = this.props.stores;
      cliqAndPiqDetails.pinCodeUpdateDisabled = true;
      cliqAndPiqDetails.productDetails = this.props.productDetails;

      this.props.serviceablePincodeList &&
        this.props.serviceablePincodeList.map((product) => {
          if (product.ussid === this.state.selectedSellerUssID) {
            return (
              product.validDeliveryModes &&
              product.validDeliveryModes.map((deliveryMode) => {
                return deliveryMode.type === "CNC"
                  ? availableDeliveryMode.push(deliveryMode)
                  : null;
              })
            );
          }
        });
      cliqAndPiqDetails.productDetails.slaveData = availableDeliveryMode;
      cliqAndPiqDetails.from = "Pdp";
      cliqAndPiqDetails.fromSellersPage = true;
      cliqAndPiqDetails.preventSelection = true;
      cliqAndPiqDetails.pincodeResponseList =
        this.props &&
        this.props.productDetails &&
        this.props.productDetails.pincodeResponseList;
      cliqAndPiqDetails.winningUssID = this.state.winningUssID
        ? this.state.winningUssID
        : this.props.productDetails.winningUssID;
      cliqAndPiqDetails.pincode = localStorage.getItem(
        DEFAULT_PIN_CODE_LOCAL_STORAGE
      );
      this.props.showPdpCliqAndPiqPage(cliqAndPiqDetails);
    }
    const sellers = this.props.productDetails
      ? this.props.productDetails.otherSellers
      : [];
    const availableSellers = sellers.filter(val => {
      return parseInt(val.availableStock, 10) > 0;
    });
    let price;
    if (availableSellers && availableSellers[0]) {
      price = availableSellers[0].specialPriceSeller.doubleValue;
    }
    let sortedAvailableSellers = availableSellers;
    if (this.state.sortOption === PRICE_HIGH_TO_LOW) {
      sortedAvailableSellers = availableSellers.reverse();
    }

    let pincodeResponseList = this.props.serviceablePincodeList || [];

    let actualSortedAvailableSeller = [];
    actualSortedAvailableSeller = sortedAvailableSellers.filter(otherSeller => {
      return (
        pincodeResponseList &&
        pincodeResponseList.find(pincodeSeller => {
          return (
            otherSeller.USSID === pincodeSeller.ussid &&
            pincodeSeller.stockCount > 0 &&
            pincodeSeller.isServicable === "Y"
          );
        })
      );
    });

    const mobileGalleryImages =
      this.props.productDetails &&
      this.props.productDetails.galleryImagesList &&
      this.props.productDetails.galleryImagesList
        .map(galleryImageList => {
          return galleryImageList.galleryImages.filter(galleryImages => {
            return galleryImages.key === "product";
          });
        })
        .map(image => {
          if (image && image[0]) {
            return image[0].value;
          }
        });

    if (!this.props.productDetails) {
      return null;
    }

    return (
      <PdpFrame
        goToCart={() => this.goToCart()}
        displayToast={message => this.props.displayToast(message)}
        addProductToBag={buyNowFlag => this.addToCart(buyNowFlag)}
        gotoPreviousPage={() => this.gotoPreviousPage()}
      >
        {this.renderMetaTags()}

        <div className={styles.base}>
          <ProductDetailsCard
            productImage={mobileGalleryImages && mobileGalleryImages[0]}
            productName={this.props.productDetails.productName}
            brandName={this.props.productDetails.brandName}
            price={
              this.props.productDetails.winningSellerPrice
                .formattedValueNoDecimal
            }
            //priceDouble={this.props.productDetails.winningSellerPrice.doubleValue}
            discountPrice={
              this.props.productDetails.mrpPrice.formattedValueNoDecimal
            }
            //discountPriceDouble={this.props.productDetails.mrpPrice.doubleValue}
            averageRating={this.props.productDetails.averageRating}
            totalNoOfReviews={this.props.productDetails.productReviewsCount}
            //totalNoOfReviews={this.props.productDetails.numberOfReviews}
            onClickImage={() =>
              this.onClickImage(
                this.props.productDetails &&
                  this.props.productDetails.productListingId
              )
            }
          />
          <MobileOnly>
            <div className={styles.OtherSeller}>Other sellers</div>
            <div className={styles.priceWithSeller}>
              <div className={styles.seller}>
                {actualSortedAvailableSeller.length} Other Sellers available
                starting at ₹{price}
              </div>
              <div className={styles.price}>
                <SelectBoxMobile2
                  label={this.state.sortOption}
                  height={30}
                  onChange={val => this.onSortByPrice(val)}
                  theme={"hollowBox"}
                  arrowColour={"black"}
                  value={this.state.sortOption}
                  options={[
                    {
                      label: PRICE_LOW_TO_HIGH,
                      value: PRICE_LOW_TO_HIGH
                    },
                    {
                      label: PRICE_HIGH_TO_LOW,
                      value: PRICE_HIGH_TO_LOW
                    }
                  ]}
                />
              </div>
            </div>
            <div>
              {actualSortedAvailableSeller && (
                <SellerWithMultiSelect
                  limit={1}
                  onSelect={val => {
                    this.selectSeller(val);
                  }}
                >
                  {actualSortedAvailableSeller.map((value, index) => {
                    return (
                      <SellerCard
                        heading={value.sellerName}
                        priceTitle={PRICE_TEXT}
                        discountPrice={
                          value.specialPriceSeller.formattedValueNoDecimal
                        }
                        price={value.mrpSeller.formattedValueNoDecimal}
                        offerText={OFFER_AVAILABLE}
                        deliveryText={DELIVERY_INFORMATION_TEXT}
                        hasCod={value.isCOD === "Y"}
                        hasEmi={value.isEMIEligible === "Y"}
                        eligibleDeliveryModes={value.eligibleDeliveryModes}
                        deliveryModesATP={value.eligibleDeliveryModes}
                        cashText={CASH_TEXT}
                        policyText={DELIVERY_RATES}
                        key={index}
                        value={value}
                        serviceablePincodeList={
                          this.props.serviceablePincodeList
                        }
                        updateOtherSellerUssID={ussid =>
                          this.updateOtherSellerUssID(ussid)
                        }
                        showPdpPiqPage={this.props.showPdpPiqPage}
                        getAllStoresForCliqAndPiq={
                          this.props.getAllStoresForCliqAndPiq
                        }
                      />
                    );
                  })}
                </SellerWithMultiSelect>
              )}
            </div>
            {/*As of now unavailable sellers won't be shown in other seller page to reflect the same
              behaviour as in ios and android apps.
              {sortedUnAvailableSellers && (
                <div>
                  {sortedUnAvailableSellers.map((value, index) => {
                    return (
                      <SellerCard
                        heading={value.sellerName}
                        priceTitle={PRICE_TEXT}
                        disabled={true}
                        discountPrice={
                          value.specialPriceSeller.formattedValueNoDecimal
                        }
                        price={value.mrpSeller.formattedValueNoDecimal}
                        offerText={OFFER_AVAILABLE}
                        deliveryText={DELIVERY_INFORMATION_TEXT}
                        hasCod={value.isCOD === "Y"}
                        hasEmi={value.isEMIEligible === "Y"}
                        eligibleDeliveryModes={value.eligibleDeliveryModes}
                        deliveryModesATP={value.deliveryModesATP}
                        cashText={CASH_TEXT}
                        policyText={DELIVERY_RATES}
                        key={index}
                        value={value}
                        serviceablePincodeList={
                          this.props.serviceablePincodeList
                        }
                        updateOtherSellerUssID={ussid =>
                          this.updateOtherSellerUssID(ussid)
                        }
                        showPdpPiqPage={this.props.showPdpPiqPage}
                        getAllStoresForCliqAndPiq={
                          this.props.getAllStoresForCliqAndPiq
                        }
                      />
                    );
                  })}
                </div>
              )} */}
          </MobileOnly>
          <DesktopOnly>
            <div className={styles.OtherSellerHolder}>
              <div className={styles.OtherSellerHolderWithText}>
                <div className={styles.headerWrapper}>
                  <div className={styles.headerWithSellerAvailable}>
                    <div className={styles.header}>Other sellers</div>
                    <div className={styles.availableSeller}>
                      {actualSortedAvailableSeller.length} Other Sellers
                      available starting at ₹ {price}
                    </div>
                  </div>
                  <div className={styles.dropdownWithButton}>
                    <div className={styles.dropdown}>
                      <div className={styles.dropDownBox}>
                        <SelectBoxMobile2
                          label={this.state.sortOption}
                          height={35}
                          onChange={val => this.onSortByPrice(val)}
                          value={this.state.sortOption}
                          arrowColour={"black"}
                          options={[
                            {
                              label: PRICE_LOW_TO_HIGH,
                              value: PRICE_LOW_TO_HIGH
                            },
                            {
                              label: PRICE_HIGH_TO_LOW,
                              value: PRICE_HIGH_TO_LOW
                            }
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.sellerCardHeader}>
                  <div className={styles.sellerCardHeaderText}>
                    Seller’s Name
                  </div>
                  <div className={styles.sellerCardHeaderText}>Price</div>
                  <div className={styles.sellerCardHeaderText}>
                    Delivery Information
                  </div>
                  <div className={styles.sellerCardHeaderText}>
                    Buying option
                  </div>
                </div>
                {actualSortedAvailableSeller &&
                  actualSortedAvailableSeller.map((value, index) => {
                    return (
                      <SellerCard
                        heading={value.sellerName}
                        priceTitle={PRICE_TEXT}
                        discountPrice={
                          value.specialPriceSeller.formattedValueNoDecimal
                        }
                        price={value.mrpSeller.formattedValueNoDecimal}
                        offerText={OFFER_AVAILABLE}
                        deliveryText={DELIVERY_INFORMATION_TEXT}
                        hasCod={value.isCOD === "Y"}
                        hasEmi={value.isEMIEligible === "Y"}
                        eligibleDeliveryModes={value.eligibleDeliveryModes}
                        deliveryModesATP={value.eligibleDeliveryModes}
                        cashText={CASH_TEXT}
                        policyText={DELIVERY_RATES}
                        key={index}
                        value={value}
                        serviceablePincodeList={
                          this.props.serviceablePincodeList
                        }
                        addToBag={() =>
                          this.addToCartAccordingToTheUssid(value.USSID)
                        }
                        goToBag={() => this.goToCart()}
                        productListingId={
                          this.props.productDetails &&
                          this.props.productDetails.productListingId
                        }
                        winningUssID={value.USSID}
                        displayToast={message =>
                          this.props.displayToast(message)
                        }
                        updateOtherSellerUssID={ussid =>
                          this.updateOtherSellerUssID(ussid)
                        }
                        showPdpPiqPage={() => this.showQuiqPage(value.USSID)}
                        getAllStoresForCliqAndPiq={
                          this.props.getAllStoresForCliqAndPiq
                        }
                        exchangeAvailable={value.exchangeAvailable}
                        openExchangeModal={() => this.openExchangeModal(value)}
                      />
                    );
                  })}
                {/*As of now unavailable sellers won't be shown in other seller page to reflect the same
                  behaviour as in ios and android apps.
                  {sortedUnAvailableSellers &&
                    sortedUnAvailableSellers.map((value, index) => {
                      return (
                        <SellerCard
                          heading={value.sellerName}
                          priceTitle={PRICE_TEXT}
                          disabled={true}
                          discountPrice={
                            value.specialPriceSeller.formattedValueNoDecimal
                          }
                          price={value.mrpSeller.formattedValueNoDecimal}
                          offerText={OFFER_AVAILABLE}
                          deliveryText={DELIVERY_INFORMATION_TEXT}
                          hasCod={value.isCOD === "Y"}
                          hasEmi={value.isEMIEligible === "Y"}
                          eligibleDeliveryModes={value.eligibleDeliveryModes}
                          deliveryModesATP={value.deliveryModesATP}
                          cashText={CASH_TEXT}
                          policyText={DELIVERY_RATES}
                          key={index}
                          value={value}
                          serviceablePincodeList={
                            this.props.serviceablePincodeList
                          }
                          updateOtherSellerUssID={ussid =>
                            this.updateOtherSellerUssID(ussid)
                          }
                          showPdpPiqPage={this.props.showPdpPiqPage}
                          getAllStoresForCliqAndPiq={
                            this.props.getAllStoresForCliqAndPiq
                          }
                        />
                      );
                    })} */}
              </div>
            </div>
          </DesktopOnly>
        </div>
      </PdpFrame>
    );
  }
}

export default ProductSellerPage;
