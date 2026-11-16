const { SOZ, ETIKET, fotoYer, kart, sepetVeri, yol, urunFotolari } = require('./katalog.js');

const T = {
  tr: {
    anasayfa: 'Ana Sayfa',
    renkSec: 'Renk',
    bedenSec: 'Beden',
    bedenTablo: 'Beden Tablosu',
    wpBtn: 'WhatsApp\'tan Sor',
    wpAlt: 'Birden fazla ürünü sepete ekleyip tek mesajla sipariş verebilirsin.',
    favEkle: 'Favorilere Ekle',
    favli: 'Favorilerde',
    detay: 'Ürün Detayları',
    benzer: 'Benzer Modeller',
    bedenSor: 'Bilmiyorum',
    bedenUyari: 'Lütfen beden seç ya da "Bilmiyorum" de.',
    firsatUrun: 'Fırsat Ürünü',
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
    wpBtn: 'Ask On WhatsApp',
    wpAlt: 'Add several dresses to your bag and order them in one message.',
    favEkle: 'Add To Favourites',
    favli: 'In Favourites',
    detay: 'Product Details',
    benzer: 'Similar Styles',
    bedenSor: 'Not sure',
    bedenUyari: 'Please pick a size or choose "Not sure".',
    firsatUrun: 'Special Offer',
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
    wpBtn: 'Спросить В WhatsApp',
    wpAlt: 'Добавьте несколько платьев в корзину и закажите их одним сообщением.',
    favEkle: 'В Избранное',
    favli: 'В Избранном',
    detay: 'Детали Модели',
    benzer: 'Похожие Модели',
    bedenSor: 'Не знаю',
    bedenUyari: 'Выберите размер или отметьте «Не знаю».',
    firsatUrun: 'Выгодное Предложение',
    mesaj: 'Здравствуйте, пишу о модели {ad}.\nКод товара: {kod}\nЦвет: {renk}\nРазмер: {beden}\nЕсть в наличии?',
    secilmedi: 'не выбран',
    baslik: '{ad} {kod} | Antalya Abiye',
    aciklama: '{ad} ({kod}). Цвета: {renkler}. Размеры {bedenler}. Заказ в Antalya Abiye через WhatsApp.',
    onceki: 'Предыдущее фото',
    sonraki: 'Следующее фото'
  }
};

