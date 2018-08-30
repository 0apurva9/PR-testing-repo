import {
  EXPRESS,
  COLLECT,
  SHORT_COLLECT,
  SHORT_EXPRESS,
  HOME_DELIVERY
} from "../../lib/constants";
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
