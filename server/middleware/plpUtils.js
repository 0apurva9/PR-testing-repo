import queryString from "query-string";
import {
  SEARCH_CATEGORY_TO_IGNORE,
  SKU_PAGE,
  CATEGORY_PRODUCT_LISTINGS_WITH_PAGE,
  CATEGORY_PAGE_WITH_SLUG,
  BRAND_PRODUCT_LISTINGS_WITH_PAGE,
  BRAND_PAGE_WITH_SLUG,
  MAX_PRICE_FROM_API,
  MAX_PRICE_FROM_API_2,
  MAX_PRICE_FROM_UI,
  PRODUCT_LISTINGS,
  SKU_PAGE_FILTER
} from "../../src/lib/constants";
import ProductListingsContainer from "../../src/plp/containers/ProductListingsContainer";
import {
  CATEGORY_REGEX,
  BRAND_REGEX,
  BRAND_CATEGORY_PREFIX,
  BRAND_CAPTURE_REGEX,
  CATEGORY_CAPTURE_REGEX
} from "../../src/plp/components/PlpBrandCategoryWrapper";

// ok now I need to make sure that I am passing in the correct location and match

export const routes = [
  {
    path: PRODUCT_LISTINGS,
    component: ProductListingsContainer
  },
  {
    path: SKU_PAGE,
    component: ProductListingsContainer
  },
  {
    path: "/CustomSkuCollection/:slug/",
    component: ProductListingsContainer
  }
];

export function getPlpSearchText(location) {
  const url = location.pathname;
  let match;
  let searchText;
  const parsedQueryString = queryString.parse(location.search);
  if (parsedQueryString && parsedQueryString.q) {
    searchText = parsedQueryString.q;
    return searchText;
  }
  if (CATEGORY_REGEX.test(url)) {
    match = CATEGORY_CAPTURE_REGEX.exec(url)[0];
    match = match.replace(BRAND_CATEGORY_PREFIX, "");

    match = match.toUpperCase();

    searchText = `:relevance:category:${match}`;
  }

  if (BRAND_REGEX.test(url)) {
    match = BRAND_CAPTURE_REGEX.exec(url)[0];
    match = match.replace(BRAND_CATEGORY_PREFIX, "");

    match = match.toUpperCase();

    searchText = `:relevance:brand:${match}`;
  }

  return searchText;
}

export function getSearchTextFromUrl(location, match) {
  const parsedQueryString = queryString.parse(location.search);
  const searchCategory = parsedQueryString.searchCategory;
  let searchText = parsedQueryString.q;
  if (
    searchCategory &&
    searchCategory !== "" &&
    searchCategory !== SEARCH_CATEGORY_TO_IGNORE
  ) {
    searchText = `:brand:${searchCategory}`;
  }
  if (!searchText) {
    searchText = parsedQueryString.text;
  }
  if (match.path === SKU_PAGE) {
    if (searchText) {
      if (searchText.includes("relevance")) {
        searchText = searchText.replace(
          ":relevance",
          `:relevance:collectionIds:${match.params.slug}`
        );
      } else if (
        searchText.includes("price-asc") &&
        !searchText.includes(`:price-asc:collectionIds:${match.params.slug}`)
      ) {
        searchText = searchText.replace(
          ":price-asc",
          `:price-asc:collectionIds:${match.params.slug}`
        );
      } else if (
        searchText.includes("price-desc") &&
        !searchText.includes(`:price-desc:collectionIds:${match.params.slug}`)
      ) {
        searchText = searchText.replace(
          ":price-desc",
          `:price-desc:collectionIds:${match.params.slug}`
        );
      }
    } else {
      searchText = `:relevance:collectionIds:${match.params.slug}`;
    }
  }
  if (
    match.path === CATEGORY_PRODUCT_LISTINGS_WITH_PAGE ||
    match.path === CATEGORY_PAGE_WITH_SLUG
  ) {
    if (searchText) {
      if (searchText.includes("relevance")) {
        searchText = searchText.replace(
          ":relevance",
          `:relevance:category:${match.params[0].toUpperCase()}`
        );
      } else if (
        searchText.includes("price-asc") &&
        !searchText.includes(
          `:price-asc:category:${match.params[0].toUpperCase()}`
        )
      ) {
        searchText = searchText.replace(
          ":price-asc",
          `:price-asc:category:${match.params[0].toUpperCase()}`
        );
      } else if (
        searchText.includes("price-desc") &&
        !searchText.includes(
          `:price-desc:category:${match.params[0].toUpperCase()}`
        )
      ) {
        searchText = searchText.replace(
          ":price-desc",
          `:price-desc:category:${match.params[0].toUpperCase()}`
        );
      }
    } else {
      searchText = `:relevance:category:${match.params[0].toUpperCase()}`;
    }
  }
  if (
    match.path === BRAND_PRODUCT_LISTINGS_WITH_PAGE ||
    match.path === BRAND_PAGE_WITH_SLUG
  ) {
    if (searchText) {
      if (searchText.includes("relevance")) {
        searchText = searchText.replace(
          ":relevance",
          `:relevance:brand:${match.params[0].toUpperCase()}`
        );
      } else if (
        searchText.includes("price-asc") &&
        !searchText.includes(
          `:price-asc:brand:${match.params[0].toUpperCase()}`
        )
      ) {
        searchText = searchText.replace(
          ":price-asc",
          `:price-asc:brand:${match.params[0].toUpperCase()}`
        );
      } else if (
        searchText.includes("price-desc") &&
        !searchText.includes(
          `:price-desc:brand:${match.params[0].toUpperCase()}`
        )
      ) {
        searchText = searchText.replace(
          ":price-desc",
          `:price-desc:brand:${match.params[0].toUpperCase()}`
        );
      }
    } else {
      searchText = `:relevance:brand:${match.params[0].toUpperCase()}`;
    }
  }
  if (searchText) {
    searchText = searchText.replace("+", " ");
    if (!searchText.includes("screenSize-classification")) {
      searchText = searchText.replace(MAX_PRICE_FROM_API, MAX_PRICE_FROM_UI);
    }
    searchText = searchText.replace(MAX_PRICE_FROM_API_2, MAX_PRICE_FROM_UI);
  }
  if (!searchText.includes("relevance")) {
    searchText = `${searchText}:relevance`;
  }

  return encodeURIComponent(searchText);
}
