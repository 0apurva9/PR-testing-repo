import React from "react";
import { Switch, Route } from "react-router-dom";
import {
    MY_ACCOUNT_ORDERS_PAGE,
    SAVE_LIST_PAGE,
    MY_ACCOUNT_PAGE,
    MY_ACCOUNT_SAVED_CARDS_PAGE,
    MY_ACCOUNT_ADDRESS_PAGE,
    MY_ACCOUNT_GIFT_CARD_PAGE,
    MY_ACCOUNT_UPDATE_PROFILE_PAGE,
    MY_ACCOUNT_ALERTS_PAGE,
    MY_ACCOUNT_COUPON_PAGE,
    MY_ACCOUNT_BRANDS_PAGE,
    MY_ACCOUNT_CLIQ_CASH_PAGE,
    MY_ACCOUNT_ADDRESS_EDIT_PAGE,
    MY_ACCOUNT_ADDRESS_ADD_PAGE,
    ORDER_PREFIX,
    LOGIN_PATH,
    LOGGED_IN_USER_DETAILS,
    CUSTOMER_ACCESS_TOKEN,
    COSTUMER_CLIQ_CARE_ROUTE,
    REDMI_WALLET_FROM_EMAIL,
    TRANSACTION_DETAIL_PAGE,
    TRANSACTION_HISTORY,
    RETURN_TO_ADDRESS,
    MY_ACCOUNT_SUFFIX,
    ADD,
    EDIT,
    CNC_TO_HD_ORDER,
    MY_ACCOUNT_USER_NOTIFICATION_PAGE,
    MY_ACCOUNT_PROMOS_PAGE,
    MY_ACCOUNT_CHECK_BALANCE_PAGE,
    MY_ACCOUNT_EXCHANGE_MODE_SELECTION_PAGE,
    MY_ACCOUNT_CLIQ_GIFT_CARD_PURCHASE_PAGE,
    MY_ACCOUNT_CLIQ_CASH_PURCHASE_PAGE,
    HOME_ROUTER,
} from "../../lib/constants.js";
import AllOrderContainer from "../containers/AllOrderContainer";
import MyAccountContainer from "../containers/MyAccountContainer";
import UserAlertsAndCouponsContainer from "../containers/UserAlertsAndCouponsContainer";
import MyAccountBrandsContainer from "../containers/MyAccountBrandsContainer";
import UpdateProfileContainer from "../containers/UpdateProfileContainer.js";
import EditAddressBookContainer from "../containers/EditAddressBookContainer.js";
import CheckBalanceContainer from "../containers/CheckBalanceContainer";
import AddAddressContainer from "../containers/AddAddressContainer.js";
import SaveListContainer from "../containers/SaveListContainer";
import CliqCashContainer from "../containers/CliqCashContainer.js";
import SavedCardContainer from "../containers/SavedCardContainer.js";
import AddressBookContainer from "../containers/AddressBookContainer.js";
import OrderDetailsContainer from "../containers/OrderDetailsContainer.js";
import * as Cookie from "../../lib/Cookie";
import OrderRelatedIssueContainer from "../containers/OrderRelatedIssueContainer.js";
import TransactionDetailDesktop from "./TransactionDetailDesktop.js";
import TransactionHistoryContainer from "../containers/TransactionHistoryContainer";
import ReturnAddressContainer from "../../return/containers/ReturnAddressContainer.js";
import ReturnEditAddressContainer from "../../return/containers/ReturnEditAddressContainer.js";
import ReturnAddAddressContainer from "../../return/containers/ReturnAddAddressContainer.js";
import CncToHdFlowContainer from "../containers/CncToHdFlowContainer.js";
import NotificationContainer from "../containers/NotificationContainer.js";
import CliqCashPromosContainer from "../containers/CliqCashPromosContainer.js";
import CliqGiftCardContainer from "../containers/CliqGiftCardContainer.js";

import ExchangeModeSelectionContainer from "../containers/ExchangeModeSelectionContainer";
import CliqGiftCardPurchaseContainer from "../containers/CliqGiftCardPurchaseContainer.js";
import CliqCashTopUpContainer from "../containers/CliqCashTopUpContainer.js";
export default class MyAccountWrapper extends React.Component {
    componentDidMount() {
        this.props.getUserAddress();
    }

