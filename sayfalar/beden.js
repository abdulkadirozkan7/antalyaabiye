const fs = require('fs');
const path = require('path');

const T = {
  tr: {
    baslik: 'Abiye Beden Tablosu | Antalya Abiye',
    aciklama: 'Antalya Abiye beden tablosu: göğüs, bel ve kalça ölçünü gir, sana uygun abiye bedenini hemen gör. Emin olamazsan ölçülerini WhatsApp\'tan gönder.',
    anasayfa: 'Ana Sayfa',
    h1: 'Beden Tablosu',
    giris: 'Ölçülerini gir, sana uygun bedeni hemen görelim. Emin olamazsan ölçülerini tek tıkla WhatsApp\'tan gönder, birlikte netleştirelim.',
    figurNot: 'Ölçü aldığın yer figürde işaretlenir.',
    hesapBaslik: 'Bedenini Bul',
    hesapAlt: 'Santimetre olarak yaz, gerisini biz hesaplayalım.',
    gogus: 'Göğüs', bel: 'Bel', kalca: 'Kalça', boy: 'Boy',
    istege: 'isteğe bağlı',
    sonucBos: 'Ölçülerini girdiğinde önerimiz burada görünecek.',
    sonuc: 'Sana önerimiz',
    bedenEk: 'beden',
    ustunde: 'Ölçülerin tablomuzun üstünde kalıyor. Büyük beden modellerimiz için WhatsApp\'tan yaz, sana uygun olanları gönderelim.',
    farkli: 'Ölçülerin farklı bedenlere denk geliyor. Kalıp modele göre değişir, en doğrusu WhatsApp\'tan sormak.',
    wpBtn: 'Ölçülerimle WhatsApp\'tan Sor',
    wpMesaj: 'Merhaba, beden tablosundan yazıyorum.\nÖlçülerim: {olculer}\nÖnerilen beden: {beden}\nBana uygun modelleri gösterebilir misiniz?',
    wpMesajBos: 'Merhaba, beden seçimi konusunda yardım almak istiyorum.',
    nasilBaslik: 'Ölçü Nasıl Alınır?',
    adimlar: {
      gogus: 'Mezurayı göğsün en dolgun yerinden, sırttan dolaşacak şekilde yere paralel tut.',
      bel: 'Belin en ince yerinden, göbeğin biraz üstünden ölç. Nefesini tutma, mezurayı sıkma.',
      kalca: 'Ayakların bitişikken kalçanın en geniş yerinden ölç.',
      boy: 'Çıplak ayakla, başının tepesinden yere kadar ölç. Etek boyu için giyeceğin topuğu da hesaba kat.'
    },
    tabloBaslik: 'Kadın Abiye Beden Tablosu',
    tabloBeden: 'Beden',
    tabloNot: 'Tablo genel bir rehberdir, kalıp modele göre değişebilir. İki beden arasında kalırsan büyük olanı seç; daraltmak genişletmekten kolaydır.',
    ipucuBaslik: 'Küçük İpuçları',
    ipuclari: [
      'Ölçüyü üzerinde ince bir kıyafetle al, kalın kazak sonucu şaşırtır.',
      'Mezurayı tenine yapıştırma, bir parmak pay bırak.',
      'Tesettür ve prenses modellerde kalıp farklı olabilir, ölçünü yazıp bize sor.',
      'Mağazamıza gelirsen modelleri üzerinde deneyebilirsin.'
    ]
  },
  en: {
    baslik: 'Evening Dress Size Guide | Antalya Abiye',
    aciklama: 'Antalya Abiye size guide: enter your bust, waist and hip measurements and see the right evening dress size. Not sure? Send your measurements on WhatsApp.',
    anasayfa: 'Home',
    h1: 'Size Guide',
    giris: 'Enter your measurements and we will show the size that fits you. Not sure? Send them to us on WhatsApp in one tap and we will check together.',
    figurNot: 'The figure highlights where each measurement is taken.',
    hesapBaslik: 'Find Your Size',
    hesapAlt: 'Type in centimetres, we will do the rest.',
    gogus: 'Bust', bel: 'Waist', kalca: 'Hips', boy: 'Height',
    istege: 'optional',
    sonucBos: 'Your suggested size will appear here once you enter your measurements.',
    sonuc: 'Our suggestion',
    bedenEk: 'size',
    ustunde: 'Your measurements are above our chart. Message us on WhatsApp and we will send you plus size styles that fit.',
    farkli: 'Your measurements point to different sizes. Fit varies by style, so the best is to ask us on WhatsApp.',
    wpBtn: 'Ask On WhatsApp With My Measurements',
    wpMesaj: 'Hello, I am writing from your size guide.\nMy measurements: {olculer}\nSuggested size: {beden}\nCould you show me styles that would fit me?',
    wpMesajBos: 'Hello, I would like some help choosing my size.',
    nasilBaslik: 'How To Measure',
    adimlar: {
      gogus: 'Wrap the tape around the fullest part of your bust, keeping it level across your back.',
      bel: 'Measure the narrowest part of your waist, just above the belly button. Breathe normally and do not pull tight.',
      kalca: 'With your feet together, measure around the widest part of your hips.',
      boy: 'Barefoot, measure from the top of your head to the floor. Allow for the heels you will wear.'
    },
    tabloBaslik: 'Women\'s Evening Dress Size Chart',
    tabloBeden: 'Size (TR)',
    tabloNot: 'This chart is a general guide and fit varies by style. If you are between two sizes, choose the larger one; taking in is easier than letting out.',
    ipucuBaslik: 'Quick Tips',
    ipuclari: [
      'Measure over thin clothing, a thick jumper will throw the numbers off.',
      'Keep the tape snug but not tight, leave a finger of room.',
      'Hijab and princess styles can be cut differently, send us your measurements and ask.',
      'Visit our store in Antalya to try the dresses on.'
    ]
  },
  ru: {
    baslik: 'Таблица Размеров Вечерних Платьев | Antalya Abiye',
    aciklama: 'Таблица размеров Antalya Abiye: введите обхват груди, талии и бёдер и узнайте свой размер вечернего платья. Сомневаетесь? Отправьте мерки в WhatsApp.',
    anasayfa: 'Главная',
    h1: 'Таблица Размеров',
    giris: 'Введите свои мерки, и мы сразу покажем подходящий размер. Сомневаетесь? Отправьте их нам в WhatsApp одним касанием, уточним вместе.',
    figurNot: 'На фигуре отмечено, где снимается каждая мерка.',
    hesapBaslik: 'Подберите Размер',
    hesapAlt: 'Укажите мерки в сантиметрах, остальное посчитаем мы.',
    gogus: 'Грудь', bel: 'Талия', kalca: 'Бёдра', boy: 'Рост',
    istege: 'по желанию',
    sonucBos: 'Здесь появится наша рекомендация, когда вы введёте мерки.',
    sonuc: 'Рекомендуем',
    bedenEk: 'размер',
    ustunde: 'Ваши мерки больше нашей таблицы. Напишите нам в WhatsApp, и мы пришлём подходящие модели больших размеров.',
    farkli: 'Ваши мерки соответствуют разным размерам. Посадка зависит от модели, лучше уточнить в WhatsApp.',
    wpBtn: 'Спросить В WhatsApp С Моими Мерками',
    wpMesaj: 'Здравствуйте, пишу из таблицы размеров.\nМои мерки: {olculer}\nРекомендованный размер: {beden}\nПокажете подходящие мне модели?',
    wpMesajBos: 'Здравствуйте, хочу получить помощь с выбором размера.',
    nasilBaslik: 'Как Снять Мерки',
    adimlar: {
      gogus: 'Проведите ленту по самым выступающим точкам груди, параллельно полу по спине.',
      bel: 'Измерьте самую узкую часть талии, чуть выше пупка. Дышите спокойно и не затягивайте ленту.',
      kalca: 'Поставив ноги вместе, измерьте самую широкую часть бёдер.',
      boy: 'Без обуви измерьте рост от макушки до пола. Учитывайте высоту каблука.'
    },
    tabloBaslik: 'Таблица Размеров Женских Вечерних Платьев',
    tabloBeden: 'Размер (TR)',
    tabloNot: 'Таблица носит общий характер, посадка зависит от модели. Если вы между двумя размерами, выбирайте больший: ушить проще, чем расширить.',
    ipucuBaslik: 'Полезные Советы',
    ipuclari: [
      'Снимайте мерки поверх тонкой одежды, толстый свитер исказит результат.',
      'Не затягивайте ленту, оставьте запас в палец.',
      'Закрытые модели и платья принцессы могут иметь другой крой, пришлите мерки и спросите нас.',
      'Приходите в наш магазин в Анталье, чтобы примерить платья.'
    ]
  }
};

