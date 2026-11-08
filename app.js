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
let S; try { S = JSON.parse(localStorage.getItem('kx5')); } catch (e) {}
if (!S) S = init();
const save = () => { try { localStorage.setItem('kx5', JSON.stringify(S)); } catch (e) {} };
const t = k => (TX[S.lang] && TX[S.lang][k]) || TX.en[k] || k;
const shopOf = id => S.shops.find(x => x.id == id);
const fv = () => S.fv[S.fm] || {};
const nm = m => S.nm[m] || m;
const toast = m => { const e = $('#toast'); e.textContent = m; e.className = 'show'; setTimeout(() => e.className = '', 2800); };
const stars = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));
const rvOf = id => S.rv.filter(x => x.k == 's' && x.id == id);
const rvFarmer = () => S.rv.filter(x => x.k == 'f' && x.fm == S.fm);
const avg = a => a.length ? (a.reduce((s, x) => s + x.st, 0) / a.length).toFixed(1) : '-';
const revList = rs => rs.length ? rs.slice(-4).reverse().map(x => `<div class="rv"><b>${esc(x.by)}</b> <span class="star2">${stars(x.st)}</span><br>${esc(x.tx)}</div>`).join('') : `<div class="empty">${t('norev')}</div>`;
const mSel = (id, v, oc) => `<select id="${id}" onchange="${oc}">${Object.entries(DIST).map(([d, ms]) => `<optgroup label="${d}">${ms.map(m => `<option value="${m}|${d}" ${m + '|' + d == v ? 'selected' : ''}>${m}</option>`).join('')}</optgroup>`).join('')}</select>`;

function R() {
 document.querySelectorAll('#roles button').forEach(b => { b.classList.toggle('on', b.dataset.r == S.role); b.textContent = t(b.dataset.r); });
 $('#tag').textContent = t('tag'); $('#lang').value = S.lang; $('#reset').textContent = t('reset');
 $('#app').innerHTML = S.role == 'farmer' ? vF() : S.role == 'shop' ? vS() : vD();
 save();
}

