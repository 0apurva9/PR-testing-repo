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
  DETAILS_COMPONENT,
  BUYNOW_ADDTOBAG_COMPONENT,
  CERTIFIED_COMPONENT
} from "../../ComponentConstants";
import styles from "./ProductDetailsSection.css";
import { renderComponent } from "../../../../../pdp/reducers/utils";
import SecondaryLoader from "../../../../../general/components/SecondaryLoader";

const Loader = () => {
  return (
    <div>
      <SecondaryLoader />
    </div>
  );
};

const ProductAndBrandComponent = Loadable({
  loader: () => import("./ProductAndBrandComponent"),
  loading() {
    return <Loader />;
  }
});

const RatingsAndReviewsComponent = Loadable({
  loader: () => import("./RatingsAndReviewsComponent"),
  loading() {
    return <Loader />;
  }
});

const PriceComponent = Loadable({
  loader: () => import("./PriceComponent"),
  loading() {
    return <Loader />;
  }
});

const DetailsComponent = Loadable({
  loader: () => import("./DetailsComponent"),
  loading() {
    return <Loader />;
  }
});

const SizeComponent = Loadable({
  loader: () => import("./SizeComponent"),
  loading() {
    return <Loader />;
  }
});

const OffersComponent = Loadable({
  loader: () => import("./OffersComponent"),
  loading() {
    return <Loader />;
  }
});

const BuyNowAddToBagComponent = Loadable({
  loader: () => import("./BuyNowAddToBagComponent"),
  loading() {
    return <Loader />;
  }
});

const ShippingDetailsComponent = Loadable({
  loader: () => import("./ShippingDetailsComponent"),
  loading() {
    return <Loader />;
  }
});

const CertifiedComponent = Loadable({
  loader: () => import("./CertifiedComponent"),
  loading() {
    return <Loader />;
  }
});

import(
  /* webpackChunkName: "ColorComponent" */ "./color-component.component.jsx"
);
const ColorComponent = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ColorComponent" */ "./color-component.component.jsx"
    ),
  loading() {
    return <Loader />;
  }
});

const typeComponentMapping = {
  [PRODUCT_AND_BRAND_COMPONENT]: props => (
    <ProductAndBrandComponent {...props} />
  ),
  [RATING_REVIEW_COMPONENT]: props => <RatingsAndReviewsComponent {...props} />,
  [PRICE_COMPONENT]: props => <PriceComponent {...props} />,
  [DETAILS_COMPONENT]: props => <DetailsComponent {...props} />,
  [SIZE_COMPONENT]: props => <SizeComponent {...props} />,
  [OFFERS_COMPONENT]: props => <OffersComponent {...props} />,
  [BUYNOW_ADDTOBAG_COMPONENT]: props => <BuyNowAddToBagComponent {...props} />,
  [SHIPPING_DETAIL_COMPONENT]: props => <ShippingDetailsComponent {...props} />,
  [CERTIFIED_COMPONENT]: props => <CertifiedComponent {...props} />,
  [COLOR_COMPONENT]: props => <ColorComponent {...props} />
};

export default class ProductsDetailsSection extends React.Component {
  handleDetailsScroll = sectionToScroll => {
    if (this.props.handleDetailsScroll) {
      this.props.handleDetailsScroll(sectionToScroll);
    }
  };

  handleScrollToTop = () => {
    if (this.props.scrollToTop) {
      this.props.scrollToTop();
    }
  };

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
