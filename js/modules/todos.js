(function () {
  const roadmap = document.getElementById("roadmap");
  if (!roadmap) return;

  const boxes = roadmap.querySelectorAll('input[type="checkbox"]');

  boxes.forEach(function (box, index) {
    const label = box.closest("label");

    let labelText = "";
    if (label) {
      labelText = (label.textContent || "").trim().replace(/\s+/g, " ");
    }

    let key = "";
    if (labelText) {
      key = "todo:" + labelText;
    } else {
      key = "todo:item-" + index;
    }

    // --- Load saved state ---
    try {
      const saved = localStorage.getItem(key);
      if (saved === "1") {
        box.checked = true;
      } else {
        box.checked = false;
      }
    } catch (err) {}

    // --- Save state when changed ---
    box.addEventListener("change", function () {
      try {
        if (box.checked) {
          localStorage.setItem(key, "1");
        } else {
          localStorage.setItem(key, "0");
        }
      } catch (err) {}
    });
  });
})();
