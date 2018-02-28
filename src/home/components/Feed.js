import React, { Component } from "react";
import PropTypes from "prop-types";
import WidgetContainer from "../containers/WidgetContainer";
import AutomatedBrandProductCarousel from "./AutomatedBrandProductCarousel.js";
import BannerProductCarousel from "./BannerProductCarousel.js";
import VideoProductCarousel from "./VideoProductCarousel.js";
import RecommendationWidget from "./RecommendationWidget.js";
import HeroBanner from "./HeroBanner.js";
import FollowBase from "./FollowBase.js";
import ConnectWidget from "./ConnectWidget";
import BannerSeparator from "../../general/components/BannerSeparator.js";
import SingleQuestionContainer from "../containers/SingleQuestionContainer.js";
import DiscoverMoreCarousel from "./DiscoverMoreCarousel.js";
import ProductCapsules from "./ProductCapsules.js";
import FollowingBrands from "./FollowingBrands";
import FlashSale from "./FlashSale";
import OfferWidget from "./OfferWidget.js";
import DiscoverMore500 from "./DiscoverMore500.js";
import ThemeOffer from "./ThemeOffer.js";
import ThemeProductWidget from "./ThemeProductWidget.js";
import MultiSelectQuestionContainer from "../containers/MultiSelectQuestionContainer.js";
import DiscoverMore from "./DiscoverMore.js";
import styles from "./Feed.css";
import MDSpinner from "react-md-spinner";
import { MERGE_CART_ID_SUCCESS } from "../../cart/actions/cart.actions";
import { PRODUCT_DELIVERY_ADDRESSES } from "../../lib/constants";
export const PRODUCT_RECOMMENDATION_TYPE = "productRecommendationWidget";

const typeKeyMapping = {
  "Hero Banner Component": "heroBannerComponent"
};

const typeComponentMapping = {
  "Hero Banner Component": props => <HeroBanner {...props} />,
  "Theme Offers Component": props => <ThemeOffer {...props} />,
  "Auto Product Recommendation Component": props => (
    <RecommendationWidget {...props} />
  ),
  "Banner Product Carousel Component": props => (
    <BannerProductCarousel {...props} />
  ),
  "Video Product Carousel Component": props => (
    <VideoProductCarousel {...props} />
  ),
  // automatedBrandProductCarousel: props => (
  //   <AutomatedBrandProductCarousel {...props} />
  // ),
  "Flash Sales Component": props => <FlashSale {...props} />,
  "Offers Component": props => <OfferWidget {...props} />,
  "Multipurpose Banner Component": props => <ConnectWidget {...props} />,
  "Multi Click Component": props => <ThemeProductWidget {...props} />,
  // multiSelectQuestion: props => <MultiSelectQuestionContainer {...props} />, // not there
  "Auto Fresh From Brands Component": props => <FollowBase {...props} />,
  // singleSelectQuestion: props => <SingleQuestionContainer {...props} />, // not there
  "Banner Separator Component": props => <BannerSeparator {...props} />,
  // productCapsules: props => <ProductCapsules {...props} />, // Not ready
  "Auto Discover More Component": props => <DiscoverMore {...props} />
};

class Feed extends Component {
  constructor(props) {
    super(props);
    this.hasSeenThemeProductOrAutomatedBrandCarousel = true;
  }

  renderFeedComponent(feedDatum, i) {
    return (
      typeComponentMapping[feedDatum.type] && (
        <WidgetContainer
          positionInFeed={i}
          key={i}
          type={typeKeyMapping[feedDatum.type]}
          postData={feedDatum.postParams}
        >
          {typeComponentMapping[feedDatum.type] &&
            typeComponentMapping[feedDatum.type]}
        </WidgetContainer>
      )
    );
  }

  renderFeedComponents() {
    return this.props.homeFeedData.map((feedDatum, i) => {
      return this.renderFeedComponent(feedDatum, i);
    });
  }

  renderLoader() {
    return (
      <div className={styles.loadingIndicator}>
        <MDSpinner />
      </div>
    );
  }

  componentWillMount() {
    this.props.homeFeed();
    this.props.getCartId();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type === MERGE_CART_ID_SUCCESS) {
      this.props.history.push(PRODUCT_DELIVERY_ADDRESSES);
    }
  }
  render() {
    if (this.props.loading) {
      return this.renderLoader();
    }
    return (
      <div className={styles.base}>
        <div className={styles.center}>{this.renderFeedComponents()}</div>
      </div>
    );
  }
}

Feed.propTypes = {
  onSubmit: PropTypes.func,
  onForgotPassword: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  emailValue: PropTypes.string,
  passwordValue: PropTypes.string,
  loading: PropTypes.bool
};

Feed.defaultProps = {
  loading: false
};

export default Feed;
