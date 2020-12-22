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
import { getProductDescription } from "../../src/pdp/actions/pdp.actions";
import ProductDescriptionPageWrapperContainer from "../../src/pdp/containers/ProductDescriptionPageWrapperContainer";
import ProductListingsContainer from "../../src/plp/containers/ProductListingsContainer";
import { getProductListings, setPage } from "../../src/plp/actions/plp.actions";
import { SUFFIX } from "../../src/plp/components/Plp";
import { routes } from "./plpUtils";
import { matchPath } from "react-router-dom";
import { getSearchTextFromUrl, getPlpSearchText } from "./plpUtils";
import url from "url";
import { setSearchString } from "../../src/search/actions/search.actions";
import { getFeed } from "../../src/home/actions/home.actions";
import BrandLandingPageContainer from "../../src/blp/containers/BrandLandingPageContainer";

const path = require("path");
const fs = require("fs");

const renderScript = preloadedState => {
  return ` <script>
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

export function blpOrClpRenderer(req, res, next) {
  // First check to see if there is a feed
  // If there is...render that.
  // if there is not, render PLP.
  // TODO --> actual CLP and BLP pages
  const brandOrCategoryId = req.params.brandOrCategoryId;
  const filePath = path.resolve(__dirname, "..", "..", "..", "index.html");
  fs.readFile(filePath, "utf8", (err, htmlData) => {
    if (err) {
      return res.status(404).end();
    }

    const store = configureStore();
    let renderedBody;
    store.dispatch(getDesktopFooter(`${req.originalUrl}`)).then(data => {
      store.dispatch(getFeed(brandOrCategoryId)).then(feedData => {
        let preloadedState = store.getState();
        if (preloadedState.feed.secondaryFeed.length === 0) {
          const searchText = getPlpSearchText({
            pathname: req._parsedUrl.pathname,
            search: req.url
          });

          store.dispatch(setSearchString(searchText));
          store.dispatch(getProductListings(SUFFIX)).then(plpData => {
            preloadedState = store.getState();

            renderedBody = ReactDOMServer.renderToStaticMarkup(
              <StaticRouter location={req.originalUrl}>
                <Provider store={store}>
                  <ProductListingsContainer searchText={searchText} />
                </Provider>
              </StaticRouter>
            );

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
          });
        } else {
          renderedBody = ReactDOMServer.renderToStaticMarkup(
            <StaticRouter location={req.originalUrl}>
              <Provider store={store}>
                <DummyApp />
              </Provider>
            </StaticRouter>
          );

          // TODO - code repetition here, need to move this into another function.

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

          // now we need to render the
        }
      });
    });
  });
}

export function plpRenderer(req, res, next) {
  const searchCategory = req.query.searchCategory;
  let match;
  if (req.originalUrl.indexOf("custom") > -1) {
    match = matchPath(req.originalUrl, routes[1]);
  } else if (req.originalUrl.indexOf("CustomSkuCollection") > -1) {
    match = matchPath(req.originalUrl, routes[2]);
  } else {
    match = matchPath(req.originalUrl, routes[0]);
  }

  const searchText =
    match &&
    getSearchTextFromUrl(
      { pathname: req._parsedUrl.pathname, search: req._parsedUrl.query },
      match
    );

  // Let's see if I can just use the APP?
  const filePath = path.resolve(__dirname, "..", "..", "..", "index.html");
  fs.readFile(filePath, "utf8", (err, htmlData) => {
    if (err) {
      return res.status(404).end();
    }

    const store = configureStore();
    store.dispatch(getDesktopFooter(`${req.originalUrl}`)).then(data => {
      store.dispatch(setSearchString(searchText));
      if (req.params.page) {
        store.dispatch(setPage(req.params.page));
      }
      store.dispatch(setSearchString(searchText));
      store.dispatch(getProductListings(SUFFIX)).then(plpData => {
        // store.dispatch(setSearchString(searchText)).then(() => {
        //store.dispatch(getProductListings(SUFFIX)).then(pdpData => {
        const preloadedState = store.getState();
        const renderedBody = ReactDOMServer.renderToStaticMarkup(
          <StaticRouter location={req.originalUrl}>
            <Provider store={store}>
              <ProductListingsContainer searchText={searchText} />
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
      });
    });
    // });
  });
}

export function pdpRenderer(req, res, next) {
  const filePath = path.resolve(__dirname, "..", "..", "..", "index.html");
  fs.readFile(filePath, "utf8", (err, htmlData) => {
    if (err) {
      return res.status(404).end();
    }
    const store = configureStore();
    store.dispatch(getDesktopFooter(`${req.url}`)).then(data => {
      store
        .dispatch(getProductDescription(req.params.productDescriptionCode))
        .then(pdpData => {
          const preloadedState = store.getState();
          const renderedBody = ReactDOMServer.renderToStaticMarkup(
            <StaticRouter location={{ pathname: req.url }}>
              <Provider store={store}>
                <ProductDescriptionPageWrapperContainer />
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
        });
    });
  });
}

export default (req, res, next) => {
  // point to the html file
  const filePath = path.resolve(__dirname, "..", "..", "..", "index.html");
  fs.readFile(filePath, "utf8", (err, htmlData) => {
    if (err) {
      return res.status(404).end();
    }
    const store = configureStore();
    store.dispatch(getDesktopFooter(`${req.url}`)).then(data => {
      store.dispatch(getHeader()).then(data => {
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
      });
    });
  });
};
