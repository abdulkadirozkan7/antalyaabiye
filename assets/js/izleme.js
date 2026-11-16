(function () {
  var w = window;
  w.dataLayer = w.dataLayer || [];
  var HARITA = {
    urun_goruntule: { ga: 'view_item', fb: 'ViewContent', tt: 'ViewContent' },
    sepete_ekle: { ga: 'add_to_cart', fb: 'AddToCart', tt: 'AddToCart' },
    whatsapp_siparis: { ga: 'begin_checkout', fb: 'InitiateCheckout', tt: 'InitiateCheckout' },
    whatsapp_tikla: { ga: 'whatsapp_tikla', fb: 'Contact', tt: 'Contact' },
    telefon_tikla: { ga: 'telefon_tikla', fb: 'Contact', tt: 'Contact' },
    cark_cevir: { ga: 'generate_lead', fb: 'Lead', tt: 'SubmitForm' },
    favori_ekle: { ga: 'add_to_wishlist', fb: 'AddToWishlist', tt: 'AddToWishlist' },
    site_ici_arama: { ga: 'search', fb: 'Search', tt: 'Search' },
    instagram_tikla: { ga: 'instagram_tikla' },
    yol_tarifi: { ga: 'yol_tarifi', fb: 'FindLocation', tt: 'Contact' }
  };
  var gonder = function (o) {
    if (!o || typeof o !== 'object' || !o.event || !HARITA[o.event]) return;
    var h = HARITA[o.event];
    var urun = o.urun || o.urunler || '';
    var p = {};
    Object.keys(o).forEach(function (k) { if (k !== 'event') p[k] = o[k]; });
    try {
      if (w.gtag && h.ga) {
        var gp = { konum: o.konum || '' };
        if (urun) gp.items = String(urun).split(',').map(function (k) { return { item_id: k, item_name: o.ad || k, item_variant: o.renk || undefined, quantity: 1 }; });
        if (o.event === 'site_ici_arama') gp.search_term = o.arama;
        if (o.event === 'cark_cevir') gp.method = 'cark';
        w.gtag('event', h.ga, gp);
      }
      if (w.fbq && h.fb) {
        var fp = urun ? { content_ids: String(urun).split(','), content_type: 'product' } : {};
        if (o.ad) fp.content_name = o.ad;
        if (o.event === 'site_ici_arama') fp.search_string = o.arama;
        if (h.fb === 'FindLocation') w.fbq('track', 'FindLocation'); else w.fbq('track', h.fb, fp);
      }
      if (w.ttq && h.tt) {
        var tp = urun ? { contents: String(urun).split(',').map(function (k) { return { content_id: k, content_type: 'product', content_name: o.ad || k }; }) } : {};
        if (o.event === 'site_ici_arama') tp.query = o.arama;
        w.ttq.track(h.tt, tp);
      }
    } catch (e) {}
  };
  w.dataLayer.forEach(gonder);
  var eski = w.dataLayer.push;
  w.dataLayer.push = function () {
    var s = eski.apply(w.dataLayer, arguments);
    for (var i = 0; i < arguments.length; i++) gonder(arguments[i]);
    return s;
  };
})();
