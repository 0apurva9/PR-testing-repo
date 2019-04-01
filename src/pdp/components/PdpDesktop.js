import React from "react";
import PdpFrame from "./PdpFrame";
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
//import TrustBadgeImage from "../components/img/trustBadge.jpg";
import Button from "../../general/components/Button";
import SearchAndUpdate from "./SearchAndUpdate";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import AddToWishListButtonContainer from "../../wishlist/containers/AddToWishListButtonContainer";
import {
  setDataLayerForCartDirectCalls,
  setDataLayerForPdpDirectCalls,
  SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP,
  SET_DATA_LAYER_FOR_BUY_NOW_EVENT,
  SET_DATA_LAYER_FOR_VIEW_ALL_REVIEW_AND_RATING_EVENT,
  ADOBE_DIRECT_CALL_FOR_PDP_SPEC_VIEW_MORE,
  ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS,
  ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE,
  ADOBE_DIRECT_CALL_FOR_GO_TO_BAG,
  ADOBE_DIRECT_CALL_FOR_PICK_UP_OPTION
} from "../../lib/adobeUtils";
import { reverse } from "../reducers/utils";
import * as Cookie from "../../lib/Cookie";
import {
  // CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  GLOBAL_ACCESS_TOKEN,
  //CART_DETAILS_FOR_LOGGED_IN_USER,
  //CART_DETAILS_FOR_ANONYMOUS,
  //ANONYMOUS_USER,
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
  LOGIN_PATH,
  ERROR
} from "../../lib/constants";
import styles from "./ProductDescriptionPage.css";
import { checkUserLoggedIn } from "../../lib/userUtils";
import PdpFlags from "../components/PdpFlags.js";
import FlixMediaContainer from "./FlixMediaContainer";
const WASH = "Wash";
const NECK_COLLAR = "Neck/Collar";
const SLEEVE = "Sleeve";
const ProductDetailsMainCard = LoadableVisibility({
  loader: () => import("./ProductDetailsMainCard"),
  loading: () => <div />,
  delay: 400
});
//const WISHLIST_FOOTER_BUTTON_TYPE = "wishlistFooter";
export const ONLY_ICON = "wishlistIconForPdp";
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
/*
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
*/
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
const env = process.env;
const samsungChatUrl =
  env.REACT_APP_SAMSUNG_CHAT_URL +
  window.location.href +
  env.REACT_APP_SAMSUNG_CHAT_URL_REFERRER;

