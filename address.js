/* KisanExpress delivery addresses - load after licence.js and before app.js */
Object.assign(TX.en, {adr:"My delivery addresses",adadd:"+ Add new address",adedit:"Edit",addel:"Delete",adsave:"Save address",
 adlabel:"Address name (Home / Farm)",adrecv:"Receiver name",adphone:"Receiver mobile (10 digits)",adline:"House / street / village",
 adland:"Landmark (optional)",adpin:"PIN code (6 digits)",adgps:"📍 Use my current location",adgpsok:"Location saved",
 adgpsfail:"Could not get location. You can still save the address.",adneed:"Please add a delivery address first",
 admand:"Government-controlled items can be delivered only to an address in your verified mandal",adsel:"Deliver to",
 adnone:"No address saved yet",adderr:"Fill address name, receiver name, 10-digit mobile, house/street/village and a 6-digit PIN",
 adopen:"Open in Maps",adpick:"Deliver to",pickup:"Pick-up"});
Object.assign(TX.te, {adr:"నా డెలివరీ చిరునామాలు",adadd:"+ కొత్త చిరునామా జోడించు",adedit:"మార్చు",addel:"తొలగించు",adsave:"చిరునామా సేవ్ చేయి",
 adlabel:"చిరునామా పేరు (ఇల్లు / పొలం)",adrecv:"స్వీకరించే వారి పేరు",adphone:"స్వీకరించే వారి మొబైల్ (10 అంకెలు)",adline:"ఇంటి నంబర్ / వీధి / గ్రామం",
 adland:"గుర్తు (ఐచ్ఛికం)",adpin:"పిన్ కోడ్ (6 అంకెలు)",adgps:"📍 నా ప్రస్తుత లొకేషన్ వాడు",adgpsok:"లొకేషన్ సేవ్ అయింది",
 adgpsfail:"లొకేషన్ దొరకలేదు. చిరునామా మాత్రం సేవ్ చేయవచ్చు.",adneed:"ముందు డెలివరీ చిరునామా జోడించండి",
 admand:"ప్రభుత్వ నియంత్రిత వస్తువులను మీ ధృవీకరించిన మండలంలోని చిరునామాకే డెలివరీ చేయగలరు",adsel:"డెలివరీ చిరునామా",
 adnone:"ఇంకా చిరునామా సేవ్ చేయలేదు",adderr:"చిరునామా పేరు, స్వీకర్త పేరు, 10 అంకెల మొబైల్, ఇల్లు/వీధి/గ్రామం, 6 అంకెల పిన్ ఇవ్వండి",
 adopen:"మ్యాప్‌లో తెరవండి",adpick:"డెలివరీ చిరునామా",pickup:"తీసుకునే చోటు"});

const adst = document.createElement('style');
adst.textContent = '.shop button.red{background:#b3402a}';
document.head.appendChild(adst);
let ADLOC = null;
function AD() { S.ad = S.ad || {}; if (!S.ad[S.fm]) S.ad[S.fm] = {list:[], sel:''}; return S.ad[S.fm]; }
function curAddr() { const a = AD(); return a.list.find(x => x.id == a.sel) || a.list[0] || null; }
function fmtAddr(x) {
 return `${esc(x.nm)} · 📱${esc(x.ph)}<br>${esc(x.ln)}${x.lm ? ', ' + esc(x.lm) : ''}<br>${t('mandal')}: <b>${esc(x.m)}</b>, ${t('district')}: ${esc(x.d)} - ${esc(x.pin)}`
  + (x.g ? `<br><a target="_blank" rel="noopener" href="https://www.google.com/maps?q=${x.g.lat},${x.g.lng}">${t('adopen')}</a>` : '');
}
function adLine(o) { return o.ad ? `<div class="sm">🏠 ${t('adsel')}: <b>${esc(o.ad.lb)}</b><br>${fmtAddr(o.ad)}</div>` : ''; }

