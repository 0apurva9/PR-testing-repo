import * as authActions from "../actions/auth.actions";
const auth = (
  state = {
    authCallsInProcess: false,
    authCallsIsSucceed: false
  },
  action
) => {
  switch (action.type) {
    case authActions.ALL_AUTH_CALLS_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        authCallsInProcess: true,
        authCallsIsSucceed: false
      });
    case authActions.ANY_AUTH_CALLS_FAILED:
      return Object.assign({}, state, {
        status: action.status,
        authCallsInProcess: false
      });

    case authActions.ALL_AUTH_CALLS_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        authCallsInProcess: false,
        authCallsIsSucceed: true
      });
    default:
      return state;
  }
};
export default auth;
