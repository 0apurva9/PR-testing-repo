const express = require("express");
const app = express();
var url = require("url");

app.enable("trust proxy");
app.use(function(req, res, next) {
  //if (req.headers.host === "e2e.tataunistore.com") {
  var ua = req.headers["user-agent"].toLowerCase(),
    isMobile =
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        ua
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        ua.substr(0, 4)
      );

  if (isMobile) {
    if (req.secure) {
      next();
    } else {
      res.redirect("https://m-e2e.tataunistore.com" + req.url);
    }
  } else {
    if (req.secure) {
      next();
    } else {
      res.redirect("https://" + req.headers.host + req.url);
    }
  }
  //}
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
    res.sendFile(__dirname + "/build/index.html");
  }
});

app.set("view engine", "ejs");

app.listen(3000, () => console.log("Server running on port 3000"));
