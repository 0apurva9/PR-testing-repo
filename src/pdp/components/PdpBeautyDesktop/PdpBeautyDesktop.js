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
  SECTION_OF_IMAGE_AND_CONTENT_COMPONENTS
} from "./ComponentConstants";
import ImageGalleryContentComponent from "./ImageGalleryContentComponents/ImageGalleryContentComponent";
import BreadCrumbs from "./BreadCrumbsSection/BreadCrumbs";
import styles from "./PdpBeautyDesktop.css";
import IngredientsContainer from "./IngredientsSection/IngredientsContainer";

const SECTION_PRODUCT_GUIDE = [];
const SECTION_INGREDIENTS = [];
const SECTION_FROM_THE_BRAND = [];
const SECTION_HOW_TO_WEAR = [];
const SECTION_RATINGS_AND_REVIEWS = [RATING_REVIEW_DETAIL_COMPONENT];
const SECTION_ABOUT_THE_BRAND = [];
const SECTION_MORE_FROM_THIS_BRAND = [];
const SECTION_SIMILAR_PRODUCTS = [];

export default class PdpBeautyDesktop extends React.Component {
  componentDidMount = () => {
    this.props.getMasterTemplate();
    this.props.getPdpOffers();
  };

  render() {
    const masterTemplateDetails =
      this.props &&
      this.props.masterTemplateResponse &&
      this.props.masterTemplateResponse.value &&
      this.props.masterTemplateResponse.value.componentList;
    const sortedMasterTempLateDetails =
      masterTemplateDetails &&
      masterTemplateDetails.sort((comp1, comp2) => {
        const pos1 = parseInt(comp1.componentPosition);
        const pos2 = parseInt(comp2.componentPosition);
        if (pos1 && pos2 && pos1 < pos2) {
          return -1;
        }

        if (pos1 && pos2 && pos1 > pos2) {
          return 1;
        }

        return 0;
      });

    if (sortedMasterTempLateDetails && sortedMasterTempLateDetails.length > 0) {
      let sectionOfImageAndContentComponent = [];
      sortedMasterTempLateDetails &&
        sortedMasterTempLateDetails.map(componentDetails => {
          return SECTION_OF_IMAGE_AND_CONTENT_COMPONENTS.find(componentName => {
            console.log(componentName);
            if (componentDetails.componentId === componentName) {
              sectionOfImageAndContentComponent.push(componentDetails);
            }
          });
        });

      const productDetails = this.props.productDetails;
      const ingredientDetails = productDetails.ingredientDetails
        ? productDetails.ingredientDetails
        : [];
      const sortedIngredientDetails =
        ingredientDetails &&
        ingredientDetails.length > 0 &&
        ingredientDetails.sort((comp1, comp2) => {
          const pos1 = parseInt(comp1.order);
          const pos2 = parseInt(comp2.order);
          if (pos1 && pos2 && pos1 < pos2) {
            return -1;
          }

          if (pos1 && pos2 && pos1 > pos2) {
            return 1;
          }

          return 0;
        });

      const allIngredients = this.props.productDetails.otherIngredients
        ? this.props.productDetails.otherIngredients
        : [];
      const notIngredients = this.props.productDetails.ingredientsNotContained
        ? this.props.productDetails.ingredientsNotContained
        : [];

      const ingredientData = {
        sortedIngredient: sortedIngredientDetails,
        allIngredients: allIngredients,
        notIngredients: notIngredients
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
            />
          </div>
          <div className={styles.container}>
            <IngredientsContainer
              heading={"INGREDIENTS"}
              ingredientData={ingredientData}
              compDetails={sectionOfImageAndContentComponent}
              {...this.props}
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
