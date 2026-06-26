/* ==================================================================================================
   SHARED CONTENT — advanced C360 feature scaffolds                  ►► ENRICH / SPECIALISE HERE ◄◄
   --------------------------------------------------------------------------------------------------
   These sections are PERSONA-AGNOSTIC scaffolds. The engine uses them whenever a persona file does
   NOT define its own version of the section (see C360.resolve in app.config.js). They give the
   advanced life-sciences capabilities a working, documented home today — and are deliberately
   structured so you can specialise them per persona later by copying a block into a persona file.

   TO SPECIALISE FOR A PERSONA: copy the section object below into that persona's `sections:{}` under
   the same key (e.g. add `hcp360:{…}` to content.msl.js). The persona version then overrides this.

   Block schema is documented in js/content.rep.js. Sample data only.
   ================================================================================================ */
C360.registerShared({

  /* ---- HCP 360 — comprehensive HCP overview ---------------------------------------------------- */
  hcp360:{
    summary:'A 360° view of the healthcare professional — consolidated profile, behavioural insights and professional networks unified from every connected source.',
    chips:['Consolidated profile','Behavioural insights','Professional networks'],
    blocks:[
      {type:'header', focus:{av:'MR',name:'Dr. Marcus Reyes',sub:'Endocrinologist · Pacific Metabolic Center · NPI ••• 1827',tag:'Connected HCP Profile'},
        kpis:[{v:'9',k:'Decile',tr:'high potential',tone:'green'},{v:'High',k:'Digital activity',tr:'engaged',tone:'blue'},
              {v:'12',k:'Network ties',tr:'mapped',tone:'purple'},{v:'4',k:'Source systems',tr:'unified',tone:'green'}]},
      {type:'featureGrid', title:'What HCP 360 brings together', items:[
        {icon:'id',    title:'Consolidated HCP profiles', desc:'Merge data from multiple sources for one holistic, de-duplicated view.',
          bullets:['CRM, claims, digital and medical signals','Identity resolution across systems','Single trusted profile of record']},
        {icon:'signal',title:'Behavioural insights',      desc:'Analyse prescribing trends and digital footprints for targeted engagement.',
          bullets:['Prescribing patterns & momentum','Channel & content affinity','Engagement recency & cadence']},
        {icon:'share', title:'Professional networks',     desc:'Understand connections and affiliations to refine outreach strategies.',
          bullets:['Affiliations & institutions','Referral relationships','Peer & mentor ties']}]},
      {type:'note', text:'Enrichment scaffold: specialise this per persona by copying a `hcp360` block into the persona file. Wire each KPI / list to your unified profile source to go live.'},
    ]},

  /* ---- KOL & DOL Identification ---------------------------------------------------------------- */
  koldol:{
    summary:'Identify and rank the influencers who shape decisions in your therapeutic areas — Key and Digital Opinion Leaders — across geographies and specialties.',
    chips:['KOL mapping','DOL insights','Influence ranking'],
    blocks:[
      {type:'featureGrid', title:'Influencer identification', items:[
        {icon:'star',  title:'KOL mapping', desc:'AI identifies and ranks Key Opinion Leaders on influence metrics.',
          bullets:['Publications, trials & guidelines','Speaking & advisory activity','Composite influence score']},
        {icon:'social',title:'DOL insights',desc:'Track digital engagements and discussions to understand Digital Opinion Leader impact.',
          bullets:['Digital reach & engagement','Topic & sentiment footprint','Emerging-voice detection']}]},
      {type:'list', col:7, title:'Ranked influencers — therapeutic area', icon:'star', items:[
        {tone:'purple',title:'Prof. Elena Vásquez',sub:'KOL · Tier 1 · metabolic biomarkers',value:'96',cap:'influence'},
        {tone:'purple',title:'Dr. Hassan Idris',sub:'KOL · Tier 1 · registry research',value:'93',cap:'influence'},
        {tone:'blue',title:'Dr. Naomi Cole',sub:'DOL · high digital reach',value:'88',cap:'influence'},
        {tone:'blue',title:'Dr. Omar Reyes',sub:'Emerging KOL · rising publications',value:'74',cap:'influence'},
        {tone:'green',title:'Dr. Lena Brandt',sub:'KOL · Tier 2 · pediatric genetics',value:'69',cap:'influence'}]},
      {type:'network', col:5, title:'Influence cluster', icon:'share', center:{av:'EV',name:'Prof. Elena Vásquez',role:'Tier-1 KOL'},
        items:[
          {av:'HI',name:'Dr. Hassan Idris',role:'Co-author',tie:'Strong',tone:'green'},
          {av:'NC',name:'Dr. Naomi Cole',role:'DOL · amplifier',tie:'Digital',tone:'blue'},
          {av:'OR',name:'Dr. Omar Reyes',role:'Mentee',tie:'Rising',tone:'purple'}]},
    ]},

  /* ---- Social Listening ------------------------------------------------------------------------ */
  social:{
    summary:'Monitor HCP and KOL online activity to understand trends, preferences and conversations — with real-time updates, sentiment and emerging-topic detection.',
    chips:['Platform integration','Sentiment analysis','Emerging trends'],
    blocks:[
      {type:'featureGrid', title:'Social listening capabilities', items:[
        {icon:'social',title:'Platform integration', desc:'Track HCP and KOL activity across major professional and social platforms.',
          bullets:['Unified activity stream','Verified-account matching','Compliance-aware capture']},
        {icon:'bulb',  title:'Sentiment analysis',   desc:'Assess audience reactions to campaigns and messages.',
          bullets:['Positive / neutral / negative','Topic-level sentiment','Shift detection over time']},
        {icon:'route', title:'Emerging trends',      desc:'Spot new topics and emerging leaders early.',
          bullets:['Trending themes','Rising voices','Early-signal alerts']}]},
      {type:'bars', col:6, title:'Conversation sentiment — therapeutic area', icon:'signal', items:[
        {label:'Real-world outcomes',value:78,max:100,tone:'green',vv:'78% positive'},
        {label:'Treatment burden',value:54,max:100,tone:'amber',vv:'mixed'},
        {label:'Access & cost',value:38,max:100,tone:'rose',vv:'negative skew'},
        {label:'New data readouts',value:71,max:100,tone:'green',vv:'positive'}]},
      {type:'list', col:6, title:'Emerging signals', icon:'route', items:[
        {tone:'green',title:'Registry-outcomes thread gaining traction',sub:'+ shares by 3 Tier-1 KOLs',value:'▲',cap:'trending'},
        {tone:'blue',title:'New DOL emerging',sub:'Dr. Naomi Cole · fast-rising reach',value:'New',cap:'watch'},
        {tone:'amber',title:'Access concern surfacing',sub:'Negative sentiment on cost',value:'■',cap:'monitor'}]},
    ]},

  /* ---- Referral & Network Mapping -------------------------------------------------------------- */
  referral:{
    summary:'Dynamic referral network graphs built from HCP activity and digital behaviour — visualise and optimise the pathways patients travel between providers.',
    chips:['Referral mapping','Treatment pathways','Network optimisation'],
    blocks:[
      {type:'featureGrid', title:'Referral & network mapping', items:[
        {icon:'share', title:'Referral network mapping', desc:'Identify connections and collaboration opportunities across providers.',
          bullets:['Who refers to whom','Strength & direction of ties','Gaps & untapped routes']},
        {icon:'route', title:'Treatment pathways',       desc:'Understand how referrals and patients flow between providers.',
          bullets:['Diagnosis → specialist → treatment','Leakage & drop-off points','Time-to-treatment view']},
        {icon:'target',title:'Network optimisation',     desc:'Adjust strategies to strengthen key referral networks.',
          bullets:['Prioritise high-value hubs','Close referral leakage','Coordinate field + medical']}]},
      {type:'network', col:7, title:'Referral hub — metabolic pathway', icon:'share', center:{av:'PM',name:'Pacific Metabolic Center',role:'Referral hub · treatment site'},
        items:[
          {av:'TL',name:'Dr. Tom Liang',role:'Geneticist · upstream referrer',tie:'High inflow',tone:'green'},
          {av:'CC',name:'Community Clinics (12)',role:'Primary-care feeders',tie:'Volume',tone:'blue'},
          {av:'MR',name:'Dr. Marcus Reyes',role:'Treating endocrinologist',tie:'Converts',tone:'green'},
          {av:'LK',name:'Lakeside Specialty',role:'Cross-referral partner',tie:'Bi-directional',tone:'purple'}]},
      {type:'list', col:5, title:'Optimisation opportunities', icon:'route', items:[
        {tone:'amber',title:'Referral leakage detected',sub:'8% of genetics referrals exit pathway',value:'8%',cap:'leak'},
        {tone:'green',title:'Strengthen Liang → Reyes route',sub:'High-value, high-conversion tie',value:'▲',cap:'grow'},
        {tone:'blue',title:'Activate community feeders',sub:'12 clinics, under-engaged',value:'12',cap:'expand'}]},
    ]},

  /* ---- Territory & Route Plan (Execution) — where to be, and the optimised route ---------------- */
  territory:{
    summary:'Plan where to be and who to see. Territory coverage and an optimised route built from journey analytics and segment insights — closing the loop back to your objectives (the Cadence in 5C).',
    chips:['Territory coverage','Optimised route','Journey-driven','Closes the loop'],
    blocks:[
      {type:'header', kpis:[{v:'12',k:'Planned visits',tr:'this week',tone:'green'},{v:'3',k:'Priority clusters',tr:'by your objectives',tone:'purple'},
              {v:'88%',k:'High-value coverage',tr:'+6%',tone:'green'},{v:'1',k:'Coverage gap',tr:'West edge',tone:'amber'}]},
      {type:'tilemap', col:12, title:'US Territory Map — HCP density', icon:'map',
        densities:{TX:88,PA:74,MA:61,CO:55,MO:48,NC:52,CA:70,MN:64,NY:58,IL:50,OH:46,GA:44,FL:40,WA:42,AZ:38,NJ:54,VA:45,MI:43,NC:52},
        pins:{TX:3,MN:2,CA:2,MA:1,PA:1,NC:1}},
      {type:'bars', col:6, title:'Coverage by cluster', icon:'map', items:[
        {label:'Metro core (Tier-A)',value:92,max:100,tone:'green',vv:'92%'},
        {label:'North suburbs',value:74,max:100,tone:'blue',vv:'74%'},
        {label:'Coastal corridor',value:61,max:100,tone:'amber',vv:'61%'},
        {label:'West edge (gap)',value:38,max:100,tone:'rose',vv:'38%'}]},
      {type:'list', col:6, title:'Optimised route — Thursday', icon:'route', items:[
        {tone:'green',title:'1 · Dr. Marcus Reyes',sub:'09:30 · Pacific Metabolic · field visit',value:'Tier A',cap:'priority'},
        {tone:'blue',title:'2 · Dr. Aisha Patel',sub:'11:00 · share RWE deck',value:'Tier A',cap:'nearby'},
        {tone:'blue',title:'3 · Dr. Tom Liang',sub:'13:30 · referral nurture',value:'Tier B',cap:'en route'},
        {tone:'amber',title:'4 · Dr. Rosa Méndez',sub:'15:00 · re-engage (61d cold)',value:'Tier B',cap:'recover'}]},
      {type:'note', text:'PrecisionNeXT: this route maximises Tier-A face-time and slots in the cooling re-engagement (Dr. Méndez) with only ~6 extra minutes of drive time — closing two of your active objectives in one day. Enrichment scaffold: copy a `territory` block into a persona file to tailor the map/route per role.'},
    ]},

  /* ---- Platform Capabilities (the catalogue from your product brief) --------------------------- */
  capabilities:{
    summary:'C360 works one level above your existing systems — connecting CRM, analytics and point solutions so intelligence and decisions carry through to execution.',
    chips:['Connected platform','Life-sciences ecosystem','Explainable AI at scale'],
    blocks:[
      {type:'valueProps', headline:'Move from dashboards to intelligence in action',
        sub:'C360 connects commercial, medical, patient and content signals into a connected view of customers — so every team understands what matters and what’s next.',
        items:[
          {title:'Built for the life-sciences ecosystem', desc:'Works the way teams work — across brands, markets and functions — inside the systems you already use.'},
          {title:'Operate globally with compliance',      desc:'Built-in guardrails, transparency and control so teams move faster in regulated environments.'},
          {title:'Start with what you need, expand easily',desc:'Integrate with existing data and systems, then expand across use cases and teams without rework.'},
          {title:'Put AI to work safely and at scale',    desc:'Explainable, trusted AI embedded in real workflows so teams act with confidence.'},
          {title:'A connected view of customers',         desc:'Commercial, medical, patient and content signals in one place — what matters and what’s next.'}]},
      {type:'featureGrid', title:'Platform capabilities', items:[
        {icon:'route', title:'Field Planning',     desc:'Unify segmentation, alignment, roster and call planning in one effective-dated workflow.',
          bullets:['Plan faster, adapt to change','Effective-dated changes','Segmentation → execution']},
        {icon:'target',title:'Field Incentives',   desc:'Standardised workflows for plan design, quota refinement, MBO and reporting.',
          bullets:['Across teams, brands, markets','AI-powered operations','Transparent payouts']},
        {icon:'flow',  title:'Customer Engagement', desc:'Orchestrate personalised, compliant omnichannel with agentic AI and next best actions.',
          bullets:['Signal interpretation','Connected field + digital','Measurable lift']},
        {icon:'signal',title:'Analytics & Insights',desc:'Standardised metrics and a trusted, explainable view of performance.',
          bullets:['Commercial + medical + ops data','Explainable insights','Analysis → execution']},
        {icon:'globe', title:'Data Products',       desc:'Life-sciences data products delivering contextual insights from real-world data.',
          bullets:['Improve HCP reach','Contextual, RWD-driven','Engage where it matters']},
        {icon:'spark', title:'Conversational AI',   desc:'A compliant AI assistant turning questions into role-specific next steps.',
          bullets:['Role-specific answers','Contextual & compliant','Clear next steps']}]},
      {type:'featureGrid', title:'Core components of C360', items:[
        {icon:'id',    title:'HCP 360',            desc:'A comprehensive, real-time 360° overview of healthcare professionals.',  bullets:['Consolidated profiles','Behavioural insights','Professional networks']},
        {icon:'star',  title:'KOL & DOL ID',       desc:'Identify and rank the influencers shaping your therapeutic areas.',       bullets:['AI KOL mapping','DOL digital insights','Cross-geography ranking']},
        {icon:'social',title:'Social Listening',   desc:'Monitor HCP & KOL conversations with sentiment and trend detection.',     bullets:['Platform integration','Sentiment analysis','Emerging trends']},
        {icon:'spark', title:'Next Best Actions',  desc:'Personalised recommendations for the most valuable next engagement.',     bullets:['Channel recommendations','Content personalisation','Predictive insights']},
        {icon:'doc',   title:'MSL Collaboration',  desc:'Insights and tools that make Medical Science Liaisons more effective.',   bullets:['Engagement history','Clinical insight sharing','Collaboration tools']},
        {icon:'share', title:'Referral & Pathways',desc:'Dynamic referral graphs to visualise and optimise patient pathways.',     bullets:['Referral mapping','Treatment pathways','Network optimisation']}]},
      {type:'note', text:'Roadmap scaffold: each capability above is a structured, parameter-driven card you can promote into its own nav section and persona content as you build it out.'},
    ]},
});
