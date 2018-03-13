import { createUrlFromQueryAndCategory } from "./FilterUtils.js";
import { ARRAY_OF_SORTS } from "./Sort.js";

const DUMMY_CATEGORY_VALUE = "msh121000";
const ANOTHER_DUMMY_CATEGORY_VALUE = "msh121100";

const DUMMY_L1_CATEGORY_VALUE = "msh12";
const DUMMY_L2_CATEGORY_VALUE = "msh12";

const DUMMY_BRAND_VALUE = "mbh1210";

it("should work with category landing page", () => {
  let pathName = `/electronics-mobile-phones/c-${ANOTHER_DUMMY_CATEGORY_VALUE}`;
  let searchValue = "";
  let endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_CATEGORY_VALUE.toUpperCase()
  );
  expect(endUrl).toEqual(
    `/search/?q=:relevance:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}`
  );

  pathName = `/electronics-mobile-phones/c-${ANOTHER_DUMMY_CATEGORY_VALUE}`;
  searchValue = "";
  endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_L1_CATEGORY_VALUE.toUpperCase()
  );
  expect(endUrl).toEqual(
    `/search/?q=:relevance:category:${DUMMY_L1_CATEGORY_VALUE.toUpperCase()}`
  );
});

it("should work with brand landing page", () => {
  let pathName = `/electronics-mobile-phones/c-${DUMMY_BRAND_VALUE}`;
  let searchValue = "";

  let endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_CATEGORY_VALUE.toUpperCase()
  );

  expect(endUrl).toEqual(
    `/search/?q=:relevance:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}:brand:${DUMMY_BRAND_VALUE.toUpperCase()}`
  );

  pathName = `/electronics-mobile-phones/c-${DUMMY_BRAND_VALUE}`;
  searchValue = "";

  endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_L1_CATEGORY_VALUE.toUpperCase()
  );

  expect(endUrl).toEqual(
    `/search/?q=:relevance:category:${DUMMY_L1_CATEGORY_VALUE.toUpperCase()}:brand:${DUMMY_BRAND_VALUE.toUpperCase()}`
  );
});

it("should work with search/?q=<text>", () => {
  let pathName = "/search/?q=shirt";
  let searchValue = "shirt";
  let endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_CATEGORY_VALUE.toUpperCase()
  );
  expect(endUrl).toEqual(
    `/search/?q=:shirt:relevance:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}`
  );

  pathName = "/search/?q=shirt";
  searchValue = "shirt";
  endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_L2_CATEGORY_VALUE.toUpperCase()
  );
  expect(endUrl).toEqual(
    `/search/?q=:shirt:relevance:category:${DUMMY_L2_CATEGORY_VALUE.toUpperCase()}`
  );
});

test("should work with search/?q=<text>:sort", () => {
  let pathName = "/search/?q=shirt:relevance";
  let searchValue = "shirt:relevance";
  let endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_CATEGORY_VALUE.toUpperCase()
  );

  expect(endUrl).toEqual(
    `/search/?q=:shirt:relevance:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}`
  );

  pathName = `/search/?q=shirt:${ARRAY_OF_SORTS[3]}`;
  searchValue = `shirt:${ARRAY_OF_SORTS[3]}`;

  endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_CATEGORY_VALUE.toUpperCase()
  );

  expect(endUrl).toEqual(
    `/search/?q=:shirt:${
      ARRAY_OF_SORTS[3]
    }:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}`
  );

  endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_L2_CATEGORY_VALUE.toUpperCase()
  );

  expect(endUrl).toEqual(
    `/search/?q=:shirt:${
      ARRAY_OF_SORTS[3]
    }:category:${DUMMY_L2_CATEGORY_VALUE.toUpperCase()}`
  );
});

test("should work with search/?q=:sort", () => {
  let searchValue = ":relevance";
  let pathName = `/search/?q=${searchValue}`;

  let endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_CATEGORY_VALUE.toUpperCase()
  );

  expect(endUrl).toEqual(
    `/search/?q=:relevance:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}`
  );

  searchValue = `:${ARRAY_OF_SORTS[3]}`;
  pathName = `/search/?q=${searchValue}`;

  endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_CATEGORY_VALUE.toUpperCase()
  );

  expect(endUrl).toEqual(
    `/search/?q=:${
      ARRAY_OF_SORTS[3]
    }:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}`
  );

  endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_L2_CATEGORY_VALUE.toUpperCase()
  );

  expect(endUrl).toEqual(
    `/search/?q=:${
      ARRAY_OF_SORTS[3]
    }:category:${DUMMY_L2_CATEGORY_VALUE.toUpperCase()}`
  );
});

