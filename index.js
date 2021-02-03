const express = require("express");
const app = express();
const proxyMiddleware = require("./config/proxy-middleware");
const isLocalMachineBuild = process.env.local === "true";
const reload = require("reload");

const startServer = () => app.listen(3000, () => console.log("Server running on port 3000"));

if (isLocalMachineBuild || process.env.watch === "true") {
    reload(app, { port: 9858 })
        .then(reloadReturned => {
            startServer();
            reloadReturned.reload();
        })
        .catch(error => {
            console.error("[ERROR] Reload could not start server!", error);
        });
} else {
    startServer();
}

if (!isLocalMachineBuild) {
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
            "frame-ancestors https://*.tatacliq.com; connect-src 'self' *.tatacliq.com *.tataque.com *.tataunistore.com *.facebook.com *.google.com *.google-analytics.com *.flixcar.com *.juspay.in *.stripe.com *.instacred.me *.ed-sys.net *.appsflyer.com *.madstreetden.com *.demdex.net *.onedirect.in *.ipify.org *.yupl.us *.tt.omtrdc.net *.omtrdc.net *.adobedtm.com *.cloudfront.net *.epsilondelta.co *.amazonaws.com *.facebook.net *.clevertap.com *.doubleclick.net *.haptikapi.com *.hellohaptik.com *.haptik.me *.bing.com *.akamaihd.net instacred.me wss://*.haptik.me *.o-s.io https://cqt.conneqtcorp.com https://e2e.tataque.com"
        );
        // res.setHeader("Pragma", "no-cache");
        res.setHeader("Cache-Control", "max-age=0, no-cache, no-store");
        res.setHeader("Strict-Transport-Security", "max-age=16070400; includeSubDomains");
        next();
    });

    app.get("*.js", function(req, res, next) {
        const encodings = req.acceptsEncodings();
        if (req.url !== "/sw.js") {
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
}
app.use(express.static("build/public"));

app.get("/marketplacewebservices/v2/mpl/getOrderInvoice/*", (req, res) => {
    res.redirect("https://www.tatacliq.com" + req.originalUrl);
});

app.all("/marketplacewebservices/*", proxyMiddleware(process.env.apiBaseUrl));

app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/build/public/index.html");
});
