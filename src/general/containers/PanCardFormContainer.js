import { connect } from "react-redux";
import { getPanCardDetails, submitPancardDetails } from "../panCard.action.js";
import { withRouter } from "react-router-dom";
import PanCardForm from "../components/PanCardForm.js";
import { setHeaderText } from "../header.actions";
import { displayToast } from "../toast.actions";
const mapDispatchToProps = dispatch => {
  return {
    getPanCardDetails: getUserDetails => {
      dispatch(getPanCardDetails(getUserDetails));
    },
    submitPancardDetails: (
      orderNumber,
      Customer_name,
      Pancard_number,
      file
    ) => {
      return dispatch(
        submitPancardDetails(orderNumber, Customer_name, Pancard_number, file)
      );
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    displayToast: message => {
      dispatch(displayToast(message));
    }
  };
};
const mapStateToProps = state => {
  return {
    panCardDetails: state.pancard.panCardDetails,
    submitPancardDetails: state.pancard.submitPandcardDetails
  };
};
const PanCardFormContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PanCardForm)
);
export default PanCardFormContainer;
