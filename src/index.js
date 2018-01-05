import React from "react";
import ReactDOM from "react-dom";
import SignUpContainer from "../src/auth/containers/SignUpContainer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import "./index.css";
import AppContainer from "./general/containers/AppContainer";
import { BrowserRouter } from "react-router-dom";
import user from "../src/auth/reducers/user.reducer";
import * as api from "../src/lib/apiRequest";
import registerServiceWorker from "./registerServiceWorker";

const rootReducer = combineReducers({
  user
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
