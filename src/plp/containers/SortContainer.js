import { connect } from "react-redux";
import { hideModal } from "../../general/modal.actions";
import { setIfSortHasBeenClicked } from "../actions/plp.actions";
import Sort from "../components/Sort";
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
    sortList: state.productListings.productListings
      ? state.productListings.productListings.sorts
      : null
  };
};

const SortContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sort)
);

export default SortContainer;
