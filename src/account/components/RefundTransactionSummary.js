import React from "react";
import { Redirect } from "react-router-dom";
import OrderCard from "./OrderCard";
import Button from "../../general/components/Button";
import styles from "./RefundTransactionSummary.css";
import success from "./img/success.svg";
import Icon from "../../xelpmoc-core/Icon";
import {
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_REASON,
  HOME_ROUTER,
  MY_ACCOUNT,
  ORDER,
  ORDER_CODE
} from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_REFUNDSUMMARY_ORDERDETAILS_BUTTON_CLICKED,
  ADOBE_REFUNDSUMMARY_CONTINUESHOPPING_BUTTON_CLICKED,
  ADOBE_REFUNDSUMMARY_PAGE_LANDED
} from "../../lib/adobeUtils";
import DigitalBundledProduct from "../../cart/components/DigitalBundledProduct";
export default class RefundTransactionSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: ""
    };
  }
  async componentDidMount() {
    //to get refund details initially
    if (this.props.orderDetails && this.props.orderDetails.products[0]) {
      setDataLayer(ADOBE_REFUNDSUMMARY_PAGE_LANDED);
      let productData = this.props.orderDetails.products[0];
      let orderId = productData.sellerorderno;
      let transactionId = productData.transactionId;
      let returnId = this.props.getRefundModesDetails.returnId;
      let data = await this.props.getRefundTransactionSummary(
        orderId,
        transactionId,
        returnId
      );
      if (data && data.status === "success") {
        this.setState({ summary: data });
      }
      if (data && data.status === "error") {
        this.props.displayToast(data.error);
      }
    }
    localStorage.removeItem("secondaryLabel");
    localStorage.removeItem("secondaryCode");
    localStorage.removeItem("primaryLabel");
    localStorage.removeItem("primaryCode");
    localStorage.removeItem("comment");
    localStorage.removeItem("cliqCashCheckSuccess");
  }
  gotoOrderDetailsPage() {
    setDataLayer(ADOBE_REFUNDSUMMARY_ORDERDETAILS_BUTTON_CLICKED);
    //get order id
    let orderRefId = sessionStorage.getItem("returnOrderId");
    let transactionId = sessionStorage.getItem("returnTransactionId");
    this.props.history.push(
      `${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${orderRefId}&transactionId=${transactionId}`
    );
    // this.props.history.push({
    // 	pathname: `/my-account/order/?orderCode=${orderRefId}&transactionId=${transactionId}`,
    // });
  }
  goToHomepage() {
    setDataLayer(ADOBE_REFUNDSUMMARY_CONTINUESHOPPING_BUTTON_CLICKED);
    this.props.history.push(HOME_ROUTER);
  }
  navigateToReturnLanding() {
    return (
      <Redirect
        to={`${RETURNS_PREFIX}/${this.orderCode}${RETURN_LANDING}${RETURNS_REASON}`}
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
    return (
      <div className={styles.base}>
        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.iconHolder}>
              <Icon image={success} size={150} />
            </div>
            <div className={styles.summaryTitle}>
              Your request for a return has been placed successfully.
            </div>
            <div className={styles.buttonHolder}>
              <Button
                width={190}
                type="secondary"
                label="VIEW ORDER DETAILS"
                onClick={() => this.gotoOrderDetailsPage()}
              />
              <span className={styles.marginRightSpan} />
              <Button
                width={190}
                type="primary"
                label="CONTINUE SHOPPING"
                onClick={() => this.goToHomepage()}
              />
            </div>
          </div>
        </div>

        <div className={styles.contentSummary}>
          <div className={styles.cardSummary}>
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
            {summaryDetails && summaryDetails.getRefundTransactionDetails && (
              <OrderCard
                imageUrl={
                  summaryDetails.getRefundTransactionDetails.products &&
                  summaryDetails.getRefundTransactionDetails.products[0]
                    .imageURL
                }
                imageHolderWidth="98px"
                imageHolderHeight="130px"
                productName={
                  summaryDetails.getRefundTransactionDetails.products &&
                  summaryDetails.getRefundTransactionDetails.products[0]
                    .productName
                }
                pickupAddress={
                  summaryDetails.getRefundTransactionDetails.deliveryAddress
                }
                returnStoreAddress={
                  summaryDetails.getRefundTransactionDetails.returnStoreAddress
                }
                productSize={
                  summaryDetails.getRefundTransactionDetails.products &&
                  summaryDetails.getRefundTransactionDetails.products[0]
                    .productSize
                }
                productColourName={
                  summaryDetails.getRefundTransactionDetails.products &&
                  summaryDetails.getRefundTransactionDetails.products[0]
                    .productColour
                }
                returnModeSelected={
                  this.props &&
                  this.props.history &&
                  this.props.history.location &&
                  this.props.history.location.state &&
                  this.props.history.location.state.returnMode
                }
              >
                {/* {summaryDetails.getRefundTransactionDetails.products[0]
                    .productSize && (
                    <span className={styles.productSizeColor}>
                      {
                        summaryDetails.getRefundTransactionDetails.products[0]
                          .productSize
                      }{" "}
                      |&nbsp;
                    </span>
                  )}
                  {summaryDetails.getRefundTransactionDetails.products[0]
                    .productColour && (
                    <span className={styles.productSizeColor}>
                      {
                        summaryDetails.getRefundTransactionDetails.products[0]
                          .productColour
                      }
                    </span>
                  )} */}
              </OrderCard>
            )}
            <div
              className={styles.trackOrderButton}
              onClick={() => this.gotoOrderDetailsPage()}
            >
              Track Order
            </div>
            {summaryDetails &&
              summaryDetails.getRefundTransactionDetails &&
              summaryDetails.getRefundTransactionDetails.products &&
              summaryDetails.getRefundTransactionDetails.products[0] &&
              summaryDetails.getRefundTransactionDetails.products[0]
                .exchangeDetails &&
              summaryDetails.getRefundTransactionDetails.products[0]
                .exchangeDetails.exchangeCancelMessage && (
                <div className={styles.exchangeDetailsWithReturn}>
                  <div className={styles.cancelExchangeMessage}>
                    {
                      summaryDetails.getRefundTransactionDetails.products[0]
                        .exchangeDetails.exchangeCancelMessage
                    }
                  </div>
                </div>
              )}
            {summaryDetails &&
              summaryDetails.getRefundTransactionDetails &&
              summaryDetails.getRefundTransactionDetails
                .bundledAssociatedItems && (
                <React.Fragment>
                  <div className={styles.bundledProductCancelSectionTitle}>
                    Attached Product will also be returned
                  </div>
                  {summaryDetails.getRefundTransactionDetails.bundledAssociatedItems.map(
                    (bundledProduct, index) => {
                      return (
                        <DigitalBundledProduct
                          key={index}
                          digitalProduct={bundledProduct}
                          pageType={"RETURN"}
                          showRemoveButton={false}
                        />
                      );
                    }
                  )}
                </React.Fragment>
              )}
          </div>
        </div>
      </div>
    );
  }
}
