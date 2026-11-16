(function () {
  var el = document.getElementById('as-saat');
  if (!el) return;
  var S = JSON.parse(el.getAttribute('data-saatler'));
  var parca = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Istanbul', weekday: 'short' }).formatToParts(new Date());
  var gun = -1;
  parca.forEach(function (p) { if (p.type === 'weekday') gun = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(p.value); });
  if (gun < 0) return;
  var r = S[gun];
  el.querySelector('span').textContent = el.getAttribute('data-bugun') + ': ' + (r && r[0] ? r[0] + '–' + r[1] : el.getAttribute('data-kapali'));
})();
(function () {
  var d = document;
  var ray = d.getElementById('as-b-ray');
  if (!ray) return;
  var n = ray.children.length;
  var noktalar = [].slice.call(d.querySelectorAll('#as-b-noktalar button'));
  var aktif = 0, zaman;
  var git = function (i) { aktif = (i + n) % n; ray.scrollTo({ left: ray.clientWidth * aktif, behavior: 'smooth' }); };
  var isaretle = function () {
    aktif = Math.round(ray.scrollLeft / ray.clientWidth);
    noktalar.forEach(function (b, j) { b.classList.toggle('on', j === aktif); });
  };
  var bekle;
  ray.addEventListener('scroll', function () { clearTimeout(bekle); bekle = setTimeout(isaretle, 60); }, { passive: true });
  noktalar.forEach(function (b, i) { b.addEventListener('click', function () { git(i); basla(); }); });
  d.querySelector('.as-b-geri').addEventListener('click', function () { git(aktif - 1); basla(); });
  d.querySelector('.as-b-ileri').addEventListener('click', function () { git(aktif + 1); basla(); });
  var hareket = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function basla() { clearInterval(zaman); if (hareket && n > 1) zaman = setInterval(function () { git(aktif + 1); }, 6000); }
  var kutu = d.getElementById('as-banner');
  kutu.addEventListener('mouseenter', function () { clearInterval(zaman); });
  kutu.addEventListener('mouseleave', basla);
  kutu.addEventListener('touchstart', function () { clearInterval(zaman); }, { passive: true });
  basla();
})();
(function () {
  var d = document;
  var no = d.getElementById('as-b-no');
  var ray = d.getElementById('as-b-ray');
  if (no && ray) {
    ray.addEventListener('scroll', function () {
      var i = Math.round(ray.scrollLeft / ray.clientWidth) + 1;
      no.textContent = (i < 10 ? '0' : '') + i;
    }, { passive: true });
  }
  var sekmeler = [].slice.call(d.querySelectorAll('.as-sekmeler button'));
  var tumu = d.getElementById('as-u-tumu');
  sekmeler.forEach(function (b) {
    b.addEventListener('click', function () {
      var s = b.getAttribute('data-sekme');
      var kutu = b.closest('.as-urunler');
      sekmeler.forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
      [].forEach.call(kutu.querySelectorAll('.as-u-ray'), function (r) { r.hidden = r.getAttribute('data-sekme') !== s; r.scrollLeft = 0; });
      if (tumu) tumu.href = tumu.getAttribute('data-' + s);
    });
  });
  [].forEach.call(d.querySelectorAll('.as-u-kutu'), function (kutu) {
    var kay = function (yon) {
      var r = [].filter.call(kutu.querySelectorAll('.as-u-ray'), function (x) { return !x.hidden; })[0];
      if (!r) return;
      var k = r.querySelector('.kt-kart');
      var w = k ? k.getBoundingClientRect().width + 18 : 300;
      r.scrollBy({ left: yon * w * 2, behavior: 'smooth' });
    };
    var g = kutu.querySelector('.as-u-geri'), i2 = kutu.querySelector('.as-u-ileri');
    if (g) g.addEventListener('click', function () { kay(-1); });
    if (i2) i2.addEventListener('click', function () { kay(1); });
  });

  var videolar = [].slice.call(d.querySelectorAll('.ig-video'));
  if (videolar.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (g) {
      g.forEach(function (x) {
        if (x.isIntersecting) { var p = x.target.play(); if (p && p.catch) p.catch(function () {}); }
        else x.target.pause();
      });
    }, { threshold: 0.5 });
    videolar.forEach(function (v) { io.observe(v); });
  }
  d.addEventListener('click', function (e) {
    var b = e.target.closest('.ig-ses');
    if (!b) return;
    var v = b.parentNode.querySelector('video');
    videolar.forEach(function (x) { if (x !== v) { x.muted = true; var bb = x.parentNode.querySelector('.ig-ses'); if (bb) bb.classList.remove('on'); } });
    v.muted = !v.muted;
    b.classList.toggle('on', !v.muted);
    b.setAttribute('aria-label', b.getAttribute(v.muted ? 'data-ac' : 'data-kapat'));
  });
})();
