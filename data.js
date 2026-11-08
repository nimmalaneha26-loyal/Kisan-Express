/* KisanExpress demo - all data is sample data stored in the browser (localStorage) */
const $ = s => document.querySelector(s);
const DIST = {"Adilabad":["Adilabad Urban", "Adilabad Rural", "Mavala", "Gudihathnoor", "Bazarhathnoor", "Bela", "Boath", "Jainath", "Tamsi", "Bheempur", "Talamadugu", "Neradigonda", "Ichoda", "Sirikonda", "Indervelly", "Narnoor", "Gadiguda", "Utnoor", "Bhoraj", "Sonala"],"Medchal-Malkajgiri":["Alwal", "Bachupally", "Balanagar", "Dundigal Gandimaisamma", "Ghatkesar", "Kapra", "Keesara", "Kukatpally", "Malkajgiri", "Medchal", "Medipally", "Muduchintalpalli", "Quthbullapur", "Shamirpet", "Uppal"]};
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const TX = {
 en: {tag:"Simple Agricultural Delivery Network",farmer:"👨‍🌾 Farmer",shop:"🏪 Shop",driver:"🛺 Driver",
  sel:"Select Your District & Mandal",name:"Your name",mand:"Your mandal",mandal:"Mandal",district:"District",
  nv:"Not verified. Aadhaar and passbook are needed only for government-controlled items like urea.",
  ok:"Verified",verify:"Verification needed",vneed:"This item is government-controlled. Verify to buy",
  aad:"Aadhaar number (12 digits)",pata:"Pattadar passbook number",vbtn:"Verify",cancel:"Cancel",
  vnote:"Demo only: only the last 4 digits of Aadhaar are kept.",verr:"Enter 12-digit Aadhaar and passbook number",
  cat:"Category",all:"All",seed:"Seeds",fert:"Fertilizer",shops:"Available Local Shops",upd:"Stock updated",
  stock:"Stock",price:"Price ₹",qty:"Qty",stockq:"Stock qty",add:"Add",oos:"Out of stock",
  res:"Government-controlled: buy only in your own mandal",mismatch:"Government rule: this item can be bought only in your verified mandal",
  limit:"Udhaar limit",udhhi:"Udhaar limit crossed",cart:"Your order",now:"Pay now",udh:"Udhaar katha (pay after harvest)",
  kat:"Udhaar katha",place:"Place order",due:"Total due",udhnote:"Pay your shop directly. The shop marks it as received.",
  ords:"Orders & live tracking",st_placed:"Waiting for shop",st_accepted:"Accepted - waiting for driver",
  st_out:"Out for delivery - live",st_delivered:"Delivered",save:"Save today's stock",saved:"Stock saved",
  acc:"Accept",pick:"Pick up & start",done:"Mark delivered",jobs:"Delivery jobs",none:"Nothing here yet",
  reset:"Reset demo",mylist:"Orders for this shop",dues:"Udhaar katha (farmers who owe you)",recv:"Received",
  seerev:"See reviews",hide:"Hide reviews",rshop:"Rate this shop",rfar:"Rate this farmer",rtxt:"Write a review (optional)",
  rabout:"Reviews about you",rshopr:"Reviews of your shop",norev:"No reviews yet",rated:"Your rating",allm:"All mandals",mobile:"Mobile number (your farmer ID)",idnote:"Your orders and udhaar katha are linked to your mobile number, not your name.",merr:"Enter a valid 10-digit mobile number",vudh:"Udhaar katha needs verification, so your dues stay linked to you even if you change your name.",prof:"Your profile",rbtn:"Register",regerr:"Enter your name and a valid 10-digit mobile number",regfirst:"Register your name and mobile number first",locked:"Mobile number locked. Only the name can be changed.",aadused:"This Aadhaar is already linked to another mobile number",udhhg:"Total udhaar across all shops crossed ₹25,000",sw:"Switch farmer (demo)",idl:"ID",allsh:"Total dues in all shops",noshops:"No shops in this mandal yet"},
 te: {tag:"సులభమైన వ్యవసాయ డెలివరీ నెట్‌వర్క్",farmer:"👨‍🌾 రైతు",shop:"🏪 షాప్",driver:"🛺 డ్రైవర్",
  sel:"మీ జిల్లా & మండలాన్ని ఎంచుకోండి",name:"మీ పేరు",mand:"మీ మండలం",mandal:"మండలం",district:"జిల్లా",
  nv:"ధృవీకరణ లేదు. యూరియా వంటి ప్రభుత్వ నియంత్రిత వస్తువులకు మాత్రమే ఆధార్, పాస్‌బుక్ అవసరం.",
  ok:"ధృవీకరించబడింది",verify:"ధృవీకరణ అవసరం",vneed:"ఇది ప్రభుత్వ నియంత్రిత వస్తువు. కొనడానికి ధృవీకరించండి",
  aad:"ఆధార్ నంబర్ (12 అంకెలు)",pata:"పట్టాదార్ పాస్‌బుక్ నంబర్",vbtn:"ధృవీకరించు",cancel:"రద్దు",
  vnote:"డెమో మాత్రమే: ఆధార్ చివరి 4 అంకెలు మాత్రమే ఉంటాయి.",verr:"12 అంకెల ఆధార్, పాస్‌బుక్ నంబర్ ఇవ్వండి",
  cat:"వర్గం",all:"అన్నీ",seed:"విత్తనాలు",fert:"ఎరువులు",shops:"అందుబాటులో ఉన్న స్థానిక షాపులు",upd:"స్టాక్ అప్‌డేట్",
  stock:"స్టాక్",price:"ధర ₹",qty:"పరిమాణం",stockq:"స్టాక్ సంఖ్య",add:"జోడించు",oos:"స్టాక్ లేదు",
  res:"ప్రభుత్వ నియంత్రణ: మీ మండలంలోనే కొనాలి",mismatch:"ప్రభుత్వ నియమం: ఈ వస్తువు మీ ధృవీకరించిన మండలంలోనే కొనగలరు",
  limit:"ఉద్దెర పరిమితి",udhhi:"ఉద్దెర పరిమితి దాటింది",cart:"మీ ఆర్డర్",now:"ఇప్పుడే చెల్లింపు",udh:"ఉద్దెర కథ (పంట తర్వాత చెల్లింపు)",
  kat:"ఉద్దెర కథ",place:"ఆర్డర్ చేయండి",due:"మొత్తం బాకీ",udhnote:"షాప్‌కు నేరుగా చెల్లించండి. షాప్ అందినట్లు గుర్తిస్తుంది.",
  ords:"ఆర్డర్లు & లైవ్ ట్రాకింగ్",st_placed:"షాప్ కోసం వేచి ఉంది",st_accepted:"అంగీకరించారు - డ్రైవర్ కోసం వేచి ఉంది",
  st_out:"డెలివరీకి బయలుదేరింది - లైవ్",st_delivered:"డెలివరీ అయింది",save:"ఈరోజు స్టాక్ సేవ్ చేయండి",saved:"స్టాక్ సేవ్ అయింది",
  acc:"అంగీకరించు",pick:"తీసుకుని బయలుదేరు",done:"డెలివరీ అయింది",jobs:"డెలివరీ పనులు",none:"ఇక్కడ ఏమీ లేదు",
  reset:"డెమో రీసెట్",mylist:"ఈ షాప్ ఆర్డర్లు",dues:"ఉద్దెర కథ (మీకు బాకీ ఉన్న రైతులు)",recv:"అందింది",
  seerev:"రివ్యూలు చూడండి",hide:"రివ్యూలు దాచు",rshop:"ఈ షాప్‌కు రేటింగ్",rfar:"ఈ రైతుకు రేటింగ్",rtxt:"రివ్యూ రాయండి (ఐచ్ఛికం)",
  rabout:"మీ గురించి రివ్యూలు",rshopr:"మీ షాప్ రివ్యూలు",norev:"ఇంకా రివ్యూలు లేవు",rated:"మీ రేటింగ్",allm:"అన్ని మండలాలు",mobile:"మొబైల్ నంబర్ (మీ రైతు ID)",idnote:"మీ ఆర్డర్లు, ఉద్దెర కథ మీ పేరుకు కాదు, మొబైల్ నంబర్‌కు లింక్ అవుతాయి.",merr:"సరైన 10 అంకెల మొబైల్ నంబర్ ఇవ్వండి",vudh:"ఉద్దెర కథకు ధృవీకరణ అవసరం, పేరు మార్చినా బాకీ మీకే లింక్ అవుతుంది.",prof:"మీ ప్రొఫైల్",rbtn:"నమోదు చేయండి",regerr:"మీ పేరు, సరైన 10 అంకెల మొబైల్ నంబర్ ఇవ్వండి",regfirst:"ముందు మీ పేరు, మొబైల్ నంబర్ నమోదు చేయండి",locked:"మొబైల్ నంబర్ లాక్ అయింది. పేరు మాత్రమే మార్చవచ్చు.",aadused:"ఈ ఆధార్ ఇప్పటికే మరో మొబైల్ నంబర్‌తో లింక్ అయింది",udhhg:"అన్ని షాపుల్లో మొత్తం ఉద్దెర ₹25,000 దాటింది",sw:"రైతును మార్చు (డెమో)",idl:"ID",allsh:"అన్ని షాపుల్లో మొత్తం బాకీ",noshops:"ఈ మండలంలో ఇంకా షాపులు లేవు"}
};

