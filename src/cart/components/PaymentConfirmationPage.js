import React from "react";
import RateYourExperienceCard from "./RateYourExperienceCard.js";
import PaymentBanner from "./PaymentBanner.js";
import OrderDetailsCard from "./OrderDetailsCard.js";
import OrderSucessCard from "./OrderSucessCard.js";
import Icon from "../../xelpmoc-core/Icon";
import OrderConfirmationFooter from "./OrderConfirmationFooter.js";
import CustomInstructionContainer from "../../cart/containers/CustomInstructionContainer";
import successImg from "./img/success_done.svg";
import thankYouImg from "./img/thankYou_img.png";
import { numberWithCommas, digitIntoWord } from "../../lib/dateTimeFunction";
import Button from "../../general/components/Button";
import ibutton from "../../cart/components/img/infoIbutton.svg";

import {
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_ORDERS_PAGE,
  MY_ACCOUNT_SAVED_CARDS_PAGE,
  MY_ACCOUNT_ADDRESS_PAGE,
  SAVE_LIST_PAGE,
  DIGITAL_DATA_FOR_PAYMENT_CONFIRMATION,
  RUPEE_SYMBOL,
  HOME_ROUTER,
  DIGITAL_DATA_FOR_CART,
  STATUS_CONFIRMED,
  AC_PDP_EXCHANGE_DETAILS,
  AC_CART_EXCHANGE_DETAILS
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
      let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
      if (cartExchangeDetails) {
        this.props.submitAppliancesExchangeData(
          orderId,
          STATUS_CONFIRMED,
          false
        );
      }
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
  componentWillUnmount() {
    localStorage.removeItem(DIGITAL_DATA_FOR_CART);
    localStorage.removeItem(DIGITAL_DATA_FOR_PAYMENT_CONFIRMATION);
    localStorage.removeItem("GiftCardAmount");
    localStorage.removeItem("productType");
    localStorage.removeItem(AC_PDP_EXCHANGE_DETAILS);
    localStorage.removeItem(AC_CART_EXCHANGE_DETAILS);
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

  onContinueShopping() {
    this.props.history.push(HOME_ROUTER);
  }

  render() {
    let totalValue = localStorage.getItem("GiftCardAmount");
    let productType = localStorage.getItem("productType");
    let cashback = localStorage.getItem("cashback");
    const numberFormater = totalValue && numberWithCommas(totalValue);
    const digitIntoNumberFormat = totalValue && digitIntoWord(totalValue);
    let isEgvOrder =
      this.props &&
      this.props.orderDetailsPaymentPage &&
      this.props.orderDetailsPaymentPage.isEgvOrder.toString();
    return (
      <React.Fragment>
        {!this.state.showloader && (
          <div className={styles.customloader}>
            <img className={styles.customloaderImg} src={loader} alt="loader" />
          </div>
        )}
        {this.state.showloader && (
          <div className={styles.base}>
            <div className={styles.pageCenter}>
              <DesktopOnly>
                <div className={styles.thanKText}>Thank you</div>
              </DesktopOnly>
              <div className={styles.pageSectionHolder}>
                <div className={styles.leftSection}>
                  {isEgvOrder == "true" ? (
                    <React.Fragment>
                      <div className={styles.gtThnkHed}>
                        <div className={styles.gtThnkHedInner}>
                          <div className={styles.gtThnkIcon}>
                            <div className={styles.imgSuccessDiv}>
                              <img src={successImg} width="30px" />
                            </div>
                            {productType === "topUp" ? (
                              <div className={styles.topUp}>
                                <div className={styles.topAdded}>
                                  Top-Up Added Successfully
                                </div>
                              </div>
                            ) : (
                              <h3>
                                You've sent the CLiQ Gift Card successfuly
                              </h3>
                            )}
                          </div>
                          <div className={styles.gtThnkAmtn}>
                            <span className={styles.rupeeSymabol}>
                              {RUPEE_SYMBOL}{" "}
                            </span>
                            {numberFormater}
                          </div>
                          <div className={styles.gtThnkAmtnWrd}>
                            <p>Rupees {digitIntoNumberFormat}</p>
                          </div>
                          <div className={styles.gtThnkHedImg}>
                            <img src={thankYouImg} />
                          </div>
                          <div className={styles.gtThnkHdTxt}>
                            Please check your email for order confirmation and
                            order details
                          </div>
                          {cashback === "enabled" && (
                            <div className={styles.cashBackOfferMsgDiv}>
                              <div className={styles.cashBackOfferImgDiv}>
                                <img src={ibutton} alt={"Offer Text"} />
                              </div>
                              <div className={styles.cashBackOfferMsg}>
                                Applicable CLiQ CashBack (if any) will be
                                credited to your CLiQ Cash account within 24
                                hours.
                              </div>
                            </div>
                          )}
                          <DesktopOnly>
                            {
                              <div className={styles.buttonHolder}>
                                <div
                                  className={styles.button}
                                  onClick={() => this.onContinueShopping()}
                                >
                                  Continue Shopping
                                </div>
                              </div>
                            }
                            {!this.props.isGiftCard && (
                              <div
                                className={styles.buttonHolder}
                                style={{ marginLeft: 10 }}
                              >
                                <Button
                                  type="hollow"
                                  color="#212121"
                                  label="View Orders"
                                  height={37}
                                  width={175}
                                  onClick={() => this.trackOrder()}
                                />
                              </div>
                            )}
                          </DesktopOnly>
                        </div>
                      </div>
                      <div className={styles.orderBannerHolder}>
                        <CustomInstructionContainer />
                      </div>
                    </React.Fragment>
                  ) : null}
                  {isEgvOrder == "false" ? (
                    <React.Fragment>
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
                      <div className={styles.orderBannerHolder}>
                        <CustomInstructionContainer />
                      </div>
                    </React.Fragment>
                  ) : null}

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
                        onClick={() =>
                          this.goToUrl(MY_ACCOUNT_SAVED_CARDS_PAGE)
                        }
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
        )}
      </React.Fragment>
    );
  }
}
