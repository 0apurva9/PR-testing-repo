import React from "react";
import Loadable from "react-loadable";
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
  DETAILS_COMPONENT,
  SECTION_OF_PRODUCT_DETAILS
} from "../ComponentConstants";
import styles from "./ImageGalleryContentComponent.css";
import SecondaryLoader from "../../../../general/components/SecondaryLoader";

const Loader = () => {
  return (
    <div>
      <SecondaryLoader />
    </div>
  );
};

const GalleryImagesComponent = Loadable({
  loader: () => import("./GalleryImagesComponent/GalleryImagesComponent"),
  loading() {
    return <Loader />;
  }
});

const ProductDetailsSection = Loadable({
  loader: () => import("./ProductDetailsSection/ProductDetailsSection"),
  loading() {
    return <Loader />;
  }
});

export default class ImageGalleryContentComponent extends React.Component {
  render() {
    const galleryCompDetails =
      this.props.compDetails &&
      this.props.compDetails.filter(
        compItem => compItem.componentId === IMAGE_GALLERY_COMPONENT
      );
    let productCompDetails = [];
    this.props.compDetails &&
      this.props.compDetails.map(componentDetails => {
        return SECTION_OF_PRODUCT_DETAILS.find(componentName => {
          if (componentDetails.componentId === componentName) {
            productCompDetails.push(componentDetails);
          }
        });
      });
    return (
      <div className={styles["gallery-content-container"]}>
        <div className={styles["gallery-container"]}>
          <GalleryImagesComponent
            {...this.props}
            galleryCompDetails={galleryCompDetails}
          />
        </div>
        <div className={styles["product-details-container"]}>
          <ProductDetailsSection
            {...this.props}
            productCompDetails={productCompDetails}
          />
        </div>
      </div>
    );
  }
}

ImageGalleryContentComponent.propTypes = {
  compDetails: PropTypes.arrayOf(
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
};
