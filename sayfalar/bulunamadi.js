module.exports = function (ctx) {
  const { esc, href, site, IK, wa, i18n } = ctx;
  const kat = id => site.kategoriler.find(k => k.id === id);
  const ok = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const linkler = ['yeni', 'tesettur', 'prenses', 'nisan', 'kina', 'mezuniyet', 'buyuk-beden', 'firsat'].map(kat).filter(Boolean).map(k => `<li><a href="${href('tr', k.tr.slug)}">${esc(k.tr.ad)}</a></li>`).join('');
  const govde = `
<section class="yb">
  <p class="yb-kod" aria-hidden="true">404</p>
  <h1>Aradığın sayfa bulunamadı</h1>
  <p class="yb-metin">Sayfa taşınmış ya da kaldırılmış olabilir. Abiye modellerine aşağıdan göz atabilir ya da aradığın modeli WhatsApp'tan sorabilirsin.</p>
  <p class="yb-dil" lang="en">Page not found · <span lang="ru">Страница не найдена</span></p>
  <form class="yb-ara" action="${href('tr', site.sayfalar.arama.tr.slug)}" method="get" role="search">
    ${IK.ara}<input name="q" type="search" placeholder="${esc(i18n.tr.araPh)}" aria-label="${esc(i18n.tr.ara)}"><button type="submit">${esc(i18n.tr.araBtn)}</button>
  </form>
  <div class="yb-btnler">
    <a class="as-btn" href="./">Ana Sayfaya Dön${ok}</a>
    <a class="aa-wp-btn" href="${wa(i18n.tr.wpMesaj)}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="404">${IK.wp}<span>WhatsApp'tan Sor</span></a>
  </div>
  <ul class="yb-linkler">${linkler}</ul>
</section>`;
  return { baslik: 'Sayfa Bulunamadı | Antalya Abiye', aciklama: 'Aradığın sayfa bulunamadı.', govde, robots: 'noindex' };
};
