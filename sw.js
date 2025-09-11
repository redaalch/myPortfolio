/* sw.js
   Simple caching for GitHub Pages
   - images: cache-first
   - CSS/JS/Google Fonts: stale-while-revalidate
   - HTML navigations: network-first (fresh page)
*/

const VERSION = "v1-2025-09-11";
const IMG_CACHE = "img-" + VERSION;
const ASSET_CACHE = "assets-" + VERSION;
const PAGE_CACHE = "pages-" + VERSION;

self.addEventListener("install", function (event) {
  // Activate immediately after install
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  // Clean old caches
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys.map(function (key) {
            const keep =
              key === IMG_CACHE || key === ASSET_CACHE || key === PAGE_CACHE;
            if (!keep) {
              return caches.delete(key);
            }
          })
        );
      })
      .then(function () {
        // Control open pages without reload
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", function (event) {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const path = url.pathname;

  // HTML navigations: network-first
  if (req.mode === "navigate") {
    event.respondWith(networkFirst(req, PAGE_CACHE));
    return;
  }

  // Images: cache-first
  if (path.startsWith("/img/")) {
    event.respondWith(cacheFirst(req, IMG_CACHE));
    return;
  }

  // CSS/JS and Google Fonts: stale-while-revalidate
  const isAsset =
    path.startsWith("/js/") ||
    path.endsWith("/styles.css") ||
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com";

  if (isAsset) {
    event.respondWith(staleWhileRevalidate(req, ASSET_CACHE));
    return;
  }
});

/* --- strategies (no async/await to keep it beginner-friendly) --- */

function cacheFirst(req, cacheName) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        cache.put(req, res.clone());
        return res;
      });
    });
  });
}

function staleWhileRevalidate(req, cacheName) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(req).then(function (cached) {
      const fetchPromise = fetch(req).then(function (res) {
        cache.put(req, res.clone());
        return res;
      });
      if (cached) return cached;
      return fetchPromise;
    });
  });
}

function networkFirst(req, cacheName) {
  return caches.open(cacheName).then(function (cache) {
    return fetch(req)
      .then(function (res) {
        cache.put(req, res.clone());
        return res;
      })
      .catch(function () {
        return cache.match(req);
      });
  });
}
