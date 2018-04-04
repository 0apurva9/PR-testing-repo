import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserSavedCard from "../components/UserSavedCard.js";
import { setHeaderText } from "../../general/header.actions";
import {
  getSavedCardDetails,
  removeSavedCardDetails
} from "../actions/account.actions";

const mapDispatchToProps = dispatch => {
  return {
    getSavedCardDetails: (userId, customerAccessToken) => {
      dispatch(getSavedCardDetails(userId, customerAccessToken));
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    removeSavedCardDetails: () => {
      dispatch(removeSavedCardDetails());
    }
  };
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

const SavedCardContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserSavedCard)
);

export default SavedCardContainer;
