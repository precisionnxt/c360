# Customer 360 — Editing Guide (for GCPT-driven prototyping)

A modular, dependency-free prototype. **Open `index.html` by double-clicking it** — no server, no build.
Everything is split into small files so an instruction only ever touches one place.

> All names, numbers, accounts and metrics are **illustrative sample data**.

---

## File map

```
Customer360-App/
├─ index.html              ← app shell (rarely edited; just the mount points + script order)
├─ styles.css              ← ALL visuals. Recolour/restyle here.
├─ EDITING-GUIDE.md        ← this file
└─ js/
   ├─ app.config.js        ← brand name, tagline, footer, LEFT-NAV structure
   ├─ content.rep.js       ← Sales Rep — Daniel Brooks      (one file = one persona)
   ├─ content.msl.js       ← MSL — Dr. Priya Nair
   ├─ content.kam.js       ← KAM — Marcus Feldman
   ├─ content.mkt.js       ← Marketing Manager — Sofia Reyes
   ├─ content.lead.js      ← Commercial Leader — Helen Whitaker
   ├─ content.shared.js    ← advanced feature scaffolds shared by all personas
   └─ engine.js            ← rendering + behaviour (edit only to add a new widget type)
```

**The golden rule:** to change what a persona sees, edit **that persona's file only**. The full block
schema (the widget vocabulary) is documented at the top of `js/content.rep.js`.

### Layout & naming notes (current version)
- **Brand:** "Customer 360" · tagline **PrecisionNeXT Intelligence** (normal case). The **PNi** mark = PrecisionNeXT Intelligence. Set in `app.config.js → app`.
- **Top bar (left):** **PrecisionNeXT Navigator** — the in-product **user guide / documentation**. Tells the **WIN** story (Watchtower · Intelligence · executioN) + the **5C** framework + every feature with “how to use it.” Edit it in `app.config.js → navigator`. Feature rows are clickable shortcuts.
- **Top bar (right):** **Settings** + **Insights** popovers and the **profile icon** (click for details + switch; closes on switch).
- **PNi** floats **bottom-right** — click the star circle to open, click again (shows ✕) to minimise.
- **Left nav = the WIN loop (3 groups):**
  - **Watchtower** → *Cockpit* (the heart of C360; data key `cockpit`), *Next Best Actions* (`nba`), *Customer Universe* (`universe`).
  - **Intelligence** → Journey Analytics, Segment Insights, Influence Network, Digital Affinity, Content Performance — the **5C** model (Customer · Context · Channel · Content · Cadence).
  - **Execution** → *Territory & Route Plan* (`territory`), Execution Plan, Engagement Orchestration.
- **Nav label ≠ section title:** the nav can read one thing and the in-container banner another. The banner title comes from `section.title` → `app.config.js → titles[id]` → nav label. Example: nav **“Next Best Actions”** → banner **“PrecisionNeXT Best Actions”** (set in `titles`).
- The old **Platform / Capabilities** section was removed from the left nav — that documentation now lives in the **Navigator** (top bar). The `capabilities` content still exists in `content.shared.js` (unused) if you ever want it back as a section.

---

## Common changes → where to make them

| You want to… | Edit | What to change |
|---|---|---|
| Recolour the whole product | `styles.css` → **S1 Design Tokens** | the `--green / --blue / --purple …` variables |
| Rename the product / tagline / footer | `js/app.config.js` → `app` | `brand`, `tagline`, `footer`, `footerNote` |
| Rename / add / reorder a left-nav section | `js/app.config.js` → `nav` | add an item `{id,label,icon}`; then add that `id` under each persona |
| Change a Sales-Rep screen | `js/content.rep.js` → `sections.<id>` | edit that section's `blocks` |
| Change the descriptive banner under the top bar | the same section's `summary` and `chips` | |
| Edit/Add a Cockpit objective | `js/content.<persona>.js` → `cockpit` → the `objectives` block | add/edit an item `{id,icon,title,desc,recommended,default,track}` |
| Edit a Next Best Action (buttons included) | `js/content.<persona>.js` → `nba` → `actions` block | edit an item `{priority,title,rationale,confidence,impact,effort,channel}` |
| Change PNi's alerts / answers for a persona | `js/content.<persona>.js` → `pni` | `intro`, `alerts[]`, `prompts[]`, `answers{}` |
| Add a brand-new persona | copy a `content.*.js` file → register a new id; add it to `personaOrder` in `app.config.js`; add a `<script>` tag in `index.html` | |
| Enrich an advanced feature (HCP 360, KOL/DOL, Social, Referral, Capabilities) | `js/content.shared.js` | edit the section; or copy it into a persona file to specialise |
| Add a NEW widget type | `js/engine.js` → `BLOCK_RENDERERS` | write `render<Type>()` and register it |

