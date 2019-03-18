import express from "express";
import serverRenderer from "./middleware/renderer";
const PORT = 3000;
const path = require("path");
const app = express();
const router = express.Router();

app.get("^/$", serverRenderer);

// app.get("*.js", function(req, res, next) {
//   const encodings = req.acceptsEncodings();
//   if (req.url !== "/service-worker.js") {
//     if (encodings.indexOf("br") > -1) {
//       // use brotli
//       req.url = req.url + ".br";
//       res.set("Content-Encoding", "br");
//     } else {
//       req.url = req.url + ".gz";
//       res.set("Content-Encoding", "gzip");
//     }
//   }

//   res.set("Content-Type", "application/javascript");
//   next();
// });

// app.get("*.css", function(req, res, next) {
//   console.log("ARE WE HITTING CSS");
//   const encodings = req.acceptsEncodings();
//   if (encodings.indexOf("br") > -1) {
//     // use brotli
//     req.url = req.url + ".br";
//     res.set("Content-Encoding", "br");
//   } else {
//     req.url = req.url + ".gz";
//     res.set("Content-Encoding", "gzip");
//   }

//   res.set("Content-Type", "text/css");

//   next();
// });

// app.get("*", function(req, res) {
//   console.log("DO WE HIT THIS?");
//   const test = path.join(__dirname, "..", "..", "..");
//   console.log(test);
//   console.log("====");
//   res.sendFile(path.join(__dirname, "..", "..", ".."));
// });

// app.use(
//   express.static(path.resolve(__dirname, "..", "..", ".."), {
//     maxAge: "30d"
//   })
// );

// app.use(router);
app.listen(PORT, error => {
  console.log("listening on 3000 from the server");
  if (error) {
    console.log(error);
  }
});
