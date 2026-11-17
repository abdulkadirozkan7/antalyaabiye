(function () {
  var d = document;
  var form = d.getElementById('kt-form');
  if (!form) return;
  var liste = d.getElementById('kt-liste');
  var kartlar = [].slice.call(liste.children);
  var bos = d.getElementById('kt-bos');
  var sayilar = [].slice.call(d.querySelectorAll('.kt-sayi'));
  var hizlilar = [].slice.call(d.querySelectorAll('.kt-hizli button'));
  var etiketler = d.getElementById('kt-etiketler');
  var temizle = d.querySelector('.kt-temizle');
  var seciliRozet = d.querySelector('.kt-secili');
  var sirala = d.getElementById('kt-sirala');
  var filtre = d.getElementById('kt-filtre');
  var perde = d.querySelector('.kt-perde');
  var stok = d.getElementById('kt-stok');
  var ALAN = { renkler: 'renk', bedenler: 'beden', boy: 'boy', kesim: 'kesim', kol: 'kol', kullanim: 'kullanim' };

  function secimler() {
    var s = {};
    [].forEach.call(form.querySelectorAll('input:checked'), function (i) { (s[i.name] = s[i.name] || []).push(i); });
    return s;
  }

  function uygula() {
    var s = secimler(), n = 0, toplam = 0;
    kartlar.forEach(function (k) {
      var uy = (!stok.checked || k.getAttribute('data-stok') === '1') && Object.keys(s).every(function (ad) {
        var v = (k.getAttribute('data-' + ALAN[ad]) || '').split(' ');
        return s[ad].some(function (i) { return v.indexOf(i.value) > -1; });
      });
      k.hidden = !uy;
      if (uy) n++;
    });
    sayilar.forEach(function (x) { x.textContent = x.getAttribute('data-kalip').replace('{n}', n); });
    hizlilar.forEach(function (b) {
      var on;
      if (b.hasAttribute('data-bedenler')) on = b.getAttribute('data-bedenler').split(' ').every(function (v) { var i = form.querySelector('input[name="bedenler"][value="' + v + '"]'); return i && i.checked; });
      else { var i = form.querySelector('input[name="' + b.getAttribute('data-ad') + '"][value="' + b.getAttribute('data-deger') + '"]'); on = !!(i && i.checked); }
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on);
    });
    bos.hidden = n > 0;
    var html = '';
    Object.keys(s).forEach(function (ad) {
      s[ad].forEach(function (i) {
        toplam++;
        var et = i.closest('label').querySelector('span').textContent;
        html += '<button type="button" data-ad="' + ad + '" data-deger="' + i.value + '">' + et.replace(/[<>&"]/g, '') + '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>';
      });
    });
    etiketler.innerHTML = html;
    temizle.hidden = !toplam;
    seciliRozet.hidden = !toplam;
    seciliRozet.textContent = toplam;
  }

  function sirayla() {
    var v = sirala.value;
    var sirali = kartlar.slice().sort(function (a, b) {
      if (v === 'az') return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent, d.documentElement.lang);
      var x = +a.getAttribute('data-sira'), y = +b.getAttribute('data-sira');
      return v === 'yeni' ? y - x : x - y;
    });
    sirali.forEach(function (k) { liste.appendChild(k); });
  }

  form.addEventListener('change', uygula);
  stok.addEventListener('change', uygula);
  var sutunlar = [].slice.call(d.querySelectorAll('.kt-sutun button'));
  var sutunYaz = function (n) {
    liste.setAttribute('data-sutun', n);
    sutunlar.forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-sutun') === n); });
    try { localStorage.setItem('aa_sutun', n); } catch (e) {}
  };
  sutunlar.forEach(function (b) { b.addEventListener('click', function () { sutunYaz(b.getAttribute('data-sutun')); }); });
  try { var ks = localStorage.getItem('aa_sutun'); if (ks) sutunYaz(ks); } catch (e) {}
  sirala.addEventListener('change', sirayla);
  etiketler.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    var i = form.querySelector('input[name="' + b.getAttribute('data-ad') + '"][value="' + b.getAttribute('data-deger') + '"]');
    if (i) { i.checked = false; uygula(); }
  });
  temizle.addEventListener('click', function () { form.reset(); uygula(); });
  hizlilar.forEach(function (b) {
    b.addEventListener('click', function () {
      var girdiler = b.hasAttribute('data-bedenler')
        ? b.getAttribute('data-bedenler').split(' ').map(function (v) { return form.querySelector('input[name="bedenler"][value="' + v + '"]'); })
        : [form.querySelector('input[name="' + b.getAttribute('data-ad') + '"][value="' + b.getAttribute('data-deger') + '"]')];
      girdiler = girdiler.filter(Boolean);
      var hepsi = girdiler.every(function (i) { return i.checked; });
      girdiler.forEach(function (i) { i.checked = !hepsi; });
      uygula();
    });
  });

  var sp = d.getElementById('kt-sp');
  var spSecili = d.getElementById('kt-sp-secili');
  var spAc = function (on) {
    if (!sp) return;
    sp.classList.toggle('on', on);
    sp.setAttribute('aria-hidden', on ? 'false' : 'true');
    perde.hidden = !on;
    d.body.classList.toggle('aa-kilit', on);
  };
  var ac = function (on) {
    filtre.classList.toggle('on', on);
    perde.hidden = !on;
    d.body.classList.toggle('aa-kilit', on);
  };
  if (window.matchMedia('(max-width:1180px)').matches) [].forEach.call(form.querySelectorAll('details.kt-grup'), function (g) { g.open = false; });
  var spBtn = d.querySelector('.kt-sirala-btn');
  if (spBtn) spBtn.addEventListener('click', function () { spAc(true); });
  if (sp) {
    sp.querySelector('.kt-sp-kapat').addEventListener('click', function () { spAc(false); });
    sp.addEventListener('click', function (e) {
      var b = e.target.closest('[data-sira]');
      if (!b) return;
      [].forEach.call(sp.querySelectorAll('[data-sira]'), function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
      spSecili.textContent = b.textContent;
      sirala.value = b.getAttribute('data-sira');
      sirayla();
      setTimeout(function () { spAc(false); }, 180);
    });
  }
  d.querySelector('.kt-filtre-btn').addEventListener('click', function () { ac(true); });
  d.querySelector('.kt-kapat').addEventListener('click', function () { ac(false); });
  d.querySelector('.kt-goster').addEventListener('click', function () { ac(false); });
  perde.addEventListener('click', function () { ac(false); spAc(false); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') { ac(false); spAc(false); } });
})();
