const T = {
  tr: {
    baslik: 'İletişim | Antalya Abiye Mağazası Güllük Caddesi',
    aciklama: 'Antalya Abiye mağazası Güllük Caddesi No:4, Muratpaşa. Adres, çalışma saatleri, telefon ve WhatsApp sipariş hattı.',
    anasayfa: 'Ana Sayfa',
    h1: 'İletişim',
    giris: 'Güllük Caddesi\'ndeki mağazamızda modelleri deneyebilir ya da WhatsApp\'tan sorabilirsin.',
    wpBaslik: 'WhatsApp Sipariş Hattı',
    wpAlt: 'En hızlı yanıt buradan',
    wpBtn: 'WhatsApp\'tan Yaz',
    telBaslik: 'Mağaza Telefonu',
    telAlt: 'Çalışma saatlerinde',
    telBtn: 'Hemen Ara',
    adresBaslik: 'Mağaza Adresi',
    adresBtn: 'Yol Tarifi Al',
    saatBaslik: 'Çalışma Saatleri',
    acik: 'Şu an açık',
    kapali: 'Şu an kapalı',
    bugun: 'Bugün',
    googleBaslik: 'Google Yorumları',
    googleAlt: '{n} yorum',
    googleBtn: 'Yorumları Gör',
    takip: 'Bizi Takip Et',
    formBaslik: 'Bize Yaz',
    formAlt: 'Mesajın WhatsApp\'ta hazır açılır, sadece gönder\'e basman yeter.',
    ad: 'Adın',
    adPh: 'Adın soyadın',
    konu: 'Konu',
    konular: ['Bir model hakkında', 'Beden danışma', 'Mağaza ziyareti', 'Diğer'],
    mesaj: 'Mesajın',
    mesajPh: 'Örn. Ürün kodu AA-120, 40 beden bordo rengi var mı?',
    gonder: 'WhatsApp\'ta Gönder',
    sablon: 'Merhaba, ben {ad}.\nKonu: {konu}\n{mesaj}',
    haritaBaslik: 'Antalya Abiye mağaza konumu'
  },
  en: {
    baslik: 'Contact | Antalya Abiye Evening Dress Store',
    aciklama: 'Antalya Abiye store at Güllük Street No:4, Muratpaşa, Antalya. Address, opening hours, phone and WhatsApp order line.',
    anasayfa: 'Home',
    h1: 'Contact',
    giris: 'Try the dresses on at our store on Güllük Street, or ask us on WhatsApp.',
    wpBaslik: 'WhatsApp Order Line',
    wpAlt: 'The fastest way to reach us',
    wpBtn: 'Message On WhatsApp',
    telBaslik: 'Store Phone',
    telAlt: 'During opening hours',
    telBtn: 'Call Now',
    adresBaslik: 'Store Address',
    adresBtn: 'Get Directions',
    saatBaslik: 'Opening Hours',
    acik: 'Open now',
    kapali: 'Closed now',
    bugun: 'Today',
    googleBaslik: 'Google Reviews',
    googleAlt: '{n} reviews',
    googleBtn: 'Read Reviews',
    takip: 'Follow Us',
    formBaslik: 'Write To Us',
    formAlt: 'Your message opens ready in WhatsApp, just tap send.',
    ad: 'Your Name',
    adPh: 'Full name',
    konu: 'Topic',
    konular: ['About a dress', 'Size advice', 'Visiting the store', 'Other'],
    mesaj: 'Your Message',
    mesajPh: 'E.g. Is product code AA-120 available in size 40, burgundy?',
    gonder: 'Send On WhatsApp',
    sablon: 'Hello, my name is {ad}.\nTopic: {konu}\n{mesaj}',
    haritaBaslik: 'Antalya Abiye store location'
  },
  ru: {
    baslik: 'Контакты | Магазин Вечерних Платьев Antalya Abiye',
    aciklama: 'Магазин Antalya Abiye: улица Гюллюк, 4, Муратпаша, Анталья. Адрес, часы работы, телефон и заказы через WhatsApp.',
    anasayfa: 'Главная',
    h1: 'Контакты',
    giris: 'Примерьте платья в нашем магазине на улице Гюллюк или спросите нас в WhatsApp.',
    wpBaslik: 'Заказы Через WhatsApp',
    wpAlt: 'Самый быстрый ответ',
    wpBtn: 'Написать В WhatsApp',
    telBaslik: 'Телефон Магазина',
    telAlt: 'В часы работы',
    telBtn: 'Позвонить',
    adresBaslik: 'Адрес Магазина',
    adresBtn: 'Проложить Маршрут',
    saatBaslik: 'Часы Работы',
    acik: 'Сейчас открыто',
    kapali: 'Сейчас закрыто',
    bugun: 'Сегодня',
    googleBaslik: 'Отзывы В Google',
    googleAlt: '{n} отзывов',
    googleBtn: 'Читать Отзывы',
    takip: 'Мы В Соцсетях',
    formBaslik: 'Напишите Нам',
    formAlt: 'Сообщение откроется в WhatsApp готовым, останется нажать «отправить».',
    ad: 'Ваше Имя',
    adPh: 'Имя и фамилия',
    konu: 'Тема',
    konular: ['О модели', 'Подбор размера', 'Визит в магазин', 'Другое'],
    mesaj: 'Сообщение',
    mesajPh: 'Например: есть ли модель AA-120 в 40 размере, бордовый цвет?',
    gonder: 'Отправить В WhatsApp',
    sablon: 'Здравствуйте, меня зовут {ad}.\nТема: {konu}\n{mesaj}',
    haritaBaslik: 'Расположение магазина Antalya Abiye'
  }
};

