const ORTAK = {
  tr: { anasayfa: 'Ana Sayfa', guncel: 'Son güncelleme: {t}', satici: 'Satıcı Bilgileri', unvan: 'Ünvan', adres: 'Adres', tel: 'Telefon', wp: 'WhatsApp', eposta: 'E-posta', vd: 'Vergi Dairesi / No', tarih: 'tr-TR' },
  en: { anasayfa: 'Home', guncel: 'Last updated: {t}', satici: 'Seller Information', unvan: 'Company', adres: 'Address', tel: 'Phone', wp: 'WhatsApp', eposta: 'Email', vd: 'Tax Office / No', tarih: 'en-GB' },
  ru: { anasayfa: 'Главная', guncel: 'Последнее обновление: {t}', satici: 'Сведения О Продавце', unvan: 'Компания', adres: 'Адрес', tel: 'Телефон', wp: 'WhatsApp', eposta: 'Эл. почта', vd: 'Налоговая / ИНН', tarih: 'ru-RU' }
};

const IADE = {
  tr: {
    baslik: 'İade Ve Değişim Koşulları | Antalya Abiye',
    aciklama: 'Antalya Abiye iade ve değişim koşulları: teslimattan itibaren 14 gün içinde değişim ve cayma hakkı, iade süreci ve kargo bilgisi.',
    h1: 'İade Ve Değişim Koşulları',
    bolumler: [
      ['14 Gün İçinde Değişim Ve İade', ['Adresine teslim edilen ürünlerde, ürünü teslim aldığın günden itibaren 14 gün içinde değişim veya iade (cayma) hakkın vardır. Cayma hakkını kullanmak için herhangi bir gerekçe göstermen gerekmez.']],
      ['Ürün Hangi Durumda Olmalı?', [
        'Ürün kullanılmamış, yıkanmamış ve giyilmemiş olmalıdır. Denemek amacıyla kısa süreli giyim bu kapsamda değildir.',
        'Etiketleri sökülmemiş ve hasar görmemiş olmalıdır.',
        'Mümkünse orijinal ambalajı ve aksesuarlarıyla (kemer, şal, askı vb.) birlikte gönderilmelidir.'
      ]],
      ['Değişim Nasıl Yapılır?', [
        'WhatsApp hattımıza sipariş bilgini ve değiştirmek istediğin beden veya modeli yaz.',
        'Ürünü mağazamıza getirebilir ya da sana bildirdiğimiz kargo firmasıyla gönderebilirsin.',
        'Ürün bize ulaşıp kontrol edildikten sonra yeni ürün stok durumuna göre gönderilir. İstediğin beden veya model stokta yoksa iade yapılır.'
      ]],
      ['İade (Cayma Hakkı) Nasıl Kullanılır?', [
        'Teslimattan itibaren 14 gün içinde WhatsApp hattımız veya aşağıdaki iletişim bilgileri üzerinden iade talebini bildir.',
        'Bildirimden sonra en geç 10 gün içinde ürünü bize geri gönder.',
        'Ürün sana bildirdiğimiz anlaşmalı kargo firmasıyla gönderildiğinde iade kargo ücreti tarafımızca karşılanır.',
        'Cayma bildiriminin bize ulaşmasından itibaren en geç 14 gün içinde ödediğin tutar, ödeme yaptığın yöntemle sana geri ödenir.'
      ]],
      ['İade Ve Değişim Kapsamı Dışındaki Ürünler', [
        'Senin isteğin doğrultusunda ölçüye göre dikilen, tadilat yapılan veya kişiye özel hazırlanan ürünler.',
        'Kullanılmış, yıkanmış, lekelenmiş ya da hasar görmüş ürünler.'
      ]],
      ['Mağazadan Alınan Ürünler', ['Mağazamızdan denenerek alınan ürünlerde değişim için ürünü 14 gün içinde, kullanılmamış ve etiketli olarak mağazamıza getirebilirsin.']],
      ['Kusurlu Ürün', ['Ürün sana kusurlu veya yanlış ulaştıysa teslim aldıktan sonra en kısa sürede fotoğrafıyla birlikte WhatsApp\'tan bize bildir. Kusurlu ürünlerde 6502 sayılı Tüketicinin Korunması Hakkında Kanun\'dan doğan seçimlik hakların saklıdır, kargo ücreti tarafımızca karşılanır.']],
      ['Başvuru', ['Şikayet ve itirazların için Ticaret Bakanlığı\'nca her yıl belirlenen parasal sınırlar dahilinde yerleşim yerindeki veya işlemi yaptığın yerdeki Tüketici Hakem Heyeti\'ne ya da Tüketici Mahkemesi\'ne başvurabilirsin.']]
    ]
  },
  en: {
    baslik: 'Returns And Exchanges | Antalya Abiye',
    aciklama: 'Antalya Abiye returns and exchanges: 14-day exchange and withdrawal right from delivery, how to return, and shipping costs.',
    h1: 'Returns And Exchanges',
    bolumler: [
      ['14-Day Exchange And Return', ['For orders delivered to your address, you have the right to exchange or return (withdraw) within 14 days of receiving the item. You do not need to give a reason.']],
      ['Condition Of The Item', [
        'The item must be unused, unwashed and unworn. Briefly trying it on does not count as use.',
        'Tags must be attached and the item must be undamaged.',
        'Where possible, send it with its original packaging and accessories (belt, shawl, hanger, etc.).'
      ]],
      ['How To Exchange', [
        'Message our WhatsApp line with your order details and the size or style you want instead.',
        'Bring the item to our store or send it with the courier we tell you.',
        'Once we receive and check the item, we send the new one subject to stock. If it is out of stock, we refund you.'
      ]],
      ['How To Return (Right Of Withdrawal)', [
        'Tell us within 14 days of delivery, on WhatsApp or using the contact details below.',
        'Send the item back within 10 days of your notice.',
        'If you use the courier we tell you, we cover the return shipping cost.',
        'We refund the amount you paid, using your original payment method, within 14 days of receiving your notice.'
      ]],
      ['Items Not Eligible', [
        'Items made to measure, altered or prepared especially for you at your request.',
        'Items that are used, washed, stained or damaged.'
      ]],
      ['Items Bought In Store', ['For items tried on and bought in our store, you can bring them back within 14 days, unused and with tags, to exchange.']],
      ['Faulty Items', ['If your item arrives faulty or wrong, tell us on WhatsApp as soon as possible with a photo. Your statutory rights under Turkish Consumer Protection Law No. 6502 apply, and we cover the shipping cost.']],
      ['Complaints', ['You can apply to the Consumer Arbitration Committee or Consumer Court in Turkey, within the monetary limits set each year by the Ministry of Trade.']]
    ]
  },
  ru: {
    baslik: 'Возврат И Обмен | Antalya Abiye',
    aciklama: 'Возврат и обмен в Antalya Abiye: право на обмен и возврат в течение 14 дней с момента доставки, порядок возврата и доставка.',
    h1: 'Возврат И Обмен',
    bolumler: [
      ['Обмен И Возврат В Течение 14 Дней', ['Для заказов с доставкой у вас есть право на обмен или возврат (отказ от договора) в течение 14 дней с момента получения товара. Указывать причину не нужно.']],
      ['Состояние Товара', [
        'Товар не должен быть в употреблении, стиран или ношен. Короткая примерка не считается использованием.',
        'Бирки должны быть на месте, товар без повреждений.',
        'По возможности отправьте товар в оригинальной упаковке и с аксессуарами (пояс, палантин, вешалка и т. д.).'
      ]],
      ['Как Обменять', [
        'Напишите в WhatsApp данные заказа и нужный размер или модель.',
        'Принесите товар в магазин или отправьте службой доставки, которую мы укажем.',
        'После получения и проверки мы отправим новый товар при наличии. Если его нет в наличии, вернём деньги.'
      ]],
      ['Как Вернуть Товар', [
        'Сообщите нам в течение 14 дней после доставки через WhatsApp или по контактам ниже.',
        'Отправьте товар обратно в течение 10 дней после уведомления.',
        'Если вы отправляете товар указанной нами службой доставки, стоимость обратной доставки оплачиваем мы.',
        'Мы вернём оплаченную сумму тем же способом оплаты в течение 14 дней после получения уведомления.'
      ]],
      ['Товары, Не Подлежащие Возврату', [
        'Товары, сшитые по меркам, подогнанные или подготовленные специально по вашему запросу.',
        'Товары, бывшие в употреблении, стиранные, с пятнами или повреждениями.'
      ]],
      ['Покупки В Магазине', ['Товары, купленные в магазине после примерки, можно принести для обмена в течение 14 дней, без следов использования и с бирками.']],
      ['Товар С Дефектом', ['Если товар пришёл с дефектом или не тот, как можно скорее сообщите нам в WhatsApp и пришлите фото. Ваши права по Закону Турции № 6502 о защите прав потребителей сохраняются, доставку оплачиваем мы.']],
      ['Жалобы', ['Вы можете обратиться в Арбитражный комитет по делам потребителей или Суд по делам потребителей в Турции в пределах сумм, ежегодно устанавливаемых Министерством торговли.']]
    ]
  }
};

