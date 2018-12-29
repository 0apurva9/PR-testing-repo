import React from "react";
import PdpFrame from "./PdpFrame";
import Image from "../../xelpmoc-core/Image";
import ProductGalleryMobile from "./ProductGalleryMobile";
import Accordion from "../../general/components/Accordion.js";
import styles from "./ProductDescriptionPage.css";
import * as Cookie from "../../lib/Cookie";
import TrustBadgeImage from "../components/img/trustBadge.jpg";
import queryString, { parse } from "query-string";
import {
  PRODUCT_SELLER_ROUTER_SUFFIX,
  GLOBAL_ACCESS_TOKEN,
  PRODUCT_CART_ROUTER,
  PRODUCT_REVIEWS_PATH_SUFFIX,
  YES,
  NO,
  PRODUCT_DESCRIPTION_PRODUCT_CODE,
  PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  COLLECT,
  BUY_NOW_PRODUCT_DETAIL,
  LOGIN_PATH,
  SUCCESS,
  BUY_NOW_ERROR_MESSAGE
} from "../../lib/constants";
import LoadableVisibility from "react-loadable-visibility/react-loadable";
import { WISHLIST_FOOTER_BUTTON_TYPE } from "../../wishlist/components/AddToWishListButton";
import AddToWishListButtonContainer from "../../wishlist/containers/AddToWishListButtonContainer";
import {
  SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP,
  setDataLayerForPdpDirectCalls,
  SET_DATA_LAYER_FOR_BUY_NOW_EVENT
} from "../../lib/adobeUtils";
import { checkUserLoggedIn } from "../../lib/userUtils";
import PdpFlags from "../components/PdpFlags.js";
const PriceBreakUp = LoadableVisibility({
  loader: () => import("./PriceBreakUp"),
  loading: () => <div />
});
const JewelleryDetailsAndLink = LoadableVisibility({
  loader: () => import("./JewelleryDetailsAndLink"),
  loading: () => <div />
});

const JewelleryClassification = LoadableVisibility({
  loader: () => import("./JewelleryClassification"),
  loading: () => <div />
});

const JewelleryCertification = LoadableVisibility({
  loader: () => import("./JewelleryCertification"),
  loading: () => <div />
});

const Overlay = LoadableVisibility({
  loader: () => import("./Overlay"),
  loading: () => <div />,
  delay: 400
});

const PdpPincode = LoadableVisibility({
  loader: () => import("./PdpPincode"),
  loading: () => <div />,
  delay: 1000
});

const ProductFeature = LoadableVisibility({
  loader: () => import("./ProductFeature"),
  loading: () => <div />,
  delay: 400
});

const AllDescription = LoadableVisibility({
  loader: () => import("./AllDescription"),
  loading: () => <div />,
  delay: 400
});

const RatingAndTextLink = LoadableVisibility({
  loader: () => import("./RatingAndTextLink"),
  loading: () => <div />,
  delay: 400
});

const PdpPaymentInfo = LoadableVisibility({
  loader: () => import("./PdpPaymentInfo"),
  loading: () => <div />,
  delay: 400
});

const OtherSellersLink = LoadableVisibility({
  loader: () => import("./OtherSellersLink"),
  loading: () => <div />,
  delay: 400
});

const OfferCard = LoadableVisibility({
  loader: () => import("./OfferCard"),
  loading: () => <div />,
  delay: 400
});

const SizeSelector = LoadableVisibility({
  loader: () => import("./SizeSelector"),
  loading: () => <div />,
  delay: 400
});

const PdpDeliveryModes = LoadableVisibility({
  loader: () => import("./PdpDeliveryModes"),
  loading: () => <div />,
  delay: 400
});

const PDPRecommendedSectionsContainer = LoadableVisibility({
  loader: () => import("../containers/PDPRecommendedSectionsContainer"),
  loading: () => {
    return <div />;
  },
  delay: 400
});

