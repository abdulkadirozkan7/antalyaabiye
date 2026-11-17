(function () {
  'use strict';
  var d = document;
  var $ = function (s, k) { return (k || d).querySelector(s); };
  var $$ = function (s, k) { return [].slice.call((k || d).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var kopya = function (o) { return JSON.parse(JSON.stringify(o)); };
  var DILLER = [['tr', 'Türkçe'], ['en', 'İngilizce'], ['ru', 'Rusça']];
  var DOSYA = { urunler: 'data/urunler.json', site: 'data/site.json', blog: 'data/blog.json', renkler: 'data/renkler.json', beden: 'data/beden.json' };
  var SECENEK = {
    boy: [['kisa', 'Kısa'], ['midi', 'Midi'], ['uzun', 'Uzun']],
    kesim: [['prenses', 'Prenses'], ['balik', 'Balık'], ['a-kesim', 'A Kesim'], ['duz', 'Düz Kesim']],
    kol: [['kolsuz', 'Kolsuz'], ['askili', 'Askılı'], ['tek-omuz', 'Tek Omuz'], ['kisa-kol', 'Kısa Kol'], ['uzun-kol', 'Uzun Kol']],
    kullanim: [['nisan', 'Nişan'], ['kina', 'Kına'], ['dugun', 'Düğün'], ['soz', 'Söz'], ['mezuniyet', 'Mezuniyet'], ['davet', 'Davet']]
  };
  var BEDENLER = ['34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56'];
  var GUNLER = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  var ONERI = {
    urun: '1200 × 1800 px · dikey (2:3)',
    banner: '1920 × 700 px · yatay',
    bannerMobil: '1000 × 1250 px · dikey (4:5)',
    vitrin: '1200 × 1000 px · önemli kısım ortada',
    blog: '1600 × 900 px · yatay (16:9)',
    kapak: '1080 × 1920 px · dikey (9:16)',
    magaza: '1600 × 1067 px · yatay (3:2)',
    kategori: '1200 × 630 px · yatay',
    video: 'MP4 · 1080 × 1920 px · dikey (9:16) · en fazla 20 MB'
  };
  var BOYUT = { urun: 1800, banner: 1920, bannerMobil: 1000, vitrin: 1200, blog: 1600, kapak: 1080, magaza: 1600, kategori: 1600 };

  var S = { api: '', token: sessionStorage.getItem('aa_panel_token') || '', demo: false, veri: {}, gorunum: 'urunler', duzen: null };

  var TR_HARF = { 'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c', 'İ': 'i', 'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c' };
  var RU_HARF = { 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya' };
  var slugYap = function (s) {
    return String(s || '').split('').map(function (c) { return TR_HARF[c] || RU_HARF[c.toLowerCase()] || c; }).join('')
      .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };
  var bugun = function () { return new Date().toISOString().slice(0, 10); };

  function bildir(m, tur) {
    var b = $('#bildirim');
    b.textContent = m;
    b.className = 'bildirim' + (tur ? ' ' + tur : '');
    b.hidden = false;
    clearTimeout(bildir.z);
    bildir.z = setTimeout(function () { b.hidden = true; }, tur === 'hata' ? 7000 : 3500);
  }

  function istek(veri) {
    return fetch(S.api, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(veri) })
      .then(function (r) { return r.json(); })
      .then(function (r) {
        if (r && r.oturum === false) { cikis(); throw new Error(r.hata); }
        if (r && r.hata) throw new Error(r.hata);
        return r;
      });
  }

  function yukle(anahtar) {
    if (S.demo) return fetch('../' + DOSYA[anahtar] + '?t=' + Date.now()).then(function (r) { return r.json(); });
    return istek({ islem: 'oku', token: S.token, dosya: DOSYA[anahtar] }).then(function (r) {
      if (r.icerik) return JSON.parse(r.icerik);
      return fetch('../' + DOSYA[anahtar]).then(function (x) { return x.json(); });
    });
  }

  function kaydet(anahtar, mesaj) {
    if (S.demo) { bildir('Demo modunda kayıt yapılmaz.', 'uyari'); return Promise.resolve(false); }
    bildir('Kaydediliyor...');
    return istek({ islem: 'yaz', token: S.token, dosya: DOSYA[anahtar], icerik: JSON.stringify(S.veri[anahtar], null, 2) + '\n', mesaj: mesaj })
      .then(function () { bildir('Kaydedildi. Site 1-2 dakika içinde güncellenir.', 'ok'); durumTakip(); return true; })
      .catch(function (e) { bildir('Kaydedilemedi: ' + e.message, 'hata'); return false; });
  }

  function durumTakip() {
    var el = $('#durum'), n = 0;
    clearInterval(durumTakip.z);
    el.textContent = 'Yayına alınıyor...';
    el.className = 'py-durum bekliyor';
    durumTakip.z = setInterval(function () {
      if (++n > 24) { clearInterval(durumTakip.z); el.textContent = ''; return; }
      if (n < 3) return;
      istek({ islem: 'durum', token: S.token }).then(function (r) {
        if (r.durum === 'completed') {
          clearInterval(durumTakip.z);
          el.textContent = r.sonuc === 'success' ? 'Sitede yayında ✓' : 'Yayınlama hatası, tekrar kaydedin';
          el.className = 'py-durum ' + (r.sonuc === 'success' ? 'tamam' : 'hata');
        }
      }).catch(function () {});
    }, 10000);
  }

  function gorselHazirla(dosya, enUzun) {
    return createImageBitmap(dosya).then(function (bmp) {
      var o = Math.min(1, enUzun / Math.max(bmp.width, bmp.height));
      var c = d.createElement('canvas');
      c.width = Math.round(bmp.width * o);
      c.height = Math.round(bmp.height * o);
      c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
      return new Promise(function (ok) { c.toBlob(ok, 'image/webp', 0.82); });
    });
  }

  function base64(blob) {
    return new Promise(function (ok, red) {
      var r = new FileReader();
      r.onload = function () { ok(String(r.result).split(',')[1]); };
      r.onerror = red;
      r.readAsDataURL(blob);
    });
  }

  function dosyaYukle(dosya, tur, ad) {
    if (S.demo) { bildir('Demo modunda fotoğraf yüklenemez.', 'uyari'); return Promise.reject(new Error('demo')); }
    var video = /^video\//.test(dosya.type);
    if (video && dosya.size > 20 * 1024 * 1024) { bildir('Video 20 MB\'tan büyük olamaz. Lütfen sıkıştırıp tekrar deneyin.', 'hata'); return Promise.reject(new Error('buyuk')); }
    if (!video && !/^image\//.test(dosya.type)) { bildir('Lütfen bir fotoğraf seçin.', 'hata'); return Promise.reject(new Error('tur')); }
    var hazir = video ? Promise.resolve(dosya) : gorselHazirla(dosya, BOYUT[tur] || 1600);
    return hazir.then(function (blob) {
      return base64(blob).then(function (b) {
        return istek({ islem: 'yukle', token: S.token, ad: ad || dosya.name.replace(/\.[^.]+$/, ''), tur: video ? 'video/mp4' : 'image/webp', base64: b });
      }).then(function (r) {
        bildir((video ? 'Video' : 'Fotoğraf') + ' yüklendi' + (video ? '.' : ' (' + Math.round(blob.size / 1024) + ' KB, WebP).'), 'ok');
        return r.yol;
      });
    });
  }

  var getir = function (o, yol) { return yol.split('.').reduce(function (a, k) { return a == null ? a : a[k]; }, o); };
  var ata = function (o, yol, v) {
    var p = yol.split('.'), son = p.pop();
    var hedef = p.reduce(function (a, k) { if (a[k] == null || typeof a[k] !== 'object') a[k] = {}; return a[k]; }, o);
    hedef[son] = v;
  };

  function alan(etiket, yol, nesne, tip, ek) {
    ek = ek || {};
    var v = getir(nesne, yol);
    var id = 'a_' + yol.replace(/\W/g, '_');
    var sayac = ek.sinir ? '<small class="sayac" data-sinir="' + ek.sinir + '">' + String(v || '').length + ' / ' + ek.sinir + '</small>' : '';
    var giris;
    if (tip === 'metin') giris = '<textarea id="' + id + '" data-yol="' + yol + '" rows="' + (ek.satir || 4) + '"' + (ek.ph ? ' placeholder="' + esc(ek.ph) + '"' : '') + '>' + esc(v) + '</textarea>';
    else if (tip === 'secim') giris = '<select id="' + id + '" data-yol="' + yol + '">' + ek.secenek.map(function (s) { return '<option value="' + esc(s[0]) + '"' + (String(v) === String(s[0]) ? ' selected' : '') + '>' + esc(s[1]) + '</option>'; }).join('') + '</select>';
    else if (tip === 'onay') return '<label class="onay"><input type="checkbox" data-yol="' + yol + '"' + (v ? ' checked' : '') + '><span>' + esc(etiket) + '</span></label>';
    else giris = '<input id="' + id + '" data-yol="' + yol + '" type="' + (tip || 'text') + '" value="' + esc(v) + '"' + (ek.ph ? ' placeholder="' + esc(ek.ph) + '"' : '') + (ek.salt ? ' readonly' : '') + (ek.adim ? ' step="' + ek.adim + '"' : '') + '>';
    return '<div class="alan' + (ek.genis ? ' genis' : '') + '"><label for="' + id + '">' + esc(etiket) + sayac + '</label>' + giris + (ek.ipucu ? '<small class="ipucu">' + esc(ek.ipucu) + '</small>' : '') + '</div>';
  }

  function cokluSecim(etiket, yol, nesne, secenekler, renkli) {
    var v = getir(nesne, yol) || [];
    return '<div class="alan genis"><label>' + esc(etiket) + '</label><div class="cipler">' + secenekler.map(function (s) {
      return '<label class="cip"><input type="checkbox" data-dizi="' + yol + '" value="' + esc(s[0]) + '"' + (v.indexOf(s[0]) > -1 ? ' checked' : '') + '>' + (renkli ? '<i style="background:' + esc(s[2]) + '"></i>' : '') + '<span>' + esc(s[1]) + '</span></label>';
    }).join('') + '</div></div>';
  }

  function fotoAlan(etiket, yol, nesne, tur, max, ipucu) {
    var v = getir(nesne, yol);
    var tek = max === 1;
    var liste = tek ? (v ? [v] : []) : (v || []).filter(Boolean);
    var video = tur === 'video';
    return '<div class="alan genis foto-alan" data-yol="' + yol + '" data-tur="' + tur + '" data-max="' + max + '"><div class="foto-bas"><label>' + esc(etiket) + '</label>' + (ONERI[tur] ? '<span class="foto-oneri"><b>Önerilen:</b> ' + esc(ONERI[tur]) + (video ? '' : ' · JPG/PNG yükle, otomatik WebP\'ye çevrilip küçültülür') + '</span>' : '') + '</div><div class="fotolar">' +
      liste.map(function (p, i) {
        return '<div class="foto" data-i="' + i + '">' + (video ? '<video src="../' + esc(p) + '" muted></video>' : '<img src="../' + esc(p) + '" alt="">') +
          '<div class="foto-btn">' + (!tek && i > 0 ? '<button type="button" data-foto="sol" title="Sola al">‹</button>' : '') + '<button type="button" data-foto="sil" title="Kaldır">×</button>' + (!tek && i < liste.length - 1 ? '<button type="button" data-foto="sag" title="Sağa al">›</button>' : '') + '</div>' + (i === 0 && !tek ? '<b class="foto-ana">Kapak</b>' : '') + '</div>';
      }).join('') +
      (liste.length < max ? '<label class="foto-ekle"><input type="file" accept="' + (video ? 'video/mp4' : 'image/*') + '"' + (!tek ? ' multiple' : '') + '><span>+</span><small>' + (video ? 'Video Ekle' : 'Fotoğraf Ekle') + '</small></label>' : '') +
      '</div>' + (ipucu ? '<small class="ipucu">' + esc(ipucu) + '</small>' : '') + '</div>';
  }

  function dilSekmeleri(icerik) {
    return '<div class="sekme-kutu"><div class="sekmeler">' + DILLER.map(function (x, i) { return '<button type="button" data-sekme="' + x[0] + '"' + (i === 0 ? ' class="on"' : '') + '>' + x[1] + '</button>'; }).join('') + '</div>' +
      DILLER.map(function (x, i) { return '<div class="sekme-ic" data-sekme-ic="' + x[0] + '"' + (i ? ' hidden' : '') + '>' + icerik(x[0]) + '</div>'; }).join('') + '</div>';
  }

  function baglan(kok, nesne, degisti) {
    kok.addEventListener('input', function (e) {
      var t = e.target;
      if (t.dataset.yol && t.type !== 'checkbox') {
        var v = t.type === 'number' ? (t.value === '' ? '' : Number(t.value)) : t.value;
        ata(nesne, t.dataset.yol, v);
        var s = t.parentNode.querySelector('.sayac');
        if (s) { s.textContent = t.value.length + ' / ' + s.dataset.sinir; s.classList.toggle('asim', t.value.length > +s.dataset.sinir); }
        if (degisti) degisti(t.dataset.yol, v, t);
      }
    });
    kok.addEventListener('change', function (e) {
      var t = e.target;
      if (t.type === 'checkbox' && t.dataset.yol) { ata(nesne, t.dataset.yol, t.checked); if (degisti) degisti(t.dataset.yol, t.checked, t); }
      if (t.type === 'checkbox' && t.dataset.dizi) {
        var l = $$('input[data-dizi="' + t.dataset.dizi + '"]', kok).filter(function (x) { return x.checked; }).map(function (x) { return x.value; });
        ata(nesne, t.dataset.dizi, l);
        if (degisti) degisti(t.dataset.dizi, l, t);
      }
      if (t.tagName === 'SELECT' && t.dataset.yol) { ata(nesne, t.dataset.yol, t.value); if (degisti) degisti(t.dataset.yol, t.value, t); }
      if (t.type === 'file') {
        var fa = t.closest('.foto-alan');
        var max = +fa.dataset.max, yol = fa.dataset.yol, tur = fa.dataset.tur;
        var mevcut = max === 1 ? [] : (getir(nesne, yol) || []).filter(Boolean);
        var dosyalar = [].slice.call(t.files).slice(0, max - mevcut.length);
        fa.classList.add('yukleniyor');
        var ad = slugYap(getir(nesne, 'tr.ad') || getir(nesne, 'kod') || getir(nesne, 'tr.baslik') || 'gorsel');
        dosyalar.reduce(function (p, f) {
          return p.then(function () { return dosyaYukle(f, tur, ad).then(function (y) { mevcut.push(y); }); });
        }, Promise.resolve()).catch(function () {}).then(function () {
          ata(nesne, yol, max === 1 ? (mevcut[0] || getir(nesne, yol) || '') : mevcut);
          fa.outerHTML = fotoAlan(fa.querySelector('.foto-bas label').textContent, yol, nesne, tur, max, (fa.querySelector('.ipucu') || {}).textContent);
          if (degisti) degisti(yol, getir(nesne, yol));
        });
      }
    });
    kok.addEventListener('click', function (e) {
      var b = e.target.closest('[data-foto]');
      if (b) {
        var fa = b.closest('.foto-alan'), i = +b.closest('.foto').dataset.i, yol = fa.dataset.yol, max = +fa.dataset.max;
        if (max === 1) ata(nesne, yol, '');
        else {
          var l = (getir(nesne, yol) || []).filter(Boolean);
          if (b.dataset.foto === 'sil') l.splice(i, 1);
          else { var j = b.dataset.foto === 'sol' ? i - 1 : i + 1; var x = l[i]; l[i] = l[j]; l[j] = x; }
          ata(nesne, yol, l);
        }
        fa.outerHTML = fotoAlan(fa.querySelector('.foto-bas label').textContent, yol, nesne, fa.dataset.tur, max, (fa.querySelector('.ipucu') || {}).textContent);
        if (degisti) degisti(yol, getir(nesne, yol));
      }
      var sk = e.target.closest('[data-sekme]');
      if (sk) {
        var kutu = sk.closest('.sekme-kutu');
        $$('[data-sekme]', kutu).forEach(function (x) { x.classList.toggle('on', x === sk); });
        $$('[data-sekme-ic]', kutu).forEach(function (x) { x.hidden = x.dataset.sekmeIc !== sk.dataset.sekme; });
      }
    });
  }

  var renkListe = function () { var r = S.veri.renkler.renkler; return Object.keys(r).map(function (k) { return [k, r[k].tr, r[k].hex]; }); };
  var katListe = function (ozelDahil) { return S.veri.site.kategoriler.filter(function (k) { return ozelDahil || !k.ozel; }).map(function (k) { return [k.id, k.tr.ad]; }); };
  var ilkFoto = function (u) {
    var g = (u.fotograflar || []).filter(Boolean)[0];
    if (g) return g;
    var rf = u.renkFotolari || {};
    for (var i = 0; i < (u.renkler || []).length; i++) { var l = (rf[u.renkler[i]] || []).filter(Boolean); if (l.length) return l[0]; }
    return '';
  };

  var G = {};

  G.urunler = function (el) {
    var U = S.veri.urunler.urunler;
    var ara = (G.urunler.ara || '').toLocaleLowerCase('tr');
    var kat = G.urunler.kat || '';
    var liste = U.filter(function (u) {
      return (!kat || u.kategoriler.indexOf(kat) > -1) && (!ara || (u.kod + ' ' + u.tr.ad).toLocaleLowerCase('tr').indexOf(ara) > -1);
    });
    el.innerHTML = '<div class="bas"><h2>Ürünler <small>' + U.length + ' ürün</small></h2><button class="pb" data-is="yeni">+ Yeni Ürün</button></div>' +
      '<div class="filtre"><input type="search" id="u-ara" placeholder="Ürün adı veya kod ara" value="' + esc(G.urunler.ara || '') + '"><select id="u-kat"><option value="">Tüm Kategoriler</option>' + katListe(true).map(function (k) { return '<option value="' + k[0] + '"' + (k[0] === kat ? ' selected' : '') + '>' + esc(k[1]) + '</option>'; }).join('') + '</select></div>' +
      '<div class="tablo-kap"><table class="tablo"><thead><tr><th></th><th>Kod</th><th>Ürün</th><th>Kategoriler</th><th>Durum</th><th></th></tr></thead><tbody>' +
      liste.map(function (u) {
        var f = ilkFoto(u);
        var i = U.indexOf(u);
        return '<tr><td>' + (f ? '<img class="kucuk" src="../' + esc(f) + '" alt="">' : '<span class="kucuk bos">Foto yok</span>') + '</td><td><b>' + esc(u.kod) + '</b></td><td>' + esc(u.tr.ad) + (u.ornek ? ' <em class="rozet gri">Örnek</em>' : '') + '</td><td>' + u.kategoriler.map(function (k) { var x = S.veri.site.kategoriler.filter(function (c) { return c.id === k; })[0]; return esc(x ? x.tr.ad : k); }).join(', ') + '</td><td>' + (u.stok === false ? '<em class="rozet kirmizi">Stokta Yok</em>' : '<em class="rozet yesil">Stokta</em>') + (u.yeni ? ' <em class="rozet">Yeni</em>' : '') + (u.cokSatan ? ' <em class="rozet">Çok Satan</em>' : '') + '</td><td class="islem"><button data-is="duzenle" data-i="' + i + '">Düzenle</button><button data-is="kopyala" data-i="' + i + '">Kopyala</button><button data-is="sil" data-i="' + i + '" class="tehlike">Sil</button></td></tr>';
      }).join('') + '</tbody></table>' + (liste.length ? '' : '<p class="bos-not">Ürün bulunamadı.</p>') + '</div>';
    $('#u-ara', el).addEventListener('input', function (e) { G.urunler.ara = e.target.value; var p = e.target.selectionStart; G.urunler(el); var y = $('#u-ara', el); y.focus(); y.setSelectionRange(p, p); });
    $('#u-kat', el).addEventListener('change', function (e) { G.urunler.kat = e.target.value; G.urunler(el); });
    el.onclick = function (e) {
      var b = e.target.closest('[data-is]');
      if (!b) return;
      var i = +b.dataset.i;
      if (b.dataset.is === 'yeni') urunDuzenle(el, null);
      if (b.dataset.is === 'duzenle') urunDuzenle(el, i);
      if (b.dataset.is === 'kopyala') {
        var k = kopya(U[i]);
        k.kod = k.kod + '-K';
        DILLER.forEach(function (x) { if (k[x[0]]) k[x[0]].slug = ''; });
        urunDuzenle(el, null, k);
      }
      if (b.dataset.is === 'sil' && confirm(U[i].kod + ' kodlu ürün silinsin mi? Bu işlem geri alınamaz.')) {
        U.splice(i, 1);
        kaydet('urunler', U.length + ' ürün: ürün silindi');
        G.urunler(el);
      }
    };
  };

  function urunDuzenle(el, i, hazir) {
    var U = S.veri.urunler.urunler;
    var u = hazir || (i == null ? { kod: '', kategoriler: [], yeni: true, stok: true, renkler: [], bedenler: [], boy: 'uzun', kesim: 'a-kesim', kol: 'uzun-kol', kullanim: [], fotograflar: [], renkFotolari: {}, tr: { ad: '', slug: '', aciklama: '' }, en: { ad: '', slug: '', aciklama: '' }, ru: { ad: '', slug: '', aciklama: '' } } : kopya(U[i]));
    u.renkFotolari = u.renkFotolari || {};
    u.fotograflar = (u.fotograflar || []).filter(Boolean);
    var renkFotoHtml = function () {
      return (u.renkler || []).map(function (r) {
        var x = S.veri.renkler.renkler[r];
        return fotoAlan((x ? x.tr : r) + ' Rengi Fotoğrafları', 'renkFotolari.' + r, u, 'urun', 5, 'Müşteri bu rengi seçince bu fotoğraflar görünür.');
      }).join('');
    };
    el.innerHTML = '<div class="bas"><h2>' + (i == null ? 'Yeni Ürün' : esc(u.kod) + ' Düzenle') + '</h2><div><button class="pb pb-ikinci" data-is="geri">Vazgeç</button> <button class="pb" data-is="kaydet">Kaydet</button></div></div>' +
      '<form class="kart form" onsubmit="return false">' +
      '<h3>Temel Bilgiler</h3><div class="izgara">' +
      alan('Ürün Kodu', 'kod', u, 'text', { ph: 'Örn: AA-T21', ipucu: 'Müşteri WhatsApp\'ta bu kodu yazar. Her ürünün kodu farklı olmalı.' }) +
      '<div class="alan"><label>Durum</label><div class="cipler">' + alan('Stokta', 'stok', u, 'onay') + alan('Yeni Ürün', 'yeni', u, 'onay') + alan('Çok Satan', 'cokSatan', u, 'onay') + alan('Örnek Ürün', 'ornek', u, 'onay') + '</div></div>' +
      cokluSecim('Kategoriler', 'kategoriler', u, katListe(false)) +
      '</div>' +
      '<h3>Ürün Adı Ve Açıklama</h3>' +
      dilSekmeleri(function (dl) {
        return '<div class="izgara">' + alan('Ürün Adı', dl + '.ad', u, 'text', { ph: dl === 'tr' ? 'Örn: Pullu Tesettür Abiye' : 'Boş bırakırsan Türkçe ad kullanılır' }) +
          alan('Adres (URL)', dl + '.slug', u, 'text', { ph: 'Otomatik oluşur', ipucu: 'Boş bırakırsan addan otomatik oluşturulur.' }) +
          alan('Açıklama', dl + '.aciklama', u, 'metin', { genis: true, satir: 5, ph: 'Kumaş, kesim, astar, kullanım önerisi... (SEO için en az 2-3 cümle önerilir)' }) + '</div>';
      }) +
      '<h3>Özellikler</h3><div class="izgara">' +
      cokluSecim('Renkler', 'renkler', u, renkListe(), true) +
      cokluSecim('Bedenler', 'bedenler', u, BEDENLER.map(function (b) { return [b, b]; })) +
      alan('Boy', 'boy', u, 'secim', { secenek: SECENEK.boy }) +
      alan('Kesim', 'kesim', u, 'secim', { secenek: SECENEK.kesim }) +
      alan('Kol', 'kol', u, 'secim', { secenek: SECENEK.kol }) +
      cokluSecim('Kullanım Alanı', 'kullanim', u, SECENEK.kullanim) +
      '</div>' +
      '<h3>Fotoğraflar</h3><p class="ipucu">Fotoğraflar yüklenirken otomatik olarak WebP\'ye çevrilip küçültülür. Dikey (2:3) fotoğraf önerilir. İlk fotoğraf kapak olur.</p>' +
      fotoAlan('Genel Fotoğraflar', 'fotograflar', u, 'urun', 5, 'Renk fotoğrafı eklemezsen bunlar kullanılır.') +
      '<div id="renk-fotolar">' + renkFotoHtml() + '</div>' +
      '</form>';
    var form = $('form', el);
    baglan(form, u, function (yol) {
      if (yol === 'renkler') $('#renk-fotolar', el).innerHTML = renkFotoHtml();
    });
    el.onclick = function (e) {
      var b = e.target.closest('[data-is]');
      if (!b) return;
      if (b.dataset.is === 'geri') G.urunler(el);
      if (b.dataset.is === 'kaydet') {
        u.kod = String(u.kod || '').trim().toUpperCase();
        var hata = !u.kod ? 'Ürün kodu girin.' : !u.tr.ad ? 'Türkçe ürün adını girin.' : !u.kategoriler.length ? 'En az bir kategori seçin.' : !u.renkler.length ? 'En az bir renk seçin.' : !u.bedenler.length ? 'En az bir beden seçin.' : '';
        if (!hata && U.some(function (x, j) { return j !== i && x.kod === u.kod; })) hata = 'Bu ürün kodu başka bir üründe kullanılıyor.';
        if (hata) { bildir(hata, 'hata'); return; }
        u.bedenler.sort(function (a, b) { return BEDENLER.indexOf(a) - BEDENLER.indexOf(b); });
        DILLER.forEach(function (x) {
          var dl = x[0];
          u[dl] = u[dl] || {};
          if (!u[dl].slug) u[dl].slug = slugYap((u[dl].ad || u.tr.ad) + ' ' + u.kod);
          else u[dl].slug = slugYap(u[dl].slug);
        });
        Object.keys(u.renkFotolari).forEach(function (r) { if (u.renkler.indexOf(r) < 0 || !(u.renkFotolari[r] || []).length) delete u.renkFotolari[r]; });
        if (i == null) U.push(u); else U[i] = u;
        kaydet('urunler', u.kod + ' kaydedildi').then(function (ok) { if (ok !== false) G.urunler(el); });
      }
    };
  }

  G.kategoriler = function (el) {
    var K = S.veri.site.kategoriler;
    el.innerHTML = '<div class="bas"><h2>Kategoriler</h2><div><button class="pb pb-ikinci" data-is="ekle">+ Kategori Ekle</button> <button class="pb" data-is="kaydet">Kaydet</button></div></div>' +
      '<p class="ipucu">Adres (URL) değiştirmek Google\'daki eski bağlantıları bozar. Gerekmedikçe değiştirme.</p>' +
      K.map(function (k, i) {
        return '<form class="kart form" data-i="' + i + '" onsubmit="return false"><div class="kart-bas"><h3>' + esc(k.tr.ad || 'Yeni Kategori') + (k.ozel ? ' <em class="rozet gri">Otomatik</em>' : '') + '</h3>' + (['yeni', 'firsat', 'cok-satanlar'].indexOf(k.id) < 0 ? '<button type="button" class="tehlike" data-is="sil" data-i="' + i + '">Sil</button>' : '') + '</div>' +
          dilSekmeleri(function (dl) { return '<div class="izgara">' + alan('Kategori Adı', dl + '.ad', k) + alan('Menüde Kısa Ad', dl + '.kisa', k, 'text', { ph: 'İsteğe bağlı' }) + alan('Adres (URL)', dl + '.slug', k) + '</div>'; }) +
          '<div class="izgara">' + '<div class="alan"><label>Menü</label><div class="cipler">' + alan('Üst menüde göster', 'menu', k, 'onay') + alan('Vurgulu (renkli)', 'vurgu', k, 'onay') + '</div></div></div>' +
          fotoAlan('Kategori Görseli (paylaşım ve Google için)', 'gorsel', k, 'kategori', 1) + '</form>';
      }).join('');
    $$('form', el).forEach(function (f) { baglan(f, K[+f.dataset.i]); });
    el.onclick = function (e) {
      var b = e.target.closest('[data-is]');
      if (!b) return;
      if (b.dataset.is === 'ekle') {
        var ad = prompt('Yeni kategorinin Türkçe adı:');
        if (!ad) return;
        var id = slugYap(ad);
        if (K.some(function (x) { return x.id === id; })) { bildir('Bu kategori zaten var.', 'hata'); return; }
        K.push({ id: id, menu: false, tr: { ad: ad, slug: id }, en: { ad: ad, slug: id }, ru: { ad: ad, slug: id } });
        G.kategoriler(el);
      }
      if (b.dataset.is === 'sil') {
        var k = K[+b.dataset.i];
        var kullanan = S.veri.urunler.urunler.filter(function (u) { return u.kategoriler.indexOf(k.id) > -1; }).length;
        if (kullanan) { bildir('Bu kategoride ' + kullanan + ' ürün var. Önce ürünleri başka kategoriye taşı.', 'hata'); return; }
        if (confirm(k.tr.ad + ' silinsin mi?')) { K.splice(+b.dataset.i, 1); G.kategoriler(el); }
      }
      if (b.dataset.is === 'kaydet') {
        K.forEach(function (k) { DILLER.forEach(function (x) { k[x[0]].slug = slugYap(k[x[0]].slug || k[x[0]].ad || k.tr.ad); }); });
        kaydet('site', 'Kategoriler güncellendi');
      }
    };
  };

  G.renkler = function (el) {
    var R = S.veri.renkler.renkler;
    el.innerHTML = '<div class="bas"><h2>Renkler</h2><div><button class="pb pb-ikinci" data-is="ekle">+ Renk Ekle</button> <button class="pb" data-is="kaydet">Kaydet</button></div></div>' +
      '<p class="ipucu">Buraya eklediğin renkler ürün düzenlerken seçilebilir ve kategori filtrelerinde görünür.</p>' +
      '<form class="kart" onsubmit="return false"><div class="tablo-kap"><table class="tablo"><thead><tr><th>Renk</th><th>Türkçe</th><th>İngilizce</th><th>Rusça</th><th></th></tr></thead><tbody>' +
      Object.keys(R).map(function (k) {
        return '<tr><td><input type="color" data-yol="' + k + '.hex" value="' + esc(R[k].hex) + '"></td><td><input data-yol="' + k + '.tr" value="' + esc(R[k].tr) + '"></td><td><input data-yol="' + k + '.en" value="' + esc(R[k].en) + '"></td><td><input data-yol="' + k + '.ru" value="' + esc(R[k].ru) + '"></td><td><button type="button" class="tehlike" data-is="sil" data-k="' + k + '">Sil</button></td></tr>';
      }).join('') + '</tbody></table></div></form>';
    baglan($('form', el), R);
    el.onclick = function (e) {
      var b = e.target.closest('[data-is]');
      if (!b) return;
      if (b.dataset.is === 'ekle') {
        var ad = prompt('Yeni rengin Türkçe adı (örn: Şampanya):');
        if (!ad) return;
        var k = slugYap(ad);
        if (R[k]) { bildir('Bu renk zaten var.', 'hata'); return; }
        R[k] = { hex: '#cccccc', tr: ad, en: ad, ru: ad };
        G.renkler(el);
      }
      if (b.dataset.is === 'sil') {
        var n = S.veri.urunler.urunler.filter(function (u) { return u.renkler.indexOf(b.dataset.k) > -1; }).length;
        if (n) { bildir('Bu renk ' + n + ' üründe kullanılıyor. Önce ürünlerden kaldır.', 'hata'); return; }
        delete R[b.dataset.k];
        G.renkler(el);
      }
      if (b.dataset.is === 'kaydet') kaydet('renkler', 'Renkler güncellendi');
    };
  };

  G.bannerlar = function (el) {
    var B = S.veri.site.bannerlar = S.veri.site.bannerlar || [];
    el.innerHTML = '<div class="bas"><h2>Ana Sayfa Bannerları</h2><div><button class="pb pb-ikinci" data-is="ekle">+ Banner Ekle</button> <button class="pb" data-is="kaydet">Kaydet</button></div></div>' +
      '<p class="ipucu">Masaüstü görseli yatay (1920×700), mobil görseli dikey (1000×1250) önerilir. Görsel eklemezsen koyu desenli banner görünür.</p>' +
      B.map(function (bn, i) {
        return '<form class="kart form" data-i="' + i + '" onsubmit="return false"><div class="kart-bas"><h3>Banner ' + (i + 1) + '</h3><div>' + (i ? '<button type="button" data-is="yukari" data-i="' + i + '">↑</button>' : '') + (i < B.length - 1 ? '<button type="button" data-is="asagi" data-i="' + i + '">↓</button>' : '') + '<button type="button" class="tehlike" data-is="sil" data-i="' + i + '">Sil</button></div></div>' +
          '<div class="izgara">' + alan('Tıklayınca Gideceği Kategori', 'kategori', bn, 'secim', { secenek: katListe(true) }) + '</div>' +
          '<div class="izgara">' + fotoAlan('Masaüstü Görseli', 'gorsel', bn, 'banner', 1) + fotoAlan('Mobil Görseli', 'gorselMobil', bn, 'bannerMobil', 1) + '</div>' +
          dilSekmeleri(function (dl) { return '<div class="izgara">' + alan('Üst Yazı', dl + '.ust', bn) + alan('Başlık', dl + '.baslik', bn) + alan('Alt Yazı', dl + '.alt', bn) + alan('Buton Yazısı', dl + '.buton', bn) + '</div>'; }) + '</form>';
      }).join('');
    $$('form', el).forEach(function (f) { baglan(f, B[+f.dataset.i]); });
    el.onclick = function (e) {
      var b = e.target.closest('[data-is]');
      if (!b) return;
      var i = +b.dataset.i;
      if (b.dataset.is === 'ekle') { B.push({ kategori: 'yeni', gorsel: '', gorselMobil: '', tr: {}, en: {}, ru: {} }); G.bannerlar(el); }
      if (b.dataset.is === 'sil' && confirm('Banner silinsin mi?')) { B.splice(i, 1); G.bannerlar(el); }
      if (b.dataset.is === 'yukari' || b.dataset.is === 'asagi') { var j = b.dataset.is === 'yukari' ? i - 1 : i + 1; var x = B[i]; B[i] = B[j]; B[j] = x; G.bannerlar(el); }
      if (b.dataset.is === 'kaydet') kaydet('site', 'Bannerlar güncellendi');
    };
  };

  G.vitrin = function (el) {
    var V = S.veri.site.vitrin = S.veri.site.vitrin || [];
    el.innerHTML = '<div class="bas"><h2>Kategori Vitrini</h2><button class="pb" data-is="kaydet">Kaydet</button></div>' +
      '<p class="ipucu">Ana sayfadaki 5 büyük kategori kutusu. İlk ikisi geniş, diğer üçü dar görünür.</p>' +
      V.map(function (v, i) {
        return '<form class="kart form" data-i="' + i + '" onsubmit="return false"><h3>Kutu ' + (i + 1) + '</h3><div class="izgara">' + alan('Kategori', 'kategori', v, 'secim', { secenek: katListe(true) }) + fotoAlan('Görsel', 'gorsel', v, 'vitrin', 1) + '</div></form>';
      }).join('');
    $$('form', el).forEach(function (f) { baglan(f, V[+f.dataset.i]); });
    el.onclick = function (e) { var b = e.target.closest('[data-is="kaydet"]'); if (b) kaydet('site', 'Vitrin güncellendi'); };
  };

  G.instagram = function (el) {
    var V = S.veri.site.instagramVideolar = S.veri.site.instagramVideolar || [];
    while (V.length < 4) V.push({ video: '', kapak: '', urun: '', tr: {}, en: {}, ru: {} });
    var urunSec = [['', 'Ürün seçilmedi']].concat(S.veri.urunler.urunler.map(function (u) { return [u.kod, u.kod + ' · ' + u.tr.ad]; }));
    el.innerHTML = '<div class="bas"><h2>Instagram Videoları</h2><button class="pb" data-is="kaydet">Kaydet</button></div>' +
      '<p class="ipucu">Ana sayfadaki Instagram bandında görünen 4 dikey video. MP4, en fazla 20 MB. Kapak fotoğrafı video yüklenene kadar görünür.</p>' +
      V.map(function (v, i) {
        return '<form class="kart form" data-i="' + i + '" onsubmit="return false"><h3>Video ' + (i + 1) + '</h3><div class="izgara">' + fotoAlan('Video', 'video', v, 'video', 1) + fotoAlan('Kapak Fotoğrafı', 'kapak', v, 'kapak', 1) + alan('Bağlı Ürün ("Ürüne Git" butonu)', 'urun', v, 'secim', { secenek: urunSec }) + '</div>' +
          dilSekmeleri(function (dl) { return alan('Video Başlığı', dl + '.baslik', v, 'text', { ph: 'Boş bırakırsan ürün adı yazılır' }); }) + '</form>';
      }).join('');
    $$('form', el).forEach(function (f) { baglan(f, V[+f.dataset.i]); });
    el.onclick = function (e) { var b = e.target.closest('[data-is="kaydet"]'); if (b) kaydet('site', 'Instagram videoları güncellendi'); };
  };

  G.blog = function (el) {
    var Y = S.veri.blog.yazilar;
    el.innerHTML = '<div class="bas"><h2>Blog Yazıları <small>' + Y.length + ' yazı</small></h2><button class="pb" data-is="yeni">+ Yeni Yazı</button></div>' +
      '<div class="tablo-kap"><table class="tablo"><thead><tr><th></th><th>Başlık</th><th>Diller</th><th>Tarih</th><th></th></tr></thead><tbody>' +
      Y.map(function (y, i) {
        var v = y.tr || y.en || y.ru || {};
        return '<tr><td>' + (y.kapak ? '<img class="kucuk yatay" src="../' + esc(y.kapak) + '" alt="">' : '<span class="kucuk yatay bos">Kapak yok</span>') + '</td><td>' + esc(v.h1) + '</td><td>' + DILLER.filter(function (x) { return y[x[0]]; }).map(function (x) { return x[0].toUpperCase(); }).join(' · ') + '</td><td>' + esc(y.tarih) + '</td><td class="islem"><button data-is="duzenle" data-i="' + i + '">Düzenle</button><button data-is="sil" data-i="' + i + '" class="tehlike">Sil</button></td></tr>';
      }).join('') + '</tbody></table></div>';
    el.onclick = function (e) {
      var b = e.target.closest('[data-is]');
      if (!b) return;
      if (b.dataset.is === 'yeni') blogDuzenle(el, null);
      if (b.dataset.is === 'duzenle') blogDuzenle(el, +b.dataset.i);
      if (b.dataset.is === 'sil' && confirm('Yazı silinsin mi?')) { Y.splice(+b.dataset.i, 1); kaydet('blog', 'Blog yazısı silindi'); G.blog(el); }
    };
  };

  function blogDuzenle(el, i) {
    var Y = S.veri.blog.yazilar;
    var y = i == null ? { id: '', tarih: bugun(), guncelleme: bugun(), kapak: '', kategori: 'yeni', tr: { slug: '', baslik: '', aciklama: '', h1: '', ozet: '', govde: [], sss: [] } } : kopya(Y[i]);
    var metinler = {};
    DILLER.forEach(function (x) { metinler[x[0]] = y[x[0]] ? (y[x[0]].govde || []).join('\n\n') : ''; });
    var aktifDiller = {};
    DILLER.forEach(function (x) { aktifDiller[x[0]] = !!y[x[0]]; });
    var dilIc = function (dl) {
      var v = y[dl] = y[dl] || { slug: '', baslik: '', aciklama: '', h1: '', ozet: '', govde: [], sss: [] };
      return '<label class="onay"><input type="checkbox" data-dil-aktif="' + dl + '"' + (aktifDiller[dl] ? ' checked' : '') + '><span>Bu dilde yayınla</span></label><div class="izgara">' +
        alan('Sayfa Başlığı (Google\'da görünen)', dl + '.baslik', y, 'text', { sinir: 60, genis: true, ipucu: 'Ana kelimeyi başa yaz. Örn: Antalya Nişan Elbisesi: Renk Ve Kesim Seçimi | Antalya Abiye' }) +
        alan('Google Açıklaması', dl + '.aciklama', y, 'metin', { sinir: 155, satir: 2, genis: true }) +
        alan('Yazı Başlığı (H1)', dl + '.h1', y, 'text') +
        alan('Adres (URL)', dl + '.slug', y, 'text', { ph: 'Otomatik oluşur' }) +
        alan('Kısa Özet', dl + '.ozet', y, 'metin', { satir: 2, genis: true }) +
        '<div class="alan genis"><label>Yazı İçeriği</label><div class="arac" data-dl="' + dl + '"><button type="button" data-ekle="## ">Ara Başlık (H2)</button><button type="button" data-ekle="### ">Alt Başlık (H3)</button><button type="button" data-ekle="- ">Madde</button><button type="button" data-ekle="link">Kategori Linki</button><label class="arac-foto">Fotoğraf Ekle<input type="file" accept="image/*" data-blog-foto="' + dl + '"></label></div>' +
        '<textarea class="govde" data-govde="' + dl + '" rows="18">' + esc(metinler[dl]) + '</textarea><small class="ipucu">Her satır ayrı paragraf olur. "## " ile başlayan satır ara başlık (H2), "### " alt başlık (H3), "- " madde olur. Her yazıda tek H1 vardır, o da yukarıdaki başlıktır.</small></div>' +
        '<div class="alan genis"><label>Sık Sorulan Sorular</label><div class="sss" data-sss="' + dl + '">' + (v.sss || []).map(function (q, j) { return '<div class="sss-satir"><input data-sss-s="' + j + '" value="' + esc(q[0]) + '" placeholder="Soru"><textarea data-sss-c="' + j + '" rows="2" placeholder="Cevap">' + esc(q[1]) + '</textarea><button type="button" class="tehlike" data-sss-sil="' + j + '">×</button></div>'; }).join('') + '</div><button type="button" class="pb pb-ikinci kucuk-btn" data-sss-ekle="' + dl + '">+ Soru Ekle</button></div></div>';
    };
    var ciz = function () {
      el.innerHTML = '<div class="bas"><h2>' + (i == null ? 'Yeni Yazı' : 'Yazıyı Düzenle') + '</h2><div><button class="pb pb-ikinci" data-is="geri">Vazgeç</button> <button class="pb" data-is="kaydet">Kaydet</button></div></div>' +
        '<form class="kart form" onsubmit="return false"><div class="izgara">' + alan('Yayın Tarihi', 'tarih', y, 'date') + alan('İlgili Kategori', 'kategori', y, 'secim', { secenek: katListe(true) }) + '</div>' +
        fotoAlan('Kapak Fotoğrafı (Google ve paylaşımlarda görünür)', 'kapak', y, 'blog', 1, 'Yatay (16:9) fotoğraf önerilir.') +
        dilSekmeleri(dilIc) + '</form>';
      var form = $('form', el);
      baglan(form, y);
      form.addEventListener('input', function (e) {
        var t = e.target;
        if (t.dataset.govde) metinler[t.dataset.govde] = t.value;
        if (t.dataset.sssS != null || t.dataset.sssC != null) {
          var dl = t.closest('[data-sss]').dataset.sss, j = +(t.dataset.sssS != null ? t.dataset.sssS : t.dataset.sssC);
          y[dl].sss[j][t.dataset.sssS != null ? 0 : 1] = t.value;
        }
      });
      form.addEventListener('change', function (e) {
        var t = e.target;
        if (t.dataset.dilAktif) aktifDiller[t.dataset.dilAktif] = t.checked;
        if (t.dataset.blogFoto) {
          var dl = t.dataset.blogFoto, alanEl = $('[data-govde="' + dl + '"]', form);
          var f = t.files[0];
          if (!f) return;
          var alt = prompt('Fotoğrafı kısaca tarif et (Google için alt metin):', y[dl].h1 || '') || '';
          dosyaYukle(f, 'blog', slugYap(alt || y[dl].h1)).then(function (yol) {
            var satir = '![' + alt.replace(/[\[\]]/g, '') + '](' + yol + ')';
            var p = alanEl.selectionStart || alanEl.value.length;
            alanEl.value = alanEl.value.slice(0, p) + '\n\n' + satir + '\n\n' + alanEl.value.slice(p);
            metinler[dl] = alanEl.value;
          }).catch(function () {});
        }
      });
      form.addEventListener('click', function (e) {
        var t = e.target;
        if (t.dataset.ekle) {
          var dl = t.closest('.arac').dataset.dl, alanEl = $('[data-govde="' + dl + '"]', form);
          var ek = t.dataset.ekle;
          if (ek === 'link') {
            var kat = prompt('Hangi kategoriye link? Kategori kodları: ' + katListe(true).map(function (k) { return k[0]; }).join(', '));
            if (!kat) return;
            var metin = prompt('Link yazısı:', (S.veri.site.kategoriler.filter(function (k) { return k.id === kat; })[0] || { tr: { ad: '' } }).tr.ad);
            ek = '[' + metin + '](kat:' + kat + ')';
          }
          var p = alanEl.selectionStart;
          var bas = alanEl.value.lastIndexOf('\n', p - 1) + 1;
          alanEl.value = ek.indexOf('[') === 0 ? alanEl.value.slice(0, p) + ek + alanEl.value.slice(p) : alanEl.value.slice(0, bas) + ek + alanEl.value.slice(bas);
          metinler[dl] = alanEl.value;
          alanEl.focus();
        }
        if (t.dataset.sssEkle) { y[t.dataset.sssEkle].sss = y[t.dataset.sssEkle].sss || []; y[t.dataset.sssEkle].sss.push(['', '']); kaydetSekme(); ciz(); }
        if (t.dataset.sssSil != null) { var dl2 = t.closest('[data-sss]').dataset.sss; y[dl2].sss.splice(+t.dataset.sssSil, 1); kaydetSekme(); ciz(); }
      });
    };
    var kaydetSekme = function () {};
    ciz();
    el.onclick = function (e) {
      var b = e.target.closest('[data-is]');
      if (!b) return;
      if (b.dataset.is === 'geri') G.blog(el);
      if (b.dataset.is === 'kaydet') {
        var hazir = DILLER.filter(function (x) { return aktifDiller[x[0]]; });
        if (!hazir.length) { bildir('En az bir dili yayına aç.', 'hata'); return; }
        for (var k = 0; k < hazir.length; k++) {
          var dl = hazir[k][0], v = y[dl];
          if (!v.h1 || !v.baslik) { bildir(hazir[k][1] + ' için başlık ve sayfa başlığı gerekli.', 'hata'); return; }
          v.govde = metinler[dl].split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
          v.slug = slugYap(v.slug || v.h1);
          v.sss = (v.sss || []).filter(function (q) { return q[0] && q[1]; });
          v.ozet = v.ozet || v.aciklama;
        }
        DILLER.forEach(function (x) { if (!aktifDiller[x[0]]) delete y[x[0]]; });
        y.id = y.id || slugYap((y.tr || y.en || y.ru).h1).slice(0, 40);
        y.guncelleme = bugun();
        if (i == null) Y.unshift(y); else Y[i] = y;
        kaydet('blog', 'Blog yazısı kaydedildi').then(function (ok) { if (ok !== false) G.blog(el); });
      }
    };
  }

  G.beden = function (el) {
    var B = S.veri.beden.bedenler;
    el.innerHTML = '<div class="bas"><h2>Beden Tablosu</h2><div><button class="pb pb-ikinci" data-is="ekle">+ Satır Ekle</button> <button class="pb" data-is="kaydet">Kaydet</button></div></div>' +
      '<p class="ipucu">Ölçüler santimetre. Beden sayfasındaki hesaplayıcı bu tabloya göre çalışır.</p>' +
      '<form class="kart" onsubmit="return false"><div class="tablo-kap"><table class="tablo"><thead><tr><th>Beden</th><th>Göğüs</th><th>Bel</th><th>Kalça</th><th></th></tr></thead><tbody>' +
      B.map(function (r, i) { return '<tr><td><input data-yol="' + i + '.beden" value="' + esc(r.beden) + '"></td><td><input type="number" data-yol="' + i + '.gogus" value="' + esc(r.gogus) + '"></td><td><input type="number" data-yol="' + i + '.bel" value="' + esc(r.bel) + '"></td><td><input type="number" data-yol="' + i + '.kalca" value="' + esc(r.kalca) + '"></td><td><button type="button" class="tehlike" data-is="sil" data-i="' + i + '">Sil</button></td></tr>'; }).join('') +
      '</tbody></table></div></form>';
    baglan($('form', el), B);
    el.onclick = function (e) {
      var b = e.target.closest('[data-is]');
      if (!b) return;
      if (b.dataset.is === 'ekle') { B.push({ beden: '', gogus: '', bel: '', kalca: '' }); G.beden(el); }
      if (b.dataset.is === 'sil') { B.splice(+b.dataset.i, 1); G.beden(el); }
      if (b.dataset.is === 'kaydet') kaydet('beden', 'Beden tablosu güncellendi');
    };
  };

  G.cark = function (el) {
    var C = S.veri.site.cark;
    var toplam = function () { return C.dilimler.reduce(function (a, x) { return a + (+x.olasilik || 0); }, 0); };
    el.innerHTML = '<div class="bas"><h2>Çarkıfelek</h2><div><button class="pb pb-ikinci" data-is="ekle">+ Dilim Ekle</button> <button class="pb" data-is="kaydet">Kaydet</button></div></div>' +
      '<form class="kart form" onsubmit="return false">' + alan('Çark sitede açık', 'aktif', C, 'onay') +
      '<p class="ipucu">Kazanılan kod her dilim için sabittir: KOD + tutar + TL (örn: KOD750TL). Her telefon numarası çarkı bir kez çevirebilir. Numaralar Google E-Tablo\'ya kaydedilir.</p>' +
      '<div class="tablo-kap"><table class="tablo"><thead><tr><th>İndirim (TL)</th><th>Kazanma Oranı (%)</th><th>Kod</th><th></th></tr></thead><tbody>' +
      C.dilimler.map(function (x, i) { return '<tr><td><input type="number" data-yol="dilimler.' + i + '.tutar" value="' + esc(x.tutar) + '"></td><td><input type="number" data-yol="dilimler.' + i + '.olasilik" value="' + esc(x.olasilik) + '"></td><td><b>KOD' + esc(x.tutar) + 'TL</b></td><td><button type="button" class="tehlike" data-is="sil" data-i="' + i + '">Sil</button></td></tr>'; }).join('') +
      '</tbody></table></div><p class="toplam" id="c-toplam">Toplam oran: ' + toplam() + '%' + (toplam() !== 100 ? ' (100 olması önerilir)' : '') + '</p>' +
      alan('Kayıt Adresi (boşsa panel sunucusu kullanılır)', 'kayitUrl', C, 'text', { ipucu: 'Numaraları farklı bir Apps Script\'e kaydetmek istersen adresini buraya yaz.' }) + '</form>';
    baglan($('form', el), C, function () { var t = $('#c-toplam', el); t.textContent = 'Toplam oran: ' + toplam() + '%' + (toplam() !== 100 ? ' (100 olması önerilir)' : ''); });
    el.onclick = function (e) {
      var b = e.target.closest('[data-is]');
      if (!b) return;
      if (b.dataset.is === 'ekle') { C.dilimler.push({ tutar: 0, olasilik: 0 }); G.cark(el); }
      if (b.dataset.is === 'sil') { C.dilimler.splice(+b.dataset.i, 1); G.cark(el); }
      if (b.dataset.is === 'kaydet') {
        C.dilimler = C.dilimler.filter(function (x) { return +x.tutar > 0; }).map(function (x) { return { tutar: +x.tutar, olasilik: +x.olasilik || 0 }; });
        kaydet('site', 'Çark güncellendi');
        G.cark(el);
      }
    };
  };

  G.ayarlar = function (el) {
    var A = S.veri.site.ayarlar;
    A.saatler = A.saatler || [];
    el.innerHTML = '<div class="bas"><h2>Ayarlar</h2><button class="pb" data-is="kaydet">Kaydet</button></div>' +
      '<form class="kart form" onsubmit="return false"><h3>İletişim</h3><div class="izgara">' +
      alan('WhatsApp Numarası', 'whatsapp', A, 'text', { ipucu: 'Ülke koduyla, boşluksuz. Örn: 905416205207' }) +
      alan('Mağaza Telefonu', 'telefon', A, 'text', { ipucu: 'Örn: 902422421121' }) +
      alan('Adres', 'adres', A, 'text', { genis: true }) +
      alan('Instagram Kullanıcı Adı', 'instagram', A) + alan('Facebook Kullanıcı Adı', 'facebook', A) +
      alan('Google Haritalar Linki', 'harita', A, 'text', { genis: true }) +
      alan('Google İşletme Linki', 'google', A, 'text', { genis: true }) +
      '</div><h3>Çalışma Saatleri</h3><div class="saatler">' + GUNLER.map(function (g, i) {
        var s = A.saatler[i] || [];
        return '<div class="saat-satir"><b>' + g + '</b><input type="time" data-saat="' + i + '.0" value="' + esc(s[0] || '') + '"><span>–</span><input type="time" data-saat="' + i + '.1" value="' + esc(s[1] || '') + '"><label class="onay"><input type="checkbox" data-kapali="' + i + '"' + (!s[0] ? ' checked' : '') + '><span>Kapalı</span></label></div>';
      }).join('') + '</div>' +
      '<h3>Rakamlar</h3><div class="izgara">' + alan('Google Puanı', 'googlePuan', A, 'text', { ph: '4,7' }) + alan('Google Yorum Sayısı', 'googleYorum', A, 'number') + alan('Instagram Takipçi Sayısı', 'instagramTakipci', A, 'number') + '</div>' +
      '<h3>Yasal Bilgiler</h3><div class="izgara">' + alan('Şirket Ünvanı', 'unvan', A, 'text', { genis: true, ipucu: 'Mesafeli satış sözleşmesi ve iade sayfasında görünür.' }) + alan('Vergi Dairesi', 'vergiDairesi', A) + alan('Vergi Numarası', 'vergiNo', A) + alan('E-posta', 'eposta', A, 'text', { ph: 'ornek@antalyaabiye.com' }) + '</div>' +
      fotoAlan('Mağaza Fotoğrafı (Hakkımızda sayfası)', 'magazaGorsel', A, 'magaza', 1) +
      '<h3>Takip Ve Alan Adı</h3><div class="izgara">' + alan('Google Analytics 4 Ölçüm Kimliği', 'ga4', A, 'text', { ph: 'G-XXXXXXXXXX' }) + alan('Meta Pixel Kimliği', 'metaPixel', A, 'text', { ph: '123456789012345' }) + alan('TikTok Pixel Kimliği', 'tiktokPixel', A, 'text', { ph: 'CXXXXXXXXXXXXXXXXXXX' }) + alan('Google Tag Manager Kimliği', 'gtm', A, 'text', { ph: 'GTM-XXXXXXX', ipucu: 'Yukarıdakileri GTM içinde de kurduysan orada boş bırak, yoksa çift sayılır.' }) + alan('Search Console Doğrulama Kodu', 'googleDogrulama', A, 'text', { ph: 'google-site-verification içeriği', ipucu: 'Search Console > HTML etiketi yöntemindeki content="..." değeri.' }) + alan('Alan Adı', 'alanadi', A, 'text', { ph: 'antalyaabiye.com', ipucu: 'Gerçek alan adı bağlanınca yazılır. Canonical ve site haritası buna göre oluşur.' }) + '</div></form>';
    var form = $('form', el);
    baglan(form, A);
    form.addEventListener('input', function (e) {
      var t = e.target;
      if (t.dataset.saat) { var p = t.dataset.saat.split('.'); A.saatler[+p[0]] = A.saatler[+p[0]] || ['', '']; A.saatler[+p[0]][+p[1]] = t.value; }
    });
    form.addEventListener('change', function (e) {
      var t = e.target;
      if (t.dataset.kapali) { var i = +t.dataset.kapali; A.saatler[i] = t.checked ? null : ['09:30', '20:30']; G.ayarlar(el); }
    });
    el.onclick = function (e) { var b = e.target.closest('[data-is="kaydet"]'); if (b) kaydet('site', 'Ayarlar güncellendi'); };
  };

  function goster(g) {
    S.gorunum = g;
    $$('#menu button').forEach(function (b) { b.classList.toggle('on', b.dataset.gorunum === g); });
    var el = $('#icerik');
    el.onclick = null;
    G[g](el);
    $('#yan').classList.remove('acik');
    window.scrollTo(0, 0);
  }

  function basla() {
    $('#giris').hidden = true;
    $('#panel').hidden = false;
    $('#demo-etiket').hidden = !S.demo;
    $('#kim').textContent = S.demo ? '' : (sessionStorage.getItem('aa_panel_kim') || '');
    $('#icerik').innerHTML = '<p class="yukleniyor-yazi">Veriler yükleniyor...</p>';
    Promise.all(Object.keys(DOSYA).map(function (k) { return yukle(k).then(function (v) { S.veri[k] = v; }); }))
      .then(function () { goster(S.gorunum); })
      .catch(function (e) { $('#icerik').innerHTML = '<p class="hata-yazi">Veriler yüklenemedi: ' + esc(e.message) + '</p>'; });
  }

  function cikis() {
    sessionStorage.removeItem('aa_panel_token');
    S.token = '';
    location.reload();
  }

  $('#menu').addEventListener('click', function (e) { var b = e.target.closest('[data-gorunum]'); if (b) goster(b.dataset.gorunum); });
  $('#menu-btn').addEventListener('click', function () { $('#yan').classList.toggle('acik'); });
  $('#cikis').addEventListener('click', cikis);

  fetch('../data/site.json?t=' + Date.now()).then(function (r) { return r.json(); }).then(function (site) {
    S.api = site.ayarlar.yonetimApi || '';
    if (!S.api) {
      $('#giris-not').hidden = false;
      $('#demo-btn').hidden = false;
    } else if (S.token) {
      basla();
    }
  });

  $('#demo-btn').addEventListener('click', function () { S.demo = true; basla(); });
  $('#giris-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, h = $('#giris-hata');
    h.hidden = true;
    if (!S.api) { h.textContent = 'Panel sunucusu henüz bağlanmadı.'; h.hidden = false; return; }
    var btn = f.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Giriş yapılıyor...';
    istek({ islem: 'giris', kullanici: f.kullanici.value.trim(), sifre: f.sifre.value })
      .then(function (r) {
        S.token = r.token;
        sessionStorage.setItem('aa_panel_token', r.token);
        sessionStorage.setItem('aa_panel_kim', r.kullanici);
        basla();
      })
      .catch(function (x) { h.textContent = x.message; h.hidden = false; })
      .then(function () { btn.disabled = false; btn.textContent = 'Giriş Yap'; });
  });
})();
