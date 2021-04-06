// function to trim product name
// takes arguments as product name and required length of product to be shown
export function trimProductName(productName, requiredLength) {
  if (productName && productName.length > requiredLength) {
    return productName.substring(0, requiredLength - 1) + ".. ";
  } else {
    return productName;
  }
}


/**
 * function for creating 16 character unique id based on timestamp
 * @returns it return 16 character unique string
 */
export function getUniqueId() {
  return `${new Date().getTime().toString(36)}${Math.random().toString(36).substr(2, 8)}`
}