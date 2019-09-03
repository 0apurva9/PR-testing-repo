import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "../src/general/containers/AppContainer";
import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import Toast from "./general/components/Toast";
import delay from "lodash.delay";
import { TOAST_DELAY } from "./general/toast.actions";
import "intersection-observer";
import configureStore from "./configureStore";

"fetch" in window && "assign" in Object && require("babel-polyfill");
const store = configureStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

const displayToastFunc = message => {
  ReactDOM.render(
    <Toast data={message} autoRemove={true} />,
    document.getElementById("service-worker-toast-root")
  );
  delay(() => {
    document.getElementById("service-worker-toast-root").innerHTML = "";
  }, TOAST_DELAY);
};
