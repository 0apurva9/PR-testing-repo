import { reverse } from "../pdp/reducers/utils";

export const VIEW_PRODUCT = "VIEW_PRODUCT";
export const ADD_TO_CART = "ADD_TO_CART";
export const VIEW_CART = "VIEW_CART";
export const VIEW_CHECKOUT = "VIEW_CHECKOUT";
export const SALE_COMPLETED = "SALE_COMPLETED";

function mergeCategory(objCategory, isReverse) {
  const reverseCategory = isReverse ? reverse(objCategory) : objCategory;

  return reverseCategory
    .map(category => {
      return category.name ? category.name : category.category_name;
    })
    .join(" > ");
}

function returnProductDetails(product) {
  let categoryList = mergeCategory(product.categoryHierarchy, false);
  return {
    skuId: product.productcode,
    sellerId: product.USSID,
    category: categoryList,
    productPrice: `${product.price}`,
    currency: "INR",
    discount: product.offerPrice,
    quantity: product.qtySelectedByUser
  };
}

export function setTracker(type, responseData) {
  if (type === VIEW_PRODUCT && window._osViewProduct) {
    let categoryList = mergeCategory(responseData.seo.breadcrumbs, true);

    window._osViewProduct({
      products: [
        {
          skuId: responseData.productListingId,
          sellerId: responseData.winningUssID,
          category: categoryList,
          productPrice: `${responseData.mrpPrice.doubleValue}`,
          currency: "INR",
          discount: `${responseData.winningSellerPrice.doubleValue}`
        }
      ]
    });
  }
  if (type === ADD_TO_CART && window._osAdd2Cart) {
    let categoryList = mergeCategory(responseData.seo.breadcrumbs, true);

    window._osAdd2Cart({
      products: [
        {
          skuId: responseData.productListingId,
          sellerId: responseData.winningUssID,
          category: categoryList,
          productPrice: `${responseData.mrpPrice.doubleValue}`,
          currency: "INR",
          discount: `${responseData.winningSellerPrice.doubleValue}`,
          quantity: responseData.quantity
        }
      ]
    });
  }
  if (type === VIEW_CART && window._osViewCart) {
    let cartDetailsTracker = {};
    cartDetailsTracker.products = responseData.products.map(product =>
      returnProductDetails(product)
    );
    cartDetailsTracker.totalAmount =
      responseData.cartAmount &&
      responseData.cartAmount.paybleAmount &&
      `${responseData.cartAmount.paybleAmount.doubleValue}`;
    cartDetailsTracker.currency = "INR";
    window._osViewCart(cartDetailsTracker);
  }
  if (type === VIEW_CHECKOUT && window._osCheckout) {
    let cartDetailsTracker = {};
    cartDetailsTracker.products = responseData.products.map(product =>
      returnProductDetails(product)
    );
    cartDetailsTracker.totalAmount =
      responseData.cartAmount &&
      responseData.cartAmount.paybleAmount &&
      `${responseData.cartAmount.paybleAmount.doubleValue}`;
    cartDetailsTracker.currency = "INR";
    window._osCheckout(cartDetailsTracker);
  }
  if (type === SALE_COMPLETED && window._osSaleComplete) {
    let orderDetailsTracker = {};
    orderDetailsTracker.products = responseData.products.map(product =>
      returnProductDetails(product)
    );
    orderDetailsTracker.totalAmount = responseData.finalAmount
      ? `${responseData.finalAmount}`
      : `${responseData.totalOrderAmount}`;
    orderDetailsTracker.currency = "INR";
    orderDetailsTracker.orderId = responseData.orderRefNo
      ? responseData.orderRefNo
      : responseData.orderId;
    orderDetailsTracker.paymentMethod = responseData.paymentMethod;
    window._osSaleComplete(orderDetailsTracker);
  }
}
