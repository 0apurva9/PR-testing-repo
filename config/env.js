const fs = require("fs");
const path = require("path");
const paths = require("./paths");

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve("./paths")];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
    throw new Error("The NODE_ENV environment variable is required but was not specified.");
}
// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
var dotenvFiles = [
    `${paths.dotenv}.${NODE_ENV}.local`,
    `${paths.dotenv}.${NODE_ENV}`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    NODE_ENV !== "test" && `${paths.dotenv}.local`,
    paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
        require("dotenv").config({
            path: dotenvFile,
        });
    }
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || "")
    .split(path.delimiter)
    .filter(folder => folder && !path.isAbsolute(folder))
    .map(folder => path.resolve(appDirectory, folder))
    .join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i;

// OnlineSales CLIENT ID
process.env.REACT_APP_MONETIZATION_CLIENT_ID = process.env.REACT_APP_STAGE === "production" ? "100007" : "171780";

if (process.env.NODE_ENV !== "development") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "367761167032-apbr4v0nndom1cafs9inrrnkk7iag5be.apps.googleusercontent.com";
    process.env.REACT_APP_FACEBOOK_CLIENT_ID = "1444012285724567";
    process.env.REACT_APP_RECAPTCHA_SITE_KEY = "6LfpAk0UAAAAACmNvkmNNTiHlgAcu0DxKXC9oESm";
    process.env.REACT_APP_MSD_API_KEY = "a7e46b8a87c52ab85d352e9";
}

// Rules are different for google, facebook, captcha, so they exist in different if statements, just for clarity.

if (
    process.env.REACT_APP_STAGE === "devxelp" ||
    process.env.REACT_APP_STAGE === "uat6tcs" ||
    process.env.REACT_APP_STAGE === "qa2" ||
    process.env.REACT_APP_STAGE === "pt" ||
    process.env.REACT_APP_STAGE === "uat5" ||
    process.env.REACT_APP_STAGE === "uat6" ||
    process.env.REACT_APP_STAGE === "e2e" ||
    process.env.REACT_APP_STAGE === "e2e1" ||
    process.env.REACT_APP_STAGE === "preprod2" ||
    process.env.REACT_APP_STAGE === "qa8" ||
    process.env.REACT_APP_STAGE === "qa9" ||
    process.env.REACT_APP_STAGE === "qa10" ||
    process.env.REACT_APP_STAGE === "preprod1" ||
    process.env.REACT_APP_STAGE === "prod1" ||
    process.env.REACT_APP_STAGE === "awsprod1" ||
    process.env.REACT_APP_STAGE === "awsprod2" ||
    process.env.REACT_APP_STAGE === "awsprod3" ||
    process.env.REACT_APP_STAGE === "awspreprod1" ||
    process.env.REACT_APP_STAGE === "awspreprod2" ||
    process.env.REACT_APP_STAGE === "awspreprod3" ||
    process.env.REACT_APP_STAGE === "dev1" ||
    process.env.REACT_APP_STAGE === "dev2" ||
    process.env.REACT_APP_STAGE === "qa1" ||
    process.env.REACT_APP_STAGE === "qa3" ||
    process.env.REACT_APP_STAGE === "qa4" ||
    process.env.REACT_APP_STAGE === "qa5" ||
    process.env.REACT_APP_STAGE === "qa6" ||
    process.env.REACT_APP_STAGE === "pt1" ||
    process.env.REACT_APP_STAGE === "pt2"
) {
    process.env.REACT_APP_FACEBOOK_CLIENT_ID = "552270434933633";
    process.env.REACT_APP_FLEXMONEYAPI = "staging";
    process.env.REACT_APP_MERCHANTID = "694339";
} else if (
    process.env.REACT_APP_STAGE === "qa4" ||
    process.env.REACT_APP_STAGE === "uat2" ||
    process.env.REACT_APP_STAGE === "p2" ||
    process.env.REACT_APP_STAGE === "preprod3" ||
    process.env.REACT_APP_STAGE === "tmpprod" ||
    process.env.REACT_APP_STAGE === "mock" ||
    process.env.REACT_APP_STAGE === "production"
) {
    process.env.REACT_APP_FACEBOOK_CLIENT_ID = "484004418446735";
    process.env.REACT_APP_FLEXMONEYAPI = "production";
    process.env.REACT_APP_MERCHANTID = "694339";
} else if (process.env.REACT_APP_STAGE === "local") {
    process.env.REACT_APP_FACEBOOK_CLIENT_ID = "1444012285724567";
} else if (process.env.REACT_APP_STAGE === "stage") {
    process.env.REACT_APP_FACEBOOK_CLIENT_ID = "484004418446735";
} else if (process.env.REACT_APP_STAGE === "uat") {
    process.env.REACT_APP_FACEBOOK_CLIENT_ID = "552270434933633";
}

