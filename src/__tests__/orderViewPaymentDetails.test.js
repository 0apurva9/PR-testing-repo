import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../jestTest/testUtils";

import {
  hasNceDiscount,
  noNceDiscount
} from "../__unit-test-mock-data__/orderViewPaymentDetails.mock";
import OrderViewPaymentDetails from "../account/components/OrderViewPaymentDetails";
import { RUPEE_SYMBOL } from "../lib/constants";

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
});

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<OrderViewPaymentDetails {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe(`Testing 'No Cost EMI Discount' on order history details `, () => {
  test(`if 'noCostEMIDiscountValue' value is non zero then the section will be present`, () => {
    const wrapper = setup(hasNceDiscount);
    const nceDiscountSection = findByTestAttr(wrapper, "nce-discount-section");
    expect(nceDiscountSection.length).toBe(1);
  });
  test(`if 'noCostEMIDiscountValue' value is zero then the section will not be present`, () => {
    const wrapper = setup(noNceDiscount);
    const nceDiscountSection = findByTestAttr(wrapper, "nce-discount-section");
    expect(nceDiscountSection.length).toBe(0);
  });
  test(`if 'noCostEMIDiscountValue' value is non zero then the 'No Cost EMI Discount' text will show`, () => {
    const wrapper = setup(hasNceDiscount);
    const nceDiscountSection = findByTestAttr(wrapper, "nce-discount-text");
    expect(nceDiscountSection.text()).toBe("No Cost EMI Discount");
  });
  test(`if 'noCostEMIDiscountValue' value is non zero then the value will show along the text`, () => {
    const wrapper = setup(hasNceDiscount);
    const nceDiscountSection = findByTestAttr(wrapper, "nce-discount-value");
    expect(nceDiscountSection.text()).toBe(
      "-" + `${RUPEE_SYMBOL} ${hasNceDiscount.noCostEmiDiscount}`
    );
  });
});
