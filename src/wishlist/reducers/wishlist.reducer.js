import cloneDeep from "lodash.clonedeep";
import * as wishlistActions from "../actions/wishlist.actions";
import { CLEAR_ERROR } from "../../general/error.actions.js";
const wishlistItems = (
    state = {
        wishlistItems: [],
        wishlistProductId: [],
        name: null,
        count: null,
        loading: false,
        status: null,
        error: null,
        loadingForAddProductToWishList: null,
    },
    action
) => {
    let currentWishlistItems;
    switch (action.type) {
        case CLEAR_ERROR:
            return Object.assign({}, state, {
                error: null,
                addItemError: null,
                removeItemError: null,
            });
        case wishlistActions.CREATE_WISHLIST_REQUEST:
            return Object.assign({}, state, {
                status: action.status,
            });
        case wishlistActions.CREATE_WISHLIST_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                error: action.error,
            });
        case wishlistActions.CREATE_WISHLIST_SUCCESS:
            return Object.assign({}, state, {
                status: action.status,
            });
        case wishlistActions.GET_WISH_LIST_ITEMS_REQUEST:
        case wishlistActions.REMOVE_PRODUCT_FROM_WISH_LIST_REQUEST:
        case wishlistActions.GET_WISHLIST_REQUEST:
            return Object.assign({}, state, {
                status: action.status,
                loading: true,
            });
        case wishlistActions.ADD_PRODUCT_TO_WISH_LIST_REQUEST:
            return Object.assign({}, state, {
                status: action.status,
                loadingForAddProductToWishList: true,
            });
        case wishlistActions.ADD_PRODUCT_TO_WISH_LIST_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                loadingForAddProductToWishList: false,
                addItemError: action.error,
            });
        case wishlistActions.REMOVE_PRODUCT_FROM_WISH_LIST_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                loading: false,
                removeItemError: action.error,
            });
        case wishlistActions.GET_WISH_LIST_ITEMS_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                loading: false,
                error: action.error,
            });
        case wishlistActions.GET_WISH_LIST_ITEMS_SUCCESS:
            let wishListNewItems = cloneDeep(state.wishlistItems);
            let wishListName = null;
            let wishListcount = null;
            if (action.wishlist) {
                wishListNewItems = action.wishlist.products ? action.wishlist.products : [];
                wishListName = action.wishlist.name;
                wishListcount = action.wishlist.count;
            }
            return Object.assign({}, state, {
                status: action.status,
                wishlistItems: wishListNewItems,
                name: wishListName,
                count: wishListcount,
                loading: false,
            });
        case wishlistActions.ADD_PRODUCT_TO_WISH_LIST_SUCCESS:
            currentWishlistItems = cloneDeep(state.wishlistItems);
            currentWishlistItems.push(action.product);
            return Object.assign({}, state, {
                status: action.status,
                wishlistItems: currentWishlistItems,
                loadingForAddProductToWishList: false,
            });
        case wishlistActions.REMOVE_PRODUCT_FROM_WISH_LIST_SUCCESS:
            return Object.assign({}, state, {
                status: action.status,
                loading: false,
            });
        case wishlistActions.GET_WISHLIST_FAILURE:
            return Object.assign({}, state, {
                status: action.status,
                loading: false,
                error: action.error,
            });
        case wishlistActions.GET_WISHLIST_SUCCESS:
            let wislistedProducts = cloneDeep(state.wishlistProductId);
            let wishlistcount;
            if (action.wishlist) {
                wislistedProducts = action.wishlist.productList ? action.wishlist.productList : [];
                wishlistcount = action.wishlist.count;
            }
            return Object.assign({}, state, {
                status: action.status,
                wishlistProductId: wislistedProducts,
                count: wishlistcount,
                loading: false,
            });
        default:
            return state;
    }
};
export default wishlistItems;
