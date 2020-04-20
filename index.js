const express = require("express");
const app = express();
const isBrowser = require("browser-or-node");
var url = require("url");

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
    "frame-ancestors https://*.tatacliq.com; connect-src 'self' *.tatacliq.com *.tataque.com *.tataunistore.com *.facebook.com *.google.com *.google-analytics.com *.flixcar.com *.juspay.in *.stripe.com *.instacred.me *.ed-sys.net *.appsflyer.com *.madstreetden.com *.demdex.net *.onedirect.in *.ipify.org *.yupl.us *.omtrdc.net *.adobedtm.com *.cloudfront.net *.epsilondelta.co *.amazonaws.com *.facebook.net *.clevertap.com *.doubleclick.net *.haptikapi.com *.hellohaptik.com *.haptik.me *.bing.com *.akamaihd.net instacred.me"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Cache-Control", "max-age=0, no-cache, no-store");
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

var prerender = require("prerender-node").set(
  "prerenderToken",
  "NYax1xFNwJGOvG1c0fyj"
);
prerender.crawlerUserAgents.push("googlebot");
prerender.crawlerUserAgents.push("bingbot");
prerender.crawlerUserAgents.push("yandex");
app.use(prerender);

app.use(express.static("build"));

function removeWord(originalWord, searchWord) {
  var str = originalWord;
  var n = str.search(searchWord);
  while (str.search(searchWord) > -1) {
    n = str.search(searchWord);
    str =
      str.substring(0, n) + str.substring(n + searchWord.length, str.length);
  }
  return str;
}

var ampServicesStartPoint = "https://www.tataque.com";
var ampCrossDomainUrl = "https://amp.tatacliq.com";

app.get("/marketplacewebservices/v2/mpl/getOrderInvoice/*", (req, res) => {
  res.redirect("https://www.tatacliq.com" + req.originalUrl);
});

