import React, { Component } from "react";
import PropTypes from "prop-types";
import Styles from "./RecentOrderHistory.css";
import Icon from "../../xelpmoc-core/Icon";
import downArrow from "./img/down-arrow-grey.svg";
import ProductImage from "../../general/components/ProductImage";
import RecentOrderDetails from "./RecentOrderDetails";
import moment from "moment";

const STATUS_DATE_FORMAT = "DD MMM, YYYY";

export default class RecentOrderHistory extends Component {
  render() {
    console.log("ticketHistoryDetails", this.props.ticketHistoryDetails);
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
                <div
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
                </div>
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
                      <ProductImage image={tickets.productImage} />
                    </div>
                    <div className={Styles.orderDetails}>
                      <div className={Styles.productName}>
                        {tickets.issueType}
                      </div>
                      <div className={Styles.fontLight}>
                        <span
                          className={
                            tickets.ticketStatus === "Close"
                              ? Styles.resolved
                              : tickets.slaBreach === "true"
                              ? Styles.delayed
                              : Styles.inProcess
                          }
                        ></span>
                        Status :{" "}
                        <span className={Styles.fontBold}>
                          {tickets.ticketStatus === "Open"
                            ? "In Process"
                            : "Resolved"}
                        </span>
                      </div>
                      <div className={Styles.fontLight}>
                        {" "}
                        Estimated Resolution Date:{" "}
                        <span className={Styles.fontBold}>
                          {tickets.resolutionDate &&
                            moment(
                              tickets.resolutionDate.split(" ")[0],
                              "DD-MM-YYYY"
                            ).format(STATUS_DATE_FORMAT)}
                        </span>
                      </div>
                      {tickets.slaBreach === "true" && (
                        <div className={Styles.delayedStatus}>
                          Resolution delayed
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

            {/* {!orderDataList && !this.props.isRecentOrderDetails && (
              <div className={Styles.noRecentOrder}>
                <div className={Styles.heading}> No recent queries </div>
                <div className={Styles.txt}>
                  {" "}
                  There were no queries raised in{" "}
                  <span className={Styles.heading}> Last 30 Days </span>
                </div>
                <div className={Styles.txt}>
                  Search for{" "}
                  <span className={Styles.date}> Different Dates </span>
                </div>
              </div>
            )} */}
            {this.props.isRecentOrderDetails && (
              <RecentOrderDetails
                selectedTickerHistory={this.props.selectedTickerHistory}
              />
            )}
          </div>
        </div>
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
