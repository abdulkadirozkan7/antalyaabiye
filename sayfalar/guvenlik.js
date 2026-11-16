const MEDYA = /^assets\/[A-Za-z0-9/_.-]+\.(webp|jpe?g|png|mp4)$/;
const HEX = /^#[0-9a-fA-F]{3,8}$/;

const medya = v => (typeof v === 'string' && MEDYA.test(v) && v.indexOf('..') < 0 ? v : '');
const hex = v => (typeof v === 'string' && HEX.test(v) ? v : '#cccccc');
const https = (v, onEk) => {
  if (typeof v !== 'string' || !v) return '';
  try {
    const u = new URL(v);
    if (u.protocol !== 'https:') return '';
    if (onEk && !onEk.some(o => (u.hostname + u.pathname).startsWith(o))) return '';
    return u.href;
  } catch (e) { return ''; }
};
const kalip = (v, re) => (typeof v === 'string' && re.test(v.trim()) ? v.trim() : '');
const rakam = v => String(v == null ? '' : v).replace(/\D/g, '');

function ayarlar(A) {
  A.whatsapp = rakam(A.whatsapp);
  A.telefon = rakam(A.telefon);
  A.instagram = kalip(A.instagram, /^[A-Za-z0-9._]{1,40}$/);
  A.facebook = kalip(A.facebook, /^[A-Za-z0-9._-]{1,60}$/);
  A.harita = https(A.harita, ['www.google.com/maps', 'maps.google.com', 'maps.app.goo.gl', 'goo.gl/maps', 'google.com/maps']);
  A.google = https(A.google, ['share.google', 'g.page', 'www.google.com', 'google.com', 'maps.app.goo.gl', 'g.co']);
  A.haritaEmbed = https(A.haritaEmbed, ['www.google.com/maps/embed']);
  A.yonetimApi = https(A.yonetimApi, ['script.google.com/macros/']);
  A.gtm = kalip(A.gtm, /^GTM-[A-Z0-9]{4,12}$/);
  A.ga4 = kalip(A.ga4, /^G-[A-Z0-9]{4,15}$/);
  A.metaPixel = kalip(A.metaPixel, /^\d{8,20}$/);
  A.tiktokPixel = kalip(A.tiktokPixel, /^[A-Z0-9]{10,30}$/);
  A.googleDogrulama = kalip(A.googleDogrulama, /^[A-Za-z0-9_-]{10,100}$/);
  A.alanadi = kalip(String(A.alanadi || '').replace(/^https?:\/\//, '').replace(/\/+$/, ''), /^[a-z0-9.-]+\.[a-z]{2,}$/i);
  A.yayinUrl = https(A.yayinUrl);
  A.magazaGorsel = medya(A.magazaGorsel);
  A.googleYorum = Number(A.googleYorum) || 0;
  A.instagramTakipci = Number(A.instagramTakipci) || 0;
  A.googlePuan = kalip(String(A.googlePuan || ''), /^[0-5]([.,]\d)?$/);
}

function site(S) {
  ayarlar(S.ayarlar);
  if (S.cark) S.cark.kayitUrl = https(S.cark.kayitUrl, ['script.google.com/macros/']);
  (S.kategoriler || []).forEach(k => { k.gorsel = medya(k.gorsel); });
  (S.bannerlar || []).forEach(b => { b.gorsel = medya(b.gorsel); b.gorselMobil = medya(b.gorselMobil); });
  (S.vitrin || []).forEach(v => { v.gorsel = medya(v.gorsel); });
  (S.instagramVideolar || []).forEach(v => { v.video = medya(v.video); v.kapak = medya(v.kapak); });
  return S;
}

function renkler(R) {
  Object.keys(R).forEach(k => { R[k].hex = hex(R[k].hex); });
  return R;
}

function urunler(U) {
  U.forEach(u => {
    u.fotograflar = (u.fotograflar || []).map(medya);
    if (u.renkFotolari) Object.keys(u.renkFotolari).forEach(r => { u.renkFotolari[r] = (u.renkFotolari[r] || []).map(medya); });
  });
  return U;
}

function blog(B) {
  B.forEach(y => { y.kapak = medya(y.kapak); });
  return B;
}

module.exports = { site, renkler, urunler, blog, medya, hex };
