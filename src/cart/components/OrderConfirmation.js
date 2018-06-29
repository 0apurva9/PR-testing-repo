import React from "react";
import RateYourExperienceCard from "./RateYourExperienceCard.js";
import OrderBanner from "./OrderBanner.js";
import OrderDetailsCard from "./OrderDetailsCard.js";
import Icon from "../../xelpmoc-core/Icon";
import OrderConfirmationFooter from "./OrderConfirmationFooter.js";
import MediaQuery from "react-responsive";
import {
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_ORDERS_PAGE,
  MY_ACCOUNT_SAVED_CARDS_PAGE,
  MY_ACCOUNT_ADDRESS_PAGE,
  SAVE_LIST_PAGE
} from "../../lib/constants";
import styles from "./OrderConfirmation.css";
import wishlistIcon from "../../pdp/components/img/Save.svg";
import orderHistoryIcon from "../../pdp/components/img/order-history.svg";
import paymentIcon from "./img/debit-card.svg";
export default class OrderConfirmation extends React.Component {
  captureOrderExperience = rating => {
    this.props.captureOrderExperience(rating);
  };

  continueShopping = () => {
    this.props.continueShopping();
  };
  trackOrder() {
    this.props.trackOrder();
  }

  goToUrl(value) {
    if (value) {
      this.props.history.push(`${MY_ACCOUNT_PAGE}${value}`);
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.pageCenter}>
          <div className={styles.leftSection}>
            <div className={styles.orderBannerHolder}>
              <OrderBanner
                headingText={this.props.orderStatusMessage}
                label={this.props.orderId}
                onClick={() => this.trackOrder()}
              />
            </div>
            <MediaQuery query="(max-device-width: 1024px)">
              <div className={styles.rateHolder}>
                <RateYourExperienceCard
                  captureOrderExperience={rating =>
                    this.captureOrderExperience(rating)
                  }
                  continueShopping={() => this.continueShopping()}
                />
              </div>
            </MediaQuery>
            {this.props.orderDetails &&
              this.props.orderDetails.products &&
              this.props.orderDetails.products.map(order => {
                return (
                  <OrderDetailsCard
                    productDetails={order}
                    orderDetails={this.props.orderDetails}
                    orderId={this.props.orderId}
                    trackOrder={() => this.trackOrder()}
                  />
                );
              })}
            <MediaQuery query="(max-device-width: 1024px)">
              <OrderConfirmationFooter
                isEgvOrder={this.props.orderDetails.isEgvOrder}
                continueShopping={() => this.continueShopping()}
                trackOrder={() => this.trackOrder()}
              />
            </MediaQuery>
            <div className={styles.dummySection} />
            <MediaQuery query="(min-device-width: 1025px)">
              <div className={styles.rightSection}>
                <div className={styles.rateHolder}>
                  <RateYourExperienceCard
                    captureOrderExperience={rating =>
                      this.captureOrderExperience(rating)
                    }
                    continueShopping={() => this.continueShopping()}
                  />
                </div>
                <div className={styles.linkHolder}>
                  <div className={styles.linkHeader}>My CLiQ</div>
                  <div
                    className={styles.link}
                    onClick={() => this.goToUrl(SAVE_LIST_PAGE)}
                  >
                    <div className={styles.icon}>
                      <Icon size={25} image={wishlistIcon} />
                    </div>
                    Saved List
                    <div className={styles.arrow} />
                  </div>
                  <div
                    className={styles.link}
                    onClick={() => this.goToUrl(MY_ACCOUNT_ADDRESS_PAGE)}
                  >
                    <div className={styles.icon}>
                      <Icon size={25} image={orderHistoryIcon} />
                    </div>
                    Address Book
                    <div className={styles.arrow} />
                  </div>
                  <div
                    className={styles.link}
                    onClick={() => this.goToUrl(MY_ACCOUNT_ORDERS_PAGE)}
                  >
                    <div className={styles.icon}>
                      <Icon size={25} image={orderHistoryIcon} />
                    </div>
                    Order History
                    <div className={styles.arrow} />
                  </div>
                  <div
                    className={styles.link}
                    onClick={() => this.goToUrl(MY_ACCOUNT_SAVED_CARDS_PAGE)}
                  >
                    <div className={styles.icon} image={paymentIcon}>
                      <Icon size={25} />
                    </div>
                    Saved Payments
                    <div className={styles.arrow} />
                  </div>
                </div>
              </div>
            </MediaQuery>
          </div>
        </div>
      </div>
    );
  }
}
