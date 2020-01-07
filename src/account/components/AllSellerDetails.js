import React from "react";
import styles from "./AllSellerDetails.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import format from "date-fns/format";
import TextArea from "../../general/components/TextArea";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import { Redirect } from "react-router-dom";
import * as Cookie from "../../lib/Cookie";
import TextWithButton from "./TextwithButton.js";
import FillupRating from "../../pdp/components/FillupRating";
import CheckBox from "../../general/components/CheckBox.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import ProfileMenu from "./ProfileMenu";
import OrderPlacedAndId from "./OrderPlacedAndId.js";
import UserReviewContainer from "../containers/UserReviewContainer";
import UserCouponsContainer from "../containers/UserCouponsContainer";
import UserAlertsContainer from "../containers/UserAlertsContainer";
import TabHolder from "./TabHolder";
import TabData from "./TabData";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2.js";
import * as myAccountStyles from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";
import each from "lodash.foreach";
import OrderCard from "./OrderCard.js";
import Icon from "../../xelpmoc-core/Icon";
import OrderDelivered from "./OrderDelivered.js";
import AccountUsefulLink from "./AccountUsefulLink.js";
import ShowMoreButton from "../../general/components/ShowMoreButton";
import RetryPaymentIcon from "./img/payment_retry.svg";
import * as UserAgent from "../../lib/UserAgent.js";
import throttle from "lodash.throttle";
import {
  MY_ACCOUNT,
  ORDER,
  ORDER_CODE,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  LOGIN_PATH,
  MY_ACCOUNT_GIFT_CARD_PAGE,
  MY_ACCOUNT_PAGE,
  REQUESTING,
  SUCCESS,
  CHECKOUT_ROUTER,
  HELP_URL,
  PRIVACY_POLICY_URL,
  TERMS_AND_CONDITION_URL,
  ABOUT_US_URL,
  FAQ_URL
} from "../../lib/constants";

import {
  HOME_ROUTER,
  RETRY_PAYMENT_CART_ID,
  RETRY_PAYMENT_DETAILS
} from "../../lib/constants";

import SellerCard from "./SellerCard";
const dateFormat = "DD MMM YYYY";
const RETURN = "RETURN";
const PRODUCT_RETURN = "Return";

const Loader = () => {
  return (
    <div>
      <SecondaryLoader />
    </div>
  );
};

const ItemDeliveredAsDescribed = [
  { Label: "Yes", Value: "yes" },
  { Label: "No", Value: "no" }
];

const ItemDeliveredOnCommunicatedTime = [
  { Label: "Yes", Value: "yes" },
  { Label: "No", Value: "no" }
];

