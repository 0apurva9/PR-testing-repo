export function checkUserAgentIsMobile() {
  let isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i.test(
    navigator.userAgent
  );
  return isMobile;
}
