/* ==================================================================================================
   Customer 360 · APP CONFIG                                              (global wiring — edit rarely)
   --------------------------------------------------------------------------------------------------
   This file creates the global `C360` namespace and holds the things that are NOT persona-specific:
     • app   — brand wordmark, tagline, footer text
     • nav   — the left-panel groups + their sections (RENAME / ADD / REORDER sections here)
     • register() / registerShared() — how the content files plug in

   LOAD ORDER (see index.html): this file FIRST, then each persona file, then shared, then engine LAST.
   Persona files call  C360.register('<id>', {...})  — one self-contained file per persona.
   Common feature scaffolds call  C360.registerShared({...})  — used when a persona has no override.
   ================================================================================================ */
window.C360 = {

  /* ---- App-level text. EDIT brand / tagline / footer here. ------------------------------------- */
  app: {
    brand:   'Customer 360',                  // ← sidebar wordmark
    tagline: 'PrecisionNeXT Intelligence',    // ← product line (rendered with the "Nexi" mark)
    footer:  'Powered by Precision NeXT',      // ← footer line
    footerNote: 'Demo product · illustrative sample data',  // ← demo call-out
    defaultPersona: 'rep',
    defaultSection: 'cockpit',                 // the Home page (key stays 'cockpit'; label is "Home")
  },

  /* ---- LEFT-PANEL NAVIGATION -------------------------------------------------------------------
     Each group = { group:'Label', items:[ {id, label, icon} ] }.
       • `id`    must match a key under a persona's `sections` (or a shared section).
       • `icon`  is a key in the ICON map (js/engine.js → ICON). Add an SVG there to add an icon.
     Group labels render muted + non-clickable. To add a section: add an item here, then add that
     `id` to each persona file (or to shared). Missing combos render a tidy placeholder, never a crash.
  ------------------------------------------------------------------------------------------------- */
  /* LEFT PANEL = primary system control. Groups carry an icon (gicon). */
  nav: [
    /* WATCHTOWER — set direction & see what matters (Customer Insight lives here, not its own group) */
    { group:'Watchtower', gicon:'eye', items:[
      { id:'cockpit',  label:'Command Center',     icon:'target' },  // Watch — sense signals against your objectives
      { id:'nba',      label:'Next Best Actions',  icon:'spark'  },  // decide & act (banner → "PrecisionNeXT Best Actions")
      { id:'universe', label:'Customer Insight',   icon:'users'  },  // know the customer — HCP/HCO master data + signals
    ]},
    /* INTELLIGENCE — Interpret. Know the customer via the 5C model
       Customer (journey, segments) · Context (influence) · Channel (affinity) · Content (performance) */
    { group:'Intelligence', gicon:'bulb', items:[
      { id:'journey',   label:'Journey & Segments',  icon:'route'  },  // Journey Analytics + Segment Insights
      { id:'influence', label:'Influence Network',   icon:'share'  },
      { id:'affinity',  label:'Affinity & Content',  icon:'signal' },  // Digital Affinity + Content Performance
    ]},
    /* NAVIGATOR — Navigate. Orchestrate the action: where to be, the plan and the cadence (close the loop) */
    { group:'Navigator', gicon:'route', items:[
      { id:'territory',     label:'Territory & Execution',    icon:'map'   },  // Territory & Route Plan + Execution Plan
      { id:'orchestration', label:'Engagement Orchestration', icon:'flow'  },
    ]},
  ],

  /* In-container TITLE OVERRIDES — the descriptive banner can differ from the short nav label.
     (e.g. the nav reads "Next Best Actions"; the section header reads "PrecisionNeXT Best Actions".) */
  titles: {
    nba: 'PrecisionNeXT Best Actions',
  },

  /* PRECISIONNEXT NAVIGATOR — the product user-guide shown from the TOP BAR (left).
     Tells the WIN story (Watch · Interpret · Navigate), the 5C framework, and every feature.
     Edit this to update the in-product documentation. Feature rows with `go` are clickable shortcuts. */
  navigator: {
    title: 'PrecisionNeXT Navigator',
    tagline: 'How Customer 360 works — and how to use it',
    /* Deep links open in a NEW WINDOW so the user keeps focus on the app.
       Replace docsBase with your real documentation site; each feature appends "/<go>". */
    docsBase: 'https://precisionnext.example.com/docs',
    intro: 'One loop — WIN: Watch → Interpret → Navigate — turns your connected data into the next best action, and learns from every outcome.',
    /* DATA SOURCES catalogue — SETUP is done here in the Guide (the engine renders a connect panel).
       Public open datasets (CMS Open Payments, NPPES, Part D) + internal systems. `connected` is the default; `locked`
       marks a system of record that's always on. Connecting a source feeds Nexi's signals. */
    dataSources: [
      /* --- Internal systems (your systems of record) --- */
      {id:'crm',        name:'Veeva CRM',                  cat:'Internal', kind:'Commercial', connected:true,  locked:true,
       desc:'Calls, accounts, consent and field activity from your CRM of record.',          signals:'Engagement & call-plan signals',  cadence:'Real-time'},
      {id:'mlr',        name:'MLR Content Library',        cat:'Internal', kind:'Content',    connected:true,  locked:true,
       desc:'Approved assets and how each performs in the field.',                           signals:'Content-fit signals',             cadence:'Daily'},
      {id:'field',      name:'Call & field activity',      cat:'Internal', kind:'Commercial', connected:true,
       desc:'Visits, samples, calls and follow-ups logged by the field team.',               signals:'Coverage & frequency signals',    cadence:'Real-time'},
      {id:'consent',    name:'Consent & preferences',      cat:'Internal', kind:'Compliance', connected:true,  locked:true,
       desc:'Channel consent, opt-ins and contact preferences for every HCP.',               signals:'Permission & channel-eligibility', cadence:'Real-time'},
      {id:'medinq',     name:'Medical inquiries (MIRF)',   cat:'Internal', kind:'Medical',    connected:false,
       desc:'Unsolicited medical information requests and the responses sent.',               signals:'Scientific-interest signals',     cadence:'Daily'},
      {id:'erp',        name:'ERP · Sales & orders',       cat:'Internal', kind:'Commercial', connected:false,
       desc:'Shipments, orders and account-level sales performance.',                         signals:'Volume & uptake signals',         cadence:'Daily'},
      /* --- External engagement (the digital footprint) --- */
      {id:'email',      name:'Marketing email & journeys', cat:'External', kind:'Digital',    connected:false,
       desc:'Opens, clicks and sequence engagement across email programmes.',                 signals:'Digital-engagement signals',      cadence:'Real-time'},
      {id:'web',        name:'Web & HCP portal',           cat:'External', kind:'Digital',    connected:false,
       desc:'Page views, content downloads and HCP-portal activity.',                         signals:'Content-interest signals',        cadence:'Real-time'},
      {id:'social',     name:'Social listening',           cat:'External', kind:'Social',     connected:false,
       desc:'HCP & KOL conversations, sentiment and emerging topics.',                        signals:'Sentiment & DOL signals',         cadence:'Hourly'},
      {id:'search',     name:'Search & intent',            cat:'External', kind:'Digital',    connected:false,
       desc:'Aggregated search and intent signals around your therapeutic area.',             signals:'Demand & intent signals',         cadence:'Daily'},
      {id:'medportal',  name:'Medical portal activity',    cat:'External', kind:'Medical',    connected:false,
       desc:'Scientific-content engagement on third-party medical portals.',                  signals:'Evidence-interest signals',       cadence:'Daily'},
      {id:'mobile',     name:'Mobile apps',                cat:'External', kind:'Digital',    connected:false,
       desc:'In-app engagement and rep-triggered content interactions.',                      signals:'Mobile-engagement signals',       cadence:'Real-time'},
      {id:'congress',   name:'Congress & events',          cat:'External', kind:'Events',     connected:false,
       desc:'Session attendance, booth visits and symposium engagement.',                     signals:'Scientific-engagement signals',   cadence:'Per event'},
      /* --- Public open data --- */
      {id:'cms-openpay',name:'CMS Open Payments',          cat:'Public',   kind:'Claims',     connected:false,
       desc:'Industry payments & research transfers to HCPs (openpaymentsdata.cms.gov).',    signals:'Influence & affiliation signals', cadence:'Quarterly'},
      {id:'cms-nppes',  name:'CMS Provider Data (NPPES)',  cat:'Public',   kind:'Provider',   connected:false,
       desc:'National provider registry — specialty, location and affiliations.',            signals:'Identity & targeting signals',    cadence:'Weekly'},
      {id:'cms-partd',  name:'CMS Medicare Part D',        cat:'Public',   kind:'Claims',     connected:false,
       desc:'Aggregated prescribing volumes by provider and drug.',                          signals:'Prescribing & share signals',     cadence:'Annual'},
    ],
    /* The operating model shown as a flow at the top of the Guide */
    model: [
      { k:'WATCH',     d:'Signals from every connected source — CRM, claims, digital, medical and content.' },
      { k:'INTERPRET', d:'PrecisionNeXT scores and ranks the signals against your objectives.' },
      { k:'DECIDE',    d:'The single Next Best Action per customer — with the reasoning.' },
      { k:'NAVIGATE',  d:'The right Channel, Content and Cadence orchestrated across field and digital.' },
      { k:'LEARN',     d:'Outcomes feed back to sharpen the next recommendation.' },
    ],
    /* "How your day works" — a clickable walkthrough */
    flow: [
      { n:'1', t:'Set your objectives in the Command Center', d:'Configure what matters for your role; the cycle tracker follows your progress, cycle over cycle.', go:'cockpit' },
      { n:'2', t:'Start with today’s decision', d:'The Command Center opens with one sensed signal worked end-to-end — and the wrong move it helped you avoid.', go:'cockpit' },
      { n:'3', t:'Know your customers', d:'HCP 360 profiles, journeys, influence networks and digital affinity.', go:'universe' },
      { n:'4', t:'Act on Next Best Actions', d:'Ranked, explainable actions per customer — organised by the 5Cs.', go:'nba' },
      { n:'5', t:'Execute and close the loop', d:'Territory routes, execution plans and orchestration — outcomes (and your knowledge) feed back.', go:'territory' },
    ],
    win: [
      { key:'W', name:'Watch · Watchtower', color:'green',  desc:'Watch signals through Watchtower — sense what matters across every connected source against your objectives.', go:'cockpit' },
      { key:'I', name:'Interpret · Intelligence', color:'blue',  desc:'Interpret with Intelligence — journey analytics, segments, influence and affinity make the customer picture measurable.', go:'journey' },
      { key:'N', name:'Navigate · Navigator', color:'purple', desc:'Navigate actions with the Navigator — orchestrate territory, execution and engagement into omnichannel action.', go:'territory' },
    ],
    fiveC: [
      { c:'Customer', desc:'Know who matters — HCPs, KOLs and accounts — with master data, segments and potential.' },
      { c:'Context',  desc:'Read the moment — journey stage, triggers, influence and news.' },
      { c:'Channel',  desc:'Reach on the preferred channel — digital affinity and best contact windows.' },
      { c:'Content',  desc:'Deliver what resonates — MLR-approved, performance-ranked content.' },
      { c:'Cadence',  desc:'Time it right — orchestrated, optimised sequences across field and digital.' },
    ],
    features: [
      { icon:'plug',   name:'Data sources & your knowledge', desc:'Public feeds (CMS Open Payments, NPPES, Part D) + internal systems are connected above in this Guide; your own customer knowledge is managed in the Command Center.', how:'Toggle a source on here; add what you know in the Command Center.' },
      { icon:'target', name:'Cockpit',                 desc:'The heart of C360 — opens with today’s decision, then your objectives and cycle-by-cycle tracking.', how:'Work the decision; tap objectives to personalise; switch cycles to plan ahead.', go:'cockpit' },
      { icon:'spark',  name:'PrecisionNeXT Best Actions', desc:'Ranked, explainable next best actions per customer, organised by the 5Cs.', how:'Use “Execute with AI” or “Why this?” on any card.', go:'nba' },
      { icon:'globe',  name:'Customer Universe',        desc:'Master data of HCPs & accounts — tier, decile, affinity, access risk.', how:'Scan the table; each row carries a next action.', go:'universe' },
      { icon:'route',  name:'Journey Analytics',        desc:'Where each HCP sits in the adoption journey, with engagement scoring.', how:'Read the funnel and stage transitions.', go:'journey' },
      { icon:'layers', name:'Segment Insights',         desc:'Micro-segments and the play that converts each.', how:'Match message & channel to the segment.', go:'journey' },
      { icon:'share',  name:'Influence Network',        desc:'KOL/DOL influence maps and referral relationships.', how:'Follow the ties to the people behind the decision.', go:'influence' },
      { icon:'signal', name:'Digital Affinity',         desc:'Channel & content preferences and best contact windows.', how:'Engage where and when each HCP prefers.', go:'affinity' },
      { icon:'doc',    name:'Content Performance',       desc:'MLR-approved assets ranked by relevance & engagement.', how:'Pick the top-fit asset for each touch.', go:'affinity' },
      { icon:'map',    name:'Territory & Route Plan',    desc:'Coverage and an optimised route built from the intelligence.', how:'Follow the route; it closes your objectives.', go:'territory' },
      { icon:'check',  name:'Execution Plan',            desc:'Sequenced, AI-assisted steps with owners and timing.', how:'Work the steps; PrecisionNeXT drafts the first touch.', go:'territory' },
      { icon:'flow',   name:'Engagement Orchestration',  desc:'Cross-channel cadence connecting field & digital.', how:'Run the cadence to orchestrate omnichannel.', go:'orchestration' },
      { icon:'spark',  name:'Nexi — PrecisionNeXT Intelligence', desc:'Always-on copilot (Nexi in the chat), bottom-right. Alerts you to new intelligence and answers in context.', how:'Click the star circle anytime; click again to minimise.' },
    ],
  },

  /* ---- registries (filled by the content files; do not edit) ----------------------------------- */
  personaOrder: ['rep','msl','kam','mkt','lead'],
  personas: {},
  shared: { sections:{} },
  register(id, data){ this.personas[id] = data; },
  registerShared(sections){ Object.assign(this.shared.sections, sections); },

  /* Resolve a screen: persona override → shared scaffold → null (engine shows placeholder). */
  resolve(personaId, sectionId){
    const p = this.personas[personaId];
    if (p && p.sections && p.sections[sectionId]) return p.sections[sectionId];
    if (this.shared.sections[sectionId]) return this.shared.sections[sectionId];
    return null;
  },
};