if (process.env.REACT_APP_STAGE === "devxelp") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "367761167032-apbr4v0nndom1cafs9inrrnkk7iag5be.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "uat2") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "970557259016-cogplqj21kjv34vld1obo0336cov2a38.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "p2" || process.env.REACT_APP_STAGE === "pt") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "742445068598-kmlgng78u9jacghfitar82vjjmsg78q5.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "production") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "742445068598-2t1f67127eqan2jjt4t7kagofp8rbchl.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "tmpprod") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "742445068598-2t1f67127eqan2jjt4t7kagofp8rbchl.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "mock") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "742445068598-2t1f67127eqan2jjt4t7kagofp8rbchl.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "stage") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "742445068598-7mra85a3m4lervedu7k7ddt7r8knheoi.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "uat") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "970557259016-mrn4j1d4gr0jk2ocka8is4chmts3glf1.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "uat6tcs") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "970557259016-c6hhcmldr7sns7b8ehrpfomfsho3c7r7.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "e2e") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "970557259016-tlp1vii8eoc4i3lq1i9a028lrtiieo5q.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "e2e1") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "970557259016-tlp1vii8eoc4i3lq1i9a028lrtiieo5q.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "uat5") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "970557259016-dn8cfjib6e40a1ejlisqitoakqpac2uj.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "uat6") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "970557259016-dn8cfjib6e40a1ejlisqitoakqpac2uj.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "preprod3") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "742445068598-2t1f67127eqan2jjt4t7kagofp8rbchl.apps.googleusercontent.com";
} else if (
    process.env.REACT_APP_STAGE === "qa4" ||
    process.env.REACT_APP_STAGE === "preprod2" ||
    process.env.REACT_APP_STAGE === "preprod1" ||
    process.env.REACT_APP_STAGE === "prod1" ||
    process.env.REACT_APP_STAGE === "awsprod1" ||
    process.env.REACT_APP_STAGE === "awsprod2" ||
    process.env.REACT_APP_STAGE === "awsprod3" ||
    process.env.REACT_APP_STAGE === "awspreprod1" ||
    process.env.REACT_APP_STAGE === "awspreprod2" ||
    process.env.REACT_APP_STAGE === "awspreprod3" ||
    process.env.REACT_APP_STAGE === "dev1" ||
    process.env.REACT_APP_STAGE === "dev2" ||
    process.env.REACT_APP_STAGE === "qa1" ||
    process.env.REACT_APP_STAGE === "qa2" ||
    process.env.REACT_APP_STAGE === "qa3" ||
    process.env.REACT_APP_STAGE === "qa4" ||
    process.env.REACT_APP_STAGE === "qa5" ||
    process.env.REACT_APP_STAGE === "qa6" ||
    process.env.REACT_APP_STAGE === "pt1" ||
    process.env.REACT_APP_STAGE === "pt2"
) {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "970557259016-dn8cfjib6e40a1ejlisqitoakqpac2uj.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "qa8") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "970557259016-dn8cfjib6e40a1ejlisqitoakqpac2uj.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "qa9") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "970557259016-dn8cfjib6e40a1ejlisqitoakqpac2uj.apps.googleusercontent.com";
} else if (process.env.REACT_APP_STAGE === "qa10") {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "970557259016-dn8cfjib6e40a1ejlisqitoakqpac2uj.apps.googleusercontent.com";
} else {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = "367761167032-apbr4v0nndom1cafs9inrrnkk7iag5be.apps.googleusercontent.com";
}

