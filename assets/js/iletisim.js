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

})();
