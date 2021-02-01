import React from "react";
import { RouterPropTypes } from "../../general/router-prop-types";
import styles from "./AllSellerDetails.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import format from "date-fns/format";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import { Redirect } from "react-router-dom";
import * as Cookie from "../../lib/Cookie";
import TextWithButton from "./TextwithButton.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import ProfileMenu from "./ProfileMenu";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2.js";
import myAccountStyles from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";
import * as UserAgent from "../../lib/UserAgent.js";
import throttle from "lodash.throttle";
import {
    CUSTOMER_ACCESS_TOKEN,
    LOGGED_IN_USER_DETAILS,
    LOGIN_PATH,
    REQUESTING,
    SUCCESS,
    CHECKOUT_ROUTER,
} from "../../lib/constants";

import { HOME_ROUTER, RETRY_PAYMENT_CART_ID, RETRY_PAYMENT_DETAILS } from "../../lib/constants";

import SellerCard from "./SellerCard";
const dateFormat = "DD MMM YYYY";

const Loader = () => {
    return (
        <div>
            <SecondaryLoader />
        </div>
    );
};

export default class AllSellerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOrder: null,
            sortValue: "",
            sortLabel: "",
            deliveredItemStatus: null,
            page: "Submit Feedback",
            redirectPage: "Edit FeedBack",
            isSelected: 6,
            stickyPortion: false,
            showStickyPortion: 0,
        };
    }

    pageName = () => {
        if (this.state.page === "Submit Feedback") {
            this.setState({ page: "Edit Feedback" });
            this.setState({ redirectPage: "Back" });
        } else {
            this.setState({ page: "Submit Feedback" });
            this.setState({ redirectPage: "Edit FeedBack" });
        }
    };

    tabSelect(val) {
        this.setState({ isSelected: val });
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
            this.props.getAllSellerDetails();
            this.props.getAllOrdersDetails();
        }
    }

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

    componentDidUpdate() {
        if (this.props.shouldCallHeaderContainer) {
            this.props.setHeaderText("Seller Rating");
        }
        if (this.state.resetRating === true) {
            this.setState({ resetRating: false });
        }
    }

    renderToContinueShopping() {
        this.props.history.push(HOME_ROUTER);
    }

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

    navigateToLogin() {
        const url = this.props.location.pathname;
        this.props.setUrlToRedirectToAfterAuth(url);
        return <Redirect to={LOGIN_PATH} />;
    }

    reSendEmailForGiftCard = orderId => {
        if (this.props.reSendEmailForGiftCard) {
            this.props.reSendEmailForGiftCard(orderId);
        }
    };

    onClickRetryPayment = async retryUrl => {
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
                this.props.history.push({
                    pathname: CHECKOUT_ROUTER,
                    state: {
                        isFromRetryUrl: true,
                        retryPaymentGuid: guId,
                    },
                });
            }
        }
    };

    getDivWithWithoutBorder(productsLength, i) {
        if (productsLength === i + 1) {
            return styles.orderCardIndividual;
        } else {
            return styles.orderCardIndividualWithBorder;
        }
    }

    onSellerReviewSubmit = (sellerData, reviewData) => {
        localStorage.setItem("rating", reviewData.rating);
        localStorage.setItem("sellerName", sellerData.sellerName);
        let { orderId, suborderId, transactionId } = sellerData;
        let { rating, isItemDeliveredAsDescribed, isItemDeliveredInCommunicatedTime, comment } = reviewData;

        if (rating == null) {
            this.props.displayToast("Please rate your seller");
            return;
        } else if (isItemDeliveredAsDescribed == null) {
            this.props.displayToast("Please select product delivered as described");
            return;
        } else if (isItemDeliveredInCommunicatedTime == null) {
            this.props.displayToast("Please select product delivered as on communicated time");
            return;
        }
        let params = {
            orderId: orderId,
            suborderId: suborderId,
            transactionId: transactionId,
            customerSellerRating: rating.toFixed(1),
            itemDeliveredAsDescribed: isItemDeliveredAsDescribed,
            itemDeliveredWithInCommunicatedTime: isItemDeliveredInCommunicatedTime,
            customerComment: comment,
            customerReview: "REVIEW",
        };
        this.props.submitSellerReviewByUser(params);
        this.props.sellerReviewSubmitRemovalPopup();
    };

    render() {
        let url = window.location.href;
        var customerId = url
            .split("customerId=")
            .pop()
            .split("/")[0];
        let userData;
        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        if (!userDetails || !customerCookie) {
            return this.navigateToLogin();
        }
        if (userDetails) {
            userData = JSON.parse(userDetails);
        }

        if (userData && userData.customerId !== customerId) {
            return this.navigateToLogin();
        }
        const sellerDetails = this.props.profile.sellerDetails;
        if (this.props.profile.reSendEmailLoader) {
            return Loader();
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

                            <div className={styles.content} onClick={() => this.pageName()} />
                            <TextWithButton
                                heading={this.state.page}
                                buttonLabel={this.state.redirectPage}
                                history={this.props.history}
                            />

                            <br />
                            <div className={styles.dataHolder}>
                                {sellerDetails && sellerDetails.reviewRatingInfo
                                    ? sellerDetails.reviewRatingInfo.map((seller) => {
                                        let {
                                            productName,
                                            orderDate,
                                            orderId,
                                            sellerName,
                                            imageURL,
                                            transactionId,
                                        } = seller;
                                        return (
                                            <div className={styles.order} key={transactionId}>
                                                <SellerCard
                                                    title={productName}
                                                    placedTime={orderDate ? format(orderDate, dateFormat) : ""}
                                                    orderNumber={orderId}
                                                    orderFullfilledBy={sellerName}
                                                    productImage={imageURL}
                                                    sellerData={seller}
                                                    onSellerReviewSubmit={this.onSellerReviewSubmit}
                                                    pathURL={this.props.location.pathname}
                                                />
                                            </div>
                                        );
                                    })
                                    : this.renderNoOrder()}
                            </div>
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
        );
    }
}
AllSellerDetails.propTypes = {
    shouldCallHeaderContainer: PropTypes.bool,
    setHeaderText: PropTypes.func,
    getAllOrdersDetails: PropTypes.func,
    setUrlToRedirectToAfterAuth: PropTypes.func,
    getAllSellerDetails: PropTypes.func,
    reSendEmailForGiftCard: PropTypes.func,
    displayToast: PropTypes.func,
    submitSellerReviewByUser: PropTypes.func,
    sellerReviewSubmitRemovalPopup: PropTypes.func,
    retryPayment: PropTypes.func,
    userAddress: PropTypes.object,
    profile: PropTypes.shape({
        orderDetailsStatus: PropTypes.string,
        reSendEmailLoader: PropTypes.bool,
        sellerDetails: PropTypes.shape({
            reviewRatingInfo: PropTypes.array
        })
    }),
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
AllSellerDetails.defaultProps = {
    shouldCallHeaderContainer: true,
};
