export function convertNumber(price) {
  let formattedNumber;
  let value = price;
  if (
    value &&
    value !== null &&
    typeof value !== "number" &&
    value.includes("₹")
  ) {
    value = value.replace("₹", "");
  }
  formattedNumber = value && value > 0 ? Math.round(value * 100) / 100 : "0.00";
  return formattedNumber;
}
