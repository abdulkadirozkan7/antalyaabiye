const PALET = {
  mor: ['#5b3aa8', '#8a4fd0', '#c58be8'],
  pembe: ['#a3236a', '#d52878', '#f59ac3'],
  turuncu: ['#c2410c', '#f2683f', '#fdba74'],
  bordo: ['#5e0b2b', '#9b1b4a', '#d0507f'],
  lila: ['#6d5bb8', '#a99be6', '#e4dcfb'],
  zumrut: ['#0b4f45', '#13806e', '#6fd1bd'],
  gece: ['#1b1b4b', '#3b3f9e', '#8f94e6'],
  pudra: ['#b85b78', '#e8a0b6', '#fde1ea'],
  altin: ['#8a5a12', '#d29a2f', '#f6dc98']
};

const MODEL = {
  prenses: { ust: 'kayik', bel: 26, kalca: 58, diz: 74, etek: 88, boy: 332, kol: false, pelerin: false },
  nisan: { ust: 'kayik', bel: 25, kalca: 36, diz: 26, etek: 74, boy: 334, kol: false, pelerin: false, balik: true },
  tesettur: { ust: 'kapali', bel: 30, kalca: 46, diz: 60, etek: 76, boy: 336, kol: true, pelerin: false },
  uzun: { ust: 'kalp', bel: 25, kalca: 38, diz: 44, etek: 56, boy: 334, kol: false, pelerin: false },
  kisa: { ust: 'kalp', bel: 25, kalca: 44, diz: 56, etek: 60, boy: 236, kol: false, pelerin: false },
  'buyuk-beden': { ust: 'kayik', bel: 36, kalca: 56, diz: 64, etek: 78, boy: 334, kol: true, kisaKol: true, pelerin: false },
  kina: { ust: 'kapali', bel: 28, kalca: 52, diz: 70, etek: 86, boy: 334, kol: true, pelerin: true },
  mezuniyet: { ust: 'tek', bel: 25, kalca: 36, diz: 40, etek: 62, boy: 334, kol: false, pelerin: false },
  firsat: { ust: 'kalp', bel: 26, kalca: 48, diz: 62, etek: 80, boy: 334, kol: false, pelerin: false },
  yeni: { ust: 'kayik', bel: 25, kalca: 44, diz: 58, etek: 78, boy: 334, kol: false, pelerin: false }
};