function rastgele(tohum) {
  let s = tohum;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function noktalar() {
  const r = rastgele(7);
  const renk = ['#7a49c9', '#d52878', '#fd8c2c', '#f2559a', '#ffb347'];
  let out = '';
  for (let i = 0; i < 170; i++) {
    const y = 520 + Math.pow(r(), 0.7) * 92;
    const yay = 136 + (y - 520) * 0.55;
    const x = 170 + (r() * 2 - 1) * yay;
    const rr = (0.8 + r() * 1.9).toFixed(2);
    const op = (0.35 + r() * 0.6).toFixed(2);
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr}" fill="${renk[i % renk.length]}" opacity="${op}"/>`;
  }
  for (let i = 0; i < 60; i++) {
    const y = 420 + r() * 120;
    const yay = 70 + (y - 284) * 0.24;
    const x = 170 + (r() * 2 - 1) * yay;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.6 + r()).toFixed(2)}" fill="#fff" opacity="${(0.35 + r() * 0.5).toFixed(2)}"/>`;
  }
  return out;
}

function halka(id, y, rx, ry, etiket) {
  const x1 = 170 - rx, x2 = 170 + rx;
  return `<g class="bd-halka" data-olcu="${id}">
    <path class="bd-arka" d="M${x1} ${y} A${rx} ${ry} 0 0 1 ${x2} ${y}"/>
    <path class="bd-on" d="M${x1} ${y} A${rx} ${ry} 0 0 0 ${x2} ${y}"/>
    <path class="bd-kilavuz" d="M${x2 + 2} ${y} H262"/>
    <circle class="bd-uc" cx="${x2}" cy="${y}" r="3"/>
    <text x="268" y="${y - 2}" class="bd-etiket">${etiket}</text>
    <text x="268" y="${y + 15}" class="bd-deger" data-deger="${id}">— cm</text>
  </g>`;
}

