import React from "react";
import PropTypes from "prop-types";
import {
  ADD_TO_BAG_TEXT,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  SUCCESS,
  ADD_TO_CART_EVENT_HAPTIK_CHATBOT,
  GO_TO_CART_EVENT_HAPTIK_CHATBOT,
  PRODUCT_CART_ROUTER,
  FAILURE_LOWERCASE
} from "../../lib/constants.js";
import queryString from "query-string";
import { setDataLayer, ICID2 } from "../../lib/adobeUtils";
const PRODUCT_IN_CART = "Product is already in cart";
const ADD_TO_CART_UPDATE = "add_to_cart_update";
const ADDED = "added";
const FAILED = "failed";
export default class Chatbot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      ussId: "",
      productIdProvidedHaptik: "",
      isProductInCart: false
    };
    this.addToCartFromHaptikChatbot = this.addToCartFromHaptikChatbot.bind(
      this
    );
  }

  componentDidMount() {
    if (this.props.addToCartFromChatbot) {
      window.addEventListener("haptik_event", this.addToCartFromHaptikChatbot);
    }
    this.renderHaptikChatbot(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      (this.props.productListings &&
        this.props.productListings.currentQuery &&
        this.props.productListings.currentQuery.url) !==
      (nextProps.productListings &&
        nextProps.productListings.currentQuery &&
        nextProps.productListings.currentQuery.url)
    ) {
      let buzzoAssistant = document.getElementById("buzzoassistant");
      let chatDemo = document.getElementById("chatdemo");
      if (buzzoAssistant) {
        buzzoAssistant.remove();
      }
      if (chatDemo) {
        chatDemo.remove();
      }
      this.renderHaptikChatbot(nextProps);
    }
    // check pincode success
    if (
      nextProps.isServiceableToPincode &&
      this.props.isServiceableToPincode !== nextProps.isServiceableToPincode &&
      nextProps.checkPincodeFromHaptikChatbot
    ) {
      if (
        this.props.checkPincodeDetailsLoading !==
          nextProps.checkPincodeDetailsLoading &&
        !nextProps.isServiceableToPincode.productOutOfStockMessage &&
        !nextProps.isServiceableToPincode.productNotServiceableMessage
      ) {
        // add to cart
        if (this.state.productId && this.state.ussId) {
          let data = {
            code: this.state.productId,
            ussId: this.state.ussId,
            quantity: 1
          };
          this.props.addProductToCart(data);
        }
      } else {
        let errorMessage = "";
        if (nextProps.isServiceableToPincode.productOutOfStockMessage) {
          this.props.displayToast(
            nextProps.isServiceableToPincode.productOutOfStockMessage
          );
          errorMessage =
            nextProps.isServiceableToPincode.productOutOfStockMessage;
        } else if (
          nextProps.isServiceableToPincode.productNotServiceableMessage
        ) {
          this.props.displayToast(
            nextProps.isServiceableToPincode.productNotServiceableMessage
          );
          errorMessage =
            nextProps.isServiceableToPincode.productNotServiceableMessage;
        }
        if (errorMessage) {
          this.submitHaptikEvent(
            errorMessage,
            FAILURE_LOWERCASE,
            this.state.productIdProvidedHaptik
          );
        }
      }
    }

    let isProductInCartPreviousData =
      this.props.cartCountDetails &&
      this.props.cartCountDetails.products &&
      this.props.cartCountDetails.products.find(val => {
        return val.USSID === this.state.ussId;
      });
    let isProductInCart =
      nextProps.cartCountDetails &&
      nextProps.cartCountDetails.products &&
      nextProps.cartCountDetails.products.find(val => {
        return val.USSID === this.state.ussId;
      });
    // show toast on add to cart success
    if (
      !isProductInCart &&
      nextProps.addToCartResponseDetails &&
      this.props.addToCartResponseLoading !==
        nextProps.addToCartResponseLoading &&
      this.props.addToCartResponseDetails !==
        nextProps.addToCartResponseDetails &&
      nextProps.addToCartResponseDetails.status &&
      nextProps.addToCartResponseDetails.status.toLowerCase() === SUCCESS
    ) {
      // icid2 implementation
      if (this.props.history.location && this.props.history.location.search) {
        const parsedQueryString = queryString.parse(
          this.props.history.location.search
        );
        if (parsedQueryString && parsedQueryString.icid2) {
          let icid2Value = parsedQueryString.icid2;
          setDataLayer(null, null, icid2Value, ICID2, null);
        }
      }
      this.props.displayToast(ADD_TO_BAG_TEXT);
      this.submitHaptikEvent("", SUCCESS, this.state.productIdProvidedHaptik);
    }
    if (
      isProductInCart &&
      isProductInCart !== isProductInCartPreviousData &&
      this.props.cartCountDetailsLoading !==
        nextProps.cartCountDetailsLoading &&
      !this.state.isProductInCart &&
      !nextProps.addToCartResponseLoading
    ) {
      this.submitHaptikEvent(
        PRODUCT_IN_CART,
        FAILURE_LOWERCASE,
        this.state.productIdProvidedHaptik
      );
      this.setState({ isProductInCart: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("haptik_event", this.addToCartFromHaptikChatbot);
  }

  submitHaptikEvent(message, status, productId) {
    if (status === SUCCESS) {
      let haptikListenerJsonData = {
        event_name: ADD_TO_CART_UPDATE,
        product_id: productId,
        status: ADDED
      };
      if (window.raiseHaptikEvent) {
        window.raiseHaptikEvent(haptikListenerJsonData);
      }
    } else {
      let haptikListenerJsonData = {
        event_name: ADD_TO_CART_UPDATE,
        product_id: productId,
        status: FAILED,
        failure_message: message
      };
      if (window.raiseHaptikEvent) {
        window.raiseHaptikEvent(haptikListenerJsonData);
      }
    }
  }

  addToCartFromHaptikChatbot(event) {
    if (event && event.detail) {
      let haptikEventDetails = event.detail;
      // check all required values present
      if (
        haptikEventDetails &&
        haptikEventDetails.event_name === ADD_TO_CART_EVENT_HAPTIK_CHATBOT &&
        haptikEventDetails.product_id &&
        haptikEventDetails.extras.ussid
      ) {
        this.setState({
          productIdProvidedHaptik: haptikEventDetails.product_id
        });
        // check pincode serviceablity
        let productId = haptikEventDetails.product_id.toUpperCase();
        this.setState({ productId: productId });
        this.setState({ ussId: haptikEventDetails.extras.ussid });
        this.setState({ isProductInCart: false });
        let pincode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
        this.props.getProductPinCode(
          pincode,
          productId,
          haptikEventDetails.extras.ussid,
          false,
          false,
          true,
          true
        );
      }
      if (
        haptikEventDetails &&
        haptikEventDetails.event_name === GO_TO_CART_EVENT_HAPTIK_CHATBOT
      ) {
        this.props.history.push(PRODUCT_CART_ROUTER);
      }
    }
  }

  initiateHaptikChatbot = (
    pageType,
    currentCategoryName,
    searchCriteriaValue,
    productListingId,
    productName
  ) => {
    let haptikData = {
      page_type: pageType,
      mode: "widget",
      category: currentCategoryName ? currentCategoryName.toLowerCase() : ""
    };
    if (searchCriteriaValue) {
      haptikData.searchCriteria = searchCriteriaValue;
    }
    if (productListingId) {
      haptikData.productId = productListingId;
    }
    if (productName) {
      haptikData.productName = productName;
    }
    if (document.readyState === "complete" && window.initiateHaptikIVA) {
      window.initiateHaptikIVA(haptikData);
    } else {
      window.onload = function() {
        if (window.initiateHaptikIVA) {
          window.initiateHaptikIVA(haptikData);
        }
      };
    }
  };

  renderHaptikChatbot = data => {
    let currentCategoryName = "";
    if (
      data.chatbotDetailsData &&
      data.chatbotDetailsData.chatEnabled &&
      data.chatbotDetailsData.list
    ) {
      // for PLP
      let plpData = data.chatbotDetailsData.list.filter(value => {
        return value.pageType === "PLP";
      });
      if (plpData && data.productListings) {
        let plpProductDetails = data.productListings;
        let l2CategoryCode =
          plpProductDetails.facetdatacategory &&
          plpProductDetails.facetdatacategory.filters &&
          plpProductDetails.facetdatacategory.filters[0] &&
          plpProductDetails.facetdatacategory.filters[0].childFilters &&
          plpProductDetails.facetdatacategory.filters[0].childFilters[0] &&
          plpProductDetails.facetdatacategory.filters[0].childFilters[0]
            .categoryCode;

        let l3CategoryCode =
          plpProductDetails.facetdatacategory &&
          plpProductDetails.facetdatacategory.filters &&
          plpProductDetails.facetdatacategory.filters[0] &&
          plpProductDetails.facetdatacategory.filters[0].childFilters &&
          plpProductDetails.facetdatacategory.filters[0].childFilters[0] &&
          plpProductDetails.facetdatacategory.filters[0].childFilters[0]
            .childFilters &&
          plpProductDetails.facetdatacategory.filters[0].childFilters[0]
            .childFilters[0] &&
          plpProductDetails.facetdatacategory.filters[0].childFilters[0]
            .childFilters[0].categoryCode;

        let eligiblePLPData = plpData.find(value => {
          return (
            value.categoryCode === l2CategoryCode ||
            value.categoryCode === l3CategoryCode
          );
        });
        if (
          plpProductDetails.seo &&
          plpProductDetails.seo.breadcrumbs &&
          plpProductDetails.seo.breadcrumbs[0]
        ) {
          currentCategoryName = plpProductDetails.seo.breadcrumbs[0].name;
        } else if (plpProductDetails.seo && plpProductDetails.seo.tag) {
          currentCategoryName = plpProductDetails.seo.tag;
        } else if (
          this.props.history &&
          this.props.history.location &&
          this.props.history.location.pathname
        ) {
          let currentPathName = this.props.history.location.pathname;
          if (currentPathName.includes("/custom/")) {
            let path = currentPathName.split("/custom/");
            let requiredPath = path && path[1];
            currentCategoryName =
              requiredPath && requiredPath.replace(/-/g, " ");
          } else {
            let path = currentPathName.split("/");
            let requiredPath = path && path[1];
            currentCategoryName =
              requiredPath && requiredPath.replace(/-/g, " ");
          }
        }

        // filters data
        let searchCriteria = "";
        if (
          plpProductDetails &&
          eligiblePLPData &&
          typeof eligiblePLPData !== undefined
        ) {
          let airConditionerFilter = [
            "Brand",
            "Price",
            "Capacity",
            "Ratings Star",
            "Unique Thing"
          ];
          let washingMachineFilter = [
            "Brand",
            "Price",
            "Capacity",
            "Shop by family size",
            "Function"
          ];
          let refrigeratorFilter = [
            "Brand",
            "Price",
            "Capacity (Litre)",
            "Ratings Star",
            "Cooling Technology"
          ];
          let televisionFilter = [
            "Brand",
            "Price",
            "Screen Size",
            "Screen Resolution",
            "Unique Thing"
          ];
          let microwaveOvenFilter = [
            "Brand",
            "Price",
            "Capacity",
            "Unique Thing"
          ];

          let categoryFilter = "";
          if (eligiblePLPData.categoryName === "Air Conditioner") {
            categoryFilter = airConditionerFilter;
          } else if (eligiblePLPData.categoryName === "Washing Machine") {
            categoryFilter = washingMachineFilter;
          } else if (eligiblePLPData.categoryName === "Refrigerators") {
            categoryFilter = refrigeratorFilter;
          } else if (eligiblePLPData.categoryName === "TV") {
            categoryFilter = televisionFilter;
          } else if (eligiblePLPData.categoryName === "Microwave Oven") {
            categoryFilter = microwaveOvenFilter;
          }

          let filterValues = [];
          let filterValuesText = "";
          let brandAndFilterValuesText = "";

          categoryFilter &&
            plpProductDetails.facetdata.map(data => {
              let facetIndex = categoryFilter.indexOf(data.name);
              if (facetIndex !== -1 && data.selectedFilterCount > 0) {
                data.values.map(value => {
                  if (value.selected) {
                    filterValues.push(value.name);
                  }
                });
                filterValuesText =
                  categoryFilter[facetIndex] + " " + filterValues.join(" / ");
                brandAndFilterValuesText =
                  brandAndFilterValuesText + filterValuesText + ", ";
                filterValues = [];
              }
            });

          const currentCategoryNameInLowerCase =
            currentCategoryName && currentCategoryName.toLowerCase();
          if (brandAndFilterValuesText) {
            const categoryNameInLowerCase =
              eligiblePLPData.categoryName &&
              eligiblePLPData.categoryName.toLowerCase();
            if (currentCategoryNameInLowerCase !== categoryNameInLowerCase) {
              searchCriteria = `${brandAndFilterValuesText}${currentCategoryNameInLowerCase}`;
            } else {
              searchCriteria = brandAndFilterValuesText;
            }
          } else {
            searchCriteria = currentCategoryNameInLowerCase;
          }

          let isSearchPage = plpProductDetails.currentQuery.searchQuery;

          if (
            eligiblePLPData.showWidget &&
            currentCategoryName &&
            !isSearchPage &&
            !currentCategoryName.toLowerCase().includes("samsung") &&
            ((l2CategoryCode &&
              l2CategoryCode === eligiblePLPData.categoryCode) ||
              (l3CategoryCode &&
                l3CategoryCode === eligiblePLPData.categoryCode))
          ) {
            this.initiateHaptikChatbot(
              "PLP",
              eligiblePLPData.categoryName,
              searchCriteria,
              "",
              ""
            );
          }
          if (
            eligiblePLPData.showWidget &&
            currentCategoryName &&
            !isSearchPage &&
            currentCategoryName.toLowerCase().includes("samsung") &&
            eligiblePLPData.showOnSamsungPlpClpPdp &&
            ((l2CategoryCode &&
              l2CategoryCode === eligiblePLPData.categoryCode) ||
              (l3CategoryCode &&
                l3CategoryCode === eligiblePLPData.categoryCode))
          ) {
            this.initiateHaptikChatbot(
              "PLP",
              eligiblePLPData.categoryName,
              searchCriteria,
              "",
              ""
            );
          }
        }
      }

      // for CLP
      let clpData = data.chatbotDetailsData.list.filter(value => {
        return value.pageType === "CLP";
      });
      if (clpData && data.clpUrl) {
        let eligibleCLPData = clpData.find(value => {
          return value.categoryLandingPage === data.clpUrl;
        });
        if (
          eligibleCLPData &&
          typeof eligibleCLPData !== undefined &&
          eligibleCLPData.showWidget &&
          !data.clpUrl.includes("samsung") &&
          data.clpUrl === eligibleCLPData.categoryLandingPage
        ) {
          this.initiateHaptikChatbot(
            "CLP",
            eligibleCLPData.categoryName,
            "",
            "",
            ""
          );
        }
        if (
          eligibleCLPData &&
          typeof eligibleCLPData !== undefined &&
          eligibleCLPData.showWidget &&
          data.clpUrl.includes("samsung") &&
          eligibleCLPData.showOnSamsungPlpClpPdp &&
          data.clpUrl === eligibleCLPData.categoryLandingPage
        ) {
          this.initiateHaptikChatbot(
            "CLP",
            eligibleCLPData.categoryName,
            "",
            "",
            ""
          );
        }
      }

      // for PDP
      let pdpData = data.chatbotDetailsData.list.filter(value => {
        return value.pageType === "PDP";
      });
      if (pdpData && data.productDetails) {
        let categoryHierarchyCheck = data.productDetails.categoryHierarchy;
        let categoryIds =
          categoryHierarchyCheck &&
          categoryHierarchyCheck.map((category) => {
            return category["category_id"];
          });

        let eligiblePDPData =
          categoryIds &&
          pdpData.find(value => {
            return categoryIds.includes(value.categoryCode);
          });
        if (
          eligiblePDPData &&
          typeof eligiblePDPData !== undefined &&
          categoryIds
        ) {
          let categoryAvailable = categoryIds.includes(
            eligiblePDPData.categoryCode
          );

          if (
            eligiblePDPData.showWidget &&
            data.productDetails.brandName &&
            data.productDetails.brandName.toLowerCase() !== "samsung" &&
            categoryAvailable
          ) {
            this.initiateHaptikChatbot(
              "PDP",
              eligiblePDPData.categoryName,
              "",
              data.productDetails.productListingId,
              data.productDetails.productName
            );
          }
          if (
            eligiblePDPData.showWidget &&
            data.productDetails.brandName &&
            data.productDetails.brandName.toLowerCase() === "samsung" &&
            eligiblePDPData.showOnSamsungPlpClpPdp &&
            categoryAvailable
          ) {
            this.initiateHaptikChatbot(
              "PDP",
              eligiblePDPData.categoryName,
              "",
              data.productDetails.productListingId,
              data.productDetails.productName
            );
          }
        }
      }
    }
  };

  render() {
    return null;
  }
}

Chatbot.propTypes = {
  history: PropTypes.object,
  productListings:
    PropTypes.shape({
      currentQuery: PropTypes.object,
      facetdatacategory: PropTypes.objectOf(
        PropTypes.shape({
          filters: PropTypes.arrayOf(
            PropTypes.shape({
              childFilters: PropTypes.arrayOf(
                PropTypes.shape({
                  categoryCode: PropTypes.string,
                  childFilters: PropTypes.arrayOf(
                    PropTypes.shape({
                      categoryCode: PropTypes.string
                    })
                  )
                })
              )
            })
          )
        })
      ),
      seo: PropTypes.objectOf(
        PropTypes.shape({
          tag: PropTypes.string,
          breadcrumbs: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string
            })
          )
        })
      ),
      facetdata: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          selectedFilterCount: PropTypes.number,
          values: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string
            })
          )
        })
      )
    })
  ,
  clpUrl: PropTypes.string,
  productDetails: PropTypes.objectOf(
    PropTypes.shape({
      categoryHierarchy: PropTypes.array,
      brandName: PropTypes.string,
      productListingId: PropTypes.string,
      productName: PropTypes.string
    })
  ),
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
          categoryLandingPage: PropTypes.string
        })
      )
    })
  ),
  addToCartFromChatbot: PropTypes.bool,
  isServiceableToPincode: PropTypes.bool,
  checkPincodeFromHaptikChatbot: PropTypes.bool,
  checkPincodeDetailsLoading: PropTypes.bool,
  addProductToCart: PropTypes.func,
  displayToast: PropTypes.func,
  cartCountDetails: PropTypes.object,
  addToCartResponseDetails: PropTypes.object,
  addToCartResponseLoading: PropTypes.bool,
  getProductPinCode: PropTypes.func,
  cartCountDetailsLoading: PropTypes.bool
};
