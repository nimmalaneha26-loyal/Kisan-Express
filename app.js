/* KisanExpress demo - all data is sample data stored in the browser (localStorage) */
const $ = s => document.querySelector(s);
const MANDALS = ["Keesara", "Shamirpet", "Medchal"];

const TX = {
 en: {tag:"Simple Agricultural Delivery Network",farmer:"👨‍🌾 Farmer",shop:"🏪 Shop",driver:"🛺 Driver",
  verify:"Verify yourself",aad:"Aadhaar number (12 digits)",pata:"Pattadar passbook number",vbtn:"Verify",
  vnote:"Demo only: only the last 4 digits of Aadhaar are kept.",verr:"Enter 12-digit Aadhaar and passbook number",
  ok:"Verified",cat:"Category",all:"All",seed:"Seeds",fert:"Fertilizer",shops:"Available Local Shops",
  upd:"Stock updated",stock:"Stock",add:"Add",res:"Government-controlled: buy only in your own mandal",
  cart:"Your order",now:"Pay now",udh:"Udhaar katha (pay after harvest)",kat:"Udhaar katha",place:"Place order",
  ords:"Orders & live tracking",due:"Total due",paid:"Mark paid",st_placed:"Waiting for shop",
  st_accepted:"Accepted - waiting for driver",st_out:"Out for delivery - live",st_delivered:"Delivered",
  save:"Save today's stock",saved:"Stock saved",acc:"Accept",pick:"Pick up & start",done:"Mark delivered",
  jobs:"Delivery jobs",none:"Nothing here yet",reset:"Reset demo",price:"Price ₹",qty:"Qty",oos:"Out of stock",
  mylist:"Orders for this shop"},
 te: {tag:"సులభమైన వ్యవసాయ డెలివరీ నెట్‌వర్క్",farmer:"👨‍🌾 రైతు",shop:"🏪 షాప్",driver:"🛺 డ్రైవర్",
  verify:"మీ ధృవీకరణ",aad:"ఆధార్ నంబర్ (12 అంకెలు)",pata:"పట్టాదార్ పాస్‌బుక్ నంబర్",vbtn:"ధృవీకరించు",
  vnote:"డెమో మాత్రమే: ఆధార్ చివరి 4 అంకెలు మాత్రమే ఉంటాయి.",verr:"12 అంకెల ఆధార్, పాస్‌బుక్ నంబర్ ఇవ్వండి",
  ok:"ధృవీకరించబడింది",cat:"వర్గం",all:"అన్నీ",seed:"విత్తనాలు",fert:"ఎరువులు",shops:"అందుబాటులో ఉన్న స్థానిక షాపులు",
  upd:"స్టాక్ అప్‌డేట్",stock:"స్టాక్",add:"జోడించు",res:"ప్రభుత్వ నియంత్రణ: మీ మండలంలోనే కొనాలి",
  cart:"మీ ఆర్డర్",now:"ఇప్పుడే చెల్లింపు",udh:"ఉద్దెర కథ (పంట తర్వాత చెల్లింపు)",kat:"ఉద్దెర కథ",place:"ఆర్డర్ చేయండి",
  ords:"ఆర్డర్లు & లైవ్ ట్రాకింగ్",due:"మొత్తం బాకీ",paid:"చెల్లించాను",st_placed:"షాప్ కోసం వేచి ఉంది",
  st_accepted:"అంగీకరించారు - డ్రైవర్ కోసం వేచి ఉంది",st_out:"డెలివరీకి బయలుదేరింది - లైవ్",st_delivered:"డెలివరీ అయింది",
  save:"ఈరోజు స్టాక్ సేవ్ చేయండి",saved:"స్టాక్ సేవ్ అయింది",acc:"అంగీకరించు",pick:"తీసుకుని బయలుదేరు",done:"డెలివరీ అయింది",
  jobs:"డెలివరీ పనులు",none:"ఇక్కడ ఏమీ లేదు",reset:"డెమో రీసెట్",price:"ధర ₹",qty:"పరిమాణం",oos:"స్టాక్ లేదు",
  mylist:"ఈ షాప్ ఆర్డర్లు"}
};

