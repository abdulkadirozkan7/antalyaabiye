(function () {
  var d = document;
  var ray = d.getElementById('ur-ray');
  if (ray) {
    var slaytlar = ray.children.length;
    var kucukler = [].slice.call(d.querySelectorAll('.ur-kucuk'));
    var noktalar = [].slice.call(d.querySelectorAll('#ur-noktalar i'));
    var sayac = d.getElementById('ur-sayac');
    var aktif = 0;
    var git = function (i) {
      aktif = (i + slaytlar) % slaytlar;
      ray.scrollTo({ left: ray.clientWidth * aktif, behavior: 'smooth' });
    };
    var isaretle = function (i) {
      aktif = i;
      kucukler.forEach(function (k, j) { k.classList.toggle('on', j === i); });
      noktalar.forEach(function (k, j) { k.classList.toggle('on', j === i); });
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
  if (!form) return;
  var wp = d.getElementById('ur-wp');
  var sepetBtn = d.getElementById('ur-sepet');
  var sabitBtn = d.querySelector('.ur-sabit-btn');
  var sabitSecim = d.getElementById('ur-sabit-secim');
  var renkAd = d.getElementById('ur-renk-ad');
  var bedenAlan = d.getElementById('ur-beden-alan');
  var uyari = null;
  var guncelle = function () {
    var r = form.querySelector('input[name="renk"]:checked');
    var b = form.querySelector('input[name="beden"]:checked');
    if (r) renkAd.textContent = r.value;
    sabitSecim.textContent = (r ? r.value : '') + (b ? ' · ' + b.value : '');
    var m = form.getAttribute('data-mesaj')
      .replace('{ad}', form.getAttribute('data-ad'))
      .replace('{kod}', form.getAttribute('data-kod'))
      .replace('{renk}', r ? r.value : form.getAttribute('data-secilmedi'))
      .replace('{beden}', b ? b.value : form.getAttribute('data-secilmedi'));
    var url = 'https://wa.me/' + form.getAttribute('data-wa') + '?text=' + encodeURIComponent(m + '\n' + location.href.split('#')[0]);
    wp.href = url;
    if (b && uyari) { uyari.remove(); uyari = null; bedenAlan.classList.remove('ur-eksik'); }
  };
  var kontrol = function (e) {
    if (form.querySelector('input[name="beden"]:checked')) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    bedenAlan.classList.remove('ur-eksik');
    void bedenAlan.offsetWidth;
    bedenAlan.classList.add('ur-eksik');
    if (!uyari) {
      uyari = d.createElement('p');
      uyari.className = 'ur-uyari';
      uyari.textContent = bedenAlan.getAttribute('data-uyari');
      bedenAlan.appendChild(uyari);
    }
    bedenAlan.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  sepetBtn.addEventListener('click', function (e) {
    kontrol(e);
    if (e.defaultPrevented) return;
    var r = form.querySelector('input[name="renk"]:checked');
    var b = form.querySelector('input[name="beden"]:checked');
    if (window.aaSepet) window.aaSepet.ekle(JSON.parse(sepetBtn.getAttribute('data-sepet')), r ? r.value : '', b.value);
  });
  sabitBtn.addEventListener('click', function () { sepetBtn.click(); });
  form.addEventListener('change', guncelle);
  var galeri = d.getElementById('ur-galeri');
  var renkGaleri = galeri && galeri.getAttribute('data-renkler') ? JSON.parse(galeri.getAttribute('data-renkler')) : null;
  if (renkGaleri) {
    form.addEventListener('change', function (e) {
      if (e.target.name !== 'renk' || !renkGaleri[e.target.value]) return;
      var l = renkGaleri[e.target.value];
      var adi = galeri.getAttribute('data-ad') + ' ' + e.target.value;
      [].forEach.call(galeri.querySelectorAll('.ur-slayt'), function (sl, i) {
        sl.innerHTML = l[i] ? '<img src="' + l[i] + '" alt="' + adi.replace(/"/g, '&quot;') + ' ' + (i + 1) + '" width="1200" height="1800">' : '';
        sl.hidden = !l[i];
      });
      [].forEach.call(galeri.querySelectorAll('.ur-kucuk'), function (k, i) {
        k.innerHTML = l[i] ? '<img src="' + l[i] + '" alt="" width="1200" height="1800">' : '';
        k.hidden = !l[i];
      });
      if (ray) ray.scrollTo({ left: 0 });
    });
  }
  guncelle();

  var sabit = d.getElementById('ur-sabit');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (g) { sabit.classList.toggle('on', !g[0].isIntersecting); }).observe(sepetBtn);
  } else {
    sabit.classList.add('on');
  }
})();