if (process.env.REACT_APP_STAGE === "production" || process.env.REACT_APP_STAGE === "p2") {
    process.env.REACT_APP_RECAPTCHA_SITE_KEY = "6LcQ0BQTAAAAALUu7TCdIkQidudN266V_dhaEs-1";
} else if (
    process.env.REACT_APP_STAGE === "uat2" ||
    process.env.REACT_APP_STAGE === "stage" ||
    process.env.REACT_APP_STAGE === "uat6tcs"
) {
    process.env.REACT_APP_RECAPTCHA_SITE_KEY = "6Lec7BUUAAAAAL8HzkX7KJdtLHBpxvb8jFwehZGz";
} else if (process.env.REACT_APP_STAGE === "tmpprod") {
    process.env.REACT_APP_RECAPTCHA_SITE_KEY = "6Lec7BUUAAAAAL8HzkX7KJdtLHBpxvb8jFwehZGz";
} else if (process.env.REACT_APP_STAGE === "uat") {
    process.env.REACT_APP_RECAPTCHA_SITE_KEY = "6Lec7BUUAAAAAL8HzkX7KJdtLHBpxvb8jFwehZGz";
} else if (
    process.env.REACT_APP_STAGE === "qa4" ||
    process.env.REACT_APP_STAGE === "uat5" ||
    process.env.REACT_APP_STAGE === "uat6" ||
    process.env.REACT_APP_STAGE === "e2e" ||
    process.env.REACT_APP_STAGE === "e2e1" ||
    process.env.REACT_APP_STAGE === "pt" ||
    process.env.REACT_APP_STAGE === "preprod2" ||
    process.env.REACT_APP_STAGE === "preprod3" ||
    process.env.REACT_APP_STAGE === "mock" ||
    process.env.REACT_APP_STAGE === "qa8" ||
    process.env.REACT_APP_STAGE === "qa9" ||
    process.env.REACT_APP_STAGE === "qa10" ||
    process.env.REACT_APP_STAGE === "preprod1" ||
    process.env.REACT_APP_STAGE === "prod1" ||
    process.env.REACT_APP_STAGE === "awsprod1" ||
    process.env.REACT_APP_STAGE === "awsprod2" ||
    process.env.REACT_APP_STAGE === "awsprod3" ||
    process.env.REACT_APP_STAGE === "awspreprod1" ||
    process.env.REACT_APP_STAGE === "awspreprod2" ||
    process.env.REACT_APP_STAGE === "awspreprod3" ||
    process.env.REACT_APP_STAGE === "dev1" ||
    process.env.REACT_APP_STAGE === "dev2" ||
    process.env.REACT_APP_STAGE === "qa1" ||
    process.env.REACT_APP_STAGE === "qa2" ||
    process.env.REACT_APP_STAGE === "qa3" ||
    process.env.REACT_APP_STAGE === "qa4" ||
    process.env.REACT_APP_STAGE === "qa5" ||
    process.env.REACT_APP_STAGE === "qa6" ||
    process.env.REACT_APP_STAGE === "pt1" ||
    process.env.REACT_APP_STAGE === "pt2"
) {
    process.env.REACT_APP_RECAPTCHA_SITE_KEY = "6Lc6qHcUAAAAAGMXu2mgFvK0pcsaG2DDO6V47Mjf";
} else {
    process.env.REACT_APP_RECAPTCHA_SITE_KEY = "6LfpAk0UAAAAACmNvkmNNTiHlgAcu0DxKXC9oESm";
}

// jus pay urls

if (process.env.REACT_APP_STAGE === "production" || process.env.REACT_APP_STAGE === "p2") {
    process.env.REACT_APP_JUS_PAY_API_URL_ROOT = "https://api.juspay.in";
} else {
    process.env.REACT_APP_JUS_PAY_API_URL_ROOT = "https://sandbox.juspay.in";
}
//stripe urls

