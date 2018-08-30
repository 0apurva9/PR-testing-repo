import React from "react";
import PdpFrame from "./PdpFrame";
import find from "lodash.find";
import ProductGalleryDesktop from "./ProductGalleryDesktop";
import JewelleryCertification from "./JewelleryCertification";
import ProductFeatures from "./ProductFeatures";
import Accordion from "../../general/components/Accordion.js";
import JewelleryClassification from "./JewelleryClassification";
import PriceBreakUp from "./PriceBreakUp";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import ProductReviewListContainer from "../containers/ProductReviewListContainer";
import SizeQuantitySelect from "./SizeQuantitySelect";
import APlusTemplate from "./APlusTemplate";
import LoadableVisibility from "react-loadable-visibility/react-loadable";
import TrustBadgeImage from "../components/img/trustBadge.jpg";
import Button from "../../general/components/Button";
import SearchAndUpdate from "./SearchAndUpdate";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import AddToWishListButtonContainer from "../../wishlist/containers/AddToWishListButtonContainer";
import { SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP } from "../../lib/adobeUtils";
import { reverse } from "../reducers/utils";
import * as Cookie from "../../lib/Cookie";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  GLOBAL_ACCESS_TOKEN,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CART_DETAILS_FOR_ANONYMOUS,
  ANONYMOUS_USER,
  PRODUCT_SELLER_ROUTER_SUFFIX,
  PRODUCT_CART_ROUTER,
  PRODUCT_REVIEWS_PATH_SUFFIX,
  PRODUCT_DESCRIPTION_PRODUCT_CODE,
  PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE,
  NO,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  COLLECT
} from "../../lib/constants";

