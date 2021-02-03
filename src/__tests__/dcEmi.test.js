import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as user from "../../src/auth/mocks/user.mock";
import * as Cookie from "../../src/lib/Cookie";
import { findByTestAttr } from "../../src/jestTest/testUtils";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  SUCCESS,
  REQUESTING,
  FAILURE,
  ERROR,
  GLOBAL_ACCESS_TOKEN
} from "../lib/constants";
import {
  getCliqCashPageConfiguration,
  GET_CLIQ_CASH_CONFIG_REQUEST,
  GET_CLIQ_CASH_CONFIG_SUCCESS
} from "../account/actions/account.actions";
import {
  GET_PAYMENT_MODES_REQUEST,
  GET_PAYMENT_MODES_SUCCESS,
  getPaymentModes,
  GET_PAYMENT_MODES_FAILURE,
  getEMIEligibilityDetails,
  GET_EMI_ELIGIBILITY_REQUEST,
  GET_EMI_ELIGIBILITY_SUCCESS,
  GET_EMI_ELIGIBILITY_FAILURE,
  BANK_AND_TENURE_DETAILS_REQUEST,
  BANK_AND_TENURE_DETAILS_SUCCESS,
  getBankAndTenureDetails,
  BANK_AND_TENURE_DETAILS_FAILURE,
  DC_EMI_BANK_DETAILS_REQUEST,
  DC_EMI_BANK_DETAILS_SUCCESS,
  getBankDetailsforDCEmi,
  DC_EMI_BANK_DETAILS_FAILURE,
  BIN_VALIDATION_OF_EMI_ELIGIBLE_REQUEST,
  BIN_VALIDATION_OF_EMI_ELIGIBLE_SUCCESS,
  binValidationOfEmiEligible,
  BIN_VALIDATION_OF_EMI_ELIGIBLE_FAILURE
} from "../cart/actions/cart.actions";
import {
  getPaymentModesSuccessMockData,
  noCostEmiTenureListSuccessMockData,
  getBankDetailsforDCEmiSuccessMockData,
  bankConvFeeIsZero,
  bankConvFeeNonZero,
  creditCardFomrPropPass,
  eligibleBin,
  creditCardFomrPropFail,
  inEligibleBin
} from "../__unit-test-mock-data__/dcEmi.mock";
import NoCostEmiBankDetails from "../cart/components/NoCostEmiBankDetails";
import CreditCardForm from "../cart/components/CreditCardForm";

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
});

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<NoCostEmiBankDetails {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};
const setupCreditCardForm = (props = {}, state = null) => {
  const wrapper = shallow(<CreditCardForm {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe("testing DCEMI on Payment page", () => {
  describe("API testing", () => {
    let mockResponseData,
      apiMock,
      middleWares,
      initialState,
      postMock,
      mockStore;
    beforeEach(() => {
      postMock = jest.fn();
      Cookie.createCookie(
        CUSTOMER_ACCESS_TOKEN,
        JSON.stringify(user.userDetails)
      );
      Cookie.createCookie(
        LOGGED_IN_USER_DETAILS,
        JSON.stringify(user.userDetails)
      );
      Cookie.createCookie(
        GLOBAL_ACCESS_TOKEN,
        JSON.stringify(user.userDetails)
      );
    });
    describe("testing getPaymentModes API", () => {
      /**
       * Skipping setDataLayerForCheckoutDirectCalls in this API
       */
      test("testing success response in case API succeed", () => {
        mockResponseData = getPaymentModesSuccessMockData;
        const apiResponse = mockResponseData;
        const result = {
          status: SUCCESS,
          json: () => apiResponse
        };
        postMock.mockReturnValueOnce(result);
        apiMock = {
          post: postMock
        };
        middleWares = [
          thunk.withExtraArgument({
            api: apiMock
          })
        ];
        mockStore = configureMockStore(middleWares);
        const store = mockStore(initialState);
        const expectedActions = [
          { type: GET_PAYMENT_MODES_REQUEST, status: REQUESTING },
          {
            type: GET_PAYMENT_MODES_SUCCESS,
            paymentModes: getPaymentModesSuccessMockData,
            status: "success"
          }
        ];
        return store
          .dispatch(getPaymentModes("dca4d0ab-4508-4f4d-984d-0b42bbee9da5"))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(postMock.mock.calls.length).toBe(1);
          });
      });
      test("testing failure response in case API fails", () => {
        mockResponseData = {
          type: "paymentServiceWsData",
          status: "Failure",
          cliqCashApplied: false,
          isUPIIntentEnabled: false,
          isWalletCreated: false,
          isWalletOtpVerified: false,
          whatsapp: false,
          whatsappText: "Get order update on WhatsApp."
        };
        const apiResponse = mockResponseData;
        const result = {
          status: FAILURE,
          json: () => apiResponse
        };
        postMock.mockReturnValueOnce(result);
        apiMock = {
          post: postMock
        };
        middleWares = [
          thunk.withExtraArgument({
            api: apiMock
          })
        ];
        mockStore = configureMockStore(middleWares);
        const store = mockStore(initialState);
        const expectedActions = [
          { type: GET_PAYMENT_MODES_REQUEST, status: REQUESTING },
          {
            type: GET_PAYMENT_MODES_FAILURE,
            status: ERROR,
            error: "Failure"
          }
        ];
        return store.dispatch(getPaymentModes()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(postMock.mock.calls.length).toBe(1);
        });
      });
    });
    describe("testing getEMIEligibilityDetails API", () => {
      test("testing success response in case API succeed", () => {
        const apiResponse = {
          type: "dcemiEligibilityDTO",
          status: "Success",
          DCEMIEligibleMessage: "msgpart1 null msgpart2",
          isDCEMIEligible: true
        };
        const result = {
          status: SUCCESS,
          json: () => apiResponse
        };
        postMock.mockReturnValueOnce(result);
        apiMock = {
          get: postMock
        };
        middleWares = [
          thunk.withExtraArgument({
            api: apiMock
          })
        ];
        mockStore = configureMockStore(middleWares);
        const store = mockStore(initialState);
        const expectedActions = [
          { type: GET_EMI_ELIGIBILITY_REQUEST, status: REQUESTING },
          {
            type: GET_EMI_ELIGIBILITY_SUCCESS,
            dCEmiEligibility: {
              type: "dcemiEligibilityDTO",
              status: "Success",
              DCEMIEligibleMessage: "msgpart1 null msgpart2",
              isDCEMIEligible: true
            },
            status: "success"
          }
        ];
        return store.dispatch(getEMIEligibilityDetails()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(postMock.mock.calls.length).toBe(1);
        });
      });

      test("testing failure response in case API fails", () => {
        mockResponseData = {
          type: "dcemiEligibilityDTO",
          error: "System Exception - Glitch in Code..",
          errorCode: "E0000",
          status: "Failure",
          isDCEMIEligible: false
        };
        const apiResponse = mockResponseData;
        const result = {
          status: FAILURE,
          json: () => apiResponse
        };
        postMock.mockReturnValueOnce(result);
        apiMock = {
          get: postMock
        };
        middleWares = [
          thunk.withExtraArgument({
            api: apiMock
          })
        ];
        mockStore = configureMockStore(middleWares);
        const store = mockStore(initialState);
        const expectedActions = [
          { type: GET_EMI_ELIGIBILITY_REQUEST, status: REQUESTING },
          {
            type: GET_EMI_ELIGIBILITY_FAILURE,
            status: ERROR,
            error: "System Exception - Glitch in Code.."
          }
        ];
        return store.dispatch(getEMIEligibilityDetails()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(postMock.mock.calls.length).toBe(1);
        });
      });
    });
    describe("testing noCostEmiTenureList API", () => {
      test("testing success response in case API succeed", () => {
        mockResponseData = noCostEmiTenureListSuccessMockData;
        const apiResponse = mockResponseData;
        const result = {
          status: SUCCESS,
          json: () => apiResponse
        };
        postMock.mockReturnValueOnce(result);
        apiMock = {
          post: postMock
        };
        middleWares = [
          thunk.withExtraArgument({
            api: apiMock
          })
        ];
        mockStore = configureMockStore(middleWares);
        const store = mockStore(initialState);
        const expectedActions = [
          { type: BANK_AND_TENURE_DETAILS_REQUEST, status: REQUESTING },
          {
            type: BANK_AND_TENURE_DETAILS_SUCCESS,
            bankAndTenureDetails: noCostEmiTenureListSuccessMockData,
            status: "success"
          }
        ];
        return store
          .dispatch(
            getBankAndTenureDetails(
              false,
              "15ce1df8-2dff-4bca-a5e6-b2a21c5ac1c9",
              "15ce1df8-2dff-4bca-a5e6-b2a21c5ac1c9",
              false
            )
          )
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(postMock.mock.calls.length).toBe(1);
          });
      });

      test("testing failure response in case API fails", () => {
        mockResponseData = {
          type: "mplNoCostEMIBankTenureDTO",
          error: "Not user cart/order",
          errorCode: "NU007",
          status: "Failure"
        };
        const apiResponse = mockResponseData;
        const result = {
          status: FAILURE,
          json: () => apiResponse
        };
        postMock.mockReturnValueOnce(result);
        apiMock = {
          post: postMock
        };
        middleWares = [
          thunk.withExtraArgument({
            api: apiMock
          })
        ];
        mockStore = configureMockStore(middleWares);
        const store = mockStore(initialState);
        const expectedActions = [
          { type: BANK_AND_TENURE_DETAILS_REQUEST, status: REQUESTING },
          {
            type: BANK_AND_TENURE_DETAILS_FAILURE,
            status: ERROR,
            error: "Not user cart/order"
          }
        ];
        return store
          .dispatch(
            getBankAndTenureDetails(
              false,
              "15ce1df8-2dff-4bca-a5e6-b2a21c5ac1c9",
              "15ce1df8-2dff-4bca-a5e6-b2a21c5ac1c9",
              false
            )
          )
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(postMock.mock.calls.length).toBe(1);
          });
      });
    });
    describe("testing getBankDetailsforDCEmi API", () => {
      test("testing success response in case API succeed", () => {
        mockResponseData = getBankDetailsforDCEmiSuccessMockData;
        const apiResponse = mockResponseData;
        const result = {
          status: SUCCESS,
          json: () => apiResponse
        };
        postMock.mockReturnValueOnce(result);
        apiMock = {
          get: postMock
        };
        middleWares = [
          thunk.withExtraArgument({
            api: apiMock
          })
        ];
        mockStore = configureMockStore(middleWares);
        const store = mockStore(initialState);
        const expectedActions = [
          { type: DC_EMI_BANK_DETAILS_REQUEST, status: REQUESTING },
          {
            type: DC_EMI_BANK_DETAILS_SUCCESS,
            dCEmiBankDetails: getBankDetailsforDCEmiSuccessMockData,
            status: "success"
          }
        ];
        return store
          .dispatch(
            getBankDetailsforDCEmi(
              96990,
              "15ce1df8-2dff-4bca-a5e6-b2a21c5ac1c9"
            )
          )
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(postMock.mock.calls.length).toBe(1);
          });
      });

      test("testing failure response in case API fails", () => {
        mockResponseData = {
          error: "Not user cart/order"
        };
        const apiResponse = mockResponseData;
        const result = {
          status: FAILURE,
          json: () => apiResponse
        };
        postMock.mockReturnValueOnce(result);
        apiMock = {
          get: postMock
        };
        middleWares = [
          thunk.withExtraArgument({
            api: apiMock
          })
        ];
        mockStore = configureMockStore(middleWares);
        const store = mockStore(initialState);
        const expectedActions = [
          { type: DC_EMI_BANK_DETAILS_REQUEST, status: REQUESTING },
          {
            type: DC_EMI_BANK_DETAILS_FAILURE,
            status: ERROR,
            error: "Not user cart/order"
          }
        ];
        return store
          .dispatch(
            getBankDetailsforDCEmi(
              96990,
              "15ce1df8-2dff-4bca-a5e6-b2a21c5ac1c9"
            )
          )
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(postMock.mock.calls.length).toBe(1);
          });
      });
    });
  });
});

