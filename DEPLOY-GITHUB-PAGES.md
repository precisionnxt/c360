# Customer 360 — publish on GitHub Pages, with sign-in + demo emails

Publishes the **landing page** (`index.html`) and the **gated demo** (`app.html`).
Visitors enter the demo two distinct ways:

- **Open the demo now** → quick **Google / Microsoft** sign-in.
- **Request a demo** → a contact form (name · work email · company · role) with a
  **"contact me" checkbox**.

**Every** entry emails **ajay@theteamalpha.net** (name, email, company, role, sign-in
method, new/returning, and whether they want to be contacted). One file to edit:
**`js/auth.config.js`**.

---

## Step 0 — Put the site on GitHub Pages (5 min)

1. Create a GitHub repo and upload the **contents** of `Customer360-App/` to the repo root
   (so `index.html` is at the top).
2. Repo **Settings → Pages → Deploy from a branch → `main` / `/ (root)` → Save**.
3. After ~1 min the site is live at **`https://<you>.github.io/<repo>/`** — **copy this URL**.

---

## Step 1 — Web3Forms key: the "email every demo try" (≈2 min)  ← simplest

1. Go to **https://web3forms.com**.
2. In **"Create your Access Key"**, type **ajay@theteamalpha.net** and submit.
   Web3Forms emails an **Access Key** to that inbox instantly (confirm via the email).
3. Paste the key into `js/auth.config.js`:
   ```js
   web3forms: {
     accessKey:   "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",   // <- your key
     notifyEmail: "ajay@theteamalpha.net"
   }
   ```
4. Commit & push. Now **every** demo entry is emailed to ajay@theteamalpha.net.

> No account, no server, no template needed — the key *is* tied to that inbox. If you skip
> this, the demo still works; each entry is just logged to the browser console instead.

---

## Step 2 — Google sign-in key (≈4 min)  — for "Open the demo now"

1. **https://console.cloud.google.com** → create/select a project.
2. **APIs & Services → OAuth consent screen** → **External** → add app name + your email →
   Save. Add test users while in "Testing", or **Publish** for anyone.
3. **Credentials → Create Credentials → OAuth client ID → Web application.**
   - **Authorized JavaScript origins:** `https://<you>.github.io`  *(origin only — no path)*
   - Copy the **Client ID** (ends `.apps.googleusercontent.com`).
4. Paste into `js/auth.config.js`:
   ```js
   google: { clientId: "1234567890-abc123.apps.googleusercontent.com" }
   ```

## Step 3 — Microsoft sign-in key (≈4 min)

1. **https://portal.azure.com → App registrations → New registration.**
   - Redirect URI: platform **Single-page application (SPA)** = `https://<you>.github.io/<repo>/`
   - Register → copy the **Application (client) ID**.
2. Paste into `js/auth.config.js`:
   ```js
   microsoft: { clientId: "00000000-1111-2222-3333-444444444444", tenant: "common" }
   ```

> Enable **either or both** providers. The **Request a demo** form is always available too.

---

## Quick reference — `js/auth.config.js`

```js
microsoft: { clientId: "<Azure Application (client) ID>", tenant: "common" },
google:    { clientId: "<Google Web client ID>.apps.googleusercontent.com" },
web3forms: { accessKey: "<Web3Forms Access Key>", notifyEmail: "ajay@theteamalpha.net" },
```

## Good to know
- **Client IDs and the Web3Forms key are public and safe** to commit. Never put a client *secret* here.
- The two buttons are now distinct: **Open the demo now** (SSO) vs **Request a demo** (contact form + checkbox).
- "New signup vs Returning" is tracked per browser; both still email you.
- Emails are sent from the browser (GitHub Pages has no server) — correct for a static demo.
- This gates demo access; it is not a security boundary for sensitive data.
