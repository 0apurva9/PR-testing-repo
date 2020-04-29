import { getMcvId } from "./adobeUtils.js";
import { getCookie } from "./Cookie.js";
import * as constants from "../lib/constants.js";

const MSD_NUM_PRODUCTS = 10;
const MSD_NUM_RESULTS = 10;
const FOLLOWED_WIDGET_WIDGET_LIST = ["tata_2"]; // weirdly it's not done.
const FRESH_FROM_BRANDS_WIDGET_LIST = ["tata_3"];
const DISCOVER_MORE_WIDGET_LIST = ["tata_4"];
const AUTOMATED_BRAND_CAROUSEL_WIDGET_LIST = ["tata_1"];
const AUTO_FRESH_FROM_BRANDS = "Auto Fresh From Brands Component";
const DISCOVER_MORE = "Auto Discover More Component";
const AUTOMATED_BRAND_CAROUSEL = "Automated Banner Product Carousel Component";
const FOLLOW_WIDGET = "Auto Following Brands Component";
const MSD_API_KEY = "8783ef14595919d35b91cbc65b51b5b1da72a5c3";

export async function getMsdFormData(widgetList, numberOfResults: [10]) {
  let msdRequestObject = new FormData();
  let userDetails = getCookie(constants.LOGGED_IN_USER_DETAILS);
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
  }
  msdRequestObject.append("api_key", MSD_API_KEY);
  msdRequestObject.append("widget_list", JSON.stringify(widgetList));
  msdRequestObject.append("num_results", JSON.stringify(numberOfResults));
  const mcvId = await getMcvId();
  msdRequestObject.append("mad_uuid", mcvId);
  msdRequestObject.append("details", false);
  if (userDetails && userDetails.userName) {
    msdRequestObject.append("user_id", userDetails.userName);
  }
  return msdRequestObject;
}
