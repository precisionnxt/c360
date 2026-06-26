/* ==================================================================================================
   PERSONA CONTENT · SALES REP — Daniel Brooks                       ►► EDIT THIS PERSONA HERE ◄◄
   --------------------------------------------------------------------------------------------------
   ONE FILE = ONE PERSONA. Everything Daniel sees (every section + his PrecisionNeXT intelligence) lives here,
   so a GCPT instruction about the Sales Rep only ever needs to touch this file.

   ════════ BLOCK SCHEMA (the widget vocabulary — same in every persona file) ════════
   A section = { summary:'one-line description shown in the banner', chips:['feature','feature'], blocks:[ … ] }
   Each block has a `type` and an optional `col` width (12 full · 8 · 6 half · 4 third; default 12).

     header   {type:'header', focus:{av,name,sub,tag}, kpis:[{v,k,tr,tone}]}        ← organized header cards
     kpis     {type:'kpis', items:[{v,k,tr,tone}]}
     objectives {type:'objectives', title, items:[{id,icon,title,desc,recommended,default,track}]}  ← Cockpit (selectable)
     insights {type:'insights', col, title, icon, items:[{tone,title,detail,metric,delta,dir}]}      tone: positive|warning|risk|neutral
     actions  {type:'actions', col, title, icon, items:[{priority,title,rationale,confidence,impact,effort,channel}]}  priority: high|med|low
     list     {type:'list', col, title, icon, items:[{tone,title,sub,value,cap}]}
     bars     {type:'bars', col, title, icon, items:[{label,value,max,tone,vv}]}
     steps    {type:'steps', col, title, icon, items:[{status,title,meta,owner,ai}]}                 status: done|active|todo
     table    {type:'table', col, title, icon, cols:[…], rows:[[cell|{chip,text}]]}                  chip: g|b|a|r|p
     network  {type:'network', col, title, icon, center:{av,name,role}, items:[{av,name,role,tie,tone}]}
     featureGrid {type:'featureGrid', title, items:[{icon,title,desc,bullets:[…]}]}
     note     {type:'note', text}
   TONES: green|blue|purple|amber|rose|teal   ·   ICONS: see ICON map in js/engine.js
   ════════════════════════════════════════════════════════════════════════════════
   (All names/numbers are illustrative SAMPLE DATA.)
   ================================================================================================ */
