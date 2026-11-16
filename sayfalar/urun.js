const { SOZ, ETIKET, fotoYer, kart } = require('./katalog.js');

const T = {
  tr: {
    anasayfa: 'Ana Sayfa',
    renkSec: 'Renk',
    bedenSec: 'Beden',
    bedenTablo: 'Beden Tablosu',
    wpBtn: 'WhatsApp\'tan Sipariş Ver',
    wpAlt: 'Ürün kodu, renk ve beden mesajına otomatik eklenir.',
    favEkle: 'Favorilere Ekle',
    favli: 'Favorilerde',
    detay: 'Ürün Detayları',
    benzer: 'Benzer Modeller',
    bedenSor: 'Bedenimi bilmiyorum',
    mesaj: 'Merhaba, {ad} modeli için yazıyorum.\nÜrün kodu: {kod}\nRenk: {renk}\nBeden: {beden}\nStok durumu nedir?',
    secilmedi: 'seçilmedi',
    baslik: '{ad} {kod} | Antalya Abiye',
    aciklama: '{ad} ({kod}). {renkler} renk seçenekleri, {bedenler} beden. Antalya Abiye\'den WhatsApp ile sipariş ver.',
    onceki: 'Önceki fotoğraf',
    sonraki: 'Sonraki fotoğraf'
  },
  en: {
    anasayfa: 'Home',
    renkSec: 'Colour',
    bedenSec: 'Size',
    bedenTablo: 'Size Guide',
    wpBtn: 'Order On WhatsApp',
    wpAlt: 'The product code, colour and size are added to your message.',
    favEkle: 'Add To Favourites',
    favli: 'In Favourites',
    detay: 'Product Details',
    benzer: 'Similar Styles',
    bedenSor: 'I don\'t know my size',
    mesaj: 'Hello, I am writing about the {ad}.\nProduct code: {kod}\nColour: {renk}\nSize: {beden}\nIs it in stock?',
    secilmedi: 'not selected',
    baslik: '{ad} {kod} | Antalya Abiye',
    aciklama: '{ad} ({kod}). Colours: {renkler}. Sizes {bedenler}. Order from Antalya Abiye on WhatsApp.',
    onceki: 'Previous photo',
    sonraki: 'Next photo'
  },
  ru: {
    anasayfa: 'Главная',
    renkSec: 'Цвет',
    bedenSec: 'Размер',
    bedenTablo: 'Таблица Размеров',
    wpBtn: 'Заказать В WhatsApp',
    wpAlt: 'Код товара, цвет и размер добавятся в сообщение.',
    favEkle: 'В Избранное',
    favli: 'В Избранном',
    detay: 'Детали Модели',
    benzer: 'Похожие Модели',
    bedenSor: 'Не знаю свой размер',
    mesaj: 'Здравствуйте, пишу о модели {ad}.\nКод товара: {kod}\nЦвет: {renk}\nРазмер: {beden}\nЕсть в наличии?',
    secilmedi: 'не выбран',
    baslik: '{ad} {kod} | Antalya Abiye',
    aciklama: '{ad} ({kod}). Цвета: {renkler}. Размеры {bedenler}. Заказ в Antalya Abiye через WhatsApp.',
    onceki: 'Предыдущее фото',
    sonraki: 'Следующее фото'
  }
};

