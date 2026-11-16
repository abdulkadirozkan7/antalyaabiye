(function () {
  var d = document;
  var veriEl = d.getElementById('bd-veri');
  if (!veriEl) return;
  var V = JSON.parse(veriEl.textContent);
  var T = V.t;
  var B = V.bedenler;
  var form = d.getElementById('bd-hesap');
  var sonuc = d.getElementById('bd-sonuc');
  var wpBtn = d.getElementById('bd-wp');
  var svg = d.querySelector('.bd-svg');
  var OLCU = ['gogus', 'bel', 'kalca'];

  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var oku = function (ad) {
    var v = parseFloat(String(form.elements[ad].value).replace(',', '.'));
    return isFinite(v) && v > 0 ? v : null;
  };
  var waLink = function (m) { return 'https://wa.me/' + V.wa + '?text=' + encodeURIComponent(m); };

  var aktif = function (olcu) {
    d.querySelectorAll('[data-olcu]').forEach(function (el) {
      el.classList.toggle('bd-on-aktif', !!olcu && el.getAttribute('data-olcu') === olcu);
    });
    if (svg) svg.classList.toggle('bd-odak', !!olcu);
  };

  d.querySelectorAll('.bd-girdi, .bd-adimlar li, .bd-tablo th[data-olcu]').forEach(function (el) {
    var o = el.getAttribute('data-olcu');
    el.addEventListener('mouseenter', function () { aktif(o); });
    el.addEventListener('mouseleave', function () { if (!form.contains(d.activeElement)) aktif(null); });
  });
  form.querySelectorAll('input').forEach(function (inp) {
    inp.addEventListener('focus', function () { aktif(inp.name); });
    inp.addEventListener('blur', function () { aktif(null); });
    inp.addEventListener('input', hesapla);
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); });

  function hesapla() {
    var deger = {};
    ['gogus', 'bel', 'kalca', 'boy'].forEach(function (o) {
      deger[o] = oku(o);
      var t = svg && svg.querySelector('[data-deger="' + o + '"]');
      if (t) t.textContent = deger[o] ? deger[o] + ' cm' : '— cm';
    });
    d.querySelectorAll('.bd-tablo tbody tr').forEach(function (tr) { tr.classList.remove('bd-secili'); });

    var idx = {}, ust = false, enBuyuk = -1, enKucuk = 99, girilen = 0;
    OLCU.forEach(function (o) {
      if (deger[o] == null) return;
      girilen++;
      var i = -1;
      for (var k = 0; k < B.length; k++) { if (deger[o] <= B[k][o]) { i = k; break; } }
      if (i === -1) { ust = true; i = B.length; }
      idx[o] = i;
      enBuyuk = Math.max(enBuyuk, i);
      enKucuk = Math.min(enKucuk, i);
    });

    var olculer = ['gogus', 'bel', 'kalca', 'boy'].filter(function (o) { return deger[o] != null; })
      .map(function (o) { return T[o] + ' ' + deger[o] + ' cm'; }).join(', ');

    if (!girilen) {
      sonuc.className = 'bd-sonuc';
      sonuc.innerHTML = '<p>' + esc(T.sonucBos) + '</p>';
      wpBtn.href = waLink(olculer ? T.wpMesajBos + '\n' + olculer : T.wpMesajBos);
      return;
    }

    var beden = ust ? null : B[enBuyuk].beden;
    var html = '';
    if (ust) {
      html = '<p class="bd-uyari">' + esc(T.ustunde) + '</p>';
    } else {
      html = '<div class="bd-oneri"><span>' + esc(T.sonuc) + '</span><strong>' + esc(beden) + '</strong></div>';
      var row = d.querySelector('.bd-tablo tr[data-beden="' + beden + '"]');
      if (row) row.classList.add('bd-secili');
    }
    html += '<ul class="bd-cipler">' + OLCU.filter(function (o) { return idx[o] != null; }).map(function (o) {
      var b = idx[o] >= B.length ? B[B.length - 1].beden + '+' : B[idx[o]].beden;
      return '<li><span>' + esc(T[o]) + '</span><b>' + esc(b) + '</b></li>';
    }).join('') + '</ul>';
    if (!ust && enBuyuk - enKucuk >= 2) html += '<p class="bd-uyari">' + esc(T.farkli) + '</p>';
    sonuc.className = 'bd-sonuc bd-dolu';
    sonuc.innerHTML = html;

    wpBtn.href = waLink(T.wpMesaj.replace('{olculer}', olculer).replace('{beden}', beden || (B[B.length - 1].beden + '+')));
  }

  var sahne = d.querySelector('.bd-sahne');
  var kart = d.querySelector('.bd-kart');
  if (sahne && kart && window.matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches) {
    sahne.addEventListener('mousemove', function (e) {
      var r = sahne.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      kart.style.transform = 'rotateY(' + (x * 16).toFixed(2) + 'deg) rotateX(' + (-y * 8).toFixed(2) + 'deg)';
    });
    sahne.addEventListener('mouseleave', function () { kart.style.transform = ''; });
  }
})();
