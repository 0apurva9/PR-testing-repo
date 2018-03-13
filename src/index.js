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
import home from "../src/home/reducers/home.reducer";
import search from "../src/search/reducers/search.reducer";
import registerServiceWorker from "./registerServiceWorker";
import productListings from "./plp/reducers/plp.reducer";
import productDescription from "./pdp/reducers/pdp.reducer";
import categories from "./categories/reducers/categories.reducer";
import brand from "./brands/reducers/brand.reducer";

import cart from "./cart/reducers/cart.reducer";

import "babel-polyfill";

const rootReducer = combineReducers({
  user,
  modal,
  home,
  productListings,
  productDescription,
  search,
  cart,
  brand,
  categories
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
