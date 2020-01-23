import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getDesktopFooter } from "../desktopFooter.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions";
import DesktopFooter from "../components/DesktopFooter";
const mapDispatchToProps = dispatch => {
  return {
    getDesktopFooter: pathName => {
      dispatch(getDesktopFooter(pathName));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    }
  };
};
const mapStateToProps = state => {
  console.log("insidecontainer.this.props", state);
  return {
    DesktopFooterDetails: state.desktopFooter.DesktopFooterDetails,
    productListings: state.productListings.productListings,
    footer: state.feed.seo
  };
};
const DesktopFooterContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DesktopFooter)
);
export default DesktopFooterContainer;
