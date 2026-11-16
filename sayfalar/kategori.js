const { SOZ, ETIKET, BEDEN_SIRA, kart } = require('./katalog.js');

const T = {
  tr: {
    anasayfa: 'Ana Sayfa',
    urun: '{n} ürün',
    filtrele: 'Filtrele',
    temizle: 'Temizle',
    sonuclar: 'Sonuçları Göster',
    sirala: 'Sırala',
    stokta: 'Stoktakiler',
    sutun: 'Sütun',
    siralar: [['onerilen', 'Önerilen'], ['yeni', 'Yeni Eklenenler'], ['az', 'A\'dan Z\'ye']],
    kapat: 'Kapat',
    bosFiltre: 'Seçtiğin filtrelere uygun model yok. Filtreleri değiştir ya da aradığın modeli WhatsApp\'tan sor.',
    bosKategori: 'Bu kategoriye yakında yeni modeller eklenecek. Aradığın modeli WhatsApp\'tan sorabilirsin.',
    wp: 'WhatsApp\'tan Sor',
    baslik: '{ad} Modelleri | Antalya Abiye',
    aciklama: 'Antalya Abiye {ad} modelleri. Renk ve bedene göre filtrele, beğendiğin modeli WhatsApp\'tan sor.',
    seo: 'Antalya Abiye\'de {ad} modellerini renk, beden ve boya göre filtreleyerek inceleyebilirsin. Beğendiğin modelin ürün kodunu WhatsApp hattımıza yazman yeterli; Güllük Caddesi\'ndeki mağazamızda da deneyebilirsin.'
  },
  en: {
    anasayfa: 'Home',
    urun: '{n} items',
    filtrele: 'Filter',
    temizle: 'Clear',
    sonuclar: 'Show Results',
    sirala: 'Sort',
    stokta: 'In Stock',
    sutun: 'Columns',
    siralar: [['onerilen', 'Recommended'], ['yeni', 'Newest'], ['az', 'A To Z']],
    kapat: 'Close',
    bosFiltre: 'No dresses match these filters. Change the filters or ask us on WhatsApp.',
    bosKategori: 'New styles are coming to this category soon. Ask us on WhatsApp about the dress you are looking for.',
    wp: 'Ask On WhatsApp',
    baslik: '{ad} | Antalya Abiye',
    aciklama: '{ad} at Antalya Abiye. Filter by colour and size, then ask about any dress on WhatsApp.',
    seo: 'Browse {ad} at Antalya Abiye and filter by colour, size and length. Send the product code to our WhatsApp line, or try the dresses on at our store on Güllük Street.'
  },
  ru: {
    anasayfa: 'Главная',
    urun: '{n} товаров',
    filtrele: 'Фильтры',
    temizle: 'Сбросить',
    sonuclar: 'Показать',
    sirala: 'Сортировка',
    stokta: 'В Наличии',
    sutun: 'Колонки',
    siralar: [['onerilen', 'Рекомендуемые'], ['yeni', 'Новинки'], ['az', 'От А до Я']],
    kapat: 'Закрыть',
    bosFiltre: 'Нет моделей по выбранным фильтрам. Измените фильтры или спросите нас в WhatsApp.',
    bosKategori: 'Скоро в этой категории появятся новые модели. Спросите о нужном платье в WhatsApp.',
    wp: 'Спросить В WhatsApp',
    baslik: '{ad} | Antalya Abiye',
    aciklama: '{ad} в Antalya Abiye. Фильтр по цвету и размеру, вопросы о модели в WhatsApp.',
    seo: 'Смотрите {ad} в Antalya Abiye с фильтрами по цвету, размеру и длине. Отправьте код товара в WhatsApp или примерьте платье в нашем магазине на улице Гюллюк.'
  }
};

function grup(ad, anahtar, secenekler, acik) {
  if (!secenekler.length) return '';
  return `<details class="kt-grup"${acik ? ' open' : ''}><summary>${ad}<svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2.5 4.5L6 8l3.5-3.5"/></svg></summary><div class="kt-secenek kt-s-${anahtar}">${secenekler.join('')}</div></details>`;
}