const NO_SIZE = "NO SIZE";
const FREE_SIZE = "Free Size";
const PRODUCT_QUANTITY = "1";
const IMAGE = "Image";
export default class PdpJewellery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProductDetails: false
    };
  }
  visitBrand() {
    if (this.props.visitBrandStore) {
      this.props.visitBrandStore();
    }
  }
  navigateToLogin() {
    const url = this.props.location.pathname;
    this.props.setUrlToRedirectToAfterAuth(url);
    this.props.history.push(LOGIN_PATH);
  }
  gotoPreviousPage = () => {
    this.props.history.goBack();
  };

  goToSellerPage = () => {
    let expressionRuleFirst = "/p-(.*)/(.*)";
    let expressionRuleSecond = "/p-(.*)";
    let productId;
    if (this.props.location.pathname.match(expressionRuleFirst)) {
      productId = this.props.location.pathname.match(expressionRuleFirst)[1];
    } else {
      productId = this.props.location.pathname.match(expressionRuleSecond)[1];
    }
    this.props.history.push(`/p-${productId}${PRODUCT_SELLER_ROUTER_SUFFIX}`);
  };

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
  addToCart = async buyNowFlag => {
    if (buyNowFlag) {
      setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_BUY_NOW_EVENT);
    }
    let productDetails = {};
    productDetails.code = this.props.productDetails.productListingId;
    productDetails.quantity = PRODUCT_QUANTITY;
    productDetails.ussId = this.props.productDetails.winningUssID;
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
          this.checkIfFreeSize() ||
          this.checkIfNoSize() ||
          this.checkIfSizeDoesNotExist()
        ) {
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
        } else {
          this.showSizeSelector(buyNowFlag);
        }
      }
    }
  };

  goToReviewPage = () => {
    const url = `${
      this.props.location.pathname
    }/${PRODUCT_REVIEWS_PATH_SUFFIX}`;
    this.props.history.push(url);
  };
  showPincodeModal() {
    if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
      this.props.showPincodeModal(this.props.match.params[0]);
    } else if (
      this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE
    ) {
      this.props.showPincodeModal(this.props.match.params[1]);
    }
  }

  showProductDetails = () => {
    this.setState({ showProductDetails: true });
  };
  showEmiModal = () => {
    const cartValue = this.props.productDetails.winningSellerPrice.value;
    const productCode = this.props.productDetails.productListingId;
    const ussId = this.props.productDetails.winningUssID;
    const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    const globalAccessToken = JSON.parse(globalCookie).access_token;
    this.props.getPdpEmi(globalAccessToken, cartValue, productCode, ussId);
    this.props.showEmiModal();
  };
  showSizeSelector = (buyNowFlag, addToWishlist) => {
    if (this.props.showSizeSelector && this.props.productDetails) {
      this.props.showSizeSelector({
        sizeSelected: this.checkIfSizeSelected(),
        productId: this.props.productDetails.productListingId,
        showSizeGuide: this.props.showSizeGuide,
        headerText: this.props.productDetails.isSizeOrLength,
        hasSizeGuide: this.props.productDetails.showSizeGuide,
        data: this.props.productDetails.variantOptions,
        productName: this.props.productDetails.productName,
        buyNowFlag: buyNowFlag,
        addToWishlist: addToWishlist
      });
    }
  };
  showPriceBreakup = () => {
    if (this.props.showPriceBreakup) {
      this.props.showPriceBreakup(
        this.props.productDetails.priceBreakUpDetailsMap
      );
    }
  };
  checkIfSizeSelected = () => {
    if (this.props.location.state && this.props.location.state.isSizeSelected) {
      return true;
    } else {
      return false;
    }
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
  checkIfSizeDoesNotExist = () => {
    return this.props.productDetails.variantOptions
      ? this.props.productDetails.variantOptions.filter(val => {
          return val.sizelink.size && val.sizelink.isAvailable;
        }).length === 0
        ? true
        : false
      : true;
  };
  handleShowPiqPage = () => {
    const eligibleForCNC =
      this.props.productDetails &&
      this.props.productDetails.eligibleDeliveryModes.find(deliveryMode => {
        return deliveryMode.code === COLLECT;
      });
    if (eligibleForCNC && this.props.getAllStoresForCliqAndPiq) {
      this.props.showPdpPiqPage();
      this.props.getAllStoresForCliqAndPiq();
    }
  };
  componentDidMount() {
    const parsedQueryString = queryString.parse(this.props.location.search);
    //show the EmiModal if showAmpEmi is true
    if (parsedQueryString.showAmpEmi === "true") {
      this.showEmiModal();
    }
    // add the product to bag and make the popup (View bag and Continue shopping) open.
    if (parsedQueryString.addToBagAmp === "true") {
      this.addToCart();
      this.props.history.replace(this.props.location.pathname);
    }
  }
  render() {
    const productData = this.props.productDetails;
    const mobileGalleryImages = productData.galleryImagesList
      ? productData.galleryImagesList
          .filter(val => {
            return val.mediaType === IMAGE;
          })
          .map(galleryImageList => {
            return galleryImageList.galleryImages.filter(galleryImages => {
              return galleryImages.key === "product";
            });
          })
          .map(image => {
            return image[0].value;
          })
      : [];
    if (productData) {
      let price = "";
      let discountPrice = "";
      if (productData.mrpPrice) {
        discountPrice = productData.mrpPrice.formattedValueNoDecimal;
      }

      if (productData.winningSellerPrice) {
        price = productData.winningSellerPrice.formattedValueNoDecimal;
      }
      let seoDoublePrice = 0;
      if (
        productData.winningSellerPrice &&
        productData.winningSellerPrice.doubleValue
      ) {
        seoDoublePrice = productData.winningSellerPrice.doubleValue;
      } else if (productData.mrpPrice && productData.mrpPrice.doubleValue) {
        seoDoublePrice = productData.mrpPrice.doubleValue;
      }

      return (
        <PdpFrame
          goToCartPageFlag={
            this.props.location.state &&
            this.props.location.state.goToCartPageFlag
          }
          goToCart={() => this.goToCart()}
          gotoPreviousPage={() => this.gotoPreviousPage()}
          displayToast={message => this.props.displayToast(message)}
          addProductToBag={buyNowFlag => this.addToCart(buyNowFlag)}
          showPincodeModal={() => this.showPincodeModal()}
          productListingId={productData.productListingId}
          outOfStock={
            productData.allOOStock ||
            !productData.winningSellerPrice ||
            (productData.winningSellerAvailableStock === "0" &&
              this.checkIfSizeSelected())
          }
          ussId={productData.winningUssID}
        >
          <div className={styles.gallery}>
            <ProductGalleryMobile paddingBottom="114">
              {mobileGalleryImages.map((val, idx) => {
                return (
                  <Image image={val} key={idx} color="#ffffff" fit="contain" />
                );
              })}
            </ProductGalleryMobile>
            {productData.winningSellerPrice && (
              <PdpFlags
                discountPercent={productData.discount}
                isOfferExisting={productData.isOfferExisting}
                onlineExclusive={productData.isOnlineExclusive}
                outOfStock={productData.allOOStock}
                newProduct={productData.isProductNew}
              />
            )}
            {!productData.winningSellerPrice && (
              <div className={styles.flag}>Not Saleable</div>
            )}
          </div>
          <div className={styles.content}>
            <JewelleryDetailsAndLink
              brandName={productData.brandName}
              productName={productData.productName}
              price={price}
              discountPrice={discountPrice}
              averageRating={productData.averageRating}
              numberOfReviews={productData.numberOfReviews}
              goToReviewPage={this.goToReviewPage}
              doublePrice={seoDoublePrice}
              discount={productData.discount}
              brandUrl={productData.brandURL}
              hasPriceBreakUp={productData.showPriceBrkUpPDP === "Yes"}
              history={this.props.history}
              showPriceBreakUp={this.showPriceBreakup}
            />
          </div>
          {productData.details &&
            productData.details.length > 0 && (
              <div className={styles.info}>
                <span className={styles.textOffset}>
                  {productData.details[0].value}
                </span>
                {this.state.showProductDetails && (
                  <div>{productData.productDescription}</div>
                )}
                {!this.state.showProductDetails && (
                  <span
                    className={styles.link}
                    onClick={this.showProductDetails}
                  >
                    Read More
                  </span>
                )}
              </div>
            )}
          <PdpPaymentInfo
            hasEmi={productData.isEMIEligible}
            hasCod={productData.isCOD}
            seStartingPrice={productData.seStartingPrice}
            nceAvailable={productData.nceAvailable}
            nceStartingPrice={productData.nceStartingPrice}
            showEmiModal={this.showEmiModal}
          />
          <div className={styles.wishlist}>
            <AddToWishListButtonContainer
              showSizeSelector={() => this.showSizeSelector(false, true)}
              isSizeSelectedForAddToWishlist={
                this.checkIfSizeSelected() ||
                this.checkIfSizeDoesNotExist() ||
                this.checkIfFreeSize() ||
                this.checkIfNoSize()
                  ? false
                  : true
              }
              productListingId={productData.productListingId}
              winningUssID={productData.winningUssID}
              type={WISHLIST_FOOTER_BUTTON_TYPE}
              setDataLayerType={SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP}
            />
          </div>
          <OfferCard
            showDetails={this.props.showOfferDetails}
            potentialPromotions={productData.potentialPromotions}
            secondaryPromotions={productData.productOfferMsg}
          />

          {productData.variantOptions &&
            !this.checkIfNoSize() &&
            !this.checkIfSizeDoesNotExist() && (
              <React.Fragment>
                <SizeSelector
                  history={this.props.history}
                  headerText={productData.isSizeOrLength}
                  sizeSelected={this.checkIfSizeSelected()}
                  productId={productData.productListingId}
                  hasSizeGuide={productData.showSizeGuide}
                  showSizeGuide={this.props.showSizeGuide}
                  data={productData.variantOptions}
                />
              </React.Fragment>
            )}
          {productData.certificationMapFrJwlry && (
            <JewelleryCertification
              certifications={productData.certificationMapFrJwlry}
            />
          )}
          {this.props.productDetails.isServiceableToPincode &&
          this.props.productDetails.isServiceableToPincode.pinCode ? (
            <PdpPincode
              hasPincode={true}
              pincode={this.props.productDetails.isServiceableToPincode.pinCode}
              onClick={() => this.showPincodeModal()}
            />
          ) : (
            <PdpPincode onClick={() => this.showPincodeModal()} />
          )}
          {this.props.productDetails.isServiceableToPincode &&
          this.props.productDetails.isServiceableToPincode.status === NO ? (
            <Overlay labelText="This item can't be delivered to your PIN code">
              <PdpDeliveryModes
                eligibleDeliveryModes={productData.eligibleDeliveryModes}
                deliveryModesATP={productData.deliveryModesATP}
              />
            </Overlay>
          ) : (
            <PdpDeliveryModes
              onPiq={this.handleShowPiqPage}
              getAllStoresForCliqAndPiq={this.props.getAllStoresForCliqAndPiq}
              eligibleDeliveryModes={productData.eligibleDeliveryModes}
              deliveryModesATP={productData.deliveryModesATP}
            />
          )}
          <div className={styles.separator}>
            <OtherSellersLink
              otherSellers={productData.otherSellers}
              winningSeller={productData.winningSellerName}
            />
          </div>
          <div className={styles.details}>
            {productData.details && (
              <Accordion
                text="Product Description"
                headerFontSize={16}
                isOpen={true}
              >
                <div className={styles.accordionContent} itemProp="description">
                  {productData.productDescription}
                </div>
              </Accordion>
            )}
            {productData.fineJewelleryClassificationList && (
              <JewelleryClassification
                data={productData.fineJewelleryClassificationList}
              />
            )}
            {productData.priceBreakUpDetailsMap &&
              productData.showPriceBrkUpPDP === "Yes" && (
                <PriceBreakUp data={productData.priceBreakUpDetailsMap} />
              )}
            {productData.returnAndRefund && (
              <Accordion text="Returns & Policies" headerFontSize={16}>
                {productData.returnAndRefund.map(val => {
                  return (
                    <div
                      className={styles.list}
                      dangerouslySetInnerHTML={{
                        __html: val.refundReturnItem
                      }}
                    />
                  );
                })}
              </Accordion>
            )}
            {productData.knowMore && (
              <Accordion text="Know More" headerFontSize={16}>
                {productData.knowMore &&
                  productData.knowMore.map(val => {
                    return (
                      <div className={styles.list}>{val.knowMoreItem}</div>
                    );
                  })}
              </Accordion>
            )}
          </div>
          <div className={styles.separator}>
            <RatingAndTextLink
              onClick={this.goToReviewPage}
              averageRating={productData.averageRating}
              numberOfReview={productData.numberOfReviews}
            />
          </div>

          {productData.APlusContent && (
            <AllDescription
              templateName={productData.APlusContent.temlateName}
              productContent={productData.APlusContent.productContent}
            />
          )}
          <PDPRecommendedSectionsContainer />
          <div className={styles.trustLogo}>
            <Image image={TrustBadgeImage} fit="cover" />
          </div>
        </PdpFrame>
      );
    } else {
      return null;
    }
  }
}
