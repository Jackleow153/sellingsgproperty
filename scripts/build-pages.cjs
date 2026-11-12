#!/usr/bin/env node
/*
 * Static page builder for sellingsgproperty.com (no dependencies; Node 18+).
 *
 *   node scripts/build-pages.cjs
 *
 * Sources of truth:
 *   - Projects:  the `const projects = [...]` array inside index.html
 *   - Articles:  data/articles.js
 *
 * Writes:
 *   - project/<slug>/index.html        one crawlable page per condo (hand-built pages are left alone)
 *   - new-launch-condos/index.html     hub page listing every project by launch year
 *   - insights/<slug>/index.html       one crawlable page per article
 *   - insights/index.html              article index
 *   - index.html                       static project cards + lightweight ARTICLES metadata (no bodies)
 *   - sitemap.xml, llms.txt
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://www.sellingsgproperty.com';
const AS_OF = process.env.AS_OF || '2026-11-11';            // data freshness date shown on pages
const AS_OF_LABEL = new Date(AS_OF + 'T00:00:00Z').toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

// Hand-built project pages that the builder must not overwrite (id -> slug)
const HANDBUILT = { 28: 'thomson-reserve-condo', 29: 'dunearn-house', 26: 'lentor-gardens-residences' };
// Projects whose data was re-verified line by line (Nov 2026): show overview text and unit-mix tables
const VERIFIED_DETAIL = new Set([26, 27, 28, 29, 30, 31, 32, 33]);
const YEAR_TAB = { '2024': 'Launched in 2024', '2025': 'Launched in 2025', '2026': 'Launched in 2026', '2027': 'Upcoming 2027' };
const ARTICLE_ALIASES = { 'dunearn-vs-fourth-avenue': 'dunearn-vs-fourth-avenue-2026' };

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, s) => { const p = path.join(ROOT, f); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const clip = (s, n) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)).replace(/[,;:.\s]+$/, '') + '…');
const slugify = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const money = n => (n ? (n >= 1e6 ? '$' + (n / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M' : '$' + n.toLocaleString('en-US')) : null);
const jsonLd = o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

// ---------- load data ----------
let indexHtml = read('index.html');
// The homepage app script (projects data, card renderer, router, ROUTE_META, ARTICLES meta) lives in
// assets/app.js so the homepage and its pre-rendered route copies share one cached file.
let appJs = read('assets/app.js');
function extractProjects(html) {
  const a = html.indexOf('const projects = [');
  const b = html.indexOf('function getDistrictGradient', a);
  if (a < 0 || b < 0) throw new Error('projects array not found in assets/app.js');
  // eslint-disable-next-line no-new-func
  return new Function(html.slice(a, b) + '\nreturn projects;')();
}
const projects = extractProjects(appJs);
const ROUTE_META = (() => {
  const a = appJs.indexOf('/* BUILD:ROUTE-META START */'), b = appJs.indexOf('/* BUILD:ROUTE-META END */');
  if (a < 0 || b < 0) throw new Error('BUILD:ROUTE-META markers missing in assets/app.js');
  // eslint-disable-next-line no-new-func
  return new Function(appJs.slice(a, b) + '\nreturn ROUTE_META;')();
})();
function setHead(html, meta) {
  const url = SITE + meta.path, t = esc(meta.title), d = esc(meta.desc);
  const rep = (re, val) => { if (!re.test(html)) throw new Error('head tag not found: ' + re); html = html.replace(re, val); };
  rep(/<title>[^<]*<\/title>/, `<title>${t}</title>`);
  rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${d}">`);
  rep(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  rep(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${t}">`);
  rep(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${d}">`);
  rep(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
  rep(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${t}">`);
  rep(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${d}">`);
  return html;
}
delete require.cache[require.resolve(path.join(ROOT, 'data/articles.js'))];
const ARTICLES = require(path.join(ROOT, 'data/articles.js'));

const cssFile = read('assets/site.css');
const CSS_V = crypto.createHash('sha1').update(cssFile).digest('hex').slice(0, 8);

const projectSlug = p => HANDBUILT[p.id] || slugify(p.name);
const projectPath = p => `/project/${projectSlug(p)}/`;
const articleSlug = id => id.replace(/^post-/, '');
const articlePath = id => `/insights/${articleSlug(id)}/`;   // trailing slash: Netlify serves /insights/<slug>/index.html there without a redirect
const districtOf = p => (p.location.match(/D(\d+)/) || [])[1] || '';
const segmentOf = p => ({ ccr: 'CCR', rcr: 'RCR', ocr: 'OCR' }[p.district] || '');
const placeOf = p => p.location.replace(/,\s*D\d+\s*$/, '');
const isEC = p => /Executive/i.test(p.type);
const isUpcoming = p => p.year === '2027';
const shortName = p => p.name.replace(/\s*\(EC\)\s*$/, '');

function parseDate(d) {
  const t = Date.parse(String(d || '').replace(/(\d+) (\w{3})\w* (\d{4})/, '$1 $2 $3'));
  return isNaN(t) ? null : new Date(t);
}
const isoDate = d => { const x = parseDate(d); return x ? new Date(Date.UTC(x.getFullYear(), x.getMonth(), x.getDate())).toISOString().slice(0, 10) : AS_OF; };
function getExcerpt(body, n = 160) {
  const lead = (body || '').match(/<p[^>]*>(.*?)<\/p>/s);
  return lead ? clip(strip(lead[1]), n) : '';
}

// ---------- shared layout ----------
const PERSON = {
  '@type': 'Person', '@id': SITE + '/#jackleow', name: 'Jack Leow', jobTitle: 'Property Agent (CEA Reg. No. R074023I)',
  worksFor: { '@type': 'RealEstateAgent', name: 'PropNex Realty Pte Ltd', identifier: 'L3008022J' }, url: SITE + '/about'
};
function layout({ title, description, canonical, body, schema = [], ogImage, nav = '', ogType = 'website' }) {
  const og = ogImage || SITE + '/assets/og-default.png';
  const navLink = (href, label, key) => `<a href="${href}"${nav === key ? ' aria-current="page"' : ''}>${label}</a>`;
  return `<!DOCTYPE html>
<html lang="en-SG">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="SellingSgProperty">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0C1B2A">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/assets/icon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/hanken-grotesk-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/marcellus-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css?v=${CSS_V}">
${schema.map(jsonLd).join('\n')}
</head>
<body>
<header class="top"><div class="wrap">
<a class="brand" href="/">SellingSg<span>Property</span></a>
<nav class="nav" aria-label="Main">${navLink('/new-launch-condos/', 'New Launches', 'launches')}${navLink('/insights/', 'Insights', 'insights')}${navLink('/mortgage-calculator/', 'Mortgage Calculator', 'calc')}${navLink('/about/', 'About', 'about')}${navLink('/contact/', 'Contact', 'contact')}</nav>
<a class="btn" href="/contact/">Free 30-min consultation</a>
</div></header>
<div class="trust"><div class="wrap"><span><b>Jack Leow</b> · CEA Reg. No. R074023I</span><span>PropNex Realty Pte Ltd (L3008022J)</span><span>Data from URA, developers and published launch reports</span></div></div>
<main>
${body}
</main>
<footer><div class="wrap">
<div class="fl"><a href="/">Home</a><a href="/new-launch-condos/">New launch condos</a><a href="/insights/">Insights</a><a href="/mortgage-calculator/">Mortgage calculator</a><a href="/about/">About</a><a href="/contact/">Contact</a></div>
<p>sellingsgproperty.com is an educational and branding platform operated by CEA-licensed salespersons of PropNex Realty Pte Ltd. Jack Leow, CEA Reg. No. R074023I, PropNex Realty Pte Ltd (L3008022J).</p>
<p>This site is not the official website of any property developer and does not represent itself as an exclusive sales portal.</p>
<p>The information on this site is for general guidance only and does not constitute financial, legal or property investment advice. Figures are based on publicly available sources and may change; please verify with the developer's latest materials and seek professional advice before acting.</p>
<p>© ${AS_OF.slice(0, 4)} sellingsgproperty.com · Singapore</p>
</div></footer>
<div class="mbar"><a class="btn" href="/contact/">Free 30-min consultation</a></div>
</body>
</html>
`;
}
const crumbs = items => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map(([href, label], i) => `<li>${i === items.length - 1 ? `<span aria-current="page">${esc(label)}</span>` : `<a href="${href}">${esc(label)}</a>`}</li>`).join('')}</ol></nav>`;
const crumbSchema = items => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([href, label], i) => ({ '@type': 'ListItem', position: i + 1, name: label, item: SITE + href })) });

// ---------- project pages ----------
function launchedLine(p) {
  if (isUpcoming(p)) return `Expected launch: ${p.launchDate}.`;
  return `Launched: ${p.launchDate}.`;
}
function summary(p) {
  const kind = isEC(p) ? 'executive condominium (EC)' : (/mixed-use/i.test(p.type) ? 'mixed-use condominium' : 'private condominium');
  const tenure = /freehold/i.test(p.tenure) ? 'freehold' : (p.tenure.match(/(\d+)[- ]?(?:year|yr|LH)/i) ? p.tenure.match(/(\d+)/)[1] + '-year leasehold' : p.tenure);
  const parts = [`${shortName(p)} is a ${tenure} ${kind} at ${placeOf(p)} in District ${districtOf(p)} (${segmentOf(p)}), developed by ${p.developer.replace(/\s*\((?:entity|entities)[^)]*\)/i, '')}, with ${p.totalUnits.toLocaleString('en-US')} homes.`];
  if (isUpcoming(p)) parts.push(`It is expected to launch in ${p.launchShort ? p.launchShort.replace(/\s*\((?:est\.|reported|target|expected|announced|flagged)\)/, '') : '2027'}; prices have not been released.`);
  else {
    parts.push(`It launched on ${p.launchDate.replace(/\s*\(.*$/, '')}`
      + (p.avgPSF && VERIFIED_DETAIL.has(p.id) ? ` at an average of about $${p.avgPSF.toLocaleString('en-US')} psf.` : '.'));
  }
  if (p.top && !/^TBC/.test(p.top)) parts.push(`Expected completion (TOP): ${p.top}.`);
  if (p.distanceMRT && !/^To be confirmed/.test(p.distanceMRT)) parts.push(`Nearest MRT: ${p.distanceMRT}.`);
  return parts.join(' ');
}
function factRows(p) {
  const rows = [
    ['Developer', p.developer],
    ['Location', `${placeOf(p)} · District ${districtOf(p)} (${segmentOf(p)})`],
    ['Property type', p.type],
    ['Tenure', p.tenure],
    ['Total units', p.totalUnits.toLocaleString('en-US')],
    [isUpcoming(p) ? 'Expected launch' : 'Launch date', p.launchDate],
  ];
  if (!isUpcoming(p) && p.avgPSF) rows.push([VERIFIED_DETAIL.has(p.id) ? 'Average price at launch' : 'Average price (reported)', `$${p.avgPSF.toLocaleString('en-US')} psf`]);
  if (!isUpcoming(p) && p.startingPrice && VERIFIED_DETAIL.has(p.id)) rows.push(['Starting price (reported)', 'from ' + money(p.startingPrice)]);
  rows.push(['Expected TOP', p.top || 'TBC']);
  rows.push(['Nearest MRT', p.distanceMRT || p.mrt || 'To be confirmed']);
  rows.push(['Primary schools within 1 km', p.schools || 'To be confirmed']);
  if (p.siteArea && p.siteArea !== 'TBC') rows.push(['Site area', p.siteArea]);
  return rows;
}
function faqFor(p) {
  const n = shortName(p);
  const q = [
    [`Who is the developer of ${n}?`, `${n} is developed by ${p.developer}.`],
    [`Where is ${n} located?`, `${n} is at ${placeOf(p)}, District ${districtOf(p)}, in the ${segmentOf(p) === 'CCR' ? 'Core Central Region' : segmentOf(p) === 'RCR' ? 'Rest of Central Region' : 'Outside Central Region'} (${segmentOf(p)}). Nearest MRT: ${p.distanceMRT || p.mrt || 'to be confirmed'}.`],
    [`How many units does ${n} have?`, `${n} has ${p.totalUnits.toLocaleString('en-US')} homes${isUpcoming(p) ? ' (planned; final count may change)' : ''}.`],
    [isUpcoming(p) ? `When will ${n} launch?` : `When did ${n} launch?`, isUpcoming(p) ? `${p.launchDate}. Dates are not final until the developer announces the preview and booking day.` : `${n} launched on ${p.launchDate}.`],
    [`What is the tenure of ${n}?`, `${p.tenure}.`],
  ];
  if (p.top && !/^TBC/.test(p.top)) q.push([`When is ${n} expected to be completed?`, `Expected TOP: ${p.top}.`]);
  return q;
}
function related(p) {
  const same = projects.filter(x => x.id !== p.id && x.year === p.year);
  const near = projects.filter(x => x.id !== p.id && x.year !== p.year && districtOf(x) === districtOf(p));
  return [...near, ...same].slice(0, 6);
}
function projectPage(p) {
  const url = SITE + projectPath(p);
  const n = shortName(p);
  const title = isUpcoming(p)
    ? `${n}: 2027 Launch, Developer, Units & Land Price | D${districtOf(p)}`
    : `${n} ${isEC(p) ? 'EC' : 'Condo'}: Launch Price, Sales & Facts | D${districtOf(p)}`;
  const desc = clip(summary(p), 158);
  const bc = [['/', 'Home'], ['/new-launch-condos/', 'New Launch Condos'], [`/new-launch-condos/#y${p.year}`, YEAR_TAB[p.year]], [projectPath(p), n]];
  const img = p.image && p.image.startsWith('/') ? `<img class="hero-img" src="${p.image}" alt="Artist's impression of ${esc(n)}" width="1200" height="675" fetchpriority="high">` : '';
  const verified = VERIFIED_DETAIL.has(p.id);
  const mix = verified && p.unitMix && p.unitMix.length ? `
<h2>Unit mix and prices</h2>
<div class="tbl"><table><thead><tr><th>Unit type</th><th>Units</th><th>Size</th><th>PSF</th><th>Price</th></tr></thead><tbody>
${p.unitMix.map(u => `<tr><td>${esc(u.type)}</td><td>${esc(u.units)}</td><td>${esc(u.size)}</td><td>${esc(u.psfLabel || (u.psf ? '$' + u.psf.toLocaleString('en-US') : '—'))}</td><td>${esc(u.priceLabel || money(u.price) || '—')}</td></tr>`).join('\n')}
</tbody></table></div>
<p class="note">${esc(p.pricingNote || 'Indicative figures; check the developer\'s latest price list.')}</p>` : '';
  const overview = verified ? `<h2>Overview</h2><p>${esc(p.description)}</p>` : '';
  const faq = faqFor(p);
  const rel = related(p);
  const body = `<div class="wrap">
${crumbs(bc)}
<div class="grid"><article>
<div class="kicker">${esc(YEAR_TAB[p.year])} · ${esc(p.type)}</div>
<h1>${esc(p.name)}</h1>
<p class="sub">${esc(placeOf(p))} · District ${districtOf(p)} (${segmentOf(p)})</p>
<div class="badges"><span class="badge ${isUpcoming(p) ? 'up' : 'ok'}">${isUpcoming(p) ? 'Upcoming · ' + esc(p.launchShort || '2027') : 'Launched · ' + esc(p.launchDate.replace(/\s*\(.*$/, ''))}</span><span class="badge">${/freehold/i.test(p.tenure) ? 'Freehold' : esc(p.tenure.replace(/\s*\(.*$/, ''))}</span><span class="badge">${p.totalUnits.toLocaleString('en-US')} units</span></div>
${img}
<div class="answer"><p>${esc(summary(p))}</p></div>
<p class="asof">Data as of ${AS_OF_LABEL}. Sources: URA, developer announcements and published launch reports (EdgeProp, Stacked, 99.co, The Business Times).</p>
${overview}
<h2>Key facts</h2>
<table class="facts"><tbody>
${factRows(p).map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('\n')}
</tbody></table>
${mix}
<h2>Frequently asked questions</h2>
<div class="faq">${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}</div>
${p.id === 31 ? '<p>Independent guide with sources: <a href="https://the-one-chuan-grove.sg/">One Chuan Grove guide</a>.</p>' : ''}
<h2>Related new launches</h2>
<ul class="links">${rel.map(r => `<li><a href="${projectPath(r)}">${esc(r.name)}</a><span>D${districtOf(r)} · ${esc(YEAR_TAB[r.year])}</span></li>`).join('')}</ul>
<p><a href="/new-launch-condos/">See every new launch condo (2024–2027) →</a></p>
</article>
<aside class="side"><div class="card cta-card"><h3>Weighing up ${esc(n)}?</h3><p>Get an independent 30-minute review of price, alternatives and affordability before you commit. No obligation.</p><a class="btn" href="/contact/">Book a free consultation</a></div></aside>
</div></div>`;
  const schema = [
    { '@context': 'https://schema.org', '@type': 'WebPage', '@id': url + '#webpage', url, name: title, description: desc, dateModified: AS_OF, inLanguage: 'en-SG', isPartOf: { '@type': 'WebSite', name: 'SellingSgProperty', url: SITE + '/' }, author: PERSON, about: { '@id': url + '#place' } },
    { '@context': 'https://schema.org', '@type': 'ApartmentComplex', '@id': url + '#place', name: p.name, description: summary(p), url, numberOfAccommodationUnits: p.totalUnits, address: { '@type': 'PostalAddress', streetAddress: placeOf(p), addressLocality: 'Singapore', addressRegion: 'District ' + districtOf(p), addressCountry: 'SG' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    crumbSchema(bc),
  ];
  return layout({ title, description: desc, canonical: url, body, schema, nav: 'launches', ogImage: p.image && p.image.startsWith('/') ? SITE + p.image : undefined });
}

// ---------- hub ----------
function sortForHub(list, year) {
  return list.slice().sort((a, b) => year === '2027' ? (a.launchSort - b.launchSort || a.id - b.id) : (b.launchSort - a.launchSort || b.id - a.id));
}
function hubPage() {
  const url = SITE + '/new-launch-condos/';
  const by = y => sortForHub(projects.filter(p => p.year === y), y);
  const counts = Object.fromEntries(['2024', '2025', '2026', '2027'].map(y => [y, by(y).length]));
  const title = 'New Launch Condos Singapore 2026–2027: Full List & Launch Results';
  const desc = clip(`All ${projects.length} Singapore new launch condos and ECs we track: ${counts['2027']} upcoming 2027 launches and ${counts['2026']} launched in 2026, with developer, units, launch date and average psf. Updated ${AS_OF_LABEL}.`, 158);
  const section = y => {
    const list = by(y);
    const head = y === '2027'
      ? '<tr><th>Project</th><th>District</th><th>Developer</th><th>Units</th><th>Expected launch</th></tr>'
      : '<tr><th>Project</th><th>District</th><th>Launched</th><th>Units</th><th>Avg psf</th></tr>';
    const rows = list.map(p => y === '2027'
      ? `<tr><td><a href="${projectPath(p)}">${esc(p.name)}</a></td><td>D${districtOf(p)} ${segmentOf(p)}</td><td>${esc(p.developer.split(/\s*\(/)[0])}</td><td>${p.totalUnits.toLocaleString('en-US')}</td><td>${esc(p.launchShort || p.launchDate)}</td></tr>`
      : `<tr><td><a href="${projectPath(p)}">${esc(p.name)}</a></td><td>D${districtOf(p)} ${segmentOf(p)}</td><td>${esc(p.launchDate.replace(/\s*\(.*$/, ''))}</td><td>${p.totalUnits.toLocaleString('en-US')}</td><td>${p.avgPSF ? '$' + p.avgPSF.toLocaleString('en-US') : '—'}</td></tr>`).join('\n');
    return `<h2 id="y${y}">${YEAR_TAB[y]} (${list.length})</h2>
<div class="tbl"><table><thead>${head}</thead><tbody>
${rows}
</tbody></table></div>`;
  };
  const body = `<div class="wrap">
${crumbs([['/', 'Home'], ['/new-launch-condos/', 'New Launch Condos']])}
<div class="kicker">Updated ${AS_OF_LABEL}</div>
<h1>New Launch Condos in Singapore (2024–2027)</h1>
<div class="answer"><p>We track ${projects.length} Singapore new launch condos and ECs. ${counts['2027']} are expected to launch in 2027, ${counts['2026']} launched in 2026, ${counts['2025']} in 2025 and ${counts['2024']} in 2024. Each project page lists the developer, tenure, units, launch date, average price where published, expected TOP, nearest MRT and schools.</p></div>
<p class="asof">Upcoming launch dates come from developers where announced and from market reports otherwise; they are marked as estimates on each page. Average psf for launched projects is the developer-announced or reported launch average.</p>
<div class="tabs"><a href="#y2027">Upcoming 2027</a><a href="#y2026">Launched in 2026</a><a href="#y2025">Launched in 2025</a><a href="#y2024">Launched in 2024</a></div>
${['2027', '2026', '2025', '2024'].map(section).join('\n')}
<div class="card cta-card" style="margin-top:30px"><h2>Not sure which launch fits your budget?</h2><p>A free 30-minute session covers affordability (TDSR, CPF, cash), timing your HDB sale, and how each shortlisted launch compares on price and location.</p><a class="btn" href="/contact/">Book a free consultation</a></div>
</div>`;
  const schema = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', url, name: title, description: desc, dateModified: AS_OF, author: PERSON },
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Singapore new launch condos 2024–2027', numberOfItems: projects.length, itemListElement: ['2027', '2026', '2025', '2024'].flatMap(by).map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + projectPath(p), name: p.name })) },
    crumbSchema([['/', 'Home'], ['/new-launch-condos/', 'New Launch Condos']]),
  ];
  return layout({ title, description: desc, canonical: url, body, schema, nav: 'launches' });
}

// ---------- articles ----------
const sortedArticles = Object.entries(ARTICLES).sort((a, b) => (parseDate(b[1].date) || 0) - (parseDate(a[1].date) || 0));
function articleDescription(post) {
  const lead = (post.body || '').match(/<p><strong>([^<]{40,220})<\/strong>/);
  return clip(lead ? strip(lead[1]) : getExcerpt(post.body, 200), 158);
}
function prepareBody(html) {
  const toc = [];
  const used = new Set();
  let out = String(html || '')
    // Font Awesome is not loaded on static pages: replace the FAQ plus icon with a text glyph
    .replace(/<i class="[^"]*fa-plus[^"]*faq-icon[^"]*"><\/i>/g, '<span class="faq-icon" aria-hidden="true">+</span>')
    .replace(/<i class="fa-[^"]*"[^>]*><\/i>/g, '')
    // SPA-style links to articles -> real URLs
    .replace(/href="#insights\/([a-z0-9-]+)"/g, (m, s) => `href="/insights/${ARTICLE_ALIASES[s] || s}/"`)
    // bare /insights/<slug> links in article bodies -> trailing-slash URL (no 301 hop)
    .replace(/href="\/insights\/([a-z0-9-]+)"/g, (m, s) => `href="/insights/${ARTICLE_ALIASES[s] || s}/"`)
    .replace(/onclick="showArticle\('([^']+)'\)[^"]*"/g, (m, id) => `data-href="${articlePath(id)}"`);
  out = out.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (m, attrs, inner) => {
    const text = strip(inner);
    if (/class="[^"]*tldr/.test(attrs) || !text) return m;
    let id = (attrs.match(/id="([^"]+)"/) || [])[1];
    if (!id) { id = slugify(text).slice(0, 60) || 'section'; let k = 2; while (used.has(id)) id = id.replace(/-\d+$/, '') + '-' + k++; }
    used.add(id); toc.push([id, text]);
    return /id="/.test(attrs) ? m : `<h2${attrs} id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}
function articlePage(id, post) {
  const url = SITE + articlePath(id);
  const desc = articleDescription(post);
  const { html, toc } = prepareBody(post.body);
  const published = isoDate(post.date);
  const bc = [['/', 'Home'], ['/insights/', 'Insights'], [articlePath(id), post.title]];
  const rel = sortedArticles.filter(([k, a]) => k !== id && a.category === post.category).concat(sortedArticles.filter(([k, a]) => k !== id && a.category !== post.category)).slice(0, 4);
  const body = `<div class="wrap narrow">
${crumbs(bc)}
<article>
<div class="kicker">${esc(post.category || 'Insights')}</div>
<h1>${esc(post.title)}</h1>
<div class="meta"><span>By <a href="/about/">Jack Leow</a>, CEA Reg. No. R074023I</span><time datetime="${published}">${esc(post.date)}</time><span>${esc(post.readTime || '')}</span></div>
${toc.length > 2 ? `<nav class="toc" aria-label="Contents" style="margin-top:20px"><strong>In this article</strong><ol>${toc.map(([i, t]) => `<li><a href="#${i}">${esc(t)}</a></li>`).join('')}</ol></nav>` : ''}
<div class="article-body">
${html}
</div>
<div class="author"><div class="av" aria-hidden="true">JL</div><div><strong>Jack Leow</strong> · CEA Reg. No. R074023I · PropNex Realty Pte Ltd<p>Property agent with an auditing background. Writes data-first guides for HDB upgraders, first-time buyers and investors, using URA, IRAS, CPF and developer data.</p></div></div>
<div class="card cta-card"><h2>Want this applied to your numbers?</h2><p>A free 30-minute session works through your budget, CPF, timing and shortlist. No obligation.</p><a class="btn" href="/contact/">Book a free consultation</a></div>
<h2>More insights</h2>
<ul class="links">${rel.map(([k, a]) => `<li><a href="${articlePath(k)}">${esc(a.title)}</a><span>${esc(a.date)}</span></li>`).join('')}</ul>
</article>
</div>`;
  const schema = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: clip(post.title, 110), description: desc, datePublished: published, dateModified: published, author: PERSON, publisher: { '@type': 'Organization', name: 'SellingSgProperty', url: SITE + '/' }, mainEntityOfPage: url, inLanguage: 'en-SG', articleSection: post.category || undefined },
    crumbSchema(bc),
  ];
  const seoTitle = post.seoTitle || (post.title.length <= 48 ? `${post.title} | SellingSgProperty` : post.title);
  return layout({ title: seoTitle, description: desc, canonical: url, body, schema, nav: 'insights', ogType: 'article', ogImage: post.img ? (post.img.startsWith('http') ? post.img : SITE + post.img) : undefined });
}
function insightsIndex() {
  const url = SITE + '/insights/';
  const title = 'Singapore Property Insights: New Launch, HDB Upgrading & ABSD Guides';
  const desc = 'Data-first guides by Jack Leow (CEA R074023I) on new launch condos, HDB upgrading, CPF, ABSD, decoupling and buyer psychology in Singapore.';
  const body = `<div class="wrap">
${crumbs([['/', 'Home'], ['/insights/', 'Insights']])}
<h1>Singapore Property Insights</h1>
<div class="answer"><p>${sortedArticles.length} data-first guides on buying new launch condos, upgrading from HDB, CPF and ABSD rules, and the psychology of property decisions. Each article cites its data sources.</p></div>
<ul class="links" style="margin-top:20px">${sortedArticles.map(([k, a]) => `<li><a href="${articlePath(k)}">${esc(a.title)}</a><span>${esc(a.date)} · ${esc(a.readTime || '')}</span></li>`).join('')}</ul>
</div>`;
  const schema = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', url, name: title, description: desc, author: PERSON },
    { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: sortedArticles.map(([k, a], i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + articlePath(k), name: a.title })) },
    crumbSchema([['/', 'Home'], ['/insights/', 'Insights']]),
  ];
  return layout({ title, description: desc, canonical: url, body, schema, nav: 'insights' });
}

// ---------- homepage refresh ----------
function refreshHomepage(html) {
  // 1) lightweight ARTICLES metadata (no bodies)
  const meta = {};
  for (const [k, a] of Object.entries(ARTICLES)) {
    meta[k] = { title: a.title, date: a.date, readTime: a.readTime, category: a.category, chipClass: a.chipClass, img: a.img || null, excerpt: getExcerpt(a.body, 110) };
  }
  const startM = '/* BUILD:ARTICLES-META START */', endM = '/* BUILD:ARTICLES-META END */';
  const s = appJs.indexOf(startM), e = appJs.indexOf(endM);
  if (s < 0 || e < 0) throw new Error('ARTICLES meta markers missing in assets/app.js');
  appJs = appJs.slice(0, s) + startM + '\nconst ARTICLES = ' + JSON.stringify(meta).replace(/</g, '\\u003c') + ';\n' + appJs.slice(e);

  // 2) static pre-rendered project cards (same template as the client-side renderer)
  const fnStart = appJs.indexOf('        // BUILD:CARD-RENDER START');
  if (fnStart < 0) throw new Error('BUILD:CARD-RENDER START marker missing in assets/app.js');
  const fnEnd = appJs.indexOf('        // Filter Functions');
  const grid = { innerHTML: '' };
  // eslint-disable-next-line no-new-func
  const run = new Function('document', appJs.slice(fnStart, fnEnd) + '\nreturn { projects, renderProjects, compareNewest };');
  const env = run({ getElementById: () => grid });
  env.renderProjects(env.projects.slice().sort(env.compareNewest));
  const cStart = html.search(/<!-- \d+ project cards statically pre-rendered/);
  const cEnd = html.indexOf('-->', cStart) + 3;
  const gridEnd = html.indexOf('\n            </div>\n            \n            <div class="text-center mt-10">', cEnd);
  if (cStart < 0 || gridEnd < 0) throw new Error('static card markers missing in index.html');
  const comment = html.slice(cStart, cEnd).replace(/<!-- \d+ project cards/, `<!-- ${env.projects.length} project cards`);
  html = html.slice(0, cStart) + comment + '\n' + grid.innerHTML + html.slice(gridEnd);

  // 3) article count + hero 'tracker' panel (dated, links to the newest pages)
  const VALS = { articles: sortedArticles.length, total: projects.length, asof: AS_OF_LABEL };
  for (const y of ['2024', '2025', '2026', '2027']) VALS['y' + y] = projects.filter(p => p.year === y).length;
  html = html.replace(/<!--BUILD:VAL:(\w+)-->[^<]*<!--\/BUILD:VAL-->/g, (m, k) => {
    if (!(k in VALS)) throw new Error('unknown BUILD:VAL key ' + k);
    return `<!--BUILD:VAL:${k}-->${VALS[k]}<!--/BUILD:VAL-->`;
  });
  const hs = html.indexOf('<!-- BUILD:HERO-PANEL START -->'), he = html.indexOf('<!-- BUILD:HERO-PANEL END -->');
  if (hs < 0 || he < 0) throw new Error('BUILD:HERO-PANEL markers missing in index.html');
  return html.slice(0, hs) + '<!-- BUILD:HERO-PANEL START -->\n' + heroPanel() + '\n                ' + html.slice(he);
}

function heroPanel() {
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const mon = p => `${MON[(p.launchSort % 100) - 1]} ${Math.floor(p.launchSort / 100)}`;
  const launched = projects.filter(p => !isUpcoming(p)).sort((a, b) => b.launchSort - a.launchSort).slice(0, 3);
  const next = projects.filter(isUpcoming).sort((a, b) => a.launchSort - b.launchSort).slice(0, 3);
  const n = y => projects.filter(p => p.year === y).length;
  const row = (p, note) => `<li class="flex items-baseline justify-between gap-4 py-2 border-t border-white/10"><a href="${projectPath(p)}" class="text-white hover:text-violet-300 underline-offset-4 hover:underline">${esc(p.name)}</a><span class="text-xs text-slate-400 whitespace-nowrap">${esc(note)}</span></li>`;
  return `                <aside class="hidden md:block md:col-span-5" aria-label="New launch tracker summary">
                    <div class="border border-white/15 bg-white/[0.04] rounded-2xl p-7">
                        <div class="text-[11px] tracking-[0.2em] uppercase text-violet-400 font-semibold mb-5">New launch tracker &middot; data as of ${AS_OF_LABEL}</div>
                        <dl class="grid grid-cols-3 gap-4 mb-6">
                            <div><dt class="text-xs text-slate-400">Condos tracked</dt><dd class="heading-display text-4xl text-white mt-1">${projects.length}</dd></div>
                            <div><dt class="text-xs text-slate-400">Launched 2026</dt><dd class="heading-display text-4xl text-white mt-1">${n('2026')}</dd></div>
                            <div><dt class="text-xs text-slate-400">Upcoming 2027</dt><dd class="heading-display text-4xl text-white mt-1">${n('2027')}</dd></div>
                        </dl>
                        <div class="text-xs uppercase tracking-wider text-slate-400 mb-1">Latest launches</div>
                        <ul class="text-sm mb-5">${launched.map(p => row(p, `D${districtOf(p)} · ${mon(p)}`)).join('')}</ul>
                        <div class="text-xs uppercase tracking-wider text-slate-400 mb-1">Next up</div>
                        <ul class="text-sm mb-6">${next.map(p => row(p, p.launchShort || 'TBC')).join('')}</ul>
                        <a href="/new-launch-condos/" class="inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-white">See all ${projects.length} condos with launch results <i class="fa-solid fa-arrow-right text-xs"></i></a>
                    </div>
                </aside>`;
}

// ---------- sitemap & llms.txt ----------
function sitemap() {
  const old = read('sitemap.xml').replace(/<!--[\s\S]*?-->/g, '');
  const keep = [...old.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => m[1])
    .filter(u => !/\/insights|\/project\/|\/new-launch-condos/.test(u))
    .map(u => u.replace(/<loc>(https:\/\/www\.sellingsgproperty\.com\/(?:about|contact|mortgage-calculator|deep-analysis\/arina-east-residences))<\/loc>/, '<loc>$1/</loc>'))
    .map(u => `  <url>${u.trim().replace(/\s*\n\s*/g, '\n    ').replace(/^/, '\n    ')}\n  </url>`);
  const entry = (loc, lastmod, pr) => `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${pr}</priority>\n  </url>`;
  const add = [entry('/new-launch-condos/', AS_OF, '0.9'), entry('/insights/', AS_OF, '0.8')]
    .concat(projects.map(p => entry(projectPath(p), AS_OF, isUpcoming(p) || p.year === '2026' ? '0.8' : '0.6')))
    .concat(sortedArticles.map(([k, a]) => entry(articlePath(k), isoDate(a.date), '0.7')));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Generated by scripts/build-pages.cjs on ${AS_OF}. Project and insights URLs are rebuilt on every run. -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${keep.join('\n')}\n${add.join('\n')}\n</urlset>\n`;
}
function llms() {
  const old = read('llms.txt');
  const head = old.split(/\n## New Launch Projects/)[0].trimEnd();
  const tail = (old.split(/\n## Property Insights Articles[^\n]*\n/)[1] || '').split(/\n## /).slice(1).map(s => '## ' + s).join('\n');
  const yearBlock = y => `### ${YEAR_TAB[y]}\n` + sortForHub(projects.filter(p => p.year === y), y).map(p => `- ${p.name} (D${districtOf(p)}, ${placeOf(p)}; ${p.totalUnits} units; ${isUpcoming(p) ? 'expected ' + (p.launchShort || '2027') : 'launched ' + p.launchDate.replace(/\s*\(.*$/, '')}): ${SITE}${projectPath(p)}`).join('\n');
  return `${head}

## New Launch Projects (2024–2027)

Full list with launch results: ${SITE}/new-launch-condos/ (data as of ${AS_OF_LABEL})

${['2027', '2026', '2025', '2024'].map(yearBlock).join('\n\n')}

## Property Insights Articles

Index: ${SITE}/insights/

${sortedArticles.map(([k, a]) => `- ${a.title} (${a.date}): ${SITE}${articlePath(k)}`).join('\n')}
${tail ? '\n' + tail : ''}`.replace(/\n{3,}/g, '\n\n') + '\n';
}

// ---------- run ----------
let built = 0;
for (const p of projects) {
  if (HANDBUILT[p.id]) continue;
  write(`project/${projectSlug(p)}/index.html`, projectPage(p)); built++;
}
write('new-launch-condos/index.html', hubPage());
for (const [k, a] of sortedArticles) write(`insights/${articleSlug(k)}/index.html`, articlePage(k, a));
write('insights/index.html', insightsIndex());
write('index.html', refreshHomepage(indexHtml));
write('assets/app.js', appJs);

// ---------- homepage CSS (compiled Tailwind, replaces the Play CDN) ----------
// Rebuilt from index.html classes every run, then cache-busted with ?v=<hash>.
{
  const cli = path.join(ROOT, 'node_modules/tailwindcss/lib/cli.js');
  if (fs.existsSync(cli)) {
    require('child_process').execFileSync(process.execPath, [cli, '-c', 'tailwind.config.cjs', '-i', 'input.css', '-o', 'assets/home.css', '--minify'], { cwd: ROOT, stdio: ['ignore', 'ignore', 'pipe'] });
  } else {
    console.warn('WARNING: tailwindcss not installed (run `npm install`). Kept the committed assets/home.css; new Tailwind classes in index.html will not be styled.');
  }
  const homeCss = read('assets/home.css');
  const v = crypto.createHash('sha1').update(homeCss).digest('hex').slice(0, 8);
  const appV = crypto.createHash('sha1').update(appJs).digest('hex').slice(0, 8);
  let html = read('index.html').replace(/\/assets\/home\.css\?v=[A-Za-z0-9]+/, `/assets/home.css?v=${v}`)
    .replace(/\/assets\/app\.js\?v=[A-Za-z0-9]+/, `/assets/app.js?v=${appV}`);
  html = setHead(html, ROUTE_META.home);
  write('index.html', html);
  console.log(`assets/home.css ${(homeCss.length / 1024).toFixed(1)} KB, v=${v}; assets/app.js ${(appJs.length / 1024).toFixed(1)} KB, v=${appV}`);

  // ---------- SPA routes pre-rendered with their own head + visible section ----------
  // Without these, /about, /contact etc. served index.html with the homepage title and
  // canonical, so Google saw them as duplicates of the homepage.
  for (const [page, meta] of Object.entries(ROUTE_META)) {
    if (page === 'home' || page === 'blog') continue; // blog = static /insights/
    let h = setHead(html, meta).replace('<div id="page-home" class="page-section active">', '<div id="page-home" class="page-section">');
    const re = new RegExp(`(<div id="page-${page}" class="page-section)`);
    if (!re.test(h)) throw new Error(`section page-${page} not found in index.html`);
    h = h.replace(re, '$1 active');
    write(meta.path.replace(/^\//, '') + 'index.html', h);
  }

  // ---------- branded 404 (served by Netlify with a real 404 status) ----------
  write('404.html', layout({
    title: 'Page not found | SellingSgProperty',
    description: 'This page does not exist. Browse Singapore new launch condos or property insights instead.',
    canonical: SITE + '/404.html',
    body: `<main class="wrap" style="padding-top:56px;padding-bottom:72px"><p class="kicker">Error 404</p><h1>We couldn't find that page</h1>
<p>The link may be old or mistyped. These are the pages most people are looking for:</p>
<ul><li><a href="/new-launch-condos/">All new launch condos (2024–2027)</a></li><li><a href="/insights/">Property insights and guides</a></li><li><a href="/mortgage-calculator/">Mortgage calculator</a></li><li><a href="/">Homepage</a></li></ul></main>`,
  }).replace('<head>', '<head>\n<meta name="robots" content="noindex">'));
}
write('sitemap.xml', sitemap());
write('llms.txt', llms());
console.log(`Built ${built} project pages (+${Object.keys(HANDBUILT).length} hand-built kept), ${sortedArticles.length} articles, hub, insights index, sitemap, llms.txt. CSS v=${CSS_V}`);
