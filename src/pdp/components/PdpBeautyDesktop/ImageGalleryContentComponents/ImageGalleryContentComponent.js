import React from "react";
import Loadable from "react-loadable";
import PropTypes from "prop-types";

import {
  IMAGE_GALLERY_COMPONENT,
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

const ProductBadgesComponent = Loadable({
  loader: () => import("./ProductDetailsSection/ProductBadgesComponent"),
  loading() {
    return <Loader />;
  }
});

export default class ImageGalleryContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setZindex: false
    };
  }

  handleDetailsScroll = sectionToScroll => {
    if (this.props.handleDetailsScroll) {
      this.props.handleDetailsScroll(sectionToScroll);
    }
  };

  handleScrollToTop = (delayValue, scrollBehavior) => {
    if (this.props.scrollToTop) {
      this.props.scrollToTop(delayValue, scrollBehavior);
    }
  };

  setZindex() {
    this.setState({ setZindex: true });
  }

  resetZindex = () => {
    this.setState({ setZindex: false });
  };

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
          <ProductBadgesComponent {...this.props} />
          <GalleryImagesComponent
            {...this.props}
            galleryCompDetails={galleryCompDetails}
            setZindex={() => this.setZindex()}
            resetZindex={() => this.resetZindex()}
          />
        </div>
        <div
          className={
            this.state.setZindex
              ? [
                  styles["product-details-container"],
                  styles["set-zindex"]
                ].join(" ")
              : styles["product-details-container"]
          }
        >
          <ProductDetailsSection
            {...this.props}
            handleDetailsScroll={this.handleDetailsScroll}
            productCompDetails={productCompDetails}
            handleScrollToTop={(delayValue, scrollBehavior) =>
              this.handleScrollToTop(delayValue, scrollBehavior)
            }
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
  ),
  handleDetailsScroll: PropTypes.func
};
