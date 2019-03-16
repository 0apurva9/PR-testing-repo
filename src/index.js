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
import StyleContext from "isomorphic-style-loader/StyleContext";

"fetch" in window && "assign" in Object && require("babel-polyfill");
const store = configureStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};

// ReactDOM.render(
//   <StyleContext.Provider value={{ insertCss }}>
//     <Provider store={store}>
//       <BrowserRouter>
//         <AppContainer />
//       </BrowserRouter>
//     </Provider>,
//   </StyleContext.Provider>,
//   document.getElementById("root")
// );

const displayToastFunc = message => {
  ReactDOM.render(
    <Toast data={message} autoRemove={true} />,
    document.getElementById("service-worker-toast-root")
  );
  delay(() => {
    document.getElementById("service-worker-toast-root").innerHTML = "";
  }, TOAST_DELAY);
};
registerServiceWorker(displayToastFunc);
