// Monetag Push Notification Service Worker
self.options = {
  "domain": "3nbf4.com",
  "zoneId": 11834501
};
self.lary = "";
importScripts('https://3nbf4.com/act/files/service-worker.min.js?r=sw');

// ShieldTools PWA Service Worker
const CACHE_NAME = "shieldtools-cache-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Let network requests pass through normally
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
