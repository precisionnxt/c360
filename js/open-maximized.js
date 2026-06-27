/* ============================================================================
   open-maximized.js  —  OPTIONAL: open the demo in a maximized (fullscreen) view
   ----------------------------------------------------------------------------
   The app already fills the whole browser window via CSS. A web page cannot
   force the operating-system window to maximize on its own — browsers only
   allow fullscreen in response to a user gesture (security rule). So this
   helper goes fullscreen on the visitor's FIRST click/tap inside the demo,
   once, silently. Remove the <script> tag if you prefer the normal windowed view.
   ========================================================================== */
(function () {
  if (document.body.getAttribute("data-pnx-page") !== "app") return;
  function goFull() {
    document.removeEventListener("pointerdown", goFull, true);
    var el = document.documentElement;
    var req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (req) { try { req.call(el); } catch (e) {} }
  }
  // one-time, on the first interaction (a gesture is required by browsers)
  document.addEventListener("pointerdown", goFull, true);
})();
