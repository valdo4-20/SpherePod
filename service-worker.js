"use strict";

var CACHE_NAME = "spherepod-shell-v4";
var APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./BotanicGrotesque-Regular.otf",
  "./assets/spherepod-logo-white.png",
  "./assets/spherepod-favicon-32.png",
  "./assets/spherepod-apple-touch-icon.png",
  "./assets/spherepod-icon-192.png",
  "./assets/spherepod-icon-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(APP_SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        return key.indexOf("spherepod-shell-") === 0 && key !== CACHE_NAME ? caches.delete(key) : Promise.resolve(false);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(request).then(function (response) {
      if (response.ok) {
        var copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(function (cache) { return cache.put(request, copy); }));
      }
      return response;
    }).catch(function () {
      return caches.match(request).then(function (cached) {
        if (cached) return cached;
        if (request.mode === "navigate") return caches.match(new URL("./index.html", self.registration.scope).href);
        return Response.error();
      });
    })
  );
});
