import React from "react";
import PdpFrame from "./PdpFrame";
import find from "lodash.find";
import ProductDetailsMainCard from "./ProductDetailsMainCard";
import Image from "../../xelpmoc-core/Image";
import ProductGalleryMobile from "./ProductGalleryMobile";
import ProductFeatures from "./ProductFeatures";
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
  NO,
  PRODUCT_DESCRIPTION_PRODUCT_CODE,
  PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  COLLECT,
  LOGIN_PATH,
  SUCCESS,
  BUY_NOW_PRODUCT_DETAIL,
  BUY_NOW_ERROR_MESSAGE
} from "../../lib/constants";
import LoadableVisibility from "react-loadable-visibility/react-loadable";
import { WISHLIST_FOOTER_BUTTON_TYPE } from "../../wishlist/components/AddToWishListButton";
import AddToWishListButtonContainer from "../../wishlist/containers/AddToWishListButtonContainer";
import { SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP } from "../../lib/adobeUtils";
import { checkUserLoggedIn } from "../../lib/userUtils";
const PRODUCT_QUANTITY = "1";

const ProductDetails = LoadableVisibility({
  loader: () => import("./ProductDetails"),
  loading: () => <div />,
  delay: 400
});

const ColourSelector = LoadableVisibility({
  loader: () => import("./ColourSelector"),
  loading: () => <div />,
  delay: 400
});

