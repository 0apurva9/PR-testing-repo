const proxy = require("express-http-proxy");

const isMultipartRequest = function(req) {
    const contentTypeHeader = req.headers["content-type"];
    return contentTypeHeader && contentTypeHeader.indexOf("multipart") > -1;
};

module.exports = function(proxyUrl) {
    return function(req, res, next) {
        let reqAsBuffer = false;
        let reqBodyEncoding = "utf-8";
        // eslint-disable-next-line prefer-const
        let parseReqBody = true;
        if (isMultipartRequest(req)) {
            reqAsBuffer = true;
            reqBodyEncoding = null;
            parseReqBody = false;
        }
        return proxy(proxyUrl, {
            reqAsBuffer,
            reqBodyEncoding,
            parseReqBody,
            proxyReqOptDecorator: proxyReqOpts => {
                if (proxyReqOpts.headers) {
                    proxyReqOpts.headers["Pragma"] = "3beb3a040b1510f40af6af4dcbd6d5ae";
                }
                if (proxyReqOpts.headers["origin"]) {
                    proxyReqOpts.headers["origin"] = proxyUrl;
                }
                if (proxyReqOpts.headers["referer"]) {
                    proxyReqOpts.headers["referer"] = proxyUrl;
                }
                return proxyReqOpts;
            },
            proxyErrorHandler: function(err, res, next) {
                console.error("proxyErrorHandler", err);
                res.send({
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    error_message: "Something went wrong!!",
                });
            },
        })(req, res, next);
    };
};
