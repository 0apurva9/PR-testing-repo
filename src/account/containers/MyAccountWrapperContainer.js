import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MyAccountWrapper from "../components/MyAccountWrapper.js";
import { getUserAddress } from "../../cart/actions/cart.actions";
const mapDispatchToProps = dispatch => {
  return {
    getUserAddress: () => {
      dispatch(getUserAddress(true));
    }
  };
};

const mapStateToProps = state => {
  return {
    userAddress: state.profile.userAddress
  };
};

const MyAccountWrapperContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyAccountWrapper)
);
export default MyAccountWrapperContainer;
