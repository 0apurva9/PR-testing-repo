import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Notification.css";
import ProfileMenu from "./ProfileMenu";
import UserProfile from "./UserProfile";
import DesktopOnly from "../../general/components/DesktopOnly";
import myAccountStyles from "./MyAccountDesktop.css";
import * as Cookie from "../../lib/Cookie";
import Icon from "../../xelpmoc-core/Icon";
import smsIcon from "./img/sms.svg";
import swicthOn from "./img/switch_on.svg";
import switchOff from "./img/swicth_off.svg";
import Image from "../../xelpmoc-core/Image.js";
import { LOGGED_IN_USER_DETAILS } from "../../lib/constants.js";

class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disableSMSToggleBtn: false,
        };
        this.smsToggleCnt = 0;
    }

    componentDidMount() {
        if (this.props.getUserNotifications) {
            this.props.getUserNotifications();
        }
    }

    onSMSToggle(val) {
        this.smsToggleCnt = this.smsToggleCnt + 1;
        let { numberOfMinutes, errorMessage, numberOfClicks } = this.props.UserNotificationConfig;

        if (this.smsToggleCnt < parseInt(numberOfClicks) && this.props.onSMSToggle) {
            this.props.onSMSToggle(val ? false : true);
        } else {
            this.setState({ disableSMSToggleBtn: true });
            this.props.displayToast(errorMessage);
            setTimeout(() => {
                this.smsToggleCnt = 0;
                this.setState({ disableSMSToggleBtn: false });
            }, parseInt(numberOfMinutes) * 1000);
        }
    }

    render() {
        if (this.props.loading) {
            this.props.showSecondaryLoader();
        } else {
            this.props.hideSecondaryLoader();
        }
        let userData;
        const userProfileDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        if (userProfileDetails) {
            userData = JSON.parse(userProfileDetails);
        }

        let sms = false;
        if (this.props && this.props.UserNotificationDetails) {
            sms = this.props.UserNotificationDetails.sms;
        }
        let smsSwicthIcon = sms ? swicthOn : switchOff;

        return (
            <div className={styles.base}>
                <div className={myAccountStyles.holder}>
                    <DesktopOnly>
                        <div className={myAccountStyles.profileMenu}>
                            <ProfileMenu {...this.props} />
                        </div>
                        <div className={styles.notificationWrapper}>
                            <div className={styles.contentWrapper}>
                                <p className={styles.content}>{this.props.notificationHeaderText}</p>
                            </div>
                            <div className={styles.notificationTypeHolder}>
                                <div className={styles.notificationContainer}>
                                    <div className={styles.smsLogo}>
                                        <Icon image={smsIcon} size={20} />
                                    </div>
                                    <div className={styles.typeTitle}>SMS</div>
                                </div>
                                <div
                                    className={styles.toggleButton}
                                    onClick={!this.state.disableSMSToggleBtn ? () => this.onSMSToggle(sms) : null}
                                >
                                    <Image image={smsSwicthIcon} fit="cover" />
                                </div>
                            </div>
                        </div>
                        <div className={myAccountStyles.userProfile}>
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

Notification.propTypes = {
    onToggle: PropTypes.func,
    getUserNotifications: PropTypes.func,
    UserNotificationConfig: PropTypes.shape({
        numberOfMinutes: PropTypes.string,
        errorMessage: PropTypes.string,
        numberOfClicks: PropTypes.string
    }),
    onSMSToggle: PropTypes.func,
    displayToast: PropTypes.func,
    loading: PropTypes.bool,
    showSecondaryLoader: PropTypes.func,
    hideSecondaryLoader: PropTypes.func,
    UserNotificationDetails: PropTypes.shape({
        sms: PropTypes.string
    }),
    notificationHeaderText: PropTypes.string,
    userAddress: PropTypes.object
};

export default Notification;
