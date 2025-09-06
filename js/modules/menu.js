// Accessible mobile menu (no advanced syntax)
(function () {
  let menuBtn = document.querySelector(
    'header button[aria-controls="site-nav"]'
  );
  let nav = document.getElementById("site-nav");
  if (!menuBtn || !nav) return;

  function openMenu() {
    nav.classList.add("is-open");
    document.body.classList.add("no-scroll");
    menuBtn.setAttribute("aria-expanded", "true");
    let firstLink = nav.querySelector("a");
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

  let links = nav.querySelectorAll("a");
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", closeMenu);
  }
  document.addEventListener("click", function (e) {
    if (!isOpen()) return; // only do this if the drawer is open
    let clickInsideNav = nav.contains(e.target);
    let clickOnButton = menuBtn.contains(e.target);
    if (!clickInsideNav && !clickOnButton) {
      closeMenu();
    }
  });
  // Close the menu if we leave the mobile breakpoint
  function handleResize() {
    if (window.innerWidth > 768 && isOpen()) {
      closeMenu();
    }
  }
  window.addEventListener("resize", handleResize);
  window.addEventListener("orientationchange", handleResize);
  let closeBtn = nav.querySelector(".close-button");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }
})();
