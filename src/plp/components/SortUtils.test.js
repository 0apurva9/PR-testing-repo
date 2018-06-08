const DUMMY_CATEGORY_VALUE = "msh121000";
const ANOTHER_DUMMY_CATEGORY_VALUE = "msh121100";

const DUMMY_L1_CATEGORY_VALUE = "msh12";
const DUMMY_L2_CATEGORY_VALUE = "msh12";

const DUMMY_BRAND_VALUE = "mbh1210";
const DUMMY_ICID2 = "aut:main:dm3:m2103:wmn:krt:04:260218";
const DUMMY_ICID2_URL = `&icid2=${DUMMY_ICID2}`;
const DUMMY_CID_URL = `&cid=${DUMMY_ICID2}`;

import { applySortToUrl } from "./SortUtils.js";
import { ARRAY_OF_SORTS } from "./Sort.js";
import { ICID2 } from "../../lib/adobeUtils";

it("should work with category landing page", () => {
  let url = `/electronics-mobile-phones/c-${ANOTHER_DUMMY_CATEGORY_VALUE}${DUMMY_ICID2_URL}`;
  let endUrl = applySortToUrl("", url, ARRAY_OF_SORTS[3], DUMMY_ICID2);
  expect(endUrl).toEqual(
    `/search/?q=:${
      ARRAY_OF_SORTS[3]
    }:category:${ANOTHER_DUMMY_CATEGORY_VALUE.toUpperCase()}${DUMMY_ICID2_URL}`
  );
});

it("should work with a category page that has a query", () => {
  let url = `/footwear-men-sneakers/c-${DUMMY_CATEGORY_VALUE}`;
  let endUrl = applySortToUrl(
    ":relevance:inStockFlag:true:isLuxuryProduct:false",
    url,
    ARRAY_OF_SORTS[3],
    "auto:mul:msd:MSH1311115:all:none:00:030518"
  );

  expect(endUrl).toEqual(
    `/search/?q=:${
      ARRAY_OF_SORTS[3]
    }:inStockFlag:true:isLuxuryProduct:false:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}&icid2=auto:mul:msd:MSH1311115:all:none:00:030518`
  );
});

it("should work with brand landing page", () => {
  let url = `/electronics-mobile-phones/c-${DUMMY_BRAND_VALUE}${DUMMY_ICID2_URL}`;
  let endUrl = applySortToUrl("", url, ARRAY_OF_SORTS[3], DUMMY_ICID2);
  expect(endUrl).toEqual(
    `/search/?q=:${
      ARRAY_OF_SORTS[3]
    }:brand:${DUMMY_BRAND_VALUE.toUpperCase()}${DUMMY_ICID2_URL}`
  );
});

it("should work with search/?q=<text>", () => {
  let endUrl = applySortToUrl(
    "shirt",
    `search/?q=shirt${DUMMY_CID_URL}`,
    ARRAY_OF_SORTS[3],
    null,
    DUMMY_ICID2
  );
  expect(endUrl).toEqual(
    `/search/?q=shirt:${ARRAY_OF_SORTS[3]}${DUMMY_CID_URL}`
  );
});

it("should work with search/?q=<text>:sort", () => {
  let endUrl = applySortToUrl(
    "shirt:relevance",
    `search/?q=shirt:relevance${DUMMY_ICID2_URL}`,
    ARRAY_OF_SORTS[3],
    DUMMY_ICID2
  );

  expect(endUrl).toEqual(
    `/search/?q=shirt:${ARRAY_OF_SORTS[3]}${DUMMY_ICID2_URL}`
  );
});

it("should work with search/?q=:sort", () => {
  let endUrl = applySortToUrl(
    `:${ARRAY_OF_SORTS[0]}`,
    `/search/?q=${ARRAY_OF_SORTS[0]}`,
    ARRAY_OF_SORTS[3]
  );
  expect(endUrl).toEqual(`/search/?q=:${ARRAY_OF_SORTS[3]}`);
});

