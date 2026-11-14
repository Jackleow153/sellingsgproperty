#!/usr/bin/env node
/*
 * Monthly launch-data check (no dependencies; Node 18+).
 *
 *   node scripts/check-launches.cjs            # prints a Markdown report; empty output = nothing to do
 *   TODAY=2027-02-01 node scripts/check-launches.cjs   # pretend it is another date
 *
 * Flags, from the projects array in assets/app.js:
 *   1. Still marked "Upcoming 2027" although its expected launch month has arrived.
 *   2. Launched in the last 6 months but no launch result (units sold) recorded.
 *   3. Hand-built page not updated since its project launched (JSON-LD dateModified).
 *   4. Launched project with no Condo Analysis score (data/condo-analysis.html: NL.L or XSCORE).
 * Run by .github/workflows/check-launches.yml, which opens/updates a GitHub issue when
 * anything is flagged. See CLAUDE.md "Project data rules" for how to fix each one.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const HANDBUILT = { 28: 'thomson-reserve-condo', 29: 'dunearn-house', 26: 'lentor-gardens-residences' };

const today = process.env.TODAY ? new Date(process.env.TODAY + 'T00:00:00Z') : new Date();
const ym = d => d.getUTCFullYear() * 100 + (d.getUTCMonth() + 1);
const NOW = ym(today);
const sixMonthsAgo = ym(new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 6, 1)));
const label = n => `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][(n % 100) - 1]} ${Math.floor(n / 100)}`;

const js = read('assets/app.js');
const a = js.indexOf('const projects = ['), b = js.indexOf('function getDistrictGradient', a);
if (a < 0 || b < 0) throw new Error('projects array not found in assets/app.js');
// eslint-disable-next-line no-new-func
const projects = new Function(js.slice(a, b) + '\nreturn projects;')();

const ca = read('data/condo-analysis.html');
const norm = t => String(t).toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]/g, '');
const scored = new Set([...JSON.parse(ca.match(/const NL = (\{.*\});\n/)[1]).L.map(l => norm(l.name)), ...Object.values(JSON.parse(ca.match(/const XSCORE = (\{.*\});\n/)[1])).map(x => norm(x.name))]);
const upcomingDue = [], noResult = [], staleHandbuilt = [], noScore = [];
const hasResult = p => /\bsold\b|take-up|taken up/i.test(JSON.stringify(p));
for (const p of projects) {
  if (p.year === '2027' && p.launchSort <= NOW) upcomingDue.push(`- **${p.name}** (id ${p.id}): expected ${p.launchShort || label(p.launchSort)}, still marked Upcoming.`);
  if (p.year !== '2027' && p.launchSort >= sixMonthsAgo && p.launchSort <= NOW && !hasResult(p)) noResult.push(`- **${p.name}** (id ${p.id}): launched ${p.launchDate}, no units-sold figure recorded.`);
  if (p.year !== '2027' && !scored.has(norm(p.name))) noScore.push(`- **${p.name}** (id ${p.id}): launched ${p.launchDate}, no Condo Analysis score yet.`);
  if (HANDBUILT[p.id] && p.year !== '2027') {
    const f = `project/${HANDBUILT[p.id]}/index.html`;
    const m = read(f).match(/"dateModified":\s*"(\d{4})-(\d{2})-\d{2}"/);
    const modified = m ? +m[1] * 100 + +m[2] : 0;
    if (modified < p.launchSort) staleHandbuilt.push(`- **${p.name}**: \`${f}\` last modified ${m ? label(modified) : '(no dateModified)'}, launched ${label(p.launchSort)}.`);
  }
}

const sections = [
  ['Launch month reached but still marked Upcoming 2027', 'Move the project to its launch year in `assets/app.js` and add the verified launch result.', upcomingDue],
  ['Recent launches without a recorded result', 'Add the launch result (date, units sold, average psf, source) to the project in `assets/app.js`.', noResult],
  ['Hand-built pages not updated since launch', 'Update the page with the launch result, add dated notes to related articles, and bump `dateModified`.', staleHandbuilt],
  ['Launched projects without a Condo Analysis score', 'Score it with the written rules: a full file in `NL.L` if units are still selling, otherwise an `XSCORE` record. Verify every fact with a second source (CLAUDE.md, Before you push).', noScore],
].filter(([, , items]) => items.length);

if (sections.length) {
  console.log(`Launch data check for ${today.toISOString().slice(0, 10)}. Follow CLAUDE.md "Project data rules", then run \`node scripts/build-pages.cjs\` and commit.\n`);
  for (const [title, fix, items] of sections) console.log(`### ${title}\n${fix}\n\n${items.join('\n')}\n`);
}
