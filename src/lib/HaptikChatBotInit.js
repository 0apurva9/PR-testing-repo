const env = process.env;

export function HaptikChatBotInitSetup() {
  const loadScripts = scriptContent => {
    const haptikInitialSetupScript = document.createElement("SCRIPT"),
      haptikSrcScript = document.createElement("SCRIPT");

    haptikInitialSetupScript.id = "init-setup";
    haptikInitialSetupScript.innerHTML = scriptContent;

    haptikSrcScript.type = "text/javascript";
    haptikSrcScript.id = "sdk-setup";
    haptikSrcScript.setAttribute("charset", "UTF-8");
    haptikSrcScript.async = true;
    haptikSrcScript.src = env.REACT_APP_HAPTIK_SRC_URL;

    const bodyEle = document.getElementsByTagName("body")[0];
    bodyEle.appendChild(haptikInitialSetupScript);
    bodyEle.appendChild(haptikSrcScript);
  };

  const haptikInitSetup = JSON.stringify({
    "business-id": env.REACT_APP_HAPTIK_BUSINESS_ID,
    "client-id": env.REACT_APP_HAPTIK_CLIENT_ID,
    "base-url": env.REACT_APP_HAPTIK_BASE_URL,
    "custom-button": true
  });

  loadScripts(`window.haptikInitSettings = ${haptikInitSetup}`);
}

export function RemoveHaptikBotScript() {
  const haptikInitScript = document.getElementById("init-setup"),
    haptikSrcScript = document.getElementById("sdk-setup"),
    haptikDivEle = document.getElementById("haptik-xdk-wrapper");
  haptikInitScript.remove();
  haptikSrcScript.remove();
  haptikDivEle.remove();
}
