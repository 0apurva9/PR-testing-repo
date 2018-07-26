import * as accountActions from "./desktopFooter.actions";
const account = (
  state = {
    DesktopFooterDetails: null,
    DesktopFooterStatus: null,
    DesktopFooterError: null,
    loadingForDesktopFooter: false
  },
  action
) => {
  switch (action.type) {
    case accountActions.GET_DESKTOP_FOOTER_REQUEST:
      return Object.assign({}, state, {
        DesktopFooterStatus: action.status,
        loadingForDesktopFooter: true
      });

    case accountActions.GET_DESKTOP_FOOTER_SUCCESS:
      return Object.assign({}, state, {
        DesktopFooterStatus: action.status,
        DesktopFooterDetails: action.DesktopFooterDetails,
        loadingForDesktopFooter: false
      });

    case accountActions.GET_DESKTOP_FOOTER_FAILURE:
      return Object.assign({}, state, {
        DesktopFooterStatus: action.status,
        DesktopFooterError: action.error,
        loadingForDesktopFooter: false
      });

    default:
      return state;
  }
};

export default account;
