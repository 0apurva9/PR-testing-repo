import React from "react";
import ReactDOMServer from "react-dom/server";
import configureStore from "../../src/configureStore";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
// import AppContainer from "../../src/general/containers/AppContainer";
import DummyApp from "../../src/DummyApp";
import { getDesktopFooter } from "../../src/general/desktopFooter.actions";
import { getHeader } from "../../src/clp/actions/clp.actions";
const path = require("path");
const fs = require("fs");

const renderScript = preloadedState => {
  return `      <script>
  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
    /</g,
    "\\u003c"
  )}
</script>`;
};

const prepHTML = (data, { html, head, body, preloadedState }) => {
  data = data.replace('<html lang="en"  class="en">', `<html ${html}`);
  data = data.replace("</head>", `${head}</head>`);
  if (preloadedState) {
    const scriptToInject = renderScript(preloadedState);
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div>`
    );
  }

  return data;
};

export default (req, res, next) => {
  console.log("SERVER RENDERER");
  console.log(req.url);
  // point to the html file
  const filePath = path.resolve(__dirname, "..", "..", "..", "index.html");
  fs.readFile(filePath, "utf8", (err, htmlData) => {
    if (err) {
      console.log("err", err);
      return res.status(404).end();
    }
    const store = configureStore();
    store.dispatch(getDesktopFooter(`${req.url}`)).then(data => {
      // store.dispatch(getHeader()).then(data => {

      const preloadedState = store.getState();

      const renderedBody = ReactDOMServer.renderToStaticMarkup(
        <StaticRouter location={{ pathname: req.url }}>
          <Provider store={store}>
            <DummyApp />
          </Provider>
        </StaticRouter>
      );

      // const renderedBody = "";
      //render the app as a string
      const helmet = Helmet.renderStatic();

      //inject the rendered app into our html and send it
      // Form the final HTML response
      const html = prepHTML(htmlData, {
        html: helmet.htmlAttributes.toString(),
        head:
          helmet.title.toString() +
          helmet.meta.toString() +
          helmet.link.toString(),
        body: renderedBody,
        preloadedState: preloadedState
      });

      // Up, up, and away...
      return res.send(html);
      // });
    });
  });
};
