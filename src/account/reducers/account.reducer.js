import * as accountActions from "../actions/account.actions";

const account = (
  state = {
    status: null,
    error: null,
    loading: false,
    savedCards: null,
    orderDetails: null,
    orderDetailsStatus: null,
    orderDetailsError: null,

    fetchOrderDetails: null,
    fetchOrderDetailsStatus: null,
    fetchOrderDetailsError: null,

    userDetails: null,
    userDetailsStatus: null,
    userDetailsError: null,
    loadingForUserDetails: false,

    userCoupons: null,
    userCouponsStatus: null,
    userCouponsError: null,
    loadingForUserCoupons: false,

    userAlerts: null,
    userAlertsStatus: null,
    userAlertsError: null,
    loadingForUserAlerts: false,

    sendInvoice: null,
    sendInvoiceStatus: null,
    sendInvoiceError: null
  },
  action
) => {
  switch (action.type) {
    case accountActions.GET_SAVED_CARD_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case accountActions.GET_SAVED_CARD_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        savedCards: action.savedCards,
        loading: false
      });

    case accountActions.GET_SAVED_CARD_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case accountActions.REMOVE_SAVED_CARD_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case accountActions.REMOVE_SAVED_CARD_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false
      });

    case accountActions.REMOVE_SAVED_CARD_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case accountActions.GET_ALL_ORDERS_REQUEST:
      return Object.assign({}, state, {
        orderDetailsStatus: action.status,
        loading: true
      });

    case accountActions.GET_ALL_ORDERS_SUCCESS:
      return Object.assign({}, state, {
        orderDetailsStatus: action.status,
        orderDetails: action.orderDetails,
        loading: false
      });

    case accountActions.GET_ALL_ORDERS_FAILURE:
      return Object.assign({}, state, {
        orderDetailsStatus: action.status,
        orderDetailsError: action.error,
        loading: false
      });
    case accountActions.GET_USER_DETAILS_REQUEST:
      return Object.assign({}, state, {
        userDetailsStatus: action.status,
        loadingForUserDetails: true
      });

    case accountActions.GET_USER_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        userDetailsStatus: action.status,
        userDetails: action.userDetails,
        loadingForUserDetails: false
      });

    case accountActions.GET_USER_DETAILS_FAILURE:
      return Object.assign({}, state, {
        userDetailsStatus: action.status,
        userDetailsError: action.error,
        loadingForUserDetails: false
      });

    case accountActions.GET_USER_COUPON_REQUEST:
      return Object.assign({}, state, {
        userCouponsStatus: action.status,
        loadingForUserCoupons: true
      });

    case accountActions.GET_USER_COUPON_SUCCESS:
      return Object.assign({}, state, {
        userCouponsStatus: action.status,
        userCoupons: action.userCoupons,
        loadingForUserCoupons: false
      });

    case accountActions.GET_USER_COUPON_FAILURE:
      return Object.assign({}, state, {
        userCouponsStatus: action.status,
        userCouponsError: action.error,
        loadingForUserCoupons: false
      });
    case accountActions.GET_USER_ALERTS_REQUEST:
      return Object.assign({}, state, {
        userAlertsStatus: action.status,
        loadingForUserAlerts: true
      });

    case accountActions.GET_USER_ALERTS_SUCCESS:
      return Object.assign({}, state, {
        userAlertsStatus: action.status,
        userAlerts: action.userAlerts,
        loadingForUserAlerts: false
      });

    case accountActions.GET_USER_ALERTS_FAILURE:
      return Object.assign({}, state, {
        userAlertsStatus: action.status,
        userAlertsError: action.error,
        loadingForUserAlerts: false
      });

    case accountActions.FETCH_ORDER_DETAILS_REQUEST:
      return Object.assign({}, state, {
        fetchOrderDetailsStatus: action.status,
        loading: true
      });

    case accountActions.FETCH_ORDER_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        fetchOrderDetailsStatus: action.status,
        fetchOrderDetails: action.fetchOrderDetails,
        loading: false
      });

    case accountActions.FETCH_ORDER_DETAILS_FAILURE:
      return Object.assign({}, state, {
        fetchOrderDetailsStatus: action.status,
        fetchOrderDetailsError: action.error,
        loading: false
      });

    case accountActions.SEND_INVOICE_REQUEST:
      return Object.assign({}, state, {
        sendInvoiceStatus: action.status,
        loading: true
      });

    case accountActions.SEND_INVOICE_SUCCESS:
      return Object.assign({}, state, {
        sendInvoiceStatus: action.status,
        sendInvoice: action.sendInvoice,
        loading: false
      });

    case accountActions.SEND_INVOICE_FAILURE:
      return Object.assign({}, state, {
        sendInvoiceStatus: action.status,
        sendInvoiceError: action.error,
        loading: false
      });
    default:
      return state;
  }
};

export default account;
