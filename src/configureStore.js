import modal from "../src/general/modal.reducers";
import toast from "../src/general/toast.reducers";
import secondaryLoader from "../src/general/secondaryLoader.reducers";
import feed from "../src/home/reducers/feed.reducer";
import search from "../src/search/reducers/search.reducer";
import productListings from "./plp/reducers/plp.reducer";
import productDescription from "./pdp/reducers/pdp.reducer";
import categoryDefault from "./clp/reducers/clp.reducer";
import brandDefault from "./blp/reducers/blp.reducer";
import profile from "./account/reducers/account.reducer";
import header from "../src/general/header.reducers.js";
import icid from "../src/general/icid.reducer.js";
import wishlistItems from "./wishlist/reducers/wishlist.reducer";
import auth from "./auth/reducers/auth.reducer";
import cart from "./cart/reducers/cart.reducer";
import desktopFooter from "./general/desktopFooter.reducer";
import user from "../src/auth/reducers/user.reducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import * as api from "../src/lib/apiRequest";
import thunk from "redux-thunk";
import { mobileNumberLoginReducer as mobileNumberLogin } from "./mobile-number-login/store/mobile-number-login.reducer";

export const rootReducer = combineReducers({
    auth,
    user,
    modal,
    feed,
    productListings,
    productDescription,
    search,
    secondaryLoader,
    toast,
    cart,
    brandDefault,
    categoryDefault,
    profile,
    wishlistItems,
    header,
    icid,
    desktopFooter,
    mobileNumberLogin,
});

export default function configureStore(preloadedState) {
    // added redux tools
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunk.withExtraArgument({
                api,
            })
        )
    );
    return store;
}
