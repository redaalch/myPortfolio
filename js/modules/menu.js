// Accessible mobile menu (no advanced syntax)
(function () {
  var menuBtn = document.querySelector(
    'header button[aria-controls="site-nav"]'
  );
  var nav = document.getElementById("site-nav");
  if (!menuBtn || !nav) return;

  function openMenu() {
    nav.classList.add("is-open");
    document.body.classList.add("no-scroll");
    menuBtn.setAttribute("aria-expanded", "true");
    var firstLink = nav.querySelector("a");
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    nav.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.focus();
  }

  function isOpen() {
    return nav.classList.contains("is-open");
  }

  menuBtn.addEventListener("click", function () {
    if (isOpen()) closeMenu();
    else openMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  var links = nav.querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", closeMenu);
  }
   document.addEventListener("click", function (e) {
    if (!isOpen()) return; // only do this if the drawer is open
    var clickInsideNav = nav.contains(e.target);
    var clickOnButton = menuBtn.contains(e.target);
    if (!clickInsideNav && !clickOnButton) {
      closeMenu();
    }
  });
})();
