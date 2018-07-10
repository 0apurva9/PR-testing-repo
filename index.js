const express = require("express");
const app = express();
var url = require("url");

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

app.get("/*", (req, res) => {
  const origUrl = req.originalUrl;

  //Code start for AMP
  if(origUrl.search("/amp/home") !== -1){

    var metaKeywords = "Tatacliq, Online Shopping, Online Shopping India";
    var metaDescription = "Online Shopping Site in India - Upto 60% Off On Mobiles, Electronics & Fashion at Tata CLiQ";
    var canonicalHomeAmpUrl = req.protocol + "://" + req.get("host") + origUrl;
    var canonicalHomePwaUrl = req.protocol + "://" + req.get("host");

    var data = {
      metaKeywords: metaKeywords,
      metaDescription: metaDescription,
      canonicalAmpUrl: canonicalHomeAmpUrl,
      canonicalPwaUrl: canonicalHomePwaUrl
    };

    console.log("Home Loading");
    res.render("../build/amp/home.ejs", data);

  } else if (origUrl.search("/amp/") !== -1 && origUrl.search("/p-") !== -1) {
    var productCode = origUrl.split("p-")[1];
    var productDataAPI = "/src/product.json";
    var canonicalAmpUrl = req.protocol + "://" + req.get("host") + origUrl;
    var canonicalPwaUrl =
      req.protocol + "://" + req.get("host") + removeWord(origUrl, "/amp");

    console.log("--------------------- PDP ------------------");
    console.log(canonicalAmpUrl);
    console.log(canonicalPwaUrl);

    var pdpUrl =
      "https://tmppprd.tataunistore.com/marketplacewebservices/v2/mpl/products/productDetails/amp/" +
      productCode +
      "?isPwa=true";
    var sizeGuideURL =
      "https://tmppprd.tataunistore.com/marketplacewebservices/v2/mpl/products/" +
      productCode +
      "/sizeGuide/amp/?isPwa=true";

    var data = {
      productId: productCode,
      pdpAPI: pdpUrl,
      sizeGuideURL: sizeGuideURL,
      productData: productDataAPI,
      canonicalAmpUrl: canonicalAmpUrl,
      canonicalPwaUrl: canonicalPwaUrl
    };
    res.render("../build/amp/pdp_layout.ejs", data);
  } else if (
    origUrl.search("/amp/") !== -1 &&
    origUrl.search("search/") !== -1
  ) {
    var searchService =
      "https://tmppprd.tataunistore.com/marketplacewebservices/v2/mpl/products/searchProductPwAmp?searchText=";
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

    console.log("--------------------- PLP ------------------");
    console.log("Canonical AMP : " + canonicalPlpAmpUrl);
    console.log("Canonical PWA : " + canonicalPlpPwaUrl);
    console.log("Meta Keywords : " + metaKeywords);
    console.log("Meta Description : " + metaDescription);

    var data = {
      metaKeywords: metaKeywords,
      metaDescription: metaDescription,
      searchService: searchService,
      searchTerm: q.query.text,
      middleUrlPart: middleUrlPart,
      tailUrlPart: tailUrlPart,
      pageNo: pageNo,
      canonicalAmpUrl: canonicalPlpAmpUrl,
      canonicalPwaUrl: canonicalPlpPwaUrl
    };
    res.render("../build/amp/plp_layout.ejs", data);
  } else if (origUrl.search("/amp/") !== -1 && origUrl.search("/c-") !== -1) {
    var searchService =
      "https://tmppprd.tataunistore.com/marketplacewebservices/v2/mpl/products/searchProductPwAmp?searchText=";
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

    var urlPathName = q.pathname.split("/");
    var urlPathText = urlPathName[3].split("-");

    var categoryText = "";
    if (urlPathText[1].search("msh") !== -1) {
      categoryText = "category";
    } else if (urlPathText[1].search("mbh") !== -1) {
      categoryText = "brand";
    }
    var data = {
      metaKeywords: metaKeywords,
      metaDescription: metaDescription,
      searchService: searchService,
      searchTerm:
        "%3Arelevance%3A" + categoryText + "%3A" + urlPathText[1].toUpperCase(),
      middleUrlPart: middleUrlPart,
      tailUrlPart: tailUrlPart,
      pageNo: pageNo,
      canonicalAmpUrl: canonicalPlpAmpUrl,
      canonicalPwaUrl: canonicalPlpPwaUrl
    };
    res.render("../build/amp/plp_layout.ejs", data);
  } else if (origUrl.search("stats") !== -1) {
    console.log("STATS ---");
    res.render("../build/amp/stats.ejs");

    //Code end for AMP
  } else {
    res.sendFile(__dirname + "/build/index.html");
  }
});

app.set("view engine", "ejs");

app.listen(3000, () => console.log("Server running on port 3000"));
