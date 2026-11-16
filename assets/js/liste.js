(function () {
  var d = document;
  var kutu = d.querySelector('.yd-liste');
  if (!kutu) return;
  var tur = kutu.getAttribute('data-tur');
  var dil = d.documentElement.lang || 'tr';
  var kartlar = [].slice.call(kutu.querySelectorAll('.kt-kart'));
  var bos = d.getElementById('yd-bos');
  var goster = function (fn) {
    var n = 0;
    kartlar.forEach(function (k) { var on = fn(k); k.hidden = !on; if (on) n++; });
    bos.hidden = n > 0;
    return n;
  };
  if (tur === 'favoriler') {
    var yenile = function () {
      var f = [];
      try { f = JSON.parse(localStorage.getItem('aa_fav') || '[]'); } catch (e) {}
      goster(function (k) { return f.indexOf(k.getAttribute('data-kod')) > -1; });
    };
    yenile();
    d.addEventListener('click', function (e) { if (e.target.closest('[data-fav]')) setTimeout(yenile, 0); });
    window.addEventListener('storage', yenile);
    return;
  }
  var q = (new URLSearchParams(location.search).get('q') || '').trim();
  var input = kutu.querySelector('input[name="q"]');
  var sonuc = d.getElementById('yd-sonuc');
  if (input) input.value = q;
  if (!q) { goster(function () { return false; }); bos.hidden = true; if (input) input.focus(); return; }
  var kelimeler = q.toLocaleLowerCase(dil).split(/\s+/).filter(Boolean);
  var n = goster(function (k) {
    var m = k.getAttribute('data-ara');
    return kelimeler.every(function (w) { return m.indexOf(w) > -1; });
  });
  if (sonuc) sonuc.textContent = sonuc.getAttribute('data-kalip').replace('{q}', q).replace('{n}', n);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'site_ici_arama', arama: q, sonuc: n });
})();