import styles from "./ProductDescriptionPage.css";
const ProductDetailsMainCard = LoadableVisibility({
  loader: () => import("./ProductDetailsMainCard"),
  loading: () => <div />,
  delay: 400
});
const WISHLIST_ICON_TYPE = "wishlistIcon";
const ProductDetails = LoadableVisibility({
  loader: () => import("./ProductDetails"),
  loading: () => <div />,
  delay: 400
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

const ColourSelector = LoadableVisibility({
  loader: () => import("./ColourSelector"),
  loading: () => <div />,
  delay: 400
});

const PdpDeliveryModes = LoadableVisibility({
  loader: () => import("./PdpDeliveryModes"),
  loading: () => <div />,
  delay: 1000
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
export default class PdpApparel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productQuantityOption: "Quantity",
      sizeError: false,
      quantityError: false,
      showProductDetails: false
    };
  }
  visitBrand() {
    if (this.props.visitBrandStore) {
      this.props.visitBrandStore();
    }
  }
  gotoPreviousPage = () => {
    this.props.history.goBack();
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
  checkPinCodeAvailability(pincode, productCode) {
    if (this.props.addressModalForCartPage) {
      this.props.checkPinCodeAvailability(pincode);
      return;
    }
    this.props.getProductPinCode(pincode, productCode);
  }
  addToCart = () => {
    let productDetails = {};
    productDetails.code = this.props.productDetails.productListingId;
    productDetails.quantity = PRODUCT_QUANTITY;
    productDetails.ussId = this.props.productDetails.winningUssID;
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let cartDetailsLoggedInUser = Cookie.getCookie(
      CART_DETAILS_FOR_LOGGED_IN_USER
    );
    let cartDetailsAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
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
          this.checkIfNoSize()
        ) {
          if (
            (!this.checkIfQuantitySelected() ||
              this.state.productQuantityOption === "Quantity") &&
            this.props.productDetails.rootCategory === "HomeFurnishing"
          ) {
            this.props.displayToast("Please select a quantity to continue");
            this.setState({ quantityError: true });
          } else {
            if (userDetails) {
              if (cartDetailsLoggedInUser && customerCookie) {
                this.props.addProductToCart(
                  JSON.parse(userDetails).userName,
                  JSON.parse(cartDetailsLoggedInUser).code,
                  JSON.parse(customerCookie).access_token,
                  productDetails
                );
              }
            } else {
              if (cartDetailsAnonymous && globalCookie) {
                this.props.addProductToCart(
                  ANONYMOUS_USER,
                  JSON.parse(cartDetailsAnonymous).guid,
                  JSON.parse(globalCookie).access_token,
                  productDetails
                );
              }
            }
          }
          this.setState({ sizeError: false });
        } else {
          this.props.displayToast("Please select a size to continue");
          this.setState({ sizeError: true });
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
  renderRatings = () => {
    return null;
  };
  // Functions only used in HomeFurnishings
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
  updateQuantity = quantity => {
    this.setState({
      productQuantityOption: quantity,
      quantityError: false
    });
  };
  updateSize = () => {
    this.setState({ sizeError: false });
  };
  //---------------Functions used only in HomeFurnishings Ends here---------------------
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
    const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    const globalAccessToken = JSON.parse(globalCookie).access_token;
    this.props.getPdpEmi(globalAccessToken, cartValue);
    this.props.getEmiTerms(globalAccessToken, cartValue);
    this.props.showEmiModal();
  };
  showSizeSelector = () => {
    if (
      this.props.showSizeSelector &&
      this.props.productDetails &&
      this.props.productDetails.variantOptions
    ) {
      this.props.showSizeSelector({
        sizeSelected: this.checkIfSizeSelected(),
        productName: this.props.productDetails.productName,
        productId: this.props.productDetails.productListingId,
        showSizeGuide: this.props.showSizeGuide,
        hasSizeGuide: this.props.productDetails.showSizeGuide,
        data: this.props.productDetails.variantOptions
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
  handleShowSizeguide() {
    if (this.props.getProductSizeGuide) {
      this.props.getProductSizeGuide();
    }
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
  goToPage = url => {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
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

  render() {
    console.log(this.props);
    const productData = this.props.productDetails;
    const breadCrumbs = productData.seo.breadcrumbs;
    const reverseBreadCrumbs = reverse(breadCrumbs);

    const images = productData.galleryImagesList
      ? productData.galleryImagesList.filter(val => {
          return val.mediaType === IMAGE;
        })
      : [];
    const productImages = images
      .map(galleryImageList => {
        return galleryImageList.galleryImages.filter(galleryImages => {
          return galleryImages.key === "product";
        });
      })
      .map(image => {
        return image[0].value;
      });
    const thumbNailImages = images
      .map(galleryImageList => {
        return galleryImageList.galleryImages.filter(galleryImages => {
          return galleryImages.key === "thumbnail";
        });
      })
      .map(image => {
        return image[0].value;
      });
    const zoomImages = images
      .map(galleryImageList => {
        return galleryImageList.galleryImages.filter(galleryImages => {
          return galleryImages.key === "superZoom";
        });
      })
      .map(image => {
        return image[0].value;
      });

    if (productData) {
      let price = "";
      let discountPrice = "";
      if (productData.mrpPrice) {
        price = productData.mrpPrice.formattedValueNoDecimal;
      }
      if (productData.winningSellerPrice) {
        discountPrice = productData.winningSellerPrice.formattedValueNoDecimal;
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
          goToCart={() => this.goToCart()}
          gotoPreviousPage={() => this.gotoPreviousPage()}
          ussId={productData.winningUssID}
        >
          <div className={styles.base}>
            <div className={styles.pageCenter}>
              <div className={styles.gallery}>
                <ProductGalleryDesktop
                  data={productData.galleryImagesList}
                  productImages={productImages}
                  thumbNailImages={thumbNailImages}
                  zoomImages={zoomImages}
                />
                {(productData.allOOStock ||
                  (productData.winningSellerAvailableStock === "0" &&
                    this.checkIfSizeSelected())) && (
                  <div className={styles.flag}>Out of stock</div>
                )}
                {!productData.winningSellerPrice && (
                  <div className={styles.flag}>Not Saleable</div>
                )}
              </div>
              <div className={styles.content}>
                <div className={styles.horizontalOffset}>
                  <div className={styles.breadcrumbs}>
                    <div className={styles.breadcrumbsDefault}>Home</div>
                    {reverseBreadCrumbs &&
                      reverseBreadCrumbs.map(val => {
                        return (
                          <div
                            className={styles.breadcrumbsText}
                            onClick={() => this.goToPage(val.url)}
                          >
                            {val.name}
                          </div>
                        );
                      })}
                  </div>
                  <ProductDetailsMainCard
                    brandName={productData.brandName}
                    productName={productData.productName}
                    brandUrl={productData.brandURL}
                    history={this.props.history}
                    price={price}
                    doublePrice={seoDoublePrice}
                    discountPrice={discountPrice}
                    averageRating={productData.averageRating}
                    numberOfReviews={productData.numberOfReviews}
                    goToReviewPage={this.goToReviewPage}
                    discount={productData.discount}
                    hasPriceBreakUp={productData.showPriceBrkUpPDP === "Yes"}
                    showPriceBreakUp={this.showPriceBreakup}
                  />
                </div>
                {productData.details &&
                  (productData.rootCategory === "FineJewellery" ||
                    productData.rootCategory === "FashionJewellery") &&
                  productData.details.length > 0 && (
                    <div className={styles.horizontalOffset}>
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
                    </div>
                  )}
                <div className={styles.horizontalOffset}>
                  <PdpPaymentInfo
                    hasEmi={productData.isEMIEligible}
                    hasCod={productData.isCOD}
                    showEmiModal={() => this.showEmiModal()}
                  />
                  <OfferCard
                    showDetails={this.props.showOfferDetails}
                    potentialPromotions={productData.potentialPromotions}
                    secondaryPromotions={productData.productOfferMsg}
                  />
                </div>
                {productData.variantOptions && (
                  <div>
                    {!this.checkIfNoSize() &&
                      !this.checkIfSizeDoesNotExist() && (
                        <React.Fragment>
                          {productData.rootCategory !== "HomeFurnishing" &&
                            productData.rootCategory !== "FineJewellery" &&
                            productData.rootCategory !== "FashionJewellery" && (
                              <div
                                className={
                                  this.state.sizeError
                                    ? styles.sizeError
                                    : styles.sizeHolder
                                }
                              >
                                <SizeSelector
                                  history={this.props.history}
                                  sizeSelected={this.checkIfSizeSelected()}
                                  productId={productData.productListingId}
                                  hasSizeGuide={productData.showSizeGuide}
                                  showSizeGuide={this.props.showSizeGuide}
                                  data={productData.variantOptions}
                                />
                              </div>
                            )}
                          {(productData.rootCategory === "HomeFurnishing" ||
                            productData.rootCategory === "FineJewellery" ||
                            productData.rootCategory ===
                              "FashionJewellery") && (
                            <React.Fragment>
                              <div
                                className={
                                  this.state.sizeError ||
                                  this.state.quantityError
                                    ? styles.sizeError
                                    : styles.sizeHolder
                                }
                              >
                                <SizeQuantitySelect
                                  history={this.props.history}
                                  sizeError={this.state.sizeError}
                                  quantityError={this.state.quantityError}
                                  showSizeGuide={
                                    productData.showSizeGuide
                                      ? this.props.showSizeGuide
                                      : null
                                  }
                                  data={productData.variantOptions}
                                  maxQuantity={productData.maxQuantityAllowed}
                                  updateQuantity={this.updateQuantity}
                                  updateSize={this.updateSize}
                                  checkIfSizeSelected={this.checkIfSizeSelected}
                                  checkIfQuantitySelected={
                                    this.checkIfQuantitySelected
                                  }
                                  productQuantity={
                                    this.state.productQuantityOption
                                  }
                                  noQuantity={
                                    "FineJewellery" ||
                                    productData.rootCategory ===
                                      "FashionJewellery"
                                  }
                                />
                              </div>
                            </React.Fragment>
                          )}
                          {productData.rootCategory === "HomeFurnishing" && (
                            <div className={styles.horizontalOffset}>
                              <div className={styles.customisation}>
                                <div className={styles.customiseText}>
                                  Customisation available - Contact seller for
                                  Free Monogramming
                                </div>
                                {productData.buyingGuideUrl && (
                                  <div className={styles.customisationButton}>
                                    <UnderLinedButton
                                      label="Checkout our buying guide"
                                      onClick={() =>
                                        this.goToBuyingGuide(
                                          productData.buyingGuideUrl
                                        )
                                      }
                                      color="#ff1744"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      )}
                    <div className={styles.horizontalOffset}>
                      <ColourSelector
                        data={productData.variantOptions}
                        productId={productData.productListingId}
                        history={this.props.history}
                        updateColour={val => {}}
                        getProductSpecification={
                          this.props.getProductSpecification
                        }
                      />
                    </div>
                  </div>
                )}
                {productData.certificationMapFrJwlry && (
                  <div className={styles.horizontalOffset}>
                    <JewelleryCertification
                      certifications={productData.certificationMapFrJwlry}
                    />
                  </div>
                )}

                <div className={styles.horizontalOffset}>
                  <div className={styles.buttonHolder}>
                    <div className={styles.buttonAddToBag}>
                      <Button
                        type="primary"
                        height={45}
                        width={195}
                        label="Add to bag"
                        onClick={() => this.addToCart()}
                        disabled={
                          productData.allOOStock ||
                          !productData.winningSellerPrice ||
                          (productData.winningSellerAvailableStock === "0" &&
                            this.checkIfSizeSelected())
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.buttonHolder}>
                    <AddToWishListButtonContainer
                      type={WISHLIST_ICON_TYPE}
                      productListingId={productData.productListingId}
                      winningUssID={productData.winningUssID}
                      setDataLayerType={
                        SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP
                      }
                    />
                  </div>
                </div>
                <div className={styles.horizontalOffset}>
                  <div className={styles.separator}>
                    <OtherSellersLink
                      onClick={this.goToSellerPage}
                      otherSellers={productData.otherSellers}
                      winningSeller={productData.winningSellerName}
                    />
                  </div>
                </div>

                <div className={styles.horizontalOffset}>
                  <div className={styles.updatePincodeHolder}>
                    {productData.isServiceableToPincode &&
                    productData.isServiceableToPincode.pinCode ? (
                      <SearchAndUpdate
                        uiType="hollow"
                        checkPinCodeAvailability={pincode =>
                          this.checkPinCodeAvailability(
                            pincode,
                            productData.productListingId
                          )
                        }
                        placeholder={productData.isServiceableToPincode.pinCode}
                        value={productData.isServiceableToPincode.pinCode}
                        hasAutoFocus={false}
                        labelText={"Check"}
                        borderColor="transparent"
                        borderBottom="0px solid #transparent"
                      />
                    ) : (
                      <SearchAndUpdate
                        uiType="hollow"
                        checkPinCodeAvailability={pincode =>
                          this.checkPinCodeAvailability(
                            pincode,
                            productData.productListingId
                          )
                        }
                        placeholder={
                          localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
                            ? localStorage.getItem(
                                DEFAULT_PIN_CODE_LOCAL_STORAGE
                              )
                            : "Enter your PIN code"
                        }
                        hasAutoFocus={false}
                        labelText={"Check"}
                        borderColor="transparent"
                        borderBottom="0px solid #transparent"
                      />
                    )}
                  </div>
                  {this.props.productDetails.isServiceableToPincode &&
                  this.props.productDetails.isServiceableToPincode.status ===
                    NO ? (
                    <Overlay labelText="This item can't be delivered to your PIN code">
                      <PdpDeliveryModes
                        eligibleDeliveryModes={
                          productData.eligibleDeliveryModes
                        }
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
                </div>
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.pageCenter}>
                <div className={styles.detailsHolder}>
                  <div className={styles.detailsCard}>
                    {productData.productDescription && (
                      <Accordion
                        text="Product Description"
                        headerFontSize={20}
                        isOpen={true}
                      >
                        <div
                          className={styles.accordionContent}
                          itemProp="description"
                        >
                          {productData.productDescription}
                          {productData.rootCategory === "Electronics" && (
                            <div
                              style={{
                                marginTop: 10
                              }}
                            >
                              {productData.details &&
                                productData.details.map(val => {
                                  return (
                                    <div className={styles.list}>
                                      {val.value}
                                    </div>
                                  );
                                })}
                            </div>
                          )}
                        </div>
                      </Accordion>
                    )}
                    {productData.rootCategory === "HomeFurnishing" &&
                      productData.classificationList && (
                        <Accordion text="Overview" headerFontSize={20}>
                          {productData.classificationList &&
                            productData.classificationList.map(value => {
                              return (
                                <div className={styles.featureHolder}>
                                  <div className={styles.header}>
                                    {value.key}
                                  </div>
                                  {value.value.classificationList &&
                                    value.value.classificationList.map(val => {
                                      return (
                                        <div>
                                          <div
                                            className={
                                              styles.contentTextForHome
                                            }
                                          >
                                            {val.key}
                                            :
                                            {val.value}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  {value.value.classificationValues &&
                                    value.value.classificationValues.map(
                                      val => {
                                        return (
                                          <div>
                                            <div
                                              className={
                                                styles.contentTextForHome
                                              }
                                            >
                                              {val}
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                  <div className={styles.blankSeparator} />
                                </div>
                              );
                            })}
                        </Accordion>
                      )}
                    {productData.rootCategory !== "Electronics" &&
                      productData.classifications && (
                        <Accordion
                          text="Features & Functions"
                          headerFontSize={20}
                          isOpen={false}
                        >
                          {productData.classifications.map(val => {
                            if (val.specifications) {
                              return val.specifications.map(value => {
                                return (
                                  <div className={styles.featureHolder}>
                                    <div className={styles.sideHeader}>
                                      {value.key}
                                    </div>
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
                    {productData.fineJewelleryClassificationList && (
                      <JewelleryClassification
                        headerFontSize={20}
                        data={productData.fineJewelleryClassificationList}
                        sideBySide={true}
                      />
                    )}
                    {productData.priceBreakUpDetailsMap &&
                      productData.showPriceBrkUpPDP === "Yes" && (
                        <PriceBreakUp
                          headerFontSize={20}
                          data={productData.priceBreakUpDetailsMap}
                          sideBySide={true}
                        />
                      )}
                    {productData.returnAndRefund && (
                      <Accordion text="Return & Refunds" headerFontSize={20}>
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
                    {productData.rootCategory !== "Electronics" &&
                      productData.rootCategory !== "FashionJewellery" &&
                      productData.rootCategory !== "FineJewellery" &&
                      productData.details && (
                        <ProductDetails
                          headerFontSize={20}
                          data={productData.details}
                        />
                      )}
                    {productData.knowMore && (
                      <Accordion text="Know More" headerFontSize={20}>
                        {productData.knowMore &&
                          productData.knowMore.map(val => {
                            return (
                              <div className={styles.list}>
                                {val.knowMoreItem}
                              </div>
                            );
                          })}
                      </Accordion>
                    )}
                    {productData.warranty &&
                      productData.warranty.length > 0 && (
                        <ProductFeature
                          headerFontSize={20}
                          heading="Warranty"
                          content={productData.warranty[0]}
                        />
                      )}
                    {productData.brandInfo && (
                      <Accordion text="Brand Info" headerFontSize={20}>
                        <div className={styles.accordionContent}>
                          {productData.brandInfo}
                        </div>
                      </Accordion>
                    )}
                  </div>
                  {this.renderRatings}
                </div>
                {productData.rootCategory === "Electronics" && (
                  <div className={styles.detailsHolder}>
                    <div className={styles.detailsCard}>
                      {productData.classifications && (
                        <ProductFeatures
                          headerFontSize={20}
                          features={productData.classifications}
                        />
                      )}
                    </div>
                    {this.renderRatings}
                  </div>
                )}
                {productData.numberOfReviews &&
                (productData.numberOfReviews !== 0 ||
                  productData.numberOfReviews !== "0") ? (
                  <div className={styles.reviewsHolder}>
                    <div className={styles.reviewsHeader}>
                      Ratings and Reviews
                      <div className={styles.reviewsButton}>
                        <UnderLinedButton
                          color="#ff1744"
                          label="See All"
                          fontFamily="light"
                          onClick={this.goToReviewPage}
                        />
                      </div>
                    </div>
                    <ProductReviewListContainer
                      productId={productData.productListingId}
                    />
                  </div>
                ) : null}

                <div className={styles.details}>
                  {productData.APlusContent && (
                    <APlusTemplate
                      productContent={productData.APlusContent.productContent}
                      template={productData.APlusContent.temlateName}
                    />
                  )}
                  <div className={styles.blankSeparator} />
                  <PDPRecommendedSectionsContainer />
                </div>
              </div>
            </div>
          </div>
        </PdpFrame>
      );
    } else {
      return null;
    }
  }
}
