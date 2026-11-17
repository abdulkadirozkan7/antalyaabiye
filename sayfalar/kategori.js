const { SOZ, ETIKET, BEDEN_SIRA, kart } = require('./katalog.js');

const T = {
  tr: {
    anasayfa: 'Ana Sayfa',
    urun: '{n} Ürün',
    filtreleme: 'Filtreleme',
    siralama: 'Sıralama',
    hizli: 'Hızlı filtreler',
    uzunKol: 'Uzun Kollu',
    renkAbiye: '{r} Abiyeler',
    boyAbiye: { uzun: 'Uzun Abiyeler', kisa: 'Kısa Abiyeler', midi: 'Midi Abiyeler' },
    bedenGrup: '{b} Beden',
    veUstu: '{b} Ve Üstü',
    filtrele: 'Filtrele',
    temizle: 'Temizle',
    sonuclar: 'Filtreleri Uygula',
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
    urun: '{n} Items',
    filtreleme: 'Filters',
    siralama: 'Sort',
    hizli: 'Quick filters',
    uzunKol: 'Long Sleeve',
    renkAbiye: '{r} Dresses',
    boyAbiye: { uzun: 'Long Dresses', kisa: 'Short Dresses', midi: 'Midi Dresses' },
    bedenGrup: 'Size {b}',
    veUstu: '{b} And Up',
    filtrele: 'Filter',
    temizle: 'Clear',
    sonuclar: 'Apply Filters',
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
    urun: '{n} Товаров',
    filtreleme: 'Фильтры',
    siralama: 'Сортировка',
    hizli: 'Быстрые фильтры',
    uzunKol: 'С Длинным Рукавом',
    renkAbiye: '{r}',
    boyAbiye: { uzun: 'Длинные Платья', kisa: 'Короткие Платья', midi: 'Платья Миди' },
    bedenGrup: 'Размер {b}',
    veUstu: '{b} И Больше',
    filtrele: 'Фильтры',
    temizle: 'Сбросить',
    sonuclar: 'Применить',
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
  return `<details class="kt-grup"${acik ? ' open' : ''}><summary>${ad}<i class="kt-arti" aria-hidden="true"></i></summary><div class="kt-secenek kt-s-${anahtar}">${secenekler.join('')}</div></details>`;
}

module.exports = function (ctx, dil, kat, urunler) {
  const { esc, href, IK, wa, i18n } = ctx;
  const t = T[dil];
  const E = ETIKET[dil];
  const liste = kat.id === 'cok-satanlar' ? urunler.filter(u => u.cokSatan) : kat.id === 'yeni' ? urunler.filter(u => !u.kategoriler.includes('firsat')).reverse() : urunler.filter(u => u.kategoriler.includes(kat.id));
  const say = (alan, deger) => liste.filter(u => Array.isArray(u[alan]) ? u[alan].includes(deger) : u[alan] === deger).length;
  const kutu = (alan, deger, ad, ek = '') => `<label><input type="checkbox" name="${alan}" value="${deger}">${ek}<span>${esc(ad)}</span><em>${say(alan, deger)}</em></label>`;
  const varOlan = (alan, sozluk) => Object.keys(sozluk).filter(k => say(alan, k));
  const renk = varOlan('renkler', SOZ.renk).map(r => `<label class="kt-renk"><input type="checkbox" name="renkler" value="${r}"><i style="background:${SOZ.renk[r].hex}"></i><span>${esc(SOZ.renk[r][dil])}</span></label>`);
  const beden = BEDEN_SIRA.filter(b => say('bedenler', b)).map(b => `<label class="kt-beden"><input type="checkbox" name="bedenler" value="${b}"><span>${b}</span></label>`);
  const boy = varOlan('boy', SOZ.boy).map(x => kutu('boy', x, SOZ.boy[x][dil]));
  const kul = varOlan('kullanim', SOZ.kullanim).map(x => kutu('kullanim', x, SOZ.kullanim[x][dil]));
  const kesim = varOlan('kesim', SOZ.kesim).map(x => kutu('kesim', x, SOZ.kesim[x][dil]));
  const kol = varOlan('kol', SOZ.kol).map(x => kutu('kol', x, SOZ.kol[x][dil]));
  const filtreEski = [
    grup(E.renk, 'renk', renk, true),
    grup(E.beden, 'beden', beden, true),
    grup(E.boy, 'boy', boy, true),
    grup(E.kullanim, 'kullanim', kul, true),
    grup(E.kesim, 'kesim', kesim, false),
    grup(E.kol, 'kol', kol, false)
  ].join('');
  const ad = kat[dil].ad;
  const rehberY = (ctx.BLOG || []).find(y => y.kategori === kat.id && y[dil]);
  const rehber = rehberY ? `<p class="kt-rehber">${esc({ tr: 'Rehber', en: 'Guide', ru: 'Статья' }[dil])}: <a href="${ctx.href(dil, rehberY[dil].slug)}">${esc(rehberY[dil].h1)}</a></p>` : '';
  const kartlar = liste.map((u, i) => kart(ctx, dil, u, i)).join('');
  const bosWp = `<a class="aa-wp-btn" href="${wa(i18n[dil].wpMesaj)}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="kategori_bos">${IK.wp}<span>${esc(t.wp)}</span></a>`;
  const filtreIk = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/></svg>';
  const siraIk = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4v16M4 8l4-4 4 4M16 20V4M12 16l4 4 4-4"/></svg>';
  const izgara = n => `<svg viewBox="0 0 ${n * 7 - 2} 12" width="${n * 7 - 2}" height="12" aria-hidden="true">${Array.from({ length: n * 2 }, (_, k) => `<rect x="${(k % n) * 7}" y="${Math.floor(k / n) * 7}" width="5" height="5"/>`).join('')}</svg>`;
  const hizli = [];
  if (say('kol', 'uzun-kol')) hizli.push(['kol', 'uzun-kol', t.uzunKol]);
  Object.keys(t.boyAbiye).filter(b => say('boy', b) && say('boy', b) < liste.length).forEach(b => hizli.push(['boy', b, t.boyAbiye[b]]));
  varOlan('renkler', SOZ.renk).sort((a, b) => say('renkler', b) - say('renkler', a)).slice(0, 6).forEach(r => hizli.push(['renkler', r, t.renkAbiye.replace('{r}', SOZ.renk[r][dil])]));
  const mevcutBeden = BEDEN_SIRA.filter(b => say('bedenler', b));
  const bedenGrup = [['36', '38'], ['40', '42'], ['44', '46'], ['48', '50', '52', '54', '56']]
    .map(g => g.filter(b => mevcutBeden.includes(b)))
    .filter(g => g.length)
    .map(g => [g, g.length > 2 ? t.veUstu.replace('{b}', g[0]) : t.bedenGrup.replace('{b}', g.join('–'))]);
  const sirala = `<select id="kt-sirala" aria-label="${esc(t.sirala)}">${t.siralar.map(x => `<option value="${x[0]}">${esc(x[1])}</option>`).join('')}</select>`;
  const govde = `
<section class="aa-sb kt-sb">
  <div class="aa-sb-ic">
    <nav class="aa-yol" aria-label="breadcrumb"><a href="./">${esc(t.anasayfa)}</a><span>/</span><span aria-current="page">${esc(ad)}</span></nav>
    <div class="kt-baslik"><h1>${esc(ad)}</h1>${liste.length ? `<p class="kt-sayi" data-kalip="${esc(t.urun)}">${esc(t.urun.replace('{n}', liste.length))}</p>` : ''}</div>
  </div>
</section>
${liste.length && (hizli.length || bedenGrup.length > 1) ? `<div class="kt-hizli" aria-label="${esc(t.hizli)}">
  ${hizli.length ? `<div class="kt-hizli-ray">${hizli.map(([a, v, e]) => `<button type="button" data-ad="${a}" data-deger="${v}">${esc(e)}</button>`).join('')}</div>` : ''}
  ${bedenGrup.length > 1 ? `<div class="kt-hizli-beden">${bedenGrup.map(([g, e]) => `<button type="button" data-bedenler="${g.join(' ')}">${esc(e)}</button>`).join('')}</div>` : ''}
</div>` : ''}
<section class="kt" id="kt">
  ${liste.length ? `
  <aside class="kt-filtre" id="kt-filtre" aria-label="${esc(t.filtrele)}">
    <div class="kt-filtre-bas"><button type="button" class="aa-ikon kt-kapat" aria-label="${esc(t.kapat)}">${IK.x}</button><strong>${esc(t.filtreleme)}</strong><button type="button" class="kt-temizle" hidden>${esc(t.temizle)}</button></div>
    <form class="kt-form" id="kt-form">
      <label class="kt-stok"><input type="checkbox" id="kt-stok"><span>${esc(t.stokta)}</span></label>
      ${[grup(E.beden, 'beden', beden, true), grup(E.renk, 'renk', renk, true), grup(E.boy, 'boy', boy, true), grup(E.kullanim, 'kullanim', kul, true), grup(E.kesim, 'kesim', kesim, false), grup(E.kol, 'kol', kol, false)].join('')}
    </form>
    <div class="kt-filtre-alt"><button type="button" class="as-btn kt-goster">${esc(t.sonuclar)}</button></div>
  </aside>
  <div class="kt-ana">
    <div class="kt-ust">
      <p class="kt-sayi kt-sayi-ust" data-kalip="${esc(t.urun)}">${esc(t.urun.replace('{n}', liste.length))}</p>
      <button type="button" class="kt-filtre-btn">${filtreIk}<span>${esc(t.filtreleme)}</span><b class="kt-secili" hidden></b></button>
      <label class="kt-sirala">${siraIk}<span>${esc(t.siralama)}</span>${sirala}</label>
      <button type="button" class="kt-sirala-btn" aria-controls="kt-sp">${siraIk}<span>${esc(t.siralama)}</span></button>
      <div class="kt-sutun" role="group" aria-label="${esc(t.sutun)}"><button type="button" data-sutun="3" aria-label="3">${izgara(3)}</button><button type="button" data-sutun="4" class="on" aria-label="4">${izgara(4)}</button></div>
    </div>
    <div class="kt-etiketler" id="kt-etiketler"></div>
    <ul class="kt-liste" id="kt-liste">${kartlar}</ul>
    <div class="kt-bos" id="kt-bos" hidden><p>${esc(t.bosFiltre)}</p>${bosWp}</div>
  </div>` : `<div class="kt-bos kt-bos-kat"><p>${esc(t.bosKategori)}</p>${bosWp}</div>`}
</section>
<section class="kt-seo"><p>${esc(t.seo.replace('{ad}', ad))}</p>${rehber}</section>
${liste.length ? `<aside class="kt-sp" id="kt-sp" aria-label="${esc(t.siralama)}" aria-hidden="true">
  <div class="kt-filtre-bas"><button type="button" class="aa-ikon kt-sp-kapat" aria-label="${esc(t.kapat)}">${IK.x}</button><strong>${esc(t.siralama)}</strong></div>
  <p class="kt-sp-secili" id="kt-sp-secili">${esc(t.siralar[0][1])}</p>
  <ul class="kt-sp-liste">${t.siralar.map((x, i) => `<li><button type="button" data-sira="${x[0]}"${i === 0 ? ' class="on" aria-pressed="true"' : ' aria-pressed="false"'}>${esc(x[1])}<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></button></li>`).join('')}</ul>
</aside>` : ''}
<div class="kt-perde" hidden></div>`;
  return {
    baslik: t.baslik.replace('{ad}', ad),
    aciklama: t.aciklama.replace('{ad}', ad),
    govde,
    gorsel: kat.gorsel || ((liste.find(u => (u.fotograflar || []).filter(Boolean).length) || {}).fotograflar || []).filter(Boolean)[0] || '',
    js: liste.length ? ['kategori.js'] : []
  };
};
