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
  GLOBAL_ACCESS_TOKEN
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
  PRODUCT_OTHER_SELLER_ROUTER
} from "../../lib/constants";
import {
  renderMetaTags,
  renderMetaTagsWithoutSeoObject
} from "../../lib/seoUtils";
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
      sortOption: PRICE_LOW_TO_HIGH
    };
  }
  priceValue;
  gotoPreviousPage = () => {
    const url = this.props.location.pathname.replace(
      PRODUCT_SELLER_ROUTER_SUFFIX,
      ""
    );
    this.props.history.replace(url);
  };

  addToCart = () => {
    let productDetails = {};
    productDetails.code = this.props.productDetails.productListingId;
    productDetails.quantity = PRODUCT_QUANTITY;
    productDetails.ussId = this.state.winningUssID
      ? this.state.winningUssID
      : this.props.productDetails.winningUssID;
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let cartDetailsLoggedInUser = Cookie.getCookie(
      CART_DETAILS_FOR_LOGGED_IN_USER
    );
    let cartDetailsAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
    if (userDetails) {
      this.props.addProductToCart(
        JSON.parse(userDetails).userName,
        JSON.parse(cartDetailsLoggedInUser).code,
        JSON.parse(customerCookie).access_token,
        productDetails
      );
    } else {
      this.props.addProductToCart(
        ANONYMOUS_USER,
        JSON.parse(cartDetailsAnonymous).guid,
        JSON.parse(globalCookie).access_token,
        productDetails
      );
    }
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

  componentDidMount() {
    if (this.props.match.path === PRODUCT_OTHER_SELLER_ROUTER) {
      this.props.getProductDescription(this.props.match.params[0]);
    } else {
      //need to show error page
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
    return productDetails.seo
      ? renderMetaTags(productDetails)
      : renderMetaTagsWithoutSeoObject(productDetails);
  };

  render() {
    const sellers = this.props.productDetails
      ? this.props.productDetails.otherSellers
      : [];
    let availableSeller = {};
    const availableSellers = sellers.filter(val => {
      return parseInt(val.availableStock, 10) > 0;
    });
    const unAvailableSellers = sellers.filter(val => {
      return parseInt(val.availableStock, 10) <= 0;
    });
    let price;
    if (availableSellers && availableSellers[0]) {
      price = availableSellers[0].specialPriceSeller.doubleValue;
    }
    let sortedAvailableSellers = availableSellers;
    let sortedUnAvailableSellers = unAvailableSellers;
    if (this.state.sortOption === PRICE_HIGH_TO_LOW) {
      sortedAvailableSellers = availableSellers.reverse();
      sortedUnAvailableSellers = unAvailableSellers.reverse();
    }
    const mobileGalleryImages =
      this.props.productDetails &&
      this.props.productDetails.galleryImagesList
        .map(galleryImageList => {
          return galleryImageList.galleryImages.filter(galleryImages => {
            return galleryImages.key === "product";
          });
        })
        .map(image => {
          return image[0].value;
        });
    return (
      mobileGalleryImages && (
        <PdpFrame
          addProductToBag={() => this.addToCart()}
          gotoPreviousPage={() => this.gotoPreviousPage()}
        >
          {this.renderMetaTags()}

          <div className={styles.base}>
            <ProductDetailsCard
              productImage={mobileGalleryImages[0]}
              productName={this.props.productDetails.productName}
              brandName={this.props.productDetails.brandName}
              price={
                this.props.productDetails.winningSellerPrice
                  .formattedValueNoDecimal
              }
              discountPrice={
                this.props.productDetails.mrpPrice.formattedValueNoDecimal
              }
              averageRating={this.props.productDetails.averageRating}
              totalNoOfReviews={this.props.productDetails.productReviewsCount}
            />
            <MobileOnly>
              <div className={styles.OtherSeller}>Other sellers</div>
              <div className={styles.priceWithSeller}>
                <div className={styles.seller}>
                  {availableSellers.length} Other Sellers available starting at
                  ₹
                  {price}
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
                      { label: PRICE_LOW_TO_HIGH, value: PRICE_LOW_TO_HIGH },
                      { label: PRICE_HIGH_TO_LOW, value: PRICE_HIGH_TO_LOW }
                    ]}
                  />
                </div>
              </div>
              <div>
                {sortedAvailableSellers && (
                  <SellerWithMultiSelect
                    limit={1}
                    onSelect={val => {
                      this.selectSeller(val);
                    }}
                  >
                    {sortedAvailableSellers.map((value, index) => {
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
                          cashText={CASH_TEXT}
                          policyText={DELIVERY_RATES}
                          key={index}
                          value={value}
                        />
                      );
                    })}
                  </SellerWithMultiSelect>
                )}
              </div>
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
                        cashText={CASH_TEXT}
                        policyText={DELIVERY_RATES}
                        key={index}
                        value={value}
                      />
                    );
                  })}
                </div>
              )}
            </MobileOnly>
            <DesktopOnly>
              <div className={styles.OtherSellerHolder}>
                <div className={styles.OtherSellerHolderWithText}>
                  <div className={styles.headerWrapper}>
                    <div className={styles.headerWithSellerAvailable}>
                      <div className={styles.header}>Other sellers</div>
                      <div className={styles.availableSeller}>
                        {availableSellers.length} Other Sellers available
                        starting at ₹ {price}
                      </div>
                    </div>
                    <div className={styles.dropdownWithButton}>
                      <div className={styles.dropdown}>
                        <div className={styles.dropDownBox}>
                          <SelectBoxMobile2
                            label={this.state.sortOption}
                            height={30}
                            onChange={val => this.onSortByPrice(val)}
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
                  {sortedAvailableSellers &&
                    sortedAvailableSellers.map((value, index) => {
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
                          cashText={CASH_TEXT}
                          policyText={DELIVERY_RATES}
                          key={index}
                          value={value}
                          addToBag={() => this.addToCart()}
                          productListingId={
                            this.props.productDetails.productListingId
                          }
                          winningUssID={
                            this.state.winningUssID
                              ? this.state.winningUssID
                              : this.props.productDetails.winningUssID
                          }
                        />
                      );
                    })}
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
                          cashText={CASH_TEXT}
                          policyText={DELIVERY_RATES}
                          key={index}
                          value={value}
                        />
                      );
                    })}
                </div>
              </div>
            </DesktopOnly>
          </div>
        </PdpFrame>
      )
    );
  }
}

export default ProductSellerPage;
