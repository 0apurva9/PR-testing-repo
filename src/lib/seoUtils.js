import React from "react";
import MetaTags from "react-meta-tags";
import {
  GOOGLE_TAG_TITLE_DEFAULT,
  GOOGLE_TAG_IMAGE_DEFAULT,
  TWITTER_TAG_IMAGE_DEFAULT,
  TWITTER_TAG_TITLE_DEFAULT,
  FACEBOOK_TAG_IMAGE_DEFAULT,
  TITLE_DEFAULT
} from "./constants";
import { URL_ROOT } from "./apiRequest";

export const getPdpSchemaMetaTags = productDetails => {
  return (
    <MetaTags>
      <meta itemProp="priceCurrency" content="INR" />
      <meta itemProp="itemCondition" content="http://schema.org/NewCondition" />
    </MetaTags>
  );
};

export const renderMetaTags = (productDetails, isReviewPage: false) => {
  let title = "";
  let description = "",
    keywords = productDetails.seo.keywords;
  let canonicalUrl = productDetails.seo.canonicalURL
    ? productDetails.seo.canonicalURL
    : window.location.href;
  let alternateUrl = productDetails.seo.alternateURL
    ? productDetails.seo.alternateURL
    : window.location.href;
  title = productDetails.seo.title ? productDetails.seo.title : TITLE_DEFAULT;
  if (title.length === 0) {
    title = TITLE_DEFAULT;
  }

  if (canonicalUrl.length === 0) {
    canonicalUrl = window.location.href;
  }

  if (alternateUrl.length === 0) {
    alternateUrl = window.location.href;
  }

  description = productDetails.seo.description;
  if (isReviewPage) {
    description = `${productDetails.productName} Review - Check ${
      productDetails.productName
    } reviews, rating & other specifications.`;
    title = `${productDetails.productName} Reviews & Ratings - Tata CLiQ`;
  }

  if (productDetails.type == "productSearchPageWsDto") {
    let discountPercentArray = [];
    let maxDiscount = 0;
    if (productDetails.searchresult) {
      productDetails.searchresult.map(key => {
        discountPercentArray.push(parseInt(key.discountPercent));
      });
    }
    maxDiscount = Math.max.apply(0, discountPercentArray);
    if (
      productDetails.currentQuery.appliedFilters.indexOf("brand") != -1 &&
      productDetails.seo != undefined &&
      productDetails.searchresult != undefined &&
      productDetails.seo.title != undefined
    ) {
      title = `Buy ${productDetails.searchresult[0].brandname} ${
        productDetails.seo.title.split(" ")[0]
      } - Upto ${maxDiscount}% Off Online - TATA CLIQ`;
      description = `Shop for top ${productDetails.searchresult[0].brandname} ${
        productDetails.seo.title.split("|")[0]
      } Online with best offers online at TATA CLiQ. Buy best quality ${
        productDetails.seo.title.split("|")[0]
      } by ${
        productDetails.searchresult[0].brandname
      } with Free Shipping✯COD✯Easy Returns.`;
      keywords = `${productDetails.searchresult[0].brandname} ${
        productDetails.seo.title.split("|")[0]
      }, ${productDetails.searchresult[0].brandname} ${
        productDetails.seo.title.split("|")[0]
      } Online, Buy ${productDetails.searchresult[0].brandname} ${
        productDetails.seo.title.split("|")[0]
      }, Buy ${productDetails.searchresult[0].brandname} ${
        productDetails.seo.title.split("|")[0]
      } Online`;
    } else {
      if (
        productDetails.seo != undefined &&
        productDetails.seo.title != undefined
      ) {
        title = `Buy ${
          productDetails.seo.title.split(" ")[0]
        } - Upto ${maxDiscount}% Off Online - TATA CLIQ`;
        description = `Shop for top ${
          productDetails.seo.title.split("|")[0]
        } Online with best offers online at TATA CLiQ. Buy best quality ${
          productDetails.seo.title.split("|")[0]
        } with Free Shipping✯COD✯Easy Returns.`;
        keywords = `${productDetails.seo.title.split("|")[0]}, ${
          productDetails.seo.title.split("|")[0]
        } Online, Buy ${productDetails.seo.title.split("|")[0]}, Buy ${
          productDetails.seo.title.split("|")[0]
        } Online`;
      }
    }
  }
  if (window.location.href.indexOf("viewSellers") != -1) {
    title = `${productDetails.productName} Sellers at Tata CLIQ`;
    description = `Shop ${
      productDetails.productName
    } Online at Tata CLiQ. View sellers, Price and Shipping details for a hassle-free shopping experience.`;
  }

  return (
    <MetaTags>
      <title> {title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {window.location.href.indexOf("viewSellers") == -1 ? (
        <link
          rel="canonical"
          href={`${URL_ROOT}${canonicalUrl}`}
          hrefLang="en-in"
        />
      ) : null}

      <link
        rel="alternate"
        href={`${URL_ROOT}${alternateUrl}`}
        hrefLang="en-in"
      />
      {renderOgTags(productDetails, isReviewPage)}
    </MetaTags>
  );
};

export const renderMetaTagsWithoutSeoObject = () => {
  let description = "some default description";
  return (
    <MetaTags>
      <title> {TITLE_DEFAULT}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={window.location.href} hrefLang="en-in" />
      <link rel="alternate" href={window.location.href} hrefLang="en-in" />
      {renderOgTags()}
    </MetaTags>
  );
};

export const renderOgTags = (productDetails, isReviewPage: false) => {
  let googleTitle = GOOGLE_TAG_TITLE_DEFAULT;
  let googleDescription = null;
  let googleImageUrl = GOOGLE_TAG_IMAGE_DEFAULT;
  let twitterTitle = TWITTER_TAG_TITLE_DEFAULT;
  let twitterImageUrl = TWITTER_TAG_IMAGE_DEFAULT;
  let twitterDescription = null;
  let facebookDescription = null;
  let facebookUrl = window.location.href;
  let facebookImageUrl = FACEBOOK_TAG_IMAGE_DEFAULT;
  let facebookTitle = null;
  if (productDetails && productDetails.seo) {
    googleTitle = productDetails.seo.title;
    googleDescription = productDetails.seo.description;
    googleImageUrl = productDetails.seo.imageURL;
    twitterTitle = productDetails.seo.title;
    twitterImageUrl = productDetails.seo.imageURL;
    twitterDescription = productDetails.seo.description;
    facebookDescription = productDetails.seo.description;
    facebookUrl = window.location.href;
    facebookTitle = productDetails.seo.title;
    facebookImageUrl = productDetails.seo.imageURL;
    if (isReviewPage) {
      googleTitle = `${
        productDetails.productName
      } Reviews & Ratings - Tata CLiQ`;
      twitterTitle = `${
        productDetails.productName
      } Reviews & Ratings - Tata CLiQ`;
      facebookTitle = `${
        productDetails.productName
      } Reviews & Ratings - Tata CLiQ`;
      googleDescription = `${productDetails.productName} Review - Check ${
        productDetails.productName
      } reviews, rating & other specifications.`;
      facebookDescription = `${productDetails.productName} Review - Check ${
        productDetails.productName
      } reviews, rating & other specifications.`;
      twitterDescription = `${productDetails.productName} Review - Check ${
        productDetails.productName
      } reviews, rating & other specifications.`;
    }
  }

  return (
    <React.Fragment>
      <meta itemProp="name" content={googleTitle} />
      {googleDescription && (
        <meta itemProp="description" content={googleDescription} />
      )}
      <meta itemProp="image" content={googleImageUrl} />
      <meta name="twitter:card" content="Website" />
      <meta name="twitter:site" content="@tatacliq" />
      <meta name="twitter:title" content={twitterTitle} />
      {twitterDescription && (
        <meta name="twitter:description" content={twitterDescription} />
      )}
      <meta name="twitter:image:src" content={twitterImageUrl} />
      <meta property="og:site_name" content="Tata CliQ" />
      <meta property="og:url" content={facebookUrl} />
      {facebookTitle && <meta property="og:title" content={facebookTitle} />}

      {facebookDescription && (
        <meta property="og:description" content={facebookDescription} />
      )}
      <meta property="og:image" content={facebookImageUrl} />
    </React.Fragment>
  );
};
