import {
  EXPRESS,
  COLLECT,
  SHORT_COLLECT,
  SHORT_EXPRESS,
  HOME_DELIVERY
} from "../../lib/constants";
const REGULAR_EXPRESSION_FOR_ALPHABET = /^[A-Z]$/i;

export function transferPincodeToPdpPincode(validDeliveryModes) {
  let eligibleDeliveryModes = [];
  validDeliveryModes.forEach(delivery => {
    if (delivery.type === SHORT_EXPRESS) {
      eligibleDeliveryModes.push({ code: EXPRESS, name: "Express Delivery" });
    } else if (delivery.type === SHORT_COLLECT) {
      eligibleDeliveryModes.push({ code: COLLECT, name: "Collect" });
    } else {
      eligibleDeliveryModes.push({
        code: HOME_DELIVERY,
        name: "Home Delivery"
      });
    }
  });
  return eligibleDeliveryModes;
}

export function reverse(data) {
  var reverseObject = [],
    counter = 0;
  for (var i = data.length - 1; i >= 0; i -= 1) {
    reverseObject[counter] = data[i];
    counter += 1;
  }
  return reverseObject;
}

export function groupByBrandAccordingToFirstLetter(arr, prop) {
  return arr.reduce(function(groups, item) {
    let val = item[prop][0].toUpperCase();
    if (REGULAR_EXPRESSION_FOR_ALPHABET.test(val)) {
      val = item[prop][0].toUpperCase();
    } else {
      val = "#";
    }
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
}

export function renderComponent(
  componentItem,
  typeComponentMapping,
  props,
  componentDetailsObj
) {
  if (!componentItem.componentId) {
    return null;
  } else if (componentItem.componentId) {
    const typeCompMapping = typeComponentMapping[componentItem.componentId];
    if (typeCompMapping) {
      return (
        typeComponentMapping[componentItem.componentId] &&
        typeComponentMapping[componentItem.componentId](
          props,
          componentDetailsObj
        )
      );
    } else {
      console.log(
        "Missing component implementation",
        componentItem.componentId
      );
    }
  } else {
    return null;
  }
}

export function sortArrayOfObjectByIntegerKeyValue(array, keyName) {
  return array.sort((comp1, comp2) => {
    const pos1 = parseInt(comp1[keyName]);
    const pos2 = parseInt(comp2[keyName]);
    if (pos1 && pos2 && pos1 < pos2) {
      return -1;
    }

    if (pos1 && pos2 && pos1 > pos2) {
      return 1;
    }

    return 0;
  });
}

/**
 * This functions take two different arrays and a matching key with a flag and returns an object to the caller to set in state.
 *
 * @param {array} variantTheme - Array of objects
 * @param {array} variantOptions - Array of objects
 * @param {string} productListingId - String for comparision with productCode inside the key in the objects inside the arrays
 * @param {boolean} fromColorComponent - Flag to determine from where the function is called
 * @typedef {Object} StateObject1
 * @property {boolean} isSelected - Selected Size
 * @property {number} selectedIndex - Selected Size Index
 * @typedef {Object} StateObject2
 * @property {number} selectedSizeIndex - Selected Size Index
 * @return {StateObject1 | StateObject2}
 * @example
 * findSelectedSize(variantTheme, variantOptions, productListingId, true);
 */

export function findSelectedSize(
  variantTheme = [],
  variantOptions = [],
  productListingId,
  fromColorComponent = false
) {
  let sizeOptions = [];
  let selectedSize = [];
  let sizeToSetInState = {};
  if (variantTheme && variantTheme.length > 0) {
    sizeOptions = variantTheme && variantTheme.map(el => el.sizelink);
    selectedSize =
      sizeOptions &&
      sizeOptions.filter((el, i) => {
        if (
          el.productCode === productListingId &&
          el.isAvailable === true &&
          el.selected === true
        ) {
          if (fromColorComponent) {
            sizeToSetInState = { selectedSizeIndex: i };
          } else {
            sizeToSetInState = { isSelected: true, selectedIndex: i };
          }
        }
      });
  } else {
    sizeOptions = variantOptions && variantOptions.map(el => el.sizelink);
    selectedSize =
      sizeOptions &&
      sizeOptions.filter((el, i) => {
        if (el.productCode === productListingId && el.isAvailable === true) {
          if (fromColorComponent) {
            sizeToSetInState = { selectedIndex: i };
          } else {
            sizeToSetInState = { isSelected: true, selectedSizeIndex: i };
          }
        }
      });
  }
  return sizeToSetInState;
}
