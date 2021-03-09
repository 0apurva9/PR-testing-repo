import * as Cookie from "./Cookie";
import { LOGGED_IN_USER_DETAILS, CUSTOMER_ACCESS_TOKEN } from "./constants";
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

export async function HaptikChatBotInitSetup() {
    const loadScripts = (initScriptContent, customSignUpContent) => {
        const haptikInitialSetupScript = document.createElement("SCRIPT"),
            haptikSrcScript = document.createElement("SCRIPT"),
            haptikCustomSignUpScript = document.createElement("SCRIPT");

        //Haptik Init script
        haptikInitialSetupScript.id = "init-setup";
        haptikInitialSetupScript.innerHTML = initScriptContent;

        //Haptik bot Url script
        haptikSrcScript.type = "text/javascript";
        haptikSrcScript.id = "sdk-setup";
        haptikSrcScript.setAttribute("charset", "UTF-8");
        haptikSrcScript.async = true;
        haptikSrcScript.src = process.env.HAPTIK_SRC_URL;

        //Haptik custom signup script
        haptikCustomSignUpScript.id = "custom-signup";
        haptikCustomSignUpScript.innerHTML = customSignUpContent;

        const bodyEle = document.getElementsByTagName("body")[0];
        bodyEle.appendChild(haptikInitialSetupScript);
        bodyEle.appendChild(haptikSrcScript);
        bodyEle.appendChild(haptikCustomSignUpScript);
    };

    const customSignUpConfig = await getCustomSignUpConfig();

    const haptikInitSetup = JSON.stringify({
        "business-id": process.env.HAPTIK_BUSINESS_ID,
        "client-id": process.env.HAPTIK_CLIENT_ID,
        "base-url": process.env.HAPTIK_BASE_URL,
        "custom-button": true,
        "signup-type": "guest",
    });

    loadScripts(`window.haptikInitSettings = ${haptikInitSetup}`, customSignUpConfig);
}

export function RemoveHaptikBotScript() {
    const haptikInitScript = document.getElementById("init-setup"),
        haptikSrcScript = document.getElementById("sdk-setup"),
        haptikCustomSignUp = document.getElementById("custom-signup"),
        haptikDivEle = document.getElementById("haptik-xdk-wrapper");
    haptikInitScript.remove();
    haptikSrcScript.remove();
    haptikCustomSignUp.remove();
    haptikDivEle.remove();
}

async function getCustomSignUpConfig() {
    let customSignUpDataObj = {
        username:
            (userDetailsCookie &&
                `${JSON.parse(userDetailsCookie).firstName} ${JSON.parse(userDetailsCookie).lastName}`) ||
            "Guest User",
        auth_id: (userDetailsCookie && JSON.parse(userDetailsCookie).customerId) || generateRandomCharacterString(12),
        auth_code: (customerCookie && JSON.parse(customerCookie).access_token) || generateRandomCharacterString(12),
    };
    if (customerCookie && userDetailsCookie) {
        customSignUpDataObj["mobile_no"] = "";
        customSignUpDataObj["email"] = JSON.parse(userDetailsCookie).userName;
    }
    let scriptContent = `
    document.addEventListener('haptik_sdk', function() {
      HaptikSDK.signup(${JSON.stringify(customSignUpDataObj)}, function(success,error) {
        if (success) {
          console.log('SIGNUP REQUEST SUCCEEDED!');
        } else {
          console.log('ERROR:',error);
        }
      });
  })`;
    return scriptContent;
}

function generateRandomCharacterString(length = 10) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
