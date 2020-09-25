import { connect } from "react-redux";
import {
  getComponentData,
  getItems,
  msdDiscoverMoreHomeComponents,
  msdAbcComponents,
  autoWishlistComponent,
  automatedWidgetsForHome,
  getTargetMboxData
} from "../actions/home.actions";
import { withRouter } from "react-router-dom";
import Widget from "../components/Widget";
import { showModal, STORY_MODAL } from "../../general/modal.actions";
import { followAndUnFollowBrand } from "../../account/actions/account.actions";
import {
  SECONDARY_FEED_TYPE,
  MY_ACCOUNT_FOLLOW_AND_UN_FOLLOW
} from "../../lib/constants";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getComponentData: (
      fetchUrl,
      positionInFeed,
      postParams,
      backUpUrl,
      type,
      feedType,
      msdABPCBrandCount
    ) => {
      dispatch(
        getComponentData(
          positionInFeed,
          fetchUrl,
          postParams,
          backUpUrl,
          type,
          feedType,
          msdABPCBrandCount
        )
      );
    },
    msdDiscoverMoreHomeComponents: () => {
      dispatch(msdDiscoverMoreHomeComponents());
    },
    msdAbcComponents: () => {
      dispatch(msdAbcComponents());
    },
    getItems: (positionInFeed, itemIds) => {
      dispatch(getItems(positionInFeed, itemIds, ownProps.feedType));
    },
    showStory: (position, data) => {
      dispatch(showModal(STORY_MODAL, position, data));
    },
    autoWishlistComponent: productId => {
      dispatch(autoWishlistComponent(productId));
    },
    automatedWidgetsForHome: widgetData => {
      dispatch(automatedWidgetsForHome(widgetData));
    },
    getTargetMboxData: async (componentName, pageType, sequence) => {
      return dispatch(getTargetMboxData(componentName, pageType, sequence));
    },
    followAndUnFollowBrand: (brandId, followStatus) => {
      dispatch(
        followAndUnFollowBrand(
          brandId,
          followStatus,
          MY_ACCOUNT_FOLLOW_AND_UN_FOLLOW
        )
      );
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  const positionInFeed = ownProps.positionInFeed;

  let feedComponentData = state.feed.homeFeed[ownProps.positionInFeed];
  if (ownProps.feedType === SECONDARY_FEED_TYPE) {
    feedComponentData = state.feed.secondaryFeed[ownProps.positionInFeed];
  }
  return {
    feedComponentData: feedComponentData,
    positionInFeed,
    loading: feedComponentData.loading,
    loadMsdSkeleton: state.feed.loadMsdSkeleton,
    homeMsdData: state.feed.homeMsdData,
    homeAbcMsdData: state.feed.homeAbcMsdData,
    autoWishList: state.feed.autoWishList,
    homeAutoWidget: state.feed.homeAutoWidget,
    automatedWidgetData: state.feed.automatedWidgetData,
    targetMboxData: state.feed.targetMboxData
  };
};

const WidgetContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Widget)
);

export default WidgetContainer;
