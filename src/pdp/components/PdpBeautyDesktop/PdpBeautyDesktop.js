import React from "react";
import PropTypes from "prop-types";

import {
  IMAGE_GALLERY_COMPONENT,
  SECTION_OF_ALL_BEAUTY_COMPONENTS
} from "./ComponentConstants";
import ImageGalleryContentComponent from "./ImageGalleryContentComponents/ImageGalleryContentComponent";
import BreadCrumbs from "./BreadCrumbsSection/BreadCrumbs";
import styles from "./PdpBeautyDesktop.css";
import DescriptionContainer from "./DescriptionSection/DescriptionContainer";
import { sortArrayOfObjectByIntegerKeyValue } from "../../../pdp/reducers/utils";
import { setTracker, VIEW_PRODUCT } from "../../../lib/onlinesalesUtils";
import { setDataLayer, ADOBE_VIRTUAL_PAGELOAD } from "../../../lib/adobeUtils";
import { renderMetaTags } from "../../../lib/seoUtils";
// import smoothscroll from "smoothscroll-polyfill";
// smoothscroll.polyfill();

export default class PdpBeautyDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.detailsRef = React.createRef();
    this.ratingReviewsRef = React.createRef();
  }

  handleDetailsScroll = sectionToScroll => {
    if (sectionToScroll && sectionToScroll === "ratingsLong") {
      if (this.ratingReviewsRef.current) {
        let offset = 35;
        window.scrollTo({
          behavior: "smooth",
          top:
            document.getElementById("rating-parent").getBoundingClientRect()
              .top -
            document.body.getBoundingClientRect().top -
            offset
        });
      }
    }
    if (sectionToScroll && sectionToScroll === "detailsLong") {
      if (this.detailsRef.current) {
        let offset = 35;
        window.scrollTo({
          behavior: "smooth",
          top:
            document.getElementById("details-parent").getBoundingClientRect()
              .top -
            document.body.getBoundingClientRect().top -
            offset
        });
      }
    }
  };

  componentDidMount = () => {
    setDataLayer(ADOBE_VIRTUAL_PAGELOAD);
    const categoryHierarchy = this.props.productDetails.categoryHierarchy
      ? this.props.productDetails.categoryHierarchy
      : [];
    let categoryId, masterCategoryId;
    if (categoryHierarchy.length > 0) {
      categoryId = categoryHierarchy[categoryHierarchy.length - 1].category_id;
    }
    if (categoryId) {
      this.props.getHowToWear(categoryId);
    }
    setTracker(VIEW_PRODUCT, this.props.productDetails);
    let productId = this.props.productDetails
      ? this.props.productDetails.productListingId
      : null;
    if (productId) {
      this.props.getMoreFromBrand(productId);
      this.props.getSimilarProduct(productId);
    }
    const brandId = this.props.productDetails.brandURL
      .split("-")
      .slice(-1)[0]
      .toUpperCase();
    if (brandId) {
      this.props.getAboutTheBrand(brandId);
    }

    if (categoryHierarchy.length > 0) {
      masterCategoryId = categoryHierarchy[2].category_id;
    }
    if (masterCategoryId) {
      this.props.getMasterTemplate(masterCategoryId);
    }
    this.props.getManufacturerDetails();
    this.props.getPdpOffers();
  };

  render() {
    const masterTemplateDetails =
      this.props &&
      this.props.masterTemplateResponse &&
      this.props.masterTemplateResponse.value &&
      this.props.masterTemplateResponse.value.componentList;
    let sortedMasterTempLateDetails = [];
    sortedMasterTempLateDetails =
      masterTemplateDetails &&
      masterTemplateDetails.length > 0 &&
      sortArrayOfObjectByIntegerKeyValue(
        masterTemplateDetails,
        "componentPosition"
      );

    if (sortedMasterTempLateDetails && sortedMasterTempLateDetails.length > 0) {
      let sectionOfImageAndContentComponent = [];
      sortedMasterTempLateDetails &&
        sortedMasterTempLateDetails.map(componentDetails => {
          return SECTION_OF_ALL_BEAUTY_COMPONENTS.find(componentName => {
            if (componentDetails.componentId === componentName) {
              sectionOfImageAndContentComponent.push(componentDetails);
            }
          });
        });

      const productDetails = this.props.productDetails;
      const ingredientDetails = productDetails.ingredientDetails
        ? productDetails.ingredientDetails
        : [];
      const sortedIngredient =
        ingredientDetails &&
        ingredientDetails.length > 0 &&
        sortArrayOfObjectByIntegerKeyValue(ingredientDetails, "order");

      const allIngredients = this.props.productDetails.otherIngredients
        ? this.props.productDetails.otherIngredients
        : [];
      const notIngredients = this.props.productDetails.ingredientsNotContained
        ? this.props.productDetails.ingredientsNotContained
        : [];

      const ingredientData = {
        sortedIngredient,
        allIngredients,
        notIngredients
      };

      const imageGalleryTemplateData =
        sectionOfImageAndContentComponent &&
        sectionOfImageAndContentComponent.filter(
          el => el.componentId === IMAGE_GALLERY_COMPONENT
        );
      const showBreadCrumbs =
        imageGalleryTemplateData[0] &&
        imageGalleryTemplateData[0].componentProperties &&
        imageGalleryTemplateData[0].componentProperties.breadcrumbs;

      return (
        <div className={styles["main-container"]}>
          {showBreadCrumbs && showBreadCrumbs === true && (
            <div className={styles.container}>
              <BreadCrumbs {...this.props} />
            </div>
          )}
          {renderMetaTags(this.props.productDetails)}
          <div className={styles.container}>
            <ImageGalleryContentComponent
              {...this.props}
              compDetails={sectionOfImageAndContentComponent}
              handleDetailsScroll={this.handleDetailsScroll}
            />
          </div>
          <div className={styles.container}>
            <DescriptionContainer
              ingredientData={ingredientData}
              compDetails={sectionOfImageAndContentComponent}
              {...this.props}
              detailsLongRef={this.detailsRef}
              ratingReviewsRef={this.ratingReviewsRef}
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

PdpBeautyDesktop.propTypes = {
  masterTemplateResponse: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.shape({
      templateName: PropTypes.string,
      templateCode: PropTypes.string,
      templateIds: PropTypes.string,
      componentList: PropTypes.arrayOf(
        PropTypes.shape({
          componentId: PropTypes.string,
          componentPosition: PropTypes.string,
          componentProperties: PropTypes.shape({
            shareButton: PropTypes.bool,
            componentScrollingPosition: PropTypes.string,
            componentSliderDotsPosition: PropTypes.string,
            tagPosition: PropTypes.string
          })
        })
      )
    })
  })
};
