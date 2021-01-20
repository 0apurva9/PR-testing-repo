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
import Button from "../../general/components/Button";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import AddToWishListButtonContainer from "../../wishlist/containers/AddToWishListButtonContainer";
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
  ADOBE_MDE_CLICK_ON_EXCHANGE_LINK,
} from "../../lib/adobeUtils";
import { reverse } from "../reducers/utils";
import * as Cookie from "../../lib/Cookie";
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
  LOGIN_PATH,
  YES,
  ERROR,
} from "../../lib/constants";
import { isBrowser } from "browser-or-node";
import styles from "./ProductDescriptionPage.css";
import RevelantBundling from "./RevelantBundling";
import { checkUserLoggedIn } from "../../lib/userUtils";
import PdpFlags from "../components/PdpFlags.js";
import PdpPaymentInfo from "../components/PdpPaymentInfo";
import OfferCard from "./OfferCard";
import OtherSellersLink from "./OtherSellersLink";
import SizeSelector from "./SizeSelector";
import ProductDetailsMainCard from "./ProductDetailsMainCard";
import PdpDeliveryModes from "./PdpDeliveryModes";
import PDPRecommendedSectionsContainer from "../containers/PDPRecommendedSectionsContainer";
import ColourSelector from "./ColourSelector";
import FlixMediaContainer from "./FlixMediaContainer";
import Icon from "../../xelpmoc-core/Icon";
import FilledStarBlack from "../../general/components/img/star-fill-black.svg";
import { setTracker, VIEW_PRODUCT, ADD_TO_CART } from "../../lib/onlinesalesUtils";
import ExchangeDetailsPDPDesktop from "./ExchangeDetailsPDPDesktop";
import Chatbot from "../../plp/components/Chatbot";
import PropTypes from "prop-types";
import ProductBundling from "./ProductBundling";

let testcheck = false;

const WASH = "Wash";
const NECK_COLLAR = "Neck/Collar";
const SLEEVE = "Sleeve";
export const ONLY_ICON = "wishlistIconForPdp";

const Overlay = LoadableVisibility({
  loader: () => import("./Overlay"),
  loading: () => <div />,
  delay: 400,
});
const PdpPincode = LoadableVisibility({
  loader: () => import("./PdpPincode"),
  loading: () => <div />,
  delay: 1000,
});

