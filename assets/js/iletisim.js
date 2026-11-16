(function () {
  var d = document;
  var saat = d.getElementById('il-saat');
  if (saat) {
    var S = JSON.parse(saat.getAttribute('data-saatler'));
    var parca = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Istanbul', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    var al = function (t) { for (var i = 0; i < parca.length; i++) if (parca[i].type === t) return parca[i].value; return ''; };
    var gun = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(al('weekday'));
    var dk = parseInt(al('hour'), 10) % 24 * 60 + parseInt(al('minute'), 10);
    var cevir = function (s) { var p = s.split(':'); return +p[0] * 60 + +p[1]; };
    var bugun = saat.querySelector('li[data-gun="' + gun + '"]');
    if (bugun) {
      bugun.classList.add('il-bugun');
      var sp = bugun.querySelector('span');
      sp.innerHTML = sp.textContent + ' <i>' + saat.getAttribute('data-bugun') + '</i>';
    }
    var r = S[gun];
    var acik = r && r[0] && dk >= cevir(r[0]) && dk < cevir(r[1]);
    var durum = saat.querySelector('.il-durum');
    durum.textContent = saat.getAttribute(acik ? 'data-acik' : 'data-kapali');
    durum.classList.add(acik ? 'il-acik' : 'il-kapali');
    durum.hidden = false;
  }

  var form = d.getElementById('il-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ad = form.elements.ad.value.trim();
      var mesaj = form.elements.mesaj.value.trim();
      var eksik = false;
      [['ad', ad], ['mesaj', mesaj]].forEach(function (x) {
        var el = form.elements[x[0]];
        el.closest('label').classList.toggle('il-hata', !x[1]);
        if (!x[1] && !eksik) { el.focus(); eksik = true; }
      });
      if (eksik) return;
      var metin = form.getAttribute('data-sablon').replace('{ad}', ad).replace('{konu}', form.elements.konu.value).replace('{mesaj}', mesaj);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'whatsapp_tikla', konum: 'iletisim_form', dil: d.documentElement.lang });
      window.open('https://wa.me/' + form.getAttribute('data-wa') + '?text=' + encodeURIComponent(metin), '_blank', 'noopener');
    });
    form.querySelectorAll('input, textarea').forEach(function (el) {
      el.addEventListener('input', function () { el.closest('label').classList.remove('il-hata'); });
    });
  }
})();
