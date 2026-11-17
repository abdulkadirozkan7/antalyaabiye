const T = {
  tr: {
    anasayfa: 'Ana Sayfa', blog: 'Blog',
    baslik: 'Abiye Rehberi Ve Blog | Antalya Abiye',
    aciklama: 'Antalya Abiye blog: abiye seçimi, beden, renk ve kesim rehberleri. Tesettür, nişan, mezuniyet ve büyük beden abiye için pratik öneriler.',
    h1: 'Abiye Rehberi Ve Blog',
    giris: 'Abiye seçerken işine yarayacak rehberler: model, renk, kumaş ve beden seçimi, Antalya\'daki mağazamızda alışveriş.',
    oku: 'Devamını Oku', dk: '{n} dk okuma', yazar: 'Antalya Abiye', guncel: 'Güncellendi',
    sss: 'Sık Sorulan Sorular', ilgili: 'Diğer Rehberler',
    kartBaslik: 'Beğendiğin Modeli Sor', kartMetin: 'Ürün kodunu WhatsApp\'tan yaz, stok ve beden durumunu hemen bildirelim.',
    kartWp: 'WhatsApp\'tan Yaz', kategoriler: 'Kategoriler', bos: 'Bu dilde henüz yazı yok.', tarih: 'tr-TR'
  },
  en: {
    anasayfa: 'Home', blog: 'Blog',
    baslik: 'Evening Dress Guides And Blog | Antalya Abiye',
    aciklama: 'Antalya Abiye blog: guides on choosing evening dresses, sizes, colours and styles, and shopping at our store in Antalya.',
    h1: 'Evening Dress Guides And Blog',
    giris: 'Practical guides on choosing an evening dress: style, colour, fabric and size, and shopping at our store in Antalya.',
    oku: 'Read More', dk: '{n} min read', yazar: 'Antalya Abiye', guncel: 'Updated',
    sss: 'Frequently Asked Questions', ilgili: 'More Guides',
    kartBaslik: 'Ask About A Dress', kartMetin: 'Send us the product code on WhatsApp and we will check stock and sizes for you.',
    kartWp: 'Message On WhatsApp', kategoriler: 'Collections', bos: 'No posts in this language yet.', tarih: 'en-GB'
  },
  ru: {
    anasayfa: 'Главная', blog: 'Блог',
    baslik: 'Советы По Выбору Вечернего Платья И Блог | Antalya Abiye',
    aciklama: 'Блог Antalya Abiye: советы по выбору вечернего платья, размера, цвета и фасона, покупки в нашем магазине в Анталье.',
    h1: 'Советы По Выбору Вечернего Платья',
    giris: 'Практические советы по выбору вечернего платья: фасон, цвет, ткань и размер, покупки в нашем магазине в Анталье.',
    oku: 'Читать Далее', dk: '{n} мин чтения', yazar: 'Antalya Abiye', guncel: 'Обновлено',
    sss: 'Частые Вопросы', ilgili: 'Другие Статьи',
    kartBaslik: 'Спросите О Платье', kartMetin: 'Отправьте код товара в WhatsApp, и мы сообщим о наличии и размерах.',
    kartWp: 'Написать В WhatsApp', kategoriler: 'Категории', bos: 'Статей на этом языке пока нет.', tarih: 'ru-RU'
  }
};

const okMetin = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

function tarihYaz(dil, s) {
  return new Date(s + 'T12:00:00').toLocaleDateString(T[dil].tarih, { day: 'numeric', month: 'long', year: 'numeric' });
}

function satirIci(ctx, dil, s) {
  const { esc, href, site } = ctx;
  return esc(s).replace(/\[([^\]]+)\]\((kat|sayfa|blog):([^)]+)\)/g, (m, metin, tur, id) => {
    let hedef = '';
    if (tur === 'kat') { const k = site.kategoriler.find(x => x.id === id); if (k) hedef = href(dil, k[dil].slug); }
    if (tur === 'sayfa') { const p = site.sayfalar[id]; if (p) hedef = href(dil, p[dil].slug); }
    if (tur === 'blog') { const y = ctx.BLOG.find(x => x.id === id && x[dil]); if (y) hedef = href(dil, y[dil].slug); }
    return hedef ? `<a href="${hedef}">${metin}</a>` : metin;
  });
}