const JewelleryDetailsAndLink = LoadableVisibility({
  loader: () => import("./JewelleryDetailsAndLink"),
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
const VIDEO = "Video";
const IMAGE = "Image";
export default class PdpElectronics extends React.Component {
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
    let productDetails = {};
    productDetails.code = this.props.productDetails.productListingId;
    productDetails.quantity = PRODUCT_QUANTITY;
    productDetails.ussId = this.props.productDetails.winningUssID;

    if (!this.props.productDetails.winningSellerPrice) {
      this.props.displayToast("Product is not saleable");
    } else {
      if (
        this.props.productDetails.allOOStock ||
        this.props.productDetails.winningSellerAvailableStock === "0"
      ) {
        this.props.displayToast("Product is out of stock");
      } else {
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

  showEmiModal = () => {
    const cartValue = this.props.productDetails.winningSellerPrice.value;
    const productCode = this.props.productDetails.productListingId;
    const ussId = this.props.productDetails.winningUssID;
    const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    const globalAccessToken = JSON.parse(globalCookie).access_token;
    this.props.getPdpEmi(globalAccessToken, cartValue, productCode, ussId);
    this.props.showEmiModal();
  };
  handleShowPiqPage = () => {
    const eligibleForCNC = find(
      this.props.productDetails &&
        this.props.productDetails.eligibleDeliveryModes,
      deliveryMode => {
        return deliveryMode.code === COLLECT;
      }
    );
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
            return image[0] && image[0].value;
          })
      : [];

    if (productData) {
      let price = "";
      let discountPrice = "";
      let seoDoublePrice = 0;
      if (
        productData.winningSellerPrice &&
        productData.winningSellerPrice.doubleValue
      ) {
        seoDoublePrice = productData.winningSellerPrice.doubleValue;
      } else if (productData.mrpPrice && productData.mrpPrice.doubleValue) {
        seoDoublePrice = productData.mrpPrice.doubleValue;
      }
      if (
        productData.mrpPrice &&
        productData.mrpPrice.formattedValueNoDecimal
      ) {
        price = productData.mrpPrice.formattedValueNoDecimal;
      }

      if (
        productData.winningSellerPrice &&
        productData.winningSellerPrice.formattedValueNoDecimal
      ) {
        discountPrice = productData.winningSellerPrice.formattedValueNoDecimal;
      }
      return (
        <PdpFrame
          displayToast={message => this.props.displayToast(message)}
          addProductToBag={buyNowFlag => this.addToCart(buyNowFlag)}
          goToCart={() => this.goToCart()}
          gotoPreviousPage={() => this.gotoPreviousPage()}
          productListingId={productData.productListingId}
          ussId={productData.winningUssID}
          showPincodeModal={() => this.showPincodeModal()}
          outOfStock={
            productData.allOOStock ||
            !productData.winningSellerPrice ||
            productData.winningSellerAvailableStock === "0"
          }
        >
          <div className={styles.gallery}>
            <ProductGalleryMobile
              paddingBottom={
                productData.rootCategory === "Watches" ? "114" : "89.4"
              }
            >
              {mobileGalleryImages.map((val, idx) => {
                return (
                  <Image
                    image={val}
                    key={idx}
                    color={
                      productData.rootCategory === "Watches"
                        ? "#ffffff"
                        : "#f5f5f5"
                    }
                    fit="contain"
                  />
                );
              })}
            </ProductGalleryMobile>
            {(productData.allOOStock ||
              productData.winningSellerAvailableStock === "0") && (
              <div className={styles.flag}>Out of stock</div>
            )}
            {!productData.winningSellerPrice && (
              <div className={styles.flag}>Not Saleable</div>
            )}
          </div>
          <div
            className={
              productData.rootCategory !== "Watches"
                ? styles.whiteBackground
                : styles.base
            }
          >
            <div className={styles.content}>
              {productData.rootCategory !== "Watches" && (
                <ProductDetailsMainCard
                  brandName={productData.brandName}
                  productName={productData.productName}
                  brandUrl={productData.brandURL}
                  history={this.props.history}
                  doublePrice={seoDoublePrice}
                  price={price}
                  numberOfReviews={productData.numberOfReviews}
                  discountPrice={discountPrice}
                  averageRating={productData.averageRating}
                  goToReviewPage={this.goToReviewPage}
                  discount={productData.discount}
                />
              )}
              {productData.rootCategory === "Watches" && (
                <JewelleryDetailsAndLink
                  brandName={productData.brandName}
                  productName={productData.productName}
                  brandUrl={productData.brandURL}
                  history={this.props.history}
                  price={discountPrice}
                  doublePrice={seoDoublePrice}
                  numberOfReviews={productData.numberOfReviews}
                  discountPrice={price}
                  averageRating={productData.averageRating}
                  goToReviewPage={this.goToReviewPage}
                  discount={productData.discount}
                />
              )}
            </div>
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
                productListingId={productData.productListingId}
                winningUssID={productData.winningUssID}
                type={WISHLIST_FOOTER_BUTTON_TYPE}
                setDataLayerType={SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP}
              />
            </div>
            <OfferCard
              theme={2}
              showDetails={this.props.showOfferDetails}
              potentialPromotions={productData.potentialPromotions}
              secondaryPromotions={productData.productOfferMsg}
            />
            {productData.variantOptions && (
              <React.Fragment>
                <SizeSelector
                  history={this.props.history}
                  sizeSelected={this.checkIfSizeSelected()}
                  productId={productData.productListingId}
                  hasSizeGuide={productData.showSizeGuide}
                  showSizeGuide={this.props.showSizeGuide}
                  data={productData.variantOptions}
                />
                <ColourSelector
                  data={productData.variantOptions}
                  productId={productData.productListingId}
                  history={this.props.history}
                  updateColour={val => {}}
                  getProductSpecification={this.props.getProductSpecification}
                />
              </React.Fragment>
            )}
          </div>

          {this.props.productDetails.isServiceableToPincode &&
          this.props.productDetails.isServiceableToPincode.pinCode ? (
            <PdpPincode
              hasPincode={true}
              pincode={this.props.productDetails.isServiceableToPincode.pinCode}
              onClick={() => this.showPincodeModal()}
              {...this.props.productDetails.isServiceableToPincode}
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
              eligibleDeliveryModes={productData.eligibleDeliveryModes}
              deliveryModesATP={productData.deliveryModesATP}
            />
          )}
          <div className={styles.separator}>
            <OtherSellersLink
              onClick={this.goToSellerPage}
              otherSellers={productData.otherSellers}
              winningSeller={productData.winningSellerName}
            />
          </div>
          {productData.rootCategory !== "Watches" && (
            <div className={styles.details}>
              {productData.details && (
                <Accordion
                  text="Product Description"
                  headerFontSize={16}
                  isOpen={true}
                >
                  <div
                    className={styles.accordionContent}
                    itemProp="description"
                  >
                    {productData.productDescription}
                    <div style={{ marginTop: 10 }}>
                      {productData.details &&
                        productData.details.map(val => {
                          return <div className={styles.list}>{val.value}</div>;
                        })}
                    </div>
                  </div>
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
              {productData.brandInfo && (
                <ProductFeature
                  heading="Brand Info"
                  content={productData.brandInfo}
                />
              )}
            </div>
          )}
          {productData.rootCategory === "Watches" && (
            <div className={styles.details}>
              {productData.productDescription && (
                <Accordion
                  text="Product Description"
                  headerFontSize={16}
                  isOpen={true}
                >
                  <div
                    className={styles.accordionContent}
                    itemProp="description"
                  >
                    {productData.productDescription}
                  </div>
                </Accordion>
              )}
              {productData.classifications && (
                <Accordion
                  text="Features & Functions"
                  headerFontSize={16}
                  isOpen={false}
                >
                  {productData.classifications.map(val => {
                    if (val.specifications) {
                      return val.specifications.map(value => {
                        return (
                          <div
                            style={{
                              paddingBottom: 10
                            }}
                          >
                            <div className={styles.sideHeader}>{value.key}</div>
                            <div className={styles.sideContent}>
                              {value.value}
                            </div>
                          </div>
                        );
                      });
                    } else {
                      return null;
                    }
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
              {productData.brandInfo && (
                <ProductFeature
                  heading="Brand Info"
                  content={productData.brandInfo}
                />
              )}
            </div>
          )}
          <div className={styles.separator}>
            <RatingAndTextLink
              onClick={this.goToReviewPage}
              averageRating={productData.averageRating}
              numberOfReview={productData.numberOfReviews}
            />
          </div>
          {productData.rootCategory !== "Watches" && (
            <div className={styles.details}>
              {productData.classifications && (
                <ProductFeatures features={productData.classifications} />
              )}
            </div>
          )}
          {productData.rootCategory === "Watches" && (
            <div className={styles.details}>
              {productData.details && (
                <ProductDetails data={productData.details} />
              )}
              {productData.warranty &&
                productData.warranty.length > 0 && (
                  <ProductFeature
                    heading="Warranty"
                    content={productData.warranty[0]}
                  />
                )}
            </div>
          )}
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
