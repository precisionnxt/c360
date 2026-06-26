# Customer 360 — landing page + gated demo

A marketing landing page for Customer 360 with a **real Google/Microsoft sign-in** that
opens the free demo, built for **GitHub Pages**. You get an email whenever a new person
signs up.

## How it works

```
index.html (landing)  ──sign in with Google/Microsoft──▶  app.html (the demo, all personas)
```

- **index.html** — the marketing page: the business problem, the PrecisionNeXT solution,
  capabilities, role views, and "Try the free demo" / "Sign in" buttons.
- **app.html** — the full Customer 360 demo. It's **guarded**: anyone not signed in is sent
  back to the landing page. All five personas (Rep, MSL, KAM, Marketing, Leader) are
  available from the profile icon.
- **Authentic sign-in only.** On the live site there is **no "type any email"** path —
  visitors must sign in with a genuine Google or Microsoft account, so you know exactly who
  is interested. (A local-only preview helps you test before OAuth is set up; it's auto-
  disabled on any real domain.)
- **New-signup email** to `ajay@theteamalpha.net` via EmailJS the first time each person
  signs in.

## Files you might touch

| File | What it's for |
|---|---|
| `js/auth.config.js` | **The only file you edit** — Google/Microsoft client IDs + EmailJS keys |
| `index.html` | Landing-page copy and layout |
| `landing.css` | Landing-page styling |

## Go live in ~10 minutes

1. Push the folder to GitHub → enable **Pages** → get your `https://<you>.github.io/<repo>/` URL.
2. Create a **Google** (and/or **Microsoft**) OAuth client ID, add your Pages URL as the
   authorized origin/redirect, and paste the ID into `js/auth.config.js`.
3. Add **EmailJS** keys to `js/auth.config.js` for the signup email.

Full step-by-step: **DEPLOY-GITHUB-PAGES.md**.

## The honest part

GitHub Pages has no server, so sign-in and the email run in the browser — the right design
for a static demo. It gates **demo access** and tells you **who signed up**; it is not a
security boundary for sensitive data, and "new user" is counted per browser. Real
Google/Microsoft login is required precisely so that only valid accounts get in — that's why
the one-time client-ID setup can't be skipped.
