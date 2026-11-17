const SOZ = {
  renk: require('./guvenlik.js').renkler(require('../data/renkler.json').renkler),
  boy: {
    kisa: { tr: 'Kısa', en: 'Short', ru: 'Короткое' },
    midi: { tr: 'Midi', en: 'Midi', ru: 'Миди' },
    uzun: { tr: 'Uzun', en: 'Long', ru: 'Длинное' }
  },
  kesim: {
    prenses: { tr: 'Prenses', en: 'Princess', ru: 'Принцесса' },
    balik: { tr: 'Balık', en: 'Mermaid', ru: 'Русалка' },
    'a-kesim': { tr: 'A Kesim', en: 'A-Line', ru: 'А-силуэт' },
    duz: { tr: 'Düz Kesim', en: 'Straight', ru: 'Прямой' }
  },
  kol: {
    kolsuz: { tr: 'Kolsuz', en: 'Sleeveless', ru: 'Без рукавов' },
    askili: { tr: 'Askılı', en: 'Strappy', ru: 'На бретелях' },
    'tek-omuz': { tr: 'Tek Omuz', en: 'One Shoulder', ru: 'На одно плечо' },
    'kisa-kol': { tr: 'Kısa Kol', en: 'Short Sleeve', ru: 'Короткий рукав' },
    'uzun-kol': { tr: 'Uzun Kol', en: 'Long Sleeve', ru: 'Длинный рукав' }
  },
  kullanim: {
    nisan: { tr: 'Nişan', en: 'Engagement', ru: 'Помолвка' },
    kina: { tr: 'Kına', en: 'Henna Night', ru: 'Ночь хны' },
    dugun: { tr: 'Düğün', en: 'Wedding', ru: 'Свадьба' },
    soz: { tr: 'Söz', en: 'Promise Ceremony', ru: 'Сватовство' },
    mezuniyet: { tr: 'Mezuniyet', en: 'Prom', ru: 'Выпускной' },
    davet: { tr: 'Davet', en: 'Special Occasion', ru: 'Торжество' }
  }
};

const ETIKET = {
  tr: { renk: 'Renk', beden: 'Beden', boy: 'Boy', kesim: 'Kesim', kol: 'Kol', kullanim: 'Kullanım Alanı', urunKodu: 'Ürün Kodu', firsat: 'Fırsat Ürünü', yeni: 'Yeni Ürün', cokSatan: 'Çok Satan', sepet: 'Sepete Ekle', ornek: 'Örnek Ürün', favori: 'Favorilere ekle', foto: 'Fotoğraf' },
  en: { renk: 'Colour', beden: 'Size', boy: 'Length', kesim: 'Silhouette', kol: 'Sleeve', kullanim: 'Occasion', urunKodu: 'Product Code', firsat: 'Special Offer', yeni: 'New In', cokSatan: 'Bestseller', sepet: 'Add To Bag', ornek: 'Sample Item', favori: 'Add to favourites', foto: 'Photo' },
  ru: { renk: 'Цвет', beden: 'Размер', boy: 'Длина', kesim: 'Силуэт', kol: 'Рукав', kullanim: 'Повод', urunKodu: 'Код Товара', firsat: 'Выгодно', yeni: 'Новинка', cokSatan: 'Хит Продаж', sepet: 'В Корзину', ornek: 'Пример', favori: 'В избранное', foto: 'Фото' }
};

const BEDEN_SIRA = ['34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56'];

const ASKI = '<svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M32 20a5 5 0 1 1 5-5"/><path d="M32 20v5L8 43a3 3 0 0 0 1.8 5.4h44.4A3 3 0 0 0 56 43L32 25"/></svg>';

function fotoYer(dil, n) {
  return `<span class="kt-foto-bos">${ASKI}<small>${ETIKET[dil].foto} ${n}/5</small></span>`;
}

const yol = (dil, p) => !p ? '' : /^(https?:)?\/\//.test(p) ? p : (dil === 'tr' ? '' : '../') + p;

function urunFotolari(u) {
  const genel = (u.fotograflar || []).filter(Boolean);
  if (genel.length) return genel;
  const rf = u.renkFotolari || {};
  for (const r of u.renkler) if (rf[r] && rf[r].filter(Boolean).length) return rf[r].filter(Boolean);
  return [];
}

function sepetVeri(dil, u, href) {
  return JSON.stringify({ k: u.kod, a: u[dil].ad, u: href(dil, u[dil].slug), r: u.renkler.map(r => [SOZ.renk[r][dil], SOZ.renk[r].hex]), b: u.bedenler, f: urunFotolari(u)[0] || '' });
}

function kart(ctx, dil, u, i) {
  const { esc, href } = ctx;
  const E = ETIKET[dil];
  const renkler = u.renkler.map(r => `<i style="background:${SOZ.renk[r].hex}" title="${esc(SOZ.renk[r][dil])}"></i>`).join('');
  const fl = urunFotolari(u);
  const foto = fl[0]
    ? `<img src="${esc(yol(dil, fl[0]))}" alt="${esc(u[dil].ad)}" width="600" height="900" loading="lazy" decoding="async">${fl[1] ? `<img class="kt-ikinci" src="${esc(yol(dil, fl[1]))}" alt="" width="600" height="900" loading="lazy" decoding="async">` : ''}`
    : fotoYer(dil, 1);
  return `<li class="kt-kart" data-renk="${u.renkler.join(' ')}" data-beden="${u.bedenler.join(' ')}" data-boy="${u.boy}" data-kesim="${u.kesim}" data-kol="${u.kol}" data-kullanim="${u.kullanim.join(' ')}" data-stok="${u.stok === false ? 0 : 1}" data-sira="${i}">
  <a class="kt-gorsel" href="${href(dil, u[dil].slug)}">${foto}
    ${u.renkler.length > 1 ? `<span class="kt-renk-say" title="${esc(u.renkler.map(r => SOZ.renk[r][dil]).join(', '))}"><i aria-hidden="true"></i>${u.renkler.length}</span>` : ''}<span class="kt-rozetler">${u.kategoriler.includes('firsat') ? `<b class="kt-rozet kt-r-firsat">${esc(E.firsat)}</b>` : u.cokSatan ? `<b class="kt-rozet kt-r-cok">${esc(E.cokSatan)}</b>` : u.yeni ? `<b class="kt-rozet kt-r-yeni">${esc(E.yeni)}</b>` : ''}</span>
  </a>
  <button type="button" class="kt-fav" data-fav="${esc(u.kod)}" aria-label="${esc(E.favori)}" aria-pressed="false"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 20.2s-7.4-4.4-7.4-10.1A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.4 2.5c0 5.7-7.4 10.1-7.4 10.1z"/></svg></button>
  <div class="kt-bilgi">
    <a href="${href(dil, u[dil].slug)}"><h3>${esc(u[dil].ad)}</h3></a>
    <p class="kt-kod">${esc(u.kod)}</p>
    <div class="kt-alt"><span class="kt-renkler">${renkler}</span><span class="kt-bedenler">${esc(u.bedenler[0])}–${esc(u.bedenler[u.bedenler.length - 1])}</span></div>
    <button type="button" class="kt-sepet" data-sepet="${esc(sepetVeri(dil, u, href))}"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 8h13l-1 12.5h-11z"/><path d="M9 10.5V7a3 3 0 0 1 6 0v3.5"/></svg><span>${esc(E.sepet)}</span></button>
  </div>
</li>`;
}

module.exports = { SOZ, ETIKET, BEDEN_SIRA, ASKI, fotoYer, kart, sepetVeri, yol, urunFotolari };
