import { connect } from "react-redux";
import CliqandPiqModal from "../components/CliqandPiqModal.js";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  };
};

const CliqAndPiqModalContainer = withRouter(
  connect(mapStateToProps)(CliqandPiqModal)
);

export default CliqAndPiqModalContainer;
