import { isBrowser } from "browser-or-node";

export function checkUserAgentIsMobile() {
  if (isBrowser) {
    let isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i.test(
      navigator.userAgent
    );
    return isMobile;
  } else return false;
}