app.get("/*", (req, res) => {
  const origUrl = req.originalUrl;

  if (req.get("host") === "www.tatacliq.com") {
    ampServicesStartPoint = "https://www.tataque.com";
    ampCrossDomainUrl = "https://amp.tatacliq.com";
  } else {
    ampServicesStartPoint = "https://tmppprd.tataunistore.com";
    ampCrossDomainUrl = "http://localhost:8887/build/amp";
  }

  //Homepage and PDP code commented as of now PLP code making live - some homepage and pdp components are remaining
  //Code start for AMP
  // if (origUrl.search("/amp/home") !== -1) {
  //   var metaKeywords = "Tatacliq, Online Shopping, Online Shopping India";
  //   var metaDescription =
  //     "Online Shopping Site in India - Upto 60% Off On Mobiles, Electronics & Fashion at Tata CLiQ";
  //   var canonicalHomeAmpUrl = req.protocol + "://" + req.get("host") + origUrl;
  //   var canonicalHomePwaUrl = req.protocol + "://" + req.get("host");
  //   var defaultPageUrl =
  //     ampServicesStartPoint +
  //     "/marketplacewebservices/v2/mpl/cms/defaultpage?pageId=defaulthomepage";

  //   var data = {
  //     metaKeywords: metaKeywords,
  //     metaDescription: metaDescription,
  //     canonicalAmpUrl: canonicalHomeAmpUrl,
  //     canonicalPwaUrl: canonicalHomePwaUrl,
  //     ampCrossDomainUrl: ampCrossDomainUrl,
  //     defaultPageUrl: defaultPageUrl
  //   };

  //   res.render("../build/amp/home.ejs", data);
  // } else if (origUrl.search("/amp/") !== -1 && origUrl.search("/p-") !== -1) {
  //   var productCode = origUrl.split("p-")[1];
  //   var productDataAPI = "/src/product.json";
  //   var canonicalAmpUrl = req.protocol + "://" + req.get("host") + origUrl;
  //   var canonicalPwaUrl =
  //     req.protocol + "://" + req.get("host") + removeWord(origUrl, "/amp");

  //   var pdpUrl =
  //     ampServicesStartPoint +
  //     "/marketplacewebservices/v2/mpl/products/productDetails/amp/" +
  //     productCode +
  //     "?isPwa=true";
  //   var sizeGuideURL =
  //     ampServicesStartPoint +
  //     "/marketplacewebservices/v2/mpl/products/" +
  //     productCode.toUpperCase() +
  //     "/sizeGuide/amp/?isPwa=true";

  //   var data = {
  //     productId: productCode,
  //     pdpAPI: pdpUrl,
  //     sizeGuideURL: sizeGuideURL,
  //     productData: productDataAPI,
  //     ampCrossDomainUrl: ampCrossDomainUrl,
  //     canonicalAmpUrl: canonicalAmpUrl,
  //     canonicalPwaUrl: canonicalPwaUrl
  //   };
  //   res.render("../build/amp/pdp_layout.ejs", data);
  // }
  // else
  if (origUrl.search("/amp/") !== -1 && origUrl.search("search/") !== -1) {
    var searchService =
      ampServicesStartPoint +
      "/marketplacewebservices/v2/mpl/products/searchProductPwAmp?searchText=";
    var pageSize = 20;
    var pageNo = 0;
    var middleUrlPart = "&pageSize=20&page=";
    var tailUrlPart = "&isTextSearch=false&isPwa=true";

    var channelText = "productsearch_amp";
    var canonicalPlpAmpUrl = req.protocol + "://" + req.get("host") + origUrl;
    var canonicalPlpPwaUrl =
      req.protocol + "://" + req.get("host") + removeWord(origUrl, "/amp");
    var q = url.parse(canonicalPlpAmpUrl, true);
    //Meta Text for search
    var metaKeywords =
      q.query.text +
      ", " +
      q.query.text +
      " online shopping, buy " +
      q.query.text +
      " online, " +
      q.query.text +
      " on discount";
    var metaDescription = "Search results for " + q.query.text + " on null";

    var data = {
      metaKeywords: metaKeywords,
      metaDescription: metaDescription,
      pageNameInfo: "Search Results Page",
      searchService: searchService,
      searchTerm: q.query.text,
      channel: channelText,
      middleUrlPart: middleUrlPart,
      tailUrlPart: tailUrlPart,
      pageNo: pageNo,
      ampCrossDomainUrl: ampCrossDomainUrl,
      canonicalAmpUrl: canonicalPlpAmpUrl,
      canonicalPwaUrl: canonicalPlpPwaUrl
    };
    res.render("../build/amp/plp_layout.ejs", data);
  } else if (
    origUrl.search("/amp/") !== -1 &&
    origUrl.search("/c-") !== -1 &&
    origUrl.search("/b-") == -1
  ) {
    var searchService =
      ampServicesStartPoint +
      "/marketplacewebservices/v2/mpl/products/searchProductPwAmp?searchText=";
    //'https://uat2.tataunistore.com/marketplacewebservices/v2/mpl/products/searchProductPwAmp?searchText=shirt&pageSize=20&page=0&isTextSearch=true&isPwa=true';
    var pageSize = 20;
    var pageNo = 0;
    var middleUrlPart = "&pageSize=20&page=";
    var tailUrlPart = "&isTextSearch=false&isPwa=true";

    var canonicalPlpAmpUrl = req.protocol + "://" + req.get("host") + origUrl;
    var canonicalPlpPwaUrl =
      req.protocol + "://" + req.get("host") + removeWord(origUrl, "/amp");
    var q = url.parse(canonicalPlpAmpUrl, true);

    //Meta Text for search
    var metaKeywords = "";
    var metaDescription = "";
    var urlPathName = q.pathname.split("/c-");
    var urlPathText = urlPathName[1];

    var channelText = "category_amp";
    var categoryText = "";
    if (urlPathText.search("msh") !== -1) {
      categoryText = "category";
    } else if (urlPathText.search("mbh") !== -1) {
      categoryText = "brand";
    }
    var data = {
      metaKeywords: metaKeywords,
      metaDescription: metaDescription,
      pageNameInfo: "product grid",
      searchService: searchService,
      searchTerm:
        ":relevance:" + categoryText + ":" + urlPathText.toUpperCase(),
      middleUrlPart: middleUrlPart,
      tailUrlPart: tailUrlPart,
      pageNo: pageNo,
      channel: channelText,
      ampCrossDomainUrl: ampCrossDomainUrl,
      canonicalAmpUrl: canonicalPlpAmpUrl,
      canonicalPwaUrl: canonicalPlpPwaUrl
    };
    res.render("../build/amp/plp_layout.ejs", data);
  } else if (
    origUrl.search("/amp/") !== -1 &&
    origUrl.search("/c-") !== -1 &&
    origUrl.search("/b-") !== -1
  ) {
    var searchService =
      ampServicesStartPoint +
      "/marketplacewebservices/v2/mpl/products/searchProductPwAmp?searchText=";
    var pageSize = 20;
    var pageNo = 0;
    var channelText = "category_brand_amp";
    var middleUrlPart = "&pageSize=20&page=";
    var tailUrlPart = "&isTextSearch=false&isPwa=true";
    var canonicalPlpAmpUrl = req.protocol + "://" + req.get("host") + origUrl;
    var canonicalPlpPwaUrl =
      req.protocol + "://" + req.get("host") + removeWord(origUrl, "/amp");
    var q = url.parse(canonicalPlpAmpUrl, true);

    var metaKeywords = "";
    var metaDescription = "";
    var urlSearch = q.pathname.split("/c-");
    var urlSearchCode = urlSearch[1].split("/b-");
    var categoryText = "";
    if (
      urlSearch[1].search("msh") !== -1 &&
      urlSearch[1].search("mbh") !== -1
    ) {
      categoryText =
        ":relevance:category:" +
        urlSearchCode[0].toUpperCase() +
        ":brand:" +
        urlSearchCode[1].toUpperCase();
    }
    var data = {
      metaKeywords: metaKeywords,
      metaDescription: metaDescription,
      pageNameInfo: "product grid",
      searchService: searchService,
      searchTerm: categoryText,
      channel: channelText,
      middleUrlPart: middleUrlPart,
      tailUrlPart: tailUrlPart,
      pageNo: pageNo,
      ampCrossDomainUrl: ampCrossDomainUrl,
      canonicalAmpUrl: canonicalPlpAmpUrl,
      canonicalPwaUrl: canonicalPlpPwaUrl
    };
    res.render("../build/amp/plp_layout.ejs", data);
  } else if (origUrl.search("stats") !== -1) {
    console.log("STATS ---");
    res.render("../build/amp/stats.ejs");

    //Code end for AMP
  } else {
    // if (isBrowser) {
    // var q = url.parse(req.url, true);
    // if (q.pathname === "/cart" || q.pathname === "/checkout") {
    //   res.sendFile(__dirname + "/build/other.html");
    // } else {
    // res.sendFile(__dirname + "/build/index.html");
    // }
    // } else
    res.sendFile(__dirname + "/build/index.html");
  }
});

app.set("view engine", "ejs");

app.listen(3000, () => console.log("Server running on port 3000"));
