import { getMcvId } from "./adobeUtils.js";
import { getCookie } from "./Cookie.js";
import * as constants from "../lib/constants.js";

const MSD_API_KEY = "8783ef14595919d35b91cbc65b51b5b1da72a5c3";

export async function getMsdFormData(widgetList, numberOfResults) {
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
    if (userDetails && userDetails.customerId) {
        msdRequestObject.append("user_id", userDetails.customerId);
    }
    return msdRequestObject;
}
