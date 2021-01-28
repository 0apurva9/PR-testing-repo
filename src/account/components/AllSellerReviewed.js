import React from "react";
import { RouterPropTypes } from "../../general/router-prop-types";
import styles from "./AllSellerDetails.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import format from "date-fns/format";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import myAccountStyles from "./MyAccountDesktop.css";
import * as Cookie from "../../lib/Cookie";
import TextWithButton from "./TextwithButton.js";
import StarRating from "../../general/components/StarRating";
import CheckBox from "../../general/components/CheckBox.js";
import * as UserAgent from "../../lib/UserAgent.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import ProfileMenu from "./ProfileMenu";
import UserProfile from "./UserProfile";
import MobileOnly from "../../general/components/MobileOnly";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2.js";
import AccountUsefulLink from "./AccountUsefulLink.js";
import UserCouponsContainer from "../containers/UserCouponsContainer";
import UserAlertsContainer from "../containers/UserAlertsContainer";
import RetryPaymentIcon from "./img/payment_retry.svg";
import { Redirect } from "react-router-dom";
import {
    CUSTOMER_ACCESS_TOKEN,
    LOGGED_IN_USER_DETAILS,
    REQUESTING,
    FAQ_URL,
    HELP_URL,
    TERMS_AND_CONDITION_URL,
    ABOUT_US_URL,
    PRIVACY_POLICY_URL,
    LOGIN_PATH,
} from "../../lib/constants";
import each from "lodash.foreach";
import OrderCard from "./OrderCard.js";
import OrderDelivered from "./OrderDelivered.js";
import OrderPlacedAndId from "./OrderPlacedAndId.js";
import Icon from "../../xelpmoc-core/Icon";
import UserReviewContainer from "../containers/UserReviewContainer";
import ShowMoreButton from "../../general/components/ShowMoreButton";

import throttle from "lodash.throttle";

import SellerCard from "./SellerCard";

const dateFormat = "DD MMM YYYY";
const SCROLL_CHECK_INTERVAL = 500;
const OFFSET_BOTTOM = 800;
const RETURN = "RETURN";
const PRODUCT_RETURN = "Return";
const Loader = () => {
    return (
        <div>
            <SecondaryLoader />
        </div>
    );
};

const reviewRemoveReasonField = [
    {
        Label: "The seller resolved the problem",
        Value: "The seller resolved the problem",
    },
    {
        Label: "Feedback was provided for wrong seller",
        Value: "Feedback was provided for wrong seller",
    },
    {
        Label: "I didn't use the product as per instructions",
        Value: "I didn't use the product as per instructions",
    },
    {
        Label: "I provided incorrect rating",
        Value: "I provided incorrect rating",
    },
    { Label: "Others", Value: "Others" },
];

