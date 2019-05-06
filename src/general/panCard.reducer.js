import * as PanCardAction from "./panCard.action";
const cart = (
  state = {
    status: null,
    error: null,
    loading: false,
    type: null,
    panCardDetails: null,
    panCardDetailsStatus: null,
    panCardDetailsError: null,
    loadingForpanCardDetails: false,
    submitPandcardDetails: null,
    submitPandcardDetailsStatus: null,
    submitPandcardDetailsError: null,
    loadingForSubmitPandcardDetails: false
  },
  action
) => {
  switch (action.type) {
    case PanCardAction.GET_PANCARDDETAILS_REQUEST:
      return Object.assign({}, state, {
        panCardDetailsStatus: action.status,
        loadingForpanCardDetails: true
      });
    case PanCardAction.GET_PANCARDDETAILS_SUCCESS:
      return Object.assign({}, state, {
        panCardDetailsStatus: action.status,
        panCardDetails: action.panCardDetails,
        loadingForpanCardDetails: false
      });
    case PanCardAction.GET_PANCARDDETAILS_FAILURE:
      return Object.assign({}, state, {
        panCardDetailsStatus: action.status,
        panCardDetailsError: action.error,
        loadingForpanCardDetails: false
      });

    case PanCardAction.SUBMIT_PANCARD_DETAILS_REQUEST:
      return Object.assign({}, state, {
        submitPandcardDetailsStatus: action.status,
        loadingForSubmitPandcardDetails: true
      });
    case PanCardAction.SUBMIT_PANCARD_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        submitPandcardDetailsStatus: action.status,
        submitPandcardDetails: action.submitPandcardDetails,
        loadingForSubmitPandcardDetails: false
      });
    case PanCardAction.SUBMIT_PANCARD_DETAILS_FAILURE:
      return Object.assign({}, state, {
        submitPandcardDetailsStatus: action.status,
        submitPandcardDetailsError: action.error,
        loadingForSubmitPandcardDetails: false
      });

    default:
      return state;
  }
};

export default cart;
