import "./modules/menu.js";
import "./modules/todos.js";
import "./modules/scroll.js";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").catch(function (err) {
      // silent failure is fine
      console.log("SW registration failed:", err);
    });
  });
}