---

## The block vocabulary (cheat-sheet)

A section = `{ summary:'…', chips:['…'], blocks:[ … ] }`. Each block has a `type` and optional `col` (12/8/6/4).

`header` (focus + KPI cards) · `kpis` · `objectives` (Cockpit, selectable) · `insights` · `actions` (NBA) ·
`list` · `bars` · `steps` · `table` · `network` · `featureGrid` · `valueProps` · `note`.

Full field-by-field shapes are at the top of **`js/content.rep.js`** — copy a shape, change the values.

Tones anywhere: `green | blue | purple | amber | rose | teal`.
Table chips: `g | b | a | r | p`. Icons: keys in the `ICON` map in `js/engine.js`.

---

## Example GCPT instructions (and the one file each touches)

- *"In the MSL Cockpit, add an objective 'Support investigator-initiated studies'."*
  → `js/content.msl.js`, `cockpit` → `objectives.items` (add one item).
- *"Change the Sales-Rep top action confidence to 95% and reword the rationale."*
  → `js/content.rep.js`, `nba` → `actions.items[0]`.
- *"Make the primary green darker."*
  → `styles.css`, S1, `--green`.
- *"Rename 'Customer Universe' to 'HCP Universe' everywhere."*
  → `js/app.config.js`, the nav item `label`.

If a persona has no content for a section, the app shows a tidy *"not configured yet"* placeholder —
so partial edits never break the prototype.

---

## Refinement update (2026-06-21)

This pass added a few things on top of the structure above:

- **New left-nav group "Data Foundation"** (top of the nav) → two shared sections:
  - **Data Sources** (`datasources`) — connect public live feeds (CMS Open Payments, CMS Provider/NPPES, CMS Medicare Part D, Synthea) and internal systems. Connecting a source is saved to your workspace and lights up its signals in the **Live signal feed**. Edit the catalogue in `js/content.shared.js → datasources` (the `sources` and `livefeed` blocks).
  - **My Workspace Data** (`mydata`) — add your own customer **attributes** and **insights**; saved to your workspace (localStorage). Edit defaults in `js/content.shared.js → mydata`.
- **Next Best Actions page reordered (all personas, in the engine):** the ranked **Precision NeXT Best Actions** now sit near the top; contextual blocks in the middle; the **prioritised-HCP list is at the bottom, grouped by the 5Cs** via a tab bar (All · Customer · Context · Channel · Content · Cadence). Each HCP card carries a small 5C badge.
- **Clickable NBA metric cards:** KPI tiles with a `go:'<sectionId>'` field navigate to that section on click (the small "i" still shows the explainer). See `js/content.rep.js → nba → kpis`.
- **Cockpit goal progress is now a cycle selector** (`cycleProgress` block) — switch between previous / current / future cycles. See `js/content.rep.js → cockpit`.

New block types added to `js/engine.js → BLOCK_RENDERERS`: `cycleProgress`, `sources`, `livefeed`, `attrbuilder`, `myinsights`.

---

## Redesign update 2 (2026-06-22)

Flow & layout reshaped around a clear day-in-the-life:

- **Data-source setup moved to the Guide.** The "Data Foundation" nav group was removed. Public feeds (CMS Open Payments, NPPES, Part D, Synthea) + internal systems are now connected inside the **PrecisionNeXT Navigator (Guide → "Connect your data sources")**. The catalogue lives in `js/app.config.js → navigator.dataSources`.
- **Command Center now opens with "Today's decision"** — a new `decisionflow` block per persona that walks one sensed signal end-to-end: **Signal → Insight (incl. *your* customer knowledge) → ✗ wrong action avoided / ✓ PNi recommendation → Outcome → Feedback loop**. This is the human-in-the-loop story: the user's knowledge stops a tempting-but-wrong move and sharpens PNi over time. Edit per persona in `content.<persona>.js → cockpit` (the `decisionflow` block).
- **Your customer knowledge in the Command Center.** A `knowledge` block (auto-injected for every persona) lets users add insights **at customer level** (pick an HCP/segment + tag) and shows a **summary** of what they've provided. Saved to the workspace.
- **Cycle tracking for every persona.** All five cockpits now use the `cycleProgress` block (previous / current / future cycle) so objectives are tracked clearly cycle over cycle.
- **Aria chat fix.** Removed a stray answer prefix and corrected the oversized source-label icon that was creating whitespace in chat bubbles.

Command Center block order (engine): `decisionflow → signals → role-snapshot → cycleProgress → objectives → knowledge → note`.
New block types in `engine.js`: `decisionflow`, `knowledge` (plus `cycleProgress`, `sources` from before).
