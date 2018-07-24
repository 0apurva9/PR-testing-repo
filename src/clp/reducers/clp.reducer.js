import * as categoriesActions from "../actions/clp.actions";
const categoryDefault = (
  state = {
    status: null,
    error: null,
    categories: null,
    getHeaderStatus: null,
    getHeaderError: null,
    getHeaderDetails: null,
    loadingForGetHeaderDetails: false
  },
  action
) => {
  switch (action.type) {
    case categoriesActions.GET_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        status: action.status
      });
    case categoriesActions.GET_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error
      });
    case categoriesActions.GET_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        categories: action.categories
      });
    case categoriesActions.GET_HEADER_REQUEST:
      return Object.assign({}, state, {
        getHeaderStatus: action.status,
        loadingForGetHeaderDetails: true
      });
    case categoriesActions.GET_HEADER_FAILURE:
      return Object.assign({}, state, {
        getHeaderStatus: action.status,
        getHeaderError: action.error,
        loadingForGetHeaderDetails: false
      });
    case categoriesActions.GET_HEADER_SUCCESS:
      return Object.assign({}, state, {
        getHeaderStatus: action.status,
        getHeaderDetails: action.getHeaderDetails,
        loadingForGetHeaderDetails: false
      });
    default:
      return state;
  }
};
export default categoryDefault;