const P = a => a.map((x, i) => ({id:i+1, n:x[0], c:x[1], u:x[2], pr:x[3], q:x[4], x:x[5] || 0}));
const today = () => new Date().toLocaleDateString('en-IN');

function init() {
 return {lang:'en', role:'farmer', cat:'all', pay:'now', ss:1, c:{}, o:[], f:{}, d:today(), shops:[
  {id:1,n:"Sri Lakshmi Agro",m:"Keesara",l:"Main Road",r:4.6,p:P([["Urea 45kg","fert","bag",267,40,1],["DAP 50kg","fert","bag",1350,25],["Paddy seed BPT-5204","seed","10kg",520,30],["Bt Cotton seed","seed","pkt",864,50,1]])},
  {id:2,n:"Rythu Seva Kendram",m:"Keesara",l:"Bus Stand Road",r:4.2,p:P([["Urea 45kg","fert","bag",267,0,1],["Maize seed","seed","4kg",780,20],["Paddy seed BPT-5204","seed","10kg",530,12]])},
  {id:3,n:"Venkateshwara Fertilizers",m:"Shamirpet",l:"Market Yard",r:4.4,p:P([["Urea 45kg","fert","bag",267,60,1],["DAP 50kg","fert","bag",1350,0],["Bt Cotton seed","seed","pkt",864,35,1]])},
  {id:4,n:"Annapurna Agro Centre",m:"Medchal",l:"Highway Junction",r:4.8,p:P([["Urea 45kg","fert","bag",267,35,1],["NPK 20-20-0","fert","bag",1100,18],["Maize seed","seed","4kg",790,40]])}
 ]};
}
let S; try { S = JSON.parse(localStorage.getItem('kx')); } catch (e) {}
if (!S) S = init();
const save = () => { try { localStorage.setItem('kx', JSON.stringify(S)); } catch (e) {} };
const t = k => (TX[S.lang] && TX[S.lang][k]) || TX.en[k] || k;
const shopOf = id => S.shops.find(x => x.id == id);
const toast = m => { const e = $('#toast'); e.textContent = m; e.className = 'show'; setTimeout(() => e.className = '', 2600); };

function R() {
 document.querySelectorAll('#roles button').forEach(b => { b.classList.toggle('on', b.dataset.r == S.role); b.textContent = t(b.dataset.r); });
 $('#tag').textContent = t('tag'); $('#lang').value = S.lang; $('#reset').textContent = t('reset');
 $('#app').innerHTML = S.role == 'farmer' ? vF() : S.role == 'shop' ? vS() : vD();
 save();
}