export default class AllSellerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOrder: null,
      sortValue: "",
      sortLabel: "",
      comment: "",
      placeholder: "Add comments (optional)",
      isItemDeliveredAsDescribed: null,
      isItemDeliveredWithInCommunicatedTime: null,
      rating: null,
      deliveredItemStatus: null,
      page: "Submit Feedback",
      redirectPage: "Edit FeedBack",
      isSelected: 6,
      stickyPortion: false,
      showStickyPortion: 0,
      indexFeedback: null
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

  handleChange(val) {
    this.setState({ comment: val });
  }
  onRatingChange = val => {
    this.setState({ rating: val });
  };

  onItemItemDeliveredAsDescribedChange(selectedStatus, index) {
    this.setState({ isItemDeliveredAsDescribed: selectedStatus.Value });
    this.setState({ indexFeedback: index });
  }

  onItemDeliveredWithInCommunicatedTimeChange(selectedStatus, index) {
    this.setState({
      isItemDeliveredWithInCommunicatedTime: selectedStatus.Value
    });
    this.setState({ indexFeedback: index });
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
        retryPaymentDetailsObject.retryPaymentDetails =
          retryPaymentResponse.retryPaymentDetails;
        localStorage.setItem(RETRY_PAYMENT_CART_ID, JSON.stringify(guId));
        localStorage.setItem(
          RETRY_PAYMENT_DETAILS,
          JSON.stringify(retryPaymentDetailsObject)
        );
        this.props.history.push({
          pathname: CHECKOUT_ROUTER,
          state: {
            isFromRetryUrl: true,
            retryPaymentGuid: guId
          }
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

  onSellerReviewSubmit(sellerData) {
    localStorage.setItem("rating", this.state.rating);
    localStorage.setItem("sellerName", sellerData.sellerName);
    let { orderId, suborderId, transactionId } = sellerData;
    let {
      rating,
      isItemDeliveredAsDescribed,
      isItemDeliveredWithInCommunicatedTime,
      comment
    } = this.state;

    if (
      rating == null ||
      isItemDeliveredAsDescribed == null ||
      isItemDeliveredWithInCommunicatedTime == null
    ) {
      this.props.displayToast("Please fill the feedback");
      return;
    }
    let params = {
      orderId: orderId,
      suborderId: suborderId,
      transactionId: transactionId,
      customerSellerRating: rating.toFixed(1),
      itemDeliveredAsDescribed: isItemDeliveredAsDescribed,
      itemDeliveredWithInCommunicatedTime: isItemDeliveredWithInCommunicatedTime,
      customerComment: comment,
      customerReview: "REVIEW"
    };
    this.props.submitSellerReviewByUser(params);
    this.props.sellerReviewSubmitRemovalPopup();
    this.setState({
      isItemDeliveredAsDescribed: null,
      isItemDeliveredWithInCommunicatedTime: null,
      comment: "",
      resetRating: true
    });
  }

  onItemStatusChange(selectedStatus) {
    this.setState({ isItemDeliveredAsDescribed: selectedStatus.Value });
  }

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
    const orderDetails = this.props.profile.orderDetails;
    let baseClassName = styles.base;
    if (this.state.stickyPortion && !UserAgent.checkUserAgentIsMobile()) {
      baseClassName = styles.translateBase;
    }
    if (UserAgent.checkUserAgentIsMobile()) {
      baseClassName = styles.base;
    }

    let {
      resetRating,
      isItemDeliveredAsDescribed,
      isItemDeliveredWithInCommunicatedTime,
      comment,
      placeholder,
      rating
    } = this.state;

    let btnStyle = {
      opacity: 1,
      cursor: "pointer"
    };

    return (
      <div className={baseClassName}>
        <div className={myAccountStyles.holder}>
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
              <React.Fragment>
                {this.state.isSelected === 0 && (
                  <div className={styles.dropDownHolder}>
                    <div className={styles.dropDown}>
                      <div
                        className={styles.orderText}
                        onClick={this.reviewSection}
                      >
                        {"Show orders from"}
                      </div>
                      <div className={styles.dropDownBox}>
                        <SelectBoxMobile2
                          value={this.state.sortValue}
                          label={this.state.sortLabel}
                          onChange={changedValue =>
                            this.changeFilterValues(changedValue)
                          }
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
                  ? sellerDetails.reviewRatingInfo.map((seller, i) => {
                      let {
                        productName,
                        orderDate,
                        orderId,
                        sellerName,
                        imageURL
                      } = seller;
                      return (
                        <div className={styles.order} key={orderId}>
                          <SellerCard
                            title={productName}
                            placedTime={
                              orderDate ? format(orderDate, dateFormat) : ""
                            }
                            orderNumber={orderId}
                            orderFullfilledBy={sellerName}
                            productImage={imageURL}
                          />
                          <div
                            className={styles.orderIdHolder}
                            style={{
                              marginBottom: `${15}px`,
                              borderBottom: `${1}px solid #efefef`,
                              paddingBottom: `${15}px`
                            }}
                          />
                          <div className={styles.ratingContainer}>
                            <div className={styles.ratingHeader}>
                              Rate your Seller
                            </div>
                            <div className={styles.ratingBar}>
                              <FillupRating
                                rating={5}
                                onChange={this.onRatingChange}
                                resetRating={resetRating}
                              />
                            </div>
                          </div>
                          <div
                            className={styles.orderIdHolder}
                            style={{
                              marginBottom: `${15}px`,
                              borderBottom: `${1}px solid #efefef`,
                              paddingBottom: `${15}px`
                            }}
                          />

                          <div className={styles.describedItem}>
                            <div className={styles.itemDeliveredHeader}>
                              <React.Fragment>
                                <span className={styles.headerText}>
                                  Item delivered as described
                                </span>
                                <div className={styles.iteDeliveredAsDescribed}>
                                  {ItemDeliveredAsDescribed &&
                                    ItemDeliveredAsDescribed.map((item, i) => {
                                      return (
                                        <div
                                          className={styles.radioBtnWrapper}
                                          key={i}
                                          value={item.Value}
                                          onClick={() =>
                                            this.onItemStatusChange(item)
                                          }
                                        >
                                          <div
                                            className={styles.radioBtnContent}
                                          >
                                            <CheckBox
                                              selected={
                                                isItemDeliveredAsDescribed ===
                                                item.Value
                                              }
                                            />
                                          </div>
                                          {item.Label}
                                        </div>
                                      );
                                    })}
                                </div>
                              </React.Fragment>
                              <React.Fragment>
                                <span className={styles.headerText}>
                                  Item delivered as on communicated time
                                </span>
                                <div className={styles.iteDeliveredAsDescribed}>
                                  {ItemDeliveredOnCommunicatedTime &&
                                    ItemDeliveredOnCommunicatedTime.map(
                                      (item, index) => {
                                        return (
                                          <div
                                            className={styles.radioBtnWrapper}
                                            key={index}
                                            value={item.Value}
                                            onClick={() =>
                                              this.onItemDeliveredWithInCommunicatedTimeChange(
                                                item,
                                                i
                                              )
                                            }
                                          >
                                            <div
                                              className={styles.radioBtnContent}
                                            >
                                              <CheckBox
                                                selected={
                                                  this.state.indexFeedback ===
                                                    i &&
                                                  isItemDeliveredWithInCommunicatedTime ===
                                                    item.Value
                                                }
                                              />
                                            </div>
                                            {item.Label}
                                          </div>
                                        );
                                      }
                                    )}
                                </div>
                              </React.Fragment>
                            </div>
                            <div className={styles.itemDescribed}>
                              <TextArea
                                onChange={val => this.handleChange(val)}
                                value={comment}
                                placeholder={placeholder}
                              />
                            </div>
                            <div className={styles.submitButtonDiv}>
                              <button
                                className={styles.submitButton}
                                style={btnStyle}
                                onClick={() =>
                                  this.onSellerReviewSubmit(seller)
                                }
                              >
                                <span className={styles.buttonText}>
                                  Submit
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : this.renderNoOrder()}
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
AllSellerDetails.propTypes = {
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
AllSellerDetails.defaultProps = {
  shouldCallHeaderContainer: true
};
