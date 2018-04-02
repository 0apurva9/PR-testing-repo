export const SET_HEADER_TEXT = "SET_HEADER_TEXT";
export const CLEAR_HEADER_TEXT = "CLEAR_HEADER_TEXT";
export const SUCCESS = "SUCCESS";
export function setHeaderText(text) {
  return {
    type: SET_HEADER_TEXT,
    status: SUCCESS,
    text
  };
}
export function clearHeaderText() {
  return {
    type: CLEAR_HEADER_TEXT,
    status: SUCCESS
  };
}
