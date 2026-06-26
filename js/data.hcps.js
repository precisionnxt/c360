/* ==================================================================================================
   SHARED HCP / HCO DATASET                                          ►► EDIT THE CUSTOMER ROSTER HERE ◄◄
   --------------------------------------------------------------------------------------------------
   One roster powers the NBA Cockpit cards, the Customer Insight score cards, the search directory and
   the HCP 360 profile view. Add/edit a customer by editing one object below.

   HCP record fields:
     id      unique slug (used in the profile URL state)
     name, init (avatar initials), spec (specialty), account (HCO)
     tags[]  brand / therapeutic tags                seg  segment A–D        prio  high | med | low
     360 indices (0–100):  engage · rx · kol · digital · access
     trend   short engagement-trend label            nba {type, text, channel}  the next best action
   ================================================================================================ */
C360.hcps = [
  { id:'reyes',    name:'Dr. Marcus Reyes',      init:'MR', spec:'Endocrinology',   account:'Pacific Metabolic Center', tags:['Metabolic','EnzymeRx'], seg:'A', prio:'high',
    engage:92, rx:74, kol:68, digital:81, access:60, trend:'▲ rising', nba:{type:'Visit',    text:'Book an in-person visit within 7 days', channel:'Field'} },
  { id:'ramirez',  name:'Dr. Nancy Ramirez',     init:'NR', spec:'Neurology',       account:'Providence Health',        tags:['NeuroVance'],           seg:'A', prio:'high',
    engage:96, rx:58, kol:72, digital:64, access:55, trend:'▲ rising', nba:{type:'Digital',  text:'Deliver Phase III efficacy data',        channel:'Email'} },
  { id:'lewis',    name:'Dr. Stephen Lewis',     init:'SL', spec:'Cardiology',      account:'Intermountain',            tags:['Cardiloft'],            seg:'A', prio:'high',
    engage:88, rx:61, kol:90, digital:58, access:62, trend:'▲ rising', nba:{type:'Advisory', text:'Invite to the next advisory board',      channel:'In-person'} },
  { id:'phillips', name:'Dr. Catherine Phillips', init:'CP', spec:'Dermatology',     account:'Sutter Health',            tags:['Immunology','DermaShield'], seg:'B', prio:'med',
    engage:98, rx:51, kol:85, digital:77, access:48, trend:'▲ rising', nba:{type:'Webinar',  text:'Invite to upcoming regional webinar',   channel:'Email'} },
  { id:'lopez',    name:'Dr. Joshua Lopez',      init:'JL', spec:'Oncology',        account:'Geisinger',                tags:['Onkonix'],              seg:'B', prio:'med',
    engage:65, rx:43, kol:47, digital:28, access:39, trend:'▬ steady', nba:{type:'Sample',   text:'Follow up on the sample request',       channel:'Field'} },
  { id:'moore',    name:'Dr. Donald Moore',      init:'DM', spec:'Psychiatry',      account:'MD Anderson',              tags:['NeuroVance'],           seg:'B', prio:'med',
    engage:83, rx:55, kol:60, digital:52, access:50, trend:'▬ steady', nba:{type:'Sample',   text:'Drop NeuroVance samples',               channel:'Field'} },
  { id:'thompson', name:'Dr. Kimberly Thompson', init:'KT', spec:'Gastroenterology', account:'Cedar Valley Medical',     tags:['Diabeta'],              seg:'B', prio:'med',
    engage:76, rx:48, kol:28, digital:61, access:44, trend:'▬ steady', nba:{type:'Advisory', text:'Invite to advisory board',             channel:'Email'} },
  { id:'patel',    name:'Dr. Aisha Patel',       init:'AP', spec:'Metabolic Med',   account:'Lakeside Specialty',       tags:['Metabolic','EnzymeRx'], seg:'A', prio:'high',
    engage:84, rx:66, kol:55, digital:70, access:58, trend:'▲ rising', nba:{type:'Digital',  text:'Share the real-world evidence deck',    channel:'Email'} },
  { id:'davis',    name:'Dr. Daniel Davis',      init:'DD', spec:'Pulmonology',     account:'Stanford Health',          tags:['PulmoCare'],            seg:'C', prio:'low',
    engage:54, rx:33, kol:30, digital:40, access:35, trend:'▬ steady', nba:{type:'Digital',  text:'Send NE-IM reprint via email',          channel:'Email'} },
  { id:'liang',    name:'Dr. Tom Liang',         init:'TL', spec:'Genetics',        account:'Pacific Metabolic Center', tags:['GeneTx'],               seg:'B', prio:'med',
    engage:71, rx:40, kol:64, digital:51, access:46, trend:'▲ rising', nba:{type:'Visit',    text:'Referral nurture — strengthen pathway', channel:'Field'} },
  { id:'mendez',   name:'Dr. Rosa Méndez',       init:'RM', spec:'Pediatric Endo',  account:'Mercy Children’s',         tags:['EnzymeRx'],             seg:'C', prio:'low',
    engage:38, rx:29, kol:25, digital:22, access:30, trend:'▼ declining', nba:{type:'Re-engage', text:'Re-engage — 61 days no contact',     channel:'Field'} },
  { id:'weiss',    name:'Dr. Karl Weiss',        init:'KW', spec:'Endocrinology',   account:'Summit IDN',               tags:['Metabolic'],            seg:'C', prio:'low',
    engage:46, rx:36, kol:34, digital:55, access:38, trend:'▬ steady', nba:{type:'Digital',  text:'Start an email nurture sequence',       channel:'Email'} },
  { id:'idris',    name:'Dr. Hassan Idris',      init:'HI', spec:'Metabolic Med',   account:'Metabolic Institute',      tags:['Metabolic','GeneTx'],   seg:'A', prio:'high',
    engage:90, rx:62, kol:93, digital:68, access:64, trend:'▲ rising', nba:{type:'Advisory', text:'Co-author the registry abstract',        channel:'In-person'} },
  { id:'cole',     name:'Dr. Naomi Cole',        init:'NC', spec:'Neurology',       account:'University Research Hosp.', tags:['NeuroVance'],           seg:'B', prio:'med',
    engage:79, rx:44, kol:88, digital:86, access:42, trend:'▲ rising', nba:{type:'Digital',  text:'Engage the rising digital opinion leader', channel:'Social'} },
  { id:'brandt',   name:'Dr. Lena Brandt',       init:'LB', spec:'Pediatric Gen.',  account:'Children’s Genetics Ctr',  tags:['GeneTx'],               seg:'B', prio:'med',
    engage:69, rx:41, kol:80, digital:47, access:45, trend:'▬ steady', nba:{type:'Visit',    text:'Schedule a scientific exchange',        channel:'In-person'} },
  { id:'oreyes',   name:'Dr. Omar Reyes',        init:'OR', spec:'Metabolic Med',   account:'State University',         tags:['Metabolic'],            seg:'B', prio:'med',
    engage:74, rx:39, kol:74, digital:72, access:41, trend:'▲ rising', nba:{type:'Advisory', text:'Map this emerging KOL early',            channel:'In-person'} },
];

