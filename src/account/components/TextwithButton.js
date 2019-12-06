import React from "react";
import styles from "./TextwithButton.css";

import PropTypes from "prop-types";
import AnchorButton from "../../general/components/AnchorButton";
import {
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_ORDERS_PAGE
} from "../../lib/constants.js";

export default class TextWithButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borderColor: "#d2d2d2",
      borderBottom: "1px solid #d2d2d2"
    };
  }
  onClick() {
    let url = window.location.href;
    var customerId = url
      .split("customerId=")
      .pop()
      .split("/")[0];

    let transId = url
      .split("transactionId=")
      .pop()
      .split("&")[0];
    if (this.props.buttonLabel === "Edit FeedBack") {
      this.props.history.push({
        pathname: `/store/transactionId=${transId}&customerId=${customerId}/seller-reviewed`
      });
    } else {
      this.props.history.push({
        pathname: `/store/transactionId=${transId}&customerId=${customerId}/seller-review`
      });
    }
  }

  onFocusInput(event) {
    if (event.target.value.length === 0) {
      this.setState({ borderColor: "red", borderBottom: "1px solid red" });
    } else {
      this.setState({
        borderColor: "#d2d2d2",
        borderBottom: "1px solid #d2d2d2"
      });
    }
    if (this.props.onFocusInput) {
      this.props.onFocusInput();
    }
  }

  onBlur(x) {
    this.setState({
      borderColor: "#d2d2d2",
      borderBottom: "1px solid #d2d2d2"
    });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }
  render() {
    return (
      <div className={styles.noOffset}>
        <div className={styles.headingText}>{this.props.heading}</div>
        <React.Fragment>
          <div className={styles.button}>
            <AnchorButton label={this.props.buttonLabel} />
          </div>
          <div
            className={styles.defaultClickArea}
            onClick={() => this.onClick()}
          />
        </React.Fragment>
      </div>
    );
  }
}
TextWithButton.propTypes = {
  onClick: PropTypes.func,
  buttonLabel: PropTypes.string,
  heading: PropTypes.string
};