const NO_SIZE = "NO SIZE";
const FREE_SIZE = "Free Size";
const PRODUCT_QUANTITY = "1";
const IMAGE = "Image";
const env = process.env;
let samsungChatUrl = "";
if (isBrowser) {
  samsungChatUrl = env.REACT_APP_SAMSUNG_CHAT_URL + window.location.href + env.REACT_APP_SAMSUNG_CHAT_URL_REFERRER;
}

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
          : false,
      showGotoCartButton: false,
      bundledProductList: [],
      selectedBundledProduct: [],
      checkedItems: true,
      firstRelevantProduct: {},
      secondRelevantProduct: {},
      selected: false,
      productCategory: "",
      eyeWearCheck: "",
      bundledProductSuggestionDetails: null,
    };
    this.reviewListRef = React.createRef();
    this.ScrollIntoView = this.ScrollIntoView.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount = async () => {
    setDataLayer(ADOBE_VIRTUAL_PAGELOAD);
    document.title = this.props.productDetails.seo.title;
    this.props.getUserAddress();
    this.props.getPdpOffers();
    this.props.getManufacturerDetails();
    /* Start- Gemini Script */
    //gemini rum JS object check
    if (typeof window.GEM === "object") {
      //gemini custom ID for Product Detail Page - Apparel
      window.GEM.setGeminiPageId("0002321000100700");
    } else {
      window.gemPageId = "0002321000100700";
    }
    /* End- Gemini Script */
    let data = await this.props.openInApp();
    if (
      data &&
      data.openInAppDetails &&
      data.openInAppDetails.applicationProperties &&
      data.openInAppDetails.applicationProperties[0] &&
      data.openInAppDetails.applicationProperties[0].value
    ) {
      if (data.openInAppDetails.applicationProperties[0].value === "Y") {
        this.setState({ showGotoCartButton: true });
      }
    }
    /***EyeWear Category Filter */
    let categoryHierarchyCheck = this.props.productDetails && this.props.productDetails.categoryHierarchy;
    if (
      categoryHierarchyCheck &&
      Array.isArray(categoryHierarchyCheck) &&
      this.props.productDetails.rootCategory === "Accessories"
    ) {
      if (
        categoryHierarchyCheck[categoryHierarchyCheck.length - 1].category_name === "Eye Frames" ||
        categoryHierarchyCheck[categoryHierarchyCheck.length - 1].category_name === "Frames" ||
        categoryHierarchyCheck[categoryHierarchyCheck.length - 1].category_name === "Reading Glasses" ||
        categoryHierarchyCheck[categoryHierarchyCheck.length - 1].category_name === "Safety Glasses" ||
        categoryHierarchyCheck[categoryHierarchyCheck.length - 1].category_name === "Sunglasses"
      ) {
        this.setState({ productCategory: "Eyewear" });
      }
      if (categoryHierarchyCheck[0].category_name === "Eyewear") {
        this.setState({ eyeWearCheck: "EyeWear" });
      }
    }
    setTracker(VIEW_PRODUCT, this.props.productDetails);
    let categoryId =
      categoryHierarchyCheck &&
      Array.isArray(categoryHierarchyCheck) &&
      categoryHierarchyCheck[categoryHierarchyCheck.length - 1] &&
      categoryHierarchyCheck[categoryHierarchyCheck.length - 1].category_id;
    /***relavant Bundling Product */
    if (
      this.props &&
      this.props.productDetails &&
      this.props.productDetails.rootCategory === "Electronics" &&
      this.props.productDetails.allOOStock === false
    ) {
      let bundlePrdouct =
        this.props.relevantBundleProductCodeData &&
        this.props.relevantBundleProductCodeData.applicationProperties &&
        this.props.relevantBundleProductCodeData.applicationProperties[0] &&
        this.props.relevantBundleProductCodeData.applicationProperties[0].value;
      if (bundlePrdouct) {
        bundlePrdouct = JSON.parse(bundlePrdouct);
      }

      let arrayBundledDescription = [];
      let productId = this.props.productDetails.productListingId;
      if (bundlePrdouct) {
        let bundleIteamList = this.relevantBundleProductId(bundlePrdouct.bundledItems, productId);

        await bundleIteamList
          .then(result => {
            if (result) {
              let status;
              result &&
                result.bundleItems.forEach((listId, i) => {
                  let res = this.props.getRelevantBundleProduct(listId.productCode, "temp", i);
                  res.then(data => {
                    if (data && data.status === "success" && data.data.rootCategory !== "Electronics") {
                      return false;
                    }
                    // else{
                    if (data.status === "success") {
                      let pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
                        ? localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
                        : this.props.productDetails &&
                          this.props.productDetails.isServiceableToPincode &&
                          this.props.productDetails.isServiceableToPincode.pinCode;
                      this.props
                        .relevantProductServibilty(pinCode, listId.productCode, listId.ussid)
                        .then(serviceCheck => {
                          if (serviceCheck.status != "error") {
                            arrayBundledDescription.push(data.data);
                            this.setState({
                              bundledProductList: arrayBundledDescription,
                            });
                          }
                        });
                    }
                    // }
                  });
                });
            }
          })
          .catch(e => {
            throw Error(e);
          });
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    const productDetailsForBuyNow = localStorage.getItem(BUY_NOW_PRODUCT_DETAIL);
    if (
      nextProps.bundledProductSuggestionStatus === SUCCESS &&
      nextProps.bundledProductSuggestionDetails &&
      nextProps.bundledProductSuggestionDetails !== this.state.bundledProductSuggestionDetails
    ) {
      this.setState({
        bundledProductSuggestionDetails: nextProps.bundledProductSuggestionDetails,
      });
    }
    if (nextProps.bundledProductSuggestionStatus === ERROR && !nextProps.bundledProductSuggestionDetails) {
      this.setState({
        bundledProductSuggestionDetails: null,
      });
    }
    if (
      (nextProps.userDetails && nextProps.userDetails.status === "Success") ||
      !nextProps.isMobileNumberLoginModalActive
    ) {
      this.setState({
        isLoader: false,
      });
    }

    if (
      nextProps.isMNLLogin.value &&
      productDetailsForBuyNow &&
      !nextProps.tempCartIdForLoggedInUserLoading &&
      nextProps.userDetails &&
      nextProps.userDetails.status === "Success"
    ) {
      this.goForBuyNow();
    }
  }

  async goForBuyNow() {
    const productDetailsForBuyNow = localStorage.getItem(BUY_NOW_PRODUCT_DETAIL);
    const buyNowResponse = await this.props.buyNow(JSON.parse(productDetailsForBuyNow));
    if (buyNowResponse && buyNowResponse.status === SUCCESS) {
      this.props.history.push(PRODUCT_CART_ROUTER);
    } else {
      this.props.displayToast(BUY_NOW_ERROR_MESSAGE);
      if (this.props.redirectToAfterAuthUrl) {
        this.props.clearUrlToRedirectToAfterAuth();
      }
    }
  }

  relevantProductServibilty = async params => {
    let pinCode = "208007";
    // let pinCode =
    //   this.props.productDetails &&
    //   this.props.productDetails.isServiceableToPincode &&
    //   this.props.productDetails.isServiceableToPincode.pinCode;
    return await this.props.relevantProductServibilty(pinCode, params.productCode, params.ussid);
  };
  getRelevantBundleProduct = async data => {
    let status;
    data &&
      data.bundleItems.forEach((listId, i) => {
        let res = this.props.getRelevantBundleProduct(listId.productCode, "temp", i);

        res.then(data => {
          if (data.status === "success") {
            status = this.relevantProductServibilty(listId);
          }
        });
      });

    return status;
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.productDetails &&
      this.props.productDetails.serviceableSellerMessage &&
      this.props.productDetails.serviceableSellerMessage !== prevProps.productDetails.serviceableSellerMessage
    ) {
      this.props.displayToast(this.props.productDetails.serviceableSellerMessage);
    }

    if (
      this.props.productDetails.isServiceableToPincode !== prevProps.productDetails.isServiceableToPincode &&
      this.props.productDetails.isServiceableToPincode.status === YES
    ) {
      if (this.props.productDetails.bundlingSuggestionAvailable) {
        let productId = this.props.productDetails.productListingId;
        let ussId = this.props.productDetails.winningUssID;
        let pincode = this.props.productDetails.isServiceableToPincode.pinCode;
        let categoryCode = this.props.productDetails.categoryL4Code;
        let brandCode = this.getBrandCode(this.props.productDetails.brandURL);
        this.props.getBundledProductSuggestion(productId, ussId, categoryCode, brandCode, "PDP", pincode);
      }
    }
  }
  selectProduct() {
    this.setState({
      selected: !this.state.selected,
    });
    this.totalSelectedProducts();
  }

  totalSelectedProducts(e) {
    let tmp = this.state.totalSelectedProducts;
    if (tmp.indexOf(e) > -1 && tmp.length > 0) {
      tmp.splice(tmp.indexOf(e), 1);
    } else {
      tmp.push(e);
    }
    this.setState({
      totalSelectedProducts: tmp,
    });
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
        pinCode: defaultPinCode,
      },
    });
  };
  goToBuyingGuide = buyingGuideUrl => {
    if (buyingGuideUrl) {
      const urlSuffix = buyingGuideUrl.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
    }
  };
  checkPinCodeAvailability = async (pincode, productCode, winningUssID) => {
    let productPincodeObj = await this.props.getProductPinCode(pincode, productCode, winningUssID);
    // if (productPincodeObj.status === ERROR) {
    //   this.props.displayToast("Please enter a valid pincode");
    // }
    if (
      productPincodeObj.status === SUCCESS &&
      this.props.productDetails &&
      this.props.productDetails.isServiceableToPincode &&
      this.props.productDetails.isServiceableToPincode.status
    ) {
      if (this.props.productDetails.isServiceableToPincode.status === "Y") {
        this.props.displayToast("Product is serviceable to pincode");
        setDataLayerForCartDirectCalls(ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS, pincode);
      } else if (this.props.productDetails.isServiceableToPincode.status === "N") {
        this.props.displayToast("Product is not serviceable to pincode");
        setDataLayerForCartDirectCalls(ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE, pincode);
      } else {
        setDataLayerForCartDirectCalls(ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE, pincode);
      }
    }
  };
  addToCart = async buyNowFlag => {
    let productDetails = {};
    let productDetailsForAddToCart = (({ productListingId, winningUssID, seo, mrpPrice, winningSellerPrice }) => ({
      productListingId,
      winningUssID,
      seo,
      mrpPrice,
      winningSellerPrice,
    }))(this.props.productDetails);
    productDetails.code = this.props.productDetails.productListingId;
    //Updating Product quantity(selected by user) when user clicks on Add To Bag
    const quantitySelected = buyNowFlag ? PRODUCT_QUANTITY : this.state.productQuantityOption.value;
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
      this.props.location.state && this.props.location.state.isSizeSelected && selectedSize ? selectedSize : "";
    setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_ADOBE_ADD_TO_CART_BUTTON, checkSizeSelected);
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
        (this.props.productDetails.winningSellerAvailableStock === "0" && this.checkIfSizeSelected())
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
            (!this.checkIfQuantitySelected() || this.state.productQuantityOption === "Quantity") &&
            this.props.productDetails.rootCategory === "HomeFurnishing"
          ) {
            this.props.displayToast("Please select a quantity to continue");
            this.setState({ quantityError: true });
          } else {
            //localStorage.removeItem(SELECTED_STORE);
            this.setState({ isLoader: true });
            setTracker(ADD_TO_CART, productDetailsForAddToCart);
            if (buyNowFlag) {
              setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_BUY_NOW_EVENT, productDetails);
              if (!checkUserLoggedIn()) {
                localStorage.setItem(BUY_NOW_PRODUCT_DETAIL, JSON.stringify(productDetails));
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
              const addProductToCartResponse = await this.props.addProductToCart(productDetails);
              if (addProductToCartResponse.status === SUCCESS) {
                this.props.displayToast(ADD_TO_BAG_TEXT);
                this.setState({
                  goToCartPageFlag: true,
                });
                await this.props.getMinicartProducts();
                const defaultPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
                // this.props.history.push({
                //   pathname: PRODUCT_CART_ROUTER,
                //   state: {
                //     ProductCode: this.props.productDetails.productListingId,
                //     pinCode: defaultPinCode,
                //     isClickOnAddToBag: !buyNowFlag
                //   }
                // });
              }
            }
            this.setState({ sizeError: false });
          }
        } else {
          this.props.displayToast("Please select a size to continue");
          this.setState({
            sizeError: true,
            isLoader: false,
          });
        }
      }
    }
  };
  navigateToLogin(isBuyNow) {
    if (this.props.isMNLLogin.value) {
      this.props.openMobileNumberLoginModal();
    } else {
      const url = this.props.location.pathname;
      if (isBuyNow) {
        this.props.setUrlToRedirectToAfterAuth(PRODUCT_CART_ROUTER);
      } else {
        this.props.setUrlToRedirectToAfterAuth(url);
      }
      this.props.history.push(LOGIN_PATH);
    }
  }
  redirectToLoginPage() {
    this.props.history.push(LOGIN_PATH);
  }
  goToReviewPage = isNeedToSetDataLayer => {
    setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_VIEW_ALL_REVIEW_AND_RATING_EVENT);
    const url = `${this.props.location.pathname}/${PRODUCT_REVIEWS_PATH_SUFFIX}`;
    this.props.history.push(url);
  };
  renderRatings = () => {
    return null;
  };
  // Functions only used in HomeFurnishings
  checkIfQuantitySelected = () => {
    if (this.props.location.state && this.props.location.state.isQuantitySelected) {
      return true;
    } else {
      return false;
    }
  };
  updateQuantity = quantity => {
    this.setState({
      productQuantityOption: quantity,
      quantityError: false,
      isLoader: false,
    });
  };
  updateSize = () => {
    this.setState({ sizeError: false });
  };
  //---------------Functions used only in HomeFurnishings Ends here---------------------
  showPincodeModal = () => {
    if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
      this.props.showPincodeModal(this.props.match.params[0]);
    } else if (this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE) {
      this.props.showPincodeModal(this.props.match.params[1]);
    }
  };
  showManufacturerDetailsModal = () => {
    this.props.showManufactureDetailsModal(this.props.manufacturerDetails);
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
    if (this.props.showSizeSelector && this.props.productDetails && this.props.productDetails.variantOptions) {
      this.props.showSizeSelector({
        sizeSelected: this.checkIfSizeSelected(),
        productName: this.props.productDetails.productName,
        productId: this.props.productDetails.productListingId,
        showSizeGuide: this.props.showSizeGuide,
        hasSizeGuide: this.props.productDetails.showSizeGuide,
        data: this.props.productDetails.variantOptions,
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
    this.setState({
      sizeError: true,
      isLoader: false,
    });
  };
  showPriceBreakup = () => {
    if (this.props.showPriceBreakup) {
      this.props.showPriceBreakup(this.props.productDetails.priceBreakUpDetailsMap);
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
      (this.props.productDetails.variantOptions[0].sizelink.size.toUpperCase() === NO_SIZE ||
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
  goToPage = url => {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };
  goToHome = () => {
    this.props.history.push(HOME_ROUTER);
  };
  handleShowPiqPage = () => {
    setDataLayerForPdpDirectCalls(ADOBE_DIRECT_CALL_FOR_PICK_UP_OPTION);
    // if (!checkUserLoggedIn()) {
    //   this.navigateToLogin();
    // } else {
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
    // }
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
      behavior: "smooth",
    });
  };

  relevantBundleProductId = async (bundlePrdouct, relevantBundleProductId) => {
    let x;
    await bundlePrdouct.map(bundle => {
      if (relevantBundleProductId) {
        if (bundle.primaryProductCode === relevantBundleProductId) {
          x = bundle;
        }
      }
    });

    return x;
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
        if (value && separateValue.length === 2) {
          return (
            <div className={styles.tableCellSingleComponent} key={index}>
              {<img src={separateValue[1]} alt="" height={86} width={93} />}
              <div className={styles.width95px}>
                <div className={styles.textAlignCenter}>{separateValue[0]}</div>
              </div>
            </div>
          );
        } else {
          return null;
        }
      }
    });
  };
  displayPrdImage = prdDetails => {
    let details = prdDetails;

    return details.map((imageDetail, index) => {
      return (
        <div className={styles.tableCellSingleComponentForEyeWear} key={index}>
          {<img src={imageDetail.url} alt="" height={"auto"} width={110} />}
          <div className={styles.width95px}>
            <div className={styles.textAlignCenter}>{imageDetail.value}</div>
          </div>
        </div>
      );
    });
  };

  tail = ([x, ...xs]) => xs;

  renderDetails(filteredData) {
    return filteredData.map(val => {
      return (
        <div className={styles.contentDetails}>
          <div className={styles.headerDetails}>{val.key}</div>
          <div className={styles.descriptionDetails}>{val.value}</div>
        </div>
      );
    });
  }
  filterDetails(productData, moreData) {
    let filteredData = productData.filter(val => {
      return val.value.includes("|") === false;
    });
    return this.renderDetails(filteredData);
  }

  getSeasonDetails(key) {
    let seasonData = this.props.productDetails.seasonDetails;
    let value = "";
    let details = seasonData.find(val => {
      return val.key === key;
    });
    if (details && details.key) {
      if (details.value) {
        value = details.value;
      }
    }
    return value;
  }

  onClickBanner(key) {
    let seasonData = this.props.productDetails.seasonDetails;
    let value = "";
    let details = seasonData.find(val => {
      return val.key === key;
    });
    if (details && details.key) {
      if (details.value) {
        value = details.value;
      }
    }
    window.location.href = value;
  }
  ScrollIntoView() {
    if (this.reviewListRef.current) {
      let headerOffset = 45,
        elementPosition = this.reviewListRef.current.getBoundingClientRect().top,
        offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }
  handleChange(e) {
    let bundledList = this.state.bundledProductList;
    !this.state.selectedBundledProduct.includes(e.target.value) &&
      this.state.selectedBundledProduct.push(e.target.value);
  }
  openHowExchangeWorksModal(data) {
    this.props.showExchangeModal(data);
  }
  async openExchangeModal() {
    if (this.props.productDetails) {
      let listingId = this.props.productDetails.productListingId;
      let ussId = this.props.productDetails.winningUssID;
      let maxExchangeAmount =
        this.props.productDetails.maxExchangeAmount && this.props.productDetails.maxExchangeAmount.value;
      let pickupCharge =
        this.props.productDetails.pincodeResponseList &&
        this.props.productDetails.pincodeResponseList.cashifyPickupCharge;
      let productName = this.props.productDetails.productName;
      //call exchange details API
      let response = await this.props.getExchangeDetails(listingId, ussId, maxExchangeAmount, pickupCharge);
      // if brand n model details are present then only show exchange modal
      if (
        response &&
        response.status &&
        response.status.toLowerCase() === "success" &&
        response.data &&
        response.data.makeModelDetails
      ) {
        //open exchange modal
        this.props.showExchangeModal({
          exchangeDetails: this.props.exchangeDetails,
          productName: productName,
          listingId: listingId,
          ussId: ussId,
        });
        setDataLayer(ADOBE_MDE_CLICK_ON_EXCHANGE_LINK, this.props.productDetails.productListingId);
      }
      // if brand n model details are not avail show toast
      if (
        response &&
        response.status &&
        response.status.toLowerCase() === "success" &&
        response.data &&
        !response.data.makeModelDetails
      ) {
        this.props.displayToast("Exchange cannot be processed right now. Please try again after sometime");
      }
    }
  }
  clickedSamsungChatIcon() {
    setDataLayerForPdpDirectCalls(ADOBE_SUMSUNG_CHAT_ICON);
  }
  clickedSamsungChat() {
    setDataLayerForPdpDirectCalls(ADOBE_SUMSUNG_CHAT_LINK_CLICK);
  }
  getBrandCode(brandUrl) {
    if (brandUrl) {
      let brandCode = brandUrl.split("/c-");
      let brandCodeInUpperCase = brandCode[1].toUpperCase();
      return brandCodeInUpperCase;
    } else {
      return null;
    }
  }

  render() {
    let seasonData = {};
    if (this.props.productDetails["seasonDetails"] !== undefined) {
      seasonData = this.props.productDetails["seasonDetails"].find(item => {
        return item.key === "Season";
      });
    }
    let bundledList = this.state.bundledProductList;
    const getPinCode =
      this.props &&
      this.props.userAddress &&
      this.props.userAddress.addresses &&
      this.props.userAddress.addresses[0] &&
      this.props.userAddress.addresses[0].postalCode;
    const address = this.props && this.props.userAddress && this.props.userAddress.addresses;

    let userCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userCookie) {
      userCookie = JSON.parse(userCookie);
    }
    const productData = this.props.productDetails;
    const manufacturerDetails = this.props.manufacturerDetails;
    let mshProduct = productData && productData.brandURL;
    const tailedKnowMoreV2 = productData && productData.knowMoreV2 && this.tail(productData.knowMoreV2);

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
              type: "image",
            };
          });
        } else if (galleryImageList.mediaType === "Video") {
          return galleryImageList.galleryImages.filter(galleryImages => {
            return {
              product: galleryImages.key === "thumbnail",
              type: "video",
            };
          });
        }
      })
      .map(image => {
        if (image[0].value) {
          return {
            value: image[0].value,
            type: image[0].key === "product" ? "image" : "video",
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
        if (image[0] && image[0].value) {
          return image[0].value;
        }
      });
    const zoomImages = images
      .map(galleryImageList => {
        if (galleryImageList.mediaType === IMAGE) {
          return galleryImageList.galleryImages.filter(galleryImages => {
            if (galleryImages.key === "superZoom") {
              return galleryImages.key === "superZoom";
            } else {
              return galleryImages.key === "zoom";
            }
          });
        } else if (galleryImageList.mediaType === "Video") {
          return galleryImageList.galleryImages.filter(galleryImages => {
            return galleryImages.key === "thumbnail";
          });
        }
      })
      .map(image => {
        if (image[0] && image[0].value) {
          return image[0].value;
        }
      });
    let getDeliveryModesByWinningUssid = "";
    if (
      this.props.productDetails &&
      this.props.productDetails.pincodeResponseList &&
      this.props.productDetails.pincodeResponseList.deliveryOptions &&
      this.props.productDetails.pincodeResponseList.deliveryOptions.pincodeListResponse &&
      this.props.productDetails.pincodeResponseList.deliveryOptions.pincodeListResponse
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
    const availableStores = firstSlaveData && firstSlaveData.CNCServiceableSlavesData;
    if (productData) {
      let price = "";
      let discountPrice = "";
      let discountPdp = "";
      let mrpDoubleValue = "";

      if (productData.mrpPrice) {
        price = productData.mrpPrice.doubleValue;
      }
      if (productData.winningSellerPrice) {
        discountPrice = productData.winningSellerPrice.doubleValue;
      }
      let seoDoublePrice = 0;
      if (productData.winningSellerPrice && productData.winningSellerPrice.doubleValue) {
        seoDoublePrice = productData.winningSellerPrice.doubleValue;
      } else if (productData.mrpPrice && productData.mrpPrice.doubleValue) {
        seoDoublePrice = productData.mrpPrice.doubleValue;
      }
      if (productData.mrpPrice && productData.mrpPrice.doubleValue) {
        mrpDoubleValue = productData.mrpPrice.doubleValue;
        discountPdp = Math.floor(((mrpDoubleValue - seoDoublePrice) / mrpDoubleValue) * 100);
      }
      let flixModelNo = "";
      if (productData.details && productData.details.length) {
        flixModelNo = productData.details.find(detail => {
          return detail.key === "Model Number";
        });
      }
      let imageArray = [];
      let featuresData = [];
      if (productData.prdDetails) {
        productData.prdDetails.forEach(detail => {
          if (/(\|)/g.test(detail.value)) {
            let valueArray = detail.value.split("|");
            imageArray.push({
              key: detail.key,
              value: valueArray[0],
              url: valueArray[1],
            });
          }
        });
      }
      if (productData.details) {
        productData.details.forEach(detail => {
          if (/(\|)/g.test(detail.value)) {
            let valueArray = detail.value.split("|");
            featuresData.push({
              key: detail.key,
              value: valueArray[0],
            });
          } else {
            featuresData.push({
              key: detail.key,
              value: detail.value,
            });
          }
        });
      }

      let Bundledprice = "";
      let BundleddiscountPrice = "";
      let BundledseoDoublePrice = 0;
      if (productData.winningSellerPrice && productData.winningSellerPrice.doubleValue) {
        BundledseoDoublePrice = productData.winningSellerPrice.doubleValue;
      } else if (productData.mrpPrice && productData.mrpPrice.doubleValue) {
        BundledseoDoublePrice = productData.mrpPrice.doubleValue;
      }
      if (productData.mrpPrice && productData.mrpPrice.formattedValueNoDecimal) {
        Bundledprice = productData.mrpPrice.formattedValueNoDecimal;
      }

      if (productData.winningSellerPrice && productData.winningSellerPrice.formattedValueNoDecimal) {
        BundleddiscountPrice = productData.winningSellerPrice.formattedValueNoDecimal;
      }
      let disabledStatus =
        productData.allOOStock ||
        this.props.pincodeError ||
        (productData.isServiceableToPincode && productData.isServiceableToPincode.productOutOfStockMessage) ||
        (productData.isServiceableToPincode && productData.isServiceableToPincode.productNotServiceableMessage) ||
        !productData.winningSellerPrice ||
        (productData.winningSellerAvailableStock === "0" && this.checkIfSizeSelected());

      let exchangeDisabled = false;
      if (disabledStatus) {
        if (!productData.isPickupAvailableForExchange) {
          exchangeDisabled = true;
        }
      } else {
        if (!productData.isPickupAvailableForExchange) {
          exchangeDisabled = true;
        }
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
            {this.props.chatbotDetailsData && (
              <Chatbot
                productDetails={this.props.productDetails}
                chatbotDetailsData={this.props.chatbotDetailsData}
                addToCartFromChatbot={true}
                getProductPinCode={this.props.getProductPinCode}
                isServiceableToPincode={productData.isServiceableToPincode}
                displayToast={this.props.displayToast}
                addProductToCart={this.props.addProductToCart}
                addToCartResponseDetails={this.props.addToCartResponseDetails}
                history={this.props.history}
                addToCartResponseLoading={this.props.addToCartResponseLoading}
                cartCountDetails={this.props.cartCountDetails}
                checkPincodeDetailsLoading={this.props.checkPincodeDetailsLoading}
                checkPincodeFromHaptikChatbot={this.props.checkPincodeFromHaptikChatbot}
                cartCountDetailsLoading={this.props.cartCountDetailsLoading}
              />
            )}
            <div className={styles.pageCenter} ref="scrollToViewGallery">
              <div className={styles.gallery}>
                <ProductGalleryDesktop
                  data={productData.galleryImagesList}
                  productImages={productImages}
                  thumbNailImages={thumbNailImages}
                  zoomImages={zoomImages}
                  alt={`${productData.productName}-${productData.brandName}-${productData.rootCategory}-TATA CLIQ`}
                  details={productData.details}
                  showSimilarProducts={this.props.showSimilarProducts}
                  category={productData.rootCategory}
                  productData={productData}
                />
                {productData.winningSellerPrice && (
                  <PdpFlags
                    discountPercent={productData.discount}
                    isOfferExisting={productData.isOfferExisting}
                    onlineExclusive={productData.isOnlineExclusive}
                    outOfStock={productData.allOOStock}
                    seasonSale={seasonData}
                    newProduct={productData.isProductNew}
                    showExchangeTag={productData.showExchangeTag}
                    exchangeOfferAvailable={productData.exchangeOfferAvailable}
                    dCEmiEligibiltyDetails={this.props.dCEmiEligibiltyDetails}
                  />
                )}
                {!productData.winningSellerPrice && <div className={styles.flag}>Not Saleable</div>}
              </div>
              <div className={styles.content}>
                <div className={styles.horizontalOffset}>
                  <div className={styles.breadcrumbs}>
                    <div className={styles.breadcrumbsDefault} onClick={() => this.goToHome()}>
                      Home
                    </div>
                    {reverseBreadCrumbs &&
                      reverseBreadCrumbs.map(val => {
                        return (
                          <div className={styles.breadcrumbsText} onClick={() => this.goToPage(val.url)}>
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
                        ScrollReviewList={this.ScrollIntoView}
                        doublePrice={seoDoublePrice}
                        discountPrice={discountPrice}
                        ratingCount={productData.ratingCount}
                        averageRating={productData.averageRating}
                        numberOfReviews={productData.numberOfReviews}
                        goToReviewPage={this.goToReviewPage}
                        discount={discountPdp}
                        hasPriceBreakUp={productData.showPriceBrkUpPDP === "Yes"}
                        showPriceBreakUp={this.showPriceBreakup}
                        offers={this.props.offers}
                        impulseOfferCalloutList={this.props.impulseOfferCalloutList}
                        potentialPromotions={productData.potentialPromotions}
                        isPdp={true}
                      />
                    </div>
                    <div className={styles.wisthListIconHolder}>
                      <AddToWishListButtonContainer
                        type={ONLY_ICON}
                        productListingId={productData.productListingId}
                        winningUssID={productData.winningUssID}
                        setDataLayerType={SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP}
                        isSizeSelectedForAddToWishlist={this.isSizeSelectedForAddToWishlist()}
                        showSizeSelector={this.isSizeNotSelectedForAddToWishlist}
                        ussid={productData.winningUssID}
                      />
                    </div>
                  </div>
                </div>
                {productData.details &&
                  (productData.rootCategory === "FineJewellery" || productData.rootCategory === "FashionJewellery") &&
                  productData.details.length > 0 && (
                    <div className={styles.horizontalOffset}>
                      <div className={styles.info}>
                        <span className={styles.textOffset}>{productData.details[0].value}</span>
                        {this.state.showProductDetails && <div>{productData.productDescription}</div>}
                        {!this.state.showProductDetails && (
                          <span className={styles.link} onClick={this.showProductDetails}>
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
                    {...this.props}
                    productListings={this.props.productDetails}
                    showBundledProduct={this.props.showBundledProduct}
                    showDetails={this.props.showTermsNConditions}
                    showVoucherOffersModal={this.props.showOfferDetails}
                    potentialPromotions={productData.potentialPromotions}
                    secondaryPromotions={productData.productOfferMsg}
                    offers={this.props.offers}
                    defaultPinCode={localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)}
                    getBundleproduct={this.props.getBundleproduct}
                    getProductPinCode={(pinCode, productCode) => this.props.getProductPinCode(pinCode, productCode)}
                    getBundleProductPinCode={this.props.getBundleProductPinCode}
                  />

                  {productData.exchangeAvailable && (
                    <ExchangeDetailsPDPDesktop
                      productData={productData}
                      exchangeDisabled={exchangeDisabled}
                      openExchangeModal={() => this.openExchangeModal()}
                      openHowExchangeWorksModal={data => this.openHowExchangeWorksModal(data)}
                    />
                  )}
                </div>
                {productData.variantOptions && (
                  <div>
                    <div className={styles.horizontalOffset}>
                      {!this.checkIfNoSize() && !this.checkIfSizeDoesNotExist() && (
                        <React.Fragment>
                          {productData.rootCategory !== "HomeFurnishing" &&
                            productData.rootCategory !== "FineJewellery" &&
                            productData.rootCategory !== "FashionJewellery" && (
                              <div className={this.state.sizeError ? styles.sizeError : styles.sizeHolder}>
                                <SizeSelector
                                  history={this.props.history}
                                  headerText={productData.isSizeOrLength}
                                  sizeSelected={this.checkIfSizeSelected()}
                                  productId={productData.productListingId}
                                  hasSizeGuide={productData.showSizeGuide}
                                  showSizeGuide={this.props.showSizeGuide}
                                  showSizeSelectorForEyeWear={this.props.showSizeSelectorForEyeWear}
                                  isSizeOrLength={productData.isSizeOrLength}
                                  showOOSSizeSelectorModal={this.props.showOOSSizeSelectorModal}
                                  productCode={this.props.productDetails.productListingId}
                                  showSimilarSizeOOSModal={this.props.showSimilarSizeOOSModal}
                                  sizeChartData={this.props.getProductSizeGuide}
                                  eyeWearSizeGuide={this.state.productCategory}
                                  categoryHierarchy={
                                    this.props.productDetails && this.props.productDetails.categoryHierarchy
                                  }
                                  data={productData.variantOptions}
                                  infoDetails={productData.details}
                                  showSizeSelectorIcon={false}
                                  textSize={12}
                                  getProductDescription={this.props.getProductDescription}
                                />
                              </div>
                            )}
                          {(productData.rootCategory === "HomeFurnishing" ||
                            productData.rootCategory === "FineJewellery" ||
                            productData.rootCategory === "FashionJewellery") && (
                            <React.Fragment>
                              <div
                                className={
                                  this.state.sizeError || this.state.quantityError
                                    ? styles.sizeError
                                    : styles.sizeHolder
                                }
                              >
                                <SizeQuantitySelect
                                  history={this.props.history}
                                  headerText={productData.isSizeOrLength}
                                  sizeError={this.state.sizeError}
                                  quantityError={this.state.quantityError}
                                  showSizeGuide={productData.showSizeGuide ? this.props.showSizeGuide : null}
                                  data={productData.variantOptions}
                                  maxQuantity={productData.maxQuantityAllowed}
                                  updateQuantity={this.updateQuantity}
                                  updateSize={this.updateSize}
                                  checkIfSizeSelected={this.checkIfSizeSelected}
                                  checkIfQuantitySelected={this.checkIfQuantitySelected}
                                  productQuantity={this.state.productQuantityOption}
                                  noQuantity={
                                    productData.rootCategory === "FineJewellery" ||
                                    productData.rootCategory === "FashionJewellery"
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
                                      onClick={() => this.goToBuyingGuide(productData.buyingGuideUrl)}
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
                        getProductSpecification={this.props.getProductSpecification}
                      />
                    </div>
                  </div>
                )}
                {productData.certificationMapFrJwlry && (
                  <div className={styles.horizontalOffset}>
                    <JewelleryCertification certifications={productData.certificationMapFrJwlry} />
                  </div>
                )}

                {this.state.showGotoCartButton && (
                  <div className={styles.openInAppButton}>
                    <AddToWishListButtonContainer
                      type="wishlistTextPDP"
                      productListingId={productData.productListingId}
                      winningUssID={productData.winningUssID}
                      setDataLayerType={SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP}
                      isSizeSelectedForAddToWishlist={this.isSizeSelectedForAddToWishlist()}
                      showSizeSelector={this.isSizeNotSelectedForAddToWishlist}
                      ussid={productData.winningUssID}
                    />
                  </div>
                )}
                {!this.state.showGotoCartButton && (
                  <div className={styles.buttonWrapper}>
                    <div className={this.state.isLoader ? styles.nonClickButton : styles.buttonHolder}>
                      {this.state.isLoader && (
                        <div className={styles.loaderHolder}>
                          <div className={styles.loader} />
                        </div>
                      )}
                      <div className={[styles.buttonAddToBag, disabledStatus ? "" : styles.shadowBtn].join(" ")}>
                        <Button
                          disabledBgGrey={true}
                          type="primary"
                          height={45}
                          width={195}
                          label="BUY NOW"
                          onClick={this.onClickOfBuyNow}
                          disabled={disabledStatus}
                        />
                      </div>
                    </div>
                    <div className={styles.buttonHolder}>
                      <div className={[styles.buttonAddToBag, disabledStatus ? "" : styles.shadowBtn].join(" ")}>
                        <Button
                          disabledBgGrey={true}
                          type="hollow"
                          height={45}
                          width={195}
                          color={"#ff1744"}
                          label={this.state.goToCartPageFlag ? "GO TO BAG" : "ADD TO BAG"}
                          onClick={
                            this.state.goToCartPageFlag
                              ? () => this.goToCart({ goToBag: true })
                              : () => this.addToCart(false)
                          }
                          disabled={disabledStatus}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {productData && productData.details && productData.rootCategory === "Electronics" && (
                  <div className={styles.pointListHolder}>
                    <div className={styles.pointHeader}>Highlights</div>

                    {productData.details &&
                      productData.details.map(val => {
                        return val.key !== "Model Number" ? (
                          <div className={styles.list} dangerouslySetInnerHTML={{ __html: val.value }} />
                        ) : null;
                      })}
                    {productData.rootCategory === "Electronics" && (
                      <div className={styles.viewDetails} onClick={() => this.onScroll()}>
                        View full details
                      </div>
                    )}
                  </div>
                )}

                <div className={styles.horizontalOffset} id="DWSN">
                  <div className={styles.separator}>
                    <OtherSellersLink
                      serviceableOtherSellersUssid={this.props.serviceableOtherSellersUssid}
                      onClick={this.goToSellerPage}
                      //otherSellers={productData.otherSellers}
                      winningSeller={productData.winningSellerName}
                      winnningSellerUssId={productData.winningUssID}
                    />
                  </div>
                </div>
                <div className={styles.pinAndDeliveryHolder} id="CPIN">
                  <div className={styles.updatePincodeHolder}>
                    {this.props.productDetails.isServiceableToPincode &&
                    this.props.productDetails.isServiceableToPincode.pinCode ? (
                      <PdpPincode
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
                        pincode={this.props.productDetails.isServiceableToPincode.pinCode}
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
                      <PdpPincode
                        city={
                          this.props.productDetails.isServiceableToPincode &&
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

                  {this.props.productDetails.isServiceableToPincode &&
                  this.props.productDetails.isServiceableToPincode.status === NO ? (
                    this.props.productDetails.isServiceableToPincode.productOutOfStockMessage ? (
                      <div className={styles.overlay}>
                        <div className={styles.notServiciableTetx}>
                          * {this.props.productDetails.isServiceableToPincode.productOutOfStockMessage}
                        </div>
                      </div>
                    ) : this.props.productDetails.isServiceableToPincode.productNotServiceableMessage ? (
                      <div className={styles.overlay}>
                        <div className={styles.notServiciableTetx}>
                          * {this.props.productDetails.isServiceableToPincode.productNotServiceableMessage}
                        </div>
                      </div>
                    ) : this.props.pincodeError ? (
                      <div className={styles.overlay}>
                        <div className={styles.notServiciableTetx}>* {this.props.pincodeError}</div>
                      </div>
                    ) : null
                  ) : /* (
                    <div className={styles.overlay}>
                      {productData.rootCategory === "Clothing" ||
                      productData.rootCategory === "Footwear" ? (
                        <div className={styles.notServiciableTetx}>
                          * This item is currently out of stock
                        </div>
                      ) : (
                        <div className={styles.notServiciableTetx}>
                          * This item is non serviceable at your PIN code
                        </div>
                      )}
                    </div>
                  ) */
                  this.props.productDetails.isServiceableToPincode &&
                    this.props.productDetails.isServiceableToPincode.pinCode ? (
                    <div className={styles.deliveryModesHolder}>
                      <PdpDeliveryModes
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
                    <div className={styles.invalidPinText}>
                      To check for delivery options please enter your pincode above{" "}
                    </div>
                  )}
                </div>
                <React.Fragment>
                  {mshProduct && mshProduct.includes("samsung") && (
                    <div className={styles.sumsungSeparator}>
                      <div className={styles.chatIcon}>
                        {productData.brandName === "Samsung" || productData.brandName === "SAMSUNG" ? (
                          <a href={samsungChatUrl} target="_blank" className={styles.samsungChatImgHolder}>
                            <img
                              src="https://assets.tatacliq.com/medias/sys_master/images/11437918060574.png"
                              alt="Samsung Chat"
                            />
                          </a>
                        ) : null}
                        <div className={styles.chatText}>
                          <p>Chat with the Samsung brand representative directly for more info</p>
                          <a href={samsungChatUrl} target="_blank">
                            Click here to chat
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              </div>
            </div>
            <div className={styles.details}>
              {productData.seasonDetails != null &&
              this.getSeasonDetails("seasonIconURL").length &&
              this.getSeasonDetails("bannerUrl").length &&
              this.getSeasonDetails("bannerUrl").length ? (
                <div className={styles.season}>
                  <div className={styles.pageCenter}>
                    <div className={styles.seasonDetails}>
                      <div className={styles.detailsCard}>
                        <div className={styles.seasonImage}>
                          {this.getSeasonDetails("seasonIconURL").length ? (
                            <div className={styles.seasonImg}>
                              <img
                                alt="season_icon"
                                className={styles.seasonIconImage}
                                src={this.getSeasonDetails("seasonIconURL")}
                              />
                            </div>
                          ) : null}
                          {this.getSeasonDetails("bannerUrl").length ? (
                            <div
                              className={styles.seasonBanner}
                              onClick={() => this.onClickBanner("bannerDestinationUrl")}
                            >
                              <img
                                alt="bannerUrl"
                                className={styles.seasonIconImage}
                                src={this.getSeasonDetails("bannerUrl")}
                              />
                            </div>
                          ) : null}
                        </div>

                        <div className={styles.seasonTextDetails}>
                          <div className={styles.seasonCollection}>
                            <div className={styles.collectionNotesTile}>
                              <h3>Collection Notes</h3>
                            </div>
                            <div className={styles.collectionNotesContent}>
                              {this.getSeasonDetails("Collection Info").length
                                ? this.getSeasonDetails("Collection Info")
                                : null}
                            </div>
                          </div>
                          <div className={styles.seasonStyleDescription}>
                            <div className={styles.collectionNotesTile}>Style Note</div>
                            <div className={styles.collectionNotesContent}>{productData.styleNote}</div>
                          </div>
                          <div className={styles.seasonLaunchDate}>
                            Collection Launched in{" "}
                            {this.getSeasonDetails("Collection Date").length
                              ? this.getSeasonDetails("Collection Date")
                              : null}
                          </div>
                          <div className={styles.seasonButton}>
                            <Button
                              type="hollow"
                              height={45}
                              width={195}
                              label="VIEW ALL"
                              onClick={() => this.onClickBanner("bannerDestinationUrl")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* <div className={styles.youPlus}>
                <div className={styles.pageCenter}>
                  <div id="yp_widget" className={styles.yp_widget} />
                </div>
              </div> */}
              {this.state.bundledProductList.length > 0 && (
                <RevelantBundling {...this.props} bundledItem={this.state.bundledProductList} />
              )}

              <div className={styles.pageCenter}>
                {!disabledStatus && (
                  <ProductBundling
                    bundledProductSuggestionDetails={this.state.bundledProductSuggestionDetails}
                    productData={productData}
                    getTotalBundledPrice={this.props.getTotalBundledPrice}
                    totalBundledPriceDetails={this.props.totalBundledPriceDetails}
                    getTotalBundledPriceLoading={this.props.getTotalBundledPriceLoading}
                    displayToast={this.props.displayToast}
                    addBundledProductsToCart={this.props.addBundledProductsToCart}
                    addBundledProductsToCartLoading={this.props.addBundledProductsToCartLoading}
                    addBundledProductsToCartDetails={this.props.addBundledProductsToCartDetails}
                    history={this.props.history}
                    getCartCountForLoggedInUser={this.props.getCartCountForLoggedInUser}
                    cartCountDetails={this.props.cartCountDetails}
                    logoutUserStatus={this.props.logoutUserStatus}
                  />
                )}

                <div className={styles.detailsHolder} ref="scrollToViewAccrodian">
                  <div className={styles.detailsCard}>
                    {productData.productDescription && (
                      <Accordion text="Product Description" headerFontSize={18} isOpen={true}>
                        <div className={styles.accordionContent} itemProp="description" id="EPMD">
                          {productData.productDescription}

                          <div className={styles.productDetails}>
                            {productData.rootCategory !== "Electronics" &&
                              productData.rootCategory !== "FashionJewellery" &&
                              productData.rootCategory !== "FineJewellery" &&
                              !this.state.eyeWearCheck &&
                              productData.details &&
                              this.filterDetails(productData.details, productData.prdDetails)}
                          </div>
                          {productData.prdDetails && !this.state.eyeWearCheck && (
                            <div className={styles.productDetailsImagesCard}>
                              {this.displayPrdDetails(productData.prdDetails, WASH)}
                              {this.displayPrdDetails(productData.prdDetails, NECK_COLLAR)}
                              {this.displayPrdDetails(productData.prdDetails, SLEEVE)}
                            </div>
                          )}
                          {productData.rootCategory === "Accessories" &&
                            this.state.eyeWearCheck &&
                            imageArray.length > 0 && (
                              <div className={styles.productDetailsImagesCard}>{this.displayPrdImage(imageArray)}</div>
                            )}
                          {productData.rootCategory === "Electronics" && (
                            <div
                              style={{
                                marginTop: 10,
                              }}
                            >
                              {productData.details &&
                                productData.details.map(val => {
                                  return val.key !== "Model Number" ? (
                                    <div className={styles.list}>{val.value}</div>
                                  ) : null;
                                })}
                            </div>
                          )}
                        </div>
                      </Accordion>
                    )}
                    {productData.rootCategory === "HomeFurnishing" && productData.classificationList && (
                      <Accordion text="Overview" headerFontSize={18}>
                        <div className={styles.accordionContent}>
                          {productData.classificationList &&
                            productData.classificationList.map(value => {
                              return (
                                <div className={styles.featureHolder}>
                                  <div className={styles.header}>{value.key}</div>
                                  {value.value.classificationList &&
                                    value.value.classificationList.map(val => {
                                      return (
                                        <div>
                                          <div className={styles.contentTextForHome}>
                                            {val.key}:{val.value}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  {value.value.classificationValues &&
                                    value.value.classificationValues.map(val => {
                                      return (
                                        <div>
                                          <div className={styles.contentTextForHome}>{val}</div>
                                        </div>
                                      );
                                    })}
                                  <div className={styles.blankSeparator} />
                                </div>
                              );
                            })}
                        </div>
                      </Accordion>
                    )}
                    {productData.rootCategory !== "Electronics" &&
                      productData.classifications &&
                      !this.state.eyeWearCheck && (
                        <Accordion text="Features & Functions" headerFontSize={18} isOpen={false}>
                          <div className={styles.accordionContent}>
                            {productData.classifications.map(val => {
                              if (val.specifications) {
                                return val.specifications.map(value => {
                                  return (
                                    <div className={styles.featureHolder}>
                                      <div className={styles.sideHeader}>{value.key}</div>
                                      <div className={styles.sideContent}>{value.value}</div>
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
                    {productData.rootCategory === "Accessories" &&
                      this.state.eyeWearCheck &&
                      productData.details &&
                      featuresData && (
                        <Accordion text="Features & Functions" headerFontSize={18} isOpen={false}>
                          <div className={styles.accordionContent}>
                            {featuresData.map(val => {
                              return (
                                <div className={styles.contentDetails}>
                                  <div className={styles.headerDetails}>{val.key}</div>
                                  <div className={styles.descriptionDetails}>{val.value}</div>
                                </div>
                              );
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
                    {productData.priceBreakUpDetailsMap && productData.showPriceBrkUpPDP === "Yes" && (
                      <PriceBreakUp headerFontSize={18} data={productData.priceBreakUpDetailsMap} sideBySide={true} />
                    )}
                    {productData.returnAndRefund && (
                      <Accordion text="Return & Refund" headerFontSize={18}>
                        {productData.returnAndRefund.map(val => {
                          return (
                            <div
                              className={styles.list}
                              dangerouslySetInnerHTML={{
                                __html: val.refundReturnItem,
                              }}
                            />
                          );
                        })}
                      </Accordion>
                    )}
                    {productData.knowMoreV2 && (
                      <Accordion text="Return & Refund" headerFontSize={18}>
                        <div className={styles.containerWithBottomBorder}>
                          <div className={styles.accordionContentBold}>{productData.knowMoreV2[0].knowMoreItemV2}</div>
                          {tailedKnowMoreV2.map(val => {
                            return <div className={styles.accordionLight}>{val.knowMoreItemV2}</div>;
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
                                    __html: val.knowMoreItem,
                                  }}
                                />
                              );
                            })}
                          {productData.rootCategory !== "Electronics" &&
                            productData.knowMore &&
                            productData.knowMore.map(val => {
                              return <div className={styles.list}>{val.knowMoreItem}</div>;
                            })}
                        </div>
                      </Accordion>
                    )}
                    {productData.rootCategory !== "Electronics" && productData.warranty && !this.state.eyeWearCheck && (
                      <Accordion text="Warranty" headerFontSize={18}>
                        <div className={styles.containerWithBottomBorder}>
                          {productData.warranty &&
                            productData.warranty.map(val => {
                              return <div className={styles.list}>{val}</div>;
                            })}
                        </div>
                      </Accordion>
                    )}
                    {productData.brandInfo && !this.state.eyeWearCheck && (
                      <Accordion text="Brand Info" headerFontSize={18}>
                        <div className={styles.accordionContentWithoutBorder}>{productData.brandInfo}</div>
                      </Accordion>
                    )}

                    {manufacturerDetails && manufacturerDetails.countryOfOrigin && (
                      <Accordion text="Manufacturing, Packaging and Import Info" headerFontSize={18}>
                        <div className={styles.accordionContentWithoutBorder}>
                          <div className={styles.genericCountryPart}>
                            <div className={styles.genericName}>
                              <div className={styles.genericLabel}>Generic Name</div>
                              <div className={styles.manufacturerDetailsBoldText}>
                                {manufacturerDetails.productType}
                              </div>
                            </div>

                            <div className={styles.countryOfOrigin}>
                              <div className={styles.genericLabel}>Country of Origin</div>
                              <div className={styles.manufacturerDetailsBoldText}>
                                {manufacturerDetails.countryOfOrigin}
                              </div>
                            </div>
                          </div>
                          <div className={styles.modalDisplayMore}>
                            <div>
                              For more details{" "}
                              <span onClick={this.showManufacturerDetailsModal} className={styles.clickHere}>
                                click here
                              </span>
                            </div>
                          </div>
                        </div>
                      </Accordion>
                    )}
                  </div>
                  {this.renderRatings}
                </div>
                <React.Fragment>
                  {flixModelNo && productData.brandName ? (
                    <FlixMediaContainer flixModelNo={flixModelNo} brandName={productData.brandName} />
                  ) : null}
                </React.Fragment>
                {productData.rootCategory === "Electronics" && (
                  <div className={styles.detailsHolder}>
                    <div className={styles.detailsCard}>
                      {productData.classifications && (
                        <ProductFeatures headerFontSize={18} features={productData.classifications} />
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
                          productContent={productData.APlusContent.productContent}
                          template={productData.APlusContent.temlateName}
                        />
                      )}
                    </React.Fragment>
                    <div className={styles.blankSeparator} />
                    <React.Fragment>
                      {productData.numberOfReviews &&
                      (productData.numberOfReviews !== 0 || productData.numberOfReviews !== "0") ? (
                        <div className={styles.reviewsHolder} ref={this.reviewListRef}>
                          <div className={styles.reviewsHeader}>
                            <h3>Ratings and Reviews</h3>
                            <div className={styles.reviewsButton}>
                              <UnderLinedButton
                                color="#ff1744"
                                label="See All"
                                fontFamily="light"
                                onClick={this.goToReviewPage}
                              />
                            </div>
                          </div>
                          {productData.averageRating && (
                            <div className={styles.reviewListHolder}>
                              <div className={styles.ratingTextContainer}>
                                <div className={styles.ratingText}>
                                  {Math.round(productData.averageRating * 10) / 10}
                                </div>
                                <div className={styles.starPLPElectronics}>
                                  <Icon image={FilledStarBlack} size={26} />
                                </div>
                              </div>
                              <div className={styles.labelText}>
                                <span className={styles.ratingLabel} itemProp="ratingCount">
                                  {productData.ratingCount}
                                </span>
                                <span>{productData.ratingCount > 1 ? "Ratings" : "Rating"}</span>
                                {productData.numberOfReviews ? (
                                  <React.Fragment>
                                    {" &"}
                                    <span className={styles.ratingLabel} itemProp="reviewCount">
                                      {productData.numberOfReviews}
                                    </span>
                                    <span>{productData.numberOfReviews > 1 ? "Reviews" : "Review"}</span>
                                  </React.Fragment>
                                ) : null}
                              </div>
                            </div>
                          )}
                          <ProductReviewListContainer limit={true} productId={productData.productListingId} />
                        </div>
                      ) : null}
                    </React.Fragment>
                    <div id="recommendedSection" />
                    <React.Fragment>
                      <PDPRecommendedSectionsContainer productData={this.props} />
                    </React.Fragment>
                  </React.Fragment>
                </div>
              </div>
            </div>
          </div>

          {/* {productData.brandName === "Samsung" ? (
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
          ) : null} */}
        </PdpFrame>
      );
    } else {
      return null;
    }
  }
}

PdpApparel.propTypes = {
  location: PropTypes.object,
  productDetails: PropTypes.objectOf(
    PropTypes.shape({
      seo: PropTypes.objectOf(
        PropTypes.shape({
          alternateURL: PropTypes.string,
          breadcrumbs: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
              url: PropTypes.string,
            })
          ),
          canonicalURL: PropTypes.string,
          description: PropTypes.string,
          imageURL: PropTypes.string,
          keywords: PropTypes.string,
          title: PropTypes.string,
        })
      ),
      categoryHierarchy: PropTypes.arrayOf(
        PropTypes.shape({
          category_id: PropTypes.string,
          category_name: PropTypes.string,
        })
      ).isRequired,
      rootCategory: PropTypes.string,
      allOOStock: PropTypes.bool,
      productListingId: PropTypes.string,
      winningUssID: PropTypes.string,
      winningSellerPrice: PropTypes.objectOf(
        PropTypes.shape({
          currencyIso: PropTypes.string,
          currencySymbol: PropTypes.string,
          doubleValue: PropTypes.number,
          formattedValue: PropTypes.string,
          formattedValueNoDecimal: PropTypes.string,
          priceType: PropTypes.string,
          value: PropTypes.number,
        })
      ),
      winningSellerAvailableStock: PropTypes.string,
      showSizeGuide: PropTypes.bool,
      eligibleDeliveryModes: PropTypes.arrayOf(
        PropTypes.shape({
          code: PropTypes.string,
          displayCost: PropTypes.string,
          name: PropTypes.string,
        })
      ),
      maxExchangeAmount: PropTypes.objectOf(
        PropTypes.shape({
          currencyIso: PropTypes.string,
          currencySymbol: PropTypes.string,
          doubleValue: PropTypes.number,
          formattedValue: PropTypes.string,
          formattedValueNoDecimal: PropTypes.string,
          priceType: PropTypes.string,
          value: PropTypes.number,
        })
      ),
      productName: PropTypes.string,
      categoryL4Code: PropTypes.string,
    })
  ),
  getUserAddress: PropTypes.func,
  getPdpOffers: PropTypes.func,
  getManufacturerDetails: PropTypes.func,
  openInApp: PropTypes.func,
  relevantBundleProductCodeData: PropTypes.object,
  getRelevantBundleProduct: PropTypes.func,
  relevantProductServibilty: PropTypes.func,
  displayToast: PropTypes.func,
  visitBrandStore: PropTypes.func,
  history: PropTypes.object,
  getProductPinCode: PropTypes.func,
  buyNow: PropTypes.func,
  addProductToCart: PropTypes.func,
  getMinicartProducts: PropTypes.func,
  setUrlToRedirectToAfterAuth: PropTypes.func,
  match: PropTypes.object,
  showPincodeModal: PropTypes.func,
  showManufactureDetailsModal: PropTypes.func,
  getPdpEmi: PropTypes.func,
  showEmiModal: PropTypes.func,
  showSizeSelector: PropTypes.func,
  showPriceBreakup: PropTypes.func,
  getProductSizeGuide: PropTypes.func,
  getAllStoresForCliqAndPiq: PropTypes.func,
  showPdpPiqPage: PropTypes.func,
  showExchangeModal: PropTypes.func,
  getExchangeDetails: PropTypes.func,
  userAddress: PropTypes.object,
  pincodeError: PropTypes.object,
  showSimilarProducts: PropTypes.func,
  offers: PropTypes.object,
  impulseOfferCalloutList: PropTypes.object,
  showBundledProduct: PropTypes.func,
  showTermsNConditions: PropTypes.func,
  showOfferDetails: PropTypes.func,
  getBundleproduct: PropTypes.func,
  getBundleProductPinCode: PropTypes.func,
  showSizeGuide: PropTypes.func,
  showSizeSelectorForEyeWear: PropTypes.func,
  showOOSSizeSelectorModal: PropTypes.func,
  showSimilarSizeOOSModal: PropTypes.func,
  getProductDescription: PropTypes.func,
  serviceableOtherSellersUssid: PropTypes.object,
  getChatbotDetails: PropTypes.func,
  chatbotDetailsData: PropTypes.objectOf(
    PropTypes.shape({
      chatEnabled: PropTypes.bool,
      list: PropTypes.arrayOf(
        PropTypes.shape({
          pageType: PropTypes.string,
          showWidget: PropTypes.bool,
          categoryCode: PropTypes.string,
          categoryName: PropTypes.string,
          enableAfterSeconds: PropTypes.number,
          categoryLandingPage: PropTypes.string,
        })
      ),
    })
  ),
  getBundledProductSuggestion: PropTypes.func,
  bundledProductSuggestionDetails: PropTypes.object,
  getTotalBundledPrice: PropTypes.func,
  totalBundledPriceDetails: PropTypes.object,
  getTotalBundledPriceLoading: PropTypes.bool,
};
