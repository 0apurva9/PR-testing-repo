import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../configureStore";
import thunk from "redux-thunk";
import checkPropTypes from "check-prop-types";
import * as api from "../../src/lib/apiRequest";

// export const middlewares = [ReduxThunk];
/**
 * This is the utils file which will contain the utilities of the jest & enzyme.
 */

/**
 *  Function to find if the given value exists in the wrapper.
 * @param {object} wrapper This is the wrapper of the component which is to be tested.
 * @param {string} val This is the value of the `data-test` which is to be searched in the wrapper
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const findByTestAttrTag = (wrapper, val) => {
  return wrapper.find(`${val}`);
};

export const storeFactory = initialState => {
  const createStoreWithMiddleware = applyMiddleware(
    thunk.withExtraArgument({
      api
    })
  )(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );
  return propsErr;
};