/* ---------- Farmer ---------- */
function vF() {
 const f = S.f;
 if (!f.ok) return `<section class="card"><h2>🔐 ${t('verify')}</h2>
  <input id="aa" inputmode="numeric" maxlength="12" placeholder="${t('aad')}">
  <input id="pb" placeholder="${t('pata')}">
  <select id="mm">${MANDALS.map(m => `<option>${m}</option>`).join('')}</select>
  <button class="btn" onclick="ver()">${t('vbtn')}</button><p class="note">${t('vnote')}</p></section>`;
 const list = S.shops.slice().sort((a, b) => (b.m == f.m) - (a.m == f.m));
 return `<section class="card"><b>✅ ${t('ok')}</b> · 📍 ${f.m} · Aadhaar ••••${f.a}</section>
 <section class="card"><h2>🛍️ ${t('cat')}</h2><div class="chips">${['all','seed','fert'].map(c => `<button class="chip ${S.cat == c ? 'on' : ''}" onclick="S.cat='${c}';R()">${t(c)}</button>`).join('')}</div></section>
 <section class="card"><h2>🏪 ${t('shops')}</h2>${list.map(shopCard).join('')}</section>
 ${cartV()}${ledger()}
 <section class="card"><h2>📦 ${t('ords')}</h2>${S.o.map(o => oc(o, 'f')).join('') || `<div class="empty">${t('none')}</div>`}</section>`;
}
function ver() {
 const a = $('#aa').value.trim(), p = $('#pb').value.trim();
 if (!/^\d{12}$/.test(a) || p.length < 4) return toast(t('verr'));
 S.f = {ok:1, a:a.slice(-4), m:$('#mm').value}; R();
}
function shopCard(s) {
 const rows = s.p.filter(p => S.cat == 'all' || p.c == S.cat).map(p => `<div class="pr"><div><b>${p.n}</b> ₹${p.pr}/${p.u}<br>
  <small>${t('stock')}: ${p.q}</small>${p.x ? ` <small class="lock">🔒 ${t('res')}</small>` : ''}</div>
  <div class="ad"><input type="number" min="1" value="1" id="q${s.id}_${p.id}" aria-label="${t('qty')}">
  <button ${p.q ? '' : 'disabled'} onclick="add(${s.id},${p.id})">${p.q ? t('add') : t('oos')}</button></div></div>`).join('');
 return `<div class="shop"><b>${s.n}</b><span class="star">★ ${s.r}</span>
  <div class="sm">📍 ${s.l}, ${s.m} · <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.n + ' ' + s.l + ' ' + s.m)}">Map</a></div>
  <div class="sm">${t('upd')}: ${S.d}</div>${rows}</div>`;
}
function add(sid, pid) {
 const s = shopOf(sid), p = s.p.find(x => x.id == pid), q = Math.max(1, +$('#q' + sid + '_' + pid).value || 1);
 if (p.x && s.m != S.f.m) return toast('🔒 ' + t('res'));
 if (S.c.s != sid) S.c = {s:sid, i:{}};
 S.c.i[pid] = Math.min(p.q, (S.c.i[pid] || 0) + q); R();
}
function cartV() {
 if (!S.c.s) return '';
 const s = shopOf(S.c.s); let tot = 0;
 const l = Object.entries(S.c.i).map(([id, q]) => { const p = s.p.find(x => x.id == id); tot += p.pr * q; return `<div class="pr"><span>${p.n} × ${q}</span><b>₹${p.pr * q}</b></div>`; }).join('');
 return `<section class="card"><h2>🧺 ${t('cart')} - ${s.n}</h2>${l}<div class="pr"><b>Total</b><b>₹${tot}</b></div>
  <label class="rad"><input type="radio" name="pay" ${S.pay == 'now' ? 'checked' : ''} onclick="S.pay='now'">${t('now')}</label>
  <label class="rad"><input type="radio" name="pay" ${S.pay == 'udh' ? 'checked' : ''} onclick="S.pay='udh'">${t('udh')}</label>
  <button class="btn" onclick="place()">${t('place')}</button></section>`;
}
function place() {
 const s = shopOf(S.c.s), it = []; let tot = 0;
 for (const [id, q] of Object.entries(S.c.i)) { const p = s.p.find(x => x.id == id); p.q = Math.max(0, p.q - q); tot += p.pr * q; it.push(p.n + ' × ' + q); }
 S.o.unshift({id:Date.now(), s:s.id, sn:s.n, l:s.l + ', ' + s.m, it:it.join(', '), tot, pay:S.pay, paid:S.pay == 'now', st:'placed', pg:0});
 S.c = {}; R(); toast('✅ ' + s.n);
}
function ledger() {
 const d = S.o.filter(o => o.pay == 'udh' && !o.paid), sum = d.reduce((a, o) => a + o.tot, 0);
 return `<section class="card"><h2>📒 ${t('kat')}</h2><div class="big">${t('due')}: ₹${sum}</div>
  ${d.map(o => `<div class="pr"><span>${o.sn} · ₹${o.tot}</span><button onclick="payOff(${o.id})">${t('paid')}</button></div>`).join('')}</section>`;
}
function payOff(id) { S.o.find(o => o.id == id).paid = true; R(); }