const P = a => a.map((x, i) => ({id:i+1, n:x[0], c:x[1], u:x[2], pr:x[3], q:x[4], x:x[5] || 0}));
const today = () => new Date().toLocaleDateString('en-IN');
const GL = 25000;
const mk = m => '••••' + String(m).slice(-4);
const hash = s => { let h = 5381; for (const c of s) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0; return String(h); };
const MD = "Medchal-Malkajgiri";

function init() {
 return {lang:'en', role:'farmer', cat:'all', pay:'now', ss:1, c:{}, o:[], fv:{}, fm:'', nm:{}, ah:{}, bd:MD, bm:'', vf:null, open:{}, d:today(),
  rv:[{k:'s',id:1,by:'Ravi',st:5,tx:'Good seeds and fast delivery'},{k:'s',id:1,by:'Lakshmi',st:4,tx:'Fair price'},
   {k:'s',id:2,by:'Mahesh',st:4,tx:'Helpful owner'},{k:'s',id:3,by:'Anil',st:5,tx:'Always has stock'},
   {k:'s',id:3,by:'Sita',st:4,tx:'Honest weighing'},{k:'s',id:4,by:'Raju',st:5,tx:'Best udhaar support'},
   {k:'s',id:5,by:'Narsimha',st:4,tx:'Good service'},{k:'s',id:6,by:'Gangadhar',st:5,tx:'Fair prices'},{k:'s',id:7,by:'Prakash',st:4,tx:'Always has stock'},{k:'s',id:8,by:'Sunita',st:4,tx:'Quick delivery'}],
  shops:[
  {id:1,n:"Sri Lakshmi Agro",m:"Keesara",d:MD,l:"Main Road",cl:15000,p:P([["Urea 45kg","fert","bag",267,40,1],["DAP 50kg","fert","bag",1350,25],["Paddy seed BPT-5204","seed","10kg",520,30],["Bt Cotton seed","seed","pkt",864,50,1]])},
  {id:2,n:"Rythu Seva Kendram",m:"Keesara",d:MD,l:"Bus Stand Road",cl:10000,p:P([["Urea 45kg","fert","bag",267,0,1],["Maize seed","seed","4kg",780,20],["Paddy seed BPT-5204","seed","10kg",530,12]])},
  {id:3,n:"Venkateshwara Fertilizers",m:"Shamirpet",d:MD,l:"Market Yard",cl:12000,p:P([["Urea 45kg","fert","bag",267,60,1],["DAP 50kg","fert","bag",1350,0],["Bt Cotton seed","seed","pkt",864,35,1]])},
  {id:4,n:"Annapurna Agro Centre",m:"Medchal",d:MD,l:"Highway Junction",cl:20000,p:P([["Urea 45kg","fert","bag",267,35,1],["NPK 20-20-0","fert","bag",1100,18],["Maize seed","seed","4kg",790,40]])},
  {id:5,n:"Sri Sai Agro Centre",m:"Jainath",d:"Adilabad",l:"Main Road",cl:10000,p:P([["Urea 45kg","fert","bag",267,30,1],["DAP 50kg","fert","bag",1350,20],["Bt Cotton seed","seed","pkt",864,40,1]])},
  {id:6,n:"Jainath Rythu Seva",m:"Jainath",d:"Adilabad",l:"Bus Stand",cl:8000,p:P([["Urea 45kg","fert","bag",267,0,1],["Soybean seed","seed","30kg",2400,15],["DAP 50kg","fert","bag",1350,10]])},
  {id:7,n:"Adilabad Seeds & Fertilizers",m:"Adilabad Urban",d:"Adilabad",l:"Market Yard",cl:15000,p:P([["Urea 45kg","fert","bag",267,45,1],["Bt Cotton seed","seed","pkt",864,60,1],["Soybean seed","seed","30kg",2450,25]])},
  {id:8,n:"Bela Agro Traders",m:"Bela",d:"Adilabad",l:"Main Road",cl:10000,p:P([["Urea 45kg","fert","bag",267,20,1],["NPK 20-20-0","fert","bag",1100,12],["Maize seed","seed","4kg",790,30]])}
 ]};
}
