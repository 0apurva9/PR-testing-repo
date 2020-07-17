import React from "react";
import PropTypes from "prop-types";
import {
  ADD_TO_BAG_TEXT,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  SUCCESS,
  ADD_TO_CART_EVENT_HAPTIK_CHATBOT
} from "../../lib/constants.js";
const env = process.env;
export default class Chatbot extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      ussId: ""
    };
    this.addToCartFromHaptikChatbot = this.addToCartFromHaptikChatbot.bind(
      this
    );
  }
  componentDidMount() {
    var f = document.getElementsByTagName("SCRIPT")[0];
    var p = document.createElement("SCRIPT");
    var date = new Date();
    var timestamp = date.getTime();
    var source_url =
      env.REACT_APP_HAPTIK_CHATBOT_URL +
      "/static/aspectwise/js/haptik.js?" +
      timestamp;
    p.type = "text/javascript";
    p.setAttribute("charset", "utf-8");
    p.setAttribute("clientid", "tatacliq");
    p.async = true;
    p.id = "buzzosrc";
    p.src = source_url;
    if (!document.getElementById("buzzosrc")) {
      f.parentNode.insertBefore(p, f);
    }
    //get chatbot json details
    if (this.props.getChatbotDetails) {
      this.props.getChatbotDetails();
    }
    if (this.props.addToCartFromChatbot) {
      window.addEventListener("haptik_event", this.addToCartFromHaptikChatbot);
    }
  }

  componentWillReceiveProps(nextProps) {
    // check pincode success
    if (
      nextProps.isServiceableToPincode &&
      this.props.isServiceableToPincode !== nextProps.isServiceableToPincode
    ) {
      if (
        !nextProps.pincodeError &&
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
        if (nextProps.pincodeError) {
          this.props.displayToast(nextProps.pincodeError);
        } else if (nextProps.isServiceableToPincode.productOutOfStockMessage) {
          this.props.displayToast(
            nextProps.isServiceableToPincode.productOutOfStockMessage
          );
        } else if (
          nextProps.isServiceableToPincode.productNotServiceableMessage
        ) {
          this.props.displayToast(
            nextProps.isServiceableToPincode.productNotServiceableMessage
          );
        }
      }
    }
  }

  componentWillUpdate(nextProps) {
    // show toast on add to cart success
    if (
      nextProps.addToCartResponseDetails &&
      nextProps.addToCartResponseDetails.status &&
      nextProps.addToCartResponseDetails.status.toLowerCase() === SUCCESS
    ) {
      this.props.displayToast(ADD_TO_BAG_TEXT);
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
        // check pincode serviceablity
        let productId = haptikEventDetails.product_id.toUpperCase();
        this.setState({ productId: productId });
        this.setState({ ussId: haptikEventDetails.extras.ussid });
        let pincode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
        this.props.getProductPinCode(
          pincode,
          productId,
          haptikEventDetails.extras.ussid,
          false,
          false,
          true
        );
      }
    }
  }

  initiateHaptikChatbot = (
    pageType,
    currentCategoryName,
    searchCriteriaValue,
    productListingId,
    productName,
    timeOut
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
      haptikData.productListingId = productListingId;
    }
    if (productName) {
      haptikData.productName = productName;
    }
    if (document.readyState === "complete" && window.initiateHaptikIVA) {
      if (timeOut) {
        let milliSeconds = timeOut * 1000;
        setTimeout(() => {
          window.initiateHaptikIVA(haptikData);
        }, milliSeconds);
      } else {
        window.initiateHaptikIVA(haptikData);
      }
    } else {
      window.onload = function() {
        if (window.initiateHaptikIVA) {
          if (timeOut) {
            let milliSeconds = timeOut * 1000;
            setTimeout(() => {
              window.initiateHaptikIVA(haptikData);
            }, milliSeconds);
          } else {
            window.initiateHaptikIVA(haptikData);
          }
        }
      };
    }
  };

  render() {
    let currentCategoryName = "";
    if (
      this.props.chatbotDetailsData &&
      this.props.chatbotDetailsData.chatEnabled &&
      this.props.chatbotDetailsData.list
    ) {
      // for PLP
      let plpData = this.props.chatbotDetailsData.list.filter(value => {
        return value.pageType === "PLP";
      });
      if (plpData && this.props.productListings) {
        let plpProductDetails = this.props.productListings;
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

        if (plpProductDetails.seo && plpProductDetails.seo.tag) {
          currentCategoryName = plpProductDetails.seo.tag;
        } else if (
          plpProductDetails.seo &&
          plpProductDetails.seo.breadcrumbs &&
          plpProductDetails.seo.breadcrumbs[0]
        ) {
          currentCategoryName = plpProductDetails.seo.breadcrumbs[0].name;
        }

        // filters data
        let searchCriteria = "";
        if (plpProductDetails) {
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
          searchCriteria =
            brandAndFilterValuesText +
            "Current Category " +
            currentCategoryName;
        }

        if (
          currentCategoryName &&
          !currentCategoryName.toLowerCase().includes("samsung") &&
          eligiblePLPData.showWidget &&
          ((l2CategoryCode &&
            l2CategoryCode === eligiblePLPData.categoryCode) ||
            (l3CategoryCode && l3CategoryCode === eligiblePLPData.categoryCode))
        ) {
          this.initiateHaptikChatbot(
            "PLP",
            eligiblePLPData.categoryName,
            searchCriteria,
            "",
            "",
            eligiblePLPData.enableAfterSeconds
              ? eligiblePLPData.enableAfterSeconds
              : null
          );
        }
      }

      // for CLP
      let clpData = this.props.chatbotDetailsData.list.filter(value => {
        return value.pageType === "CLP";
      });
      if (clpData && this.props.clpUrl) {
        let eligibleCLPData = clpData.find(value => {
          return value.categoryLandingPage === this.props.clpUrl;
        });
        if (
          !this.props.clpUrl.includes("samsung") &&
          eligibleCLPData.showWidget &&
          this.props.clpUrl === eligibleCLPData.categoryLandingPage
        ) {
          this.initiateHaptikChatbot(
            "CLP",
            eligibleCLPData.categoryName,
            "",
            "",
            "",
            eligibleCLPData.enableAfterSeconds
              ? eligibleCLPData.enableAfterSeconds
              : null
          );
        }
      }

      // for PDP
      let pdpData = this.props.chatbotDetailsData.list.filter(value => {
        return value.pageType === "PDP";
      });
      if (pdpData && this.props.productDetails) {
        let categoryHierarchyCheck = this.props.productDetails
          .categoryHierarchy;
        let categoryIds =
          categoryHierarchyCheck &&
          categoryHierarchyCheck.map((category, index) => {
            return category["category_id"];
          });

        let eligiblePDPData = pdpData.find(value => {
          return categoryIds.includes(value.categoryCode);
        });
        let categoryAvailable = categoryIds.includes(
          eligiblePDPData.categoryCode
        );
        if (
          this.props.productDetails.brandName &&
          this.props.productDetails.brandName.toLowerCase() !== "samsung" &&
          eligiblePDPData.showWidget &&
          categoryAvailable
        ) {
          this.initiateHaptikChatbot(
            "PDP",
            eligiblePDPData.categoryName,
            "",
            this.props.productDetails.productListingId,
            this.props.productDetails.productName,
            eligiblePDPData.enableAfterSeconds
              ? eligiblePDPData.enableAfterSeconds
              : null
          );
        }
      }
    }

    return null;
  }
}

Chatbot.propTypes = {
  productListings: PropTypes.object,
  clpUrl: PropTypes.string,
  productDetails: PropTypes.object,
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
          categoryLandingPage: PropTypes.string
        })
      )
    })
  )
};
