import { connect } from "react-redux";
import { withRouter } from "react-router";
import CustomInstructionComponent from "../components/CustomInstructionComponent";
import { getCustomInstruction } from "../actions/cart.actions";

const mapDispatchToProps = dispatch => {
  return {
    getCustomInstruction: () => {
      dispatch(getCustomInstruction());
    }
  };
};

const mapStateToProps = state => {
  return {
    customComponent: state.cart.customComponent
  };
};
const CustomInstructionContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomInstructionComponent)
);

export default CustomInstructionContainer;