    navigateToLogin() {
        const url = this.props.location.pathname;
        if (url.match(/cliq-cash/g)) {
            this.props.setUrlToRedirectToAfterAuth(`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}`);
        } else if (url === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_GIFT_CARD_PAGE}`) {
            this.props.setUrlToRedirectToAfterAuth(`${url}`);
        } else if (url === `${MY_ACCOUNT_PAGE}${SAVE_LIST_PAGE}`) {
            this.props.setUrlToRedirectToAfterAuth(`${url}`);
        } else {
            this.props.setUrlToRedirectToAfterAuth(`${MY_ACCOUNT_PAGE}`);
        }
        // added check for old and new login toggle
        if (this.props.isMNLLogin.value) {
            this.props.openMobileNumberLoginModal();
            this.props.history.push(HOME_ROUTER);
        } else {
            this.props.history.push(LOGIN_PATH);
        }
        return null;
    }

    render() {
        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        if (!this.props.location.pathname.includes(COSTUMER_CLIQ_CARE_ROUTE)) {
            if (!userDetails || !customerCookie) {
                return this.navigateToLogin();
            }
        }

        return (
            <Switch>
                <Route
                    exact
                    path={`${MY_ACCOUNT_SUFFIX}${RETURN_TO_ADDRESS}${EDIT}`}
                    render={() => <ReturnEditAddressContainer {...this.state} {...this.props} changeAddress={true} />}
                />

                <Route
                    exact
                    path={`${MY_ACCOUNT_SUFFIX}${RETURN_TO_ADDRESS}${ADD}`}
                    render={() => <ReturnAddAddressContainer {...this.state} {...this.props} changeAddress={true} />}
                />
                <Route
                    exact
                    path={`${MY_ACCOUNT_SUFFIX}${RETURN_TO_ADDRESS}`}
                    render={() => <ReturnAddressContainer {...this.state} {...this.props} changeAddress={true} />}
                />
                <Route exact path={MY_ACCOUNT_PAGE} component={MyAccountContainer} />

                <Route path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_SAVED_CARDS_PAGE}`} component={SavedCardContainer} />
                <Route path={REDMI_WALLET_FROM_EMAIL} component={CliqCashContainer} />
                <Route
                    exact
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ALERTS_PAGE}`}
                    component={UserAlertsAndCouponsContainer}
                />
                <Route
                    exact
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_COUPON_PAGE}`}
                    component={UserAlertsAndCouponsContainer}
                />
                {
                    // This page has been revamped
                    //   <Route
                    //   exact
                    //   path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_GIFT_CARD_PAGE}`}
                    //   component={GiftCardContainer}
                    // />
                }
                <Route
                    exact
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_GIFT_CARD_PAGE}`}
                    component={CliqGiftCardContainer}
                />
                <Route
                    exact
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_GIFT_CARD_PURCHASE_PAGE}`}
                    component={CliqGiftCardPurchaseContainer}
                />
                <Route
                    exact
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PURCHASE_PAGE}`}
                    component={CliqCashTopUpContainer}
                />
                <Route
                    exact
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}${MY_ACCOUNT_PROMOS_PAGE}`}
                    component={CliqCashPromosContainer}
                />
                <Route exact path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}`} component={CliqCashContainer} />
                <Route
                    exact
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CHECK_BALANCE_PAGE}`}
                    component={CheckBalanceContainer}
                />

                <Route
                    exact
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}${TRANSACTION_DETAIL_PAGE}`}
                    component={TransactionDetailDesktop}
                />
                <Route
                    exact
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}${TRANSACTION_HISTORY}`}
                    component={TransactionHistoryContainer}
                />
                <Route
                    exact
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_BRANDS_PAGE}`}
                    component={MyAccountBrandsContainer}
                />
                <Route
                    exact
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_UPDATE_PROFILE_PAGE}`}
                    component={UpdateProfileContainer}
                />
                <Route path={`${MY_ACCOUNT_PAGE}${SAVE_LIST_PAGE}`} component={SaveListContainer} />

                <Route path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ORDERS_PAGE}`} component={AllOrderContainer} />
                <Route exact path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ADDRESS_PAGE}`} component={AddressBookContainer} />
                <Route
                    exact
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ADDRESS_EDIT_PAGE}`}
                    component={EditAddressBookContainer}
                />
                <Route
                    exact
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ADDRESS_ADD_PAGE}`}
                    component={AddAddressContainer}
                />

                <Route path={`${ORDER_PREFIX}`} component={OrderDetailsContainer} />
                <Route path={`${MY_ACCOUNT_PAGE}${COSTUMER_CLIQ_CARE_ROUTE}`} component={OrderRelatedIssueContainer} />
                <Route path={`${CNC_TO_HD_ORDER}`} component={CncToHdFlowContainer} />
                <Route
                    exact
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_USER_NOTIFICATION_PAGE}`}
                    component={NotificationContainer}
                />
                <Route
                    path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_EXCHANGE_MODE_SELECTION_PAGE}`}
                    component={ExchangeModeSelectionContainer}
                />
            </Switch>
        );
    }
}
