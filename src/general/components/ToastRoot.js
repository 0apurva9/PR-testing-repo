import React from "react";
import ReactDOM from "react-dom";
import Toast from "./Toast";
import RatingSubmitSuccessToast from "../../account/components/RatingSubmitSuccessToast";
const toastRoot = document.getElementById("toast-root");

export default class ToastRoot extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    toastRoot.appendChild(this.el);
  }

  render() {
    if (this.props.toastDisplayed) {
      if (this.props.message === "RATING_SUBMIT_SUCCESS_TOAST") {
        const toast = <RatingSubmitSuccessToast />;
        return ReactDOM.createPortal(toast, this.el);
      } else {
        const toast = <Toast data={this.props.message} />;
        return ReactDOM.createPortal(toast, this.el);
      }
    } else {
      return null;
    }
  }
}
