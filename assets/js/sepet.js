(function () {
  var d = document;
  var veriEl = d.getElementById('sp-veri');
  var panel = d.getElementById('sp');
  if (!veriEl || !panel) return;
  var V = JSON.parse(veriEl.textContent);
  var T = V.t;
  var ANAHTAR = 'aa_sepet';
  var perde = d.getElementById('sp-perde');
  var liste = d.getElementById('sp-liste');
  var bos = d.getElementById('sp-bos');
  var alt = d.getElementById('sp-alt');
  var sayi = d.getElementById('sp-sayi');
  var tamamla = d.getElementById('sp-tamamla');
  var kok = (function () {
    var s = d.querySelector('script[src*="assets/js/sepet.js"]');
    return s ? s.src.replace(/assets\/js\/sepet\.js.*$/, '') : '';
  })();

  var oku = function () { try { return JSON.parse(localStorage.getItem(ANAHTAR) || '[]'); } catch (e) { return []; } };
  var yaz = function (l) { try { localStorage.setItem(ANAHTAR, JSON.stringify(l)); } catch (e) {} ciz(); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var toplam = function (l) { return l.reduce(function (a, x) { return a + (x.adet || 1); }, 0); };

  var mesaj = function (l) {
    var m = [T.mesaj, ''];
    l.forEach(function (x, i) {
      m.push(T.satir.replace('{n}', i + 1).replace('{ad}', x.ad).replace('{kod}', x.kod).replace('{renk}', x.renk || '-').replace('{beden}', x.beden || '-').replace('{adet}', x.adet || 1));
      m.push('');
    });
    var cark = null;
    try { cark = JSON.parse(localStorage.getItem('aa_cark') || 'null'); } catch (e) {}
    if (cark && cark.kod) { m.push(T.kod.replace('{kod}', cark.kod)); m.push(''); }
    m.push(T.son);
    return m.join('\n');
  };

  function ciz() {
    var l = oku();
    var n = toplam(l);
    [].forEach.call(d.querySelectorAll('.aa-sepet-say'), function (b) { b.textContent = n; b.hidden = !n; });
    sayi.textContent = n ? '(' + n + ')' : '';
    bos.hidden = l.length > 0;
    alt.hidden = !l.length;
    liste.innerHTML = l.map(function (x, i) {
      return '<li class="sp-oge" data-i="' + i + '">' +
        '<a class="sp-gorsel" href="' + esc(kok + x.url) + '">' + (x.foto ? '<img src="' + esc(kok + x.foto) + '" alt="" width="76" height="114">' : '<span>' + esc(x.kod) + '</span>') + '</a>' +
        '<div class="sp-bilgi"><a class="sp-ad" href="' + esc(kok + x.url) + '">' + esc(x.ad) + '</a>' +
        '<p class="sp-secim"><span>' + esc(T.renk) + ': ' + esc(x.renk || '-') + '</span><span>' + esc(T.beden) + ': ' + esc(x.beden || '-') + '</span></p>' +
        '<div class="sp-alt-satir"><div class="sp-adet" aria-label="' + esc(T.adet) + '"><button type="button" data-is="-1" aria-label="-">−</button><b>' + (x.adet || 1) + '</b><button type="button" data-is="1" aria-label="+">+</button></div>' +
        '<button type="button" class="sp-kaldir" data-is="sil">' + esc(T.kaldir) + '</button></div></div></li>';
    }).join('');
    tamamla.href = 'https://wa.me/' + V.wa + '?text=' + encodeURIComponent(mesaj(l));
  }

  var ac = function (on) {
    panel.classList.toggle('on', on);
    panel.setAttribute('aria-hidden', on ? 'false' : 'true');
    perde.hidden = !on;
    d.body.classList.toggle('aa-kilit', on);
    if (on) panel.querySelector('.sp-kapat').focus();
  };

  var ekle = function (u, renk, beden) {
    var l = oku();
    var var_ = l.filter(function (x) { return x.kod === u.k && x.renk === renk && x.beden === beden; })[0];
    if (var_) var_.adet = (var_.adet || 1) + 1;
    else l.push({ kod: u.k, ad: u.a, url: pathYap(u.u || './'), foto: u.f || '', renk: renk, beden: beden, adet: 1 });
    yaz(l);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'sepete_ekle', urun: u.k, ad: u.a, renk: renk, beden: beden });
    ac(true);
  };

  function pathYap(h) {
    var tam = new URL(h, location.href).href;
    return tam.indexOf(kok) === 0 ? tam.slice(kok.length) : tam;
  }

  window.aaSepet = { ekle: ekle, ac: ac };

  liste.addEventListener('click', function (e) {
    var b = e.target.closest('[data-is]');
    if (!b) return;
    var i = +b.closest('.sp-oge').getAttribute('data-i');
    var l = oku();
    var is = b.getAttribute('data-is');
    if (is === 'sil') l.splice(i, 1);
    else {
      l[i].adet = Math.max(1, Math.min(20, (l[i].adet || 1) + (+is)));
    }
    yaz(l);
  });
  tamamla.addEventListener('click', function () {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'whatsapp_siparis', konum: 'sepet', urunler: oku().map(function (x) { return x.kod; }).join(','), adet: toplam(oku()) });
  });
  [].forEach.call(d.querySelectorAll('.aa-sepet-ac'), function (b) { b.addEventListener('click', function () { ac(true); }); });
  panel.querySelector('.sp-kapat').addEventListener('click', function () { ac(false); });
  [].forEach.call(panel.querySelectorAll('.sp-devam'), function (b) { b.addEventListener('click', function () { ac(false); }); });
  perde.addEventListener('click', function () { ac(false); });

  var sh = d.getElementById('sh');
  var shForm = d.getElementById('sh-form');
  var shUyari = sh.querySelector('.sh-uyari');
  var aktif = null;
  var shAc = function (u) {
    aktif = u;
    d.getElementById('sh-ad').textContent = u.a;
    d.getElementById('sh-kod').textContent = u.k;
    d.getElementById('sh-renk-ad').textContent = u.r[0] ? u.r[0][0] : '';
    d.getElementById('sh-renkler').innerHTML = u.r.map(function (r, i) {
      return '<label class="ur-renk"><input type="radio" name="renk" value="' + esc(r[0]) + '"' + (i === 0 ? ' checked' : '') + '><i style="background:' + esc(r[1]) + '"></i><span>' + esc(r[0]) + '</span></label>';
    }).join('');
    d.getElementById('sh-bedenler').innerHTML = u.b.map(function (b) {
      return '<label class="ur-beden"><input type="radio" name="beden" value="' + esc(b) + '"><span>' + esc(b) + '</span></label>';
    }).join('') + '<label class="ur-beden ur-bilmiyorum"><input type="radio" name="beden" value="' + esc(T.bilmiyorum) + '"><span>' + esc(T.bilmiyorum) + '</span></label>';
    shUyari.hidden = true;
    sh.hidden = false;
    d.body.classList.add('aa-kilit');
  };
  var shKapat = function () { sh.hidden = true; d.body.classList.remove('aa-kilit'); };
  shForm.addEventListener('change', function (e) {
    if (e.target.name === 'renk') d.getElementById('sh-renk-ad').textContent = e.target.value;
    if (e.target.name === 'beden') shUyari.hidden = true;
  });
  shForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var r = shForm.querySelector('input[name="renk"]:checked');
    var b = shForm.querySelector('input[name="beden"]:checked');
    if (!b) { shUyari.hidden = false; return; }
    shKapat();
    ekle(aktif, r ? r.value : '', b.value);
  });
  sh.querySelector('.sh-kapat').addEventListener('click', shKapat);
  sh.addEventListener('click', function (e) { if (e.target === sh) shKapat(); });
  d.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!sh.hidden) shKapat();
    else if (panel.classList.contains('on')) ac(false);
  });
  d.addEventListener('click', function (e) {
    var b = e.target.closest('.kt-sepet');
    if (!b) return;
    e.preventDefault();
    shAc(JSON.parse(b.getAttribute('data-sepet')));
  });
  window.addEventListener('storage', function (e) { if (e.key === ANAHTAR) ciz(); });
  ciz();
})();
