#!/usr/bin/env node
// Ping IndexNow (Bing, Copilot, Yandex, Seznam, Naver; ChatGPT search uses Bing's index) with new or changed URLs.
// Run only AFTER Netlify has deployed the change, so the engines fetch the live page.
//   node scripts/indexnow.cjs https://www.sellingsgproperty.com/insights/<slug>/ [more URLs...]
// The key file lives at the site root: /<KEY>.txt (its content is the key itself).
const KEY = '706cab0374fd4c34baad5abd8e5264d2';
const HOST = 'www.sellingsgproperty.com';

const urls = process.argv.slice(2).filter((u) => u.startsWith(`https://${HOST}/`));
if (!urls.length) {
  console.error('Usage: node scripts/indexnow.cjs <https://www.sellingsgproperty.com/...> [...]');
  process.exit(1);
}

fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
}).then((r) => {
  console.log(`IndexNow: HTTP ${r.status} for ${urls.length} URL(s)`); // 200 or 202 = accepted
  if (r.status >= 300) process.exit(1);
});
