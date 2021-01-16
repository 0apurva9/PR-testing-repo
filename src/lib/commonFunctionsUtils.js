// function to trim product name
// takes arguments as product name and required length of product to be shown
export function trimProductName(productName, requiredLength) {
  if (productName && productName.length > requiredLength) {
    return productName.substring(0, requiredLength - 1) + ".. ";
  } else {
    return productName;
  }
}
