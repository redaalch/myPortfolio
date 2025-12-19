import "./modules/menu.js";
import "./modules/scroll.js";

// Update footer year automatically
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Register service worker 
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function (err) {
      console.log("SW registration failed:", err);
    });
  });
}