function figur(t) {
  return `<svg class="bd-svg" viewBox="0 0 340 620" role="img" aria-label="${t.figurNot}">
  <defs>
    <linearGradient id="bd-ten" x1="0" x2="1"><stop offset="0" stop-color="#dcc7d3"/><stop offset=".42" stop-color="#fbf5f8"/><stop offset=".62" stop-color="#f3e7ee"/><stop offset="1" stop-color="#cfb8c6"/></linearGradient>
    <linearGradient id="bd-elbise" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a49c9"/><stop offset=".42" stop-color="#c22d86"/><stop offset=".75" stop-color="#e5506a"/><stop offset="1" stop-color="#fd8c2c"/></linearGradient>
    <linearGradient id="bd-golge" x1="0" x2="1"><stop offset="0" stop-color="#1d0b26" stop-opacity=".42"/><stop offset=".3" stop-color="#1d0b26" stop-opacity="0"/><stop offset=".62" stop-color="#1d0b26" stop-opacity="0"/><stop offset="1" stop-color="#1d0b26" stop-opacity=".48"/></linearGradient>
    <radialGradient id="bd-parlak" cx=".4" cy=".22" r=".55"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <radialGradient id="bd-zemin"><stop offset="0" stop-color="#24122b" stop-opacity=".22"/><stop offset="1" stop-color="#24122b" stop-opacity="0"/></radialGradient>
    <linearGradient id="bd-kivrim" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>
  <ellipse cx="170" cy="596" rx="156" ry="14" fill="url(#bd-zemin)"/>
  <g class="bd-boy" data-olcu="boy">
    <path d="M18 40 V592 M10 40 H26 M10 592 H26"/>
    <text x="0" y="0" transform="translate(36 330) rotate(-90)" class="bd-etiket">${t.boy}</text>
    <text x="0" y="0" transform="translate(52 330) rotate(-90)" class="bd-deger" data-deger="boy">— cm</text>
  </g>
  <path fill="url(#bd-ten)" d="M116 126 C104 140 100 176 104 214 C106 240 104 270 100 296 C99 304 108 306 109 298 C113 272 116 244 116 218 C116 188 118 160 124 140 Z"/>
  <path fill="url(#bd-ten)" d="M224 126 C236 140 240 176 236 214 C234 240 236 270 240 296 C241 304 232 306 231 298 C227 272 224 244 224 218 C224 188 222 160 216 140 Z"/>
  <path fill="url(#bd-ten)" d="M160 92 L180 92 L182 114 L158 114 Z"/>
  <path fill="url(#bd-ten)" d="M160 108 C146 112 124 114 116 124 C108 134 112 152 118 166 C122 184 132 206 136 224 C138 244 120 262 118 286 L222 286 C220 262 202 244 204 224 C208 206 218 184 222 166 C228 152 232 134 224 124 C216 114 194 112 180 108 Z"/>
  <ellipse cx="170" cy="70" rx="21" ry="26" fill="url(#bd-ten)"/>
  <path fill="#3a1d4a" d="M149 70 C146 46 192 38 192 66 C186 54 162 50 149 70 Z"/>
  <circle cx="184" cy="44" r="12" fill="#3a1d4a"/>
  <g class="bd-elbise">
    <path id="bd-govde" fill="url(#bd-elbise)" d="M118 146 C126 140 150 150 170 150 C190 150 214 140 222 146 C224 160 220 176 216 190 C210 206 204 214 204 224 C204 240 220 258 224 284 C240 370 272 470 306 584 C250 598 90 598 34 584 C68 470 100 370 116 284 C120 258 136 240 136 224 C136 214 130 206 124 190 C120 176 116 160 118 146 Z"/>
    <path fill="url(#bd-golge)" d="M118 146 C126 140 150 150 170 150 C190 150 214 140 222 146 C224 160 220 176 216 190 C210 206 204 214 204 224 C204 240 220 258 224 284 C240 370 272 470 306 584 C250 598 90 598 34 584 C68 470 100 370 116 284 C120 258 136 240 136 224 C136 214 130 206 124 190 C120 176 116 160 118 146 Z"/>
    <path fill="url(#bd-parlak)" d="M118 146 C126 140 150 150 170 150 C190 150 214 140 222 146 C224 160 220 176 216 190 C210 206 204 214 204 224 C204 240 220 258 224 284 C240 370 272 470 306 584 C250 598 90 598 34 584 C68 470 100 370 116 284 C120 258 136 240 136 224 C136 214 130 206 124 190 C120 176 116 160 118 146 Z"/>
    <path fill="url(#bd-kivrim)" d="M150 300 C140 400 118 500 104 590 L126 592 C134 500 152 400 158 300 Z"/>
    <path fill="url(#bd-kivrim)" d="M190 300 C204 400 228 500 244 590 L222 592 C214 500 196 400 184 300 Z"/>
    <path fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1" d="M136 224 C150 230 190 230 204 224"/>
    ${noktalar()}
  </g>
  ${halka('gogus', 168, 53, 10, t.gogus)}
  ${halka('bel', 224, 35, 7, t.bel)}
  ${halka('kalca', 286, 56, 11, t.kalca)}
</svg>`;
}