const MESAFELI = {
  tr: {
    baslik: 'Mesafeli Satış Sözleşmesi | Antalya Abiye',
    aciklama: 'Antalya Abiye ön bilgilendirme formu ve mesafeli satış sözleşmesi: taraflar, ürün ve ödeme bilgileri, teslimat, cayma hakkı ve uyuşmazlıklar.',
    h1: 'Ön Bilgilendirme Ve Mesafeli Satış Sözleşmesi',
    giris: 'Bu sözleşme, internet sitemiz üzerinden incelenip WhatsApp hattımız aracılığıyla verilen ve adrese teslim edilen siparişler için geçerlidir. Sipariş onayı sırasında bu metnin bağlantısı sana iletilir; siparişi onaylaman bu metni okuduğun ve kabul ettiğin anlamına gelir.',
    bolumler: [
      ['1. Taraflar', ['Satıcı: Aşağıda bilgileri yer alan Antalya Abiye.', 'Alıcı: Siparişi veren ve sipariş sırasında adını, telefon numarasını ve teslimat adresini bildiren kişi.']],
      ['2. Sözleşmenin Konusu', ['Bu sözleşmenin konusu, alıcının WhatsApp üzerinden sipariş verdiği ve sipariş onayında özellikleri (ürün adı ve kodu, renk, beden, adet), toplam fiyatı (vergiler dahil), ödeme şekli ve teslimat bilgileri yazılı olarak bildirilen ürünün satışı ve teslimidir. Taraflar 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümlerine tabidir.']],
      ['3. Ürün, Fiyat Ve Ödeme', [
        'Ürünün temel nitelikleri internet sitesindeki ürün sayfasında yer alır.',
        'Ürünün vergiler dahil toplam fiyatı, varsa kargo ücreti ve ödeme seçenekleri (kapıda ödeme, havale/EFT, taksit vb.) sipariş onayında alıcıya yazılı olarak bildirilir.',
        'Sipariş onayında bildirilen fiyat ve koşullar bağlayıcıdır.'
      ]],
      ['4. Teslimat', [
        'Ürün, alıcının bildirdiği adrese kargo ile teslim edilir. Tahmini teslimat süresi sipariş onayında bildirilir ve her durumda 30 günü geçemez.',
        'Teslimat sırasında paketin hasarlı olması halinde alıcının paketi teslim almadan kargo görevlisine tutanak tutturması önerilir.',
        'Ürün stokta bulunmazsa alıcı derhal bilgilendirilir; ödeme yapılmışsa 14 gün içinde iade edilir.'
      ]],
      ['5. Cayma Hakkı', [
        'Alıcı, ürünü teslim aldığı günden itibaren 14 gün içinde herhangi bir gerekçe göstermeden ve cezai şart ödemeden sözleşmeden cayma hakkına sahiptir.',
        'Cayma bildirimi bu süre içinde WhatsApp hattı, telefon veya yazılı olarak satıcıya yapılır.',
        'Alıcı, cayma bildiriminden itibaren 10 gün içinde ürünü satıcıya geri gönderir. Satıcının bildirdiği anlaşmalı kargo ile yapılan iadelerde kargo ücreti satıcıya aittir.',
        'Satıcı, cayma bildiriminin ulaşmasından itibaren 14 gün içinde ödenen tutarı alıcının ödeme yaptığı yöntemle iade eder.',
        'Ayrıntılar [İade Ve Değişim Koşulları](sayfa:iade) sayfasındadır.'
      ]],
      ['6. Cayma Hakkının Kullanılamayacağı Durumlar', ['Alıcının istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan, ölçüye göre dikilen veya tadilat yapılan ürünlerde cayma hakkı kullanılamaz.']],
      ['7. Alıcının Beyanı', ['Alıcı, ürünün temel nitelikleri, fiyatı, ödeme ve teslimat bilgileri ile cayma hakkı konusunda sipariş öncesinde bilgilendirildiğini kabul eder. Kişisel verilerin işlenmesine ilişkin bilgiler [KVKK Aydınlatma Metni](sayfa:kvkk) sayfasındadır.']],
      ['8. Uyuşmazlıkların Çözümü', ['Bu sözleşmeden doğan uyuşmazlıklarda, Ticaret Bakanlığı\'nca her yıl belirlenen parasal sınırlar dahilinde alıcının yerleşim yerindeki veya işlemin yapıldığı yerdeki Tüketici Hakem Heyetleri ile Tüketici Mahkemeleri yetkilidir.']],
      ['9. Yürürlük', ['Bu sözleşme, alıcının siparişi WhatsApp üzerinden onaylamasıyla kurulmuş sayılır.']]
    ]
  },
  en: {
    baslik: 'Distance Sales Agreement | Antalya Abiye',
    aciklama: 'Antalya Abiye pre-information and distance sales agreement: parties, product and payment details, delivery, right of withdrawal and disputes.',
    h1: 'Pre-Information And Distance Sales Agreement',
    giris: 'This agreement applies to orders browsed on our website, placed via our WhatsApp line and delivered to an address. A link to this text is sent to you when we confirm your order; confirming the order means you have read and accepted it.',
    bolumler: [
      ['1. Parties', ['Seller: Antalya Abiye, whose details are below.', 'Buyer: the person placing the order and providing their name, phone number and delivery address.']],
      ['2. Subject', ['This agreement covers the sale and delivery of the product ordered via WhatsApp, whose details (name and code, colour, size, quantity), total price including taxes, payment method and delivery details are confirmed to the buyer in writing. It is governed by Turkish Consumer Protection Law No. 6502 and the Distance Contracts Regulation.']],
      ['3. Product, Price And Payment', [
        'The main features of the product are shown on its product page.',
        'The total price including taxes, any shipping fee and the payment options are confirmed to the buyer in writing with the order.',
        'The price and terms in the order confirmation are binding.'
      ]],
      ['4. Delivery', [
        'The product is delivered by courier to the address given by the buyer. The estimated delivery time is stated in the order confirmation and is never more than 30 days.',
        'If the package is damaged on delivery, we recommend having the courier record it before accepting.',
        'If the product is out of stock, the buyer is informed immediately and any payment is refunded within 14 days.'
      ]],
      ['5. Right Of Withdrawal', [
        'The buyer may withdraw within 14 days of receiving the product, without giving a reason or paying a penalty.',
        'Notice is given within this period via WhatsApp, phone or in writing.',
        'The buyer returns the product within 10 days of the notice. Returns sent with the courier named by the seller are shipped at the seller\'s cost.',
        'The seller refunds the amount paid, using the original payment method, within 14 days of receiving the notice.',
        'See [Returns And Exchanges](sayfa:iade) for details.'
      ]],
      ['6. Exceptions', ['The right of withdrawal does not apply to products prepared, made to measure or altered at the buyer\'s request.']],
      ['7. Buyer\'s Statement', ['The buyer confirms having been informed of the product\'s features, price, payment, delivery and right of withdrawal before ordering. See our [Data Protection Notice](sayfa:kvkk) for personal data.']],
      ['8. Disputes', ['Consumer Arbitration Committees and Consumer Courts in Turkey have jurisdiction, within the monetary limits set each year by the Ministry of Trade.']],
      ['9. Effect', ['This agreement takes effect when the buyer confirms the order on WhatsApp.']]
    ]
  },
  ru: {
    baslik: 'Договор Дистанционной Продажи | Antalya Abiye',
    aciklama: 'Предварительная информация и договор дистанционной продажи Antalya Abiye: стороны, товар и оплата, доставка, право на отказ и споры.',
    h1: 'Предварительная Информация И Договор Дистанционной Продажи',
    giris: 'Договор действует для заказов, выбранных на сайте, оформленных через WhatsApp и доставленных по адресу. Ссылку на этот текст мы отправляем при подтверждении заказа; подтверждая заказ, вы принимаете его условия.',
    bolumler: [
      ['1. Стороны', ['Продавец: Antalya Abiye, сведения ниже.', 'Покупатель: лицо, оформившее заказ и указавшее имя, телефон и адрес доставки.']],
      ['2. Предмет Договора', ['Предмет договора — продажа и доставка товара, заказанного через WhatsApp, характеристики которого (название и код, цвет, размер, количество), итоговая цена с налогами, способ оплаты и условия доставки письменно подтверждаются покупателю. Договор регулируется Законом Турции № 6502 о защите прав потребителей и Положением о дистанционных договорах.']],
      ['3. Товар, Цена И Оплата', [
        'Основные характеристики товара указаны на странице товара.',
        'Итоговая цена с налогами, стоимость доставки и способы оплаты письменно сообщаются при подтверждении заказа.',
        'Цена и условия из подтверждения заказа являются обязательными.'
      ]],
      ['4. Доставка', [
        'Товар доставляется курьером по указанному адресу. Ориентировочный срок указывается при подтверждении и не превышает 30 дней.',
        'Если упаковка повреждена, рекомендуем составить акт с курьером до получения.',
        'Если товара нет в наличии, покупателя сразу уведомляют, оплата возвращается в течение 14 дней.'
      ]],
      ['5. Право На Отказ', [
        'Покупатель вправе отказаться от договора в течение 14 дней с момента получения товара без объяснения причин и штрафов.',
        'Уведомление направляется в этот срок через WhatsApp, по телефону или письменно.',
        'Покупатель возвращает товар в течение 10 дней после уведомления. При отправке указанной продавцом службой доставки расходы несёт продавец.',
        'Продавец возвращает оплату тем же способом в течение 14 дней после получения уведомления.',
        'Подробнее: [Возврат И Обмен](sayfa:iade).'
      ]],
      ['6. Исключения', ['Право на отказ не распространяется на товары, подготовленные, сшитые по меркам или подогнанные по запросу покупателя.']],
      ['7. Заявление Покупателя', ['Покупатель подтверждает, что до заказа получил информацию о товаре, цене, оплате, доставке и праве на отказ. Об обработке данных: [Уведомление О Защите Данных](sayfa:kvkk).']],
      ['8. Споры', ['Споры рассматриваются Арбитражными комитетами и Судами по делам потребителей в Турции в пределах сумм, ежегодно устанавливаемых Министерством торговли.']],
      ['9. Вступление В Силу', ['Договор считается заключённым после подтверждения заказа покупателем в WhatsApp.']]
    ]
  }
};

