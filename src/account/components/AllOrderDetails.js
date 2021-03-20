import React from "react";
import { RouterPropTypes } from "../../general/router-prop-types";
import styles from "./AllOrderDetails.css";
import OrderPlacedAndId from "./OrderPlacedAndId.js";
import OrderCard from "./OrderCard.js";
import OrderDelivered from "./OrderDelivered.js";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import format from "date-fns/format";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import * as Cookie from "../../lib/Cookie";
import UserCouponsContainer from "../containers/UserCouponsContainer";
import UserAlertsContainer from "../containers/UserAlertsContainer";
import { setDataLayerForMyAccountDirectCalls, ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL } from "../../lib/adobeUtils";
import ShowMoreButton from "../../general/components/ShowMoreButton";
import RetryPaymentIcon from "./img/payment_retry.svg";
import {
    MY_ACCOUNT,
    ORDER,
    ORDER_CODE,
    CUSTOMER_ACCESS_TOKEN,
    LOGGED_IN_USER_DETAILS,
    ORDER_HISTORY,
    MY_ACCOUNT_GIFT_CARD_PAGE,
    MY_ACCOUNT_PAGE,
    REQUESTING,
    HOME_ROUTER,
    RETURNS_PREFIX,
    RETURN_LANDING,
    RETURNS_REASON,
    TERMS_AND_CONDITION_URL,
    ABOUT_US_URL,
    PRIVACY_POLICY_URL,
    CASH_ON_DELIVERY,
    FAQ_URL,
    HELP_URL,
    SUCCESS,
    CHECKOUT_ROUTER,
    RETRY_PAYMENT_CART_ID,
    RETRY_PAYMENT_DETAILS,
    CNCTOHD,
    COSTUMER_CLIQ_CARE_ROUTE,
} from "../../lib/constants";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2.js";
import ProfileMenu from "./ProfileMenu";
import UserProfile from "./UserProfile";
import MyAccountStyles from "./MyAccountDesktop.css";
import throttle from "lodash.throttle";
import {
    setDataLayer,
    setDataLayerForCartDirectCalls,
    ADOBE_MY_ACCOUNT_TAB_CLICKED,
    ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING,
    setDataLayerForRatingAndReview,
    ADOBE_MY_ACCOUNT_ORDER_HISTORY,
    ADOBE_MY_ACCOUNT_WRITE_REVIEW,
    ADOBE_ORDER_DETAILS_LINK_CLICKED,
    ADOBE_HELP_SUPPORT_LINK_CLICKED,
    ADOBE_MY_ACCOUNT_HELP_AND_SUPPORT,
    SET_DATA_LAYER_RATING_STAR_CLICK,
} from "../../lib/adobeUtils";
import Icon from "../../xelpmoc-core/Icon";
import * as UserAgent from "../../lib/UserAgent.js";
import AccountUsefulLink from "./AccountUsefulLink.js";
import TabHolder from "./TabHolder";
import TabData from "./TabData";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest";
import RnREmptyRatingGreyStarComponent from "../../pdp/components/RnREmptyRatingGreyStarComponent";
import RatingAndIconComponent from "../../pdp/components/PdpBeautyDesktop/DescriptionSection/RatingAndIconComponent";
import PendingPublishedReviews from "./PendingPublishedReviews";
import reviewCheck from "./img/reviewCheck.svg";
const PRODUCT_RETURN = "Return";
const dateFormat = "DD MMM YYYY";
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
            showStickyPortion: 0,
            sortValue: "",
            sortLabel: "",
            disableRetry: false,
        };
        const currentYear = new Date().getFullYear();
        this.filterOptions = [
            { label: "Last 6 months", value: "" },
            { label: `${currentYear}`, value: currentYear },
            { label: `${currentYear - 1}`, value: currentYear - 1 },
            { label: `${currentYear - 2}`, value: currentYear - 2 },
        ];
    }

    changeFilterValues = val => {
        this.setState({
            sortValue: val.value,
            sortLabel: val.label,
        });
        this.props.clearOrderDetails();
        this.props.getAllOrdersDetails(val.value);
    };

    tabSelect(val) {
        this.setState({ isSelected: val });
        let selectedTab;
        if (val) {
            if (val === 0) {
                selectedTab = "Recent Orders";
            } else if (val === 1) {
                selectedTab = "Alerts";
            } else if (val === 2) {
                selectedTab = "Coupons";
            } else if (val === 3) {
                selectedTab = "Useful Links";
            } else if (val === 4) {
                selectedTab = "My review";
            }
        } else {
            selectedTab = "Recent Orders";
        }
        setDataLayer(ADOBE_MY_ACCOUNT_TAB_CLICKED, selectedTab);
    }

    onClickImage(isEgvOrder, productCode) {
        if (!isEgvOrder && productCode) {
            this.props.history.push(`/p-${productCode.toLowerCase()}`);
        } else if (isEgvOrder) {
            this.props.history.push(`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_GIFT_CARD_PAGE}`);
        }
    }

    onViewDetails(orderId) {
        setDataLayer(ADOBE_ORDER_DETAILS_LINK_CLICKED);
        this.props.history.push(`${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${orderId}`);
    }

    writeReview(productDetails) {
        setDataLayer(ADOBE_MY_ACCOUNT_WRITE_REVIEW);
        if (this.props.showRatingAndReviewModal) {
            this.props.showRatingAndReviewModal({ ...this.props, productDetails });
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

    componentWillReceiveProps(nextProps) {
        if (this.props.addReviewStatus !== nextProps.addReviewStatus && nextProps.addReviewStatus === SUCCESS) {
            if (this.props.clearOrderDetails && this.props.getAllOrdersDetails) {
                this.props.clearOrderDetails();
                this.props.getAllOrdersDetails();
            }
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

    onRatingChange = (val, productDetails) => {
        setDataLayerForRatingAndReview(SET_DATA_LAYER_RATING_STAR_CLICK, {
            rating: val,
            statusText: "",
        });
        if (productDetails.userRating !== val) {
            this.props.submitProductRatingByUser(val, {
                ...this.props,
                productDetails: productDetails,
            });
            if (!productDetails.userRating || productDetails.userRating === 0) {
                setTimeout(() => {
                    this.props.showRatingAndReviewModal({
                        ...this.props,
                        productDetails: productDetails,
                        rating: val,
                    });
                }, 3000);
            }
        }
    };

    redirectToHelp = url => {
        const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
        this.props.history.push(urlSuffix);
    };

    renderToContinueShopping() {
        setDataLayerForCartDirectCalls(ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING);
        this.props.history.push(HOME_ROUTER);
    }

    handleScroll = () => {
        return throttle(() => {
            if (
                this.state.isSelected === 0 &&
                this.props.profile.orderDetails &&
                (this.props.profile.orderDetails.currentPage + 1) * 3 < this.props.profile.orderDetails.totalNoOfOrders
            ) {
                const windowHeight =
                    "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
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
                if (windowBottom >= docHeight - OFFSET_BOTTOM && !this.props.profile.loading) {
                    this.props.paginate(this.props.profile.orderDetails.pageSize + 1, this.state.sortValue);
                }
            }
        }, SCROLL_CHECK_INTERVAL);
    };

    onScroll = () => {
        return throttle(() => {
            if (window.pageYOffset > this.state.showStickyPortion) {
                this.setState({
                    showStickyPortion: window.pageYOffset,
                    stickyPortion: true,
                });
            }
            if (this.state.showStickyPortion > window.pageYOffset) {
                this.setState({
                    showStickyPortion: window.pageYOffset,
                    stickyPortion: false,
                });
            }
        }, 50);
    };

    showMoreProducts() {
        if (
            this.state.isSelected === 0 &&
            this.props.profile.orderDetails &&
            (this.props.profile.orderDetails.currentPage + 1) * 3 < this.props.profile.orderDetails.totalNoOfOrders
        ) {
            this.props.paginate(this.props.profile.orderDetails.pageSize + 1, this.state.sortValue);
        }
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
                    transactionId: transactionId,
                },
            });
        }
    }

    renderNoOrder() {
        return (
            <React.Fragment>
                {this.props.profile.orderDetailsStatus != REQUESTING && (
                    <div className={styles.noOrder}>
                        <div className={styles.noOderText}>You have not made any purchase yet</div>
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
                )}
            </React.Fragment>
        );
    }

    reSendEmailForGiftCard = orderId => {
        if (this.props.reSendEmailForGiftCard) {
            this.props.reSendEmailForGiftCard(orderId);
        }
    };

    onClickRetryPayment = async (retryUrl, products, orderId) => {
        this.setState({ disableRetry: true }, async () => {
            let retryPaymentSplitUrl = retryUrl.split("?")[1].split("&");
            let guId = retryPaymentSplitUrl[0].split("value=")[1];
            let userId = retryPaymentSplitUrl[1].split("userId=")[1];
            if (this.props.retryPayment) {
                let retryPaymentResponse = await this.props.retryPayment(guId, userId);
                if (retryPaymentResponse && retryPaymentResponse.status === SUCCESS) {
                    let retryPaymentDetailsObject = {};
                    retryPaymentDetailsObject.retryPaymentDetails = retryPaymentResponse.retryPaymentDetails;
                    localStorage.setItem(RETRY_PAYMENT_CART_ID, JSON.stringify(guId));
                    localStorage.setItem(RETRY_PAYMENT_DETAILS, JSON.stringify(retryPaymentDetailsObject));
                    let failedOrderDetails,
                        retryproductData = [];
                    failedOrderDetails = await this.props.getRetryOrderDetails(orderId);
                    let productRequest =
                        products &&
                        products.map(async data => await this.props.getProductDescription(data.productcode));
                    await Promise.all(productRequest).then(responses =>
                        responses.forEach(res => {
                            let { status, productDescription } = res;
                            if (res && res.productDescription && status === SUCCESS) {
                                retryproductData.push(productDescription);
                            }
                        })
                    );
                    if (retryproductData.length > 0 && failedOrderDetails) {
                        this.props.history.push({
                            pathname: CHECKOUT_ROUTER,
                            state: {
                                isFromRetryUrl: true,
                                retryPaymentGuid: guId,
                                productDetails: retryproductData,
                                totalPriceData:
                                    failedOrderDetails &&
                                    failedOrderDetails.retryOrderDetails &&
                                    failedOrderDetails.retryOrderDetails.products,
                            },
                        });
                    }
                }
            }
        });
    };

    getDivWithWithoutBorder(productsLength, key) {
        if (productsLength === key + 1) {
            return styles.orderCardIndividual;
        } else {
            return styles.orderCardIndividualWithBorder;
        }
    }

    redirectToHelpPage(orderDetails) {
        setDataLayer(ADOBE_MY_ACCOUNT_HELP_AND_SUPPORT);
        setDataLayer(ADOBE_HELP_SUPPORT_LINK_CLICKED);
        const orderCode = orderDetails.orderId;
        const transactionId = orderDetails.products[0].transactionId;
        if (orderDetails) {
            if (orderDetails.products && orderDetails.products.length == 1) {
                const selectedOrderObj = {
                    orderCode,
                    transactionId,
                    product: orderDetails.products[0],
                };
                this.props.history.push({
                    pathname: `${MY_ACCOUNT_PAGE}${COSTUMER_CLIQ_CARE_ROUTE}`,
                    state: {
                        selectedOrderObj,
                    },
                });
            } else {
                this.props.history.push(`${MY_ACCOUNT_PAGE}${COSTUMER_CLIQ_CARE_ROUTE}`);
            }
        }
    }

    onClickCncToHd(orderId, transactionId) {
        let isCncToHdOrderDetails = "";
        const orderDetails = this.props.profile.orderDetails;
        let isCncToHdOrderDetailsByOrderId =
            orderDetails &&
            orderDetails.orderData.find(orderDetailsByOrderId => {
                return orderDetailsByOrderId.orderId === orderId;
            });
        isCncToHdOrderDetails =
            isCncToHdOrderDetailsByOrderId &&
            isCncToHdOrderDetailsByOrderId.products.find(products => {
                return products.transactionId === transactionId;
            });
        this.props.history.push({
            pathname: `${MY_ACCOUNT}${CNCTOHD}/?${ORDER_CODE}=${orderId}`,
            state: {
                orderDetails: isCncToHdOrderDetails,
                orderId: orderId,
            },
        });
    }

	submitRating = (rating, productCode, section) => {
		this.props.openRatingReviewModal({ productCode, rating, section, pageName: "Order History" });
		if(section === 2){
			this.props.getParametersEligibleToRate(productCode);
		}
		if(section === 3){
			this.props.getTitleSuggestions(productCode, rating);
		}
	};

	editRatingReview = (productCode, rating) => {
		this.props.openRatingReviewModal({ productCode, pageName: "Published Reviews", rating });
		this.props.getParametersEligibleToRate(productCode);
		setTimeout(() => {
			this.props.getUserProductReview(productCode);
		}, 1000);
	};

	showRatingReviewModal = (productCode, rating, pageName) => {
		this.props.openRatingReviewModal({ productCode, pageName, rating });
		this.props.getParametersEligibleToRate(productCode);
		setTimeout(() => {
			this.props.getUserProductReview(productCode);
		}, 1000);
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
                    <div
                        className={this.state.stickyPortion ? styles.stickyprofileMenuHolder : styles.profileMenuHolder}
                    >
                        <ProfileMenu {...this.props} />
                    </div>
                    <div className={styles.orderDetail}>
                        <div className={styles.orderDetailsWithHolder}>
                            <div className={this.state.stickyPortion ? styles.stickyTabHolder : styles.tabHolder}>
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
                            <React.Fragment>
                                {this.state.isSelected === 0 && (
                                    <div className={styles.dropDownHolder}>
                                        <div className={styles.dropDown}>
                                            <div className={styles.orderText} onClick={this.reviewSection}>
                                                {"Show orders from"}
                                            </div>
                                            <div className={styles.dropDownBox}>
                                                <SelectBoxMobile2
                                                    value={this.state.sortValue}
                                                    label={this.state.sortLabel}
                                                    onChange={changedValue => this.changeFilterValues(changedValue)}
                                                    options={this.filterOptions}
                                                    textStyle={{ fontSize: 14 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
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
                                            <a target="_blank" rel="noreferrer" href="https://www.tatacliq.com/que">
                                                <AccountUsefulLink>
                                                    <div className={styles.usefulLinkText}>Que Magazine</div>
                                                </AccountUsefulLink>
                                            </a>
                                        </div>
                                        <div className={styles.linkTabHolder}>
                                            <AccountUsefulLink onClick={() => this.redirectToHelp(HELP_URL)}>
                                                <div className={styles.usefulLinkText}>Help & Services</div>
                                            </AccountUsefulLink>
                                            <AccountUsefulLink onClick={() => this.redirectToHelp(PRIVACY_POLICY_URL)}>
                                                <div className={styles.usefulLinkText}>Privacy policy</div>
                                            </AccountUsefulLink>
                                            <AccountUsefulLink
                                                onClick={() => this.redirectToHelp(TERMS_AND_CONDITION_URL)}
                                            >
                                                <div className={styles.usefulLinkText}>Terms & Conditions</div>
                                            </AccountUsefulLink>
                                            <AccountUsefulLink onClick={() => this.redirectToHelp(ABOUT_US_URL)}>
                                                <div className={styles.usefulLinkText}>About us</div>
                                            </AccountUsefulLink>
                                            <AccountUsefulLink onClick={() => this.redirectToHelp(FAQ_URL)}>
                                                <div className={styles.usefulLinkText}>FAQ</div>
                                            </AccountUsefulLink>
                                        </div>
                                    </div>
                                )}
                                {this.state.isSelected === 4 && (
                                    <div className={styles.reviewHolder}>
										<PendingPublishedReviews
											getPendingReviews={this.props.getPendingReviews}
											pendingReviewsDetails={this.props.pendingReviewsDetails}
											getPublishedReviews={this.props.getPublishedReviews}
											publishedReviewsDetails={this.props.publishedReviewsDetails}
											submitRating={(rating, productCode, section) => this.submitRating(rating, productCode, section)}
											editRatingReview={(productcode, rating) => this.editRatingReview(productcode, rating)}
											openRatingReviewModal={true}
											showRatingReviewModal={(productcode, rating) => this.showRatingReviewModal(productcode, rating, "Pending Reviews")}
										/>
                                    </div>
                                )}

                                {this.state.isSelected === 0 && orderDetails && orderDetails.orderData
                                    ? orderDetails.orderData.map((orderDetails, i) => {
                                          let userName = `${orderDetails.deliveryAddress.firstName} ${orderDetails.deliveryAddress.lastName}`;

                                          let placeHolder =
                                              orderDetails.pickupPersonName || orderDetails.pickupPersonMobile
                                                  ? "Pickup Details"
                                                  : "Delivered to";
                                          let formattedDate = "";
                                          if (orderDetails && orderDetails.orderDate) {
                                              formattedDate = format(orderDetails.orderDate, dateFormat);
                                          }

                                          return (
                                              <div className={styles.order} key={i}>
                                                  <div className={styles.orderIdHolder}>
                                                      <OrderPlacedAndId
                                                          placedTime={formattedDate}
                                                          orderId={orderDetails && orderDetails.orderId}
                                                          pushDetails={this.props.history}
                                                          isEgvOrder={orderDetails.isEgvOrder}
                                                      />
                                                      {orderDetails && orderDetails.retryPaymentUrl && (
                                                          <div
                                                              style={{
                                                                  paddingBottom:
                                                                      orderDetails && orderDetails.retryPaymentUrl
                                                                          ? "20px"
                                                                          : "0px",
                                                                  marginBottom:
                                                                      orderDetails && orderDetails.retryPaymentUrl
                                                                          ? "35px"
                                                                          : "0px",
                                                              }}
                                                          >
                                                              <div className={styles.retryPayment}>
                                                                  <div className={styles.retryPaymentTitle}>
                                                                      <Icon image={RetryPaymentIcon} size={42} />
                                                                      <div className={styles.retryCallOutMessage}>
                                                                          {orderDetails.calloutMessage}
                                                                      </div>
                                                                  </div>
                                                                  <div className={styles.buttonHolderForRetryPayment}>
                                                                      <Button
                                                                          type="hollow"
                                                                          height={36}
                                                                          label="RETRY PAYMENT"
                                                                          color="#ff1744"
                                                                          textStyle={{
                                                                              color: "#212121",
                                                                              fontSize: 14,
                                                                          }}
                                                                          disabled={this.state.disableRetry}
                                                                          onClick={() =>
                                                                              this.onClickRetryPayment(
                                                                                  orderDetails.retryPaymentUrl,
                                                                                  orderDetails.products,
                                                                                  orderDetails && orderDetails.orderId
                                                                              )
                                                                          }
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      )}
                                                  </div>
                                                  <React.Fragment>
                                                      {orderDetails &&
                                                          orderDetails.products &&
                                                          orderDetails.products.map((product, key) => {
                                                              let productsDetails =
                                                                  orderDetails && orderDetails.products;
                                                              let productLength = productsDetails.length;

                                                              return (
                                                                  <div
                                                                      className={
                                                                          productLength === key + 1
                                                                              ? styles.orderDetailsHolder
                                                                              : styles.orderCardIndividualWithBorder
                                                                      }
                                                                      key={key}
                                                                  >
                                                                      <OrderCard
                                                                          orderBreachMessage={product.eddBreechMessage}
                                                                          isComingFromAllOrderPage={true}
                                                                          estimatedDeliveryDate={
                                                                              product.estimateddeliverydate
                                                                          }
                                                                          estimatedDeliveryDateWithTime={product.EDD}
                                                                          imageUrl={product.imageURL}
                                                                          hasProduct={product}
                                                                          isGiveAway={product.isGiveAway}
                                                                          price={product.price}
                                                                          quantity={true}
                                                                          productName={product.productName}
                                                                          productBrand={product.productBrand}
                                                                          isEgvOrder={orderDetails.isEgvOrder}
                                                                          resendAvailable={orderDetails.resendAvailable}
                                                                          reSendEmailForGiftCard={() =>
                                                                              this.reSendEmailForGiftCard(
                                                                                  orderDetails.orderId
                                                                              )
                                                                          }
                                                                          egvCardNumber={orderDetails.egvCardNumber}
                                                                          giftCardStatus={orderDetails.giftCardStatus}
                                                                          cartExpiryDate={orderDetails.cartExpiryDate}
                                                                          totalFinalPayableOrderAmount={
                                                                              orderDetails.totalFinalPayableOrderAmount
                                                                          }
                                                                          onClick={() =>
                                                                              this.onClickImage(
                                                                                  orderDetails.isEgvOrder,
                                                                                  product.productcode
                                                                              )
                                                                          }
                                                                          selectedDeliveryMode={
                                                                              product && product.deliveryMode
                                                                          }
                                                                          onClickCncToHd={() =>
                                                                              this.onClickCncToHd(
                                                                                  orderDetails.orderId,
                                                                                  product.transactionId
                                                                              )
                                                                          }
                                                                          isCncToHd={product && product.isCncToHd}
                                                                          isCNCToHDConverted={
                                                                              product && product.isCNCToHDConverted
                                                                          }
                                                                          orderStatusCode={
                                                                              product.orderStatusCode
                                                                                  ? product.orderStatusCode
                                                                                  : orderDetails.orderStatusCode
                                                                          }
                                                                          displayStatusName={
                                                                              product.displayStatusName
                                                                                  ? product.displayStatusName
                                                                                  : orderDetails.displayStatusName
                                                                          }
                                                                          clickAndCollect={
                                                                              orderDetails &&
                                                                              orderDetails.pickupPersonName
                                                                                  ? true
                                                                                  : false
                                                                          }
                                                                          deliveryDate={product.deliveryDate}
                                                                          calloutMessage={product.calloutMessage}
                                                                          showRightArrow="Y"
                                                                          orderId={orderDetails.orderId}
                                                                          history={this.props.history}
                                                                          transactionId={product.transactionId}
                                                                          orderCancelDate={product.orderCancelDate}
                                                                          idFromAllOrderDetails="Y"
                                                                          retryPaymentUrl={orderDetails.retryPaymentUrl}
                                                                          retryPayment={orderDetails.displayStatusName}
                                                                          displayToast={this.props.displayToast}
                                                                          logisticName={product.logisticName}
                                                                          trackingAWB={product.trackingAWB}
                                                                          exchangeDetails={product.exchangeDetails}
                                                                      />
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
                                                                          {product.productName != "Gift Card" &&
                                                                              (product.orderStatusCode ===
                                                                                  "CANCELLATION_INITIATED" ||
                                                                                  product.orderStatusCode ===
                                                                                      "ORDER_UNCOLLECTED") && (
                                                                                  <div
                                                                                      onClick={() =>
                                                                                          this.redirectToHelpPage(
                                                                                              orderDetails
                                                                                          )
                                                                                      }
                                                                                      className={styles.helpSupport}
                                                                                  >
                                                                                      Help & Support
                                                                                  </div>
                                                                              )}
                                                                          {product.productName != "Gift Card" &&
                                                                              !orderDetails.retryPaymentUrl &&
                                                                              (product.orderStatusCode ===
                                                                                  "DELIVERED" ||
                                                                                  product.orderStatusCode ===
                                                                                      "RETURN_CANCELLED_CUS" ||
                                                                                  product.orderStatusCode ===
                                                                                      "ORDER_COLLECTED") && (
                                                                                  <div className={styles.reviewHolder}>
                                                                                      <div
                                                                                          className={
                                                                                              styles.reviewHeading
                                                                                          }
                                                                                      >
                                                                                          {product.userRating && product.isRated ? "Your Rating" : "Rate this product"}
                                                                                      </div>
                                                                                      <div className={styles.ratingBar}>
																						  {product.userRating && product.isRated ? (
																							<RatingAndIconComponent
																								averageRating={product.userRating}
																								openRatingReviewModal={true}
																								showRatingReviewModal={() => this.showRatingReviewModal(product.productcode, product.userRating, "Order History")}
																							/>
																						  ) : (
																							<RnREmptyRatingGreyStarComponent
																								submitRating={(rating) => this.submitRating(rating, product.productcode)}
																							/>
																						  )}
                                                                                      </div>

																					  	{!product.isReviewed && product.isRated && product.userRating ? (
																							<React.Fragment>
																								{product.isParamConfigured && !product.isParamRatingPresent ? (
																								<div className={styles.writeReviewText}>
																									<span
																										className={styles.writeReviewTitle}
																										onClick={() => this.submitRating(product.userRating, product.productcode, 2)}
																									>
																										Rate Qualities
																									</span>
																								</div>
																								) : (
																								<div className={styles.writeReviewText}>
																									<span
																										className={styles.writeReviewTitle}
																										onClick={() => this.submitRating(product.userRating, product.productcode, 3)}
																									>
																										Write a Review
																									</span>
																								</div>
																								)}
																							</React.Fragment>
																						) : null}

																						{product.isRated && product.userRating && product.isReviewed ? (
																							<div className={styles.reviewSuccess}>
																								<span className={styles.reviewCheckContainer}><Icon image={reviewCheck} size={16} /></span>
																								<span>Rating and Review Submitted</span>
																							</div>
																						) : null}
                                                                                  </div>
                                                                              )}
                                                                      </div>
                                                                  </div>
                                                              );
                                                          })}
                                                      {!orderDetails.isEgvOrder &&
                                                          orderDetails &&
                                                          orderDetails.billingAddress && (
                                                              <div className={styles.priceAndInfoHolder}>
                                                                  <div className={styles.deliverLeftHolder}>
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
                                                                                            ? `, ${orderDetails.pickupPersonMobile}`
                                                                                            : ""
                                                                                    }`
                                                                                  : userName
                                                                          }
                                                                          deliveredAddress2={
                                                                              orderDetails &&
                                                                              orderDetails.deliveryAddress.addressLine1
                                                                                  ? orderDetails.deliveryAddress
                                                                                        .addressLine1
                                                                                  : ""
                                                                          }
                                                                          deliveredAddress3={
                                                                              orderDetails &&
                                                                              orderDetails.deliveryAddress &&
                                                                              `${
                                                                                  orderDetails &&
                                                                                  orderDetails.deliveryAddress &&
                                                                                  orderDetails.deliveryAddress.state
                                                                                      ? orderDetails.deliveryAddress
                                                                                            .state
                                                                                      : ""
                                                                              }${
                                                                                  orderDetails &&
                                                                                  orderDetails.deliveryAddress &&
                                                                                  orderDetails.deliveryAddress.town
                                                                                      ? `, ${orderDetails.deliveryAddress.town}`
                                                                                      : ""
                                                                              }${
                                                                                  orderDetails &&
                                                                                  orderDetails.deliveryAddress &&
                                                                                  orderDetails.deliveryAddress
                                                                                      .postalcode
                                                                                      ? `, ${orderDetails.deliveryAddress.postalcode}`
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
                                                                          isCancel={
                                                                              orderDetails &&
                                                                              orderDetails.products &&
                                                                              orderDetails.products[0] &&
                                                                              orderDetails.products.length &&
                                                                              orderDetails.products[0].cancel
                                                                          }
                                                                          retryPaymentUrl={
                                                                              orderDetails &&
                                                                              orderDetails.retryPaymentUrl
                                                                          }
                                                                          borderBottom={"#fff"}
                                                                      >
                                                                          <div className={styles.priceRightHolder} />
                                                                      </OrderDelivered>
                                                                  </div>
                                                              </div>
                                                          )}
                                                  </React.Fragment>
                                              </div>
                                          );
                                      })
                                    : this.state.isSelected === 0 && this.renderNoOrder()}
                                {this.state.isSelected === 0 &&
                                    this.props.profile.orderDetails &&
                                    (this.props.profile.orderDetails.currentPage + 1) * 3 <
                                        this.props.profile.orderDetails.totalNoOfOrders && (
                                        <ShowMoreButton
                                            onClick={() => this.showMoreProducts()}
                                            label={"Show Past Orders"}
                                        />
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className={this.state.stickyPortion ? styles.stickyuserProfile : styles.userProfile}>
                        <UserProfile
                            image={userData && userData.imageUrl}
                            userLogin={userData && userData.userName}
                            loginType={userData && userData.loginType}
                            onClick={() => this.renderToAccountSetting()}
                            firstName={userData && userData.firstName && userData.firstName.trim().charAt(0)}
                            heading={userData && userData.firstName && `${userData.firstName} `}
                            lastName={userData && userData.lastName && `${userData.lastName}`}
                            userAddress={this.props.userAddress}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
AllOrderDetails.propTypes = {
    shouldCallHeaderContainer: PropTypes.bool,
    setHeaderText: PropTypes.func,
    clearOrderDetails: PropTypes.func,
    getAllOrdersDetails: PropTypes.func,
    showRatingAndReviewModal: PropTypes.func,
    addReviewStatus: PropTypes.bool,
    hideModal: PropTypes.func,
    paginate: PropTypes.func,
    reSendEmailForGiftCard: PropTypes.func,
    retryPayment: PropTypes.func,
    getRetryOrderDetails: PropTypes.func,
    getProductDescription: PropTypes.func,
    displayToast: PropTypes.func,
    userAddress: PropTypes.object,
    profile: PropTypes.shape({
        loading: PropTypes.bool,
        reSendEmailLoader: PropTypes.bool,
        orderDetailsStatus: PropTypes.string,
        orderDetails: PropTypes.shape({
            totalNoOfOrders: PropTypes.number,
            pageSize: PropTypes.number,
            currentPage: PropTypes.number,
            pickupPersonName: PropTypes.string,
            pickupPersonMobile: PropTypes.string,
            orderDate: PropTypes.string,
            orderId: PropTypes.number,
            isEgvOrder: PropTypes.string,
            retryPaymentUrl: PropTypes.string,
            calloutMessage: PropTypes.string,
            resendAvailable: PropTypes.string,
            egvCardNumber: PropTypes.string,
            giftCardStatus: PropTypes.string,
            cartExpiryDate: PropTypes.string,
            totalFinalPayableOrderAmount: PropTypes.number,
            billingAddress: PropTypes.bool,
            paymentMethod: PropTypes.string,
            displayStatusName: PropTypes.string,
            orderStatusCode: PropTypes.string,
            products: PropTypes.arrayOf(),
            deliveryAddress: PropTypes.shape({
                firstName: PropTypes.string,
                lastName: PropTypes.string,
                addressLine1: PropTypes.string,
                town: PropTypes.string,
                state: PropTypes.string,
                postalcode: PropTypes.string,
            }),
            orderData: PropTypes.arrayOf(PropTypes.shape({})),
        }),
    }),
    submitProductRatingByUser: PropTypes.func,
    orderDetails: PropTypes.arrayOf(
        PropTypes.shape({
            orderDate: PropTypes.string,
            orderId: PropTypes.string,
            totalOrderAmount: PropTypes.string,
            deliveryAddress: PropTypes.arrayOf(
                PropTypes.shape({
                    addressLine1: PropTypes.string,
                    town: PropTypes.string,
                    state: PropTypes.string,
                    postalcode: PropTypes.string,
                })
            ),
        })
    ),
    ...RouterPropTypes,
};
AllOrderDetails.defaultProps = {
    shouldCallHeaderContainer: true,
};
