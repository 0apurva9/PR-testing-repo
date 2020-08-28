import { connect } from "react-redux";
import {
  getComponentData,
  getItems,
  msdDiscoverMoreHomeComponents,
  msdAbcComponents
} from "../actions/home.actions";
import { withRouter } from "react-router-dom";
import Widget from "../components/Widget";
import { showModal, STORY_MODAL } from "../../general/modal.actions";
import { SECONDARY_FEED_TYPE } from "../../lib/constants";
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
    homeAbcMsdData: state.feed.homeAbcMsdData
  };
};

const WidgetContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Widget)
);

export default WidgetContainer;
