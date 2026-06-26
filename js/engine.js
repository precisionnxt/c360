/* ==================================================================================================
   Customer 360 · ENGINE                                              (rendering + behaviour — rarely edited)
   --------------------------------------------------------------------------------------------------
   Turns the data (app.config.js + the content files) into the UI. You normally DON'T edit this to
   change content — edit the persona files. Edit here only to add a NEW block type or change behaviour.

     ICON ................ inline-SVG icon set (add an icon here, reference it by key in nav/blocks)
     BLOCK_RENDERERS ..... one function per block type  → add render<Type>() + register to add a widget
     renderSidebar / Topbar / Summary / Section ... app chrome
     objectives state .... Cockpit selections (personalisation)
     search .............. functional filter over the current view
     PrecisionNeXT engine .......... alerts, chat, simulated reasoning, FAB open/close toggle
   ================================================================================================ */
(function(){
  "use strict";
  const A = window.C360;

  /* ---- tiny DOM helpers ---- */
  const $  = (s)=>document.querySelector(s);
  const $$ = (s)=>document.querySelectorAll(s);
  const el = (t,c,h)=>{const n=document.createElement(t);if(c)n.className=c;if(h!=null)n.innerHTML=h;return n;};
  const esc= (s)=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const tone=(t)=>({green:'var(--green)',blue:'var(--blue)',purple:'var(--purple)',amber:'var(--amber)',rose:'var(--rose)',teal:'var(--teal)',
    positive:'var(--green)',warning:'var(--amber)',risk:'var(--rose)',neutral:'var(--blue)'}[t]||'var(--blue)');

  /* ---- app state ---- */
  const S = { persona:A.app.defaultPersona, section:A.app.defaultSection, pniOpen:false, objectives:{}, hcp:null };

  /* ---- workspace storage (localStorage, with an in-session fallback for file:// origins) ---- */
  const _mem={};
  const STORE={
    get(k,d){ try{ const v=localStorage.getItem('c360:'+k); return v==null?((k in _mem)?_mem[k]:d):JSON.parse(v); }catch(e){ return (k in _mem)?_mem[k]:d; } },
    set(k,v){ _mem[k]=v; try{ localStorage.setItem('c360:'+k, JSON.stringify(v)); }catch(e){} },
  };

  /* ---- ICON SET (add new icons here; reference by key) ---- */
  const ICON={
    spark:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 5.3L20 8l-4 4 1 6-5-2.8L7 18l1-6-4-4 5.6-.7z"/></svg>',
    globe:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
    route:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/></svg>',
    layers:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
    share:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 11l7.6-4M8.2 13l7.6 4"/></svg>',
    signal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20v-5M10 20V9M16 20V13M22 20V4"/></svg>',
    check:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/></svg>',
    doc:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></svg>',
    flow:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/></svg>',
    bulb:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12c.7.7 1 1.3 1 2h6c0-.7.3-1.3 1-2A7 7 0 0 0 12 2z"/></svg>',
    target:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>',
    star:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l2.6 5.6L21 9.3l-4.5 4.3 1.1 6.1L12 17l-5.6 2.7 1.1-6.1L3 9.3l6.4-.7L12 3z"/></svg>',
    social:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-5A8 8 0 1 1 21 11.5z"/></svg>',
    id:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M5 17c.6-1.8 2.2-3 4-3s3.4 1.2 4 3M15 9h4M15 13h3"/></svg>',
    grid:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    home:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
    map:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>',
    eye:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
    users:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.3 3-5 7-5s7 1.7 7 5"/><path d="M16 5a3 3 0 0 1 0 6M22 20c0-2.5-1.6-4.2-4-4.8"/></svg>',
    rocket:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 11a4 4 0 0 1 0-6c2.5-2.5 8-2 8-2s.5 5.5-2 8a4 4 0 0 1-6 0z"/><circle cx="14" cy="8" r="1.3"/></svg>',
    plug:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 2v6M15 2v6M7 8h10v3a5 5 0 0 1-10 0V8zM12 16v6"/></svg>',
    database:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/></svg>',
    x:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  };

  /* ================================================================================================
     BLOCK RENDERERS — each returns an HTML string. Register new types in BLOCK_RENDERERS.
     ============================================================================================== */
  function cardShell(b, inner, accent){
    const head = b.title ? `<div class="card-h"><div class="ic" style="background:${accent||'var(--blue)'}">${ICON[b.icon]||ICON.bulb}</div>
        <div><h2>${esc(b.title)}</h2>${b.sub?`<p>${esc(b.sub)}</p>`:''}</div>${b.pill?`<span class="pill">${esc(b.pill)}</span>`:''}</div>`:'';
    return `<div class="card reveal">${head}<div class="card-b">${inner}</div></div>`;
  }

  /* ---- SUMMARY-STAT ENRICHMENT ----------------------------------------------------------------
     Every summary number (Command Center + other tabs) should explain HOW it was derived and let
     the user click through to the detail. enrichKpi() attaches a hover explainer (the small "i")
     and a drill-down target to any stat that doesn't already declare one — inferred from its label
     and computed LIVE from the current roster/objectives so the explainer always matches the data. */
  function kpiInfer(label){
    const k=String(label||'').toLowerCase(), hcps=(window.C360.hcps)||[];
    if(/objective/.test(k)) return {go:'cockpit', scroll:'.objs', how:`Goals you’ve switched on this cycle (${objSet(S.persona).size} active).`};
    if(/visit|call|touch|meeting|qbr|coverage|route|cluster|territor/.test(k)) return {go:'territory', how:'Coverage & field touches on your route plan.'};
    if(/priorit|urgent|at-risk|at risk/.test(k)) return {go:'nba', how:`Nexi’s priorities to act on now — ${hcps.filter(h=>h.prio==='high').length} high.`};
    if(/hcp|customer|book|tracked|in plan|target|account|audience|kol/.test(k)) return {go:'universe', how:`Your active book — segment, objective or a live signal (${hcps.length}).`};
    if(/\bplan\b|track|attain|cycle|readiness|growth|share/.test(k)) return {go:'cockpit', scroll:'.cyc-bar', how:'On or ahead of plan this cycle.'};
    if(/start|trx|nrx|\brx\b|script|roi|mql/.test(k)) return {go:'journey', how:'From CRM + dispense / campaign data.'};
    if(/congress|pub|inquiry|stakeholder|campaign|brand|role|region|launch/.test(k)) return {go:'universe', how:'From your medical, content & engagement signals.'};
    return {go:null, how:'From your connected commercial & medical signals.'};
  }
  // every summary box gets a one-line "how" (derivation) + an optional drill target. An author-supplied
  // `info` string is treated as the derivation; otherwise it's inferred from the label. The drill target
  // is dropped when it points at the screen you're already on.
  function enrichKpi(i){
    const inf=kpiInfer(i.k);
    const how=i.how || inf.how;                                 // crisp, uniform derivation → divider lines align
    let go=i.go || inf.go || null, scroll=null;
    if(go===S.section){ scroll=inf.scroll||null; go=null; }     // same screen → scroll to the relevant block instead
    return {...i, how, go, scroll};
  }
  /* render the explainer body (string or {what,connects,source}) used by both kpi + kcard tooltips */
  function kpiInfoHtml(info){
    if(!info) return '';
    if(typeof info==='string') return `<div class="ki-row">${esc(info)}</div>`;
    return `${info.what?`<div class="ki-row"><b>What</b> ${esc(info.what)}</div>`:''}${info.connects?`<div class="ki-row"><b>Feeds</b> ${esc(info.connects)}</div>`:''}${info.source?`<div class="ki-row"><b>From</b> ${esc(info.source)}</div>`:''}`;
  }

  /* header: organized cards = focus card + KPI cards */
  function renderHeader(b){
    const k=(b.kpis||[]).map(enrichKpi).map(i=>{
      const act=i.go?{attr:` data-kgo="${esc(i.go)}"`,lbl:'Open ↗'}:(i.scroll?{attr:` data-kscroll="${esc(i.scroll)}"`,lbl:'Details ↓'}:null);
      const cls='kcard'+(act?' go':'');
      return `<div class="${cls}"${act?act.attr:''}>
        <div class="kpi-body"><div class="kpi-top"><span class="v">${esc(i.v)}</span>${act?`<span class="ki-go">${act.lbl}</span>`:''}</div>
          <div class="k">${esc(i.k)}</div>
          ${i.tr?`<div class="tr" style="color:${tone(i.tone)}">${esc(i.tr)}</div>`:''}</div>
        <div class="kpi-how"><span>How</span> ${esc(i.how)}</div></div>`;
    }).join('');
    if(!b.focus) return `<div class="kgrid reveal">${k}</div>`;   // no name/entity box → KPIs fill the width
    const f=b.focus;
    const focus=`<div class="focus"><div class="av">${esc(f.av)}</div><div class="nm">${esc(f.name)}</div>
      <div class="sb">${esc(f.sub||'')}</div>${f.tag?`<div class="tg">${esc(f.tag)}</div>`:''}</div>`;
    return `<div class="header reveal">${focus}<div class="kgrid">${k}</div></div>`;
  }

  /* sensing-signals layout (the "WATCH" layer) — what PrecisionNeXT is detecting right now */
  function renderSignals(b){
    const cards=(b.items||[]).map(s=>`<button class="sig ${s.tone||'blue'}" data-sig-hcp="${esc(s.hcp||'')}" data-sig-go="${esc(s.go||'')}" data-sig-q="${esc(s.title||'')}">
      <div class="sig-top"><span class="sig-k">${esc(s.kind||'Signal')}</span>${s.pri?`<span class="sig-pri ${s.pri}">${s.pri==='high'?'High':s.pri==='med'?'Medium':'Low'}</span>`:''}<span class="sig-t">${esc(s.time||'')}</span></div>
      <div class="sig-ti">${esc(s.title)}</div><div class="sig-d">${esc(s.detail||'')}</div>
      <div class="sig-cta">${esc(s.cta||'View')} ↗</div></button>`).join('');
    return cardShell(b,`<div class="sig-grid">${cards}</div>`,'var(--purple)');
  }

  /* ---- Weekly engagement plan (Mon–Fri cadence) ------------------------------------------------ */
  function renderWeekPlan(b){
    const cols=(b.days||[]).map(d=>`<div class="wk-col"><div class="wk-h">${esc(d.day)}<span>${esc(d.slots||'')}</span></div>
      ${(d.items||[]).map(it=>`<div class="wk-card ${it.tone||'blue'}"><div class="wk-k">${esc(it.kind||'')}</div><div class="wk-n">${esc(it.name)}</div><div class="wk-s">${esc(it.sub||'')}</div>${it.action?`<div class="wk-a">${esc(it.action)}</div>`:''}</div>`).join('')}</div>`).join('');
    return cardShell(b,`<div class="wk-grid">${cols}</div>`,'var(--green)');
  }

  /* ---- HCP journey profile (Journey Analytics) ------------------------------------------------- */
  function renderJourneyProfile(b){
    const h=((window.C360.hcps)||[]).find(x=>x.id===b.hcp)||{};
    const facts=[['NPI',b.npi||'—'],['Location',b.location||'—'],['Therapeutic area',b.ta||h.spec||'—'],['Brand',(h.tags&&h.tags[0])||'—'],['Segment',b.segment||('Segment '+(h.seg||'—'))],['Stage',b.stage||'Engage'],['Identity score',(b.identity!=null?b.identity:'—')],['Email consent',b.consent||'—']];
    const factHtml=facts.map(f=>`<div class="jp-fact"><span>${esc(f[0])}</span><b>${esc(String(f[1]))}</b></div>`).join('');
    const stagesArr=['Attract','Consider','Engage']; const si=(b.stageIndex!=null?b.stageIndex:2);
    const stages=stagesArr.map((s,i)=>`<div class="jstage ${i===si?'on':(i<si?'done':'')}"><span class="jn">${i}</span><div class="jx"><div class="jt">${s}</div><div class="js">${['Awareness building','Active evaluation','Loyal advocate'][i]}</div></div></div>`).join('');
    const inner=`<div class="jp-wrap">
        <div class="jp-id"><span class="hcp-av lg" style="background:${tone(segTone(h.seg))}">${esc(h.init||'?')}</span>
          <div><div class="jp-nm">${esc(h.name||b.name||'HCP')}</div><div class="jp-sp">${esc(h.spec||'')} · ${esc(h.account||'')}</div></div></div>
        <div class="jp-facts">${factHtml}</div>
        <div class="jp-score"><div class="jp-ring">${ring('Engagement',b.score!=null?b.score:(h.engage||0),'var(--green)')}</div>
          <div class="jp-note"><b>${b.activities||'—'} activities</b> with this HCP. ${esc(b.scoreNote||'Top-decile engagement across the journey.')}</div></div>
      </div>
      <div class="jp-stages">${stages}</div>`;
    return cardShell(b,inner,'var(--blue)');
  }

  function renderKpis(b){
    const k=(b.items||[]).map(enrichKpi).map(i=>{
      const act=i.go?{attr:` data-kgo="${esc(i.go)}"`,lbl:'Open ↗'}:(i.scroll?{attr:` data-kscroll="${esc(i.scroll)}"`,lbl:'Details ↓'}:null);
      const cls='kpi'+(act?' go':'');
      return `<div class="${cls}"${act?act.attr:''}>
        <div class="kpi-body"><div class="kpi-top"><span class="v">${esc(i.v)}</span>${act?`<span class="ki-go">${act.lbl}</span>`:''}</div>
          <div class="k">${esc(i.k)}</div>
          ${i.desc?`<div class="kd">${esc(i.desc)}</div>`:''}${i.tr?`<div class="tr" style="color:${tone(i.tone)}">${esc(i.tr)}</div>`:''}</div>
        <div class="kpi-how"><span>How</span> ${esc(i.how)}</div></div>`;
    }).join('');
    return cardShell(b,`<div class="kpis">${k}</div>`,'var(--blue)');
  }
  /* re-rank the HCP cockpit cards by a 5C lens (data-c* attributes on each card) */
  function sortHcpCards(key){
    if(!key) return;
    $$('#content .hcp-grid').forEach(grid=>{
      Array.from(grid.children).filter(c=>c.classList&&c.classList.contains('hcp-card'))
        .sort((a,b)=>(+b.dataset['c'+key]||0)-(+a.dataset['c'+key]||0))
        .forEach(c=>grid.appendChild(c));
    });
  }

  /* objectives: selectable Cockpit cards. Interactivity wired after render (toggleObjective). */
  const CHK='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><path d="M5 12l4 4 10-10"/></svg>';
  function objSummaryChips(items,set){
    const active=items.filter(o=>set.has(o.id));
    return active.map(o=>`<span class="ochip">${ICON[o.icon]||''}${esc(o.title)}</span>`).join('') || '<span class="ochip muted">No objectives active yet</span>';
  }
  function renderObjectives(b){
    const items=b.items||[], set=objSet(S.persona), activeN=items.filter(o=>set.has(o.id)).length;
    const cards=items.map(o=>{
      const on=set.has(o.id);
      return `<div class="obj ${on?'on':''}" data-obj="${esc(o.id)}">
        <div class="top"><div class="ic">${ICON[o.icon]||ICON.target}</div>
          <div class="chk">${on?CHK:''}</div></div>
        <h4>${esc(o.title)}</h4><p>${esc(o.desc)}</p>
        ${o.recommended?`<span class="rec">${ICON.spark} Suggested</span>`:''}
        <div class="trk">Tracks: <b>${esc(o.track)}</b></div></div>`;
    }).join('');
    // Objectives are set once and refined over time → show a SUMMARY, click "Configure" to edit.
    const inner=`<div class="obj-summary"><div class="obj-chips">${objSummaryChips(items,set)}</div>
        <button class="btn btn-gh obj-config" type="button">${ICON.target} Configure · ${activeN} active</button></div>
      <div class="objs collapsed">${cards}</div>`;
    return cardShell(b,inner,'var(--green)');
  }

  function renderInsights(b){
    const rows=(b.items||[]).map(i=>`<div class="ins"><div class="mk" style="background:${tone(i.tone)}"></div>
      <div class="bd"><div class="t">${esc(i.title)}</div><div class="d">${esc(i.detail)}</div></div>
      <div class="mt"><div class="m">${esc(i.metric||'')}</div><div class="dl" style="color:${i.dir==='down'?'var(--rose)':'var(--green-hover)'}">${esc(i.delta||'')}</div></div></div>`).join('');
    return cardShell(b,rows,'var(--blue)');
  }

  function renderActions(b){
    const L={high:'Priority',med:'Recommended',low:'Optional'};
    const cards=(b.items||[]).map((a,i)=>`<div class="act">
      <div class="r1"><span class="pri pri-${a.priority}">${L[a.priority]||'Action'}</span>
        <span class="aichip">${ICON.spark} ${a.confidence}% confidence</span></div>
      <h3>${esc(a.title)}</h3><div class="why">${esc(a.rationale)}</div>
      <div class="meta"><span class="mi">Impact <b>${esc(a.impact)}</b></span><span class="mi">Effort <b>${esc(a.effort)}</b></span><span class="mi">Channel <b>${esc(a.channel)}</b></span></div>
      <div class="btns"><button class="btn btn-ai" data-exec="${i}">${ICON.spark} Execute with AI</button>
        <button class="btn btn-gh" data-why="${i}">Why this?</button></div></div>`).join('');
    return cardShell(b,cards,'var(--purple)');
  }

  function renderList(b){
    const rows=(b.items||[]).map(i=>`<div class="li"><span class="dot" style="background:${tone(i.tone)}"></span>
      <div><div class="t">${esc(i.title)}</div><div class="s">${esc(i.sub||'')}</div></div>
      <div class="rt"><div class="v">${esc(i.value||'')}</div><div class="c">${esc(i.cap||'')}</div></div></div>`).join('');
    return cardShell(b,`<div class="lst">${rows}</div>`,'var(--green)');
  }

  function renderBars(b){
    const rows=(b.items||[]).map(i=>{const pct=Math.max(2,Math.round((i.value/(i.max||100))*100));
      return `<div class="bar"><div class="top"><span>${esc(i.label)}</span><span class="vv">${esc(i.vv!=null?i.vv:i.value)}</span></div>
        <div class="track"><div class="fill" style="width:${pct}%;background:${tone(i.tone)}"></div></div></div>`;}).join('');
    return cardShell(b,`<div class="bars">${rows}</div>`,'var(--blue)');
  }

  function renderSteps(b){
    const items=b.items||[], done=items.filter(s=>s.status==='done').length, active=items.filter(s=>s.status==='active').length;
    const pct=items.length?Math.round((done/items.length)*100):0;
    const head=`<div class="stp-head"><div class="stp-prog"><div class="stp-prog-f" style="width:${pct}%"></div></div>
      <div class="stp-stat"><b>${done}</b> of <b>${items.length}</b> complete${active?` · <b>${active}</b> in progress`:''} · ${pct}%</div></div>`;
    const cards=items.map((s,i)=>`<div class="stp2 ${s.status}">
      <div class="snode">${s.status==='done'?'✓':(i+1)}</div>
      <div class="sct"><div class="t">${esc(s.title)}</div><div class="m">${esc(s.meta||'')}</div>
        <div class="bg"><span class="mini own">${esc(s.owner||'You')}</span>${s.ai?`<span class="mini ai">${ICON.spark} Nexi</span>`:''}
          <span class="mini">${s.status==='done'?'Complete':s.status==='active'?'In progress':'Up next'}</span></div></div></div>`).join('');
    return cardShell(b,`${head}<div class="stp-grid">${cards}</div>`,'var(--green)');
  }

  function renderTable(b){
    const head=`<tr>${(b.cols||[]).map(c=>`<th>${esc(c)}</th>`).join('')}</tr>`;
    const body=(b.rows||[]).map(r=>`<tr>${r.map((c,ci)=>{
      const cell=(c&&typeof c==='object')?`<span class="chipx ${c.chip}">${esc(c.text)}</span>`:`<span class="${ci===0?'nm':''}">${esc(c)}</span>`;
      return `<td>${cell}</td>`;}).join('')}</tr>`).join('');
    return cardShell(b,`<table class="tbl"><thead>${head}</thead><tbody>${body}</tbody></table>`,'var(--green)');
  }

  function renderNetwork(b){
    const c=b.center||{};
    const hub=`<div class="hub"><div class="a">${esc(c.av)}</div><div><div class="n">${esc(c.name)}</div><div class="r">${esc(c.role||'')}</div></div></div>`;
    const sp=(b.items||[]).map(s=>`<div class="spoke"><div class="a" style="background:${tone(s.tone)}">${esc(s.av)}</div>
      <div><div class="n">${esc(s.name)}</div><div class="r">${esc(s.role||'')}</div></div>
      <div class="tie" style="color:${tone(s.tone)}">${esc(s.tie||'')}</div></div>`).join('');
    return cardShell(b,`<div class="net">${hub}${sp}</div>`,'var(--purple)');
  }

  function renderFeatureGrid(b){
    const cards=(b.items||[]).map(f=>`<div class="feat"><div class="fi">${ICON[f.icon]||ICON.grid}</div>
      <h4>${esc(f.title)}</h4><p>${esc(f.desc)}</p>
      ${f.bullets?`<ul>${f.bullets.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}</div>`).join('');
    return cardShell(b,`<div class="fgrid">${cards}</div>`,'var(--blue)');
  }

  function renderValueProps(b){
    const ps=(b.items||[]).map(p=>`<div class="p"><div class="t">${esc(p.title)}</div><div class="d">${esc(p.desc)}</div></div>`).join('');
    return `<div class="vp reveal"><h2>${esc(b.headline)}</h2>${b.sub?`<div class="sb">${esc(b.sub)}</div>`:''}<div class="grid">${ps}</div></div>`;
  }

  function renderNote(b){ return `<div class="card reveal"><div class="card-b"><div class="note"><span class="i">${ICON.spark}</span><div>${esc(b.text)}</div></div></div></div>`; }

  /* ---- TERRITORY TILE-MAP ----------------------------------------------------------------------
     A stylised US tile-grid map (row,col per state). Block: {type:'tilemap', densities:{TX:88,…}, pins:{TX:3,…}}
     States present in `densities` are shaded by value (0-100); others render faint. `pins` adds a priority badge. */
  const US_TILEGRID={
    AK:[0,0], ME:[0,10], VT:[1,9], NH:[1,10],
    WA:[2,0],ID:[2,1],MT:[2,2],ND:[2,3],MN:[2,4],WI:[2,5],MI:[2,6],NY:[2,8],MA:[2,9],RI:[2,10],
    OR:[3,0],NV:[3,1],WY:[3,2],SD:[3,3],IA:[3,4],IL:[3,5],IN:[3,6],OH:[3,7],PA:[3,8],NJ:[3,9],CT:[3,10],
    CA:[4,0],UT:[4,1],CO:[4,2],NE:[4,3],MO:[4,4],KY:[4,5],WV:[4,6],VA:[4,7],MD:[4,8],DE:[4,9],
    AZ:[5,1],NM:[5,2],KS:[5,3],AR:[5,4],TN:[5,5],NC:[5,6],SC:[5,7],DC:[5,8],
    OK:[6,3],LA:[6,4],MS:[6,5],AL:[6,6],GA:[6,7],
    HI:[7,0],TX:[7,3],FL:[7,8]
  };
  function densColor(d){ return `rgba(107,92,165,${(0.18+0.82*Math.max(0,Math.min(100,d))/100).toFixed(2)})`; }
  function renderTilemap(b){
    const dens=b.densities||{}, pins=b.pins||{};
    const tiles=Object.entries(US_TILEGRID).map(([ab,rc])=>{
      const has=dens[ab]!=null, col=has?densColor(dens[ab]):'rgba(127,138,166,.12)', txt=has&&dens[ab]>=52?'#fff':'var(--ink-faint)';
      return `<div class="tm-cell" style="grid-row:${rc[0]+1};grid-column:${rc[1]+1};background:${col};color:${txt}" title="${ab}${has?' · density '+dens[ab]:''}">${ab}${pins[ab]?`<span class="tm-pin">${pins[ab]}</span>`:''}</div>`;
    }).join('');
    return cardShell(b,`<div class="tm-grid">${tiles}</div>
      <div class="tm-legend"><span>Lower density</span><i class="tm-grad"></i><span>Higher density</span><span class="tm-pinkey"><span class="tm-pin" style="position:static">n</span> priority cities</span></div>`,'var(--purple)');
  }

  /* ---- INFLUENCE NETWORK GRAPH ------------------------------------------------------------------
     Clustered node-link graph laid out radially by therapeutic-area cluster; hover highlights a node + its ties.
     Block: {type:'graph'} uses the built-in dataset below (edit INFLUENCE_GRAPH to change it). */
  const INFLUENCE_GRAPH={
    clusters:[{name:'Cardiology',color:'#4A90C2'},{name:'Endocrinology',color:'#5E9F8B'},{name:'Neurology',color:'#6B5CA5'},{name:'Oncology',color:'#C2566B'},{name:'Immunology',color:'#D9892F'}],
    nodes:[
      {n:'Prof. Vásquez',cl:1,inf:96},{n:'Dr. Idris',cl:1,inf:88},{n:'Dr. O. Reyes',cl:1,inf:60},{n:'Dr. M. Reyes',cl:1,inf:54},{n:'Dr. Méndez',cl:1,inf:46},
      {n:'Dr. Chen',cl:0,inf:90},{n:'Dr. Patel',cl:0,inf:64},{n:'Dr. Adams',cl:0,inf:48},
      {n:'Dr. Brandt',cl:2,inf:82},{n:'Dr. Cole (DOL)',cl:2,inf:74},{n:'Dr. Vance',cl:2,inf:52},
      {n:'Dr. Young',cl:3,inf:86},{n:'Dr. Rao',cl:3,inf:58},{n:'Dr. Frost',cl:3,inf:50},
      {n:'Dr. Singh',cl:4,inf:78},{n:'Dr. Liu',cl:4,inf:56}
    ],
    links:[[0,1],[0,2],[0,3],[0,4],[1,2],[5,6],[5,7],[8,9],[8,10],[11,12],[11,13],[14,15],[0,5],[0,8],[5,8],[9,0],[11,14],[8,11],[6,1]]
  };
  function renderGraph(b){
    const g=b.graph||INFLUENCE_GRAPH, W=560,H=380,cx=W/2,cy=H/2,RC=120,K=g.clusters.length;
    const byCl={}; g.nodes.forEach((nd,i)=>{(byCl[nd.cl]=byCl[nd.cl]||[]).push(i);});
    const pos=[];
    g.clusters.forEach((cl,k)=>{
      const ang=(2*Math.PI*k/K)-Math.PI/2, ccx=cx+RC*Math.cos(ang), ccy=cy+RC*Math.sin(ang), ids=byCl[k]||[];
      ids.forEach((id,j)=>{ const a2=2*Math.PI*j/Math.max(1,ids.length), rr=ids.length>1?44:0;
        pos[id]={x:ccx+rr*Math.cos(a2), y:ccy+rr*Math.sin(a2)}; });
    });
    const adj={}; g.links.forEach(([a,bb])=>{(adj[a]=adj[a]||[]).push(bb);(adj[bb]=adj[bb]||[]).push(a);});
    const lines=g.links.map(([a,bb])=>`<line class="gl" x1="${pos[a].x.toFixed(1)}" y1="${pos[a].y.toFixed(1)}" x2="${pos[bb].x.toFixed(1)}" y2="${pos[bb].y.toFixed(1)}"/>`).join('');
    const circles=g.nodes.map((nd,i)=>{const r=(6+(nd.inf||50)/11).toFixed(1), c=g.clusters[nd.cl].color;
      return `<g class="gn" data-i="${i}" data-cl="${nd.cl}" data-adj="${(adj[i]||[]).join(',')}"><circle cx="${pos[i].x.toFixed(1)}" cy="${pos[i].y.toFixed(1)}" r="${r}" fill="${c}"/><text x="${pos[i].x.toFixed(1)}" y="${(pos[i].y-r-3).toFixed(1)}" class="gt">${esc(nd.n)}</text></g>`;}).join('');
    const clCount={}; g.nodes.forEach(nd=>clCount[nd.cl]=(clCount[nd.cl]||0)+1);
    const legend=g.clusters.map((c,ci)=>`<div class="gleg" data-cl="${ci}" title="Focus ${esc(c.name)} — ${clCount[ci]||0} KOLs"><span class="d" style="background:${c.color}"></span>${esc(c.name)} <b>${clCount[ci]||0}</b></div>`).join('');
    const stats=`<div class="gstat"><b>${g.nodes.length}</b> KOLs · <b>${g.links.length}</b> ties · <b>${g.clusters.length}</b> areas</div>`;
    return cardShell(b,`<div class="graph-wrap"><div class="graph-stage"><svg viewBox="0 0 ${W} ${H}" class="graph-svg">${lines}${circles}</svg></div><div class="graph-side">${legend}${stats}</div></div>`,'var(--purple)');
  }

  /* ---- HCP COCKPIT CARDS (NBA + Customer) ------------------------------------------------------
     {type:'hcpcards', variant:'nba'|'score'} renders a filterable grid of HCP cards from C360.hcps. */
  const segTone=(s)=>({A:'green',B:'blue',C:'amber',D:'rose'}[s]||'blue');
  /* assign each HCP a primary 5C lens, deterministically from real fields (used to group the NBA cards) */
  const C5={customer:{lab:'Customer',sub:'Who matters',def:'which customers to prioritise'},
            context:{lab:'Context',sub:'Needs attention',def:'the moment, trigger & contact reason'},
            channel:{lab:'Channel',sub:'Digital-first',def:'which channel to reach them on'},
            content:{lab:'Content',sub:'Clinical fit',def:'what content resonates'},
            cadence:{lab:'Cadence',sub:'Overdue a touch',def:'when & how often to touch'}};
  function categorizeHcp(h){
    if(/declin/i.test(h.trend||'')) return 'context';
    if((h.engage||0) < 55)          return 'cadence';
    if((h.digital||0) >= 72)        return 'channel';
    if((h.rx||0) >= 60)             return 'content';
    return 'customer';
  }
  function ixMini(lab,v){ return `<div class="ix"><div class="iv">${v}</div><div class="il">${esc(lab)}</div></div>`; }
  function scoreBar(lab,v,t){ const pct=Math.max(3,Math.min(100,v||0)); return `<div class="sx"><div class="sx-h"><span>${esc(lab)}</span><b>${v}</b></div><div class="sx-t"><div class="sx-f" style="width:${pct}%;background:${tone(t)}"></div></div></div>`; }
  const NBA_WHY={Visit:'Warm relationship with an open objective — in-person is the highest-impact touch right now.',Digital:'Engaged digitally; deliver the asset that moves them to the next stage.',Sample:'New-starter support reduces early discontinuation risk.',Advisory:'High scientific influence — an advisory invitation deepens the partnership.',Webinar:'Strong event affinity — a webinar invite fits their preferred channel.','Re-engage':'Cooling fast and contact recency is slipping — re-engage before the relationship lapses.'};
  function renderHcpCards(b){
    const variant=b.variant||'nba';
    let list=(window.C360.hcps)||[];
    // Customer Insight (score): lead with the priority customers (High → Med → Low, then by engagement)
    if(variant==='score') list=list.slice().sort((a,b)=>(({high:0,med:1,low:2}[a.prio])-({high:0,med:1,low:2}[b.prio]))||((b.engage||0)-(a.engage||0)));
    const counts={all:list.length,high:0,med:0,low:0}; list.forEach(h=>{counts[h.prio]=(counts[h.prio]||0)+1;});
    const c5counts={}; Object.keys(C5).forEach(k=>c5counts[k]=0); list.forEach(h=>{ c5counts[categorizeHcp(h)]++; });
    // Prioritised-HCP list: Priority (H/M/L) is the primary set of boxes you slice through; the 5C lens
    // is a secondary filter whose count reveals in bold on hover. Both filter the grid together.
    const prow=[['__all','All',counts.all],['high','High',counts.high],['med','Med',counts.med],['low','Low',counts.low]]
      .map((p,i)=>`<button class="hcpf${i===0?' on':''}" data-dim="prio" data-val="${p[0]}">${p[1]} <b>${p[2]||0}</b></button>`).join('');
    const crow=['customer','context','channel','content','cadence']
      .map(k=>`<button class="hcpf hcpf-c" data-dim="c5" data-val="${k}" title="${esc(C5[k].def)}">${esc(C5[k].lab)} <b class="hcpf-n">${c5counts[k]||0}</b></button>`).join('');
    const crowAll=`<button class="hcpf hcpf-c on" data-dim="c5" data-val="__all">All</button>`;
    // crisp text for each C so the user knows what the lens means
    const c5legend=`<div class="hcp-5cdef">${['customer','context','channel','content','cadence']
      .map(k=>`<span><b>${esc(C5[k].lab)}</b> ${esc(C5[k].def)}</span>`).join('')}</div>`;
    const nbaBar=`<div class="hcp-bar2" data-hcpfilter="1"><div class="hcp-frow"><span class="hcp-fl">Priority</span>${prow}</div><div class="hcp-frow"><span class="hcp-fl">5C lens</span>${crowAll}${crow}</div>${c5legend}</div>`;
    const trendCls=(t)=>/down|declin/i.test(t||'')?'down':/up|rising/i.test(t||'')?'up':'flat';
    const cards=list.map(h=>{
      const scores=`<div class="hcp-scores">${scoreBar('Engage',h.engage,'green')}${scoreBar('Rx idx',h.rx,'blue')}${scoreBar('KOL',h.kol,'purple')}${scoreBar('Digital',h.digital,'teal')}</div>`;
      const why=h.why||NBA_WHY[h.nba&&h.nba.type]||'';
      const nba = variant==='score' ? '' :
        `<div class="hcp-nba"><div class="hcp-nbal">${ICON.spark} Precision Next Best Action</div><div class="hcp-nbat">${esc(h.nba.text)}</div>${why?`<div class="hcp-why">${esc(why)}</div>`:''}</div>`;
      const c5=categorizeHcp(h);
      const c5badge = variant==='score' ? '' : `<span class="hcp-c5 c5-${c5}">${esc(C5[c5].lab)}</span>`;
      return `<button class="hcp-card" data-prio="${h.prio}" data-seg="${esc(h.seg||'')}" data-brand="${esc((h.tags||[]).join('|').toLowerCase())}" data-c5="${c5}" data-hcp="${esc(h.id)}" data-cprio="${({high:3,med:2,low:1}[h.prio]||1)}" data-curgent="${/declin/i.test(h.trend||'')?2:/rising|up/i.test(h.trend||'')?0:1}" data-crx="${h.rx||0}" data-cdue="${100-(h.engage||0)}" data-cdigital="${h.digital||0}">
        <div class="hcp-top"><span class="hcp-av" style="background:${tone(segTone(h.seg))}">${esc(h.init)}</span>
          <span class="hcp-id"><span class="nm">${esc(h.name)}</span><span class="sp">${esc(h.spec)} · ${esc(h.account)}</span></span>
          <span class="hcp-prio ${h.prio}">${h.prio==='high'?'High':h.prio==='med'?'Med':'Low'}</span></div>
        ${scores}${nba}
        <div class="hcp-cfoot"><span>Seg ${esc(h.seg)}${variant==='score'?' · engagement '+h.engage:''}</span>${c5badge}<span class="hcp-tr ${trendCls(h.trend)}">${esc(h.trend||'')}</span></div></button>`;
    }).join('');
    // In the scoring (Customer Insight) view the unified filter bar above handles slicing, so the
    // per-card priority pills are suppressed to keep all filters in one place.
    const barHtml = variant==='score' ? '' : nbaBar;
    return cardShell(b,`${barHtml}<div class="hcp-grid">${cards}</div>`,'var(--purple)');
  }

  /* ---- 5C framework tab bar (NBA) — each tab FILTERS the cards to that 5C category --------------- */
  function renderFivecTabs(b){
    const list=(window.C360.hcps)||[];
    const byC={all:list.slice()}; Object.keys(C5).forEach(k=>byC[k]=[]);
    list.forEach(h=>{ const c=categorizeHcp(h); (byC[c]=byC[c]||[]).push(h); });
    const counts={}; Object.keys(byC).forEach(k=>counts[k]=byC[k].length);
    // dynamic, data-driven detail line for each 5C — reflects the HCPs the user is actually looking at
    const dyn=(arr)=>{ if(!arr.length) return 'none in plan';
      const avg=Math.round(arr.reduce((a,h)=>a+(h.engage||0),0)/arr.length);
      const hi=arr.filter(h=>h.prio==='high').length;
      const spec={}; arr.forEach(h=>{ if(h.spec) spec[h.spec]=(spec[h.spec]||0)+1; });
      const top=Object.entries(spec).sort((a,b)=>b[1]-a[1])[0];
      return `avg engage ${avg}${hi?` · ${hi} high-pri`:''}${top?` · ${esc(top[0])}`:''}`; };
    const tabs=[['all','All','Everyone in plan'],['customer','Customer',C5.customer.sub],['context','Context',C5.context.sub],
                ['channel','Channel',C5.channel.sub],['content','Content',C5.content.sub],['cadence','Cadence',C5.cadence.sub]];
    const cells=tabs.map((t,i)=>`<button class="fc-tab${i===0?' on':''}" data-c5="${t[0]}" title="${esc(t[2])}">
        <span class="fc-n">${esc(t[1])} <b>${counts[t[0]]||0}</b></span>
        <span class="fc-s">${esc(t[2])}</span>
        <span class="fc-x">${dyn(byC[t[0]]||[])}</span></button>`).join('');
    return cardShell(b,`<div class="fc-tabs six">${cells}</div>`,'var(--purple)');
  }

  /* ---- UNIFIED MASTER-DATA FILTER (Customer Insight) -------------------------------------------
     One place to slice & dice: Priority + Segment + Brand/TA, all as live toggle chips that filter
     the customer list below. Multiple chips within a row are OR'd; rows are AND'd. Wired in
     renderSection() → see the `.fb[data-fb]` handler. */
  function renderFilterBar(b){
    const hcps=(window.C360.hcps)||[];
    const brands={}; hcps.forEach(h=>(h.tags||[]).forEach(t=>brands[t]=(brands[t]||0)+1));
    const segs={}; hcps.forEach(h=>{ if(h.seg) segs[h.seg]=(segs[h.seg]||0)+1; });
    // fold the "Customer grouping summary" into the filter: each segment chip carries count + avg engagement
    const segAvg={}; Object.keys(segs).forEach(s=>{ const g=hcps.filter(h=>h.seg===s); segAvg[s]=g.length?Math.round(g.reduce((a,h)=>a+(h.engage||0),0)/g.length):0; });
    const prios=[['high','High'],['med','Medium'],['low','Low']].map(p=>({k:p[0],lab:p[1],n:hcps.filter(h=>h.prio===p[0]).length})).filter(p=>p.n);
    const chip=(dim,val,lab,n,extra)=>`<button class="fb-pill${extra||''}" data-dim="${dim}" data-val="${esc(val)}">${esc(lab)}${n!=null?` · ${n}`:''}</button>`;
    const allChip=(dim,lab)=>`<button class="fb-pill fb-all on" data-dim="${dim}" data-val="__all">${esc(lab)}</button>`;
    const segRow=Object.keys(segs).sort().map(s=>`<button class="fb-pill fb-seg" data-dim="seg" data-val="${esc(s)}">Segment ${esc(s)} <b>· ${segs[s]}</b> <span class="fb-sub">avg eng ${segAvg[s]}</span></button>`).join('');
    const prioRow=prios.map(p=>chip('prio',p.k,p.lab,p.n,' p-'+p.k)).join('');
    const brandRow=Object.entries(brands).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([k,v])=>chip('brand',k.toLowerCase(),k,v)).join('');
    const rows=
      `<div class="fb-row"><span class="fb-l">Priority</span>${allChip('prio','All · '+hcps.length)}${prioRow}</div>`+
      `<div class="fb-row"><span class="fb-l">Segment</span>${allChip('seg','All segments')}${segRow}</div>`+
      `<div class="fb-row"><span class="fb-l">Brand / TA</span>${allChip('brand','All brands')}${brandRow}</div>`+
      `<div class="fb-foot"><span class="fb-count"></span><button class="fb-reset" type="button">Reset filters</button></div>`;
    return cardShell(b,`<div class="fb" data-fb="1">${rows}</div>`,'var(--blue)');
  }

  /* ---- CUSTOMER GROUPING SUMMARY (by primary segment + priority) -------------------------------- */
  function renderHcpGroups(b){
    const list=(window.C360.hcps)||[], total=list.length||1, segTones={A:'green',B:'blue',C:'amber',D:'rose'};
    const segs=['A','B','C','D'].map(s=>{const g=list.filter(h=>h.seg===s); if(!g.length) return null;
      const avg=Math.round(g.reduce((a,h)=>a+(h.engage||0),0)/g.length);
      const pr={high:g.filter(h=>h.prio==='high').length,med:g.filter(h=>h.prio==='med').length,low:g.filter(h=>h.prio==='low').length};
      const spec={}; g.forEach(h=>{ if(h.spec) spec[h.spec]=(spec[h.spec]||0)+1; }); const top=Object.entries(spec).sort((a,b)=>b[1]-a[1])[0];
      return {s,n:g.length,avg,pr,top:top?top[0]:'—',tone:segTones[s]};}).filter(Boolean);
    // interactive stacked distribution bar
    const stack=segs.map(x=>`<div class="sm-band" style="width:${(x.n/total*100).toFixed(1)}%;background:${tone(x.tone)}" title="Segment ${x.s} · ${x.n} HCPs (${Math.round(x.n/total*100)}%)"><span>${x.s} · ${x.n}</span></div>`).join('');
    // enriched, clickable segment cards (engagement bar + priority split + top specialty)
    const cards=segs.map(x=>`<button class="sm-card" data-go="universe" title="Open Segment ${x.s} in Customer Insight">
        <div class="sm-h"><span class="sm-dot" style="background:${tone(x.tone)}"></span>Segment ${x.s}<span class="sm-n">${x.n}<small>HCPs</small></span></div>
        <div class="sm-eng"><div class="sm-eng-h"><span>avg engagement</span><b>${x.avg}</b></div><div class="sm-track"><div class="sm-fill" style="width:${Math.max(3,x.avg)}%;background:${tone(x.tone)}"></div></div></div>
        <div class="sm-prio">${x.pr.high?`<span class="sm-p high">${x.pr.high} High</span>`:''}${x.pr.med?`<span class="sm-p med">${x.pr.med} Med</span>`:''}${x.pr.low?`<span class="sm-p low">${x.pr.low} Low</span>`:''}</div>
        <div class="sm-top">Top specialty · <b>${esc(x.top)}</b></div>
        <span class="sm-cta">Open in Customer Insight ↗</span></button>`).join('');
    return cardShell(b,`<div class="sm-sech">By primary segment <span>${list.length} HCPs · click a segment to drill in</span></div><div class="sm-bar">${stack}</div><div class="sm-grid">${cards}</div>`,'var(--blue)');
  }

  /* ---- HCP 360 PROFILE VIEW (ring scores) ------------------------------------------------------- */
  function ring(label,v,color){
    const r=24,c=2*Math.PI*r,off=(c*(1-Math.max(0,Math.min(100,v))/100)).toFixed(1);
    return `<div class="ring"><svg viewBox="0 0 60 60"><circle class="rbg" cx="30" cy="30" r="${r}"/><circle class="rfg" cx="30" cy="30" r="${r}" style="stroke:${color};stroke-dasharray:${c.toFixed(1)};stroke-dashoffset:${off}"/></svg><div class="rv">${v}</div><div class="rl">${esc(label)}</div></div>`;
  }
  function openHcp(id){ S.hcp=id; S.section='__hcp__'; renderSidebar(); renderSummary(); renderSection(); window.scrollTo({top:0,behavior:'smooth'}); }
  function renderHcpProfile(){
    const wrap=$('#content'), h=((window.C360.hcps)||[]).find(x=>x.id===S.hcp);
    if(!h){ wrap.innerHTML='<div class="ph reveal">HCP not found.</div>'; return; }
    const rings=`<div class="rings">${ring('Engagement',h.engage,'var(--green)')}${ring('Rx index',h.rx,'var(--blue)')}${ring('KOL score',h.kol,'var(--purple)')}${ring('Digital',h.digital,'var(--teal)')}${ring('Access',h.access,'var(--amber)')}</div>`;
    wrap.innerHTML=
      `<div class="col-12"><div class="card reveal"><div class="card-b hcp-hero">
        <span class="hcp-av lg" style="background:${tone(segTone(h.seg))}">${esc(h.init)}</span>
        <div class="hh-id"><h2>${esc(h.name)}</h2><p>${esc(h.spec)} · ${esc(h.account)}</p>
          <div class="hh-tags">${(h.tags||[]).map(t=>`<span class="chipx p">${esc(t)}</span>`).join('')}<span class="chipx b">Segment ${esc(h.seg)}</span><span class="hcp-prio ${h.prio}">${h.prio==='high'?'High priority':h.prio==='med'?'Medium':'Low priority'}</span></div></div>
        <button class="btn btn-gh" id="hcp-back">← Back</button>
      </div></div></div>`+
      `<div class="col-8">${cardShell({title:'360° index scores',icon:'signal'},rings,'var(--blue)')}</div>`+
      `<div class="col-4">${cardShell({title:'Precision NeXT Best Action',icon:'spark'},
        `<div class="hcp-act"><div class="t">${esc(h.nba.text)}</div><div class="m">Type ${esc(h.nba.type)} · Channel ${esc(h.nba.channel)}</div><div class="btns"><button class="btn btn-ai" data-hexec="1">${ICON.spark} Execute with AI</button></div></div>`,'var(--purple)')}</div>`+
      `<div class="col-8">${cardShell({title:'Prescribing & financial performance',icon:'signal'},
        `<div class="kgrid"><div class="kcard"><div class="v">${esc(h.trx||'—')}</div><div class="k">TRx (rolling)</div></div>`+
         `<div class="kcard"><div class="v">${esc(h.nrx||'—')}</div><div class="k">NRx (new)</div></div>`+
         `<div class="kcard"><div class="v">${esc(h.share||'—')}</div><div class="k">Market share</div></div>`+
         `<div class="kcard"><div class="v">${esc(h.value||'—')}</div><div class="k">Account value</div></div></div>`,'var(--green)')}</div>`+
      `<div class="col-4">${cardShell({title:'Competitive context',icon:'bulb'},
        `<div class="lst"><div class="li"><span class="dot" style="background:${tone('rose')}"></span><div><div class="t">Competitor share</div><div class="s">${esc(h.comp||'—')} in this account</div></div></div>`+
         `<div class="li"><span class="dot" style="background:${tone('amber')}"></span><div><div class="t">Switch risk</div><div class="s">${esc(h.compRisk||'Monitor')}</div></div></div></div>`,'var(--amber)')}</div>`+
      `<div class="col-12">${cardShell({title:'Signals & engagement',icon:'eye'},
        `<div class="lst"><div class="li"><span class="dot" style="background:${tone((h.trend||'').indexOf('declin')>-1?'rose':'green')}"></span><div><div class="t">Engagement trend</div><div class="s">${esc(h.trend||'steady')}</div></div><div class="rt"><div class="v">${h.engage}</div><div class="c">engage</div></div></div>`+
         `<div class="li"><span class="dot" style="background:${tone('blue')}"></span><div><div class="t">Prescribing strength</div><div class="s">Rx index</div></div><div class="rt"><div class="v">${h.rx}</div><div class="c">rx</div></div></div>`+
         `<div class="li"><span class="dot" style="background:${tone('purple')}"></span><div><div class="t">Scientific influence</div><div class="s">KOL score</div></div><div class="rt"><div class="v">${h.kol}</div><div class="c">kol</div></div></div></div>`,'var(--green)')}</div>`;
    $('#hcp-back').onclick=()=>goTo('universe');
    const ex=wrap.querySelector('[data-hexec]'); if(ex) ex.onclick=()=>pniExecute({title:h.nba.text,confidence:90});
  }

  /* ---- SEARCH DIRECTORY (HCPs · HCOs · Insights) ------------------------------------------------ */
  function closeSearch(){ $('#ai-sugg').classList.remove('open'); $('#ai-search').value=''; }
  function buildSearchResults(q){
    const box=$('#ai-sugg'); q=(q||'').trim().toLowerCase();
    const hcps=((window.C360.hcps)||[]).filter(h=>!q||h.name.toLowerCase().includes(q)||h.spec.toLowerCase().includes(q)||(h.account||'').toLowerCase().includes(q)).sort((a,b)=>a.name.localeCompare(b.name)).slice(0,7);
    const hcos=((window.C360.hcos)||[]).filter(o=>!q||o.name.toLowerCase().includes(q)||o.type.toLowerCase().includes(q)).slice(0,4);
    const secs=[]; A.nav.forEach(g=>g.items.forEach(it=>{ if(!q||it.label.toLowerCase().includes(q)||g.group.toLowerCase().includes(q)) secs.push({id:it.id,label:it.label,group:g.group}); }));
    let html='';
    if(hcps.length) html+='<div class="sg-h">HCPs</div>'+hcps.map(h=>`<div class="sg-r" data-hcp="${esc(h.id)}"><span class="sg-av" style="background:${tone(segTone(h.seg))}">${esc(h.init)}</span><span class="sg-tx"><b>${esc(h.name)}</b><span>${esc(h.spec)} · ${esc(h.account)}</span></span><span class="sg-meta">Eng ${h.engage}</span></div>`).join('');
    if(hcos.length) html+='<div class="sg-h">Accounts (HCO)</div>'+hcos.map(o=>`<div class="sg-r" data-hco="${esc(o.id)}"><span class="sg-ic">${ICON.globe}</span><span class="sg-tx"><b>${esc(o.name)}</b><span>${esc(o.type)} · ${esc(o.access)}</span></span></div>`).join('');
    if(secs.length) html+='<div class="sg-h">Insights</div>'+secs.slice(0,6).map(s=>`<div class="sg-r" data-sec="${esc(s.id)}"><span class="sg-ic">${ICON.bulb}</span><span class="sg-tx"><b>${esc(s.label)}</b><span>${esc(s.group)}</span></span></div>`).join('');
    if(!html) html=`<div class="sg-empty">No matches for “${esc(q)}”.</div>`;
    box.innerHTML=html;
    box.querySelectorAll('[data-hcp]').forEach(r=>r.onclick=()=>{ closeSearch(); openHcp(r.dataset.hcp); });
    box.querySelectorAll('[data-hco]').forEach(r=>r.onclick=()=>{ closeSearch(); goTo('universe'); });
    box.querySelectorAll('[data-sec]').forEach(r=>r.onclick=()=>{ closeSearch(); goTo(r.dataset.sec); });
  }

  /* ---- MSL · KOL publication feed -------------------------------------------------------------- */
  function renderPubFeed(b){
    const items=(b.items||[]).map(p=>`<div class="pub"><span class="pub-j ${p.tone||'purple'}">${esc(p.journal||'Journal')}</span>
      <div class="pub-x"><div class="pub-t">${esc(p.title)}</div><div class="pub-s">${esc(p.kol)} · ${esc(p.time||'')}</div></div>
      <div class="pub-a"><span class="pub-btn">Add note</span><span class="pub-btn">Send congrats</span><span class="pub-btn primary">Order reprint</span></div></div>`).join('');
    return cardShell(b,`<div class="pub-list">${items}</div>`,'var(--purple)');
  }
  /* ---- MSL · KOL spotlight (ranked influence) -------------------------------------------------- */
  function renderSpotlight(b){
    const items=(b.items||[]).map((s,i)=>`<div class="spot"><span class="spot-r">${i+1}</span><span class="spot-av" style="background:${tone(s.tone||'purple')}">${esc(s.init)}</span>
      <div class="spot-x"><div class="spot-n">${esc(s.name)}</div><div class="spot-s">${esc(s.sub||'')}</div></div>
      <span class="spot-sc">${esc(String(s.score))}</span></div>`).join('');
    return cardShell(b,`<div class="spot-list">${items}</div>`,'var(--blue)');
  }
  /* ---- KAM · account health heat-map ----------------------------------------------------------- */
  function renderHeatmap(b){
    const items=(b.items||[]).map(a=>`<div class="hm ${a.tone||'green'}"><div class="hm-top"><div class="hm-n">${esc(a.name)}</div><span class="hm-h">${esc(a.hcps||'')}</span></div>
      <div class="hm-m">${esc(a.tier||'')} · access <b>${esc(String(a.access))}</b></div>
      <div class="hm-status">${esc(a.status||'')}</div></div>`).join('');
    return cardShell(b,`<div class="hm-grid">${items}</div>`,'var(--green)');
  }
  /* ---- Marketing · campaign performance -------------------------------------------------------- */
  function renderCampaigns(b){
    const rows=(b.items||[]).map(c=>`<div class="camp"><div class="camp-id"><div class="camp-n">${esc(c.name)}</div><span class="chipx ${c.status==='Active'?'g':'a'}">${esc(c.status||'')}</span></div>
      <div class="camp-m">reach <b>${esc(c.reach||'')}</b></div>
      <div class="camp-bars">${scoreBar('Open',c.open,'green')}${scoreBar('CTR',c.ctr,'blue')}</div>
      <div class="camp-roi ${(''+c.roi).indexOf('-')>-1?'down':'up'}">${esc(c.roi||'')}</div></div>`).join('');
    return cardShell(b,`<div class="camp-head"><span>Campaign</span><span>Reach</span><span>Engagement</span><span>ROI</span></div><div class="camp-list">${rows}</div>`,'var(--blue)');
  }
  /* ---- Commercial Leader · regional health ----------------------------------------------------- */
  function renderRegions(b){
    const rows=(b.items||[]).map(r=>`<div class="reg"><div class="reg-id"><div class="reg-n">${esc(r.region)}</div><div class="reg-l">Lead: ${esc(r.lead||'')} · ${esc(r.value||'')}</div></div>
      <div class="reg-bar"><div class="reg-t"><div class="reg-f" style="width:${Math.min(100,r.pct)}%;background:${tone(r.tone)}"></div></div><span class="reg-p" style="color:${tone(r.tone)}">${r.pct}% of plan</span></div></div>`).join('');
    return cardShell(b,`<div class="reg-list">${rows}</div>`,'var(--green)');
  }

  /* ---- CYCLE PROGRESS — goal progress with a previous / current / future cycle selector --------- */
  function barRows(items){
    return (items||[]).map(i=>{const pct=Math.max(2,Math.round((i.value/(i.max||100))*100));
      return `<div class="bar"><div class="top"><span>${esc(i.label)}</span><span class="vv">${esc(i.vv!=null?i.vv:i.value)}</span></div>
        <div class="track"><div class="fill" style="width:${pct}%;background:${tone(i.tone)}"></div></div></div>`;}).join('');
  }
  function renderCycleProgress(b){
    const cycles=b.cycles||[]; let cur=cycles.findIndex(c=>c.current); if(cur<0) cur=0;
    const opts=cycles.map((c,i)=>`<option value="${i}"${i===cur?' selected':''} data-tag="${esc(c.tag||'')}" data-tone="${esc(c.tone||'')}">${esc(c.label)}</option>`).join('');
    const tagEl=cycles[cur]?`<span class="cyc-tag ${esc(cycles[cur].tone||'')}">${esc(cycles[cur].tag||'')}</span>`:'';
    const head=`<div class="cyc-bar"><span class="cyc-l">Cycle</span><span class="cyc-selwrap"><select class="cyc-sel">${opts}</select></span>${tagEl}</div>`;
    const panels=cycles.map((c,i)=>`<div class="cyc-panel${i===cur?' on':''}" data-cyc="${i}">${c.note?`<div class="cyc-note">${esc(c.note)}</div>`:''}<div class="bars">${barRows(c.items)}</div></div>`).join('');
    return cardShell(b,head+panels,'var(--blue)');
  }

  /* ---- DATA SOURCES — the catalogue lives in app.config (navigator.dataSources); SETUP is in the
     Guide. Connection state is saved to the workspace and conceptually feeds Nexi's signals. --------- */
  function srcCatalog(){ return (A.navigator && A.navigator.dataSources) || []; }
  function srcConnected(items){
    const saved=STORE.get('sources',null), map={};
    (items||srcCatalog()).forEach(s=>{ map[s.id] = (saved && (s.id in saved)) ? !!saved[s.id] : !!s.connected; });
    return map;
  }
  function sourcesInner(items){
    const conn=srcConnected(items), nOn=Object.values(conn).filter(Boolean).length;
    const cards=items.map(s=>{
      const on=conn[s.id], catCls=s.cat==='Public'?'pub':(s.cat==='External'?'ext':'int');
      return `<div class="src ${on?'on':''}">
        <div class="src-top"><span class="src-cat ${catCls}">${esc(s.cat)}</span><span class="src-kind">${esc(s.kind||'')}</span>
          <span class="src-sw${on?' on':''}${s.locked?' lock':''}" data-src="${esc(s.id)}"${s.locked?' title="Internal system of record — always on"':''}></span></div>
        <div class="src-n">${esc(s.name)}</div><div class="src-d">${esc(s.desc||'')}</div>
        <div class="src-m"><span class="src-sig">${ICON.spark} ${esc(s.signals||'')}</span><span class="src-cad">${esc(s.cadence||'')}</span></div>
        <div class="src-status">${on?'<span class="dotg"></span> Connected · syncing':'<span class="doto"></span> Not connected'}</div></div>`;
    }).join('');
    return `<div class="src-sum"><b>${nOn}</b> of <b>${items.length}</b> sources connected · feeding Nexi’s signals</div><div class="src-grid">${cards}</div>`;
  }
  function renderSources(b){ return cardShell(b, sourcesInner(b.items||srcCatalog()), 'var(--green)'); }

  /* ---- CUSTOMER KNOWLEDGE — the user's own insights, at customer level (managed in the Command
     Center, persisted to the workspace). This is the human-in-the-loop that sharpens Nexi over time. */
  const KNOW_SEED=[
    {customer:'Dr. Marcus Reyes', tag:'Preference',   text:'Prefers data-led conversations; switches off with scripted detailing.'},
    {customer:'Dr. Rosa Méndez',  tag:'Preference',   text:'Trusts peer-reviewed reprints far more than rep summaries.'},
  ];
  function knowledgeRows(){ const s=STORE.get('knowledge',null); return s==null?KNOW_SEED.slice():s; }
  function renderKnowledge(b){
    const rows=knowledgeRows();
    const custs=['(General / all customers)'].concat(((window.C360.hcps)||[]).map(h=>h.name)).concat(['Segment A','Segment B','Segment C']);
    const tags=['Preference','Constraint','Relationship','Opportunity','Risk'];
    const opt=(a)=>a.map(o=>`<option>${esc(o)}</option>`).join('');
    const ncust=new Set(rows.map(r=>r.customer)).size;
    const summary=`<div class="kw-sum"><div class="kw-stat"><b>${rows.length}</b><span>insights</span></div><div class="kw-stat"><b>${ncust}</b><span>customers</span></div>
        <div class="kw-note">${ICON.spark} Your knowledge personalises Nexi’s recommendations — and is how it learns to avoid the wrong call.</div></div>`;
    const form=`<div class="mw-form"><select class="mw-sel" id="kw-cust">${opt(custs)}</select><select class="mw-sel" id="kw-tag">${opt(tags)}</select>
        <input class="mw-in" id="kw-text" placeholder="What do you know about this customer that the data can’t see?" />
        <button class="btn btn-ai" id="kw-add" type="button">${ICON.spark} Add</button></div>`;
    const list=rows.length
      ? `<div class="kw-list">${rows.map((r,i)=>`<div class="kw-card"><div class="kw-ch"><span class="kw-cust">${esc(r.customer)}</span><span class="chipx p">${esc(r.tag)}</span><button class="mw-x" data-kw-del="${i}" title="Remove">×</button></div><div class="kw-cb">${esc(r.text)}</div></div>`).join('')}</div>`
      : `<div class="mw-empty">No customer knowledge yet — add what you know above.</div>`;
    return cardShell(b,summary+form+list,'var(--teal)');
  }

  /* ---- DECISION FLOW — the day-in-the-life: signal → insight → (avoid vs do) → outcome → loop ----- */
  function renderDecisionFlow(b){
    const sg=b.signal||{}, ins=b.insight||{}, av=b.avoid||{}, rec=b.recommend||{}, out=b.outcome||{}, fb=b.feedback||{};
    // Lead with the GOOD path (signal → insight → recommendation → outcome → feedback) — that's the
    // everyday story. The rare "tempting but wrong" move is a small collapsed footnote shown only when
    // the persona's decision actually defines an `avoid`. Arrows are drawn only between present parts.
    const parts=[];
    if(sg.text) parts.push(`<div class="df-step signal"><div class="df-h"><span class="df-i">${ICON.eye}</span>Signal sensed${sg.time?`<span class="df-time">${esc(sg.time)}</span>`:''}</div>
        <div class="df-b">${sg.kind?`<span class="sig-k">${esc(sg.kind)}</span> `:''}${esc(sg.text)}</div></div>`);
    if(ins.text) parts.push(`<div class="df-step insight"><div class="df-h"><span class="df-i">${ICON.bulb}</span>Insight</div>
        <div class="df-b">${esc(ins.text)}</div>${ins.yours?`<div class="df-know">${ICON.database}<span><b>Your knowledge:</b> ${esc(ins.yours)}</span></div>`:''}</div>`);
    // the GOOD recommendation is the hero — full width, prominent
    if(rec.action) parts.push(`<div class="df-rec"><div class="df-tag good">✓ Nexi recommends${rec.confidence?` · ${esc(String(rec.confidence))}%`:''}</div><div class="df-act">${esc(rec.action)}</div>${rec.why?`<div class="df-why">${esc(rec.why)}</div>`:''}</div>`);
    if(out.text) parts.push(`<div class="df-step outcome"><div class="df-h"><span class="df-i">${ICON.check}</span>Outcome</div><div class="df-b">${esc(out.text)}</div></div>`);
    let inner=`<div class="df">${parts.join('<div class="df-arrow">↓</div>')}`;
    // the rare "tempting but wrong" move Nexi avoided — crisp line + its reasoning, only when present
    if(av.action) inner+=`<div class="df-ruled"><div class="df-ruled-h"><b>✗ Ruled out</b> ${esc(av.action)}</div>${av.why?`<div class="df-ruled-w">${esc(av.why)}</div>`:''}</div>`;
    if(fb.text) inner+=`<div class="df-loop"><span class="df-i">${ICON.flow}</span><div><b>Feedback loop</b> — ${esc(fb.text)}</div></div>`;
    inner+=`</div>`;
    // today's decision is the lead one — summarise the rest of the prioritised actions and send the user
    // to Next Best Actions to act on them all.
    const nbaSc=A.resolve(S.persona,'nba'), actBlk=nbaSc&&(nbaSc.blocks||[]).find(x=>x.type==='actions'), acts=(actBlk&&actBlk.items)||[];
    if(acts.length){
      const L={high:'Priority',med:'Recommended',low:'Optional'};
      inner+=`<div class="df-more"><div class="df-more-h">${ICON.spark} More of today’s best actions</div>`+
        acts.slice(0,3).map(a=>`<div class="df-more-i"><span class="df-more-p pri-${a.priority}">${L[a.priority]||'Action'}</span><span class="df-more-t">${esc(a.title)}</span><span class="df-more-c">${esc(String(a.confidence))}%</span></div>`).join('')+
        `<button class="df-cta" data-go="nba">${ICON.spark} See all ${acts.length} PrecisionNeXT Best Actions ↗</button></div>`;
    }
    return cardShell(b,inner,'var(--purple)');
  }

  /* ---- MY WORKSPACE DATA — user-managed attributes + insights (persisted to the workspace) ------ */
  function myAttrs(b){ const s=STORE.get('attrs',null); return s==null?(b&&b.seed?b.seed.slice():[]):s; }
  function myInsights(b){ const s=STORE.get('insights',null); return s==null?(b&&b.seed?b.seed.slice():[]):s; }
  function renderAttrBuilder(b){
    const rows=myAttrs(b), applies=b.applies||['All customers'], types=b.types||['Text','Number','Tag'];
    const opt=(arr)=>arr.map(o=>`<option>${esc(o)}</option>`).join('');
    const form=`<div class="mw-form">
        <input class="mw-in" id="attr-name" placeholder="Attribute name (e.g. Preferred meeting time)" />
        <select class="mw-sel" id="attr-type">${opt(types)}</select>
        <select class="mw-sel" id="attr-applies">${opt(applies)}</select>
        <input class="mw-in" id="attr-value" placeholder="Value" />
        <button class="btn btn-ai" id="attr-add" type="button">${ICON.spark} Add</button></div>`;
    const table = rows.length
      ? `<table class="tbl mw-tbl"><thead><tr><th>Attribute</th><th>Type</th><th>Applies to</th><th>Value</th><th></th></tr></thead><tbody>${
          rows.map((r,i)=>`<tr><td><span class="nm">${esc(r.name)}</span></td><td><span class="chipx b">${esc(r.type)}</span></td><td>${esc(r.applies)}</td><td>${esc(r.value)}</td><td><button class="mw-x" data-attr-del="${i}" title="Remove">×</button></td></tr>`).join('')
        }</tbody></table>`
      : `<div class="mw-empty">No custom attributes yet — add one above.</div>`;
    return cardShell(b,form+table,'var(--green)');
  }
  function renderMyInsights(b){
    const rows=myInsights(b), applies=b.applies||['General'];
    const opt=(arr)=>arr.map(o=>`<option>${esc(o)}</option>`).join('');
    const form=`<div class="mw-form col">
        <select class="mw-sel" id="ins-applies">${opt(applies)}</select>
        <textarea class="mw-ta" id="ins-text" placeholder="Add an insight about this customer…"></textarea>
        <button class="btn btn-ai" id="ins-add" type="button">${ICON.spark} Add insight</button></div>`;
    const list = rows.length
      ? `<div class="mw-ins">${rows.map((r,i)=>`<div class="mw-card"><div class="mw-ch"><span class="chipx p">${esc(r.applies)}</span><button class="mw-x" data-ins-del="${i}" title="Remove">×</button></div><div class="mw-cb">${esc(r.text)}</div></div>`).join('')}</div>`
      : `<div class="mw-empty">No insights yet — add your first above.</div>`;
    return cardShell(b,form+list,'var(--blue)');
  }

  /* ---- TERRITORY INSIGHT — computed, rep-realistic insight cards (a rep owns a few territories, so
     lead with what to do, not a big national map) ------------------------------------------------- */
  function renderTerritoryInsight(b){
    const hcps=(window.C360.hcps)||[];
    const high=hcps.filter(h=>h.prio==='high').length;
    const cooling=hcps.filter(h=>/declin/i.test(h.trend||'')||(h.engage||0)<55);
    const rising=hcps.filter(h=>/rising|up/i.test(h.trend||'')).length;
    const avg=hcps.length?Math.round(hcps.reduce((a,h)=>a+(h.engage||0),0)/hcps.length):0;
    const cards=[
      {ic:'target',tone:'rose',v:high,k:'Priority HCPs to see',d:'High-priority customers in your patch this cycle.',go:'nba'},
      {ic:'signal',tone:'amber',v:cooling.length,k:'Cooling — recover',d:cooling.slice(0,3).map(h=>h.name.replace('Dr. ','')).join(', ')||'none',go:'universe'},
      {ic:'route',tone:'green',v:rising,k:'Momentum — protect',d:'Rising-engagement HCPs to keep warm.',go:'journey'},
      {ic:'map',tone:'blue',v:avg,k:'Avg engagement',d:'Across your covered accounts.',go:'universe'},
    ].map(c=>`<button class="ti-card" data-go="${c.go}"><div class="ti-ic" style="background:${tone(c.tone)}">${ICON[c.ic]}</div>
        <div class="ti-v">${c.v}</div><div class="ti-k">${esc(c.k)}</div><div class="ti-d">${esc(c.d)}</div><span class="ti-go">Open ↗</span></button>`).join('');
    return cardShell(b,`<div class="ti-lead">Your territory at a glance — act on these before you plan the route.</div><div class="ti-grid">${cards}</div>`,'var(--green)');
  }

  /* ---- CONTENT PERFORMANCE — top / least performing + what needs follow-up ----------------------- */
  function renderContentPerf(b){
    const sc=A.resolve(S.persona,'content'), listBlk=sc&&(sc.blocks||[]).find(x=>x.type==='list'), items=((listBlk&&listBlk.items)||[]);
    const scored=items.map(i=>({...i,score:parseInt(i.value,10)||0})).sort((a,b)=>b.score-a.score);
    const top=scored.slice(0,3), low=scored.filter(x=>x.score<60).slice(-2);
    const hcps=(window.C360.hcps)||[];
    const follow=hcps.filter(h=>/declin/i.test(h.trend||'')||(h.engage||0)<58).slice(0,4)
      .map(h=>({name:h.name, asset:(top[0]&&top[0].title)||'a top asset', why:/declin/i.test(h.trend||'')?'cooling — re-engage':'low engagement'}));
    const bar=(s)=>`<div class="cp-track"><div class="cp-fill" style="width:${Math.max(4,s)}%;background:${s>=75?'var(--green)':s>=50?'var(--blue)':'var(--amber)'}"></div></div>`;
    const topHtml=top.map((i,n)=>`<div class="cp-row"><span class="cp-rank">${n+1}</span><div class="cp-x"><div class="cp-t">${esc(i.title)}</div><div class="cp-s">${esc(i.sub||'')}</div>${bar(i.score)}</div><span class="cp-sc good">${i.score}</span></div>`).join('');
    const lowHtml=low.length?low.map(i=>`<div class="cp-row"><span class="cp-rank low">↓</span><div class="cp-x"><div class="cp-t">${esc(i.title)}</div><div class="cp-s">Underperforming — refresh or retire</div>${bar(i.score)}</div><span class="cp-sc bad">${i.score}</span></div>`).join(''):'<div class="cp-empty">No underperformers — library is healthy.</div>';
    const folHtml=follow.length?follow.map(f=>`<div class="cp-fol"><span class="cp-fol-d"></span><div><b>${esc(f.name)}</b> — ${esc(f.why)}<div class="cp-fol-a">${ICON.spark} Send “${esc(f.asset)}”</div></div></div>`).join(''):'<div class="cp-empty">No follow-ups due.</div>';
    const inner=`<div class="cp-cols">
        <div class="cp-col"><div class="cp-h good">▲ Top-performing</div>${topHtml||'<div class="cp-empty">No assets configured.</div>'}</div>
        <div class="cp-col"><div class="cp-h bad">▼ Needs attention</div>${lowHtml}</div>
        <div class="cp-col"><div class="cp-h">${ICON.spark} Follow-ups by last engagement</div>${folHtml}</div>
      </div>`;
    return cardShell(b,inner,'var(--blue)');
  }

  /* ---- OMNICHANNEL ORCHESTRATION — the core C360 loop: sense → decide channel → act (digital↔F2F) -- */
  const OMNI_MIX={
    rep:[['Field visits',38,'green'],['Email',22,'blue'],['Portal / web',14,'teal'],['Virtual',10,'purple'],['Events',9,'amber'],['Social',7,'rose']],
    mkt:[['Email journeys',30,'blue'],['Programmatic / web',22,'teal'],['Social',16,'rose'],['Webinars',14,'purple'],['Field handoff',10,'green'],['Events',8,'amber']],
    msl:[['In-person exchange',34,'green'],['Congress',20,'purple'],['Email (MI)',16,'blue'],['Virtual',14,'teal'],['Publications',10,'amber'],['Advisory',6,'rose']],
    kam:[['Executive meetings',34,'green'],['QBR / on-site',22,'purple'],['Email',16,'blue'],['Virtual',12,'teal'],['Evidence share',10,'amber'],['Events',6,'rose']],
    lead:[['Field (team)',30,'green'],['Digital programs',24,'blue'],['Exec engagements',16,'purple'],['Events',12,'amber'],['Virtual',10,'teal'],['Social',8,'rose']],
  };
  function renderOmnichannel(b){
    const mix=OMNI_MIX[S.persona]||OMNI_MIX.rep;
    const bars=mix.map(m=>`<div class="oc-row"><span class="oc-l">${esc(m[0])}</span><div class="oc-track"><div class="oc-fill" style="width:${m[1]}%;background:${tone(m[2])}"></div></div><span class="oc-v">${m[1]}%</span></div>`).join('');
    const steps=[
      {ic:'eye',k:'Sense',t:'Every signal, field + digital',d:'Opens, clicks, rep calls, congress activity, consent and content fit — unified per customer, in real time.'},
      {ic:'spark',k:'Decide channel',t:'Nexi picks the next best channel & content',d:'Scores channel affinity, recency and best-contact window — and whether the moment is better served face-to-face or digitally.'},
      {ic:'flow',k:'Act — connected',t:'Field and digital reinforce each other',d:'Trigger the F2F where it moves the needle; sequence email, web and social around it so no touch is wasted.'},
    ].map((s,i)=>`<div class="oc-step"><div class="oc-step-h"><span class="oc-ic">${ICON[s.ic]}</span><span class="oc-k">${esc(s.k)}</span></div><div class="oc-t">${esc(s.t)}</div><div class="oc-d">${esc(s.d)}</div></div>${i<2?'<div class="oc-arrow">→</div>':''}`).join('');
    const lead = S.persona==='mkt' ? 'Plan the non-personal journey, then hand warm HCPs to the field with full context — every digital touch sets up the next F2F.' :
                 S.persona==='rep' ? 'Plan your face-to-face around the digital signals — and let email and portal carry the in-between, so each visit lands warmer.' :
                 S.persona==='msl' ? 'Sequence scientific exchange across congress, virtual and in-person — compliant, and timed to the evidence moment.' :
                 'Connect every channel to the objective — the right play, on the right channel, at the right cadence, per customer.';
    const inner=`<div class="oc-lead">${ICON.spark} ${esc(lead)}</div>
      <div class="oc-flow">${steps}</div>
      <div class="oc-trigger">${ICON.signal} <b>Digital → F2F trigger:</b> when a customer’s digital intent spikes, Nexi promotes them into your field plan with the reason and the asset ready — and fills the gaps between visits with the best digital touch.</div>
      <div class="oc-mixh">Your channel mix this cycle</div><div class="oc-mix">${bars}</div>`;
    return cardShell(b,inner,'var(--purple)');
  }

  /* sub-section heading — separates the two merged areas inside a combined panel */
  function renderSubhead(b){
    return `<div class="subhead reveal"><span class="subhead-i">${ICON[b.icon]||ICON.layers}</span><div><h3>${esc(b.label)}</h3>${b.sub?`<p>${esc(b.sub)}</p>`:''}</div></div>`;
  }

  const BLOCK_RENDERERS={header:renderHeader,kpis:renderKpis,objectives:renderObjectives,insights:renderInsights,hcpcards:renderHcpCards,hcpgroups:renderHcpGroups,
    territoryinsight:renderTerritoryInsight,contentperf:renderContentPerf,omnichannel:renderOmnichannel,subhead:renderSubhead,
    pubfeed:renderPubFeed,spotlight:renderSpotlight,heatmap:renderHeatmap,campaigns:renderCampaigns,regions:renderRegions,
    actions:renderActions,list:renderList,bars:renderBars,steps:renderSteps,table:renderTable,network:renderNetwork,
    tilemap:renderTilemap,graph:renderGraph,signals:renderSignals,fivectabs:renderFivecTabs,filterbar:renderFilterBar,
    cycleProgress:renderCycleProgress,sources:renderSources,decisionflow:renderDecisionFlow,knowledge:renderKnowledge,
    attrbuilder:renderAttrBuilder,myinsights:renderMyInsights,
    weekplan:renderWeekPlan,journeyprofile:renderJourneyProfile,featureGrid:renderFeatureGrid,valueProps:renderValueProps,note:renderNote};

  /* ================================================================================================
     OBJECTIVES STATE (Cockpit personalisation)
     ============================================================================================== */
  function cockpitObjItems(persona){
    const sec=(A.personas[persona]&&A.personas[persona].sections&&A.personas[persona].sections.cockpit)||A.shared.sections.cockpit;
    if(!sec) return [];
    const blk=(sec.blocks||[]).find(x=>x.type==='objectives');
    return blk?blk.items:[];
  }
  function objSet(persona){
    if(!S.objectives[persona]){
      const set=new Set();
      cockpitObjItems(persona).forEach(o=>{ if(o.default) set.add(o.id); });
      S.objectives[persona]=set;
    }
    return S.objectives[persona];
  }
  function toggleObjective(id){
    const set=objSet(S.persona);
    set.has(id)?set.delete(id):set.add(id);
    // update just the toggled card (no full re-render)
    const card=$(`.obj[data-obj="${id}"]`);
    if(card){ const on=set.has(id); card.classList.toggle('on',on); card.querySelector('.chk').innerHTML=on?CHK:''; }
    updateObjSummary();
  }
  function updateObjSummary(){
    const items=cockpitObjItems(S.persona), set=objSet(S.persona), active=items.filter(o=>set.has(o.id));
    const chipsEl=$('#content .obj-chips'); if(chipsEl) chipsEl.innerHTML=objSummaryChips(items,set);
    const cfg=$('#content .obj-config'); if(cfg) cfg.innerHTML=`${ICON.target} Configure · ${active.length} active`;
  }

  /* ================================================================================================
     APP CHROME — sidebar, topbar, summary, section
     ============================================================================================== */
  function renderSidebar(){
    $('#brand-name').innerHTML=`${esc(A.app.brand)}<small>${esc(A.app.tagline)}</small>`;
    $('#foot').innerHTML=`<span class="demo">DEMO</span><br><b>${esc(A.app.footer)}</b><br>${esc(A.app.footerNote)}`;
    const nav=$('#nav'); nav.innerHTML='';
    const alertCount=(A.personas[S.persona].pni.alerts||[]).length;
    A.nav.forEach(g=>{
      const grp=el('div','nav-group');
      grp.appendChild(el('div','gl',`<span class="gi">${ICON[g.gicon]||''}</span>${esc(g.group)}`));   // muted, non-clickable label
      g.items.forEach(it=>{
        const b=el('button','nav-item'+(it.id===S.section?' active':''));
        const badge=(it.id==='nba'&&alertCount)?`<span class="badge">${alertCount}</span>`:'';
        b.innerHTML=`<span class="ni">${ICON[it.icon]||''}</span>${esc(it.label)}${badge}`;
        b.onclick=()=>{ S.section=it.id; renderSidebar(); renderTopbar(); renderSummary(); renderSection(); };
        grp.appendChild(b);
      });
      nav.appendChild(grp);
    });
  }

  function metaOf(id){ for(const g of A.nav){const it=g.items.find(x=>x.id===id);if(it)return{group:g.group,label:it.label};} return{group:'',label:id}; }

  function renderTopbar(){
    // profile is an icon; tint it with the active persona's accent so the role still reads at a glance
    $('#psw-btn').style.background=A.personas[S.persona].profile.accent;
  }

  function renderPersonaMenu(){
    const m=$('#psw-menu'), cur=A.personas[S.persona].profile;
    m.innerHTML=`<div class="psw-cur"><span class="av" style="background:${cur.accent}">${esc(cur.av)}</span>
        <div><div class="n">${esc(cur.name)}</div><div class="r">${esc(cur.title)} · ${esc(cur.team)}</div></div></div>
      <div class="psw-h">Switch profile</div>`;
    A.personaOrder.forEach(k=>{
      const pr=A.personas[k].profile, active=k===S.persona;
      const o=el('button','psw-opt'+(active?' active':''));
      o.innerHTML=`<span class="av" style="background:${pr.accent}">${esc(pr.av)}</span>
        <div><div class="n">${esc(pr.name)}</div><div class="r">${esc(pr.title)}</div></div>
        ${active?`<span class="ck">${ICON.check}</span>`:''}`;
      o.onclick=()=>{ switchPersona(k); m.classList.remove('open'); };
      m.appendChild(o);
    });
  }

  function renderSummary(){
    if(S.section==='__guide__'){ $('#crumb').innerHTML='<span class="cg">Navigator</span><span class="cs">Product Guide</span>'; $('#sum-desc').textContent=A.navigator.tagline; $('#sum-chips').innerHTML=''; return; }
    if(S.section==='__hcp__'){ const h=((window.C360.hcps)||[]).find(x=>x.id===S.hcp)||{}; $('#crumb').innerHTML='<span class="cg">Customer</span><span class="cs">HCP 360 Profile</span>'; $('#sum-desc').textContent=h.name?`${esc(h.name)} · ${esc(h.spec)}`:''; $('#sum-chips').innerHTML=''; return; }
    const meta=metaOf(S.section), sc=A.resolve(S.persona,S.section);
    const title=(sc&&sc.title)||(A.titles&&A.titles[S.section])||meta.label;
    // top-corner breadcrumb carries the section name (so content never repeats it)
    $('#crumb').innerHTML=`<span class="cg">${esc(meta.group)}</span><span class="cs">${esc(title)}</span>`;
    $('#sum-desc').textContent=sc?sc.summary:'';
    const chips=$('#sum-chips'); chips.innerHTML='';
    if(sc&&sc.chips){ sc.chips.forEach(c=>chips.appendChild(el('span','chip',esc(c)))); }
  }

  /* jump to a section (used by the Navigator shortcuts) */
  function goTo(id){ if(!id) return; S.section=id; renderSidebar(); renderSummary(); renderSection(); }

  /* The product guide opens full-canvas — see openGuide() / renderGuideView(). */

  /* AI Search — quick filter across the current view (tables, lists, cards) */
  function applySearch(q){
    q=(q||'').trim().toLowerCase();
    $$('#content .tbl tbody tr').forEach(tr=>{ tr.style.display=(!q||tr.textContent.toLowerCase().includes(q))?'':'none'; });
    $$('#content .lst .li, #content .act, #content .feat, #content .obj').forEach(n=>{ n.style.display=(!q||n.textContent.toLowerCase().includes(q))?'':'none'; });
  }

  /* ---- GUIDED FLOW stepper — the day-in-the-life path across the WIN loop -------------------------
     Command Center → Customer Insight → Next Best Actions → Execute. Shown atop every working
     section; the active step is highlighted; each step jumps to its section. */
  const FLOW_STEPS=[
    {id:'cockpit',   n:'1', t:'Command Center',    s:'Today’s signals',   match:['cockpit']},
    {id:'universe',  n:'2', t:'Customer Insight',   s:'Know the customer', match:['universe','journey','segments','influence','affinity','content']},
    {id:'nba',       n:'3', t:'Next Best Actions',  s:'Decide & act',      match:['nba']},
    {id:'territory', n:'4', t:'Execute',            s:'Close the loop',    match:['territory','execplan','orchestration']},
  ];
  function guidedFlowHtml(){
    const steps=FLOW_STEPS.map((st,i)=>{
      const on=st.match.includes(S.section);
      return `<button class="gfx-step${on?' on':''}" data-go="${st.id}">
          <span class="gfx-n">${st.n}</span><span class="gfx-x"><span class="gfx-t">${esc(st.t)}</span><span class="gfx-s">${esc(st.s)}</span></span>
        </button>${i<FLOW_STEPS.length-1?'<span class="gfx-arrow">→</span>':''}`;
    }).join('');
    return `<div class="gfx reveal"><span class="gfx-lbl">${ICON.route} Your guided flow</span><div class="gfx-track">${steps}</div></div>`;
  }
  function mountGuidedFlow(wrap){
    const w=el('div','col-12'); w.innerHTML=guidedFlowHtml(); wrap.appendChild(w);
    w.querySelectorAll('.gfx-step[data-go]').forEach(s=>s.onclick=()=>goTo(s.dataset.go));
  }

  /* ---- COMBINED PANELS — one nav item renders two related sections (fewer left-nav items, richer pages) */
  const COMBINE={
    journey:   ['journey','segments'],     // Journey & Segments
    affinity:  ['affinity','content'],     // Affinity & Content
    territory: ['territory','execplan'],   // Territory & Execution Plan
  };
  const SUB_LABELS={journey:'Journey Analytics',segments:'Segment Insights',affinity:'Digital Affinity',content:'Content Performance',territory:'Territory & Route Plan',execplan:'Execution Plan'};
  const SUB_ICONS ={journey:'route',segments:'layers',affinity:'signal',content:'doc',territory:'map',execplan:'check'};
  /* assemble one sub-section's blocks (with its computed injection) under a sub-heading */
  function subSectionBlocks(secId){
    const sc=A.resolve(S.persona,secId); if(!sc) return [];
    let blks=(sc.blocks||[]).slice();
    if(secId==='segments' && !blks.some(b=>b.type==='hcpgroups')) blks=[{type:'hcpgroups',col:12,title:'Segment mix — your book by segment & priority',icon:'layers'}].concat(blks);
    if(secId==='content'  && !blks.some(b=>b.type==='contentperf')) blks=[{type:'contentperf',col:12,title:'Content performance — top, weak & follow-ups',icon:'doc'}].concat(blks);
    if(secId==='territory'&& !blks.some(b=>b.type==='territoryinsight')) blks=[{type:'territoryinsight',col:12,title:'Territory insights — what to act on',icon:'map'}].concat(blks);
    return [{type:'subhead',col:12,label:SUB_LABELS[secId]||secId,icon:SUB_ICONS[secId],sub:sc.summary}].concat(blks);
  }

  function renderSection(){
    if(S.section==='__guide__'){ renderGuideView(); return; }
    if(S.section==='__hcp__'){ renderHcpProfile(); return; }
    const wrap=$('#content'); wrap.innerHTML='';
    const sc=A.resolve(S.persona,S.section);
    if(!sc){ wrap.innerHTML=`<div class="ph reveal"><div style="font-size:15px;font-weight:700;color:var(--ink-soft)">This screen isn’t configured yet</div>
      <div style="margin-top:6px">Add a <code>${esc(S.section)}</code> section to <code>content.${esc(S.persona)}.js</code> (or to shared) to fill it in.</div></div>`; return; }
    // Guided-flow stepper across the top of every working section (Command Center → Customer Insight → NBA → Execute)
    mountGuidedFlow(wrap);
    let blocks=sc.blocks||[];
    // Combined panel — render both merged sections' blocks, each under its own sub-heading.
    if(COMBINE[S.section]){
      blocks=[]; COMBINE[S.section].forEach(sid=>{ blocks=blocks.concat(subSectionBlocks(sid)); });
    }
    // Command Center: configure objectives first, then track them — reorder + drop the redundant list
    else if(S.section==='cockpit'){
      // Day-in-the-life flow: TODAY'S DECISION → SUMMARY NUMBERS (each explains how it's derived and
      // drills to detail) → all SIGNALS → role snapshot → PROGRESS vs goals → your GOALS → your
      // CUSTOMER KNOWLEDGE → what's next. (The redundant "what you're tracking" list is dropped.)
      const order={kpis:0,decisionflow:0.5,signals:1,spotlight:2,heatmap:2,campaigns:2,regions:2,pubfeed:2,bars:3,cycleProgress:3,objectives:4,knowledge:5,note:6};
      blocks=blocks.filter(b=>b.type!=='list').map(b=> b.type==='note'?{...b,col:12}:b)
        .slice().sort((a,b)=>((order[a.type]??9)-(order[b.type]??9)));
      // surface the user's own customer knowledge (manage at customer level, summary shown) for every persona
      if(!blocks.some(b=>b.type==='knowledge')){
        const kb={type:'knowledge',col:12,title:'Your customer knowledge — what you know, feeding Nexi'};
        const ni=blocks.findIndex(b=>b.type==='note'); ni>-1?blocks.splice(ni,0,kb):blocks.push(kb);
      }
    }
    else if(S.section==='nba'){
      // Lead with the ranked Precision NeXT Best Actions, contextual blocks in the middle, and the
      // prioritised-HCP list at the BOTTOM. The list itself leads with the Priority (H/M/L) boxes; the
      // 5C lens rides along as a secondary filter on the same bar (no separate 5C tab bar grouping).
      const rank={note:0,kpis:1,actions:2};
      const hcp=blocks.filter(b=>b.type==='hcpcards');
      const rest=blocks.filter(b=>b.type!=='hcpcards').slice().sort((a,b)=>((rank[a.type]??5)-(rank[b.type]??5)));
      blocks=rest.concat(hcp);
    }
    else if(S.section==='universe'){
      // Customer Insight: the grouping summary is folded INTO the unified filter (each segment chip
      // carries its count + avg engagement), so drop the standalone summary block and lead with the
      // single filter, then the customer list — one efficient place to read and slice.
      // filter → priority-led 360 cards → contextual insights → (plain listing tables pushed to the bottom)
      const rankU={filterbar:0,hcpcards:1,insights:2,table:9};
      blocks=blocks.filter(b=>b.type!=='hcpgroups').slice().sort((a,b)=>((rankU[a.type]??5)-(rankU[b.type]??5)));
    }
    else if(S.section==='segments'){
      // Expand in place: lead with a computed segment-mix visual (size + avg engagement per segment,
      // plus the priority split) from the live roster, then the persona's archetypes + plays below.
      if(!blocks.some(b=>b.type==='hcpgroups'))
        blocks=[{type:'hcpgroups',col:12,title:'Segment mix — your book by segment & priority',icon:'layers'}].concat(blocks);
    }
    else if(S.section==='territory'){
      // Rep owns a few territories — lead with computed insight cards (what to act on), map below.
      if(!blocks.some(b=>b.type==='territoryinsight'))
        blocks=[{type:'territoryinsight',col:12,title:'Territory insights — what to act on',icon:'map'}].concat(blocks);
    }
    else if(S.section==='content'){
      // Lead with computed performance: top assets, what's weak, and follow-ups by last engagement.
      if(!blocks.some(b=>b.type==='contentperf'))
        blocks=[{type:'contentperf',col:12,title:'Content performance — top, weak & follow-ups',icon:'doc'}].concat(blocks);
    }
    else if(S.section==='orchestration'){
      // Core C360 loop — omnichannel sense → decide channel → act (digital ↔ F2F) above the cadence.
      if(!blocks.some(b=>b.type==='omnichannel'))
        blocks=[{type:'omnichannel',col:12,title:'Omnichannel orchestration — sense, decide the channel, act',icon:'flow'}].concat(blocks);
    }
    blocks.forEach(b=>{
      const fn=BLOCK_RENDERERS[b.type]; if(!fn) return;
      const full=(b.type==='header'||b.type==='valueProps');
      const w=el('div', full?'col-12':('col-'+(b.col||12)));
      w.innerHTML=fn(b);
      wrap.appendChild(w);
    });
    // wire interactions present in this section
    $$('.obj[data-obj]').forEach(c=>c.onclick=()=>toggleObjective(c.dataset.obj));
    $$('#content .obj-config').forEach(btn=>btn.onclick=()=>{ const objs=btn.closest('.card-b').querySelector('.objs'); if(objs){ objs.classList.toggle('collapsed'); btn.classList.toggle('active'); } });
    // summary stat boxes (CC + other tabs): the derivation ("How …") is shown inline on every box;
    // clicking a box with a drill target jumps to the underlying detail section.
    $$('#content .kpi.go, #content .kcard.go').forEach(c=>c.onclick=()=>{
      if(c.dataset.kscroll){ const t=$('#content '+c.dataset.kscroll); if(t) t.scrollIntoView({behavior:'smooth',block:'center'}); }
      else if(c.dataset.kgo){ goTo(c.dataset.kgo); }
    });
    $$('#content .df-cta[data-go]').forEach(b=>b.onclick=()=>goTo(b.dataset.go));
    $$('#content .sm-card[data-go], #content .ti-card[data-go]').forEach(c=>c.onclick=()=>goTo(c.dataset.go));
    // influence-graph cluster legend — click to focus a cluster (dim the rest)
    $$('#content .gleg[data-cl]').forEach(leg=>leg.onclick=()=>{
      const side=leg.closest('.graph-side'), svg=leg.closest('.graph-wrap').querySelector('.graph-svg'), cl=leg.dataset.cl, was=leg.classList.contains('on');
      side.querySelectorAll('.gleg').forEach(l=>l.classList.remove('on'));
      if(was){ svg.classList.remove('graph-dim'); svg.querySelectorAll('.gn.hot').forEach(n=>n.classList.remove('hot')); }
      else { leg.classList.add('on'); svg.classList.add('graph-dim'); svg.querySelectorAll('.gn').forEach(n=>n.classList.toggle('hot', n.dataset.cl===cl)); }
    });
    const acts=(sc.blocks||[]).find(b=>b.type==='actions');
    $$('[data-exec]').forEach(btn=>btn.onclick=()=>pniExecute(acts.items[+btn.dataset.exec]));
    $$('[data-why]').forEach(btn=>btn.onclick=()=>pniExplain(acts.items[+btn.dataset.why]));
    // influence-graph hover: highlight a node and its connections
    $$('#content .gn').forEach(node=>{
      const adj=(node.dataset.adj||'').split(',').filter(Boolean);
      node.onmouseenter=()=>{ const svg=node.closest('.graph-svg'); svg.classList.add('graph-dim'); node.classList.add('hot');
        adj.forEach(i=>{ const m=svg.querySelector(`.gn[data-i="${i}"]`); if(m) m.classList.add('hot'); }); };
      node.onmouseleave=()=>{ const svg=node.closest('.graph-svg'); svg.classList.remove('graph-dim'); svg.querySelectorAll('.gn.hot').forEach(m=>m.classList.remove('hot')); };
    });
    // sensing-signal cards: click → open the related HCP / section, else brief Nexi
    $$('#content .sig').forEach(c=>c.onclick=()=>{ const h=c.dataset.sigHcp,g=c.dataset.sigGo,q=c.dataset.sigQ;
      if(h) openHcp(h); else if(g) goTo(g); else askPni('Brief me on this signal: '+q); });
    $$('#content .fc-tab').forEach(t=>t.onclick=()=>{ t.closest('.fc-tabs').querySelectorAll('.fc-tab').forEach(x=>x.classList.toggle('on',x===t));
      const key=t.dataset.c5; $$('#content .hcp-grid .hcp-card').forEach(card=>{ card.style.display=(!key||key==='all'||card.dataset.c5===key)?'':'none'; }); });
    // unified Customer-Insight filter: Priority + Segment + Brand chips slice the customer list (OR within a row, AND across rows)
    const fb=$('#content .fb[data-fb]');
    if(fb){
      const sel={prio:new Set(),seg:new Set(),brand:new Set()};
      const apply=()=>{
        const g=$('#content .hcp-grid'); if(!g) return; let shown=0; const cards=g.querySelectorAll('.hcp-card');
        cards.forEach(c=>{
          const okP=!sel.prio.size||sel.prio.has(c.dataset.prio);
          const okS=!sel.seg.size||sel.seg.has(c.dataset.seg);
          const brs=(c.dataset.brand||'').split('|').filter(Boolean);
          const okB=!sel.brand.size||brs.some(x=>sel.brand.has(x));
          const vis=okP&&okS&&okB; c.style.display=vis?'':'none'; if(vis)shown++;
        });
        const cnt=fb.querySelector('.fb-count'); if(cnt) cnt.textContent=`Showing ${shown} of ${cards.length} HCPs`;
      };
      fb.querySelectorAll('.fb-pill').forEach(p=>p.onclick=()=>{
        const dim=p.dataset.dim, val=p.dataset.val, row=p.closest('.fb-row'); if(!dim) return;
        if(val==='__all'){ sel[dim].clear(); row.querySelectorAll('.fb-pill').forEach(x=>x.classList.toggle('on',x===p)); }
        else { p.classList.toggle('on'); p.classList.contains('on')?sel[dim].add(val):sel[dim].delete(val);
          const allp=row.querySelector('.fb-pill[data-val="__all"]'); if(allp) allp.classList.toggle('on',sel[dim].size===0); }
        apply();
      });
      const rst=fb.querySelector('.fb-reset'); if(rst) rst.onclick=()=>{ Object.values(sel).forEach(s=>s.clear());
        fb.querySelectorAll('.fb-row').forEach(r=>r.querySelectorAll('.fb-pill').forEach(x=>x.classList.toggle('on',x.dataset.val==='__all'))); apply(); };
      apply();
    }
    // HCP cockpit cards: priority filter pills + open profile on click
    $$('#content .hcp-card').forEach(c=>c.onclick=()=>openHcp(c.dataset.hcp));
    // NBA prioritised-HCP list — combined Priority + 5C filter (OR within a row, AND across rows)
    const hf=$('#content [data-hcpfilter]');
    if(hf){
      const sel={prio:new Set(),c5:new Set()};
      const applyHf=()=>{ const g=$('#content .hcp-grid'); if(!g) return;
        g.querySelectorAll('.hcp-card').forEach(c=>{ const okP=!sel.prio.size||sel.prio.has(c.dataset.prio); const okC=!sel.c5.size||sel.c5.has(c.dataset.c5);
          c.style.display=(okP&&okC)?'':'none'; }); };
      hf.querySelectorAll('.hcpf').forEach(p=>p.onclick=()=>{ const dim=p.dataset.dim, val=p.dataset.val, row=p.closest('.hcp-frow');
        if(val==='__all'){ sel[dim].clear(); row.querySelectorAll('.hcpf').forEach(x=>x.classList.toggle('on',x===p)); }
        else { p.classList.toggle('on'); p.classList.contains('on')?sel[dim].add(val):sel[dim].delete(val);
          const a=row.querySelector('.hcpf[data-val="__all"]'); if(a) a.classList.toggle('on',sel[dim].size===0); }
        applyHf(); });
      applyHf();
    }
    // cycle selector — swap the goal-progress panel for the chosen cycle
    $$('#content .cyc-sel').forEach(sel=>sel.onchange=()=>{ const cb=sel.closest('.card-b'), i=sel.value;
      cb.querySelectorAll('.cyc-panel').forEach(p=>p.classList.toggle('on',p.dataset.cyc===i));
      const o=sel.options[sel.selectedIndex], tg=cb.querySelector('.cyc-tag'); if(tg){ tg.textContent=o.dataset.tag||''; tg.className='cyc-tag '+(o.dataset.tone||''); } });
    // customer knowledge — add / remove at customer level (saved to the workspace; sharpens Nexi)
    const kAdd=$('#kw-add'); if(kAdd) kAdd.onclick=()=>{ const t=($('#kw-text').value||'').trim(); if(!t) return;
      const rows=knowledgeRows(); rows.push({customer:$('#kw-cust').value,tag:$('#kw-tag').value,text:t}); STORE.set('knowledge',rows); renderSection(); };
    $$('#content [data-kw-del]').forEach(x=>x.onclick=()=>{ const rows=knowledgeRows(); rows.splice(+x.dataset.kwDel,1); STORE.set('knowledge',rows); renderSection(); });
    // data-source connect toggles (these render in the Guide; harmless elsewhere) — saved to workspace
    $$('#content .src-sw:not(.lock)').forEach(sw=>sw.onclick=()=>{ const id=sw.dataset.src;
      const conn=srcConnected(), cur=STORE.get('sources',{})||{}; cur[id]=!conn[id]; STORE.set('sources',cur); renderSection(); });
  }

  function switchPersona(k){
    if(!A.personas[k]) return;
    S.persona=k;
    renderSidebar(); renderPersonaMenu(); renderTopbar(); renderSummary(); renderSection();
    refreshPni();
  }

  /* ================================================================================================
     TOP-BAR POPOVERS — product-level Settings + Insights (functional, computed from data)
     ============================================================================================== */
  function setupPop(btnSel,popSel,builder){
    const btn=$(btnSel), pop=$(popSel);
    btn.onclick=(e)=>{ e.stopPropagation(); const open=pop.classList.contains('open');
      $$('.pop').forEach(p=>p.classList.remove('open')); $('#psw-menu').classList.remove('open'); $('#ai-sugg').classList.remove('open');
      if(!open){ builder(pop); pop.classList.add('open'); } };
    pop.onclick=(e)=>e.stopPropagation();
  }
  function renderSettings(pop){
    pop.innerHTML='<h4>Product settings</h4>';
    [{label:'Dark glass theme',cls:'theme-dark'},{label:'Compact density',cls:'compact'},{label:'Reduce motion',cls:'no-motion'}].forEach(o=>{
      const on=document.body.classList.contains(o.cls);
      const row=el('div','row',`<span class="lbl">${o.label}</span><span class="sw ${on?'on':''}"></span>`);
      row.querySelector('.sw').onclick=()=>{ document.body.classList.toggle(o.cls); row.querySelector('.sw').classList.toggle('on'); };
      pop.appendChild(row);
    });
    pop.appendChild(el('div','stat','<span>Accent</span><b style="color:var(--green-hover)">PrecisionNeXT</b>'));
  }
  /* GUIDE — the PrecisionNeXT Navigator rendered FULL-WIDTH in the canvas (not a small popover). */
  function openGuide(){ S.section='__guide__'; renderSidebar(); renderSummary(); renderSection(); window.scrollTo({top:0,behavior:'smooth'}); }
  function renderGuideView(){
    const wrap=$('#content'), n=A.navigator, base=n.docsBase||'#', doc=(s)=> base==='#'?'#':`${base}/${s}`, cmap={green:'g',blue:'b',purple:'p'};
    const personas=A.personaOrder.length, sections=A.nav.reduce((a,g)=>a+g.items.length,0);
    let objs=0,alerts=0; A.personaOrder.forEach(k=>{ objs+=objSet(k).size; alerts+=(A.personas[k].pni.alerts||[]).length; });
    // operating model flow (WATCH → … → LEARN)
    const model=(n.model||[]).map((m,i)=>`<div class="gm-step"><div class="gm-k">${esc(m.k)}</div><div class="gm-d">${esc(m.d)}</div></div>${i<(n.model.length-1)?'<div class="gm-arrow">→</div>':''}`).join('');
    // how-your-day-works numbered flow (clickable)
    const flow=(n.flow||[]).map(f=>`<button class="gf-step" data-go="${esc(f.go||'')}"><span class="gf-n">${esc(f.n)}</span><span class="gf-x"><span class="gf-t">${esc(f.t)}</span><span class="gf-d">${esc(f.d)}</span></span><span class="gf-go">Open ↗</span></button>`).join('');
    const win=n.win.map(w=>`<button class="nv-w ${cmap[w.color]||'b'}" data-go="${esc(w.go||'')}"><span class="k">${esc(w.key)}</span><span class="wx"><span class="wn">${esc(w.name)}</span><span class="wd">${esc(w.desc)}</span></span></button>`).join('');
    const feats=n.features.map(f=>`<div class="nv-f"><span class="fi" data-go="${esc(f.go||'')}">${ICON[f.icon]||ICON.grid}</span>
      <span class="fx" data-go="${esc(f.go||'')}"><span class="nm">${esc(f.name)}</span><span class="ds">${esc(f.desc)}</span><span class="how">▸ ${esc(f.how||'')}</span></span>
      ${f.go?`<a class="nv-open" href="${doc(f.go)}" target="_blank" rel="noopener" title="Open in a new window">↗</a>`:''}</div>`).join('');
    const five=n.fiveC.map((c,i)=>`<div class="g5 c${i}"><div class="g5-c">${esc(c.c)}</div><div class="g5-d">${esc(c.desc)}</div></div>`).join('');
    wrap.innerHTML=
      // hero
      `<div class="col-12"><div class="guide-hero reveal">
        <h2>${esc(n.title)}</h2><p class="gh-tag">${esc(n.tagline)}</p>
        <p class="gh-lead">${esc(n.intro)}</p>
        <div class="gh-stats"><div><b>${personas}</b><span>roles</span></div><div><b>${sections}</b><span>workspaces</span></div><div><b>${objs}</b><span>objectives</span></div><div><b>${alerts}</b><span>live signals</span></div></div>
      </div></div>`+
      // operating model
      `<div class="col-12">${cardShell({title:'How it works — the operating model',icon:'route'},`<div class="gm">${model}</div>`,'var(--green)')}</div>`+
      // data sources SETUP lives here (connect public feeds + internal systems; saved to the workspace)
      `<div class="col-12">${cardShell({title:'Connect your data sources — public feeds + internal systems',icon:'plug',pill:'setup · saved to your workspace'},sourcesInner(srcCatalog()),'var(--green)')}</div>`+
      // 5C framework (orchestrated together, full width)
      `<div class="col-12">${cardShell({title:'The 5C framework — orchestrated together',icon:'layers'},`<div class="g5grid">${five}</div>`,'var(--purple)')}</div>`+
      // WIN
      `<div class="col-12">${cardShell({title:'The WIN loop — Watch · Interpret · Navigate',icon:'eye'},`<div class="nv-win big">${win}</div>`,'var(--purple)')}</div>`+
      // features
      `<div class="col-12">${cardShell({title:'Every feature & how to use it',icon:'grid',pill:'tap to open · ↗ for the deep-dive'},`<div class="nv-feats two">${feats}</div>`,'var(--blue)')}</div>`;
    wrap.querySelectorAll('[data-go]').forEach(node=>{ if(!node.dataset.go) return; node.onclick=()=>goTo(node.dataset.go); });
    // connect / disconnect a data source right here in the Guide (re-renders the guide)
    wrap.querySelectorAll('.src-sw:not(.lock)').forEach(sw=>sw.onclick=()=>{ const id=sw.dataset.src;
      const conn=srcConnected(), cur=STORE.get('sources',{})||{}; cur[id]=!conn[id]; STORE.set('sources',cur); renderGuideView(); });
  }

  /* ================================================================================================
     PrecisionNeXT ENGINE — alerts, chat, simulated reasoning, FAB open/close toggle
     Swap the body of pniReason() for a real model/API call later; the UI contract is unchanged.
     ============================================================================================== */
  function refreshPni(){
    const d=A.personas[S.persona].pni;
    $('#pni-cnt').textContent=(d.alerts||[]).length;
    // toast preview of the top alert (only when chat is closed)
    if(d.alerts&&d.alerts[0]&&!S.pniOpen){ $('#pni-toast-t').textContent=d.alerts[0].title; $('#pni-toast-d').textContent=d.alerts[0].detail; showToast(); }
    buildPniBody();
  }
  function buildPniBody(){
    const body=$('#pni-body'); body.innerHTML=''; const d=A.personas[S.persona].pni;
    (d.alerts||[]).forEach(a=>body.appendChild(el('div','alert reveal',
      `<div class="h">${ICON.spark} New intelligence</div><div class="t">${esc(a.title)}</div><div class="d">${esc(a.detail)}</div><div class="tm">${esc(a.time)}</div>`)));
    pushBubble(d.intro,'ai','Nexi');
    const sg=$('#pni-sg'); sg.innerHTML='';
    (d.prompts||[]).forEach(t=>{const c=el('button','sg',esc(t));c.onclick=()=>askPni(t);sg.appendChild(c);});
  }
  /* lightweight markdown for Nexi's answers — escapes first (safe), then renders **bold**, *italic*,
     `code`, bullet lines and line breaks so the chat never shows raw asterisks. */
  function mdLite(text){
    let s=esc(String(text==null?'':text));
    s=s.replace(/\*\*([^*]+?)\*\*/g,'<b>$1</b>');                                  // **bold**
    s=s.replace(/(^|[\s(])\*(?!\s)([^*\n]+?)\*(?=[\s).,!?:;]|$)/g,'$1<i>$2</i>');   // *italic*
    s=s.replace(/(^|[\s(])_(?!\s)([^_\n]+?)_(?=[\s).,!?:;]|$)/g,'$1<i>$2</i>');     // _italic_
    s=s.replace(/`([^`]+?)`/g,'<code>$1</code>');                                  // `code`
    s=s.replace(/(^|\n)\s*[-*•]\s+/g,'$1• ');                                      // bullet markers → •
    s=s.replace(/\n/g,'<br>');                                                     // newlines
    return s;
  }
  function pushBubble(text,who,src){
    const body=$('#pni-body');
    const content=who==='ai'?mdLite(text):esc(text);
    body.appendChild(el('div',`bub ${who} reveal`,(who==='ai'&&src?`<span class="src">${ICON.spark} ${esc(src)}</span>`:'')+content));
    body.scrollTop=body.scrollHeight;
  }
  function showThinking(){const body=$('#pni-body');const t=el('div','think','<span></span><span></span><span></span>');body.appendChild(t);body.scrollTop=body.scrollHeight;return()=>t.remove();}

  function pniReason(text){
    const d=A.personas[S.persona].pni, q=text.toLowerCase(), m=d.answers||{};
    for(const k in m){ if(q.includes(k)) return m[k]; }
    if(/(draft|outline|write|plan|charter|agenda|build|project)/.test(q)) return firstOf(m,['draft','outline','plan','charter','agenda','project','build']);
    if(/(why|confidence|risk|fit)/.test(q))                                return firstOf(m,['confidence','risk','fit','why']);
    if(/(who|network|influence|unmapped|channel)/.test(q))                 return firstOf(m,['influence','network','unmapped','channel','revenue']);
    const sc=A.resolve(S.persona,S.section), act=sc&&(sc.blocks||[]).find(b=>b.type==='actions');
    if(act) return `On this screen, the highest-leverage move is “${act.items[0].title}”. I can draft it, explain the reasoning, or break it into steps — just say which.`;
    return 'I can help with insights, next best actions or execution steps for this view. Try one of the suggested prompts.';
  }
  const firstOf=(m,keys)=>{for(const k of keys)if(m[k])return m[k];return null;};

  function askPni(text){
    if(!text.trim())return; if(!S.pniOpen) openPni();
    pushBubble(text,'me'); const stop=showThinking();
    setTimeout(()=>{stop();pushBubble(pniReason(text)||'Here’s what I found.','ai','Nexi');},850);
  }
  function pniExecute(a){ openPni(); pushBubble(`Execute: ${a.title}`,'me'); const stop=showThinking();
    setTimeout(()=>{stop();pushBubble(`Done — I’ve prepared “${a.title}” (confidence ${a.confidence}%). I’ll add it to your Execution Plan and draft the first touch. (Prototype: connect this to your CRM/MA system to action for real.)`,'ai','Agent action');},950); }
  function pniExplain(a){ openPni(); pushBubble(`Why “${a.title}”?`,'me'); const stop=showThinking();
    setTimeout(()=>{stop();pushBubble(a.rationale,'ai','Reasoning');},750); }

  /* FAB toggles open/close. The same circle minimises (shows ✕ while open). */
  let toastTimer=null;
  function showToast(){ const t=$('#pni-toast'); if(S.pniOpen)return; t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),6000); }
  function openPni(){ S.pniOpen=true; $('#pni').classList.add('open'); $('#pni-fab').classList.add('open'); $('#pni-toast').classList.remove('show'); }
  function closePni(){ S.pniOpen=false; $('#pni').classList.remove('open'); $('#pni-fab').classList.remove('open'); }
  function togglePni(){ S.pniOpen?closePni():openPni(); }

  /* ================================================================================================
     EVENTS + INIT
     ============================================================================================== */
  function wire(){
    // profile (icon only) — click reveals details + full-width switch list
    $('#psw-btn').onclick=(e)=>{e.stopPropagation(); $$('.pop').forEach(p=>p.classList.remove('open')); $('#ai-sugg').classList.remove('open'); $('#psw-menu').classList.toggle('open');};
    $('#psw-menu').onclick=(e)=>e.stopPropagation();
    // close menus + popovers + search directory on any outside click
    document.addEventListener('click',()=>{ $('#psw-menu').classList.remove('open'); $$('.pop').forEach(p=>p.classList.remove('open')); $('#ai-sugg').classList.remove('open'); });
    setupPop('#set-btn','#set-pop',renderSettings);
    $('#ins-btn').onclick=(e)=>{ e.stopPropagation(); $$('.pop').forEach(p=>p.classList.remove('open')); $('#psw-menu').classList.remove('open'); $('#ai-sugg').classList.remove('open'); openGuide(); };
    // search = directory of HCPs · HCOs · Insights (click a result to open the profile / jump to section)
    const sw=$('.ai-search-wrap'); if(sw) sw.onclick=(e)=>e.stopPropagation();
    const si=$('#ai-search');
    si.addEventListener('focus',()=>{ buildSearchResults(si.value); $('#ai-sugg').classList.add('open'); });
    si.addEventListener('input',()=>{ buildSearchResults(si.value); $('#ai-sugg').classList.add('open'); });
    // PrecisionNeXT
    $('#pni-fab').onclick=togglePni;
    $('#pni-toast-x').onclick=(e)=>{e.stopPropagation();$('#pni-toast').classList.remove('show');};
    $('#pni-toast').onclick=(e)=>{ if(e.target.id!=='pni-toast-x') openPni(); };
    $('#pni-form').addEventListener('submit',e=>{e.preventDefault();const i=$('#pni-input');askPni(i.value);i.value='';});
  }

  function init(){
    wire();
    renderSidebar(); renderPersonaMenu(); renderTopbar(); renderSummary(); renderSection(); refreshPni();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
