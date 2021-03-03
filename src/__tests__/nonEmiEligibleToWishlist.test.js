import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as user from "../../src/auth/mocks/user.mock";
import * as Cookie from "../../src/lib/Cookie";
import { findByTestAttr } from "../../src/jestTest/testUtils";
import {
  getCliqCashPageConfiguration,
  GET_CLIQ_CASH_CONFIG_REQUEST,
  GET_CLIQ_CASH_CONFIG_SUCCESS
} from "../account/actions/account.actions";
import NonEmiEligibleToWishlist from "../cart/components/NonEmiEligibleToWishlist";
import { componentData } from "../__unit-test-mock-data__/nonEmiEligibleToWishlist.mock";

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
});

const setup = (props = {}, state = null) => {
  const wrapper = mount(<NonEmiEligibleToWishlist {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe("testing UI of NonEmiEligibleToWishlist component", () => {
  test(`header name is 'Move to Wishlist'`, () => {
    const wrapper = setup(componentData);
    const nonEmiEligibleToWishlist = findByTestAttr(
      wrapper,
      "bottom-slide-heading"
    );
    expect(nonEmiEligibleToWishlist.text()).toBe("Move to Wishlist");
  });
  test(`header name is 'Move to Wishlist'`, () => {
    const wrapper = setup(componentData);
    const nonEmiEligibleToWishlist = findByTestAttr(
      wrapper,
      "nonEmiEligible-subheading"
    );
    expect(nonEmiEligibleToWishlist.text()).toBe(
      "Sorry! The following items do not qualify for an EMI and can be moved to your wish list; they can be purchased later."
    );
  });
  test(`'Move to wishlist' button is available`, () => {
    const wrapper = setup(componentData);
    const nonEmiEligibleToWishlist = findByTestAttr(
      wrapper,
      "move-to-wishlist"
    );
    expect(nonEmiEligibleToWishlist.length).toBe(1);
    expect(nonEmiEligibleToWishlist.text()).toBe("Move to wishlist");
  });
  test(`'Change payment mode' button is available`, () => {
    const wrapper = setup(componentData);
    const nonEmiEligibleToWishlist = findByTestAttr(
      wrapper,
      "change-payment-mode"
    );
    expect(nonEmiEligibleToWishlist.length).toBe(1);
    expect(nonEmiEligibleToWishlist.text()).toBe("Change payment mode");
  });
});
