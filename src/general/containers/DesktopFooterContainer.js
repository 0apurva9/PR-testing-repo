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
  return {
    DesktopFooterDetails: state.desktopFooter.DesktopFooterDetails
  };
};
const DesktopFooterContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DesktopFooter)
);
export default DesktopFooterContainer;
