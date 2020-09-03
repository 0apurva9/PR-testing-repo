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
  DETAILS_COMPONENT
} from "../ComponentConstants";
import styles from "./ImageGalleryContentComponent.css";

const SECTION_OF_PRODUCT_DETAILS = [
  PRODUCT_AND_BRAND_COMPONENT,
  RATING_REVIEW_COMPONENT,
  PRICE_COMPONENT,
  SIZE_COMPONENT,
  OFFERS_COMPONENT,
  SHIPPING_DETAIL_COMPONENT,
  COLOR_COMPONENT,
  GUARANTEE_COMPONENT,
  FREEBIE_COMPONENT,
  DETAILS_COMPONENT
];

const GalleryImagesComponent = Loadable({
  loader: () => import("./GalleryImagesComponent/GalleryImagesComponent"),
  loading() {
    return <div />;
  }
});

const ProductDetailsSection = Loadable({
  loader: () => import("./ProductDetailsSection/ProductDetailsSection"),
  loading() {
    return <div />;
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
      <div className={styles.gallerycontentcontainer}>
        <div className={styles.galleryContainer}>
          <GalleryImagesComponent
            {...this.props}
            galleryCompDetails={galleryCompDetails}
          />
        </div>
        <div className={styles.productDetailsContainer}>
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