export default class PdpApparel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productQuantityOption: "Quantity",
      sizeError: false,
      quantityError: false,
      showProductDetails: false,
      isLoader: false,
      goToCartPageFlag:
        this.props.location.state && this.props.location.state.goToCartPageFlag
          ? this.props.location.state.goToCartPageFlag
          : false
    };
  }
  componentDidMount() {
    document.title = this.props.productDetails.seo.title;
    this.props.getUserAddress();
    /* Start- Gemini Script */
    //gemini rum JS object check
    if (typeof window.GEM === "object") {
      //gemini custom ID for Product Detail Page - Apparel
      window.GEM.setGeminiPageId("0002321000100700");
    } else {
      window.gemPageId = "0002321000100700";
    }

    /* End- Gemini Script */
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
  goToCart = isClickOnGoToBag => {
    if (isClickOnGoToBag && isClickOnGoToBag.goToBag) {
      setDataLayerForPdpDirectCalls(ADOBE_DIRECT_CALL_FOR_GO_TO_BAG);
    }
    const defaultPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
    this.props.history.push({
      pathname: PRODUCT_CART_ROUTER,
      state: {
        ProductCode: this.props.productDetails.productListingId,
        pinCode: defaultPinCode
      }
    });
  };
  goToBuyingGuide = buyingGuideUrl => {
    if (buyingGuideUrl) {
      const urlSuffix = buyingGuideUrl.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
    }
  };
  checkPinCodeAvailability = async (pincode, productCode) => {
    let productPincodeObj = await this.props.getProductPinCode(
      pincode,
      productCode
    );
    if (productPincodeObj.status === ERROR) {
      this.props.displayToast("Please enter a valid pincode");
    }
    if (
      productPincodeObj.status === SUCCESS &&
      this.props.productDetails &&
      this.props.productDetails.isServiceableToPincode &&
      this.props.productDetails.isServiceableToPincode.status
    ) {
      if (this.props.productDetails.isServiceableToPincode.status === "Y") {
        this.props.displayToast("Product is servicable to pincode");
        setDataLayerForCartDirectCalls(
          ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS,
          pincode
        );
      } else if (
        this.props.productDetails.isServiceableToPincode.status === "N"
      ) {
        this.props.displayToast("Product is not servicable to pincode");
        setDataLayerForCartDirectCalls(
          ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE,
          pincode
        );
      } else {
        setDataLayerForCartDirectCalls(
          ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE,
          pincode
        );
      }
    }
  };
  addToCart = async buyNowFlag => {
    this.setState({ isLoader: true });
    let productDetails = {};
    productDetails.code = this.props.productDetails.productListingId;
    productDetails.quantity = PRODUCT_QUANTITY;
    productDetails.ussId = this.props.productDetails.winningUssID;
    //let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    //let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    //let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    /*let cartDetailsLoggedInUser = Cookie.getCookie(
      CART_DETAILS_FOR_LOGGED_IN_USER
    );
    let cartDetailsAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);*/

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
            if (buyNowFlag) {
              setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_BUY_NOW_EVENT);
              if (!checkUserLoggedIn()) {
                localStorage.setItem(
                  BUY_NOW_PRODUCT_DETAIL,
                  JSON.stringify(productDetails)
                );
                this.navigateToLogin();
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
          this.setState({ isLoader: false });
          this.setState({ sizeError: true });
        }
      }
    }
  };
  navigateToLogin() {
    const url = this.props.location.pathname;
    this.props.setUrlToRedirectToAfterAuth(url);
    this.props.history.push(LOGIN_PATH);
  }
  goToReviewPage = isNeedToSetDataLayer => {
    setDataLayerForPdpDirectCalls(
      SET_DATA_LAYER_FOR_VIEW_ALL_REVIEW_AND_RATING_EVENT
    );
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
  showPincodeModal = () => {
    if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
      this.props.showPincodeModal(this.props.match.params[0]);
    } else if (
      this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE
    ) {
      this.props.showPincodeModal(this.props.match.params[1]);
    }
  };
  showProductDetails = () => {
    this.setState({ showProductDetails: true });
  };
  showEmiModal = () => {
    const cartValue = this.props.productDetails.winningSellerPrice.value;
    const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    const globalAccessToken = JSON.parse(globalCookie).access_token;
    const productCode = this.props.productDetails.productListingId;
    const ussId = this.props.productDetails.winningUssID;
    this.props.getPdpEmi(globalAccessToken, cartValue, productCode, ussId);
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
    this.setState({ isLoader: false });
    this.setState({ sizeError: true });
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
  checkIfOneSize = () => {
    if (
      this.props.productDetails.variantOptions.length === 1 &&
      this.props.productDetails.rootCategory !== "HomeFurnishing" &&
      this.props.productDetails.rootCategory !== "FineJewellery" &&
      this.props.productDetails.rootCategory !== "FashionJewellery"
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
  goToHome = () => {
    this.props.history.push(HOME_ROUTER);
  };
  handleShowPiqPage = () => {
    setDataLayerForPdpDirectCalls(ADOBE_DIRECT_CALL_FOR_PICK_UP_OPTION);
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

  onClickOfBuyNow = () => {
    if (this.state.goToCartPageFlag) {
      this.goToCart();
    } else {
      this.addToCart(true);
    }
  };
  onScroll = () => {
    setDataLayerForPdpDirectCalls(ADOBE_DIRECT_CALL_FOR_PDP_SPEC_VIEW_MORE);
    let scroll2 = this.refs.scrollToViewGallery;
    let scroll1 = this.refs.scrollToViewAccrodian;
    window.scroll({
      top: scroll2.offsetHeight + scroll1.offsetHeight + 170,
      behavior: "smooth"
    });
  };
  // method needed TPR-10076
  displayPrdDetails = (prdDetails, key) => {
    let details = prdDetails;

    return details.map((detail, index) => {
      if (detail["key"] !== key) {
        return null;
      } else {
        let value = detail["value"];
        let separateValue = value.split("|");
        return (
          <div className={styles.tableCellSingleComponent} key={index}>
            {<img src={separateValue[1]} alt="" height={86} width={93} />}
            <div className={styles.width95px}>
              <div className={styles.textAlignCenter}>{separateValue[0]}</div>
            </div>
          </div>
        );
      }
    });
  };

  tail = ([x, ...xs]) => xs;
  render() {
    const getPinCode =
      this.props &&
      this.props.userAddress &&
      this.props.userAddress.addresses &&
      this.props.userAddress.addresses[0] &&
      this.props.userAddress.addresses[0].postalCode;
    let userCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userCookie) {
      userCookie = JSON.parse(userCookie);
    }
    const productData = this.props.productDetails;
    const tailedKnowMoreV2 =
      productData &&
      productData.knowMoreV2 &&
      this.tail(productData.knowMoreV2);

    const breadCrumbs = productData.seo.breadcrumbs;
    const reverseBreadCrumbs = reverse(breadCrumbs);
    const images = productData.galleryImagesList
      ? productData.galleryImagesList.filter(val => {
          return val.mediaType === IMAGE || val.mediaType === "Video";
        })
      : [];

    const productImages = images
      .map(galleryImageList => {
        if (galleryImageList.mediaType === IMAGE) {
          return galleryImageList.galleryImages.filter(galleryImages => {
            return {
              product: galleryImages.key === "product",
              type: "image"
            };
          });
        } else if (galleryImageList.mediaType === "Video") {
          return galleryImageList.galleryImages.filter(galleryImages => {
            return {
              product: galleryImages.key === "thumbnail",
              type: "video"
            };
          });
        }
      })
      .map(image => {
        if (image[0].value) {
          return {
            value: image[0].value,
            type: image[0].key === "product" ? "image" : "video"
          };
        } else {
          return image;
        }
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
        if (galleryImageList.mediaType === IMAGE) {
          return galleryImageList.galleryImages.filter(galleryImages => {
            return galleryImages.key === "superZoom";
          });
        } else if (galleryImageList.mediaType === "Video") {
          return galleryImageList.galleryImages.filter(galleryImages => {
            return galleryImages.key === "thumbnail";
          });
        }
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
      let flixModelNo = "";
      if (productData.details && productData.details.length) {
        flixModelNo = productData.details.find(detail => {
          return detail.key === "Model Number";
        });
      }
      return (
        <PdpFrame
          goToCart={() => this.goToCart()}
          gotoPreviousPage={() => this.gotoPreviousPage()}
          ussId={productData.winningUssID}
          productListingId={productData.productListingId}
          showSimilarProducts={this.props.showSimilarProducts}
        >
          <div className={styles.base}>
            <div className={styles.pageCenter} ref="scrollToViewGallery">
              <div className={styles.gallery}>
                <ProductGalleryDesktop
                  data={productData.galleryImagesList}
                  productImages={productImages}
                  thumbNailImages={thumbNailImages}
                  zoomImages={zoomImages}
                  alt={`${productData.productName}-${productData.brandName}-${
                    productData.rootCategory
                  }-TATA CLIQ`}
                  details={productData.details}
                  showSimilarProducts={this.props.showSimilarProducts}
                />
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
                <div className={styles.horizontalOffset}>
                  <div className={styles.breadcrumbs}>
                    <div
                      className={styles.breadcrumbsDefault}
                      onClick={() => this.goToHome()}
                    >
                      Home
                    </div>
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
                  <div className={styles.cardHeaderHolder}>
                    <div>
                      <ProductDetailsMainCard
                        brandName={productData.brandName}
                        productName={productData.productName}
                        brandUrl={productData.brandURL}
                        history={this.props.history}
                        location={this.props.location}
                        price={price}
                        doublePrice={seoDoublePrice}
                        discountPrice={discountPrice}
                        averageRating={productData.averageRating}
                        numberOfReviews={productData.numberOfReviews}
                        goToReviewPage={this.goToReviewPage}
                        discount={productData.discount}
                        hasPriceBreakUp={
                          productData.showPriceBrkUpPDP === "Yes"
                        }
                        showPriceBreakUp={this.showPriceBreakup}
                        isPdp={true}
                      />
                    </div>
                    <div className={styles.wisthListIconHolder}>
                      <AddToWishListButtonContainer
                        type={ONLY_ICON}
                        productListingId={productData.productListingId}
                        winningUssID={productData.winningUssID}
                        setDataLayerType={
                          SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP
                        }
                        isSizeSelectedForAddToWishlist={this.isSizeSelectedForAddToWishlist()}
                        showSizeSelector={
                          this.isSizeNotSelectedForAddToWishlist
                        }
                      />
                    </div>
                  </div>
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
                    seStartingPrice={productData.seStartingPrice}
                    nceAvailable={productData.nceAvailable}
                    nceStartingPrice={productData.nceStartingPrice}
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
                    <div className={styles.horizontalOffset}>
                      {!this.checkIfNoSize() &&
                        !this.checkIfSizeDoesNotExist() && (
                          <React.Fragment>
                            {productData.rootCategory !== "HomeFurnishing" &&
                              productData.rootCategory !== "FineJewellery" &&
                              productData.rootCategory !==
                                "FashionJewellery" && (
                                <div
                                  className={
                                    this.state.sizeError
                                      ? styles.sizeError
                                      : styles.sizeHolder
                                  }
                                >
                                  <SizeSelector
                                    history={this.props.history}
                                    headerText={productData.isSizeOrLength}
                                    sizeSelected={this.checkIfSizeSelected()}
                                    productId={productData.productListingId}
                                    hasSizeGuide={productData.showSizeGuide}
                                    showSizeGuide={this.props.showSizeGuide}
                                    data={productData.variantOptions}
                                    textSize={12}
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
                                    headerText={productData.isSizeOrLength}
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
                                    checkIfSizeSelected={
                                      this.checkIfSizeSelected
                                    }
                                    checkIfQuantitySelected={
                                      this.checkIfQuantitySelected
                                    }
                                    productQuantity={
                                      this.state.productQuantityOption
                                    }
                                    noQuantity={
                                      productData.rootCategory ===
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

                <div className={styles.buttonWrapper}>
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
                    <div className={styles.buttonAddToBag}>
                      <Button
                        type="primary"
                        height={45}
                        width={195}
                        label="Buy Now"
                        onClick={this.onClickOfBuyNow}
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
                    <div className={styles.buttonAddToBag}>
                      <Button
                        type="hollow"
                        height={45}
                        width={195}
                        color={"#ff1744"}
                        label={
                          this.state.goToCartPageFlag
                            ? "Go to bag"
                            : "Add to bag"
                        }
                        onClick={
                          this.state.goToCartPageFlag
                            ? () => this.goToCart({ goToBag: true })
                            : () => this.addToCart(false)
                        }
                        disabled={
                          productData.allOOStock ||
                          !productData.winningSellerPrice ||
                          (productData.winningSellerAvailableStock === "0" &&
                            this.checkIfSizeSelected())
                        }
                      />
                    </div>
                  </div>
                </div>
                {productData &&
                  productData.details &&
                  productData.rootCategory === "Electronics" && (
                    <div className={styles.pointListHolder}>
                      <div className={styles.pointHeader}>Highlights</div>

                      {productData.details &&
                        productData.details.map(val => {
                          return val.key !== "Model Number" ? (
                            <div className={styles.list}>{val.value}</div>
                          ) : null;
                        })}
                      {productData.rootCategory === "Electronics" && (
                        <div
                          className={styles.viewDetails}
                          onClick={() => this.onScroll()}
                        >
                          View full details
                        </div>
                      )}
                    </div>
                  )}
                <div className={styles.horizontalOffset}>
                  <div className={styles.separator}>
                    <OtherSellersLink
                      onClick={this.goToSellerPage}
                      otherSellers={productData.otherSellers}
                      winningSeller={productData.winningSellerName}
                    />
                  </div>
                </div>
                <div className={styles.pinAndDeliveryHolder}>
                  <div className={styles.updatePincodeHolder}>
                    {getPinCode &&
                      userCookie && (
                        <SearchAndUpdate
                          uiType="hollow"
                          checkPinCodeAvailability={pincode =>
                            this.checkPinCodeAvailability(
                              pincode,
                              productData.productListingId
                            )
                          }
                          placeholder="Pincode"
                          value={getPinCode}
                          hasAutoFocus={false}
                          labelText={"Check"}
                          borderColor="transparent"
                          borderBottom="0px solid #transparent"
                        />
                      )}

                    {!userCookie && (
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
                    <div className={styles.overlay}>
                      {productData.rootCategory === "Clothing" ||
                      productData.rootCategory === "Footwear" ? (
                        <Overlay labelText="This size is currently out of stock. Please select another size or try another product.">
                          <PdpDeliveryModes
                            eligibleDeliveryModes={
                              productData.eligibleDeliveryModes
                            }
                            deliveryModesATP={productData.deliveryModesATP}
                            iconShow={true}
                          />
                        </Overlay>
                      ) : (
                        <Overlay labelText="This item can't be delivered to your PIN code">
                          <PdpDeliveryModes
                            eligibleDeliveryModes={
                              productData.eligibleDeliveryModes
                            }
                            deliveryModesATP={productData.deliveryModesATP}
                            iconShow={true}
                          />
                        </Overlay>
                      )}
                    </div>
                  ) : (
                    <div className={styles.deliveyModesHolder}>
                      <PdpDeliveryModes
                        onPiq={this.handleShowPiqPage}
                        eligibleDeliveryModes={
                          productData.eligibleDeliveryModes
                        }
                        deliveryModesATP={productData.deliveryModesATP}
                        iconShow={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.pageCenter}>
                <div
                  className={styles.detailsHolder}
                  ref="scrollToViewAccrodian"
                >
                  <div className={styles.detailsCard}>
                    {productData.productDescription && (
                      <Accordion
                        text="Product Description"
                        headerFontSize={18}
                        isOpen={true}
                      >
                        <div
                          className={styles.accordionContent}
                          itemProp="description"
                        >
                          {productData.productDescription}
                          {productData.prdDetails && (
                            <div className={styles.productDetailsImagesCard}>
                              {this.displayPrdDetails(
                                productData.prdDetails,
                                WASH
                              )}
                              {this.displayPrdDetails(
                                productData.prdDetails,
                                NECK_COLLAR
                              )}
                              {this.displayPrdDetails(
                                productData.prdDetails,
                                SLEEVE
                              )}
                            </div>
                          )}
                          {productData.rootCategory === "Electronics" && (
                            <div
                              style={{
                                marginTop: 10
                              }}
                            >
                              {productData.details &&
                                productData.details.map(val => {
                                  return val.key !== "Model Number" ? (
                                    <div className={styles.list}>
                                      {val.value}
                                    </div>
                                  ) : null;
                                })}
                            </div>
                          )}
                        </div>
                      </Accordion>
                    )}
                    {productData.rootCategory === "HomeFurnishing" &&
                      productData.classificationList && (
                        <Accordion text="Overview" headerFontSize={18}>
                          <div className={styles.accordionContent}>
                            {productData.classificationList &&
                              productData.classificationList.map(value => {
                                return (
                                  <div className={styles.featureHolder}>
                                    <div className={styles.header}>
                                      {value.key}
                                    </div>
                                    {value.value.classificationList &&
                                      value.value.classificationList.map(
                                        val => {
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
                                        }
                                      )}
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
                          </div>
                        </Accordion>
                      )}
                    {productData.rootCategory !== "Electronics" &&
                      productData.classifications && (
                        <Accordion
                          text="Features & Functions"
                          headerFontSize={18}
                          isOpen={false}
                        >
                          <div className={styles.accordionContent}>
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
                          </div>
                        </Accordion>
                      )}
                    {productData.fineJewelleryClassificationList && (
                      <JewelleryClassification
                        headerFontSize={18}
                        data={productData.fineJewelleryClassificationList}
                        sideBySide={true}
                      />
                    )}
                    {productData.priceBreakUpDetailsMap &&
                      productData.showPriceBrkUpPDP === "Yes" && (
                        <PriceBreakUp
                          headerFontSize={18}
                          data={productData.priceBreakUpDetailsMap}
                          sideBySide={true}
                        />
                      )}
                    {productData.returnAndRefund && (
                      <Accordion text="Return & Refunds" headerFontSize={18}>
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
                          headerFontSize={18}
                          data={productData.details}
                        />
                      )}
                    {productData.knowMoreV2 && (
                      <Accordion text="Return & Exchange" headerFontSize={18}>
                        <div className={styles.containerWithBottomBorder}>
                          <div className={styles.accordionContentBold}>
                            {productData.knowMoreV2[0].knowMoreItemV2}
                          </div>
                          {tailedKnowMoreV2.map(val => {
                            return (
                              <div className={styles.accordionLight}>
                                {val.knowMoreItemV2}
                              </div>
                            );
                          })}
                        </div>
                      </Accordion>
                    )}

                    {productData.knowMore && (
                      <Accordion text="Know More" headerFontSize={18}>
                        <div className={styles.containerWithBottomBorder}>
                          {productData.rootCategory === "Electronics" &&
                            productData.knowMore &&
                            productData.knowMore.map(val => {
                              return (
                                <div
                                  className={styles.list}
                                  dangerouslySetInnerHTML={{
                                    __html: val.knowMoreItem
                                  }}
                                />
                              );
                            })}
                          {productData.rootCategory !== "Electronics" &&
                            productData.knowMore &&
                            productData.knowMore.map(val => {
                              return (
                                <div className={styles.list}>
                                  {val.knowMoreItem}
                                </div>
                              );
                            })}
                        </div>
                      </Accordion>
                    )}
                    {productData.rootCategory !== "Electronics" &&
                      productData.warranty && (
                        <Accordion text="Warranty" headerFontSize={18}>
                          <div className={styles.containerWithBottomBorder}>
                            {productData.warranty &&
                              productData.warranty.map(val => {
                                return <div className={styles.list}>{val}</div>;
                              })}
                          </div>
                        </Accordion>
                      )}
                    {productData.brandInfo && (
                      <Accordion text="Brand Info" headerFontSize={18}>
                        <div className={styles.accordionContentWithoutBorder}>
                          {productData.brandInfo}
                        </div>
                      </Accordion>
                    )}
                  </div>
                  {this.renderRatings}
                </div>
                <React.Fragment>
                  {flixModelNo && productData.brandName ? (
                    <FlixMediaContainer
                      flixModelNo={flixModelNo}
                      brandName={productData.brandName}
                    />
                  ) : null}
                </React.Fragment>
                {productData.rootCategory === "Electronics" && (
                  <div className={styles.detailsHolder}>
                    <div className={styles.detailsCard}>
                      {productData.classifications && (
                        <ProductFeatures
                          headerFontSize={18}
                          features={productData.classifications}
                        />
                      )}
                    </div>
                    {this.renderRatings}
                  </div>
                )}
                <div className={styles.details}>
                  <React.Fragment>
                    <React.Fragment>
                      {productData.APlusContent && (
                        <APlusTemplate
                          productContent={
                            productData.APlusContent.productContent
                          }
                          template={productData.APlusContent.temlateName}
                        />
                      )}
                    </React.Fragment>
                    <div className={styles.blankSeparator} />
                    <React.Fragment>
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
                            limit={true}
                            productId={productData.productListingId}
                          />
                        </div>
                      ) : null}
                    </React.Fragment>
                    <React.Fragment>
                      <PDPRecommendedSectionsContainer />
                    </React.Fragment>
                  </React.Fragment>
                </div>
              </div>
            </div>
          </div>

          {productData.brandName === "Samsung" ? (
            <a
              href={samsungChatUrl}
              target="_blank"
              className={styles.samsungChatImgHolder}
            >
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/11437918060574.png"
                alt="Samsung Chat"
              />
            </a>
          ) : null}
        </PdpFrame>
      );
    } else {
      return null;
    }
  }
}
