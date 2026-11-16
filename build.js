const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'dist');
const site = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/site.json'), 'utf8'));
const i18n = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/i18n.json'), 'utf8'));
const A = site.ayarlar;
const DILLER = ['tr', 'en', 'ru'];
const HTMLLANG = { tr: 'tr', en: 'en', ru: 'ru' };

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const kok = dil => (dil === 'tr' ? '' : '../');
const dosya = (dil, slug) => (dil === 'tr' ? '' : dil + '/') + (slug ? slug + '.html' : 'index.html');
const href = (dil, slug) => (slug ? slug + '.html' : dil === 'tr' ? './' : './');
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
    const hedef = kok(dil) + dosya(d, slugs[d]).replace(/index\.html$/, '');
    const ic = `${BAYRAK[d]}<span>${d.toUpperCase()}</span>`;
    return d === dil ? `<span class="aa-dil-on" aria-current="true" title="${DILAD[d]}">${ic}</span>` : `<a href="${hedef || './'}" hreflang="${d}" lang="${d}" title="${DILAD[d]}">${ic}</a>`;
  }).join('') + '</div>';
}

function dilAcilir(dil, slugs) {
  const digerleri = DILLER.filter(d => d !== dil).map(d => {
    const hedef = kok(dil) + dosya(d, slugs[d]).replace(/index\.html$/, '');
    return `<a href="${hedef || './'}" hreflang="${d}" lang="${d}">${BAYRAK[d]}<span>${DILAD[d]}</span></a>`;
  }).join('');
  return `<details class="aa-dil-ac"><summary aria-label="${esc(i18n[dil].dil)}">${BAYRAK[dil]}<span>${dil.toUpperCase()}</span>${IK.ok}</summary><div><span class="aa-dil-secili">${BAYRAK[dil]}<span>${DILAD[dil]}</span></span>${digerleri}</div></details>`;
}

const telHref = n => 'tel:+' + String(n).replace(/\D/g, '');

function header(dil, slugs) {
  const t = i18n[dil];
  const S = site.sayfalar;
  const anaMenu = site.kategoriler.filter(k => k.menu);
  const yeni = anaMenu.find(k => k.id === 'yeni');
  const digerleri = anaMenu.filter(k => k.id !== 'yeni');
  const link = (k, cls) => `<a href="${href(dil, k[dil].slug)}"${cls ? ` class="${cls}"` : ''}>${esc(k[dil].ad)}</a>`;
  const acilir = site.kategoriler.filter(k => k.id !== 'yeni' && !k.vurgu).map(k => `<li>${link(k)}</li>`).join('');
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
    `<li><a href="${href(dil, S.hakkimizda[dil].slug)}">${esc(S.hakkimizda[dil].ad)}</a></li>`,
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

function footer(dil, slugs) {
  const t = i18n[dil];
  const S = site.sayfalar;
  const sl = (k) => `<li><a href="${href(dil, k[dil].slug)}">${esc(k[dil].ad)}</a></li>`;
  const kategoriler = site.kategoriler.filter(k => k.id !== 'yeni').map(sl).join('');
  const kurumsal = [S.hakkimizda, S.blog, S.iletisim].map(sl).join('');
  const yardim = [S.siparis, S.beden, S.sss, S.kvkk, S.gizlilik].map(sl).join('');
  const tel = A.telefon || A.whatsapp;
  const waLink = wa(t.wpMesaj);
  const igLink = A.instagram ? `https://www.instagram.com/${esc(A.instagram)}/` : '';
  const fbLink = A.facebook ? `https://www.facebook.com/${esc(A.facebook)}` : '';
  const satir = (ik, ic) => `<li>${ik}<span>${ic}</span></li>`;
  const iletisim = [
    satir(IK.wp, `<small>${esc(t.fWp)}</small><a href="${waLink}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="footer">${esc(telGoster(A.whatsapp))}</a>`),
    A.telefon ? satir(IK.tel, `<small>${esc(t.magaza)}</small><a href="${telHref(A.telefon)}" data-olay="telefon_tikla" data-konum="footer">${esc(telGoster(A.telefon))}</a>`) : '',
    A.adres ? satir(IK.konum, A.harita ? `<a href="${esc(A.harita)}" target="_blank" rel="noopener">${esc(A.adres)}</a>` : esc(A.adres)) : '',
    A.saatler ? satir(IK.saat, esc(A.saatler)) : ''
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
  return `
<footer class="aa-footer">
  <div class="aa-f-ic">
    <div class="aa-f-marka">
      <a href="./" aria-label="${esc(A.marka)}"><img src="${kok(dil)}assets/img/logo.webp" width="480" height="409" alt="${esc(A.marka)}" loading="lazy"></a>
      <p>${esc(t.fSlogan)}</p>
      <a class="aa-wp-btn" href="${waLink}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="footer_buton">${IK.wp}<span>${esc(t.wpSiparis)}</span></a>
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
  <a class="aa-fav" href="${href(dil, S.favoriler[dil].slug)}">${IK.kalp}<b class="aa-fav-say" hidden>0</b><span>${esc(t.favori)}</span></a>
  <a href="${telHref(tel)}" data-olay="telefon_tikla" data-konum="alt_bar">${IK.tel}<span>${esc(t.telefon)}</span></a>
</nav>`;
}

function sayfa({ dil, slugs, baslik, aciklama, govde }) {
  const taban = A.alanadi ? 'https://' + A.alanadi.replace(/^https?:\/\//, '').replace(/\/$/, '') + '/' : '';
  const alt = taban ? DILLER.map(d => `<link rel="alternate" hreflang="${d}" href="${taban}${dosya(d, slugs[d]).replace(/index\.html$/, '')}">`).join('\n') + `\n<link rel="alternate" hreflang="x-default" href="${taban}${dosya('tr', slugs.tr).replace(/index\.html$/, '')}">\n<link rel="canonical" href="${taban}${dosya(dil, slugs[dil]).replace(/index\.html$/, '')}">` : '';
  const gtm = A.gtm ? `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${esc(A.gtm)}');</script>` : '';
  const gtmNs = A.gtm ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${esc(A.gtm)}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>` : '';
  return `<!DOCTYPE html>
<html lang="${HTMLLANG[dil]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(baslik)}</title>
<meta name="description" content="${esc(aciklama)}">
${alt}
<link rel="icon" href="${kok(dil)}assets/img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@500;600&family=Jost:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${kok(dil)}assets/css/site.css">
${gtm}
</head>
<body>
${gtmNs}
${header(dil, slugs)}
<main id="icerik">${govde}</main>
${footer(dil, slugs)}
<script src="${kok(dil)}assets/js/site.js" defer></script>
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
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

for (const dil of DILLER) {
  const slugs = { tr: '', en: '', ru: '' };
  yaz(dosya(dil, ''), sayfa({ dil, slugs, baslik: ANA[dil].baslik, aciklama: ANA[dil].aciklama, govde: '' }));
}

console.log('dist hazır');
