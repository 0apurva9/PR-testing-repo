export function getBrowserAndDeviceDetails(value) {
  console.log("checking Value:", navigator);
  var nAgt = navigator.userAgent;
  var fullVersion = "" + parseFloat(navigator.appVersion);
  var nameOffset, verOffset, ix, browserName;

  // In Opera 15+, the true version is after "OPR/"
  if ((verOffset = nAgt.indexOf("OPR/")) !== -1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset + 4);
  }
  // In older Opera, the true version is after "Opera" or after "Version"
  else if ((verOffset = nAgt.indexOf("Opera")) !== -1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf("Version")) !== -1)
      fullVersion = nAgt.substring(verOffset + 8);
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset = nAgt.indexOf("MSIE")) !== -1) {
    browserName = "Microsoft Internet Explorer";
    fullVersion = nAgt.substring(verOffset + 5);
  }
  // Edge
  else if ((verOffset = nAgt.indexOf("Edge")) !== -1) {
    browserName = "Microsoft Edge";
    fullVersion = nAgt.substring(verOffset + 5);
  }
  // In Chrome, the true version is after "Chrome"
  else if ((verOffset = nAgt.indexOf("Chrome")) !== -1) {
    browserName = "Chrome";
    fullVersion = nAgt.substring(verOffset + 7);
  }
  // In Safari, the true version is after "Safari" or after "Version"
  else if ((verOffset = nAgt.indexOf("Safari")) !== -1) {
    browserName = "Safari";
    fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf("Version")) !== -1)
      fullVersion = nAgt.substring(verOffset + 8);
  }
  // In Firefox, the true version is after "Firefox"
  else if ((verOffset = nAgt.indexOf("Firefox")) !== -1) {
    browserName = "Firefox";
    fullVersion = nAgt.substring(verOffset + 8);
  }
  // In most other browsers, "name/version" is at the end of userAgent
  else if (
    (nameOffset = nAgt.lastIndexOf(" ") + 1) <
    (verOffset = nAgt.lastIndexOf("/"))
  ) {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);
  }
  // trim the fullVersion string at semicolon/space if present
  if ((ix = fullVersion.indexOf(";")) !== -1)
    fullVersion = fullVersion.substring(0, ix);
  if ((ix = fullVersion.indexOf(" ")) !== -1)
    fullVersion = fullVersion.substring(0, ix);

  // var nAgt = navigator.userAgent;
  var start = nAgt.indexOf("(") + 1;
  var end = nAgt.indexOf(")");
  var deviceInfo = nAgt.substring(start, end);
  var networkType = "";
  if (navigator.connection && navigator.connection.effectiveType) {
    networkType = navigator.connection.effectiveType;
  }

  //to get android device details
  var osName = "";
  var osVersion = "";
  var model = "";
  if (deviceInfo.includes("Android")) {
    var startChar = deviceInfo.indexOf("Android");
    var endChar = deviceInfo.indexOf(";", startChar);
    var osNVersion = deviceInfo.substring(startChar, endChar);

    var eachDetail = osNVersion.split(" ");
    if (eachDetail.length > 0) {
      osName = eachDetail[0];
      osVersion = eachDetail[1];
    }

    var deviceInfoArr = deviceInfo.split(";");
    if (deviceInfoArr.length > 0) {
      model = deviceInfoArr[deviceInfoArr.length - 1].trim();
    }
  }

  //ios
  if (deviceInfo.includes("iPhone")) {
    var deviceInfoArray = deviceInfo.split(";");
    if (deviceInfoArray.length > 0) {
      model = deviceInfoArray[0];
      osName = deviceInfoArray[1].trim();
      osVersion = osName;
    }
  }

  //Other-Nokia, blackberry
  if (!deviceInfo.includes("Android") && !deviceInfo.includes("iPhone")) {
    var devInfoArr = deviceInfo.split(";");
    if (devInfoArr.length > 0) {
      osName = devInfoArr[0];
      osVersion = devInfoArr[1].trim();
    }
  }

  var deviceData =
    osName + "|" + osVersion + "|" + model + "|" + model + "|" + model + "|";

  if (value === 1) {
    return browserName;
  }
  if (value === 2) {
    return fullVersion;
  }
  if (value === 3) {
    return deviceData;
  }
  if (value === 4) {
    return networkType;
  }
}
