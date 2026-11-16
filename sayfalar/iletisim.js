const T = {
  tr: {
    baslik: 'İletişim | Antalya Abiye Mağazası Güllük Caddesi',
    aciklama: 'Antalya Abiye mağazası Güllük Caddesi No:4, Muratpaşa. Adres, çalışma saatleri, telefon ve WhatsApp sipariş hattı.',
    anasayfa: 'Ana Sayfa',
    h1: 'İletişim',
    giris: 'Mağazamıza gel, modelleri üzerinde dene ya da WhatsApp\'tan yaz, beğendiğin abiyeyi birlikte seçelim.',
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
    giris: 'Visit our store to try the dresses on, or message us on WhatsApp and we will help you choose.',
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
    giris: 'Приходите в наш магазин примерить платья или напишите нам в WhatsApp, и мы поможем с выбором.',
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
  <div class="il-kartlar">
    <a class="il-kart il-wp" href="${wa(i18nWp(ctx, dil))}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="iletisim_kart">
      <i>${IK.wp}</i>
      <small>${esc(t.wpBaslik)}</small>
      <strong>${esc(telGoster(A.whatsapp))}</strong>
      <span>${esc(t.wpAlt)}</span>
      <em>${esc(t.wpBtn)} →</em>
    </a>
    <a class="il-kart" href="${telHref(A.telefon)}" data-olay="telefon_tikla" data-konum="iletisim_kart">
      <i>${IK.tel}</i>
      <small>${esc(t.telBaslik)}</small>
      <strong>${esc(telGoster(A.telefon))}</strong>
      <span>${esc(t.telAlt)}</span>
      <em>${esc(t.telBtn)} →</em>
    </a>
    <a class="il-kart" href="${esc(A.harita)}" target="_blank" rel="noopener" data-olay="yol_tarifi" data-konum="iletisim_kart">
      <i>${IK.konum}</i>
      <small>${esc(t.adresBaslik)}</small>
      <strong class="il-adres">${esc(A.adres)}</strong>
      <em>${esc(t.adresBtn)} →</em>
    </a>
    <a class="il-kart" href="${esc(A.google)}" target="_blank" rel="noopener">
      <i class="il-yildiz">${yildiz}</i>
      <small>${esc(t.googleBaslik)}</small>
      <strong>${esc(A.googlePuan)} <span class="il-yildizlar">${yildiz.repeat(5)}</span></strong>
      <span>${esc(t.googleAlt.replace('{n}', A.googleYorum))}</span>
      <em>${esc(t.googleBtn)} →</em>
    </a>
  </div>
  <div class="il-izgara">
    <div class="il-harita">
      <iframe src="${esc(A.haritaEmbed)}" title="${esc(t.haritaBaslik)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
    <div class="il-yan">
      <div class="il-saat" id="il-saat" data-saatler='${JSON.stringify(A.saatler)}' data-acik="${esc(t.acik)}" data-kapali="${esc(t.kapali)}" data-bugun="${esc(t.bugun)}">
        <div class="il-saat-bas"><h2>${esc(t.saatBaslik)}</h2><span class="il-durum" hidden></span></div>
        <ul>${saatler}</ul>
      </div>
      <div class="il-takip">
        <h2>${esc(t.takip)}</h2>
        <div>
          ${igLink ? `<a href="${igLink}" target="_blank" rel="noopener">${IK.ig}<span>@${esc(A.instagram)}</span></a>` : ''}
          ${fbLink ? `<a href="${fbLink}" target="_blank" rel="noopener">${IK.fb}<span>/${esc(A.facebook)}</span></a>` : ''}
        </div>
      </div>
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
