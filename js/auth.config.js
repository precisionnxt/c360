/* ============================================================================
   auth.config.js  —  THE ONLY FILE YOU NEED TO EDIT
   ----------------------------------------------------------------------------
   Controls the Customer 360 trial: the landing page sign-in and who can enter
   the demo. Sign-in is REAL Google / Microsoft only — there is no "type any
   email" path on the live site, so only genuine accounts get in and you can
   see exactly who signed up.

   >>> TO GO LIVE you must paste at least one real client ID below. <<<
       (There is no way to validate real Google/Microsoft accounts without one —
        the ID is public and safe to expose; a client SECRET must NEVER go here.)
       Step-by-step: see DEPLOY-GITHUB-PAGES.md.

   Fill the EmailJS block to get an email at ajay@theteamalpha.net every time a
   NEW person signs up.
   ========================================================================== */

window.PNX_AUTH_CONFIG = {

  /* -- Brand shown on the landing page + sign-in dialog -------------------- */
  app: {
    name:    "Customer 360",
    tagline: "PrecisionNeXT Intelligence",
    blurb:   "Sign in with your Google or Microsoft account to open the free demo."
  },

  /* -- Page filenames (leave as-is unless you rename them) ----------------- */
  pages: {
    landing: "index.html",   // the marketing page
    app:     "app.html"      // the demo app
  },

  /* -- Microsoft sign-in --------------------------------------------------- */
  // Azure Portal > App registrations > (your app) > Application (client) ID.
  // tenant: "common" (any Microsoft account), "organizations", or your tenant ID.
  microsoft: {
    clientId: "",            // <-- paste to enable real Microsoft login
    tenant:   "common"
  },

  /* -- Google sign-in ------------------------------------------------------ */
  // Google Cloud Console > Credentials > OAuth client (Web) > Client ID.
  google: {
    clientId: ""             // <-- paste (ends in .apps.googleusercontent.com)
  },

  /* -- Web3Forms: an email EVERY time someone opens the demo --------------- */
  // Free, no server. Get an Access Key in seconds at https://web3forms.com by
  // entering the inbox below — every demo entry is then emailed there.
  web3forms: {
    accessKey:   "a12fdb48-ec17-4f1c-86fb-770be219adb8",                       // <-- paste your Web3Forms Access Key
    notifyEmail: "precisionnxt@gmail.com"   // the inbox tied to the key (for reference)
  },

  /* -- Local preview ONLY -------------------------------------------------- */
  // Lets YOU preview the flow on your own machine (file:// or localhost) with a
  // quick name+email, BEFORE you set up Google/Microsoft. It is AUTOMATICALLY
  // DISABLED on any real domain (e.g. *.github.io), so the public site always
  // requires a genuine Google/Microsoft login. Set to false to turn it off
  // even locally.
  localPreview: true
};
