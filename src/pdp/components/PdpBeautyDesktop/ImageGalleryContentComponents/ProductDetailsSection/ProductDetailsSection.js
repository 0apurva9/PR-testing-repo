import React from "react";
import Loadable from "react-loadable";
import PropTypes from "prop-types";
import {
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
} from "../../ComponentConstants";
import styles from "./ProductDetailsSection.css";
import { renderComponent } from "../../../../../pdp/reducers/utils";

const SECTION_OF_PRODUCT_DETAILS = [
  PRODUCT_AND_BRAND_COMPONENT,
  RATING_REVIEW_COMPONENT,
  PRICE_COMPONENT,
  SIZE_COMPONENT,
  OFFERS_COMPONENT,
  SHIPPING_DETAIL_COMPONENT,
  COLOR_COMPONENT, //??
  GUARANTEE_COMPONENT,
  FREEBIE_COMPONENT,
  DETAILS_COMPONENT
];

const ProductAndBrandComponent = Loadable({
  loader: () => import("./ProductAndBrandComponent"),
  loading() {
    return <div />;
  }
});

const PriceComponent = Loadable({
  loader: () => import("./PriceComponent"),
  loading() {
    return <div />;
  }
});

const RatingsAndReviewsComponent = Loadable({
  loader: () => import("./RatingsAndReviewsComponent"),
  loading() {
    return <div />;
  }
});

const DetailsComponent = Loadable({
  loader: () => import("./DetailsComponent"),
  loading() {
    return <div />;
  }
});

const typeComponentMapping = {
  [PRODUCT_AND_BRAND_COMPONENT]: props => (
    <ProductAndBrandComponent {...props} />
  ),
  [PRICE_COMPONENT]: props => <PriceComponent {...props} />,
  [RATING_REVIEW_COMPONENT]: props => <RatingsAndReviewsComponent {...props} />,
  [DETAILS_COMPONENT]: props => <DetailsComponent {...props} />
};

export default class ProductsDetailsSection extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.productCompDetails &&
          this.props.productCompDetails.map(componentDetails =>
            renderComponent(componentDetails, typeComponentMapping, this.props)
          )}
      </React.Fragment>
    );
  }
}

ProductsDetailsSection.propTypes = {
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
