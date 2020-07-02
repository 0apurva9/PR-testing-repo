import React from "react";
import PropTypes from "prop-types";
const env = process.env;
export default class Chatbot extends React.PureComponent {
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
    f.parentNode.insertBefore(p, f);
  }

  initiateHaptikChatbot = (
    currentCategoryName,
    searchCriteriaValue,
    productListingId,
    productName
  ) => {
    let haptikData = {
      mode: "widget",
      category: currentCategoryName
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
    // console.log(haptikData)
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

  render() {
    let eligibleCategoriesForChatbot = [
      "MSH1230",
      "MSH1214103",
      "MSH1214100",
      "MSH1216",
      "MSH1229100"
    ];
    let currentCategoryName = "";
    // for PLP
    if (this.props.productListings) {
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

      if (plpProductDetails.seo && plpProductDetails.seo.tag) {
        currentCategoryName = plpProductDetails.seo.tag;
      } else if (
        plpProductDetails.seo &&
        plpProductDetails.seo.breadcrumbs &&
        plpProductDetails.seo.breadcrumbs[0]
      ) {
        currentCategoryName = plpProductDetails.seo.breadcrumbs[0].name;
      }

      if (
        currentCategoryName &&
        !currentCategoryName.toLowerCase().includes("samsung") &&
        ((l2CategoryCode &&
          eligibleCategoriesForChatbot.includes(l2CategoryCode)) ||
          (l3CategoryCode &&
            eligibleCategoriesForChatbot.includes(l3CategoryCode)))
      ) {
        this.initiateHaptikChatbot(
          currentCategoryName,
          plpProductDetails.currentQuery.searchQuery,
          "",
          ""
        );
      }
    }
    // for CLP
    if (this.props.clpUrl) {
      // currently only below 2 CLPs are available
      if (this.props.clpUrl === "air-conditioner-store") {
        currentCategoryName = "Air Conditioner";
      }
      if (this.props.clpUrl === "refrigerator-store") {
        currentCategoryName = "Refrigerators";
      }
      if (
        currentCategoryName &&
        !this.props.clpUrl.includes("samsung") &&
        (this.props.clpUrl === "air-conditioner-store" ||
          this.props.clpUrl === "refrigerator-store")
      ) {
        this.initiateHaptikChatbot(currentCategoryName, "", "", "");
      }
    }
    // for PDP
    if (this.props.productDetails) {
      let categoryHierarchyCheck = this.props.productDetails.categoryHierarchy;
      currentCategoryName =
        categoryHierarchyCheck &&
        categoryHierarchyCheck[categoryHierarchyCheck.length - 1].category_name;

      let categoryIds =
        categoryHierarchyCheck &&
        categoryHierarchyCheck.map((category, index) => {
          return category["category_id"];
        });

      let categoryAvailable = categoryIds.some(
        catId => eligibleCategoriesForChatbot.indexOf(catId) !== -1
      );

      if (
        currentCategoryName &&
        this.props.productDetails.brandName &&
        this.props.productDetails.brandName.toLowerCase() !== "samsung" &&
        categoryAvailable
      ) {
        this.initiateHaptikChatbot(
          currentCategoryName,
          "",
          this.props.productDetails.productListingId,
          this.props.productDetails.productName
        );
      }
    }
    return null;
  }
}

Chatbot.propTypes = {
  productListings: PropTypes.object,
  clpUrl: PropTypes.string,
  productDetails: PropTypes.object
};
