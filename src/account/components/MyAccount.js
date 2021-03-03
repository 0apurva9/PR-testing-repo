import React from "react";
import { Redirect } from "react-router-dom";
import AllOrderContainer from "../containers/AllOrderContainer";
import UserCouponsContainer from "../containers/UserCouponsContainer";
import UserAlertsContainer from "../containers/UserAlertsContainer";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import AccountUsefulLink from "./AccountUsefulLink.js";
import styles from "./MyAccount.css";
import MyAccountStyles from "./MyAccountDesktop.css";
import UserReviewContainer from "../containers/UserReviewContainer";
import {
    LOGIN_PATH,
    MY_CLIQ,
    MY_ACCOUNT_PAGE,
    MY_ACCOUNT_UPDATE_PROFILE_PAGE,
    TERMS_AND_CONDITION_URL,
    ABOUT_US_URL,
    PRIVACY_POLICY_URL,
    FAQ_URL,
    HELP_URL,
    BUYER_POLICY_URL,
} from "../../lib/constants";
import {
    setDataLayer,
    ADOBE_MY_ACCOUNT_LANDING_PAGE,
    setDataLayerForFaqAndTc,
    SET_DATA_LAYER_FAQ,
    SET_DATA_LAYER_TC,
    SET_DATA_LAYER_ABOUTUS,
    SET_DATA_LAYER_HELP,
    ABOUT_US,
    FAQ,
    TC,
} from "../../lib/adobeUtils";
export default class MyAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: 0,
        };
    }

    tabSelect(val) {
        this.setState({ isSelected: val });
    }

    renderToAccountSetting() {
        this.props.history.push(`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_UPDATE_PROFILE_PAGE}`);
    }

    redirectPage = (url, type) => {
        if (type === FAQ) {
            setDataLayerForFaqAndTc(SET_DATA_LAYER_FAQ);
        } else if (type === TC) {
            setDataLayerForFaqAndTc(SET_DATA_LAYER_TC);
        } else if (type === ABOUT_US) {
            setDataLayerForFaqAndTc(SET_DATA_LAYER_ABOUTUS);
        }
        const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
        this.props.history.push(urlSuffix);
    };

    redirectToHelp = url => {
        setDataLayerForFaqAndTc(SET_DATA_LAYER_HELP);
        const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
        this.props.history.push(urlSuffix);
    };

    componentDidUpdate() {
        this.props.setHeaderText(MY_CLIQ);
    }

    componentDidMount() {
        document.title = "My Account";
        this.props.setHeaderText(MY_CLIQ);
        setDataLayer(ADOBE_MY_ACCOUNT_LANDING_PAGE);
        if (window.od && window.od.messenger && window.od.messenger("show")) {
            window.od.messenger("show");
        }
    }

    navigateToLogin() {
        const url = this.props.location.pathname;
        this.props.setUrlToRedirectToAfterAuth(url);
        return <Redirect to={LOGIN_PATH} />;
    }

    render() {
        return (
            <div className={styles.base}>
                <div className={MyAccountStyles.holder}>
                    <div className={styles.dataHolder}>
                        {this.state.isSelected === 0 && (
                            <div className={styles.ordersHolder}>
                                <div className={styles.recentOrderHolder}>
                                    <AllOrderContainer
                                        shouldCallHeaderContainer={false}
                                        shouldCallSetDataLayer={false}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    {this.state.isSelected === 1 && (
                        <div className={styles.alertsHolder}>
                            <UserAlertsContainer />
                        </div>
                    )}
                    {this.state.isSelected === 2 && (
                        <div className={styles.couponHolder}>
                            <UserCouponsContainer displayToast={message => this.props.displayToast(message)} />
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
                                <AccountUsefulLink onClick={() => this.redirectPage(PRIVACY_POLICY_URL)}>
                                    <div className={styles.usefulLinkText}>Privacy policy</div>
                                </AccountUsefulLink>
                                <AccountUsefulLink onClick={() => this.redirectPage(BUYER_POLICY_URL)}>
                                    <div className={styles.usefulLinkText}>Buyer Policies</div>
                                </AccountUsefulLink>
                                <AccountUsefulLink onClick={() => this.redirectPage(TERMS_AND_CONDITION_URL, TC)}>
                                    <div className={styles.usefulLinkText}>Terms & Conditions</div>
                                </AccountUsefulLink>
                                <AccountUsefulLink onClick={() => this.redirectPage(ABOUT_US_URL, ABOUT_US)}>
                                    <div className={styles.usefulLinkText}>About us</div>
                                </AccountUsefulLink>
                                <AccountUsefulLink onClick={() => this.redirectPage(FAQ_URL, FAQ)}>
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
                </div>
            </div>
        );
    }
}

// import React from "react";

// export default class MyAccount extends React.Component {
//     render() {
//         return <h1>My Account Page</h1>;
//     }
// }
