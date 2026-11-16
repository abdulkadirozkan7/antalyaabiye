const { elbise } = require('./elbise.js');

const T = {
  tr: {
    baslik: 'Antalya Abiye | Nişan, Kına, Mezuniyet Ve Tesettür Abiye Modelleri',
    aciklama: 'Antalya Abiye: Güllük Caddesi\'ndeki mağazamızda tesettür, prenses, nişan ve büyük beden abiye modelleri. Beğendiğin modeli WhatsApp\'tan sor.',
    ust: 'Güllük Caddesi · Muratpaşa / Antalya',
    h1: 'Antalya\'da Abiye: Nişan, Kına Ve Mezuniyet Modelleri',
    giris: 'Tesettür, prenses ve büyük beden seçenekleri bir arada. Beğendiğin modeli WhatsApp\'tan sor, bedenini birlikte seçelim.',
    btnModel: 'Modelleri İncele',
    btnWp: 'WhatsApp\'tan Sor',
    google: 'Google\'da {n} yorum',
    magaza: 'Güllük Caddesi\'nde mağaza',
    takipci: 'Instagram\'da {n} takipçi',
    katBaslik: 'Ne İçin Arıyorsun?',
    katAlt: 'Davetine göre seç, gerisini birlikte netleştirelim.',
    tumu: 'Tüm Modeller',
    adimBaslik: 'Sipariş Nasıl Verilir?',
    adimlar: [
      ['Modeli Seç', 'Kategorilerden beğendiğin abiyeyi bul, ürün kodunu not al.'],
      ['WhatsApp\'tan Yaz', 'Ürün kodu, beden ve rengi yaz; stok ve detayları hemen iletelim.'],
      ['Birlikte Netleştirelim', 'Mağazamıza gelip deneyebilir ya da teslimatı bizimle konuşabilirsin.']
    ],
    bedenBaslik: 'Bedenini Bilmiyor Musun?',
    bedenMetin: 'Göğüs, bel ve kalça ölçünü gir, sana uygun bedeni hemen gör.',
    bedenBtn: 'Beden Tablosuna Git',
    magazaBaslik: 'Güllük Caddesi\'ndeki Mağazamız',
    magazaMetin: 'Modelleri üzerinde denemek için mağazamıza bekleriz.',
    bugun: 'Bugün',
    kapali: 'Kapalı',
    yolTarifi: 'Yol Tarifi Al',
    ara: 'Mağazayı Ara',
    haritaBaslik: 'Antalya Abiye mağaza konumu',
    seoBaslik: 'Antalya Abiye Mağazası',
    seo: [
      'Antalya Abiye, Muratpaşa Güllük Caddesi\'nde nişan, kına, mezuniyet ve davetler için abiye modelleri sunan bir mağaza. Tesettür abiye, prenses abiye, nişan abiyesi ve büyük beden seçenekleri aynı yerde.',
      'Sitedeki modelleri inceleyip ürün kodunu WhatsApp hattımıza yazman yeterli. Beden konusunda emin değilsen beden tablosundan ölçülerini girip önerimizi görebilir ya da mağazamıza gelip deneyebilirsin.'
    ],
    sssBaslik: 'Sık Sorulan Sorular',
    sss: [
      ['Nasıl sipariş verebilirim?', 'Beğendiğin modelin ürün kodunu, bedenini ve rengini WhatsApp hattımıza yaz. Stok ve detay bilgisini sana hemen iletelim.'],
      ['Fiyatları neden sitede göremiyorum?', 'Fiyat ve kampanya bilgilerini güncel olarak WhatsApp\'tan paylaşıyoruz. Ürün kodunu yazman yeterli.'],
      ['Bedenimi nasıl seçerim?', 'Beden tablosu sayfasında ölçülerini girersen sana uygun bedeni gösteririz. Emin olamazsan ölçülerini WhatsApp\'tan gönder.'],
      ['Tesettür ve büyük beden modeliniz var mı?', 'Evet, tesettür abiye ve büyük beden abiye modellerimiz var. Kategorilerden inceleyebilir ya da WhatsApp\'tan sorabilirsin.'],
      ['Mağazanız nerede, kaçta açık?', '{adres}. Çalışma saatlerimiz: {saat}.']
    ]
  },
  en: {
    baslik: 'Antalya Abiye | Evening Dresses For Engagements, Henna Nights And Proms',
    aciklama: 'Antalya Abiye: hijab, princess, engagement and plus size evening dresses at our store on Güllük Street, Antalya. Ask about any style on WhatsApp.',
    ust: 'Güllük Street · Muratpaşa / Antalya',
    h1: 'Evening Dresses In Antalya For Engagements, Henna Nights And Proms',
    giris: 'Hijab, princess and plus size styles in one place. Ask about any dress on WhatsApp and we will help you pick your size.',
    btnModel: 'Browse Dresses',
    btnWp: 'Ask On WhatsApp',
    google: '{n} reviews on Google',
    magaza: 'Store on Güllük Street',
    takipci: '{n} followers on Instagram',
    katBaslik: 'What Is The Occasion?',
    katAlt: 'Choose by occasion and we will sort out the details together.',
    tumu: 'All Dresses',
    adimBaslik: 'How To Order',
    adimlar: [
      ['Pick A Dress', 'Find the dress you like and note its product code.'],
      ['Message Us On WhatsApp', 'Send the product code, size and colour; we will reply with stock and details.'],
      ['We Finalise Together', 'Try it on at our store or talk to us about delivery.']
    ],
    bedenBaslik: 'Not Sure About Your Size?',
    bedenMetin: 'Enter your bust, waist and hip measurements to see the size that fits you.',
    bedenBtn: 'Open The Size Guide',
    magazaBaslik: 'Our Store On Güllük Street',
    magazaMetin: 'Come and try the dresses on at our store.',
    bugun: 'Today',
    kapali: 'Closed',
    yolTarifi: 'Get Directions',
    ara: 'Call The Store',
    haritaBaslik: 'Antalya Abiye store location',
    seoBaslik: 'Antalya Abiye Store',
    seo: [
      'Antalya Abiye is an evening dress store on Güllük Street in Muratpaşa, Antalya, with dresses for engagements, henna nights, proms and special occasions. Hijab, princess, engagement and plus size styles are all in one place.',
      'Browse the dresses on the site and send the product code to our WhatsApp line. If you are not sure about your size, enter your measurements in the size guide or visit our store to try them on.'
    ],
    sssBaslik: 'Frequently Asked Questions',
    sss: [
      ['How do I order?', 'Send the product code, size and colour of the dress you like to our WhatsApp line. We will reply with stock and details.'],
      ['Why are prices not shown on the site?', 'We share current prices and offers on WhatsApp. Just send us the product code.'],
      ['How do I choose my size?', 'Enter your measurements on the size guide page and we will suggest your size. Not sure? Send them to us on WhatsApp.'],
      ['Do you have hijab and plus size dresses?', 'Yes, we have hijab and plus size evening dresses. Browse the categories or ask us on WhatsApp.'],
      ['Where is your store and when is it open?', '{adres}. Opening hours: {saat}.']
    ]
  },
  ru: {
    baslik: 'Antalya Abiye | Вечерние Платья На Помолвку, Ночь Хны И Выпускной',
    aciklama: 'Antalya Abiye: закрытые платья, платья принцессы, платья на помолвку и большие размеры в нашем магазине на улице Гюллюк в Анталье. Спросите о модели в WhatsApp.',
    ust: 'Улица Гюллюк · Муратпаша / Анталья',
    h1: 'Вечерние Платья В Анталье На Помолвку, Ночь Хны И Выпускной',
    giris: 'Закрытые модели, платья принцессы и большие размеры в одном месте. Спросите о модели в WhatsApp, и мы поможем подобрать размер.',
    btnModel: 'Смотреть Модели',
    btnWp: 'Спросить В WhatsApp',
    google: '{n} отзывов в Google',
    magaza: 'Магазин на улице Гюллюк',
    takipci: '{n} подписчиков в Instagram',
    katBaslik: 'Для Какого Повода?',
    katAlt: 'Выберите по поводу, детали уточним вместе.',
    tumu: 'Все Модели',
    adimBaslik: 'Как Заказать',
    adimlar: [
      ['Выберите Модель', 'Найдите понравившееся платье и запишите код товара.'],
      ['Напишите В WhatsApp', 'Укажите код товара, размер и цвет; мы сразу ответим о наличии.'],
      ['Уточним Вместе', 'Примерьте в магазине или обсудите с нами доставку.']
    ],
    bedenBaslik: 'Не Знаете Свой Размер?',
    bedenMetin: 'Введите обхват груди, талии и бёдер и узнайте подходящий размер.',
    bedenBtn: 'Таблица Размеров',
    magazaBaslik: 'Наш Магазин На Улице Гюллюк',
    magazaMetin: 'Приходите примерить платья в нашем магазине.',
    bugun: 'Сегодня',
    kapali: 'Закрыто',
    yolTarifi: 'Проложить Маршрут',
    ara: 'Позвонить В Магазин',
    haritaBaslik: 'Расположение магазина Antalya Abiye',
    seoBaslik: 'Магазин Antalya Abiye',
    seo: [
      'Antalya Abiye — магазин вечерних платьев на улице Гюллюк в районе Муратпаша, Анталья. Платья на помолвку, ночь хны, выпускной и торжества: закрытые модели, платья принцессы и большие размеры в одном месте.',
      'Выберите модель на сайте и отправьте код товара в наш WhatsApp. Если сомневаетесь в размере, введите мерки в таблице размеров или приходите на примерку в магазин.'
    ],
    sssBaslik: 'Частые Вопросы',
    sss: [
      ['Как сделать заказ?', 'Отправьте код товара, размер и цвет понравившегося платья в наш WhatsApp. Мы сразу ответим о наличии и деталях.'],
      ['Почему на сайте нет цен?', 'Актуальные цены и акции мы сообщаем в WhatsApp. Просто отправьте код товара.'],
      ['Как выбрать размер?', 'Введите мерки на странице таблицы размеров, и мы подскажем размер. Сомневаетесь? Отправьте мерки в WhatsApp.'],
      ['Есть ли закрытые модели и большие размеры?', 'Да, у нас есть закрытые вечерние платья и модели больших размеров. Смотрите категории или спросите в WhatsApp.'],
      ['Где находится магазин и когда он открыт?', '{adres}. Часы работы: {saat}.']
    ]
  }
};

