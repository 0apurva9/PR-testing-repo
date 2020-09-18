import React from "react";
import PropTypes from "prop-types";

import {
  IMAGE_GALLERY_COMPONENT,
  PRODUCT_AND_BRAND_COMPONENT,
  RATING_REVIEW_COMPONENT,
  PRICE_COMPONENT,
  SIZE_COMPONENT,
  OFFERS_COMPONENT,
  SHIPPING_DETAIL_COMPONENT,
  COLOR_COMPONENT,
  GUARANTEE_COMPONENT,
  FREEBIE_COMPONENT,
  RATING_REVIEW_DETAIL_COMPONENT,
  DETAILS_COMPONENT,
  SECTION_OF_ALL_BEAUTY_COMPONENTS
} from "./ComponentConstants";
import ImageGalleryContentComponent from "./ImageGalleryContentComponents/ImageGalleryContentComponent";
import BreadCrumbs from "./BreadCrumbsSection/BreadCrumbs";
import styles from "./PdpBeautyDesktop.css";
import DescriptionContainer from "./DescriptionSection/DescriptionContainer";
import { sortArrayOfObjectByIntegerKeyValue } from "../../../pdp/reducers/utils";

const SECTION_PRODUCT_GUIDE = [];
const SECTION_INGREDIENTS = [];
const SECTION_FROM_THE_BRAND = [];
const SECTION_HOW_TO_WEAR = [];
const SECTION_RATINGS_AND_REVIEWS = [RATING_REVIEW_DETAIL_COMPONENT];
const SECTION_ABOUT_THE_BRAND = [];
const SECTION_MORE_FROM_THIS_BRAND = [];
const SECTION_SIMILAR_PRODUCTS = [];

export default class PdpBeautyDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.detailsRef = React.createRef();
  }

  handleDetailsScroll = () => {
    if (this.detailsRef.current) {
      let headerOffset = 45,
        elementPosition = this.detailsRef.current.getBoundingClientRect().top,
        offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  componentDidMount = () => {
    const categoryHierarchy = this.props.productDetails.categoryHierarchy
      ? this.props.productDetails.categoryHierarchy
      : [];
    let categoryId;
    if (categoryHierarchy.length > 0) {
      categoryId = categoryHierarchy[categoryHierarchy.length - 1].category_id;
    }
    if (categoryId) {
      this.props.getHowToWear(categoryId);
    }
    let productId = this.props.productDetails
      ? this.props.productDetails.productListingId
      : null;
    if (productId) {
      this.props.getMoreFromBrand(productId);
    }
    this.props.getMasterTemplate();
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

      return (
        <div className={styles["main-container"]}>
          <div className={styles.container}>
            <BreadCrumbs {...this.props} />
          </div>
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