export default class AllSellerReviewed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOrder: null,
            sortValue: "",
            sortLabel: "",
            comment: "",
            placeholder: "Add comments (optional)",
            deliveredItemStatus: null,
            rating: null,
            page: "Edit Feedback",
            redirectPage: "Back",
            showReasonModal: false,
            reviewRemoveReason: null,
            stickyPortion: false,
            showStickyPortion: 0,
        };
        this.params = null;
    }

    componentDidMount() {
        if (this.props.shouldCallHeaderContainer) {
            this.props.setHeaderText("Seller Rating");
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
            this.props.getAllSellersReviewDetails();
        }
    }

    onSellerReviewRemove = params => {
        this.setState({ removeFeedBaak: params });
        this.setState({ showReasonModal: true });
    };

    componentWillUnmount() {
        window.removeEventListener("scroll", this.throttledScroll);
        window.removeEventListener("scroll", this.onScroll);
    }

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

    askReasonToRemoveSellerReview = () => {
        let reviewRemoveReason = {
            reviewRemoveReason: this.state.reviewRemoveReason,
        };
        if (!this.state.reviewRemoveReason) {
            this.props.displayToast("Please select reason for removing the feedback");
            return;
        }
        let finalParams = Object.assign({}, this.state.removeFeedBaak, reviewRemoveReason);
        // let reviewRemoveReason = this.state.reviewRemoveReason;
        this.props.removeSellerReviewByUser(finalParams);
        this.closeModal();
        this.setState({ reviewRemoveReason: null });
        this.props.sellerReviewSubmitRemovalPopup();
    };

    handleScroll = () => {
        return throttle(() => {
            if (
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

    renderNoOrder() {
        return (
            <React.Fragment>
                {this.props.profile.orderDetailsStatus !== REQUESTING && (
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

    closeModal = () => {
        if (this.state.showReasonModal === true) {
            this.setState({ showReasonModal: false });
        }
    };

    pageName = () => {
        if (this.state.page === "Submit Feedback") {
            this.setState({ page: "Edit Feedback" });
            this.setState({ redirectPage: "Back" });
        } else {
            this.setState({ page: "Submit Feedback" });
            this.setState({ redirectPage: "Back" });
        }
    };

    onItemStatusChange(selectedStatus) {
        this.setState({ reviewRemoveReason: selectedStatus.Value });
    }

    navigateToLogin() {
        const url = this.props.location.pathname;
        this.props.setUrlToRedirectToAfterAuth(url);
        return <Redirect to={LOGIN_PATH} />;
    }

    render() {
        let url = window.location.href;
        var customerId = url
            .split("customerId=")
            .pop()
            .split("/")[0];
        if (this.state.showReasonModal === true) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        let { reviewRemoveReason } = this.state;
        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        let userData;
        if (userDetails) {
            userData = JSON.parse(userDetails);
        }
        if (!userDetails || !customerCookie) {
            return this.navigateToLogin();
        }
        if (userData && userData.customerId !== customerId) {
            return this.navigateToLogin();
        }
        if (userDetails) {
            userData = JSON.parse(userDetails);
        }
        const sellerReviewDetails = this.props.profile.sellerReviewDetails;
        if (this.props.profile.reSendEmailLoader) {
            return Loader();
        }
        const orderDetails = this.props.profile.orderDetails;
        let baseClassName = styles.base;
        if (this.state.stickyPortion && !UserAgent.checkUserAgentIsMobile()) {
            baseClassName = styles.translateBase;
        }
        if (UserAgent.checkUserAgentIsMobile()) {
            baseClassName = styles.base;
        }

        return (
            <React.Fragment>
                <div className={baseClassName}>
                    <div className={myAccountStyles.holder}>
                        <DesktopOnly>
                            <div
                                className={
                                    this.state.stickyPortion ? styles.stickyprofileMenuHolder : styles.profileMenuHolder
                                }
                            >
                                <ProfileMenu {...this.props} />
                            </div>
                        </DesktopOnly>
                        <div className={styles.orderDetail}>
                            <div className={styles.orderDetailsWithHolder}>
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
                                                <AccountUsefulLink
                                                    onClick={() => this.redirectToHelp(PRIVACY_POLICY_URL)}
                                                >
                                                    <div className={styles.usefulLinkText}>Privacy policy</div>
                                                </AccountUsefulLink>
                                                <MobileOnly>
                                                    <AccountUsefulLink>
                                                        <div className={styles.usefulLinkText}>
                                                            <div className={styles.callClass}>
                                                                <a href="tel:9029108282">Call Tata CLIQ Care</a>
                                                            </div>
                                                        </div>
                                                    </AccountUsefulLink>
                                                </MobileOnly>
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
                                            <UserReviewContainer />
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
                                                                    <div
                                                                        className={styles.buttonHolderForRetryPayment}
                                                                    >
                                                                        <Button
                                                                            type="hollow"
                                                                            height={36}
                                                                            label="RETRY PAYMENT"
                                                                            color="#ff1744"
                                                                            textStyle={{
                                                                                color: "#212121",
                                                                                fontSize: 14,
                                                                            }}
                                                                            onClick={() =>
                                                                                this.onClickRetryPayment(
                                                                                    orderDetails.retryPaymentUrl
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

                                                                if (
                                                                    product &&
                                                                    product.statusDisplayMsg &&
                                                                    product.statusDisplayMsg
                                                                        .map(val => {
                                                                            return val.key;
                                                                        })
                                                                        .includes(RETURN)
                                                                ) {
                                                                    // isReturned = product.statusDisplayMsg
                                                                    //     .map(val => {
                                                                    //         return val.key;
                                                                    //     })
                                                                    //     .includes(RETURN);
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
                                                                                    status.responseCode ===
                                                                                    "DELIVERED" ||
                                                                                    status.responseCode ===
                                                                                    "ORDER_COLLECTED"
                                                                                ) {
                                                                                    // isOrderReturnable = true;
                                                                                }
                                                                            }
                                                                        );
                                                                    }
                                                                );
                                                                let productsDetails =
                                                                    orderDetails && orderDetails.products;
                                                                let productLength = productsDetails.length;

                                                                return (
                                                                    <div
                                                                    key={`key${key}`}
                                                                        className={
                                                                            productLength === key + 1
                                                                                ? styles.orderDetailsHolder
                                                                                : styles.orderCardIndividualWithBorder
                                                                        }
                                                                    >
                                                                        <OrderCard
                                                                            estimatedDeliveryDate={
                                                                                product.estimateddeliverydate
                                                                            }
                                                                            imageUrl={product.imageURL}
                                                                            hasProduct={product}
                                                                            isGiveAway={product.isGiveAway}
                                                                            price={product.price}
                                                                            quantity={true}
                                                                            //statusDisplay={product.statusDisplay}
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
                                                                            giftCardStatus={
                                                                                orderDetails.giftCardStatus
                                                                            }
                                                                            cartExpiryDate={
                                                                                orderDetails.cartExpiryDate
                                                                            }
                                                                            totalFinalPayableOrderAmount={
                                                                                orderDetails.totalFinalPayableOrderAmount
                                                                            }
                                                                            onClick={() =>
                                                                                this.onClickImage(
                                                                                    orderDetails.isEgvOrder,
                                                                                    product.productcode
                                                                                )
                                                                            }
                                                                            orderStatusCode={product.orderStatusCode}
                                                                            displayStatusName={
                                                                                product.displayStatusName
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
                                                                            retryPaymentUrl={
                                                                                orderDetails.retryPaymentUrl
                                                                            }
                                                                            retryPayment={
                                                                                orderDetails.displayStatusName
                                                                            }
                                                                            displayToast={this.props.displayToast}
                                                                            logisticName={product.logisticName}
                                                                            trackingAWB={product.trackingAWB}
                                                                        />
                                                                        <DesktopOnly>
                                                                            <div className={styles.returnReview}>
                                                                                {product.isReturned && (
                                                                                    <div
                                                                                        className={
                                                                                            styles.cancelProduct
                                                                                        }
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
                                                                                                this.redirectToHelp(
                                                                                                    HELP_URL
                                                                                                )
                                                                                            }
                                                                                            className={
                                                                                                styles.helpSupport
                                                                                            }
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
                                                                                        <div
                                                                                            className={
                                                                                                styles.reviewHolder
                                                                                            }
                                                                                        >
                                                                                            <div
                                                                                                className={
                                                                                                    styles.boxReview
                                                                                                }
                                                                                            >
                                                                                                <div
                                                                                                    className={
                                                                                                        styles.reviewText
                                                                                                    }
                                                                                                    onClick={() =>
                                                                                                        this.writeReview(
                                                                                                            product.productcode
                                                                                                        )
                                                                                                    }
                                                                                                >
                                                                                                    WRITE A REVIEW
                                                                                                  </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                            </div>
                                                                        </DesktopOnly>
                                                                    </div>
                                                                );
                                                            })}
                                                        <DesktopOnly>
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
                                                                                        orderDetails.deliveryAddress
                                                                                            .addressLine1
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
                                                                                        orderDetails.deliveryAddress
                                                                                            .state
                                                                                        ? orderDetails
                                                                                            .deliveryAddress
                                                                                            .state
                                                                                        : ""
                                                                                    }${
                                                                                    orderDetails &&
                                                                                        orderDetails.deliveryAddress &&
                                                                                        orderDetails.deliveryAddress
                                                                                            .town
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
                                                                                    orderDetails.products[0]
                                                                                        .deliveryDate
                                                                                }
                                                                                soldBy={
                                                                                    orderDetails &&
                                                                                    orderDetails.products &&
                                                                                    orderDetails.products[0] &&
                                                                                    orderDetails.products.length &&
                                                                                    orderDetails.products[0]
                                                                                        .sellerName
                                                                                }
                                                                                isShowDataHorizontal={true}
                                                                                isCancel={
                                                                                    orderDetails &&
                                                                                    orderDetails.products &&
                                                                                    orderDetails.products[0] &&
                                                                                    orderDetails.products.length &&
                                                                                    orderDetails.products[0].cancel
                                                                                }
                                                                                borderBottom={"#fff"}
                                                                            >
                                                                                <div
                                                                                    className={
                                                                                        styles.priceRightHolder
                                                                                    }
                                                                                />
                                                                            </OrderDelivered>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                        </DesktopOnly>
                                                    </React.Fragment>
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
                                <div className={styles.content} onClick={() => this.pageName()}>
                                    <TextWithButton
                                        heading={this.state.page}
                                        buttonLabel={this.state.redirectPage}
                                        history={this.props.history}
                                    />
                                </div>
                                <br />
                                {sellerReviewDetails && sellerReviewDetails.reviewRatingInfo
                                    ? sellerReviewDetails.reviewRatingInfo.map((seller, i) => {
                                        let {
                                            productName,
                                            orderDate,
                                            orderId,
                                            suborderId,
                                            transactionId,
                                            sellerName,
                                            imageURL,
                                            customerSellerRating,
                                            customerComment,
                                            itemDeliveredWithInCommunicatedTime,
                                            itemDeliveredAsDescribed,
                                        } = seller;
                                        let params = {
                                            orderId: orderId,
                                            suborderId: suborderId,
                                            transactionId: transactionId,
                                            customerSellerRating: customerSellerRating,
                                            itemDeliveredAsDescribed: itemDeliveredAsDescribed,
                                            itemDeliveredWithInCommunicatedTime: itemDeliveredWithInCommunicatedTime,
                                            customerComment: customerComment,
                                            customerReview: "REMOVE",
                                        };
                                        this.params = params;

                                        return (
                                            <div className={styles.order} key={transactionId}>
                                                <SellerCard
                                                    title={productName}
                                                    placedTime={orderDate ? format(orderDate, dateFormat) : ""}
                                                    orderNumber={orderId}
                                                    orderFullfilledBy={sellerName}
                                                    productImage={imageURL}
                                                    pathURL={this.props.location.pathname}
                                                />
                                                <div
                                                    className={styles.orderIdHolder}
                                                    style={{
                                                        marginBottom: `${15}px`,
                                                        borderBottom: `${1}px solid #efefef`,
                                                        paddingBottom: `${15}px`,
                                                    }}
                                                />
                                                <div className={styles.ratingReviewContainer}>
                                                    <div className={styles.ratingHeaderReview}>
                                                        You Rated the Seller
                                                      </div>
                                                    <div className={styles.ratingBar}>
                                                        <StarRating averageRating={customerSellerRating} />
                                                    </div>
                                                </div>
                                                <div
                                                    className={styles.orderIdHolder}
                                                    style={{
                                                        marginBottom: `${15}px`,
                                                        borderBottom: `${1}px solid #efefef`,
                                                        paddingBottom: `${15}px`,
                                                    }}
                                                />

                                                <div className={styles.describedItem}>
                                                    <div className={styles.itemDeliveredHeaderReview}>
                                                        <span>Item delivered as described</span>
                                                        <div className={styles.iteDeliveredAsDescribed}>
                                                            <div
                                                                className={styles.radioBtnWrapper}
                                                                key={i}
                                                                value={itemDeliveredAsDescribed}
                                                            >
                                                                <div className={styles.radioBtnContent}>
                                                                    <CheckBox selected={true} />
                                                                </div>
                                                                {itemDeliveredAsDescribed}
                                                            </div>
                                                        </div>
                                                        <span>Item delivered as on communicated time</span>
                                                        <div className={styles.iteDeliveredAsDescribed}>
                                                            <div
                                                                className={styles.radioBtnWrapper}
                                                                key={i}
                                                                value={itemDeliveredWithInCommunicatedTime}
                                                            >
                                                                <div className={styles.radioBtnContent}>
                                                                    <CheckBox selected={true} />
                                                                </div>
                                                                {itemDeliveredWithInCommunicatedTime}
                                                            </div>
                                                        </div>

                                                        <div className={styles.commentDiv}>
                                                            <div className={styles.comment}>{customerComment}</div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.itemDescribed} />
                                                    <div className={styles.removeFeedbackButton}>
                                                        <div className={styles.submitButtonDiv}>
                                                            <button
                                                                className={styles.submitButton}
                                                                onClick={() => this.onSellerReviewRemove(params)}
                                                            >
                                                                {" "}
                                                                Remove Feedback
                                                              </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                    : this.renderNoOrder()}
                            </div>
                        </div>

                        <DesktopOnly>
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
                        </DesktopOnly>
                    </div>
                </div>
                {this.state.showReasonModal && (
                    <React.Fragment>
                        <div className={styles.reasonModal}>
                            <div className={styles.modalContent}>
                                <div className={styles.selectReasonRemoveFeedback}>
                                    Select the reason for removing your feedback
                                </div>
                                <div
                                    className={styles.orderIdHolder}
                                    style={{
                                        marginBottom: `${15}px`,
                                        borderBottom: `${1}px solid #efefef`,
                                        paddingBottom: `${15}px`,
                                    }}
                                />
                                <div className={styles.options}>
                                    {reviewRemoveReasonField &&
                                        reviewRemoveReasonField.map((item, i) => {
                                            return (
                                                <div key={`key${i}`}>
                                                    <div
                                                        className={styles.radioBtnWrapperRemove}
                                                        key={i}
                                                        value={item.Value}
                                                        onClick={() => this.onItemStatusChange(item)}
                                                    >
                                                        <div className={styles.radioBtnContent}> {item.Label}</div>
                                                        <div className={styles.checkboxReviewReason}>
                                                            <CheckBox selected={reviewRemoveReason === item.Value} />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={styles.orderIdHolder}
                                                        style={{
                                                            marginBottom: `${15}px`,
                                                            borderBottom: `${1}px solid #efefef`,
                                                            paddingBottom: `${15}px`,
                                                        }}
                                                    />
                                                </div>
                                            );
                                        })}
                                </div>
                                <div className={styles.feedbackRemoveButtonDiv}>
                                    <div className={styles.removeButtonDiv}>
                                        <button className={styles.removeButton} onClick={() => this.closeModal()}>
                                            {" "}
                                            Cancel
                                        </button>
                                    </div>
                                    <div className={styles.submitButtonDiv}>
                                        <button
                                            className={styles.submitButton}
                                            onClick={() => this.askReasonToRemoveSellerReview(this.params)}
                                        >
                                            {" "}
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

AllSellerReviewed.propTypes = {
    shouldCallHeaderContainer: PropTypes.bool,
    setHeaderText: PropTypes.func,
    getAllSellersReviewDetails: PropTypes.func,
    displayToast: PropTypes.func,
    removeSellerReviewByUser: PropTypes.func,
    sellerReviewSubmitRemovalPopup: PropTypes.func,
    setUrlToRedirectToAfterAuth: PropTypes.func,
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
                    postalcode: PropTypes.string,
                })
            ),
        })
    ),
    ...RouterPropTypes
};
AllSellerReviewed.defaultProps = {
    shouldCallHeaderContainer: true,
};
