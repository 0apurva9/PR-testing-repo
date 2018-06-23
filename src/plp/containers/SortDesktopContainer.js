import { connect } from "react-redux";
import { hideModal } from "../../general/modal.actions";
import { setIfSortHasBeenClicked } from "../actions/plp.actions";
import SortDesktop from "../components/SortDesktop";
import { withRouter } from "react-router-dom";

const mapDispatchToProps = dispatch => {
  return {
    onCloseSort: () => {
      dispatch(hideModal());
    },
    onClick: sortBy => {
      dispatch(hideModal());
    },
    setIfSortHasBeenClicked: () => {
      dispatch(setIfSortHasBeenClicked());
    }
  };
};

const mapStateToProps = state => {
  return {
    sort: state.productListings.productListings
      ? state.productListings.productListings.sorts
      : null
  };
};

const SortDesktopContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SortDesktop)
);

export default SortDesktopContainer;
