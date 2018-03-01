import React, { Component } from "react";
import MDSpinner from "react-md-spinner";
import ProductGalleryMobile from "./ProductGalleryMobile";
import ProductDetailsMainCard from "./ProductDetailsMainCard";
import ProductDetails from "./ProductDetails";
import PdpFrame from "./PdpFrame";
import OfferCard from "./OfferCard";
import ColourSelector from "./ColourSelector";
import SizeSelector from "./SizeSelector";
import { Image } from "xelpmoc-core";
import RatingAndTextLink from "./RatingAndTextLink";
import HollowHeader from "./HollowHeader.js";
import PdpLink from "./PdpLink";
import styles from "./ProductDescriptionPage.css";
import DeliveryInformation from "../../general/components/DeliveryInformations.js";
import * as Cookie from "../../lib/Cookie";
import {
  PRODUCT_REVIEW_ROUTER,
  MOBILE_PDP_VIEW,
  PRODUCT_SELLER_ROUTER,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  GLOBAL_ACCESS_TOKEN,
  CART_DETAILS_FOR_ANONYMOUS,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  ANONYMOUS_USER,
  CHECKOUT_ROUTER,
  PRODUCT_CART_ROUTER
} from "../../lib/constants";
const DELIVERY_TEXT = "Delivery Options For";
const PIN_CODE = "110011";
class ProductDescriptionPage extends Component {
  componentWillMount() {
    this.props.getProductDescription();
    this.props.getProductSizeGuide();
    this.props.getPdpEmi();
    this.props.getProductWishList();
  }
  onSave() {
    if (this.props.onSave) {
      this.props.onSave();
    }
  }
  onAddToBag() {
    if (this.props.onAddToBag) {
      this.props.onAddToBag();
    }
  }
  renderLoader() {
    return (
      <div className={styles.loadingIndicator}>
        <MDSpinner />
      </div>
    );
  }
  goToReviewPage = () => {
    this.props.history.push(PRODUCT_REVIEW_ROUTER);
  };
  goToSellerPage = () => {
    this.props.history.push(PRODUCT_SELLER_ROUTER);
  };
  showEmiModal = () => {
    if (this.props.showEmiPlans) {
      this.props.showEmiPlans();
    }
  };

  renderAddressModal = () => {
    if (this.props.showAddress) {
      this.props.showAddress();
    }
  };

  goToCouponPage = () => {
    this.props.showCouponModal(this.props.productDetails);
  };

  addProductToBag = () => {
    let productDetails = {};
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let cartDetailsForAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
    let cartDetailsLoggedInUser = Cookie.getCookie(
      CART_DETAILS_FOR_LOGGED_IN_USER
    );
    if (userDetails) {
      Object.assign(productDetails, {
        userId: JSON.parse(userDetails).customerInfo.mobileNumber,
        accessToken: JSON.parse(customerCookie).access_token,
        cartId: JSON.parse(cartDetailsLoggedInUser).code
      });
    } else {
      Object.assign(productDetails, {
        userId: ANONYMOUS_USER,
        accessToken: JSON.parse(globalCookie).access_token,
        cartId: JSON.parse(cartDetailsForAnonymous).guid
      });
    }

    this.props.addProductToCart(productDetails);
  };
  addProductToWishList = () => {
    if (this.props.addProductToWishList) {
      let productDetails = {};
      productDetails.listingId = this.props.productDetails.productListingId;
      this.props.addProductToWishList(productDetails);
    }
  };
  renderToMyBag() {
    this.props.history.push(PRODUCT_CART_ROUTER);
  }
  render() {
    if (this.props.productDetails) {
      const productData = this.props.productDetails;
      const mobileGalleryImages = productData.galleryImagesList.filter(val => {
        return val.imageType === MOBILE_PDP_VIEW;
      })[0].galleryImages;
      return (
        <PdpFrame
          addProductToBag={() => this.addProductToBag()}
          addProductToWishList={() => this.addProductToWishList()}
        >
          <div className={styles.base}>
            <div className={styles.pageHeader}>
              <HollowHeader
                addProductToBag={() => this.renderToMyBag()}
                addProductToWishList={this.props.addProductToWishList}
                history={this.props.history}
              />
            </div>
            <ProductGalleryMobile>
              {mobileGalleryImages.map((val, idx) => {
                return <Image image={val.value} key={idx} />;
              })}
            </ProductGalleryMobile>
            <div className={styles.content}>
              <ProductDetailsMainCard
                productName={productData.productBrandInfo.brandName}
                productDescription={productData.productName}
                price={productData.mrpPrice.formattedValue}
                discountPrice={productData.discountedPrice.formattedValue}
                averageRating={productData.averageRating}
              />
            </div>
            {productData.emiInfo && (
              <div className={styles.info}>
                {productData.emiInfo.emiText}
                <span className={styles.link} onClick={this.showEmiModal}>
                  View Plans
                </span>
              </div>
            )}

            {productData.variantOptions &&
              productData.variantOptions.showColor && (
                <div>
                  <SizeSelector
                    showSizeGuide={this.props.showSizeGuide}
                    data={productData.variantOptions.colorlink
                      .filter(option => {
                        return option.selected;
                      })
                      .map(value => {
                        return value.sizelink;
                      })}
                  />
                  <ColourSelector
                    data={productData.variantOptions.colorlink}
                    selected={productData.variantOptions.colorlink
                      .filter(option => {
                        return option.selected;
                      })
                      .map(value => {
                        return value.color;
                      })}
                    updateColour={val => {}}
                    getProductSpecification={this.props.getProductSpecification}
                    history={this.props.history}
                  />
                </div>
              )}
            <OfferCard
              endTime={productData.productOfferPromotion[0].validTill.date}
              heading={productData.productOfferPromotion[0].promotionTitle}
              description={productData.productOfferPromotion[0].promotionDetail}
              onClick={this.goToCouponPage}
            />
            {productData.eligibleDeliveryModes &&
              productData.eligibleDeliveryModes.map((val, idx) => {
                return (
                  <DeliveryInformation
                    key={idx}
                    header={val.name}
                    placedTime={val.timeline}
                    type={val.code}
                    onClick={() => this.renderAddressModal()}
                    deliveryOptions={DELIVERY_TEXT}
                    label={PIN_CODE}
                  />
                );
              })}
            <div className={styles.separator}>
              <RatingAndTextLink
                onClick={this.goToReviewPage}
                averageRating={productData.averageRating}
                numberOfReview={productData.productReviewsCount}
              />
            </div>
            <div className={styles.details}>
              <ProductDetails data={productData.productDetails} />
            </div>
            <div className={styles.separator}>
              <PdpLink onClick={this.goToSellerPage}>
                <div
                  className={styles.sellers}
                  dangerouslySetInnerHTML={{
                    __html: productData.otherSellersText
                  }}
                />
              </PdpLink>
            </div>
          </div>
        </PdpFrame>
      );
    } else {
      return this.renderLoader();
    }
  }
}

export default ProductDescriptionPage;