C360.register('rep', {

  /* WHO — shown in the profile menu (top-right avatar). */
  profile: { name:'Daniel Brooks', title:'Senior Therapeutic Specialist', team:'Field Sales · CA-West', av:'DB', accent:'var(--green)' },

  sections: {

    /* ---- COCKPIT (Watchtower) — pick objectives; they personalise what you track --------------- */
    cockpit:{   /* nav label = "Home" — the personalised C360 landing page */
      summary:'Your objectives as a Sales Rep — set what matters; PrecisionNeXT then senses the signals and plans your next moves.',
      chips:['Today’s decision','Field objectives','Next moves'],
      blocks:[
        {type:'decisionflow', col:12, title:'Today’s decision — sensed, decided, acted', icon:'spark',
          signal:{kind:'Buying signal', time:'2h ago', text:'Dr. Reyes re-opened the RWE deck twice in 48h — and 3 of his patients started therapy this quarter — yet you haven’t met in person for 38 days.'},
          insight:{text:'High digital engagement + new starts on a 38-day field gap = a warm but under-served relationship. In this segment, in-person contact is the channel most correlated with continuation.',
                   yours:'You noted Dr. Reyes prefers data-led conversations and tunes out scripted detailing.'},
          avoid:{action:'Fire off another standard promotional email — it’s quick and keeps the “touch” count up.',
                 why:'He’s already engaging digitally; a generic email risks fatigue, ignores the 38-day gap, and clashes with his stated preference. Activity ≠ progress.'},
          recommend:{action:'Book an in-person visit within 7 days, led by the RWE data plus a titration-support plan for the new starts.', confidence:92,
                     why:'Matches his preference, closes the field gap at the point of highest leverage, and protects early continuation.'},
          outcome:{text:'Visit booked for Tuesday 10am — his preferred window. Early-discontinuation risk on the 3 new starts drops and the relationship deepens.'},
          feedback:{text:'Because you told Nexi he prefers data over scripted detailing, it down-weighted the generic email it would otherwise have suggested — and now applies that preference to similar evidence-driven HCPs.'}},
        {type:'kpis', items:[
          {v:'4',k:'Objectives active',desc:'Personalised to your field goals',tone:'green'},
          {v:'42',k:'HCPs tracked',desc:'Across CA-West · 5 segments',tone:'blue',info:'In your book because they sit in an active segment, have an open objective, or PrecisionNeXT flagged a signal. Open Customer Insight for the full list.'},
          {v:'3',k:'Your priorities',desc:'Set by your objectives this week',tone:'purple'},
          {v:'96%',k:'Plan on track',desc:'vs this cycle’s plan',tone:'green'}]},
        {type:'signals', col:12, title:'Signals PrecisionNeXT is sensing', icon:'eye', items:[
          {tone:'green',kind:'Buying signal',hcp:'reyes',title:'Dr. Reyes re-opened the RWE deck',detail:'2nd view in 48h — engagement spike.',time:'2h ago'},
          {tone:'rose',kind:'Declining',hcp:'mendez',title:'Dr. Méndez cooling',detail:'61 days no contact; affinity dropped to Low.',time:'today'},
          {tone:'amber',kind:'Access',go:'territory',title:'Formulary access risk — Northeast',detail:'Prior-auth denials trending up in territory.',time:'1d ago'},
          {tone:'blue',kind:'News',go:'content',title:'New Phase III data published',detail:'Share with engaged HCPs this week.',time:'2d ago'}]},
        {type:'cycleProgress', col:12, title:'Your progress against goals', icon:'check', cycles:[
          {id:'q4-2025', label:'Q4 2025 · closed', tag:'Final', tone:'green',
           note:'Closed cycle — finished at 91% of plan; 3 of 4 goals met or beat target.', items:[
            {label:'Call-plan adherence (Tier-A 2×/mo)',value:94,max:100,tone:'green',vv:'closed · 94%'},
            {label:'Reach — priority HCPs seen',value:88,max:100,tone:'green',vv:'37 of 42'},
            {label:'New patient starts',value:100,max:100,tone:'green',vv:'5 of 5 goal'},
            {label:'Cooling HCPs re-engaged',value:67,max:100,tone:'amber',vv:'2 of 3'}]},
          {id:'q1-2026', label:'Q1 2026 · current', tag:'Live', tone:'blue', current:true,
           note:'Current cycle — tracking 96% to plan with ~6 weeks remaining.', items:[
            {label:'Call-plan adherence (Tier-A 2×/mo)',value:78,max:100,tone:'green',vv:'18 of 23 calls'},
            {label:'Reach — priority HCPs seen',value:74,max:100,tone:'green',vv:'31 of 42'},
            {label:'New patient starts',value:60,max:100,tone:'amber',vv:'3 of 5 goal'},
            {label:'Cooling HCPs re-engaged',value:33,max:100,tone:'rose',vv:'1 of 3'}]},
          {id:'q2-2026', label:'Q2 2026 · planning', tag:'Plan', tone:'purple', future:true,
           note:'Next cycle — proposed targets from Sales Ops. Adjust these before the cycle opens.', items:[
            {label:'Call-plan adherence (Tier-A 2×/mo)',value:0,max:100,tone:'blue',vv:'target · 90%'},
            {label:'Reach — priority HCPs seen',value:0,max:100,tone:'blue',vv:'target · 40 of 44'},
            {label:'New patient starts',value:0,max:100,tone:'blue',vv:'target · 6'},
            {label:'Cooling HCPs re-engaged',value:0,max:100,tone:'blue',vv:'target · 4'}]}]},
        {type:'objectives', title:'Your goals — defaults from Sales Ops, fine-tune to your territory', items:[
          {id:'callplan',icon:'check', title:'Call-plan adherence',     desc:'Tier-A 2×/month, Tier-B 1×/month — keep frequency on plan.',           recommended:true, default:true,  track:'Calls vs target'},
          {id:'reach',   icon:'route', title:'Reach priority HCPs',      desc:'See every High / Medium-priority HCP at least once this cycle.',       recommended:true, default:true,  track:'% priority reached'},
          {id:'starts',  icon:'spark', title:'Grow new patient starts',  desc:'Convert engaged HCPs into initiations; protect early continuation.',   recommended:true, default:true,  track:'New starts / quarter'},
          {id:'reengage',icon:'signal',title:'Re-engage cooling HCPs',   desc:'Reach HCPs whose recency or affinity is slipping.',                    recommended:false, default:true,  track:'Dormant reactivated'},
          {id:'access',  icon:'target',title:'Clear access blockers',    desc:'Resolve PA / formulary blockers for ready-to-start patients.',         recommended:false, default:false, track:'Access-blocked patients'},
          {id:'digital', icon:'doc',   title:'Lift digital between visits',desc:'Grow email / portal interaction between field calls.',               recommended:false, default:false, track:'Digital engagement'}]},
        {type:'note', col:12, text:'Where this goes → your signals and goals drive your PrecisionNeXT Best Actions (act on the prioritised HCPs), and every action opens deeper Customer Insights on that HCP. Open Next Best Actions to start your day.'},
      ]},

    /* ---- NEXT BEST ACTIONS --------------------------------------------------------------------- */
    nba:{
      summary:'Sensed from your active objectives — your prioritised HCPs and the single best next action for each, with explainable confidence and the right channel.',
      chips:['Ranked actions','Explainable AI confidence','Channel & content fit'],
      blocks:[
        {type:'note', col:12, text:'PrecisionNeXT Intelligence (Nexi) ranked these from the live signals against your goals in the Command Center. Act here, then tap any HCP to open their deeper Customer Insights — or tap a metric below to jump to the detail.'},
        {type:'kpis', items:[
          {v:'42',k:'HCPs in plan',tr:'by your goals',tone:'purple',go:'universe',info:{what:'HCPs prioritised for action this cycle.',connects:'Opens Customer Insight',source:'Your call plan + segment priority + live signals.'}},
          {v:'5',k:'High priority',tr:'act now',tone:'rose',go:'territory',info:{what:'HCPs with an urgent signal or an at-risk goal.',connects:'Opens today’s route',source:'Triggers, declines and access alerts.'}},
          {v:'12',k:'Visits this week',tr:'scheduled',tone:'blue',go:'territory',info:{what:'Field visits on your route-optimised plan.',connects:'Opens Territory & Route Plan',source:'Best-window + travel optimisation.'}},
          {v:'3',k:'New starts (Q)',tr:'+3',tone:'green',go:'journey',info:{what:'New patient initiations this quarter.',connects:'Opens Journey Analytics',source:'CRM + dispense data.'}}]},
        {type:'signals', title:'Contextual signals — act on the moment', icon:'eye', items:[
          {tone:'rose',kind:'Trigger',pri:'high',go:'universe',title:'Formulary access alert — Northwestern Memorial',detail:'P&T committee meets in 12 days. 3 of your HCPs flagged access concerns last call.',time:'today',cta:'Brief KAM'},
          {tone:'blue',kind:'Event',pri:'high',title:'AHA 2026 in 21 days',detail:'4 of your Cardiology HCPs attending. A pre-conference touch lifts ROI ~2.4×.',time:'1d ago',cta:'Build plan'},
          {tone:'amber',kind:'News',pri:'med',go:'content',title:'Competitor launched a Q2 campaign',detail:'Targeted at endocrinology — overlap with 4 of your HCPs. Counter-messaging needed.',time:'2d ago',cta:'Counter'},
          {tone:'green',kind:'Trial',pri:'high',hcp:'reyes',title:'New Phase III data published (NEJM)',detail:'Strong efficacy signal; 8 HCPs in your panel asked about long-term safety last call.',time:'2d ago',cta:'Push reprint'},
          {tone:'purple',kind:'Surge',pri:'med',title:'Prescribing surge detected — 5 HCPs',detail:'+25% TRx surge among Immunology HCPs. Reinforce with clinical data.',time:'3d ago',cta:'Reinforce'},
          {tone:'blue',kind:'Inquiry',pri:'med',go:'content',title:'2 unanswered medical inquiries',detail:'Both on MoA differentiation — PrecisionNeXT drafted MLR-compliant responses for review.',time:'3d ago',cta:'Review'}]},
        {type:'hcpcards', variant:'nba', title:'NBA Cockpit — prioritised HCPs (tap a card to open the profile)', icon:'spark'},
        {type:'actions', title:'Precision NeXT Best Actions', icon:'spark', items:[
          {priority:'high',title:'Book an in-person visit within 7 days',confidence:92,impact:'High',effort:'Low',channel:'Field visit',
           rationale:'High email engagement + 3 new starts + a 38-day F2F gap = a warm, under-served relationship. In-person is the channel most correlated with continuation in this segment.'},
          {priority:'med',title:'Share the new dosing & titration one-pager',confidence:84,impact:'Medium',effort:'Low',channel:'Email + leave-behind',
           rationale:'He engaged twice with the RWE deck. The dosing one-pager answers the most common new-starter follow-up question.'},
          {priority:'low',title:'Trigger nurse-educator onboarding touch',confidence:71,impact:'Medium',effort:'Medium',channel:'Patient services',
           rationale:'New starts benefit from onboarding support; reduces early discontinuation risk.'}]},
      ]},

    /* ---- CUSTOMER UNIVERSE --------------------------------------------------------------------- */
    universe:{
      summary:'Your full HCP book of business with AI potential scoring — tier, decile, affinity and the next best action for every customer, filterable from the search bar above.',
      chips:['HCP book of business','AI potential scoring','Next action per HCP'],
      blocks:[
        {type:'filterbar', title:'Filter the universe — therapeutic area, brand, priority', icon:'layers'},
        {type:'hcpgroups', title:'Customer grouping summary', icon:'layers'},
        {type:'hcpcards', variant:'score', title:'Customer scoring — engagement & 360 indices (tap to open the profile)', icon:'users'},
        {type:'table', title:'HCP Customer Universe', icon:'globe',
          cols:['HCP','Specialty','Tier','Decile','Affinity','Last touch','Next best action'],
          rows:[
            ['Dr. Marcus Reyes','Endocrinology',{chip:'g',text:'A'},'9','High','38d',{chip:'a',text:'Field visit'}],
            ['Dr. Aisha Patel','Metabolic Med',{chip:'g',text:'A'},'8','Med','12d',{chip:'b',text:'Share RWE'}],
            ['Dr. Tom Liang','Genetics',{chip:'b',text:'B'},'7','High','5d',{chip:'g',text:'Nurture'}],
            ['Dr. Rosa Méndez','Pediatric Endo',{chip:'b',text:'B'},'6','Low','61d',{chip:'r',text:'Re-engage'}],
            ['Dr. Karl Weiss','Endocrinology',{chip:'a',text:'C'},'4','Med','27d',{chip:'b',text:'Email seq.'}]]},
        {type:'insights', title:'Book-of-business signals', icon:'bulb', items:[
          {tone:'risk',title:'Dr. Méndez cooling',detail:'61 days no contact and affinity slipped to Low — re-engagement priority.',metric:'61d',delta:'no touch',dir:'down'},
          {tone:'positive',title:'Tier-A cluster heating up',detail:'Reyes & Patel both trending up — concentrate field time here this cycle.',metric:'2',delta:'Tier A',dir:'up'}]},
        {type:'table', title:'Prescribing & financial performance — top accounts', icon:'signal',
          cols:['HCP / account','Tier','TRx','NRx','Share','Value','Competitor'],
          rows:[
            ['Dr. Nancy Ramirez · Providence',{chip:'b',text:'T2'},'3,041','210','24%','$2.1M',{chip:'r',text:'NeuroCo 33%'}],
            ['Dr. Stephen Lewis · Intermountain',{chip:'b',text:'T2'},'2,419','140','27%','$1.8M',{chip:'a',text:'CardioRx 30%'}],
            ['Dr. Hassan Idris · Metabolic Inst.',{chip:'g',text:'T1'},'1,920','130','30%','$1.9M',{chip:'g',text:'MetaCo 24%'}],
            ['Dr. Aisha Patel · Lakeside',{chip:'b',text:'T2'},'1,640','110','29%','$1.4M',{chip:'g',text:'MetaCo 25%'}],
            ['Dr. Marcus Reyes · Pacific Metabolic',{chip:'g',text:'T1'},'1,240','86','31%','$1.2M',{chip:'a',text:'MedaCorp 28%'}]]},
        {type:'insights', col:12, title:'Competitive intelligence — your territory', icon:'bulb', items:[
          {tone:'risk',title:'Switch risk concentrated in 3 accounts',detail:'Méndez, Davis and Ramirez show high competitor share and slipping recency — defend now.',metric:'3',delta:'at risk',dir:'down'},
          {tone:'positive',title:'You lead share where you’re present',detail:'Idris, Reyes and Patel hold 29–31% share — your highest-coverage accounts.',metric:'30%',delta:'avg share',dir:'up'}]},
      ]},

    /* ---- JOURNEY ANALYTICS --------------------------------------------------------------------- */
    journey:{
      summary:'See where each HCP sits in the adoption journey and which transitions are happening now — so you invest field time where momentum (or risk) is highest.',
      chips:['Individual journey','Adoption funnel','Stage transitions'],
      blocks:[
        {type:'journeyprofile', hcp:'ramirez', npi:'NPI 1000206142', location:'Boston, MA', ta:'Neuroscience', segment:'A · Champion', stage:'Engage', stageIndex:2, identity:79, consent:'No', score:96, activities:7, scoreNote:'Across all HCPs you engaged with, this one is in the top decile of overall engagement.'},
        {type:'bars', col:6, title:'Adoption funnel — your territory', icon:'route', items:[
          {label:'Aware',value:42,max:42,tone:'blue',vv:'42'},{label:'Engaged',value:28,max:42,tone:'blue',vv:'28'},
          {label:'Trialing',value:14,max:42,tone:'green',vv:'14'},{label:'Prescribing',value:9,max:42,tone:'green',vv:'9'},
          {label:'Advocate',value:3,max:42,tone:'purple',vv:'3'}]},
        {type:'list', col:6, title:'Stage transitions this week', icon:'route', items:[
          {tone:'green',title:'Dr. Reyes → Prescribing',sub:'3rd patient start confirmed',value:'▲',cap:'advanced'},
          {tone:'blue',title:'Dr. Patel → Trialing',sub:'First sample request',value:'▲',cap:'advanced'},
          {tone:'amber',title:'Dr. Méndez → at risk',sub:'Stalled in Engaged 2 cycles',value:'■',cap:'watch'}]},
        {type:'note', text:'PrecisionNeXT: Reyes is one advocacy behaviour (peer referral) from Tier-A advocate. A satisfied-patient case study is the recommended nudge.'},
      ]},

    /* ---- SEGMENT INSIGHTS ---------------------------------------------------------------------- */
    segments:{
      summary:'Micro-segments in your territory and the play that works for each — so messaging and channel match how each group of HCPs actually decides.',
      chips:['Micro-segments','Segment plays','Conversion lift'],
      blocks:[
        {type:'list', col:6, title:'Your HCP micro-segments', icon:'layers', items:[
          {tone:'green',title:'Evidence-Driven Adopters',sub:'Respond to RWE + dosing data',value:'9',cap:'HCPs'},
          {tone:'blue',title:'Cautious Pragmatists',sub:'Need peer proof + support',value:'13',cap:'HCPs'},
          {tone:'amber',title:'Access-Constrained',sub:'Blocked by formulary/PA',value:'7',cap:'HCPs'},
          {tone:'purple',title:'Emerging Advocates',sub:'Ready to champion',value:'3',cap:'HCPs'}]},
        {type:'insights', col:6, title:'Segment plays', icon:'bulb', items:[
          {tone:'positive',title:'Evidence-Driven → lead with data',detail:'Highest conversion when opened with head-to-head RWE.',metric:'3.1×',delta:'conv.',dir:'up'},
          {tone:'neutral',title:'Pragmatists → peer proof',detail:'Case studies + nurse support move this group best.',metric:'+',delta:'peer',dir:'up'},
          {tone:'warning',title:'Access-Constrained → enablement',detail:'Pair with reimbursement support before clinical messaging.',metric:'7',delta:'blocked',dir:'down'}]},
      ]},

    /* ---- 360° INFLUENCE NETWORK ---------------------------------------------------------------- */
    influence:{
      summary:'Map who shapes your key HCP’s decisions — mentors, referrers and care-team gatekeepers — so you engage the people behind the prescriber, not just the prescriber.',
      chips:['Influence map','Referral ties','Coordinated touch'],
      blocks:[
        {type:'graph', col:12, title:'360° Influence Network — therapeutic-area clusters', icon:'share'},
        {type:'network', col:6, title:'Dr. Reyes — influence map', icon:'share', center:{av:'MR',name:'Dr. Marcus Reyes',role:'Endocrinologist · decision-maker'},
          items:[
            {av:'EV',name:'Prof. Elena Vásquez',role:'Regional KOL · former mentor',tie:'Strong',tone:'green'},
            {av:'NP',name:'Nurse Pam Ortiz',role:'Care-team gatekeeper',tie:'Daily',tone:'blue'},
            {av:'TL',name:'Dr. Tom Liang',role:'Referring geneticist',tie:'Referrals',tone:'blue'},
            {av:'PD',name:'Pharmacy Director',role:'Formulary influence',tie:'Indirect',tone:'amber'}]},
        {type:'note', col:6, text:'PrecisionNeXT: the fastest path to lifting Reyes is via Prof. Vásquez (former mentor, Tier-1 KOL). A coordinated MSL scientific exchange would reinforce your field message.'},
      ]},

    /* ---- DIGITAL AFFINITY ---------------------------------------------------------------------- */
    affinity:{
      summary:'Channel and content affinity per HCP — the signals that tell you how and with what each customer most wants to engage.',
      chips:['Channel affinity','Content affinity','Personalisation'],
      blocks:[
        {type:'bars', col:6, title:'Dr. Reyes — channel affinity', icon:'signal', items:[
          {label:'In-person',value:88,max:100,tone:'green',vv:'88'},{label:'Email',value:74,max:100,tone:'blue',vv:'74'},
          {label:'Web / portal',value:51,max:100,tone:'blue',vv:'51'},{label:'Virtual call',value:33,max:100,tone:'amber',vv:'33'},
          {label:'Conference',value:62,max:100,tone:'purple',vv:'62'}]},
        {type:'bars', col:6, title:'Content affinity', icon:'signal', items:[
          {label:'Real-world evidence',value:91,max:100,tone:'green',vv:'91'},{label:'Dosing / titration',value:80,max:100,tone:'green',vv:'80'},
          {label:'Patient support',value:58,max:100,tone:'blue',vv:'58'},{label:'Mechanism of action',value:40,max:100,tone:'amber',vv:'40'}]},
        {type:'bars', col:6, title:'Best contact windows — your panel', icon:'signal', items:[
          {label:'Tue 10–12 AM',value:34,max:34,tone:'green',vv:'34 HCPs'},
          {label:'Thu 2–4 PM',value:27,max:34,tone:'blue',vv:'27'},
          {label:'Wed 9–11 AM',value:21,max:34,tone:'blue',vv:'21'},
          {label:'Mon 4–6 PM',value:18,max:34,tone:'amber',vv:'18'},
          {label:'Fri 1–3 PM',value:11,max:34,tone:'amber',vv:'11'}]},
        {type:'note', col:6, text:'PrecisionNeXT suggests: re-time your next email send to Tuesday 10 AM — projected +12% open rate across 34 HCPs.'},
        {type:'weekplan', title:'This week’s engagement plan — route-optimised call & cadence', icon:'flow', days:[
          {day:'Mon',slots:'3 slots',items:[{tone:'blue',kind:'AM Visit',name:'Dr. Nancy Ramirez',sub:'Neurology · Boston',action:'Deliver Phase III efficacy data'},{tone:'amber',kind:'PM Visit',name:'Dr. Frances Parker',sub:'Rheumatology · Denver',action:'Address formulary access'},{tone:'green',kind:'Digital',name:'Dr. Ronald Moore',sub:'Internal Med · Minneapolis',action:'Co-create speaker program'}]},
          {day:'Tue',slots:'3 slots',items:[{tone:'blue',kind:'AM Visit',name:'Dr. Stephen Lewis',sub:'Internal Med · Cleveland',action:'In-person visit within 7 days'},{tone:'amber',kind:'PM Visit',name:'Dr. David Taylor',sub:'Dermatology · Dallas',action:'In-person visit within 7 days'},{tone:'green',kind:'Digital',name:'Dr. Kimberly Thompson',sub:'Gastro · San Jose',action:'Advisory board invite'}]},
          {day:'Wed',slots:'3 slots',items:[{tone:'blue',kind:'AM Visit',name:'Dr. Daniel Davis',sub:'Immunology · Tampa',action:'Deliver Phase III efficacy data'},{tone:'amber',kind:'PM Visit',name:'Dr. Lisa Collins',sub:'Hematology · Kansas City',action:'In-person visit within 7 days'},{tone:'green',kind:'Digital',name:'Dr. Catherine Green',sub:'Gastro · San Jose',action:'Advisory board invite'}]},
          {day:'Thu',slots:'3 slots',items:[{tone:'blue',kind:'AM Visit',name:'Dr. Betty Wright',sub:'Dermatology · Atlanta',action:'Deliver Phase III efficacy data'},{tone:'amber',kind:'PM Visit',name:'Dr. Anil Jackson',sub:'Rheumatology · Charlotte',action:'In-person visit within 7 days'},{tone:'green',kind:'Digital',name:'Dr. James Anderson',sub:'Pulmonology · Detroit',action:'Co-create speaker program'}]},
          {day:'Fri',slots:'3 slots',items:[{tone:'rose',kind:'AM Visit',name:'Dr. Larry Miller',sub:'Rheumatology · Denver',action:'Address formulary access urgently'},{tone:'blue',kind:'PM Visit',name:'Dr. Kevin White',sub:'Dermatology · Minneapolis',action:'Deliver Phase III efficacy data'},{tone:'green',kind:'Digital',name:'Dr. Mark Miller',sub:'Nephrology · New York',action:'Advisory board invite'}]}]},
        {type:'note', col:12, text:'PrecisionNeXT optimisation notes — route optimised (Mon & Tue cluster in Boston & NYC, saves ~2 hrs travel) · best-window timing (4 visits at preferred contact hours) · digital pre-touch (each visit preceded by a warm-up email 48 hrs prior) · compliance check (all HCPs have valid CRM consent).'},
      ]},

    /* ---- EXECUTION PLAN ------------------------------------------------------------------------ */
    execplan:{
      summary:'Your sequenced, AI-assisted next steps for the active customer — what’s done, what’s in progress and what PrecisionNeXT recommends next, with owners and timing.',
      chips:['Sequenced steps','AI-assisted','Owners & timing'],
      blocks:[
        {type:'steps', title:'Execution Plan — Dr. Reyes', icon:'check', items:[
          {status:'done',title:'Sent updated dosing guide',meta:'Opened 2×',owner:'You',ai:false},
          {status:'active',title:'Request in-person meeting slot',meta:'Due in 2 days · 3 slots found',owner:'You',ai:true},
          {status:'todo',title:'Prepare RWE talking points',meta:'PrecisionNeXT drafted · review needed',owner:'You',ai:true},
          {status:'todo',title:'Loop in nurse educator',meta:'After visit confirmed',owner:'Patient Svcs',ai:false}]},
      ]},

    /* ---- CONTENT RELEVANCE --------------------------------------------------------------------- */
    content:{
      summary:'Approved assets ranked for this HCP by affinity and context — so every touch uses the content most likely to land.',
      chips:['Ranked assets','Approved content','Affinity match'],
      blocks:[
        {type:'list', title:'Content Relevance — Dr. Reyes', icon:'doc', items:[
          {tone:'green',title:'Real-World Outcomes — 12-month registry',sub:'Approved · matches 91% RWE affinity',value:'96',cap:'relevance'},
          {tone:'green',title:'Dosing & Titration one-pager',sub:'Approved · answers new-starter question',value:'89',cap:'relevance'},
          {tone:'blue',title:'Patient Support & onboarding kit',sub:'Approved · pairs with nurse touch',value:'72',cap:'relevance'},
          {tone:'amber',title:'Mechanism of Action animation',sub:'Low affinity — deprioritise',value:'38',cap:'relevance'}]},
      ]},

    /* ---- ENGAGEMENT ORCHESTRATION -------------------------------------------------------------- */
    orchestration:{
      summary:'A recommended cross-channel cadence that connects field and digital touches into one coherent journey for the customer.',
      chips:['Omnichannel cadence','Field + digital','Sequenced timing'],
      blocks:[
        {type:'list', title:'Engagement Orchestration — next 14 days', icon:'flow', items:[
          {tone:'green',title:'Day 1 · Field visit (in-person)',sub:'Primary · RWE + dosing leave-behind',value:'F2F',cap:'channel'},
          {tone:'blue',title:'Day 3 · Follow-up email',sub:'Recap + registry asset link',value:'Email',cap:'channel'},
          {tone:'purple',title:'Day 7 · MSL scientific exchange',sub:'Coordinated via Prof. Vásquez',value:'MSL',cap:'channel'},
          {tone:'blue',title:'Day 12 · Nurse-educator onboarding',sub:'For confirmed new starts',value:'PSP',cap:'channel'}]},
      ]},
  },

  /* PrecisionNeXT — this persona's intelligence (opening line, alerts, suggested prompts, answer map). */
  pni:{
    intro:'I’ve scanned Dr. Reyes’ signals. The standout: strong email engagement but a 38-day in-person gap right as 3 patients started. A field visit this week is the highest-leverage move.',
    alerts:[
      {title:'Dr. Reyes re-opened the RWE deck',detail:'2nd view in 48h — buying-signal spike.',time:'2h ago'},
      {title:'Dr. Méndez cooling',detail:'61 days no contact, affinity dropped to Low.',time:'today'}],
    prompts:['Draft the visit request','Why is confidence 92%?','Who influences Dr. Reyes?','What objection should I expect?'],
    answers:{
      draft:'Draft: “Hi Dr. Reyes, congratulations on the new starts this quarter. I’d value 20 minutes in person to walk through titration support and the latest real-world outcomes. I have Tue 10:00 or Thu 14:00 — which works?”',
      confidence:'92% blends three weighted signals: the 38-day F2F gap vs. segment optimum, 3 in-window patient starts, and 74% email engagement. In-person is the channel most correlated with continuation here.',
      influence:'Dr. Reyes is most influenced by Prof. Elena Vásquez (former mentor, Tier-1 KOL) and Nurse Pam Ortiz, his care-team gatekeeper. A coordinated MSL touch via Vásquez would amplify your message.',
      objection:'Most likely objection: titration burden for new starters. Lead with nurse-educator support and the simplified dosing one-pager to de-risk the start.'}},
});
