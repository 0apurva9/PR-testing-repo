import React, { Component } from "react";
import PropTypes from "prop-types";
import Styles from "./RecentOrderHistory.css";
import Icon from "../../xelpmoc-core/Icon";
import downArrow from "./img/down-arrow-grey.svg";
import ProductImage from "../../general/components/ProductImage";
import RecentOrderDetails from "./RecentOrderDetails";
const orderDataList = {
  type: "getOrderHistoryListWsDTO",
  status: "Success",
  oldOrderHistoryPresent: false,
  orderData: [
    {
      isEgvOrder: false,
      orderDate: "2020-10-21T22:53:42+0530",
      orderId: "110013437",
      paymentMethod: "Netbanking",
      products: [
        {
          EDD: "03 11 2020",
          USSID: "100301BBAPLDK47994L",
          imageURL:
            "//img.tatacliq.com/images/i2/97Wx144H/MP000000002156293_97Wx144H_20171213144235.jpeg",
          isCncToHd: false,
          isGiveAway: "N",
          isReviewed: false,
          price: "₹747.00",
          productBrand: "Duke",
          productName: "Duke Olive Regular Fit Joggers",
          productcode: "MP000000002157634",
          sellerorderno: "201021-009-521404",
          statusDisplay: "Item Ready to be Shipped",
          transactionId: "100301012570281"
        }
      ],
      resendAttemptedCount: 0,
      resendAvailable: false
    },
    {
      isEgvOrder: false,
      orderDate: "2020-10-15T10:04:05+0530",
      orderId: "109884358",
      paymentMethod: "Credit Card",
      products: [
        {
          EDD: "25 10 2020",
          USSID: "100104Versa2EmrlndCoperRose",
          imageURL:
            "//img.tatacliq.com/images/i5/97Wx144H/MP000000006224823_97Wx144H_20191229042035.jpeg",
          isCncToHd: false,
          isGiveAway: "N",
          isReviewed: false,
          price: "₹14718.52",
          productBrand: "Fitbit",
          productName:
            "Fitbit Versa 2 FB507RGPE Health and Fitness Smartwatch (Emerald & Copper Rose)",
          productcode: "MP000000006224823",
          sellerorderno: "201015-009-398746",
          statusDisplay: "Delivered",
          transactionId: "100104012417192"
        }
      ],
      resendAttemptedCount: 0,
      resendAvailable: false
    },
    {
      isEgvOrder: false,
      orderDate: "2020-10-10T16:31:07+0530",
      orderId: "109790521",
      paymentMethod: "Credit Card",
      products: [
        {
          USSID: "8801402979558",
          imageURL:
            "//assets.tatacliq.com/medias/sys_master/images/16902437535774.jpg",
          isCncToHd: false,
          isGiveAway: "N",
          isReviewed: false,
          price: "₹500.00",
          productBrand: "Qwikcilver",
          productName: "Gift Card",
          productcode: "880140297",
          sellerorderno: "201010-009-303628",
          statusDisplay: "Order Confirmed",
          transactionId: "855995012296639"
        }
      ],
      resendAttemptedCount: 0,
      resendAvailable: false
    },
    {
      isEgvOrder: false,
      orderDate: "2020-10-07T23:33:30+0530",
      orderId: "109721504",
      paymentMethod: "Netbanking",
      products: [
        {
          USSID: "8801402979558",
          imageURL:
            "//assets.tatacliq.com/medias/sys_master/images/16902437535774.jpg",
          isCncToHd: false,
          isGiveAway: "N",
          isReviewed: false,
          price: "₹1000.00",
          productBrand: "Qwikcilver",
          productName: "Gift Card",
          productcode: "880140297",
          sellerorderno: "201007-009-235182",
          statusDisplay: "Order Confirmed",
          transactionId: "855995012211260"
        }
      ],
      resendAttemptedCount: 0,
      resendAvailable: false
    },
    {
      isEgvOrder: false,
      orderDate: "2020-09-10T16:17:38+0530",
      orderId: "109451297",
      paymentMethod: "UPI",
      products: [
        {
          EDD: "17 09 2020",
          USSID: "123878APTG312HDGC",
          imageURL:
            "//img.tatacliq.com/images/i3/97Wx144H/MP000000004560836_97Wx144H_20190327231215.jpeg",
          isCncToHd: false,
          isGiveAway: "N",
          isReviewed: false,
          price: "₹99.00",
          productBrand: "AirCase",
          productName:
            "AirCase AP-TG-312 Tempered Glass for Apple iPhone 5/5S/SE",
          productcode: "MP000000004560836",
          sellerorderno: "200910-008-975806",
          statusDisplay: "Refund Successful",
          transactionId: "123878011862799"
        }
      ],
      resendAttemptedCount: 0,
      resendAvailable: false
    }
  ],
  pageSize: 5,
  totalNoOfOrders: 18
};

