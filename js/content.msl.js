/* ==================================================================================================
   PERSONA CONTENT · MSL — Dr. Priya Nair                            ►► EDIT THIS PERSONA HERE ◄◄
   One file = one persona. Block schema is documented in js/content.rep.js. Sample data only.
   ================================================================================================ */
C360.register('msl', {

  profile: { name:'Dr. Priya Nair', title:'Medical Science Liaison', team:'Medical Affairs · West', av:'PN', accent:'var(--blue)' },

  sections:{

    /* ---- COCKPIT: MSL objectives center on science, publications, congresses, DOLs ------------- */
    cockpit:{   /* nav label = "Home" — the personalised C360 landing page */
      summary:'Your objectives as an MSL — set what matters; PrecisionNeXT then senses the scientific signals and plans your next moves.',
      chips:['Today’s decision','Medical objectives','Next moves'],
      blocks:[
        {type:'decisionflow', col:12, title:'Today’s decision — sensed, decided, acted', icon:'spark',
          signal:{kind:'Overdue inquiry', time:'today', text:'Prof. Vásquez’s unsolicited medical inquiry on registry outcomes is now 21 days old — the compliance window is closing.'},
          insight:{text:'A timely, balanced response is both a compliance obligation and a high-value scientific touch that can open an advisory-board path.',
                   yours:'You noted she wants limitations and ongoing-study caveats stated upfront, not buried.'},
          recommend:{action:'Deliver a balanced, fully-cited MI response that states limitations and ongoing studies, then offer a follow-up scientific exchange.', confidence:95,
                     why:'Closes the inquiry within SLA, maintains fair balance, and respects her stated preference — deepening the relationship.'},
          outcome:{text:'Inquiry closed in SLA with references logged; Prof. Vásquez accepts a follow-up exchange — the advisory-board conversation opens.'},
          feedback:{text:'Your note that she values stated limitations now shapes Nexi’s default tone for scientific exchanges with evidence-first KOLs.'}},
        {type:'kpis', items:[
          {v:'4',k:'Objectives active',desc:'Personalised to your medical goals',tone:'blue'},
          {v:'18',k:'KOLs tracked',desc:'Across your scientific panel',tone:'blue',info:'On your panel because they match your therapeutic area, publish actively, or have an open scientific objective. Open Customer Insight for the list.'},
          {v:'1',k:'Open inquiry',desc:'Closing within 7 days',tone:'amber'},
          {v:'2',k:'Upcoming congresses',desc:'Exchanges to plan',tone:'purple'}]},
        {type:'signals', col:12, title:'Signals PrecisionNeXT is sensing', icon:'eye', items:[
          {tone:'rose',kind:'Overdue',title:'Medical inquiry ageing — 21 days',detail:'Prof. Vásquez · registry outcomes.',time:'today'},
          {tone:'green',kind:'Publication',title:'Dr. O. Reyes published 3× this year',detail:'Emerging KOL — worth early mapping.',time:'1d ago'},
          {tone:'blue',kind:'Congress',title:'AHA in 21 days',detail:'Plan scientific exchanges around sessions.',time:'2d ago'},
          {tone:'purple',kind:'Insight',title:'Rising interest in real-world outcomes',detail:'Across your KOL panel discussions.',time:'3d ago'}]},
        {type:'cycleProgress', col:12, title:'Your progress against goals', icon:'home', cycles:[
          {id:'q4-2025', label:'Q4 2025 · closed', tag:'Final', tone:'green', note:'Closed cycle — strong scientific engagement; all objectives met or beat.', items:[
            {label:'Inquiries closed in SLA',value:80,max:100,tone:'green',vv:'4 of 5'},
            {label:'Active KOL collaborations',value:80,max:100,tone:'green',vv:'4 of 5'},
            {label:'Publications tracked',value:100,max:100,tone:'green',vv:'3 / 3'},
            {label:'Congress exchanges',value:100,max:100,tone:'green',vv:'2 of 2'}]},
          {id:'q1-2026', label:'Q1 2026 · current', tag:'Live', tone:'blue', current:true, note:'Current cycle — one inquiry ageing; collaborations building.', items:[
            {label:'Inquiries closed in SLA',value:67,max:100,tone:'amber',vv:'2 of 3'},
            {label:'Active KOL collaborations',value:60,max:100,tone:'green',vv:'3 of 5'},
            {label:'Publications tracked',value:100,max:100,tone:'green',vv:'2 / 2'},
            {label:'Congress plans ready',value:50,max:100,tone:'blue',vv:'1 of 2'}]},
          {id:'q2-2026', label:'Q2 2026 · planning', tag:'Plan', tone:'purple', future:true, note:'Next cycle — proposed medical targets. Adjust before the cycle opens.', items:[
            {label:'Inquiries closed in SLA',value:0,max:100,tone:'blue',vv:'target · 95%'},
            {label:'Active KOL collaborations',value:0,max:100,tone:'blue',vv:'target · 5'},
            {label:'Publications tracked',value:0,max:100,tone:'blue',vv:'target · 4'},
            {label:'Congress exchanges',value:0,max:100,tone:'blue',vv:'target · 3'}]}]},
        {type:'objectives', title:'Your medical objectives — tap to configure', items:[
          {id:'inquiries',icon:'check', title:'Close scientific inquiries on time', desc:'Resolve unsolicited medical inquiries within compliance windows.', recommended:true, default:true,  track:'Open MIs'},
          {id:'collab',   icon:'share', title:'Advance KOL collaboration',          desc:'Progress advisory boards, studies and co-authorship.',           recommended:true, default:true,  track:'Active collaborations'},
          {id:'pubs',     icon:'doc',   title:'Track specialization publications',  desc:'Monitor KOL articles and new evidence in your therapeutic area.', recommended:false, default:true,  track:'New publications'},
          {id:'congress', icon:'star',  title:'Engage at seminars & congresses',    desc:'Plan scientific exchanges around presentations and sessions.',    recommended:false, default:false, track:'Congress exchanges'},
          {id:'dol',      icon:'social',title:'Map emerging DOLs',                  desc:'Identify rising digital opinion leaders shaping the discourse.',  recommended:false, default:false, track:'Emerging DOLs'},
          {id:'insights', icon:'bulb',  title:'Capture & route medical insights',   desc:'Log field insights and feed medical strategy.',                  recommended:false, default:false, track:'Insights logged'}]},
        {type:'list', col:6, title:'What you’re tracking', icon:'target', items:[
          {tone:'amber',title:'Open medical inquiry',sub:'Objective · Close inquiries',value:'21d',cap:'ageing'},
          {tone:'green',title:'Active collaborations',sub:'Objective · KOL collaboration',value:'3',cap:'in flight'},
          {tone:'blue',title:'New publications',sub:'Objective · Track articles',value:'2',cap:'6 mo'}]},
        {type:'note', col:6, text:'PrecisionNeXT: with your objectives, the top priority is closing Prof. Vásquez’s 21-day inquiry — a compliance deadline and a high-value scientific touch. See Next Best Actions.'},
      ]},

    nba:{
      summary:'Sensed from your active objectives — your prioritised KOLs and the best next scientific action for each, compliance-aware and explainable.',
      chips:['Scientific priorities','Compliance-aware','Explainable rationale'],
      blocks:[
        {type:'note', col:12, text:'Sensed from your active objectives — these scientific moves come from the signals on your KOL panel. Act here, then open any KOL’s 360 for their journey, influence and publications.'},
        {type:'kpis', items:[{v:'18',k:'KOLs in plan',tr:'by your goals',tone:'purple'},{v:'2',k:'Tier-1 priority',tr:'act now',tone:'rose'},
                {v:'1',k:'Overdue inquiry',tr:'closing',tone:'amber'},{v:'2',k:'Congresses',tr:'planned',tone:'green'}]},
        {type:'hcpcards', variant:'nba', title:'NBA Cockpit — prioritised KOLs (tap a card to open the profile)', icon:'spark'},
        {type:'actions', title:'Precision NeXT Best Actions', icon:'spark', items:[
          {priority:'high',title:'Close the open medical inquiry',confidence:95,impact:'High',effort:'Low',channel:'Medical exchange',
           rationale:'A 21-day-old unsolicited inquiry on registry outcomes is a compliance priority and a high-value scientific opportunity. Timely, balanced response deepens the relationship.'},
          {priority:'med',title:'Extend an advisory board invitation',confidence:88,impact:'High',effort:'Medium',channel:'Formal invite',
           rationale:'94% fit with the RWE advisory scope; her recent publications add panel credibility.'},
          {priority:'low',title:'Plan a congress scientific exchange',confidence:79,impact:'Medium',effort:'Low',channel:'In-person (congress)',
           rationale:'She is presenting; a planned non-promotional exchange captures fresh data interest at low effort.'}]},
      ]},

    universe:{
      summary:'Your KOL portfolio with scientific standing — influence tier, publication activity and engagement status for every key opinion leader you steward.',
      chips:['KOL portfolio','Influence tiers','Publication activity'],
      blocks:[
        {type:'filterbar', title:'Filter the universe — therapeutic area, brand, priority', icon:'layers'},
        {type:'hcpgroups', title:'Customer grouping summary', icon:'layers'},
        {type:'hcpcards', variant:'score', title:'Customer scoring — engagement & 360 indices (tap to open the profile)', icon:'users'},
        {type:'table', title:'KOL Universe', icon:'globe',
          cols:['KOL','Institution','Influence','Pubs (12mo)','Engagement','Status'],
          rows:[
            ['Prof. Elena Vásquez','University Research Hosp.',{chip:'p',text:'Tier 1'},'4','Active',{chip:'a',text:'Open MI'}],
            ['Dr. Hassan Idris','Metabolic Institute',{chip:'p',text:'Tier 1'},'6','Active',{chip:'g',text:'Engaged'}],
            ['Dr. Lena Brandt','Children’s Genetics Ctr',{chip:'b',text:'Tier 2'},'2','Moderate',{chip:'b',text:'Nurture'}],
            ['Dr. Omar Reyes','State University','—','3','New',{chip:'g',text:'Map'}],
            ['Dr. Yuki Tanaka','Regional Med Center',{chip:'b',text:'Tier 2'},'1','Low',{chip:'r',text:'Re-engage'}]]},
        {type:'insights', title:'KOL portfolio signals', icon:'bulb', items:[
          {tone:'positive',title:'Rising star detected',detail:'Dr. Omar Reyes published 3× this year — emerging KOL worth early mapping.',metric:'3',delta:'pubs',dir:'up'},
          {tone:'warning',title:'Dr. Tanaka disengaging',detail:'No scientific exchange in 2 quarters; influence slipping.',metric:'2Q',delta:'quiet',dir:'down'}]},
        {type:'spotlight', col:5, title:'KOL spotlight — most influential', icon:'star', items:[
          {init:'EV',name:'Prof. Elena Vásquez',sub:'Metabolic · 18 conns · 21 pubs',score:99,tone:'purple'},
          {init:'HI',name:'Dr. Hassan Idris',sub:'Metabolic · 16 conns · 23 pubs',score:98,tone:'purple'},
          {init:'NC',name:'Dr. Naomi Cole',sub:'Neurology · DOL · high digital reach',score:92,tone:'blue'},
          {init:'LB',name:'Dr. Lena Brandt',sub:'Pediatric genetics · Tier 2',score:84,tone:'green'},
          {init:'OR',name:'Dr. Omar Reyes',sub:'Emerging KOL · rising publications',score:74,tone:'amber'}]},
        {type:'pubfeed', col:7, title:'KOL publication feed — your therapeutic area', icon:'doc', items:[
          {kol:'Prof. Elena Vásquez',title:'Long-term registry outcomes in metabolic disease',journal:'NEJM',time:'3d ago',tone:'purple'},
          {kol:'Dr. Hassan Idris',title:'Biomarker stratification in enzyme-replacement therapy',journal:'Lancet',time:'1w ago',tone:'blue'},
          {kol:'Dr. Omar Reyes',title:'Real-world evidence for early therapy initiation',journal:'JAMA',time:'2w ago',tone:'green'},
          {kol:'Dr. Naomi Cole',title:'Digital adherence patterns in chronic care',journal:'Blood',time:'3w ago',tone:'rose'}]},
      ]},

    journey:{
      summary:'KOL relationship maturity across your panel — from identified to advocate — so you can advance each scientific relationship deliberately.',
      chips:['Relationship maturity','Scientific journey','Advocacy track'],
      blocks:[
        {type:'bars', col:6, title:'Engagement maturity', icon:'route', items:[
          {label:'Identified',value:18,max:18,tone:'blue',vv:'18'},{label:'Profiled',value:13,max:18,tone:'blue',vv:'13'},
          {label:'Engaged',value:9,max:18,tone:'green',vv:'9'},{label:'Collaborating',value:4,max:18,tone:'green',vv:'4'},
          {label:'Advocate',value:2,max:18,tone:'purple',vv:'2'}]},
        {type:'list', col:6, title:'Scientific journey moves', icon:'route', items:[
          {tone:'green',title:'Prof. Vásquez → Collaborating',sub:'Advisory invite pending',value:'▲',cap:'advancing'},
          {tone:'blue',title:'Dr. Idris → Advocate track',sub:'Co-authored RWE abstract',value:'▲',cap:'advancing'},
          {tone:'amber',title:'Dr. Tanaka → re-engage',sub:'Slipped Engaged → Profiled',value:'▼',cap:'declining'}]},
      ]},

    segments:{
      summary:'KOL archetypes and the scientific play that fits each — innovators, educators, emerging voices — so engagement matches motivation.',
      chips:['KOL archetypes','Tailored plays','Trajectory'],
      blocks:[
        {type:'list', col:6, title:'KOL archetypes', icon:'layers', items:[
          {tone:'purple',title:'Research Innovators',sub:'Data-generating, study-interested',value:'5',cap:'KOLs'},
          {tone:'green',title:'Clinical Educators',sub:'Guideline & teaching influence',value:'6',cap:'KOLs'},
          {tone:'blue',title:'Emerging Voices',sub:'Early-career, high trajectory',value:'4',cap:'KOLs'},
          {tone:'amber',title:'Dormant',sub:'Low recent engagement',value:'3',cap:'KOLs'}]},
        {type:'insights', col:6, title:'Archetype plays', icon:'bulb', items:[
          {tone:'positive',title:'Innovators → study collaboration',detail:'Offer investigator-initiated study & registry roles.',metric:'IIS',delta:'fit',dir:'up'},
          {tone:'neutral',title:'Educators → advisory & symposia',detail:'Invite to advisory boards and medical education.',metric:'+',delta:'reach',dir:'up'},
          {tone:'warning',title:'Dormant → light-touch revive',detail:'Share new data; rebuild cadence before asks.',metric:'3',delta:'revive',dir:'down'}]},
      ]},

    influence:{
      summary:'The scientific network around your lead KOL — co-authors, mentees and society roles — revealing where advocacy compounds.',
      chips:['Scientific network','Co-authorship','Society influence'],
      blocks:[
        {type:'graph', col:12, title:'360° Influence Network — therapeutic-area clusters', icon:'share'},
        {type:'network', col:6, title:'Prof. Vásquez — scientific network', icon:'share', center:{av:'EV',name:'Prof. Elena Vásquez',role:'Tier-1 KOL · metabolic biomarkers'},
          items:[
            {av:'HI',name:'Dr. Hassan Idris',role:'Co-author · Tier-1 KOL',tie:'Co-pub',tone:'green'},
            {av:'OR',name:'Dr. Omar Reyes',role:'Mentee · rising star',tie:'Mentors',tone:'blue'},
            {av:'MR',name:'Dr. Marcus Reyes',role:'Community endocrinologist',tie:'Advises',tone:'blue'},
            {av:'GC',name:'Guidelines Committee',role:'Society working group',tie:'Member',tone:'purple'}]},
        {type:'note', col:6, text:'PrecisionNeXT: Vásquez sits on the guidelines working group and mentors a rising star — her advocacy compounds. Co-authoring the registry abstract with Dr. Idris strengthens the cluster.'},
      ]},

    affinity:{
      summary:'Scientific-content and exchange-channel affinity for your KOL — what evidence resonates and how they prefer to engage.',
      chips:['Content affinity','Exchange channels','Evidence fit'],
      blocks:[
        {type:'bars', col:6, title:'Prof. Vásquez — content affinity', icon:'signal', items:[
          {label:'Registry / RWE data',value:93,max:100,tone:'green',vv:'93'},{label:'Mechanistic science',value:84,max:100,tone:'green',vv:'84'},
          {label:'Clinical trial design',value:77,max:100,tone:'blue',vv:'77'},{label:'Health economics',value:45,max:100,tone:'amber',vv:'45'}]},
        {type:'bars', col:6, title:'Exchange channel affinity', icon:'signal', items:[
          {label:'In-person / congress',value:90,max:100,tone:'green',vv:'90'},{label:'Advisory boards',value:82,max:100,tone:'green',vv:'82'},
          {label:'Virtual exchange',value:60,max:100,tone:'blue',vv:'60'},{label:'Email',value:48,max:100,tone:'amber',vv:'48'}]},
      ]},

    execplan:{
      summary:'Your compliant scientific-engagement plan — sequenced steps from inquiry response to advisory and congress, with AI-assembled references.',
      chips:['Compliant sequence','AI-assembled refs','Owners & timing'],
      blocks:[
        {type:'steps', title:'Execution Plan — Prof. Vásquez', icon:'check', items:[
          {status:'done',title:'Logged unsolicited inquiry in MI system',meta:'Routed to Medical Information',owner:'You',ai:false},
          {status:'active',title:'Draft compliant scientific response',meta:'PrecisionNeXT compiled registry references',owner:'You',ai:true},
          {status:'todo',title:'Prepare advisory board rationale',meta:'Fit score + publication summary ready',owner:'You',ai:true},
          {status:'todo',title:'Schedule congress exchange',meta:'Align to session calendar',owner:'You',ai:false}]},
      ]},

    content:{
      summary:'Approved scientific resources ranked for this KOL — registry data, mechanistic reviews and advisory materials matched to her interests.',
      chips:['Approved science','Med-reviewed','Affinity match'],
      blocks:[
        {type:'list', title:'Content Relevance — Prof. Vásquez', icon:'doc', items:[
          {tone:'green',title:'12-month registry dataset (MI pack)',sub:'Med-approved · answers her inquiry',value:'97',cap:'relevance'},
          {tone:'green',title:'Biomarker mechanistic review',sub:'Med-approved · 84% affinity',value:'85',cap:'relevance'},
          {tone:'blue',title:'Advisory board concept brief',sub:'For the formal invitation',value:'78',cap:'relevance'},
          {tone:'amber',title:'Health-economics dossier',sub:'Low affinity — not now',value:'41',cap:'relevance'}]},
      ]},

    orchestration:{
      summary:'A sequenced, non-promotional touch plan that connects inquiry, advisory and congress into one coherent scientific journey.',
      chips:['Non-promotional','Sequenced exchange','Congress-aligned'],
      blocks:[
        {type:'list', title:'Engagement Orchestration — next 30 days', icon:'flow', items:[
          {tone:'green',title:'Day 2 · Deliver MI response',sub:'Compliant, balanced, cited',value:'MI',cap:'exchange'},
          {tone:'purple',title:'Day 7 · Advisory invitation',sub:'Formal invite + concept brief',value:'Advisory',cap:'exchange'},
          {tone:'green',title:'Day 18 · Congress scientific exchange',sub:'On-site, session-aligned',value:'F2F',cap:'exchange'},
          {tone:'blue',title:'Day 28 · Co-publication check-in',sub:'Registry abstract with Dr. Idris',value:'Research',cap:'exchange'}]},
      ]},
  },

  pni:{
    intro:'Prof. Vásquez has a 21-day-old open medical inquiry on registry outcomes — the priority for both compliance and the relationship. I’ve gathered the references.',
    alerts:[
      {title:'Open MI ageing',detail:'Registry-outcomes inquiry now 21 days — window closing.',time:'today'},
      {title:'Rising-star KOL detected',detail:'Dr. Omar Reyes published 3× this year.',time:'1d ago'}],
    prompts:['Outline the MI response','Why is she advisory-board fit?','Map her scientific network','Prep congress talking points'],
    answers:{
      outline:'Compliant outline: 1) Acknowledge the registry-outcomes question. 2) Provide balanced, on-label data with citations. 3) Note limitations + ongoing studies. 4) Offer a follow-up exchange. Non-promotional, fair balance maintained.',
      fit:'94% fit: her metabolic-biomarker publications and KOL standing match the RWE advisory scope; recent podium activity adds panel credibility.',
      network:'Her network: co-author Dr. Hassan Idris (Tier-1), mentee Dr. Omar Reyes (rising star), and a guidelines working-group seat. Advocacy here compounds across the cluster.',
      congress:'Congress: focus on real-world registry signals, invite her perspective on long-term outcomes, keep it scientific exchange, and capture insights for medical strategy.'}},
});
