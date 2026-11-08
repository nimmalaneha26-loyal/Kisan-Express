/* KisanExpress logic - needs data.js loaded first */
let S; try { S = JSON.parse(localStorage.getItem('kx6')); } catch (e) {}
if (!S || !S.shops || !S.ah || !S.nm || !S.fv) S = init();
const save = () => { try { localStorage.setItem('kx6', JSON.stringify(S)); } catch (e) {} };
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
  ${r != 'f' ? `<div class="sm">👨‍🌾 ${esc(nm(o.fm))} · 📱${o.fm}</div>` : ''}<div class="sm">${o.it}</div>
  <div class="sm">📍 ${o.l}</div><div class="st">${t('st_' + o.st)}</div>${tr}<div>${act}</div></div>`;
}
function setSt(id, st) { const o = S.o.find(x => x.id == id); o.st = st; if (st == 'out') o.pg = 0; R(); }

/* ---------- Shop owner ---------- */
function vS() {
 const s = shopOf(S.ss), mine = S.o.filter(o => o.s == s.id), dues = mine.filter(o => o.pay == 'udh' && !o.paid), rs = rvOf(s.id);
 return `<section class="card"><h2>${t('shop')}</h2>
  <select onchange="S.ss=+this.value;R()">${S.shops.map(x => `<option value="${x.id}" ${x.id == s.id ? 'selected' : ''}>${esc(x.n)} (${x.m}, ${x.d})</option>`).join('')}</select>
  <div class="sm">📍 ${t('mandal')}: <b>${s.m}</b> · ${t('district')}: ${s.d} · ★ ${avg(rs)} (${rs.length})</div>
  ${s.p.map(p => `<div class="pr"><span><b>${p.n}</b>${p.x ? ' 🔒' : ''}<br><small>/${p.u}</small></span><span class="ad">
   <label class="fl">${t('price')}<input type="number" id="pp${p.id}" value="${p.pr}"></label>
   <label class="fl">${t('stockq')}<input type="number" id="pq${p.id}" value="${p.q}"></label></span></div>`).join('')}
  <button class="btn" onclick="saveStock()">${t('save')}</button></section>
 <section class="card"><h2>📒 ${t('dues')}</h2>${duesView(dues)}</section>
 <section class="card"><h2>📦 ${t('mylist')}</h2>${mine.map(o => oc(o, 's')).join('') || `<div class="empty">${t('none')}</div>`}</section>
 <section class="card"><h2>⭐ ${t('rshopr')}</h2>${revList(rs)}</section>`;
}
function duesView(d) {
 const g = {}; d.forEach(o => (g[o.fm] = g[o.fm] || []).push(o));
 return Object.entries(g).map(([id, os]) => {
  const all = S.o.filter(o => o.fm == id && o.pay == 'udh' && !o.paid).reduce((a, o) => a + o.tot, 0);
  return `<div class="shop"><b>${esc(nm(id))}</b> (📱${id}) · <b>₹${os.reduce((a, o) => a + o.tot, 0)}</b>
  <div class="sm">${t('allsh')}: ₹${all}</div>
  ${os.map(o => `<div class="pr"><span><small>${o.it}</small><br>₹${o.tot}</span><button onclick="payOff(${o.id})">${t('recv')}</button></div>`).join('')}</div>`;
 }).join('') || `<div class="empty">${t('none')}</div>`;
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

/* ---------- Live tracking simulation ---------- */
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
$('#reset').onclick = () => { try { localStorage.removeItem('kx6'); } catch (e) {} location.reload(); };
R();
