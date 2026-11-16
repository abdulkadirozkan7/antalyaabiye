(function () {
  var d = document;
  var kutu = d.getElementById('ck');
  var veriEl = d.getElementById('ck-veri');
  if (!kutu || !veriEl) return;
  var V = JSON.parse(veriEl.textContent);
  var T = V.t;
  var acBtn = d.getElementById('ck-ac');
  var form = d.getElementById('ck-form');
  var sonuc = d.getElementById('ck-sonuc');
  var teker = d.getElementById('ck-teker');
  var cevirBtn = form.querySelector('.ck-cevir');
  var hata = form.querySelector('.ck-hata');
  var ANAHTAR = 'aa_cark';

  var oku = function () { try { return JSON.parse(localStorage.getItem(ANAHTAR) || 'null'); } catch (e) { return null; } };
  var yaz = function (v) { try { localStorage.setItem(ANAHTAR, JSON.stringify(v)); } catch (e) {} };

  var ac = function (on) {
    kutu.hidden = !on;
    d.body.classList.toggle('aa-kilit', on);
    if (on) {
      var k = oku();
      if (k) sonucGoster(k, false);
      else setTimeout(function () { form.elements.tel.focus(); }, 50);
    }
  };
  acBtn.addEventListener('click', function () { ac(true); });
  kutu.querySelector('.ck-kapat').addEventListener('click', function () { ac(false); });
  kutu.addEventListener('click', function (e) { if (e.target === kutu) ac(false); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !kutu.hidden) ac(false); });

  var temizTel = function (v) {
    var s = String(v).replace(/\D/g, '');
    if (s.indexOf('90') === 0 && s.length === 12) s = '0' + s.slice(2);
    if (s.length === 10 && s[0] === '5') s = '0' + s;
    return s;
  };
  var gecerli = function () {
    var s = temizTel(form.elements.tel.value);
    var trOk = /^05\d{9}$/.test(s);
    var yabanci = /^\+?\d{10,15}$/.test(String(form.elements.tel.value).replace(/[\s()-]/g, '')) && String(form.elements.tel.value).trim().charAt(0) === '+';
    return trOk || yabanci;
  };
  var kontrol = function () {
    cevirBtn.disabled = !(form.elements.ticari.checked && form.elements.kvkk.checked && form.elements.tel.value.trim().length >= 10);
  };
  form.addEventListener('input', function () { hata.hidden = true; kontrol(); });
  form.addEventListener('change', kontrol);

  var sec = function () {
    var top = V.dilimler.reduce(function (a, x) { return a + (+x.olasilik || 0); }, 0);
    var r = Math.random() * top;
    for (var i = 0; i < V.dilimler.length; i++) {
      r -= +V.dilimler[i].olasilik || 0;
      if (r < 0) return i;
    }
    return 0;
  };
  var kodUret = function (tutar) { return 'KOD' + tutar + 'TL'; };

  function sonucGoster(k, animasyon) {
    form.hidden = true;
    sonuc.hidden = false;
    sonuc.querySelector('.ck-kazandin').textContent = T.kazandin.replace('{tutar}', k.tutar);
    d.getElementById('ck-kod').textContent = k.kod;
    var m = T.mesaj.replace('{tutar}', k.tutar).replace('{kod}', k.kod).replace('{tel}', k.tel || '');
    d.getElementById('ck-kullan').href = 'https://wa.me/' + V.wa + '?text=' + encodeURIComponent(m);
    if (!animasyon && typeof k.aci === 'number') {
      teker.style.transition = 'none';
      teker.style.transform = 'rotate(' + k.aci + 'deg)';
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!gecerli()) { hata.hidden = false; form.elements.tel.focus(); return; }
    if (oku()) { sonucGoster(oku(), false); return; }
    var i = sec();
    var n = V.dilimler.length, dilim = 360 / n;
    var sapma = (Math.random() - 0.5) * dilim * 0.6;
    var aci = 360 * 6 - (i * dilim + dilim / 2) + sapma;
    var tutar = V.dilimler[i].tutar;
    var tel = form.elements.tel.value.trim();
    var k = { tutar: tutar, kod: kodUret(tutar), tel: tel, aci: aci % 360, zaman: new Date().toISOString() };
    cevirBtn.disabled = true;
    cevirBtn.textContent = T.donuyor;
    form.elements.tel.readOnly = true;
    var hareket = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    teker.style.transition = hareket ? 'transform 5.2s cubic-bezier(.12,.67,.12,1)' : 'none';
    teker.style.transform = 'rotate(' + aci + 'deg)';
    yaz(k);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'cark_cevir', indirim: tutar });
    if (V.kayitUrl) {
      try {
        fetch(V.kayitUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ telefon: tel, kod: k.kod, tutar: tutar, dil: d.documentElement.lang, sayfa: location.pathname, zaman: k.zaman, ticariIleti: true, kvkk: true }) });
      } catch (x) {}
    }
    setTimeout(function () { sonucGoster(k, true); }, hareket ? 5400 : 200);
  });

  kutu.querySelector('.ck-kopyala').addEventListener('click', function (e) {
    var b = e.currentTarget;
    var kod = d.getElementById('ck-kod').textContent;
    var bitti = function () { b.textContent = T.kopyalandi; setTimeout(function () { b.textContent = T.kopyala; }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(kod).then(bitti, bitti); else bitti();
  });
})();
