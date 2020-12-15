import React from "react";
import RateYourExperienceCard from "./RateYourExperienceCard.js";
import OrderBanner from "./OrderBanner.js";
import OrderDetailsCard from "./OrderDetailsCard.js";
import OrderSucessCard from "./OrderSucessCard.js";
import Icon from "../../xelpmoc-core/Icon";
import OrderConfirmationFooter from "./OrderConfirmationFooter.js";
import CustomInstructionContainer from "../../cart/containers/CustomInstructionContainer";
import {
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_ORDERS_PAGE,
  MY_ACCOUNT_SAVED_CARDS_PAGE,
  MY_ACCOUNT_ADDRESS_PAGE,
  SAVE_LIST_PAGE,
  DIGITAL_DATA_FOR_PAYMENT_CONFIRMATION,
  DIGITAL_DATA_FOR_CART,
  STATUS_CONFIRMED,
  AC_PDP_EXCHANGE_DETAILS,
  AC_CART_EXCHANGE_DETAILS
} from "../../lib/constants";
import styles from "./OrderConfirmation.css";
import wishlistIcon from "../../general/components/img/download.svg";
import orderHistoryIcon from "../../pdp/components/img/order-history.svg";
import addressIcon from "../../general/components/img/addressbook.svg";
import savedPayments from "../../general/components/img/card.svg";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
// import ModalPanel from "../../general/components/ModalPanel.js";
// import BottomSlideModal2 from "../../general/components/BottomSlideModal2.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import {
  setDataLayer,
  setDataLayerForGiftCard,
  SET_DATA_LAYER_BUY_GIFT_CARD_SUBMIT,
  ADOBE_MDE_CLICK_ON_CHANGE_ACCOUNT_EXCHANGE
} from "../../lib/adobeUtils";

