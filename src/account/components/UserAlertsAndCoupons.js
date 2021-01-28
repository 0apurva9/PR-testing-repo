import React from "react";
import PropTypes from "prop-types";
import TabHolder from "./TabHolder";
import TabData from "./TabData";
import UserAlerts from "./UserAlerts";
import UserCoupons from "./UserCoupons";
import Loader from "../../general/components/Loader";
import * as Cookie from "../../lib/Cookie";
import {
    MY_ACCOUNT_PAGE,
    MY_ACCOUNT_ALERTS_PAGE,
    MY_ACCOUNT_COUPON_PAGE,
    LOGGED_IN_USER_DETAILS,
    CUSTOMER_ACCESS_TOKEN,
    ALERTS_COUPON,
} from "../../lib/constants";
import * as UserAgent from "../../lib/UserAgent.js";
import styles from "./UserAlertsAndCoupons.css";
import { setDataLayer, ADOBE_MY_ACCOUNT_ALERTS, ADOBE_MY_ACCOUNT_COUPONS } from "../../lib/adobeUtils";
import throttle from "lodash.throttle";
import ProfileMenu from "./ProfileMenu";
import UserProfile from "./UserProfile";
import DesktopOnly from "../../general/components/DesktopOnly";
import myAccountStyles from "./MyAccountDesktop.css";
import { RouterPropTypes } from "../../general/router-prop-types";

const URL_PATH_ALERTS = `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ALERTS_PAGE}`;
const URL_PATH_COUPONS = `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_COUPON_PAGE}`;
const COUPONS = "coupons";
const ALERTS = "alerts";
export default class UserAlertsAndCoupons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stickyPortion: false,
            showStickyPortion: 0,
        };
    }

    componentDidMount() {
        const { pathname } = this.props.history.location;
        if (pathname === URL_PATH_ALERTS) {
            setDataLayer(ADOBE_MY_ACCOUNT_ALERTS);
        } else if (pathname === URL_PATH_COUPONS) {
            setDataLayer(ADOBE_MY_ACCOUNT_COUPONS);
        }
        this.props.setHeaderText(ALERTS_COUPON);
        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

        if (userDetails && customerCookie) {
            this.props.getUserAlerts();
            this.props.getUserCoupons();
        }
        if (!UserAgent.checkUserAgentIsMobile()) {
            this.onScroll = this.onScroll();
            window.addEventListener("scroll", this.onScroll);
        }
    }

    componentWillUnmount() {
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
        this.props.setHeaderText(ALERTS_COUPON);
    }

    renderToAlerts() {
        this.props.history.push(URL_PATH_ALERTS);
    }

    renderToCoupons() {
        this.props.history.push(URL_PATH_COUPONS);
    }

    renderLoader() {
        return <Loader />;
    }

    render() {
        let userDetails;
        const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

        if (this.props.loadingForUserCoupons || this.props.loadingForUserAlerts) {
            return this.renderLoader();
        }
        const { pathname } = this.props.history.location;
        let currentActivePath;
        if (pathname === URL_PATH_ALERTS) {
            currentActivePath = ALERTS;
        } else if (pathname === URL_PATH_COUPONS) {
            currentActivePath = COUPONS;
        }
        if (userDetailsCookie) {
            userDetails = JSON.parse(userDetailsCookie);
        }
        let baseClassName = styles.base;
        let tabHedaer = styles.tabHeader;
        if (this.state.stickyPortion && !UserAgent.checkUserAgentIsMobile()) {
            baseClassName = styles.translateBase;
            tabHedaer = styles.stickyTabHeader;
        }
        if (UserAgent.checkUserAgentIsMobile()) {
            baseClassName = styles.base;
            tabHedaer = styles.tabHeader;
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
                    <div className={styles.alertAndCouponDetail}>
                        <div className={styles.alertAndCouponDetailsWithHolder}>
                            <div className={tabHedaer}>
                                <TabHolder>
                                    <TabData
                                        width="50%"
                                        label="Alerts"
                                        selected={currentActivePath === ALERTS}
                                        selectItem={() => this.renderToAlerts()}
                                    />
                                    <TabData
                                        width="50%"
                                        label="Coupons "
                                        selected={currentActivePath === COUPONS}
                                        selectItem={() => this.renderToCoupons()}
                                    />
                                </TabHolder>
                            </div>
                            <div className={styles.tabBody}>
                                {currentActivePath === ALERTS && <UserAlerts userAlerts={this.props.userAlerts} />}
                                {currentActivePath === COUPONS && <UserCoupons userCoupons={this.props.userCoupons} />}
                            </div>
                        </div>
                    </div>
                    <DesktopOnly>
                        <div className={this.state.stickyPortion ? styles.stickyuserProfile : styles.userProfile}>
                            <UserProfile
                                image={userDetails && userDetails.imageUrl}
                                userLogin={userDetails && userDetails.userName}
                                loginType={userDetails && userDetails.loginType}
                                onClick={() => this.renderToAccountSetting()}
                                firstName={
                                    userDetails && userDetails.firstName && userDetails.firstName.trim().charAt(0)
                                }
                                heading={userDetails && userDetails.firstName && `${userDetails.firstName} `}
                                lastName={userDetails && userDetails.lastName && `${userDetails.lastName}`}
                                userAddress={this.props.userAddress}
                            />
                        </div>
                    </DesktopOnly>
                </div>
            </div>
        );
    }
}
UserAlertsAndCoupons.propTypes = {
    loadingForUserAlerts: PropTypes.bool,
    loadingForUserCoupons: PropTypes.bool,
    userAlerts: PropTypes.shape({ orderNotifications: PropTypes.array }),
    userCoupons: PropTypes.shape({ unusedCouponsList: PropTypes.array }),
    getUserAlerts: PropTypes.func,
    getUserCoupons: PropTypes.func,
    setHeaderText: PropTypes.func,
    userAddress: PropTypes.object,
    history: RouterPropTypes.history
};