if (process.env.REACT_APP_STAGE === "production" || process.env.REACT_APP_STAGE === "p2") {
    process.env.REACT_APP_STRIPE_API_URL_ROOT = "https://api.stripe.com";
    process.env.REACT_APP_STRIPE_ACCESTOKEN = "pk_live_0mEUvve0oja2ClunVfALIOXt00z52bGLZs";
    process.env.REACT_APP_TD_LOYALTY_POINTS_API = "https://ppapi.tatadigital.com/api/v1/capillary-api/loyalty-points";
} else {
    process.env.REACT_APP_STRIPE_API_URL_ROOT = "https://api.stripe.com";
    process.env.REACT_APP_STRIPE_ACCESTOKEN = "pk_test_UvukxCIqd4zofxt7dX2hjPeI";
    process.env.REACT_APP_TD_LOYALTY_POINTS_API = "https://ppapi.tatadigital.com/api/v1/capillary-api/loyalty-points";
}

// for samsung chat on pdp
if (process.env.REACT_APP_STAGE === "production") {
    process.env.REACT_APP_SAMSUNG_CHAT_URL = "https://www.samsung.com/in/chatclient/v1/partnerchat/?refurl=";
    process.env.REACT_APP_SAMSUNG_CHAT_URL_REFERRER = "";
} else {
    process.env.REACT_APP_SAMSUNG_CHAT_URL = "https://qashop.samsung.com/in/chatclient/v1/partnerchat/?refurl=";
    process.env.REACT_APP_SAMSUNG_CHAT_URL_REFERRER = "&referrer=tatacliq";
}

// for haptik chatbot on PDP,PLP,CLP and Search
if (process.env.REACT_APP_STAGE === "production") {
    process.env.REACT_APP_HAPTIK_CHATBOT_URL = "https://buzzodjangostorage.blob.core.windows.net/production";
    process.env.REACT_APP_HAPTIK_CHATBOT_API_URL = "/adminstatic/js/mkt_desktop_chat.json";
} else {
    process.env.REACT_APP_HAPTIK_CHATBOT_URL = "https://buzzodjangostorage.blob.core.windows.net";
    process.env.REACT_APP_HAPTIK_CHATBOT_API_URL = "/adminstatic/js/mkt_desktop_chat_lower.json";
}

// for appliances exchange
process.env.REACT_APP_APPLIANCES_EXCHANGE = "/adminstatic/js/appliance_exchange_v1.json";

if (process.env.REACT_APP_STAGE === "production") {
    process.env.REACT_APP_SUBMIT_APPLIANCES_EXCHANGE_DATA =
        "https://www.tataque.com/otatacliq/applianceExchangeDetails";
} else {
    process.env.REACT_APP_SUBMIT_APPLIANCES_EXCHANGE_DATA =
        "https://e2e.tataque.com/otatacliq/applianceExchangeDetails";
}

function getClientEnvironment(publicUrl) {
    const raw = Object.keys(process.env)
        .filter(key => REACT_APP.test(key))
        .reduce(
            (env, key) => {
                env[key] = process.env[key];
                return env;
            },
            {
                // Useful for determining whether we’re running in production mode.
                // Most importantly, it switches React into the correct mode.
                NODE_ENV: process.env.NODE_ENV || "development",
                // Useful for resolving the correct path to static assets in `public`.
                // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
                // This should only be used as an escape hatch. Normally you would put
                // images into the `src` and `import` them in code to get their paths.
                PUBLIC_URL: publicUrl,
                REACT_APP_STAGE: process.env.REACT_APP_STAGE,
                PRODUCTION: process.env.REACT_APP_STAGE === "production" ? false : true,
            }
        );
    // Stringify all values so we can feed into Webpack DefinePlugin
    const stringified = {
        "process.env": Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key]);
            return env;
        }, {}),
    };

    return { raw, stringified };
}

module.exports = getClientEnvironment;
