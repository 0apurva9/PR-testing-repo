import React, { Component } from "react";
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
  COSTUMER_ORDER_RELATED_QUERY_ROUTE,
  REDMI_WALLET_FROM_EMAIL,
  TRANSACTION_DETAIL_PAGE,
  TRANSACTION_HISTORY
} from "../../lib/constants.js";
import AllOrderContainer from "../containers/AllOrderContainer";

import MyAccountContainer from "../containers/MyAccountContainer";
import UserAlertsAndCouponsContainer from "../containers/UserAlertsAndCouponsContainer";

import MyAccountBrandsContainer from "../containers/MyAccountBrandsContainer";
import UpdateProfileContainer from "../containers/UpdateProfileContainer.js";

import EditAddressBookContainer from "../containers/EditAddressBookContainer.js";
import AddAddressContainer from "../containers/AddAddressContainer.js";
import SaveListContainer from "../containers/SaveListContainer";
import CliqCashContainer from "../containers/CliqCashContainer.js";
import GiftCardContainer from "../containers/GiftCardContainer";
import SavedCardContainer from "../containers/SavedCardContainer.js";
import AddressBookContainer from "../containers/AddressBookContainer.js";
import OrderDetailsContainer from "../containers/OrderDetailsContainer.js";
import * as Cookie from "../../lib/Cookie";
import OrderRelatedIssueContainer from "../containers/OrderRelatedIssueContainer.js";
import TransactionDetailDesktop from "./TransactionDetailDesktop.js";
import TransactionHistoryContainer from "../containers/TransactionHistoryContainer";

export default class MyAccountWrapper extends React.Component {
  componentDidMount() {
    this.props.getUserAddress();
  }
  navigateToLogin() {
    const url = this.props.location.pathname;
    this.props.setUrlToRedirectToAfterAuth(`${MY_ACCOUNT_PAGE}`);
    this.props.history.push(LOGIN_PATH);
    return null;
  }
  render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    return (
      <Switch>
        <Route exact path={MY_ACCOUNT_PAGE} component={MyAccountContainer} />
        <Route
          path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_SAVED_CARDS_PAGE}`}
          component={SavedCardContainer}
        />

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
        <Route
          exact
          path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_GIFT_CARD_PAGE}`}
          component={GiftCardContainer}
        />
        <Route
          exact
          path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}`}
          component={CliqCashContainer}
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

        <Route
          path={`${MY_ACCOUNT_PAGE}${SAVE_LIST_PAGE}`}
          component={SaveListContainer}
        />
        <Route
          path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ORDERS_PAGE}`}
          component={AllOrderContainer}
        />

        <Route
          exact
          path={`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ADDRESS_PAGE}`}
          component={AddressBookContainer}
        />
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
        <Route
          path={`${MY_ACCOUNT_PAGE}${COSTUMER_ORDER_RELATED_QUERY_ROUTE}`}
          component={OrderRelatedIssueContainer}
        />
      </Switch>
    );
  }
}