/* ---------- Farmer ---------- */
function vF() {
 const f = fv();
 const list = S.shops.filter(s => s.d == S.bd && (!S.bm || s.m == S.bm));
 const mine = rvFarmer();
 return `${profCard()}<section class="card"><h2>📍 ${t('sel')}</h2>
  <label class="lb">${t('district')}</label><select onchange="S.bd=this.value;S.bm='';R()">${Object.keys(DIST).map(d => `<option ${d == S.bd ? 'selected' : ''}>${d}</option>`).join('')}</select>
  <label class="lb">${t('mandal')}</label><select onchange="S.bm=this.value;R()"><option value="">${t('allm')}</option>${DIST[S.bd].map(m => `<option ${m == S.bm ? 'selected' : ''}>${m}</option>`).join('')}</select>
  <p class="note">${f.ok ? `✅ ${t('ok')} · ${t('mandal')}: <b>${f.m}</b> (${f.d}) · Aadhaar ••••${f.a}` : 'ℹ️ ' + t('nv')}</p></section>
 ${S.vf ? verCard() : ''}
 <section class="card"><h2>🛍️ ${t('cat')}</h2><div class="chips">${['all','seed','fert'].map(c => `<button class="chip ${S.cat == c ? 'on' : ''}" onclick="S.cat='${c}';R()">${t(c)}</button>`).join('')}</div></section>
 <section class="card"><h2>🏪 ${t('shops')} (${list.length})</h2>
  <p class="note">📍 ${S.bm ? t('mandal') + ': <b>' + S.bm + '</b> · ' : ''}${t('district')}: <b>${S.bd}</b></p>
  ${list.map(shopCard).join('') || `<div class="empty">${t('noshops')}</div>`}</section>
 ${cartV()}${ledger()}
 <section class="card"><h2>📦 ${t('ords')}</h2>${S.o.filter(o => o.fm == S.fm).map(o => oc(o, 'f')).join('') || `<div class="empty">${t('none')}</div>`}</section>
 <section class="card"><h2>⭐ ${t('rabout')} (${avg(mine)})</h2>${revList(mine)}</section>`;
}
function verCard() {
 return `<section class="card warn"><h2>🔐 ${t('verify')}</h2><p class="note">${S.vf.place ? t('vudh') : t('vneed') + ': <b>' + esc(S.vf.n) + '</b>'}</p>
  <input id="aa" inputmode="numeric" maxlength="12" placeholder="${t('aad')}">
  <input id="pb" placeholder="${t('pata')}">
  <label class="lb">${t('district')}</label><select id="vd" onchange="fillM()">${Object.keys(DIST).map(d => `<option ${d == S.bd ? 'selected' : ''}>${d}</option>`).join('')}</select>
  <label class="lb">${t('mand')}</label><select id="vm">${DIST[S.bd].map(m => `<option ${m == S.bm ? 'selected' : ''}>${m}</option>`).join('')}</select>
  <button class="btn" onclick="ver()">${t('vbtn')}</button>
  <button class="btn ghost" onclick="S.vf=null;R()">${t('cancel')}</button><p class="note">${t('vnote')}</p></section>`;
}
function ver() {
 const a = $('#aa').value.trim(), p = $('#pb').value.trim();
 if (!/^\d{12}$/.test(a) || p.length < 4) return toast(t('verr'));
 const h = hash(a), v = S.vf;
 if (S.ah[h] && S.ah[h] != S.fm) return toast(t('aadused'));
 S.ah[h] = S.fm;
 S.fv[S.fm] = {ok:1, a:a.slice(-4), m:$('#vm').value, d:$('#vd').value}; S.vf = null;
 if (v.place) place(); else addItem(v.sid, v.pid, v.q);
}
function profCard() {
 if (!S.fm) return `<section class="card warn"><h2>👤 ${t('prof')}</h2>
  <label class="lb">${t('name')}</label><input id="rn" placeholder="${t('name')}">
  <label class="lb">${t('mobile')}</label><input id="rm" inputmode="numeric" maxlength="10" placeholder="${t('mobile')}">
  <button class="btn" onclick="reg()">${t('rbtn')}</button><p class="note">🔗 ${t('idnote')}</p></section>`;
 return `<section class="card"><h2>👤 ${t('prof')}</h2>
  <label class="lb">${t('name')}</label><input value="${esc(nm(S.fm))}" onchange="setName(this.value)">
  <div class="sm">📱 +91 ${S.fm} 🔒</div><p class="note">🔗 ${t('locked')}</p>
  <button class="link" onclick="switchF()">${t('sw')}</button></section>`;
}
function reg() {
 const n = $('#rn').value.trim(), m = $('#rm').value.trim();
 if (!n || !/^[6-9]\d{9}$/.test(m)) return toast(t('regerr'));
 S.fm = m; S.nm[m] = n; R(); toast('✅ ' + n);
}
function switchF() { S.fm = ''; S.c = {}; S.vf = null; R(); }
function setMobile(v) { v = v.trim(); if (!/^[6-9]\d{9}$/.test(v)) { toast(t('merr')); return R(); } S.fm = v; if (!S.nm[v]) S.nm[v] = 'Farmer'; R(); }
function setName(v) { S.nm[S.fm] = v.trim() || 'Farmer'; R(); }
function fillM() { $('#vm').innerHTML = DIST[$('#vd').value].map(m => `<option>${m}</option>`).join(''); }
function shopCard(s) {
 const rs = rvOf(s.id), o = S.open[s.id];
 const rows = s.p.filter(p => S.cat == 'all' || p.c == S.cat).map(p => `<div class="pr"><div><b>${p.n}</b> <small>/${p.u}</small><br>
  <span class="tag">${t('price')}${p.pr}</span> <span class="tag ${p.q ? '' : 'out'}">${t('stock')}: ${p.q}</span>
  ${p.x ? `<br><small class="lock">🔒 ${t('res')}</small>` : ''}</div>
  <div class="ad"><input type="number" min="1" value="1" id="q${s.id}_${p.id}" aria-label="${t('qty')}">
  <button ${p.q ? '' : 'disabled'} onclick="add(${s.id},${p.id})">${p.q ? t('add') : t('oos')}</button></div></div>`).join('');
 return `<div class="shop"><b>${esc(s.n)}</b><span class="star">★ ${avg(rs)} (${rs.length})</span>
  <div class="sm">📍 ${t('mandal')}: <b>${s.m}</b> · ${t('district')}: ${s.d}</div>
  <div class="sm">${s.l} · <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.n + ' ' + s.l + ' ' + s.m)}">Map</a></div>
  <div class="sm">${t('upd')}: ${S.d} · 📒 ${t('limit')} ₹${s.cl}</div>
  <button class="link" onclick="S.open[${s.id}]=!S.open[${s.id}];R()">${o ? t('hide') : t('seerev')} (${rs.length})</button>
  ${o ? revList(rs) : ''}${rows}</div>`;
}
function add(sid, pid) {
 const s = shopOf(sid), p = s.p.find(x => x.id == pid), q = Math.max(1, +$('#q' + sid + '_' + pid).value || 1);
 if (!S.fm) { toast(t('regfirst')); window.scrollTo(0, 0); return; }
 if (p.x && !fv().ok) { S.vf = {sid, pid, q, n:p.n}; R(); window.scrollTo(0, 0); return; }
 addItem(sid, pid, q);
}
function addItem(sid, pid, q) {
 const s = shopOf(sid), p = s.p.find(x => x.id == pid);
 if (p.x && s.m != fv().m) { R(); return toast('🔒 ' + t('mismatch') + ' (' + fv().m + ')'); }
 if (S.c.s != sid) S.c = {s:sid, i:{}};
 S.c.i[pid] = Math.min(p.q, (S.c.i[pid] || 0) + q); R(); toast('✅ ' + p.n + ' × ' + S.c.i[pid]);
}
function cartV() {
 if (!S.c.s) return '';
 const s = shopOf(S.c.s); let tot = 0;
 const l = Object.entries(S.c.i).map(([id, q]) => { const p = s.p.find(x => x.id == id); tot += p.pr * q; return `<div class="pr"><span>${p.n} × ${q}</span><b>₹${p.pr * q}</b></div>`; }).join('');
 return `<section class="card"><h2>🧺 ${t('cart')} - ${esc(s.n)}</h2>${l}<div class="pr"><b>Total</b><b>₹${tot}</b></div>
  <label class="rad"><input type="radio" name="pay" ${S.pay == 'now' ? 'checked' : ''} onclick="S.pay='now'">${t('now')}</label>
  <label class="rad"><input type="radio" name="pay" ${S.pay == 'udh' ? 'checked' : ''} onclick="S.pay='udh'">${t('udh')} · ${t('limit')} ₹${s.cl}</label>
  <button class="btn" onclick="place()">${t('place')}</button></section>`;
}
function place() {
 if (S.pay == 'udh' && !fv().ok) { S.vf = {place:1, n:''}; R(); window.scrollTo(0, 0); return; }
 const s = shopOf(S.c.s), it = []; let tot = 0;
 for (const [id, q] of Object.entries(S.c.i)) tot += s.p.find(x => x.id == id).pr * q;
 if (S.pay == 'udh') {
  const due = S.o.filter(o => o.s == s.id && o.fm == S.fm && o.pay == 'udh' && !o.paid).reduce((a, o) => a + o.tot, 0);
  if (due + tot > s.cl) return toast(t('udhhi') + ' (₹' + s.cl + ')');
  if (S.o.filter(o => o.fm == S.fm && o.pay == 'udh' && !o.paid).reduce((a, o) => a + o.tot, 0) + tot > GL) return toast(t('udhhg'));
 }
 for (const [id, q] of Object.entries(S.c.i)) { const p = s.p.find(x => x.id == id); p.q = Math.max(0, p.q - q); it.push(p.n + ' × ' + q); }
 S.o.unshift({id:Date.now(), s:s.id, sn:s.n, fm:S.fm, l:s.l + ', ' + s.m + ' (' + s.d + ')', it:it.join(', '), tot, pay:S.pay, paid:S.pay == 'now', st:'placed', pg:0});
 S.c = {}; R(); toast('✅ ' + s.n);
}
function ledger() {
 const d = S.o.filter(o => o.pay == 'udh' && !o.paid && o.fm == S.fm), by = {};
 d.forEach(o => by[o.sn] = (by[o.sn] || 0) + o.tot);
 return `<section class="card"><h2>📒 ${t('kat')}</h2><div class="big">${t('due')}: ₹${d.reduce((a, o) => a + o.tot, 0)}</div>
  ${Object.entries(by).map(([n, v]) => `<div class="pr"><span>${esc(n)}</span><b>₹${v}</b></div>`).join('')}<p class="note">${t('udhnote')}</p></section>`;
}
function payOff(id) { S.o.find(o => o.id == id).paid = true; R(); }

