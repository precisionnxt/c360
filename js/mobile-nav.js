/* ============================================================================
   mobile-nav.js  —  hamburger drawer for the app sidebar on phones/tablets
   ----------------------------------------------------------------------------
   Pure add-on: injects a hamburger button into the top bar and a dimmed
   backdrop, then toggles the off-canvas sidebar drawer. No markup changes
   needed. The drawer styling lives in enhancements.css (only active ≤920px).
   ========================================================================== */
(function () {
  if (document.body.getAttribute("data-pnx-page") !== "app") return;

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var body    = document.body;
    var topbar  = document.querySelector(".topbar");
    var sidebar = document.querySelector(".sidebar");
    if (!topbar || !sidebar) return;
    if (document.querySelector(".pnx-burger")) return;   // never double-inject

    // Hamburger button — inserted as the first item in the top bar
    var burger = document.createElement("button");
    burger.type = "button";
    burger.className = "pnx-burger";
    burger.setAttribute("aria-label", "Open menu");
    burger.setAttribute("aria-expanded", "false");
    burger.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
    topbar.insertBefore(burger, topbar.firstChild);

    // Dimmed backdrop behind the drawer
    var bg = document.createElement("div");
    bg.className = "pnx-drawer-bg";
    body.appendChild(bg);

    function open()  { body.classList.add("pnx-drawer-open");  burger.setAttribute("aria-expanded", "true");  burger.setAttribute("aria-label", "Close menu"); }
    function close() { body.classList.remove("pnx-drawer-open"); burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Open menu"); }
    function toggle(){ body.classList.contains("pnx-drawer-open") ? close() : open(); }

    burger.addEventListener("click", toggle);
    bg.addEventListener("click", close);

    // Close after a nav item is chosen (nav is rendered dynamically → delegate)
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest(".nav-item, a")) setTimeout(close, 10);
    });

    // Close on Escape, and whenever the viewport grows back to desktop
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 920) close(); });
  });
})();
