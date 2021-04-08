import express from "express";
import serverRenderer, { pdpRenderer, plpRenderer, blpOrClpRenderer } from "./middleware/renderer";
const PORT = 3000;
const path = require("path");
const app = express();
const router = express.Router();

app.use(function(req, res, next) {
    res.removeHeader("Transfer-Encoding");
    res.removeHeader("X-Powered-By");
    res.setHeader("X-XSS-Protection", "1");
    res.setHeader(
        "x-frame-options",
        "ALLOW-FROM https://*.tatacliq.com/ https://*.tataque.com/ https://*.tataunistore.com/"
    );
    res.setHeader(
        "content-security-policy",
        "frame-ancestors https://*.tatacliq.com; connect-src 'self' *.tatacliq.com *.tataque.com *.tataunistore.com *.facebook.com *.google.com *.google-analytics.com *.flixcar.com *.juspay.in *.stripe.com *.instacred.me *.ed-sys.net *.appsflyer.com *.madstreetden.com *.demdex.net *.onedirect.in *.ipify.org *.yupl.us *.tt.omtrdc.net *.omtrdc.net *.adobedtm.com *.cloudfront.net *.epsilondelta.co *.amazonaws.com *.facebook.net *.clevertap.com *.doubleclick.net *.haptikapi.com *.hellohaptik.com *.haptik.me *.bing.com *.akamaihd.net instacred.me wss://*.haptik.me *.o-s.io https://cqt.conneqtcorp.com wss://*.hellohaptik.com https://e2e.tataque.com"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Cache-Control", "max-age=0, no-cache, no-store");
    res.setHeader("Strict-Transport-Security", "max-age=16070400; includeSubDomains");
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
// router.use(
//  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
// );
router.use("^/", serverRenderer);
app.get("^/$", serverRenderer);
app.get("/:slug/p-:productDescriptionCode", pdpRenderer);
app.get("/search/:searchTerm($|/*)", plpRenderer);
// CATEGORY_PRODUCT_LISTINGS_WITH_PAGE
app.get("/:slug/c-:brandOrCategoryId/", blpOrClpRenderer);

app.get("/:slug/c-:brandOrCategoryId/page-:page", plpRenderer);
app.get("/custom/:c-:brandOrCategoryId/page-:page", plpRenderer);
app.get("/CustomSkuCollection/:brandOrCategoryId/page-:page", plpRenderer);
//CustomSkuCollection/oppo-f11-pro-range/page-1?q=%3Arelevance%3AcollectionIds%3Aoppo-f11-pro-range%3AinStockFlag%3Atrue%3AisLuxuryProduct%3Afalse%3Acolour%3ABlack_000000
app.get("/p-:productDescriptionCode", pdpRenderer);
app.use(
    express.static(path.resolve(__dirname, "..", "..", ".."), {
        maxAge: "30d",
    })
);
app.use(router);

app.listen(PORT, error => {
    console.log("listening on 3000 from the server");
    if (error) {
        console.log(error);
    }
});
