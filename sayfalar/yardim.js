const { kart, SOZ } = require('./katalog.js');

const ORTAK = {
  tr: { anasayfa: 'Ana Sayfa', wp: 'WhatsApp\'tan Yaz' },
  en: { anasayfa: 'Home', wp: 'Message On WhatsApp' },
  ru: { anasayfa: 'Главная', wp: 'Написать В WhatsApp' }
};

function ust(ctx, dil, ad, h1, alt) {
  const { esc } = ctx;
  return `<section class="aa-sb">
  <div class="aa-sb-ic">
    <nav class="aa-yol" aria-label="breadcrumb"><a href="./">${esc(ORTAK[dil].anasayfa)}</a><span>/</span><span aria-current="page">${esc(ad)}</span></nav>
    <h1>${esc(h1)}</h1>${alt ? `\n    <p class="bl-giris">${esc(alt)}</p>` : ''}
  </div>
</section>`;
}

function link(ctx, dil, s) {
  const { esc, href, site } = ctx;
  return esc(s).replace(/\[([^\]]+)\]\((kat|sayfa):([^)]+)\)/g, (m, metin, tur, id) => {
    const o = tur === 'kat' ? site.kategoriler.find(x => x.id === id) : site.sayfalar[id];
    return o ? `<a href="${href(dil, o[dil].slug)}">${metin}</a>` : metin;
  });
}

const SSS_EK = {
  tr: [
    ['Mağazada deneme yapabilir miyim?', 'Evet. Güllük Caddesi\'ndeki mağazamızda tüm modelleri deneyebilirsin. Gelmeden önce WhatsApp\'tan ürün kodunu yazarsan elbiseyi hazırlarız.'],
    ['Ödeme nasıl yapılıyor?', 'Mağazada ödeme yapabilirsin. Kapıda ödeme ve taksit seçeneklerini sipariş sırasında WhatsApp\'tan bildiriyoruz.'],
    ['Çarktan kazandığım indirim kodunu nasıl kullanırım?', 'Siparişini WhatsApp\'tan verirken kodu mesajına yazman yeterli. Her telefon numarası çarkı bir kez çevirebilir.']
  ],
  en: [
    ['Can I try dresses on in the store?', 'Yes. You can try every dress at our store on Güllük Street. Send us the product code on WhatsApp before you come and we will have it ready.'],
    ['How do I pay?', 'You can pay in the store. For delivery orders we share the payment options on WhatsApp.'],
    ['How do I use the discount code from the wheel?', 'Write the code in your WhatsApp message when you place your order. Each phone number can spin the wheel once.']
  ],
  ru: [
    ['Можно ли примерить платье в магазине?', 'Да. Все модели можно примерить в нашем магазине на улице Гюллюк. Напишите код товара в WhatsApp перед визитом, и мы подготовим платье.'],
    ['Как оплатить заказ?', 'Оплатить можно в магазине. Варианты оплаты при доставке мы сообщаем в WhatsApp.'],
    ['Как использовать код скидки с колеса?', 'Укажите код в сообщении WhatsApp при заказе. Каждый номер телефона может крутить колесо один раз.']
  ]
};

