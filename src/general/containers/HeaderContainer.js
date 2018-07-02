import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HeaderWrapper from "../components/HeaderWrapper";
import { setHeaderText } from "../header.actions.js";
import { showFilter, hideFilter } from "../../plp/actions/plp.actions.js";
import { showModal, DESKTOP_AUTH } from "../../general/modal.actions.js";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
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
    }
  };
};
const mapStateToProps = state => {
  return {
    headerText: state.header.text,
    isPlpFilterOpen: state.productListings.isFilterOpen,
    bagCount: state.header.bagCount,
    orderConfirmationDetails: state.cart.orderConfirmationDetails,
    cliqCashJusPayDetails: state.cart.cliqCashJusPayDetails
  };
};

const HeaderContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper)
);
export default HeaderContainer;