module.exports = function (ctx, dil, kat, urunler) {
  const { esc, href, IK, wa, i18n } = ctx;
  const t = T[dil];
  const E = ETIKET[dil];
  const liste = kat.id === 'yeni' ? urunler.filter(u => !u.kategoriler.includes('firsat')).reverse() : urunler.filter(u => u.kategoriler.includes(kat.id));
  const say = (alan, deger) => liste.filter(u => Array.isArray(u[alan]) ? u[alan].includes(deger) : u[alan] === deger).length;
  const kutu = (alan, deger, ad, ek = '') => `<label><input type="checkbox" name="${alan}" value="${deger}">${ek}<span>${esc(ad)}</span><em>${say(alan, deger)}</em></label>`;
  const varOlan = (alan, sozluk) => Object.keys(sozluk).filter(k => say(alan, k));
  const renk = varOlan('renkler', SOZ.renk).map(r => kutu('renkler', r, SOZ.renk[r][dil], `<i style="background:${SOZ.renk[r].hex}"></i>`));
  const beden = BEDEN_SIRA.filter(b => say('bedenler', b)).map(b => `<label class="kt-beden"><input type="checkbox" name="bedenler" value="${b}"><span>${b}</span></label>`);
  const boy = varOlan('boy', SOZ.boy).map(x => kutu('boy', x, SOZ.boy[x][dil]));
  const kul = varOlan('kullanim', SOZ.kullanim).map(x => kutu('kullanim', x, SOZ.kullanim[x][dil]));
  const kesim = varOlan('kesim', SOZ.kesim).map(x => kutu('kesim', x, SOZ.kesim[x][dil]));
  const kol = varOlan('kol', SOZ.kol).map(x => kutu('kol', x, SOZ.kol[x][dil]));
  const filtre = [
    grup(E.renk, 'renk', renk, true),
    grup(E.beden, 'beden', beden, true),
    grup(E.boy, 'boy', boy, true),
    grup(E.kullanim, 'kullanim', kul, true),
    grup(E.kesim, 'kesim', kesim, false),
    grup(E.kol, 'kol', kol, false)
  ].join('');
  const ad = kat[dil].ad;
  const kartlar = liste.map((u, i) => kart(ctx, dil, u, i)).join('');
  const bosWp = `<a class="aa-wp-btn" href="${wa(i18n[dil].wpMesaj)}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="kategori_bos">${IK.wp}<span>${esc(t.wp)}</span></a>`;
  const govde = `
<section class="aa-sb kt-sb">
  <div class="aa-sb-ic">
    <nav class="aa-yol" aria-label="breadcrumb"><a href="./">${esc(t.anasayfa)}</a><span>/</span><span aria-current="page">${esc(ad)}</span></nav>
    <h1>${esc(ad)}</h1>
  </div>
</section>
<section class="kt" id="kt">
  ${liste.length ? `
  <aside class="kt-filtre" id="kt-filtre" aria-label="${esc(t.filtrele)}">
    <div class="kt-filtre-bas"><strong>${esc(t.filtrele)}</strong><button type="button" class="kt-temizle" hidden>${esc(t.temizle)}</button><button type="button" class="aa-ikon kt-kapat" aria-label="${esc(t.kapat)}">${IK.x}</button></div>
    <form class="kt-form" id="kt-form">${filtre}</form>
    <div class="kt-filtre-alt"><button type="button" class="as-btn kt-goster">${esc(t.sonuclar)}</button></div>
  </aside>
  <div class="kt-ana">
    <div class="kt-ust">
      <button type="button" class="kt-filtre-btn"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>${esc(t.filtrele)}<b class="kt-secili" hidden></b></button>
      <p class="kt-sayi" data-kalip="${esc(t.urun)}">${esc(t.urun.replace('{n}', liste.length))}</p>
      <div class="kt-sag">
        <div class="kt-sutun" role="group" aria-label="${esc(t.sutun)}"><button type="button" data-sutun="3">3</button><i></i><button type="button" data-sutun="4" class="on">4</button></div>
        <label class="kt-stok"><input type="checkbox" id="kt-stok"><span>${esc(t.stokta)}</span></label>
        <label class="kt-sirala"><span>${esc(t.sirala)}</span><select id="kt-sirala">${t.siralar.map(s => `<option value="${s[0]}">${esc(s[1])}</option>`).join('')}</select></label>
      </div>
    </div>
    <div class="kt-etiketler" id="kt-etiketler"></div>
    <ul class="kt-liste" id="kt-liste">${kartlar}</ul>
    <div class="kt-bos" id="kt-bos" hidden><p>${esc(t.bosFiltre)}</p>${bosWp}</div>
  </div>` : `<div class="kt-bos kt-bos-kat"><p>${esc(t.bosKategori)}</p>${bosWp}</div>`}
</section>
<section class="kt-seo"><p>${esc(t.seo.replace('{ad}', ad))}</p></section>
<div class="kt-perde" hidden></div>`;
  return {
    baslik: t.baslik.replace('{ad}', ad),
    aciklama: t.aciklama.replace('{ad}', ad),
    govde,
    js: liste.length ? ['kategori.js'] : []
  };
};
