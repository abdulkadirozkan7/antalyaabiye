const { kart, yol } = require('./katalog.js');

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
    blogBaslik: 'Abiye Rehberi',
    blogAlt: 'Model, beden ve renk seçimi için ipuçları',
    blogTumu: 'Tüm Yazılar',
    cokBaslik: 'Çok Satanlar',
    cokAlt: 'En çok tercih edilen abiye modelleri',
    sekmeYeni: 'Yeni Gelenler',
    sekmeFirsat: 'Fırsat Abiyeler',
    kesfet: 'Keşfet',
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
    baslik: 'Antalya Abiye | Evening Dresses For Engagements And Proms',
    aciklama: 'Antalya Abiye: hijab, princess, engagement and plus size evening dresses at our store on Güllük Street, Antalya. Ask about any style on WhatsApp.',
    ust: 'Güllük Street · Muratpaşa / Antalya',
    h1: 'Evening Dresses In Antalya For Engagements, Henna Nights And Proms',
    giris: 'Hijab, princess and plus size styles in one place. Ask about any dress on WhatsApp and we will help you pick your size.',
    btnModel: 'Browse Dresses',
    btnWp: 'Ask On WhatsApp',
    google: '{n} reviews on Google',
    magaza: 'Store on Güllük Street',
    takipci: '{n} followers on Instagram',
    blogBaslik: 'Evening Dress Guides',
    blogAlt: 'Tips on choosing style, size and colour',
    blogTumu: 'All Posts',
    cokBaslik: 'Bestsellers',
    cokAlt: 'Our most popular evening dresses',
    sekmeYeni: 'New Arrivals',
    sekmeFirsat: 'Special Offers',
    kesfet: 'Discover',
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
    blogBaslik: 'Советы По Выбору Платья',
    blogAlt: 'Подсказки по выбору фасона, размера и цвета',
    blogTumu: 'Все Статьи',
    cokBaslik: 'Хиты Продаж',
    cokAlt: 'Самые популярные вечерние платья',
    sekmeYeni: 'Новинки',
    sekmeFirsat: 'Выгодные Предложения',
    kesfet: 'Смотреть',
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


