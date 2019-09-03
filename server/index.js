import express from "express";
import serverRenderer, {
  pdpRenderer,
  plpRenderer,
  blpOrClpRenderer
} from "./middleware/renderer";
const PORT = 3000;
const path = require("path");
const app = express();

app.get("*.css", function(req, res, next) {
  const encodings = req.acceptsEncodings();
  if (encodings.indexOf("br") > -1) {
    // use brotli
    req.url = req.url + ".br";
    res.set("Content-Encoding", "br");
  } else {
    req.url = req.url + ".gz";
    res.set("Content-Encoding", "gzip");
  }

  res.set("Content-Type", "text/css");

  next();
});

app.get("*.js", function(req, res, next) {
  const encodings = req.acceptsEncodings();
  if (req.url !== "/service-worker.js") {
    if (encodings.indexOf("br") > -1) {
      // use brotli
      req.url = req.url + ".br";
      res.set("Content-Encoding", "br");
    } else {
      req.url = req.url + ".gz";
      res.set("Content-Encoding", "gzip");
    }
  }

  res.set("Content-Type", "application/javascript");
  next();
});

app.use("^/$", serverRenderer);
app.use("/:slug/p-:productDescriptionCode", pdpRenderer);
app.use("/search/:searchTerm($|/*)", plpRenderer);
// CATEGORY_PRODUCT_LISTINGS_WITH_PAGE
app.use("/:slug/c-:brandOrCategoryId/", blpOrClpRenderer);

app.use("/:slug/c-:brandOrCategoryId/page-:page", plpRenderer);
app.use("/custom/:c-:brandOrCategoryId/page-:page", plpRenderer);
app.use("/CustomSkuCollection/:brandOrCategoryId/page-:page", plpRenderer);
//CustomSkuCollection/oppo-f11-pro-range/page-1?q=%3Arelevance%3AcollectionIds%3Aoppo-f11-pro-range%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Acolour%3ABlack_000000
app.use("/p-:productDescriptionCode", pdpRenderer);
app.use("/cart", serverRenderer);
app.use(
  express.static(path.resolve(__dirname, "..", "..", ".."), {
    maxAge: "30d"
  })
);

app.listen(PORT, error => {
  console.log("listening on 3000 from the server");
  if (error) {
    console.log(error);
  }
});
