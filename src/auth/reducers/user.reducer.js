import * as userActions from "../actions/user.actions";

const user = (
  state = {
    user: null,
    status: null,
    error: null,
    loading: false
  },
  action
) => {
  switch (action.type) {
    case userActions.LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case userActions.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        user: action.user,
        loading: false
      });
    case userActions.LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case userActions.SIGN_UP_USER_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case userActions.SIGN_UP_USER_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        user: action.user,
        loading: false
      });
    case userActions.SIGN_UP_USER_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case userActions.OTP_VERIFICATION_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case userActions.OTP_VERIFICATION_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        user: action.user,
        loading: false
      });

    case userActions.OTP_VERIFICATION_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    default:
      return state;
  }
};

export default user;
