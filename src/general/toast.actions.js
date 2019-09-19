import delay from "lodash.delay";
import {
  ERROR_CODE_JAVA_NET,
  ERROR_CODE_REDIS_CLIENT,
  ERROR_CODE_FLIXIBLE_SEARCH_ERROR,
  ERROR_CODE_INVALID_GRANT_ERROR,
  ERROR_CODE_INVALID_TOKEN_ERROR,
  ERROR_CODE_NO_PAGE_ID,
  ERROR_CODE_ACCESS_DENIED,
  ERROR_CODE_SYSTEM_EXCEPTION,
  ERROR_CODE_JAVA_SQL,
  ERROR_CODE_SQL_SEARCH_ERROR,
  ERROR_CODE_DE_HYBRIS,
  ERROR_CODE_NULL_POINTER_EXCEPTION,
  ERROR_CODE_JAVA_LANG,
  ERROR_CODE_CARD_ID,
  ERROR_CODE_INVALID_REFRESH_TOKEN,
  ERROR_CODE_ORG_APACHE,
  ERROR_CODE_FLEXIBLE_SEARCH_QUERY,
  ERROR_CODE_INVALID_ACCESS_TOKEN
} from "../lib/constants";
export const TOAST_DELAY = 3000;
export const SHOW_TOAST = "SHOW_TOAST";
export const HIDE_TOAST = "HIDE_TOAST";
export const SOMETHING_WENT_WRONG = "Something went wrong. Please try again.";
export function hideToast() {
  return {
    type: HIDE_TOAST
  };
}
export function showToast(message) {
  return {
    type: SHOW_TOAST,
    message
  };
}
export function displayToast(message) {
  let updatedMessage = message;
  if (
    message
      .toLowerCase()
      .includes(
        ERROR_CODE_JAVA_NET,
        ERROR_CODE_REDIS_CLIENT,
        ERROR_CODE_FLIXIBLE_SEARCH_ERROR,
        ERROR_CODE_INVALID_GRANT_ERROR,
        ERROR_CODE_INVALID_TOKEN_ERROR,
        ERROR_CODE_NO_PAGE_ID,
        ERROR_CODE_ACCESS_DENIED,
        ERROR_CODE_SYSTEM_EXCEPTION,
        ERROR_CODE_JAVA_SQL,
        ERROR_CODE_SQL_SEARCH_ERROR,
        ERROR_CODE_DE_HYBRIS,
        ERROR_CODE_NULL_POINTER_EXCEPTION,
        ERROR_CODE_JAVA_LANG,
        ERROR_CODE_CARD_ID,
        ERROR_CODE_INVALID_REFRESH_TOKEN,
        ERROR_CODE_ORG_APACHE,
        ERROR_CODE_FLEXIBLE_SEARCH_QUERY,
        ERROR_CODE_INVALID_ACCESS_TOKEN
      )
  ) {
    updatedMessage = SOMETHING_WENT_WRONG;
  }
  return async dispatch => {
    dispatch(showToast(updatedMessage));
    delay(() => {
      dispatch(hideToast());
    }, TOAST_DELAY);
  };
}
