import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { findByTestAttr } from "../../../src/jestTest/testUtils";
import * as user from "../../../src/auth/mocks/user.mock";
import * as Cookie from "../../../src/lib/Cookie";
import {
  getRecentTicketHistoryDetails,
  TICKET_RECENT_HISTORY_DETAILS_REQUEST,
  TICKET_RECENT_HISTORY_DETAILS_SUCCESS,
  TICKET_RECENT_HISTORY_DETAILS_FAILURE
} from "../actions/account.actions";

import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  REQUESTING,
  FAILURE
} from "../../lib/constants";

import { SUCCESS } from "../../general/header.actions";

import OrderHistoryList from "./OrderHistoryList";
import OrderHistoryDetails from "./OrderHistoryDetails";

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
});

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<OrderHistoryList {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};
const setupCliqCashModule = (props = {}, state = null) => {
  const wrapper = mount(<OrderHistoryDetails {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};
//   const setupExpiringCard = (props = {}, state = null) => {
//     const wrapper = mount(<ExpiringCard {...props} />);
//     if (state) wrapper.setState(state);
//     return wrapper;
//   };

describe("testing ticket history configuration API", () => {
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
  });

  test("testing success response in case API succeed", () => {
    mockResponseData = {
      type: "ticketHistoryData",
      status: "Success",
      ticketCount: "7",
      tickets: [
        {
          creationDate: "22-11-2020 07:12:35",
          customerComment: "comment",
          issueType:
            "I have yet not received the Gift as per the promotion on your website",
          orderId: "930000585",
          productImage:
            "//imgqa3.tataunistore.com/images/i6/97Wx144H/MP000000004863957_97Wx144H_20200221022233.jpeg",
          productTitle:
            "Voltas 1.5 Ton Adjustable Inverter 5 Star Copper (2019 Range) 185V ADS (R32) Split AC (White)",
          resolutionDate: "26-11-2020 02:34:55 AM",
          slaBreach: "false",
          ticketId: "4000043433",
          ticketStatus: "In Process",
          transactionId: "124219093000703"
        }
      ]
    };

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
      { type: TICKET_RECENT_HISTORY_DETAILS_REQUEST, status: REQUESTING },
      {
        type: TICKET_RECENT_HISTORY_DETAILS_SUCCESS,
        isPaginated: false,
        status: "success",
        ticketDetails: {
          status: "Success",
          ticketCount: "7",
          type: "ticketHistoryData",
          tickets: [
            {
              creationDate: "22-11-2020 07:12:35",
              customerComment: "comment",
              issueType:
                "I have yet not received the Gift as per the promotion on your website",
              orderId: "930000585",
              productImage:
                "//imgqa3.tataunistore.com/images/i6/97Wx144H/MP000000004863957_97Wx144H_20200221022233.jpeg",
              productTitle:
                "Voltas 1.5 Ton Adjustable Inverter 5 Star Copper (2019 Range) 185V ADS (R32) Split AC (White)",
              resolutionDate: "26-11-2020 02:34:55 AM",
              slaBreach: "false",
              ticketId: "4000043433",
              ticketStatus: "In Process",
              transactionId: "124219093000703"
            }
          ]
        }
      }
    ];
    return store.dispatch(getRecentTicketHistoryDetails()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(postMock.mock.calls.length).toBe(1);
    });
  });

  test("testing failure response in case API fails", () => {
    mockResponseData = {
      type: "ticketHistoryData",
      status: "Failure"
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
      { type: TICKET_RECENT_HISTORY_DETAILS_REQUEST, status: REQUESTING },
      {
        type: TICKET_RECENT_HISTORY_DETAILS_FAILURE,
        status: "error",
        error: "Failure"
      }
    ];
    return store.dispatch(getRecentTicketHistoryDetails()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(postMock.mock.calls.length).toBe(1);
    });
  });
});
