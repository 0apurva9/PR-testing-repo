import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HeaderWrapper from "../components/HeaderWrapper";
import { setHeaderText } from "../header.actions.js";
import { showFilter, hideFilter } from "../../plp/actions/plp.actions.js";
import { showModal, DESKTOP_AUTH } from "../../general/modal.actions.js";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import { getHeaderDetails } from "../../clp/actions/clp.actions";
const mapDispatchToProps = dispatch => {
  return {
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    showFilter: () => {
      dispatch(showFilter());
    },
    hideFilter: () => {
      dispatch(hideFilter());
    },
    showAuthPopUp: () => {
      dispatch(showModal(DESKTOP_AUTH));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    },
    getHeaderDetails: () => {
      dispatch(getHeaderDetails());
    }
  };
};
const mapStateToProps = state => {
  return {
    headerText: state.header.text,
    isPlpFilterOpen: state.productListings.isFilterOpen,
    bagCount: state.header.bagCount,
    orderConfirmationDetails: state.cart.orderConfirmationDetails,
    cliqCashJusPayDetails: state.cart.cliqCashJusPayDetails,
    getHeaderData: state.categoryDefault.getHeaderDetails
  };
};

const HeaderContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper)
);
export default HeaderContainer;
