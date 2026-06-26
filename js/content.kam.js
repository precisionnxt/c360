/* ==================================================================================================
   PERSONA CONTENT · KAM — Marcus Feldman                            ►► EDIT THIS PERSONA HERE ◄◄
   One file = one persona. Block schema documented in js/content.rep.js. Sample data only.
   ================================================================================================ */
C360.register('kam', {

  profile: { name:'Marcus Feldman', title:'Key Account Manager', team:'Strategic Accounts', av:'MF', accent:'var(--green)' },

  sections:{

    cockpit:{   /* nav label = "Home" — the personalised C360 landing page */
      summary:'Your objectives as a Key Account Manager — set what matters; PrecisionNeXT then senses the access & growth signals and plans your next moves.',
      chips:['Today’s decision','Account objectives','Next moves'],
      blocks:[
        {type:'decisionflow', col:12, title:'Today’s decision — sensed, decided, acted', icon:'spark',
          signal:{kind:'Access risk', time:'today', text:'Northstar’s P&T formulary review is 8 weeks out and the pharmacy director — the economic buyer — is still unmapped (37% of the decision unit unengaged).'},
          insight:{text:'The committee decides on budget; an unengaged economic buyer is the single biggest access risk to the account this quarter.',
                   yours:'You know Dr. Esposito (Chief of Endocrinology, an existing champion) sits on the same committee and has the pharmacy director’s ear.'},
          recommend:{action:'Ask Dr. Esposito for a warm introduction to the pharmacy director, then lead that meeting with a budget-impact model.', confidence:90,
                     why:'Reaches the economic buyer through a trusted relationship and speaks to the value driver that actually moves the formulary vote.'},
          outcome:{text:'Warm intro secured; pharmacy-director meeting booked inside 2 weeks with a budget-impact pack — access defended ahead of the review.'},
          feedback:{text:'Your relationship insight (Esposito ↔ pharmacy director) gave Nexi a warm path it couldn’t see in CRM, and it now looks for champion-to-buyer routes on every at-risk account.'}},
        {type:'kpis', items:[
          {v:'4',k:'Objectives active',desc:'Personalised to your account goals',tone:'green'},
          {v:'5',k:'Accounts tracked',desc:'Your strategic portfolio',tone:'blue',info:'In your portfolio by potential, access status and renewal timing. Open Customer Insight for the account list.'},
          {v:'2',k:'At-risk reviews',desc:'Formulary decisions in Q3',tone:'rose'},
          {v:'+9%',k:'Portfolio growth',desc:'vs prior quarter',tone:'green'}]},
        {type:'signals', col:12, title:'Signals PrecisionNeXT is sensing', icon:'eye', items:[
          {tone:'rose',kind:'Access',title:'P&T review in 8 weeks — Northstar',detail:'Pharmacy decision-maker still unmapped.',time:'today'},
          {tone:'amber',kind:'Unmapped',title:'Stakeholder gap',detail:'37% of the decision unit not engaged.',time:'1d ago'},
          {tone:'green',kind:'Growth',title:'Lakeside volume +9%',detail:'Open access — accelerate the growth play.',time:'2d ago'},
          {tone:'blue',kind:'Renewal',title:'Q3 renewal window opening',detail:'Refresh the value story before negotiation.',time:'3d ago'}]},
        {type:'cycleProgress', col:12, title:'Your progress against goals', icon:'home', cycles:[
          {id:'q4-2025', label:'Q4 2025 · closed', tag:'Final', tone:'green', note:'Closed cycle — both reviews defended; growth beat plan.', items:[
            {label:'At-risk reviews defended',value:100,max:100,tone:'green',vv:'2 of 2'},
            {label:'Stakeholder map complete',value:90,max:100,tone:'green',vv:'90%'},
            {label:'Account growth vs goal',value:100,max:100,tone:'green',vv:'+13% / +12%'},
            {label:'Renewals on track',value:100,max:100,tone:'green',vv:'5 of 5'}]},
          {id:'q1-2026', label:'Q1 2026 · current', tag:'Live', tone:'blue', current:true, note:'Current cycle — two reviews open; mapping in progress.', items:[
            {label:'At-risk reviews defended',value:25,max:100,tone:'rose',vv:'0 of 2 closed'},
            {label:'Stakeholder map complete',value:63,max:100,tone:'amber',vv:'63%'},
            {label:'Account growth vs goal',value:75,max:100,tone:'green',vv:'+9% / +12%'},
            {label:'Renewals on track',value:80,max:100,tone:'green',vv:'4 of 5'}]},
          {id:'q2-2026', label:'Q2 2026 · planning', tag:'Plan', tone:'purple', future:true, note:'Next cycle — proposed account targets. Adjust before the cycle opens.', items:[
            {label:'At-risk reviews defended',value:0,max:100,tone:'blue',vv:'target · 2 of 2'},
            {label:'Stakeholder map complete',value:0,max:100,tone:'blue',vv:'target · 95%'},
            {label:'Account growth vs goal',value:0,max:100,tone:'blue',vv:'target · +12%'},
            {label:'Renewals on track',value:0,max:100,tone:'blue',vv:'target · 5 of 5'}]}]},
        {type:'objectives', title:'Your account objectives — tap to configure', items:[
          {id:'access',  icon:'check', title:'Protect formulary access',    desc:'Shape P&T decisions before formulary reviews close.',          recommended:true, default:true,  track:'At-risk reviews'},
          {id:'map',     icon:'share', title:'Complete stakeholder mapping',desc:'Close gaps in the decision-making unit.',                       recommended:true, default:true,  track:'Map completeness'},
          {id:'growth',  icon:'spark', title:'Drive account growth',        desc:'Expand the treatment pathway across sites.',                   recommended:false, default:true,  track:'Account growth %'},
          {id:'renewal', icon:'target',title:'Secure renewals',             desc:'Anchor renewals with a refreshed value story.',                recommended:false, default:false, track:'Renewals on track'},
          {id:'referral',icon:'route', title:'Strengthen referral pathways',desc:'Optimise how patients flow between providers.',                 recommended:false, default:false, track:'Referral volume'},
          {id:'qbr',     icon:'doc',   title:'Run executive QBRs',          desc:'Keep value reviews current with decision-makers.',             recommended:false, default:false, track:'QBRs completed'}]},
        {type:'list', col:6, title:'What you’re tracking', icon:'target', items:[
          {tone:'rose',title:'At-risk formulary reviews',sub:'Objective · Protect access',value:'2',cap:'Q3'},
          {tone:'amber',title:'Stakeholder map completeness',sub:'Objective · Mapping',value:'63%',cap:'mapped'},
          {tone:'green',title:'Account growth',sub:'Objective · Growth',value:'+9%',cap:'volume'}]},
        {type:'note', col:6, text:'PrecisionNeXT: your highest-stakes objective is access — Northstar’s P&T review is 8 weeks out with the pharmacy decision-maker unmapped. See Next Best Actions.'},
      ]},

    nba:{
      summary:'Sensed from your active objectives — your prioritised customers and the best next account move for each, with confidence and rationale.',
      chips:['Account actions','Access protection','Explainable rationale'],
      blocks:[
        {type:'note', col:12, text:'Sensed from your account objectives — the moves that protect access and grow the pathway. Act here, then open any account or HCP for the deeper picture.'},
        {type:'kpis', items:[{v:'5',k:'Accounts in plan',tr:'by your goals',tone:'purple'},{v:'2',k:'At-risk',tr:'act now',tone:'rose'},
                {v:'24',k:'Stakeholders',tr:'to map',tone:'amber'},{v:'3',k:'QBRs due',tr:'this quarter',tone:'green'}]},
        {type:'hcpcards', variant:'nba', title:'NBA Cockpit — prioritised HCPs (tap a card to open the profile)', icon:'spark'},
        {type:'actions', title:'Precision NeXT Best Actions', icon:'spark', items:[
          {priority:'high',title:'Engage the P&T pharmacy director now',confidence:90,impact:'High',effort:'Medium',channel:'Executive meeting',
           rationale:'Formulary review in 8 weeks + an unmapped pharmacy decision-maker is the single biggest access risk. Early evidence-based engagement shapes the pathway decision.'},
          {priority:'med',title:'Schedule a value-story QBR',confidence:83,impact:'High',effort:'Medium',channel:'On-site QBR',
           rationale:'Two quarters without a QBR ahead of a Q3 renewal. A refreshed value story anchors the negotiation.'},
          {priority:'low',title:'Complete the stakeholder map',confidence:76,impact:'Medium',effort:'Low',channel:'Field mapping',
           rationale:'Closing the 37% gap de-risks both the review and the renewal.'}]},
      ]},

    universe:{
      summary:'Your strategic-account portfolio — access status, potential, renewal timing and risk for every key account you own.',
      chips:['Account portfolio','Access status','Renewal timing'],
      blocks:[
        {type:'filterbar', title:'Filter the universe — therapeutic area, brand, priority', icon:'layers'},
        {type:'hcpgroups', title:'Customer grouping summary', icon:'layers'},
        {type:'hcpcards', variant:'score', title:'Customer scoring — engagement & 360 indices (tap to open the profile)', icon:'users'},
        {type:'table', title:'Account Universe', icon:'globe',
          cols:['Account','Type','Access','Potential','Renewal','Status'],
          rows:[
            ['Northstar Health System','IDN',{chip:'a',text:'Review'},'High','Q3',{chip:'r',text:'At risk'}],
            ['Cedar Valley Medical','Hospital',{chip:'g',text:'Formulary'},'Med','Q4',{chip:'g',text:'Stable'}],
            ['Lakeside Specialty Network','Specialty',{chip:'g',text:'Open'},'High','Q1',{chip:'b',text:'Grow'}],
            ['Mercy Children’s','Pediatric',{chip:'b',text:'PA req.'},'Med','Q2',{chip:'a',text:'Enable'}],
            ['Summit IDN','IDN',{chip:'a',text:'Review'},'High','Q3',{chip:'r',text:'At risk'}]]},
        {type:'insights', title:'Portfolio signals', icon:'bulb', items:[
          {tone:'risk',title:'Two concurrent formulary reviews',detail:'Northstar & Summit both review in Q3 — coordinate evidence packs.',metric:'2',delta:'reviews',dir:'down'},
          {tone:'positive',title:'Lakeside expansion lane',detail:'Open access + high potential — accelerate the growth play.',metric:'High',delta:'upside',dir:'up'}]},
        {type:'heatmap', title:'Account health heat-map — colour by status, access score & action needed', icon:'globe', items:[
          {name:'Northstar Health System',tier:'IDN · Tier 1',access:52,status:'P&T review in 8 weeks',tone:'rose',hcps:'8 HCPs'},
          {name:'Summit IDN',tier:'IDN · Tier 1',access:48,status:'P&T review · Q3',tone:'rose',hcps:'6 HCPs'},
          {name:'Mercy Children’s',tier:'Pediatric',access:58,status:'PA enablement needed',tone:'amber',hcps:'4 HCPs'},
          {name:'Cedar Valley Medical',tier:'Hospital',access:72,status:'Renewal — Q4',tone:'amber',hcps:'5 HCPs'},
          {name:'Lakeside Specialty',tier:'Specialty',access:84,status:'Growth lane — expand',tone:'green',hcps:'7 HCPs'},
          {name:'Cedars-Sinai',tier:'AMC · Tier 1',access:88,status:'On plan',tone:'green',hcps:'3 HCPs'}]},
      ]},

    journey:{
      summary:'Each account’s access journey and decision timeline — so you act ahead of formulary windows, not after them.',
      chips:['Access stages','Decision timeline','Risk windows'],
      blocks:[
        {type:'bars', col:6, title:'Account access stages', icon:'route', items:[
          {label:'Identified',value:12,max:12,tone:'blue',vv:'12'},{label:'Engaged',value:9,max:12,tone:'blue',vv:'9'},
          {label:'Formulary review',value:5,max:12,tone:'amber',vv:'5'},{label:'On pathway',value:4,max:12,tone:'green',vv:'4'},
          {label:'Expanding',value:2,max:12,tone:'purple',vv:'2'}]},
        {type:'list', col:6, title:'Decision timeline', icon:'route', items:[
          {tone:'rose',title:'Northstar P&T review',sub:'8 weeks · pharmacy director unmapped',value:'8wk',cap:'critical'},
          {tone:'amber',title:'Summit P&T review',sub:'Q3 · evidence pack needed',value:'Q3',cap:'watch'},
          {tone:'green',title:'Lakeside contracting',sub:'Q1 · favourable trajectory',value:'Q1',cap:'on track'}]},
      ]},

    segments:{
      summary:'The stakeholder roles inside the account — buyers, champions, influencers and blockers — and the play that moves each.',
      chips:['Stakeholder roles','Decision unit','Targeted plays'],
      blocks:[
        {type:'list', col:6, title:'Northstar stakeholder segments', icon:'layers', items:[
          {tone:'rose',title:'Economic buyers',sub:'P&T + pharmacy director · 37% unmapped',value:'2',cap:'roles'},
          {tone:'green',title:'Clinical champions',sub:'Treating endocrinologists · supportive',value:'4',cap:'roles'},
          {tone:'blue',title:'Influencers',sub:'Pharmacy & nursing leads',value:'3',cap:'roles'},
          {tone:'amber',title:'Blockers',sub:'Cost-containment committee',value:'1',cap:'roles'}]},
        {type:'insights', col:6, title:'Stakeholder plays', icon:'bulb', items:[
          {tone:'warning',title:'Map the pharmacy director',detail:'Primary economic buyer for the formulary decision.',metric:'#1',delta:'priority',dir:'down'},
          {tone:'positive',title:'Activate clinical champions',detail:'4 supportive endocrinologists can voice need at P&T.',metric:'4',delta:'allies',dir:'up'}]},
      ]},

    influence:{
      summary:'The decision-making unit at the account, mapped — who decides, who champions, who blocks — and the warm routes between them.',
      chips:['Decision unit','Warm routes','Champion activation'],
      blocks:[
        {type:'graph', col:12, title:'360° Influence Network — therapeutic-area clusters', icon:'share'},
        {type:'network', col:6, title:'Northstar — decision unit', icon:'share', center:{av:'PT',name:'P&T Committee',role:'Formulary decision body'},
          items:[
            {av:'PD',name:'Pharmacy Director',role:'Economic buyer · UNMAPPED',tie:'Decides',tone:'rose'},
            {av:'CE',name:'Dr. Carla Esposito',role:'Chief of Endocrinology',tie:'Champion',tone:'green'},
            {av:'CM',name:'Cost-Mgmt Lead',role:'Budget gatekeeper',tie:'Blocks',tone:'amber'},
            {av:'NL',name:'Nursing Lead',role:'Operational influence',tie:'Supports',tone:'blue'}]},
        {type:'note', col:6, text:'PrecisionNeXT: warm intro to the pharmacy director via Dr. Esposito (Chief of Endocrinology, an existing champion) shortens your path to the economic buyer before the P&T review.'},
      ]},

    affinity:{
      summary:'What resonates with this account’s decision-makers — value drivers and engagement channels — so your evidence and approach fit how they buy.',
      chips:['Value drivers','Channel fit','Decision-maker focus'],
      blocks:[
        {type:'bars', col:6, title:'Decision-maker value drivers', icon:'signal', items:[
          {label:'Budget / total cost',value:88,max:100,tone:'amber',vv:'88'},{label:'Outcomes evidence',value:79,max:100,tone:'green',vv:'79'},
          {label:'Patient access',value:71,max:100,tone:'green',vv:'71'},{label:'Operational fit',value:55,max:100,tone:'blue',vv:'55'}]},
        {type:'bars', col:6, title:'Engagement channel fit', icon:'signal', items:[
          {label:'Executive meeting',value:84,max:100,tone:'green',vv:'84'},{label:'On-site QBR',value:80,max:100,tone:'green',vv:'80'},
          {label:'Evidence dossier',value:68,max:100,tone:'blue',vv:'68'},{label:'Email',value:40,max:100,tone:'amber',vv:'40'}]},
      ]},

    execplan:{
      summary:'Your account plan to protect Q3 access — sequenced steps with warm routes PrecisionNeXT has surfaced, owners and timing.',
      chips:['Account plan','Warm routes','Owners & timing'],
      blocks:[
        {type:'steps', title:'Execution Plan — Northstar', icon:'check', items:[
          {status:'done',title:'Confirmed renewal timeline with procurement',meta:'Q3 window',owner:'You',ai:false},
          {status:'active',title:'Secure P&T pharmacy-director meeting',meta:'PrecisionNeXT found 2 warm intro routes',owner:'You',ai:true},
          {status:'todo',title:'Build QBR value deck',meta:'Outcomes + 9% growth assembled',owner:'You',ai:true},
          {status:'todo',title:'Map remaining stakeholders',meta:'Champion + pharmacy lead',owner:'You',ai:false}]},
      ]},

    content:{
      summary:'Account-ready assets ranked by decision-maker fit — budget-impact models and value stories that speak to economic buyers first.',
      chips:['Account-ready','Decision-maker fit','Value story'],
      blocks:[
        {type:'list', title:'Content Relevance — Northstar', icon:'doc', items:[
          {tone:'green',title:'Budget-impact model (account-specific)',sub:'Speaks to the #1 value driver',value:'95',cap:'relevance'},
          {tone:'green',title:'Network outcomes + 9% growth QBR deck',sub:'Anchors the renewal story',value:'88',cap:'relevance'},
          {tone:'blue',title:'Patient-access case studies',sub:'Reinforces champion voices',value:'74',cap:'relevance'},
          {tone:'amber',title:'Mechanism-of-action detail aid',sub:'Off-target for economic buyers',value:'33',cap:'relevance'}]},
      ]},

    orchestration:{
      summary:'Account engagement choreographed to the renewal — the right play, to the right stakeholder, in the right week, leading into the P&T decision.',
      chips:['Account choreography','Stakeholder sequencing','Renewal-aligned'],
      blocks:[
        {type:'list', title:'Engagement Orchestration — to Q3', icon:'flow', items:[
          {tone:'green',title:'Week 1 · Warm intro to pharmacy director',sub:'Via Dr. Esposito',value:'Exec',cap:'play'},
          {tone:'green',title:'Week 2 · Budget-impact review',sub:'Lead with total-cost story',value:'Evidence',cap:'play'},
          {tone:'purple',title:'Week 4 · Value-story QBR',sub:'Cross-functional with Medical',value:'QBR',cap:'play'},
          {tone:'blue',title:'Week 6 · Pre-P&T evidence pack',sub:'Champions briefed to advocate',value:'P&T prep',cap:'play'}]},
      ]},
  },

  pni:{
    intro:'Northstar’s P&T review is 8 weeks out and the pharmacy director isn’t mapped yet — your critical path to access. I found two warm intro routes.',
    alerts:[
      {title:'P&T review in 8 weeks',detail:'Pharmacy decision-maker still unmapped.',time:'today'},
      {title:'Two concurrent reviews',detail:'Northstar + Summit both review in Q3.',time:'2d ago'}],
    prompts:['Build the engagement plan','What’s the access risk?','Draft the QBR agenda','Who is unmapped?'],
    answers:{
      plan:'Engagement plan: 1) Warm intro to pharmacy director via Dr. Esposito. 2) Lead with budget-impact + outcomes. 3) Pre-empt the P&T review with an evidence pack. 4) Convert into the Q3 QBR. Target: meeting booked within 2 weeks.',
      risk:'Primary access risk: the P&T formulary review in 8 weeks while the pharmacy economic buyer is unengaged. Without early influence, the pathway could shift to a competitor.',
      agenda:'QBR agenda: network outcomes recap, 9% volume growth, patient-access wins, upcoming evidence, renewal terms preview, mutual success metrics.',
      unmapped:'Unmapped (37%): the P&T pharmacy director and one clinical champion at the newly-onboarded sites. Both influence the formulary decision.'}},
});