const KATEGORI = [
  ['tesettur', 'tesettur', 'bordo'],
  ['prenses', 'prenses', 'pembe'],
  ['nisan', 'nisan', 'mor'],
  ['kina', 'kina', 'turuncu'],
  ['mezuniyet', 'mezuniyet', 'gece'],
  ['buyuk-beden', 'buyuk-beden', 'lila'],
  ['uzun', 'uzun', 'zumrut'],
  ['firsat', 'firsat', 'altin']
];

function takipciYaz(n, dil) {
  const bin = (Math.floor(n / 100) / 10).toLocaleString(dil === 'en' ? 'en-US' : dil === 'ru' ? 'ru-RU' : 'tr-TR');
  return dil === 'en' ? bin + 'K+' : dil === 'ru' ? bin + ' тыс.+' : bin + ' bin+';
}

module.exports = function (ctx, dil) {
  const { esc, href, site, A, IK, wa, telGoster, telHref, saatOzet, GUN, i18n } = ctx;
  const t = T[dil];
  const S = site.sayfalar;
  const kat = id => site.kategoriler.find(k => k.id === id);
  const yeni = kat('yeni');
  const yildiz = '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/></svg>';
  const ok = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const kartlar = KATEGORI.map(([id, model, renk], i) => {
    const k = kat(id);
    if (!k) return '';
    return `<li><a class="as-kat" href="${href(dil, k[dil].slug)}"><span class="as-kemer">${elbise(model, renk, `k${i}`)}</span><span class="as-kat-ad">${esc(k[dil].ad)}</span></a></li>`;
  }).join('');
  const adimlar = t.adimlar.map((a, i) => `<li><b>${i + 1}</b><h3>${esc(a[0])}</h3><p>${esc(a[1])}</p></li>`).join('');
  const sssMetin = s => s.replace('{adres}', A.adres).replace('{saat}', saatOzet(dil));
  const sss = t.sss.map((q, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q[0])}${IK.ok}</summary><p>${esc(sssMetin(q[1]))}</p></details>`).join('');
  const sssSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.sss.map(q => ({ '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: sssMetin(q[1]) } }))
  };
  const govde = `
<section class="as-banner" id="as-banner" aria-roledescription="carousel">
  <div class="as-b-ray" id="as-b-ray">${(site.bannerlar || []).map((bn, i) => {
    const k = kat(bn.kategori);
    const link = k ? href(dil, k[dil].slug) : './';
    const B = bn[dil];
    const gorsel = bn.gorsel
      ? `<picture class="as-b-foto">${bn.gorselMobil ? `<source media="(max-width:700px)" srcset="${esc(bn.gorselMobil)}">` : ''}<img src="${esc(bn.gorsel)}" alt="${esc(B.baslik)}"${i ? ' loading="lazy"' : ''}></picture>`
      : '';
    const Hb = i === 0 ? 'h1' : 'h2';
    return `<a class="as-b-slayt as-b-${esc(bn.palet || 'pembe')}${bn.gorsel ? ' as-b-gorselli' : ''}" href="${link}" aria-label="${esc(B.baslik)}">${gorsel}<span class="as-b-yazi"><small>${esc(B.ust)}</small><${Hb}>${esc(B.baslik)}</${Hb}><span class="as-btn">${esc(B.buton)}${ok}</span></span></a>`;
  }).join('')}</div>
  <button type="button" class="as-b-ok as-b-geri" aria-label="‹"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>
  <button type="button" class="as-b-ok as-b-ileri" aria-label="›"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button>
  <div class="as-b-noktalar" id="as-b-noktalar">${(site.bannerlar || []).map((x, i) => `<button type="button"${i === 0 ? ' class="on"' : ''} aria-label="${i + 1}"></button>`).join('')}</div>
</section>

<section class="as-bolum">
  <div class="as-baslik">
    <div><h2>${esc(t.katBaslik)}</h2><p>${esc(t.katAlt)}</p></div>
    <a class="as-link" href="${href(dil, yeni ? yeni[dil].slug : '')}">${esc(t.tumu)}${ok}</a>
  </div>
  <ul class="as-kategoriler">${kartlar}</ul>
</section>

<section class="as-bolum as-adim-bolum">
  <h2>${esc(t.adimBaslik)}</h2>
  <ol class="as-adimlar">${adimlar}</ol>
  <a class="aa-wp-btn as-btn-wp" href="${wa(i18n[dil].wpMesaj)}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="ana_adimlar">${IK.wp}<span>${esc(i18n[dil].wpSiparis)} · ${esc(telGoster(A.whatsapp))}</span></a>
</section>

<section class="as-bolum">
  <a class="as-beden" href="${href(dil, S.beden[dil].slug)}">
    <svg class="as-beden-ikon" viewBox="0 0 120 120" aria-hidden="true"><path d="M30 104 C40 80 46 62 48 50 C44 40 42 32 44 22 L76 22 C78 32 76 40 72 50 C74 62 80 80 90 104 Z" fill="#fbe9f1"/><ellipse cx="60" cy="30" rx="18" ry="4" fill="none" stroke="#d52878" stroke-width="2"/><ellipse cx="60" cy="50" rx="13" ry="3" fill="none" stroke="#d52878" stroke-width="2"/><ellipse cx="60" cy="70" rx="20" ry="4" fill="none" stroke="#d52878" stroke-width="2"/></svg>
    <div><h2>${esc(t.bedenBaslik)}</h2><p>${esc(t.bedenMetin)}</p></div>
    <span class="as-btn">${esc(t.bedenBtn)}${ok}</span>
  </a>
</section>

<section class="as-bolum as-magaza">
  <div class="as-magaza-yazi">
    <h2>${esc(t.magazaBaslik)}</h2>
    <p>${esc(t.magazaMetin)}</p>
    <p class="as-adres">${IK.konum}<span>${esc(A.adres)}</span></p>
    <p class="as-saat" id="as-saat" data-saatler='${JSON.stringify(A.saatler)}' data-bugun="${esc(t.bugun)}" data-kapali="${esc(t.kapali)}">${IK.saat}<span>${esc(saatOzet(dil))}</span></p>
    <p class="as-puan"><a href="${esc(A.google)}" target="_blank" rel="noopener"><span class="as-yildiz">${yildiz.repeat(5)}</span><b>${esc(A.googlePuan)}</b> · ${esc(t.google.replace('{n}', A.googleYorum))}</a></p>
    <div class="as-btnler">
      <a class="as-btn" href="${esc(A.harita)}" target="_blank" rel="noopener" data-olay="yol_tarifi" data-konum="ana_magaza">${esc(t.yolTarifi)}${ok}</a>
      <a class="as-btn as-btn-acik" href="${telHref(A.telefon)}" data-olay="telefon_tikla" data-konum="ana_magaza">${IK.tel}<span>${esc(telGoster(A.telefon))}</span></a>
    </div>
  </div>
  <div class="as-harita"><iframe src="${esc(A.haritaEmbed)}" title="${esc(t.haritaBaslik)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
</section>

<section class="as-bolum as-alt">
  <div class="as-seo">
    <h2>${esc(t.seoBaslik)}</h2>
    ${t.seo.map(p => `<p>${esc(p)}</p>`).join('')}
  </div>
  <div class="as-sss">
    <h2>${esc(t.sssBaslik)}</h2>
    ${sss}
  </div>
</section>`;
  return {
    baslik: t.baslik,
    aciklama: t.aciklama,
    govde,
    ek: `<script type="application/ld+json">${JSON.stringify(sssSchema)}</script>`,
    js: ['anasayfa.js']
  };
};
