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
    onClick: () => {
      dispatch(hideModal());
    },
    setIfSortHasBeenClicked: () => {
      dispatch(setIfSortHasBeenClicked());
    }
  };
};

const mapStateToProps = state => {
  return {
    sort:
      state.productListings && state.productListings.productListings
        ? state.productListings.productListings.sorts
        : null,
    query:
      state.productListings &&
      state.productListings.productListings &&
      state.productListings.productListings.currentQuery &&
      state.productListings.productListings.currentQuery.query
        ? state.productListings.productListings.currentQuery.query.value
        : null
  };
};

const SortDesktopContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SortDesktop)
);

export default SortDesktopContainer;