function uret(ctx, dil, T, anahtar) {
  const { esc, href, site, A } = ctx;
  const t = T[dil], o = ORTAK[dil];
  const link = s => esc(s).replace(/\[([^\]]+)\]\((sayfa):([^)]+)\)/g, (m, metin, tur, id) => {
    const p = site.sayfalar[id];
    return p ? `<a href="${href(dil, p[dil].slug)}">${metin}</a>` : metin;
  });
  const tg = n => { const d = String(n || '').replace(/\D/g, ''); const m = d.match(/^90(\d{3})(\d{3})(\d{2})(\d{2})$/); return m ? `0${m[1]} ${m[2]} ${m[3]} ${m[4]}` : d; };
  const satici = [
    A.unvan ? [o.unvan, A.unvan] : [o.unvan, A.marka],
    [o.adres, A.adres],
    A.telefon ? [o.tel, tg(A.telefon)] : null,
    A.whatsapp ? [o.wp, tg(A.whatsapp)] : null,
    A.eposta ? [o.eposta, A.eposta] : null,
    A.vergiDairesi || A.vergiNo ? [o.vd, [A.vergiDairesi, A.vergiNo].filter(Boolean).join(' / ')] : null
  ].filter(Boolean);
  const tarih = new Date().toLocaleDateString(o.tarih, { day: 'numeric', month: 'long', year: 'numeric' });
  const ad = site.sayfalar[anahtar][dil].ad;
  const govde = `
<section class="aa-sb">
  <div class="aa-sb-ic">
    <nav class="aa-yol" aria-label="breadcrumb"><a href="./">${esc(o.anasayfa)}</a><span>/</span><span aria-current="page">${esc(ad)}</span></nav>
    <h1>${esc(t.h1)}</h1>
    <p>${esc(o.guncel.replace('{t}', tarih))}</p>
  </div>
</section>
<article class="yz">
  ${t.giris ? `<p class="yz-giris">${esc(t.giris)}</p>` : ''}
  ${t.bolumler.map(([b, ps]) => `<section><h2>${esc(b)}</h2>${ps.length > 1 ? `<ul>${ps.map(p => `<li>${link(p)}</li>`).join('')}</ul>` : `<p>${link(ps[0])}</p>`}</section>`).join('')}
  <section><h2>${esc(o.satici)}</h2><ul class="yz-satici">${satici.map(([k, v]) => `<li><span>${esc(k)}</span><b>${esc(v)}</b></li>`).join('')}</ul></section>
</article>`;
  return { baslik: t.baslik, aciklama: t.aciklama, govde };
}

module.exports = {
  iade: (ctx, dil) => uret(ctx, dil, IADE, 'iade'),
  mesafeli: (ctx, dil) => uret(ctx, dil, MESAFELI, 'mesafeli')
};
