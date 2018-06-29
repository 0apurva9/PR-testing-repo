import React from "react";
import RateYourExperienceCard from "./RateYourExperienceCard.js";
import OrderBanner from "./OrderBanner.js";
import styles from "./OrderConfirmation.css";
import OrderDetailsCard from "./OrderDetailsCard.js";
import OrderConfirmationFooter from "./OrderConfirmationFooter.js";
import MediaQuery from "react-responsive";
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
            <div className={styles.rateHolder}>
              <RateYourExperienceCard
                captureOrderExperience={rating =>
                  this.captureOrderExperience(rating)
                }
                continueShopping={() => this.continueShopping()}
              />
            </div>
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
            <MediaQuery query="(min-device-width: 1025px)">
              <OrderConfirmationFooter
                isEgvOrder={this.props.orderDetails.isEgvOrder}
                continueShopping={() => this.continueShopping()}
                trackOrder={() => this.trackOrder()}
              />
            </MediaQuery>
          </div>
          <MediaQuery query="(max-device-width: 1024px)">
            <div className={styles.rightSection}>
              <RateYourExperienceCard
                captureOrderExperience={rating =>
                  this.captureOrderExperience(rating)
                }
                continueShopping={() => this.continueShopping()}
              />
            </div>
          </MediaQuery>
        </div>
      </div>
    );
  }
}
