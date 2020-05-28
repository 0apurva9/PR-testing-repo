import { reverse } from "../pdp/reducers/utils";

export const VIEW_PRODUCT = "VIEW_PRODUCT";

export function setTracker(type, responseData) {
  if (type === VIEW_PRODUCT && window._osViewProduct) {
    const objCategory = responseData.seo.breadcrumbs;
    const reverseCategory = reverse(objCategory);
    let categoryList = reverseCategory
      .map(category => {
        return category.name;
      })
      .join(" > ");

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
}
