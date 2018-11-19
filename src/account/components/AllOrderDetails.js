import React from "react";
import styles from "./AllOrderDetails.css";
import OrderPlacedAndId from "./OrderPlacedAndId.js";
import OrderCard from "./OrderCard.js";
import PriceAndLink from "./PriceAndLink.js";
import OrderDelivered from "./OrderDelivered.js";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import format from "date-fns/format";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import { Redirect } from "react-router-dom";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import * as Cookie from "../../lib/Cookie";
import UserCouponsContainer from "../containers/UserCouponsContainer";
import UserAlertsContainer from "../containers/UserAlertsContainer";
import each from "lodash.foreach";
import UserReviewContainer from "../containers/UserReviewContainer";
import {
  setDataLayerForMyAccountDirectCalls,
  ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL
} from "../../lib/adobeUtils";
import ShowMoreButton from "../../general/components/ShowMoreButton";
import {
  MY_ACCOUNT,
  ORDER,
  ORDER_CODE,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  LOGIN_PATH,
  ORDER_HISTORY,
  MY_ACCOUNT_GIFT_CARD_PAGE,
  MY_ACCOUNT_PAGE,
  WRITE_REVIEW
} from "../../lib/constants";
import ProfileMenu from "./ProfileMenu";
import UserProfile from "./UserProfile";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import {
  HOME_ROUTER,
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_REASON,
  TERMS_AND_CONDITION_URL,
  ABOUT_US_URL,
  PRIVACY_POLICY_URL,
  CASH_ON_DELIVERY,
  FAQ_URL,
  SEARCH_RESULTS_PAGE,
  PRODUCT_REVIEWS_PATH_SUFFIX,
  HELP_URL
} from "../../lib/constants";
import throttle from "lodash.throttle";
import {
  setDataLayer,
  ADOBE_MY_ACCOUNT_ORDER_HISTORY
} from "../../lib/adobeUtils";
import * as UserAgent from "../../lib/UserAgent.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import AccountUsefulLink from "./AccountUsefulLink.js";
import TabHolder from "./TabHolder";
import TabData from "./TabData";
const RETURN = "RETURN";
const PRODUCT_RETURN = "Return";
const dateFormat = "DD MMM YYYY";
const SUFFIX = `&isTextSearch=false&isFilter=false`;
const SCROLL_CHECK_INTERVAL = 500;
const OFFSET_BOTTOM = 800;
const PAY_PAL = "PayPal";
const Loader = () => {
  return (
    <div>
      <SecondaryLoader />
    </div>
  );
};
export default class AllOrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOrder: null,
      isSelected: 0,
      stickyPortion: false,
      showStickyPortion: 0
    };
  }
  tabSelect(val) {
    this.setState({ isSelected: val });
  }
  onClickImage(isEgvOrder, productCode) {
    if (!isEgvOrder && productCode) {
      this.props.history.push(`/p-${productCode.toLowerCase()}`);
    } else if (isEgvOrder) {
      this.props.history.push(`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_GIFT_CARD_PAGE}`);
    }
  }
  onViewDetails(orderId) {
    this.props.history.push(`${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${orderId}`);
  }
  writeReview(productCode) {
    if (productCode && this.props.history) {
      this.props.history.push(`p-${productCode.toLowerCase()}${WRITE_REVIEW}`);
    }
  }
  componentDidMount() {
    document.title = "My Orders";
    if (this.props.shouldCallHeaderContainer) {
      setDataLayer(ADOBE_MY_ACCOUNT_ORDER_HISTORY);
      this.props.setHeaderText(ORDER_HISTORY);
    }
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (userDetails && customerCookie) {
      if (UserAgent.checkUserAgentIsMobile()) {
        this.throttledScroll = this.handleScroll();
        window.addEventListener("scroll", this.throttledScroll);
      } else {
        this.onScroll = this.onScroll();
        window.addEventListener("scroll", this.onScroll);
      }
      this.props.getAllOrdersDetails();
    }
  }
  componentWillUnmount() {
    this.props.clearOrderDetails();
    window.removeEventListener("scroll", this.throttledScroll);
    window.removeEventListener("scroll", this.onScroll);
  }

  componentDidUpdate() {
    if (this.props.shouldCallHeaderContainer) {
      this.props.setHeaderText(ORDER_HISTORY);
    }
  }
  redirectToHelp = url => {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };
  renderToContinueShopping() {
    this.props.history.push(HOME_ROUTER);
  }
  handleScroll = () => {
    return throttle(() => {
      if (
        this.state.isSelected === 0 &&
        this.props.profile.orderDetails &&
        (this.props.profile.orderDetails.currentPage + 1) * 3 <
          this.props.profile.orderDetails.totalNoOfOrders
      ) {
        const windowHeight =
          "innerHeight" in window
            ? window.innerHeight
            : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;
        if (
          windowBottom >= docHeight - OFFSET_BOTTOM &&
          !this.props.profile.loading
        ) {
          this.props.paginate(
            this.props.profile.orderDetails.pageSize + 1,
            SUFFIX
          );
        }
      }
    }, SCROLL_CHECK_INTERVAL);
  };
  onScroll = () => {
    return throttle(() => {
      if (window.pageYOffset > this.state.showStickyPortion) {
        this.setState({
          showStickyPortion: window.pageYOffset,
          stickyPortion: true
        });
      }
      if (this.state.showStickyPortion > window.pageYOffset) {
        this.setState({
          showStickyPortion: window.pageYOffset,
          stickyPortion: false
        });
      }
    }, 50);
  };
  showMoreProducts() {
    if (
      this.state.isSelected === 0 &&
      this.props.profile.orderDetails &&
      (this.props.profile.orderDetails.currentPage + 1) * 3 <
        this.props.profile.orderDetails.totalNoOfOrders
    ) {
      this.props.paginate(this.props.profile.orderDetails.pageSize + 1, SUFFIX);
    }
  }
  Review(productCode) {
    this.props.history.push(
      `${SEARCH_RESULTS_PAGE}p-${productCode.toLowerCase()}/${PRODUCT_REVIEWS_PATH_SUFFIX}`
    );
  }
  replaceItem(sellerorderno, paymentMethod, transactionId) {
    setDataLayerForMyAccountDirectCalls(ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL);
    if (sellerorderno) {
      let isCOD = false;
      let isPaypal = false;
      if (paymentMethod === CASH_ON_DELIVERY) {
        isCOD = true;
      }
      if (paymentMethod === PAY_PAL) {
        isPaypal = true;
      }
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${sellerorderno}${RETURN_LANDING}${RETURNS_REASON}`,
        state: {
          isCOD,
          isPaypal: isPaypal,
          authorizedRequest: true,
          transactionId: transactionId
        }
      });
    }
  }
  renderNoOrder() {
    return (
      <div className={styles.noOrder}>
        <div className={styles.noOderText}>
          You have not made any purchase yet
        </div>
        <div className={styles.continueShoppingButton}>
          <Button
            label="Continue Shopping"
            type="primary"
            width={170}
            height={40}
            onClick={() => this.renderToContinueShopping()}
          />
        </div>
      </div>
    );
  }
  reSendEmailForGiftCard = orderId => {
    if (this.props.reSendEmailForGiftCard) {
      this.props.reSendEmailForGiftCard(orderId);
    }
  };
  render() {
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const orderDetails = this.props.profile.orderDetails;
    if (this.props.profile.reSendEmailLoader) {
      return Loader();
    }
    if (userDetails) {
      userData = JSON.parse(userDetails);
    }
    let baseClassName = styles.base;
    if (this.state.stickyPortion && !UserAgent.checkUserAgentIsMobile()) {
      baseClassName = styles.translateBase;
    }
    if (UserAgent.checkUserAgentIsMobile()) {
      baseClassName = styles.base;
    }
    return (
      <div className={baseClassName}>
        <div className={MyAccountStyles.holder}>
          <DesktopOnly>
            <div
              className={
                this.state.stickyPortion
                  ? styles.stickyprofileMenuHolder
                  : styles.profileMenuHolder
              }
            >
              <ProfileMenu {...this.props} />
            </div>
          </DesktopOnly>
          <div className={styles.orderDetail}>
            <div className={styles.orderDetailsWithHolder}>
              <DesktopOnly>
                <div
                  className={
                    this.state.stickyPortion
                      ? styles.stickyTabHolder
                      : styles.tabHolder
                  }
                >
                  <TabHolder>
                    <TabData
                      width="40%"
                      label="Recent Orders "
                      selected={this.state.isSelected === 0}
                      selectItem={() => this.tabSelect(0)}
                    />
                    <TabData
                      width="40%"
                      label="My reviews "
                      selected={this.state.isSelected === 4}
                      selectItem={() => this.tabSelect(4)}
                    />
                    <TabData
                      width="40%"
                      label="Useful Links "
                      selected={this.state.isSelected === 3}
                      selectItem={() => this.tabSelect(3)}
                    />
                    <TabData
                      width="40%"
                      label="Alerts "
                      selected={this.state.isSelected === 1}
                      selectItem={() => this.tabSelect(1)}
                    />
                    <TabData
                      width="40%"
                      label="Coupons "
                      selected={this.state.isSelected === 2}
                      selectItem={() => this.tabSelect(2)}
                    />
                  </TabHolder>
                </div>
              </DesktopOnly>
              <div className={styles.dataHolder}>
                {this.state.isSelected === 1 && (
                  <div className={styles.alertsHolder}>
                    <UserAlertsContainer />
                  </div>
                )}
                {this.state.isSelected === 2 && (
                  <div className={styles.couponHolder}>
                    <UserCouponsContainer
                      displayToast={message => this.props.displayToast(message)}
                    />
                  </div>
                )}
                {this.state.isSelected === 3 && (
                  <div className={styles.useFulLinkHolder}>
                    <div className={styles.linkTabHolder}>
                      <a target="_blank" href="https://www.tatacliq.com/que">
                        <AccountUsefulLink>
                          <div className={styles.usefulLinkText}>
                            Que Magazine
                          </div>
                        </AccountUsefulLink>
                      </a>
                    </div>
                    <div className={styles.linkTabHolder}>
                      <AccountUsefulLink
                        onClick={() => this.redirectToHelp(HELP_URL)}
                      >
                        <div className={styles.usefulLinkText}>
                          Help & Services
                        </div>
                      </AccountUsefulLink>
                      <AccountUsefulLink
                        onClick={() => this.redirectToHelp(PRIVACY_POLICY_URL)}
                      >
                        <div className={styles.usefulLinkText}>
                          Privacy policy
                        </div>
                      </AccountUsefulLink>
                      <AccountUsefulLink>
                        <div className={styles.usefulLinkText}>
                          <div className={styles.callClass}>
                            <a href="tel:9029108282">Call Tata CLIQ Care</a>
                          </div>
                        </div>
                      </AccountUsefulLink>
                      <AccountUsefulLink
                        onClick={() =>
                          this.redirectToHelp(TERMS_AND_CONDITION_URL)
                        }
                      >
                        <div className={styles.usefulLinkText}>
                          Terms & Conditions
                        </div>
                      </AccountUsefulLink>
                      <AccountUsefulLink
                        onClick={() => this.redirectToHelp(ABOUT_US_URL)}
                      >
                        <div className={styles.usefulLinkText}>About us</div>
                      </AccountUsefulLink>
                      <AccountUsefulLink
                        onClick={() => this.redirectToHelp(FAQ_URL)}
                      >
                        <div className={styles.usefulLinkText}>FAQ</div>
                      </AccountUsefulLink>
                    </div>
                  </div>
                )}
                {this.state.isSelected === 4 && (
                  <div className={styles.reviewHolder}>
                    <UserReviewContainer />
                  </div>
                )}
                {this.state.isSelected === 0 &&
                orderDetails &&
                orderDetails.orderData
                  ? orderDetails.orderData.map((orderDetails, i) => {
                      let userName = `${
                        orderDetails.deliveryAddress.firstName
                      } ${orderDetails.deliveryAddress.lastName}`;

                      let deliveryAddress =
                        orderDetails.pickupPersonName ||
                        orderDetails.pickupPersonMobile
                          ? `${
                              orderDetails.pickupPersonName
                                ? orderDetails.pickupPersonName
                                : ""
                            }, ${
                              orderDetails.pickupPersonMobile
                                ? orderDetails.pickupPersonMobile
                                : ""
                            }`
                          : `${
                              orderDetails &&
                              orderDetails.billingAddress.addressLine1
                                ? orderDetails.billingAddress.addressLine1
                                : ""
                            } ${
                              orderDetails && orderDetails.billingAddress.town
                                ? orderDetails.billingAddress.town
                                : ""
                            } ${
                              orderDetails && orderDetails.billingAddress.state
                                ? orderDetails.billingAddress.state
                                : ""
                            } ${
                              orderDetails &&
                              orderDetails.billingAddress.postalcode
                                ? orderDetails.billingAddress.postalcode
                                : ""
                            }`;
                      let placeHolder =
                        orderDetails.pickupPersonName ||
                        orderDetails.pickupPersonMobile
                          ? "Pickup Details"
                          : "Delivered to";
                      let formattedDate = "";
                      if (orderDetails && orderDetails.orderDate) {
                        formattedDate = format(
                          orderDetails.orderDate,
                          dateFormat
                        );
                      }
                      return (
                        <div className={styles.order} key={i}>
                          <div className={styles.orderIdHolder}>
                            <OrderPlacedAndId
                              placedTime={formattedDate}
                              orderId={orderDetails && orderDetails.orderId}
                            />
                          </div>
                          {orderDetails &&
                            orderDetails.products &&
                            orderDetails.products.map((product, key) => {
                              let isOrderReturnable = false;
                              let isReturned = false;

                              if (
                                product &&
                                product.statusDisplayMsg &&
                                product.statusDisplayMsg
                                  .map(val => {
                                    return val.key;
                                  })
                                  .includes(RETURN)
                              ) {
                                isReturned = product.statusDisplayMsg
                                  .map(val => {
                                    return val.key;
                                  })
                                  .includes(RETURN);
                              }

                              each(
                                product && product.statusDisplayMsg,
                                orderStatus => {
                                  each(
                                    orderStatus &&
                                      orderStatus.value &&
                                      orderStatus.value.statusList,
                                    status => {
                                      if (
                                        status.responseCode === "DELIVERED" ||
                                        status.responseCode ===
                                          "ORDER_COLLECTED"
                                      ) {
                                        isOrderReturnable = true;
                                      }
                                    }
                                  );
                                }
                              );
                              return (
                                <div className={styles.orderDetailsHolder}>
                                  <OrderCard
                                    imageUrl={product.imageURL}
                                    hasProduct={product}
                                    isGiveAway={product.isGiveAway}
                                    price={product.price}
                                    quantity={true}
                                    productName={product.productName}
                                    productBrand={product.productBrand}
                                    isEgvOrder={orderDetails.isEgvOrder}
                                    resendAvailable={
                                      orderDetails.resendAvailable
                                    }
                                    reSendEmailForGiftCard={() =>
                                      this.reSendEmailForGiftCard(
                                        orderDetails.orderId
                                      )
                                    }
                                    egvCardNumber={orderDetails.egvCardNumber}
                                    onClick={() =>
                                      this.onClickImage(
                                        orderDetails.isEgvOrder,
                                        product.productcode
                                      )
                                    }
                                  />
                                  <DesktopOnly>
                                    <div className={styles.returnReview}>
                                      {product.isReturned && (
                                        <div
                                          className={styles.cancelProduct}
                                          onClick={() =>
                                            this.replaceItem(
                                              product.sellerorderno,
                                              orderDetails.paymentMethod,
                                              product.transactionId
                                            )
                                          }
                                        >
                                          {PRODUCT_RETURN}
                                        </div>
                                      )}

                                      <div className={styles.writeReviedButton}>
                                        <Button
                                          label={"Write a review"}
                                          width={147}
                                          height={36}
                                          borderColor={"#000000"}
                                          borderRadius={20}
                                          backgroundColor={"#ffffff"}
                                          onClick={val =>
                                            this.Review(product.productcode)
                                          }
                                          textStyle={{
                                            color: "#000000",
                                            fontSize: 14,
                                            fontFamily: "regular"
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </DesktopOnly>
                                </div>
                              );
                            })}
                          <MobileOnly>
                            <React.Fragment>
                              <PriceAndLink
                                onViewDetails={() =>
                                  this.onViewDetails(
                                    orderDetails && orderDetails.orderId
                                  )
                                }
                                isEgvOrder={orderDetails.isEgvOrder}
                                status={orderDetails.giftCardStatus}
                                price={
                                  orderDetails && orderDetails.totalOrderAmount
                                }
                              />

                              {!orderDetails.isEgvOrder &&
                                orderDetails &&
                                orderDetails.billingAddress && (
                                  <OrderDelivered
                                    deliveredAddress={deliveryAddress}
                                    orderDeliveryHeaderText={placeHolder}
                                    deliveredDate={
                                      orderDetails &&
                                      orderDetails.products &&
                                      orderDetails.products[0] &&
                                      orderDetails.products.length &&
                                      orderDetails.products[0].deliveryDate
                                    }
                                    soldBy={
                                      orderDetails &&
                                      orderDetails.products &&
                                      orderDetails.products[0] &&
                                      orderDetails.products.length &&
                                      orderDetails.products[0].sellerName
                                    }
                                  />
                                )}
                            </React.Fragment>
                          </MobileOnly>
                          <DesktopOnly>
                            <div className={styles.priceAndInfoHolder}>
                              <div className={styles.deliverLeftHolder}>
                                {!orderDetails.isEgvOrder &&
                                  orderDetails && (
                                    <OrderDelivered
                                      deliveredAddress1={
                                        orderDetails.pickupPersonName ||
                                        orderDetails.pickupPersonMobile
                                          ? `${
                                              orderDetails.pickupPersonName
                                                ? orderDetails.pickupPersonName
                                                : ""
                                            }${
                                              orderDetails.pickupPersonMobile
                                                ? `, ${
                                                    orderDetails.pickupPersonMobile
                                                  }`
                                                : ""
                                            }`
                                          : userName
                                      }
                                      deliveredAddress2={
                                        orderDetails &&
                                        orderDetails.billingAddress.addressLine1
                                          ? orderDetails.billingAddress
                                              .addressLine1
                                          : ""
                                      }
                                      deliveredAddress3={
                                        orderDetails &&
                                        orderDetails.billingAddress &&
                                        `${
                                          orderDetails &&
                                          orderDetails.billingAddress &&
                                          orderDetails.billingAddress.state
                                            ? orderDetails.billingAddress.state
                                            : ""
                                        }${
                                          orderDetails &&
                                          orderDetails.billingAddress &&
                                          orderDetails.billingAddress.town
                                            ? `, ${
                                                orderDetails.billingAddress.town
                                              }`
                                            : ""
                                        }${
                                          orderDetails &&
                                          orderDetails.billingAddress &&
                                          orderDetails.billingAddress.postalcode
                                            ? `, ${
                                                orderDetails.billingAddress
                                                  .postalcode
                                              }`
                                            : ""
                                        }`
                                      }
                                      orderDeliveryHeaderText={placeHolder}
                                      deliveredDate={
                                        orderDetails &&
                                        orderDetails.products &&
                                        orderDetails.products[0] &&
                                        orderDetails.products.length &&
                                        orderDetails.products[0].deliveryDate
                                      }
                                      soldBy={
                                        orderDetails &&
                                        orderDetails.products &&
                                        orderDetails.products[0] &&
                                        orderDetails.products.length &&
                                        orderDetails.products[0].sellerName
                                      }
                                      isShowDataHorizontal={true}
                                    >
                                      <div className={styles.priceRightHolder}>
                                        <PriceAndLink
                                          onViewDetails={() =>
                                            this.onViewDetails(
                                              orderDetails &&
                                                orderDetails.orderId
                                            )
                                          }
                                          isEgvOrder={orderDetails.isEgvOrder}
                                          status={orderDetails.giftCardStatus}
                                          price={
                                            orderDetails &&
                                            orderDetails.totalOrderAmount
                                          }
                                        />
                                      </div>
                                    </OrderDelivered>
                                  )}

                                {orderDetails.isEgvOrder &&
                                  orderDetails.giftCardStatus && (
                                    <div className={styles.statusHolder}>
                                      <div className={styles.priceHeader}>
                                        Status
                                      </div>
                                      <div className={styles.statusFailed}>
                                        {orderDetails.giftCardStatus}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </DesktopOnly>
                        </div>
                      );
                    })
                  : this.state.isSelected === 0 && this.renderNoOrder()}
                <DesktopOnly>
                  {this.state.isSelected === 0 &&
                    this.props.profile.orderDetails &&
                    (this.props.profile.orderDetails.currentPage + 1) * 3 <
                      this.props.profile.orderDetails.totalNoOfOrders && (
                      <ShowMoreButton
                        onClick={() => this.showMoreProducts()}
                        label={"Show Past Orders"}
                      />
                    )}
                </DesktopOnly>
              </div>
            </div>
          </div>
          <DesktopOnly>
            <div
              className={
                this.state.stickyPortion
                  ? styles.stickyuserProfile
                  : styles.userProfile
              }
            >
              <UserProfile
                image={userData && userData.imageUrl}
                userLogin={userData && userData.userName}
                loginType={userData && userData.loginType}
                onClick={() => this.renderToAccountSetting()}
                firstName={
                  userData &&
                  userData.firstName &&
                  userData.firstName.trim().charAt(0)
                }
                heading={
                  userData && userData.firstName && `${userData.firstName} `
                }
                lastName={
                  userData && userData.lastName && `${userData.lastName}`
                }
                userAddress={this.props.userAddress}
              />
            </div>
          </DesktopOnly>
        </div>
      </div>
    );
  }
}
AllOrderDetails.propTypes = {
  shouldCallHeaderContainer: PropTypes.bool,
  orderDetails: PropTypes.arrayOf(
    PropTypes.shape({
      orderDate: PropTypes.string,
      orderId: PropTypes.string,
      totalOrderAmount: PropTypes.string,
      billingAddress: PropTypes.arrayOf(
        PropTypes.shape({
          addressLine1: PropTypes.string,
          town: PropTypes.string,
          state: PropTypes.string,
          postalcode: PropTypes.string
        })
      )
    })
  )
};
AllOrderDetails.defaultProps = {
  shouldCallHeaderContainer: true
};
