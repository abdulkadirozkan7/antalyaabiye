const OZ = PropertiesService.getScriptProperties();
const IZINLI_DOSYALAR = ['data/urunler.json', 'data/site.json', 'data/blog.json', 'data/renkler.json', 'data/beden.json'];
const OTURUM_SAAT = 12;

function kurulum() {
  const v = {
    GITHUB_REPO: 'abdulkadirozkan7/antalyaabiye',
    GITHUB_DAL: 'main',
    YONETICI_KULLANICI: 'zafer'
  };
  Object.keys(v).forEach(k => { if (!OZ.getProperty(k)) OZ.setProperty(k, v[k]); });
  if (!OZ.getProperty('OTURUM_ANAHTARI')) OZ.setProperty('OTURUM_ANAHTARI', Utilities.getUuid() + Utilities.getUuid());
  if (!OZ.getProperty('YONETICI_TUZ')) OZ.setProperty('YONETICI_TUZ', Utilities.getUuid());
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss) OZ.setProperty('CARK_TABLO_ID', ss.getId());
  Logger.log('Kurulum tamam. Şimdi GITHUB_TOKEN ekleyin ve sifreBelirle() çalıştırın.');
}

function eTabloyuPaylas() {
  const EPOSTA = '';
  if (!EPOSTA) throw new Error('EPOSTA satırına paylaşılacak e-posta adresini yazın.');
  SpreadsheetApp.getActiveSpreadsheet().addEditor(EPOSTA);
  Logger.log('E-tablo paylaşıldı: ' + EPOSTA);
}

function sifreBelirle() {
  const YENI_SIFRE = '';
  if (YENI_SIFRE.length < 10) throw new Error('YENI_SIFRE en az 10 karakter olmalı.');
  OZ.setProperty('YONETICI_SIFRE_HASH', hash_(YENI_SIFRE));
  OZ.setProperty('OTURUM_SURUM', String(Number(OZ.getProperty('OTURUM_SURUM') || 0) + 1));
  Logger.log('Şifre kaydedildi. Güvenlik için YENI_SIFRE satırını tekrar boşaltın.');
}

function hash_(s) {
  const tuz = Utilities.newBlob(OZ.getProperty('YONETICI_TUZ')).getBytes();
  let b = Utilities.computeHmacSha256Signature(Utilities.newBlob(String(s)).getBytes(), tuz);
  for (let i = 0; i < 2000; i++) b = Utilities.computeHmacSha256Signature(b, tuz);
  return Utilities.base64Encode(b);
}

function esit_(a, b) {
  a = String(a || ''); b = String(b || '');
  let f = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) f |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return f === 0;
}

function sayac_(anahtar, sure) {
  const c = CacheService.getScriptCache();
  const n = Number(c.get(anahtar) || 0) + 1;
  c.put(anahtar, String(n), sure);
  return n;
}

function imza_(s) {
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(s, OZ.getProperty('OTURUM_ANAHTARI')));
}

function tokenUret_(kullanici) {
  const govde = Utilities.base64EncodeWebSafe(JSON.stringify({ k: kullanici, s: Date.now() + OTURUM_SAAT * 3600000, v: OZ.getProperty('OTURUM_SURUM') || '0' }));
  return govde + '.' + imza_(govde);
}

function tokenKontrol_(t) {
  if (!t || t.indexOf('.') < 0) return false;
  const p = t.split('.');
  if (p.length !== 2 || !esit_(imza_(p[0]), p[1])) return false;
  let v;
  try { v = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(p[0])).getDataAsString()); } catch (e) { return false; }
  return v.s > Date.now() && String(v.v) === String(OZ.getProperty('OTURUM_SURUM') || '0');
}