module.exports = function (ctx, dil) {
  const { esc, A, IK, wa, telGoster, telHref, GUN, kok } = ctx;
  const t = T[dil];
  const saatler = A.saatler.map((r, i) => `<li data-gun="${i}"><span>${esc(GUN[dil][i])}</span><b>${r[0] ? esc(r[0] + ' – ' + r[1]) : '—'}</b></li>`).join('');
  const igLink = A.instagram ? `https://www.instagram.com/${esc(A.instagram)}/` : '';
  const fbLink = A.facebook ? `https://www.facebook.com/${esc(A.facebook)}` : '';
  const yildiz = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/></svg>';
  const gunIng = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: A.marka,
    image: (A.alanadi ? 'https://' + A.alanadi + '/' : '') + 'assets/img/logo.png',
    telephone: '+' + String(A.telefon).replace(/\D/g, ''),
    address: { '@type': 'PostalAddress', streetAddress: A.sokak, addressLocality: A.ilce, addressRegion: A.sehir, postalCode: A.postaKodu, addressCountry: 'TR' },
    openingHoursSpecification: A.saatler.map((r, i) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: gunIng[i], opens: r[0], closes: r[1] })),
    geo: A.enlem ? { '@type': 'GeoCoordinates', latitude: A.enlem, longitude: A.boylam } : undefined,
    hasMap: A.harita,
    sameAs: [igLink, fbLink].filter(Boolean)
  };
  const govde = `
<section class="aa-sb">
  <div class="aa-sb-ic">
    <nav class="aa-yol" aria-label="breadcrumb"><a href="./">${esc(t.anasayfa)}</a><span>/</span><span aria-current="page">${esc(t.h1)}</span></nav>
    <h1>${esc(t.h1)}</h1>
    <p>${esc(t.giris)}</p>
  </div>
</section>
<section class="il">
  <div class="il-izgara">
    <div class="il-bilgi">
      <ul class="il-liste">
        <li><small>${esc(t.wpBaslik)}</small><a class="il-deger" href="${wa(i18nWp(ctx, dil))}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="iletisim">${esc(telGoster(A.whatsapp))}</a><a class="il-git il-git-wp" href="${wa(i18nWp(ctx, dil))}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="iletisim_buton">${IK.wp}<span>${esc(t.wpBtn)}</span></a></li>
        <li><small>${esc(t.telBaslik)}</small><a class="il-deger" href="${telHref(A.telefon)}" data-olay="telefon_tikla" data-konum="iletisim">${esc(telGoster(A.telefon))}</a><a class="il-git" href="${telHref(A.telefon)}" data-olay="telefon_tikla" data-konum="iletisim_buton">${esc(t.telBtn)}</a></li>
        <li><small>${esc(t.adresBaslik)}</small><span class="il-deger il-adres">${esc(A.adres)}</span><a class="il-git" href="${esc(A.harita)}" target="_blank" rel="noopener" data-olay="yol_tarifi" data-konum="iletisim">${esc(t.adresBtn)}</a></li>
        <li><small>${esc(t.googleBaslik)}</small><span class="il-deger">${esc(A.googlePuan)} <span class="il-yildizlar">${yildiz.repeat(5)}</span> <em>${esc(t.googleAlt.replace('{n}', A.googleYorum))}</em></span><a class="il-git" href="${esc(A.google)}" target="_blank" rel="noopener">${esc(t.googleBtn)}</a></li>
        ${igLink ? `<li><small>Instagram</small><a class="il-deger" href="${igLink}" target="_blank" rel="noopener">@${esc(A.instagram)}</a></li>` : ''}
        ${fbLink ? `<li><small>Facebook</small><a class="il-deger" href="${fbLink}" target="_blank" rel="noopener">facebook.com/${esc(A.facebook)}</a></li>` : ''}
      </ul>
      <div class="il-saat" id="il-saat" data-saatler='${JSON.stringify(A.saatler)}' data-acik="${esc(t.acik)}" data-kapali="${esc(t.kapali)}" data-bugun="${esc(t.bugun)}">
        <div class="il-saat-bas"><h2>${esc(t.saatBaslik)}</h2><span class="il-durum" hidden></span></div>
        <ul>${saatler}</ul>
      </div>
    </div>
    <div class="il-harita">
      <iframe src="${esc(A.haritaEmbed)}" title="${esc(t.haritaBaslik)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
  </div>
</section>`;
  return {
    baslik: t.baslik,
    aciklama: t.aciklama,
    govde,
    ek: `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
    js: ['iletisim.js']
  };
};

function i18nWp(ctx, dil) {
  return ctx.i18n[dil].wpMesaj;
}
