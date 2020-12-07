import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../jestTest/testUtils";
import ConnectWidget from "../home/components/ConnectWidget";
import { mocJson } from "../__unit-test-mock-data__/connectWidgest.mock";

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
});

const setup = (props = {}, state = null) => {
  const wrapper = mount(<ConnectWidget {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe("Connect widget test", () => {
  test("Check all props correct", () => {
    const wrapper = setup(mocJson);
    const couponInputField = findByTestAttr(wrapper, "connect-to-widget-test");
    couponInputField.simulate("click");
  });
});