function isilti(t) {
  let s = (t + 3) * 7919;
  const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const renk = ['#f6c3dd', '#fdba74', '#c9b0f5', '#ffffff'];
  let o = '';
  for (let i = 0; i < 230; i++) {
    const kenar = r() < 0.5;
    const x = kenar ? Math.pow(r(), 1.6) * 520 : 1440 - Math.pow(r(), 1.6) * 520;
    const y = r() * 520;
    o += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(0.7 + r() * 1.9).toFixed(1)}" fill="${renk[i % 4]}" opacity="${(0.2 + r() * 0.65).toFixed(2)}"/>`;
  }
  for (let i = 0; i < 90; i++) {
    const x = 500 + r() * 440;
    const y = r() < 0.5 ? r() * 150 : 380 + r() * 140;
    o += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(0.6 + r() * 1.6).toFixed(1)}" fill="${renk[i % 4]}" opacity="${(0.2 + r() * 0.6).toFixed(2)}"/>`;
  }
  return o;
}

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
  const URUN = ctx.URUNLER || [];
  const yeniUrunler = URUN.filter(u => !u.kategoriler.includes('firsat')).slice().reverse().slice(0, 10);
  const firsatUrunler = URUN.filter(u => u.kategoriler.includes('firsat')).slice(0, 10);
  const cokUrunler = URUN.filter(u => u.cokSatan).slice(0, 12);
  const blogMod = require('./blog.js');
  const blogYazilar = (ctx.BLOG || []).filter(y => y[dil]).slice(0, 4);
  const cokKat = kat('cok-satanlar');
  const okSol = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
  const okSag = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';
  const it = i18n[dil].ig;
  const igUrl = A.instagram ? `https://www.instagram.com/${esc(A.instagram)}/` : '';
  const sesKapali = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/></svg>';
  const oynat = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><path d="M10 8.8v6.4l5.2-3.2z" fill="currentColor"/></svg>';
  const igKartlar = (site.instagramVideolar || []).map((v, i) => {
    const u = v.urun ? URUN.find(x => x.kod === v.urun) : null;
    const baslik = (v[dil] && v[dil].baslik) || (u ? u[dil].ad : '');
    const medya = v.video
      ? `<video class="ig-video" src="${esc(yol(dil, v.video))}"${v.kapak ? ` poster="${esc(yol(dil, v.kapak))}"` : ''} muted loop playsinline preload="none" aria-label="${esc(baslik || it.etiket)}"></video><button type="button" class="ig-ses" aria-label="${esc(it.sesAc)}" data-ac="${esc(it.sesAc)}" data-kapat="${esc(it.sesKapat)}">${sesKapali}</button>`
      : `<span class="ig-bos">${oynat}<small>${esc(it.bos)}</small></span>`;
    return `<li class="ig-kart">
    ${medya}
    <span class="ig-tur" aria-hidden="true">${oynat}</span>
    <div class="ig-alt">${baslik ? `<p>${esc(baslik)}</p>` : ''}${u ? `<a class="ig-urun" href="${href(dil, u[dil].slug)}">${IK.canta.replace('width="20" height="20"', 'width="16" height="16"')}<span>${esc(it.urune)}</span></a>` : ''}</div>
  </li>`;
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
      ? `<picture class="as-b-foto">${bn.gorselMobil ? `<source media="(max-width:700px)" srcset="${esc(yol(dil, bn.gorselMobil))}">` : ''}<img src="${esc(yol(dil, bn.gorsel))}" alt="${esc(B.baslik)}" width="1920" height="700"${i ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async"></picture>`
      : `<svg class="as-b-isilti" viewBox="0 0 1440 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${isilti(i)}</svg>`;
    const Hb = i === 0 ? 'h1' : 'h2';
    return `<a class="as-b-slayt${bn.gorsel ? ' as-b-gorselli' : ''}" href="${link}" aria-label="${esc(B.baslik)}">${gorsel}<span class="as-b-cerceve" aria-hidden="true"></span><span class="as-b-yazi"><small>${esc(B.ust)}</small><${Hb}>${esc(B.baslik)}</${Hb}><i class="as-b-cizgi" aria-hidden="true"></i>${B.alt ? `<span class="as-b-alt">${esc(B.alt)}</span>` : ''}<span class="as-b-btn">${esc(B.buton)}${ok}</span></span></a>`;
  }).join('')}</div>
  <button type="button" class="as-b-ok as-b-geri" aria-label="‹"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>
  <button type="button" class="as-b-ok as-b-ileri" aria-label="›"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button>
  <div class="as-b-alt-bar"><span class="as-b-sayac"><b id="as-b-no">01</b> / ${String((site.bannerlar || []).length).padStart(2, '0')}</span><div class="as-b-noktalar" id="as-b-noktalar">${(site.bannerlar || []).map((x, i) => `<button type="button"${i === 0 ? ' class="on"' : ''} aria-label="${i + 1}"></button>`).join('')}</div></div>
</section>

<section class="as-urunler">
  <div class="as-u-ust">
    <div class="as-sekmeler" role="tablist">
      <button type="button" role="tab" class="on" aria-selected="true" data-sekme="yeni">${esc(t.sekmeYeni)}</button>
      <button type="button" role="tab" aria-selected="false" data-sekme="firsat">${esc(t.sekmeFirsat)}</button>
    </div>
    <a class="as-link" id="as-u-tumu" data-yeni="${href(dil, yeni ? yeni[dil].slug : '')}" data-firsat="${href(dil, kat('firsat') ? kat('firsat')[dil].slug : '')}" href="${href(dil, yeni ? yeni[dil].slug : '')}">${esc(t.tumu)}${ok}</a>
  </div>
  <div class="as-u-kutu">
    <ul class="kt-liste as-u-ray" data-sekme="yeni">${yeniUrunler.map((u, i) => kart(ctx, dil, u, i)).join('')}</ul>
    <ul class="kt-liste as-u-ray" data-sekme="firsat" hidden>${firsatUrunler.map((u, i) => kart(ctx, dil, u, i)).join('')}</ul>
    <button type="button" class="as-u-ok as-u-geri" aria-label="‹"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>
    <button type="button" class="as-u-ok as-u-ileri" aria-label="›"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button>
  </div>