/* HCO / accounts — used by the search directory */
C360.hcos = [
  { id:'northstar', name:'Northstar Health System', type:'IDN',        access:'Review',   hcps:'1,400 beds', prio:'high' },
  { id:'cleveland', name:'Cleveland Clinic',        type:'IDN',        access:'Open',     hcps:'+2 practices', prio:'high' },
  { id:'mdanderson',name:'MD Anderson',             type:'Academic',   access:'Formulary',hcps:'712 HCPs', prio:'med' },
  { id:'providence',name:'Providence Health',       type:'Hospital',   access:'Open',     hcps:'430 HCPs', prio:'med' },
  { id:'intermtn',  name:'Intermountain',           type:'IDN',        access:'Formulary',hcps:'620 HCPs', prio:'med' },
  { id:'sutter',    name:'Sutter Health',           type:'IDN',        access:'Open',     hcps:'510 HCPs', prio:'med' },
  { id:'lakeside',  name:'Lakeside Specialty Network', type:'Specialty', access:'Open',  hcps:'High potential', prio:'high' },
  { id:'cedar',     name:'Cedar Valley Medical',    type:'Hospital',   access:'Formulary',hcps:'Stable',   prio:'low' },
  { id:'mercy',     name:'Mercy Children’s',        type:'Pediatric',  access:'PA req.',  hcps:'Enable',    prio:'med' },
  { id:'summit',    name:'Summit IDN',              type:'IDN',        access:'Review',   hcps:'At risk',   prio:'high' },
  { id:'stanford',  name:'Stanford Health',         type:'Academic',   access:'Open',     hcps:'820 HCPs', prio:'med' },
  { id:'geisinger', name:'Geisinger',               type:'IDN',        access:'Formulary',hcps:'540 HCPs', prio:'med' },
];
