import React from "react";
import RateYourExperienceCard from "./RateYourExperienceCard.js";
import PaymentBanner from "./PaymentBanner.js";
import OrderDetailsCard from "./OrderDetailsCard.js";
import OrderSucessCard from "./OrderSucessCard.js";
import Icon from "../../xelpmoc-core/Icon";
import OrderConfirmationFooter from "./OrderConfirmationFooter.js";
import {
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_ORDERS_PAGE,
  MY_ACCOUNT_SAVED_CARDS_PAGE,
  MY_ACCOUNT_ADDRESS_PAGE,
  SAVE_LIST_PAGE,
  DIGITAL_DATA_FOR_PAYMENT_CONFIRMATION
} from "../../lib/constants";
import styles from "./PaymentConfirmationPage.css";
import wishlistIcon from "../../general/components/img/download.svg";
import orderHistoryIcon from "../../pdp/components/img/order-history.svg";
import addressIcon from "../../general/components/img/addressbook.svg";
import savedPayments from "../../general/components/img/card.svg";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import loader from "../../general/components/img/loader.gif";
import {
  setDataLayer,
  ADOBE_MDE_CLICK_ON_CHANGE_ACCOUNT_EXCHANGE
} from "../../lib/adobeUtils";
export default class PaymentConfirmationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showloader: false,
      exchangePaymentDetails: ""
    };
  }
  async wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
  async componentDidMount() {
    let orderId = this.props.orderId;
    if (!orderId) {
      let stripeDetails = localStorage.getItem("stripeDetails");
      let stripeDetailsJson = JSON.parse(stripeDetails);
      orderId = stripeDetailsJson.orderId;
    }
    if (orderId) {
      let pageName = "order confirmation";
      await this.wait(7000);
      this.setState({ showloader: true });
      await this.props.fetchOrderDetails(orderId, pageName);
      let response = this.props.orderDetailsPaymentPage;
      let data = {};
      let commonExchangePaymentDetails = {};
      if (
        response &&
        response.status &&
        response.status.toLowerCase() === "success"
      ) {
        response.products.map(product => {
          if (
            product.exchangeDetails &&
            product.exchangeDetails.exchangePaymentDetails
          ) {
            commonExchangePaymentDetails =
              product.exchangeDetails.exchangePaymentDetails;
          }
        });
        this.setState({
          exchangePaymentDetails: commonExchangePaymentDetails[0]
        });
        data.orderId = orderId;
        if (commonExchangePaymentDetails && commonExchangePaymentDetails[0]) {
          data.exchangePaymentMode =
            commonExchangePaymentDetails[0].exchangePaymentMode;
          if (commonExchangePaymentDetails[0].accountNumber) {
            data.accountNumber = commonExchangePaymentDetails[0].accountNumber;
          }
          this.props.showChangeExchangeCashabackModal(data);
        }
      }
    }
  }

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
  goToEchangeCashbackSelection(orderId, currentCashbackMode) {
    setDataLayer(ADOBE_MDE_CLICK_ON_CHANGE_ACCOUNT_EXCHANGE);
    let exchangeCashbackSelectionURL = `/my-account/getAccountInfoForExchange?parentOrderId=${orderId}`;
    this.props.history.push({
      pathname: exchangeCashbackSelectionURL,
      state: { currentCashbackMode: currentCashbackMode, orderId: orderId }
    });
  }
  render() {
    return (
      <React.Fragment>
        {!this.state.showloader && (
          <div className={styles.customloader}>
            <img className={styles.customloaderImg} src={loader} alt="loader" />
          </div>
        )}
        <div className={styles.base}>
          <div className={styles.pageCenter}>
            <DesktopOnly>
              <div className={styles.thanKText}>Thank you</div>
            </DesktopOnly>
            <div className={styles.pageSectionHolder}>
              <div className={styles.leftSection}>
                <div className={styles.orderBannerHolder}>
                  <PaymentBanner
                    history={this.props.history}
                    headingText={this.props.orderStatusMessage}
                    label={this.props.orderId}
                    onClick={() => this.trackOrder()}
                    isContinueShopping={true}
                    isGiftCard={
                      this.props.orderDetails &&
                      this.props.orderDetails.isEgvOrder
                    }
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
                            selectedDeliveryMode={order.selectedDeliveryMode}
                            edd={order.EDD}
                          />
                        </DesktopOnly>
                      </React.Fragment>
                    );
                  })}
                <MobileOnly>
                  <OrderConfirmationFooter
                    isEgvOrder={
                      this.props.orderDetails &&
                      this.props.orderDetails.isEgvOrder &&
                      this.props.orderDetails.isEgvOrder
                    }
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
        </div>
      </React.Fragment>
    );
  }
}
