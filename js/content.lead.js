/* ==================================================================================================
   PERSONA CONTENT · COMMERCIAL LEADER — Helen Whitaker             ►► EDIT THIS PERSONA HERE ◄◄
   One file = one persona. Block schema documented in js/content.rep.js. Sample data only.
   ================================================================================================ */
C360.register('lead', {

  profile: { name:'Helen Whitaker', title:'VP Commercial, Rare Disease', team:'Commercial Leadership', av:'HW', accent:'var(--purple)' },

  sections:{

    cockpit:{   /* nav label = "Home" — the personalised C360 landing page */
      summary:'Your objectives as a Commercial Leader — set what matters; PrecisionNeXT then senses the risk & performance signals and plans your next moves.',
      chips:['Today’s decision','Strategic objectives','Next moves'],
      blocks:[
        {type:'decisionflow', col:12, title:'Today’s decision — sensed, decided, acted', icon:'spark',
          signal:{kind:'Revenue risk', time:'today', text:'Two strategic accounts (Northstar + Summit) are in concurrent P&T review — the region’s single largest concentrated revenue exposure — even as the region tracks at 96% to plan.'},
          insight:{text:'Concentrated exposure beats broad averages: one adverse decision dents attainment more than incremental gains elsewhere can recover.',
                   yours:'You know Summit’s new CMO championed this therapy at her previous health system.'},
          recommend:{action:'Stand up a focused access war-room on the two accounts — KAM owns, Medical + Market Access support, Analytics tracks — weekly for 6 weeks.', confidence:91,
                     why:'Concentrates the right cross-functional firepower on the highest-exposure decisions during the exact window they’re decided.'},
          outcome:{text:'War-room live; Summit prioritised first on the warm-CMO signal. Revenue-at-risk is actively managed and attainment holds.'},
          feedback:{text:'Your knowledge of Summit’s CMO history reset Nexi’s win-probability and re-ranked the account order — it now factors decision-maker history into risk scoring.'}},
        {type:'kpis', items:[
          {v:'4',k:'Objectives active',desc:'Personalised to your regional goals',tone:'purple'},
          {v:'96%',k:'Attainment',desc:'Region vs plan',tone:'green'},
          {v:'2',k:'At-risk accounts',desc:'Revenue exposure this quarter',tone:'rose',info:'Flagged at risk because both have concurrent formulary reviews this quarter — the region’s largest revenue exposure.'},
          {v:'88%',k:'Launch readiness',desc:'Medical & access trailing',tone:'amber'}]},
        {type:'signals', col:12, title:'Signals PrecisionNeXT is sensing', icon:'eye', items:[
          {tone:'rose',kind:'Risk',title:'2 accounts in concurrent P&T review',detail:'Largest revenue-at-risk this quarter.',time:'today'},
          {tone:'amber',kind:'Coverage',title:'West-South under-served',detail:'Rebalance capacity from West-North slack.',time:'1d ago'},
          {tone:'green',kind:'Attainment',title:'Region at 96% to plan',detail:'Metabolic franchise leading.',time:'2d ago'},
          {tone:'blue',kind:'Launch',title:'Launch readiness at 88%',detail:'Medical & access workstreams trailing.',time:'3d ago'}]},
        {type:'cycleProgress', col:12, title:'Your progress against goals', icon:'home', cycles:[
          {id:'q4-2025', label:'Q4 2025 · closed', tag:'Final', tone:'green', note:'Closed cycle — region beat plan; risks contained.', items:[
            {label:'Forecast attainment',value:100,max:100,tone:'green',vv:'101%'},
            {label:'Revenue-at-risk contained',value:100,max:100,tone:'green',vv:'all contained'},
            {label:'Coverage balance',value:88,max:100,tone:'green',vv:'balanced'},
            {label:'Launch readiness',value:80,max:100,tone:'amber',vv:'on track'}]},
          {id:'q1-2026', label:'Q1 2026 · current', tag:'Live', tone:'blue', current:true, note:'Current cycle — on plan, but concentrated access exposure is open.', items:[
            {label:'Forecast attainment',value:96,max:100,tone:'green',vv:'96%'},
            {label:'Revenue-at-risk contained',value:40,max:100,tone:'rose',vv:'2 accounts open'},
            {label:'Coverage balance',value:70,max:100,tone:'amber',vv:'1 gap'},
            {label:'Launch readiness',value:88,max:100,tone:'amber',vv:'88%'}]},
          {id:'q2-2026', label:'Q2 2026 · planning', tag:'Plan', tone:'purple', future:true, note:'Next cycle — proposed regional targets. Adjust before the cycle opens.', items:[
            {label:'Forecast attainment',value:0,max:100,tone:'blue',vv:'target · 100%'},
            {label:'Revenue-at-risk contained',value:0,max:100,tone:'blue',vv:'target · 0 open'},
            {label:'Coverage balance',value:0,max:100,tone:'blue',vv:'target · balanced'},
            {label:'Launch readiness',value:0,max:100,tone:'blue',vv:'target · 100%'}]}]},
        {type:'objectives', title:'Your strategic objectives — tap to configure', items:[
          {id:'attain',  icon:'spark', title:'Protect forecast attainment',  desc:'Hold the region to plan across brands.',                  recommended:true, default:true,  track:'Attainment %'},
          {id:'risk',    icon:'check', title:'Mitigate access risk',          desc:'Protect revenue from concurrent formulary reviews.',     recommended:true, default:true,  track:'Revenue-at-risk'},
          {id:'coverage',icon:'route', title:'Optimize field coverage',       desc:'Rebalance capacity to high-potential territories.',      recommended:false, default:true,  track:'Coverage balance'},
          {id:'launch',  icon:'target',title:'Ensure launch readiness',       desc:'Close medical & access gaps before launch.',             recommended:false, default:false, track:'Readiness %'},
          {id:'share',   icon:'signal',title:'Grow market share',             desc:'Compound share gains where momentum is strongest.',      recommended:false, default:false, track:'Share YoY'},
          {id:'talent',  icon:'star',  title:'Develop field capability',      desc:'Lift performance through coaching and enablement.',       recommended:false, default:false, track:'Capability index'}]},
        {type:'list', col:6, title:'What you’re tracking', icon:'target', items:[
          {tone:'green',title:'Forecast attainment',sub:'Objective · Protect plan',value:'96%',cap:'region'},
          {tone:'rose',title:'Revenue-at-risk',sub:'Objective · Mitigate risk',value:'2',cap:'accounts'},
          {tone:'amber',title:'Coverage balance',sub:'Objective · Optimize coverage',value:'1',cap:'gap'}]},
        {type:'note', col:6, text:'PrecisionNeXT: against your objectives, the biggest exposure is two strategic accounts in concurrent formulary review. I’ve outlined an access war-room — see Next Best Actions.'},
      ]},

    nba:{
      summary:'Sensed from your active objectives — your prioritised customers and the highest-impact action for each, with confidence and rationale.',
      chips:['Strategic moves','Revenue protection','Explainable rationale'],
      blocks:[
        {type:'note', col:12, text:'Sensed from your strategic objectives — the highest-impact moves across brands, regions and accounts. Act here, then drill into the brand × segment scorecard for the detail.'},
        {type:'kpis', items:[{v:'3',k:'Brands in plan',tr:'by your goals',tone:'purple'},{v:'2',k:'At-risk accounts',tr:'act now',tone:'rose'},
                {v:'96%',k:'Attainment',tr:'vs plan',tone:'green'},{v:'42',k:'Field roles',tr:'region',tone:'blue'}]},
        {type:'hcpcards', variant:'nba', title:'NBA Cockpit — prioritised HCPs (tap a card to open the profile)', icon:'spark'},
        {type:'actions', title:'Precision NeXT Best Actions', icon:'spark', items:[
          {priority:'high',title:'Run an access war-room on the 2 at-risk accounts',confidence:91,impact:'High',effort:'Medium',channel:'Cross-functional',
           rationale:'Two strategic accounts with concurrent formulary reviews are the largest revenue-at-risk in the region. A cross-functional war-room (KAM + Medical + Access) protects the quarter.'},
          {priority:'med',title:'Rebalance field coverage West-North → West-South',confidence:80,impact:'Medium',effort:'Medium',channel:'Sales ops',
           rationale:'Coverage imbalance leaves high-potential West-South under-served while West-North has slack.'},
          {priority:'low',title:'Accelerate launch medical & access workstreams',confidence:77,impact:'High',effort:'High',channel:'Launch team',
           rationale:'Readiness at 88% with medical/access trailing; targeted acceleration protects the launch date.'}]},
      ]},

    universe:{
      summary:'Region performance at a glance — attainment, share, risk and coverage by territory and strategic account, so you see strength and exposure together.',
      chips:['Region performance','Territory & account','Risk view'],
      blocks:[
        {type:'filterbar', title:'Filter the universe — therapeutic area, brand, priority', icon:'layers'},
        {type:'hcpgroups', title:'Customer grouping summary', icon:'layers'},
        {type:'hcpcards', variant:'score', title:'Customer scoring — engagement & 360 indices (tap to open the profile)', icon:'users'},
        {type:'regions', title:'Regional health — attainment vs plan', icon:'globe', items:[
          {region:'Northeast',lead:'G. Chen',value:'$8.2M',pct:108,tone:'green'},
          {region:'Southeast',lead:'M. Brooks',value:'$6.1M',pct:102,tone:'green'},
          {region:'Midwest',lead:'K. Patel',value:'$5.4M',pct:87,tone:'amber'},
          {region:'West',lead:'L. Garcia',value:'$7.0M',pct:104,tone:'green'}]},
        {type:'table', title:'Brand × segment scorecard — performance & switching', icon:'layers',
          cols:['Brand / segment','TRx','vs prior','NRx','Switches in','Stops','Net starts','Segment %'],
          rows:[
            ['Metabolic · Tier-A',{chip:'g',text:'12,400'},{chip:'g',text:'+7%'},'860','120','40','+80','34%'],
            ['Metabolic · Tier-B',{chip:'b',text:'8,100'},{chip:'g',text:'+4%'},'520','70','55','+15','28%'],
            ['Enzyme therapy · Tier-A',{chip:'g',text:'9,200'},{chip:'g',text:'+5%'},'610','90','35','+55','22%'],
            ['New-indication launch',{chip:'a',text:'1,240'},{chip:'a',text:'new'},'1,240','—','—','+1,240','16%']]},
        {type:'table', title:'Region & Account Universe', icon:'globe',
          cols:['Territory / Account','Attainment','Share Δ','Risk','Coverage','Status'],
          rows:[
            ['West-North','103%',{chip:'g',text:'+9%'},'Low','Slack',{chip:'g',text:'Strong'}],
            ['West-South','89%',{chip:'b',text:'+4%'},'Med','Under',{chip:'a',text:'Rebalance'}],
            ['West-Central','97%',{chip:'g',text:'+6%'},'Low','Balanced',{chip:'g',text:'On plan'}],
            ['Northstar (acct)','—',{chip:'a',text:'review'},'High','—',{chip:'r',text:'At risk'}],
            ['Summit IDN (acct)','—',{chip:'a',text:'review'},'High','—',{chip:'r',text:'At risk'}]]},
        {type:'insights', title:'Region signals', icon:'bulb', items:[
          {tone:'positive',title:'Region tracking to plan',detail:'96% attainment, share +7% YoY — metabolic franchise leading.',metric:'96%',delta:'attain',dir:'up'},
          {tone:'risk',title:'Concentrated access exposure',detail:'Two strategic accounts in concurrent formulary review.',metric:'2',delta:'accounts',dir:'down'}]},
      ]},

    journey:{
      summary:'Portfolio momentum across the commercial journey — which brands are accelerating, steady or lagging — so you steer investment to trajectory.',
      chips:['Brand momentum','Trajectory watch','Investment focus'],
      blocks:[
        {type:'bars', col:6, title:'Brand momentum (attainment)', icon:'route', items:[
          {label:'Metabolic franchise',value:104,max:110,tone:'green',vv:'104%'},{label:'Enzyme therapy',value:95,max:110,tone:'blue',vv:'95%'},
          {label:'New-indication launch',value:88,max:110,tone:'amber',vv:'88%'}]},
        {type:'list', col:6, title:'Trajectory watch', icon:'route', items:[
          {tone:'green',title:'Metabolic accelerating',sub:'New starts + share both up',value:'▲',cap:'momentum'},
          {tone:'blue',title:'Enzyme steady',sub:'On plan, low variance',value:'▬',cap:'stable'},
          {tone:'amber',title:'Launch readiness lagging',sub:'Medical + access trailing',value:'▼',cap:'risk'}]},
      ]},

    segments:{
      summary:'Where to concentrate commercial energy — growth engines, accounts to defend, units to fix and launch bets — with the allocation play for each.',
      chips:['Strategic segments','Defend / grow / fix','Allocation plays'],
      blocks:[
        {type:'list', col:6, title:'Strategic segments', icon:'layers', items:[
          {tone:'green',title:'Growth engines',sub:'High-performing territories & accounts',value:'5',cap:'units'},
          {tone:'rose',title:'Defend',sub:'At-risk strategic accounts',value:'2',cap:'units'},
          {tone:'amber',title:'Fix',sub:'Under-covered / underperforming',value:'1',cap:'units'},
          {tone:'purple',title:'Launch bets',sub:'New-indication priority markets',value:'3',cap:'units'}]},
        {type:'insights', col:6, title:'Resource-allocation plays', icon:'bulb', items:[
          {tone:'risk',title:'Defend first',detail:'Protect the 2 at-risk accounts — highest revenue exposure.',metric:'#1',delta:'priority',dir:'down'},
          {tone:'positive',title:'Feed the engines',detail:'Keep investing where attainment & share compound.',metric:'5',delta:'units',dir:'up'},
          {tone:'warning',title:'Rebalance the fix',detail:'Shift coverage into under-served West-South.',metric:'1',delta:'gap',dir:'down'}]},
      ]},

    influence:{
      summary:'The cross-functional operating unit for the quarter’s biggest play — who owns, supports and informs the access war-room.',
      chips:['Operating unit','Cross-functional','Clear ownership'],
      blocks:[
        {type:'graph', col:12, title:'360° Influence Network — therapeutic-area clusters', icon:'share'},
        {type:'network', col:6, title:'Access war-room — operating unit', icon:'share', center:{av:'WR',name:'Access War-Room',role:'Protect at-risk accounts'},
          items:[
            {av:'MF',name:'Marcus Feldman (KAM)',role:'Account lead',tie:'Owns',tone:'green'},
            {av:'PN',name:'Dr. Priya Nair (MSL)',role:'Evidence & P&T support',tie:'Supports',tone:'blue'},
            {av:'MA',name:'Market Access',role:'Payer & policy',tie:'Supports',tone:'blue'},
            {av:'AN',name:'Analytics',role:'Revenue-at-risk tracking',tie:'Informs',tone:'purple'}]},
        {type:'note', col:6, text:'PrecisionNeXT: stand up the war-room with KAM as owner, MSL + Market Access supporting, Analytics tracking. Weekly cadence for 6 weeks covers both P&T review windows.'},
      ]},

    affinity:{
      summary:'Where leadership attention yields the most — revenue-at-risk by lever and the leverage of each leadership action.',
      chips:['Revenue-at-risk','Action leverage','Attention focus'],
      blocks:[
        {type:'bars', col:6, title:'Revenue-at-risk by lever', icon:'signal', items:[
          {label:'At-risk account access',value:92,max:100,tone:'rose',vv:'highest'},{label:'Launch readiness',value:64,max:100,tone:'amber',vv:'high'},
          {label:'Coverage imbalance',value:41,max:100,tone:'blue',vv:'med'},{label:'Pricing pressure',value:28,max:100,tone:'blue',vv:'low'}]},
        {type:'bars', col:6, title:'Leadership action leverage', icon:'signal', items:[
          {label:'Access war-room',value:91,max:100,tone:'green',vv:'91'},{label:'Coverage rebalance',value:80,max:100,tone:'green',vv:'80'},
          {label:'Launch acceleration',value:77,max:100,tone:'blue',vv:'77'}]},
      ]},

    execplan:{
      summary:'Your quarter-protection plan — sequenced leadership actions with PrecisionNeXT-drafted charters, owners and checkpoints.',
      chips:['Quarter protection','Drafted charters','Owners & checkpoints'],
      blocks:[
        {type:'steps', title:'Execution Plan — West Region', icon:'check', items:[
          {status:'done',title:'Reviewed regional forecast & share',meta:'96% attainment',owner:'You',ai:false},
          {status:'active',title:'Stand up access war-room',meta:'PrecisionNeXT drafted charter + invitees',owner:'You',ai:true},
          {status:'todo',title:'Approve coverage reallocation',meta:'Sales-ops scenario modelled',owner:'Sales Ops',ai:true},
          {status:'todo',title:'Set launch-readiness checkpoint',meta:'Medical + access focus',owner:'Launch Lead',ai:false}]},
      ]},

    content:{
      summary:'Leadership briefings and decision packs ranked by readiness — charters, dashboards and scenario decks ready to circulate.',
      chips:['Leadership packs','Decision-ready','Readiness score'],
      blocks:[
        {type:'list', title:'Content Relevance — leadership packs', icon:'doc', items:[
          {tone:'green',title:'Access war-room charter',sub:'PrecisionNeXT-drafted · ready to circulate',value:'94',cap:'readiness'},
          {tone:'green',title:'Revenue-at-risk dashboard',sub:'Two-account exposure quantified',value:'90',cap:'readiness'},
          {tone:'blue',title:'Coverage-rebalance scenario deck',sub:'Sales-ops model · for approval',value:'81',cap:'readiness'},
          {tone:'amber',title:'Launch-readiness tracker',sub:'Medical/access gaps flagged',value:'70',cap:'readiness'}]},
      ]},

    orchestration:{
      summary:'A cross-functional cadence for the quarter — the war-room, reviews, approvals and checkpoints sequenced into one operating rhythm.',
      chips:['Operating rhythm','Cross-functional','6-week cadence'],
      blocks:[
        {type:'list', title:'Engagement Orchestration — 6-week cadence', icon:'flow', items:[
          {tone:'green',title:'Week 1 · Launch access war-room',sub:'Charter + owners confirmed',value:'War-room',cap:'cadence'},
          {tone:'blue',title:'Weekly · Revenue-at-risk review',sub:'Analytics-led tracker',value:'Review',cap:'cadence'},
          {tone:'purple',title:'Week 2 · Approve coverage rebalance',sub:'West-North → West-South',value:'Sales ops',cap:'cadence'},
          {tone:'amber',title:'Week 3 · Launch-readiness checkpoint',sub:'Accelerate medical + access',value:'Launch',cap:'cadence'}]},
      ]},
  },

  pni:{
    intro:'The region is at 96% attainment, but two strategic accounts have concurrent formulary reviews — your biggest revenue-at-risk this quarter. I’ve outlined an access war-room.',
    alerts:[
      {title:'Concentrated access risk',detail:'Northstar + Summit both in Q3 formulary review.',time:'today'},
      {title:'Coverage imbalance',detail:'West-South under-served; West-North has slack.',time:'2d ago'}],
    prompts:['Draft the war-room charter','Quantify the revenue at risk','Model the coverage rebalance','Where is launch lagging?'],
    answers:{
      charter:'War-room charter: Objective — protect access at the 2 accounts. Members — KAM (owner), Medical, Market Access, Analytics. Cadence — weekly for 6 weeks. Outputs — evidence packs, P&T engagement plan, decision tracker.',
      revenue:'The two accounts under review are the region’s largest concentrated exposure this quarter. Treat both as Tier-1; a single adverse decision would dent attainment.',
      coverage:'Rebalance model: shifting ~1 FTE from West-North slack to under-served West-South improves projected coverage of high-potential targets at neutral cost.',
      launch:'Launch readiness is 88% overall; medical and market-access workstreams are the laggards. Accelerate those two to protect the date.'}},
});