module.exports = function (ctx, dil) {
  const { esc, href, site, A, IK, wa } = ctx;
  const t = T[dil];
  const veri = JSON.parse(fs.readFileSync(path.join(ctx.ROOT, 'data/beden.json'), 'utf8'));
  const OLCU = ['gogus', 'bel', 'kalca', 'boy'];
  const girdiler = OLCU.map(o => `<label class="bd-girdi" data-olcu="${o}">
        <span>${esc(t[o])}${o === 'boy' ? ` <i>${esc(t.istege)}</i>` : ''}</span>
        <span class="bd-kutu"><input type="number" inputmode="decimal" min="40" max="${o === 'boy' ? 210 : 170}" step="0.5" name="${o}" placeholder="${o === 'boy' ? '165' : o === 'gogus' ? '92' : o === 'bel' ? '74' : '100'}"><b>cm</b></span>
      </label>`).join('');
  const adimlar = OLCU.map((o, i) => `<li data-olcu="${o}"><b>${String(i + 1).padStart(2, '0')}</b><div><h3>${esc(t[o])}</h3><p>${esc(t.adimlar[o])}</p></div></li>`).join('');
  const satirlar = veri.bedenler.map(b => `<tr data-beden="${esc(b.beden)}"><th scope="row">${esc(b.beden)}</th><td>${b.gogus}</td><td>${b.bel}</td><td>${b.kalca}</td></tr>`).join('');
  const js = {
    bedenler: veri.bedenler,
    wa: A.whatsapp,
    t: { gogus: t.gogus, bel: t.bel, kalca: t.kalca, boy: t.boy, sonucBos: t.sonucBos, sonuc: t.sonuc, bedenEk: t.bedenEk, ustunde: t.ustunde, farkli: t.farkli, wpMesaj: t.wpMesaj, wpMesajBos: t.wpMesajBos }
  };
  const govde = `
<section class="aa-sb">
  <div class="aa-sb-ic">
    <nav class="aa-yol" aria-label="breadcrumb"><a href="./">${esc(t.anasayfa)}</a><span>/</span><span aria-current="page">${esc(t.h1)}</span></nav>
    <h1>${esc(t.h1)}</h1>
    <p>${esc(t.giris)}</p>
  </div>
</section>
<section class="bd">
  <div class="bd-izgara">
    <figure class="bd-figur">
      <div class="bd-sahne"><div class="bd-kart">${figur(t)}</div></div>
      <figcaption>${esc(t.figurNot)}</figcaption>
    </figure>
    <div class="bd-sag">
      <form class="bd-hesap" id="bd-hesap" novalidate>
        <h2>${esc(t.hesapBaslik)}</h2>
        <p class="bd-alt">${esc(t.hesapAlt)}</p>
        <div class="bd-girdiler">${girdiler}</div>
        <div class="bd-sonuc" id="bd-sonuc" aria-live="polite"><p>${esc(t.sonucBos)}</p></div>
        <a class="aa-wp-btn aa-genis bd-wp" id="bd-wp" href="${wa(t.wpMesajBos)}" target="_blank" rel="noopener" data-olay="whatsapp_tikla" data-konum="beden_tablosu">${IK.wp}<span>${esc(t.wpBtn)}</span></a>
      </form>
      <div class="bd-blok">
        <h2>${esc(t.nasilBaslik)}</h2>
        <ol class="bd-adimlar">${adimlar}</ol>
      </div>
      <div class="bd-blok">
        <h2>${esc(t.tabloBaslik)}</h2>
        <div class="bd-tablo-sar">
          <table class="bd-tablo">
            <thead><tr><th scope="col">${esc(t.tabloBeden)}</th><th scope="col" data-olcu="gogus">${esc(t.gogus)} <small>cm</small></th><th scope="col" data-olcu="bel">${esc(t.bel)} <small>cm</small></th><th scope="col" data-olcu="kalca">${esc(t.kalca)} <small>cm</small></th></tr></thead>
            <tbody>${satirlar}</tbody>
          </table>
        </div>
        <p class="bd-not">${esc(t.tabloNot)}</p>
      </div>
      <div class="bd-blok bd-ipucu">
        <h2>${esc(t.ipucuBaslik)}</h2>
        <ul>${t.ipuclari.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      </div>
    </div>
  </div>
</section>
<script type="application/json" id="bd-veri">${JSON.stringify(js).replace(/</g, '\\u003c')}</script>`;
  return { baslik: t.baslik, aciklama: t.aciklama, govde, js: ['beden.js'] };
};
