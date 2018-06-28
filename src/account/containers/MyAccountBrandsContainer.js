import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MyAccountBrands from "../components/MyAccountBrands";
import {
  getFollowedBrands,
  followAndUnFollowBrand
} from "../actions/account.actions";
import { SUCCESS, MY_ACCOUNT_FOLLOW_AND_UN_FOLLOW } from "../../lib/constants";
import { setHeaderText } from "../../general/header.actions";
import { showModal, DESKTOP_AUTH } from "../../general/modal.actions.js";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
const mapDispatchToProps = dispatch => {
  return {
    getFollowedBrands: () => {
      dispatch(getFollowedBrands(true)); // true is passing for set data layer on my account page
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    followAndUnFollowBrand: (brandId, followStatus) => {
      dispatch(
        followAndUnFollowBrand(
          brandId,
          followStatus,
          MY_ACCOUNT_FOLLOW_AND_UN_FOLLOW
        )
      );
    },
    showAuthPopUp: () => {
      dispatch(showModal(DESKTOP_AUTH));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    }
  };
};
const mapStateToProps = state => {
  return {
    followedBrands: state.profile.followedBrands,
    loading: state.profile.loadingForFollowedBrands
  };
};
const MyAccountBrandsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyAccountBrands)
);
export default MyAccountBrandsContainer;
