import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Plp from "../components/Plp";
import { showModal, SORT } from "../../general/modal.actions.js";
import { setHeaderText } from "../../general/header.actions";
import {
  showFilter,
  hideFilter,
  setIfFilterHasBeenClicked
} from "../../plp/actions/plp.actions.js";
import { displayToast } from "../../general/toast.actions";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showSort: () => {
      dispatch(showModal(SORT));
    },
    displayToast: text => {
      dispatch(displayToast(text));
    },
    paginate: (pageNumber, suffix) => {
      ownProps.paginate(pageNumber, suffix);
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    showFilter: () => {
      dispatch(showFilter());
    },
    hideFilter: () => {
      dispatch(hideFilter());
    },
    setIfFilterHasBeenClicked: () => {
      dispatch(setIfFilterHasBeenClicked());
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  let isFilterOpen = state.productListings.isFilterOpen;
  if (ownProps.isFilter === true) {
    isFilterOpen = true;
  }

  console.log("PRODUCT LISTINGS");
  console.log(state.productListings.productListings);

  return {
    onFilterClick: ownProps.onFilterClick,
    isFilterOpen,
    filterHasBeenClicked: state.productListings.filterHasBeenClicked,
    sortHasBeenClicked: state.productListings.sortHasBeenClicked,
    productListings: state.productListings.productListings,
    pageNumber: state.productListings.pageNumber,
    loading: state.productListings.loading,
    searchresult: state.productListings.searchresult
  };
};

const PlpContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Plp)
);
export default PlpContainer;
