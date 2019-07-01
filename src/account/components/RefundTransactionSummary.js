import React from "react";
import { Redirect } from "react-router-dom";
import OrderCard from "./OrderCard";
import ReturnsFrame from "./ReturnsFrame";
import Button from "../../general/components/Button";
import styles from "./RefundTransactionSummary.css";
import success from "./img/success.svg";
import Icon from "../../xelpmoc-core/Icon";
import {
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_REASON,
  HOME_ROUTER
} from "../../lib/constants";

export default class RefundTransactionSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: ""
    };
  }

  async componentDidMount() {
    console.log(this.props);
    //to get refund details initially
    if (this.props.data) {
      let orderId = this.props.data.sellerorderno;
      let transactionId = this.props.data.transactionId;
      let returnId = this.props.getRefundModesDetails.returnId;
      let data = await this.props.getRefundTransactionSummary(
        orderId,
        transactionId,
        returnId
      );
      console.log(data);
      if (data && data.status === "success") {
        this.setState({ summary: data });
      }
      if (data && data.status === "error") {
        this.props.displayToast(data.error);
      }
    }
  }

  gotoOrderDetailsPage() {
    //get order id
    let orderRefId = sessionStorage.getItem("returnOrderId");
    this.props.history.push({
      pathname: `/my-account/order/?orderCode=${orderRefId}`
    });
  }

  goToHomepage() {
    this.props.history.push(HOME_ROUTER);
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
    let summaryDetails = this.state.summary;
    console.log(summaryDetails);
    return (
      <ReturnsFrame>
        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.iconHolder}>
              <Icon image={success} size={88} />
            </div>
            <div className={styles.summaryTitle}>
              Your request for a refund has been placed successfully.
            </div>
            <div className={styles.buttonHolder}>
              <Button
                width={190}
                type="primary"
                label="CONTINUE SHOPPING"
                onClick={() => this.goToHomepage()}
              />
            </div>
            <div className={styles.buttonHolder}>
              <Button
                width={190}
                type="secondary"
                label="VIEW ORDER DETAILS"
                onClick={() => this.gotoOrderDetailsPage()}
              />
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.summaryHeading}>
              Your Transaction Summary:
            </div>
            {summaryDetails &&
              summaryDetails.getRefundTransactionDetails
                .transctnSummaryCallout && (
                <div className={styles.summaryText}>
                  {
                    summaryDetails.getRefundTransactionDetails
                      .transctnSummaryCallout
                  }
                </div>
              )}

            <div className={styles.summarySmallHeading}>You are Returning:</div>
            {summaryDetails &&
              summaryDetails.getRefundTransactionDetails && (
                <OrderCard
                  imageUrl={
                    summaryDetails.getRefundTransactionDetails.products[0]
                      .imageURL
                  }
                  imageHolderWidth="50px"
                  productName={
                    summaryDetails.getRefundTransactionDetails.products[0]
                      .productName
                  }
                  pickupAddress={
                    summaryDetails.getRefundTransactionDetails.deliveryAddress
                  }
                />
              )}
            <div
              className={styles.trackOrderButton}
              onClick={() => this.gotoOrderDetailsPage()}
            >
              Track Order
            </div>
          </div>
        </div>
      </ReturnsFrame>
    );
  }
}