function addrCard() {
 if (!S.fm) return '';
 const a = AD(), c = curAddr();
 const rows = a.list.map(x => `<div class="shop"><label class="rad"><input type="radio" name="adsel" ${c && c.id == x.id ? 'checked' : ''} onclick="selAddr('${x.id}')"><b>${esc(x.lb)}</b></label>
  <div class="sm">${fmtAddr(x)}</div><div><button onclick="S.ae='${x.id}';R()">${t('adedit')}</button> <button class="red" onclick="delAddr('${x.id}')">${t('addel')}</button></div></div>`).join('') || `<div class="empty">${t('adnone')}</div>`;
 const form = S.ae ? addrForm(S.ae == 'new' ? {} : (a.list.find(x => x.id == S.ae) || {})) : '';
 return `<section class="card"><h2>🏠 ${t('adr')}</h2>${rows}${S.ae ? '' : `<button class="btn" onclick="S.ae='new';R()">${t('adadd')}</button>`}${form}</section>`;
}
function addrForm(x) {
 ADLOC = x.g || null;
 const d0 = x.d || S.bd, m0 = x.m || S.bm || DIST[d0][0];
 return `<div class="card warn" style="margin-top:10px"><h2>${x.id ? t('adedit') : t('adadd')}</h2>
  <input id="ad_lb" placeholder="${t('adlabel')}" value="${esc(x.lb || '')}">
  <input id="ad_nm" placeholder="${t('adrecv')}" value="${esc(x.nm || nm(S.fm))}">
  <input id="ad_ph" inputmode="numeric" maxlength="10" placeholder="${t('adphone')}" value="${esc(x.ph || S.fm)}">
  <input id="ad_ln" placeholder="${t('adline')}" value="${esc(x.ln || '')}">
  <input id="ad_lm" placeholder="${t('adland')}" value="${esc(x.lm || '')}">
  <label class="lb">${t('district')}</label><select id="ad_d" onchange="adFill()">${Object.keys(DIST).map(d => `<option ${d == d0 ? 'selected' : ''}>${d}</option>`).join('')}</select>
  <label class="lb">${t('mandal')}</label><select id="ad_m">${DIST[d0].map(m => `<option ${m == m0 ? 'selected' : ''}>${m}</option>`).join('')}</select>
  <input id="ad_pin" inputmode="numeric" maxlength="6" placeholder="${t('adpin')}" value="${esc(x.pin || '')}">
  <button class="btn ghost" onclick="adGps()">${t('adgps')}</button><div class="sm" id="ad_gs">${x.g ? '✅ ' + t('adgpsok') : ''}</div>
  <button class="btn" onclick="saveAddr('${x.id || ''}')">${t('adsave')}</button>
  <button class="btn ghost" onclick="S.ae='';R()">${t('cancel')}</button></div>`;
}
function adFill() { $('#ad_m').innerHTML = DIST[$('#ad_d').value].map(m => `<option>${m}</option>`).join(''); }
function adGps() {
 if (!navigator.geolocation) return toast(t('adgpsfail'));
 navigator.geolocation.getCurrentPosition(p => {
  ADLOC = {lat:+p.coords.latitude.toFixed(5), lng:+p.coords.longitude.toFixed(5)};
  $('#ad_gs').textContent = '✅ ' + t('adgpsok');
 }, () => toast(t('adgpsfail')), {timeout:10000});
}
function saveAddr(id) {
 const v = k => $('#ad_' + k).value.trim(), a = AD();
 const o = {id:id || Date.now() + '' + Math.floor(Math.random() * 1000), lb:v('lb'), nm:v('nm'), ph:v('ph'), ln:v('ln'), lm:v('lm'), d:v('d'), m:v('m'), pin:v('pin'), g:ADLOC};
 if (!o.lb || !o.nm || !/^[6-9]\d{9}$/.test(o.ph) || o.ln.length < 3 || !/^\d{6}$/.test(o.pin)) return toast(t('adderr'));
 const i = a.list.findIndex(x => x.id == o.id);
 if (i >= 0) a.list[i] = o; else { a.list.push(o); a.sel = o.id; }
 S.ae = ''; R(); toast('✅ ' + t('adsave'));
}
function delAddr(id) { const a = AD(); a.list = a.list.filter(x => x.id != id); if (a.sel == id) a.sel = a.list[0] ? a.list[0].id : ''; R(); }
function selAddr(id) { AD().sel = id; R(); }
function addrPick() {
 const a = AD(), c = curAddr();
 if (!c) return `<div class="sm lock">⚠ ${t('adneed')}</div><button class="link" onclick="S.ae='new';R();window.scrollTo(0,0)">${t('adadd')}</button>`;
 return `<label class="lb">🏠 ${t('adpick')}</label><select onchange="selAddr(this.value)">${a.list.map(x => `<option value="${x.id}" ${x.id == c.id ? 'selected' : ''}>${esc(x.lb)} - ${esc(x.ln)}, ${esc(x.m)}</option>`).join('')}</select>
  <div class="sm">${fmtAddr(c)}</div><button class="link" onclick="S.ae='new';R();window.scrollTo(0,0)">${t('adadd')}</button>`;
}
