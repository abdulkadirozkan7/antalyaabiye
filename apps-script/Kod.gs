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
  Logger.log('Şifre kaydedildi. Güvenlik için YENI_SIFRE satırını tekrar boşaltın.');
}

function hash_(s) {
  const b = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, OZ.getProperty('YONETICI_TUZ') + '|' + s, Utilities.Charset.UTF_8);
  return Utilities.base64Encode(b);
}

function imza_(s) {
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(s, OZ.getProperty('OTURUM_ANAHTARI')));
}

function tokenUret_(kullanici) {
  const govde = Utilities.base64EncodeWebSafe(JSON.stringify({ k: kullanici, s: Date.now() + OTURUM_SAAT * 3600000 }));
  return govde + '.' + imza_(govde);
}

function tokenKontrol_(t) {
  if (!t || t.indexOf('.') < 0) return false;
  const p = t.split('.');
  if (imza_(p[0]) !== p[1]) return false;
  const v = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(p[0])).getDataAsString());
  return v.s > Date.now();
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
  if (deneme >= 5) return { hata: 'Çok fazla hatalı deneme. 15 dakika sonra tekrar deneyin.' };
  const dogru = String(v.kullanici || '').toLowerCase() === String(OZ.getProperty('YONETICI_KULLANICI')).toLowerCase()
    && OZ.getProperty('YONETICI_SIFRE_HASH') && hash_(String(v.sifre || '')) === OZ.getProperty('YONETICI_SIFRE_HASH');
  if (!dogru) {
    onbellek.put(anahtar, String(deneme + 1), 900);
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
      const t = new Date();
      const yol = 'assets/uploads/' + t.getFullYear() + '/' + ('0' + (t.getMonth() + 1)).slice(-2) + '/' + temizAd_(v.ad) + '-' + Utilities.getUuid().slice(0, 6) + '.' + uzanti;
      dosyaYaz_(yol, v.base64, 'Panel: görsel yüklendi');
      return cevap_({ yol: yol });
    }
    if (v.islem === 'durum') {
      const r = gh_('/actions/runs?per_page=1');
      const s = r && r.workflow_runs && r.workflow_runs[0];
      return cevap_({ durum: s ? s.status : 'bilinmiyor', sonuc: s ? s.conclusion : null });
    }
    return cevap_({ hata: 'Bilinmeyen işlem.' });
  } catch (x) {
    return cevap_({ hata: String(x.message || x) });
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

function cark_(v) {
  const tel = temizTel_(v.telefon);
  if (!tel) return { hata: 'telefon' };
  const kilit = LockService.getScriptLock();
  kilit.waitLock(10000);
  try {
    const sh = carkSayfa_();
    const son = sh.getLastRow();
    const kayitlar = son > 1 ? sh.getRange(2, 2, son - 1, 1).getValues().map(r => String(r[0])) : [];
    const kullanildi = kayitlar.indexOf(tel) > -1;
    if (v.islem === 'kontrol' || kullanildi) return { kullanildi: kullanildi };
    sh.appendRow([new Date(), tel, String(v.kod || ''), Number(v.tutar) || '', String(v.dil || ''), String(v.sayfa || ''), v.ticariIleti ? 'Evet' : 'Hayır', v.kvkk ? 'Evet' : 'Hayır', String(v.cihaz || ''), '']);
    return { ok: true };
  } finally {
    kilit.releaseLock();
  }
}
