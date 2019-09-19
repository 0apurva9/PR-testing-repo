import delay from "lodash.delay";
import {
  JAVA_NET,
  REDIS_CLIENT,
  FLIXIBLE_SEARCH_ERROR,
  INVALID_GRANT_ERROR,
  INVALID_TOKEN_ERROR,
  NO_PAGE_ID,
  ACCESS_DENIED,
  SYSTEM_EXCEPTION,
  JAVA_SQL,
  SQL_SEARCH_ERROR,
  DE_HYBRIS,
  NULL_POINTER_EXCEPTION,
  JAVA_LANG,
  CARD_ID,
  INVALID_REFRESH_TOKEN,
  ORG_APACHE,
  FLEXIBLE_SEARCH_QUERY,
  INVALID_ACCESS_TOKEN
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
        JAVA_NET,
        REDIS_CLIENT,
        FLIXIBLE_SEARCH_ERROR,
        INVALID_GRANT_ERROR,
        INVALID_TOKEN_ERROR,
        NO_PAGE_ID,
        ACCESS_DENIED,
        SYSTEM_EXCEPTION,
        JAVA_SQL,
        SQL_SEARCH_ERROR,
        DE_HYBRIS,
        NULL_POINTER_EXCEPTION,
        JAVA_LANG,
        CARD_ID,
        INVALID_REFRESH_TOKEN,
        ORG_APACHE,
        FLEXIBLE_SEARCH_QUERY,
        INVALID_ACCESS_TOKEN
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
