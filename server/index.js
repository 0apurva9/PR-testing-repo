import express from "express";
import serverRenderer from "./middleware/renderer";
const PORT = 3000;
const path = require("path");
const app = express();

app.use(function(req, res, next) {
  res.removeHeader("Transfer-Encoding");
  res.removeHeader("X-Powered-By");
  res.setHeader(
    "x-frame-options",
    "ALLOW-FROM https://*.tatacliq.com/ https://*.tataque.com/ https://*.tataunistore.com/"
  );
  res.setHeader(
    "content-security-policy",
    "frame-ancestors https://*.tatacliq.com"
  );
  next();
});
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