import PaymentBanner from "./PaymentBanner.js";
export default class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commonExchangePaymentDetails: ""
      // showBanner: false,
      // bannerImg: "",
      // bannerPDPUrl: ""
    };
    this.onCancel = this.onCancel.bind(this);
  }
  async componentDidMount() {
    if (this.props.orderDetails.isEgvOrder) {
      setDataLayerForGiftCard(SET_DATA_LAYER_BUY_GIFT_CARD_SUBMIT);
    }
    // commented as it is not required - will remove code after confirmation
    // let firstProductCategory = this.props.orderDetails.products[0]
    //   .productCategory;
    // let bannerData = await this.props.orderConfirmationBanner();
    // let bannerCategoryCodes =
    //   bannerData &&
    //   JSON.parse(
    //     bannerData.orderConfirmationBannerDetails.applicationProperties[0].value
    //   );
    // let matchedCategoryCode = "";
    // let matchedPDPUrl = "";
    // if (bannerCategoryCodes) {
    //   for (var key in bannerCategoryCodes.categoryCodes) {
    //     if (key === firstProductCategory) {
    //       matchedCategoryCode = key;
    //       matchedPDPUrl = bannerCategoryCodes.categoryCodes[key];
    //     }
    //   }
    //   let bannerImgUrl = bannerCategoryCodes.bannerUrl;
    //   if (bannerImgUrl) {
    //     this.setState({ bannerImg: bannerImgUrl });
    //   }
    //   if (matchedPDPUrl) {
    //     this.setState({ bannerPDPUrl: matchedPDPUrl });
    //   }
    //   if (matchedCategoryCode) {
    //     this.showBanner();
    //   }
    // }

    let data = {};
    let commonExchangePaymentDetails = {};
    if (this.props.orderDetails) {
      this.props.orderDetails.products.map(product => {
        if (
          product.exchangeDetails &&
          product.exchangeDetails.exchangePaymentDetails
        ) {
          commonExchangePaymentDetails =
            product.exchangeDetails.exchangePaymentDetails;
        }
      });
      //check for isComingFromCncToHd
      if (
        this.props.isComingFromCncToHd &&
        this.props.orderDetails.exchangeDetails &&
        this.props.orderDetails.exchangeDetails.exchangePaymentDetails
      ) {
        commonExchangePaymentDetails = this.props.orderDetails.exchangeDetails
          .exchangePaymentDetails;
      }
    }
    if (commonExchangePaymentDetails) {
      this.setState({
        commonExchangePaymentDetails: commonExchangePaymentDetails
      });
      data.orderId = this.props.orderId;
      if (commonExchangePaymentDetails && commonExchangePaymentDetails[0]) {
        data.exchangePaymentMode =
          commonExchangePaymentDetails[0].exchangePaymentMode;
        if (commonExchangePaymentDetails[0].accountNumber) {
          data.accountNumber = commonExchangePaymentDetails[0].accountNumber;
        }
        this.props.showChangeExchangeCashabackModal(data);
      }
    }
    let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
    if (cartExchangeDetails) {
      this.props.submitAppliancesExchangeData(
        this.props.orderId,
        STATUS_CONFIRMED,
        false
      );
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

  showBanner() {
    setTimeout(() => {
      this.setState({ showBanner: true });
    }, 3000);
  }

  onCancel() {
    this.setState({ showBanner: false });
  }

  goToBannerUrl(url) {
    if (url) {
      const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(`${urlSuffix}`);
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
  componentWillUnmount() {
    localStorage.removeItem(DIGITAL_DATA_FOR_CART);
    localStorage.removeItem(DIGITAL_DATA_FOR_PAYMENT_CONFIRMATION);
    localStorage.removeItem(AC_PDP_EXCHANGE_DETAILS);
    localStorage.removeItem(AC_CART_EXCHANGE_DETAILS);
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.pageCenter}>
          {/* {this.state.showBanner && (
            <ModalPanel>
              <BottomSlideModal2 onCancel={this.onCancel}>
                <div className={styles.popup}>
                  <img
                    src={this.state.bannerImg}
                    alt="Banner"
                    onClick={value =>
                      this.goToBannerUrl(this.state.bannerPDPUrl)
                    }
                  />
                </div>
              </BottomSlideModal2>
            </ModalPanel>
          )} */}
          <DesktopOnly>
            <div className={styles.thanKText}>Thank you</div>
          </DesktopOnly>
          <div className={styles.pageSectionHolder}>
            <div className={styles.leftSection}>
              <div className={styles.orderBannerHolder}>
                {this.props.orderDetails.paymentMethod === "COD" ? (
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
                    COD={true}
                  />
                ) : (
                  <OrderBanner
                    history={this.props.history}
                    headingText={this.props.orderStatusMessage}
                    label={this.props.orderId}
                    onClick={() => this.trackOrder()}
                    isContinueShopping={true}
                    isGiftCard={
                      this.props.orderDetails &&
                      this.props.orderDetails.isEgvOrder
                    }
                    pickUpPersonMobile={
                      this.props.orderDetails &&
                      this.props.orderDetails.pickupPersonMobile
                    }
                  />
                )}
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
              {!this.props.isComingFromCncToHd &&
                this.props.orderDetails &&
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
                          exchangeDetails={order.exchangeDetails}
                          ussid={order.USSID}
                        />
                      </DesktopOnly>
                    </React.Fragment>
                  );
                })}
              <div className={styles.baseCustom}>
                <CustomInstructionContainer />
              </div>
              {this.props.isComingFromCncToHd && (
                <OrderSucessCard
                  imageURL={this.props.orderDetails.imageURL}
                  price={this.props.orderDetails.price}
                  productName={this.props.orderDetails.productName}
                  quantity={"1"}
                  selectedDeliveryMode={
                    this.props.orderDetails.selectedDeliveryMode
                  }
                  edd={this.props.orderDetails.EDD}
                  exchangeDetails={this.props.orderDetails.exchangeDetails}
                />
              )}
              <MobileOnly>
                <OrderConfirmationFooter
                  isEgvOrder={this.props.orderDetails.isEgvOrder}
                  continueShopping={() => this.continueShopping()}
                  trackOrder={() => this.trackOrder()}
                />
                <div className={styles.dummySection} />
              </MobileOnly>
              {this.state.commonExchangePaymentDetails &&
                this.state.commonExchangePaymentDetails[0] &&
                this.state.commonExchangePaymentDetails[0]
                  .exchangePaymentMode && (
                  <div className={styles.exchangeCashbackDetailsContainer}>
                    <div className={styles.exchangeCashbackDetails}>
                      <div className={styles.exchangeCashbackTextContainer}>
                        <span className={styles.exchangeCashbackText}>
                          You will receive Exchange Cashback, post your old
                          phone pickup, in{" "}
                        </span>
                        {this.state.commonExchangePaymentDetails[0]
                          .exchangePaymentMode === "CLIQ_CASH" ? (
                          <span className={styles.exchangeCashbackAccountText}>
                            CLiQ Cash wallet
                          </span>
                        ) : (
                          <span className={styles.exchangeCashbackAccountText}>
                            A/c{" "}
                            {this.state.commonExchangePaymentDetails[0]
                              .accountNumber &&
                              this.state.commonExchangePaymentDetails[0].accountNumber.replace(
                                /.(?=.{4,}$)/g,
                                "x"
                              )}
                          </span>
                        )}
                      </div>
                      <div
                        className={styles.exchangeCashbackChangeMode}
                        onClick={() =>
                          this.goToEchangeCashbackSelection(
                            this.props.orderId,
                            this.state.commonExchangePaymentDetails[0]
                              .exchangePaymentMode
                          )
                        }
                      >
                        Change Mode
                      </div>
                    </div>
                  </div>
                )}
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
    );
  }
}
OrderConfirmation.defaultProps = {
  isComingFromCncToHd: false
};
