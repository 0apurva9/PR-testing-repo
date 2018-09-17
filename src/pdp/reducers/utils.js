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
