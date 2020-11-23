import React, { Component } from "react";
import PropTypes from "prop-types";
import Styles from "./RecentOrderHistory.css";
import Icon from "../../xelpmoc-core/Icon";
import downArrow from "./img/down-arrow-grey.svg";
import ProductImage from "../../general/components/ProductImage";
import RecentOrderDetails from "./RecentOrderDetails";
import moment from "moment";

const ticketStatusDropDownMenu = [
  { label: "All Tickets", value: "all" },
  { label: "In Process", value: "In Process" },
  { label: "Resolved", value: "Resolved" }
];

const STATUS_DATE_FORMAT = "DD MMM, YYYY";

export default class RecentOrderHistory extends Component {
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

            <div
              className={Styles.previousPageBtn}
              onClick={() => this.props.navigatePreviousPage()}
            >
              Go to Previous Page
            </div>

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
                {/* <div
                  className={Styles.filterType}
                  onClick={() =>
                    this.props.handleSelectedFilterClick("All-ticket")
                  }
                >
                  All Tickets
                </div>
                <div
                  className={Styles.filterType}
                  onClick={() =>
                    this.props.handleSelectedFilterClick("In-progress")
                  }
                >
                  In Process
                </div>
                <div
                  className={Styles.filterType}
                  onClick={() =>
                    this.props.handleSelectedFilterClick("Resolved")
                  }
                >
                  Resolved
                </div> */}
              </div>
            )}
          </div>
          <div className={Styles.contentBox}>
            {ticketHistoryDetails &&
              !this.props.isRecentOrderDetails &&
              ticketHistoryDetails.map(tickets => {
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
                            tickets.ticketStatus === "Resolved"
                              ? Styles.resolved
                              : tickets.slaBreach === "true"
                              ? Styles.delayed
                              : Styles.inProcess
                          }
                        ></span>
                        Status :{" "}
                        <span className={Styles.fontBold}>
                          {tickets.ticketStatus}
                        </span>
                      </div>
                      {tickets.resolutionDate && (
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

                      {tickets.slaBreach === "true" && (
                        <div className={Styles.delayedStatus}>
                          Resolution delayed
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

            {this.props.isRecentOrderDetails && (
              <RecentOrderDetails
                selectedTickerHistory={this.props.selectedTickerHistory}
                userName={this.props.userName}
              />
            )}
          </div>
        </div>
        {!this.props.isRecentOrderDetails && (
          <div className={Styles.showMoreButtonBox}>
            <div className={Styles.showMore}>Show More</div>
          </div>
        )}
      </div>
    );
  }
}

RecentOrderHistory.propTypes = {
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
      orderId: PropTypes.string,
      productImage: PropTypes.string,
      productTitle: PropTypes.string,
      resolutionDate: PropTypes.string,
      slaBreach: PropTypes.string,
      ticketId: PropTypes.string,
      ticketStatus: PropTypes.string,
      transactionId: PropTypes.string
    })
  )
};
