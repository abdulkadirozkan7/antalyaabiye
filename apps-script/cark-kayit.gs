const SAYFA_ADI = 'Çark Kayıtları';
const BASLIKLAR = ['Tarih', 'Telefon', 'Kod', 'İndirim (TL)', 'Dil', 'Sayfa', 'Ticari İleti Onayı', 'KVKK Onayı', 'Cihaz', 'Kullanıldı Mı'];

function sayfa_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SAYFA_ADI);
  if (!sh) {
    sh = ss.insertSheet(SAYFA_ADI);
    sh.appendRow(BASLIKLAR);
    sh.setFrozenRows(1);
    sh.getRange('B:B').setNumberFormat('@');
    sh.getRange(1, 1, 1, BASLIKLAR.length).setFontWeight('bold');
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

function cevap_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let v;
  try { v = JSON.parse(e.postData.contents); } catch (x) { return cevap_({ hata: 'veri' }); }
  const tel = temizTel_(v.telefon);
  if (!tel) return cevap_({ hata: 'telefon' });
  const kilit = LockService.getScriptLock();
  kilit.waitLock(10000);
  try {
    const sh = sayfa_();
    const son = sh.getLastRow();
    const kayitlar = son > 1 ? sh.getRange(2, 2, son - 1, 1).getValues().map(r => String(r[0])) : [];
    const kullanildi = kayitlar.indexOf(tel) > -1;
    if (v.islem === 'kontrol' || kullanildi) return cevap_({ kullanildi: kullanildi });
    sh.appendRow([new Date(), tel, String(v.kod || ''), Number(v.tutar) || '', String(v.dil || ''), String(v.sayfa || ''), v.ticariIleti ? 'Evet' : 'Hayır', v.kvkk ? 'Evet' : 'Hayır', String(v.cihaz || ''), '']);
    return cevap_({ ok: true });
  } finally {
    kilit.releaseLock();
  }
}

function doGet() {
  return cevap_({ durum: 'calisiyor' });
}
