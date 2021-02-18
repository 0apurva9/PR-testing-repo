//TODO why are some cookies session and why are some timestamped?
// What is the difference?

// Taken from Quirks mode
import { isBrowser } from "browser-or-node";

export function createCookie(name, value, days) {
    let expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // ) removed
        expires = "; expires=" + date.toUTCString(); // + added
    }
    document.cookie = name + "=" + value + expires + ";path=/"; // + and " added
}

export function createCookieInMinutes(name, value, minutes) {
    let expires = "";
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + minutes * 60 * 1000); // ) removed
        expires = "; expires=" + date.toUTCString(); // + added
    }
    document.cookie = name + "=" + value + expires + ";path=/"; // + and " added
}

export function getCookie(cookieName) {
    if (isBrowser) {
        let match = document.cookie.match(new RegExp(cookieName + `=([^;]+)`));
        if (match) return match[1];
    } else {
        return null;
    }
}

export function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
export function getCookieValue(name) {
    var b = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");

    return b ? b.pop() : "";
}