export default class RecentOrderHistory extends Component {
  render() {
    return (
      <div className={Styles.base}>
        <div className={Styles.whiteCard}>
          <div className={Styles.headerBox}>
            <div className={Styles.header}>Recent tickets</div>

            {this.props.isRecentOrderDetails ? (
              <div
                className={Styles.previousPageBtn}
                onClick={() => this.props.navigatePreviousPage()}
              >
                Go to Previous Page
              </div>
            ) : (
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
                    this.props.handleSelectedFilterClick("all-ticket")
                  }
                >
                  All Tickets
                </div>
                <div
                  className={Styles.filterType}
                  onClick={() =>
                    this.props.handleSelectedFilterClick("in-progress")
                  }
                >
                  In Process
                </div>
                <div
                  className={Styles.filterType}
                  onClick={() => this.props.handleSelectedFilterClick("Closed")}
                >
                  Closed
                </div>
              </div>
            )}
          </div>
          <div className={Styles.contentBox}>
            {orderDataList &&
              !this.props.isRecentOrderDetails &&
              orderDataList.orderData.map(data => {
                if (data.products) {
                  return data.products.map(product => {
                    return (
                      <div
                        className={Styles.orderDetailsCardBox}
                        onClick={() => this.props.showRecentOrderDetails()}
                      >
                        <div className={Styles.orderImg}>
                          <ProductImage image={product.imageURL} />
                        </div>
                        <div className={Styles.orderDetails}>
                          <div className={Styles.productName}>
                            {product.productName}
                          </div>
                          <div className={Styles.fontLight}>
                            <div
                              className={Styles.orderStatusIconResolve}
                            ></div>
                            Status :{" "}
                            <span className={Styles.fontBold}>
                              {product.statusDisplay}
                            </span>
                          </div>
                          <div className={Styles.fontLight}>
                            {" "}
                            Estimated Resolution Date:{" "}
                            <span className={Styles.fontBold}>
                              {product.EDD}{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  });
                }
              })}

            {!orderDataList && !this.props.isRecentOrderDetails && (
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
            )}
            {this.props.isRecentOrderDetails && (
              <RecentOrderDetails orderDataList={orderDataList} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

// const ticketDetailsProps = PropTypes.shape({
//   creationDate: PropTypes.string,
//   customerComment: PropTypes.string,
//   issueBucket: PropTypes.string,
//   issueType: PropTypes.string,
//   orderId: PropTypes.string,
//   productImage: PropTypes.string,
//   productTitle: PropTypes.string,
//   resolutionDate: PropTypes.string,
//   slaBreach: PropTypes.string,
//   ticketId: PropTypes.string,
//   ticketStatus: PropTypes.string,
//   transactionId: PropTypes.string
// });

RecentOrderHistory.propTypes = {
  handleFilterClick: PropTypes.func,
  handleSelectedFilterClick: PropTypes.func,
  filterCard: PropTypes.bool,
  isRecentOrderDetails: PropTypes.bool,
  filterTypeData: PropTypes.string,
  showRecentOrderDetails: PropTypes.showRecentOrderDetails
};
