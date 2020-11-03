import { reverse } from "../pdp/reducers/utils";

export const VIEW_PRODUCT = "VIEW_PRODUCT";
export const ADD_TO_CART = "ADD_TO_CART";
export const VIEW_CART = "VIEW_CART";
export const VIEW_CHECKOUT = "VIEW_CHECKOUT";
export const SALE_COMPLETED = "SALE_COMPLETED";

function mergeCategory(objCategory, isReverse) {
  const reverseCategory = isReverse ? reverse(objCategory) : objCategory;

  if (reverseCategory) {
    return reverseCategory
      .map(category => {
        return category.name ? category.name : category.category_name;
      })
      .join(" > ");
  } else {
    return null;
  }
}

function returnProductDetails(product) {
  let categoryList = product.categoryHierarchy
    ? mergeCategory(product.categoryHierarchy, false)
    : null;
  let productQuantity = product.qtySelectedByUser
    ? product.qtySelectedByUser
    : product.quantity
    ? product.quantity
    : 1;
  let productPrice = product.price ? `${product.price}` : product.pricevalue;
  let discountedPrice = product.offerPrice ? product.offerPrice : productPrice;
  return {
    skuId: product.productcode,
    sellerId: product.USSID,
    category: categoryList,
    productPrice: productPrice,
    currency: "INR",
    discount: discountedPrice,
    quantity: productQuantity
  };
}

export function setTracker(type, responseData) {
  if (!responseData) {
    return false;
  }
  let categoryList;
  if (responseData.seo && responseData.seo.breadcrumbs) {
    categoryList = mergeCategory(responseData.seo.breadcrumbs, true);
  }

  if (type === VIEW_PRODUCT && window._osViewProduct) {
    window._osViewProduct({
      products: [
        {
          skuId: responseData.productListingId,
          sellerId: responseData.winningSellerID,
          category: categoryList,
          productPrice:
            responseData.mrpPrice && responseData.mrpPrice.doubleValue
              ? `${responseData.mrpPrice.doubleValue}`
              : "",
          currency: "INR",
          discount:
            responseData.winningSellerPrice &&
            responseData.winningSellerPrice.doubleValue
              ? `${responseData.winningSellerPrice.doubleValue}`
              : ""
        }
      ]
    });
  }

  if (type === ADD_TO_CART && window._osAdd2Cart) {
    window._osAdd2Cart({
      products: [
        {
          skuId: responseData.productListingId,
          sellerId: responseData.winningSellerID,
          category: categoryList,
          productPrice:
            responseData.mrpPrice && responseData.mrpPrice.doubleValue
              ? `${responseData.mrpPrice.doubleValue}`
              : "",
          currency: "INR",
          discount:
            responseData.winningSellerPrice &&
            responseData.winningSellerPrice.doubleValue
              ? `${responseData.winningSellerPrice.doubleValue}`
              : "",
          quantity: responseData.quantity
        }
      ]
    });
  }

  if (type === VIEW_CART && window._osViewCart) {
    let cartDetailsTracker = {};
    cartDetailsTracker.products =
      responseData.products &&
      responseData.products.map(product => returnProductDetails(product));
    cartDetailsTracker.totalAmount =
      responseData.cartAmount &&
      responseData.cartAmount.paybleAmount &&
      responseData.cartAmount.paybleAmount.doubleValue &&
      `${responseData.cartAmount.paybleAmount.doubleValue}`;
    cartDetailsTracker.currency = "INR";
    window._osViewCart(cartDetailsTracker);
  }

  if (type === VIEW_CHECKOUT && window._osCheckout) {
    let cartDetailsTracker = {};
    cartDetailsTracker.products =
      responseData.products &&
      responseData.products.map(product => returnProductDetails(product));
    cartDetailsTracker.totalAmount =
      responseData.cartAmount &&
      responseData.cartAmount.paybleAmount &&
      responseData.cartAmount.paybleAmount.doubleValue &&
      `${responseData.cartAmount.paybleAmount.doubleValue}`;
    cartDetailsTracker.currency = "INR";
    window._osCheckout(cartDetailsTracker);
  }

  if (type === SALE_COMPLETED && window._osSaleComplete) {
    let orderDetailsTracker = {};
    orderDetailsTracker.products =
      responseData.products &&
      responseData.products.map(product => returnProductDetails(product));
    orderDetailsTracker.totalAmount = responseData.finalAmount
      ? `${responseData.finalAmount}`
      : responseData.totalOrderAmount
      ? `${responseData.totalOrderAmount}`
      : "";
    orderDetailsTracker.currency = "INR";
    orderDetailsTracker.orderId = responseData.orderRefNo
      ? responseData.orderRefNo
      : responseData.orderId;
    orderDetailsTracker.paymentMethod = responseData.paymentMethod;
    window._osSaleComplete(orderDetailsTracker);
  }
}