module.exports = function (ctx, dil, u, urunler) {
  const { esc, href, IK, A, site, wa } = ctx;
  const t = T[dil];
  const E = ETIKET[dil];
  const ad = u[dil].ad;
  const anaKat = site.kategoriler.find(k => k.id === u.kategoriler[0]);
  const fotolar = u.fotograflar.map((f, i) => f ? `<img src="${esc(f)}" alt="${esc(ad)} ${i + 1}"${i ? ' loading="lazy"' : ''}>` : fotoYer(dil, i + 1));
  const ana = fotolar.map((f, i) => `<div class="ur-slayt" data-i="${i}">${f}</div>`).join('');
  const kucuk = fotolar.map((f, i) => `<button type="button" class="ur-kucuk${i === 0 ? ' on' : ''}" data-i="${i}" aria-label="${esc(E.foto)} ${i + 1}">${f}</button>`).join('');
  const renkler = u.renkler.map((r, i) => `<label class="ur-renk"><input type="radio" name="renk" value="${esc(SOZ.renk[r][dil])}"${i === 0 ? ' checked' : ''}><i style="background:${SOZ.renk[r].hex}"></i><span>${esc(SOZ.renk[r][dil])}</span></label>`).join('');
  const bedenler = u.bedenler.map(b => `<label class="ur-beden"><input type="radio" name="beden" value="${esc(b)}"><span>${esc(b)}</span></label>`).join('');
  const detay = [
    [E.urunKodu, u.kod],
    [E.boy, SOZ.boy[u.boy][dil]],
    [E.kesim, SOZ.kesim[u.kesim][dil]],
    [E.kol, SOZ.kol[u.kol][dil]],
    [E.kullanim, u.kullanim.map(k => SOZ.kullanim[k][dil]).join(', ')],
    [E.beden, `${u.bedenler[0]}–${u.bedenler[u.bedenler.length - 1]}`]
  ].map(([k, v]) => `<li><span>${esc(k)}</span><b>${esc(v)}</b></li>`).join('');
  const benzer = urunler.filter(x => x.kod !== u.kod && x.kategoriler.some(k => k !== 'firsat' && u.kategoriler.includes(k))).concat(urunler.filter(x => x.kod !== u.kod)).filter((x, i, a) => a.indexOf(x) === i).slice(0, 4);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: ad,
    sku: u.kod,
    brand: { '@type': 'Brand', name: A.marka },
    color: u.renkler.map(r => SOZ.renk[r][dil]).join(', '),
    image: u.fotograflar.filter(Boolean)
  };
  const govde = `
<section class="ur">
  <nav class="aa-yol ur-yol" aria-label="breadcrumb"><a href="./">${esc(t.anasayfa)}</a><span>/</span>${anaKat ? `<a href="${href(dil, anaKat[dil].slug)}">${esc(anaKat[dil].ad)}</a><span>/</span>` : ''}<span aria-current="page">${esc(ad)}</span></nav>
  <div class="ur-izgara">
    <div class="ur-galeri" id="ur-galeri">
      <div class="ur-kucukler">${kucuk}</div>
      <div class="ur-ana">
        <div class="ur-ray" id="ur-ray">${ana}</div>
        <button type="button" class="ur-ok ur-geri" aria-label="${esc(t.onceki)}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>
        <button type="button" class="ur-ok ur-ileri" aria-label="${esc(t.sonraki)}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button>
        <span class="ur-sayac" id="ur-sayac">1 / ${fotolar.length}</span>
        <span class="kt-rozetler">${u.kategoriler.includes('firsat') ? `<b class="kt-rozet kt-r-firsat">${esc(E.firsat)}</b>` : ''}${u.ornek ? `<b class="kt-rozet kt-r-ornek">${esc(E.ornek)}</b>` : ''}</span>
      </div>
    </div>
    <div class="ur-bilgi">
      <h1>${esc(ad)}</h1>
      <p class="ur-kod">${esc(E.urunKodu)}: <b>${esc(u.kod)}</b></p>
      <form class="ur-form" id="ur-form" data-ad="${esc(ad)}" data-kod="${esc(u.kod)}" data-wa="${esc(A.whatsapp)}" data-mesaj="${esc(t.mesaj)}" data-secilmedi="${esc(t.secilmedi)}">
        <fieldset><legend>${esc(t.renkSec)}: <b id="ur-renk-ad">${esc(SOZ.renk[u.renkler[0]][dil])}</b></legend><div class="ur-renkler">${renkler}</div></fieldset>
        <fieldset><legend>${esc(t.bedenSec)}<a href="${href(dil, site.sayfalar.beden[dil].slug)}">${esc(t.bedenTablo)}</a></legend><div class="ur-bedenler">${bedenler}</div></fieldset>
        <a class="aa-wp-btn aa-genis ur-wp" id="ur-wp" href="${wa(t.mesaj.replace('{ad}', ad).replace('{kod}', u.kod).replace('{renk}', SOZ.renk[u.renkler[0]][dil]).replace('{beden}', t.secilmedi))}" target="_blank" rel="noopener" data-olay="whatsapp_siparis" data-konum="urun" data-urun="${esc(u.kod)}">${IK.wp}<span>${esc(t.wpBtn)}</span></a>
        <p class="ur-wp-alt">${esc(t.wpAlt)}</p>
        <button type="button" class="ur-fav kt-fav" data-fav="${esc(u.kod)}" aria-pressed="false" data-ekle="${esc(t.favEkle)}" data-favli="${esc(t.favli)}"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 20.2s-7.4-4.4-7.4-10.1A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.4 2.5c0 5.7-7.4 10.1-7.4 10.1z"/></svg><span>${esc(t.favEkle)}</span></button>
      </form>
      <div class="ur-detay">
        <h2>${esc(t.detay)}</h2>
        ${u[dil].aciklama ? `<p>${esc(u[dil].aciklama)}</p>` : ''}
        <ul>${detay}</ul>
      </div>
    </div>
  </div>
</section>
${benzer.length ? `<section class="as-bolum ur-benzer"><div class="as-baslik"><div><h2>${esc(t.benzer)}</h2></div></div><ul class="kt-liste kt-liste-4">${benzer.map((x, i) => kart(ctx, dil, x, i)).join('')}</ul></section>` : ''}`;
  return {
    baslik: t.baslik.replace('{ad}', ad).replace('{kod}', u.kod),
    aciklama: t.aciklama.replace('{ad}', ad).replace('{kod}', u.kod).replace('{renkler}', u.renkler.map(r => SOZ.renk[r][dil]).join(', ')).replace('{bedenler}', `${u.bedenler[0]}–${u.bedenler[u.bedenler.length - 1]}`),
    govde,
    ek: `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
    js: ['urun.js']
  };
};
