import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./AppContainer";
import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "intersection-observer";
import configureStore from "./configureStore";

// "fetch" in window && "assign" in Object && require("babel-polyfill");
const store = configureStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

var elementRoot = document.getElementById("root");
if (elementRoot.hasChildNodes()) {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <AppContainer />
            </BrowserRouter>
        </Provider>,
        elementRoot
    );
} else {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <AppContainer />
            </BrowserRouter>
        </Provider>,
        elementRoot
    );
}

/* const displayToastFunc = message => {
    ReactDOM.render(<Toast data={message} autoRemove={true} />, document.getElementById("service-worker-toast-root"));
    delay(() => {
        document.getElementById("service-worker-toast-root").innerHTML = "";
    }, TOAST_DELAY);
}; */
