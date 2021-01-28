/* eslint-disable no-restricted-globals */
// importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js");
import { StaleWhileRevalidate } from "workbox-strategies";
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing/registerRoute";
import { setCacheNameDetails, skipWaiting, clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration/ExpirationPlugin";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

// clevertap push notification
// eslint-disable-next-line no-undef
importScripts("https://s3-eu-west-1.amazonaws.com/static.wizrocket.com/js/sw_webpush.js");
self.__WB_DISABLE_DEV_LOGS = true;
// cache name
setCacheNameDetails({
    prefix: "tatacliq-cache",
    precache: "precache",
    runtime: "runtime",
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", event => {
    const { request } = event;
    const url = new URL(request.url);
    const refererUrl = new URL(request.referrer);
    if (url.pathname.match(/.(png|svg|jpg|jpeg)$/g) && refererUrl.pathname === "/") {
        event.respondWith(
            new StaleWhileRevalidate({
                cacheName: "tatacliq-desktop-cache-Images",
                plugins: [
                    new ExpirationPlugin({
                        maxAgeSeconds: 60 * 60 * 24 * 7,
                        maxEntries: 100,
                        purgeOnQuotaError: true,
                    }),
                ],
            }).handle({ event, request })
        );
    }
});

registerRoute(
    "/",
    new StaleWhileRevalidate({
        cacheName: "tatacliq-desktop-cache-homepage",
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 5,
                maxEntries: 1,
                purgeOnQuotaError: true,
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    })
);
precacheAndRoute([...self.__WB_MANIFEST]);
skipWaiting();
clientsClaim();
cleanupOutdatedCaches();
