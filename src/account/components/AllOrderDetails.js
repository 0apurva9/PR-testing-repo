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
import UserReviewContainer from "../containers/UserReviewContainer";
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
  TERMS_AND_CONDITION_URL,
  ABOUT_US_URL,
  PRIVACY_POLICY_URL,
  FAQ_URL,
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
const dateFormat = "DD MMM YYYY";
const SUFFIX = `&isTextSearch=false&isFilter=false`;
const SCROLL_CHECK_INTERVAL = 500;
const OFFSET_BOTTOM = 800;
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
                          : "Delivery address";
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
                            orderDetails.products && (
                              <OrderCard
                                imageUrl={
                                  orderDetails &&
                                  orderDetails.products &&
                                  orderDetails.products[0].imageURL
                                }
                                hasProduct={
                                  orderDetails && orderDetails.products
                                }
                                isGiveAway={
                                  orderDetails &&
                                  orderDetails.products &&
                                  orderDetails.products[0] &&
                                  orderDetails.products[0].isGiveAway
                                }
                                price={
                                  orderDetails &&
                                  orderDetails.products &&
                                  orderDetails.products[0] &&
                                  orderDetails.products[0].price
                                }
                                discountPrice={""}
                                productName={
                                  orderDetails &&
                                  orderDetails.products &&
                                  orderDetails.products[0] &&
                                  orderDetails.products[0].productName
                                }
                                productBrand={
                                  orderDetails &&
                                  orderDetails.products &&
                                  orderDetails.products[0] &&
                                  orderDetails.products[0].productBrand
                                }
                                isEgvOrder={orderDetails.isEgvOrder}
                                resendAvailable={orderDetails.resendAvailable}
                                reSendEmailForGiftCard={() =>
                                  this.reSendEmailForGiftCard(
                                    orderDetails.orderId
                                  )
                                }
                                egvCardNumber={orderDetails.egvCardNumber}
                                onClick={() =>
                                  this.onClickImage(
                                    orderDetails.isEgvOrder,
                                    orderDetails &&
                                      orderDetails.products &&
                                      orderDetails.products[0] &&
                                      orderDetails.products.length &&
                                      orderDetails.products[0].productcode
                                  )
                                }
                              />
                            )}
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
                        label={"Show more orders"}
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
