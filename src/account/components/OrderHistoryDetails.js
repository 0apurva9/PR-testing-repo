import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductImage from "../../general/components/ProductImage";
import Styles from "./OrderHistoryList.css";
import Icon from "../../xelpmoc-core/Icon";
import infoIcon from "./img/infoIcon.svg";
import resolveIcon from "./img/resolve-icon.svg";
import resolvedTick from "./img/resolvedTick.svg";
import moment from "moment";
import { RESOLVED } from "../../lib/constants";
const CREATION_DATE_FORMAT = "DD MMM";
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
              ).format(`${CREATION_DATE_FORMAT},YYYY | hh:mm A`)}
          </span>
        </div>
        <div className={Styles.orderInfoDetails}>
          <div className={Styles.orderImg}>
            {selectedTickerHistory.status === RESOLVED ? (
              <div className={Styles.resolvedIcon}>
                <Icon image={resolvedTick} width={22} height={22} />
              </div>
            ) : null}
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
              {selectedTickerHistory.status}
            </span>
          </div>
          <div className={Styles.fontLight}>
            {" "}
            {selectedTickerHistory.status === RESOLVED
              ? "Resolved On"
              : "Estimated Resolution"}{" "}
            :{" "}
            <span className={Styles.fontBold}>
              {selectedTickerHistory.status === RESOLVED
                ? selectedTickerHistory.resolvedDate &&
                  moment(
                    selectedTickerHistory.resolvedDate.split(" ")[0],
                    "DD-MM-YYYY"
                  ).format(STATUS_DATE_FORMAT)
                : selectedTickerHistory.resolutionDate &&
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
            ></span>
          </div>

          {selectedTickerHistory.status === RESOLVED && (
            <div className={Styles.resolvedBox}>
              <Icon image={resolveIcon} width={26} height={15} />
              <span className={Styles.resolvedStatusText}>
                {selectedTickerHistory.statusMessage}
              </span>
            </div>
          )}

          {selectedTickerHistory.escalationFlag === "true" && (
            <div className={Styles.escalationBody}>
              <div className={Styles.iconBody}>
                <Icon image={infoIcon} size={14}></Icon>
              </div>
              <div className={Styles.txtBody}>
                <div className={Styles.lightTxt}>
                  {" "}
                  Your issue has been escalated{" "}
                </div>
                {selectedTickerHistory.statusMessage && (
                  <span>
                    {" "}
                    Note :{" "}
                    {selectedTickerHistory.statusMessage.replace(/&#39;/g, "'")}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        {selectedTickerHistory.customerComment && (
          <div className={Styles.communication}>
            <div className={Styles.communicationHeading}>
              Communication details
            </div>
            <div className={Styles.customerCetails}>
              <div className={Styles.customerCircle}></div>
              <div className={Styles.commentBody}>
                <div className={Styles.fontBold}>
                  {this.props.userName} |{" "}
                  <span className={Styles.dateBox}>
                    {selectedTickerHistory.creationDate &&
                      moment(
                        selectedTickerHistory.creationDate,
                        "DD-MM-YYYY hh:mm:ss"
                      ).format(`${CREATION_DATE_FORMAT}, hh:mm A`)}
                  </span>
                </div>

                {selectedTickerHistory.customerComment && (
                  <div className={Styles.commentTxt}>
                    {selectedTickerHistory.customerComment}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {selectedTickerHistory.agentResolution && (
          <div className={Styles.communication}>
            <div className={Styles.customerCetails}>
              <div className={Styles.customerCircle}></div>
              <div className={Styles.commentBody}>
                <div className={Styles.fontBold}>
                  CLiQ Care |{" "}
                  <span className={Styles.dateBox}>
                    {selectedTickerHistory.resolutionDate &&
                      moment(
                        selectedTickerHistory.resolutionDate,
                        "DD-MM-YYYY hh:mm:ss"
                      ).format(`${CREATION_DATE_FORMAT}, hh:mm A`)}
                  </span>
                </div>
                <div className={Styles.commentTxt}>
                  {selectedTickerHistory.agentResolution}
                </div>
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
    issueBucket: PropTypes.string,
    issueType: PropTypes.string,
    orderId: PropTypes.string,
    productImage: PropTypes.string,
    productTitle: PropTypes.string,
    resolutionDate: PropTypes.string,
    slaBreach: PropTypes.string,
    ticketId: PropTypes.string,
    status: PropTypes.string,
    transactionId: PropTypes.string,
    escalationFlag: PropTypes.string,
    statusMessage: PropTypes.string,
    agentResolution: PropTypes.string
  })
};
