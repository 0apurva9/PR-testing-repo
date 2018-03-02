import * as pdpActions from "../actions/pdp.actions";
const productDescription = (
  state = {
    status: null,
    error: null,
    loading: false,
    productDetails: null,
    sizeGuide: null,
    emiResult: null,
    wishList: null,
    reviews: null,
    reviewsStatus: null,
    reviewsError: null,
    msdItems: null
  },
  action
) => {
  switch (action.type) {
    case pdpActions.PRODUCT_DESCRIPTION_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.PRODUCT_DESCRIPTION_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        productDetails: action.productDescription,
        loading: false
      });

    case pdpActions.PRODUCT_DESCRIPTION_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case pdpActions.CHECK_PRODUCT_PIN_CODE_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.CHECK_PRODUCT_PIN_CODE_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        productDetails: action.productDescription,
        loading: false
      });

    case pdpActions.CHECK_PRODUCT_PIN_CODE_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case pdpActions.ADD_PRODUCT_TO_WISH_LIST_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.ADD_PRODUCT_TO_WISH_LIST_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false
      });

    case pdpActions.ADD_PRODUCT_TO_WISH_LIST_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case pdpActions.REMOVE_PRODUCT_FROM_WISH_LIST_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.REMOVE_PRODUCT_FROM_WISH_LIST_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false
      });

    case pdpActions.REMOVE_PRODUCT_FROM_WISH_LIST_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case pdpActions.ADD_PRODUCT_TO_CART_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.ADD_PRODUCT_TO_CART_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false
      });

    case pdpActions.ADD_PRODUCT_TO_CART_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case pdpActions.PRODUCT_SIZE_GUIDE_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.PRODUCT_SIZE_GUIDE_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        sizeGuide: action.sizeGuide,
        loading: false
      });

    case pdpActions.PRODUCT_SIZE_GUIDE_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case pdpActions.PRODUCT_PDP_EMI_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.PRODUCT_PDP_EMI_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        emiResult: action.emiResult,
        loading: false
      });

    case pdpActions.PRODUCT_PDP_EMI_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case pdpActions.PRODUCT_WISH_LIST_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.PRODUCT_WISH_LIST_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        wishList: action.wishList,
        loading: false
      });

    case pdpActions.PRODUCT_WISH_LIST_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case pdpActions.PRODUCT_SPECIFICATION_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.PRODUCT_SPECIFICATION_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        productDetails: action.productDetails,
        loading: false
      });

    case pdpActions.PRODUCT_SPECIFICATION_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case pdpActions.ADD_PRODUCT_REVIEW_REQUEST:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        loading: true
      });

    case pdpActions.ADD_PRODUCT_REVIEW_SUCCESS:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        loading: false
      });

    case pdpActions.ADD_PRODUCT_REVIEW_FAILURE:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        reviewsError: action.error,
        loading: false
      });

    case pdpActions.EDIT_PRODUCT_REVIEW_REQUEST:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        loading: true
      });

    case pdpActions.EDIT_PRODUCT_REVIEW_SUCCESS:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        loading: false
      });

    case pdpActions.EDIT_PRODUCT_REVIEW_FAILURE:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        reviewsError: action.error,
        loading: false
      });
    case pdpActions.DELETE_PRODUCT_REVIEW_REQUEST:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        loading: true
      });

    case pdpActions.DELETE_PRODUCT_REVIEW_SUCCESS:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        loading: false
      });

    case pdpActions.DELETE_PRODUCT_REVIEW_FAILURE:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        reviewsError: action.error,
        loading: false
      });

    case pdpActions.GET_PRODUCT_REVIEW_REQUEST:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        loading: true
      });

    case pdpActions.GET_PRODUCT_REVIEW_SUCCESS:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        reviews: action.reviews,
        loading: false
      });

    case pdpActions.GET_PRODUCT_REVIEW_FAILURE:
      return Object.assign({}, state, {
        reviewsStatus: action.status,
        reviewsError: action.error,
        loading: false
      });

    case pdpActions.PRODUCT_MSD_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case pdpActions.PRODUCT_MSD_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        msdItems: action.msdItems,
        loading: false
      });

    case pdpActions.PRODUCT_MSD_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    default:
      return state;
  }
};

export default productDescription;