function govdeHtml(ctx, dil, satirlar) {
  let html = '', liste = [];
  const bitir = () => { if (liste.length) { html += `<ul>${liste.map(l => `<li>${l}</li>`).join('')}</ul>`; liste = []; } };
  for (const s of satirlar) {
    if (s.startsWith('- ')) { liste.push(satirIci(ctx, dil, s.slice(2))); continue; }
    bitir();
    const resim = s.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (resim) { html += `<figure class="bl-resim"><img src="${ctx.esc(ctx.kok(dil) + resim[2])}" alt="${ctx.esc(resim[1])}" width="1600" height="1000" loading="lazy" decoding="async">${resim[1] ? `<figcaption>${ctx.esc(resim[1])}</figcaption>` : ''}</figure>`; continue; }
    if (s.startsWith('### ')) html += `<h3>${satirIci(ctx, dil, s.slice(4))}</h3>`;
    else if (s.startsWith('## ')) html += `<h2>${satirIci(ctx, dil, s.slice(3))}</h2>`;
    else html += `<p>${satirIci(ctx, dil, s)}</p>`;
  }
  bitir();
  return html;
}

const dakika = (y) => Math.max(2, Math.round(y.govde.join(' ').split(/\s+/).length / 200));

function kapak(ctx, dil, y, buyuk) {
  const { esc, site } = ctx;
  if (y.kapak) return `<img src="${ctx.kok(dil)}${esc(y.kapak)}" alt="${esc(y[dil].h1)}" width="1200" height="675" loading="${buyuk ? 'eager' : 'lazy'}">`;
  const k = site.kategoriler.find(x => x.id === y.kategori);
  return `<span class="bl-kapak-yer"><b>${esc(k ? k[dil].ad : 'Antalya Abiye')}</b></span>`;
}

function kart(ctx, dil, y) {
  const { esc, href } = ctx;
  const t = T[dil], v = y[dil];
  return `<li class="bl-kart"><a href="${href(dil, v.slug)}">
  <div class="bl-kapak">${kapak(ctx, dil, y, false)}</div>
  <p class="bl-meta"><time datetime="${y.tarih}">${esc(tarihYaz(dil, y.tarih))}</time><span>${esc(t.dk.replace('{n}', dakika(v)))}</span></p>
  <h2>${esc(v.h1)}</h2>
  <p class="bl-ozet">${esc(v.ozet)}</p>
  <span class="bl-oku">${esc(t.oku)}${okMetin}</span>
</a></li>`;
}

function liste(ctx, dil) {
  const { esc } = ctx;
  const t = T[dil];
  const yazilar = ctx.BLOG.filter(y => y[dil]);
  const govde = `
<section class="aa-sb">
  <div class="aa-sb-ic">
    <nav class="aa-yol" aria-label="breadcrumb"><a href="./">${esc(t.anasayfa)}</a><span>/</span><span aria-current="page">${esc(t.blog)}</span></nav>
    <h1>${esc(t.h1)}</h1>
    <p class="bl-giris">${esc(t.giris)}</p>
  </div>
</section>
<section class="bl">
  ${yazilar.length ? `<ul class="bl-liste">${yazilar.map(y => kart(ctx, dil, y)).join('')}</ul>` : `<p class="bl-bos">${esc(t.bos)}</p>`}
</section>`;
  return { baslik: t.baslik, aciklama: t.aciklama, govde };
}

