import express from "express";
import serverRenderer from "./middleware/renderer";
const PORT = 3000;
const path = require("path");
const app = express();
const router = express.Router();
router.use("^/", serverRenderer);

app.use(
  express.static(path.resolve(__dirname, "..", "..", ".."), {
    maxAge: "30d"
  })
);

app.get("*.css", function(req, res, next) {
  console.log("CSS");
  console.log(req.url);
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

app.use(router);

app.listen(PORT, error => {
  console.log("listening on 3000 from the server");
  if (error) {
    console.log(error);
  }
});
