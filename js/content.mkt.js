/* ==================================================================================================
   PERSONA CONTENT · MARKETING MANAGER — Sofia Reyes                 ►► EDIT THIS PERSONA HERE ◄◄
   One file = one persona. Block schema documented in js/content.rep.js. Sample data only.
   ================================================================================================ */
C360.register('mkt', {

  profile: { name:'Sofia Reyes', title:'Brand & Omnichannel Manager', team:'Commercial Marketing', av:'SR', accent:'var(--blue)' },

  sections:{

    cockpit:{   /* nav label = "Home" — the personalised C360 landing page */
      summary:'Your objectives as a Marketing Manager — set what matters; PrecisionNeXT then senses the engagement signals and plans your next moves.',
      chips:['Today’s decision','Brand objectives','Next moves'],
      blocks:[
        {type:'decisionflow', col:12, title:'Today’s decision — sensed, decided, acted', icon:'spark',
          signal:{kind:'ROI signal', time:'2d ago', text:'Your sequenced email→rep journeys are returning 3.1× ROI while programmatic display sits at 0.6% engagement — and 38% of the quarter’s budget is still unspent.'},
          insight:{text:'Display is non-incremental here; the same budget compounds far harder inside the sequenced journeys the field can build on.',
                   yours:'You noted the endocrinologist segment responds to hard outcome stats, not mechanism-of-action creative.'},
          recommend:{action:'Reallocate the 38% display budget into sequenced journeys and refresh the fatiguing hero asset with an outcome-stat variant.', confidence:89,
                     why:'Moves spend to the channel with proven incremental lift and fixes the creative for the segment that drives MQLs.'},
          outcome:{text:'Projected +14% MQLs and blended ROI rising 2.0× → 2.4× before quarter close, with warmer leads handed to the field.'},
          feedback:{text:'Your segment insight steered the creative refresh toward outcome stats; Nexi now weights outcome-led creative for evidence-driven segments.'}},
        {type:'kpis', items:[
          {v:'4',k:'Objectives active',desc:'Personalised to your brand goals',tone:'blue'},
          {v:'5',k:'Audiences tracked',desc:'HCP segments in play',tone:'blue',info:'Segments selected by size, engagement and your brand objectives. Open Customer Insight for the breakdown.'},
          {v:'3.1×',k:'Best-channel ROI',desc:'Sequenced email→rep',tone:'green'},
          {v:'↑18%',k:'MQL trend',desc:'Quarter to date',tone:'green'}]},
        {type:'signals', col:12, title:'Signals PrecisionNeXT is sensing', icon:'eye', items:[
          {tone:'amber',kind:'Fatigue',title:'Hero asset CTR down 22%',detail:'RWE hero fatiguing over 3 weeks.',time:'today'},
          {tone:'rose',kind:'Leak',title:'37% of MQLs unactioned in SLA',detail:'Lead routing is leaking value.',time:'1d ago'},
          {tone:'green',kind:'Winner',title:'Sequenced journeys at 3.1× ROI',detail:'Reallocate budget to compound it.',time:'2d ago'},
          {tone:'blue',kind:'Segment',title:'Endocrinologists +18% MQL',detail:'Your engine segment — scale spend.',time:'3d ago'}]},
        {type:'cycleProgress', col:12, title:'Your progress against goals', icon:'home', cycles:[
          {id:'q4-2025', label:'Q4 2025 · closed', tag:'Final', tone:'green', note:'Closed cycle — hit engagement and ROI; funnel leak persisted.', items:[
            {label:'Engagement vs target',value:100,max:100,tone:'green',vv:'6.1% / 6%'},
            {label:'Blended ROI vs plan',value:100,max:100,tone:'green',vv:'2.4× / 2.4×'},
            {label:'Funnel conversion',value:55,max:100,tone:'amber',vv:'improving'},
            {label:'Tactics on schedule',value:90,max:100,tone:'green',vv:'9 of 10'}]},
          {id:'q1-2026', label:'Q1 2026 · current', tag:'Live', tone:'blue', current:true, note:'Current cycle — strong ROI; the MQL→rep leak is the gap.', items:[
            {label:'Engagement vs target',value:80,max:100,tone:'green',vv:'4.8% / 6%'},
            {label:'Blended ROI vs plan',value:83,max:100,tone:'green',vv:'2.0× / 2.4×'},
            {label:'Funnel conversion',value:40,max:100,tone:'amber',vv:'MQL leak'},
            {label:'Tactics on schedule',value:70,max:100,tone:'blue',vv:'7 of 10'}]},
          {id:'q2-2026', label:'Q2 2026 · planning', tag:'Plan', tone:'purple', future:true, note:'Next cycle — proposed brand targets. Adjust before the cycle opens.', items:[
            {label:'Engagement vs target',value:0,max:100,tone:'blue',vv:'target · 6.5%'},
            {label:'Blended ROI vs plan',value:0,max:100,tone:'blue',vv:'target · 2.6×'},
            {label:'Funnel conversion',value:0,max:100,tone:'blue',vv:'target · +15 pts'},
            {label:'Tactics on schedule',value:0,max:100,tone:'blue',vv:'target · 10 of 10'}]}]},
        {type:'objectives', title:'Your brand objectives — tap to configure', items:[
          {id:'engage',  icon:'spark', title:'Hit brand engagement goals',   desc:'Lift HCP engagement against the quarterly target.',            recommended:true, default:true,  track:'Engagement rate'},
          {id:'roi',     icon:'signal',title:'Optimize channel ROI',         desc:'Shift spend to the channels that convert.',                    recommended:true, default:true,  track:'Blended ROI'},
          {id:'funnel',  icon:'route', title:'Advance the adoption funnel',   desc:'Move HCPs from aware → engaged → prescribing.',                recommended:false, default:true,  track:'Funnel conversion'},
          {id:'fatigue', icon:'doc',   title:'Reduce content fatigue',        desc:'Refresh assets before engagement decays.',                    recommended:false, default:false, track:'Asset freshness'},
          {id:'tactics', icon:'check', title:'Execute tactical plans on time',desc:'Keep the tactical calendar on schedule.',                      recommended:false, default:false, track:'Tactics on schedule'},
          {id:'reactivate',icon:'share',title:'Re-activate lapsed audiences', desc:'Win back HCPs who engaged once and went quiet.',               recommended:false, default:false, track:'Reactivations'}]},
        {type:'list', col:6, title:'What you’re tracking', icon:'target', items:[
          {tone:'green',title:'Engagement rate',sub:'Objective · Engagement goals',value:'4.8%',cap:'vs target'},
          {tone:'green',title:'Blended ROI',sub:'Objective · Channel ROI',value:'2.0×',cap:'→ 2.4× plan'},
          {tone:'amber',title:'Funnel conversion',sub:'Objective · Adoption funnel',value:'37%',cap:'MQL leak'}]},
        {type:'note', col:6, text:'PrecisionNeXT: against your objectives, the biggest lever is reallocating display budget into sequenced journeys — projected +14% MQLs this quarter. See Next Best Actions.'},
      ]},

    nba:{
      summary:'Sensed from your active objectives — your prioritised HCPs and the best next engagement move for each, with projected impact.',
      chips:['Optimisation moves','Projected impact','Channel & creative'],
      blocks:[
        {type:'kpis', items:[{v:'5',k:'Audiences in plan',tr:'by your goals',tone:'purple'},{v:'3',k:'Campaigns live',tr:'active',tone:'blue'},
                {v:'2',k:'Assets fatiguing',tr:'refresh',tone:'amber'},{v:'↑18%',k:'MQL lift',tr:'QTD',tone:'green'}]},
        {type:'note', col:12, text:'Brand & omnichannel moves — reach the HCPs the field can’t, and feed the field the warm ones. Every campaign action carries into the rep’s plan and shows up in their Customer Insights.'},
        {type:'campaigns', title:'Active campaign performance', icon:'flow', items:[
          {name:'NeuroVance MoA Launch',status:'Active',reach:'1,847',open:62,ctr:34,roi:'+18%'},
          {name:'Cardiovascular Re-engage',status:'Active',reach:'923',open:54,ctr:28,roi:'+12%'},
          {name:'Onkonex Phase III Reprint',status:'Active',reach:'412',open:71,ctr:42,roi:'+22%'},
          {name:'Diabetra Webinar Push',status:'Paused',reach:'1,124',open:48,ctr:21,roi:'+8%'}]},
        {type:'insights', col:12, title:'Reach coverage — field vs non-personal', icon:'bulb', items:[
          {tone:'positive',title:'Non-personal covers the unseen 62%',detail:'2,150 HCPs the field can’t reach this cycle are covered by sequenced digital journeys.',metric:'62%',delta:'digital-only',dir:'up'},
          {tone:'neutral',title:'Hand warm HCPs back to the field',detail:'128 digitally-engaged HCPs flagged for rep follow-up this week.',metric:'128',delta:'to field',dir:'up'}]},
        {type:'hcpcards', variant:'nba', title:'Audience cockpit — prioritised HCPs (tap a card to open the profile)', icon:'spark'},
        {type:'actions', title:'Precision NeXT Best Actions', icon:'spark', items:[
          {priority:'high',title:'Reallocate display budget to sequenced journeys',confidence:89,impact:'High',effort:'Low',channel:'Media ops',
           rationale:'Display sits at 0.6% engagement while sequenced email-then-rep delivers 3.1× ROI. Shifting the remaining 38% budget compounds efficiency before quarter close.'},
          {priority:'med',title:'Refresh the fatiguing hero asset',confidence:82,impact:'Medium',effort:'Medium',channel:'Creative',
           rationale:'22% CTR decline on the hero RWE asset signals fatigue. A variant keeps the highest-fit segment engaged.'},
          {priority:'low',title:'Launch a retargeting wave to warm HCPs',confidence:74,impact:'Medium',effort:'Low',channel:'Email + web',
           rationale:'HCPs who engaged once but didn’t convert are a high-propensity retarget pool.'}]},
      ]},

    universe:{
      summary:'Your addressable HCP audiences — size, engagement, top channel and trend per segment, so you know where to scale, nurture, test or rework.',
      chips:['Addressable audiences','Segment performance','Scale / rework'],
      blocks:[
        {type:'filterbar', title:'Filter the universe — therapeutic area, brand, priority', icon:'layers'},
        {type:'hcpgroups', title:'Customer grouping summary', icon:'layers'},
        {type:'hcpcards', variant:'score', title:'Customer scoring — engagement & 360 indices (tap to open the profile)', icon:'users'},
        {type:'table', title:'Audience Universe', icon:'globe',
          cols:['Segment','Size','Engagement','Top channel','Trend','Status'],
          rows:[
            ['Treating Endocrinologists','1,240','4.8%','Email→Rep',{chip:'g',text:'▲ +18%'},{chip:'g',text:'Scale'}],
            ['Metabolic Specialists','680','3.9%','Web',{chip:'b',text:'▲ +6%'},{chip:'b',text:'Nurture'}],
            ['Pediatric Genetics','410','2.7%','Congress',{chip:'a',text:'▬ flat'},{chip:'a',text:'Test'}],
            ['Community HCPs','2,150','1.4%','Display',{chip:'r',text:'▼ -3%'},{chip:'r',text:'Rework'}],
            ['Lapsed Engagers','520','0.9%','—',{chip:'a',text:'dormant'},{chip:'p',text:'Retarget'}]]},
        {type:'insights', title:'Audience signals', icon:'bulb', items:[
          {tone:'positive',title:'Endocrinologist segment is your engine',detail:'Highest engagement + MQL growth — protect and scale spend here.',metric:'+18%',delta:'MQL',dir:'up'},
          {tone:'risk',title:'Community HCPs underperforming on display',detail:'Channel-segment mismatch dragging blended ROI.',metric:'1.4%',delta:'eng.',dir:'down'}]},
      ]},

    journey:{
      summary:'HCP journey performance across the funnel with drop-off diagnostics — so you fix the leak that loses the most value, not just add reach.',
      chips:['Campaign funnel','Drop-off diagnostics','Recoverable value'],
      blocks:[
        {type:'bars', col:6, title:'Campaign funnel', icon:'route', items:[
          {label:'Reached',value:5000,max:5000,tone:'blue',vv:'5.0k'},{label:'Engaged',value:1420,max:5000,tone:'blue',vv:'1.42k'},
          {label:'MQL',value:560,max:5000,tone:'green',vv:'560'},{label:'Rep-accepted',value:210,max:5000,tone:'green',vv:'210'},
          {label:'Converted',value:96,max:5000,tone:'purple',vv:'96'}]},
        {type:'list', col:6, title:'Journey drop-off diagnostics', icon:'route', items:[
          {tone:'green',title:'Engage→MQL strong',sub:'Sequenced journeys convert 2.3×',value:'2.3×',cap:'lift'},
          {tone:'amber',title:'MQL→Rep leak',sub:'37% of MQLs not actioned in SLA',value:'37%',cap:'leak'},
          {tone:'rose',title:'Reach→Engage weak on display',sub:'Top-of-funnel waste',value:'0.6%',cap:'eng.'}]},
        {type:'note', text:'PrecisionNeXT: the biggest recoverable value isn’t more reach — it’s the MQL→Rep leak. Tightening lead-routing SLA could recover ~80 actioned leads this quarter.'},
      ]},

    segments:{
      summary:'Behavioural segments and message-fit — how each group consumes content, so you match value prop, format and handoff to behaviour.',
      chips:['Behavioural segments','Message-fit','Format & handoff'],
      blocks:[
        {type:'list', col:6, title:'Behavioural segments', icon:'layers', items:[
          {tone:'green',title:'High-Intent Researchers',sub:'Multi-asset, deep sessions',value:'High',cap:'value'},
          {tone:'blue',title:'Skim & Sample',sub:'Quick opens, rep-curious',value:'Med',cap:'value'},
          {tone:'amber',title:'One-and-Done',sub:'Single open, no return',value:'Low',cap:'value'},
          {tone:'purple',title:'Re-engageable Lapsed',sub:'Past engagers gone quiet',value:'Upside',cap:'value'}]},
        {type:'insights', col:6, title:'Message-fit plays', icon:'bulb', items:[
          {tone:'positive',title:'Researchers → deep RWE',detail:'Long-form evidence + data tables convert best.',metric:'3.1×',delta:'ROI',dir:'up'},
          {tone:'neutral',title:'Skim & Sample → rep handoff',detail:'Trigger rep follow-up fast while warm.',metric:'SLA',delta:'speed',dir:'up'},
          {tone:'warning',title:'One-and-Done → new hook',detail:'Test a different value prop / format.',metric:'A/B',delta:'test',dir:'down'}]},
      ]},

    influence:{
      summary:'Channel and content influence on conversion — which touches actually drive HCPs to act, so budget follows incremental impact.',
      chips:['Channel influence','Incremental impact','Budget signal'],
      blocks:[
        {type:'graph', col:12, title:'360° Influence Network — therapeutic-area clusters', icon:'share'},
        {type:'network', col:6, title:'Conversion influence map', icon:'share', center:{av:'CV',name:'HCP Conversion',role:'Outcome'},
          items:[
            {av:'ER',name:'Email→Rep sequence',role:'Primary driver',tie:'3.1×',tone:'green'},
            {av:'WB',name:'Web / portal',role:'Assist channel',tie:'1.6×',tone:'blue'},
            {av:'CF',name:'Congress',role:'High-intent source',tie:'1.9×',tone:'purple'},
            {av:'DP',name:'Programmatic display',role:'Weak top-funnel',tie:'0.6×',tone:'rose'}]},
        {type:'note', col:6, text:'PrecisionNeXT: sequenced email-then-rep is the load-bearing channel. Display contributes little incremental conversion — reallocating its budget is low-risk, high-return.'},
      ]},

    affinity:{
      summary:'Channel-mix performance and content engagement — the ROI of each channel and which assets are winning or fatiguing.',
      chips:['Channel ROI','Content engagement','Fatigue signal'],
      blocks:[
        {type:'bars', col:6, title:'Channel ROI', icon:'signal', items:[
          {label:'Email→Rep journey',value:100,max:100,tone:'green',vv:'3.1×'},{label:'Congress',value:61,max:100,tone:'purple',vv:'1.9×'},
          {label:'Web / portal',value:52,max:100,tone:'blue',vv:'1.6×'},{label:'Display',value:19,max:100,tone:'rose',vv:'0.6×'}]},
        {type:'bars', col:6, title:'Content engagement (CTR)', icon:'signal', items:[
          {label:'RWE outcomes (hero)',value:60,max:100,tone:'amber',vv:'-22% ▼'},{label:'Dosing explainer',value:78,max:100,tone:'green',vv:'strong'},
          {label:'Patient stories',value:71,max:100,tone:'green',vv:'strong'},{label:'MoA animation',value:34,max:100,tone:'amber',vv:'weak'}]},
      ]},

    execplan:{
      summary:'Optimisation actions for this quarter — sequenced steps with PrecisionNeXT-modelled impact, owners and timing across media, creative and ops.',
      chips:['Optimisation steps','Modelled impact','Owners & timing'],
      blocks:[
        {type:'steps', title:'Execution Plan — Q2 campaign', icon:'check', items:[
          {status:'done',title:'Validated channel ROI model',meta:'Sequenced journey wins',owner:'You',ai:false},
          {status:'active',title:'Submit budget reallocation',meta:'PrecisionNeXT modelled +0.4× blended ROI',owner:'You',ai:true},
          {status:'todo',title:'Brief creative on hero-asset variant',meta:'Fatigue data attached',owner:'Creative',ai:true},
          {status:'todo',title:'Configure retargeting audience',meta:'Lapsed-engager segment defined',owner:'You',ai:false}]},
      ]},

    content:{
      summary:'Asset performance ranked for reuse and refresh — what to scale, what to rotate and what to retire from the sequence.',
      chips:['Asset performance','Reuse / refresh','Retire signal'],
      blocks:[
        {type:'list', title:'Content Relevance — Q2 library', icon:'doc', items:[
          {tone:'green',title:'Dosing explainer (modular email)',sub:'Top CTR · scale across segments',value:'92',cap:'performance'},
          {tone:'green',title:'Patient-story carousel',sub:'Strong engagement · reuse',value:'85',cap:'performance'},
          {tone:'amber',title:'RWE outcomes hero asset',sub:'Fatiguing -22% · refresh variant',value:'58',cap:'performance'},
          {tone:'amber',title:'MoA animation',sub:'Low CTR · retire from sequence',value:'34',cap:'performance'}]},
      ]},

    orchestration:{
      summary:'A rebalanced omnichannel cadence — the moves that shift budget, refresh creative, retarget and tighten handoffs into one connected plan.',
      chips:['Rebalanced cadence','Budget moves','Connected handoffs'],
      blocks:[
        {type:'list', title:'Engagement Orchestration — rebalanced plan', icon:'flow', items:[
          {tone:'green',title:'Shift 38% display budget → sequenced journeys',sub:'Projected +14% MQLs',value:'Reallocate',cap:'move'},
          {tone:'green',title:'Deploy hero-asset variant to endocrinologists',sub:'Counter fatigue',value:'Creative',cap:'move'},
          {tone:'purple',title:'Launch lapsed-engager retargeting wave',sub:'520 HCPs, warm pool',value:'Retarget',cap:'move'},
          {tone:'blue',title:'Tighten MQL→Rep routing SLA',sub:'Recover ~80 actioned leads',value:'Ops',cap:'move'}]},
      ]},
  },

  pni:{
    intro:'Your sequenced email-then-rep journeys return 3.1× while display drags at 0.6%. With 38% of budget left, reallocation is the highest-leverage move this quarter.',
    alerts:[
      {title:'Hero asset fatiguing',detail:'RWE hero CTR down 22% over 3 weeks.',time:'today'},
      {title:'MQL→Rep leak',detail:'37% of MQLs not actioned within SLA.',time:'1d ago'}],
    prompts:['Project the reallocation impact','Which content is fatiguing?','Define the retargeting audience','Best-performing channel?'],
    answers:{
      project:'Projection: moving remaining display budget into sequenced journeys lifts blended ROI ~2.0×→~2.4× and adds an estimated +14% MQLs before quarter close, holding CPL steady.',
      fatigue:'The RWE hero asset is fatiguing — CTR down 22% over 3 weeks. Rotate in a variant (new headline + outcome stat) for the treating-endocrinologist segment.',
      retargeting:'Retargeting audience: 520 lapsed engagers with ≥1 past engagement but no activity in 21 days — a warm, high-propensity pool.',
      channel:'Top channel: sequenced email-then-rep at 3.1× ROI and 4.8% engagement — well above the single-channel 1.4× baseline.'}},
});