</section>

<section class="as-vitrin">${(site.vitrin || []).map((v, i) => {
    const k = kat(v.kategori);
    if (!k) return '';
    return `<a class="as-v as-v${i}${v.gorsel ? ' as-v-gorselli' : ''}" href="${href(dil, k[dil].slug)}">${v.gorsel ? `<img src="${esc(yol(dil, v.gorsel))}" alt="${esc(k[dil].ad)}" width="900" height="1100" loading="lazy" decoding="async">` : ''}<span><b>${esc(k[dil].ad)}</b><em>${esc(t.kesfet)}${ok}</em></span></a>`;
  }).join('')}</section>

${cokUrunler.length ? `<section class="as-urunler as-cok">
  <div class="as-u-ust">
    <div class="as-cok-bas"><span class="as-cok-ikon" aria-hidden="true">${yildiz.replace('width="15" height="15"', 'width="22" height="22"')}</span><div><h2>${esc(t.cokBaslik)}</h2><p>${esc(t.cokAlt)}</p></div></div>
    ${cokKat ? `<a class="as-link" href="${href(dil, cokKat[dil].slug)}">${esc(t.tumu)}${ok}</a>` : ''}
  </div>
  <div class="as-u-kutu">
    <ul class="kt-liste as-u-ray">${cokUrunler.map((u, i) => kart(ctx, dil, u, i)).join('')}</ul>
    <button type="button" class="as-u-ok as-u-geri" aria-label="‹">${okSol}</button>
    <button type="button" class="as-u-ok as-u-ileri" aria-label="›">${okSag}</button>
  </div>
</section>` : ''}

${igUrl ? `<section class="ig">
  <div class="ig-bas">
    <a class="ig-profil" href="${igUrl}" target="_blank" rel="noopener" data-olay="instagram_tikla" data-konum="ana_ig">
      <span class="ig-avatar"><img src="${ctx.kok(dil)}assets/img/logo.webp" width="480" height="409" alt="${esc(A.marka)}" loading="lazy"></span>
      <span class="ig-isim"><b>${esc(A.instagram)}</b><small>${esc(takipciYaz(A.instagramTakipci, dil))} ${esc(it.takipci)}</small></span>
    </a>
    <a class="ig-takip" href="${igUrl}" target="_blank" rel="noopener" data-olay="instagram_tikla" data-konum="ana_ig_takip">${IK.ig}<span>${esc(it.takip)}</span></a>
  </div>
  <p class="ig-etiket"><span>${esc(it.etiket)}</span></p>
  <ul class="ig-liste">${igKartlar}</ul>
</section>` : ''}

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

${blogYazilar.length ? `<section class="as-bolum as-blog">
  <div class="as-u-ust">
    <div><h2 class="as-blog-baslik">${esc(t.blogBaslik)}</h2><p class="as-blog-alt">${esc(t.blogAlt)}</p></div>
    <a class="as-link" href="${href(dil, S.blog[dil].slug)}">${esc(t.blogTumu)}${ok}</a>
  </div>
  <ul class="bl-liste as-blog-liste">${blogYazilar.map(y => blogMod.kart(ctx, dil, y).replace(/<(\/?)h2>/g, '<$1h3>')).join('')}</ul>
</section>` : ''}

<section class="as-bolum as-alt">
  <div class="as-seo">
    <h2>${esc(t.seoBaslik)}</h2>
    ${t.seo.map(p => `<p>${esc(p)}</p>`).join('')}
  </div>
</section>`;
  return {
    baslik: t.baslik,
    aciklama: t.aciklama,
    govde,
    js: ['anasayfa.js']
  };
};
module.exports.T = T;
