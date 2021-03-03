import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getFeed } from "../../home/actions/home.actions";
import PlpBrandCategoryWrapper from "../components/PlpBrandCategoryWrapper";

const mapDispatchToProps = dispatch => {
  return {
    getFeed: brandIdOrCategoryId => {
      dispatch(getFeed(brandIdOrCategoryId));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    homeFeedData: state.feed
  };
};

const PlpBrandCategoryWrapperContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlpBrandCategoryWrapper)
);

export default PlpBrandCategoryWrapperContainer;
