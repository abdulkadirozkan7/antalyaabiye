const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const HEDEF = process.env.HEDEF === 'hosting' ? 'hosting' : 'pages';
const OUT = path.join(ROOT, HEDEF === 'hosting' ? 'dist-hosting' : 'dist');
const GUVENLIK = require('./sayfalar/guvenlik.js');
const site = GUVENLIK.site(JSON.parse(fs.readFileSync(path.join(ROOT, 'data/site.json'), 'utf8')));
const i18n = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/i18n.json'), 'utf8'));
const A = site.ayarlar;
A.saatler = (A.saatler || []).map(r => (r && r[0] ? r : ['', '']));
const DILLER = ['tr', 'en', 'ru'];
const SURUM = Date.now().toString(36);
const HTMLLANG = { tr: 'tr', en: 'en', ru: 'ru' };
const OGLOC = { tr: 'tr_TR', en: 'en_GB', ru: 'ru_RU' };
const TABAN = A.alanadi ? 'https://' + A.alanadi.replace(/^https?:\/\//, '').replace(/\/$/, '') + '/' : (HEDEF === 'hosting' ? '' : (A.yayinUrl || ''));
const URL_LISTE = [];
const temiz = p => p.replace(/index\.html$/, '').replace(/\.html$/, '');
const tamUrl = (dil, slug) => TABAN + temiz(dosya(dil, slug));

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const kok = dil => (dil === 'tr' ? '' : '../');
const dosya = (dil, slug) => (dil === 'tr' ? '' : dil + '/') + (slug ? slug + '.html' : 'index.html');
const href = (dil, slug) => (slug ? slug : './');
const wa = (mesaj) => 'https://wa.me/' + A.whatsapp + '?text=' + encodeURIComponent(mesaj);
const telGoster = n => {
  const d = String(n).replace(/\D/g, '');
  const m = d.match(/^90(\d{3})(\d{3})(\d{2})(\d{2})$/);
  return m ? `0${m[1]} ${m[2]} ${m[3]} ${m[4]}` : n;
};

const IK = {
  ara: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
  kalp: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 20.2s-7.4-4.4-7.4-10.1A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.4 2.5c0 5.700-7.4 10.100-7.400 10.100z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3.500 7h17M3.500 12h17M3.500 17h11"/></svg>',
  x: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.600" stroke-linecap="round"><path d="M5.500 5.500l13 13M18.500 5.500l-13 13"/></svg>',
  ok: '<svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.500" stroke-linecap="round" stroke-linejoin="round"><path d="M2.500 4.500L6 8l3.500-3.500"/></svg>',
  wp: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.040 2a9.900 9.900 0 0 0-8.480 15.020L2 22l5.130-1.520A9.900 9.900 0 1 0 12.040 2zm0 1.800a8.100 8.100 0 1 1-4.300 14.970l-.300-.190-3.040.900.920-2.960-.200-.310A8.100 8.100 0 0 1 12.040 3.800zM8.700 7.300c-.170 0-.450.060-.680.320-.240.250-.900.880-.900 2.140s.920 2.480 1.050 2.650c.130.170 1.790 2.860 4.420 3.900 2.180.860 2.630.690 3.100.650.480-.050 1.540-.630 1.750-1.240.220-.600.220-1.130.160-1.240-.070-.100-.240-.170-.500-.300-.260-.130-1.540-.760-1.780-.850-.240-.080-.410-.130-.580.130-.170.260-.670.850-.820 1.020-.150.170-.300.200-.560.070-.260-.130-1.100-.410-2.090-1.300-.770-.690-1.290-1.540-1.440-1.800-.150-.260-.020-.400.110-.530.120-.120.260-.300.390-.450.130-.150.170-.260.260-.430.090-.170.040-.330-.020-.460-.070-.130-.570-1.420-.800-1.940-.200-.470-.410-.480-.580-.490z"/></svg>',
  tel: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.600" stroke-linejoin="round"><path d="M6.200 3.500h3l1.400 4-2 1.400a11.500 11.500 0 0 0 6.500 6.500l1.400-2 4 1.400v3a2 2 0 0 1-2.200 2A16.500 16.500 0 0 1 4.200 5.700a2 2 0 0 1 2-2.200z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.600"><rect x="3.500" y="3.500" width="17" height="17" rx="4.500"/><circle cx="12" cy="12" r="3.900"/><circle cx="17.200" cy="6.800" r=".600" fill="currentColor"/></svg>',
  konum: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.600" stroke-linejoin="round"><path d="M12 21s6.500-6.200 6.500-11a6.500 6.500 0 0 0-13 0c0 4.800 6.500 11 6.500 11z"/><circle cx="12" cy="10" r="2.300"/></svg>',
  fb: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M14 8.5V7a1.5 1.5 0 0 1 1.5-1.5H17v-3h-2.2a4.3 4.3 0 0 0-4.3 4.3v1.7H8v3.2h2.5v9.8H14v-9.8h2.6l.4-3.2z"/></svg>',
  ev: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 10.5L12 4l8 6.5V20h-5.5v-5.5h-5V20H4z"/></svg>',
  izgara: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/></svg>',
  gg: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285f4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.9-1.74 2.99-4.3 2.99-7.34z"/><path fill="#34a853" d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.04.96-3.39.96-2.6 0-4.81-1.76-5.6-4.12H3.06v2.58A10 10 0 0 0 12 22z"/><path fill="#fbbc05" d="M6.4 13.91a6 6 0 0 1 0-3.82V7.51H3.06a10 10 0 0 0 0 8.98l3.34-2.58z"/><path fill="#ea4335" d="M12 5.97c1.47 0 2.79.5 3.83 1.5l2.86-2.87A9.97 9.97 0 0 0 12 2a10 10 0 0 0-8.94 5.51l3.34 2.58C7.19 7.73 9.4 5.97 12 5.97z"/></svg>',
  fbDolu: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M13.6 21v-7.9h2.65l.4-3.1H13.6V8.05c0-.9.25-1.5 1.53-1.5h1.64V3.78a22 22 0 0 0-2.39-.12c-2.36 0-3.98 1.44-3.98 4.09V10H7.73v3.1h2.67V21z"/></svg>',
  canta: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 8h13l-1 12.5h-11z"/><path d="M9 10.5V7a3 3 0 0 1 6 0v3.5"/></svg>',
  saat: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.600" stroke-linecap="round"><circle cx="12" cy="12" r="8.500"/><path d="M12 7.500V12l3 2"/></svg>'
};

const BAYRAK = {
  tr: '<svg class="aa-bayrak" viewBox="0 0 21 15" width="21" height="15" aria-hidden="true"><rect width="21" height="15" fill="#e30a17"/><circle cx="7.6" cy="7.5" r="3.7" fill="#fff"/><circle cx="8.6" cy="7.5" r="2.95" fill="#e30a17"/><path fill="#fff" d="M13.9 7.5l-3.1 1 1.92-2.63v3.26L10.8 6.5z"/></svg>',
  en: '<svg class="aa-bayrak" viewBox="0 0 21 15" width="21" height="15" aria-hidden="true"><rect width="21" height="15" fill="#012169"/><path d="M0 0l21 15M21 0L0 15" stroke="#fff" stroke-width="3"/><path d="M0 0l21 15M21 0L0 15" stroke="#c8102e" stroke-width="1.2"/><path d="M10.5 0v15M0 7.5h21" stroke="#fff" stroke-width="5"/><path d="M10.5 0v15M0 7.5h21" stroke="#c8102e" stroke-width="3"/></svg>',
  ru: '<svg class="aa-bayrak" viewBox="0 0 21 15" width="21" height="15" aria-hidden="true"><rect width="21" height="15" fill="#fff"/><rect y="5" width="21" height="5" fill="#0039a6"/><rect y="10" width="21" height="5" fill="#d52b1e"/></svg>'
};
const DILAD = { tr: 'Türkçe', en: 'English', ru: 'Русский' };

function dilSecici(dil, slugs, sinif) {
  return `<div class="${sinif}" role="group" aria-label="${esc(i18n[dil].dil)}">` + DILLER.map(d => {
    const hedef = kok(dil) + temiz(dosya(d, slugs[d]));
    const ic = `${BAYRAK[d]}<span>${d.toUpperCase()}</span>`;
    return d === dil ? `<span class="aa-dil-on" aria-current="true" title="${DILAD[d]}">${ic}</span>` : `<a href="${hedef || './'}" hreflang="${d}" lang="${d}" title="${DILAD[d]}">${ic}</a>`;
  }).join('') + '</div>';
}

function dilAcilir(dil, slugs) {
  const digerleri = DILLER.filter(d => d !== dil).map(d => {
    const hedef = kok(dil) + temiz(dosya(d, slugs[d]));
    return `<a href="${hedef || './'}" hreflang="${d}" lang="${d}">${BAYRAK[d]}<span>${DILAD[d]}</span></a>`;
  }).join('');
  return `<details class="aa-dil-ac"><summary aria-label="${esc(i18n[dil].dil)}">${BAYRAK[dil]}<span>${dil.toUpperCase()}</span>${IK.ok}</summary><div><span class="aa-dil-secili">${BAYRAK[dil]}<span>${DILAD[dil]}</span></span>${digerleri}</div></details>`;
}

const GUNK = {
  tr: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
};
const GUN = {
  tr: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
};
function saatOzet(dil) {
  const s = A.saatler;
  if (!Array.isArray(s)) return '';
  const gruplar = [];
  s.forEach((r, i) => {
    const son = gruplar[gruplar.length - 1];
    if (son && son.r.join() === r.join()) son.bit = i; else gruplar.push({ bas: i, bit: i, r });
  });
  return gruplar.map(g => `${GUNK[dil][g.bas]}${g.bit > g.bas ? '–' + GUNK[dil][g.bit] : ''} ${g.r[0] ? g.r.join('–') : '—'}`).join(' · ');
}

const telHref = n => 'tel:+' + String(n).replace(/\D/g, '');

function header(dil, slugs) {
  const t = i18n[dil];
  const S = site.sayfalar;
  const anaMenu = site.kategoriler.filter(k => k.menu);
  const yeni = anaMenu.find(k => k.id === 'yeni');
  const digerleri = anaMenu.filter(k => k.id !== 'yeni');
  const link = (k, cls) => `<a href="${href(dil, k[dil].slug)}"${cls ? ` class="${cls}"` : ''}>${esc(k[dil].ad)}</a>`;
  const acilir = site.kategoriler.filter(k => k.id !== 'yeni' && !k.vurgu && !k.ozel).map(k => `<li>${link(k)}</li>`).join('');
  const nav = [
    yeni ? `<li>${link(yeni)}</li>` : '',
    `<li class="aa-var"><button type="button" class="aa-acilir-btn" aria-expanded="false" aria-controls="aa-acilir">${esc(t.modeller)}${IK.ok}</button><div class="aa-acilir" id="aa-acilir"><ul>${acilir}</ul><a class="aa-tumu" href="${href(dil, yeni ? yeni[dil].slug : '')}">${esc(t.tumu)}</a></div></li>`,
    ...digerleri.map(k => `<li><a href="${href(dil, k[dil].slug)}"${k.vurgu ? ' class="aa-vurgu"' : ''}>${esc(k[dil].kisa || k[dil].ad)}</a></li>`),
    `<li><a href="${href(dil, S.beden[dil].slug)}">${esc(S.beden[dil].kisa || S.beden[dil].ad)}</a></li>`,
    `<li><a href="${href(dil, S.blog[dil].slug)}">${esc(S.blog[dil].ad)}</a></li>`,
    `<li><a href="${href(dil, S.iletisim[dil].slug)}">${esc(S.iletisim[dil].ad)}</a></li>`
  ].join('');
  const cekmece = [
    yeni ? `<li>${link(yeni)}</li>` : '',
    `<li><button type="button" class="aa-c-btn" aria-expanded="false">${esc(t.modeller)}${IK.ok}</button><ul class="aa-c-alt">${acilir}</ul></li>`,
    ...digerleri.map(k => `<li>${link(k, k.vurgu ? 'aa-vurgu' : '')}</li>`),
    `<li><a href="${href(dil, S.beden[dil].slug)}">${esc(S.beden[dil].ad)}</a></li>`,
    `<li><a href="${href(dil, S.blog[dil].slug)}">${esc(S.blog[dil].ad)}</a></li>`,
    A.hakkimizdaHazir ? `<li><a href="${href(dil, S.hakkimizda[dil].slug)}">${esc(S.hakkimizda[dil].ad)}</a></li>` : '',
    `<li><a href="${href(dil, S.iletisim[dil].slug)}">${esc(S.iletisim[dil].ad)}</a></li>`
  ].join('');
  return `
<div class="aa-serit"><div class="aa-kayan">${[0, 1].map(n => `<div class="aa-kayan-grup"${n ? ' aria-hidden="true"' : ''}>${t.serit.map(s => `<span>${esc(s)}</span>`).join('')}</div>`).join('')}</div></div>
<header class="aa-header" id="aa-header">
  <div class="aa-ust">
    <div class="aa-sol">
      <button type="button" class="aa-ikon aa-menu-btn" aria-label="${esc(t.menu)}" aria-controls="aa-cekmece" aria-expanded="false">${IK.menu}</button>
      <button type="button" class="aa-ikon aa-ara-btn" aria-label="${esc(t.ara)}" aria-controls="aa-ara" aria-expanded="false">${IK.ara}<span>${esc(t.ara)}</span></button>
    </div>
    <a class="aa-logo" href="./" aria-label="${esc(A.marka)}"><img src="${kok(dil)}assets/img/logo.webp" width="480" height="409" alt="${esc(A.marka)}"></a>
    <div class="aa-sag">
      ${dilAcilir(dil, slugs)}
      <a class="aa-ikon aa-fav" href="${href(dil, S.favoriler[dil].slug)}" aria-label="${esc(S.favoriler[dil].ad)}">${IK.kalp}<b class="aa-fav-say" hidden>0</b></a>
      <button type="button" class="aa-ikon aa-sepet-ac" aria-label="${esc(t.sepet.ad)}" aria-controls="sp">${IK.canta}<b class="aa-sepet-say" hidden>0</b></button>
      <a class="aa-wp-btn" href="${wa(t.wpMesaj)}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="header">${IK.wp}<span>${esc(t.wpSiparis)}</span></a>
    </div>
  </div>
  <nav class="aa-nav" aria-label="${esc(t.menu)}"><ul>${nav}</ul></nav>
  <form class="aa-ara" id="aa-ara" action="${href(dil, S.arama[dil].slug)}" method="get" role="search" hidden>
    <label for="aa-q">${IK.ara}</label>
    <input id="aa-q" name="q" type="search" placeholder="${esc(t.araPh)}" autocomplete="off">
    <button type="button" class="aa-ikon aa-ara-kapat" aria-label="${esc(t.kapat)}">${IK.x}</button>
  </form>
</header>
<div class="aa-perde" hidden></div>
<aside class="aa-cekmece" id="aa-cekmece" aria-hidden="true">
  <div class="aa-c-ust"><img src="${kok(dil)}assets/img/logo.webp" width="480" height="409" alt="" loading="lazy"><button type="button" class="aa-ikon aa-c-kapat" aria-label="${esc(t.kapat)}">${IK.x}</button></div>
  <ul class="aa-c-menu">${cekmece}</ul>
  <div class="aa-c-alt-kisim">
    <a class="aa-wp-btn aa-genis" href="${wa(t.wpMesaj)}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="cekmece">${IK.wp}<span>${esc(t.wpSiparis)}</span></a>
    ${dilSecici(dil, slugs, 'aa-dil aa-dil-c')}
  </div>
</aside>`;
}

const AVANTAJ_IKON = [
  '<svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6a17 17 0 0 0-14.6 25.7L7 41l9.6-2.4A17 17 0 1 0 24 6z"/><path d="M17.5 16.5c.6-1.3 1.8-1.4 2.4-.6l1.8 3.3c.3.7 0 1.3-.5 1.8l-.9.9c1.2 2.5 3.3 4.6 5.8 5.8l.9-.9c.5-.5 1.1-.8 1.8-.5l3.3 1.8c.8.6.7 1.8-.6 2.4-1.6.8-3.6.9-5.5 0a17 17 0 0 1-8.5-8.5c-.9-1.9-.8-3.9 0-5.5z"/></svg>',
  '<svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h24v20H4zM28 18h8l6 7v7h-14z"/><circle cx="12" cy="35" r="3.5"/><circle cx="35" cy="35" r="3.5"/><path d="M2 18h8M1 23h6"/></svg>',
  '<svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 15a4 4 0 1 1 4-4"/><path d="M24 15v4L5 33a2.5 2.5 0 0 0 1.5 4.5h35A2.5 2.5 0 0 0 43 33L24 19"/></svg>',
  '<svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="12" width="32" height="22" rx="3"/><path d="M5 19h32M10 28h8"/><circle cx="38" cy="30" r="7"/><path d="M35 33l6-6M35.5 27.5h.01M40.5 32.5h.01"/></svg>',
  '<svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18c0-3.3 8-6 18-6s18 2.7 18 6-8 6-18 6S6 21.3 6 18z"/><path d="M6 18v10c0 3.3 8 6 18 6s18-2.7 18-6V18"/><path d="M14 24v4M20 24.8v5M26 24.8v5M32 24v4"/></svg>'
];

function avantajlar(dil) {
  const a = i18n[dil].avantaj || [];
  return `<section class="aa-avantaj"><ul>${a.map((x, i) => `<li>${AVANTAJ_IKON[i] || ''}<h2>${esc(x[0])}</h2><p>${esc(x[1])}</p></li>`).join('')}</ul></section>`;
}

function footer(dil, slugs) {
  const t = i18n[dil];
  const S = site.sayfalar;
  const sl = (k) => `<li><a href="${href(dil, k[dil].slug)}">${esc(k[dil].ad)}</a></li>`;
  const kategoriler = site.kategoriler.filter(k => k.id !== 'yeni').map(sl).join('');
  const kurumsal = [A.hakkimizdaHazir ? S.hakkimizda : null, S.blog, S.iletisim].filter(Boolean).map(sl).join('');
  const yardim = [S.siparis, S.iade, S.beden, S.sss, S.mesafeli, S.kvkk, S.gizlilik].map(sl).join('');
  const tel = A.telefon || A.whatsapp;
  const waLink = wa(t.wpMesaj);
  const igLink = A.instagram ? `https://www.instagram.com/${esc(A.instagram)}/` : '';
  const fbLink = A.facebook ? `https://www.facebook.com/${esc(A.facebook)}` : '';
  const satir = (ik, ic) => `<li>${ik}<span>${ic}</span></li>`;
  const iletisim = [
    satir(IK.wp, `<small>${esc(t.fWp)}</small><a href="${waLink}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="footer">${esc(telGoster(A.whatsapp))}</a>`),
    A.telefon ? satir(IK.tel, `<small>${esc(t.magaza)}</small><a href="${telHref(A.telefon)}" data-olay="telefon_tikla" data-konum="footer">${esc(telGoster(A.telefon))}</a>`) : '',
    A.adres ? satir(IK.konum, A.harita ? `<a href="${esc(A.harita)}" target="_blank" rel="noopener">${esc(A.adres)}</a>` : esc(A.adres)) : '',
    A.saatler ? satir(IK.saat, esc(saatOzet(dil))) : ''
  ].join('');
  const sosyal = [
    igLink ? `<a href="${igLink}" target="_blank" rel="noopener" aria-label="Instagram">${IK.ig}</a>` : '',
    fbLink ? `<a href="${fbLink}" target="_blank" rel="noopener" aria-label="Facebook">${IK.fb}</a>` : '',
    A.google ? `<a href="${esc(A.google)}" target="_blank" rel="noopener" aria-label="Google">${IK.konum}</a>` : ''
  ].join('');
  const buyukWp = IK.wp.replace('width="20" height="20"', 'width="26" height="26"');
  const yan = [
    `<a class="aa-y-wp" href="${waLink}" target="_blank" rel="noopener" aria-label="WhatsApp" data-olay="whatsapp_tikla" data-konum="sabit">${buyukWp}</a>`,
    `<a href="${telHref(tel)}" aria-label="${esc(t.ara2)}" data-olay="telefon_tikla" data-konum="sabit">${IK.tel}</a>`,
    igLink ? `<a href="${igLink}" target="_blank" rel="noopener" aria-label="Instagram">${IK.ig}</a>` : ''
  ].join('');
  return `${avantajlar(dil)}
<footer class="aa-footer">
  <div class="aa-f-ic">
    <div class="aa-f-marka">
      <a href="./" aria-label="${esc(A.marka)}"><img src="${kok(dil)}assets/img/logo-beyaz.webp" width="480" height="409" alt="${esc(A.marka)}" loading="lazy"></a>
      <p>${esc(t.fSlogan)}</p>
      <a class="aa-wp-btn aa-wp-beyaz" href="${waLink}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="footer_buton">${IK.wp}<span>${esc(t.wpSiparis)}</span></a>
    </div>
    <div class="aa-f-kol aa-f-iki"><h2>${esc(t.fKategori)}</h2><ul>${kategoriler}</ul></div>
    <div class="aa-f-kol"><h2>${esc(t.fKurumsal)}</h2><ul>${kurumsal}</ul><h2>${esc(t.fYardim)}</h2><ul>${yardim}</ul></div>
    <div class="aa-f-kol aa-f-iletisim"><h2>${esc(t.fIletisim)}</h2><ul>${iletisim}</ul><div class="aa-f-sosyal">${sosyal}</div></div>
  </div>
  <div class="aa-f-alt">
    <p>© ${new Date().getFullYear()} ${esc(A.marka)}. ${esc(t.fHak)}</p>
    ${dilSecici(dil, slugs, 'aa-dil')}
  </div>
</footer>
<div class="aa-yan">${yan}</div>
<nav class="aa-alt-bar" aria-label="${esc(t.menu)}">
  <a href="./">${IK.ev}<span>${esc(t.anasayfa)}</span></a>
  <button type="button" class="aa-kat-btn">${IK.izgara}<span>${esc(t.kategoriler)}</span></button>
  <a class="aa-ab-wp" href="${waLink}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="alt_bar"><i>${buyukWp}</i><span>WhatsApp</span></a>
  ${igLink ? `<a href="${igLink}" target="_blank" rel="noopener" data-olay="instagram_tikla" data-konum="alt_bar">${IK.ig.replace('width="19" height="19"', 'width="21" height="21"')}<span>Instagram</span></a>` : `<a class="aa-fav" href="${href(dil, S.favoriler[dil].slug)}">${IK.kalp}<b class="aa-fav-say" hidden>0</b><span>${esc(t.favori)}</span></a>`}
  <a href="${telHref(tel)}" data-olay="telefon_tikla" data-konum="alt_bar">${IK.tel}<span>${esc(t.telefon)}</span></a>
</nav>`;
}

function sepetHtml(dil) {
  const t = i18n[dil].sepet;
  const veri = { wa: A.whatsapp, t };
  return `<div class="sp-perde" id="sp-perde" hidden></div>
<aside class="sp" id="sp" aria-label="${esc(t.ad)}" aria-hidden="true">
  <div class="sp-bas"><p class="sp-baslik">${esc(t.ad)} <span id="sp-sayi"></span></p><button type="button" class="aa-ikon sp-kapat" aria-label="${esc(i18n[dil].kapat)}">${IK.x}</button></div>
  <ul class="sp-liste" id="sp-liste"></ul>
  <div class="sp-bos" id="sp-bos"><span class="sp-bos-ikon">${IK.canta.replace('width="20" height="20"', 'width="40" height="40"')}</span><p>${esc(t.bos)}</p><button type="button" class="as-btn sp-devam">${esc(t.devam)}</button></div>
  <div class="sp-alt" id="sp-alt" hidden>
    <p class="sp-not">${esc(t.not)}</p>
    <a class="aa-wp-btn aa-genis sp-tamamla" id="sp-tamamla" href="#" target="_blank" rel="noopener">${IK.wp}<span>${esc(t.tamamla)}</span></a>
    <button type="button" class="sp-devam sp-devam-link">${esc(t.devam)}</button>
  </div>
</aside>
<div class="sh" id="sh" role="dialog" aria-modal="true" aria-labelledby="sh-ad" hidden>
  <form class="sh-kutu" id="sh-form">
    <button type="button" class="aa-ikon sh-kapat" aria-label="${esc(i18n[dil].kapat)}">${IK.x}</button>
    <p class="sh-ust">${esc(t.sec)}</p>
    <p class="sh-ad" id="sh-ad"></p>
    <p class="sh-kod" id="sh-kod"></p>
    <fieldset><legend>${esc(t.renk)}: <b id="sh-renk-ad"></b></legend><div class="ur-renkler" id="sh-renkler"></div></fieldset>
    <fieldset id="sh-beden-alan"><legend>${esc(t.beden)}</legend><div class="ur-bedenler" id="sh-bedenler"></div><p class="sh-uyari" hidden>${esc(t.bedenUyari)}</p></fieldset>
    <button type="submit" class="as-btn aa-genis sh-ekle">${IK.canta}<span>${esc(t.ekle)}</span></button>
  </form>
</div>
<script type="application/json" id="sp-veri">${JSON.stringify(veri).replace(/</g, '\\u003c')}</script>`;
}

function carkHtml(dil) {
  const C = site.cark;
  if (!C || !C.aktif || !C.dilimler || !C.dilimler.length) return '';
  const t = i18n[dil].cark;
  const S = site.sayfalar;
  const n = C.dilimler.length;
  const aci = 360 / n;
  const nokta = (a, r) => { const rad = (a - 90) * Math.PI / 180; return [(150 + r * Math.cos(rad)).toFixed(2), (150 + r * Math.sin(rad)).toFixed(2)]; };
  const dilimler = C.dilimler.map((d, i) => {
    const koyu = ['#3a1747', '#d52878', '#7a49c9', '#f2683f'];
    const [bg, fg] = i % 2 === 0 ? [koyu[(i / 2) % 4], '#fff'] : ['#fff', '#3a1747'];
    const a1 = i * aci, a2 = (i + 1) * aci;
    const [x1, y1] = nokta(a1, 132), [x2, y2] = nokta(a2, 132);
    const orta = a1 + aci / 2;
    return `<path d="M150 150 L${x1} ${y1} A132 132 0 0 1 ${x2} ${y2} Z" fill="${bg}"/><g transform="rotate(${orta} 150 150)"><text x="150" y="58" text-anchor="middle" fill="${fg}" font-size="22" font-weight="700" font-family="Onest,Arial,sans-serif">${d.tutar}</text><text x="150" y="80" text-anchor="middle" fill="${fg}" font-size="13" font-weight="600" letter-spacing="1.5" font-family="Onest,Arial,sans-serif">${esc(t.tl)}</text></g>`;
  }).join('');
  const lambalar = Array.from({ length: n * 3 }, (_, i) => { const [x, y] = nokta(i * 360 / (n * 3), 142); return `<circle cx="${x}" cy="${y}" r="3.2" fill="${i % 2 ? '#fdba74' : '#fff'}"/>`; }).join('');
  const carkSvg = `<svg viewBox="0 0 300 300" aria-hidden="true"><circle cx="150" cy="150" r="148" fill="#24122b"/>${lambalar}<g class="ck-teker" id="ck-teker">${dilimler}</g><circle cx="150" cy="150" r="40" fill="#fff" stroke="#24122b" stroke-width="4"/><image href="${'{{KOK}}'}assets/img/logo.webp" x="118" y="122" width="64" height="55"/></svg><span class="ck-ok" aria-hidden="true"></span>`;
  const veri = { dilimler: C.dilimler, kayitUrl: C.kayitUrl || A.yonetimApi || '', wa: A.whatsapp, t: { mesaj: t.mesaj, kazandin: t.kazandin, hata: t.hata, kopyalandi: t.kopyalandi, kopyala: t.kopyala, donuyor: t.donuyor, cevir: t.cevir, kullanildi: t.kullanildi, kontrol: t.kontrol, baglanti: t.baglanti } };
  return `
<button type="button" class="ck-ac" id="ck-ac"><span class="ck-ac-ikon" aria-hidden="true"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#24122b"/><path d="M20 20L20 3A17 17 0 0 1 36.2 15Z" fill="#d52878"/><path d="M20 20L36.2 15A17 17 0 0 1 30 33.8Z" fill="#fff"/><path d="M20 20L30 33.8A17 17 0 0 1 10 33.8Z" fill="#7a49c9"/><path d="M20 20L10 33.8A17 17 0 0 1 3.8 15Z" fill="#fff"/><path d="M20 20L3.8 15A17 17 0 0 1 20 3Z" fill="#fd8c2c"/><circle cx="20" cy="20" r="5" fill="#fff"/></svg></span><span>${esc(t.buton)}</span></button>
<div class="ck" id="ck" role="dialog" aria-modal="true" aria-labelledby="ck-baslik" hidden>
  <div class="ck-kutu">
    <button type="button" class="ck-kapat" aria-label="${esc(t.kapat)}">${IK.x}</button>
    <div class="ck-sol">
      <div class="ck-bant">${esc(t.bant)}</div>
      <div class="ck-cark">${carkSvg}</div>
    </div>
    <div class="ck-sag">
      <form class="ck-form" id="ck-form" novalidate>
        <h2 id="ck-baslik">${esc(t.baslik)}</h2>
        <p>${esc(t.metin)}</p>
        <input type="tel" name="tel" inputmode="tel" autocomplete="tel" placeholder="${esc(t.telefon)}" maxlength="18" required>
        <input type="text" name="web" class="ck-tuzak" tabindex="-1" autocomplete="off" aria-hidden="true">
        <p class="ck-hata" hidden>${esc(t.hata)}</p>
        <label><input type="checkbox" name="ticari" required><span>${esc(t.ticari)} *</span></label>
        <label><input type="checkbox" name="kvkk" required><span>${esc(t.kvkk).replace('KVKK', `<a href="${href(dil, S.kvkk[dil].slug)}" target="_blank" rel="noopener">KVKK</a>`)} *</span></label>
        <button type="submit" class="ck-cevir" disabled>${esc(t.cevir)}</button>
      </form>
      <div class="ck-sonuc" id="ck-sonuc" hidden>
        <p class="ck-tebrik">${esc(t.tebrik)}</p>
        <h2 class="ck-kazandin"></h2>
        <p class="ck-kod-et">${esc(t.kodun)}</p>
        <div class="ck-kod"><b id="ck-kod"></b><button type="button" class="ck-kopyala">${esc(t.kopyala)}</button></div>
        <a class="aa-wp-btn aa-genis ck-kullan" id="ck-kullan" href="#" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="cark">${IK.wp}<span>${esc(t.kullan)}</span></a>
        <p class="ck-not">${esc(t.not)}</p>
      </div>
    </div>
  </div>
</div>
<script type="application/json" id="ck-veri">${JSON.stringify(veri).replace(/</g, '\\u003c')}</script>`;
}

function yolSema(govde) {
  const m = govde.match(/<nav class="aa-yol[^"]*"[^>]*>([\s\S]*?)<\/nav>/);
  if (!m || !TABAN) return '';
  const ogeler = [];
  m[1].replace(/<(a|span) ?([^>]*)>([^<]*)<\/\1>/g, (x, tag, attr, metin) => {
    if (metin === '/') return x;
    const h = (attr.match(/href="([^"]*)"/) || [])[1];
    ogeler.push({ ad: metin, h });
    return x;
  });
  return ogeler;
}

function sayfa({ dil, slugs, baslik, aciklama, govde, ek = '', js = [], sinif = '', taban: tabanYolu = '', robots = '', diller = DILLER, haritaya = true, gorsel = '', gorseller = [] }) {
  const taban = TABAN;
  const kanonik = tamUrl(dil, slugs[dil]);
  const alt = taban && !robots ? diller.map(d => `<link rel="alternate" hreflang="${d}" href="${tamUrl(d, slugs[d])}">`).join('\n') + (diller.includes('tr') ? `\n<link rel="alternate" hreflang="x-default" href="${tamUrl('tr', slugs.tr)}">` : '') + `\n<link rel="canonical" href="${kanonik}">` : '';
  if (taban && !robots && haritaya) URL_LISTE.push({ loc: kanonik, alt: diller.map(d => [d, tamUrl(d, slugs[d])]), resimler: (gorseller.length ? gorseller : gorsel ? [gorsel] : []).map(p => /^https?:/.test(p) ? p : taban + p) });
  const og = taban ? `<meta property="og:site_name" content="${esc(A.marka)}">
<meta property="og:title" content="${esc(baslik)}">
<meta property="og:description" content="${esc(aciklama)}">
<meta property="og:url" content="${kanonik}">
<meta property="og:image" content="${gorsel ? (/^https?:/.test(gorsel) ? gorsel : taban + gorsel) : taban + 'assets/img/icon-512.png'}">
<meta property="og:locale" content="${OGLOC[dil]}">${ek.includes('og:type') ? '' : '\n<meta property="og:type" content="website">'}
<meta name="twitter:card" content="${gorsel ? 'summary_large_image' : 'summary'}">` : '';
  const yol = yolSema(govde);
  const kirinti = yol && yol.length > 1 ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: yol.map((o, i) => ({ '@type': 'ListItem', position: i + 1, name: o.ad.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"'), item: o.h ? new URL(o.h, kanonik).href : kanonik })) }).replace(/</g, '\\u003c')}</script>` : '';
  const gtm = A.gtm ? `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${esc(A.gtm)}');</script>` : '';
  const ga4 = A.ga4 ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(A.ga4)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${esc(A.ga4)}');</script>` : '';
  const fb = A.metaPixel ? `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${esc(A.metaPixel)}');fbq('track','PageView');</script>` : '';
  const fbNs = A.metaPixel ? `<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${esc(A.metaPixel)}&ev=PageView&noscript=1" alt=""></noscript>` : '';
  const tt = A.tiktokPixel ? `<script>!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=d.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=d.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('${esc(A.tiktokPixel)}');ttq.page();}(window,document,'ttq');</script>` : '';
  const dogrula = A.googleDogrulama ? `<meta name="google-site-verification" content="${esc(A.googleDogrulama)}">` : '';
  const izleme = (A.ga4 || A.metaPixel || A.tiktokPixel) ? `\n<script src="${kok(dil)}assets/js/izleme.js?v=${SURUM}" defer></script>` : '';
  const gtmNs = A.gtm ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${esc(A.gtm)}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>` : '';
  return `<!DOCTYPE html>
<html lang="${HTMLLANG[dil]}">
<head>
<meta charset="utf-8">${tabanYolu ? `\n<base href="${esc(tabanYolu)}">` : ''}${robots ? `\n<meta name="robots" content="${esc(robots)}">` : ''}
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(baslik)}</title>
<meta name="description" content="${esc(aciklama)}">
${alt}
${og}
${kirinti}
<link rel="icon" href="${kok(dil)}assets/img/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="48x48" href="${kok(dil)}assets/img/favicon-48.png">
<link rel="apple-touch-icon" href="${kok(dil)}assets/img/favicon.png">
<meta name="theme-color" content="#7a49c9">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600&family=Ysabeau:wght@500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${kok(dil)}assets/css/site.css?v=${SURUM}">
${ek}
${dogrula}${process.env.DENEME && HEDEF === 'hosting' ? '\n<meta name="robots" content="noindex, nofollow">' : ''}
${gtm}
${ga4}
${fb}
${tt}
</head>
<body${sinif ? ` class="${sinif}"` : ''}>
${gtmNs}
${fbNs}
${header(dil, slugs)}
<main id="icerik">${govde}</main>
${footer(dil, slugs)}
${sepetHtml(dil)}
${carkHtml(dil).split('{{KOK}}').join(kok(dil))}
<script src="${kok(dil)}assets/js/site.js?v=${SURUM}" defer></script>${izleme}
<script src="${kok(dil)}assets/js/sepet.js?v=${SURUM}" defer></script>${site.cark && site.cark.aktif ? `\n<script src="${kok(dil)}assets/js/cark.js?v=${SURUM}" defer></script>` : ''}${js.map(f => `\n<script src="${kok(dil)}assets/js/${f}?v=${SURUM}" defer></script>`).join('')}
</body>
</html>
`;
}

function kopyala(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    e.isDirectory() ? kopyala(s, d) : fs.copyFileSync(s, d);
  }
}

function yaz(rel, html) {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
}

const ANA = {
  tr: { baslik: 'Antalya Abiye | Abiye Modelleri Ve Abiye Mağazası', aciklama: 'Antalya Abiye: tesettür abiye, prenses abiye, nişan abiye ve fırsat abiyeler. Beğendiğin modeli seç, WhatsApp\'tan sipariş ver.' },
  en: { baslik: 'Antalya Abiye | Evening Dresses In Antalya', aciklama: 'Evening dress store in Antalya: hijab evening dresses, princess gowns and engagement dresses. Choose your style and order on WhatsApp.' },
  ru: { baslik: 'Antalya Abiye | Вечерние Платья В Анталье', aciklama: 'Магазин вечерних платьев в Анталье: закрытые платья, платья принцессы и платья на помолвку. Выберите модель и закажите через WhatsApp.' }
};

fs.rmSync(OUT, { recursive: true, force: true });
kopyala(path.join(ROOT, 'assets'), path.join(OUT, 'assets'));
kopyala(path.join(ROOT, 'data'), path.join(OUT, 'data'));
kopyala(path.join(ROOT, 'yonetim'), path.join(OUT, 'yonetim'));
for (const f of ['index.html']) { const p = path.join(OUT, 'yonetim', f); fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace(/__SURUM__/g, SURUM)); }
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
fs.copyFileSync(path.join(ROOT, 'assets/img/favicon.ico'), path.join(OUT, 'favicon.ico'));

const ctx = { avantajlar, esc, wa, href, kok, IK, A, site, i18n, telGoster, telHref, saatOzet, GUN, GUNK, DILLER, ROOT };
const URUNLER = GUVENLIK.urunler(JSON.parse(fs.readFileSync(path.join(ROOT, 'data/urunler.json'), 'utf8')).urunler);
const RENKLER = GUVENLIK.renkler(JSON.parse(fs.readFileSync(path.join(ROOT, 'data/renkler.json'), 'utf8')).renkler);
for (const u of URUNLER) {
  u.renkler = (u.renkler || []).filter(r => RENKLER[r]);
  if (!u.renkler.length) u.renkler = [Object.keys(RENKLER)[0]];
  u.bedenler = (u.bedenler && u.bedenler.length) ? u.bedenler : ['38'];
  u.kullanim = u.kullanim || [];
  u.fotograflar = u.fotograflar || [];
  for (const d of DILLER) {
    u[d] = u[d] || {};
    if (!u[d].ad) u[d].ad = u.tr.ad;
    if (!u[d].aciklama) u[d].aciklama = d === 'tr' ? '' : u.tr.aciklama || '';
    if (!u[d].slug) u[d].slug = u.tr.slug + (d === 'tr' ? '' : '-' + d);
  }
}
ctx.URUNLER = URUNLER;
ctx.BLOG = GUVENLIK.blog(JSON.parse(fs.readFileSync(path.join(ROOT, 'data/blog.json'), 'utf8')).yazilar);
ctx.tabanUrl = TABAN;
const blog = require('./sayfalar/blog.js');
const kategoriSayfa = require('./sayfalar/kategori.js');
const urunSayfa = require('./sayfalar/urun.js');
const SAYFALAR = [
  ['beden', require('./sayfalar/beden.js')],
  ['iletisim', require('./sayfalar/iletisim.js')],
  ['hakkimizda', require('./sayfalar/hakkimizda.js')],
  ['kvkk', require('./sayfalar/kvkk.js')],
  ['iade', require('./sayfalar/yasal.js').iade],
  ['mesafeli', require('./sayfalar/yasal.js').mesafeli],
  ['sss', require('./sayfalar/yardim.js').sss],
  ['siparis', require('./sayfalar/yardim.js').siparis],
  ['gizlilik', require('./sayfalar/yardim.js').gizlilik],
  ['favoriler', require('./sayfalar/yardim.js').favoriler],
  ['arama', require('./sayfalar/yardim.js').arama]
];

for (const dil of DILLER) {
  const bos = { tr: '', en: '', ru: '' };
  yaz(dosya(dil, ''), sayfa({ dil, slugs: bos, ...require('./sayfalar/anasayfa.js')(ctx, dil) }));
  for (const [anahtar, uret] of SAYFALAR) {
    const S = site.sayfalar[anahtar];
    const slugs = { tr: S.tr.slug, en: S.en.slug, ru: S.ru.slug };
    yaz(dosya(dil, slugs[dil]), sayfa({ dil, slugs, ...uret(ctx, dil) }));
  }
  {
    const S = site.sayfalar.blog;
    const slugs = { tr: S.tr.slug, en: S.en.slug, ru: S.ru.slug };
    yaz(dosya(dil, slugs[dil]), sayfa({ dil, slugs, ...blog.liste(ctx, dil) }));
  }
  for (const y of ctx.BLOG.filter(x => x[dil])) {
    const diller = DILLER.filter(d => y[d]);
    const slugs = Object.fromEntries(DILLER.map(d => [d, y[d] ? y[d].slug : site.sayfalar.blog[d].slug]));
    yaz(dosya(dil, slugs[dil]), sayfa({ dil, slugs, diller, sinif: 'bl-sayfa', ...blog.yazi(ctx, dil, y) }));
  }
  for (const kat of site.kategoriler) {
    const slugs = { tr: kat.tr.slug, en: kat.en.slug, ru: kat.ru.slug };
    yaz(dosya(dil, slugs[dil]), sayfa({ dil, slugs, ...kategoriSayfa(ctx, dil, kat, URUNLER) }));
  }
  for (const u of URUNLER) {
    const slugs = { tr: u.tr.slug, en: u.en.slug, ru: u.ru.slug };
    yaz(dosya(dil, slugs[dil]), sayfa({ dil, slugs, ...urunSayfa(ctx, dil, u, URUNLER) }));
  }
}

yaz('404.html', sayfa({ dil: 'tr', slugs: { tr: '', en: '', ru: '' }, ...require('./sayfalar/bulunamadi.js')(ctx), taban: HEDEF === 'hosting' ? '/' : (A.taban || '/') }));

if (HEDEF === 'hosting') {
  const CSP_ZORUNLU = "frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests";
  const CSP_RAPOR = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://analytics.tiktok.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob:",
    "connect-src 'self' https://script.google.com https://script.googleusercontent.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.facebook.com https://*.facebook.net https://*.tiktok.com https://*.tiktokw.us",
    "frame-src https://www.google.com https://www.googletagmanager.com https://*.facebook.com",
    "object-src 'none'", "base-uri 'self'", "frame-ancestors 'self'"
  ].join('; ');
  fs.writeFileSync(path.join(OUT, '.htaccess'), `Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html
ErrorDocument 403 /404.html
AddDefaultCharset utf-8
AddType image/webp .webp
AddType video/mp4 .mp4
AddType application/manifest+json .webmanifest

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteCond %{HTTP:X-Forwarded-Proto} !https
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
RewriteRule (^|/)\\. - [F,L]
RewriteCond %{THE_REQUEST} \\s/+(.*?)index\\.html[\\s?] [NC]
RewriteRule ^ /%1 [R=301,L,NE]
RewriteCond %{THE_REQUEST} \\s/+(.+?)\\.html[\\s?] [NC]
RewriteRule ^ /%1 [R=301,L,NE]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+?)/?$ $1.html [L]
RewriteRule \\.(md|gs|sh|log|bak|old|orig|sql|env|ini|yml|yaml|lock)$ - [F,L,NC]
</IfModule>

<IfModule mod_headers.c>
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
Header always set Strict-Transport-Security "max-age=31536000"
Header always set Cross-Origin-Opener-Policy "same-origin-allow-popups"
Header always set Content-Security-Policy "${CSP_ZORUNLU}"
Header always set Content-Security-Policy-Report-Only "${CSP_RAPOR}"
Header unset X-Powered-By${process.env.DENEME ? '\nHeader always set X-Robots-Tag "noindex, nofollow"' : ''}
<FilesMatch "\\.(css|js|webp|png|jpe?g|svg|ico|woff2?|mp4)$">
Header set Cache-Control "public, max-age=2592000"
</FilesMatch>
<FilesMatch "\\.(html|json|xml|txt)$">
Header set Cache-Control "no-cache"
</FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml text/xml application/xml text/plain
</IfModule>
`);
  fs.writeFileSync(path.join(OUT, 'yonetim', '.htaccess'), `<IfModule mod_headers.c>
Header always set X-Robots-Tag "noindex, nofollow"
Header always set X-Frame-Options "DENY"
Header always set Cache-Control "no-store"
</IfModule>
`);
  if (process.env.DENEME) fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nAllow: /\n');
  else if (!TABAN) fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nAllow: /\nDisallow: /yonetim/\n');
}

if (TABAN) {
  const bugun = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${URL_LISTE.map(u => `<url><loc>${u.loc}</loc><lastmod>${bugun}</lastmod>${u.alt.length > 1 ? u.alt.map(([d, h]) => `<xhtml:link rel="alternate" hreflang="${d}" href="${h}"/>`).join('') : ''}${(u.resimler || []).map(r => `<image:image><image:loc>${r}</image:loc></image:image>`).join('')}</url>`).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), xml);
  fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /yonetim/\n\nSitemap: ${TABAN}sitemap.xml\n`);
}

console.log(HEDEF === 'hosting' ? 'dist-hosting hazır' : 'dist hazır');