/**
 * Ticket:- PP-1764 (Convenience charge is displaying as 0 for NCE under DC EMI section if not configured)
 */

describe(`Testing 'Bank Convenience Fees' section in case of DCEMI `, () => {
  test(`'Bank Convenience Fees' will not show if its value is 0 in the API`, () => {
    const wrapper = setup(bankConvFeeIsZero);
    const couponInputField = findByTestAttr(wrapper, "bank-conv-fee-test");
    expect(couponInputField.length).toBe(0);
  });
  test(`'Bank Convenience Fees' will show if its value is non-zero in the API`, () => {
    const wrapper = setup(bankConvFeeNonZero);
    const couponInputField = findByTestAttr(wrapper, "bank-conv-fee-test");
    expect(couponInputField.length).toBe(1);
  });
});

/**
 * Testing `emiEligibleBin` API
 */

describe("testing emiEligibleBin API", () => {
  let mockResponseData, apiMock, middleWares, initialState, postMock, mockStore;
  beforeEach(() => {
    postMock = jest.fn();
    Cookie.createCookie(
      CUSTOMER_ACCESS_TOKEN,
      JSON.stringify(user.userDetails)
    );
    Cookie.createCookie(
      LOGGED_IN_USER_DETAILS,
      JSON.stringify(user.userDetails)
    );
    Cookie.createCookie(GLOBAL_ACCESS_TOKEN, JSON.stringify(user.userDetails));
  });
  test("testing success response in case API succeed", () => {
    mockResponseData = creditCardFomrPropPass;
    const apiResponse = mockResponseData;
    const result = {
      status: SUCCESS,
      json: () => apiResponse
    };
    postMock.mockReturnValueOnce(result);
    apiMock = {
      corePostByUrlEncoded: postMock
    };
    middleWares = [
      thunk.withExtraArgument({
        api: apiMock
      })
    ];
    mockStore = configureMockStore(middleWares);
    const store = mockStore(initialState);
    const expectedActions = [
      { type: BIN_VALIDATION_OF_EMI_ELIGIBLE_REQUEST, status: REQUESTING },
      {
        type: BIN_VALIDATION_OF_EMI_ELIGIBLE_SUCCESS,
        binValidationOfEmiEligible: creditCardFomrPropPass,
        status: SUCCESS
      }
    ];
    return store.dispatch(binValidationOfEmiEligible(eligibleBin)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(postMock.mock.calls.length).toBe(1);
      const wrapper = setupCreditCardForm(creditCardFomrPropPass);
      const errorField = findByTestAttr(wrapper, "creditCardForm-err-msg");
      expect(errorField.length).toBe(0);
    });
  });
  test("testing API in case of invalid card", () => {
    mockResponseData = creditCardFomrPropFail;
    const apiResponse = mockResponseData;
    const result = {
      status: SUCCESS,
      json: () => apiResponse
    };
    postMock.mockReturnValueOnce(result);
    apiMock = {
      corePostByUrlEncoded: postMock
    };
    middleWares = [
      thunk.withExtraArgument({
        api: apiMock
      })
    ];
    mockStore = configureMockStore(middleWares);
    const store = mockStore(initialState);
    const expectedActions = [
      { type: BIN_VALIDATION_OF_EMI_ELIGIBLE_REQUEST, status: REQUESTING },
      {
        type: BIN_VALIDATION_OF_EMI_ELIGIBLE_SUCCESS,
        binValidationOfEmiEligible: creditCardFomrPropFail,
        status: SUCCESS
      }
    ];
    return store
      .dispatch(binValidationOfEmiEligible(inEligibleBin))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(postMock.mock.calls.length).toBe(1);
        const wrapper = setupCreditCardForm(creditCardFomrPropFail);
        const errorField = findByTestAttr(wrapper, "creditCardForm-err-msg");
        expect(errorField.text()).toBe(
          creditCardFomrPropFail.emiBinValidationErrorMessage
        );
      });
  });
});
