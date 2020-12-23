import React, { Component } from "react";
import PropTypes from "prop-types";
import Styles from "./OrderHistoryList.css";
import Icon from "../../xelpmoc-core/Icon";
import downArrow from "./img/down-arrow-grey.svg";
import infoIcon from "./img/infoIcon.svg";
import ProductImage from "../../general/components/ProductImage";
import OrderHistoryDetails from "./OrderHistoryDetails";
import moment from "moment";
const CREATION_DATE_FORMAT = "DD MMM YYYY";
const ticketStatusDropDownMenu = [
  { label: "All Tickets", value: "all" },
  { label: "In Process", value: "In Process" },
  { label: "Resolved", value: "Resolved" }
];

const STATUS_DATE_FORMAT = "DD MMM, YYYY";

export default class OrderHistoryList extends Component {
  render() {
    const { ticketHistoryDetails } = this.props;
    return (
      <div className={Styles.base}>
        <div className={Styles.whiteCard}>
          <div className={Styles.headerBox}>
            <div className={Styles.header}>
              {" "}
              {this.props.isRecentOrderDetails
                ? "Ticket Details"
                : "All Tickets"}
            </div>
            {this.props.isRecentOrderDetails && (
              <div
                className={Styles.previousPageBtn}
                onClick={() => this.props.navigatePreviousPage()}
              >
                Go to Previous Page
              </div>
            )}
            {!this.props.isRecentOrderDetails && (
              <div
                className={Styles.filter}
                onClick={() => this.props.handleFilterClick()}
              >
                {this.props.filterTypeData}
                <Icon image={downArrow} size={11} />
              </div>
            )}

            {this.props.filterCard && (
              <div className={Styles.filterCard}>
                {ticketStatusDropDownMenu.map(filterData => {
                  return (
                    <div
                      className={Styles.filterType}
                      onClick={() =>
                        this.props.handleSelectedFilterClick(filterData)
                      }
                    >
                      {filterData.label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className={Styles.contentBox}>
            {ticketHistoryDetails &&
              !this.props.isRecentOrderDetails &&
              ticketHistoryDetails.tickets.map(tickets => {
                return (
                  <div
                    className={Styles.orderDetailsCardBox}
                    onClick={() => this.props.showRecentOrderDetails(tickets)}
                  >
                    <div className={Styles.orderImg}>
                      {tickets.issueBucket ? (
                        <div className={Styles.nonRelatedIcon}>
                          <div
                            style={{
                              background: `url(${require(`./img/${tickets.issueBucket
                                .split(" ")[0]
                                .toLowerCase()}_ticket.svg`)})`,
                              backgroundSize: "auto",
                              backgroundRepeat: "no-repeat",
                              width: "42px",
                              height: "42px"
                            }}
                          ></div>
                        </div>
                      ) : (
                        <ProductImage image={tickets.productImage} />
                      )}
                    </div>
                    <div className={Styles.orderDetails}>
                      <div className={Styles.productName}>
                        {tickets.issueType}
                      </div>
                      <div className={Styles.fontLight}>
                        <span
                          className={
                            tickets.status === "Resolved"
                              ? Styles.resolved
                              : tickets.escalationFlag === "true"
                              ? Styles.delayed
                              : Styles.inProcess
                          }
                        ></span>
                        Status :{" "}
                        <span className={Styles.fontBold}>
                          {tickets.status}{" "}
                          {tickets.status === "Resolved" ? "|" : null}{" "}
                          {tickets.status === "Resolved" &&
                            moment(tickets.creationDate, "DD-MM-YYYY").format(
                              `ddd ${STATUS_DATE_FORMAT}`
                            )}
                        </span>
                      </div>

                      {tickets.resolutionDate && tickets.status !== "Resolved" && (
                        <div className={Styles.fontLight}>
                          {" "}
                          Estimated Resolution Date:{" "}
                          <span className={Styles.fontBold}>
                            {moment(
                              tickets.resolutionDate.split(" ")[0],
                              "DD-MM-YYYY"
                            ).format(STATUS_DATE_FORMAT)}
                          </span>
                        </div>
                      )}

                      {tickets.escalationFlag === "true" && (
                        <div className={Styles.delayedStatus}>
                          <div className={Styles.esclaIcon}>
                            <Icon image={infoIcon} size={14}></Icon>
                          </div>
                          Your issue has been escalated
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

            {this.props.isRecentOrderDetails && (
              <OrderHistoryDetails
                selectedTickerHistory={this.props.selectedTickerHistory}
                userName={this.props.userName}
              />
            )}
          </div>
        </div>
        {!this.props.isRecentOrderDetails &&
          ticketHistoryDetails &&
          ticketHistoryDetails.ticketCount >=
            ticketHistoryDetails.tickets.length + 1 && (
            <div className={Styles.showMoreButtonBox}>
              <div
                className={Styles.showMore}
                onClick={() => this.props.loadMoreData()}
              >
                Show More
              </div>
            </div>
          )}
      </div>
    );
  }
}

OrderHistoryList.propTypes = {
  filterCard: PropTypes.bool,
  filterTypeData: PropTypes.string,
  handleFilterClick: PropTypes.func,
  handleSelectedFilterClick: PropTypes.func,
  isRecentOrderDetails: PropTypes.bool,
  navigatePreviousPage: PropTypes.func,
  showRecentOrderDetails: PropTypes.showRecentOrderDetails,
  ticketHistoryDetails: PropTypes.arrayOf(
    PropTypes.shape({
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
      agentComment: PropTypes.string
    })
  )
};