function sss(ctx, dil) {
  const { esc, A, saatOzet, site, IK } = ctx;
  const AT = require('./anasayfa.js').T[dil];
  const ad = site.sayfalar.sss[dil].ad;
  const metin = s => s.replace('{adres}', A.adres).replace('{saat}', saatOzet(dil));
  const liste = AT.sss.concat(SSS_EK[dil]).map(q => [q[0], metin(q[1])]);
  const govde = `${ust(ctx, dil, ad, ad)}
<section class="yz yd-sss">
  ${liste.map((q, i) => `<details${i === 0 ? ' open' : ''}><summary><h2>${esc(q[0])}</h2>${IK.ok}</summary><p>${esc(q[1])}</p></details>`).join('')}
</section>`;
  const sema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: liste.map(q => ({ '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1] } })) };
  const B = { tr: 'Sık Sorulan Sorular | Antalya Abiye', en: 'Frequently Asked Questions | Antalya Abiye', ru: 'Частые Вопросы | Antalya Abiye' };
  const D = {
    tr: 'Antalya Abiye sık sorulan sorular: sipariş, beden seçimi, mağazada deneme, ödeme, çalışma saatleri ve indirim kodu kullanımı.',
    en: 'Antalya Abiye FAQ: ordering, choosing your size, trying dresses in the store, payment, opening hours and discount codes.',
    ru: 'Частые вопросы Antalya Abiye: заказ, выбор размера, примерка в магазине, оплата, часы работы и коды скидок.'
  };
  return { baslik: B[dil], aciklama: D[dil], govde, ek: `<script type="application/ld+json">${JSON.stringify(sema).replace(/</g, '\\u003c')}</script>` };
}

const SIPARIS = {
  tr: {
    baslik: 'Sipariş Nasıl Verilir? WhatsApp İle Abiye Siparişi | Antalya Abiye',
    aciklama: 'Antalya Abiye\'de sipariş nasıl verilir: modeli seç, renk ve bedeni belirle, WhatsApp\'tan ürün koduyla yaz. Mağazada deneme ve adrese teslimat.',
    h1: 'Sipariş Nasıl Verilir?',
    alt: 'Sitede ödeme adımı yok. Siparişleri WhatsApp üzerinden, ürün koduyla birlikte alıyoruz.',
    bolumler: [
      ['1. Modeli Seç', ['Kategorilerden beğendiğin abiyeyi bul. Her ürünün sayfasında bir ürün kodu var (örneğin AA-T01). Siparişte bu kodu kullanıyoruz.']],
      ['2. Renk Ve Bedeni Belirle', ['Ürün sayfasında rengi ve bedeni seç. Bedenini bilmiyorsan "Bilmiyorum" seçeneğini işaretle ya da [Beden Tablosu](sayfa:beden) sayfasındaki hesaplayıcıyı kullan.']],
      ['3. WhatsApp\'tan Gönder', ['"WhatsApp\'tan Sipariş Ver" butonuna bastığında ürün kodu, renk ve beden bilgisi mesaja hazır olarak eklenir. Mesajı göndermen yeterli.']],
      ['4. Birlikte Netleştirelim', ['Stok, beden ve teslimat bilgisini WhatsApp\'tan iletiyoruz. İstersen Güllük Caddesi\'ndeki mağazamıza gelip deneyebilir, istersen adrese teslim alabilirsin. Ödeme seçeneklerini de bu aşamada bildiriyoruz.']],
      ['İndirim Kodu', ['Çarktan bir indirim kodu kazandıysan siparişini verirken kodu mesajına yaz. Her telefon numarası çarkı bir kez çevirebilir.']]
    ]
  },
  en: {
    baslik: 'How To Order On WhatsApp | Antalya Abiye',
    aciklama: 'How to order from Antalya Abiye: choose a dress, pick colour and size, and send us the product code on WhatsApp. Try on in store or get delivery.',
    h1: 'How To Order',
    alt: 'There is no online checkout. We take orders on WhatsApp with the product code.',
    bolumler: [
      ['1. Choose A Dress', ['Find a dress in our collections. Each product page shows a product code (for example AA-T01), which we use for your order.']],
      ['2. Pick Colour And Size', ['Choose the colour and size on the product page. Not sure about your size? Tick "Not sure" or use the calculator on our [Size Guide](sayfa:beden) page.']],
      ['3. Send It On WhatsApp', ['Tap "Order On WhatsApp". The product code, colour and size are added to the message automatically. Just send it.']],
      ['4. We Confirm The Details', ['We reply with stock, size and delivery details. You can visit our store on Güllük Street to try the dress on, or get it delivered. We share payment options at this step.']],
      ['Discount Code', ['If you won a code on the wheel, write it in your order message. Each phone number can spin the wheel once.']]
    ]
  },
  ru: {
    baslik: 'Как Заказать Через WhatsApp | Antalya Abiye',
    aciklama: 'Как заказать в Antalya Abiye: выберите платье, цвет и размер и отправьте код товара в WhatsApp. Примерка в магазине или доставка.',
    h1: 'Как Заказать',
    alt: 'На сайте нет онлайн-оплаты. Заказы принимаются в WhatsApp по коду товара.',
    bolumler: [
      ['1. Выберите Платье', ['Найдите платье в каталоге. На странице каждого товара указан код (например, AA-T01), по нему мы оформляем заказ.']],
      ['2. Выберите Цвет И Размер', ['Выберите цвет и размер на странице товара. Не знаете размер? Отметьте «Не знаю» или воспользуйтесь калькулятором на странице [Таблица Размеров](sayfa:beden).']],
      ['3. Отправьте В WhatsApp', ['Нажмите «Заказать в WhatsApp». Код товара, цвет и размер добавятся в сообщение автоматически.']],
      ['4. Уточним Детали', ['Мы сообщим о наличии, размере и доставке. Вы можете прийти на примерку в магазин на улице Гюллюк или получить заказ с доставкой. Варианты оплаты мы сообщаем на этом этапе.']],
      ['Код Скидки', ['Если вы выиграли код на колесе, укажите его в сообщении с заказом. Каждый номер телефона может крутить колесо один раз.']]
    ]
  }
};

function siparis(ctx, dil) {
  const { esc, site, wa, IK, i18n } = ctx;
  const t = SIPARIS[dil];
  const govde = `${ust(ctx, dil, site.sayfalar.siparis[dil].ad, t.h1, t.alt)}
<article class="yz">
  ${t.bolumler.map(([b, ps]) => `<section><h2>${esc(b)}</h2>${ps.map(p => `<p>${link(ctx, dil, p)}</p>`).join('')}</section>`).join('')}
  <p class="yd-cta"><a class="aa-wp-btn" href="${wa(i18n[dil].wpMesaj)}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="siparis_sayfa">${IK.wp}<span>${esc(i18n[dil].wpSiparis)}</span></a></p>
</article>`;
  return { baslik: t.baslik, aciklama: t.aciklama, govde };
}

const GIZLILIK = {
  tr: {
    baslik: 'Gizlilik Ve Çerez Politikası | Antalya Abiye',
    aciklama: 'Antalya Abiye gizlilik ve çerez politikası: sitede kullanılan çerezler, tarayıcıda saklanan bilgiler ve analiz araçları.',
    h1: 'Gizlilik Ve Çerez Politikası',
    bolumler: [
      ['Genel', ['Bu sayfa, {marka} internet sitesini kullanırken hangi bilgilerin tarayıcında saklandığını ve hangi çerezlerin kullanıldığını açıklar. Kişisel verilerinin işlenmesine ilişkin ayrıntılar [KVKK Aydınlatma Metni](sayfa:kvkk) sayfasındadır.']],
      ['Tarayıcında Saklanan Bilgiler', ['Favorilerine eklediğin ürünler, kategori sayfasında seçtiğin görünüm ve indirim çarkı sonucun yalnızca senin tarayıcında saklanır. Bu bilgiler bize gönderilmez ve tarayıcı verilerini temizlediğinde silinir.']],
      ['Çerezler', ['Zorunlu çerezler: Sitenin çalışması için gereken teknik çerezler.', 'Analiz çerezleri: Google Analytics ile ziyaret sayısı ve sayfa kullanımı ölçülür.', 'Reklam çerezleri: Meta (Facebook, Instagram) ve Google reklamlarının ölçülmesi ve iyileştirilmesi için kullanılır.']],
      ['Çerezleri Nasıl Yönetebilirsin?', ['Tarayıcı ayarlarından çerezleri silebilir veya engelleyebilirsin. Zorunlu çerezleri engellemen durumunda sitenin bazı bölümleri düzgün çalışmayabilir.']],
      ['İletişim', ['Gizlilikle ilgili soruların için {adres} adresine yazabilir ya da WhatsApp hattımızdan bize ulaşabilirsin.']]
    ]
  },
  en: {
    baslik: 'Privacy And Cookie Policy | Antalya Abiye',
    aciklama: 'Antalya Abiye privacy and cookie policy: cookies used on the website, data stored in your browser and analytics tools.',
    h1: 'Privacy And Cookie Policy',
    bolumler: [
      ['Overview', ['This page explains what is stored in your browser and which cookies are used when you visit the {marka} website. Details on how we process personal data are in our [Data Protection Notice](sayfa:kvkk).']],
      ['Data Stored In Your Browser', ['Your favourites, the grid view you choose and your discount wheel result are stored only in your browser. They are not sent to us and are deleted when you clear your browser data.']],
      ['Cookies', ['Essential cookies: technical cookies needed for the site to work.', 'Analytics cookies: Google Analytics measures visits and page use.', 'Advertising cookies: used to measure and improve Meta (Facebook, Instagram) and Google ads.']],
      ['Managing Cookies', ['You can delete or block cookies in your browser settings. If you block essential cookies, some parts of the site may not work properly.']],
      ['Contact', ['For privacy questions, write to us at {adres} or contact us on WhatsApp.']]
    ]
  },
  ru: {
    baslik: 'Политика Конфиденциальности И Cookie | Antalya Abiye',
    aciklama: 'Политика конфиденциальности и cookie Antalya Abiye: какие файлы cookie используются и какие данные хранятся в браузере.',
    h1: 'Политика Конфиденциальности И Cookie',
    bolumler: [
      ['Общие Положения', ['На этой странице описано, какие данные хранятся в вашем браузере и какие файлы cookie используются на сайте {marka}. Подробности об обработке персональных данных см. в разделе [Уведомление О Защите Данных](sayfa:kvkk).']],
      ['Данные В Вашем Браузере', ['Избранные товары, выбранный вид каталога и результат колеса скидок хранятся только в вашем браузере. Они не передаются нам и удаляются при очистке данных браузера.']],
      ['Файлы Cookie', ['Необходимые cookie: технические файлы, нужные для работы сайта.', 'Аналитические cookie: Google Analytics измеряет посещаемость и использование страниц.', 'Рекламные cookie: используются для оценки и улучшения рекламы Meta (Facebook, Instagram) и Google.']],
      ['Управление Cookie', ['Вы можете удалить или заблокировать cookie в настройках браузера. При блокировке необходимых cookie некоторые разделы сайта могут работать некорректно.']],
      ['Контакты', ['По вопросам конфиденциальности пишите нам по адресу {adres} или в WhatsApp.']]
    ]
  }
};

function gizlilik(ctx, dil) {
  const { esc, A, site } = ctx;
  const t = GIZLILIK[dil];
  const doldur = s => s.replace(/\{marka\}/g, A.marka).replace(/\{adres\}/g, A.adres);
  const govde = `${ust(ctx, dil, site.sayfalar.gizlilik[dil].ad, t.h1)}
<article class="yz">
  ${t.bolumler.map(([b, ps]) => `<section><h2>${esc(b)}</h2>${ps.length > 1 ? `<ul>${ps.map(p => `<li>${link(ctx, dil, doldur(p))}</li>`).join('')}</ul>` : `<p>${link(ctx, dil, doldur(ps[0]))}</p>`}</section>`).join('')}
</article>`;
  return { baslik: t.baslik, aciklama: t.aciklama, govde };
}

const LISTE_T = {
  tr: { favBos: 'Henüz favori ürünün yok. Beğendiğin modellerdeki kalp ikonuna dokunarak buraya ekleyebilirsin.', araBos: 'Aramana uygun model bulunamadı. Farklı bir kelime dene ya da WhatsApp\'tan sor.', araSonuc: '"{q}" için {n} model', araIpucu: 'Model adı, renk, kategori ya da ürün kodu yazabilirsin.', kesfet: 'Modelleri İncele' },
  en: { favBos: 'You have no favourites yet. Tap the heart icon on any dress to add it here.', araBos: 'No dresses match your search. Try another word or ask us on WhatsApp.', araSonuc: '{n} dresses for "{q}"', araIpucu: 'Search by style, colour, collection or product code.', kesfet: 'Browse Dresses' },
  ru: { favBos: 'В избранном пока ничего нет. Нажмите на сердечко у понравившейся модели.', araBos: 'По вашему запросу ничего не найдено. Попробуйте другое слово или спросите нас в WhatsApp.', araSonuc: 'Найдено: {n} («{q}»)', araIpucu: 'Ищите по модели, цвету, категории или коду товара.', kesfet: 'Смотреть Платья' }
};

function aramaMetni(ctx, dil, u) {
  const { site } = ctx;
  const kat = u.kategoriler.map(id => { const k = site.kategoriler.find(x => x.id === id); return k ? k[dil].ad : ''; });
  const renk = u.renkler.map(r => SOZ.renk[r] ? SOZ.renk[r][dil] : r);
  return [u.kod, u[dil].ad].concat(kat, renk).join(' ').toLocaleLowerCase(dil);
}

function urunListesi(ctx, dil, tur) {
  const { esc, href, site, wa, IK, i18n, URUNLER } = ctx;
  const S = site.sayfalar[tur];
  const t = LISTE_T[dil];
  const yeni = site.kategoriler.find(x => x.id === 'yeni');
  const kartlar = URUNLER.map((u, i) => kart(ctx, dil, u, i).replace('<li class="kt-kart"', `<li class="kt-kart" hidden data-kod="${esc(u.kod)}" data-ara="${esc(aramaMetni(ctx, dil, u))}"`)).join('');
  const ara = tur === 'arama' ? `<form class="yb-ara yd-ara" action="${href(dil, S[dil].slug)}" method="get" role="search">${IK.ara}<input name="q" type="search" placeholder="${esc(i18n[dil].araPh)}" aria-label="${esc(i18n[dil].ara)}"><button type="submit">${esc(i18n[dil].araBtn)}</button></form>
    <p class="yd-sonuc" id="yd-sonuc" data-kalip="${esc(t.araSonuc)}">${esc(t.araIpucu)}</p>` : '';
  const govde = `${ust(ctx, dil, S[dil].ad, S[dil].ad)}
<section class="kt yd-liste" data-tur="${tur}">
  <div class="kt-ana">
    ${ara}
    <ul class="kt-liste" id="kt-liste">${kartlar}</ul>
    <div class="kt-bos" id="yd-bos" hidden><p>${esc(tur === 'arama' ? t.araBos : t.favBos)}</p><div class="yd-btnler">${yeni ? `<a class="as-btn" href="${href(dil, yeni[dil].slug)}">${esc(t.kesfet)}</a>` : ''}<a class="aa-wp-btn" href="${wa(i18n[dil].wpMesaj)}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="${tur}">${IK.wp}<span>${esc(ORTAK[dil].wp)}</span></a></div></div>
  </div>
</section>`;
  const B = { favoriler: { tr: 'Favorilerim', en: 'My Favourites', ru: 'Избранное' }, arama: { tr: 'Abiye Ara', en: 'Search Dresses', ru: 'Поиск Платьев' } };
  return { baslik: `${B[tur][dil]} | Antalya Abiye`, aciklama: t.araIpucu, govde, js: ['liste.js'], robots: 'noindex, follow' };
}

module.exports = {
  sss, siparis, gizlilik,
  favoriler: (ctx, dil) => urunListesi(ctx, dil, 'favoriler'),
  arama: (ctx, dil) => urunListesi(ctx, dil, 'arama')
};