/* ---------- Orders (shared by all roles) ---------- */
function oc(o, r) {
 const tr = (o.st == 'out' || o.st == 'delivered') ? `<div class="track"><div class="fill" data-o="${o.id}" style="width:${o.pg}%"></div><span class="truck" data-t="${o.id}" style="left:calc(${o.pg}% - 14px)">🛺</span></div>` : '';
 let act = '';
 if (r == 's' && o.st == 'placed') act = `<button onclick="setSt(${o.id},'accepted')">${t('acc')}</button>`;
 if (r == 'd' && o.st == 'accepted') act = `<button onclick="setSt(${o.id},'out')">${t('pick')}</button>`;
 if (r == 'd' && o.st == 'out' && o.pg >= 100) act = `<button onclick="setSt(${o.id},'delivered')">${t('done')}</button>`;
 return `<div class="shop"><b>${o.sn}</b> · ₹${o.tot} · ${o.pay == 'udh' ? '📒' : '💵'}<div class="sm">${o.it}</div>
  <div class="sm">📍 ${o.l}</div><div class="st">${t('st_' + o.st)}</div>${tr}<div>${act}</div></div>`;
}
function setSt(id, st) { const o = S.o.find(x => x.id == id); o.st = st; if (st == 'out') o.pg = 0; R(); }

/* ---------- Shop owner ---------- */
function vS() {
 const s = shopOf(S.ss), mine = S.o.filter(o => o.s == s.id);
 return `<section class="card"><h2>🏪 ${t('shop')}</h2>
  <select onchange="S.ss=+this.value;R()">${S.shops.map(x => `<option value="${x.id}" ${x.id == s.id ? 'selected' : ''}>${x.n} (${x.m})</option>`).join('')}</select>
  ${s.p.map(p => `<div class="pr"><span><b>${p.n}</b>${p.x ? ' 🔒' : ''}</span><span class="ad">
   <input type="number" id="pp${p.id}" value="${p.pr}" aria-label="${t('price')}" title="${t('price')}">
   <input type="number" id="pq${p.id}" value="${p.q}" aria-label="${t('qty')}" title="${t('qty')}"></span></div>`).join('')}
  <button class="btn" onclick="saveStock()">${t('save')}</button></section>
 <section class="card"><h2>📦 ${t('mylist')}</h2>${mine.map(o => oc(o, 's')).join('') || `<div class="empty">${t('none')}</div>`}</section>`;
}
function saveStock() {
 shopOf(S.ss).p.forEach(p => { p.pr = +$('#pp' + p.id).value || 0; p.q = Math.max(0, +$('#pq' + p.id).value || 0); });
 S.d = today(); R(); toast('✅ ' + t('saved'));
}

/* ---------- Driver ---------- */
function vD() {
 const j = S.o.filter(o => o.st == 'accepted' || o.st == 'out');
 return `<section class="card"><h2>🛺 ${t('jobs')}</h2>${j.map(o => oc(o, 'd')).join('') || `<div class="empty">${t('none')}</div>`}</section>`;
}

/* ---------- Live tracking simulation (updates bars without redrawing) ---------- */
setInterval(() => {
 let ch = 0;
 S.o.forEach(o => {
  if (o.st == 'out' && o.pg < 100) {
   o.pg = Math.min(100, o.pg + 4); ch = 1;
   document.querySelectorAll(`[data-o="${o.id}"]`).forEach(e => e.style.width = o.pg + '%');
   document.querySelectorAll(`[data-t="${o.id}"]`).forEach(e => e.style.left = `calc(${o.pg}% - 14px)`);
   if (o.pg >= 100) R();
  }
 });
 if (ch) save();
}, 1000);

/* ---------- Wire up ---------- */
document.querySelectorAll('#roles button').forEach(b => b.onclick = () => { S.role = b.dataset.r; R(); });
$('#lang').onchange = e => { S.lang = e.target.value; R(); };
$('#reset').onclick = () => { try { localStorage.removeItem('kx'); } catch (e) {} location.reload(); };
R();
