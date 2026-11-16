(function () {
  var d = document;
  var $ = function (s, k) { return (k || d).querySelector(s); };
  var $$ = function (s, k) { return Array.prototype.slice.call((k || d).querySelectorAll(s)); };

  var header = $('#aa-header');
  var kaydi = function () { header.classList.toggle('aa-kaydi', window.scrollY > 40); };
  kaydi();
  window.addEventListener('scroll', kaydi, { passive: true });

  var dilAc = $('.aa-dil-ac');
  d.addEventListener('click', function (e) { if (dilAc && dilAc.open && !dilAc.contains(e.target)) dilAc.open = false; });

  var varLi = $('.aa-var');
  var acBtn = $('.aa-acilir-btn');
  if (acBtn) {
    acBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var a = varLi.classList.toggle('aa-acik');
      acBtn.setAttribute('aria-expanded', a);
    });
    d.addEventListener('click', function (e) {
      if (!varLi.contains(e.target)) { varLi.classList.remove('aa-acik'); acBtn.setAttribute('aria-expanded', false); }
    });
  }

  var ara = $('#aa-ara');
  var araAc = function (ac) {
    ara.hidden = !ac;
    $$('.aa-ara-btn').forEach(function (b) { b.setAttribute('aria-expanded', ac); });
    if (ac) $('#aa-q').focus();
  };
  $$('.aa-ara-btn').forEach(function (b) { b.addEventListener('click', function () { araAc(true); }); });
  $('.aa-ara-kapat').addEventListener('click', function () { araAc(false); });
  ara.addEventListener('submit', function (e) { if (!$('#aa-q').value.trim()) e.preventDefault(); });

  var cekmece = $('#aa-cekmece');
  var perde = $('.aa-perde');
  var menuBtn = $('.aa-menu-btn');
  var cekmeceAc = function (ac) {
    if (ac) perde.hidden = false;
    requestAnimationFrame(function () {
      cekmece.classList.toggle('on', ac);
      perde.classList.toggle('on', ac);
    });
    cekmece.setAttribute('aria-hidden', !ac);
    menuBtn.setAttribute('aria-expanded', ac);
    d.body.classList.toggle('aa-kilit', ac);
    if (!ac) setTimeout(function () { perde.hidden = true; }, 300);
  };
  menuBtn.addEventListener('click', function () { cekmeceAc(true); });
  $('.aa-c-kapat').addEventListener('click', function () { cekmeceAc(false); });
  perde.addEventListener('click', function () { cekmeceAc(false); });
  $('.aa-kat-btn').addEventListener('click', function () {
    cekmeceAc(true);
    var b = $('.aa-c-btn');
    if (b) b.setAttribute('aria-expanded', true);
  });
  $$('.aa-c-btn').forEach(function (b) {
    b.addEventListener('click', function () { b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') !== 'true'); });
  });

  d.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!ara.hidden) araAc(false);
    if (cekmece.classList.contains('on')) cekmeceAc(false);
    if (varLi) varLi.classList.remove('aa-acik');
  });

  var favOku = function () {
    try { return JSON.parse(localStorage.getItem('aa_fav') || '[]'); } catch (e) { return []; }
  };
  var favYaz = function () {
    var n = favOku().length;
    $$('.aa-fav-say').forEach(function (b) { b.textContent = n; b.hidden = !n; });
  };
  favYaz();
  var favBtnYaz = function () {
    var f = favOku();
    $$('[data-fav]').forEach(function (b) {
      var on = f.indexOf(b.getAttribute('data-fav')) > -1;
      b.setAttribute('aria-pressed', on);
      b.classList.toggle('on', on);
      var s = b.querySelector('span');
      if (s && b.getAttribute('data-ekle')) s.textContent = b.getAttribute(on ? 'data-favli' : 'data-ekle');
    });
  };
  favBtnYaz();
  d.addEventListener('click', function (e) {
    var b = e.target.closest('[data-fav]');
    if (!b) return;
    e.preventDefault();
    var f = favOku(), k = b.getAttribute('data-fav'), i = f.indexOf(k);
    if (i > -1) f.splice(i, 1); else { f.push(k); window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'favori_ekle', urun: k }); }
    try { localStorage.setItem('aa_fav', JSON.stringify(f)); } catch (x) {}
    favYaz(); favBtnYaz();
  });
  window.addEventListener('storage', favYaz);
  d.addEventListener('aa:fav', favYaz);

  window.dataLayer = window.dataLayer || [];
  d.addEventListener('click', function (e) {
    var el = e.target.closest('[data-olay]');
    if (!el) return;
    window.dataLayer.push({ event: el.getAttribute('data-olay'), konum: el.getAttribute('data-konum') || '', dil: d.documentElement.lang, sayfa: location.pathname });
  });
})();
