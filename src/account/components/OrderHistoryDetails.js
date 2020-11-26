import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductImage from "../../general/components/ProductImage";
import Styles from "./OrderHistoryList.css";
import moment from "moment";
const CREATION_DATE_FORMAT = "DD MMM, hh:mm";
const STATUS_DATE_FORMAT = "DD MMM, YYYY";
export default class OrderHistoryDetails extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }
  render() {
    const { selectedTickerHistory } = this.props;
    return (
      <div className={Styles.orderInfo}>
        <div className={Styles.fontLight}>
          {" "}
          Ticket ID :{" "}
          <span className={Styles.fontBold}>
            {" "}
            {selectedTickerHistory.ticketId}{" "}
          </span>
        </div>
        <div className={Styles.fontLight}>
          {" "}
          Created on :{" "}
          <span className={Styles.fontBold}>
            {selectedTickerHistory.creationDate &&
              moment(
                selectedTickerHistory.creationDate,
                "DD-MM-YYYY hh:mm:ss"
              ).format(`ddd ${CREATION_DATE_FORMAT}`)}
          </span>
        </div>
        <div className={Styles.orderInfoDetails}>
          <div className={Styles.orderImg}>
            {selectedTickerHistory.issueBucket ? (
              <div className={Styles.nonOrderIcon}>
                <div
                  style={{
                    background: `url(${require(`./img/${selectedTickerHistory.issueBucket
                      .split(" ")[0]
                      .toLowerCase()}_ticket.svg`)})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    width: "50px",
                    height: "50px"
                  }}
                />
              </div>
            ) : (
              <ProductImage image={selectedTickerHistory.productImage} />
            )}
          </div>
          <div className={Styles.orderDetails}>
            <div className={Styles.productName}>
              {selectedTickerHistory.issueType}
            </div>
          </div>
        </div>
        <div className={Styles.statusDisplay}>
          <div className={Styles.fontLight}>
            {" "}
            Status :{" "}
            <span className={Styles.fontBold}>
              {" "}
              {selectedTickerHistory.ticketStatus}
            </span>
          </div>
          <div className={Styles.fontLight}>
            {" "}
            Estimated Resolution :{" "}
            <span className={Styles.fontBold}>
              {selectedTickerHistory.resolutionDate &&
                moment(
                  selectedTickerHistory.resolutionDate.split(" ")[0],
                  "DD-MM-YYYY"
                ).format(STATUS_DATE_FORMAT)}
            </span>{" "}
            <span
              className={
                selectedTickerHistory.slaBreach === "true"
                  ? Styles.delayedStatusText
                  : Styles.statusText
              }
            >
              {` (${
                selectedTickerHistory.slaBreach === "true"
                  ? "Delayed"
                  : "On time"
              })`}
            </span>
          </div>
          <div className={Styles.note}>
            <span className={Styles.fontBold}> Note: </span> It seems that your
            issue is taking more than usual time to get resolved. Please report
            the issue or ignore if resolved.
          </div>
        </div>
        {selectedTickerHistory.customerComment && (
          <div className={Styles.communication}>
            <div className={Styles.communicationHeading}>
              Communication details
            </div>
            <div className={Styles.customerCetails}>
              <div className={Styles.customerCircle}></div>
              <div>
                <div className={Styles.fontBold}>
                  {this.props.userName} :{" "}
                  <span className={Styles.fontLight}>
                    {selectedTickerHistory.creationDate &&
                      moment(
                        selectedTickerHistory.creationDate,
                        "DD-MM-YYYY hh:mm:ss"
                      ).format(CREATION_DATE_FORMAT)}
                  </span>
                </div>

                {selectedTickerHistory.customerComment && (
                  <div className={Styles.fontLight}>
                    {selectedTickerHistory.customerComment}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
OrderHistoryDetails.propTypes = {
  selectedTickerHistory: PropTypes.shape({
    creationDate: PropTypes.string,
    customerComment: PropTypes.string,
    orderId: PropTypes.string,
    productImage: PropTypes.string,
    productTitle: PropTypes.string,
    resolutionDate: PropTypes.string,
    slaBreach: PropTypes.string,
    ticketId: PropTypes.string,
    ticketStatus: PropTypes.string,
    transactionId: PropTypes.string
  })
};
