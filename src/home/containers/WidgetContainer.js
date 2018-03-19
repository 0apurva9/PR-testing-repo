import { connect } from "react-redux";
import { getComponentData, getItems } from "../actions/home.actions";
import { withRouter } from "react-router-dom";
import Widget from "../components/Widget";
const mapDispatchToProps = dispatch => {
  return {
    getComponentData: (fetchUrl, positionInFeed, postParams, backUpUrl) => {
      dispatch(
        getComponentData(positionInFeed, fetchUrl, postParams, backUpUrl)
      );
    },
    getItems: (positionInFeed, itemIds) => {
      dispatch(getItems(positionInFeed, itemIds));
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  const positionInFeed = ownProps.positionInFeed;
  const feedComponentData = state.home.homeFeed[ownProps.positionInFeed];
  return {
    feedComponentData: feedComponentData,
    positionInFeed,
    loading: feedComponentData.loading
  };
};

const WidgetContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Widget)
);

export default WidgetContainer;