/* ---------- Orders (shared) ---------- */
function rateUI(id, k) {
 return `<div class="rate"><b>${t(k == 's' ? 'rshop' : 'rfar')}</b><input id="rt${id}${k}" placeholder="${t('rtxt')}">
  <div class="stars">${[1,2,3,4,5].map(n => `<button onclick="rate(${id},'${k}',${n})">${n}★</button>`).join('')}</div></div>`;
}
function rate(id, k, n) {
 const o = S.o.find(x => x.id == id), tx = $('#rt' + id + k).value.trim() || '-';
 if (k == 's') { S.rv.push({k:'s', id:o.s, by:nm(o.fm), st:n, tx}); o.rs = n; }
 else { S.rv.push({k:'f', fm:o.fm, by:o.sn, st:n, tx}); o.rf = n; }
 R(); toast('⭐ ' + n);
}
function oc(o, r) {
 const tr = (o.st == 'out' || o.st == 'delivered') ? `<div class="track"><div class="fill" data-o="${o.id}" style="width:${o.pg}%"></div><span class="truck" data-t="${o.id}" style="left:calc(${o.pg}% - 14px)">🛺</span></div>` : '';
 let act = '';
 if (r == 's' && o.st == 'placed') act = `<button onclick="setSt(${o.id},'accepted')">${t('acc')}</button>`;
 if (r == 'd' && o.st == 'accepted') act = `<button onclick="setSt(${o.id},'out')">${t('pick')}</button>`;
 if (r == 'd' && o.st == 'out' && o.pg >= 100) act = `<button onclick="setSt(${o.id},'delivered')">${t('done')}</button>`;
 if (o.st == 'delivered') {
  if (r == 'f') act = o.rs ? `${t('rated')}: ${stars(o.rs)}` : rateUI(o.id, 's');
  if (r == 's') act = o.rf ? `${t('rated')}: ${stars(o.rf)}` : rateUI(o.id, 'f');
 }
 return `<div class="shop"><b>${esc(o.sn)}</b> · ₹${o.tot} · ${o.pay == 'udh' ? '📒' : '💵'}
  
