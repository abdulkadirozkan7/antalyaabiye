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
