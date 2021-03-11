import * as modalActions from "./modal.actions.js";

const modal = (
  state = {
    isModalEnabled : false,
    modalDisplayed: false,
    modalType: null,
    isMobileNumberLoginModalActive: false
  },
  action
) => {
  switch (action.type) {
    case modalActions.SHOW_MODAL:
      return Object.assign({}, state, {
        modalDisplayed: true,
        modalType: action.modalType,
        scrollPosition: action.scrollPosition,
        ownProps: action.ownProps,
        isModalEnabled : true
      });
    case modalActions.HIDE_MODAL:
      window.scrollTo(0, state.scrollPosition);
      setTimeout(() => {
        window.scrollTo(0, state.scrollPosition);
      }, 0);

      return Object.assign({}, state, {
        modalDisplayed: false,
        modalType: null,
        scrollPosition: 0,
        ownProps: null
      });
    case modalActions.MOBILE_NUMBER_LOGIN_MODAL_ACTIVE:
      return Object.assign({}, state, { isMobileNumberLoginModalActive: true });
    case modalActions.MOBILE_NUMBER_LOGIN_MODAL_INACTIVE:
      return Object.assign({}, state, {
        isMobileNumberLoginModalActive: false
      });
    default:
      return state;
  }
};
export default modal;
