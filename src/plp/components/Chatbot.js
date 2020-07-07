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
    if (!document.getElementById("buzzosrc")) {
      f.parentNode.insertBefore(p, f);
    }
    //get chatbot json details
    if (this.props.getChatbotDetails) {
      this.props.getChatbotDetails();
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
    let data = this.props.chatbotDetailsData;
    if (data && data.chatEnabled && data.list) {
      // for PLP
      let plpData = data.list.find(value => {
        return value.pageType === "PLP";
      });
      if (plpData && plpData.showWidget && this.props.productListings) {
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

        // filters data
        let filtersData = [];
        if (plpProductDetails) {
          if (plpProductDetails.currentQuery.searchQuery) {
            // in case of search
            filtersData.push(plpProductDetails.currentQuery.searchQuery);
          } else {
            // in case of plp
            filtersData.push(currentCategoryName);
          }
        }
        let searchCriteriaValue = filtersData && filtersData.join();

        if (
          currentCategoryName &&
          !currentCategoryName.toLowerCase().includes("samsung") &&
          ((l2CategoryCode && l2CategoryCode === plpData.categoryCode) ||
            (l3CategoryCode && l3CategoryCode === plpData.categoryCode))
        ) {
          this.initiateHaptikChatbot(
            "PLP",
            plpData.categoryName,
            searchCriteriaValue,
            "",
            "",
            plpData.enableAfterSeconds ? plpData.enableAfterSeconds : null
          );
        }
      }

      // for CLP
      let clpData = data.list.find(value => {
        return value.pageType === "CLP";
      });
      if (clpData && clpData.showWidget && this.props.clpUrl) {
        if (
          !this.props.clpUrl.includes("samsung") &&
          this.props.clpUrl === clpData.categoryLandingPage
        ) {
          this.initiateHaptikChatbot(
            "CLP",
            clpData.categoryName,
            "",
            "",
            "",
            clpData.enableAfterSeconds ? clpData.enableAfterSeconds : null
          );
        }
      }

      // for PDP
      let pdpData = data.list.find(value => {
        return value.pageType === "PDP";
      });
      if (pdpData && pdpData.showWidget && this.props.productDetails) {
        let categoryHierarchyCheck = this.props.productDetails
          .categoryHierarchy;
        let categoryIds =
          categoryHierarchyCheck &&
          categoryHierarchyCheck.map((category, index) => {
            return category["category_id"];
          });
        let categoryAvailable = categoryIds.includes(pdpData.categoryCode);
        if (
          this.props.productDetails.brandName &&
          this.props.productDetails.brandName.toLowerCase() !== "samsung" &&
          categoryAvailable
        ) {
          this.initiateHaptikChatbot(
            "PDP",
            pdpData.categoryName,
            "",
            this.props.productDetails.productListingId,
            this.props.productDetails.productName,
            pdpData.enableAfterSeconds ? pdpData.enableAfterSeconds : null
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
  chatbotDetailsData: PropTypes.object
};