module.exports = function (ctx, dil, u, urunler) {
  const { esc, href, IK, A, site, wa, i18n } = ctx;
  const t = T[dil];
  const E = ETIKET[dil];
  const ad = u[dil].ad;
  const anaKat = site.kategoriler.find(k => k.id === u.kategoriler[0]);
  const ilkRenk = SOZ.renk[u.renkler[0]][dil];
  const genel = (u.fotograflar || []).filter(Boolean);
  const rf = u.renkFotolari || {};
  const ilkRenkFoto = (rf[u.renkler[0]] || []).filter(Boolean);
  const gosterilen = ilkRenkFoto.length ? ilkRenkFoto : urunFotolari(u);
  const slot = Math.max(5, gosterilen.length);
  const fotolar = Array.from({ length: slot }, (_, i) => gosterilen[i] ? `<img src="${esc(yol(dil, gosterilen[i]))}" alt="${esc(ad)} ${esc(ilkRenk)} ${i + 1}" width="1200" height="1800"${i ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">` : fotoYer(dil, i + 1));
  const renkGaleri = {};
  u.renkler.forEach(k => { const l = (rf[k] || []).filter(Boolean); if (l.length) renkGaleri[SOZ.renk[k][dil]] = l.map(p => yol(dil, p)); });
  if (Object.keys(renkGaleri).length && genel.length) u.renkler.forEach(k => { const n = SOZ.renk[k][dil]; if (!renkGaleri[n]) renkGaleri[n] = genel.map(p => yol(dil, p)); });
  const tumFotolar = genel.concat(...u.renkler.map(k => (rf[k] || []).filter(Boolean))).filter((x, i, a) => a.indexOf(x) === i);
  const ana = fotolar.map((f, i) => `<div class="ur-slayt" data-i="${i}">${f}</div>`).join('');
  const kucuk = fotolar.map((f, i) => `<button type="button" class="ur-kucuk${i === 0 ? ' on' : ''}" data-i="${i}" aria-label="${esc(E.foto)} ${i + 1}">${f.replace(/alt="[^"]*"/, 'alt=""').replace(' fetchpriority="high"', ' loading="lazy"')}</button>`).join('');
  const renkler = u.renkler.map((r, i) => `<label class="ur-renk"><input type="radio" name="renk" value="${esc(SOZ.renk[r][dil])}"${i === 0 ? ' checked' : ''}><i style="background:${SOZ.renk[r].hex}"></i><span>${esc(SOZ.renk[r][dil])}</span></label>`).join('');
  const bedenler = u.bedenler.map(b => `<label class="ur-beden"><input type="radio" name="beden" value="${esc(b)}"><span>${esc(b)}</span></label>`).join('') + `<label class="ur-beden ur-bilmiyorum"><input type="radio" name="beden" value="${esc(t.bedenSor)}"><span>${esc(t.bedenSor)}</span></label>`;
  const detay = [
    [E.urunKodu, u.kod],
    [E.boy, SOZ.boy[u.boy][dil]],
    [E.kesim, SOZ.kesim[u.kesim][dil]],
    [E.kol, SOZ.kol[u.kol][dil]],
    [E.kullanim, u.kullanim.map(k => SOZ.kullanim[k][dil]).join(', ')],
    [E.beden, `${u.bedenler[0]}–${u.bedenler[u.bedenler.length - 1]}`]
  ].map(([k, v]) => `<li><span>${esc(k)}</span><b>${esc(v)}</b></li>`).join('');
  const firsatMi = u.kategoriler.includes('firsat');
  const benzer = urunler.filter(x => x.kod !== u.kod && x.kategoriler.includes('firsat') === firsatMi && x.kategoriler.some(k => u.kategoriler.includes(k) && k !== 'uzun')).concat(urunler.filter(x => x.kod !== u.kod && x.kategoriler.includes('firsat') === firsatMi)).filter((x, i, a) => a.indexOf(x) === i).slice(0, 4);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: ad,
    sku: u.kod,
    brand: { '@type': 'Brand', name: A.marka },
    color: u.renkler.map(r => SOZ.renk[r][dil]).join(', '),
    image: tumFotolar.map(p => ctx.tabanUrl + p),
    description: u[dil].aciklama || undefined,
    url: ctx.tabanUrl + (dil === 'tr' ? '' : dil + '/') + u[dil].slug + '.html'
  };
  const govde = `
<section class="ur">
  <nav class="aa-yol ur-yol" aria-label="breadcrumb"><a href="./">${esc(t.anasayfa)}</a><span>/</span>${anaKat ? `<a href="${href(dil, anaKat[dil].slug)}">${esc(anaKat[dil].ad)}</a><span>/</span>` : ''}<span aria-current="page">${esc(ad)}</span></nav>
  <div class="ur-izgara">
    <div class="ur-galeri" id="ur-galeri" data-ad="${esc(ad)}"${Object.keys(renkGaleri).length ? ` data-renkler="${esc(JSON.stringify(renkGaleri))}"` : ''}>
      <div class="ur-kucukler">${kucuk}</div>
      <div class="ur-ana">
        <div class="ur-ray" id="ur-ray">${ana}</div>
        <button type="button" class="ur-ok ur-geri" aria-label="${esc(t.onceki)}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>
        <button type="button" class="ur-ok ur-ileri" aria-label="${esc(t.sonraki)}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button>
        <span class="ur-sayac" id="ur-sayac">1 / ${fotolar.length}</span>
        <span class="ur-noktalar" id="ur-noktalar">${fotolar.map((f, i) => `<i${i === 0 ? ' class="on"' : ''}></i>`).join('')}</span>
        <span class="kt-rozetler ur-rozetler">${u.kategoriler.includes('firsat') ? `<b class="kt-rozet kt-r-firsat">${esc(t.firsatUrun)}</b>` : ''}${u.ornek ? `<b class="kt-rozet kt-r-ornek">${esc(E.ornek)}</b>` : ''}</span>
      </div>
    </div>
    <div class="ur-bilgi">
      <h1>${esc(ad)}</h1>
      <p class="ur-kod">${esc(E.urunKodu)}: <b>${esc(u.kod)}</b></p>
      <form class="ur-form" id="ur-form" data-ad="${esc(ad)}" data-kod="${esc(u.kod)}" data-wa="${esc(A.whatsapp)}" data-mesaj="${esc(t.mesaj)}" data-secilmedi="${esc(t.secilmedi)}">
        <fieldset><legend>${esc(t.renkSec)}: <b id="ur-renk-ad">${esc(SOZ.renk[u.renkler[0]][dil])}</b></legend><div class="ur-renkler">${renkler}</div></fieldset>
        <fieldset id="ur-beden-alan" data-uyari="${esc(t.bedenUyari)}"><legend>${esc(t.bedenSec)}<a href="${href(dil, site.sayfalar.beden[dil].slug)}">${esc(t.bedenTablo)}</a></legend><div class="ur-bedenler">${bedenler}</div></fieldset>
        <button type="button" class="as-btn aa-genis ur-sepet" id="ur-sepet" data-sepet="${esc(sepetVeri(dil, u, href))}">${IK.canta}<span>${esc(i18n[dil].sepet.ekle)}</span></button>
        <a class="aa-wp-btn aa-genis ur-wp ur-wp-ikinci" id="ur-wp" href="${wa(t.mesaj.replace('{ad}', ad).replace('{kod}', u.kod).replace('{renk}', SOZ.renk[u.renkler[0]][dil]).replace('{beden}', t.secilmedi))}" target="_blank" rel="noopener" data-olay="whatsapp_siparis" data-konum="urun" data-urun="${esc(u.kod)}">${IK.wp}<span>${esc(t.wpBtn)}</span></a>
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
<div class="ur-sabit" id="ur-sabit"><div><b>${esc(u.kod)}</b><span id="ur-sabit-secim">${esc(SOZ.renk[u.renkler[0]][dil])}</span></div><button type="button" class="as-btn ur-sabit-btn">${IK.canta}<span>${esc(i18n[dil].sepet.ekle)}</span></button></div>
${benzer.length ? `<section class="as-bolum ur-benzer"><div class="as-baslik"><div><h2>${esc(t.benzer)}</h2></div></div><ul class="kt-liste kt-liste-4">${benzer.map((x, i) => kart(ctx, dil, x, i)).join('')}</ul></section>` : ''}`;
  return {
    baslik: t.baslik.replace('{ad}', ad).replace('{kod}', u.kod),
    aciklama: t.aciklama.replace('{ad}', ad).replace('{kod}', u.kod).replace('{renkler}', u.renkler.map(r => SOZ.renk[r][dil]).join(', ')).replace('{bedenler}', `${u.bedenler[0]}–${u.bedenler[u.bedenler.length - 1]}`),
    govde,
    ek: `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
    gorsel: tumFotolar[0] || '',
    gorseller: tumFotolar,
    js: ['urun.js'],
    sinif: 'ur-sayfa'
  };
};
