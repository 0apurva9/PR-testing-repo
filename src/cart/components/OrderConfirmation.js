import React from "react";
import RateYourExperienceCard from "./RateYourExperienceCard.js";
import OrderBanner from "./OrderBanner.js";
import OrderDetailsCard from "./OrderDetailsCard.js";
import OrderSucessCard from "./OrderSucessCard.js";
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
import wishlistIcon from "../../general/components/img/download.svg";
import orderHistoryIcon from "../../pdp/components/img/order-history.svg";
import addressIcon from "../../general/components/img/addressbook.svg";
import savedPayments from "../../general/components/img/card.svg";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
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
          <DesktopOnly>
            <div className={styles.thanKText}>Thank you</div>
          </DesktopOnly>
          <div className={styles.leftSection}>
            <div className={styles.orderBannerHolder}>
              <OrderBanner
                history={this.props.history}
                headingText={this.props.orderStatusMessage}
                label={this.props.orderId}
                onClick={() => this.trackOrder()}
                isContinueShopping={true}
              />
            </div>
            <MobileOnly>
              <div className={styles.rateHolder}>
                <RateYourExperienceCard
                  captureOrderExperience={rating =>
                    this.captureOrderExperience(rating)
                  }
                  continueShopping={() => this.continueShopping()}
                />
              </div>
            </MobileOnly>
            {this.props.orderDetails &&
              this.props.orderDetails.products &&
              this.props.orderDetails.products.map(order => {
                return (
                  <React.Fragment>
                    <MobileOnly>
                      <div className={styles.orderDetailsCardHolder}>
                        <OrderDetailsCard
                          productDetails={order}
                          orderDetails={this.props.orderDetails}
                          orderId={this.props.orderId}
                          trackOrder={() => this.trackOrder()}
                        />
                      </div>
                    </MobileOnly>
                    <DesktopOnly>
                      <OrderSucessCard
                        imageURL={order.imageURL}
                        price={order.pricevalue}
                        productName={order.productName}
                        quantity={order.quantity}
                        isGiveAway={order.isGiveAway}
                        selectedDeliveryMode={order.selectedDeliveryMode}
                      />
                    </DesktopOnly>
                  </React.Fragment>
                );
              })}
            <MobileOnly>
              <OrderConfirmationFooter
                isEgvOrder={this.props.orderDetails.isEgvOrder}
                continueShopping={() => this.continueShopping()}
                trackOrder={() => this.trackOrder()}
              />
              <div className={styles.dummySection} />
            </MobileOnly>
          </div>
          <DesktopOnly>
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
                    <Icon size={25} image={addressIcon} />
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
                  <div className={styles.icon}>
                    <Icon size={25} image={savedPayments} />
                  </div>
                  Saved Payments
                  <div className={styles.arrow} />
                </div>
              </div>
            </div>
          </DesktopOnly>
        </div>
      </div>
    );
  }
}
