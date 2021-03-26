/* eslint-disable no-restricted-globals */
// importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js");
import { StaleWhileRevalidate, NetworkFirst, CacheFirst } from "workbox-strategies";
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL, matchPrecache } from "workbox-precaching";
import { registerRoute, NavigationRoute, setCatchHandler } from "workbox-routing";
import { setCacheNameDetails, skipWaiting, clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration/ExpirationPlugin";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

const componentName = "TUL_ServiceWorker";

// Enable debug mode during development
const DEBUG_MODE = location.hostname.endsWith(".app.local") || location.hostname === "localhost";

const DAY_IN_SECONDS = 24 * 60 * 60;
const MONTH_IN_SECONDS = DAY_IN_SECONDS * 30;
const YEAR_IN_SECONDS = DAY_IN_SECONDS * 365;

/**
 * The current version of the service worker.
 */
const SERVICE_WORKER_VERSION = "1.0.0";

if (DEBUG_MODE) {
    console.debug(`Service worker version ${SERVICE_WORKER_VERSION} loading...`);
}

// -------------------------------------------------------------
// Precaching configuration
// -------------------------------------------------------------
cleanupOutdatedCaches();

// Precaching
// Make sure that all the assets passed in the array below are fetched and cached
// The empty array below is replaced at build time with the full list of assets to cache
// This is done by workbox-build-inject.js for the production build
const assetsToCache = self.__WB_MANIFEST;

if (DEBUG_MODE) {
    console.trace(`${componentName}:: Assets that will be cached: `, assetsToCache);
}

precacheAndRoute(assetsToCache);

// cache name
setCacheNameDetails({
    prefix: "tatacliq-cache",
    precache: "precache",
    runtime: "runtime",
});

registerRoute(
    // Check to see if the request is a navigation to a new page
    ({ request }) => request.mode === "navigate",

    // Use a Network First caching strategy
    new NetworkFirst({
        // Put all cached files in a cache named 'pages'
        cacheName: "tatacliq-desktop-cache-homepage",
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new CacheableResponsePlugin({
                statuses: [200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 5,
                maxEntries: 1,
                purgeOnQuotaError: true,
            }),
        ],
    })
);

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
    })
);

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: YEAR_IN_SECONDS,
                maxEntries: 30,
                purgeOnQuotaError: true, // Automatically cleanup if quota is exceeded.
            }),
        ],
    })
);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
// registerRoute(
//     // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
//     ({ request }) =>
//         request.destination === "style" || request.destination === "script" || request.destination === "worker",
//     // Use a Stale While Revalidate caching strategy
//     new StaleWhileRevalidate({
//         // Put all cached files in a cache named 'assets'
//         cacheName: "tatacliq-desktop-cache-assets",
//         plugins: [
//             // Ensure that only requests that result in a 200 status are cached
//             new CacheableResponsePlugin({
//                 statuses: [200],
//             }),
//         ],
//     })
// );

// Cache images with a Cache First strategy
registerRoute(
    // Check to see if the request's destination is style for an image
    ({ request }) => request.destination === "image",
    // Use a Cache First caching strategy
    new CacheFirst({
        // Put all cached files in a cache named 'images'
        cacheName: "tatacliq-desktop-cache-images",
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new CacheableResponsePlugin({
                statuses: [200],
            }),
            // Don't cache more than 50 items, and expire them after 30 days
            new ExpirationPlugin({
                maxEntries: 250,
                maxAgeSeconds: MONTH_IN_SECONDS,
                purgeOnQuotaError: true, // Automatically cleanup if quota is exceeded.
            }),
        ],
    })
);

// Catch routing errors, like if the user is offline
setCatchHandler(async ({ event }) => {
    // Return the precached offline page if a document is being requested
    if (event.request.destination === "document") {
        return matchPrecache("/index.html");
    }

    return Response.error();
});

// clevertap push notification
// eslint-disable-next-line no-undef
importScripts("https://s3-eu-west-1.amazonaws.com/static.wizrocket.com/js/sw_webpush.js");

// -------------------------------------------------------------
// Messages
// -------------------------------------------------------------
self.addEventListener("message", event => {
    // TODO define/use correct data type
    if (event && event.data && event.data.type) {
        // return the version of this service worker
        if ("GET_VERSION" === event.data.type) {
            if (DEBUG_MODE) {
                console.debug(`${componentName}:: Returning the service worker version: ${SERVICE_WORKER_VERSION}`);
            }
            event.ports[0].postMessage(SERVICE_WORKER_VERSION);
        }

        // When this message is received, we can skip waiting and become active
        // (i.e., this version of the service worker becomes active)
        // Reference about why we wait: https://stackoverflow.com/questions/51715127/what-are-the-downsides-to-using-skipwaiting-and-clientsclaim-with-workbox
        if ("SKIP_WAITING" === event.data.type) {
            if (DEBUG_MODE) {
                console.debug(`${componentName}:: Skipping waiting...`);
            }
            skipWaiting();
        }

        // When this message is received, we can take control of the clients with this version
        // of the service worker
        if ("CLIENTS_CLAIM" === event.data.type) {
            if (DEBUG_MODE) {
                console.debug(`${componentName}:: Claiming clients and cleaning old caches`);
            }
            clientsClaim();
        }
    }
});