function cevap_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function gh_(yol, yontem, govde) {
  const r = UrlFetchApp.fetch('https://api.github.com/repos/' + OZ.getProperty('GITHUB_REPO') + yol, {
    method: yontem || 'get',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + OZ.getProperty('GITHUB_TOKEN'), Accept: 'application/vnd.github+json' },
    payload: govde ? JSON.stringify(govde) : undefined,
    muteHttpExceptions: true
  });
  const kod = r.getResponseCode();
  const metin = r.getContentText();
  if (kod >= 300 && kod !== 404) throw new Error('GitHub ' + kod + ': ' + metin.slice(0, 200));
  return kod === 404 ? null : JSON.parse(metin || '{}');
}

function dosyaOku_(dosya) {
  const r = gh_('/contents/' + encodeURI(dosya) + '?ref=' + OZ.getProperty('GITHUB_DAL'));
  if (!r) return null;
  return { sha: r.sha, icerik: Utilities.newBlob(Utilities.base64Decode(r.content.replace(/\n/g, ''))).getDataAsString('UTF-8') };
}

function dosyaYaz_(dosya, base64, mesaj) {
  const mevcut = gh_('/contents/' + encodeURI(dosya) + '?ref=' + OZ.getProperty('GITHUB_DAL'));
  return gh_('/contents/' + encodeURI(dosya), 'put', {
    message: mesaj,
    content: base64,
    branch: OZ.getProperty('GITHUB_DAL'),
    sha: mevcut ? mevcut.sha : undefined
  });
}

function girisDene_(v) {
  const onbellek = CacheService.getScriptCache();
  const anahtar = 'giris_' + String(v.kullanici || '').toLowerCase();
  const deneme = Number(onbellek.get(anahtar) || 0);
  const toplam = Number(onbellek.get('giris_toplam') || 0);
  if (deneme >= 5 || toplam >= 25) return { hata: 'Çok fazla hatalı deneme. 15 dakika sonra tekrar deneyin.' };
  if (String(v.sifre || '').length > 200) return { hata: 'Kullanıcı adı veya şifre hatalı.' };
  const kayitli = OZ.getProperty('YONETICI_SIFRE_HASH');
  const dogru = !!kayitli && esit_(String(v.kullanici || '').toLowerCase(), String(OZ.getProperty('YONETICI_KULLANICI')).toLowerCase())
    && esit_(hash_(String(v.sifre || '')), kayitli);
  if (!dogru) {
    onbellek.put(anahtar, String(deneme + 1), 900);
    sayac_('giris_toplam', 900);
    return { hata: 'Kullanıcı adı veya şifre hatalı.' };
  }
  onbellek.remove(anahtar);
  return { token: tokenUret_(OZ.getProperty('YONETICI_KULLANICI')), kullanici: OZ.getProperty('YONETICI_KULLANICI') };
}

function temizAd_(s) {
  return String(s || 'dosya').toLowerCase()
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50) || 'dosya';
}

