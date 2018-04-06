import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "../src/general/containers/AppContainer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import user from "../src/auth/reducers/user.reducer";
import * as api from "../src/lib/apiRequest";
import modal from "../src/general/modal.reducers";
import toast from "../src/general/toast.reducers";
import secondaryLoader from "../src/general/secondaryLoader.reducers";
import home from "../src/home/reducers/home.reducer";
import search from "../src/search/reducers/search.reducer";
import registerServiceWorker from "./registerServiceWorker";
import productListings from "./plp/reducers/plp.reducer";
import productDescription from "./pdp/reducers/pdp.reducer";
import categoryDefault from "./clp/reducers/clp.reducer";
import brandDefault from "./blp/reducers/blp.reducer";
import profile from "./account/reducers/account.reducer";
import header from "../src/general/header.reducers.js";
import wishlistItems from "./wishlist/reducers/wishlist.reducer";
import auth from "./auth/reducers/auth.reducer";
import cart from "./cart/reducers/cart.reducer";
import "babel-polyfill";
const rootReducer = combineReducers({
  auth,
  user,
  modal,
  home,
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
  header
});

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunk.withExtraArgument({
      api
    })
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