function rastgele(t) {
  let s = t;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function egri(nok) {
  let d = `M${nok[0][0]} ${nok[0][1]}`;
  for (let i = 0; i < nok.length - 1; i++) {
    const p0 = nok[i - 1] || nok[i], p1 = nok[i], p2 = nok[i + 1], p3 = nok[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

function elbise(model, renk, id) {
  const m = MODEL[model] || MODEL.yeni;
  const p = PALET[renk] || PALET.pembe;
  const r = rastgele(model.length * 97 + renk.length * 13);
  const X = 100;
  const ustY = m.ust === 'kapali' ? 30 : 64;
  const omuz = m.ust === 'kapali' ? 34 : 33;
  const sol = m.balik
    ? [[X - omuz, ustY], [X - 34, 82], [X - m.bel, 124], [X - m.kalca, 168], [X - m.diz, 248], [X - m.etek + 14, 300], [X - m.etek, m.boy]]
    : [[X - omuz, ustY], [X - 34, 82], [X - m.bel, 124], [X - m.kalca, 170], [X - m.diz, 240], [X - m.etek, m.boy]];
  const sag = sol.map(([x, y]) => [2 * X - x, y]).reverse();
  let ust;
  if (m.ust === 'kapali') ust = `C${X + 18} 24 ${X - 18} 24 ${X - omuz} ${ustY}`;
  else if (m.ust === 'kalp') ust = `C${X + 20} ${ustY - 8} ${X + 6} ${ustY - 6} ${X} ${ustY + 4} C${X - 6} ${ustY - 6} ${X - 20} ${ustY - 8} ${X - omuz} ${ustY}`;
  else if (m.ust === 'tek') ust = `L${X + 18} 40 C${X} 52 ${X - 20} 62 ${X - omuz} ${ustY}`;
  else ust = `C${X + 16} ${ustY - 6} ${X - 16} ${ustY - 6} ${X - omuz} ${ustY}`;
  const etekAlt = `C${X - m.etek * 0.6} ${m.boy + 12} ${X + m.etek * 0.6} ${m.boy + 12} ${X + m.etek} ${m.boy}`;
  const solD = egri(sol);
  const sagD = egri(sag).replace(/^M[^C]+/, '');
  const govde = `${solD} ${etekAlt} ${sagD} ${ust} Z`;
  let noktalar = '';
  const ren = [p[0], p[1], p[2], '#fff'];
  for (let i = 0; i < 70; i++) {
    const y = m.boy - 40 + Math.pow(r(), 0.6) * 58;
    const yay = m.etek * (0.55 + (y - m.boy + 40) / 90);
    const x = X + (r() * 2 - 1) * yay;
    noktalar += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.6 + r() * 1.5).toFixed(2)}" fill="${ren[i % 4]}" opacity="${(0.35 + r() * 0.6).toFixed(2)}"/>`;
  }
  const kollar = m.kol
    ? (m.kisaKol
      ? `<path fill="url(#${id}g)" d="M${X - 34} 46 C${X - 46} 52 ${X - 52} 70 ${X - 54} 92 L${X - 40} 96 C${X - 38} 78 ${X - 36} 64 ${X - 30} 54 Z"/><path fill="url(#${id}g)" d="M${X + 34} 46 C${X + 46} 52 ${X + 52} 70 ${X + 54} 92 L${X + 40} 96 C${X + 38} 78 ${X + 36} 64 ${X + 30} 54 Z"/>`
      : `<path fill="url(#${id}g)" d="M${X - 34} 40 C${X - 48} 52 ${X - 52} 110 ${X - 54} 180 C${X - 54} 188 ${X - 44} 190 ${X - 43} 182 C${X - 42} 120 ${X - 38} 76 ${X - 28} 56 Z"/><path fill="url(#${id}g)" d="M${X + 34} 40 C${X + 48} 52 ${X + 52} 110 ${X + 54} 180 C${X + 54} 188 ${X + 44} 190 ${X + 43} 182 C${X + 42} 120 ${X + 38} 76 ${X + 28} 56 Z"/>`)
    : '';
  const pelerin = m.pelerin
    ? `<path fill="#fff" opacity=".22" d="M${X - 30} 34 C${X - 70} 120 ${X - 92} 250 ${X - 96} ${m.boy - 6} C${X - 40} ${m.boy + 8} ${X + 40} ${m.boy + 8} ${X + 96} ${m.boy - 6} C${X + 92} 250 ${X + 70} 120 ${X + 30} 34 Z"/>`
    : '';
  const ten = m.ust === 'kapali' ? '' : `<path fill="url(#${id}t)" d="M${X - 8} 22 L${X + 8} 22 L${X + 10} 34 C${X + 22} 36 ${X + 34} 40 ${X + 36} 52 C${X + 38} 60 ${X + 36} 66 ${X + 34} 70 L${X - 34} 70 C${X - 36} 66 ${X - 38} 60 ${X - 36} 52 C${X - 34} 40 ${X - 22} 36 ${X - 10} 34 Z"/>`;
  return `<svg class="aa-elbise" viewBox="0 0 200 370" aria-hidden="true" focusable="false">
<defs>
<linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset=".55" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[2]}"/></linearGradient>
<linearGradient id="${id}s" x1="0" x2="1"><stop offset="0" stop-color="#140818" stop-opacity=".38"/><stop offset=".32" stop-color="#140818" stop-opacity="0"/><stop offset=".64" stop-color="#140818" stop-opacity="0"/><stop offset="1" stop-color="#140818" stop-opacity=".42"/></linearGradient>
<radialGradient id="${id}p" cx=".38" cy=".2" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<linearGradient id="${id}t" x1="0" x2="1"><stop offset="0" stop-color="#dcc7d3"/><stop offset=".45" stop-color="#fbf5f8"/><stop offset="1" stop-color="#cfb8c6"/></linearGradient>
<radialGradient id="${id}z"><stop offset="0" stop-color="#24122b" stop-opacity=".2"/><stop offset="1" stop-color="#24122b" stop-opacity="0"/></radialGradient>
</defs>
<ellipse cx="${X}" cy="${m.boy + 10}" rx="${m.etek + 20}" ry="9" fill="url(#${id}z)"/>
<ellipse cx="${X}" cy="14" rx="7" ry="2.6" fill="#cdb6c4"/>
<path fill="url(#${id}t)" d="M${X - 7} 14 L${X + 7} 14 L${X + 8} 26 L${X - 8} 26 Z"/>
${ten}
${pelerin}
${kollar}
<path fill="url(#${id}g)" d="${govde}"/>
<path fill="url(#${id}s)" d="${govde}"/>
<path fill="url(#${id}p)" d="${govde}"/>
<path fill="none" stroke="#fff" stroke-opacity=".35" d="M${X - m.bel} 124 C${X - 10} 130 ${X + 10} 130 ${X + m.bel} 124"/>
${noktalar}
</svg>`;
}

module.exports = { elbise, MODEL, PALET };