function doPost(e) {
  let v;
  try { v = JSON.parse(e.postData.contents); } catch (x) { return cevap_({ hata: 'Geçersiz istek.' }); }
  try {
    if (v.islem === 'kontrol' || v.islem === 'kaydet') return cevap_(cark_(v));
    if (v.islem === 'giris') return cevap_(girisDene_(v));
    if (!tokenKontrol_(v.token)) return cevap_({ hata: 'Oturum süresi doldu. Tekrar giriş yapın.', oturum: false });

    if (v.islem === 'oku') {
      if (IZINLI_DOSYALAR.indexOf(v.dosya) < 0) return cevap_({ hata: 'İzin yok.' });
      const d = dosyaOku_(v.dosya);
      return cevap_({ icerik: d ? d.icerik : null });
    }
    if (v.islem === 'yaz') {
      if (IZINLI_DOSYALAR.indexOf(v.dosya) < 0) return cevap_({ hata: 'İzin yok.' });
      JSON.parse(v.icerik);
      const kilit = LockService.getScriptLock();
      kilit.waitLock(20000);
      try {
        dosyaYaz_(v.dosya, Utilities.base64Encode(v.icerik, Utilities.Charset.UTF_8), 'Panel: ' + (v.mesaj || v.dosya + ' güncellendi'));
      } finally { kilit.releaseLock(); }
      return cevap_({ ok: true });
    }
    if (v.islem === 'yukle') {
      const uzanti = { 'image/webp': 'webp', 'video/mp4': 'mp4', 'image/jpeg': 'jpg', 'image/png': 'png' }[v.tur];
      if (!uzanti) return cevap_({ hata: 'Desteklenmeyen dosya türü.' });
      const b64 = String(v.base64 || '');
      const sinir = uzanti === 'mp4' ? 20 * 1024 * 1024 : 5 * 1024 * 1024;
      if (!b64 || b64.length * 0.75 > sinir) return cevap_({ hata: 'Dosya çok büyük.' });
      const bas = Utilities.base64Decode(b64.slice(0, 24)).map(x => (x + 256) % 256);
      const metin = (a, b) => String.fromCharCode.apply(null, bas.slice(a, b));
      const gecerli = { webp: metin(0, 4) === 'RIFF' && metin(8, 12) === 'WEBP', mp4: metin(4, 8) === 'ftyp', jpg: bas[0] === 0xFF && bas[1] === 0xD8 && bas[2] === 0xFF, png: bas[0] === 0x89 && metin(1, 4) === 'PNG' }[uzanti];
      if (!gecerli) return cevap_({ hata: 'Dosya içeriği türüyle uyuşmuyor.' });
      const t = new Date();
      const yol = 'assets/uploads/' + t.getFullYear() + '/' + ('0' + (t.getMonth() + 1)).slice(-2) + '/' + temizAd_(v.ad) + '-' + Utilities.getUuid().slice(0, 6) + '.' + uzanti;
      dosyaYaz_(yol, b64, 'Panel: görsel yüklendi');
      return cevap_({ yol: yol });
    }
    if (v.islem === 'durum') {
      const r = gh_('/actions/runs?per_page=1');
      const s = r && r.workflow_runs && r.workflow_runs[0];
      return cevap_({ durum: s ? s.status : 'bilinmiyor', sonuc: s ? s.conclusion : null });
    }
    return cevap_({ hata: 'Bilinmeyen işlem.' });
  } catch (x) {
    console.error(x);
    return cevap_({ hata: tokenKontrol_(v && v.token) ? String(x.message || x).slice(0, 200) : 'İşlem yapılamadı.' });
  }
}

function doGet() {
  return cevap_({ durum: 'calisiyor' });
}

const CARK_SAYFA = 'Çark Kayıtları';
const CARK_BASLIK = ['Tarih', 'Telefon', 'Kod', 'İndirim (TL)', 'Dil', 'Sayfa', 'Ticari İleti Onayı', 'KVKK Onayı', 'Cihaz', 'Kullanıldı Mı'];

function carkSayfa_() {
  const id = OZ.getProperty('CARK_TABLO_ID');
  const ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(CARK_SAYFA);
  if (!sh) {
    sh = ss.insertSheet(CARK_SAYFA);
    sh.appendRow(CARK_BASLIK);
    sh.setFrozenRows(1);
    sh.getRange('B:B').setNumberFormat('@');
    sh.getRange(1, 1, 1, CARK_BASLIK.length).setFontWeight('bold');
  }
  return sh;
}

function temizTel_(v) {
  const ham = String(v || '').trim();
  let s = ham.replace(/\D/g, '');
  if (ham.charAt(0) === '+' && s.indexOf('90') !== 0) return s.length >= 10 ? '+' + s : '';
  if (s.indexOf('90') === 0 && s.length === 12) s = '0' + s.slice(2);
  if (s.length === 10 && s.charAt(0) === '5') s = '0' + s;
  return /^05\d{9}$/.test(s) ? s : '';
}

