const SOZ = {
  renk: {
    siyah: { hex: '#141414', tr: 'Siyah', en: 'Black', ru: 'Чёрный' },
    gumus: { hex: '#c9ccd3', tr: 'Gümüş', en: 'Silver', ru: 'Серебристый' },
    bordo: { hex: '#7a1131', tr: 'Bordo', en: 'Burgundy', ru: 'Бордовый' },
    kirmizi: { hex: '#c8102e', tr: 'Kırmızı', en: 'Red', ru: 'Красный' },
    pembe: { hex: '#f2a1c0', tr: 'Pembe', en: 'Pink', ru: 'Розовый' },
    pudra: { hex: '#ecc6c4', tr: 'Pudra', en: 'Powder Pink', ru: 'Пудровый' },
    lila: { hex: '#b9a3e3', tr: 'Lila', en: 'Lilac', ru: 'Сиреневый' },
    murdum: { hex: '#5b2245', tr: 'Mürdüm', en: 'Plum', ru: 'Сливовый' },
    lacivert: { hex: '#1c2551', tr: 'Lacivert', en: 'Navy', ru: 'Тёмно-синий' },
    zumrut: { hex: '#0f6b55', tr: 'Zümrüt Yeşili', en: 'Emerald', ru: 'Изумрудный' },
    bej: { hex: '#dcc8ad', tr: 'Bej', en: 'Beige', ru: 'Бежевый' }
  },
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
  tr: { renk: 'Renk', beden: 'Beden', boy: 'Boy', kesim: 'Kesim', kol: 'Kol', kullanim: 'Kullanım Alanı', urunKodu: 'Ürün Kodu', firsat: 'Fırsat', ornek: 'Örnek Ürün', favori: 'Favorilere ekle', foto: 'Fotoğraf' },
  en: { renk: 'Colour', beden: 'Size', boy: 'Length', kesim: 'Silhouette', kol: 'Sleeve', kullanim: 'Occasion', urunKodu: 'Product Code', firsat: 'Offer', ornek: 'Sample Item', favori: 'Add to favourites', foto: 'Photo' },
  ru: { renk: 'Цвет', beden: 'Размер', boy: 'Длина', kesim: 'Силуэт', kol: 'Рукав', kullanim: 'Повод', urunKodu: 'Код Товара', firsat: 'Скидка', ornek: 'Пример', favori: 'В избранное', foto: 'Фото' }
};

const BEDEN_SIRA = ['34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56'];

const ASKI = '<svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M32 20a5 5 0 1 1 5-5"/><path d="M32 20v5L8 43a3 3 0 0 0 1.8 5.4h44.4A3 3 0 0 0 56 43L32 25"/></svg>';

function fotoYer(dil, n) {
  return `<span class="kt-foto-bos">${ASKI}<small>${ETIKET[dil].foto} ${n}/5</small></span>`;
}

function kart(ctx, dil, u, i) {
  const { esc, href } = ctx;
  const E = ETIKET[dil];
  const renkler = u.renkler.map(r => `<i style="background:${SOZ.renk[r].hex}" title="${esc(SOZ.renk[r][dil])}"></i>`).join('');
  const foto = u.fotograflar[0]
    ? `<img src="${esc(u.fotograflar[0])}" alt="${esc(u[dil].ad)}" loading="lazy">${u.fotograflar[1] ? `<img class="kt-ikinci" src="${esc(u.fotograflar[1])}" alt="" loading="lazy">` : ''}`
    : fotoYer(dil, 1);
  return `<li class="kt-kart" data-renk="${u.renkler.join(' ')}" data-beden="${u.bedenler.join(' ')}" data-boy="${u.boy}" data-kesim="${u.kesim}" data-kol="${u.kol}" data-kullanim="${u.kullanim.join(' ')}" data-sira="${i}">
  <a class="kt-gorsel" href="${href(dil, u[dil].slug)}">${foto}
    <span class="kt-rozetler">${u.kategoriler.includes('firsat') ? `<b class="kt-rozet kt-r-firsat">${esc(E.firsat)}</b>` : ''}${u.ornek ? `<b class="kt-rozet kt-r-ornek">${esc(E.ornek)}</b>` : ''}</span>
  </a>
  <button type="button" class="kt-fav" data-fav="${esc(u.kod)}" aria-label="${esc(E.favori)}" aria-pressed="false"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 20.2s-7.4-4.4-7.4-10.1A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.4 2.5c0 5.7-7.4 10.1-7.4 10.1z"/></svg></button>
  <div class="kt-bilgi">
    <a href="${href(dil, u[dil].slug)}"><h3>${esc(u[dil].ad)}</h3></a>
    <p class="kt-kod">${esc(u.kod)}</p>
    <div class="kt-alt"><span class="kt-renkler">${renkler}</span><span class="kt-bedenler">${esc(u.bedenler[0])}–${esc(u.bedenler[u.bedenler.length - 1])}</span></div>
  </div>
</li>`;
}

module.exports = { SOZ, ETIKET, BEDEN_SIRA, ASKI, fotoYer, kart };
