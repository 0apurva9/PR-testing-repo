import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as user from "../../src/auth/mocks/user.mock";
import * as Cookie from "../../src/lib/Cookie";
import { findByTestAttr } from "../../src/jestTest/testUtils";

import SearchCupon from "../pdp/components/SearchCupon";
import {
  searchCouponWithNoCoupon,
  productCouponDetailsProp,
  productCouponDetailsOldResponse
} from "../__unit-test-mock-data__/eligibleCoupons.mock";
import ProductCouponDetails from "../pdp/components/ProductCouponDetails";

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
});

const setup = (props = {}, state = null) => {
  const wrapper = mount(<SearchCupon {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};
const setupProductcouponDetails = (props = {}, state = null) => {
  const wrapper = mount(<ProductCouponDetails {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe(`testing the enter coupon and apply button section`, () => {
  test("there should be an input field to enter coupon name", () => {
    const wrapper = setup(searchCouponWithNoCoupon);
    const couponInputField = findByTestAttr(wrapper, "coupon-input-field");
    expect(couponInputField.length).toBe(1);
    expect(couponInputField.at(0).props().placeholder).toEqual(
      "Enter Coupon Code"
    );
  });
  test("there should be an Apply button", () => {
    const wrapper = setup(searchCouponWithNoCoupon);
    const couponInputField = findByTestAttr(wrapper, "apply-button");
    expect(couponInputField.length).toBe(1);
    expect(couponInputField.text()).toBe("Apply");
  });
});

describe("testing on the basis of old response", () => {
  let wrapper = "";
  beforeEach(() => {
    wrapper = setupProductcouponDetails(productCouponDetailsOldResponse);
  });
  test("info flag will not be visible", () => {
    const unitTestVar = findByTestAttr(wrapper, "eligible-tool-tip");
    expect(unitTestVar.length).toBe(0);
  });
  test("heading will not be present", () => {
    const unitTestVar = findByTestAttr(wrapper, "eligible-coupon-text");
    expect(unitTestVar.length).toBe(0);
  });
  test("subheading will not be present", () => {
    const unitTestVar = findByTestAttr(wrapper, "eligible-coupon-note");
    expect(unitTestVar.length).toBe(0);
  });
});