function dilimler_() {
  const c = CacheService.getScriptCache();
  const ham = c.get('cark_dilimler');
  if (ham) return JSON.parse(ham);
  const url = 'https://raw.githubusercontent.com/' + OZ.getProperty('GITHUB_REPO') + '/' + OZ.getProperty('GITHUB_DAL') + '/data/site.json';
  const site = JSON.parse(UrlFetchApp.fetch(url, { muteHttpExceptions: true }).getContentText());
  const d = ((site.cark || {}).dilimler || []).map(x => ({ tutar: Math.max(0, Math.floor(Number(x.tutar) || 0)), olasilik: Math.max(0, Number(x.olasilik) || 0) }));
  if (!d.length || !(site.cark || {}).aktif) throw new Error('cark kapali');
  c.put('cark_dilimler', JSON.stringify(d), 600);
  return d;
}

function anahtarUret_(tel) {
  const g = tel + '|' + (Date.now() + 10 * 60000);
  return Utilities.base64EncodeWebSafe(g) + '.' + imza_('cark|' + g);
}

function anahtarKontrol_(a, tel) {
  if (!a || String(a).indexOf('.') < 0) return false;
  const p = String(a).split('.');
  let g;
  try { g = Utilities.newBlob(Utilities.base64DecodeWebSafe(p[0])).getDataAsString(); } catch (e) { return false; }
  const q = g.split('|');
  return esit_(imza_('cark|' + g), p[1]) && q[0] === tel && Number(q[1]) > Date.now();
}

function cark_(v) {
  const tel = temizTel_(v.telefon);
  if (!tel) return { hata: 'telefon' };
  if (sayac_('cark_dk_' + Math.floor(Date.now() / 60000), 120) > 60) return { hata: 'yogun' };
  if (v.islem === 'kontrol') {
    const sh = carkSayfa_();
    const son = sh.getLastRow();
    const kayitlar = son > 1 ? sh.getRange(2, 2, son - 1, 1).getValues().map(r => String(r[0])) : [];
    const kullanildi = kayitlar.indexOf(tel) > -1;
    return kullanildi ? { kullanildi: true } : { kullanildi: false, anahtar: anahtarUret_(tel) };
  }
  if (v.web) return { hata: 'gecersiz' };
  if (!v.ticariIleti || !v.kvkk) return { hata: 'onay' };
  if (!anahtarKontrol_(v.anahtar, tel)) return { hata: 'anahtar' };
  if (sayac_('cark_saat_' + Math.floor(Date.now() / 3600000), 7200) > 300) return { hata: 'yogun' };
  const cihaz = String(v.cihaz || '').replace(/[^a-z0-9]/gi, '').slice(0, 40);
  const onbellek = CacheService.getScriptCache();
  if (cihaz && onbellek.get('cark_cihaz_' + cihaz)) return { kullanildi: true };
  const d = dilimler_();
  const top = d.reduce((a, x) => a + x.olasilik, 0);
  let r = Math.random() * (top || 1), i = 0;
  for (; i < d.length; i++) { r -= d[i].olasilik; if (r < 0) break; }
  if (i >= d.length) i = 0;
  const kod = 'KOD' + d[i].tutar + 'TL';
  const kilit = LockService.getScriptLock();
  kilit.waitLock(10000);
  try {
    const sh = carkSayfa_();
    const son = sh.getLastRow();
    const kayitlar = son > 1 ? sh.getRange(2, 2, son - 1, 1).getValues().map(x => String(x[0])) : [];
    if (kayitlar.indexOf(tel) > -1) return { kullanildi: true };
    sh.appendRow([new Date(), tel, kod, d[i].tutar, String(v.dil || '').slice(0, 5), String(v.sayfa || '').slice(0, 200), 'Evet', 'Evet', cihaz, '']);
  } finally {
    kilit.releaseLock();
  }
  if (cihaz) onbellek.put('cark_cihaz_' + cihaz, '1', 21600);
  return { ok: true, i: i, tutar: d[i].tutar, kod: kod };
}
