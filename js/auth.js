/* ============================================================================
   auth.js  —  Customer 360 trial: real Google/Microsoft sign-in + access gate
   ----------------------------------------------------------------------------
   Two modes, chosen by  <body data-pnx-page="landing|app">:

     • landing  → wires the "Try the demo / Sign in" buttons to a sign-in dialog
                  with REAL Google / Microsoft login. On success it records the
                  user, emails you on first-ever signup, and opens the demo.
     • app      → the demo renders normally, then a sign-in dialog appears OVER
                  it until the visitor authenticates (so the page is never blank
                  and never depends on a cross-page redirect). On success the
                  dialog is removed and the full app — Guide and all — is usable.
                  All five personas are available from the profile icon.

   Authentic by design: no "type any email" path on a live site. The only local
   convenience is a preview that is AUTOMATICALLY disabled on real domains.
   Everything runs in the browser — correct for a static GitHub Pages site.
   ========================================================================== */

(function () {
  "use strict";

  var CFG = window.PNX_AUTH_CONFIG || {};
  var APP = CFG.app || {}, MS = CFG.microsoft || {}, GG = CFG.google || {}, WF = CFG.web3forms || {};
  var PAGES = CFG.pages || {};
  var LANDING = PAGES.landing || "index.html";
  var APP_PAGE = PAGES.app || "app.html";

  var BRAND   = APP.name    || "Customer 360";
  var TAGLINE = APP.tagline || "PrecisionNeXT Intelligence";
  var BLURB   = APP.blurb   || "Sign in to open the free demo.";

  var SESSION_KEY = "pnx_session", KNOWN_KEY = "pnx_known_users";
  var MS_LIVE = !!(MS.clientId && MS.clientId.trim());
  var GG_LIVE = !!(GG.clientId && GG.clientId.trim());

  var PAGE = "";          // 'landing' | 'app'  (set in boot)
  var GATE = false;       // true when the dialog is a blocking access gate

  /* ---- helpers ---------------------------------------------------------- */
  function el(t, a, h) { var n = document.createElement(t); if (a) for (var k in a) n.setAttribute(k, a[k]); if (h != null) n.innerHTML = h; return n; }
  function read(k, fb) { try { return JSON.parse(localStorage.getItem(k)) || fb; } catch (e) { return fb; } }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function validEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || ""); }
  function escapeHtml(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var ex = document.querySelector('script[data-pnx="' + src + '"]');
      if (ex) { if (ex.dataset.loaded) return resolve(); ex.addEventListener("load", resolve); ex.addEventListener("error", reject); return; }
      var s = document.createElement("script"); s.src = src; s.async = true; s.defer = true; s.setAttribute("data-pnx", src);
      s.onload = function () { s.dataset.loaded = "1"; resolve(); }; s.onerror = function () { reject(new Error("load " + src)); };
      document.head.appendChild(s);
    });
  }
  function decodeJwt(t) { try { var p = t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"); return JSON.parse(decodeURIComponent(atob(p).split("").map(function (c) { return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2); }).join(""))); } catch (e) { return {}; } }
  function isLocalPreview() {
    if (CFG.localPreview === false) return false;
    var h = location.hostname;
    return location.protocol === "file:" || h === "" || h === "localhost" || h === "127.0.0.1" || h === "0.0.0.0";
  }

  var MARK_MS = '<svg viewBox="0 0 21 21" width="18" height="18" aria-hidden="true"><rect x="1" y="1" width="9" height="9" fill="#F25022"/><rect x="11" y="1" width="9" height="9" fill="#7FBA00"/><rect x="1" y="11" width="9" height="9" fill="#00A4EF"/><rect x="11" y="11" width="9" height="9" fill="#FFB900"/></svg>';
  var MARK_GG = '<svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true"><path fill="#4285F4" d="M17.6 9.2c0-.6-.1-1.2-.2-1.8H9v3.5h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.6z"/><path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.9 10.7a5.4 5.4 0 0 1 0-3.4V5H.9a9 9 0 0 0 0 8l3-2.3z"/><path fill="#EA4335" d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 .9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6z"/></svg>';

  function currentUser() { var u = read(SESSION_KEY, null); return (u && u.email) ? u : null; }

  /* ====================================================================== */
  /*  SIGN-IN COMPLETION + NEW-USER NOTIFICATION                            */
  /* ====================================================================== */
  function completeSignIn(user) {
    var email = (user.email || "").trim().toLowerCase();
    if (!validEmail(email)) { alert("That account didn't return a valid email address."); return; }
    user.email = email; user.name = (user.name || email.split("@")[0]).trim(); user.ts = new Date().toISOString();

    var known = read(KNOWN_KEY, []);
    user.isNew = known.indexOf(email) === -1;
    if (user.isNew) { known.push(email); write(KNOWN_KEY, known); }
    notifyDemoAccess(user);          // email EVERY time someone enters the demo
    write(SESSION_KEY, user);

    closeSignIn();
    if (PAGE === "app") { mountPill(user); }                    // already here — just reveal
    else { setTimeout(function () { location.href = APP_PAGE; }, 140); }  // landing → open demo
  }

  function notifyDemoAccess(user) {
    var key = (WF.accessKey || "").trim();
    if (!key) {
      console.info("[PNX] Demo access:", user.email, user.isNew ? "(new)" : "(returning)", "— Web3Forms key not set, no email sent.");
      return;
    }
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      keepalive: true,   // completes even if the page navigates to the demo right after
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: "Customer 360 demo — " + (user.isNew ? "New signup" : "Returning") + ": " + user.name + " (" + (user.company || "—") + ")",
        from_name: BRAND + " demo",
        email: user.email,
        "Name": user.name, "Work email": user.email, "Company": user.company || "—", "Role": user.role || "—",
        "Sign-in": user.provider, "Status": user.isNew ? "New signup" : "Returning visitor",
        "Wants the team to contact them": user.consent ? "YES" : "no", "Time": new Date().toString()
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (d) { console.info("[PNX] Web3Forms email sent:", !!d.success); })
      .catch(function (err) { console.warn("[PNX] Web3Forms email failed:", err); });
  }

  /* ====================================================================== */
  /*  REAL OAUTH                                                            */
  /* ====================================================================== */
  function signInMicrosoft(btn) {
    if (!MS_LIVE) return;
    setBusy(btn, true);
    loadScript("https://alcdn.msauth.net/browser/2.38.3/js/msal-browser.min.js")
      .then(function () {
        var pca = new msal.PublicClientApplication({ auth: { clientId: MS.clientId, authority: "https://login.microsoftonline.com/" + (MS.tenant || "common"), redirectUri: location.href.split("#")[0] }, cache: { cacheLocation: "sessionStorage" } });
        return pca.loginPopup({ scopes: ["openid", "profile", "email"] });
      })
      .then(function (res) { var a = res.account || {}, c = res.idTokenClaims || {}; completeSignIn({ name: a.name || c.name, email: a.username || c.preferred_username || c.email, provider: "microsoft" }); })
      .catch(function (err) { console.warn("[PNX] Microsoft sign-in cancelled/failed:", err); setBusy(btn, false); });
  }
  function mountGoogle(container) {
    if (!GG_LIVE) return;
    loadScript("https://accounts.google.com/gsi/client")
      .then(function () {
        google.accounts.id.initialize({ client_id: GG.clientId, callback: function (resp) { var info = decodeJwt(resp.credential); completeSignIn({ name: info.name, email: info.email, provider: "google" }); } });
        google.accounts.id.renderButton(container, { type: "standard", theme: "outline", size: "large", text: "continue_with", shape: "pill", logo_alignment: "left", width: 300 });
      })
      .catch(function (err) { console.warn("[PNX] Google SDK failed to load:", err); });
  }

  /* ====================================================================== */
  /*  SIGN-IN DIALOG                                                        */
  /* ====================================================================== */
  function openSignIn(gate, mode) {
    GATE = !!gate;
    if (document.getElementById("pnx-modal")) return;
    var back = el("div", { id: "pnx-modal", role: "dialog", "aria-modal": "true", "aria-label": "Sign in", class: GATE ? "pnx-gate" : "" });
    back.appendChild(el("div", { class: "pnx-modal-bg" }));
    back.appendChild(el("div", { class: "pnx-modal-card", id: "pnx-modal-card" }));
    document.body.appendChild(back);
    if (!GATE) back.querySelector(".pnx-modal-bg").addEventListener("click", closeSignIn);
    renderChooser();
    if (mode === "request") renderRequestForm(back.querySelector(".pnx-providers"), true);  // jump straight to the contact form
  }
  function closeSignIn() { var m = document.getElementById("pnx-modal"); if (m) m.parentNode.removeChild(m); }

  function renderChooser() {
    var card = document.getElementById("pnx-modal-card"); if (!card) return;
    card.innerHTML =
      (GATE ? "" : '<button type="button" class="pnx-x" aria-label="Close">&times;</button>') +
      '<div class="pnx-brand"><span class="pnx-logo">Nexi</span><div class="pnx-brandtext">' +
        '<div class="pnx-brandname">' + escapeHtml(BRAND) + '</div><div class="pnx-tagline">' + escapeHtml(TAGLINE) + '</div></div></div>' +
      '<h2 class="pnx-h1">Sign in to try the free demo</h2>' +
      '<p class="pnx-blurb">' + escapeHtml(BLURB) + '</p>' +
      '<div class="pnx-providers"></div>' +
      '<div class="pnx-secure">🔒 We only use your account to grant demo access.</div>';
    if (!GATE) card.querySelector(".pnx-x").addEventListener("click", closeSignIn);
    var row = card.querySelector(".pnx-providers");

    if (MS_LIVE) {
      var msBtn = el("button", { type: "button", class: "pnx-btn pnx-btn-provider" }, MARK_MS + "<span>Continue with Microsoft</span>");
      msBtn.addEventListener("click", function () { signInMicrosoft(msBtn); });
      row.appendChild(msBtn);
    }
    if (GG_LIVE) { var mount = el("div", { id: "pnx-gg-mount", class: "pnx-gg-mount" }); row.appendChild(mount); mountGoogle(mount); }

    // "Request a demo" — always available: capture contact details, then open the demo.
    if (MS_LIVE || GG_LIVE) row.appendChild(el("div", { class: "pnx-or" }, "<span>or</span>"));
    var rq = el("button", { type: "button", class: "pnx-btn pnx-btn-ghost" }, "Request a demo — enter your details");
    rq.addEventListener("click", function () { renderRequestForm(card.querySelector(".pnx-providers"), true); });
    row.appendChild(rq);
  }

  // Request-a-demo contact form: collects details, records the lead, opens the demo.
  function renderRequestForm(row, clear) {
    if (clear) row.innerHTML = "";
    var f = el("form", { id: "pnx-request", novalidate: "novalidate" },
      '<button type="button" class="pnx-back2" aria-label="Back">&larr; Back</button>' +
      '<div class="pnx-reqh">Request your free demo</div>' +
      '<label class="pnx-field"><span>Full name *</span><input name="name" type="text" autocomplete="name" placeholder="Alex Morgan" required></label>' +
      '<label class="pnx-field"><span>Work email *</span><input name="email" type="email" autocomplete="email" placeholder="alex@company.com" required></label>' +
      '<label class="pnx-field"><span>Company *</span><input name="company" type="text" autocomplete="organization" placeholder="Acme Pharma" required></label>' +
      '<label class="pnx-field"><span>Your role</span><input name="role" type="text" placeholder="e.g. Sales Director"></label>' +
      '<label class="pnx-consent"><input type="checkbox" name="consent" checked> Yes — I\'d like the team to contact me about Customer 360.</label>' +
      '<button type="submit" class="pnx-btn pnx-btn-primary">Open the demo →</button>');
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!f.name.value.trim() || !validEmail(f.email.value) || !f.company.value.trim()) {
        alert("Please enter your name, a valid work email, and your company."); return;
      }
      completeSignIn({ name: f.name.value, email: f.email.value, company: f.company.value, role: f.role.value, consent: f.consent.checked, provider: "request-demo" });
    });
    f.querySelector(".pnx-back2").addEventListener("click", renderChooser);
    row.appendChild(f);
    var n = f.querySelector('input[name="name"]'); if (n) n.focus();
  }

  /* ---- small UI utils --------------------------------------------------- */
  function setBusy(b, on) { if (b) { b.disabled = on; b.classList.toggle("pnx-busy", on); } }
  function mountPill(user) {
    if (document.getElementById("pnx-userpill")) return;
    var pill = el("div", { id: "pnx-userpill" }, '<span class="pnx-dot"></span><span class="pnx-pilltext">Signed in as <strong>' + escapeHtml(user.name) + '</strong></span><button type="button" class="pnx-signout">Sign out</button>');
    pill.querySelector(".pnx-signout").addEventListener("click", function () { try { localStorage.removeItem(SESSION_KEY); } catch (e) {} location.replace(LANDING); });
    document.body.appendChild(pill);
  }

  /* ====================================================================== */
  /*  BOOT                                                                  */
  /* ====================================================================== */
  function boot() {
    PAGE = (document.body.getAttribute("data-pnx-page") || "landing").toLowerCase();

    if (PAGE === "app") {
      // The app has already rendered. Gate it with an overlay dialog (never blank).
      if (currentUser()) mountPill(currentUser());
      else openSignIn(true);
      return;
    }

    // LANDING: wire triggers.
    //   [data-pnx-signin]            -> sign-in chooser (Google/Microsoft + request option)
    //   [data-pnx-signin="request"]  -> jumps straight to the "Request a demo" contact form
    window.PNX = window.PNX || {};
    window.PNX.openSignIn = function () { openSignIn(false); };
    window.PNX.requestDemo = function () { openSignIn(false, "request"); };
    window.PNX.signOut = function () { try { localStorage.removeItem(SESSION_KEY); } catch (e) {} location.reload(); };
    var t = document.querySelectorAll("[data-pnx-signin]");
    for (var i = 0; i < t.length; i++) t[i].addEventListener("click", function (e) {
      e.preventDefault();
      openSignIn(false, this.getAttribute("data-pnx-signin") === "request" ? "request" : null);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