function yazi(ctx, dil, y) {
  const { esc, href, site, wa, IK, i18n, A } = ctx;
  const t = T[dil], v = y[dil];
  const S = site.sayfalar;
  const k = site.kategoriler.find(x => x.id === y.kategori);
  const ilgili = ctx.BLOG.filter(x => x.id !== y.id && x[dil]).slice(0, 3);
  const katLinkler = site.kategoriler.filter(x => x.id !== 'yeni').map(x => `<li><a href="${href(dil, x[dil].slug)}">${esc(x[dil].ad)}</a></li>`).join('');
  const sss = v.sss && v.sss.length ? `
  <section class="bl-sss">
    <h2>${esc(t.sss)}</h2>
    ${v.sss.map(([s, c]) => `<div class="bl-soru"><h3>${esc(s)}</h3><p>${esc(c)}</p></div>`).join('')}
  </section>` : '';
  const govde = `
<section class="aa-sb bl-sb">
  <div class="aa-sb-ic">
    <nav class="aa-yol" aria-label="breadcrumb"><a href="./">${esc(t.anasayfa)}</a><span>/</span><a href="${href(dil, S.blog[dil].slug)}">${esc(t.blog)}</a><span>/</span><span aria-current="page">${esc(v.h1)}</span></nav>
    <h1>${esc(v.h1)}</h1>
    <p class="bl-meta"><span>${esc(t.yazar)}</span><time datetime="${y.tarih}">${esc(tarihYaz(dil, y.tarih))}</time>${y.guncelleme && y.guncelleme !== y.tarih ? `<span>${esc(t.guncel)}: <time datetime="${y.guncelleme}">${esc(tarihYaz(dil, y.guncelleme))}</time></span>` : ''}<span>${esc(t.dk.replace('{n}', dakika(v)))}</span></p>
  </div>
</section>
<div class="bl-yazi">
  <article class="bl-icerik">
    ${y.kapak ? `<figure class="bl-kapak bl-kapak-buyuk">${kapak(ctx, dil, y, true)}</figure>` : ''}
    <p class="bl-ozet-ust">${esc(v.ozet)}</p>
    <div class="yz-govde">${govdeHtml(ctx, dil, v.govde)}</div>
    ${sss}
  </article>
  <aside class="bl-yan">
    <div class="bl-wp">
      <p class="bl-wp-baslik">${esc(t.kartBaslik)}</p>
      <p>${esc(t.kartMetin)}</p>
      <a class="aa-wp-btn aa-genis" href="${wa(i18n[dil].wpMesaj)}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="blog">${IK.wp}<span>${esc(t.kartWp)}</span></a>
    </div>
    <nav class="bl-kat" aria-label="${esc(t.kategoriler)}"><p class="bl-wp-baslik">${esc(t.kategoriler)}</p><ul>${katLinkler}</ul></nav>
  </aside>
</div>
${ilgili.length ? `<section class="bl bl-ilgili"><h2>${esc(t.ilgili)}</h2><ul class="bl-liste">${ilgili.map(x => kart(ctx, dil, x)).join('')}</ul></section>` : ''}`;
  const taban = ctx.tabanUrl;
  const url = taban + (dil === 'tr' ? '' : dil + '/') + v.slug;
  const sema = [{
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: v.h1, description: v.aciklama, inLanguage: dil,
    datePublished: y.tarih, dateModified: y.guncelleme || y.tarih,
    mainEntityOfPage: url, url,
    image: taban + (y.kapak || 'assets/img/logo.png'),
    author: { '@type': 'Organization', name: A.marka, url: taban },
    publisher: { '@type': 'Organization', name: A.marka, logo: { '@type': 'ImageObject', url: taban + 'assets/img/logo.png' } },
    about: k ? k[dil].ad : undefined
  }];
  if (v.sss && v.sss.length) sema.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: v.sss.map(([s, c]) => ({ '@type': 'Question', name: s, acceptedAnswer: { '@type': 'Answer', text: c } })) });
  const ek = sema.map(s => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`).join('\n') + `\n<meta property="og:type" content="article">`;
  return { baslik: v.baslik, aciklama: v.aciklama, govde, ek, gorsel: y.kapak || '' };
}

module.exports = { liste, yazi, kart, T };