it("should work with /search/?q=:sort:category:<SOME CATEGORY>", () => {
  let endUrl = applySortToUrl(
    `:${ARRAY_OF_SORTS[0]}:category:${DUMMY_CATEGORY_VALUE}`,
    `/search/?q=:${ARRAY_OF_SORTS[0]}:category:${DUMMY_CATEGORY_VALUE}`,
    ARRAY_OF_SORTS[3]
  );

  expect(endUrl).toEqual(
    `/search/?q=:${ARRAY_OF_SORTS[3]}:category:${DUMMY_CATEGORY_VALUE}`
  );
});

it("should work with /search/?q=text:sort:category:<SOME_CATEGORY>", () => {
  let endUrl = applySortToUrl(
    `shirt:${ARRAY_OF_SORTS[0]}:category:${DUMMY_CATEGORY_VALUE}`,
    `/search/?q=shirt:${ARRAY_OF_SORTS[0]}:category:${DUMMY_CATEGORY_VALUE}`,
    ARRAY_OF_SORTS[3]
  );

  expect(endUrl).toEqual(
    `/search/?q=shirt:${ARRAY_OF_SORTS[3]}:category:${DUMMY_CATEGORY_VALUE}`
  );
});

it("should work with /search/?q=:category:<SOME_CATEGORY>", () => {
  let endUrl = applySortToUrl(
    `:category:${DUMMY_CATEGORY_VALUE}`,
    `/search/?q=:category:${DUMMY_CATEGORY_VALUE}`,
    ARRAY_OF_SORTS[2]
  );

  expect(endUrl).toEqual(
    `/search/?q=:${ARRAY_OF_SORTS[2]}:category:${DUMMY_CATEGORY_VALUE}`
  );
});

it("should work with /search/?q=:brand:<SOME BRAND>", () => {
  let endUrl = applySortToUrl(
    `:brand:${DUMMY_BRAND_VALUE}`,
    `/search/?q=:brand:${DUMMY_BRAND_VALUE}`,
    ARRAY_OF_SORTS[3]
  );

  expect(endUrl).toEqual(
    `/search/?q=:${ARRAY_OF_SORTS[3]}:brand:${DUMMY_BRAND_VALUE}`
  );
});

it("should work with /search/?q=text:brand:<SOME BRAND>", () => {
  let endUrl = applySortToUrl(
    `text:brand:${DUMMY_BRAND_VALUE}`,
    `/search/?q=text:brand:${DUMMY_BRAND_VALUE}`,
    ARRAY_OF_SORTS[3]
  );

  expect(endUrl).toEqual(
    `/search/?q=text:${ARRAY_OF_SORTS[3]}:brand:${DUMMY_BRAND_VALUE}`
  );
});

it("should work with /search/?q=text:category:<SOME_CATEGORY", () => {
  let endUrl = applySortToUrl(
    `text:category:${DUMMY_CATEGORY_VALUE}`,
    `/search/?q=text:category:${DUMMY_CATEGORY_VALUE}`,
    ARRAY_OF_SORTS[5]
  );

  expect(endUrl).toEqual(
    `/search/?q=text:${ARRAY_OF_SORTS[5]}:category:${DUMMY_CATEGORY_VALUE}`
  );
});

it("should work with /search/?q=text:category:<SOME_CATEGORY:brand:<SOME_BRAND>", () => {
  let endUrl = applySortToUrl(
    `text:category:${DUMMY_CATEGORY_VALUE}:brand:${DUMMY_BRAND_VALUE}`,
    `/search/?q=text:category:${DUMMY_CATEGORY_VALUE}:brand:${DUMMY_BRAND_VALUE}`,
    ARRAY_OF_SORTS[2]
  );

  expect(endUrl).toEqual(
    `/search/?q=text:${
      ARRAY_OF_SORTS[2]
    }:category:${DUMMY_CATEGORY_VALUE}:brand:${DUMMY_BRAND_VALUE}`
  );
});

it("should work with custom sku pages, or pages that look like /custom/:slug", () => {
  let endUrl = applySortToUrl("", `/custom/test-page`, ARRAY_OF_SORTS[2]);

  expect(endUrl).toEqual(
    `/search/?q=:${ARRAY_OF_SORTS[2]}:collectionIds:test-page`
  );
});
