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
