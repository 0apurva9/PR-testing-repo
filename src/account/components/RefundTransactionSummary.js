import React from "react";
import { Redirect } from "react-router-dom";
import OrderCard from "./OrderCard";
import ReturnsFrame from "./ReturnsFrame";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import styles from "./ReplaceRefundSelection.css";
import instantIcon from "./img/instant.svg";
import Icon from "../../xelpmoc-core/Icon";
import {
  QUICK_DROP,
  SCHEDULED_PICKUP,
  SELF_COURIER,
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_REASON
} from "../../lib/constants";

export default class RefundTransactionSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRefundOptions: false
    };
  }

  componentDidMount() {
    //to get refund details initially
    let orderId = this.props.data.sellerorderno;

    // this.props.getRefundTransactionSummary(
    //   orderId
    // );
  }

  navigateToReturnLanding() {
    return (
      <Redirect
        to={`${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_LANDING}${RETURNS_REASON}`}
      />
    );
  }

  render() {
    // Preventing user to open this page direct by hitting URL
    if (
      !this.props.location.state ||
      !this.props.location.state.authorizedRequest
    ) {
      return this.navigateToReturnLanding();
    }

    return (
      <ReturnsFrame>
        <div className={styles.content}>
          <div className={styles.card}>summary page</div>
        </div>
      </ReturnsFrame>
    );
  }
}
