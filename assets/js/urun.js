(function () {
  var d = document;
  var ray = d.getElementById('ur-ray');
  if (ray) {
    var slaytlar = ray.children.length;
    var kucukler = [].slice.call(d.querySelectorAll('.ur-kucuk'));
    var sayac = d.getElementById('ur-sayac');
    var aktif = 0;
    var git = function (i) {
      aktif = (i + slaytlar) % slaytlar;
      ray.scrollTo({ left: ray.clientWidth * aktif, behavior: 'smooth' });
    };
    var isaretle = function (i) {
      aktif = i;
      kucukler.forEach(function (k, j) { k.classList.toggle('on', j === i); });
      sayac.textContent = (i + 1) + ' / ' + slaytlar;
    };
    kucukler.forEach(function (k, i) { k.addEventListener('click', function () { git(i); }); });
    d.querySelector('.ur-geri').addEventListener('click', function () { git(aktif - 1); });
    d.querySelector('.ur-ileri').addEventListener('click', function () { git(aktif + 1); });
    var bekle;
    ray.addEventListener('scroll', function () {
      clearTimeout(bekle);
      bekle = setTimeout(function () { isaretle(Math.round(ray.scrollLeft / ray.clientWidth)); }, 60);
    }, { passive: true });
  }

  var form = d.getElementById('ur-form');
  if (form) {
    var wp = d.getElementById('ur-wp');
    var renkAd = d.getElementById('ur-renk-ad');
    var guncelle = function () {
      var r = form.querySelector('input[name="renk"]:checked');
      var b = form.querySelector('input[name="beden"]:checked');
      if (r) renkAd.textContent = r.value;
      var m = form.getAttribute('data-mesaj')
        .replace('{ad}', form.getAttribute('data-ad'))
        .replace('{kod}', form.getAttribute('data-kod'))
        .replace('{renk}', r ? r.value : form.getAttribute('data-secilmedi'))
        .replace('{beden}', b ? b.value : form.getAttribute('data-secilmedi'));
      wp.href = 'https://wa.me/' + form.getAttribute('data-wa') + '?text=' + encodeURIComponent(m + '\n' + location.href.split('#')[0]);
    };
    form.addEventListener('change', guncelle);
    guncelle();
  }
})();
