import { userDetails } from "../../auth/mocks/user.mock";

export const checkBalancePropsTrue = {
  loading: false,
  cliqCashConfig: {
    type: "cliqCashActionsDto",
    status: "Success",
    checkBalance: true,
    giftCards: false,
    promoCliqCash: false,
    topUp: false
  },
  setHeaderText: () => {},
  hideSecondaryLoader: () => {},
  cliqCashUserDetails: userDetails
};

export const checkBalancePropsFalse = {
  loading: false,
  cliqCashConfig: {
    type: "cliqCashActionsDto",
    status: "Success",
    checkBalance: false,
    giftCards: false,
    promoCliqCash: false,
    topUp: false
  },
  setHeaderText: () => {},
  hideSecondaryLoader: () => {},
  cliqCashUserDetails: userDetails
};

export const checkBalPopIsCheckBalanceTrue = {
  isCheckBalance: true,
  btnLabel: "Check Card Value",
  loading: false,
  checkBalanceDetailsError: "Invalid token",
  checkBalanceStatus: null,
  heading: "Enter your gift card details",
  checkBalance: () => {},
  displayToast: () => {},
  setHeaderText: () => {},
  hideSecondaryLoader: () => {},
  cliqCashUserDetails: userDetails
};
export const checkBalPopIsCheckBalanceFalse = {
  cardNumber: 1111111111,
  pinNumber: 1111,
  isCheckBalance: false,
  btnLabel: "Check Card Value",
  loading: false,
  checkBalanceDetailsError: null,
  checkBalanceStatus: null,
  checkBalance: () => {},
  displayToast: () => {},
  setHeaderText: () => {},
  hideSecondaryLoader: () => {},
  cliqCashUserDetails: userDetails
};