test("/search/?q=:sort:category:<SOME CATEGORY>", () => {
  let searchValue = `:relevance:category:${ANOTHER_DUMMY_CATEGORY_VALUE}`;
  let pathName = `/search/?q=${searchValue}`;
  let endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_CATEGORY_VALUE.toUpperCase()
  );

  expect(endUrl).toEqual(
    `/search/?q=:relevance:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}`
  );

  searchValue = `:${
    ARRAY_OF_SORTS[3]
  }:category:${ANOTHER_DUMMY_CATEGORY_VALUE}`;
  pathName = `/search/?q=${searchValue}`;
  endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_CATEGORY_VALUE.toUpperCase()
  );

  expect(endUrl).toEqual(
    `/search/?q=:${
      ARRAY_OF_SORTS[3]
    }:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}`
  );

  endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_L1_CATEGORY_VALUE.toUpperCase()
  );

  expect(endUrl).toEqual(
    `/search/?q=:${
      ARRAY_OF_SORTS[3]
    }:category:${DUMMY_L1_CATEGORY_VALUE.toUpperCase()}`
  );
});

test("/search/?q=:text:sort:category:<SOME_CATEGORY>", () => {
  let searchValue = `:shirt:relevance:category:${ANOTHER_DUMMY_CATEGORY_VALUE}`;
  let pathName = `/search/?q=${searchValue}`;
  let endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_CATEGORY_VALUE.toUpperCase()
  );
  expect(endUrl).toEqual(
    `/search/?q=:shirt:relevance:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}`
  );

  searchValue = `:shirt:${
    ARRAY_OF_SORTS[3]
  }:category:${ANOTHER_DUMMY_CATEGORY_VALUE}`;
  pathName = `/search/?q=${searchValue}`;
  endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_CATEGORY_VALUE.toUpperCase()
  );
  expect(endUrl).toEqual(
    `/search/?q=:shirt:${
      ARRAY_OF_SORTS[3]
    }:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}`
  );
});

test("/search/?q=:category:<SOME_CATEGORY>", () => {
  let searchValue = `:category:${ANOTHER_DUMMY_CATEGORY_VALUE}`;
  let pathName = `/search/?q=${searchValue}`;
  let endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_CATEGORY_VALUE.toUpperCase()
  );

  expect(endUrl).toEqual(
    `/search/?q=:relevance:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}`
  );
});

test("/search/?q=:brand:<SOME BRAND>", () => {
  let searchValue = `:brand:${DUMMY_BRAND_VALUE.toUpperCase()}`;
  let pathName = `/search/?q=${searchValue}`;
  let endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_CATEGORY_VALUE.toUpperCase()
  );

  expect(endUrl).toEqual(
    `/search/?q=:relevance:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}:brand:${DUMMY_BRAND_VALUE.toUpperCase()}`
  );
});

test("/search/?q=:text:brand:<SOME BRAND>", () => {
  let searchValue = `:shirt:brand:${DUMMY_BRAND_VALUE}`;
  let pathName = `/search/?q=${searchValue}`;
  let endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    DUMMY_CATEGORY_VALUE.toUpperCase()
  );
  expect(endUrl).toEqual(
    `/search/?q=:shirt:relevance:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}:brand:${DUMMY_BRAND_VALUE}`
  );
});

test("/search/?q=:text:category:<SOME_CATEGORY", () => {
  let searchValue = `:shirt:category:${DUMMY_CATEGORY_VALUE}`;
  let pathName = `/search/?q=${searchValue}`;
  let endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    ANOTHER_DUMMY_CATEGORY_VALUE.toUpperCase()
  );
  expect(endUrl).toEqual(
    `/search/?q=:shirt:relevance:category:${ANOTHER_DUMMY_CATEGORY_VALUE.toUpperCase()}`
  );
});

test("/search/?q=:text:category:<SOME_CATEGORY>:brand:<SOME_BRAND>", () => {
  let searchValue = `:shirt:category:${DUMMY_CATEGORY_VALUE.toUpperCase()}:brand:${DUMMY_BRAND_VALUE.toUpperCase()}`;
  let pathName = `/search/?q=${searchValue}`;
  let endUrl = createUrlFromQueryAndCategory(
    searchValue,
    pathName,
    ANOTHER_DUMMY_CATEGORY_VALUE.toUpperCase()
  );
  expect(endUrl).toEqual(
    `/search/?q=:shirt:relevance:category:${ANOTHER_DUMMY_CATEGORY_VALUE.toUpperCase()}:brand:${DUMMY_BRAND_VALUE.toUpperCase()}`
  );
});
